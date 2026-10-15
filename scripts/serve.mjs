import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname } from "node:path";
const root = resolve(process.env.SERVE_DIR || ".");
const port = Number(process.env.PORT || 4173);
const mime = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webp": "image/webp",
  ".jpg": "image/jpeg",
  ".png": "image/png",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
};
http
  .createServer(async (req, res) => {
    try {
      let path = resolve(
        root,
        "." + decodeURIComponent(new URL(req.url, "http://localhost").pathname),
      );
      if (path !== root && !path.startsWith(root + "/")) {
        res.writeHead(403);
        res.end();
        return;
      }
      if ((await stat(path)).isDirectory()) path += "/index.html";
      const file = await readFile(path);
      res.writeHead(200, {
        "Content-Type": mime[extname(path)] || "application/octet-stream",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      });
      res.end(file);
    } catch {
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(
        await readFile(resolve(root, "404.html")).catch(() =>
          Buffer.from("Not found"),
        ),
      );
    }
  })
  .listen(port, "0.0.0.0", () =>
    console.log(`Radu preview: http://127.0.0.1:${port}`),
  );
