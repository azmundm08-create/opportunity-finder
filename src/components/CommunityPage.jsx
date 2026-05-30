import { useState } from "react";
import { SEEDED_POSTS, SEEDED_STORIES, SEEDED_CHAT, COMMUNITY_RULES, FORUM_CATEGORIES_C, CAT_COLORS_C, validateUsername, validateMessage } from "../data/community";

const SHEETS_URL_COMMUNITY = "https://script.google.com/macros/s/AKfycbxlRhz8GqMMwqsPoptLO0nEVvGDV7lHntJI5ZvnnsHO7kNWT48IRhhxfbA7z9ZYqjz1tQ/exec";

export function FounderBadge() {
  return (
    <span style={{ background:"linear-gradient(135deg,#312E81,#4338CA)", color:"#fff", fontSize:10, fontWeight:800, padding:"2px 8px", borderRadius:999, letterSpacing:"0.04em", display:"inline-flex", alignItems:"center", gap:3, boxShadow:"0 2px 8px rgba(49,46,129,0.4)", flexShrink:0 }}>
      👑 FOUNDER
    </span>
  );
}

export function AuthorName({ name, isOwner }) {
  if (!isOwner) return <span style={{ fontSize:13, fontWeight:600, color:"#374151" }}>{name}</span>;
  return <span style={{ fontSize:13, fontWeight:700, background:"linear-gradient(135deg,#312E81,#6366F1)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text" }}>{name}</span>;
}

function PostCard({ post, isOwner, upvoted, onUpvote, expanded, onExpand, newComment, onCommentChange, onAddComment, onDelete, onPin, onBan }) {
  const cc = CAT_COLORS_C[post.category]||{ bg:"#F1F5F9", text:"#475569" };
  const comments = post.comments||[];
  return (
    <div style={{ background:"#fff", border:`1.5px solid ${post.pinned?"#6366F1":post.isOwner?"#E0E7FF":"#F1F5F9"}`, borderRadius:16, padding:"1.25rem", boxShadow:post.pinned?"0 2px 12px rgba(99,102,241,0.1)":"none" }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:10, flexWrap:"wrap" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
          <div style={{ width:32, height:32, borderRadius:"50%", background:post.isOwner?"linear-gradient(135deg,#312E81,#4338CA)":"linear-gradient(135deg,#6366F1,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:14, flexShrink:0 }}>{post.author[0]}</div>
          <AuthorName name={post.author} isOwner={post.isOwner} />
          {post.isOwner && <FounderBadge />}
          {post.pinned && <span style={{ fontSize:11, color:"#6366F1", fontWeight:700 }}>📌 Pinned</span>}
          <span style={{ fontSize:11, color:"#94A3B8" }}>{post.timestamp}</span>
        </div>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          <span style={{ background:cc.bg, color:cc.text, fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:999, textTransform:"capitalize" }}>{post.category}</span>
          {isOwner && (
            <>
              <button onClick={()=>onPin(post.id)} title="Pin/unpin" style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, padding:"2px" }}>📌</button>
              <button onClick={()=>onBan(post.author)} title="Ban user" style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, padding:"2px" }}>🚫</button>
              <button onClick={()=>onDelete(post.id)} title="Delete post" style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, padding:"2px" }}>🗑️</button>
            </>
          )}
        </div>
      </div>
      <h3 style={{ margin:"0 0 8px", fontSize:15, fontWeight:700, color:"#0F172A", lineHeight:1.4 }}>{post.title}</h3>
      <p style={{ margin:"0 0 12px", fontSize:13, color:"#64748B", lineHeight:1.6 }}>{post.content}</p>
      <div style={{ display:"flex", alignItems:"center", gap:10 }}>
        <button onClick={()=>onUpvote(post.id)} style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 12px", borderRadius:999, border:"1.5px solid", fontSize:13, fontWeight:600, cursor:"pointer", background:upvoted[post.id]?"#EEF2FF":"#F8FAFC", borderColor:upvoted[post.id]?"#6366F1":"#E2E8F0", color:upvoted[post.id]?"#6366F1":"#64748B" }}>▲ {post.upvotes}</button>
        <button onClick={onExpand} style={{ display:"flex", alignItems:"center", gap:5, padding:"5px 12px", borderRadius:999, border:"1.5px solid #E2E8F0", fontSize:13, fontWeight:500, cursor:"pointer", background:"#F8FAFC", color:"#64748B" }}>💬 {comments.length} comments</button>
      </div>
      {expanded && (
        <div style={{ marginTop:14, borderTop:"1px solid #F1F5F9", paddingTop:14 }}>
          {comments.map(c=>(
            <div key={c.id} style={{ display:"flex", gap:8, marginBottom:10, padding:"8px 12px", background:c.isOwner?"#EEF2FF":"#F8FAFC", borderRadius:10, border:c.isOwner?"1px solid #C7D2FE":"1px solid #F1F5F9" }}>
              <div style={{ width:28, height:28, borderRadius:"50%", background:c.isOwner?"linear-gradient(135deg,#312E81,#4338CA)":"linear-gradient(135deg,#6366F1,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:12, flexShrink:0 }}>{c.author[0]}</div>
              <div style={{ flex:1 }}>
                <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3, flexWrap:"wrap" }}>
                  <AuthorName name={c.author} isOwner={c.isOwner} />
                  {c.isOwner && <FounderBadge />}
                  <span style={{ fontSize:11, color:"#94A3B8" }}>{c.timestamp}</span>
                  {isOwner && !c.isOwner && <button onClick={()=>{ /* delete comment */ }} style={{ background:"none", border:"none", color:"#EF4444", cursor:"pointer", fontSize:12 }}>🗑️</button>}
                </div>
                <p style={{ margin:0, fontSize:13, color:"#374151", lineHeight:1.5 }}>{c.text}</p>
              </div>
            </div>
          ))}
          <div style={{ display:"flex", gap:8, marginTop:10 }}>
            <input value={newComment} onChange={e=>onCommentChange(e.target.value)} onKeyDown={e=>e.key==="Enter"&&onAddComment()} placeholder="Write a comment..." style={{ flex:1, padding:"8px 12px", borderRadius:10, border:"1.5px solid #E2E8F0", fontSize:13, outline:"none", fontFamily:"inherit" }} />
            <button onClick={onAddComment} style={{ background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"8px 16px", borderRadius:10, fontWeight:600, fontSize:13, cursor:"pointer" }}>Post</button>
          </div>
        </div>
      )}
    </div>
  );
}

function StoryCard({ story:s, isOwner, onDelete, onFeature, onBan }) {
  const isFeatured = s.featured;
  return (
    <div style={{ background:isFeatured?"linear-gradient(135deg,#FFFBEB,#FFF7ED)":"#fff", border:`1.5px solid ${isFeatured?"#FEF3C7":s.isOwner?"#E0E7FF":"#F1F5F9"}`, borderRadius:16, padding:"1.25rem", boxShadow:isFeatured?"0 2px 12px rgba(245,158,11,0.08)":"none" }}>
      <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:10 }}>
        <div style={{ width:38, height:38, borderRadius:"50%", background:s.isOwner?"linear-gradient(135deg,#312E81,#4338CA)":isFeatured?"linear-gradient(135deg,#F59E0B,#EF4444)":"linear-gradient(135deg,#6366F1,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:15, flexShrink:0 }}>{s.author[0]}</div>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
            <AuthorName name={s.author} isOwner={s.isOwner} />
            {s.isOwner && <FounderBadge />}
          </div>
          <p style={{ margin:0, fontSize:12, color:isFeatured?"#92400E":"#64748B" }}>{s.grade}</p>
        </div>
        <div style={{ display:"flex", gap:6, alignItems:"center" }}>
          <span style={{ fontSize:11, color:"#94A3B8" }}>{s.timestamp}</span>
          {isOwner && (
            <>
              <button onClick={()=>onFeature(s.id)} title="Feature/unfeature" style={{ background:"none", border:"none", cursor:"pointer", fontSize:14 }}>⭐</button>
              <button onClick={()=>onBan(s.author)} title="Ban user" style={{ background:"none", border:"none", cursor:"pointer", fontSize:14 }}>🚫</button>
              <button onClick={()=>onDelete(s.id)} title="Delete" style={{ background:"none", border:"none", cursor:"pointer", fontSize:14 }}>🗑️</button>
            </>
          )}
        </div>
      </div>
      <p style={{ margin:"0 0 6px", fontSize:15, fontWeight:700, color:"#0F172A" }}>{s.achievement}</p>
      {s.program && <p style={{ margin:"0 0 8px", fontSize:12, color:isFeatured?"#92400E":"#6366F1", fontWeight:500 }}>📌 {s.program}</p>}
      {s.tip && <p style={{ margin:0, fontSize:13, color:isFeatured?"#78350F":"#64748B", fontStyle:"italic", lineHeight:1.5 }}>"{s.tip}"</p>}
    </div>
  );
}

export default function CommunityPage({ isPro, onUpgrade }) {
  const [stage, setStage] = useState("enter"); // "enter" | "rules" | "community"
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [rulesAccepted, setRulesAccepted] = useState(false);
  const [tab, setTab] = useState("forum");
  const [forumCat, setForumCat] = useState("all");
  const [posts, setPosts] = useState(SEEDED_POSTS);
  const [chat, setChat] = useState(SEEDED_CHAT);
  const [stories, setStories] = useState(SEEDED_STORIES);
  const [chatMsg, setChatMsg] = useState("");
  const [upvoted, setUpvoted] = useState({});
  const [expandedPost, setExpandedPost] = useState(null);
  const [newComment, setNewComment] = useState({});
  const [showNewPost, setShowNewPost] = useState(false);
  const [newPost, setNewPost] = useState({ title:"", content:"", category:"general" });
  const [showStoryForm, setShowStoryForm] = useState(false);
  const [newStory, setNewStory] = useState({ achievement:"", program:"", tip:"", grade:"" });
  const [feedback, setFeedback] = useState({ type:"suggestion", message:"", email:"" });
  const [feedbackSent, setFeedbackSent] = useState(false);
  const [postError, setPostError] = useState("");
  const [chatError, setChatError] = useState("");

  // Owner panel
  const [ownerClickCount, setOwnerClickCount] = useState(0);
  const [showOwnerLogin, setShowOwnerLogin] = useState(false);
  const [ownerPassword, setOwnerPassword] = useState("");
  const [isOwner, setIsOwner] = useState(false);
  const [ownerError, setOwnerError] = useState("");
  const [bannedUsers, setBannedUsers] = useState([]);

  const OWNER_PASSWORD = import.meta.env.VITE_OWNER_PASSWORD || "studentrise2026";
  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);
  const displayName = isOwner ? "StudentRise" : username;

  const handleLogoClick = () => {
    const newCount = ownerClickCount + 1;
    setOwnerClickCount(newCount);
    if (newCount >= 5) { setShowOwnerLogin(true); setOwnerClickCount(0); }
  };

  const handleOwnerLogin = () => {
    if (ownerPassword === OWNER_PASSWORD) { setIsOwner(true); setShowOwnerLogin(false); setOwnerPassword(""); setOwnerError(""); }
    else { setOwnerError("Incorrect password"); }
  };

  const handleEnter = async () => {
    const uError = validateUsername(username);
    if (uError) { setUsernameError(uError); return; }
    if (!email) { setEmailError("Email is required to join the community"); return; }
    if (!isValidEmail(email)) { setEmailError("Please enter a valid email address"); return; }
    setUsernameError(""); setEmailError("");
    try {
      await fetch(SHEETS_URL_COMMUNITY, { method:"POST", mode:"no-cors", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ type:"community_member", username, email, timestamp:new Date().toLocaleString() }) });
    } catch(e) {}
    setStage("rules");
  };

  const filteredPosts = posts.filter(p => (forumCat==="all"||p.category===forumCat) && !bannedUsers.includes(p.author));
  const pinnedPosts = filteredPosts.filter(p=>p.pinned);
  const regularPosts = filteredPosts.filter(p=>!p.pinned);
  const featuredStories = stories.filter(s=>s.featured && !bannedUsers.includes(s.author));
  const regularStories = stories.filter(s=>!s.featured && !bannedUsers.includes(s.author));

  const sendChat = () => {
    if (!chatMsg.trim()) return;
    const error = validateMessage(chatMsg);
    if (error) { setChatError(error); return; }
    setChatError("");
    setChat(c=>[...c, { id:Date.now(), author:displayName, isOwner, message:chatMsg.trim(), timestamp:"just now" }]);
    setChatMsg("");
  };

  const toggleUpvote = (id) => {
    setUpvoted(u=>({ ...u,[id]:!u[id] }));
    setPosts(p=>p.map(post=>post.id===id?{ ...post, upvotes:post.upvotes+(upvoted[id]?-1:1) }:post));
  };

  const addComment = (postId) => {
    if (!newComment[postId]?.trim()) return;
    const error = validateMessage(newComment[postId]);
    if (error) return;
    setPosts(p=>p.map(post=>post.id===postId?{ ...post, comments:[...(post.comments||[]),{ id:Date.now(), author:displayName, isOwner, text:newComment[postId], timestamp:"just now" }], commentCount:(post.commentCount||0)+1 }:post));
    setNewComment(c=>({ ...c,[postId]:"" }));
  };

  const submitPost = () => {
    if (!newPost.title.trim()||!newPost.content.trim()) return;
    const error = validateMessage(newPost.content) || validateMessage(newPost.title);
    if (error) { setPostError(error); return; }
    setPostError("");
    setPosts(p=>[{ id:Date.now(), author:displayName, isOwner, category:newPost.category, title:newPost.title, content:newPost.content, upvotes:0, comments:[], timestamp:"just now", pinned:false }, ...p]);
    setNewPost({ title:"", content:"", category:"general" });
    setShowNewPost(false);
  };

  const submitStory = () => {
    if (!newStory.achievement.trim()) return;
    setStories(s=>[{ id:Date.now(), author:displayName, isOwner, grade:newStory.grade, achievement:newStory.achievement, program:newStory.program, tip:newStory.tip, featured:isOwner, timestamp:"just now" }, ...s]);
    setNewStory({ achievement:"", program:"", tip:"", grade:"" });
    setShowStoryForm(false);
  };

  const submitFeedback = async () => {
    if (!feedback.message.trim()) return;
    try {
      await fetch(SHEETS_URL_COMMUNITY, { method:"POST", mode:"no-cors", headers:{ "Content-Type":"application/json" }, body:JSON.stringify({ type:"feedback", feedbackType:feedback.type, message:feedback.message, email:feedback.email||email, username, timestamp:new Date().toLocaleString() }) });
    } catch(e) {}
    setFeedbackSent(true);
  };

  const inp = { width:"100%", padding:"10px 12px", borderRadius:10, border:"1.5px solid #E2E8F0", fontSize:14, outline:"none", boxSizing:"border-box", fontFamily:"inherit" };

  // ENTER SCREEN
  if (stage==="enter") return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:"#F8FAFC", minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(135deg,#0F172A,#1E293B,#312E81)", padding:"2.5rem 1.5rem 3.5rem", textAlign:"center" }}>
        <div onClick={handleLogoClick} style={{ cursor:"default" }}>
          <span style={{ background:"rgba(99,102,241,0.2)", color:"#A5B4FC", fontSize:12, fontWeight:700, padding:"4px 14px", borderRadius:999, display:"inline-block", marginBottom:14 }}>STUDENT COMMUNITY</span>
          <h1 style={{ margin:"0 0 10px", fontSize:"clamp(24px,5vw,42px)", fontWeight:800, color:"#fff" }}>Join the Community 👥</h1>
          <p style={{ margin:0, color:"rgba(255,255,255,0.6)", fontSize:15 }}>Connect with students, share wins, and get advice</p>
        </div>
      </div>
      <div style={{ maxWidth:420, margin:"40px auto", padding:"0 1rem" }}>
        <div style={{ background:"#fff", borderRadius:20, padding:"2rem", boxShadow:"0 4px 24px rgba(0,0,0,0.08)" }}>
          <div style={{ fontSize:48, marginBottom:16, textAlign:"center" }}>👋</div>
          <h2 style={{ margin:"0 0 8px", fontSize:20, fontWeight:700, color:"#0F172A", textAlign:"center" }}>Who are you?</h2>
          <p style={{ margin:"0 0 20px", fontSize:13, color:"#64748B", textAlign:"center" }}>Your info stays private — we just need it to keep the community safe.</p>
          <div style={{ display:"grid", gap:12, marginBottom:16 }}>
            <div>
              <label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Display name *</label>
              <input value={username} onChange={e=>{ setUsername(e.target.value); setUsernameError(""); }} onKeyDown={e=>e.key==="Enter"&&handleEnter()} placeholder="e.g. Alex, Priya, StudentAce..." style={inp} />
              {usernameError && <p style={{ fontSize:12, color:"#EF4444", margin:"4px 0 0", fontWeight:500 }}>⚠️ {usernameError}</p>}
            </div>
            <div>
              <label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Email address *</label>
              <input value={email} onChange={e=>{ setEmail(e.target.value); setEmailError(""); }} type="email" placeholder="your@email.com" style={inp} />
              {emailError && <p style={{ fontSize:12, color:"#EF4444", margin:"4px 0 0", fontWeight:500 }}>⚠️ {emailError}</p>}
              <p style={{ fontSize:11, color:"#94A3B8", margin:"4px 0 0" }}>Your email is private and only used for account safety</p>
            </div>
          </div>
          <button onClick={handleEnter} style={{ width:"100%", background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"12px", borderRadius:10, fontWeight:700, fontSize:15, cursor:"pointer" }}>
            Continue →
          </button>
        </div>
      </div>
      {showOwnerLogin && (
        <div onClick={e=>e.target===e.currentTarget&&setShowOwnerLogin(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999 }}>
          <div style={{ background:"#fff", borderRadius:16, padding:"1.5rem", width:320 }}>
            <h3 style={{ margin:"0 0 12px", fontSize:16, fontWeight:700 }}>Owner Access</h3>
            <input type="password" value={ownerPassword} onChange={e=>setOwnerPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleOwnerLogin()} placeholder="Enter owner password" style={{ ...inp, marginBottom:8 }} />
            {ownerError && <p style={{ fontSize:12, color:"#EF4444", margin:"0 0 8px" }}>{ownerError}</p>}
            <button onClick={handleOwnerLogin} style={{ width:"100%", background:"linear-gradient(135deg,#312E81,#4338CA)", color:"#fff", border:"none", padding:"10px", borderRadius:10, fontWeight:700, cursor:"pointer" }}>Unlock</button>
          </div>
        </div>
      )}
    </div>
  );

  // RULES SCREEN
  if (stage==="rules") return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:"#F8FAFC", minHeight:"100vh", display:"flex", alignItems:"center", justifyContent:"center", padding:"1rem" }}>
      <div style={{ background:"#fff", borderRadius:20, padding:"2rem", maxWidth:480, width:"100%", boxShadow:"0 4px 24px rgba(0,0,0,0.08)" }}>
        <div style={{ fontSize:40, marginBottom:12, textAlign:"center" }}>📋</div>
        <h2 style={{ margin:"0 0 6px", fontSize:20, fontWeight:700, color:"#0F172A", textAlign:"center" }}>Community Rules</h2>
        <p style={{ margin:"0 0 16px", fontSize:13, color:"#64748B", textAlign:"center" }}>Please read and accept before joining</p>
        <div style={{ display:"grid", gap:8, marginBottom:20 }}>
          {COMMUNITY_RULES.map((rule,i)=>(
            <div key={i} style={{ display:"flex", gap:10, alignItems:"flex-start", padding:"8px 12px", background:"#F8FAFC", borderRadius:8 }}>
              <span style={{ fontSize:12, fontWeight:700, color:"#6366F1", flexShrink:0, marginTop:1 }}>{i+1}.</span>
              <p style={{ margin:0, fontSize:13, color:"#374151", lineHeight:1.4 }}>{rule}</p>
            </div>
          ))}
        </div>
        <label style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", marginBottom:16 }}>
          <input type="checkbox" checked={rulesAccepted} onChange={e=>setRulesAccepted(e.target.checked)} style={{ width:18, height:18, accentColor:"#6366F1", flexShrink:0 }} />
          <span style={{ fontSize:13, color:"#374151", fontWeight:500 }}>I have read and agree to follow the community rules</span>
        </label>
        <button onClick={()=>rulesAccepted&&setStage("community")} disabled={!rulesAccepted}
          style={{ width:"100%", background:!rulesAccepted?"#F1F5F9":"linear-gradient(135deg,#6366F1,#8B5CF6)", color:!rulesAccepted?"#94A3B8":"#fff", border:"none", padding:"12px", borderRadius:10, fontWeight:700, fontSize:15, cursor:!rulesAccepted?"not-allowed":"pointer" }}>
          Enter Community →
        </button>
      </div>
    </div>
  );

  // COMMUNITY SCREEN
  const tabs = [
    { id:"forum", icon:"💬", label:"Forum" },
    { id:"chat", icon:"⚡", label:"Live Chat" },
    { id:"stories", icon:"🏆", label:"Success Stories" },
    { id:"feedback", icon:"📣", label:"Feedback" },
  ];

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:"#F8FAFC", minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(135deg,#0F172A,#1E293B,#312E81)", padding:"2.5rem 1.5rem 3.5rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 50%)" }} />
        <div style={{ position:"relative" }}>
          <div onClick={handleLogoClick} style={{ cursor:"default", display:"inline-block", marginBottom:14 }}>
            <span style={{ background:"rgba(99,102,241,0.2)", color:"#A5B4FC", fontSize:12, fontWeight:700, padding:"4px 14px", borderRadius:999 }}>STUDENT COMMUNITY</span>
          </div>
          <h1 style={{ margin:"0 0 10px", fontSize:"clamp(24px,5vw,42px)", fontWeight:800, color:"#fff" }}>Community 👥</h1>
          <p style={{ margin:"0 0 16px", color:"rgba(255,255,255,0.65)", fontSize:15, maxWidth:480, marginLeft:"auto", marginRight:"auto" }}>Connect with students, share wins, get advice, and grow together</p>
          <div style={{ display:"inline-flex", alignItems:"center", gap:10, background:"rgba(255,255,255,0.08)", borderRadius:12, padding:"8px 16px" }}>
            <span style={{ fontSize:13, color:"rgba(255,255,255,0.7)" }}>Logged in as</span>
            <span style={{ fontSize:13, fontWeight:700, color:"#fff" }}>{displayName}</span>
            {isOwner && <FounderBadge />}
          </div>
          {isOwner && (
            <div style={{ marginTop:10, display:"inline-flex", alignItems:"center", gap:8, background:"rgba(49,46,129,0.4)", borderRadius:10, padding:"6px 14px" }}>
              <span style={{ fontSize:12, color:"#A5B4FC", fontWeight:600 }}>👑 Owner mode active — you can delete and moderate all content</span>
              <button onClick={()=>setIsOwner(false)} style={{ background:"none", border:"none", color:"#EF4444", fontSize:12, fontWeight:600, cursor:"pointer" }}>Exit</button>
            </div>
          )}
        </div>
      </div>

      <div style={{ maxWidth:960, margin:"0 auto", padding:"0 1rem 3rem" }}>
        <div style={{ display:"flex", gap:4, background:"#fff", borderRadius:16, border:"1.5px solid #F1F5F9", padding:4, marginTop:16, boxShadow:"0 4px 24px rgba(0,0,0,0.07)", marginBottom:24, overflowX:"auto" }}>
          {tabs.map(t=>(
            <button key={t.id} onClick={()=>setTab(t.id)} style={{ padding:"9px 18px", borderRadius:10, border:"none", fontSize:13, fontWeight:600, cursor:"pointer", display:"flex", alignItems:"center", gap:5, whiteSpace:"nowrap", flex:1, justifyContent:"center", background:tab===t.id?"linear-gradient(135deg,#6366F1,#8B5CF6)":"transparent", color:tab===t.id?"#fff":"#64748B", boxShadow:tab===t.id?"0 2px 8px rgba(99,102,241,0.3)":"none" }}>
              {t.icon} {t.label}
            </button>
          ))}
        </div>

        {/* FORUM */}
        {tab==="forum" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:10 }}>
              <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                {FORUM_CATEGORIES_C.map(c=>(
                  <button key={c} onClick={()=>setForumCat(c)} style={{ padding:"6px 14px", borderRadius:999, border:"1.5px solid", fontSize:12, fontWeight:500, cursor:"pointer", background:forumCat===c?"#6366F1":"#fff", color:forumCat===c?"#fff":"#64748B", borderColor:forumCat===c?"#6366F1":"#E2E8F0", textTransform:"capitalize" }}>{c==="all"?"All":c}</button>
                ))}
              </div>
              {isPro || isOwner ? (
                <button onClick={()=>setShowNewPost(true)} style={{ background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"9px 18px", borderRadius:10, fontWeight:700, fontSize:13, cursor:"pointer" }}>✏️ New Post</button>
              ) : (
                <button onClick={onUpgrade} style={{ background:"#F8FAFC", border:"1.5px solid #E2E8F0", color:"#64748B", padding:"9px 18px", borderRadius:10, fontWeight:600, fontSize:13, cursor:"pointer" }}>🔒 Pro to post</button>
              )}
            </div>

            {showNewPost && (
              <div style={{ background:"#fff", border:"1.5px solid #6366F1", borderRadius:16, padding:"1.25rem", marginBottom:16 }}>
                <h3 style={{ margin:"0 0 12px", fontSize:15, fontWeight:700, color:"#0F172A" }}>Create a new post</h3>
                {postError && <p style={{ fontSize:12, color:"#EF4444", margin:"0 0 8px", fontWeight:500 }}>⚠️ {postError}</p>}
                <div style={{ display:"grid", gap:10 }}>
                  <input style={{ ...inp, fontSize:14 }} value={newPost.title} onChange={e=>setNewPost(p=>({...p,title:e.target.value}))} placeholder="Post title..." />
                  <select style={{ ...inp, fontSize:14 }} value={newPost.category} onChange={e=>setNewPost(p=>({...p,category:e.target.value}))}>
                    {["general","college","opportunities","studytips"].map(c=><option key={c}>{c}</option>)}
                  </select>
                  <textarea style={{ ...inp, minHeight:100, resize:"vertical", fontSize:14 }} value={newPost.content} onChange={e=>setNewPost(p=>({...p,content:e.target.value}))} placeholder="Share your thoughts, questions, or advice..." />
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={submitPost} style={{ flex:1, background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"10px", borderRadius:10, fontWeight:700, fontSize:13, cursor:"pointer" }}>Post</button>
                    <button onClick={()=>{ setShowNewPost(false); setPostError(""); }} style={{ padding:"10px 16px", borderRadius:10, border:"1px solid #E2E8F0", background:"#fff", fontSize:13, cursor:"pointer", color:"#64748B" }}>Cancel</button>
                  </div>
                </div>
              </div>
            )}

            {pinnedPosts.length>0 && (
              <div style={{ marginBottom:16 }}>
                <p style={{ margin:"0 0 8px", fontSize:12, fontWeight:700, color:"#6366F1", textTransform:"uppercase", letterSpacing:"0.06em" }}>📌 Pinned</p>
                {pinnedPosts.map(post=><PostCard key={post.id} post={post} isOwner={isOwner} upvoted={upvoted} onUpvote={toggleUpvote} expanded={expandedPost===post.id} onExpand={()=>setExpandedPost(expandedPost===post.id?null:post.id)} newComment={newComment[post.id]||""} onCommentChange={val=>setNewComment(c=>({...c,[post.id]:val}))} onAddComment={()=>addComment(post.id)} onDelete={id=>setPosts(p=>p.filter(x=>x.id!==id))} onPin={id=>setPosts(p=>p.map(x=>x.id===id?{...x,pinned:!x.pinned}:x))} onBan={author=>setBannedUsers(b=>[...b,author])} />)}
              </div>
            )}

            <div style={{ display:"grid", gap:12 }}>
              {regularPosts.map(post=><PostCard key={post.id} post={post} isOwner={isOwner} upvoted={upvoted} onUpvote={toggleUpvote} expanded={expandedPost===post.id} onExpand={()=>setExpandedPost(expandedPost===post.id?null:post.id)} newComment={newComment[post.id]||""} onCommentChange={val=>setNewComment(c=>({...c,[post.id]:val}))} onAddComment={()=>addComment(post.id)} onDelete={id=>setPosts(p=>p.filter(x=>x.id!==id))} onPin={id=>setPosts(p=>p.map(x=>x.id===id?{...x,pinned:!x.pinned}:x))} onBan={author=>setBannedUsers(b=>[...b,author])} />)}
            </div>
          </div>
        )}

        {/* LIVE CHAT */}
        {tab==="chat" && (
          <div style={{ display:"grid", gridTemplateColumns:"1fr 260px", gap:16, alignItems:"start" }}>
            <div style={{ background:"#fff", border:"1.5px solid #F1F5F9", borderRadius:16, overflow:"hidden" }}>
              <div style={{ padding:"12px 16px", borderBottom:"1px solid #F1F5F9", display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:"#22C55E", boxShadow:"0 0 6px #22C55E" }} />
                <span style={{ fontSize:13, fontWeight:600, color:"#0F172A" }}>Live Chat</span>
              </div>
              <div style={{ height:400, overflowY:"auto", padding:"12px 16px", display:"flex", flexDirection:"column", gap:10 }}>
                {chat.filter(m=>!bannedUsers.includes(m.author)).map(m=>(
                  <div key={m.id} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                    <div style={{ width:30, height:30, borderRadius:"50%", background:m.isOwner?"linear-gradient(135deg,#312E81,#4338CA)":"linear-gradient(135deg,#6366F1,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:13, flexShrink:0 }}>{m.author[0]}</div>
                    <div style={{ flex:1, background:m.isOwner?"linear-gradient(135deg,#EEF2FF,#E0E7FF)":"#F8FAFC", borderRadius:10, padding:"8px 12px", border:m.isOwner?"1px solid #C7D2FE":"1px solid #F1F5F9" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:3, flexWrap:"wrap" }}>
                        <AuthorName name={m.author} isOwner={m.isOwner} />
                        {m.isOwner && <FounderBadge />}
                        <span style={{ fontSize:10, color:"#94A3B8", marginLeft:"auto" }}>{m.timestamp}</span>
                        {isOwner && !m.isOwner && <button onClick={()=>setChat(c=>c.filter(x=>x.id!==m.id))} style={{ background:"none", border:"none", color:"#EF4444", cursor:"pointer", fontSize:13, padding:"0 2px" }}>🗑️</button>}
                        {isOwner && !m.isOwner && <button onClick={()=>setBannedUsers(b=>[...b,m.author])} style={{ background:"none", border:"none", color:"#F59E0B", cursor:"pointer", fontSize:13, padding:"0 2px" }}>🚫</button>}
                      </div>
                      <p style={{ margin:0, fontSize:13, color:"#374151", lineHeight:1.5 }}>{m.message}</p>
                    </div>
                  </div>
                ))}
              </div>
              {chatError && <p style={{ fontSize:12, color:"#EF4444", margin:"0 16px", fontWeight:500 }}>⚠️ {chatError}</p>}
              <div style={{ padding:"12px 16px", borderTop:"1px solid #F1F5F9", display:"flex", gap:8 }}>
                <input value={chatMsg} onChange={e=>{ setChatMsg(e.target.value); setChatError(""); }} onKeyDown={e=>e.key==="Enter"&&sendChat()} placeholder="Type a message..." style={{ flex:1, padding:"10px 12px", borderRadius:10, border:"1.5px solid #E2E8F0", fontSize:13, outline:"none", fontFamily:"inherit" }} />
                <button onClick={sendChat} disabled={!chatMsg.trim()} style={{ background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"10px 16px", borderRadius:10, fontWeight:600, fontSize:13, cursor:!chatMsg.trim()?"not-allowed":"pointer", opacity:!chatMsg.trim()?0.5:1 }}>Send</button>
              </div>
            </div>
            <div style={{ background:"#fff", border:"1.5px solid #F1F5F9", borderRadius:14, padding:"1rem" }}>
              <p style={{ margin:"0 0 10px", fontSize:13, fontWeight:700, color:"#0F172A" }}>👥 Active users</p>
              {[...new Set(chat.map(m=>m.author))].slice(0,6).map(name=>(
                <div key={name} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 0", borderTop:"1px solid #F8FAFC" }}>
                  <div style={{ width:8, height:8, borderRadius:"50%", background:"#22C55E", flexShrink:0 }} />
                  <AuthorName name={name} isOwner={name==="StudentRise"} />
                  {name==="StudentRise" && <FounderBadge />}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUCCESS STORIES */}
        {tab==="stories" && (
          <div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:10 }}>
              <p style={{ margin:0, fontSize:13, color:"#64748B" }}>Real wins from real students 🏆</p>
              <button onClick={()=>setShowStoryForm(true)} style={{ background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"9px 18px", borderRadius:10, fontWeight:700, fontSize:13, cursor:"pointer" }}>+ Share Your Win</button>
            </div>
            {showStoryForm && (
              <div style={{ background:"#fff", border:"1.5px solid #6366F1", borderRadius:16, padding:"1.25rem", marginBottom:16 }}>
                <h3 style={{ margin:"0 0 12px", fontSize:15, fontWeight:700, color:"#0F172A" }}>Share your success story 🎉</h3>
                <div style={{ display:"grid", gap:10 }}>
                  <input style={{ ...inp, fontSize:14 }} value={newStory.grade} onChange={e=>setNewStory(s=>({...s,grade:e.target.value}))} placeholder="Your grade (e.g. Grade 11)" />
                  <input style={{ ...inp, fontSize:14 }} value={newStory.achievement} onChange={e=>setNewStory(s=>({...s,achievement:e.target.value}))} placeholder="Your achievement..." />
                  <input style={{ ...inp, fontSize:14 }} value={newStory.program} onChange={e=>setNewStory(s=>({...s,program:e.target.value}))} placeholder="Program or opportunity (optional)" />
                  <textarea style={{ ...inp, minHeight:80, resize:"vertical", fontSize:14 }} value={newStory.tip} onChange={e=>setNewStory(s=>({...s,tip:e.target.value}))} placeholder="One tip for other students... (optional)" />
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={submitStory} style={{ flex:1, background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"10px", borderRadius:10, fontWeight:700, fontSize:13, cursor:"pointer" }}>Share Story</button>
                    <button onClick={()=>setShowStoryForm(false)} style={{ padding:"10px 16px", borderRadius:10, border:"1px solid #E2E8F0", background:"#fff", fontSize:13, cursor:"pointer", color:"#64748B" }}>Cancel</button>
                  </div>
                </div>
              </div>
            )}
            {featuredStories.length>0 && (
              <>
                <p style={{ margin:"0 0 10px", fontSize:12, fontWeight:700, color:"#F59E0B", textTransform:"uppercase", letterSpacing:"0.08em" }}>⭐ Featured Stories</p>
                <div style={{ display:"grid", gap:12, marginBottom:20 }}>
                  {featuredStories.map(s=><StoryCard key={s.id} story={s} isOwner={isOwner} onDelete={id=>setStories(st=>st.filter(x=>x.id!==id))} onFeature={id=>setStories(st=>st.map(x=>x.id===id?{...x,featured:!x.featured}:x))} onBan={author=>setBannedUsers(b=>[...b,author])} />)}
                </div>
              </>
            )}
            {regularStories.length>0 && (
              <>
                <p style={{ margin:"0 0 10px", fontSize:12, fontWeight:700, color:"#64748B", textTransform:"uppercase", letterSpacing:"0.08em" }}>All Stories</p>
                <div style={{ display:"grid", gap:12 }}>
                  {regularStories.map(s=><StoryCard key={s.id} story={s} isOwner={isOwner} onDelete={id=>setStories(st=>st.filter(x=>x.id!==id))} onFeature={id=>setStories(st=>st.map(x=>x.id===id?{...x,featured:!x.featured}:x))} onBan={author=>setBannedUsers(b=>[...b,author])} />)}
                </div>
              </>
            )}
          </div>
        )}

        {/* FEEDBACK */}
        {tab==="feedback" && (
          <div style={{ maxWidth:600, margin:"0 auto" }}>
            {feedbackSent ? (
              <div style={{ textAlign:"center", padding:"3rem" }}>
                <div style={{ fontSize:56, marginBottom:16 }}>🙏</div>
                <h2 style={{ margin:"0 0 8px", fontSize:22, fontWeight:800, color:"#0F172A" }}>Thank you!</h2>
                <p style={{ color:"#64748B", margin:"0 0 20px" }}>We read every single submission and use your feedback to improve StudentRise.</p>
                <button onClick={()=>setFeedbackSent(false)} style={{ background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"10px 24px", borderRadius:10, fontWeight:600, cursor:"pointer" }}>Submit another</button>
              </div>
            ) : (
              <div>
                <div style={{ background:"linear-gradient(135deg,#EEF2FF,#F5F3FF)", border:"1px solid #C7D2FE", borderRadius:14, padding:"1rem", marginBottom:20, display:"flex", gap:10 }}>
                  <span style={{ fontSize:20 }}>👂</span>
                  <p style={{ margin:0, fontSize:13, color:"#4338CA", fontWeight:500 }}>We read every single submission. Your feedback helps make StudentRise better for everyone!</p>
                </div>
                <div style={{ display:"grid", gap:12 }}>
                  <div>
                    <p style={{ margin:"0 0 8px", fontSize:13, fontWeight:700, color:"#374151" }}>Type of feedback</p>
                    <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                      {[["suggestion","💡 Suggestion"],["bug","🐛 Bug Report"],["problem","⚠️ Problem"],["compliment","❤️ Compliment"],["other","💬 Other"]].map(([val,label])=>(
                        <button key={val} onClick={()=>setFeedback(f=>({...f,type:val}))} style={{ padding:"8px 16px", borderRadius:999, border:"1.5px solid", fontSize:13, fontWeight:500, cursor:"pointer", background:feedback.type===val?"#6366F1":"#fff", color:feedback.type===val?"#fff":"#64748B", borderColor:feedback.type===val?"#6366F1":"#E2E8F0" }}>{label}</button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:6 }}>Your message *</label>
                    <textarea value={feedback.message} onChange={e=>setFeedback(f=>({...f,message:e.target.value}))} placeholder="Tell us what you think, what's broken, or what you'd love to see..." style={{ ...inp, minHeight:120, resize:"vertical" }} />
                  </div>
                  <div>
                    <label style={{ fontSize:13, fontWeight:600, color:"#374151", display:"block", marginBottom:6 }}>Your email (optional — if you want a reply)</label>
                    <input style={inp} type="email" value={feedback.email} onChange={e=>setFeedback(f=>({...f,email:e.target.value}))} placeholder="your@email.com" />
                  </div>
                  <button onClick={submitFeedback} disabled={!feedback.message.trim()}
                    style={{ background:!feedback.message.trim()?"#F1F5F9":"linear-gradient(135deg,#6366F1,#8B5CF6)", color:!feedback.message.trim()?"#94A3B8":"#fff", border:"none", padding:"12px", borderRadius:10, fontWeight:700, fontSize:15, cursor:!feedback.message.trim()?"not-allowed":"pointer" }}>
                    Send Feedback 🚀
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {showOwnerLogin && (
        <div onClick={e=>e.target===e.currentTarget&&setShowOwnerLogin(false)} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.5)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:999 }}>
          <div style={{ background:"#fff", borderRadius:16, padding:"1.5rem", width:320 }}>
            <h3 style={{ margin:"0 0 12px", fontSize:16, fontWeight:700 }}>Owner Access</h3>
            <input type="password" value={ownerPassword} onChange={e=>setOwnerPassword(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleOwnerLogin()} placeholder="Enter owner password" style={{ ...inp, marginBottom:8 }} />
            {ownerError && <p style={{ fontSize:12, color:"#EF4444", margin:"0 0 8px" }}>{ownerError}</p>}
            <button onClick={handleOwnerLogin} style={{ width:"100%", background:"linear-gradient(135deg,#312E81,#4338CA)", color:"#fff", border:"none", padding:"10px", borderRadius:10, fontWeight:700, cursor:"pointer" }}>Unlock</button>
          </div>
        </div>
      )}
    </div>
  );
}
