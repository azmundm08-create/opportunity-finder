export const BANNED_WORDS = ["fuck","shit","ass","bitch","damn","crap","sex","porn","nude","kill","hate","stupid","idiot","retard","nigga","nigger","faggot","slut","whore","dick","cock","pussy","bastard","wtf","stfu","kys"];

export const validateUsername = (name) => {
  const clean = name.toLowerCase().trim();
  if (clean.length < 2) return "Username must be at least 2 characters";
  if (clean.length > 20) return "Username must be under 20 characters";
  if (!/^[a-zA-Z0-9_ ]+$/.test(clean)) return "Only letters, numbers, spaces and underscores allowed";
  if (BANNED_WORDS.some(w => clean.includes(w))) return "That username isn't allowed — please choose another";
  if (/^\d+$/.test(clean)) return "Username can't be only numbers";
  return null;
};

export const validateMessage = (msg) => {
  const clean = msg.toLowerCase();
  if (BANNED_WORDS.some(w => clean.includes(w))) return "Your message contains inappropriate content — please revise it";
  if (msg.length > 500) return "Message too long — keep it under 500 characters";
  return null;
};

export const SEEDED_POSTS = [
  { id:1, author:"Jordan L.", isOwner:false, category:"college", title:"What's your college list looking like for 2027?", content:"Rising senior here! I've been building my college list and would love to hear what other students are thinking. My list is pretty spread — some reaches like MIT and Stanford, matches like UCLA and UVA, and safeties like my state school. How do you decide how many schools to apply to?", upvotes:34, comments:[], timestamp:"3 hours ago", pinned:false },
  { id:2, author:"Priya M.", isOwner:false, category:"opportunities", title:"Just found out about the Congressional App Challenge — anyone else applying?", content:"I was browsing StudentRise and discovered the Congressional App Challenge. I had no idea this existed! Has anyone here applied before? What kind of app did you build? I'm thinking of making something to help students track their college application deadlines.", upvotes:28, comments:[], timestamp:"5 hours ago", pinned:false },
  { id:3, author:"Alex R.", isOwner:false, category:"studytips", title:"How I went from a 1200 to a 1450 on the SAT in 3 months", content:"I want to share what actually worked for me because there's so much bad advice out there. 1) Khan Academy official SAT prep — 30 min every single day, no exceptions. 2) Full practice test every Saturday morning under real conditions. 3) Review every wrong answer and understand WHY before moving on. The key is consistency not cramming.", upvotes:67, comments:[], timestamp:"1 day ago", pinned:false },
  { id:4, author:"Marcus T.", isOwner:false, category:"college", title:"ED vs RD — is Early Decision actually worth the commitment?", content:"I'm torn on whether to apply Early Decision to my top choice. The acceptance rate boost is real but locking yourself in before financial aid feels risky. Has anyone been through this? Did you regret going ED or was it the right call? Especially curious from anyone who got a bad financial aid package.", upvotes:45, comments:[], timestamp:"1 day ago", pinned:false },
  { id:5, author:"Sofia K.", isOwner:false, category:"opportunities", title:"What opportunity changed your high school experience the most?", content:"For me it was finding the YoungArts competition through StudentRise. I almost didn't apply because I thought my work wasn't good enough. I didn't win but the feedback from professional artists was incredible and completely changed how I approach my art. What about you all?", upvotes:52, comments:[], timestamp:"2 days ago", pinned:false },
  { id:6, author:"Tyler B.", isOwner:false, category:"studytips", title:"Best free resources for AP Calculus BC?", content:"Taking AP Calc BC next year and want to start preparing over the summer. I know Khan Academy is great but are there other resources people have found helpful? Specifically looking for practice problems and video explanations. Any YouTube channels that are actually good?", upvotes:19, comments:[], timestamp:"2 days ago", pinned:false },
  { id:7, author:"Aisha T.", isOwner:false, category:"general", title:"Introduce yourself! What grade are you in and what are you working toward?", content:"I'll start! I'm a junior in California working toward getting into a top CS program. I'm currently applying to summer research programs and working on a coding project I want to submit to the Congressional App Challenge. What about everyone else? Would love to connect with students who have similar goals!", upvotes:89, comments:[], timestamp:"3 days ago", pinned:true },
  { id:8, author:"Ryan M.", isOwner:false, category:"college", title:"Common App personal statement tips — what actually worked?", content:"I'm starting my personal statement and feeling overwhelmed. Every college counselor says something different. Some say be vulnerable, others say show achievement, others say tell a story. What actually worked for people who got into competitive schools? Specifically looking for advice on picking a topic.", upvotes:41, comments:[], timestamp:"4 days ago", pinned:false },
  { id:9, author:"Emma L.", isOwner:false, category:"opportunities", title:"Tips for standing out in competitive programs like RSI and PRIMES?", content:"I'm applying to several highly selective summer research programs this year. The acceptance rates are under 2% for some of them. Has anyone been through the process? How did you approach the research proposal? And is it worth applying to programs you're a long shot for?", upvotes:33, comments:[], timestamp:"5 days ago", pinned:false },
  { id:10, author:"Daniel K.", isOwner:false, category:"studytips", title:"Does the Pomodoro technique actually work?", content:"My older brother swears by the Pomodoro technique — 25 min work, 5 min break. I tried it for a week and honestly wasn't sure if it helped or if I was just more conscious of my time. Do you use it? What study method has actually made a real difference for you?", upvotes:24, comments:[], timestamp:"6 days ago", pinned:false },
];

export const SEEDED_STORIES = [
  { id:1, author:"Sofia R.", isOwner:false, grade:"Grade 10", achievement:"Won the Congressional App Challenge and got featured in Teen Vogue", program:"Congressional App Challenge", tip:"Build something you actually care about and use yourself. Judges can tell when you're passionate about what you built.", featured:true, timestamp:"1 week ago" },
  { id:2, author:"Marcus T.", isOwner:false, grade:"Grade 11", achievement:"Landed a paid NASA internship as a junior — one of the youngest ever selected", program:"NASA OSSI Internship", tip:"Don't self-reject before they do. I almost didn't apply because I thought my GPA wasn't good enough. Apply anyway.", featured:true, timestamp:"2 weeks ago" },
  { id:3, author:"James K.", isOwner:false, grade:"Grade 12", achievement:"Got a full scholarship to MIT through Questbridge — $320,000 in total aid", program:"Questbridge College Prep Scholarship", tip:"Be completely honest in your essays. They want to know who you actually are not who you think they want you to be.", featured:true, timestamp:"3 weeks ago" },
  { id:4, author:"Priya S.", isOwner:false, grade:"Grade 11", achievement:"Won the Regeneron Science Talent Search and $50,000 in prizes", program:"Regeneron Science Talent Search", tip:"Start your research project junior year not senior year. You need time to actually develop something meaningful.", featured:false, timestamp:"3 weeks ago" },
  { id:5, author:"Aisha T.", isOwner:false, grade:"Grade 10", achievement:"Had her artwork displayed in the US Capitol after winning the Congressional Art Competition", program:"Congressional Art Competition", tip:"Submit your absolute best work not your most recent work. I almost submitted a newer piece but went with an older one I was prouder of.", featured:false, timestamp:"1 month ago" },
  { id:6, author:"Tyler B.", isOwner:false, grade:"Grade 12", achievement:"Founded a nonprofit that's raised over $15,000 for STEM education in underserved schools", program:"Young Entrepreneurs Academy (YEA!)", tip:"Start small and local. My nonprofit started at just one school in my neighborhood. Think big but start small.", featured:false, timestamp:"1 month ago" },
  { id:7, author:"Emma W.", isOwner:false, grade:"Grade 11", achievement:"Got into the Wharton Global Investment Competition and placed in the top 10 nationally", program:"Wharton Global High School Investment Competition", tip:"Read the Wall Street Journal every morning for a month before the competition. Understanding current events is more important than finance theory.", featured:false, timestamp:"1 month ago" },
  { id:8, author:"Jordan M.", isOwner:false, grade:"Grade 9", achievement:"Won Girls Who Code Summer Program and got a mentorship offer from a Google engineer", program:"Girls Who Code Summer Immersion", tip:"Apply to everything even in 9th grade. I was surprised I got in as a freshman. They want passionate beginners not just advanced coders.", featured:false, timestamp:"6 weeks ago" },
];

export const SEEDED_CHAT = [
  { id:1, author:"Aisha T.", isOwner:false, message:"Just found a coding scholarship on here I had never heard of before. This platform is actually amazing 🙌", timestamp:"5 min ago" },
  { id:2, author:"Ryan M.", isOwner:false, message:"Same! I found 3 opportunities I qualify for that I had no idea existed", timestamp:"4 min ago" },
  { id:3, author:"Emma L.", isOwner:false, message:"Does anyone know if the NASA internship requires a teacher recommendation?", timestamp:"2 min ago" },
  { id:4, author:"Marcus T.", isOwner:false, message:"@Emma yes it does — two actually. Start asking your teachers early!", timestamp:"1 min ago" },
];

export const COMMUNITY_RULES = [
  "Be respectful — treat everyone the way you want to be treated",
  "No hate speech, discrimination, or bullying of any kind",
  "No sharing personal information like phone numbers or addresses",
  "No spam, self-promotion, or irrelevant links",
  "Keep it relevant to students, education, and opportunities",
  "No inappropriate or explicit content of any kind",
  "No political arguments or divisive topics",
  "English only so everyone can be moderated fairly",
  "Report problems using the Feedback tab — don't retaliate",
  "Violations result in removal from the community",
];

export const FORUM_CATEGORIES_C = ["all","college","opportunities","studytips","general"];

export const CAT_COLORS_C = {
  college:{ bg:"#EDE9FE", text:"#4C1D95", dot:"#7C3AED" },
  opportunities:{ bg:"#DCFCE7", text:"#14532D", dot:"#16A34A" },
  studytips:{ bg:"#FEF3C7", text:"#92400E", dot:"#F59E0B" },
  general:{ bg:"#E0F2FE", text:"#0C4A6E", dot:"#0EA5E9" },
};
