"use client";

import { useId, useState, type InputHTMLAttributes, type TextareaHTMLAttributes } from "react";

const wrapStyle: React.CSSProperties = {
  position: "relative",
};

const fieldBase: React.CSSProperties = {
  width: "100%",
  background: "var(--card-bg)",
  border: "1px solid var(--border-soft)",
  borderRadius: "var(--radius-lg)",
  padding: "22px 16px 10px",
  fontSize: 16,
  fontFamily: "inherit",
  color: "var(--text-primary)",
  outline: "none",
  transition: "border-color var(--motion-fast) var(--motion-easing), box-shadow var(--motion-fast) var(--motion-easing)",
};

function labelStyle(active: boolean): React.CSSProperties {
  return {
    position: "absolute",
    left: 16,
    top: active ? 6 : 18,
    fontSize: active ? 11 : 16,
    color: active ? "var(--text-muted)" : "var(--text-subtle)",
    pointerEvents: "none",
    transition: "top 180ms var(--motion-easing), font-size 180ms var(--motion-easing), color 180ms var(--motion-easing)",
    letterSpacing: active ? "0.08em" : 0,
    textTransform: active ? "uppercase" : "none",
  };
}

export function FloatInput({
  label,
  value,
  ...rest
}: { label: string; value?: string } & InputHTMLAttributes<HTMLInputElement>) {
  const [focused, setFocused] = useState(false);
  const [inner, setInner] = useState("");
  const id = useId();
  const active = focused || !!(value ?? inner);
  return (
    <div style={wrapStyle}>
      <label htmlFor={id} style={labelStyle(active)}>{label}</label>
      <input
        id={id}
        style={{ ...fieldBase, borderColor: focused ? "var(--text-primary)" : "var(--border-soft)" }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setInner(e.currentTarget.value)}
        value={value}
        {...rest}
      />
    </div>
  );
}

export function FloatTextArea({
  label,
  value,
  ...rest
}: { label: string; value?: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const [focused, setFocused] = useState(false);
  const [inner, setInner] = useState("");
  const id = useId();
  const active = focused || !!(value ?? inner);
  return (
    <div style={wrapStyle}>
      <label htmlFor={id} style={labelStyle(active)}>{label}</label>
      <textarea
        id={id}
        style={{ ...fieldBase, resize: "vertical", minHeight: 110, borderColor: focused ? "var(--text-primary)" : "var(--border-soft)" }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setInner(e.currentTarget.value)}
        value={value}
        {...rest}
      />
    </div>
  );
}

export function FloatSelect({
  label,
  children,
  value,
  ...rest
}: { label: string; children: React.ReactNode; value?: string } & React.SelectHTMLAttributes<HTMLSelectElement>) {
  const [focused, setFocused] = useState(false);
  const [inner, setInner] = useState("");
  const id = useId();
  const active = focused || !!(value ?? inner);
  return (
    <div style={wrapStyle}>
      <label htmlFor={id} style={labelStyle(active)}>{label}</label>
      <select
        id={id}
        defaultValue=""
        style={{
          ...fieldBase,
          appearance: "none",
          WebkitAppearance: "none",
          borderColor: focused ? "var(--text-primary)" : "var(--border-soft)",
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' width=\'12\' height=\'12\' viewBox=\'0 0 12 12\'%3E%3Cpath d=\'M2 4l4 4 4-4\' stroke=\'%23555\' stroke-width=\'1.4\' fill=\'none\' stroke-linecap=\'round\' stroke-linejoin=\'round\'/%3E%3C/svg%3E")',
          backgroundRepeat: "no-repeat",
          backgroundPosition: "right 14px center",
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        onChange={(e) => setInner(e.currentTarget.value)}
        value={value}
        {...rest}
      >
        {children}
      </select>
    </div>
  );
}
