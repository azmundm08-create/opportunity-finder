import { useState } from "react";
import { MatchBadge, Badge } from "./Badge";
import { calcMatchScore, APP_STATUS, STATUS_COLORS } from "../data/opportunities";

export default function OpportunityCard({ opp, isPro, saved, onToggleSave, appStatus, onStatusChange, profile }) {
  const [expanded, setExpanded] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const daysLeft = Math.ceil((new Date(opp.deadline) - new Date()) / 86400000);
  const urgency = daysLeft < 14 ? "var(--red)" : daysLeft < 45 ? "var(--amber)" : "var(--green)";
  const req = opp.requirements;
  const match = isPro && profile ? calcMatchScore(opp, profile) : null;
  const statusColor = appStatus ? STATUS_COLORS[appStatus] : null;

  return (
    <div
      style={{
        background: "var(--bg)",
        border: `1px solid ${appStatus ? `${statusColor}60` : "var(--border)"}`,
        borderRadius: 0,
        padding: "1.125rem",
        display: "flex",
        flexDirection: "column",
        gap: 10,
        transition: "border-color .15s, box-shadow .15s",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 20px rgba(0,0,0,0.08)"; e.currentTarget.style.borderColor = appStatus ? `${statusColor}80` : "var(--border-strong)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.borderColor = appStatus ? `${statusColor}60` : "var(--border)"; }}
    >
      {opp.featured && (
        <div style={{ position: "absolute", top: 0, right: 0, background: "var(--primary)", color: "var(--primary-fg)", fontSize: 10, fontWeight: 600, padding: "3px 10px", borderBottomLeftRadius: 0 }}>
          Featured
        </div>
      )}
      {opp.earlyAccess && (
        <div style={{ position: "absolute", top: 0, left: 0, background: "var(--amber)", color: "#fff", fontSize: 10, fontWeight: 600, padding: "3px 10px", borderBottomRightRadius: 0 }}>
          Early Access
        </div>
      )}

      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8, flexWrap: "wrap", marginTop: opp.earlyAccess ? 18 : 0 }}>
        <Badge cat={opp.category} />
        <div style={{ display: "flex", gap: 5, alignItems: "center", flexWrap: "wrap" }}>
          {opp.paid && (
            <span style={{ fontSize: 11, fontWeight: 500, color: "var(--green)", background: "var(--green-bg)", padding: "2px 8px", borderRadius: 3 }}>Paid</span>
          )}
          <span style={{ fontSize: 11, fontWeight: 500, color: opp.cost === "free" ? "var(--blue)" : "var(--muted)", background: opp.cost === "free" ? "var(--blue-bg)" : "var(--surface)", padding: "2px 8px", borderRadius: 3 }}>
            {opp.cost === "free" ? "Free" : "Has cost"}
          </span>
          <button
            onClick={() => isPro ? onToggleSave(opp.id) : onToggleSave("upgrade")}
            title={isPro ? (saved ? "Remove from saved" : "Save") : "Pro feature"}
            style={{ background: saved ? "var(--primary-light)" : "var(--surface)", border: `1px solid ${saved ? "var(--primary)" : "var(--border)"}`, borderRadius: 2, width: 30, height: 30, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", flexShrink: 0, color: saved ? "var(--primary)" : "var(--muted)" }}
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
            </svg>
          </button>
        </div>
      </div>

      {match && <MatchBadge score={match.score} />}

      {appStatus && (
        <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: statusColor, flexShrink: 0 }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: statusColor }}>{appStatus}</span>
        </div>
      )}

      <div>
        <h3 style={{ margin: "0 0 5px", fontSize: 14, fontWeight: 600, color: "var(--ink)", lineHeight: 1.4, textWrap: "balance" }}>
          {opp.title.replace("[EARLY ACCESS] ", "")}
        </h3>
        <p style={{ margin: 0, fontSize: 13, color: "var(--ink)", lineHeight: 1.55, fontWeight: 400 }}>{opp.description}</p>
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 10, fontSize: 12, color: "var(--muted)" }}>
        <span>{opp.mode === "virtual" ? "Virtual" : "In-Person"}</span>
        <span>Grades {Math.min(...opp.grades)}–{Math.max(...opp.grades)}</span>
        <span style={{ color: urgency, fontWeight: 500 }}>
          {daysLeft > 0 ? `${daysLeft}d left` : "Closed"}
        </span>
        <span>{req.location}</span>
      </div>

      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        <button
          onClick={() => setExpanded(e => !e)}
          style={{ flex: 1, background: "var(--surface)", border: "1px solid var(--border)", borderRadius: 2, padding: "6px 12px", fontSize: 12, fontWeight: 500, color: "var(--muted)", cursor: "pointer" }}
        >
          {expanded ? "Hide requirements" : "Requirements"}
        </button>
        {isPro && (
          <button
            onClick={() => setShowStatus(s => !s)}
            style={{ background: appStatus ? `${statusColor}15` : "var(--surface)", border: `1px solid ${appStatus ? `${statusColor}50` : "var(--border)"}`, borderRadius: 2, padding: "6px 12px", fontSize: 12, fontWeight: 500, color: appStatus || "var(--muted)", cursor: "pointer" }}
          >
            {appStatus || "Track"}
          </button>
        )}
      </div>

      {showStatus && isPro && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {APP_STATUS.map(s => (
            <button
              key={s}
              onClick={() => { onStatusChange(opp.id, s === appStatus ? null : s); setShowStatus(false); }}
              style={{ padding: "4px 12px", borderRadius: 3, border: "1.5px solid", fontSize: 12, fontWeight: 500, cursor: "pointer", background: appStatus === s ? statusColor : "var(--bg)", color: appStatus === s ? "#fff" : STATUS_COLORS[s] || "var(--muted)", borderColor: STATUS_COLORS[s] || "var(--border)" }}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {expanded && (
        <div style={{ background: "var(--surface)", borderRadius: 0, padding: "0.75rem", fontSize: 12, display: "grid", gap: 7 }}>
          {[
            ["Age", `${req.minAge}–${req.maxAge} years old`],
            ["Location", req.location],
            ["Citizenship", req.citizenship],
            ["GPA", req.gpa === "none" ? "No requirement" : `Minimum ${req.gpa}`],
            ["Cost", opp.cost === "free" ? "Free to apply" : "Application or program fee"],
            ["Stipend", opp.paid ? "Yes — paid opportunity" : "No payment"],
          ].map(([label, val]) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", gap: 8 }}>
              <span style={{ color: "var(--muted)", fontWeight: 500, whiteSpace: "nowrap" }}>{label}</span>
              <span style={{ color: "var(--ink)", fontWeight: 500, textAlign: "right" }}>{val}</span>
            </div>
          ))}
          <div style={{ display: "flex", gap: 4, flexWrap: "wrap", marginTop: 4 }}>
            {opp.tags.map(t => (
              <span key={t} style={{ background: "var(--surface-2)", color: "var(--muted)", padding: "2px 8px", borderRadius: 3, fontSize: 11 }}>
                {t}
              </span>
            ))}
          </div>
          {match && (
            <div style={{ marginTop: 4, padding: "8px", background: "var(--green-bg)", borderRadius: 0 }}>
              <p style={{ margin: "0 0 4px", fontSize: 11, fontWeight: 600, color: "var(--green)" }}>Match analysis</p>
              {match.reasons.map(r => (
                <p key={r} style={{ margin: "1px 0", fontSize: 11, color: "var(--ink)" }}>{r}</p>
              ))}
            </div>
          )}
        </div>
      )}

      <a
        href={opp.link}
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 7, background: "var(--primary)", color: "var(--primary-fg)", fontSize: 13, fontWeight: 600, padding: "10px 16px", borderRadius: 4, textDecoration: "none", marginTop: 2, transition: "background .12s" }}
        onMouseEnter={e => { e.currentTarget.style.background = "var(--primary-hover)"; }}
        onMouseLeave={e => { e.currentTarget.style.background = "var(--primary)"; }}
      >
        Apply Now
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
          <polyline points="15,3 21,3 21,9" />
          <line x1="10" y1="14" x2="21" y2="3" />
        </svg>
      </a>
    </div>
  );
}
