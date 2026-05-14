import type { CSSProperties, ReactNode } from "react";

export function Container({
  children,
  className = "",
  as: As = "div",
  style,
}: {
  children: ReactNode;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
  style?: CSSProperties;
}) {
  return (
    <As
      className={className}
      style={{
        maxWidth: "var(--container-max)",
        marginInline: "auto",
        paddingInline: "var(--container-pad)",
        width: "100%",
        ...style,
      }}
    >
      {children}
    </As>
  );
}
