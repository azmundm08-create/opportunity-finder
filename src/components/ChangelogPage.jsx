import { CHANGELOG, COMING_SOON_FEATURES } from "../data/changelog";

export default function ChangelogPage({ onUpgrade }) {
  const TYPE_STYLES = {
    new: { bg:"#DCFCE7", text:"#15803D", label:"New" },
    improve: { bg:"#EDE9FE", text:"#6D28D9", label:"Improved" },
    fix: { bg:"#FEF3C7", text:"#92400E", label:"Fixed" },
  };

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:"#F8FAFC", minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(135deg,#0F172A 0%,#1E293B 60%,#334155 100%)", padding:"2.5rem 1.5rem 3.5rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 80% 20%, rgba(99,102,241,0.1) 0%, transparent 40%)" }} />
        <div style={{ position:"relative" }}>
          <span style={{ background:"rgba(99,102,241,0.2)", color:"#A5B4FC", fontSize:12, fontWeight:700, padding:"4px 14px", borderRadius:999, letterSpacing:"0.08em", display:"inline-block", marginBottom:14 }}>PLATFORM UPDATES</span>
          <h1 style={{ margin:"0 0 10px", fontSize:"clamp(24px,5vw,42px)", fontWeight:800, color:"#fff", letterSpacing:"-0.02em" }}>What's New 📣</h1>
          <p style={{ margin:0, color:"rgba(255,255,255,0.6)", fontSize:15, maxWidth:480, marginLeft:"auto", marginRight:"auto" }}>Every update, improvement, and new feature we've shipped — and what's coming next</p>
        </div>
      </div>

      <div style={{ maxWidth:800, margin:"0 auto", padding:"0 1rem 3rem" }}>
        {/* Pro Coming Soon Golden Box */}
        <div style={{ background:"linear-gradient(135deg,#FFFBEB,#FEF3C7)", border:"2px solid #F59E0B", borderRadius:16, padding:"1.25rem", marginTop:24, marginBottom:16, boxShadow:"0 4px 24px rgba(245,158,11,0.2)" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                <span style={{ fontSize:22 }}>⚡</span>
                <p style={{ margin:0, fontSize:18, fontWeight:800, color:"#92400E" }}>Pro is coming soon!</p>
                <span style={{ background:"#EF4444", color:"#fff", fontSize:10, fontWeight:800, padding:"2px 8px", borderRadius:999 }}>LAUNCHING SOON</span>
              </div>
              <p style={{ margin:"0 0 8px", fontSize:13, color:"#B45309" }}>$4.99/mo — Save opportunities, track applications, AI match scores, and much more</p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {["🔖 Save opportunities","📋 App tracker","🤖 AI match scores","📧 Weekly digest","⚡ Early access","🎓 Essay helper"].map(f=>(
                  <span key={f} style={{ background:"rgba(245,158,11,0.15)", color:"#92400E", fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:999 }}>{f}</span>
                ))}
              </div>
            </div>
            <button onClick={onUpgrade} style={{ background:"linear-gradient(135deg,#F59E0B,#EF4444)", color:"#fff", border:"none", padding:"12px 24px", borderRadius:12, fontWeight:800, fontSize:14, cursor:"pointer", boxShadow:"0 4px 16px rgba(245,158,11,0.4)", whiteSpace:"nowrap", flexShrink:0 }}>
              Join Waitlist ⚡
            </button>
          </div>
        </div>

        {/* Coming soon section */}
        <div style={{ background:"#fff", border:"1.5px solid #F1F5F9", borderRadius:20, padding:"1.5rem", marginBottom:24, boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:8 }}>
            <p style={{ margin:0, fontSize:16, fontWeight:700, color:"#0F172A" }}>🔮 Coming Soon</p>
            <button onClick={onUpgrade} style={{ background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"8px 16px", borderRadius:10, fontWeight:700, fontSize:12, cursor:"pointer" }}>⚡ Pro members get early access</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:10 }}>
            {COMING_SOON_FEATURES.map(f=>(
              <div key={f.title} style={{ background:"#F8FAFC", border:"1px solid #F1F5F9", borderRadius:12, padding:"12px 14px", display:"flex", gap:10, alignItems:"flex-start" }}>
                <span style={{ fontSize:20, flexShrink:0 }}>{f.icon}</span>
                <div>
                  <p style={{ margin:"0 0 2px", fontSize:13, fontWeight:700, color:"#0F172A" }}>{f.title}</p>
                  <p style={{ margin:"0 0 4px", fontSize:11, color:"#64748B", lineHeight:1.4 }}>{f.desc}</p>
                  <span style={{ fontSize:10, fontWeight:700, color:"#6366F1", background:"#EEF2FF", padding:"1px 6px", borderRadius:999 }}>{f.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Version history */}
        <p style={{ margin:"0 0 16px", fontSize:12, fontWeight:700, color:"#64748B", textTransform:"uppercase", letterSpacing:"0.08em" }}>Version History</p>
        <div style={{ display:"grid", gap:16 }}>
          {CHANGELOG.map((v,i)=>(
            <div key={v.version} style={{ background:"#fff", border:"1.5px solid #F1F5F9", borderRadius:16, padding:"1.25rem", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <span style={{ fontSize:16, fontWeight:800, color:"#0F172A" }}>{v.version}</span>
                {v.label && <span style={{ background:v.labelColor+"20", color:v.labelColor, fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:999 }}>{v.label}</span>}
                <span style={{ fontSize:12, color:"#94A3B8", marginLeft:"auto" }}>{v.date}</span>
              </div>
              <div style={{ display:"grid", gap:8 }}>
                {v.changes.map((c,j)=>{
                  const s = TYPE_STYLES[c.type]||TYPE_STYLES.new;
                  return (
                    <div key={j} style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
                      <span style={{ background:s.bg, color:s.text, fontSize:10, fontWeight:700, padding:"2px 6px", borderRadius:999, flexShrink:0, marginTop:2 }}>{s.label}</span>
                      <p style={{ margin:0, fontSize:13, color:"#374151", lineHeight:1.5 }}>{c.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
