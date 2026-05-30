import { useState } from "react";
import { CITIZENSHIP_OPTIONS } from "../data/opportunities";

export default function SubmitForm({ onClose }) {
  const SHEETS_URL = "https://script.google.com/macros/s/AKfycbxlRhz8GqMMwqsPoptLO0nEVvGDV7lHntJI5ZvnnsHO7kNWT48IRhhxfbA7z9ZYqjz1tQ/exec";
  const [form, setForm] = useState({ title:"", category:"coding", grades:"", mode:"virtual", deadline:"", paid:false, cost:"free", description:"", link:"", minAge:"", maxAge:"", location:"US only", gpa:"none", citizenship:"Any" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const set = (k,v) => setForm(f=>({...f,[k]:v}));
  const inp = { width:"100%", padding:"10px 12px", borderRadius:10, border:"1.5px solid #E2E8F0", fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };
  const handleSubmit = async () => {
    if (!form.title||!form.description||!form.link) return;
    if (loading) return;
    setLoading(true);
    try {
      await fetch(SHEETS_URL, { method:"POST", mode:"no-cors", headers:{ "Content-Type":"application/json" }, body:JSON.stringify(form) });
      setSubmitted(true);
    } catch(err) { alert("Something went wrong. Please try again."); }
    finally { setLoading(false); }
  };
  if (submitted) return (
    <div style={{ textAlign:"center", padding:"2rem" }}>
      <div style={{ fontSize:48, marginBottom:12 }}>🎉</div>
      <h3 style={{ margin:"0 0 8px", color:"#0F172A" }}>Opportunity submitted!</h3>
      <p style={{ color:"#64748B", margin:"0 0 20px" }}>We'll review and publish it within 24 hours.</p>
      <button onClick={onClose} style={{ background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"10px 24px", borderRadius:10, fontWeight:600, cursor:"pointer" }}>Back to opportunities</button>
    </div>
  );
  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:20 }}>
        <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:"#0F172A" }}>Submit an Opportunity</h2>
        <button onClick={onClose} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:"#94A3B8" }}>✕</button>
      </div>
      <div style={{ display:"grid", gap:12 }}>
        <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Title *</label>
          <input style={inp} value={form.title} onChange={e=>set("title",e.target.value)} placeholder="e.g. Google CS First Scholarship" /></div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Category *</label>
            <select style={inp} value={form.category} onChange={e=>set("category",e.target.value)}>
              {["finance","coding","business","volunteering","stem","academics","arts","leadership"].map(c=><option key={c}>{c}</option>)}
            </select></div>
          <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Mode *</label>
            <select style={inp} value={form.mode} onChange={e=>set("mode",e.target.value)}>
              <option value="virtual">Virtual</option><option value="in-person">In-Person</option>
            </select></div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Grade range *</label>
            <input style={inp} value={form.grades} onChange={e=>set("grades",e.target.value)} placeholder="e.g. 9-12" /></div>
          <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Deadline *</label>
            <input style={inp} type="date" value={form.deadline} onChange={e=>set("deadline",e.target.value)} /></div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12 }}>
          <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Min Age</label>
            <input style={inp} type="number" value={form.minAge} onChange={e=>set("minAge",e.target.value)} placeholder="13" /></div>
          <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Max Age</label>
            <input style={inp} type="number" value={form.maxAge} onChange={e=>set("maxAge",e.target.value)} placeholder="18" /></div>
          <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Min GPA</label>
            <select style={inp} value={form.gpa} onChange={e=>set("gpa",e.target.value)}>
              <option value="none">No requirement</option>
              {["2.5+","3.0+","3.5+","3.7+"].map(g=><option key={g}>{g}</option>)}
            </select></div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Location</label>
            <select style={inp} value={form.location} onChange={e=>set("location",e.target.value)}>
              <option>US only</option><option>International</option>
            </select></div>
          <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Citizenship</label>
            <select style={inp} value={form.citizenship} onChange={e=>set("citizenship",e.target.value)}>
              {CITIZENSHIP_OPTIONS.map(c=><option key={c}>{c}</option>)}
            </select></div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Cost</label>
            <select style={inp} value={form.cost} onChange={e=>set("cost",e.target.value)}>
              <option value="free">Free to apply</option><option value="paid">Has a cost</option>
            </select></div>
          <div style={{ display:"flex", alignItems:"center", gap:8, paddingTop:24 }}>
            <input type="checkbox" checked={form.paid} onChange={e=>set("paid",e.target.checked)} style={{ width:16, height:16 }} />
            <label style={{ fontSize:13, fontWeight:600, color:"#374151" }}>Includes payment / stipend</label>
          </div>
        </div>
        <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Description *</label>
          <textarea style={{ ...inp, minHeight:80, resize:"vertical" }} value={form.description} onChange={e=>set("description",e.target.value)} placeholder="Brief description..." /></div>
        <div><label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Application Link *</label>
          <input style={inp} value={form.link} onChange={e=>set("link",e.target.value)} placeholder="https://..." /></div>
        <button onClick={handleSubmit} disabled={loading}
          style={{ background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"12px", borderRadius:10, fontWeight:700, fontSize:15, cursor:loading?"not-allowed":"pointer", opacity:loading?0.7:1 }}>
          {loading?"Submitting... ⏳":"Submit Opportunity 🚀"}
        </button>
      </div>
    </div>
  );
}
