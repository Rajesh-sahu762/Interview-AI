import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import '../Styles/Interview.scss';
import { useInterview } from '../Hooks/useInterview';

export default function Interview() {
  const { id } = useParams();
  const { report, loading, getInterviewReportById } = useInterview();
  const [activeTab, setActiveTab] = useState('TECHNICAL_QUESTIONS');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userAnswer, setUserAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  // Fetch report data on component mount
  useEffect(() => {
    const fetchReport = async () => {
      try {
        setError(null);
        await getInterviewReportById(id);
      } catch (err) {
        setError('Failed to load interview report. Please try again.');
        console.error(err);
      }
    };

    if (id) {
      fetchReport();
    }
    // getInterviewReportById is intentionally omitted because the hook returns a new function each render.
    // We only want to fetch once per route id.
  }, [id]);

  if (loading) {
    return (
      <div className="interview-dashboard">
        <div className="loading-container">
          <div className="spinner"></div>
          <p>Loading your interview report...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="interview-dashboard">
        <div className="error-container">
          <p className="error-message">{error}</p>
        </div>
      </div>
    );
  }

  if (!report) {
    return (
      <div className="interview-dashboard">
        <div className="error-container">
          <p className="error-message">Report not found.</p>
        </div>
      </div>
    );
  }

  // Get questions from report or use empty arrays
  const technicalQuestions = report.technicalQuestions || [];
  const behavioralQuestions = report.behaviouralQuestions || [];
  const skillGaps = report.skillGapAnalysis || [];
  const matchScore = report.matchScore || 0;

  // Combine all questions for navigation
  const allQuestions = activeTab === 'TECHNICAL_QUESTIONS' ? technicalQuestions : behavioralQuestions;
  const currentQuestionData = allQuestions[currentQuestion] || null;

  const tabs = [
    { id: 'TECHNICAL_QUESTIONS', label: 'TECHNICAL QUESTIONS' },
    { id: 'BEHAVIORAL_QUESTIONS', label: 'BEHAVIORAL QUESTIONS' },
    { id: 'SKILL_GAP_ANALYSIS', label: 'SKILL GAP ANALYSIS' },
    { id: 'PERFORMANCE', label: 'PERFORMANCE' }
  ];

  const handleTabChange = (tabId) => {
    setActiveTab(tabId);
    setCurrentQuestion(0);
  };

  const handleSubmitAnswer = () => {
    setSubmitted(true);
    setTimeout(() => {
      const maxQuestions = activeTab === 'TECHNICAL_QUESTIONS' ? technicalQuestions.length : behavioralQuestions.length;
      setCurrentQuestion((prev) => Math.min(prev + 1, maxQuestions - 1));
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
                  onClick={() => handleTabChange(tab.id)}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Question Card */}
            {activeTab === 'TECHNICAL_QUESTIONS' || activeTab === 'BEHAVIORAL_QUESTIONS' ? (
              <div className="question-card">
                {currentQuestionData ? (
                  <>
                    <div className="question-header">
                      <div className="question-meta">
                        <span className="question-num">QUESTION {currentQuestion + 1}</span>
                      </div>
                      <button className="bookmark-btn">🔖</button>
                    </div>

                    <h3 className="question-title">{currentQuestionData.question}</h3>

                    <div className="question-content">
                      <div className="content-section">
                        <p className="section-label">THE INTENTION</p>
                        <p className="section-text">{currentQuestionData.intention}</p>
                      </div>

                      <div className="content-section">
                        <p className="section-label">SAMPLE ANSWER</p>
                        <pre className="code-block">{currentQuestionData.answer}</pre>
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
                  </>
                ) : (
                  <div className="no-questions">
                    <p>No {activeTab === 'TECHNICAL_QUESTIONS' ? 'technical' : 'behavioral'} questions available.</p>
                  </div>
                )}
              </div>
            ) : activeTab === 'SKILL_GAP_ANALYSIS' ? (
              <div className="question-card">
                <h3 className="section-title">Skill Gap Analysis</h3>
                <div className="gap-grid-main">
                  {skillGaps.length > 0 ? (
                    skillGaps.map((gap, i) => (
                      <div key={i} className="gap-card-main">
                        <div className="gap-skill-name">{gap.skill}</div>
                        <div className={`gap-level-badge gap-level-${gap.level.toLowerCase()}`}>
                          {gap.level}
                        </div>
                        <p className="gap-recommendation">{gap.recommendation}</p>
                      </div>
                    ))
                  ) : (
                    <p>No skill gaps identified.</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="question-card">
                <h3 className="section-title">Performance Overview</h3>
                <div className="performance-overview">
                  <div className="performance-stat">
                    <span className="stat-label">Match Score</span>
                    <span className="stat-value">{matchScore}%</span>
                  </div>
                  <div className="performance-stat">
                    <span className="stat-label">Technical Questions</span>
                    <span className="stat-value">{technicalQuestions.length}</span>
                  </div>
                  <div className="performance-stat">
                    <span className="stat-label">Behavioral Questions</span>
                    <span className="stat-value">{behavioralQuestions.length}</span>
                  </div>
                </div>
              </div>
            )}
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
                  <div className="stat-value">{matchScore}%</div>
                  <div className="stat-label">MATCH</div>
                </div>
              </div>

              <p className="stat-note">Your match score with the job description</p>
            </div>

            {/* Questions Summary */}
            <div className="skill-section">
              <h3 className="section-title">QUESTIONS SUMMARY</h3>
              <div className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">Technical</span>
                  <span className="skill-score">{technicalQuestions.length}</span>
                </div>
              </div>
              <div className="skill-item">
                <div className="skill-header">
                  <span className="skill-name">Behavioral</span>
                  <span className="skill-score">{behavioralQuestions.length}</span>
                </div>
              </div>
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
            {skillGaps.length > 0 ? (
              skillGaps.map((gap, i) => (
                <div key={i} className="gap-card">
                  <div className="gap-name">{gap.skill}</div>
                  <div className={`gap-badge gap-badge-${gap.level.toLowerCase()}`}>
                    {gap.level}
                  </div>
                  <p className="gap-desc">{gap.recommendation}</p>
                </div>
              ))
            ) : (
              <p>No skill gaps identified.</p>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
