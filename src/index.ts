// /src/index.ts
import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";

const app = new Hono();

// Serve all static assets and index.html correctly using the `site` setting in wrangler.toml
// Even with [site] set, you still need to pass an empty manifest object
app.use("/*", serveStatic({ root: "./", manifest: {} }));

// API endpoint to receive customer data
app.post("/api/customer", async (c) => {
  const data = await c.req.json();
  console.log("Customer submitted:", data);
  return c.json({ ok: true });
});

export default app;
