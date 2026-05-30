import { useState } from "react";

export default function CollegePrepHub({ isPro, onUpgrade }) {
  const [tool, setTool] = useState("deadlines");
  const [collegeList, setCollegeList] = useState([]);
  const [newCollege, setNewCollege] = useState({ name:"", type:"reach", deadline:"", status:"Planning" });
  const [recLetters, setRecLetters] = useState([]);
  const [newRec, setNewRec] = useState({ teacher:"", subject:"", asked:false, received:false });
  const [apCourses, setApCourses] = useState([]);
  const [newAp, setNewAp] = useState({ course:"", score:"" });

  const COLLEGE_TYPES = ["reach","match","safety"];
  const COLLEGE_STATUSES = ["Planning","Applied","Interviewed","Waitlisted","Accepted","Rejected","Enrolled"];
  const STATUS_COLORS = { Planning:"#6366F1", Applied:"#0EA5E9", Interviewed:"#8B5CF6", Waitlisted:"#F59E0B", Accepted:"#22C55E", Rejected:"#EF4444", Enrolled:"#10B981" };
  const TYPE_COLORS = { reach:{ bg:"#FEE2E2", text:"#DC2626" }, match:{ bg:"#FEF3C7", text:"#D97706" }, safety:{ bg:"#DCFCE7", text:"#16A34A" } };

  const inp = { width:"100%", padding:"10px 12px", borderRadius:10, border:"1.5px solid #E2E8F0", fontSize:13, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };

  // Common App deadline countdown
  const commonAppDeadline = new Date("2027-01-01");
  const daysToCommonApp = Math.ceil((commonAppDeadline - new Date()) / 86400000);

  const tools = [
    { id:"deadlines", icon:"📅", label:"Key Deadlines" },
    { id:"colleges", icon:"🏛️", label:"College List" },
    { id:"recletters", icon:"✉️", label:"Rec Letters" },
    { id:"aptracker", icon:"📊", label:"AP Tracker" },
    { id:"checklist", icon:"✅", label:"App Checklist" },
    { id:"resources", icon:"📚", label:"Resources" },
  ];

  const KEY_DEADLINES = [
    { date:"Oct 15, 2026", event:"PSAT/NMSQT", desc:"National Merit Scholarship qualifying test", urgent:false },
    { date:"Nov 1, 2026", event:"Early Decision / Early Action", desc:"Most ED/EA deadlines fall here", urgent:false },
    { date:"Dec 1, 2026", event:"Restrictive Early Action", desc:"MIT, Yale, Stanford, Harvard REA", urgent:false },
    { date:"Dec 15, 2026", event:"Early Decision Results", desc:"Most ED schools notify by this date", urgent:false },
    { date:"Jan 1, 2027", event:"Regular Decision Deadline", desc:"Most RD applications due", urgent:false },
    { date:"Feb 1, 2027", event:"CSS Profile Deadline", desc:"Financial aid form for many private schools", urgent:false },
    { date:"Mar 1, 2027", event:"FAFSA Priority Deadline", desc:"Submit FAFSA for best aid consideration", urgent:false },
    { date:"Apr 1, 2027", event:"Regular Decision Results", desc:"Most RD schools notify by this date", urgent:false },
    { date:"May 1, 2027", event:"National Decision Day 🎉", desc:"Deadline to commit to your college", urgent:false },
  ];

  const APP_CHECKLIST = [
    { category:"Tests & Scores", items:["Take SAT or ACT","Send official scores to colleges","Take SAT Subject Tests if required","Take AP exams for credit"] },
    { category:"Essays", items:["Write Common App personal statement","Write supplemental essays for each school","Proofread and get feedback","Finalize and submit"] },
    { category:"Recommendations", items:["Ask teachers (at least 2 weeks early)","Ask counselor for school report","Follow up if not received","Send thank you notes after"] },
    { category:"Activities", items:["Finalize activities list","Write activity descriptions (150 chars)","Add awards and honors","Include volunteer hours"] },
    { category:"Applications", items:["Create Common App account","Fill out demographics and background","Add all colleges to your list","Submit applications before deadlines"] },
    { category:"Financial Aid", items:["File FAFSA as early as possible","File CSS Profile if required","Research scholarships","Apply for outside scholarships"] },
  ];

  const [checkedItems, setCheckedItems] = useState({});
  const toggleCheck = (key) => setCheckedItems(prev => ({ ...prev, [key]: !prev[key] }));
  const totalItems = APP_CHECKLIST.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedCount = Object.values(checkedItems).filter(Boolean).length;

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:"#F8FAFC", minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(135deg,#065F46 0%,#047857 60%,#059669 100%)", padding:"2.5rem 1.5rem 3.5rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 20% 50%, rgba(255,255,255,0.07) 0%, transparent 50%)" }} />
        <div style={{ position:"relative" }}>
          <span style={{ background:"rgba(255,255,255,0.15)", color:"#fff", fontSize:12, fontWeight:700, padding:"4px 14px", borderRadius:999, letterSpacing:"0.08em", display:"inline-block", marginBottom:14 }}>COLLEGE PREP HUB</span>
          <h1 style={{ margin:"0 0 10px", fontSize:"clamp(24px,5vw,42px)", fontWeight:800, color:"#fff", letterSpacing:"-0.02em", lineHeight:1.15 }}>College Prep Hub 🎓</h1>
          <p style={{ margin:"0 0 20px", color:"rgba(255,255,255,0.75)", fontSize:15, maxWidth:480, marginLeft:"auto", marginRight:"auto" }}>Everything you need to plan, track, and ace your college applications</p>
          <div style={{ display:"inline-flex", gap:20, background:"rgba(255,255,255,0.12)", borderRadius:16, padding:"12px 24px", flexWrap:"wrap", justifyContent:"center" }}>
            <div style={{ textAlign:"center" }}>
              <p style={{ margin:"0 0 2px", fontSize:28, fontWeight:800, color:"#fff" }}>{daysToCommonApp}</p>
              <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.7)", fontWeight:500 }}>days to RD deadline</p>
            </div>
            <div style={{ width:1, background:"rgba(255,255,255,0.2)" }} />
            <div style={{ textAlign:"center" }}>
              <p style={{ margin:"0 0 2px", fontSize:28, fontWeight:800, color:"#fff" }}>{checkedCount}/{totalItems}</p>
              <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.7)", fontWeight:500 }}>checklist items done</p>
            </div>
            <div style={{ width:1, background:"rgba(255,255,255,0.2)" }} />
            <div style={{ textAlign:"center" }}>
              <p style={{ margin:"0 0 2px", fontSize:28, fontWeight:800, color:"#fff" }}>{collegeList.length}</p>
              <p style={{ margin:0, fontSize:11, color:"rgba(255,255,255,0.7)", fontWeight:500 }}>colleges on your list</p>
            </div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:900, margin:"0 auto", padding:"0 1rem 3rem" }}>
        <div style={{ display:"flex", gap:4, background:"#fff", borderRadius:16, border:"1.5px solid #F1F5F9", padding:4, marginTop:16, boxShadow:"0 4px 24px rgba(0,0,0,0.07)", marginBottom:24, overflowX:"auto" }}>
          {tools.map(t=>(
            <button key={t.id} onClick={()=>setTool(t.id)}
              style={{ padding:"9px 14px", borderRadius:10, border:"none", fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:5, whiteSpace:"nowrap", flex:1, justifyContent:"center", background:tool===t.id?"linear-gradient(135deg,#047857,#059669)":"transparent", color:tool===t.id?"#fff":"#64748B", boxShadow:tool===t.id?"0 2px 8px rgba(5,150,105,0.3)":"none" }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        <div style={{ background:"#fff", borderRadius:20, border:"1.5px solid #F1F5F9", padding:"1.5rem", boxShadow:"0 2px 12px rgba(0,0,0,0.04)", minHeight:400 }}>

          {/* KEY DEADLINES */}
          {tool==="deadlines" && (
            <div>
              <p style={{ margin:"0 0 16px", fontSize:13, color:"#64748B" }}>Mark your calendar — these are the most important dates in your college application journey.</p>
              <div style={{ display:"grid", gap:10 }}>
                {KEY_DEADLINES.map((d,i)=>{
                  const daysLeft = Math.ceil((new Date(d.date)-new Date())/86400000);
                  const color = daysLeft<30?"#EF4444":daysLeft<90?"#F59E0B":"#22C55E";
                  return (
                    <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"12px 14px", background:"#F8FAFC", borderRadius:12, border:"1px solid #F1F5F9" }}>
                      <div style={{ background:color+"20", border:`1px solid ${color}40`, borderRadius:8, padding:"4px 10px", textAlign:"center", flexShrink:0 }}>
                        <p style={{ margin:0, fontSize:11, fontWeight:700, color, whiteSpace:"nowrap" }}>{daysLeft>0?`${daysLeft}d`:"Past"}</p>
                      </div>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
                          <p style={{ margin:0, fontSize:14, fontWeight:700, color:"#0F172A" }}>{d.event}</p>
                          <span style={{ fontSize:11, color:"#94A3B8" }}>{d.date}</span>
                        </div>
                        <p style={{ margin:0, fontSize:12, color:"#64748B" }}>{d.desc}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* COLLEGE LIST */}
          {tool==="colleges" && (
            <div>
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10, marginBottom:20 }}>
                {COLLEGE_TYPES.map(type=>{
                  const count = collegeList.filter(c=>c.type===type).length;
                  const c = TYPE_COLORS[type];
                  return (
                    <div key={type} style={{ background:c.bg, borderRadius:12, padding:"12px", textAlign:"center" }}>
                      <p style={{ margin:"0 0 2px", fontSize:22, fontWeight:800, color:c.text }}>{count}</p>
                      <p style={{ margin:0, fontSize:12, fontWeight:600, color:c.text, textTransform:"capitalize" }}>{type} schools</p>
                    </div>
                  );
                })}
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr auto auto", gap:8, marginBottom:12, alignItems:"end" }}>
                <div><label style={{ fontSize:12, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>College name</label>
                  <input style={inp} value={newCollege.name} onChange={e=>setNewCollege(c=>({...c,name:e.target.value}))} placeholder="e.g. MIT, Harvard..." /></div>
                <div><label style={{ fontSize:12, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Deadline</label>
                  <input style={inp} type="date" value={newCollege.deadline} onChange={e=>setNewCollege(c=>({...c,deadline:e.target.value}))} /></div>
                <div><label style={{ fontSize:12, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Type</label>
                  <select style={{ ...inp, width:"auto" }} value={newCollege.type} onChange={e=>setNewCollege(c=>({...c,type:e.target.value}))}>
                    {COLLEGE_TYPES.map(t=><option key={t}>{t}</option>)}
                  </select></div>
                <button onClick={()=>{ if(newCollege.name) { setCollegeList(l=>[...l,{...newCollege,id:Date.now()}]); setNewCollege({name:"",type:"reach",deadline:"",status:"Planning"}); }}}
                  style={{ background:"linear-gradient(135deg,#047857,#059669)", color:"#fff", border:"none", padding:"10px 16px", borderRadius:10, fontWeight:600, fontSize:13, cursor:"pointer", whiteSpace:"nowrap" }}>+ Add</button>
              </div>
              {collegeList.length===0 ? (
                <div style={{ textAlign:"center", padding:"2rem", color:"#94A3B8" }}>
                  <p style={{ fontSize:32, marginBottom:8 }}>🏛️</p>
                  <p style={{ fontSize:14, fontWeight:500 }}>Add colleges to start building your list</p>
                  <p style={{ fontSize:12 }}>Aim for 2-3 safety, 3-4 match, and 2-3 reach schools</p>
                </div>
              ) : (
                <div style={{ display:"grid", gap:8 }}>
                  {collegeList.map(c=>{
                    const daysLeft = c.deadline ? Math.ceil((new Date(c.deadline)-new Date())/86400000) : null;
                    const tc = TYPE_COLORS[c.type];
                    return (
                      <div key={c.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", background:"#F8FAFC", borderRadius:12, border:"1px solid #F1F5F9" }}>
                        <span style={{ background:tc.bg, color:tc.text, fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:999, textTransform:"capitalize", flexShrink:0 }}>{c.type}</span>
                        <p style={{ margin:0, fontSize:14, fontWeight:600, color:"#0F172A", flex:1 }}>{c.name}</p>
                        {daysLeft!==null && <span style={{ fontSize:12, color:daysLeft<30?"#EF4444":"#64748B", fontWeight:600 }}>{daysLeft>0?`${daysLeft}d left`:"Past"}</span>}
                        <select value={c.status} onChange={e=>setCollegeList(l=>l.map(x=>x.id===c.id?{...x,status:e.target.value}:x))}
                          style={{ fontSize:12, fontWeight:600, color:STATUS_COLORS[c.status]||"#64748B", background:"transparent", border:"1px solid #E2E8F0", borderRadius:8, padding:"4px 8px", cursor:"pointer" }}>
                          {COLLEGE_STATUSES.map(s=><option key={s}>{s}</option>)}
                        </select>
                        <button onClick={()=>setCollegeList(l=>l.filter(x=>x.id!==c.id))} style={{ background:"none", border:"none", color:"#EF4444", cursor:"pointer", fontSize:16, padding:"0 4px" }}>×</button>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          )}

          {/* REC LETTERS */}
          {tool==="recletters" && (
            <div>
              <p style={{ margin:"0 0 16px", fontSize:13, color:"#64748B" }}>Track your recommendation letters. Most colleges require 2 teacher recs and 1 counselor rec. Ask at least 6 weeks before deadlines.</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto auto", gap:8, marginBottom:16, alignItems:"end" }}>
                <div><label style={{ fontSize:12, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Teacher / Counselor name</label>
                  <input style={inp} value={newRec.teacher} onChange={e=>setNewRec(r=>({...r,teacher:e.target.value}))} placeholder="e.g. Ms. Johnson" /></div>
                <div><label style={{ fontSize:12, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Subject</label>
                  <input style={{ ...inp, width:100 }} value={newRec.subject} onChange={e=>setNewRec(r=>({...r,subject:e.target.value}))} placeholder="Math" /></div>
                <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                  <label style={{ fontSize:12, fontWeight:600, color:"#374151" }}>Asked</label>
                  <input type="checkbox" checked={newRec.asked} onChange={e=>setNewRec(r=>({...r,asked:e.target.checked}))} style={{ width:18, height:18, margin:"6px auto 0" }} />
                </div>
                <button onClick={()=>{ if(newRec.teacher) { setRecLetters(l=>[...l,{...newRec,id:Date.now()}]); setNewRec({teacher:"",subject:"",asked:false,received:false}); }}}
                  style={{ background:"linear-gradient(135deg,#047857,#059669)", color:"#fff", border:"none", padding:"10px 16px", borderRadius:10, fontWeight:600, fontSize:13, cursor:"pointer" }}>+ Add</button>
              </div>
              {recLetters.length===0 ? (
                <div style={{ textAlign:"center", padding:"2rem", color:"#94A3B8" }}>
                  <p style={{ fontSize:32, marginBottom:8 }}>✉️</p>
                  <p style={{ fontSize:14, fontWeight:500 }}>No recommendation letters tracked yet</p>
                  <p style={{ fontSize:12 }}>Ask teachers who know you well and can speak to your strengths</p>
                </div>
              ) : (
                <div style={{ display:"grid", gap:8 }}>
                  {recLetters.map(r=>(
                    <div key={r.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", background:"#F8FAFC", borderRadius:12, border:"1px solid #F1F5F9" }}>
                      <div style={{ flex:1 }}>
                        <p style={{ margin:"0 0 2px", fontSize:14, fontWeight:600, color:"#0F172A" }}>{r.teacher}</p>
                        <p style={{ margin:0, fontSize:12, color:"#64748B" }}>{r.subject}</p>
                      </div>
                      <label style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, fontWeight:500, color:"#64748B", cursor:"pointer" }}>
                        <input type="checkbox" checked={r.asked} onChange={e=>setRecLetters(l=>l.map(x=>x.id===r.id?{...x,asked:e.target.checked}:x))} />Asked
                      </label>
                      <label style={{ display:"flex", alignItems:"center", gap:5, fontSize:12, fontWeight:500, color:r.received?"#16A34A":"#64748B", cursor:"pointer" }}>
                        <input type="checkbox" checked={r.received} onChange={e=>setRecLetters(l=>l.map(x=>x.id===r.id?{...x,received:e.target.checked}:x))} />Received
                      </label>
                      <span style={{ fontSize:16, flexShrink:0 }}>{r.received?"✅":r.asked?"⏳":"❌"}</span>
                      <button onClick={()=>setRecLetters(l=>l.filter(x=>x.id!==r.id))} style={{ background:"none", border:"none", color:"#EF4444", cursor:"pointer", fontSize:16 }}>×</button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* AP TRACKER */}
          {tool==="aptracker" && (
            <div>
              <p style={{ margin:"0 0 16px", fontSize:13, color:"#64748B" }}>Track your AP courses and scores. Scores of 3+ may earn college credit. Scores of 4-5 are most impressive on applications.</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr auto auto", gap:8, marginBottom:16, alignItems:"end" }}>
                <div><label style={{ fontSize:12, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>AP Course</label>
                  <input style={inp} value={newAp.course} onChange={e=>setNewAp(a=>({...a,course:e.target.value}))} placeholder="e.g. AP Calculus BC" /></div>
                <div><label style={{ fontSize:12, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Score (1-5)</label>
                  <select style={{ ...inp, width:80 }} value={newAp.score} onChange={e=>setNewAp(a=>({...a,score:e.target.value}))}>
                    <option value="">TBD</option>
                    {[1,2,3,4,5].map(s=><option key={s}>{s}</option>)}
                  </select></div>
                <button onClick={()=>{ if(newAp.course) { setApCourses(l=>[...l,{...newAp,id:Date.now()}]); setNewAp({course:"",score:""}); }}}
                  style={{ background:"linear-gradient(135deg,#047857,#059669)", color:"#fff", border:"none", padding:"10px 16px", borderRadius:10, fontWeight:600, fontSize:13, cursor:"pointer" }}>+ Add</button>
              </div>
              {apCourses.length===0 ? (
                <div style={{ textAlign:"center", padding:"2rem", color:"#94A3B8" }}>
                  <p style={{ fontSize:32, marginBottom:8 }}>📊</p>
                  <p style={{ fontSize:14, fontWeight:500 }}>No AP courses tracked yet</p>
                  <p style={{ fontSize:12 }}>Add your AP courses to track your scores and college credit potential</p>
                </div>
              ) : (
                <div style={{ display:"grid", gap:8 }}>
                  {apCourses.map(a=>{
                    const score = parseInt(a.score);
                    const scoreColor = score>=4?"#16A34A":score===3?"#D97706":score?"#EF4444":"#94A3B8";
                    return (
                      <div key={a.id} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", background:"#F8FAFC", borderRadius:12, border:"1px solid #F1F5F9" }}>
                        <p style={{ margin:0, fontSize:14, fontWeight:600, color:"#0F172A", flex:1 }}>{a.course}</p>
                        {a.score ? (
                          <div style={{ textAlign:"center" }}>
                            <span style={{ fontSize:22, fontWeight:800, color:scoreColor }}>{a.score}</span>
                            <p style={{ margin:0, fontSize:10, color:scoreColor, fontWeight:600 }}>{score>=4?"Credit likely":score===3?"Possible credit":"No credit"}</p>
                          </div>
                        ) : <span style={{ fontSize:12, color:"#94A3B8", fontWeight:500 }}>Score TBD</span>}
                        <button onClick={()=>setApCourses(l=>l.filter(x=>x.id!==a.id))} style={{ background:"none", border:"none", color:"#EF4444", cursor:"pointer", fontSize:16 }}>×</button>
                      </div>
                    );
                  })}
                  <div style={{ background:"#F0FDF4", border:"1px solid #BBF7D0", borderRadius:10, padding:"10px 14px", marginTop:8 }}>
                    <p style={{ margin:0, fontSize:13, fontWeight:600, color:"#15803D" }}>
                      {apCourses.filter(a=>parseInt(a.score)>=3).length} courses with potential college credit · {apCourses.filter(a=>parseInt(a.score)>=4).length} scores of 4 or 5
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* APP CHECKLIST */}
          {tool==="checklist" && (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
                <p style={{ margin:0, fontSize:13, color:"#64748B" }}>Your complete college application checklist</p>
                <div style={{ background:"#F0FDF4", border:"1px solid #BBF7D0", borderRadius:10, padding:"6px 14px" }}>
                  <span style={{ fontSize:13, fontWeight:700, color:"#15803D" }}>{checkedCount}/{totalItems} done {checkedCount===totalItems?"🎉":""}</span>
                </div>
              </div>
              <div style={{ background:"#F8FAFC", borderRadius:10, height:8, marginBottom:20, overflow:"hidden" }}>
                <div style={{ height:"100%", background:"linear-gradient(135deg,#047857,#059669)", borderRadius:10, width:`${(checkedCount/totalItems)*100}%`, transition:"width .3s" }} />
              </div>
              <div style={{ display:"grid", gap:16 }}>
                {APP_CHECKLIST.map(cat=>(
                  <div key={cat.category}>
                    <p style={{ margin:"0 0 8px", fontSize:13, fontWeight:700, color:"#374151", textTransform:"uppercase", letterSpacing:"0.06em" }}>{cat.category}</p>
                    <div style={{ display:"grid", gap:6 }}>
                      {cat.items.map(item=>{
                        const key = `${cat.category}-${item}`;
                        return (
                          <label key={item} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", background:checkedItems[key]?"#F0FDF4":"#fff", border:`1px solid ${checkedItems[key]?"#BBF7D0":"#F1F5F9"}`, borderRadius:10, cursor:"pointer" }}>
                            <input type="checkbox" checked={!!checkedItems[key]} onChange={()=>toggleCheck(key)} style={{ width:16, height:16, accentColor:"#059669", flexShrink:0 }} />
                            <span style={{ fontSize:13, color:checkedItems[key]?"#15803D":"#374151", textDecoration:checkedItems[key]?"line-through":"none", fontWeight:checkedItems[key]?500:400 }}>{item}</span>
                            {checkedItems[key] && <span style={{ marginLeft:"auto", fontSize:14 }}>✅</span>}
                          </label>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* RESOURCES */}
          {tool==="resources" && (
            <div style={{ display:"grid", gap:12 }}>
              <p style={{ margin:"0 0 8px", fontSize:13, color:"#64748B" }}>Essential free resources for your college application journey</p>
              {[
                { icon:"📝", title:"Common App", desc:"The main platform for applying to 1,000+ colleges", link:"https://www.commonapp.org/", tag:"Apply" },
                { icon:"💰", title:"FAFSA", desc:"Free Application for Federal Student Aid — file as early as possible", link:"https://studentaid.gov/h/apply-for-aid/fafsa", tag:"Financial Aid" },
                { icon:"📊", title:"CSS Profile", desc:"Required by many private colleges for additional aid", link:"https://cssprofile.collegeboard.org/", tag:"Financial Aid" },
                { icon:"🎓", title:"College Board", desc:"SAT registration, AP scores, and college planning tools", link:"https://www.collegeboard.org/", tag:"Tests" },
                { icon:"📚", title:"Khan Academy SAT Prep", desc:"Free official SAT prep in partnership with College Board", link:"https://www.khanacademy.org/sat", tag:"Free" },
                { icon:"🔍", title:"Common Data Set", desc:"Find acceptance rates, aid data, and stats for any college", link:"https://www.commondataset.org/", tag:"Research" },
                { icon:"💵", title:"Questbridge", desc:"Full scholarships to top colleges for high-achieving, low-income students", link:"https://www.questbridge.org/", tag:"Scholarship" },
                { icon:"🏆", title:"Fastweb Scholarships", desc:"Search engine for millions of scholarships", link:"https://www.fastweb.com/", tag:"Scholarship" },
                { icon:"📖", title:"Naviance", desc:"College planning platform used by many high schools", link:"https://www.naviance.com/", tag:"Planning" },
                { icon:"🤝", title:"Reach Higher", desc:"Michelle Obama's college access initiative with resources and tools", link:"https://reachhigher.org/", tag:"Resources" },
              ].map(r=>(
                <a key={r.title} href={r.link} target="_blank" rel="noopener noreferrer" style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", background:"#F8FAFC", borderRadius:12, border:"1px solid #F1F5F9", textDecoration:"none", transition:"border-color .15s" }}
                  onMouseEnter={e=>e.currentTarget.style.borderColor="#059669"}
                  onMouseLeave={e=>e.currentTarget.style.borderColor="#F1F5F9"}>
                  <span style={{ fontSize:24, flexShrink:0 }}>{r.icon}</span>
                  <div style={{ flex:1 }}>
                    <p style={{ margin:"0 0 2px", fontSize:14, fontWeight:700, color:"#0F172A" }}>{r.title}</p>
                    <p style={{ margin:0, fontSize:12, color:"#64748B" }}>{r.desc}</p>
                  </div>
                  <span style={{ background:"#DCFCE7", color:"#16A34A", fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:999, flexShrink:0 }}>{r.tag}</span>
                  <span style={{ color:"#059669", fontSize:16, flexShrink:0 }}>→</span>
                </a>
              ))}
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
