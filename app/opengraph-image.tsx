import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";

export const alt = "HaulBooks Pro — trucking bookkeeping and IFTA prep";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  try {
    const branded = await readFile(path.join(process.cwd(), "public", "images", "og-share.png"));
    return new Response(branded, {
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "public, max-age=0, must-revalidate",
      },
    });
  } catch {
    // og-share.png is not in the repo yet. The generated card stays until it is.
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#0c1424",
          color: "#f6f3ea",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 28, letterSpacing: 6, color: "#f0b429", fontWeight: 700 }}>
          HAULBOOKS PRO
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 68, fontWeight: 700, lineHeight: 1.05, maxWidth: 900 }}>
            The books behind every mile you run.
          </div>
          <div style={{ marginTop: 24, fontSize: 28, color: "#c9d2e3", maxWidth: 860 }}>
            Receipts, fuel, bills, miles, and IFTA prep for owner-operators and small fleets.
          </div>
        </div>
        <div style={{ display: "flex", fontSize: 24, color: "#f0b429" }}>haulbookspro.com · From $9.99/mo</div>
      </div>
    ),
    { ...size },
  );
}
