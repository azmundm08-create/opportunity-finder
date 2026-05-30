import { useState, useEffect } from "react";
import { NEWS_ARTICLES, STUDENT_SPOTLIGHTS, UPCOMING_DEADLINES_TICKER, NEWS_CATEGORIES, CAT_COLORS_NEWS } from "../data/news";

export default function NewsPage({ isPro, onUpgrade }) {
  const [category, setCategory] = useState("all");
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [tickerPos, setTickerPos] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTickerPos(p => (p + 1) % UPCOMING_DEADLINES_TICKER.length), 3000);
    return () => clearInterval(t);
  }, []);

  const filtered = NEWS_ARTICLES.filter(a => category === "all" || a.category === category);
  const featured = filtered.filter(a => a.featured);
  const regular = filtered.filter(a => !a.featured);
  const spotlight = STUDENT_SPOTLIGHTS[spotlightIdx];

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:"#F8FAFC", minHeight:"100vh" }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#0F172A 0%,#1E3A5F 60%,#1E40AF 100%)", padding:"2.5rem 1.5rem 3.5rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 20% 50%, rgba(59,130,246,0.15) 0%, transparent 50%)" }} />
        <div style={{ position:"relative" }}>
          <span style={{ background:"rgba(59,130,246,0.2)", color:"#93C5FD", fontSize:12, fontWeight:700, padding:"4px 14px", borderRadius:999, letterSpacing:"0.08em", display:"inline-block", marginBottom:14 }}>STUDENT NEWS & UPDATES</span>
          <h1 style={{ margin:"0 0 10px", fontSize:"clamp(24px,5vw,42px)", fontWeight:800, color:"#fff", letterSpacing:"-0.02em" }}>What's Happening 📰</h1>
          <p style={{ margin:"0 0 20px", color:"rgba(255,255,255,0.65)", fontSize:15, maxWidth:480, marginLeft:"auto", marginRight:"auto" }}>Stay up to date on college admissions, scholarships, opportunities, and student success stories</p>
        </div>
      </div>

      {/* Deadline ticker */}
      <div style={{ background:"#1E3A5F", padding:"10px 1.5rem", display:"flex", alignItems:"center", gap:12, overflow:"hidden" }}>
        <span style={{ background:"#3B82F6", color:"#fff", fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:999, whiteSpace:"nowrap", flexShrink:0 }}>UPCOMING</span>
        <p style={{ margin:0, fontSize:13, color:"#93C5FD", fontWeight:500, transition:"all .5s" }}>{UPCOMING_DEADLINES_TICKER[tickerPos]}</p>
      </div>

      <div style={{ maxWidth:960, margin:"0 auto", padding:"0 1rem 3rem" }}>
        {/* Category filters */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", margin:"20px 0 24px", alignItems:"center" }}>
          <span style={{ fontSize:12, fontWeight:700, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.06em" }}>Filter:</span>
          {NEWS_CATEGORIES.map(c=>(
            <button key={c} onClick={()=>setCategory(c)} style={{ padding:"6px 16px", borderRadius:999, border:"1.5px solid", fontSize:13, fontWeight:500, cursor:"pointer", background:category===c?"#1E3A5F":"#fff", color:category===c?"#fff":"#64748B", borderColor:category===c?"#1E3A5F":"#E2E8F0", textTransform:"capitalize" }}>{c==="all"?"All Topics":c}</button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:24, alignItems:"start" }}>
          {/* Main content */}
          <div>
            {/* Featured articles */}
            {featured.length>0 && (
              <div style={{ marginBottom:24 }}>
                <p style={{ margin:"0 0 12px", fontSize:12, fontWeight:700, color:"#1E3A5F", textTransform:"uppercase", letterSpacing:"0.08em" }}>⭐ Featured Stories</p>
                <div style={{ display:"grid", gap:14 }}>
                  {featured.map(a=>(
                    <a key={a.id} href={a.link} target="_blank" rel="noopener noreferrer" style={{ background:"linear-gradient(135deg,#1E3A5F,#1E40AF)", borderRadius:16, padding:"1.5rem", textDecoration:"none", display:"block", transition:"transform .2s", position:"relative", overflow:"hidden" }}
                      onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                      onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                        <span style={{ background:"rgba(255,255,255,0.15)", color:"#fff", fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:999 }}>{a.tag}</span>
                        <span style={{ color:"rgba(255,255,255,0.5)", fontSize:12 }}>{a.date} · {a.readTime} read</span>
                      </div>
                      <h3 style={{ margin:"0 0 8px", fontSize:18, fontWeight:700, color:"#fff", lineHeight:1.4 }}>{a.title}</h3>
                      <p style={{ margin:"0 0 10px", fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.6 }}>{a.summary}</p>
                      <span style={{ fontSize:12, color:"#93C5FD", fontWeight:600 }}>Read on {a.source} →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Regular articles */}
            <p style={{ margin:"0 0 12px", fontSize:12, fontWeight:700, color:"#64748B", textTransform:"uppercase", letterSpacing:"0.08em" }}>Latest Stories</p>
            <div style={{ display:"grid", gap:12 }}>
              {regular.map(a=>{
                const cc = CAT_COLORS_NEWS[a.category]||{ bg:"#F1F5F9", text:"#475569" };
                return (
                  <a key={a.id} href={a.link} target="_blank" rel="noopener noreferrer" style={{ background:"#fff", border:"1.5px solid #F1F5F9", borderRadius:14, padding:"1rem 1.25rem", textDecoration:"none", display:"block", transition:"all .2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.borderColor="#3B82F6"; e.currentTarget.style.transform="translateY(-1px)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor="#F1F5F9"; e.currentTarget.style.transform="none"; }}>
                    <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                          <span style={{ background:cc.bg, color:cc.text, fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:999 }}>{a.tag}</span>
                          <span style={{ color:"#94A3B8", fontSize:12 }}>{a.date} · {a.readTime} read</span>
                        </div>
                        <h3 style={{ margin:"0 0 6px", fontSize:15, fontWeight:700, color:"#0F172A", lineHeight:1.4 }}>{a.title}</h3>
                        <p style={{ margin:"0 0 8px", fontSize:13, color:"#64748B", lineHeight:1.5 }}>{a.summary}</p>
                        <span style={{ fontSize:12, color:"#3B82F6", fontWeight:600 }}>Read on {a.source} →</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Pro personalized feed teaser */}
            {!isPro && (
              <div style={{ marginTop:20, background:"linear-gradient(135deg,#EEF2FF,#F5F3FF)", border:"1px solid #C7D2FE", borderRadius:14, padding:"1.25rem", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
                <div>
                  <p style={{ margin:"0 0 2px", fontWeight:700, fontSize:14, color:"#4338CA" }}>🤖 Personalized news feed — Pro feature</p>
                  <p style={{ margin:0, fontSize:12, color:"#6366F1" }}>Get articles tailored to your interests, grade, and saved opportunities. Coming soon for Pro members.</p>
                </div>
                <button onClick={onUpgrade} style={{ background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"10px 20px", borderRadius:10, fontWeight:700, fontSize:13, cursor:"pointer", whiteSpace:"nowrap" }}>Upgrade — $4.99/mo</button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display:"grid", gap:16 }}>
            {/* Student Spotlight */}
            <div style={{ background:"#fff", border:"1.5px solid #F1F5F9", borderRadius:16, padding:"1.25rem" }}>
              <p style={{ margin:"0 0 14px", fontSize:13, fontWeight:700, color:"#0F172A", display:"flex", alignItems:"center", gap:6 }}>🌟 Student Spotlight</p>
              <div style={{ background:"linear-gradient(135deg,#EEF2FF,#F5F3FF)", borderRadius:12, padding:"1rem", marginBottom:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#6366F1,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:16, flexShrink:0 }}>{spotlight.name[0]}</div>
                  <div>
                    <p style={{ margin:0, fontSize:14, fontWeight:700, color:"#0F172A" }}>{spotlight.name}</p>
                    <p style={{ margin:0, fontSize:12, color:"#6366F1" }}>{spotlight.grade} · {spotlight.location}</p>
                  </div>
                </div>
                <p style={{ margin:"0 0 8px", fontSize:13, fontWeight:600, color:"#0F172A" }}>{spotlight.achievement}</p>
                <p style={{ margin:0, fontSize:12, color:"#64748B", lineHeight:1.5, fontStyle:"italic" }}>"{spotlight.tip}"</p>
              </div>
              <div style={{ display:"flex", gap:6, justifyContent:"center" }}>
                {STUDENT_SPOTLIGHTS.map((_,i)=>(
                  <button key={i} onClick={()=>setSpotlightIdx(i)} style={{ width:8, height:8, borderRadius:"50%", background:i===spotlightIdx?"#6366F1":"#E2E8F0", border:"none", cursor:"pointer", padding:0 }} />
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div style={{ background:"#fff", border:"1.5px solid #F1F5F9", borderRadius:16, padding:"1.25rem" }}>
              <p style={{ margin:"0 0 12px", fontSize:13, fontWeight:700, color:"#0F172A" }}>📊 This Week on StudentRise</p>
              {[["🔍","New opportunities added","8"],["👥","Students on waitlist","—"],["📝","Applications submitted","—"],["🎓","Programs featured","50+"]].map(([icon,label,val])=>(
                <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderTop:"1px solid #F8FAFC" }}>
                  <span style={{ fontSize:13, color:"#64748B" }}>{icon} {label}</span>
                  <span style={{ fontSize:14, fontWeight:700, color:"#0F172A" }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Newsletter signup */}
            <div style={{ background:"linear-gradient(135deg,#1E3A5F,#1E40AF)", borderRadius:16, padding:"1.25rem" }}>
              <p style={{ margin:"0 0 4px", fontSize:14, fontWeight:700, color:"#fff" }}>📬 Weekly Digest</p>
              <p style={{ margin:"0 0 12px", fontSize:12, color:"rgba(255,255,255,0.7)" }}>Get the best opportunities and news every Monday</p>
              <button onClick={onUpgrade} style={{ width:"100%", background:"#fff", color:"#1E3A5F", border:"none", padding:"10px", borderRadius:10, fontWeight:700, fontSize:13, cursor:"pointer" }}>⚡ Join Pro for Weekly Digest</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
