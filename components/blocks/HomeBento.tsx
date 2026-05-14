"use client";

import { BentoFeatures, type BentoItem } from "./BentoFeatures";

/* ── Icons ─────────────────────────────────────────────────────────── */
const IconDoc = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M6 3h8l4 4v14H6z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M14 3v4h4" stroke="currentColor" strokeWidth="1.4" />
    <path d="M9 12h6M9 16h4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const IconMega = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M3 10v4l11 6V4z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M17 7v10a3 3 0 0 0 0-10z" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
  </svg>
);
const IconGlobe = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.4" />
    <path d="M3 12h18M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18" stroke="currentColor" strokeWidth="1.4" />
  </svg>
);
const IconSpark = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M12 3v6M12 15v6M3 12h6M15 12h6M5.5 5.5l4 4M14.5 14.5l4 4M5.5 18.5l4-4M14.5 9.5l4-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);
const IconChart = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden>
    <path d="M4 19h16M6 15l4-5 4 3 5-8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Artefacts ─────────────────────────────────────────────────────── */
const ArtefactBrief = (
  <div
    style={{
      background: "#ffffff",
      borderRadius: 12,
      boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
      padding: "12px 14px",
      width: "78%",
      maxWidth: 280,
      fontSize: 12,
    }}
  >
    <p style={{ color: "var(--bg-teal)", fontWeight: 600, letterSpacing: "0.08em", marginBottom: 6 }}>EMBARGO · 09 JUNE</p>
    <p style={{ fontWeight: 500, marginBottom: 4 }}>ValueJet announces Lagos route expansion</p>
    <p style={{ color: "#6b6660" }}>Sent to: Vanguard · Premium Times · BellaNaija · Pulse · TechCabal</p>
  </div>
);
const ArtefactMedia = (
  <div style={{ display: "grid", gap: 6, width: "78%", maxWidth: 280, fontSize: 12 }}>
    {[
      { name: "Vanguard", state: "Pitched", c: "#0f8a6a" },
      { name: "BellaNaija", state: "Confirmed", c: "var(--bg-teal)" },
      { name: "TechCabal", state: "Live", c: "#0f8a6a" },
      { name: "ARISE TV", state: "Following up", c: "#a48800" },
    ].map((r) => (
      <div key={r.name} style={{ background: "#fff", borderRadius: 10, padding: "8px 12px", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
        <span style={{ fontWeight: 500 }}>{r.name}</span>
        <span style={{ color: r.c, fontSize: 11 }}>● {r.state}</span>
      </div>
    ))}
  </div>
);
const ArtefactPin = (
  <div style={{ position: "relative", width: 160, height: 160 }}>
    <div style={{ position: "absolute", inset: 0, borderRadius: 999, background: "rgba(220,44,37,0.08)" }} />
    <div style={{ position: "absolute", inset: 22, borderRadius: 999, background: "rgba(220,44,37,0.14)" }} />
    <div style={{ position: "absolute", inset: 50, borderRadius: 999, background: "var(--bg-teal)", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 500 }}>
      Ikeja City Mall
    </div>
  </div>
);
const ArtefactTimeline = (
  <div style={{ background: "#ffffff", borderRadius: 12, padding: "12px 14px", width: 320, maxWidth: "85%", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, fontSize: 11, color: "#6b6660" }}>
      <span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--bg-teal)" }} />
      <span style={{ fontWeight: 600, color: "#1a1816" }}>CAMPAIGN ROLLOUT</span>
    </div>
    <div style={{ position: "relative", height: 28, background: "#f4f1e9", borderRadius: 999 }}>
      <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: "62%", background: "var(--bg-teal)", borderRadius: 999, display: "flex", alignItems: "center", paddingLeft: 12, color: "#fff", fontSize: 11, fontWeight: 500 }}>
        Live → 12 markets
      </div>
    </div>
    <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontSize: 10, color: "#6b6660" }}>
      <span>T-30 brief</span><span>T-10 launch</span><span>T+30 review</span>
    </div>
  </div>
);
const ArtefactReport = (
  <div style={{ background: "#ffffff", borderRadius: 12, padding: "14px 16px", width: 300, maxWidth: "85%", boxShadow: "0 2px 10px rgba(0,0,0,0.06)" }}>
    <p style={{ fontSize: 11, color: "#6b6660", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 8 }}>WEEK 4 · EARNED MEDIA</p>
    <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 10 }}>
      <span style={{ fontFamily: "var(--font-display)", fontSize: 28, letterSpacing: "-0.02em" }}>+360</span>
      <span style={{ fontSize: 13, color: "var(--bg-teal)", fontWeight: 600 }}>%</span>
      <span style={{ fontSize: 11, color: "#6b6660" }}>vs baseline</span>
    </div>
    <svg viewBox="0 0 220 50" style={{ width: "100%", height: 40 }} aria-hidden>
      <path d="M0 40 L30 36 L60 34 L90 28 L120 22 L150 18 L180 12 L220 5" stroke="var(--bg-teal)" strokeWidth="2" fill="none" />
      <path d="M0 40 L30 36 L60 34 L90 28 L120 22 L150 18 L180 12 L220 5 L220 50 L0 50 Z" fill="var(--bg-teal)" opacity="0.12" />
    </svg>
  </div>
);

const ITEMS: BentoItem[] = [
  {
    icon: IconDoc,
    artefact: ArtefactBrief,
    title: "Press release writing & distribution",
    body: "Drafted, embargoed, placed with editors who already know your story.",
  },
  {
    icon: IconMega,
    artefact: ArtefactMedia,
    title: "Media list curation & pitching",
    body: "Targeted by beat, not by blast. Tracked status per outlet.",
  },
  {
    icon: IconGlobe,
    artefact: ArtefactPin,
    title: "On-ground activation production",
    body: "Venues, talent, AV, security, photography. Coordinated end to end.",
  },
  {
    icon: IconSpark,
    artefact: ArtefactTimeline,
    title: "Campaign sequencing & rollout",
    body: "Pre-launch, live, post-event. Every phase scripted so nothing slips.",
    span: 2,
  },
  {
    icon: IconChart,
    artefact: ArtefactReport,
    title: "Weekly earned-media reporting",
    body: "Reach, share-of-voice, sentiment — quantified, not vibed.",
  },
];

export function HomeBento() {
  return (
    <BentoFeatures
      title="Reduce effort. Increase output."
      subtitle="Automate the noise. Stay focused on the brand."
      items={ITEMS}
      background="page"
    />
  );
}
