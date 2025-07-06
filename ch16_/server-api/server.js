import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import { createServer as createViteServer } from "vite";

// ESM 환경에서 __dirname을 사용하기 위한 설정
const __dirname = path.dirname(fileURLToPath(import.meta.url));

async function createServer() {
  const app = express();

  // Vite 개발 서버를 미들웨어 모드로 생성함
  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: "custom",
  });

  // Vite의 미들웨어를 Express 앱에 등록함
  // 이 미들웨어는 클라이언트 측 리소스를 처리함
  app.use(vite.middlewares);

  // 모든 요청을 처리할 핸들러를 등록함
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // 1. 기본 HTML 템플릿 파일을 읽어옴
      let template = fs.readFileSync(
        path.resolve(__dirname, "index.html"),
        "utf-8"
      );

      // 2. Vite의 HTML 변환기를 적용함
      // 개발 환경에서는 HMR 클라이언트 스크립트 등이 주입됨
      template = await vite.transformIndexHtml(url, template);

      // 3. Vite의 ssrLoadModule을 사용해 서버 엔트리 모듈을 불러옴
      // 이 모듈은 최신 상태로 유지됨
      const { render } = await vite.ssrLoadModule("/src/entry-server.jsx");

      // 4. 서버 엔트리의 render 함수를 호출하여 앱의 HTML과 데이터를 가져옴
      const { appHtml, jsonData } = await render(url);

      // 5. 클라이언트 하이드레이션에 사용할 데이터를 JSON 문자열로 변환함
      const serializedData = JSON.stringify(jsonData);

      // 6. HTML 템플릿의 플레이스홀더를 렌더링된 HTML과 데이터로 교체함
      const html = template
        .replace(`<!--app-html-->`, appHtml)
        .replace(`<!--dante-data-->`, serializedData);

      // 7. 완성된 HTML을 클라이언트에 응답함
      res.status(200).set({ "Content-Type": "text/html" }).end(html);
    } catch (e) {
      // 에러 발생 시 Vite가 스택 트레이스를 보기 쉽게 수정해줌
      vite.ssrFixStacktrace(e);
      next(e);
    }
  });

  app.listen(5173, () => {
    console.log("서버가 http://localhost:5173 에서 실행 중입니다.");
  });
}

createServer(); 