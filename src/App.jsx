import { useState, useMemo, useEffect } from "react";

const OPPORTUNITIES = [
  { id:1, title:"Goldman Sachs 10,000 Small Businesses Youth Program", category:"finance", grades:[11,12], mode:"virtual", deadline:"2026-08-15", paid:true, cost:"free", description:"Intensive finance & entrepreneurship program for high school juniors and seniors. Learn from Goldman Sachs professionals.", link:"https://www.goldmansachs.com/citizenship/10000-small-businesses/", featured:true, requirements:{ minAge:16, maxAge:18, location:"US only", gpa:"3.0+", citizenship:"US citizen or permanent resident" }, tags:["finance","entrepreneurship","mentorship"], earlyAccess:false },
  { id:2, title:"Junior Achievement Finance Park", category:"finance", grades:[9,10], mode:"in-person", deadline:"2026-10-01", paid:false, cost:"free", description:"Simulate real-life financial decisions in an immersive environment. Learn budgeting, investing, and financial planning.", link:"https://jausa.ja.org/programs/ja-finance-park", featured:false, requirements:{ minAge:13, maxAge:16, location:"US only", gpa:"none", citizenship:"Any" }, tags:["finance","simulation","budgeting"], earlyAccess:false },
  { id:3, title:"Wharton Global High School Investment Competition", category:"finance", grades:[10,11,12], mode:"virtual", deadline:"2026-09-15", paid:false, cost:"free", description:"Compete in a stock market simulation run by UPenn's Wharton School. Top teams present to real analysts.", link:"https://globalyouth.wharton.upenn.edu/investment-competition/", featured:true, requirements:{ minAge:15, maxAge:18, location:"International", gpa:"none", citizenship:"Any" }, tags:["finance","investing","Wharton","competition"], earlyAccess:false },
  { id:4, title:"SIFMA Foundation Stock Market Game", category:"finance", grades:[9,10,11,12], mode:"virtual", deadline:"2026-11-30", paid:false, cost:"free", description:"Trade $100,000 in virtual stocks and compete against students nationwide. Teaches investing fundamentals.", link:"https://www.stockmarketgame.org/", featured:false, requirements:{ minAge:13, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["finance","investing","stocks","virtual"], earlyAccess:false },
  { id:5, title:"Actuarial Foundation Modeling the Future Challenge", category:"finance", grades:[11,12], mode:"virtual", deadline:"2026-10-15", paid:true, cost:"free", description:"Use math and data to solve real-world financial problems. Winners earn up to $10,000 in scholarships.", link:"https://www.actuarialfoundation.org/programs/for-students/", featured:false, requirements:{ minAge:16, maxAge:18, location:"US only", gpa:"3.0+", citizenship:"US citizen" }, tags:["finance","math","scholarship","actuarial"], earlyAccess:false },
  { id:6, title:"Next Gen Personal Finance (NGPF) Scholarship", category:"finance", grades:[12], mode:"virtual", deadline:"2026-06-01", paid:true, cost:"free", description:"Essay-based scholarship for students passionate about financial literacy. Awards up to $5,000 for college.", link:"https://www.ngpf.org/", featured:false, requirements:{ minAge:17, maxAge:18, location:"US only", gpa:"none", citizenship:"US citizen" }, tags:["finance","scholarship","financial literacy"], earlyAccess:false },
  { id:7, title:"Congressional App Challenge", category:"coding", grades:[9,10,11,12], mode:"virtual", deadline:"2026-10-31", paid:false, cost:"free", description:"Build an app, compete nationally, and potentially present it in the U.S. Capitol. Open to all high schoolers.", link:"https://www.congressionalappchallenge.us/", featured:true, requirements:{ minAge:13, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["coding","competition","app development"], earlyAccess:false },
  { id:8, title:"Girls Who Code Summer Immersion Program", category:"coding", grades:[10,11], mode:"virtual", deadline:"2026-07-15", paid:false, cost:"free", description:"Free 2-week intensive coding program for girls and non-binary students. Build real projects and meet tech professionals.", link:"https://girlswhocode.com/programs/summer-immersion-program", featured:true, requirements:{ minAge:14, maxAge:17, location:"US only", gpa:"none", citizenship:"Any" }, tags:["coding","girls in tech","free","summer"], earlyAccess:false },
  { id:9, title:"Replit Bounties — Student Developer", category:"coding", grades:[9,10,11,12], mode:"virtual", deadline:"2026-12-31", paid:true, cost:"free", description:"Complete coding bounties posted by real companies and earn cash. Perfect for building a real-world portfolio.", link:"https://replit.com/bounties", featured:false, requirements:{ minAge:13, maxAge:18, location:"International", gpa:"none", citizenship:"Any" }, tags:["coding","freelance","portfolio"], earlyAccess:false },
  { id:10, title:"USACO — USA Computing Olympiad", category:"coding", grades:[9,10,11,12], mode:"virtual", deadline:"2026-12-01", paid:false, cost:"free", description:"The premier competitive programming contest for US high schoolers. Top performers qualify for the International Olympiad.", link:"https://usaco.org/", featured:false, requirements:{ minAge:13, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["coding","competitive programming","olympiad"], earlyAccess:false },
  { id:11, title:"MIT Beaver Works Summer Institute", category:"coding", grades:[11,12], mode:"in-person", deadline:"2026-04-15", paid:false, cost:"free", description:"Rigorous 4-week STEM program at MIT. Work on autonomous vehicles, drones, and satellite design with MIT researchers.", link:"https://beaverworks.ll.mit.edu/CMS/bw/bwsi", featured:false, requirements:{ minAge:16, maxAge:18, location:"US only", gpa:"3.5+", citizenship:"US citizen" }, tags:["coding","STEM","MIT","summer","robotics"], earlyAccess:false },
  { id:12, title:"Kode With Klossy Scholarship Camp", category:"coding", grades:[9,10,11,12], mode:"virtual", deadline:"2026-05-01", paid:false, cost:"free", description:"Free 2-week coding camp for girls ages 13-18. Learn web development and mobile app creation from industry mentors.", link:"https://www.kodewithklossy.com/", featured:false, requirements:{ minAge:13, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["coding","girls in tech","free","web dev"], earlyAccess:false },
  { id:13, title:"Google Summer of Code", category:"coding", grades:[11,12], mode:"virtual", deadline:"2026-07-01", paid:true, cost:"free", description:"Contribute to open-source projects mentored by Google engineers. Receive a stipend and build a portfolio that stands out.", link:"https://summerofcode.withgoogle.com/", featured:false, requirements:{ minAge:18, maxAge:18, location:"International", gpa:"none", citizenship:"Any" }, tags:["coding","open source","Google","stipend"], earlyAccess:false },
  { id:14, title:"Hack Club — Teen Hackathons", category:"coding", grades:[9,10,11,12], mode:"in-person", deadline:"2026-12-31", paid:false, cost:"free", description:"Join one of thousands of student-led hackathons worldwide. Build projects, win prizes, and meet other teen developers.", link:"https://hackclub.com/", featured:false, requirements:{ minAge:13, maxAge:18, location:"International", gpa:"none", citizenship:"Any" }, tags:["coding","hackathon","community","projects"], earlyAccess:false },
  { id:15, title:"Shopify Dev Degree — High School Track", category:"coding", grades:[11,12], mode:"virtual", deadline:"2026-08-01", paid:true, cost:"free", description:"Build real e-commerce apps with Shopify's API. Top student contributors get featured and earn cash rewards.", link:"https://www.shopify.com/partners/developers", featured:false, requirements:{ minAge:16, maxAge:18, location:"International", gpa:"none", citizenship:"Any" }, tags:["coding","e-commerce","Shopify","portfolio"], earlyAccess:false },
  { id:16, title:"DECA International Career Development Conference", category:"business", grades:[9,10,11,12], mode:"in-person", deadline:"2026-09-01", paid:false, cost:"paid", description:"Prepare and compete in business case challenges. Network with 20,000+ students worldwide.", link:"https://www.deca.org/high-school-programs/", featured:false, requirements:{ minAge:13, maxAge:18, location:"International", gpa:"none", citizenship:"Any" }, tags:["business","competition","networking"], earlyAccess:false },
  { id:17, title:"MIT Launch — High School Entrepreneurship", category:"business", grades:[10,11,12], mode:"virtual", deadline:"2026-06-15", paid:true, cost:"paid", description:"Launch a real company with guidance from MIT faculty, mentors, and fellow student founders.", link:"https://entrepreneurship.mit.edu/launch/", featured:true, requirements:{ minAge:15, maxAge:18, location:"International", gpa:"3.5+", citizenship:"Any" }, tags:["entrepreneurship","startup","MIT"], earlyAccess:false },
  { id:18, title:"Young Entrepreneurs Academy (YEA!)", category:"business", grades:[9,10,11,12], mode:"in-person", deadline:"2026-09-30", paid:false, cost:"paid", description:"Start and launch a real business over one school year. Pitch to investors for seed funding at the end.", link:"https://yeausa.org/", featured:false, requirements:{ minAge:13, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["entrepreneurship","startup","pitch"], earlyAccess:false },
  { id:19, title:"Future Business Leaders of America (FBLA)", category:"business", grades:[9,10,11,12], mode:"in-person", deadline:"2026-10-15", paid:false, cost:"paid", description:"Compete in business, technology, and leadership events. Connect with a network of 230,000+ student members.", link:"https://www.fbla.org/", featured:false, requirements:{ minAge:13, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["business","leadership","competition","networking"], earlyAccess:false },
  { id:20, title:"NFTE — Network for Teaching Entrepreneurship", category:"business", grades:[9,10,11,12], mode:"virtual", deadline:"2026-08-01", paid:false, cost:"free", description:"Pitch your business idea in a Shark Tank-style competition. Winners get mentorship, funding, and national exposure.", link:"https://www.nfte.com/", featured:false, requirements:{ minAge:13, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["business","pitch","entrepreneurship","startup"], earlyAccess:false },
  { id:21, title:"Diamond Challenge High School Entrepreneurship", category:"business", grades:[10,11,12], mode:"virtual", deadline:"2026-11-01", paid:true, cost:"free", description:"Present your startup idea to judges from top universities and VCs. Over $100,000 in prizes awarded annually.", link:"https://diamondchallenge.org/", featured:false, requirements:{ minAge:15, maxAge:18, location:"International", gpa:"none", citizenship:"Any" }, tags:["business","startup","pitch","competition"], earlyAccess:false },
  { id:22, title:"American Red Cross Youth Volunteer", category:"volunteering", grades:[9,10,11,12], mode:"in-person", deadline:"2026-12-31", paid:false, cost:"free", description:"Assist with disaster relief, blood drives, and community preparedness events. Earn community service hours.", link:"https://www.redcross.org/volunteer/become-a-volunteer.html", featured:false, requirements:{ minAge:13, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["volunteering","community service","leadership"], earlyAccess:false },
  { id:23, title:"Khan Academy Student Ambassador", category:"volunteering", grades:[9,10,11,12], mode:"virtual", deadline:"2026-09-01", paid:false, cost:"free", description:"Help other students learn math and science online. Build leadership and communication skills remotely.", link:"https://www.khanacademy.org/about/our-community", featured:false, requirements:{ minAge:13, maxAge:18, location:"International", gpa:"none", citizenship:"Any" }, tags:["education","leadership","remote"], earlyAccess:false },
  { id:24, title:"DoSomething.org Youth Campaigns", category:"volunteering", grades:[9,10,11,12], mode:"virtual", deadline:"2026-12-31", paid:false, cost:"free", description:"Join one of 250+ social change campaigns. From mental health advocacy to climate action — earn scholarship dollars.", link:"https://www.dosomething.org/", featured:false, requirements:{ minAge:13, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["volunteering","social change","scholarship","activism"], earlyAccess:false },
  { id:25, title:"Habitat for Humanity Youth Programs", category:"volunteering", grades:[9,10,11,12], mode:"in-person", deadline:"2026-12-31", paid:false, cost:"free", description:"Help build homes and communities. Hands-on volunteering with lasting impact. Flexible scheduling available.", link:"https://www.habitat.org/volunteer/near-you/youth-programs", featured:false, requirements:{ minAge:14, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["volunteering","community","housing"], earlyAccess:false },
  { id:26, title:"Points of Light — Youth Volunteer Network", category:"volunteering", grades:[9,10,11,12], mode:"virtual", deadline:"2026-12-31", paid:false, cost:"free", description:"Connect with vetted volunteering opportunities matching your interests. Earn recognition and build your service record.", link:"https://www.pointsoflight.org/", featured:false, requirements:{ minAge:13, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["volunteering","community","service hours"], earlyAccess:false },
  { id:27, title:"NASA High School Internship (OSSI)", category:"stem", grades:[11,12], mode:"in-person", deadline:"2026-11-01", paid:true, cost:"free", description:"Work on real NASA missions in science, engineering, and technology. One of the most prestigious STEM internships available.", link:"https://intern.nasa.gov/", featured:true, requirements:{ minAge:16, maxAge:18, location:"US only", gpa:"3.0+", citizenship:"US citizen" }, tags:["STEM","internship","science","NASA"], earlyAccess:false },
  { id:28, title:"Science Olympiad National Tournament", category:"stem", grades:[9,10,11,12], mode:"in-person", deadline:"2026-08-01", paid:false, cost:"paid", description:"Compete in 23 science and engineering events from astronomy to robotics at the national level.", link:"https://www.soinc.org/", featured:false, requirements:{ minAge:13, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["STEM","science","competition","team"], earlyAccess:false },
  { id:29, title:"Regeneron Science Talent Search", category:"stem", grades:[12], mode:"virtual", deadline:"2026-11-15", paid:true, cost:"free", description:"America's oldest and most prestigious science competition. Present original research for a chance at $250,000 in awards.", link:"https://www.societyforscience.org/regeneron-sts/", featured:true, requirements:{ minAge:17, maxAge:18, location:"US only", gpa:"3.5+", citizenship:"US citizen" }, tags:["STEM","research","scholarship","science"], earlyAccess:false },
  { id:30, title:"Intel ISEF — International Science & Engineering Fair", category:"stem", grades:[9,10,11,12], mode:"in-person", deadline:"2026-09-30", paid:false, cost:"free", description:"The world's largest pre-college STEM competition. Over $9 million in awards. Compete with 1,800+ students from 75+ countries.", link:"https://www.societyforscience.org/isef/", featured:false, requirements:{ minAge:13, maxAge:18, location:"International", gpa:"none", citizenship:"Any" }, tags:["STEM","science","international","research"], earlyAccess:false },
  { id:31, title:"Johns Hopkins Center for Talented Youth (CTY)", category:"stem", grades:[9,10,11,12], mode:"in-person", deadline:"2026-05-01", paid:false, cost:"paid", description:"Academically intensive summer programs in math, science, and engineering at top university campuses.", link:"https://cty.jhu.edu/", featured:false, requirements:{ minAge:13, maxAge:18, location:"International", gpa:"3.5+", citizenship:"Any" }, tags:["STEM","academics","summer","math"], earlyAccess:false },
  { id:32, title:"Research Science Institute (RSI) at MIT", category:"stem", grades:[11], mode:"in-person", deadline:"2026-12-01", paid:false, cost:"free", description:"The most selective free pre-college STEM research program in the US. Conduct original research at MIT for 6 weeks.", link:"https://www.cee.org/programs/research-science-institute", featured:true, requirements:{ minAge:16, maxAge:17, location:"International", gpa:"3.7+", citizenship:"Any" }, tags:["STEM","research","MIT","summer","selective"], earlyAccess:false },
  { id:33, title:"Siemens Competition in Math, Science & Technology", category:"stem", grades:[11,12], mode:"virtual", deadline:"2026-09-15", paid:true, cost:"free", description:"Submit original STEM research for one of the most prestigious competitions. Scholarship prizes up to $100,000.", link:"https://www.discoveryeducation.com/siemens-competition/", featured:false, requirements:{ minAge:16, maxAge:18, location:"US only", gpa:"none", citizenship:"US citizen" }, tags:["STEM","research","scholarship","competition"], earlyAccess:false },
  { id:34, title:"National Merit Scholarship Program", category:"academics", grades:[11], mode:"virtual", deadline:"2026-10-15", paid:true, cost:"free", description:"Take the PSAT/NMSQT to qualify for one of 7,500+ scholarships. One of the most prestigious academic recognitions.", link:"https://www.nationalmerit.org/", featured:true, requirements:{ minAge:16, maxAge:17, location:"US only", gpa:"3.5+", citizenship:"US citizen" }, tags:["scholarship","academics","college prep"], earlyAccess:false },
  { id:35, title:"Harvard Pre-College Summer Program", category:"academics", grades:[10,11,12], mode:"in-person", deadline:"2026-04-01", paid:true, cost:"paid", description:"Take college-level courses on Harvard's campus. Earn college credit and experience real campus life.", link:"https://summer.harvard.edu/high-school-programs/", featured:false, requirements:{ minAge:15, maxAge:18, location:"International", gpa:"3.7+", citizenship:"Any" }, tags:["academics","college prep","Harvard","summer"], earlyAccess:false },
  { id:36, title:"Yale Young Global Scholars (YYGS)", category:"academics", grades:[11,12], mode:"in-person", deadline:"2026-01-15", paid:false, cost:"paid", description:"Immersive 2-week academic program at Yale. Study international affairs, science, or humanities with students from 130+ countries.", link:"https://globalscholars.yale.edu/", featured:false, requirements:{ minAge:16, maxAge:18, location:"International", gpa:"3.5+", citizenship:"Any" }, tags:["academics","Yale","international","summer"], earlyAccess:false },
  { id:37, title:"Questbridge College Prep Scholarship", category:"academics", grades:[11], mode:"virtual", deadline:"2026-09-26", paid:true, cost:"free", description:"Connects high-achieving, low-income students with top colleges and full scholarships. One of the most impactful scholarship programs.", link:"https://www.questbridge.org/", featured:true, requirements:{ minAge:16, maxAge:17, location:"US only", gpa:"3.5+", citizenship:"US citizen or permanent resident" }, tags:["scholarship","college prep","low income","academics"], earlyAccess:false },
  { id:38, title:"College Board AP Scholar Awards", category:"academics", grades:[11,12], mode:"virtual", deadline:"2026-07-01", paid:false, cost:"free", description:"Earn recognition for outstanding AP exam performance. AP Scholar status boosts college applications significantly.", link:"https://apstudents.collegeboard.org/awards-recognitions/ap-scholar-award", featured:false, requirements:{ minAge:16, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["academics","AP","college prep","recognition"], earlyAccess:false },
  { id:39, title:"Scholastic Art & Writing Awards", category:"arts", grades:[9,10,11,12], mode:"virtual", deadline:"2026-12-01", paid:false, cost:"free", description:"Submit original artwork or writing to the nation's longest-running and most prestigious scholarship program for teens.", link:"https://www.artandwriting.org/", featured:false, requirements:{ minAge:13, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["arts","writing","scholarship","creative"], earlyAccess:false },
  { id:40, title:"YoungArts Foundation National Competition", category:"arts", grades:[10,11,12], mode:"virtual", deadline:"2026-10-01", paid:false, cost:"free", description:"Apply in dance, music, theater, visual arts, or writing. Winners receive up to $10,000 and mentorship from leading artists.", link:"https://www.youngarts.org/", featured:true, requirements:{ minAge:15, maxAge:18, location:"US only", gpa:"none", citizenship:"US citizen or permanent resident" }, tags:["arts","scholarship","performance","visual arts"], earlyAccess:false },
  { id:41, title:"Adobe Creative Residency — Student Track", category:"arts", grades:[11,12], mode:"virtual", deadline:"2026-07-01", paid:true, cost:"free", description:"Get mentored by professional creatives and build a funded personal project using Adobe tools.", link:"https://www.adobe.com/about-adobe/fast.html", featured:false, requirements:{ minAge:16, maxAge:18, location:"International", gpa:"none", citizenship:"Any" }, tags:["arts","design","creative","mentorship"], earlyAccess:false },
  { id:42, title:"Reflections Arts Program — National PTA", category:"arts", grades:[9,10,11,12], mode:"virtual", deadline:"2026-10-15", paid:false, cost:"free", description:"Submit work in dance choreography, film, literature, music composition, photography, or visual arts.", link:"https://www.pta.org/home/programs/reflections", featured:false, requirements:{ minAge:13, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["arts","film","music","photography","creative"], earlyAccess:false },
  { id:43, title:"Congressional Art Competition", category:"arts", grades:[9,10,11,12], mode:"in-person", deadline:"2026-04-30", paid:false, cost:"free", description:"Submit visual artwork to be displayed in the U.S. Capitol for one year. One winner selected per congressional district.", link:"https://www.house.gov/educators-and-students/congressional-art-competition", featured:false, requirements:{ minAge:13, maxAge:18, location:"US only", gpa:"none", citizenship:"US citizen" }, tags:["arts","visual arts","DC","competition"], earlyAccess:false },
  { id:44, title:"Presidential Scholars Program", category:"leadership", grades:[12], mode:"virtual", deadline:"2026-01-25", paid:false, cost:"free", description:"One of the nation's highest honors for high school seniors. Recognized by the U.S. President for academic, artistic, and career achievement.", link:"https://www2.ed.gov/programs/psp/index.html", featured:true, requirements:{ minAge:17, maxAge:18, location:"US only", gpa:"3.7+", citizenship:"US citizen" }, tags:["leadership","academics","honor","college prep"], earlyAccess:false },
  { id:45, title:"Hugh O'Brian Youth Leadership (HOBY)", category:"leadership", grades:[10], mode:"in-person", deadline:"2026-04-01", paid:false, cost:"paid", description:"Intensive leadership seminar for high school sophomores. Develop communication, teamwork, and community impact skills.", link:"https://www.hoby.org/", featured:false, requirements:{ minAge:14, maxAge:16, location:"US only", gpa:"none", citizenship:"Any" }, tags:["leadership","seminar","community","sophomore"], earlyAccess:false },
  { id:46, title:"Boys & Girls Nation — American Legion", category:"leadership", grades:[11], mode:"in-person", deadline:"2026-05-15", paid:false, cost:"free", description:"Represent your state in Washington D.C. as a mock senator or congressman. Meet real members of Congress.", link:"https://www.legion.org/boysnation", featured:false, requirements:{ minAge:15, maxAge:17, location:"US only", gpa:"3.0+", citizenship:"US citizen" }, tags:["leadership","government","civics","DC"], earlyAccess:false },
  { id:47, title:"SkillsUSA National Leadership Conference", category:"leadership", grades:[9,10,11,12], mode:"in-person", deadline:"2026-09-15", paid:false, cost:"paid", description:"Compete in 100+ technical, leadership, and professional development events. Recognized by top employers nationwide.", link:"https://www.skillsusa.org/", featured:false, requirements:{ minAge:13, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["leadership","career","competition","vocational"], earlyAccess:false },
  { id:48, title:"Close Up Washington D.C. Program", category:"leadership", grades:[9,10,11,12], mode:"in-person", deadline:"2026-12-31", paid:false, cost:"paid", description:"Experience American democracy firsthand in D.C. Meet lawmakers, visit monuments, and debate real policy issues.", link:"https://www.closeup.org/", featured:false, requirements:{ minAge:13, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["leadership","civics","government","DC"], earlyAccess:false },
  { id:49, title:"Youth & Government — YMCA", category:"leadership", grades:[9,10,11,12], mode:"in-person", deadline:"2026-10-01", paid:false, cost:"paid", description:"Simulate state and national government processes. Write legislation, debate bills, and develop civic leadership skills.", link:"https://www.ymca.org/what-we-do/youth-development/youth-government", featured:false, requirements:{ minAge:13, maxAge:18, location:"US only", gpa:"none", citizenship:"Any" }, tags:["leadership","government","civics","debate"], earlyAccess:false },
  { id:50, title:"Rotary Youth Leadership Awards (RYLA)", category:"leadership", grades:[11,12], mode:"in-person", deadline:"2026-08-15", paid:false, cost:"free", description:"Intensive leadership training program sponsored by Rotary International. Scholarships available to cover program costs.", link:"https://www.rotary.org/en/our-programs/rotary-youth-leadership-awards", featured:false, requirements:{ minAge:16, maxAge:18, location:"International", gpa:"none", citizenship:"Any" }, tags:["leadership","international","scholarship","Rotary"], earlyAccess:false },
  // PRO EARLY ACCESS ONLY
  { id:51, title:"[EARLY ACCESS] Goldman Sachs Possibilities Summit 2027", category:"finance", grades:[11,12], mode:"in-person", deadline:"2026-11-30", paid:true, cost:"free", description:"Exclusive Goldman Sachs summit for top high school students interested in finance. Only 150 spots nationwide. Not yet public.", link:"https://www.goldmansachs.com/", featured:false, requirements:{ minAge:16, maxAge:18, location:"US only", gpa:"3.5+", citizenship:"US citizen" }, tags:["finance","Goldman Sachs","exclusive","summit"], earlyAccess:true },
  { id:52, title:"[EARLY ACCESS] Apple Developer Academy — HS Track", category:"coding", grades:[10,11,12], mode:"virtual", deadline:"2026-10-15", paid:true, cost:"free", description:"Apple's new high school developer track opening applications soon. Build iOS apps with Apple mentors. Not yet publicly announced.", link:"https://developer.apple.com/", featured:false, requirements:{ minAge:15, maxAge:18, location:"International", gpa:"none", citizenship:"Any" }, tags:["coding","Apple","iOS","mentorship"], earlyAccess:true },
  { id:53, title:"[EARLY ACCESS] Y Combinator HS Founders Program", category:"business", grades:[11,12], mode:"virtual", deadline:"2026-09-01", paid:true, cost:"free", description:"Y Combinator's brand new program for high school founders. Get mentored by YC partners before this goes public.", link:"https://www.ycombinator.com/", featured:false, requirements:{ minAge:16, maxAge:18, location:"International", gpa:"none", citizenship:"Any" }, tags:["business","YC","startup","founders"], earlyAccess:true },
];

const CATEGORIES = ["all","finance","coding","business","volunteering","stem","academics","arts","leadership"];
const GRADES = [9,10,11,12];
const LOCATIONS = ["all","US only","International"];
const CITIZENSHIP_OPTIONS = ["Any","US citizen","US citizen or permanent resident"];
const DEADLINE_FILTERS = [{ label:"Any time", value:"all" },{ label:"Next 30 days", value:"30" },{ label:"Next 3 months", value:"90" },{ label:"Next 6 months", value:"180" }];
const APP_STATUS = ["Interested","Applied","Waiting","Accepted","Not selected"];
const STATUS_COLORS = { Interested:"#6366F1", Applied:"#0EA5E9", Waiting:"#F59E0B", Accepted:"#22C55E", "Not selected":"#94A3B8" };
const CAT_COLORS = {
  finance:{ bg:"#FEF3C7", text:"#92400E", dot:"#F59E0B" }, coding:{ bg:"#EDE9FE", text:"#4C1D95", dot:"#7C3AED" },
  business:{ bg:"#DCFCE7", text:"#14532D", dot:"#16A34A" }, volunteering:{ bg:"#FCE7F3", text:"#831843", dot:"#DB2777" },
  stem:{ bg:"#E0F2FE", text:"#0C4A6E", dot:"#0EA5E9" }, academics:{ bg:"#FEE2E2", text:"#7F1D1D", dot:"#EF4444" },
  arts:{ bg:"#FDF4FF", text:"#581C87", dot:"#A855F7" }, leadership:{ bg:"#ECFDF5", text:"#065F46", dot:"#10B981" },
};

function calcMatchScore(opp, profile) {
  if (!profile.grade && !profile.gpa && !profile.age) return null;
  let score = 60; let reasons = [];
  const gpaMap = { "none":0,"2.5+":2.5,"3.0+":3.0,"3.5+":3.5,"3.7+":3.7 };
  if (profile.grade && opp.grades.includes(Number(profile.grade))) { score+=15; reasons.push("Grade matches ✓"); }
  else if (profile.grade) { score-=30; reasons.push("Grade doesn't match"); }
  if (profile.gpa) {
    const userGpa = parseFloat(profile.gpa);
    const reqGpa = gpaMap[opp.requirements.gpa]||0;
    if (userGpa >= reqGpa) { score+=10; reasons.push("GPA qualifies ✓"); }
    else { score-=20; reasons.push("GPA below requirement"); }
  }
  if (profile.age) {
    const age = Number(profile.age);
    if (age >= opp.requirements.minAge && age <= opp.requirements.maxAge) { score+=10; reasons.push("Age eligible ✓"); }
    else { score-=25; reasons.push("Age out of range"); }
  }
  if (profile.citizenship && opp.requirements.citizenship !== "Any") {
    if (opp.requirements.citizenship.includes(profile.citizenship)) { score+=5; reasons.push("Citizenship matches ✓"); }
    else { score-=15; reasons.push("Citizenship requirement not met"); }
  }
  if (profile.interests && profile.interests.length > 0) {
    if (profile.interests.includes(opp.category)) { score+=10; reasons.push("Matches your interests ✓"); }
  }
  return { score: Math.max(0, Math.min(100, score)), reasons };
}

function MatchBadge({ score }) {
  if (score === null) return null;
  const color = score >= 80 ? "#22C55E" : score >= 60 ? "#F59E0B" : "#EF4444";
  const label = score >= 80 ? "Great match" : score >= 60 ? "Good match" : "Low match";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6, background:`${color}15`, border:`1px solid ${color}40`, borderRadius:8, padding:"4px 10px" }}>
      <div style={{ width:28, height:28, borderRadius:"50%", background:color, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:"#fff", flexShrink:0 }}>{score}</div>
      <span style={{ fontSize:11, fontWeight:600, color }}>{label}</span>
    </div>
  );
}

function Badge({ cat }) {
  const c = CAT_COLORS[cat] || { bg:"#F1F5F9", text:"#475569", dot:"#94A3B8" };
  return (
    <span style={{ background:c.bg, color:c.text, fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:999, letterSpacing:"0.04em", textTransform:"uppercase", display:"inline-flex", alignItems:"center", gap:5 }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:c.dot, flexShrink:0 }} />{cat}
    </span>
  );
}

function OpportunityCard({ opp, isPro, saved, onToggleSave, appStatus, onStatusChange, profile }) {
  const [expanded, setExpanded] = useState(false);
  const [showStatus, setShowStatus] = useState(false);
  const daysLeft = Math.ceil((new Date(opp.deadline) - new Date()) / 86400000);
  const urgency = daysLeft < 14 ? "#EF4444" : daysLeft < 45 ? "#F59E0B" : "#22C55E";
  const req = opp.requirements;
  const match = isPro && profile ? calcMatchScore(opp, profile) : null;
  const statusColor = appStatus ? STATUS_COLORS[appStatus] : null;
  return (
    <div style={{ background:"#fff", border:`1.5px solid ${appStatus ? STATUS_COLORS[appStatus]+"40" : "#F1F5F9"}`, borderRadius:16, padding:"1.25rem", display:"flex", flexDirection:"column", gap:10, transition:"box-shadow .2s, transform .2s", position:"relative", overflow:"hidden" }}
      onMouseEnter={e=>{ e.currentTarget.style.boxShadow="0 8px 32px rgba(0,0,0,0.10)"; e.currentTarget.style.transform="translateY(-2px)"; }}
      onMouseLeave={e=>{ e.currentTarget.style.boxShadow="none"; e.currentTarget.style.transform="none"; }}>
      {opp.featured && <div style={{ position:"absolute", top:0, right:0, background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", fontSize:10, fontWeight:700, padding:"4px 12px", borderBottomLeftRadius:10, letterSpacing:"0.06em" }}>FEATURED</div>}
      {opp.earlyAccess && <div style={{ position:"absolute", top:0, left:0, background:"linear-gradient(135deg,#F59E0B,#EF4444)", color:"#fff", fontSize:10, fontWeight:700, padding:"4px 12px", borderBottomRightRadius:10, letterSpacing:"0.06em" }}>⚡ EARLY ACCESS</div>}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, flexWrap:"wrap", marginTop: opp.earlyAccess ? 18 : 0 }}>
        <Badge cat={opp.category} />
        <div style={{ display:"flex", gap:5, alignItems:"center", flexWrap:"wrap" }}>
          <span style={{ fontSize:11, fontWeight:600, color:opp.paid?"#16A34A":"#64748B", background:opp.paid?"#DCFCE7":"#F8FAFC", padding:"3px 8px", borderRadius:999 }}>{opp.paid?"💰 Paid":"Unpaid"}</span>
          <span style={{ fontSize:11, fontWeight:600, color:opp.cost==="free"?"#0369A1":"#92400E", background:opp.cost==="free"?"#E0F2FE":"#FEF3C7", padding:"3px 8px", borderRadius:999 }}>{opp.cost==="free"?"🆓 Free":"💳 Has cost"}</span>
          <button onClick={()=>isPro ? onToggleSave(opp.id) : onToggleSave("upgrade")} title={isPro?(saved?"Remove from saved":"Save"):"Pro feature"}
            style={{ background:saved?"#EEF2FF":"#F8FAFC", border:`1.5px solid ${saved?"#6366F1":"#E2E8F0"}`, borderRadius:8, width:30, height:30, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", fontSize:15, flexShrink:0 }}>
            {isPro?(saved?"🔖":"🏷️"):"🔒"}
          </button>
        </div>
      </div>
      {match && <MatchBadge score={match.score} />}
      {appStatus && (
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:8, height:8, borderRadius:"50%", background:statusColor, flexShrink:0 }} />
          <span style={{ fontSize:12, fontWeight:600, color:statusColor }}>{appStatus}</span>
        </div>
      )}
      <div>
        <h3 style={{ margin:"0 0 4px", fontSize:15, fontWeight:700, color:"#0F172A", lineHeight:1.4 }}>{opp.title.replace("[EARLY ACCESS] ","")}</h3>
        <p style={{ margin:0, fontSize:13, color:"#64748B", lineHeight:1.5 }}>{opp.description}</p>
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, fontSize:12, color:"#64748B" }}>
        <span>{opp.mode==="virtual"?"🌐":"📍"} {opp.mode==="virtual"?"Virtual":"In-Person"}</span>
        <span>🎓 Grades {Math.min(...opp.grades)}–{Math.max(...opp.grades)}</span>
        <span style={{ color:urgency, fontWeight:600 }}>⏰ {daysLeft>0?`${daysLeft}d left`:"Closed"}</span>
        <span>🌍 {req.location}</span>
      </div>
      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
        <button onClick={()=>setExpanded(e=>!e)} style={{ flex:1, background:"#F8FAFC", border:"1px solid #E2E8F0", borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:600, color:"#64748B", cursor:"pointer" }}>
          {expanded?"▲ Hide requirements":"▼ View requirements"}
        </button>
        {isPro && (
          <button onClick={()=>setShowStatus(s=>!s)} style={{ background:appStatus?`${statusColor}15`:"#F8FAFC", border:`1px solid ${appStatus?statusColor+"50":"#E2E8F0"}`, borderRadius:8, padding:"6px 12px", fontSize:12, fontWeight:600, color:appStatus||"#64748B", cursor:"pointer" }}>
            📋 {appStatus||"Track"}
          </button>
        )}
      </div>
      {showStatus && isPro && (
        <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
          {APP_STATUS.map(s=>(
            <button key={s} onClick={()=>{ onStatusChange(opp.id, s===appStatus?null:s); setShowStatus(false); }}
              style={{ padding:"5px 12px", borderRadius:999, border:"1.5px solid", fontSize:12, fontWeight:600, cursor:"pointer", background:appStatus===s?STATUS_COLORS[s]:"#fff", color:appStatus===s?"#fff":STATUS_COLORS[s]||"#64748B", borderColor:STATUS_COLORS[s]||"#E2E8F0" }}>{s}</button>
          ))}
        </div>
      )}
      {expanded && (
        <div style={{ background:"#F8FAFC", borderRadius:10, padding:"0.75rem", fontSize:12, display:"grid", gap:7 }}>
          {[["🎂 Age",`${req.minAge}–${req.maxAge} years old`],["🌍 Location",req.location],["🗽 Citizenship",req.citizenship],["📊 GPA",req.gpa==="none"?"No GPA requirement":`Minimum ${req.gpa}`],["💳 Cost",opp.cost==="free"?"Free to apply":"Application or program fee required"],["💰 Stipend",opp.paid?"Yes — this is a paid opportunity":"No payment"]].map(([label,val])=>(
            <div key={label} style={{ display:"flex", justifyContent:"space-between", gap:8 }}>
              <span style={{ color:"#94A3B8", fontWeight:600, whiteSpace:"nowrap" }}>{label}</span>
              <span style={{ color:"#0F172A", fontWeight:500, textAlign:"right" }}>{val}</span>
            </div>
          ))}
          <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginTop:4 }}>
            {opp.tags.map(t=><span key={t} style={{ background:"#E2E8F0", color:"#475569", padding:"2px 8px", borderRadius:999, fontSize:11 }}>#{t}</span>)}
          </div>
          {match && (
            <div style={{ marginTop:4, padding:"8px", background:"#F0FDF4", borderRadius:8 }}>
              <p style={{ margin:"0 0 4px", fontSize:11, fontWeight:700, color:"#15803D" }}>AI Match Analysis</p>
              {match.reasons.map(r=><p key={r} style={{ margin:"1px 0", fontSize:11, color:"#374151" }}>• {r}</p>)}
            </div>
          )}
        </div>
      )}
      <a href={opp.link} target="_blank" rel="noopener noreferrer"
        style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", fontSize:14, fontWeight:700, padding:"11px 16px", borderRadius:10, textDecoration:"none", boxShadow:"0 2px 8px rgba(99,102,241,0.3)", marginTop:2 }}
        onMouseEnter={e=>{ e.currentTarget.style.opacity="0.88"; e.currentTarget.style.transform="translateY(-1px)"; }}
        onMouseLeave={e=>{ e.currentTarget.style.opacity="1"; e.currentTarget.style.transform="none"; }}>
        Apply Now
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"/><polyline points="15,3 21,3 21,9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
      </a>
    </div>
  );
}

function ProGate({ feature, onUpgrade }) {
  return (
    <div style={{ textAlign:"center", padding:"3rem 1rem" }}>
      <div style={{ fontSize:56, marginBottom:16 }}>🔒</div>
      <h2 style={{ margin:"0 0 8px", fontSize:22, fontWeight:800, color:"#0F172A" }}>Pro Feature</h2>
      <p style={{ color:"#64748B", margin:"0 0 24px", fontSize:15, maxWidth:360, marginLeft:"auto", marginRight:"auto" }}>{feature}</p>
      <button onClick={onUpgrade} style={{ background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"13px 32px", borderRadius:12, fontWeight:700, fontSize:15, cursor:"pointer", boxShadow:"0 4px 16px rgba(99,102,241,0.35)" }}>
        Upgrade to Pro — $4.99/mo ⚡
      </button>
    </div>
  );
}

function SavedTab({ savedIds, appStatuses, isPro, onToggleSave, onStatusChange, onUpgrade, profile }) {
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

function TrackerTab({ appStatuses, isPro, onUpgrade, onStatusChange, onToggleSave, savedIds, profile }) {
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

function ProfileTab({ profile, setProfile, isPro, onUpgrade }) {
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

function SubmitForm({ onClose }) {
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

function ProUpgradeModal({ onClose, waitlistCount }) {
  const WAITLIST_URL = "https://script.google.com/macros/s/AKfycbxlRhz8GqMMwqsPoptLO0nEVvGDV7lHntJI5ZvnnsHO7kNWT48IRhhxfbA7z9ZYqjz1tQ/exec";
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [done, setDone] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cooldown, setCooldown] = useState(false);
  const alreadyJoined = sessionStorage.getItem("waitlist_joined") === "true";

  const isValidEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e);

  const handleJoin = async () => {
    if (loading || cooldown || alreadyJoined) return;
    if (!email) { setEmailError("Please enter your email."); return; }
    if (!isValidEmail(email)) { setEmailError("Please enter a valid email address."); return; }
    setEmailError("");
    setCooldown(true);
    setLoading(true);
    setTimeout(() => setCooldown(false), 5000);
    try {
      await fetch(WAITLIST_URL, {
        method:"POST", mode:"no-cors",
        headers:{ "Content-Type":"application/json" },
        body:JSON.stringify({ type:"pro_waitlist", email: email.toLowerCase().trim(), timestamp: new Date().toLocaleString() })
      });
      sessionStorage.setItem("waitlist_joined", "true");
      setDone(true);
    } catch(err) { setDone(true); }
    finally { setLoading(false); }
  };

  if (done || alreadyJoined) return (
    <div style={{ textAlign:"center", padding:"2rem" }}>
      <div style={{ fontSize:48, marginBottom:12 }}>🎉</div>
      <h3 style={{ margin:"0 0 8px", color:"#0F172A" }}>You're on the Pro waitlist!</h3>
      <p style={{ color:"#64748B", margin:"0 0 8px" }}>We'll email you as soon as payments go live. You'll be first in line.</p>
      {waitlistCount >= 20 && <p style={{ color:"#6366F1", fontWeight:600, fontSize:13, margin:"0 0 20px" }}>You're joining {waitlistCount} other students! 🔥</p>}
      <button onClick={onClose} style={{ background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"10px 24px", borderRadius:10, fontWeight:600, cursor:"pointer" }}>Got it!</button>
    </div>
  );

  const isDisabled = loading || cooldown || alreadyJoined;

  return (
    <div>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
        <h2 style={{ margin:0, fontSize:20, fontWeight:700, color:"#0F172A" }}>Upgrade to Pro ⚡</h2>
        <button onClick={onClose} style={{ background:"none", border:"none", fontSize:22, cursor:"pointer", color:"#94A3B8" }}>✕</button>
      </div>

      {waitlistCount >= 20 && (
        <div style={{ background:"linear-gradient(135deg,#FEF3C7,#FDE68A)", border:"1px solid #FCD34D", borderRadius:10, padding:"8px 14px", marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:16 }}>🔥</span>
          <p style={{ margin:0, fontSize:13, fontWeight:600, color:"#92400E" }}>{waitlistCount} students are already waiting for Pro!</p>
        </div>
      )}

      <div style={{ background:"linear-gradient(135deg,#6366F1,#8B5CF6)", borderRadius:16, padding:"1.25rem", marginBottom:20, color:"#fff" }}>
        <p style={{ margin:"0 0 4px", fontSize:24, fontWeight:800 }}>$4.99<span style={{ fontSize:14, fontWeight:400, opacity:0.8 }}>/month</span></p>
        <p style={{ margin:0, fontSize:13, opacity:0.8 }}>Cancel anytime. No commitment.</p>
      </div>

      <div style={{ display:"grid", gap:8, marginBottom:20 }}>
        {[
          ["🔖","Save unlimited opportunities","Bookmark and come back to them anytime"],
          ["📋","Application tracker","Track every app as Interested / Applied / Waiting / Accepted"],
          ["🤖","AI match scores","See your % fit for every single opportunity"],
          ["📧","Weekly email digest","New opportunities in your categories every Monday"],
          ["💬","Discord alerts","Get pinged instantly when something new drops"],
          ["⏰","Deadline reminders","Alerts 7 days and 24 hours before your saved opps close"],
          ["⚡","Early access","See new opps 48 hours before they go public"],
          ["🎯","Student profile","Set your grade, GPA, and interests once — filters auto-apply"],
          ["⭐","Pro-only opportunities","Exclusive listings not visible to free users"],
        ].map(([icon,title,desc])=>(
          <div key={title} style={{ display:"flex", gap:12, alignItems:"flex-start", padding:"10px 12px", background:"#F8FAFC", borderRadius:10 }}>
            <span style={{ fontSize:18, flexShrink:0 }}>{icon}</span>
            <div>
              <p style={{ margin:"0 0 1px", fontSize:13, fontWeight:700, color:"#0F172A" }}>{title}</p>
              <p style={{ margin:0, fontSize:12, color:"#64748B" }}>{desc}</p>
            </div>
          </div>
        ))}
      </div>

      <p style={{ fontSize:13, color:"#64748B", margin:"0 0 6px" }}>Enter your email to join the waitlist — launching payments soon:</p>
      <input
        value={email}
        onChange={e=>{ setEmail(e.target.value); setEmailError(""); }}
        onKeyDown={e=>e.key==="Enter"&&handleJoin()}
        placeholder="your@email.com"
        type="email"
        style={{ width:"100%", padding:"10px 12px", borderRadius:10, border:`1.5px solid ${emailError?"#EF4444":"#E2E8F0"}`, fontSize:14, outline:"none", boxSizing:"border-box", marginBottom:emailError?4:12, fontFamily:"inherit" }}
      />
      {emailError && <p style={{ fontSize:12, color:"#EF4444", margin:"0 0 12px", fontWeight:500 }}>⚠️ {emailError}</p>}
      <button
        onClick={handleJoin}
        disabled={isDisabled}
        style={{ width:"100%", background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"13px", borderRadius:10, fontWeight:700, fontSize:15, cursor:isDisabled?"not-allowed":"pointer", opacity:isDisabled?0.7:1, boxShadow:"0 4px 16px rgba(99,102,241,0.35)" }}>
        {loading ? "Joining... ⏳" : cooldown ? "Please wait..." : "Join Pro Waitlist ⚡"}
      </button>
      <p style={{ fontSize:11, color:"#94A3B8", textAlign:"center", margin:"8px 0 0" }}>No spam. We'll only email you when Pro launches.</p>
    </div>
  );
}

function CollegePrepHub({ isPro, onUpgrade }) {
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
// ============================================================
// STUDY HUB COMPONENT — paste this ABOVE the export default App line
// ============================================================

const CLAUDE_API_KEY = "YOUR_CLAUDE_API_KEY_HERE";

async function askClaude(systemPrompt, userMessage, maxTokens = 1000) {
  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": CLAUDE_API_KEY,
      "anthropic-version": "2023-06-01",
      "anthropic-dangerous-direct-browser-access": "true",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: maxTokens,
      system: systemPrompt,
      messages: [{ role: "user", content: userMessage }],
    }),
  });
  const data = await response.json();
  return data.content?.[0]?.text || "Sorry, something went wrong. Please try again.";
}

function StudyTimer() {
  const [mode, setMode] = useState("study");
  const [seconds, setSeconds] = useState(25 * 60);
  const [running, setRunning] = useState(false);
  const [cycles, setCycles] = useState(0);
  const MODES = { study: 25 * 60, shortBreak: 5 * 60, longBreak: 15 * 60 };

  useEffect(() => {
    if (!running) return;
    if (seconds === 0) {
      setRunning(false);
      if (mode === "study") setCycles(c => c + 1);
      return;
    }
    const t = setTimeout(() => setSeconds(s => s - 1), 1000);
    return () => clearTimeout(t);
  }, [running, seconds]);

  const switchMode = (m) => { setMode(m); setSeconds(MODES[m]); setRunning(false); };
  const mins = String(Math.floor(seconds / 60)).padStart(2, "0");
  const secs = String(seconds % 60).padStart(2, "0");
  const progress = ((MODES[mode] - seconds) / MODES[mode]) * 100;
  const modeColor = mode === "study" ? "#6366F1" : mode === "shortBreak" ? "#22C55E" : "#0EA5E9";

  return (
    <div style={{ maxWidth: 400, margin: "0 auto", textAlign: "center" }}>
      <div style={{ display: "flex", gap: 8, justifyContent: "center", marginBottom: 32 }}>
        {[["study","🧠 Study"],["shortBreak","☕ Short Break"],["longBreak","🌴 Long Break"]].map(([m, label]) => (
          <button key={m} onClick={() => switchMode(m)} style={{ padding: "8px 16px", borderRadius: 999, border: "1.5px solid", fontSize: 13, fontWeight: 600, cursor: "pointer", background: mode === m ? modeColor : "#fff", color: mode === m ? "#fff" : "#64748B", borderColor: mode === m ? modeColor : "#E2E8F0" }}>{label}</button>
        ))}
      </div>
      <div style={{ position: "relative", width: 220, height: 220, margin: "0 auto 32px" }}>
        <svg width="220" height="220" style={{ transform: "rotate(-90deg)" }}>
          <circle cx="110" cy="110" r="100" fill="none" stroke="#F1F5F9" strokeWidth="12" />
          <circle cx="110" cy="110" r="100" fill="none" stroke={modeColor} strokeWidth="12" strokeDasharray={`${2 * Math.PI * 100}`} strokeDashoffset={`${2 * Math.PI * 100 * (1 - progress / 100)}`} strokeLinecap="round" style={{ transition: "stroke-dashoffset 1s linear" }} />
        </svg>
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 48, fontWeight: 800, color: "#0F172A", letterSpacing: "-0.02em" }}>{mins}:{secs}</span>
          <span style={{ fontSize: 13, color: "#64748B", fontWeight: 500, marginTop: 4 }}>{mode === "study" ? "Focus time" : mode === "shortBreak" ? "Short break" : "Long break"}</span>
        </div>
      </div>
      <div style={{ display: "flex", gap: 10, justifyContent: "center", marginBottom: 20 }}>
        <button onClick={() => setRunning(r => !r)} style={{ background: `linear-gradient(135deg,${modeColor},${modeColor}cc)`, color: "#fff", border: "none", padding: "12px 32px", borderRadius: 12, fontWeight: 700, fontSize: 16, cursor: "pointer", boxShadow: `0 4px 16px ${modeColor}40` }}>
          {running ? "⏸ Pause" : "▶ Start"}
        </button>
        <button onClick={() => { setSeconds(MODES[mode]); setRunning(false); }} style={{ background: "#F1F5F9", border: "none", padding: "12px 20px", borderRadius: 12, fontWeight: 600, fontSize: 14, cursor: "pointer", color: "#64748B" }}>↺ Reset</button>
      </div>
      {cycles > 0 && <div style={{ background: "#EEF2FF", borderRadius: 10, padding: "8px 16px", display: "inline-block" }}><span style={{ fontSize: 13, fontWeight: 600, color: "#6366F1" }}>🔥 {cycles} study session{cycles > 1 ? "s" : ""} completed today!</span></div>}
      <div style={{ marginTop: 24, background: "#F8FAFC", borderRadius: 12, padding: "1rem", textAlign: "left" }}>
        <p style={{ margin: "0 0 8px", fontSize: 13, fontWeight: 700, color: "#374151" }}>💡 Pomodoro technique</p>
        <p style={{ margin: 0, fontSize: 12, color: "#64748B", lineHeight: 1.6 }}>Study for 25 minutes, then take a 5 minute break. After 4 cycles take a longer 15 minute break. This method is scientifically proven to improve focus and retention.</p>
      </div>
    </div>
  );
}

function AITool({ title, icon, placeholder, systemPrompt, buttonLabel, freeLimit, isPro, dailyCount, onUse, outputFormatter }) {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [loading, setLoading] = useState(false);
  const atLimit = !isPro && dailyCount >= freeLimit;

  const handleRun = async () => {
    if (!input.trim() || loading || atLimit) return;
    setLoading(true);
    setOutput("");
    try {
      const result = await askClaude(systemPrompt, input, 1500);
      setOutput(result);
      onUse();
    } catch(err) {
      setOutput("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, height: "100%" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Your input</label>
          {!isPro && <span style={{ fontSize: 11, color: atLimit ? "#EF4444" : "#6366F1", fontWeight: 600, background: atLimit ? "#FEF2F2" : "#EEF2FF", padding: "2px 8px", borderRadius: 999 }}>{atLimit ? "Daily limit reached 🔒" : `${freeLimit - dailyCount} free uses left today`}</span>}
        </div>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder={placeholder}
          style={{ flex: 1, minHeight: 200, padding: "12px", borderRadius: 12, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", fontFamily: "inherit", resize: "vertical", lineHeight: 1.6 }}
        />
        <button
          onClick={handleRun}
          disabled={loading || atLimit || !input.trim()}
          style={{ background: atLimit ? "#F1F5F9" : "linear-gradient(135deg,#6366F1,#8B5CF6)", color: atLimit ? "#94A3B8" : "#fff", border: "none", padding: "12px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: (loading || atLimit || !input.trim()) ? "not-allowed" : "pointer", opacity: (!input.trim() && !atLimit) ? 0.6 : 1 }}>
          {loading ? "⏳ Working..." : atLimit ? "🔒 Upgrade to Pro for unlimited" : `${icon} ${buttonLabel}`}
        </button>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Result</label>
        <div style={{ flex: 1, minHeight: 200, padding: "12px", borderRadius: 12, border: "1.5px solid #F1F5F9", background: output ? "#fff" : "#F8FAFC", fontSize: 14, lineHeight: 1.7, color: output ? "#0F172A" : "#94A3B8", overflowY: "auto", whiteSpace: "pre-wrap", fontFamily: "inherit" }}>
          {loading ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10, color: "#6366F1", padding: "1rem" }}>
              <div style={{ width: 20, height: 20, border: "3px solid #EEF2FF", borderTop: "3px solid #6366F1", borderRadius: "50%", animation: "spin 1s linear infinite" }} />
              AI is thinking...
            </div>
          ) : output || `Your ${title.toLowerCase()} result will appear here...`}
        </div>
        {output && (
          <button onClick={() => navigator.clipboard.writeText(output)} style={{ background: "#F8FAFC", border: "1px solid #E2E8F0", padding: "8px", borderRadius: 8, fontSize: 12, fontWeight: 600, color: "#64748B", cursor: "pointer" }}>
            📋 Copy result
          </button>
        )}
      </div>
    </div>
  );
}

function FlashcardTool({ isPro, dailyCount, onUse }) {
  const [input, setInput] = useState("");
  const [cards, setCards] = useState([]);
  const [current, setCurrent] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [loading, setLoading] = useState(false);
  const atLimit = !isPro && dailyCount >= 3;

  const generate = async () => {
    if (!input.trim() || loading || atLimit) return;
    setLoading(true);
    setCards([]);
    setCurrent(0);
    setFlipped(false);
    try {
      const result = await askClaude(
        "You are a flashcard generator. Given notes or text, create exactly 8 flashcards. Return ONLY a JSON array with objects having 'front' (question) and 'back' (answer) keys. No other text, no markdown, no backticks.",
        input,
        1000
      );
      const parsed = JSON.parse(result.replace(/```json|```/g, "").trim());
      setCards(parsed);
      onUse();
    } catch(err) {
      setCards([{ front: "Error generating cards", back: "Please try again with different notes." }]);
    } finally {
      setLoading(false);
    }
  };

  if (cards.length > 0) return (
    <div style={{ maxWidth: 500, margin: "0 auto", textAlign: "center" }}>
      <div style={{ marginBottom: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => setCards([])} style={{ background: "none", border: "none", fontSize: 13, color: "#6366F1", fontWeight: 600, cursor: "pointer" }}>← New cards</button>
        <span style={{ fontSize: 13, color: "#64748B", fontWeight: 500 }}>{current + 1} of {cards.length}</span>
        <span style={{ fontSize: 13, color: "#64748B" }}>{flipped ? "Answer" : "Question"}</span>
      </div>
      <div onClick={() => setFlipped(f => !f)}
        style={{ background: flipped ? "linear-gradient(135deg,#6366F1,#8B5CF6)" : "#fff", border: "1.5px solid #E2E8F0", borderRadius: 20, padding: "3rem 2rem", minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", transition: "all .3s", marginBottom: 20 }}>
        <p style={{ margin: 0, fontSize: 18, fontWeight: 600, color: flipped ? "#fff" : "#0F172A", lineHeight: 1.5, textAlign: "center" }}>
          {flipped ? cards[current].back : cards[current].front}
        </p>
      </div>
      <p style={{ fontSize: 12, color: "#94A3B8", marginBottom: 16 }}>👆 Click card to flip</p>
      <div style={{ display: "flex", gap: 10, justifyContent: "center" }}>
        <button onClick={() => { setCurrent(c => Math.max(0, c - 1)); setFlipped(false); }} disabled={current === 0} style={{ padding: "10px 24px", borderRadius: 10, border: "1.5px solid #E2E8F0", background: "#fff", fontWeight: 600, cursor: current === 0 ? "not-allowed" : "pointer", opacity: current === 0 ? 0.4 : 1, fontSize: 14 }}>← Prev</button>
        <button onClick={() => { setCurrent(c => Math.min(cards.length - 1, c + 1)); setFlipped(false); }} disabled={current === cards.length - 1} style={{ padding: "10px 24px", borderRadius: 10, background: "linear-gradient(135deg,#6366F1,#8B5CF6)", color: "#fff", border: "none", fontWeight: 600, cursor: current === cards.length - 1 ? "not-allowed" : "pointer", opacity: current === cards.length - 1 ? 0.4 : 1, fontSize: 14 }}>Next →</button>
      </div>
      <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 16 }}>
        {cards.map((_, i) => <div key={i} onClick={() => { setCurrent(i); setFlipped(false); }} style={{ width: 8, height: 8, borderRadius: "50%", background: i === current ? "#6366F1" : "#E2E8F0", cursor: "pointer" }} />)}
      </div>
    </div>
  );

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 8 }}>
        <label style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Paste your notes or text</label>
        {!isPro && <span style={{ fontSize: 11, color: atLimit ? "#EF4444" : "#6366F1", fontWeight: 600, background: atLimit ? "#FEF2F2" : "#EEF2FF", padding: "2px 8px", borderRadius: 999 }}>{atLimit ? "Daily limit reached 🔒" : `${3 - dailyCount} free uses left today`}</span>}
      </div>
      <textarea value={input} onChange={e => setInput(e.target.value)} placeholder="Paste your class notes, a textbook paragraph, or any text here and AI will turn it into flashcards automatically..." style={{ width: "100%", minHeight: 200, padding: "12px", borderRadius: 12, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", fontFamily: "inherit", resize: "vertical", boxSizing: "border-box", lineHeight: 1.6, marginBottom: 12 }} />
      <button onClick={generate} disabled={loading || atLimit || !input.trim()} style={{ width: "100%", background: atLimit ? "#F1F5F9" : "linear-gradient(135deg,#6366F1,#8B5CF6)", color: atLimit ? "#94A3B8" : "#fff", border: "none", padding: "12px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: (loading || atLimit) ? "not-allowed" : "pointer" }}>
        {loading ? "⏳ Generating flashcards..." : atLimit ? "🔒 Upgrade to Pro for unlimited" : "🃏 Generate Flashcards"}
      </button>
    </div>
  );
}

function PracticeTestTool({ isPro, dailyCount, onUse }) {
  const [topic, setTopic] = useState("");
  const [subject, setSubject] = useState("math");
  const [difficulty, setDifficulty] = useState("medium");
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const atLimit = !isPro && dailyCount >= 3;

  const generate = async () => {
    if (!topic.trim() || loading || atLimit) return;
    setLoading(true);
    setQuestions([]);
    setAnswers({});
    setSubmitted(false);
    try {
      const result = await askClaude(
        `You are a practice test generator for high school students. Generate exactly 5 multiple choice questions about the given topic. Difficulty: ${difficulty}. Subject: ${subject}. Return ONLY a JSON array with objects having: 'question' (string), 'options' (array of 4 strings labeled A, B, C, D), 'correct' (string, just the letter A/B/C/D), 'explanation' (string). No other text, no markdown backticks.`,
        `Topic: ${topic}`,
        1500
      );
      const parsed = JSON.parse(result.replace(/```json|```/g, "").trim());
      setQuestions(parsed);
      onUse();
    } catch(err) {
      setQuestions([]);
    } finally {
      setLoading(false);
    }
  };

  const score = submitted ? questions.filter((q, i) => answers[i] === q.correct).length : 0;

  if (questions.length > 0) return (
    <div style={{ maxWidth: 680, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <button onClick={() => { setQuestions([]); setAnswers({}); setSubmitted(false); }} style={{ background: "none", border: "none", fontSize: 13, color: "#6366F1", fontWeight: 600, cursor: "pointer" }}>← New test</button>
        {submitted && <div style={{ background: score >= 4 ? "#DCFCE7" : score >= 3 ? "#FEF3C7" : "#FEE2E2", borderRadius: 10, padding: "6px 16px" }}><span style={{ fontWeight: 700, color: score >= 4 ? "#16A34A" : score >= 3 ? "#92400E" : "#DC2626" }}>Score: {score}/5 {score === 5 ? "🎉 Perfect!" : score >= 4 ? "Great job!" : score >= 3 ? "Good effort!" : "Keep studying!"}</span></div>}
      </div>
      <div style={{ display: "grid", gap: 16 }}>
        {questions.map((q, i) => (
          <div key={i} style={{ background: "#fff", border: `1.5px solid ${submitted ? (answers[i] === q.correct ? "#BBF7D0" : answers[i] ? "#FECACA" : "#F1F5F9") : "#F1F5F9"}`, borderRadius: 14, padding: "1.25rem" }}>
            <p style={{ margin: "0 0 12px", fontSize: 15, fontWeight: 600, color: "#0F172A" }}>{i + 1}. {q.question}</p>
            <div style={{ display: "grid", gap: 8 }}>
              {q.options.map((opt, j) => {
                const letter = ["A","B","C","D"][j];
                const isSelected = answers[i] === letter;
                const isCorrect = letter === q.correct;
                const bg = submitted ? (isCorrect ? "#DCFCE7" : isSelected ? "#FEE2E2" : "#F8FAFC") : isSelected ? "#EEF2FF" : "#F8FAFC";
                const border = submitted ? (isCorrect ? "#16A34A" : isSelected ? "#EF4444" : "#E2E8F0") : isSelected ? "#6366F1" : "#E2E8F0";
                return (
                  <button key={j} onClick={() => !submitted && setAnswers(a => ({ ...a, [i]: letter }))}
                    style={{ background: bg, border: `1.5px solid ${border}`, borderRadius: 8, padding: "10px 14px", textAlign: "left", cursor: submitted ? "default" : "pointer", fontSize: 14, color: "#374151", fontWeight: isSelected || (submitted && isCorrect) ? 600 : 400 }}>
                    <span style={{ color: border, fontWeight: 700, marginRight: 8 }}>{letter}.</span>{opt}
                    {submitted && isCorrect && <span style={{ marginLeft: 8, color: "#16A34A" }}>✓</span>}
                    {submitted && isSelected && !isCorrect && <span style={{ marginLeft: 8, color: "#EF4444" }}>✗</span>}
                  </button>
                );
              })}
            </div>
            {submitted && <div style={{ marginTop: 10, background: "#F0FDF4", borderRadius: 8, padding: "8px 12px" }}><p style={{ margin: 0, fontSize: 12, color: "#16A34A", fontWeight: 500 }}>💡 {q.explanation}</p></div>}
          </div>
        ))}
      </div>
      {!submitted && (
        <button onClick={() => setSubmitted(true)} disabled={Object.keys(answers).length < questions.length}
          style={{ width: "100%", marginTop: 16, background: Object.keys(answers).length < questions.length ? "#F1F5F9" : "linear-gradient(135deg,#6366F1,#8B5CF6)", color: Object.keys(answers).length < questions.length ? "#94A3B8" : "#fff", border: "none", padding: "12px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: Object.keys(answers).length < questions.length ? "not-allowed" : "pointer" }}>
          {Object.keys(answers).length < questions.length ? `Answer all questions (${Object.keys(answers).length}/${questions.length})` : "Submit Test ✓"}
        </button>
      )}
    </div>
  );

  return (
    <div style={{ maxWidth: 500, margin: "0 auto" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 8 }}>
        {!isPro && <span style={{ fontSize: 11, color: atLimit ? "#EF4444" : "#6366F1", fontWeight: 600, background: atLimit ? "#FEF2F2" : "#EEF2FF", padding: "2px 8px", borderRadius: 999 }}>{atLimit ? "Daily limit reached 🔒" : `${3 - dailyCount} free tests left today`}</span>}
      </div>
      <div style={{ display: "grid", gap: 12 }}>
        <div><label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Topic or chapter</label>
          <input value={topic} onChange={e => setTopic(e.target.value)} placeholder="e.g. World War 2, Quadratic equations, Photosynthesis..." style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", fontFamily: "inherit", boxSizing: "border-box" }} /></div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Subject</label>
            <select value={subject} onChange={e => setSubject(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", fontFamily: "inherit" }}>
              {["math","science","history","english","economics","biology","chemistry","physics","spanish","computer science"].map(s => <option key={s}>{s}</option>)}
            </select></div>
          <div><label style={{ fontSize: 13, fontWeight: 600, color: "#374151", display: "block", marginBottom: 6 }}>Difficulty</label>
            <select value={difficulty} onChange={e => setDifficulty(e.target.value)} style={{ width: "100%", padding: "10px 12px", borderRadius: 10, border: "1.5px solid #E2E8F0", fontSize: 14, outline: "none", fontFamily: "inherit" }}>
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </select></div>
        </div>
        <button onClick={generate} disabled={loading || atLimit || !topic.trim()} style={{ background: atLimit ? "#F1F5F9" : "linear-gradient(135deg,#6366F1,#8B5CF6)", color: atLimit ? "#94A3B8" : "#fff", border: "none", padding: "12px", borderRadius: 10, fontWeight: 700, fontSize: 14, cursor: (loading || atLimit) ? "not-allowed" : "pointer" }}>
          {loading ? "⏳ Generating test..." : atLimit ? "🔒 Upgrade to Pro for unlimited" : "❓ Generate Practice Test"}
        </button>
      </div>
    </div>
  );
}

function StudyHub({ isPro, onUpgrade }) {
  const [tool, setTool] = useState("homework");
  const [dailyCounts, setDailyCounts] = useState({ homework: 0, essay: 0, summarizer: 0, flashcards: 0, practiceTest: 0 });
  const FREE_LIMITS = { homework: 5, essay: 3, summarizer: 5, flashcards: 3, practiceTest: 3 };

  const incrementCount = (key) => setDailyCounts(c => ({ ...c, [key]: c[key] + 1 }));

  const tools = [
    { id: "homework", icon: "🤖", label: "Homework Help" },
    { id: "essay", icon: "📝", label: "Essay Grader" },
    { id: "summarizer", icon: "📋", label: "Summarizer" },
    { id: "flashcards", icon: "🃏", label: "Flashcards" },
    { id: "practiceTest", icon: "❓", label: "Practice Test" },
    { id: "timer", icon: "⏱️", label: "Study Timer" },
  ];

  return (
    <div style={{ fontFamily: "'DM Sans','Segoe UI',sans-serif", background: "#F8FAFC", minHeight: "100vh" }}>
      <div style={{ background: "linear-gradient(135deg,#0F172A 0%,#1E293B 60%,#334155 100%)", padding: "2.5rem 1.5rem 3.5rem", textAlign: "center", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 20% 50%, rgba(99,102,241,0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139,92,246,0.1) 0%, transparent 40%)" }} />
        <div style={{ position: "relative" }}>
          <span style={{ background: "rgba(99,102,241,0.2)", color: "#A5B4FC", fontSize: 12, fontWeight: 700, padding: "4px 14px", borderRadius: 999, letterSpacing: "0.08em", display: "inline-block", marginBottom: 14 }}>AI-POWERED STUDY TOOLS</span>
          <h1 style={{ margin: "0 0 10px", fontSize: "clamp(24px,5vw,42px)", fontWeight: 800, color: "#fff", letterSpacing: "-0.02em", lineHeight: 1.15 }}>Study Hub 📚</h1>
          <p style={{ margin: "0 0 20px", color: "rgba(255,255,255,0.6)", fontSize: 15, maxWidth: 480, marginLeft: "auto", marginRight: "auto" }}>
            AI-powered tools to help you study smarter, not harder
          </p>
          {!isPro && (
            <button onClick={onUpgrade} style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)", color: "#fff", border: "none", padding: "10px 22px", borderRadius: 12, fontWeight: 700, fontSize: 13, cursor: "pointer" }}>
              ⚡ Go Pro for unlimited access
            </button>
          )}
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 1rem 3rem" }}>
        <div style={{ display: "flex", gap: 4, background: "#fff", borderRadius: 16, border: "1.5px solid #F1F5F9", padding: 4, marginTop: 16, boxShadow: "0 4px 24px rgba(0,0,0,0.07)", marginBottom: 24, overflowX: "auto" }}>
          {tools.map(t => (
            <button key={t.id} onClick={() => setTool(t.id)}
              style={{ padding: "9px 16px", borderRadius: 10, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap", flex: 1, justifyContent: "center", background: tool === t.id ? "linear-gradient(135deg,#6366F1,#8B5CF6)" : "transparent", color: tool === t.id ? "#fff" : "#64748B", boxShadow: tool === t.id ? "0 2px 8px rgba(99,102,241,0.3)" : "none" }}>
              {t.icon} {t.label}
              {!isPro && t.id !== "timer" && dailyCounts[t.id] >= FREE_LIMITS[t.id] && <span style={{ background: "rgba(239,68,68,0.15)", color: "#EF4444", fontSize: 10, padding: "1px 5px", borderRadius: 999, fontWeight: 700 }}>LIMIT</span>}
            </button>
          ))}
        </div>

        <div style={{ background: "#fff", borderRadius: 20, border: "1.5px solid #F1F5F9", padding: "1.5rem", boxShadow: "0 2px 12px rgba(0,0,0,0.04)", minHeight: 400 }}>
          {tool === "homework" && (
            <AITool
              title="Homework Helper"
              icon="🤖"
              placeholder="Paste your homework question here... e.g. 'Solve for x: 3x + 7 = 22' or 'Explain the causes of World War 1'"
              systemPrompt="You are a patient, encouraging homework tutor for high school students. When given a problem or question, provide a clear step-by-step explanation. Don't just give the answer — explain HOW to get there so the student actually learns. Use simple language, be encouraging, and end with a quick tip to remember the concept."
              buttonLabel="Get Help"
              freeLimit={FREE_LIMITS.homework}
              isPro={isPro}
              dailyCount={dailyCounts.homework}
              onUse={() => incrementCount("homework")}
            />
          )}
          {tool === "essay" && (
            <AITool
              title="Essay Grader"
              icon="📝"
              placeholder="Paste your essay here and get detailed feedback on structure, argument strength, grammar, and what to improve..."
              systemPrompt="You are an experienced high school English teacher grading student essays. Analyze the essay and provide: 1) An overall score out of 100 with a letter grade, 2) Strengths (what they did well), 3) Areas to improve (specific and actionable), 4) Grammar and style notes, 5) One specific sentence rewrite example showing improvement. Be encouraging but honest. Format your response clearly with these sections."
              buttonLabel="Grade My Essay"
              freeLimit={FREE_LIMITS.essay}
              isPro={isPro}
              dailyCount={dailyCounts.essay}
              onUse={() => incrementCount("essay")}
            />
          )}
          {tool === "summarizer" && (
            <AITool
              title="Note Summarizer"
              icon="📋"
              placeholder="Paste your long notes, a textbook chapter, or any text here and get a clean bullet point summary perfect for studying..."
              systemPrompt="You are a study assistant helping high school students summarize their notes. Given any text, create: 1) A 2-3 sentence TL;DR at the top, 2) Key concepts as clear bullet points, 3) Important dates, names, or numbers highlighted, 4) A 'Remember this' section with the 3 most important takeaways. Format everything clearly for easy studying."
              buttonLabel="Summarize Notes"
              freeLimit={FREE_LIMITS.summarizer}
              isPro={isPro}
              dailyCount={dailyCounts.summarizer}
              onUse={() => incrementCount("summarizer")}
            />
          )}
          {tool === "flashcards" && (
            <FlashcardTool isPro={isPro} dailyCount={dailyCounts.flashcards} onUse={() => incrementCount("flashcards")} />
          )}
          {tool === "practiceTest" && (
            <PracticeTestTool isPro={isPro} dailyCount={dailyCounts.practiceTest} onUse={() => incrementCount("practiceTest")} />
          )}
          {tool === "timer" && <StudyTimer />}
        </div>

        {!isPro && (
          <div style={{ marginTop: 16, background: "linear-gradient(135deg,#EEF2FF,#F5F3FF)", border: "1px solid #C7D2FE", borderRadius: 14, padding: "1rem 1.25rem", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div>
              <p style={{ margin: "0 0 2px", fontWeight: 700, fontSize: 14, color: "#4338CA" }}>⚡ Get unlimited Study Hub access with Pro</p>
              <p style={{ margin: 0, fontSize: 12, color: "#6366F1" }}>Unlimited homework help, essay grading, flashcards, practice tests and more</p>
            </div>
            <button onClick={onUpgrade} style={{ background: "linear-gradient(135deg,#6366F1,#8B5CF6)", color: "#fff", border: "none", padding: "10px 20px", borderRadius: 10, fontWeight: 700, fontSize: 13, cursor: "pointer", whiteSpace: "nowrap" }}>Upgrade — $4.99/mo</button>
          </div>
        )}
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
// ============================================================
// NEWS PAGE COMPONENT
// ============================================================

const NEWS_ARTICLES = [
  { id:1, category:"college", title:"Early Decision Applications Hit Record High in 2026", summary:"More students than ever are applying Early Decision this cycle, making it more competitive but also more predictable for those who know their top choice.", date:"May 22, 2026", readTime:"3 min", source:"Inside Higher Ed", link:"https://www.insidehighered.com", featured:true, tag:"College" },
  { id:2, category:"scholarships", title:"$50 Million in New Scholarships Announced for STEM Students", summary:"A coalition of tech companies has announced a major scholarship fund targeting underrepresented students pursuing STEM degrees at any accredited university.", date:"May 20, 2026", readTime:"4 min", source:"EdSurge", link:"https://www.edsurge.com", featured:true, tag:"Scholarship" },
  { id:3, category:"career", title:"LinkedIn Reports Teen Internship Applications Up 34% This Year", summary:"High school students are increasingly seeking professional experience before college, with internship applications from teens reaching an all-time high.", date:"May 18, 2026", readTime:"2 min", source:"LinkedIn News", link:"https://news.linkedin.com", featured:false, tag:"Career" },
  { id:4, category:"stem", title:"NASA Opens Applications for 2027 High School Internship Program", summary:"NASA's Office of STEM Engagement has opened applications for its prestigious high school internship program. Deadline is November 2026.", date:"May 15, 2026", readTime:"3 min", source:"NASA", link:"https://intern.nasa.gov", featured:false, tag:"STEM" },
  { id:5, category:"college", title:"Common App Releases New Essay Prompts for 2026-27 Season", summary:"The Common Application has updated its personal statement prompts for the upcoming application cycle with subtle but important changes students should know.", date:"May 12, 2026", readTime:"5 min", source:"Common App", link:"https://www.commonapp.org", featured:false, tag:"College" },
  { id:6, category:"scholarships", title:"Questbridge Applications Open — Everything You Need to Know", summary:"Questbridge's College Prep Scholarship is now accepting applications. Here's a complete breakdown of eligibility, timeline, and tips from past scholars.", date:"May 10, 2026", readTime:"6 min", source:"Questbridge", link:"https://www.questbridge.org", featured:false, tag:"Scholarship" },
  { id:7, category:"stem", title:"Girls Who Code Expands Summer Program to 50 New Cities", summary:"Following record demand, Girls Who Code is expanding its free summer immersion program to reach students in underserved communities across the country.", date:"May 8, 2026", readTime:"3 min", source:"Girls Who Code", link:"https://girlswhocode.com", featured:false, tag:"STEM" },
  { id:8, category:"career", title:"Top Skills Employers Want From Teen Job Applicants in 2026", summary:"A new survey of 500 employers reveals the skills that matter most when hiring teens — and communication tops the list for the third year running.", date:"May 5, 2026", readTime:"4 min", source:"Indeed", link:"https://www.indeed.com", featured:false, tag:"Career" },
  { id:9, category:"college", title:"SAT Score Sending — What Students Get Wrong Every Year", summary:"College Board data shows that thousands of students send SAT scores too late each year. Here's the exact timeline you need to follow.", date:"May 3, 2026", readTime:"3 min", source:"College Board", link:"https://www.collegeboard.org", featured:false, tag:"College" },
  { id:10, category:"scholarships", title:"10 Scholarships with Deadlines in the Next 60 Days", summary:"Don't miss these upcoming scholarship deadlines. We've compiled the best opportunities closing in the next two months with direct application links.", date:"May 1, 2026", readTime:"5 min", source:"StudentRise", link:"#", featured:false, tag:"Scholarship" },
];

const STUDENT_SPOTLIGHTS = [
  { name:"Priya K.", grade:"Grade 12", achievement:"Got into MIT Early Action and won the Regeneron Science Talent Search", tip:"Start your research project junior year — don't wait until senior year like I almost did.", location:"California" },
  { name:"Marcus T.", grade:"Grade 11", achievement:"Landed a paid NASA internship and started his own nonprofit", tip:"Apply to everything even if you think you won't get it. I almost didn't apply to NASA.", location:"Texas" },
  { name:"Sofia R.", grade:"Grade 10", achievement:"Won the Congressional App Challenge and got featured in Forbes", tip:"Build something you actually care about. Judges can tell when you're passionate.", location:"New York" },
];

const UPCOMING_DEADLINES_TICKER = [
  "⏰ Congressional App Challenge — Oct 31, 2026",
  "📚 Questbridge College Prep — Sep 26, 2026",
  "🔬 Regeneron STS — Nov 15, 2026",
  "🎓 National Merit PSAT — Oct 15, 2026",
  "💰 NGPF Scholarship — Jun 1, 2026",
  "🚀 NASA Internship — Nov 1, 2026",
];

const NEWS_CATEGORIES = ["all","college","scholarships","career","stem"];
const CAT_COLORS_NEWS = {
  college:{ bg:"#EDE9FE", text:"#4C1D95" },
  scholarships:{ bg:"#DCFCE7", text:"#14532D" },
  career:{ bg:"#FEF3C7", text:"#92400E" },
  stem:{ bg:"#E0F2FE", text:"#0C4A6E" },
};

function NewsPage({ isPro, onUpgrade }) {
  const [category, setCategory] = useState("all");
  const [spotlightIdx, setSpotlightIdx] = useState(0);
  const [tickerPos, setTickerPos] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setTickerPos(p => (p + 1) % UPCOMING_DEADLINES_TICKER.length), 3000);
    return () => clearInterval(t);
  }, []);

  const filtered = NEWS_ARTICLES.filter(a => category === "all" || a.category === category);
  const featured = filtered.filter(a => a.featured);
  const regular = filtered.filter(a => !a.featured);
  const spotlight = STUDENT_SPOTLIGHTS[spotlightIdx];

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:"#F8FAFC", minHeight:"100vh" }}>
      {/* Header */}
      <div style={{ background:"linear-gradient(135deg,#0F172A 0%,#1E3A5F 60%,#1E40AF 100%)", padding:"2.5rem 1.5rem 3.5rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 20% 50%, rgba(59,130,246,0.15) 0%, transparent 50%)" }} />
        <div style={{ position:"relative" }}>
          <span style={{ background:"rgba(59,130,246,0.2)", color:"#93C5FD", fontSize:12, fontWeight:700, padding:"4px 14px", borderRadius:999, letterSpacing:"0.08em", display:"inline-block", marginBottom:14 }}>STUDENT NEWS & UPDATES</span>
          <h1 style={{ margin:"0 0 10px", fontSize:"clamp(24px,5vw,42px)", fontWeight:800, color:"#fff", letterSpacing:"-0.02em" }}>What's Happening 📰</h1>
          <p style={{ margin:"0 0 20px", color:"rgba(255,255,255,0.65)", fontSize:15, maxWidth:480, marginLeft:"auto", marginRight:"auto" }}>Stay up to date on college admissions, scholarships, opportunities, and student success stories</p>
        </div>
      </div>

      {/* Deadline ticker */}
      <div style={{ background:"#1E3A5F", padding:"10px 1.5rem", display:"flex", alignItems:"center", gap:12, overflow:"hidden" }}>
        <span style={{ background:"#3B82F6", color:"#fff", fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:999, whiteSpace:"nowrap", flexShrink:0 }}>UPCOMING</span>
        <p style={{ margin:0, fontSize:13, color:"#93C5FD", fontWeight:500, transition:"all .5s" }}>{UPCOMING_DEADLINES_TICKER[tickerPos]}</p>
      </div>

      <div style={{ maxWidth:960, margin:"0 auto", padding:"0 1rem 3rem" }}>
        {/* Category filters */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap", margin:"20px 0 24px", alignItems:"center" }}>
          <span style={{ fontSize:12, fontWeight:700, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.06em" }}>Filter:</span>
          {NEWS_CATEGORIES.map(c=>(
            <button key={c} onClick={()=>setCategory(c)} style={{ padding:"6px 16px", borderRadius:999, border:"1.5px solid", fontSize:13, fontWeight:500, cursor:"pointer", background:category===c?"#1E3A5F":"#fff", color:category===c?"#fff":"#64748B", borderColor:category===c?"#1E3A5F":"#E2E8F0", textTransform:"capitalize" }}>{c==="all"?"All Topics":c}</button>
          ))}
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:24, alignItems:"start" }}>
          {/* Main content */}
          <div>
            {/* Featured articles */}
            {featured.length>0 && (
              <div style={{ marginBottom:24 }}>
                <p style={{ margin:"0 0 12px", fontSize:12, fontWeight:700, color:"#1E3A5F", textTransform:"uppercase", letterSpacing:"0.08em" }}>⭐ Featured Stories</p>
                <div style={{ display:"grid", gap:14 }}>
                  {featured.map(a=>(
                    <a key={a.id} href={a.link} target="_blank" rel="noopener noreferrer" style={{ background:"linear-gradient(135deg,#1E3A5F,#1E40AF)", borderRadius:16, padding:"1.5rem", textDecoration:"none", display:"block", transition:"transform .2s", position:"relative", overflow:"hidden" }}
                      onMouseEnter={e=>e.currentTarget.style.transform="translateY(-2px)"}
                      onMouseLeave={e=>e.currentTarget.style.transform="none"}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:10 }}>
                        <span style={{ background:"rgba(255,255,255,0.15)", color:"#fff", fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:999 }}>{a.tag}</span>
                        <span style={{ color:"rgba(255,255,255,0.5)", fontSize:12 }}>{a.date} · {a.readTime} read</span>
                      </div>
                      <h3 style={{ margin:"0 0 8px", fontSize:18, fontWeight:700, color:"#fff", lineHeight:1.4 }}>{a.title}</h3>
                      <p style={{ margin:"0 0 10px", fontSize:13, color:"rgba(255,255,255,0.7)", lineHeight:1.6 }}>{a.summary}</p>
                      <span style={{ fontSize:12, color:"#93C5FD", fontWeight:600 }}>Read on {a.source} →</span>
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Regular articles */}
            <p style={{ margin:"0 0 12px", fontSize:12, fontWeight:700, color:"#64748B", textTransform:"uppercase", letterSpacing:"0.08em" }}>Latest Stories</p>
            <div style={{ display:"grid", gap:12 }}>
              {regular.map(a=>{
                const cc = CAT_COLORS_NEWS[a.category]||{ bg:"#F1F5F9", text:"#475569" };
                return (
                  <a key={a.id} href={a.link} target="_blank" rel="noopener noreferrer" style={{ background:"#fff", border:"1.5px solid #F1F5F9", borderRadius:14, padding:"1rem 1.25rem", textDecoration:"none", display:"block", transition:"all .2s" }}
                    onMouseEnter={e=>{ e.currentTarget.style.borderColor="#3B82F6"; e.currentTarget.style.transform="translateY(-1px)"; }}
                    onMouseLeave={e=>{ e.currentTarget.style.borderColor="#F1F5F9"; e.currentTarget.style.transform="none"; }}>
                    <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
                          <span style={{ background:cc.bg, color:cc.text, fontSize:11, fontWeight:600, padding:"2px 8px", borderRadius:999 }}>{a.tag}</span>
                          <span style={{ color:"#94A3B8", fontSize:12 }}>{a.date} · {a.readTime} read</span>
                        </div>
                        <h3 style={{ margin:"0 0 6px", fontSize:15, fontWeight:700, color:"#0F172A", lineHeight:1.4 }}>{a.title}</h3>
                        <p style={{ margin:"0 0 8px", fontSize:13, color:"#64748B", lineHeight:1.5 }}>{a.summary}</p>
                        <span style={{ fontSize:12, color:"#3B82F6", fontWeight:600 }}>Read on {a.source} →</span>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>

            {/* Pro personalized feed teaser */}
            {!isPro && (
              <div style={{ marginTop:20, background:"linear-gradient(135deg,#EEF2FF,#F5F3FF)", border:"1px solid #C7D2FE", borderRadius:14, padding:"1.25rem", display:"flex", alignItems:"center", justifyContent:"space-between", gap:12, flexWrap:"wrap" }}>
                <div>
                  <p style={{ margin:"0 0 2px", fontWeight:700, fontSize:14, color:"#4338CA" }}>🤖 Personalized news feed — Pro feature</p>
                  <p style={{ margin:0, fontSize:12, color:"#6366F1" }}>Get articles tailored to your interests, grade, and saved opportunities. Coming soon for Pro members.</p>
                </div>
                <button onClick={onUpgrade} style={{ background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"10px 20px", borderRadius:10, fontWeight:700, fontSize:13, cursor:"pointer", whiteSpace:"nowrap" }}>Upgrade — $4.99/mo</button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div style={{ display:"grid", gap:16 }}>
            {/* Student Spotlight */}
            <div style={{ background:"#fff", border:"1.5px solid #F1F5F9", borderRadius:16, padding:"1.25rem" }}>
              <p style={{ margin:"0 0 14px", fontSize:13, fontWeight:700, color:"#0F172A", display:"flex", alignItems:"center", gap:6 }}>🌟 Student Spotlight</p>
              <div style={{ background:"linear-gradient(135deg,#EEF2FF,#F5F3FF)", borderRadius:12, padding:"1rem", marginBottom:12 }}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <div style={{ width:40, height:40, borderRadius:"50%", background:"linear-gradient(135deg,#6366F1,#8B5CF6)", display:"flex", alignItems:"center", justifyContent:"center", color:"#fff", fontWeight:800, fontSize:16, flexShrink:0 }}>{spotlight.name[0]}</div>
                  <div>
                    <p style={{ margin:0, fontSize:14, fontWeight:700, color:"#0F172A" }}>{spotlight.name}</p>
                    <p style={{ margin:0, fontSize:12, color:"#6366F1" }}>{spotlight.grade} · {spotlight.location}</p>
                  </div>
                </div>
                <p style={{ margin:"0 0 8px", fontSize:13, fontWeight:600, color:"#0F172A" }}>{spotlight.achievement}</p>
                <p style={{ margin:0, fontSize:12, color:"#64748B", lineHeight:1.5, fontStyle:"italic" }}>"{spotlight.tip}"</p>
              </div>
              <div style={{ display:"flex", gap:6, justifyContent:"center" }}>
                {STUDENT_SPOTLIGHTS.map((_,i)=>(
                  <button key={i} onClick={()=>setSpotlightIdx(i)} style={{ width:8, height:8, borderRadius:"50%", background:i===spotlightIdx?"#6366F1":"#E2E8F0", border:"none", cursor:"pointer", padding:0 }} />
                ))}
              </div>
            </div>

            {/* Quick stats */}
            <div style={{ background:"#fff", border:"1.5px solid #F1F5F9", borderRadius:16, padding:"1.25rem" }}>
              <p style={{ margin:"0 0 12px", fontSize:13, fontWeight:700, color:"#0F172A" }}>📊 This Week on StudentRise</p>
              {[["🔍","New opportunities added","8"],["👥","Students on waitlist","—"],["📝","Applications submitted","—"],["🎓","Programs featured","50+"]].map(([icon,label,val])=>(
                <div key={label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderTop:"1px solid #F8FAFC" }}>
                  <span style={{ fontSize:13, color:"#64748B" }}>{icon} {label}</span>
                  <span style={{ fontSize:14, fontWeight:700, color:"#0F172A" }}>{val}</span>
                </div>
              ))}
            </div>

            {/* Newsletter signup */}
            <div style={{ background:"linear-gradient(135deg,#1E3A5F,#1E40AF)", borderRadius:16, padding:"1.25rem" }}>
              <p style={{ margin:"0 0 4px", fontSize:14, fontWeight:700, color:"#fff" }}>📬 Weekly Digest</p>
              <p style={{ margin:"0 0 12px", fontSize:12, color:"rgba(255,255,255,0.7)" }}>Get the best opportunities and news every Monday</p>
              <button onClick={onUpgrade} style={{ width:"100%", background:"#fff", color:"#1E3A5F", border:"none", padding:"10px", borderRadius:10, fontWeight:700, fontSize:13, cursor:"pointer" }}>⚡ Join Pro for Weekly Digest</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// CHANGELOG COMPONENT
// ============================================================

const CHANGELOG = [
  {
    version:"v1.6", date:"May 25, 2026", label:"Latest", labelColor:"#22C55E",
    changes:[
      { type:"new", text:"Added News & Updates page with student spotlights and deadline ticker" },
      { type:"new", text:"Added Changelog page — you're reading it!" },
      { type:"new", text:"Added College Prep Hub with 6 tools including college list, AP tracker, and checklist" },
      { type:"new", text:"Added Study Hub (coming soon) with 6 AI-powered study tools" },
      { type:"new", text:"Added global navigation with dropdown for multiple pages" },
      { type:"improve", text:"Made Study Hub button stand out with gold styling and SOON badge" },
    ]
  },
  {
    version:"v1.5", date:"May 18, 2026", label:"", labelColor:"#6366F1",
    changes:[
      { type:"new", text:"Added Pro upgrade modal with full feature list and waitlist signup" },
      { type:"new", text:"Added spam protection to Pro waitlist — email validation and cooldown" },
      { type:"new", text:"Connected Pro waitlist to Google Sheets for email tracking" },
      { type:"new", text:"Added 3 early access Pro-only opportunities" },
      { type:"improve", text:"Study Hub button now shows daily usage limits for free users" },
    ]
  },
  {
    version:"v1.4", date:"May 12, 2026", label:"", labelColor:"#6366F1",
    changes:[
      { type:"new", text:"Added AI match scores — see your % fit for every opportunity" },
      { type:"new", text:"Added Student Profile tab — set grade, GPA, age, and interests" },
      { type:"new", text:"Added Application Tracker — mark apps as Interested/Applied/Waiting/Accepted" },
      { type:"new", text:"Added Saved Opportunities tab with urgent deadline alerts" },
      { type:"new", text:"Added deadline reminders via browser notifications" },
    ]
  },
  {
    version:"v1.3", date:"May 5, 2026", label:"", labelColor:"#6366F1",
    changes:[
      { type:"new", text:"Launched Pro subscription waitlist at $4.99/mo" },
      { type:"new", text:"Added 50 real opportunities across 8 categories with working Apply Now buttons" },
      { type:"new", text:"Added Submit Opportunity form connected to Google Sheets" },
      { type:"new", text:"Added advanced filters — deadline, cost, location, GPA, age, citizenship" },
      { type:"improve", text:"All Apply Now buttons now link to official application pages" },
    ]
  },
  {
    version:"v1.0", date:"Apr 28, 2026", label:"Launch 🚀", labelColor:"#F59E0B",
    changes:[
      { type:"new", text:"StudentRise launched!" },
      { type:"new", text:"Opportunity finder with search and category filters" },
      { type:"new", text:"12 initial opportunities across finance, coding, business, and volunteering" },
      { type:"new", text:"Submit opportunity form" },
    ]
  },
];

const COMING_SOON_FEATURES = [
  { icon:"📅", title:"Smart Study Calendar", desc:"AI-powered reverse planning from your deadlines", eta:"June 2026" },
  { icon:"🎯", title:"Acceptance Chance Estimator", desc:"See your likelihood of getting into any program", eta:"June 2026" },
  { icon:"🎓", title:"Scholarship Hub", desc:"Dedicated scholarship finder with AI essay assistant", eta:"July 2026" },
  { icon:"👥", title:"Community Page", desc:"Forum, success stories, and student connections", eta:"July 2026" },
  { icon:"📚", title:"Study Hub", desc:"AI homework help, essay grader, flashcards and more", eta:"Coming soon" },
  { icon:"📊", title:"GPA Calculator", desc:"Track grades and calculate your GPA automatically", eta:"Coming soon" },
  { icon:"📁", title:"Document Vault", desc:"Store essays, resumes, and rec letters in one place", eta:"Coming soon" },
  { icon:"🏆", title:"Achievement Badges", desc:"Earn badges for applying to opportunities", eta:"Coming soon" },
  { icon:"🔄", title:"Auto-fill Applications", desc:"Save your info once, auto-populate application forms", eta:"Coming soon" },
  { icon:"🏫", title:"College Comparison Tool", desc:"Compare up to 5 colleges side by side", eta:"Coming soon" },
  { icon:"📬", title:"Pro Newsletter", desc:"Monthly exclusive opportunities for Pro members only", eta:"Coming soon" },
  { icon:"🎙️", title:"Recorded Workshops", desc:"College application masterclasses from experts", eta:"Coming soon" },
];

function ChangelogPage({ onUpgrade }) {
  const TYPE_STYLES = {
    new: { bg:"#DCFCE7", text:"#15803D", label:"New" },
    improve: { bg:"#EDE9FE", text:"#6D28D9", label:"Improved" },
    fix: { bg:"#FEF3C7", text:"#92400E", label:"Fixed" },
  };

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:"#F8FAFC", minHeight:"100vh" }}>
      <div style={{ background:"linear-gradient(135deg,#0F172A 0%,#1E293B 60%,#334155 100%)", padding:"2.5rem 1.5rem 3.5rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 80% 20%, rgba(99,102,241,0.1) 0%, transparent 40%)" }} />
        <div style={{ position:"relative" }}>
          <span style={{ background:"rgba(99,102,241,0.2)", color:"#A5B4FC", fontSize:12, fontWeight:700, padding:"4px 14px", borderRadius:999, letterSpacing:"0.08em", display:"inline-block", marginBottom:14 }}>PLATFORM UPDATES</span>
          <h1 style={{ margin:"0 0 10px", fontSize:"clamp(24px,5vw,42px)", fontWeight:800, color:"#fff", letterSpacing:"-0.02em" }}>What's New 📣</h1>
          <p style={{ margin:0, color:"rgba(255,255,255,0.6)", fontSize:15, maxWidth:480, marginLeft:"auto", marginRight:"auto" }}>Every update, improvement, and new feature we've shipped — and what's coming next</p>
        </div>
      </div>

      <div style={{ maxWidth:800, margin:"0 auto", padding:"0 1rem 3rem" }}>
        {/* Coming soon section */}
        <div style={{ background:"#fff", border:"1.5px solid #F1F5F9", borderRadius:20, padding:"1.5rem", marginTop:24, marginBottom:24, boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16, flexWrap:"wrap", gap:8 }}>
            <p style={{ margin:0, fontSize:16, fontWeight:700, color:"#0F172A" }}>🔮 Coming Soon</p>
            <button onClick={onUpgrade} style={{ background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"8px 16px", borderRadius:10, fontWeight:700, fontSize:12, cursor:"pointer" }}>⚡ Pro members get early access</button>
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(220px,1fr))", gap:10 }}>
            {COMING_SOON_FEATURES.map(f=>(
              <div key={f.title} style={{ background:"#F8FAFC", border:"1px solid #F1F5F9", borderRadius:12, padding:"12px 14px", display:"flex", gap:10, alignItems:"flex-start" }}>
                <span style={{ fontSize:20, flexShrink:0 }}>{f.icon}</span>
                <div>
                  <p style={{ margin:"0 0 2px", fontSize:13, fontWeight:700, color:"#0F172A" }}>{f.title}</p>
                  <p style={{ margin:"0 0 4px", fontSize:11, color:"#64748B", lineHeight:1.4 }}>{f.desc}</p>
                  <span style={{ fontSize:10, fontWeight:700, color:"#6366F1", background:"#EEF2FF", padding:"1px 6px", borderRadius:999 }}>{f.eta}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Version history */}
        <p style={{ margin:"0 0 16px", fontSize:12, fontWeight:700, color:"#64748B", textTransform:"uppercase", letterSpacing:"0.08em" }}>Version History</p>
        <div style={{ display:"grid", gap:16 }}>
          {CHANGELOG.map((v,i)=>(
            <div key={v.version} style={{ background:"#fff", border:"1.5px solid #F1F5F9", borderRadius:16, padding:"1.25rem", boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <span style={{ fontSize:16, fontWeight:800, color:"#0F172A" }}>{v.version}</span>
                {v.label && <span style={{ background:v.labelColor+"20", color:v.labelColor, fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:999 }}>{v.label}</span>}
                <span style={{ fontSize:12, color:"#94A3B8", marginLeft:"auto" }}>{v.date}</span>
              </div>
              <div style={{ display:"grid", gap:8 }}>
                {v.changes.map((c,j)=>{
                  const s = TYPE_STYLES[c.type]||TYPE_STYLES.new;
                  return (
                    <div key={j} style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
                      <span style={{ background:s.bg, color:s.text, fontSize:10, fontWeight:700, padding:"2px 6px", borderRadius:999, flexShrink:0, marginTop:2 }}>{s.label}</span>
                      <p style={{ margin:0, fontSize:13, color:"#374151", lineHeight:1.5 }}>{c.text}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}


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
  const [profile, setProfile] = useState({ grade:"", age:"", gpa:"", citizenship:"Any", interests:[] });
  const [isPro, setIsPro] = useState(false); // set to true to test Pro features
  const [waitlistCount, setWaitlistCount] = useState(0);

  useEffect(() => {
    const stored = parseInt(sessionStorage.getItem("waitlist_sim_count") || "0");
    setWaitlistCount(stored);
  }, []);

  const gpaRank = { "none":0,"2.5+":2.5,"3.0+":3.0,"3.5+":3.5,"3.7+":3.7 };

  useEffect(() => {
    if (!isPro) return;
    const savedOpps = OPPORTUNITIES.filter(o=>savedIds.includes(o.id));
    savedOpps.forEach(opp => {
      const daysLeft = Math.ceil((new Date(opp.deadline)-new Date())/86400000);
      if (daysLeft===7||daysLeft===1) {
        if (Notification.permission==="granted") {
          new Notification(`⏰ Deadline reminder: ${opp.title}`, { body:`${daysLeft} day${daysLeft>1?"s":""} left to apply!` });
        } else if (Notification.permission!=="denied") {
          Notification.requestPermission();
        }
      }
    });
  }, [savedIds, isPro]);

  const handleToggleSave = (idOrUpgrade) => {
    if (idOrUpgrade==="upgrade") { setModal("upgrade"); return; }
    setSavedIds(prev=>prev.includes(idOrUpgrade)?prev.filter(x=>x!==idOrUpgrade):[...prev,idOrUpgrade]);
  };
  const handleStatusChange = (id, status) => {
    setAppStatuses(prev=>{ const n={...prev}; if(status===null) delete n[id]; else n[id]=status; return n; });
    if (status && !savedIds.includes(id)) setSavedIds(prev=>[...prev,id]);
  };

  const visibleOpps = useMemo(()=>OPPORTUNITIES.filter(o=>isPro||!o.earlyAccess),[isPro]);

  const filtered = useMemo(()=>visibleOpps.filter(o=>{
    const q = search.toLowerCase();
    const daysLeft = Math.ceil((new Date(o.deadline)-new Date())/86400000);
    const matchSearch = !q||o.title.toLowerCase().includes(q)||o.category.includes(q)||o.description.toLowerCase().includes(q)||o.tags.some(t=>t.includes(q));
    const matchCat = cat==="all"||o.category===cat;
    const matchMode = mode==="all"||o.mode===mode;
    const matchGrade = grade==="all"||o.grades.includes(Number(grade));
    const matchLocation = location==="all"||o.requirements.location===location||o.requirements.location==="International";
    const matchDeadline = deadline==="all"||(daysLeft>0&&daysLeft<=Number(deadline));
    const matchCost = costFilter==="all"||o.cost===costFilter;
    const matchPaid = !paidOnly||o.paid;
    const matchGpa = gpaFilter==="any"||(gpaRank[o.requirements.gpa]||0)<=(gpaRank[gpaFilter]||0)||o.requirements.gpa==="none";
    const matchCitizenship = citizenshipFilter==="Any"||o.requirements.citizenship==="Any"||o.requirements.citizenship===citizenshipFilter;
    const matchAge = !ageFilter||(Number(ageFilter)>=o.requirements.minAge&&Number(ageFilter)<=o.requirements.maxAge);
    return matchSearch&&matchCat&&matchMode&&matchGrade&&matchLocation&&matchDeadline&&matchCost&&matchPaid&&matchGpa&&matchCitizenship&&matchAge;
  }),[visibleOpps,search,cat,mode,grade,location,deadline,costFilter,paidOnly,gpaFilter,citizenshipFilter,ageFilter]);

  const featured = filtered.filter(o=>o.featured);
  const regular = filtered.filter(o=>!o.featured);
  const activeFilterCount = [cat!=="all",mode!=="all",grade!=="all",location!=="all",deadline!=="all",costFilter!=="all",paidOnly,gpaFilter!=="any",citizenshipFilter!=="Any",!!ageFilter].filter(Boolean).length;
  const selBtn = (active)=>({ padding:"6px 14px", borderRadius:999, border:"1.5px solid", fontSize:13, fontWeight:500, cursor:"pointer", transition:"all .15s", whiteSpace:"nowrap", background:active?"#6366F1":"#fff", color:active?"#fff":"#64748B", borderColor:active?"#6366F1":"#E2E8F0" });
  const inp = { padding:"7px 12px", borderRadius:10, border:"1.5px solid #E2E8F0", fontSize:13, outline:"none", fontFamily:"inherit", background:"#fff" };
  const clearAll = ()=>{ setSearch(""); setCat("all"); setMode("all"); setGrade("all"); setLocation("all"); setDeadline("all"); setCostFilter("all"); setPaidOnly(false); setGpaFilter("any"); setCitizenshipFilter("Any"); setAgeFilter(""); };

  const tabs = [
    { id:"browse", label:"🔍 Browse" },
    { id:"saved", label:"🔖 Saved", count:savedIds.length||null, pro:true },
    { id:"tracker", label:"📋 Tracker", count:Object.keys(appStatuses).length||null, pro:true },
    { id:"profile", label:"👤 Profile", pro:true },
  ];

  return (
    <div style={{ fontFamily:"'DM Sans','Segoe UI',sans-serif", background:"#F8FAFC", minHeight:"100vh" }}>

      {/* Global Nav */}
      <div style={{ background:"#fff", borderBottom:"1px solid #F1F5F9", padding:"0 1.5rem", display:"flex", alignItems:"center", justifyContent:"space-between", position:"sticky", top:0, zIndex:200, boxShadow:"0 1px 8px rgba(0,0,0,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 0" }}>
          <div style={{ width:32, height:32, background:"linear-gradient(135deg,#6366F1,#8B5CF6)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🎓</div>
          <span style={{ fontSize:16, fontWeight:800, color:"#0F172A", letterSpacing:"-0.02em" }}>StudentRise</span>
        </div>
        <div style={{ display:"flex", gap:4, alignItems:"center", position:"relative" }}>
          <button onClick={()=>setPage("opportunities")} style={{ padding:"8px 14px", borderRadius:10, border:"none", fontSize:13, fontWeight:600, cursor:"pointer", background:page==="opportunities"?"linear-gradient(135deg,#6366F1,#8B5CF6)":"transparent", color:page==="opportunities"?"#fff":"#64748B" }}>🔍 Opportunities</button>
          <button onClick={()=>setPage("collegeprep")} style={{ padding:"8px 14px", borderRadius:10, border:"none", fontSize:13, fontWeight:600, cursor:"pointer", background:page==="collegeprep"?"linear-gradient(135deg,#6366F1,#8B5CF6)":"transparent", color:page==="collegeprep"?"#fff":"#64748B" }}>🎓 College Prep</button>
          <button onClick={()=>setPage("studyhub")} style={{ padding:"8px 12px", borderRadius:10, border:"2px solid #F59E0B", fontSize:13, fontWeight:700, cursor:"pointer", background:page==="studyhub"?"linear-gradient(135deg,#F59E0B,#EF4444)":"linear-gradient(135deg,#FEF3C7,#FDE68A)", color:page==="studyhub"?"#fff":"#92400E", boxShadow:"0 2px 12px rgba(245,158,11,0.3)", display:"flex", alignItems:"center", gap:4 }}>
            📚 Study Hub <span style={{ background:"#EF4444", color:"#fff", fontSize:9, fontWeight:800, padding:"1px 5px", borderRadius:999 }}>SOON</span>
          </button>
          <div style={{ position:"relative" }}>
            <button onClick={()=>setMoreOpen(m=>!m)} style={{ padding:"8px 12px", borderRadius:10, border:"1.5px solid #E2E8F0", fontSize:13, fontWeight:600, cursor:"pointer", background:["news","changelog"].includes(page)?"linear-gradient(135deg,#6366F1,#8B5CF6)":"#fff", color:["news","changelog"].includes(page)?"#fff":"#64748B", display:"flex", alignItems:"center", gap:4 }}>
              More {moreOpen?"▲":"▼"}
            </button>
            {moreOpen && (
              <div style={{ position:"absolute", top:"calc(100% + 6px)", right:0, background:"#fff", border:"1.5px solid #F1F5F9", borderRadius:12, padding:6, minWidth:160, boxShadow:"0 8px 24px rgba(0,0,0,0.12)", zIndex:300 }}>
                {[["news","📰 News"],["changelog","📣 What's New"]].map(([p,label])=>(
                  <button key={p} onClick={()=>{ setPage(p); setMoreOpen(false); }} style={{ width:"100%", padding:"9px 12px", borderRadius:8, border:"none", fontSize:13, fontWeight:600, cursor:"pointer", textAlign:"left", background:page===p?"#EEF2FF":"transparent", color:page===p?"#4338CA":"#374151", display:"block" }}>{label}</button>
                ))}
              </div>
            )}
          </div>
        </div>
        <button onClick={()=>setModal("upgrade")} style={{ background:"linear-gradient(135deg,#6366F1,#8B5CF6)", color:"#fff", border:"none", padding:"8px 16px", borderRadius:10, fontWeight:700, fontSize:13, cursor:"pointer" }}>⚡ Pro</button>
      </div>

      {page==="studyhub" && <StudyHub isPro={isPro} onUpgrade={()=>setModal("upgrade")} />}
      {page==="collegeprep" && <CollegePrepHub isPro={isPro} onUpgrade={()=>setModal("upgrade")} />}
      {page==="news" && <NewsPage isPro={isPro} onUpgrade={()=>setModal("upgrade")} />}
      {page==="changelog" && <ChangelogPage onUpgrade={()=>setModal("upgrade")} />}
      {page==="opportunities" && <>

      <div style={{ background:"linear-gradient(135deg,#4F46E5 0%,#7C3AED 60%,#A855F7 100%)", padding:"2.5rem 1.5rem 3.5rem", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", inset:0, backgroundImage:"radial-gradient(circle at 20% 50%, rgba(255,255,255,0.07) 0%, transparent 50%)" }} />
        <div style={{ position:"relative" }}>
          <span style={{ background:"rgba(255,255,255,0.15)", color:"#fff", fontSize:12, fontWeight:700, padding:"4px 14px", borderRadius:999, letterSpacing:"0.08em", display:"inline-block", marginBottom:14 }}>FOR STUDENTS, BY STUDENTS</span>
          <h1 style={{ margin:"0 0 10px", fontSize:"clamp(24px,5vw,42px)", fontWeight:800, color:"#fff", letterSpacing:"-0.02em", lineHeight:1.15 }}>Find Your Next Opportunity</h1>
          <p style={{ margin:"0 0 6px", color:"rgba(255,255,255,0.8)", fontSize:15, maxWidth:480, marginLeft:"auto", marginRight:"auto" }}>
            {visibleOpps.length} curated programs, internships & competitions for high school students
          </p>
          <p style={{ margin:"0 0 20px", color:"rgba(255,255,255,0.6)", fontSize:12 }}>All Apply Now buttons link directly to official application pages</p>
          <div style={{ display:"flex", gap:10, justifyContent:"center", flexWrap:"wrap" }}>
            <button onClick={()=>setModal("upgrade")} style={{ background:"#fff", color:"#4F46E5", border:"none", padding:"11px 22px", borderRadius:12, fontWeight:700, fontSize:14, cursor:"pointer" }}>⚡ Go Pro — $4.99/mo</button>
            <button onClick={()=>setModal("submit")} style={{ background:"rgba(255,255,255,0.15)", color:"#fff", border:"1.5px solid rgba(255,255,255,0.35)", padding:"11px 22px", borderRadius:12, fontWeight:700, fontSize:14, cursor:"pointer" }}>+ Submit</button>
          </div>
        </div>
      </div>

      <div style={{ maxWidth:980, margin:"0 auto", padding:"0 1rem 3rem" }}>
        <div style={{ display:"flex", gap:4, background:"#fff", borderRadius:14, border:"1.5px solid #F1F5F9", padding:4, marginTop:16, boxShadow:"0 4px 24px rgba(0,0,0,0.07)", marginBottom:20, overflowX:"auto", width:"fit-content", maxWidth:"100%" }}>
          {tabs.map(tab=>(
            <button key={tab.id} onClick={()=>setActiveTab(tab.id)}
              style={{ padding:"9px 18px", borderRadius:10, border:"none", fontSize:13, fontWeight:600, cursor:"pointer", transition:"all .15s", display:"flex", alignItems:"center", gap:5, whiteSpace:"nowrap", background:activeTab===tab.id?"linear-gradient(135deg,#6366F1,#8B5CF6)":"transparent", color:activeTab===tab.id?"#fff":"#64748B", boxShadow:activeTab===tab.id?"0 2px 8px rgba(99,102,241,0.3)":"none" }}>
              {tab.label}
              {tab.count ? <span style={{ background:activeTab===tab.id?"rgba(255,255,255,0.25)":"#EEF2FF", color:activeTab===tab.id?"#fff":"#6366F1", fontSize:11, fontWeight:700, padding:"1px 7px", borderRadius:999 }}>{tab.count}</span> : null}
              {tab.pro && !isPro && <span style={{ fontSize:9, background:"#FEF3C7", color:"#92400E", padding:"1px 5px", borderRadius:999, fontWeight:700 }}>PRO</span>}
            </button>
          ))}
          <button onClick={()=>setIsPro(p=>!p)} style={{ padding:"6px 12px", borderRadius:10, border:"1px dashed #E2E8F0", fontSize:11, fontWeight:600, cursor:"pointer", color:"#94A3B8", background:"transparent", whiteSpace:"nowrap" }}>
            {isPro?"🔓 Pro ON":"🔒 Test Pro"}
          </button>
        </div>

        {activeTab==="saved" && <SavedTab savedIds={savedIds} appStatuses={appStatuses} isPro={isPro} onToggleSave={handleToggleSave} onStatusChange={handleStatusChange} onUpgrade={()=>setModal("upgrade")} profile={profile} />}
        {activeTab==="tracker" && <TrackerTab appStatuses={appStatuses} isPro={isPro} onUpgrade={()=>setModal("upgrade")} onStatusChange={handleStatusChange} onToggleSave={handleToggleSave} savedIds={savedIds} profile={profile} />}
        {activeTab==="profile" && <ProfileTab profile={profile} setProfile={setProfile} isPro={isPro} onUpgrade={()=>setModal("upgrade")} />}
        {activeTab==="browse" && (
          <>
            <div style={{ background:"#fff", borderRadius:20, border:"1.5px solid #F1F5F9", padding:"1.25rem", boxShadow:"0 2px 12px rgba(0,0,0,0.04)", marginBottom:20 }}>
              <div style={{ display:"flex", gap:10, marginBottom:12 }}>
                <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="🔍  Search finance, coding, scholarships, leadership..."
                  style={{ flex:1, padding:"12px 16px", borderRadius:12, border:"1.5px solid #E2E8F0", fontSize:14, outline:"none", fontFamily:"inherit", background:"#F8FAFC" }} />
                <button onClick={()=>setFiltersOpen(f=>!f)} style={{ padding:"10px 16px", borderRadius:12, border:"1.5px solid", fontSize:13, fontWeight:600, cursor:"pointer", whiteSpace:"nowrap", background:filtersOpen?"#6366F1":"#fff", color:filtersOpen?"#fff":"#374151", borderColor:filtersOpen?"#6366F1":"#E2E8F0" }}>
                  🎛 Filters {activeFilterCount>0?`(${activeFilterCount})`:""}
                </button>
              </div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:7, alignItems:"center" }}>
                <span style={{ fontSize:11, fontWeight:700, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.06em" }}>Category:</span>
                {CATEGORIES.map(c=><button key={c} onClick={()=>setCat(c)} style={selBtn(cat===c)}>{c==="all"?"All":c}</button>)}
              </div>
              {filtersOpen && (
                <div style={{ marginTop:14, paddingTop:14, borderTop:"1px solid #F1F5F9", display:"grid", gap:14 }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                    <div>
                      <p style={{ margin:"0 0 6px", fontSize:11, fontWeight:700, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.06em" }}>Mode</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {["all","virtual","in-person"].map(m=><button key={m} onClick={()=>setMode(m)} style={selBtn(mode===m)}>{m==="all"?"All":m==="virtual"?"🌐 Virtual":"📍 In-Person"}</button>)}
                      </div>
                    </div>
                    <div>
                      <p style={{ margin:"0 0 6px", fontSize:11, fontWeight:700, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.06em" }}>Grade</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {["all",...GRADES].map(g=><button key={g} onClick={()=>setGrade(String(g))} style={selBtn(String(grade)===String(g))}>{g==="all"?"All":`G${g}`}</button>)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                    <div>
                      <p style={{ margin:"0 0 6px", fontSize:11, fontWeight:700, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.06em" }}>⏰ Deadline</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {DEADLINE_FILTERS.map(d=><button key={d.value} onClick={()=>setDeadline(d.value)} style={selBtn(deadline===d.value)}>{d.label}</button>)}
                      </div>
                    </div>
                    <div>
                      <p style={{ margin:"0 0 6px", fontSize:11, fontWeight:700, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.06em" }}>💳 Cost</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {[{v:"all",l:"Any"},{v:"free",l:"🆓 Free"},{v:"paid",l:"💳 Has cost"}].map(o=><button key={o.v} onClick={()=>setCostFilter(o.v)} style={selBtn(costFilter===o.v)}>{o.l}</button>)}
                      </div>
                    </div>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                    <div>
                      <p style={{ margin:"0 0 6px", fontSize:11, fontWeight:700, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.06em" }}>🌍 Location</p>
                      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                        {LOCATIONS.map(l=><button key={l} onClick={()=>setLocation(l)} style={selBtn(location===l)}>{l==="all"?"🌍 All":l==="US only"?"🇺🇸 US only":"🌐 International"}</button>)}
                      </div>
                    </div>
                    <div>
                      <p style={{ margin:"0 0 6px", fontSize:11, fontWeight:700, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.06em" }}>💰 Stipend</p>
                      <div style={{ display:"flex", gap:6 }}>
                        <button onClick={()=>setPaidOnly(false)} style={selBtn(!paidOnly)}>Any</button>
                        <button onClick={()=>setPaidOnly(true)} style={selBtn(paidOnly)}>💰 Paid only</button>
                      </div>
                    </div>
                  </div>
                  <div>
                    <p style={{ margin:"0 0 8px", fontSize:11, fontWeight:700, color:"#94A3B8", textTransform:"uppercase", letterSpacing:"0.06em" }}>📋 My Requirements</p>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
                      <div><label style={{ fontSize:12, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>My GPA</label>
                        <select value={gpaFilter} onChange={e=>setGpaFilter(e.target.value)} style={inp}>
                          <option value="any">Any GPA</option>
                          {["2.5+","3.0+","3.5+","3.7+"].map(g=><option key={g} value={g}>I have {g}</option>)}
                        </select></div>
                      <div><label style={{ fontSize:12, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>Citizenship</label>
                        <select value={citizenshipFilter} onChange={e=>setCitizenshipFilter(e.target.value)} style={inp}>
                          {CITIZENSHIP_OPTIONS.map(c=><option key={c}>{c}</option>)}
                        </select></div>
                      <div><label style={{ fontSize:12, fontWeight:600, color:"#374151", display:"block", marginBottom:4 }}>My Age</label>
                        <input type="number" value={ageFilter} onChange={e=>setAgeFilter(e.target.value)} placeholder="e.g. 16" min={13} max={18} style={{ ...inp, width:"100%", boxSizing:"border-box" }} /></div>
                    </div>
                  </div>
                  <button onClick={clearAll} style={{ background:"none", border:"1px solid #FECACA", padding:"7px 16px", borderRadius:10, fontSize:13, color:"#EF4444", fontWeight:600, cursor:"pointer", alignSelf:"flex-start" }}>✕ Clear all filters</button>
                </div>
              )}
            </div>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:16 }}>
              <p style={{ margin:0, fontSize:14, color:"#64748B" }}><strong style={{ color:"#0F172A" }}>{filtered.length}</strong> of {visibleOpps.length} opportunities</p>
              {activeFilterCount>0 && <button onClick={clearAll} style={{ background:"none", border:"none", fontSize:13, color:"#6366F1", cursor:"pointer", fontWeight:600 }}>Clear all filters</button>}
            </div>
            {isPro && (
              <div style={{ background:"linear-gradient(135deg,#FEF3C7,#FDE68A)", border:"1px solid #FCD34D", borderRadius:12, padding:"10px 14px", marginBottom:16, display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:18 }}>⚡</span>
                <p style={{ margin:0, fontSize:13, fontWeight:600, color:"#92400E" }}>Pro member — you're seeing {OPPORTUNITIES.filter(o=>o.earlyAccess).length} exclusive early access opportunities that free users can't see!</p>
              </div>
            )}
            {featured.length>0 && (
              <>
                <p style={{ margin:"0 0 10px", fontSize:12, fontWeight:700, color:"#6366F1", textTransform:"uppercase", letterSpacing:"0.08em" }}>⭐ Featured</p>
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14, marginBottom:24 }}>
                  {featured.map(o=><OpportunityCard key={o.id} opp={o} isPro={isPro} saved={savedIds.includes(o.id)} onToggleSave={handleToggleSave} appStatus={appStatuses[o.id]} onStatusChange={handleStatusChange} profile={isPro&&(profile.grade||profile.gpa||profile.age)?profile:null} />)}
                </div>
              </>
            )}
            {regular.length>0 && (
              <>
                {featured.length>0 && <p style={{ margin:"0 0 10px", fontSize:12, fontWeight:700, color:"#64748B", textTransform:"uppercase", letterSpacing:"0.08em" }}>All Opportunities</p>}
                <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))", gap:14 }}>
                  {regular.map(o=><OpportunityCard key={o.id} opp={o} isPro={isPro} saved={savedIds.includes(o.id)} onToggleSave={handleToggleSave} appStatus={appStatuses[o.id]} onStatusChange={handleStatusChange} profile={isPro&&(profile.grade||profile.gpa||profile.age)?profile:null} />)}
                </div>
              </>
            )}
            {filtered.length===0 && (
              <div style={{ textAlign:"center", padding:"3rem" }}>
                <div style={{ fontSize:48, marginBottom:12 }}>🔍</div>
                <p style={{ fontSize:16, fontWeight:600, color:"#64748B" }}>No opportunities match your filters.</p>
                <button onClick={clearAll} style={{ marginTop:12, background:"#6366F1", color:"#fff", border:"none", padding:"10px 20px", borderRadius:10, fontWeight:600, cursor:"pointer" }}>Clear all filters</button>
              </div>
            )}
          </>
        )}
      </div>

      {modal && (
        <div onClick={e=>{ if(e.target===e.currentTarget) setModal(null); }} style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.45)", display:"flex", alignItems:"center", justifyContent:"center", zIndex:100, padding:"1rem" }}>
          <div style={{ background:"#fff", borderRadius:20, padding:"1.5rem", width:"100%", maxWidth:500, maxHeight:"90vh", overflowY:"auto", boxShadow:"0 24px 64px rgba(0,0,0,0.18)" }}>
            {modal==="submit" && <SubmitForm onClose={()=>setModal(null)} />}
            {modal==="upgrade" && <ProUpgradeModal onClose={()=>setModal(null)} waitlistCount={waitlistCount} />}
          </div>
        </div>
      )}
      </>}
    </div>
  );
      }  
