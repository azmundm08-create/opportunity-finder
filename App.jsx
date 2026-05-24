import { useState, useMemo } from "react";

const OPPORTUNITIES = [
  {
    id: 1, title: "Goldman Sachs 10,000 Small Businesses Youth Program", category: "finance",
    grades: [11, 12], mode: "virtual", deadline: "2026-08-15", paid: true,
    description: "Intensive finance & entrepreneurship program for high school juniors and seniors. Learn from Goldman Sachs professionals.",
    link: "#", featured: true
  },
  {
    id: 2, title: "Congressional App Challenge", category: "coding",
    grades: [9, 10, 11, 12], mode: "in-person", deadline: "2026-10-31", paid: false,
    description: "Build an app, compete nationally, and potentially present it in the U.S. Capitol. Open to all high schoolers.",
    link: "#", featured: true
  },
  {
    id: 3, title: "DECA International Career Development Conference", category: "business",
    grades: [9, 10, 11, 12], mode: "in-person", deadline: "2026-09-01", paid: false,
    description: "Prepare and compete in business case challenges. Network with 20,000+ students worldwide.",
    link: "#", featured: false
  },
  {
    id: 4, title: "Google Summer of Code", category: "coding",
    grades: [11, 12], mode: "virtual", deadline: "2026-07-02", paid: true,
    description: "Contribute to open-source software projects with mentorship from Google engineers. Paid stipend included.",
    link: "#", featured: false
  },
  {
    id: 5, title: "Local Food Bank Volunteer Program", category: "volunteering",
    grades: [9, 10, 11, 12], mode: "in-person", deadline: "2026-12-31", paid: false,
    description: "Sort donations, pack meals, and support community outreach. Flexible weekend hours.",
    link: "#", featured: false
  },
  {
    id: 6, title: "MIT Launch — High School Entrepreneurship", category: "business",
    grades: [10, 11, 12], mode: "virtual", deadline: "2026-06-15", paid: true,
    description: "Launch a real company with guidance from MIT faculty, mentors, and fellow student founders.",
    link: "#", featured: true
  },
  {
    id: 7, title: "NASA High School Internship (OSSI)", category: "coding",
    grades: [11, 12], mode: "in-person", deadline: "2026-11-01", paid: true,
    description: "Work on real NASA missions in science, engineering, and technology. One of the most prestigious STEM internships.",
    link: "#", featured: false
  },
  {
    id: 8, title: "Khan Academy Ambassador Program", category: "volunteering",
    grades: [9, 10, 11, 12], mode: "virtual", deadline: "2026-09-01", paid: false,
    description: "Help other students learn math and science online. Build leadership and communication skills.",
    link: "#", featured: false
  },
  {
    id: 9, title: "Junior Achievement Finance Park", category: "finance",
    grades: [9, 10], mode: "in-person", deadline: "2026-10-01", paid: false,
    description: "Simulate real-life financial decisions in an immersive 3,000 sq ft simulated city environment.",
    link: "#", featured: false
  },
  {
    id: 10, title: "Replit Bounties — Student Developer", category: "coding",
    grades: [9, 10, 11, 12], mode: "virtual", deadline: "2026-12-31", paid: true,
    description: "Complete coding bounties posted by real companies and earn cash. Perfect for building a portfolio.",
    link: "#", featured: false
  },
  {
    id: 11, title: "Young Entrepreneurs Academy (YEA!)", category: "business",
    grades: [9, 10, 11, 12], mode: "in-person", deadline: "2026-09-30", paid: false,
    description: "Start and launch a real business over one school year. Pitch to investors for seed funding.",
    link: "#", featured: false
  },
  {
    id: 12, title: "Investopedia Stock Simulator Challenge", category: "finance",
    grades: [9, 10, 11, 12], mode: "virtual", deadline: "2026-11-01", paid: true,
    description: "Trade virtual stocks in a real-market simulator. Top performers win scholarships and cash prizes.",
    link: "#", featured: false
  },
];

const CATEGORIES = ["all", "finance", "coding", "business", "volunteering"];
const GRADES = [9, 10, 11, 12];
const CAT_COLORS = {
  finance: { bg: "#FEF3C7", text: "#92400E", dot: "#F59E0B" },
  coding: { bg: "#EDE9FE", text: "#4C1D95", dot: "#7C3AED" },
  business: { bg: "#DCFCE7", text: "#14532D", dot: "#16A34A" },
  volunteering: { bg: "#FCE7F3", text: "#831843", dot: "#DB2777" },
};

function Badge({ cat }) {
  const c = CAT_COLORS[cat] || { bg: "#F1F5F9", text: "#475569", dot: "#94A3B8" };
  return (
    <span style={{ background: c.bg, color: c.text, fontSize: 11, fontWeight: 600, padding: "3px 10px", borderRadius: 999, letterSpacing: "0.04em", textTransform: "uppercase", display: "inline-flex", alignItems: "center", gap: 5 }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: c.dot, flexShrink: 0 }} />
      {cat}
    </span>
  );
}

function OpportunityCard({ opp }) {
  const daysLeft = Math.ceil((new Date(opp.deadline) - new Date()) / 86400000);
  const urgency = daysLeft < 14 ? "#EF4444" : daysLeft < 45 ? "#F59E0B" : "#22C55E";
  return (
    <div style={{ background: "#fff", border: "1.5px solid #F1F5F9", borderRadius: 16, padding: "1.25rem", display: "flex", flexDirection: "column", gap: 10, transition: "box-shadow .2s, transform .2s", cursor: "pointer", position: "relative", overflow: "hidden" }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.10)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "none"; e.currentTarget.style.transform = "none"; }}>
      {opp.featured && <div style={{ position: "absolute", top: 0, right: 0, background: "linear-gradient(135deg,#6366F1,#8B5CF6)", color: "#fff", fontSize: 10, fontWeight: 700, padding: "4px 12px", borderBottomLeftRadius: 10, letterSpacing: "0.06em" }}>FEATURED</div>}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 8 }}>
        <Badge cat={opp.category} />
        <span style={{ fontSize: 11, fontWeight: 600, color: opp.paid ? "#16A34A" : "#64748B", background: opp.paid ? "#DCFCE7" : "#F8FAFC", padding: "3px 8px", borderRadius: 999, whiteSpace: "nowrap" }}>{opp.paid ? "💰 Paid" : "Free"}</span>
      </div>
      <div>
        <h3 style={{ margin: "0 0 4px", fontSize: 15, fontWeight: 700, color: "#0F172A", lineHeight: 1.4 }}>{opp.title}</h3>
        <p style={{ margin: 0, fontSize: 13, color: "#64748B", lineHeight: 1.5 }}>{opp.description}</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, fontSize: 12, color: "#64748B" }}>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 14 }}>{opp.mode === "virtual" ? "🌐" : "📍"}</span>{opp.mode === "virtual" ? "Virtual" : "In-Person"}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
          <span style={{ fontSize: 14 }}>🎓</span>Grades {Math.min(...opp.grades)}–{Math.max(...opp.grades)}
        </span>
        <span style={{ display: "flex", alignItems: "center", gap: 4, color: urgency, fontWeight: 600 }}>
          <span style={{ fontSize: 14 }}>⏰</span>{daysLeft > 0 ? `${daysLeft}d left` : "Closed"}
        </span>
      </div>
      <a href={opp.link} style={{ marginTop: 4, display: "inline-block", background: "linear-gradient(135deg,#6366F1,#8B5CF6)", color: "#fff", fontSize: 13, fontWeight: 600, padding: "8px 16px", borderRadius: 10, textDecoration: "none", textAlign: "center", transition: "opacity .15s" }}
        onMouseEnter={e => e.currentTarget.style.opacity = "0.85"} onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
        Apply Now →
      </a>
    </div>
  );
}

function SubmitForm({ onClose }) {
  const [form, setForm] = useState({ title: "", category: "coding", grades: "", mode: "virtual", deadline: "", paid: false, description: "", link: "" });
  const [submitted, setSubmitted] = useState(false);
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  if (submitted) return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🎉</div>
      <h3 style={{ margin: "0 0 8px", color: "#0F172A" }}>Opportunity submitted!</h3>
      <p style={{ color: "#64748B", margin: "0 0 20px" }}>We'll review and publish it within 24 hours.</p>
      <button onClick={onClose} style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 10, fontWeight: 600, cursor: "pointer" }}>Back to opportunities</button>
    </div>
  );
  const inp = { width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", boxSizing: "border-box", fontFamily: "inherit" };
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0F172A" }}>Submit an Opportunity</h2>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#94A3B8" }}>✕</button>
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        <div><label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Title *</label>
          <input style={inp} value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Google CS First Scholarship" /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Category *</label>
            <select style={inp} value={form.category} onChange={e => set("category", e.target.value)}>
              {["finance","coding","business","volunteering"].map(c => <option key={c}>{c}</option>)}
            </select></div>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Mode *</label>
            <select style={inp} value={form.mode} onChange={e => set("mode", e.target.value)}>
              <option value="virtual">Virtual</option><option value="in-person">In-Person</option>
            </select></div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Grade range *</label>
            <input style={inp} value={form.grades} onChange={e => set("grades", e.target.value)} placeholder="e.g. 9-12" /></div>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Deadline *</label>
            <input style={inp} type="date" value={form.deadline} onChange={e => set("deadline", e.target.value)} /></div>
        </div>
        <div><label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Description *</label>
          <textarea style={{ ...inp, minHeight: 80, resize: "vertical" }} value={form.description} onChange={e => set("description", e.target.value)} placeholder="Brief description of the opportunity..." /></div>
        <div><label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 4 }}>Application Link *</label>
          <input style={inp} value={form.link} onChange={e => set("link", e.target.value)} placeholder="https://..." /></div>
        <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", fontSize: 14, color: "#374151" }}>
          <input type="checkbox" checked={form.paid} onChange={e => set("paid", e.target.checked)} style={{ width: 16, height: 16 }} />
          This opportunity includes payment / stipend
        </label>
        <button onClick={() => { if (form.title && form.description && form.link) setSubmitted(true); }}
          style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)", color: "#fff", border: "none", padding: "12px", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer", marginTop: 4 }}>
          Submit Opportunity 🚀
        </button>
      </div>
    </div>
  );
}

function AlertsModal({ onClose }) {
  const [email, setEmail] = useState("");
  const [cats, setCats] = useState([]);
  const [done, setDone] = useState(false);
  const toggle = c => setCats(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev, c]);
  if (done) return (
    <div style={{ textAlign: "center", padding: "2rem" }}>
      <div style={{ fontSize: 48, marginBottom: 12 }}>🔔</div>
      <h3 style={{ margin: "0 0 8px", color: "#0F172A" }}>You're on the list!</h3>
      <p style={{ color: "#64748B", margin: "0 0 20px" }}>We'll email you new opportunities every week.</p>
      <button onClick={onClose} style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)", color: "#fff", border: "none", padding: "10px 24px", borderRadius: 10, fontWeight: 600, cursor: "pointer" }}>Done</button>
    </div>
  );
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <h2 style={{ margin: 0, fontSize: 20, fontWeight: 700, color: "#0F172A" }}>Get Opportunity Alerts</h2>
        <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 22, cursor: "pointer", color: "#94A3B8" }}>✕</button>
      </div>
      <div style={{ background: "linear-gradient(135deg,#EEF2FF,#F5F3FF)", borderRadius: 12, padding: "1rem", marginBottom: 16 }}>
        <div style={{ display: "flex", gap: 12 }}>
          <div style={{ flex: 1 }}>
            <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 14, color: "#4338CA" }}>🆓 Free</p>
            <ul style={{ margin: 0, padding: "0 0 0 16px", fontSize: 13, color: "#4B5563", lineHeight: 2 }}>
              <li>Browse all opportunities</li>
              <li>Search & filter</li>
              <li>Submit opportunities</li>
            </ul>
          </div>
          <div style={{ flex: 1, background: "linear-gradient(135deg,#6366F1,#8B5CF6)", borderRadius: 10, padding: "0.75rem" }}>
            <p style={{ margin: "0 0 6px", fontWeight: 700, fontSize: 14, color: "#fff" }}>⚡ Pro — $4.99/mo</p>
            <ul style={{ margin: 0, padding: "0 0 0 16px", fontSize: 13, color: "#E0E7FF", lineHeight: 2 }}>
              <li>Weekly email digest</li>
              <li>Discord alerts</li>
              <li>Category-based alerts</li>
              <li>Deadline reminders</li>
            </ul>
          </div>
        </div>
      </div>
      <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", margin: "0 0 8px" }}>Alert categories</p>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 16 }}>
        {["finance","coding","business","volunteering","paid only","virtual only","scholarships"].map(c => (
          <button key={c} onClick={() => toggle(c)} style={{ padding: "6px 14px", borderRadius: 999, border: "1.5px solid", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all .15s", borderColor: cats.includes(c) ? "#6366F1" : "#E2E8F0", background: cats.includes(c) ? "#EEF2FF" : "#fff", color: cats.includes(c) ? "#4338CA" : "#64748B" }}>{c}</button>
        ))}
      </div>
      <input value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com" style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", boxSizing: "border-box", marginBottom: 12, fontFamily: "inherit" }} />
      <button onClick={() => { if (email) setDone(true); }} style={{ width: "100%", background: "linear-gradient(135deg,#6366F1,#8B5CF6)", color: "#fff", border: "none", padding: "12px", borderRadius: 10, fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
        Start Free Trial 🔔
      </button>
    </div>
  );
}

export default function App() {
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const [mode, setMode] = useState("all");
  const [grade, setGrade] = useState("all");
  const [modal, setModal] = useState(null); // "submit" | "alerts" | null
  const [paidOnly, setPaidOnly] = useState(false);

  const filtered = useMemo(() => OPPORTUNITIES.filter(o => {
    const q = search.toLowerCase();
    const matchSearch = !q || o.title.toLowerCase().includes(q) || o.category.includes(q) || o.description.toLowerCase().includes(q);
    const matchCat = cat === "all" || o.category === cat;
    const matchMode = mode === "all" || o.mode === mode;
    const matchGrade = grade === "all" || o.grades.includes(Number(grade));
    const matchPaid = !paidOnly || o.paid;
    return matchSearch && matchCat && matchMode && matchGrade && matchPaid;
  }), [search, cat, mode, grade, paidOnly]);

  const featured = filtered.filter(o => o.featured);
  const regular = filtered.filter(o => !o.featured);

  const selBtn = (active) => ({
    padding: "7px 16px", borderRadius: 999, border: "1.5px solid", fontSize: 13, fontWeight: 500, cursor: "pointer", transition: "all .15s",
    background: active ? "#6366F1" : "#fff", color: active ? "#fff" : "#64748B", borderColor: active ? "#6366F1" : "#E2E8F0"
  });

  return (
    <div style={{ fontFamily: "'DM Sans', 'Segoe UI', sans-serif", background: "#F8FAFC", minHeight: "100vh" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg,#4F46E5 0%,#7C3AED 60%,#A855F7 100%)", padding: "2.5rem 1.5rem 3.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(255,255,255,0.07) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(255,255,255,0.05) 0%, transparent 40%)" }} />
        <div style={{ position: "relative" }}>
          <span style={{ background: "rgba(255,255,255,0.15)", color: "#fff", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 999, letterSpacing: "0.08em", display: "inline-block", marginBottom: 14 }}>FOR STUDENTS, BY STUDENTS</span>
          <h1 style={{ margin: "0 0 10px", fontSize: "clamp(26px,5vw,42px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15 }}>Find Your Next Opportunity</h1>
          <p style={{ margin: "0 0 24px", color: "rgba(255,255,255,0.8)", fontSize: 16, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            {OPPORTUNITIES.length} curated programs, internships & competitions for high school students
          </p>
          <div style={{ display: "flex", gap: 10, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => setModal("alerts")} style={{ background: "#fff", color: "#4F46E5", border: "none", padding: "11px 22px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>🔔 Get Alerts</button>
            <button onClick={() => setModal("submit")} style={{ background: "rgba(255,255,255,0.15)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.35)", padding: "11px 22px", borderRadius: 12, fontWeight: 700, fontSize: 14, cursor: "pointer" }}>+ Submit Opportunity</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1rem 3rem" }}>
        {/* Search + filters */}
        <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #F1F5F9", padding: "1.25rem", marginTop: -28, boxShadow: "0 4px 24px rgba(0,0,0,0.07)", marginBottom: 24 }}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="🔍  Search finance, coding, scholarships, volunteering..."
            style={{ width: "100%", padding: "12px 16px", borderRadius: 12, border: "1.5px solid #E2E8F0", fontSize: 15, outline: "none", boxSizing: "border-box", marginBottom: 14, fontFamily: "inherit", background: "#F8FAFC" }} />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Category:</span>
            {CATEGORIES.map(c => <button key={c} onClick={() => setCat(c)} style={selBtn(cat === c)}>{c === "all" ? "All" : c}</button>)}
            <span style={{ fontSize: 12, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em", marginLeft: 8 }}>Mode:</span>
            {["all","virtual","in-person"].map(m => <button key={m} onClick={() => setMode(m)} style={selBtn(mode === m)}>{m === "all" ? "All" : m === "virtual" ? "🌐 Virtual" : "📍 In-Person"}</button>)}
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center", marginTop: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 600, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.06em" }}>Grade:</span>
            {["all", ...GRADES].map(g => <button key={g} onClick={() => setGrade(String(g))} style={selBtn(String(grade) === String(g))}>{g === "all" ? "All" : `Grade ${g}`}</button>)}
            <button onClick={() => setPaidOnly(p => !p)} style={{ ...selBtn(paidOnly), marginLeft: 8 }}>💰 Paid only</button>
          </div>
        </div>

        {/* Results count */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
          <p style={{ margin: 0, fontSize: 14, color: "#64748B" }}><strong style={{ color: "#0F172A" }}>{filtered.length}</strong> opportunities found</p>
          <button onClick={() => { setSearch(""); setCat("all"); setMode("all"); setGrade("all"); setPaidOnly(false); }} style={{ background: "none", border: "none", fontSize: 13, color: "#6366F1", cursor: "pointer", fontWeight: 600 }}>Clear filters</button>
        </div>

        {/* Featured */}
        {featured.length > 0 && (
          <>
            <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 700, color: "#6366F1", textTransform: "uppercase", letterSpacing: "0.08em" }}>⭐ Featured</p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14, marginBottom: 24 }}>
              {featured.map(o => <OpportunityCard key={o.id} opp={o} />)}
            </div>
          </>
        )}

        {/* All */}
        {regular.length > 0 && (
          <>
            {featured.length > 0 && <p style={{ margin: "0 0 10px", fontSize: 12, fontWeight: 700, color: "#64748B", textTransform: "uppercase", letterSpacing: "0.08em" }}>All Opportunities</p>}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(260px,1fr))", gap: 14 }}>
              {regular.map(o => <OpportunityCard key={o.id} opp={o} />)}
            </div>
          </>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: "center", padding: "3rem", color: "#94A3B8" }}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
            <p style={{ fontSize: 16, fontWeight: 600, color: "#64748B" }}>No opportunities match your filters.</p>
            <p style={{ fontSize: 14 }}>Try adjusting your search or <button onClick={() => setModal("submit")} style={{ background: "none", border: "none", color: "#6366F1", fontWeight: 600, cursor: "pointer", fontSize: 14 }}>submit a new one</button>.</p>
          </div>
        )}
      </div>

      {/* Modal */}
      {modal && (
        <div onClick={e => { if (e.target === e.currentTarget) setModal(null); }} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 100, padding: "1rem" }}>
          <div style={{ background: "#fff", borderRadius: 20, padding: "1.5rem", width: "100%", maxWidth: 480, maxHeight: "90vh", overflowY: "auto", boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>
            {modal === "submit" && <SubmitForm onClose={() => setModal(null)} />}
            {modal === "alerts" && <AlertsModal onClose={() => setModal(null)} />}
          </div>
        </div>
      )}
    </div>
  );
}
