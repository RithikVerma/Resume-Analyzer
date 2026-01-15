# AI Resume Analyzer - React + Tailwind + Node.js

Modern full-stack AI Resume Analyzer built with React, Tailwind CSS, and Node.js/Express.

## Tech Stack

**Frontend:**
- React 18
- Vite (Fast build tool)
- Tailwind CSS (Utility-first styling)
- Axios (API requests)

**Backend:**
- Node.js
- Express (Web framework)
- CORS (Cross-origin support)

## Project Structure

```
AI-Resume-Analyzer/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── utils/         # API utilities
│   │   ├── App.jsx        # Main app component
│   │   └── index.css      # Tailwind styles
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── controllers/       # Request handlers
│   ├── routes/            # API routes
│   ├── utils/             # Analysis logic
│   ├── server.js          # Express server
│   └── package.json
│
├── index.html             # Vanilla version (legacy)
├── script.js              # Vanilla version (legacy)
└── styles.css             # Vanilla version (legacy)
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm

### Installation

1. **Install Frontend Dependencies**
```bash
cd client
npm install
```

2. **Install Backend Dependencies**
```bash
cd server
npm install
```

### Running the Application

You need to run both the frontend and backend servers:

**Terminal 1 - Start Backend Server:**
```bash
cd server
npm run dev
```
Backend runs on: http://localhost:5000

**Terminal 2 - Start Frontend Dev Server:**
```bash
cd client
npm run dev
```
Frontend runs on: http://localhost:5173

### Open your browser and navigate to:
```
http://localhost:5173
```

## Features

-  **Modern UI**: Premium dark theme with glassmorphism effects
-  **Real-time Analysis**: Backend API processes resumes intelligently
-  **Skill Extraction**: Identifies 100+ technical skills
-  **Match Scoring**: Realistic algorithm with multi-factor weighting
-  **Experience Detection**: Auto-detects candidate seniority level
-  **Gap Analysis**: Highlights missing skills
-  **Smart Recommendations**: Generates targeted project suggestions
-  **Responsive Design**: Works on all devices
-  **Smooth Animations**: Professional micro-interactions

## API Endpoints

### POST /api/analyze
Analyzes a resume against a job description.

**Request Body:**
```json
{
  "resumeText": "string",
  "jobDescription": "string"
}
```

**Response:**
```json
{
  "candidate_level": "Mid",
  "match_score": 75,
  "matched_skills": ["React", "Node.js", "Python"],
  "missing_skills": ["Kubernetes", "AWS"],
  "resume_strengths": ["..."],
  "resume_improvements": ["..."],
  "project_recommendations": [{...}],
  "overall_summary": "..."
}
```

## Customization

### Tailwind Configuration
Edit `client/tailwind.config.js` to customize colors, fonts, and theme.

### API URL
Update `client/src/utils/api.js` to change backend URL for production deployment.

## Building for Production

### Frontend
```bash
cd client
npm run build
```
Output: `client/dist/` - Deploy to any static host (Netlify, Vercel, etc.)

### Backend
```bash
cd server
npm start
```
Deploy to Node.js hosting (Heroku, Railway, Render, etc.)

## Tech Stack Benefits

This modern stack provides:
- Component-based architecture for better code organization
- Utility-first styling with Tailwind CSS
- Type-safe API communication
- Fast development with Vite HMR
- Backend API separation (ready for AI integration)
- Production-ready deployment structure

## Deployment

### Frontend (Static Hosting)
- Netlify
- Vercel
- GitHub Pages
- Cloudflare Pages

### Backend (Node.js Hosting)
- Heroku
- Railway
- Render
- AWS/GCP/Azure

## License

MIT

## Author

Built with ❤️ using React + Tailwind CSS + Node.js
