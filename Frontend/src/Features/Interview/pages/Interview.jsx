import React, { useState } from 'react';
import '../Styles/Interview.scss';

const QUESTIONS = [
  {
    id: 102,
    difficulty: 'MEDIUM',
    title: 'Implement a Thread-Safe Singleton',
    question: 'How would you implement a Singleton pattern in a multi-threaded environment? Explain the double-checked locking pattern and its importance.',
    interviewer: 'This question evaluates your understanding of concurrency, memory visibility (volatile), and design patterns in high-performance system design.',
    sample: `public class DatabaseConnection {
  private static volatile DatabaseConnection instance;
  
  private DatabaseConnection() {
    if (instance == null) {
      synchronized (DatabaseConnection.class) {
        if (instance == null) {
          instance = new DatabaseConnection();
        }
      }
    }
  }
  
  public static DatabaseConnection getInstance() {
    return instance;
  }
}`
  },
  {
    id: 103,
    difficulty: 'HARD',
    title: 'Design a Distributed Cache',
    question: 'Design a distributed cache system that handles cache invalidation and consistency.',
    interviewer: 'Evaluate your understanding of cache strategies and distributed systems.',
    sample: `Implementation details here...`
  }
];

const SKILLS = [
  { name: 'DATA STRUCTURES', score: 92 },
  { name: 'SYSTEM DESIGN', score: 78 },
  { name: 'COMMUNICATION', score: 64 }
];

const SKILL_GAPS = [
  { name: 'Distributed Systems', level: 'INTERMEDIATE' },
  { name: 'Algorithm Design', level: 'ADVANCED' }
];

const DRILLS = [
  { name: 'Microservices Design', type: '10 Qs • Deep Study' },
  { name: 'STAR Method Review', type: '10 Qs • Behavioral' }
];

export default function Interview() {
  const [activeTab, setActiveTab] = useState('TECHNICAL_QUESTIONS');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const tabs = [
    { id: 'TECHNICAL_QUESTIONS', label: 'TECHNICAL QUESTIONS' },
    { id: 'BEHAVIORAL_QUESTIONS', label: 'BEHAVIORAL QUESTIONS' },
    { id: 'SKILL_GAP_ANALYSIS', label: 'SKILL GAP ANALYSIS' },
    { id: 'PERFORMANCE', label: 'PERFORMANCE' }
  ];

  const handleSubmitAnswer = () => {
    setSubmitted(true);
    setTimeout(() => {
      setCurrentQuestion((prev) => Math.min(prev + 1, QUESTIONS.length - 1));
      setSubmitted(false);
      setUserAnswer('');
    }, 2000);
  };

  return (
    <div className="interview-dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <h1 className="sidebar-logo">PrepAI</h1>
        </div>

        <div className="sidebar-section">
          <p className="sidebar-section-label">PREPARATION</p>
          <nav className="sidebar-nav">
            <a href="#" className="sidebar-nav-item active">
              <span className="nav-icon">📊</span>
              <span className="nav-label">DASHBOARD</span>
            </a>
            <a href="#" className="sidebar-nav-item">
              <span className="nav-icon">⏱️</span>
              <span className="nav-label">SESSIONS</span>
            </a>
            <a href="#" className="sidebar-nav-item">
              <span className="nav-icon">⚙️</span>
              <span className="nav-label">SETTINGS</span>
            </a>
          </nav>
        </div>

        <div className="sidebar-footer">
          <div className="pro-access">
            <p className="pro-label">PRO ACCESS:</p>
            <p className="pro-title">Master System Design</p>
            <button className="pro-btn">UPGRADE FOR PRO</button>
          </div>
          <nav className="sidebar-footer-nav">
            <a href="#" className="footer-nav-item">
              <span className="nav-icon">❓</span>
              <span className="nav-label">HELP</span>
            </a>
            <a href="#" className="footer-nav-item">
              <span className="nav-icon">🚪</span>
              <span className="nav-label">LOGOUT</span>
            </a>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <main className="dashboard-main">
        {/* Top Navbar */}
        <div className="dashboard-navbar">
          <div className="navbar-left">
            <h2 className="page-title">Preparation Dashboard</h2>
          </div>
          <div className="navbar-right">
            <span className="nav-tag">AI INTERVIEW COACH</span>
            <span className="nav-badge">BETA</span>
          </div>
        </div>

        <div className="dashboard-content">
          {/* Main Panel */}
          <div className="main-panel">
            {/* Tabs */}
            <div className="tabs-container">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  className={`tab ${activeTab === tab.id ? 'tab--active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Question Card */}
            <div className="question-card">
              <div className="question-header">
                <div className="question-meta">
                  <span className="question-num">QUESTION {QUESTIONS[currentQuestion].id}</span>
                  <span className={`question-difficulty difficulty-${QUESTIONS[currentQuestion].difficulty.toLowerCase()}`}>
                    {QUESTIONS[currentQuestion].difficulty}
                  </span>
                </div>
                <button className="bookmark-btn">🔖</button>
              </div>

              <h3 className="question-title">{QUESTIONS[currentQuestion].title}</h3>

              <div className="question-content">
                <div className="content-section">
                  <p className="section-label">THE QUESTION</p>
                  <p className="section-text">{QUESTIONS[currentQuestion].question}</p>
                </div>

                <div className="content-section">
                  <p className="section-label">THE INTERVIEW</p>
                  <p className="section-text">{QUESTIONS[currentQuestion].interviewer}</p>
                </div>

                <div className="content-section">
                  <p className="section-label">SAMPLE ANSWER</p>
                  <pre className="code-block">{QUESTIONS[currentQuestion].sample}</pre>
                </div>
              </div>

              {/* Answer Input */}
              <div className="answer-section">
                <label className="answer-label">Your Answer</label>
                <textarea
                  className="answer-textarea"
                  placeholder="Type your answer here..."
                  value={userAnswer}
                  onChange={(e) => setUserAnswer(e.target.value)}
                  disabled={submitted}
                />
                <button
                  className={`submit-answer-btn ${submitted ? 'submitting' : ''}`}
                  onClick={handleSubmitAnswer}
                  disabled={submitted || !userAnswer.trim()}
                >
                  {submitted ? 'Evaluating...' : 'Submit Answer'}
                </button>
              </div>
            </div>
          </div>

          {/* Right Sidebar */}
          <aside className="right-sidebar">
            {/* Stats Card */}
            <div className="stats-card">
              <h3 className="stats-title">Overall Stats</h3>
              
              <div className="circular-stat">
                <svg className="progress-ring" width="140" height="140">
                  <circle
                    className="progress-ring-circle"
                    stroke="white"
                    fill="transparent"
                    r="60"
                    cx="70"
                    cy="70"
                    strokeDasharray="377"
                    strokeDashoffset="57"
                  />
                </svg>
                <div className="stat-center">
                  <div className="stat-value">85%</div>
                  <div className="stat-label">MATCH</div>
                </div>
              </div>

              <p className="stat-note">Your performance is in the top 5% of active users</p>
            </div>

            {/* Skill Progression */}
            <div className="skill-section">
              <h3 className="section-title">SKILL PROGRESSION</h3>
              {SKILLS.map((skill, i) => (
                <div key={i} className="skill-item">
                  <div className="skill-header">
                    <span className="skill-name">{skill.name}</span>
                    <span className="skill-score">{skill.score}%</span>
                  </div>
                  <div className="progress-bar">
                    <div className="progress-fill" style={{ width: `${skill.score}%` }}></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Today's Drills */}
            <div className="drills-section">
              <h3 className="section-title">TODAY'S DRILLS</h3>
              {DRILLS.map((drill, i) => (
                <div key={i} className="drill-item">
                  <div className="drill-title">{drill.name}</div>
                  <div className="drill-meta">{drill.type}</div>
                </div>
              ))}
            </div>
          </aside>
        </div>

        {/* Skill Gap Analysis Section */}
        <div className="gap-analysis-section">
          <div className="gap-section-header">
            <span className="gap-indicator"></span>
            <h3 className="gap-title">Detailed Skill Gap Analysis</h3>
          </div>

          <div className="gap-grid">
            {SKILL_GAPS.map((gap, i) => (
              <div key={i} className="gap-card">
                <div className="gap-name">{gap.name}</div>
                <div className={`gap-badge gap-badge-${gap.level.toLowerCase()}`}>
                  {gap.level}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
