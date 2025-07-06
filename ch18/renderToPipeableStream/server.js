import fs from "node:fs/promises";
import express from "express";

const isProduction = process.env.NODE_ENV === "production";
const port = process.env.PORT || 4173;
const base = process.env.BASE || "/";

const app = express();
let vite;

if (!isProduction) {
  const { createServer } = await import("vite");
  vite = await createServer({
    server: { middlewareMode: true },
    appType: "custom",
    base,
  });
  app.use(vite.middlewares);
} else {
  app.use((await import("compression")).default());
  app.use(
    base,
    (await import("serve-static")).default("dist/client", {
      index: false,
    })
  );
}

app.use("*", async (req, res) => {
  try {
    const url = req.originalUrl;

    let render;
    if (!isProduction) {
      // 1. Vite 개발 서버를 통해 서버 엔트리 모듈을 불러옴
      render = (await vite.ssrLoadModule("/src/entry-server.jsx")).render;
    } else {
      const serverEntry = await import("./dist/server/entry-server.js");
      render = serverEntry.render;
    }

    res.setHeader("Content-Type", "text/html");
    
    // 2. render 함수에 리스폰스 객체를 전달하여 스트리밍 시작
    render(res);

  } catch (e) {
    if (vite) {
      vite.ssrFixStacktrace(e);
    }
    console.log(e.stack);
    res.status(500).end(e.stack);
  }
});

app.listen(port, () => {
  console.log(`Server started at http://localhost:${port}`);
}); 