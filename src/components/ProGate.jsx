export default function ProGate({ feature, onUpgrade }) {
  return (
    <div style={{ textAlign: "center", padding: "3rem 1rem" }}>
      <div style={{ width: 48, height: 48, borderRadius: 0, background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 20 }}>
        🔒
      </div>
      <h2 style={{ margin: "0 0 8px", fontSize: 20, fontWeight: 700, color: "var(--ink)" }}>Pro feature</h2>
      <p style={{ color: "var(--muted)", margin: "0 0 24px", fontSize: 14, maxWidth: 360, marginLeft: "auto", marginRight: "auto", lineHeight: 1.6 }}>{feature}</p>
      <button
        onClick={onUpgrade}
        style={{ background: "var(--primary)", color: "var(--primary-fg)", border: "none", padding: "11px 28px", borderRadius: 4, fontWeight: 600, fontSize: 14, cursor: "pointer" }}
      >
        Upgrade to Pro — $4.99/mo
      </button>
    </div>
  );
}
