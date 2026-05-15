import { ImageResponse } from "next/og";

/* OG image — 1200×630. Designed entirely in code so no remote fetches
   are needed at generation time. Reliable across social platforms. */

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
            "linear-gradient(135deg, #dc2c25 0%, #c4221c 40%, #6e1812 100%)",
          color: "#fff",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Subtle radial highlight in top-left */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: 720,
            height: 720,
            background: "radial-gradient(circle at center, rgba(255,180,170,0.32) 0%, transparent 70%)",
          }}
        />
        {/* Subtle radial darkening in bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            right: 0,
            width: 720,
            height: 720,
            background: "radial-gradient(circle at center, rgba(0,0,0,0.32) 0%, transparent 70%)",
          }}
        />

        {/* Top: brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: 18, zIndex: 1 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 14,
              background: "rgba(255,255,255,0.22)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 36,
              fontWeight: 700,
            }}
          >
            R
          </div>
          <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: -0.5 }}>
            ROZTOMILY
          </span>
        </div>

        {/* Middle: tagline */}
        <div style={{ zIndex: 1 }}>
          <p
            style={{
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.8)",
              marginBottom: 28,
            }}
          >
            Integrated Marketing Communications · Lagos
          </p>
          <h1
            style={{
              fontSize: 80,
              fontWeight: 600,
              lineHeight: 1.04,
              letterSpacing: -3,
              margin: 0,
              maxWidth: 980,
            }}
          >
            We don&apos;t just market brands. We engineer influence.
          </h1>
        </div>

        {/* Bottom: URL + service list */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 18,
            color: "rgba(255,255,255,0.82)",
            zIndex: 1,
          }}
        >
          <span>roztomilygroup.com</span>
          <span>PR · Media · Experiential · Digital · Creative · Talent</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
