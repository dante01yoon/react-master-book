import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();
  const isProduction = process.env.NODE_ENV === "production";
  let vite;

  if (!isProduction) {
    // 개발 모드에서는 Vite 서버를 생성하여 미들웨어로 사용함
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    // 프로덕션 모드에서는 압축 및 정적 파일 제공 미들웨어를 사용함
    const compression = (await import("compression")).default;
    const sirv = (await import("sirv")).default;
    app.use(compression());
    // 'dist/client' 경로에서 정적 파일을 제공함
    app.use(sirv("dist/client", { extensions: [] }));
  }

  // 모든 요청을 처리하는 핸들러
  app.use("*", async (req, res, next) => {
    // 개발 모드에서만 Vite 미들웨어를 통과시킴
    if (!isProduction) {
        // vite.middlewares가 next()를 호출하므로, 여기서는 바로 리턴하지 않음
    }

    const url = req.originalUrl;

    try {
        let template;
        let render;
        if (!isProduction) {
            // 1. 개발 환경에서는 index.html 파일을 읽어옴
            template = fs.readFileSync(path.resolve(__dirname, "index.html"), "utf-8");

            // 2. Vite의 SSR 변환을 적용
            template = await vite.transformIndexHtml(url, template);

            // 3. 서버 엔트리 포인트를 로드
            render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
        } else {
            template = fs.readFileSync(path.resolve(__dirname, "dist/client/index.html"), "utf-8");
            render = (await import("./dist/server/entry-server.js")).render;
        }
        
        // entry-server에서 appStream과 promise를 가져옴
        const { appStream, promise } = render();
        
        // 템플릿의 셸 부분을 먼저 전송
        const [shellStart, shellEnd] = template.split(`<!--app-html-->`);
        res.setHeader("Content-Type", "text/html");
        res.write(shellStart);

        // React 스트림을 파이핑
        appStream.pipe(res, { end: false });

        appStream.on("end", async () => {
            const data = await promise;
            const serializedData = JSON.stringify(data);
            
            // 데이터와 클라이언트 스크립트를 포함한 나머지 HTML을 전송
            res.write(`<script id="_DANTE_DATA" type="application/json">${serializedData}</script>`);
            res.write(shellEnd);
            res.end();
        });

    } catch (e) {
        if (vite) {
            vite.ssrFixStacktrace(e);
        }
        console.error(e);
        res.status(500).end(e.message);
    }
  });

  app.listen(4173, () => {
    console.log("http://localhost:4173");
  });
}

createServer();
