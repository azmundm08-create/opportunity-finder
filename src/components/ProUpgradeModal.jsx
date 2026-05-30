import { useState } from "react";

const PRO_FEATURES = [
  ["Save opportunities", "Bookmark and come back to them anytime"],
  ["Application tracker", "Track every app: Interested, Applied, Waiting, Accepted"],
  ["AI match scores", "See your % fit for every opportunity"],
  ["Weekly digest", "New opportunities in your categories every Monday"],
  ["Deadline reminders", "Alerts 7 and 1 day before your saved programs close"],
  ["Early access", "See new listings 48 hours before they go public"],
  ["Student profile", "Set your grade, GPA, and interests once — filters auto-apply"],
  ["Pro-only listings", "Exclusive programs not visible to free users"],
];

export default function ProUpgradeModal({ onClose, waitlistCount }) {
  const WAITLIST_URL = "https://script.google.com/macros/s/AKfycbxlRhz8GqMMwqsPoptLO0nEVvGDV7lHntJI5ZvnnsHO7kNWT48IRhhxfbA7z9ZYqjz1tQ/exec";
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const alreadyJoined = sessionStorage.getItem("waitlist_joined") === "true";

  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleJoin = async () => {
    if (loading || cooldown || alreadyJoined) return;
    if (!email) { setEmailError("Please enter your email."); return; }
    if (!isValidEmail(email)) { setEmailError("Please enter a valid email address."); return; }
    setEmailError("");
    setCooldown(true);
    setLoading(true);
    setTimeout(() => setCooldown(false), 5000);
    try {
      await fetch(WAITLIST_URL, {
        method: "POST", mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ type: "pro_waitlist", email: email.toLowerCase().trim(), timestamp: new Date().toLocaleString() })
      });
      sessionStorage.setItem("waitlist_joined", "true");
      setDone(true);
    } catch (err) { setDone(true); }
    finally { setLoading(false); }
  };

  if (done || alreadyJoined) return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <div style={{ width: 52, height: 52, borderRadius: 0, background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", fontSize: 22 }}>✓</div>
      <h3 style={{ margin: "0 0 8px", color: "var(--ink)", fontSize: 18, fontWeight: 700 }}>You're on the waitlist</h3>
      <p style={{ color: "var(--muted)", margin: "0 0 20px", fontSize: 14, lineHeight: 1.6 }}>
        We'll email you when payments go live. You'll be first in line.
      </p>
      <button onClick={onClose} style={{ background: "var(--primary)", color: "var(--primary-fg)", border: "none", padding: "10px 24px", borderRadius: 4, fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
        Done
      </button>
    </div>
  );

  const isDisabled = loading || cooldown || alreadyJoined;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ margin: "0 0 2px", fontSize: 20, fontWeight: 700, color: "var(--ink)" }}>Upgrade to Pro</h2>
          <p style={{ margin: 0, fontSize: 13, color: "var(--muted)" }}>$4.99/month. Cancel anytime.</p>
        </div>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, cursor: "pointer", color: "var(--muted)", lineHeight: 1 }}>✕</button>
      </div>

      {waitlistCount >= 20 && (
        <div style={{ background: "var(--primary-light)", borderRadius: 4, padding: "8px 12px", marginBottom: 16 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 500, color: "var(--primary)" }}>
            {waitlistCount} students are already on the waitlist.
          </p>
        </div>
      )}

      <div style={{ display: "grid", gap: 2, marginBottom: 20 }}>
        {PRO_FEATURES.map(([title, desc]) => (
          <div key={title} style={{ display: "flex", gap: 12, alignItems: "flex-start", padding: "8px 10px", borderRadius: 4 }}>
            <div style={{ width: 18, height: 18, borderRadius: "50%", background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1, width: 18, height: 18 }}>
              <svg width="9" height="9" viewBox="0 0 12 12" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="2,6 5,9 10,3" />
              </svg>
            </div>
            <div>
              <p style={{ margin: "0 0 1px", fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{title}</p>
              <p style={{ margin: 0, fontSize: 12, color: "var(--muted)", lineHeight: 1.5 }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div style={{ borderTop: "1px solid var(--border)", paddingTop: 16 }}>
        <p style={{ fontSize: 13, color: "var(--muted)", margin: "0 0 8px" }}>Join the waitlist — payments launching soon:</p>
        <input
          value={email}
          onChange={e => { setEmail(e.target.value); setEmailError(""); }}
          onKeyDown={e => e.key === "Enter" && handleJoin()}
          placeholder="your@email.com"
          type="email"
          style={{ width: "100%", padding: "10px 12px", borderRadius: 4, border: `1px solid ${emailError ? "var(--red)" : "var(--border)"}`, fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: emailError ? 4 : 10, fontFamily: "inherit", color: "var(--ink)", background: "var(--surface)" }}
        />
        {emailError && <p style={{ fontSize: 12, color: "var(--red)", margin: "0 0 10px", fontWeight: 500 }}>{emailError}</p>}
        <button
          onClick={handleJoin}
          disabled={isDisabled}
          style={{ width: "100%", background: "var(--primary)", color: "var(--primary-fg)", border: "none", padding: "12px", borderRadius: 4, fontWeight: 600, fontSize: 14, cursor: isDisabled ? "not-allowed" : "pointer", opacity: isDisabled ? 0.65 : 1 }}
        >
          {loading ? "Joining..." : cooldown ? "Please wait..." : "Join Pro Waitlist"}
        </button>
        <p style={{ fontSize: 11, color: "var(--subtle)", textAlign: "center", margin: "8px 0 0" }}>No spam. We'll only email you when Pro launches.</p>
      </div>
    </div>
  );
}
