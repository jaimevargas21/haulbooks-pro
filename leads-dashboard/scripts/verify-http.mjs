const base = process.env.BASE_URL ?? "http://127.0.0.1:3456";
const password = process.env.DASHBOARD_PASSWORD;
const apiKey = process.env.INGEST_API_KEY;

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

async function main() {
  if (!password || !apiKey) {
    throw new Error("Set DASHBOARD_PASSWORD and INGEST_API_KEY.");
  }

  const locked = await fetch(`${base}/leads`, { redirect: "manual" });
  assert(locked.status === 307 || locked.status === 302, `expected login redirect, got ${locked.status}`);

  const wrong = await fetch(`${base}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: base },
    body: JSON.stringify({ password: "not-the-password" }),
  });
  assert(wrong.status === 401, `wrong password should be 401, got ${wrong.status}`);

  const login = await fetch(`${base}/api/auth/login`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: base },
    body: JSON.stringify({ password }),
  });
  assert(login.status === 200, `login failed: ${login.status}`);
  const setCookie = typeof login.headers.getSetCookie === "function" ? login.headers.getSetCookie() : [];
  const cookie = setCookie.map((item) => item.split(";")[0]).join("; ");
  assert(cookie.includes("hb_leads_session"), "missing session cookie");

  const page = await fetch(`${base}/replies`, { headers: { cookie } });
  assert(page.status === 200, "replies page should load");
  const html = await page.text();
  const pending = [...html.matchAll(/data-reply-id="([^"]+)" data-reply-status="pending"/g)].map((match) => match[1]);
  assert(pending.length >= 2, "need two pending drafts to approve and deny");

  const approve = await fetch(`${base}/api/replies/${pending[0]}/approve`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: base, cookie },
    body: JSON.stringify({ note: "Approved from the HTTP check." }),
  });
  const approveBody = await approve.json();
  assert(approve.status === 200 && approveBody.reply?.status === "approved", `approve failed: ${approve.status} ${JSON.stringify(approveBody)}`);

  const deny = await fetch(`${base}/api/replies/${pending[1]}/deny`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: base, cookie },
    body: JSON.stringify({ note: "Hold this one." }),
  });
  const denyBody = await deny.json();
  assert(deny.status === 200 && denyBody.reply?.status === "denied", `deny failed: ${deny.status}`);

  const crossSite = await fetch(`${base}/api/replies/${pending[0]}/approve`, {
    method: "POST",
    headers: { "content-type": "application/json", origin: "https://evil.example", cookie },
    body: JSON.stringify({ note: "nope" }),
  });
  assert(crossSite.status === 403, "cross-site approve should be forbidden");

  const noKey = await fetch(`${base}/api/ingest`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ type: "ticket", subject: "x", fromEmail: "a@b.co" }),
  });
  assert(noKey.status === 401, "ingest without a key should be 401");

  const ingest = await fetch(`${base}/api/ingest`, {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": apiKey },
    body: JSON.stringify({
      type: "lead",
      company: "HTTP Haul LLC",
      email: "dispatch@httphaul.example",
      city: "Lubbock",
      state: "TX",
      fleetSize: 1,
    }),
  });
  const ingestBody = await ingest.json();
  assert(ingest.status === 200 && ingestBody.leads?.created === 1, `ingest failed: ${ingest.status} ${JSON.stringify(ingestBody)}`);

  const leadsPage = await fetch(`${base}/leads`, { headers: { cookie } });
  const leadsHtml = await leadsPage.text();
  assert(leadsHtml.includes("HTTP Haul LLC"), "ingested lead should show on the leads page");

  const overview = await fetch(`${base}/`, { headers: { cookie } });
  assert(overview.status === 200, "overview should load");
  const home = await overview.text();
  assert(home.includes("Pending approvals"), "overview should show the approval count");

  console.log("verify-http: ok");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
