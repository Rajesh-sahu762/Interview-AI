# Interview-AI MERN Project - Setup Guide

## 🚀 Quick Start

### Prerequisites
- Node.js (v18+)
- MongoDB (local or cloud)
- Google Gemini API Key

### 1. Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../Frontend
npm install
```

### 2. Environment Setup

Create `.env` file in backend folder:
```env
MONGODB_URI=mongodb://localhost:27017/interview-ai
JWT_SECRET=your-jwt-secret-key
GEMINI_API_KEY=your-gemini-api-key
PORT=5000
```

### 3. Start the Application

```bash
# Terminal 1: Backend
cd backend
npm run dev

# Terminal 2: Frontend
cd Frontend
npm run dev
```

### 4. Access the App
- Frontend: http://localhost:5173
- Backend: http://localhost:5000

## 🔧 Features Fixed & Working

### ✅ Authentication
- User registration/login
- JWT token-based auth
- Protected routes
- Logout functionality

### ✅ File Upload & Processing
- PDF, DOCX, TXT file support
- 5MB file size limit
- Automatic text extraction
- Error handling for unsupported formats

### ✅ Interview Report Generation
- AI-powered report generation using Google Gemini
- Match score calculation
- Technical & behavioral questions
- Skill gap analysis
- 7-day preparation plan

### ✅ Dynamic Interview Dashboard
- Real-time data display
- Tabbed interface (Technical, Behavioral, Skills, Performance)
- Interactive question navigation
- Match score visualization

### ✅ Error Handling
- Global Axios interceptors
- Network timeout handling
- User-friendly error messages
- Form validation

## 📁 Project Structure

```
Interview-AI/
├── backend/
│   ├── Controllers/          # API controllers
│   ├── Models/              # MongoDB schemas
│   ├── Routes/              # API routes
│   ├── Services/            # Business logic & AI
│   ├── Middleware/          # Auth & file upload
│   └── Config/              # Database config
├── Frontend/
│   ├── src/
│   │   ├── Features/
│   │   │   ├── Auth/        # Authentication
│   │   │   └── Interview/   # Interview features
│   │   ├── Services/        # API configurations
│   │   └── Components/      # Reusable components
```

## 🔄 User Flow

1. **Register/Login** → User authentication
2. **Home Page** → Upload resume, enter job details & self-description
3. **Generate Report** → AI processes data and creates interview report
4. **Interview Dashboard** → View personalized questions, skills analysis, preparation plan

## 🛠️ Tech Stack

- **Frontend**: React, React Router, Axios, SCSS
- **Backend**: Node.js, Express.js, MongoDB, JWT
- **AI**: Google Gemini API
- **File Processing**: PDF-parse, Mammoth (DOCX)

## 🚨 Important Notes

- Ensure MongoDB is running before starting backend
- Get Google Gemini API key from Google AI Studio
- Frontend runs on port 5173, backend on 5000
- All file uploads are processed in memory (no disk storage)
- JWT tokens are stored in httpOnly cookies for security