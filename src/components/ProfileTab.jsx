import ProGate from "./ProGate";
import { GRADES, CITIZENSHIP_OPTIONS } from "../data/opportunities";

export default function ProfileTab({ profile, setProfile, isPro, onUpgrade }) {
  if (!isPro) return <ProGate feature="Set up your student profile so we can calculate your match score for every opportunity." onUpgrade={onUpgrade} />;
  const inp = { width:"100%", padding:"10px 12px", borderRadius:10, border:"1.5px solid #E2E8F0", fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };
  const INTERESTS = ["finance","coding","business","volunteering","stem","academics","arts","leadership"];
  const toggleInterest = i => setProfile(p=>({ ...p, interests: p.interests?.includes(i) ? p.interests.filter(x=>x!==i) : [...(p.interests||[]),i] }));
  return (
    <div style={{ maxWidth:560, margin:"0 auto" }}>
      <div style={{ background:"linear-gradient(135deg,#EEF2FF,#F5F3FF)", borderRadius:16, padding:"1.25rem", marginBottom:24 }}>
        <p style={{ margin:"0 0 4px", fontWeight:700, fontSize:15, color:"#4338CA" }}>🤖 Your AI Match Profile</p>
        <p style={{ margin:0, fontSize:13, color:"#6366F1" }}>Fill this in once and every opportunity gets a personalized match score just for you.</p>
      </div>
      <div style={{ display:"grid", gap:14 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Grade</label>
            <select style={inp} value={profile.grade||""} onChange={e=>setProfile(p=>({...p,grade:e.target.value}))}>
              <option value="">Select grade</option>
              {GRADES.map(g=><option key={g} value={g}>Grade {g}</option>)}
            </select></div>
          <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Age</label>
            <input style={inp} type="number" placeholder="e.g. 16" min={13} max={18} value={profile.age||""} onChange={e=>setProfile(p=>({...p,age:e.target.value}))} /></div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>GPA</label>
            <input style={inp} type="number" placeholder="e.g. 3.8" step="0.1" min={0} max={4} value={profile.gpa||""} onChange={e=>setProfile(p=>({...p,gpa:e.target.value}))} /></div>
          <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Citizenship</label>
            <select style={inp} value={profile.citizenship||"Any"} onChange={e=>setProfile(p=>({...p,citizenship:e.target.value}))}>
              {CITIZENSHIP_OPTIONS.map(c=><option key={c}>{c}</option>)}
            </select></div>
        </div>
        <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:8 }}>Interests (select all that apply)</label>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {INTERESTS.map(i=>(
              <button key={i} onClick={()=>toggleInterest(i)} style={{ padding:"7px 16px", borderRadius:999, border:"1.5px solid", fontSize:13, fontWeight:500, cursor:"pointer", borderColor:profile.interests?.includes(i)?"#6366F1":"#E2E8F0", background:profile.interests?.includes(i)?"#EEF2FF":"#fff", color:profile.interests?.includes(i)?"#4338CA":"#64748B" }}>{i}</button>
            ))}
          </div>
        </div>
        {(profile.grade||profile.gpa||profile.age) && (
          <div style={{ background:"#F0FDF4", border:"1px solid #BBF7D0", borderRadius:12, padding:"1rem" }}>
            <p style={{ margin:"0 0 4px", fontWeight:700, fontSize:13, color:"#15803D" }}>✅ Profile active!</p>
            <p style={{ margin:0, fontSize:12, color:"#16A34A" }}>AI match scores are now showing on all opportunity cards. Browse the opportunities to see your scores.</p>
          </div>
        )}
      </div>
    </div>
  );
}
