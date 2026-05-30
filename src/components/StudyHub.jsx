import { useState, useEffect } from "react";

const CLAUDE_API_KEY = "YOUR_CLAUDE_API_KEY_HERE";

export async function askClaude(systemPrompt, userMessage, maxTokens = 1000) {
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

export function StudyTimer() {
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

export function AITool({ title, icon, placeholder, systemPrompt, buttonLabel, freeLimit, isPro, dailyCount, onUse, outputFormatter }) {
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

export function PracticeTest({ isPro, dailyCount, onUse }) {
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

export default function StudyHub({ isPro, onUpgrade }) {
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
            <PracticeTest isPro={isPro} dailyCount={dailyCounts.practiceTest} onUse={() => incrementCount("practiceTest")} />
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
