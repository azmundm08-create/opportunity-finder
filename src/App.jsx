import { useState, useMemo, useEffect } from "react";
import { OPPORTUNITIES, CATEGORIES, GRADES, LOCATIONS, DEADLINE_FILTERS, CITIZENSHIP_OPTIONS } from "./data/opportunities";
import OpportunityCard from "./components/OpportunityCard";
import ProGate from "./components/ProGate";
import SavedTab from "./components/SavedTab";
import TrackerTab from "./components/TrackerTab";
import ProfileTab from "./components/ProfileTab";
import SubmitForm from "./components/SubmitForm";
import ProUpgradeModal from "./components/ProUpgradeModal";
import CollegePrepHub from "./components/CollegePrepHub";
import StudyHub from "./components/StudyHub";
import NewsPage from "./components/NewsPage";
import ChangelogPage from "./components/ChangelogPage";
import ScholarshipHub from "./components/ScholarshipHub";
import CommunityPage from "./components/CommunityPage";

const GPA_RANK = { none: 0, "2.5+": 2.5, "3.0+": 3.0, "3.5+": 3.5, "3.7+": 3.7 };

const selBtn = (active) => ({
  padding: "5px 14px",
  borderRadius: 3,
  border: "1.5px solid",
  fontSize: 13,
  fontWeight: 500,
  cursor: "pointer",
  transition: "background .12s, color .12s, border-color .12s",
  whiteSpace: "nowrap",
  background: active ? "var(--primary)" : "transparent",
  color: active ? "var(--primary-fg)" : "var(--muted)",
  borderColor: active ? "var(--primary)" : "var(--border)",
});

const inp = {
  padding: "7px 12px",
  borderRadius: 2,
  border: "1.5px solid var(--border)",
  fontSize: 13,
  outline: "none",
  fontFamily: "inherit",
  background: "var(--bg)",
  color: "var(--ink)",
};

const NAV_TABS = [
  { id: "browse", label: "Browse" },
  { id: "saved", label: "Saved", pro: true },
  { id: "tracker", label: "Tracker", pro: true },
  { id: "profile", label: "Profile", pro: true },
];

export default function App() {
  const [page, setPage] = useState("opportunities");
  const [moreOpen, setMoreOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("browse");
  const [search, setSearch] = useState("");
  const [cat, setCat] = useState("all");
  const [mode, setMode] = useState("all");
  const [grade, setGrade] = useState("all");
  const [location, setLocation] = useState("all");
  const [deadline, setDeadline] = useState("all");
  const [costFilter, setCostFilter] = useState("all");
  const [paidOnly, setPaidOnly] = useState(false);
  const [gpaFilter, setGpaFilter] = useState("any");
  const [citizenshipFilter, setCitizenshipFilter] = useState("Any");
  const [ageFilter, setAgeFilter] = useState("");
  const [modal, setModal] = useState(null);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [savedIds, setSavedIds] = useState([]);
  const [appStatuses, setAppStatuses] = useState({});
  const [profile, setProfile] = useState({ grade: "", age: "", gpa: "", citizenship: "Any", interests: [] });
  const [isPro, setIsPro] = useState(false); // set to true to test Pro features
  const [waitlistCount, setWaitlistCount] = useState(0);

  useEffect(() => {
    const stored = parseInt(sessionStorage.getItem("waitlist_sim_count") || "0");
    setWaitlistCount(stored);
  }, []);

  useEffect(() => {
    if (!isPro) return;
    const savedOpps = OPPORTUNITIES.filter(o => savedIds.includes(o.id));
    savedOpps.forEach(opp => {
      const daysLeft = Math.ceil((new Date(opp.deadline) - new Date()) / 86400000);
      if (daysLeft === 7 || daysLeft === 1) {
        if (Notification.permission === "granted") {
          new Notification(`⏰ Deadline reminder: ${opp.title}`, {
            body: `${daysLeft} day${daysLeft > 1 ? "s" : ""} left to apply!`,
          });
        } else if (Notification.permission !== "denied") {
          Notification.requestPermission();
        }
      }
    });
  }, [savedIds, isPro]);

  const handleToggleSave = (idOrUpgrade) => {
    if (idOrUpgrade === "upgrade") {
      setModal("upgrade");
      return;
    }
    setSavedIds(prev =>
      prev.includes(idOrUpgrade) ? prev.filter(x => x !== idOrUpgrade) : [...prev, idOrUpgrade]
    );
  };

  const handleStatusChange = (id, status) => {
    setAppStatuses(prev => {
      const next = { ...prev };
      if (status === null) delete next[id];
      else next[id] = status;
      return next;
    });
    if (status && !savedIds.includes(id)) {
      setSavedIds(prev => [...prev, id]);
    }
  };

  const clearAll = () => {
    setSearch("");
    setCat("all");
    setMode("all");
    setGrade("all");
    setLocation("all");
    setDeadline("all");
    setCostFilter("all");
    setPaidOnly(false);
    setGpaFilter("any");
    setCitizenshipFilter("Any");
    setAgeFilter("");
  };

  const visibleOpps = useMemo(() => OPPORTUNITIES.filter(o => isPro || !o.earlyAccess), [isPro]);

  const filtered = useMemo(() => visibleOpps.filter(o => {
    const q = search.toLowerCase();
    const daysLeft = Math.ceil((new Date(o.deadline) - new Date()) / 86400000);

    const matchSearch = !q
      || o.title.toLowerCase().includes(q)
      || o.category.includes(q)
      || o.description.toLowerCase().includes(q)
      || o.tags.some(t => t.includes(q));
    const matchCat = cat === "all" || o.category === cat;
    const matchMode = mode === "all" || o.mode === mode;
    const matchGrade = grade === "all" || o.grades.includes(Number(grade));
    const matchLocation = location === "all" || o.requirements.location === location || o.requirements.location === "International";
    const matchDeadline = deadline === "all" || (daysLeft > 0 && daysLeft <= Number(deadline));
    const matchCost = costFilter === "all" || o.cost === costFilter;
    const matchPaid = !paidOnly || o.paid;
    const matchGpa = gpaFilter === "any"
      || (GPA_RANK[o.requirements.gpa] || 0) <= (GPA_RANK[gpaFilter] || 0)
      || o.requirements.gpa === "none";
    const matchCitizenship = citizenshipFilter === "Any"
      || o.requirements.citizenship === "Any"
      || o.requirements.citizenship === citizenshipFilter;
    const matchAge = !ageFilter
      || (Number(ageFilter) >= o.requirements.minAge && Number(ageFilter) <= o.requirements.maxAge);

    return matchSearch && matchCat && matchMode && matchGrade && matchLocation
      && matchDeadline && matchCost && matchPaid && matchGpa && matchCitizenship && matchAge;
  }), [visibleOpps, search, cat, mode, grade, location, deadline, costFilter, paidOnly, gpaFilter, citizenshipFilter, ageFilter]);

  const featured = filtered.filter(o => o.featured);
  const regular = filtered.filter(o => !o.featured);
  const activeFilterCount = [
    cat !== "all", mode !== "all", grade !== "all", location !== "all",
    deadline !== "all", costFilter !== "all", paidOnly, gpaFilter !== "any",
    citizenshipFilter !== "Any", !!ageFilter,
  ].filter(Boolean).length;

  const tabs = NAV_TABS.map(t => ({
    ...t,
    count: t.id === "saved" ? (savedIds.length || null)
      : t.id === "tracker" ? (Object.keys(appStatuses).length || null)
      : null,
  }));

  return (
    <div style={{ minHeight:"100vh", background:"var(--bg)" }}>

      {/* Global Nav */}
      <div style={{ background:"var(--bg)", borderBottom:"1px solid var(--border)", padding:"0 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:200 }}>
        <div style={{ display:"flex", alignItems:"center", gap:9, padding:"13px 0" }}>
          <div style={{ width:28, height:28, background:"var(--primary)", borderRadius:4, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"var(--primary-fg)", letterSpacing:"-0.01em", flexShrink:0 }}>SR</div>
          <span style={{ fontSize:15, fontWeight:700, color:"var(--ink)", letterSpacing:"-0.02em" }}>StudentRise</span>
        </div>
        <div style={{ display:"flex", gap:2, alignItems:"center", position:"relative" }}>
          <button onClick={()=>setPage("opportunities")} style={{ padding:"7px 13px", borderRadius:2, border:"none", fontSize:13, fontWeight:500, cursor:"pointer", background:page==="opportunities"?"var(--surface-2)":"transparent", color:page==="opportunities"?"var(--ink)":"var(--muted)" }}>Opportunities</button>
          <button onClick={()=>setPage("collegeprep")} style={{ padding:"7px 13px", borderRadius:8, border:"none", fontSize:13, fontWeight:500, cursor:"pointer", background:page==="collegeprep"?"var(--surface-2)":"transparent", color:page==="collegeprep"?"var(--ink)":"var(--muted)" }}>College Prep</button>
          <button onClick={()=>setPage("studyhub")} style={{ padding:"7px 13px", borderRadius:2, border:"1px solid var(--border)", fontSize:13, fontWeight:500, cursor:"pointer", background:page==="studyhub"?"var(--surface-2)":"transparent", color:page==="studyhub"?"var(--ink)":"var(--muted)", display:"flex", alignItems:"center", gap:5 }}>
            Study Hub <span style={{ background:"var(--amber-bg)", color:"var(--amber-fg)", fontSize:10, fontWeight:700, padding:"1px 6px", borderRadius:2 }}>Soon</span>
          </button>
          <div style={{ position:"relative" }}>
            <button onClick={()=>setMoreOpen(m=>!m)} style={{ padding:"7px 13px", borderRadius:2, border:"1px solid var(--border)", fontSize:13, fontWeight:500, cursor:"pointer", background:["news","changelog","community","scholarships"].includes(page)?"var(--surface-2)":"transparent", color:["news","changelog","community","scholarships"].includes(page)?"var(--ink)":"var(--muted)", display:"flex", alignItems:"center", gap:4 }}>
              More {moreOpen?"▲":"▼"}
            </button>
            {moreOpen && (
              <div style={{ position:"absolute", top:"calc(100% + 8px)", right:0, background:"var(--bg)", border:"1px solid var(--border)", borderRadius:0, padding:4, minWidth:155, boxShadow:"0 8px 24px rgba(0,0,0,0.09)", zIndex:300 }}>
                {[["news","News"],["changelog","What's New"],["community","Community"],["scholarships","Scholarships"]].map(([p,label])=>(
                  <button key={p} onClick={()=>{ setPage(p); setMoreOpen(false); }} style={{ width:"100%", padding:"8px 12px", borderRadius:0, border:"none", fontSize:13, fontWeight:500, cursor:"pointer", textAlign:"left", background:page===p?"var(--primary-light)":"transparent", color:page===p?"var(--primary)":"var(--ink)", display:"block" }}>{label}</button>
                ))}
              </div>
            )}
          </div>
        </div>
        <button onClick={()=>setModal("upgrade")} style={{ background:"var(--primary)", color:"var(--primary-fg)", border:"none", padding:"7px 16px", borderRadius:4, fontWeight:600, fontSize:13, cursor:"pointer" }}>Pro</button>
      </div>

      {page==="studyhub" && <StudyHub isPro={isPro} onUpgrade={()=>setModal("upgrade")} />}
      {page==="collegeprep" && <CollegePrepHub isPro={isPro} onUpgrade={()=>setModal("upgrade")} />}
      {page==="news" && <NewsPage isPro={isPro} onUpgrade={()=>setModal("upgrade")} />}
      {page==="changelog" && <ChangelogPage onUpgrade={()=>setModal("upgrade")} />}
      {page==="community" && <CommunityPage isPro={isPro} onUpgrade={()=>setModal("upgrade")} />}
      {page==="scholarships" && <ScholarshipHub isPro={isPro} onUpgrade={()=>setModal("upgrade")} />}
      {page==="opportunities" && <>

      <div style={{ background:"var(--primary)", padding:"3rem 1.5rem 3.75rem", textAlign:"center" }}>
        <h1 style={{ margin:"0 0 12px", fontSize:"clamp(1.75rem,4vw,2.75rem)", fontWeight:800, color:"#fff", letterSpacing:"-0.03em", lineHeight:1.12, textWrap:"balance" }}>Find Your Next Opportunity</h1>
        <p style={{ margin:"0 0 28px", color:"rgba(255,255,255,0.78)", fontSize:16, maxWidth:480, marginLeft:"auto", marginRight:"auto", lineHeight:1.6 }}>
          {visibleOpps.length} curated programs, internships, and competitions for high school students.
        </p>
        <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
          <button onClick={()=>setModal("upgrade")} style={{ background:"#fff", color:"var(--primary)", border:"none", padding:"10px 22px", borderRadius:4, fontWeight:700, fontSize:14, cursor:"pointer" }}>Go Pro — $4.99/mo</button>
          <button onClick={()=>setModal("submit")} style={{ background:"transparent", color:"#fff", border:"1.5px solid rgba(255,255,255,0.38)", padding:"10px 22px", borderRadius:4, fontWeight:600, fontSize:14, cursor:"pointer" }}>Submit a Program</button>
        </div>
      </div>

      <div style={{ maxWidth:980, margin:"0 auto", padding:"0 1rem 3rem" }}>
        <div style={{ display:"flex", gap:0, background:"var(--surface)", borderRadius:0, border:"1px solid var(--border)", padding:3, marginTop:16, marginBottom:20, overflowX:"auto", width:"fit-content", maxWidth:"100%" }}>
          {tabs.map(tab=>(
            <button key={tab.id} onClick={()=>setActiveTab(tab.id)}
              style={{ padding:"8px 16px", borderRadius:2, border:"none", fontSize:13, fontWeight:500, cursor:"pointer", transition:"background .12s, color .12s", display:"flex", alignItems:"center", gap:5, whiteSpace:"nowrap", background:activeTab===tab.id?"var(--bg)":"transparent", color:activeTab===tab.id?"var(--ink)":"var(--muted)", boxShadow:activeTab===tab.id?"0 1px 4px rgba(0,0,0,0.07)":"none" }}>
              {tab.label}
              {tab.count ? <span style={{ background:activeTab===tab.id?"var(--primary-light)":"var(--surface-2)", color:activeTab===tab.id?"var(--primary)":"var(--muted)", fontSize:11, fontWeight:600, padding:"1px 7px", borderRadius:3 }}>{tab.count}</span> : null}
              {tab.pro && !isPro && <span style={{ fontSize:10, background:"var(--primary-light)", color:"var(--primary)", padding:"1px 6px", borderRadius:2, fontWeight:600 }}>Pro</span>}
            </button>
          ))}

        </div>

        {activeTab==="saved" && <SavedTab savedIds={savedIds} appStatuses={appStatuses} isPro={isPro} onToggleSave={handleToggleSave} onStatusChange={handleStatusChange} onUpgrade={()=>setModal("upgrade")} profile={profile} />}
        {activeTab==="tracker" && <TrackerTab appStatuses={appStatuses} isPro={isPro} onUpgrade={()=>setModal("upgrade")} onStatusChange={handleStatusChange} onToggleSave={handleToggleSave} savedIds={savedIds} profile={profile} />}
        {activeTab==="profile" && <ProfileTab profile={profile} setProfile={setProfile} isPro={isPro} onUpgrade={()=>setModal("upgrade")} />}
        {activeTab==="browse" && (
          <>
            <div style={{ background:"var(--bg)", borderRadius:0, border:"1px solid var(--border)", padding:"1.25rem", marginBottom:20 }}>
              <div style={{ display:"flex", gap:10, marginBottom:12 }}>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search programs, categories, tags..."
                  style={{ flex:1, padding:"10px 14px", borderRadius:2, border:"1px solid var(--border)", fontSize:14, outline:"none", fontFamily:"inherit", background:"var(--surface)", color:"var(--ink)" }} />
                <button onClick={()=>setFiltersOpen(f=>!f)} style={{ padding:"10px 16px", borderRadius:2, border:"1px solid", fontSize:13, fontWeight:500, cursor:"pointer", whiteSpace:"nowrap", background:filtersOpen?"var(--primary)":"var(--bg)", color:filtersOpen?"var(--primary-fg)":"var(--ink)", borderColor:filtersOpen?"var(--primary)":"var(--border)" }}>
                  Filters {activeFilterCount>0?`(${activeFilterCount})`:""}
                </button>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, alignItems:"center" }}>
                <span style={{ fontSize:12, fontWeight:500, color:"var(--muted)", marginRight:2 }}>Category</span>
                {CATEGORIES.map(c=><button key={c} onClick={()=>setCat(c)} style={selBtn(cat===c)}>{c==="all"?"All":c}</button>)}
              </div>
              {filtersOpen && (
                <div style={{ marginTop:14, paddingTop:14, borderTop:"1px solid var(--border)", display:"grid", gap:14 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                    <div>
                      <p style={{ margin:"0 0 7px", fontSize:12, fontWeight:500, color:"var(--muted)" }}>Mode</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {["all","virtual","in-person"].map(m=><button key={m} onClick={()=>setMode(m)} style={selBtn(mode===m)}>{m==="all"?"All":m==="virtual"?"Virtual":"In-Person"}</button>)}
                      </div>
                    </div>
                    <div>
                      <p style={{ margin:"0 0 7px", fontSize:12, fontWeight:500, color:"var(--muted)" }}>Grade</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {["all",...GRADES].map(g=><button key={g} onClick={()=>setGrade(String(g))} style={selBtn(String(grade)===String(g))}>{g==="all"?"All":`Grade ${g}`}</button>)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                    <div>
                      <p style={{ margin:"0 0 7px", fontSize:12, fontWeight:500, color:"var(--muted)" }}>Deadline</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {DEADLINE_FILTERS.map(d=><button key={d.value} onClick={()=>setDeadline(d.value)} style={selBtn(deadline===d.value)}>{d.label}</button>)}
                      </div>
                    </div>
                    <div>
                      <p style={{ margin:"0 0 7px", fontSize:12, fontWeight:500, color:"var(--muted)" }}>Cost</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {[{v:"all",l:"Any"},{v:"free",l:"Free"},{v:"paid",l:"Has cost"}].map(o=><button key={o.v} onClick={()=>setCostFilter(o.v)} style={selBtn(costFilter===o.v)}>{o.l}</button>)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                    <div>
                      <p style={{ margin:"0 0 7px", fontSize:12, fontWeight:500, color:"var(--muted)" }}>Location</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {LOCATIONS.map(l=><button key={l} onClick={()=>setLocation(l)} style={selBtn(location===l)}>{l==="all"?"All":l==="US only"?"US only":"International"}</button>)}
                      </div>
                    </div>
                    <div>
                      <p style={{ margin:"0 0 7px", fontSize:12, fontWeight:500, color:"var(--muted)" }}>Stipend</p>
                      <div style={{ display:"flex", gap:6 }}>
                        <button onClick={()=>setPaidOnly(false)} style={selBtn(!paidOnly)}>Any</button>
                        <button onClick={()=>setPaidOnly(true)} style={selBtn(paidOnly)}>Paid only</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p style={{ margin:"0 0 8px", fontSize:12, fontWeight:500, color:"var(--muted)" }}>My requirements</p>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                      <div><label style={{ fontSize:12, fontWeight:500, color:"var(--ink)", display:"block", marginBottom:4 }}>GPA</label>
                        <select value={gpaFilter} onChange={e=>setGpaFilter(e.target.value)} style={inp}>
                          <option value="any">Any GPA</option>
                          {["2.5+","3.0+","3.5+","3.7+"].map(g=><option key={g} value={g}>I have {g}</option>)}
                        </select></div>
                      <div><label style={{ fontSize:12, fontWeight:500, color:"var(--ink)", display:"block", marginBottom:4 }}>Citizenship</label>
                        <select value={citizenshipFilter} onChange={e=>setCitizenshipFilter(e.target.value)} style={inp}>
                          {CITIZENSHIP_OPTIONS.map(c=><option key={c}>{c}</option>)}
                        </select></div>
                      <div><label style={{ fontSize:12, fontWeight:500, color:"var(--ink)", display:"block", marginBottom:4 }}>Age</label>
                        <input type="number" value={ageFilter} onChange={e=>setAgeFilter(e.target.value)} placeholder="e.g. 16" min={13} max={18} style={{ ...inp, width:"100%", boxSizing:"border-box" }} /></div>
                    </div>
                  </div>
                  <button onClick={clearAll} style={{ background:"none", border:"1px solid var(--border)", padding:"7px 16px", borderRadius:2, fontSize:13, color:"var(--red)", fontWeight:500, cursor:"pointer", alignSelf:"flex-start" }}>Clear all filters</button>
                </div>
              )}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <p style={{ margin:0, fontSize:14, color:"var(--muted)" }}><strong style={{ color:"var(--ink)", fontWeight:600 }}>{filtered.length}</strong> of {visibleOpps.length} opportunities</p>
              {activeFilterCount>0 && <button onClick={clearAll} style={{ background:"none", border:"none", fontSize:13, color:"var(--primary)", cursor:"pointer", fontWeight:500 }}>Clear all filters</button>}
            </div>
            {isPro && (
              <div style={{ background:"var(--primary-light)", border:"1px solid var(--border)", borderRadius:0, padding:"10px 14px", marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
                <p style={{ margin:0, fontSize:13, fontWeight:500, color:"var(--primary)" }}>Pro — {OPPORTUNITIES.filter(o=>o.earlyAccess).length} early access opportunities unlocked.</p>
              </div>
            )}
            {featured.length>0 && (
              <>
                <p style={{ margin:"0 0 10px", fontSize:12, fontWeight:600, color:"var(--muted)" }}>Featured</p>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14, marginBottom:24 }}>
                  {featured.map(o=><OpportunityCard key={o.id} opp={o} isPro={isPro} saved={savedIds.includes(o.id)} onToggleSave={handleToggleSave} appStatus={appStatuses[o.id]} onStatusChange={handleStatusChange} profile={isPro&&(profile.grade||profile.gpa||profile.age)?profile:null} />)}
                </div>
              </>
            )}
            {regular.length>0 && (
              <>
                {featured.length>0 && <p style={{ margin:"0 0 10px", fontSize:12, fontWeight:600, color:"var(--muted)" }}>All Opportunities</p>}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
                  {regular.map(o=><OpportunityCard key={o.id} opp={o} isPro={isPro} saved={savedIds.includes(o.id)} onToggleSave={handleToggleSave} appStatus={appStatuses[o.id]} onStatusChange={handleStatusChange} profile={isPro&&(profile.grade||profile.gpa||profile.age)?profile:null} />)}
                </div>
              </>
            )}
            {filtered.length===0 && (
              <div style={{ textAlign:"center", padding:"3rem" }}>
                <p style={{ fontSize:15, fontWeight:500, color:"var(--muted)", marginBottom:12 }}>No opportunities match your filters.</p>
                <button onClick={clearAll} style={{ background:"var(--primary)", color:"var(--primary-fg)", border:"none", padding:"9px 20px", borderRadius:4, fontWeight:500, cursor:"pointer" }}>Clear all filters</button>
              </div>
            )}
          </>
        )}
      </div>

      {modal && (
        <div onClick={e=>{ if(e.target===e.currentTarget) setModal(null); }} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.40)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, padding:"1rem" }}>
          <div style={{ background:"var(--bg)", borderRadius:0, padding:"1.5rem", width:"100%", maxWidth:500, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 20px 60px rgba(0,0,0,0.16)", border:"1px solid var(--border)" }}>
            {modal==="submit" && <SubmitForm onClose={()=>setModal(null)} />}
            {modal==="upgrade" && <ProUpgradeModal onClose={()=>setModal(null)} waitlistCount={waitlistCount} />}
          </div>
        </div>
      )}
      </>}
    </div>
  );
}
