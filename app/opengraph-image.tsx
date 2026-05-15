import { ImageResponse } from "next/og";

/* OG image — 1200×630. Hero Lagos cityscape photo with a heavy brand-red
   overlay so the brand reads instantly when shared on Slack, WhatsApp,
   iMessage, Twitter/X, etc. */

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
          position: "relative",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        {/* Hero Lagos photo */}
        <img
          src="https://roztomilygroup.com/roztomily/imagery/hero/06-malik-buraimoh-boats.jpg"
          alt=""
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        {/* Brand-red overlay — heavy so brand reads instantly */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg, rgba(220,44,37,0.88) 0%, rgba(160,24,18,0.92) 60%, rgba(60,12,10,0.95) 100%)",
          }}
        />
        {/* Content */}
        <div
          style={{
            position: "relative",
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            padding: 80,
            color: "#fff",
            width: "100%",
            height: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: 12,
                background: "rgba(255,255,255,0.22)",
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
                color: "rgba(255,255,255,0.78)",
                marginBottom: 24,
              }}
            >
              Integrated Marketing Communications · Lagos
            </p>
            <h1
              style={{
                fontSize: 84,
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

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              fontSize: 18,
              color: "rgba(255,255,255,0.82)",
            }}
          >
            <span>roztomilygroup.com</span>
            <span>PR · Media · Experiential · Digital · Creative · Talent</span>
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
