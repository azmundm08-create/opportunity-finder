import { useState } from "react";
import { APP_STATUS_SCHOLARSHIP, STATUS_COLORS_SCHOLARSHIP } from "../data/scholarships";

export default function ScholarshipCard({ scholarship:s, saved, onSave, status, onStatus }) {
  const [expanded, setExpanded] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const daysLeft = Math.ceil((new Date(s.deadline)-new Date())/86400000);
  const urgency = daysLeft<14?"#EF4444":daysLeft<45?"#F59E0B":"#22C55E";
  const statusColor = status?STATUS_COLORS_SCHOLARSHIP[status]:null;
  const CAT_COLORS_SCHOL = { merit:{ bg:"#EDE9FE", text:"#4C1D95" }, need:{ bg:"#FEE2E2", text:"#7F1D1D" }, stem:{ bg:"#E0F2FE", text:"#0C4A6E" }, arts:{ bg:"#FDF4FF", text:"#581C87" }, service:{ bg:"#DCFCE7", text:"#14532D" } };
  const cc = CAT_COLORS_SCHOL[s.category]||{ bg:"#F1F5F9", text:"#475569" };
  return (
    <div style={{ background:"#fff", border:`1.5px solid ${status?STATUS_COLORS_SCHOLARSHIP[status]+"40":"#F1F5F9"}`, borderRadius:16, padding:"1.25rem", display:"flex", flexDirection:"column", gap:10, transition:"box-shadow .2s, transform .2s", position:"relative", overflow:"hidden" }}
      onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,0.10)"; e.currentTarget.style.transform="translateY(-2px)"; }}
      onMouseLeave={e=>{ e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}>
      {s.featured && <div style={{ position:"absolute", top:0, right:0, background:"linear-gradient(135deg,#047857,#059669)", color:"#fff", fontSize:10, fontWeight:700, padding:"4px 12px", borderBottomLeftRadius:10 }}>FEATURED</div>}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", gap:8, flexWrap:"wrap" }}>
        <span style={{ background:cc.bg, color:cc.text, fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:999, textTransform:"capitalize" }}>{s.category==="stem"?"STEM":s.category==="need"?"Need-Based":s.category}</span>
        <div style={{ display:"flex", gap:5, alignItems:"center" }}>
          <span style={{ fontSize:11, fontWeight:700, color:"#047857", background:"#DCFCE7", padding:"3px 8px", borderRadius:999 }}>{s.amountLabel}</span>
          <button onClick={()=>onSave(s.id)} style={{ background:saved?"#EEF2FF":"#F8FAFC", border:`1.5px solid ${saved?"#6366F1":"#E2E8F0"}`, borderRadius:8, width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:15, flexShrink:0 }}>
            {saved?"🔖":"🏷️"}
          </button>
        </div>
      </div>
      {status && (
        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:statusColor, flexShrink:0 }} />
          <span style={{ fontSize:12, fontWeight:600, color:statusColor }}>{status}</span>
        </div>
      )}
      <div>
        <h3 style={{ margin:"0 0 4px", fontSize:15, fontWeight:700, color:"#0F172A", lineHeight:1.4 }}>{s.title}</h3>
        <p style={{ margin:"0 0 4px", fontSize:12, color:"#6366F1", fontWeight:500 }}>📌 {s.organization}</p>
        <p style={{ margin:0, fontSize:13, color:"#64748B", lineHeight:1.5 }}>{s.description}</p>
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, fontSize:12, color:"#64748B" }}>
        <span>📊 GPA: {s.gpaReq==="none"?"Any":s.gpaReq}</span>
        <span>🎓 Major: {s.major}</span>
        <span style={{ color:urgency, fontWeight:600 }}>⏰ {daysLeft>0?`${daysLeft}d left`:"Closed"}</span>
      </div>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
        <button onClick={()=>setExpanded(e=>!e)} style={{ flex:1, background:"#F8FAFC", border:"1px solid #E2E8F0", borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:600, color:"#64748B", cursor:"pointer" }}>
          {expanded?"▲ Hide details":"▼ View details"}
        </button>
        <button onClick={()=>setShowStatus(s=>!s)} style={{ background:status?`${statusColor}15`:"#F8FAFC", border:`1px solid ${status?statusColor+"50":"#E2E8F0"}`, borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:600, color:status||"#64748B", cursor:"pointer" }}>
          📋 {status||"Track"}
        </button>
      </div>
      {showStatus && (
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {APP_STATUS_SCHOLARSHIP.map(st=>(
            <button key={st} onClick={()=>{ onStatus(s.id, st===status?null:st); setShowStatus(false); }}
              style={{ padding:"5px 12px", borderRadius:999, border:"1.5px solid", fontSize:12, fontWeight:600, cursor:"pointer", background:status===st?STATUS_COLORS_SCHOLARSHIP[st]:"#fff", color:status===st?"#fff":STATUS_COLORS_SCHOLARSHIP[st]||"#64748B", borderColor:STATUS_COLORS_SCHOLARSHIP[st]||"#E2E8F0" }}>{st}</button>
          ))}
        </div>
      )}
      {expanded && (
        <div style={{ background:"#F8FAFC", borderRadius:10, padding:"0.75rem", fontSize:12 }}>
          <div style={{ display:"grid", gap:6 }}>
            {[["💰 Amount",s.amountLabel],["📊 Min GPA",s.gpaReq==="none"?"No requirement":s.gpaReq],["🎓 Field",s.major],["🌍 Location",s.location],["👥 For",s.demographics.includes("any")?"Anyone":s.demographics.join(", ")],["⏰ Deadline",new Date(s.deadline).toLocaleDateString()]].map(([label,val])=>(
              <div key={label} style={{ display:"flex", justifyContent:"space-between", gap:8 }}>
                <span style={{ color:"#94A3B8", fontWeight:600 }}>{label}</span>
                <span style={{ color:"#0F172A", fontWeight:500, textAlign:"right", textTransform:"capitalize" }}>{val}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginTop:8 }}>
            {s.tags.map(t=><span key={t} style={{ background:"#E2E8F0", color:"#475569", padding:"2px 8px", borderRadius:999, fontSize:11 }}>#{t}</span>)}
          </div>
        </div>
      )}
      <a href={s.link} target="_blank" rel="noopener noreferrer"
        style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"linear-gradient(135deg,#047857,#059669)", color:"#fff", fontSize:14, fontWeight:700, padding:"11px 16px", borderRadius:10, textDecoration:"none", boxShadow:"0 2px 8px rgba(5,150,105,0.3)", marginTop:2 }}
        onMouseEnter={e=>{ e.currentTarget.style.opacity="0.88"; e.currentTarget.style.transform="translateY(-1px)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="none"; }}>
        Apply Now
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  );
}
