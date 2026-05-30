import OpportunityCard from "./OpportunityCard";
import ProGate from "./ProGate";
import { OPPORTUNITIES } from "../data/opportunities";

export default function SavedTab({ savedIds, appStatuses, isPro, onToggleSave, onStatusChange, onUpgrade, profile }) {
  const savedOpps = OPPORTUNITIES.filter(o=>savedIds.includes(o.id));
  if (!isPro) return <ProGate feature="Save opportunities and come back to them anytime. Never lose track of a deadline again." onUpgrade={onUpgrade} />;
  if (savedOpps.length===0) return (
    <div style={{ textAlign:"center", padding:"3rem 1rem" }}>
      <div style={{ fontSize:56, marginBottom:16 }}>🏷️</div>
      <h2 style={{ margin:"0 0 8px", fontSize:20, fontWeight:700, color:"#0F172A" }}>No saved opportunities yet</h2>
      <p style={{ color:"#64748B", margin:0, fontSize:14 }}>Click the 🏷️ bookmark icon on any opportunity card to save it here.</p>
    </div>
  );
  const urgentOpps = savedOpps.filter(o=>{ const d=Math.ceil((new Date(o.deadline)-new Date())/86400000); return d>0&&d<=7; });
  const sorted = [...savedOpps].sort((a,b)=>new Date(a.deadline)-new Date(b.deadline));
  return (
    <div>
      {urgentOpps.length>0 && (
        <div style={{ background:"#FEF2F2", border:"1.5px solid #FECACA", borderRadius:14, padding:"1rem", marginBottom:20 }}>
          <p style={{ margin:"0 0 8px", fontWeight:700, fontSize:14, color:"#DC2626" }}>⏰ Closing soon — don't miss these!</p>
          <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
            {urgentOpps.map(o=>{ const d=Math.ceil((new Date(o.deadline)-new Date())/86400000); return (
              <div key={o.id} style={{ background:"#fff", border:"1px solid #FECACA", borderRadius:10, padding:"6px 12px", fontSize:13 }}>
                <span style={{ fontWeight:600, color:"#0F172A" }}>{o.title.replace("[EARLY ACCESS] ","").slice(0,40)}...</span>
                <span style={{ color:"#DC2626", fontWeight:700, marginLeft:8 }}>{d}d left</span>
              </div>
            ); })}
          </div>
        </div>
      )}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <p style={{ margin:0, fontSize:14, color:"#64748B" }}><strong style={{ color:"#0F172A" }}>{savedOpps.length}</strong> saved — sorted by deadline</p>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
        {sorted.map(o=><OpportunityCard key={o.id} opp={o} isPro={isPro} saved={true} onToggleSave={onToggleSave} appStatus={appStatuses[o.id]} onStatusChange={onStatusChange} profile={profile} />)}
      </div>
    </div>
  );
}
