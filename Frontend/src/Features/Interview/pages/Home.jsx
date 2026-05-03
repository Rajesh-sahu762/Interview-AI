import { useState, useRef } from "react";
import "../Styles/Home.scss"
import { useInterview } from "../Hooks/useInterview";
import { useNavigate } from "react-router";

// ─── Constants ───────────────────────────────────────────────
const STEPS = [
  { label: "Resume",      icon: "📄" },
  { label: "Job Details", icon: "💼" },
  { label: "About You",   icon: "✍️" },
];

const WHAT_YOU_GET = [
  "Match Score",
  "Technical Q&A",
  "Behavioral Q&A",
  "Skill Gap Analysis",
  "7-Day Prep Plan",
  "Sample Answers",
];

const STATS = [
  { num: "10k+",  label: "Interviews Prepped" },
  { num: "94%",   label: "Success Rate"        },
  { num: "3 min", label: "Avg. Analysis Time"  },
];

// ─── Component ───────────────────────────────────────────────
export default function Home() {
  const [toast, setToast] = useState(null);
  const { loading, generateReport } = useInterview();
  const resumeInputRef = useRef();
  const [selfDescription, setSelfDescription] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [step, setStep] = useState(0);
  const [resumeFile, setResumeFile] = useState(null);
  const [resumeText, setResumeText] = useState("");
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // ── Helpers ─────────────────────────────────────────────────
  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const navigate = useNavigate();

  const handleGenerate = async () => {
    try {
      const formData = new FormData();
      if (resumeFile) {
        formData.append("resume", resumeFile);
      } else if (resumeText.trim()) {
        formData.append("resumeText", resumeText.trim());
      } else {
        showToast("Please upload your resume or paste resume text.");
        return;
      }

      formData.append("jobDescription", jobDescription);
      formData.append("selfDescription", selfDescription);

      const data = await generateReport(formData);
      navigate(`/interview/${data.report._id}`);
      showToast("Interview report generated successfully!");
    } catch (error) {
      showToast("Failed to generate report. Please try again.");
    }
  };

  const handleFileChange = (file) => {
    if (!file) return;
    
    // Check file size (5MB limit)
    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      showToast("File size exceeds 5MB limit. Please upload a smaller file.");
      return;
    }
    
    const allowed = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];
    if (!allowed.includes(file.type)) {
      showToast("Please upload a PDF, DOCX, or TXT file.");
      return;
    }
    setResumeFile(file);
    setResumeText("");
  };

  const handleNext = () => {
    if (step === 0 && !resumeFile && !resumeText.trim()) {
      showToast("Please upload your resume or paste resume text.");
      return;
    }
    if (step === 1 && !jobDescription.trim()) {
      showToast("Please enter the job description.");
      return;
    }
    setStep((s) => Math.min(s + 1, 2));
  };

  const handleBack = () => setStep((s) => Math.max(s - 1, 0));

  const handleSubmit = async () => {
    if (!selfDescription.trim()) {
      showToast("Please write a short self-description.");
      return;
    }

    if (!jobDescription.trim()) {
      showToast("Please enter the job description.");
      setStep(1);
      return;
    }

    if (!resumeFile && !resumeText.trim()) {
      showToast("Please upload your resume or paste your resume text.");
      setStep(0);
      return;
    }

    setIsLoading(true);
    try {
      await handleGenerate();
    } finally {
      setIsLoading(false);
    }
  };

  const stepState = (i) => {
    if (i === step) return "active";
    if (i < step)   return "done";
    return "inactive";
  };

  // ── Render ──────────────────────────────────────────────────
  return (
    <div className="home-root">
      {/* Ambient blobs */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* ── Navbar ─────────────────────────────────────────── */}
      <nav className="navbar">
        <div className="nav-logo">
          <span className="nav-logo-dot" />
          PrepAI
        </div>
        <div className="nav-right">
          <span className="nav-tag">AI Interview Coach</span>
          <span className="nav-badge">BETA</span>
        </div>
      </nav>

      {/* ── Main ───────────────────────────────────────────── */}
      <main className="main">

        {/* Hero */}
        <div className="hero">
          <div className="hero-pill">
            <span className="hero-pill-dot" />
            Powered by AI
          </div>
          <h1 className="hero-title">
            Ace Your Next<br /><span>Interview</span>
          </h1>
          <p className="hero-sub">
            Upload your resume, paste the job description, and get a
            personalized interview prep plan — questions, answers &amp; skill
            gap analysis.
          </p>
        </div>

        {/* Form Card */}
        <div className="form-card">

          {/* Step Indicator */}
          <div className="steps">
            {STEPS.map((s, i) => (
              <>
                <div
                  key={i}
                  className={`step ${i < step ? "step--clickable" : ""}`}
                  onClick={() => { if (i < step) setStep(i); }}
                >
                  <div className={`step-num step-num--${stepState(i)}`}>
                    {i < step ? "✓" : i + 1}
                  </div>
                  <span className={`step-label step-label--${stepState(i)}`}>
                    {s.label}
                  </span>
                </div>
                {i < STEPS.length - 1 && (
                  <div className="step-divider" key={`d${i}`} />
                )}
              </>
            ))}
          </div>

          {/* Loading Bar */}
          {isLoading && (
            <div className="loading-bar">
              <div className="loading-bar-fill" />
            </div>
          )}

          {/* ── Step 0 — Resume ──────────────────────────── */}
          {step === 0 && (
            <div className="step-panel">
              <div className="section-header">
                <div className="section-icon">📄</div>
                <div>
                  <div className="section-title">Your Resume</div>
                  <div className="section-desc">Upload PDF/DOCX or paste plain text</div>
                </div>
              </div>

              <div className="field">
                <div
                  className={[
                    "file-upload-zone",
                    isDragging ? "file-upload-zone--dragging" : "",
                    resumeFile ? "file-upload-zone--has-file" : "",
                  ].join(" ")}
                  onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                  onDragLeave={() => setIsDragging(false)}
                  onDrop={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    handleFileChange(e.dataTransfer.files?.[0]);
                  }}
                >
                  <input
                    type="file"
                    accept=".pdf,.docx,.txt"
                    ref={resumeInputRef}
                    onChange={(e) => handleFileChange(e.target.files?.[0])}
                  />
                  {resumeFile ? (
                    <div className="file-name">
                      <span>📎</span>
                      <span>{resumeFile.name}</span>
                      <button
                        className="file-remove"
                        onClick={(e) => {
                          e.stopPropagation();
                          setResumeFile(null);
                          if (resumeInputRef.current) {
                            resumeInputRef.current.value = "";
                          }
                        }}
                      >
                        ✕
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="upload-icon">⬆️</span>
                      <div className="upload-text">
                        <strong>Click to upload</strong> or drag &amp; drop
                      </div>
                      <div className="upload-sub">PDF, DOCX or TXT — max 5MB</div>
                    </>
                  )}
                </div>
              </div>

              <div className="or-divider">or paste text</div>

              <div className="field">
                <textarea
                  placeholder="Paste your resume content here..."
                  value={resumeText}
                  style={{ minHeight: 140 }}
                  onChange={(e) => {
                    setResumeText(e.target.value);
                    setResumeFile(null);
                  }}
                />
                <div className="char-count">{resumeText.length} chars</div>
              </div>

              <button className="submit-btn" onClick={handleNext} disabled={isLoading}>
                <div className="btn-shimmer" />
                <div className="submit-btn-inner">Continue to Job Details →</div>
              </button>
            </div>
          )}

          {/* ── Step 1 — Job Description ─────────────────── */}
          {step === 1 && (
            <div className="step-panel">
              <div className="section-header">
                <div className="section-icon">💼</div>
                <div>
                  <div className="section-title">Job Description</div>
                  <div className="section-desc">Paste the full job posting</div>
                </div>
              </div>

              <div className="field">
                <div className="field-label">
                  Job Title / Role
                  <span className="field-label-hint">Optional but helpful</span>
                </div>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Engineer at Stripe"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                />
              </div>

              <div className="field">
                <div className="field-label">
                  Job Description
                  <span className="field-label-required">*</span>
                </div>
                <textarea
                  placeholder="Paste the full job description here — requirements, responsibilities, tech stack, etc."
                  value={jobDescription}
                  style={{ minHeight: 180 }}
                  onChange={(e) => setJobDescription(e.target.value)}
                />
                <div className={`char-count ${jobDescription.length > 4000 ? "char-count--warn" : ""}`}>
                  {jobDescription.length} / 5000
                </div>
              </div>

              <div className="btn-row">
                <button className="submit-btn submit-btn--ghost" onClick={handleBack}>
                  <div className="submit-btn-inner">← Back</div>
                </button>
                <button className="submit-btn" onClick={handleNext} disabled={isLoading}>
                  <div className="btn-shimmer" />
                  <div className="submit-btn-inner">Continue →</div>
                </button>
              </div>
            </div>
          )}

          {/* ── Step 2 — Self Description ─────────────────── */}
          {step === 2 && (
            <div className="step-panel">
              <div className="section-header">
                <div className="section-icon">✍️</div>
                <div>
                  <div className="section-title">About You</div>
                  <div className="section-desc">Tell us about your background &amp; goals</div>
                </div>
              </div>

              <div className="field">
                <div className="field-label">
                  Self Description
                  <span className="field-label-required">*</span>
                </div>
                <textarea
                  placeholder="Briefly describe yourself — your years of experience, key strengths, what you're looking for, and anything specific you want the interview prep to focus on..."
                  value={selfDescription}
                  style={{ minHeight: 160 }}
                  onChange={(e) => setSelfDescription(e.target.value)}
                />
                <div
                  className={[
                    "char-count",
                    selfDescription.length > 1100 ? "char-count--over" :
                    selfDescription.length > 900  ? "char-count--warn"  : "",
                  ].join(" ")}
                >
                  {selfDescription.length} / 1200
                </div>
              </div>

              {/* What you'll receive */}
              <div className="what-you-get">
                <div className="what-you-get-title">What you'll receive</div>
                <div className="what-you-get-grid">
                  {WHAT_YOU_GET.map((item) => (
                    <div className="what-you-get-item" key={item}>
                      <span className="dot">✦</span> {item}
                    </div>
                  ))}
                </div>
              </div>

              <div className="btn-row">
                <button className="submit-btn submit-btn--ghost" onClick={handleBack}>
                  <div className="submit-btn-inner">← Back</div>
                </button>
                <button
                  className="submit-btn"
                  onClick={handleSubmit}
                  disabled={selfDescription.trim().length <= 20 || isLoading}
                >
                  <div className="btn-shimmer" />
                  <div className="submit-btn-inner">
                    {isLoading ? "Analyzing…" : "Generate My Interview Prep ✦"}
                  </div>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Stats */}
        <div className="stats-row">
          {STATS.map(({ num, label }) => (
            <div className="stat" key={label}>
              <div className="stat-num">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </main>

      {/* Toast */}
      {toast && <div className="toast">{toast}</div>}
    </div>
  );
}
