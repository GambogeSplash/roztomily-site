import { ImageResponse } from "next/og";

/* OG image — 1200×630, generated at build/request time, used by all socials. */

export const runtime = "edge";
export const alt = "Roztomily · We engineer influence.";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 80,
          background:
            "linear-gradient(135deg, #dc2c25 0%, #c4221c 35%, #8a1813 100%)",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 12,
              background: "rgba(255,255,255,0.18)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 32,
              fontWeight: 700,
            }}
          >
            R
          </div>
          <span style={{ fontSize: 30, fontWeight: 700, letterSpacing: -0.5 }}>
            ROZTOMILY
          </span>
        </div>

        <div>
          <p
            style={{
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.7)",
              marginBottom: 24,
            }}
          >
            Integrated Marketing Communications · Lagos
          </p>
          <h1
            style={{
              fontSize: 88,
              fontWeight: 600,
              lineHeight: 1.02,
              letterSpacing: -3,
              margin: 0,
              maxWidth: 980,
            }}
          >
            We don&apos;t just market brands. We engineer influence.
          </h1>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 18, color: "rgba(255,255,255,0.78)" }}>
          <span>roztomily.vercel.app</span>
          <span>PR · Media · Experiential · Digital · Creative · Talent</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
