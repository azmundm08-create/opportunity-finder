import OpportunityCard from "./OpportunityCard";
import ProGate from "./ProGate";
import { OPPORTUNITIES, APP_STATUS, STATUS_COLORS } from "../data/opportunities";

export default function TrackerTab({ appStatuses, isPro, onUpgrade, onStatusChange, onToggleSave, savedIds, profile }) {
  if (!isPro) return <ProGate feature="Track every application in one place. Know exactly where you stand with every opportunity." onUpgrade={onUpgrade} />;
  const tracked = OPPORTUNITIES.filter(o=>appStatuses[o.id]);
  const byStatus = APP_STATUS.reduce((acc,s)=>{ acc[s]=tracked.filter(o=>appStatuses[o.id]===s); return acc; },{});
  if (tracked.length===0) return (
    <div style={{ textAlign:"center", padding:"3rem 1rem" }}>
      <div style={{ fontSize:56, marginBottom:16 }}>📋</div>
      <h2 style={{ margin:"0 0 8px", fontSize:20, fontWeight:700, color:"#0F172A" }}>No applications tracked yet</h2>
      <p style={{ color:"#64748B", margin:0, fontSize:14 }}>Click "📋 Track" on any saved opportunity card to track your application status.</p>
    </div>
  );
  return (
    <div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:10, marginBottom:24 }}>
        {APP_STATUS.map(s=>(
          <div key={s} style={{ background:"#fff", border:`1.5px solid ${STATUS_COLORS[s]}30`, borderRadius:12, padding:"0.75rem", textAlign:"center" }}>
            <p style={{ margin:"0 0 4px", fontSize:22, fontWeight:800, color:STATUS_COLORS[s] }}>{byStatus[s].length}</p>
            <p style={{ margin:0, fontSize:12, color:"#64748B", fontWeight:500 }}>{s}</p>
          </div>
        ))}
      </div>
      {APP_STATUS.filter(s=>byStatus[s].length>0).map(s=>(
        <div key={s} style={{ marginBottom:24 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
            <div style={{ width:10, height:10, borderRadius:"50%", background:STATUS_COLORS[s] }} />
            <p style={{ margin:0, fontSize:13, fontWeight:700, color:STATUS_COLORS[s], textTransform:"uppercase", letterSpacing:"0.06em" }}>{s} ({byStatus[s].length})</p>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:12 }}>
            {byStatus[s].map(o=><OpportunityCard key={o.id} opp={o} isPro={isPro} saved={savedIds.includes(o.id)} onToggleSave={onToggleSave} appStatus={appStatuses[o.id]} onStatusChange={onStatusChange} profile={profile} />)}
          </div>
        </div>
      ))}
    </div>
  );
}
