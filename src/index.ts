// /src/index.ts
import { Hono } from "hono";
import { serveStatic } from "hono/cloudflare-workers";

const app = new Hono();

// Use the proper static manifest
app.use("/*", serveStatic({ root: "./", manifest: {} }));

// POST route for customer data
app.post("/api/customer", async (c) => {
  const data = await c.req.json();
  console.log("Customer submitted:", data);
  return c.json({ ok: true });
});

export default app;
