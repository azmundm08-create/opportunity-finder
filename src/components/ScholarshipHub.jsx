import { useState } from "react";
import ScholarshipCard from "./ScholarshipCard";
import { SCHOLARSHIPS, SCHOLARSHIP_CATEGORIES, SCHOLARSHIP_DEMOGRAPHICS, SCHOLARSHIP_MAJORS, APP_STATUS_SCHOLARSHIP, STATUS_COLORS_SCHOLARSHIP, GPA_OPTIONS } from "../data/scholarships";

export default function ScholarshipHub({ isPro, onUpgrade }) {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [demographic, setDemographic] = useState("any");
  const [major, setMajor] = useState("Any");
  const [gpa, setGpa] = useState("any");
  const [minAmount, setMinAmount] = useState("");
  const [deadline, setDeadline] = useState("all");
  const [scholarshipStatuses, setScholarshipStatuses] = useState({});
  const [savedScholarships, setSavedScholarships] = useState([]);
  const [activeTab, setActiveTab] = useState("find");
  const [filtersOpen, setFiltersOpen] = useState(false);

  const GPA_RANK = { "none":0,"2.0+":2.0,"2.5+":2.5,"3.0+":3.0,"3.3+":3.3,"3.5+":3.5,"3.7+":3.7 };
  const DEADLINE_FILTERS = [{ label:"Any time", value:"all" },{ label:"Next 30 days", value:"30" },{ label:"Next 3 months", value:"90" },{ label:"Next 6 months", value:"180" }];

  const filtered = SCHOLARSHIPS.filter(s=>{
    const q = search.toLowerCase();
    const daysLeft = Math.ceil((new Date(s.deadline)-new Date())/86400000);
    const matchSearch = !q||s.title.toLowerCase().includes(q)||s.organization.toLowerCase().includes(q)||s.description.toLowerCase().includes(q)||s.tags.some(t=>t.toLowerCase().includes(q));
    const matchCat = category==="all"||s.category===category;
    const matchDemo = demographic==="any"||s.demographics.includes("any")||s.demographics.includes(demographic);
    const matchMajor = major==="Any"||s.major==="Any"||s.major===major;
    const matchGpa = gpa==="any"||(GPA_RANK[s.gpaReq]||0)<=(GPA_RANK[gpa]||0)||s.gpaReq==="none";
    const matchAmount = !minAmount||s.amount>=Number(minAmount);
    const matchDeadline = deadline==="all"||(daysLeft>0&&daysLeft<=Number(deadline));
    return matchSearch&&matchCat&&matchDemo&&matchMajor&&matchGpa&&matchAmount&&matchDeadline;
  });

  const featured = filtered.filter(s=>s.featured);
  const regular = filtered.filter(s=>!s.featured);

  const toggleSave = (id) => setSavedScholarships(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  const setStatus = (id, status) => {
    setScholarshipStatuses(prev=>{ const n={...prev}; if(status===null) delete n[id]; else n[id]=status; return n; });
    if (status && !savedScholarships.includes(id)) setSavedScholarships(prev=>[...prev,id]);
  };

  const tracked = SCHOLARSHIPS.filter(s=>scholarshipStatuses[s.id]);
  const byStatus = APP_STATUS_SCHOLARSHIP.reduce((acc,s)=>{ acc[s]=tracked.filter(x=>scholarshipStatuses[x.id]===s); return acc; },{});

  const selBtn = (active)=>({ padding:"6px 14px", borderRadius:999, border:"1.5px solid", fontSize:12, fontWeight:500, cursor:"pointer", whiteSpace:"nowrap", background:active?"#6366F1":"#fff", color:active?"#fff":"#64748B", borderColor:active?"#6366F1":"#E2E8F0" });
  const inp = { padding:"8px 12px", borderRadius:10, border:"1.5px solid #E2E8F0", fontSize:13, outline:"none", fontFamily:"inherit", background:"#fff" };

  const tabs = [
    { id:"find", icon:"🔍", label:"Find Scholarships" },
    { id:"tracker", icon:"📋", label:"My Tracker" },
    { id:"essay", icon:"✍️", label:"Essay Helper" },
  ];

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:"#F8FAFC", minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(135deg,#064E3B 0%,#065F46 60%,#047857 100%)", padding:"2.5rem 1.5rem 3.5rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 20% 50%, rgba(255,255,255,0.07) 0%, transparent 50%)" }} />
        <div style={{ position:"relative" }}>
          <span style={{ background:"rgba(255,255,255,0.15)", color:"#fff", fontSize:12, fontWeight:700, padding:"4px 14px", borderRadius:999, letterSpacing:"0.08em", display:"inline-block", marginBottom:14 }}>SCHOLARSHIP HUB</span>
          <h1 style={{ margin:"0 0 10px", fontSize:"clamp(24px,5vw,42px)", fontWeight:800, color:"#fff", letterSpacing:"-0.02em" }}>Find Your Scholarship 🎓</h1>
          <p style={{ margin:"0 0 20px", color:"rgba(255,255,255,0.75)", fontSize:15, maxWidth:480, marginLeft:"auto", marginRight:"auto" }}>{SCHOLARSHIPS.length} scholarships worth millions of dollars — find the ones you qualify for</p>
          <div style={{ display:"inline-flex", gap:20, background:"rgba(255,255,255,0.12)", borderRadius:16, padding:"12px 24px", flexWrap:"wrap", justifyContent:"center" }}>
            <div style={{ textAlign:"center" }}>
              <p style={{ margin:"0 0 2px", fontSize:28, fontWeight:800, color:"#fff" }}>{SCHOLARSHIPS.length}</p>
              <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.7)" }}>scholarships listed</p>
            </div>
            <div style={{ width:1, background:"rgba(255,255,255,0.2)" }} />
            <div style={{ textAlign:"center" }}>
              <p style={{ margin:"0 0 2px", fontSize:28, fontWeight:800, color:"#fff" }}>{tracked.length}</p>
              <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.7)" }}>being tracked</p>
            </div>
            <div style={{ width:1, background:"rgba(255,255,255,0.2)" }} />
            <div style={{ textAlign:"center" }}>
              <p style={{ margin:"0 0 2px", fontSize:28, fontWeight:800, color:"#FCD34D" }}>${(SCHOLARSHIPS.reduce((sum,s)=>sum+(s.amount>100000?100000:s.amount),0)/1000).toFixed(0)}K+</p>
              <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.7)" }}>in available awards</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:960, margin:"0 auto", padding:"0 1rem 3rem" }}>
        <div style={{ display:"flex", gap:4, background:"#fff", borderRadius:16, border:"1.5px solid #F1F5F9", padding:4, marginTop:16, boxShadow:"0 4px 24px rgba(0,0,0,0.07)", marginBottom:24, overflowX:"auto" }}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setActiveTab(t.id)} style={{ padding:"9px 18px", borderRadius:10, border:"none", fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:5, whiteSpace:"nowrap", flex:1, justifyContent:"center", background:activeTab===t.id?"linear-gradient(135deg,#047857,#059669)":"transparent", color:activeTab===t.id?"#fff":"#64748B", boxShadow:activeTab===t.id?"0 2px 8px rgba(5,150,105,0.3)":"none" }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* FIND SCHOLARSHIPS */}
        {activeTab==="find" && (
          <div>
            <div style={{ background:"#fff", borderRadius:20, border:"1.5px solid #F1F5F9", padding:"1.25rem", boxShadow:"0 2px 12px rgba(0,0,0,0.04)", marginBottom:20 }}>
              <div style={{ display:"flex", gap:10, marginBottom:12 }}>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search scholarships by name, organization, or keyword..."
                  style={{ flex:1, padding:"12px 16px", borderRadius:12, border:"1.5px solid #E2E8F0", fontSize:14, outline:"none", fontFamily:"inherit", background:"#F8FAFC" }} />
                <button onClick={()=>setFiltersOpen(f=>!f)} style={{ padding:"10px 16px", borderRadius:12, border:"1.5px solid", fontSize:13, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", background:filtersOpen?"#047857":"#fff", color:filtersOpen?"#fff":"#374151", borderColor:filtersOpen?"#047857":"#E2E8F0" }}>
                  🎛 Filters
                </button>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                <span style={{ fontSize:11, fontWeight:700, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.06em", alignSelf:"center" }}>Category:</span>
                {SCHOLARSHIP_CATEGORIES.map(c=><button key={c} onClick={()=>setCategory(c)} style={selBtn(category===c)}>{c==="all"?"All":c==="stem"?"STEM":c==="need"?"Need-Based":c==="merit"?"Merit":c==="arts"?"Arts":"Service"}</button>)}
              </div>
              {filtersOpen && (
                <div style={{ marginTop:14, paddingTop:14, borderTop:"1px solid #F1F5F9", display:"grid", gap:14 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                    <div>
                      <p style={{ margin:"0 0 6px", fontSize:11, fontWeight:700, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.06em" }}>Demographics</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {SCHOLARSHIP_DEMOGRAPHICS.map(d=><button key={d} onClick={()=>setDemographic(d)} style={selBtn(demographic===d)}>{d==="any"?"Anyone":d}</button>)}
                      </div>
                    </div>
                    <div>
                      <p style={{ margin:"0 0 6px", fontSize:11, fontWeight:700, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.06em" }}>Major / Field</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {SCHOLARSHIP_MAJORS.map(m=><button key={m} onClick={()=>setMajor(m)} style={selBtn(major===m)}>{m}</button>)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
                    <div>
                      <label style={{ fontSize:12, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>My GPA</label>
                      <select value={gpa} onChange={e=>setGpa(e.target.value)} style={{ ...inp, width:"100%", boxSizing:"border-box" }}>
                        <option value="any">Any GPA</option>
                        {GPA_OPTIONS.filter(g=>g!=="none").map(g=><option key={g} value={g}>I have {g}</option>)}
                      </select>
                    </div>
                    <div>
                      <label style={{ fontSize:12, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Min amount ($)</label>
                      <input type="number" value={minAmount} onChange={e=>setMinAmount(e.target.value)} placeholder="e.g. 1000" style={{ ...inp, width:"100%", boxSizing:"border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize:12, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Deadline</label>
                      <select value={deadline} onChange={e=>setDeadline(e.target.value)} style={{ ...inp, width:"100%", boxSizing:"border-box" }}>
                        {DEADLINE_FILTERS.map(d=><option key={d.value} value={d.value}>{d.label}</option>)}
                      </select>
                    </div>
                  </div>
                  <button onClick={()=>{ setCategory("all"); setDemographic("any"); setMajor("Any"); setGpa("any"); setMinAmount(""); setDeadline("all"); setSearch(""); }} style={{ background:"none", border:"1px solid #FECACA", padding:"7px 16px", borderRadius:10, fontSize:13, color:"#EF4444", fontWeight:600, cursor:"pointer", alignSelf:"flex-start" }}>✕ Clear filters</button>
                </div>
              )}
            </div>

            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <p style={{ margin:0, fontSize:14, color:"#64748B" }}><strong style={{ color:"#0F172A" }}>{filtered.length}</strong> of {SCHOLARSHIPS.length} scholarships</p>
            </div>

            {featured.length>0 && (
              <>
                <p style={{ margin:"0 0 10px", fontSize:12, fontWeight:700, color:"#047857", textTransform:"uppercase", letterSpacing:"0.08em" }}>⭐ Featured</p>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14, marginBottom:24 }}>
                  {featured.map(s=><ScholarshipCard key={s.id} scholarship={s} saved={savedScholarships.includes(s.id)} onSave={toggleSave} status={scholarshipStatuses[s.id]} onStatus={setStatus} />)}
                </div>
              </>
            )}
            {regular.length>0 && (
              <>
                {featured.length>0 && <p style={{ margin:"0 0 10px", fontSize:12, fontWeight:700, color:"#64748B", textTransform:"uppercase", letterSpacing:"0.08em" }}>All Scholarships</p>}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
                  {regular.map(s=><ScholarshipCard key={s.id} scholarship={s} saved={savedScholarships.includes(s.id)} onSave={toggleSave} status={scholarshipStatuses[s.id]} onStatus={setStatus} />)}
                </div>
              </>
            )}
            {filtered.length===0 && (
              <div style={{ textAlign:"center", padding:"3rem" }}>
                <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
                <p style={{ fontSize:16, fontWeight:600, color:"#64748B" }}>No scholarships match your filters.</p>
                <button onClick={()=>{ setCategory("all"); setDemographic("any"); setMajor("Any"); setGpa("any"); setMinAmount(""); setDeadline("all"); setSearch(""); }} style={{ marginTop:12, background:"#047857", color:"#fff", border:"none", padding:"10px 20px", borderRadius:10, fontWeight:600, cursor:"pointer" }}>Clear filters</button>
              </div>
            )}
          </div>
        )}

        {/* TRACKER */}
        {activeTab==="tracker" && (
          <div>
            {tracked.length===0 ? (
              <div style={{ textAlign:"center", padding:"3rem" }}>
                <div style={{ fontSize:48, marginBottom:12 }}>📋</div>
                <h2 style={{ margin:"0 0 8px", fontSize:20, fontWeight:700, color:"#0F172A" }}>No scholarships tracked yet</h2>
                <p style={{ color:"#64748B", margin:"0 0 16px", fontSize:14 }}>Click "Track" on any scholarship card to track your application status here.</p>
                <button onClick={()=>setActiveTab("find")} style={{ background:"linear-gradient(135deg,#047857,#059669)", color:"#fff", border:"none", padding:"10px 20px", borderRadius:10, fontWeight:600, cursor:"pointer" }}>Find Scholarships →</button>
              </div>
            ) : (
              <div>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:10, marginBottom:24 }}>
                  {APP_STATUS_SCHOLARSHIP.map(s=>(
                    <div key={s} style={{ background:"#fff", border:`1.5px solid ${STATUS_COLORS_SCHOLARSHIP[s]}30`, borderRadius:12, padding:"0.75rem", textAlign:"center" }}>
                      <p style={{ margin:"0 0 4px", fontSize:22, fontWeight:800, color:STATUS_COLORS_SCHOLARSHIP[s] }}>{byStatus[s].length}</p>
                      <p style={{ margin:0, fontSize:12, color:"#64748B", fontWeight:500 }}>{s}</p>
                    </div>
                  ))}
                </div>
                {APP_STATUS_SCHOLARSHIP.filter(s=>byStatus[s].length>0).map(s=>(
                  <div key={s} style={{ marginBottom:24 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                      <div style={{ width:10, height:10, borderRadius:"50%", background:STATUS_COLORS_SCHOLARSHIP[s] }} />
                      <p style={{ margin:0, fontSize:13, fontWeight:700, color:STATUS_COLORS_SCHOLARSHIP[s], textTransform:"uppercase", letterSpacing:"0.06em" }}>{s} ({byStatus[s].length})</p>
                    </div>
                    <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12 }}>
                      {byStatus[s].map(scholarship=><ScholarshipCard key={scholarship.id} scholarship={scholarship} saved={savedScholarships.includes(scholarship.id)} onSave={toggleSave} status={scholarshipStatuses[scholarship.id]} onStatus={setStatus} />)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ESSAY HELPER */}
        {activeTab==="essay" && (
          <div style={{ maxWidth:680, margin:"0 auto" }}>
            <div style={{ background:"linear-gradient(135deg,#FFFBEB,#FEF3C7)", border:"2px solid #F59E0B", borderRadius:20, padding:"2rem", textAlign:"center", boxShadow:"0 4px 24px rgba(245,158,11,0.15)", marginBottom:20 }}>
              <div style={{ fontSize:48, marginBottom:12 }}>✍️</div>
              <h2 style={{ margin:"0 0 8px", fontSize:22, fontWeight:800, color:"#92400E" }}>AI Essay Helper — Coming Soon</h2>
              <p style={{ color:"#B45309", margin:"0 0 20px", fontSize:14, lineHeight:1.6 }}>Our AI-powered scholarship essay assistant is almost ready. It will help you brainstorm ideas, write compelling drafts, and get detailed feedback on your essays — all tailored to specific scholarships.</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20, textAlign:"left" }}>
                {[["🧠","AI Essay Brainstormer","Generate unique essay angles and ideas based on the scholarship prompt"],["✍️","Draft Generator","Get a full first draft based on your experiences and achievements"],["📝","Essay Feedback","Detailed feedback on structure, tone, and argument strength"],["🎯","Scholarship Matching","AI matches your essay style to what each scholarship is looking for"]].map(([icon,title,desc])=>(
                  <div key={title} style={{ background:"rgba(255,255,255,0.6)", borderRadius:12, padding:"12px" }}>
                    <p style={{ margin:"0 0 4px", fontSize:13, fontWeight:700, color:"#92400E" }}>{icon} {title}</p>
                    <p style={{ margin:0, fontSize:11, color:"#B45309", lineHeight:1.4 }}>{desc}</p>
                  </div>
                ))}
              </div>
              <button onClick={onUpgrade} style={{ background:"linear-gradient(135deg,#F59E0B,#EF4444)", color:"#fff", border:"none", padding:"12px 28px", borderRadius:12, fontWeight:700, fontSize:14, cursor:"pointer", boxShadow:"0 4px 16px rgba(245,158,11,0.4)" }}>
                ⚡ Join Pro Waitlist — Get Early Access
              </button>
            </div>
            <div style={{ background:"#fff", border:"1.5px solid #F1F5F9", borderRadius:16, padding:"1.25rem" }}>
              <p style={{ margin:"0 0 12px", fontSize:14, fontWeight:700, color:"#0F172A" }}>📚 Free Essay Resources</p>
              {[
                { title:"Common Scholarship Essay Prompts & Tips", link:"https://www.fastweb.com/financial-aid/articles/scholarship-essay-tips", source:"Fastweb" },
                { title:"How to Write a Winning Scholarship Essay", link:"https://www.collegeessayguy.com/blog/scholarship-essay", source:"College Essay Guy" },
                { title:"Scholarship Essay Examples That Worked", link:"https://www.scholarships.com/financial-aid/college-scholarships/scholarship-essay-tips/", source:"Scholarships.com" },
              ].map(r=>(
                <a key={r.title} href={r.link} target="_blank" rel="noopener noreferrer" style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"10px 0", borderTop:"1px solid #F8FAFC", textDecoration:"none" }}>
                  <span style={{ fontSize:13, color:"#374151", fontWeight:500 }}>{r.title}</span>
                  <span style={{ fontSize:12, color:"#047857", fontWeight:600, whiteSpace:"nowrap", marginLeft:12 }}>{r.source} →</span>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
