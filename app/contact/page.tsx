"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { FloatInput, FloatTextArea, FloatSelect } from "@/components/ui/FloatInput";
import { sendEnquiry } from "@/app/actions/send-enquiry";

type State = "idle" | "submitting" | "success";

const SERVICES = [
  "PR & Brand Marketing",
  "Media Relations & Media Buying",
  "Experiential Marketing",
  "Digital Marketing",
  "Creative Production & Advertising",
  "Talent Management",
  "Other",
];

export default function GetInTouch() {
  const [state, setState] = useState<State>("idle");
  const [followUpSubmitted, setFollowUpSubmitted] = useState(false);
  const [formKey, setFormKey] = useState(0); // bump to force a fresh form on reset
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrorMsg(null);
    setState("submitting");
    const formData = new FormData(e.currentTarget);
    const result = await sendEnquiry(formData);
    if (result.ok) {
      setState("success");
    } else {
      setErrorMsg(result.error);
      setState("idle");
    }
  };

  const resetToFresh = () => {
    setFollowUpSubmitted(false);
    setState("idle");
    setFormKey((k) => k + 1);
  };

  const isSuccess = state === "success";

  return (
    <section
      className="painterly-hero--contact contact-section"
      style={{
        position: "relative",
        marginTop: "calc(var(--nav-height) * -1)",
        minHeight: "100vh",
        backgroundImage: "url('/roztomily/imagery/contact/01-onaopemipo-cityscape-ocean.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center 40%",
        overflow: "hidden",
      }}
    >
      {/* Scrim — theme-aware via --contact-scrim token */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: "var(--contact-scrim)",
          pointerEvents: "none",
        }}
      />
      {/* Bottom fade into form area — theme-aware via --contact-fade token */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: 0, right: 0, bottom: 0,
          height: "55%",
          background: "var(--contact-fade)",
          pointerEvents: "none",
        }}
      />

      <Container style={{ position: "relative", color: "var(--text-primary)" }}>
        {/* State-aware top heading */}
        <Reveal>
          <div
            key={isSuccess ? "success-heading" : "idle-heading"}
            style={{
              textAlign: "center",
              margin: "0 auto",
              marginBottom: "var(--space-12)",
              animation: isSuccess ? "fade-rise 460ms var(--motion-easing) both" : undefined,
            }}
          >
            {isSuccess ? (
              <>
                <div className="success-check" aria-hidden>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                    <path
                      className="success-check__path"
                      d="M5 12.5l4.5 4.5L19 7.5"
                      stroke="currentColor"
                      strokeWidth="2.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <h1
                  className="t-display-l"
                  style={{ maxWidth: 760, marginInline: "auto", marginBottom: "var(--space-4)" }}
                >
                  Thanks, we&apos;ll be in touch.
                </h1>
                <p
                  className="t-body-l"
                  style={{ maxWidth: 460, marginInline: "auto", color: "var(--text-warm)" }}
                >
                  We aim to reply within one business day. For urgent enquiries, email us directly.
                </p>
              </>
            ) : (
              <div style={{ maxWidth: 640, marginInline: "auto" }}>
                <h1 className="t-display-l" style={{ marginBottom: "var(--space-4)" }}>Start a project</h1>
                <p className="t-body-l" style={{ color: "var(--text-warm)" }}>
                  Fill out the form and we will reach out to you soon.
                </p>
              </div>
            )}
          </div>
        </Reveal>

        <div style={{ maxWidth: 540, margin: "0 auto", position: "relative", minHeight: 380 }}>
          {/* Form */}
          {!isSuccess && (
            <form
              key={formKey}
              onSubmit={handleSubmit}
              style={{
                display: "grid",
                gap: "var(--space-4)",
                opacity: state === "submitting" ? 0.72 : 1,
                transition: "opacity 360ms var(--motion-easing)",
              }}
            >
              <div className="form-row-2">
                <FloatInput label="First name *" name="firstName" required autoComplete="given-name" />
                <FloatInput label="Last name *"  name="lastName"  required autoComplete="family-name" />
              </div>
              <FloatInput label="Business email *"       name="email"   type="email" required autoComplete="email" />
              <FloatInput label="Company / Organisation" name="company" autoComplete="organization" />

              <fieldset
                style={{
                  border: "1px solid var(--border-soft)",
                  borderRadius: "var(--radius-lg)",
                  padding: "var(--space-5) var(--space-5) var(--space-4)",
                  background: "var(--card-bg)",
                }}
              >
                <legend
                  style={{
                    padding: "0 var(--space-2)",
                    fontSize: 13,
                    color: "var(--text-muted)",
                    background: "var(--card-bg)",
                    letterSpacing: "-0.005em",
                  }}
                >
                  How can we serve you?
                </legend>
                <div className="contact-services-grid">
                  {SERVICES.map((s) => (
                    <label key={s} className="contact-service-check">
                      <input type="checkbox" name="services" value={s} />
                      <span>{s}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              <FloatTextArea label="Tell us about the project" name="message" rows={4} />

              <div style={{ marginTop: "var(--space-4)" }}>
                <button
                  type="submit"
                  disabled={state !== "idle"}
                  className="submit-pill submit-pill--block"
                  data-state={state}
                >
                  <span className="submit-pill__label">
                    {state === "submitting" ? "Sending…" : "Send enquiry"}
                  </span>
                  <span className="submit-pill__bar" aria-hidden />
                </button>
              </div>

              {errorMsg && (
                <div
                  role="alert"
                  style={{
                    marginTop: "var(--space-3)",
                    padding: "12px 14px",
                    borderRadius: 10,
                    background: "rgba(220, 44, 37, 0.12)",
                    border: "1px solid rgba(220, 44, 37, 0.32)",
                    color: "var(--bg-teal)",
                    fontSize: 14,
                    textAlign: "left",
                  }}
                >
                  <strong style={{ display: "block", marginBottom: 4 }}>Couldn&rsquo;t send</strong>
                  <span style={{ color: "var(--text-warm)" }}>{errorMsg}</span>
                  <div style={{ marginTop: 8 }}>
                    <a
                      href="mailto:hello@roztomilygroup.com?subject=Project%20enquiry"
                      style={{ color: "var(--bg-teal)", borderBottom: "1px solid currentColor", fontSize: 13 }}
                    >
                      Email us directly →
                    </a>
                  </div>
                </div>
              )}

              <p style={{ marginTop: "var(--space-2)", textAlign: "center", fontSize: 12, color: "var(--text-muted)" }}>
                By submitting you agree to our <a href="mailto:hello@roztomilygroup.com" style={{ borderBottom: "1px solid currentColor" }}>privacy policy</a>.
              </p>
            </form>
          )}

          {/* Success — optional follow-up */}
          {isSuccess && (
            <div
              style={{
                animation: "fade-rise 460ms var(--motion-easing) both",
                animationDelay: "120ms",
              }}
            >
              {!followUpSubmitted ? (
                <div
                  style={{
                    padding: "var(--space-8)",
                    background: "var(--card-bg)",
                    border: "1px solid var(--border-hairline)",
                    borderRadius: 12,
                    textAlign: "left",
                  }}
                >
                  <p className="t-caption" style={{ color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "0.12em", marginBottom: "var(--space-3)" }}>
                    Optional
                  </p>
                  <p className="t-body" style={{ marginBottom: "var(--space-5)", color: "var(--text-soft)" }}>
                    Mind telling us how you found us? It helps us know what&apos;s working.
                  </p>
                  <form
                    onSubmit={(e) => { e.preventDefault(); setFollowUpSubmitted(true); }}
                    style={{ display: "grid", gap: "var(--space-3)" }}
                  >
                    <FloatSelect label="How did you hear about us?" name="source">
                      <option value="" disabled hidden></option>
                      <option>Google search</option>
                      <option>LinkedIn</option>
                      <option>Word of mouth / referral</option>
                      <option>Event / conference</option>
                      <option>Press / publication</option>
                      <option>Other</option>
                    </FloatSelect>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "var(--space-3)", marginTop: "var(--space-2)" }}>
                      <button type="submit" className="submit-pill submit-pill--block submit-pill--compact">
                        <span className="submit-pill__label">Submit</span>
                        <span className="submit-pill__bar" aria-hidden />
                      </button>
                      <button
                        type="button"
                        onClick={resetToFresh}
                        className="submit-pill submit-pill--block submit-pill--compact submit-pill--ghost"
                      >
                        <span className="submit-pill__label">Skip</span>
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: "var(--space-6)" }}>
                    Thanks. Talk soon.
                  </p>
                  <button
                    type="button"
                    onClick={resetToFresh}
                    className="submit-pill submit-pill--ghost"
                    style={{ padding: "10px 22px" }}
                  >
                    <span className="submit-pill__label">Start another project</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
