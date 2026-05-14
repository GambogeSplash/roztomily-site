import { Container } from "@/components/ui/Container";
import { Counter } from "@/components/ui/Counter";
import { Reveal } from "@/components/ui/Reveal";

const METRICS = [
  { value: 360, suffix: "%", decimals: 0, label: "Earned media lift, ValueJet launch" },
  { value: 12,  suffix: "M+", decimals: 0, label: "Users reached, Kerrygold campaign" },
  { value: 330, suffix: "%", decimals: 0, label: "Value-add on influencer spend" },
];

const CARDS = [
  { t: "Strategy.",   b: "We diagnose the brief, not the symptom. Every brand has a different challenge, visibility, perception, positioning, or growth. We design the solution to the actual problem." },
  { t: "Creativity.", b: "Limitless creatives. We bring strategy to life through ideas, stories, and experiences that cut through noise and earn attention people remember." },
  { t: "Execution.",  b: "End-to-end delivery, from concept and casting to media buying, on-ground production, and measurement. No handoff gaps. No slipped deadlines." },
];

export function MetricsRow() {
  return (
    <section className="section section--surface">
      <Container>
        <Reveal>
          <h2 className="t-display-m" style={{ maxWidth: 760, marginBottom: "var(--space-16)" }}>
            Designed to move brands. Built to move markets.
          </h2>
        </Reveal>

        <div
          className="grid-3"
          style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: "var(--space-10)" }}
        >
          {METRICS.map((m, i) => (
            <Reveal key={m.label} delay={i * 120}>
              <div>
                <div className="t-display-xl">
                  <Counter target={m.value} suffix={m.suffix} decimals={m.decimals} duration={1400 + i * 120} />
                </div>
                <p className="t-body" style={{ marginTop: "var(--space-4)", color: "var(--text-warm)" }}>
                  {m.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="grid-3" style={{ marginTop: "var(--space-20)" }}>
          {CARDS.map((c, i) => (
            <Reveal key={c.t} delay={600 + i * 120} y={32}>
              <div>
                <h3 className="t-heading-s" style={{ marginBottom: "var(--space-3)" }}>{c.t}</h3>
                <p className="t-body" style={{ color: "var(--text-warm)" }}>{c.b}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
