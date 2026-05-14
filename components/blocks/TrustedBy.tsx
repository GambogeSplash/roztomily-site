"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { clients, logoUrl, type Client } from "@/lib/clients";

function ClientLogo({ client }: { client: Client }) {
  const [errored, setErrored] = useState(false);
  const [svgMarkup, setSvgMarkup] = useState<string | null>(null);

  const isSvg = client.src?.endsWith(".svg");

  // Inline-load SVGs so currentColor flows from the parent's text color
  useEffect(() => {
    if (!isSvg || !client.src) return;
    let alive = true;
    fetch(client.src)
      .then((r) => r.text())
      .then((t) => { if (alive) setSvgMarkup(t); })
      .catch(() => { if (alive) setSvgMarkup(""); });
    return () => { alive = false; };
  }, [client.src, isSvg]);

  if (isSvg) {
    return (
      <span
        aria-label={client.name}
        role="img"
        dangerouslySetInnerHTML={{ __html: svgMarkup ?? "" }}
      />
    );
  }

  const src = client.src ?? (client.domain ? logoUrl(client.domain, 400) : null);
  if (!src || errored) {
    return <span className="logo-marquee__fallback">{client.name}</span>;
  }

  return (
    <Image
      src={src}
      alt={client.name}
      width={180}
      height={56}
      unoptimized
      onError={() => setErrored(true)}
    />
  );
}

export function TrustedBy() {
  const sequence = [...clients, ...clients];
  return (
    <section
      className="section section--page"
      style={{
        paddingTop: "var(--space-16)",
        paddingBottom: "var(--space-16)",
        color: "var(--text-subtle)",
      }}
    >
      <Container>
        <Reveal>
          <p className="t-body-s" style={{ textAlign: "center", color: "var(--text-muted)", marginBottom: "var(--space-8)" }}>
            Brands we&rsquo;ve published for, partnered with, and helped move into conversation
          </p>
        </Reveal>

        <Reveal delay={100}>
          <div className="logo-marquee" aria-label="Client logos" role="region">
            <div className="logo-marquee__track">
              {sequence.map((c, i) => (
                <div key={`a-${i}-${c.name}`} className="logo-marquee__item">
                  <ClientLogo client={c} />
                </div>
              ))}
              {sequence.map((c, i) => (
                <div key={`b-${i}-${c.name}`} className="logo-marquee__item" aria-hidden>
                  <ClientLogo client={c} />
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
