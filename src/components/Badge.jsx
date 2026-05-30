import { CAT_COLORS } from "../data/opportunities";

export function MatchBadge({ score }) {
  if (score === null) return null;
  const isHigh = score >= 80;
  const isMid = score >= 60;
  const bg = isHigh ? "var(--green-bg)" : isMid ? "var(--amber-bg)" : "var(--red-bg)";
  const fg = isHigh ? "var(--green)" : isMid ? "var(--amber)" : "var(--red)";
  const label = isHigh ? "Great match" : isMid ? "Good match" : "Low match";
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7, background: bg, borderRadius: 0, padding: "5px 10px" }}>
      <div style={{ width: 26, height: 26, borderRadius: "50%", background: fg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
        {score}
      </div>
      <span style={{ fontSize: 12, fontWeight: 500, color: fg }}>{label}</span>
    </div>
  );
}

export function Badge({ cat }) {
  const c = CAT_COLORS[cat] || { bg: "var(--surface-2)", text: "var(--muted)", dot: "var(--subtle)" };
  return (
    <span style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 500, padding: "3px 9px", borderRadius: 3, display: "inline-flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {cat}
    </span>
  );
}
