export default async function handler(req, res) {
  const target = process.env.PROXY_TARGET; // 예: https://api.example.com
  if (!target) return res.status(500).json({ error: "PROXY_TARGET not set" });

  const u = new URL(req.url, `http://${req.headers.host}`);
  const path = u.pathname.replace(/^\/api\/proxy/, "");
  const dest = target + path + (u.search || "");

  const upstream = await fetch(dest, {
    method: req.method,
    headers: { ...Object.fromEntries(Object.entries(req.headers)
      .filter(([k]) => !["host","connection","content-length"].includes(k.toLowerCase()))) },
    body: ["GET","HEAD"].includes(req.method) ? undefined : req
  });

  res.status(upstream.status);
  upstream.headers.forEach((v,k)=>res.setHeader(k,v));
  upstream.body.pipe(res);
}


