# AI Resume Analyzer - Full Stack

Modern AI-powered resume analyzer built with React, Tailwind CSS, and Node.js. Optimized for Vercel deployment with serverless functions.

## 🛠️ Tech Stack

**Frontend:**
- React 19 + Vite
- Tailwind CSS (Utility-first styling)
- Axios (API requests)
- Lucide React (Icons)

**Backend:**
- Node.js / Express (for local development)
- Vercel Serverless Functions (for production)
- PDF-Parse / Mammoth (File parsing)

## 📂 Project Structure

```
AI-Resume-Analyzer/
├── api/                    # ✨ Vercel Serverless Functions (Production API)
│   ├── analyze.js         # Analysis entry point
│   └── utils/             # Analysis logic & utilities
├── client/                 # 💻 React Frontend
│   ├── src/
│   │   ├── components/    # UI Components (shadcn/ui style)
│   │   ├── utils/         # API & logic helpers
│   │   └── App.jsx        # Main application
│   └── package.json
├── server/                 # ⚙️ Node.js Backend (Local Dev Server)
│   ├── controllers/       # Request handlers
│   ├── server.js          # Express entry point
│   └── package.json
├── vercel.json             # Vercel deployment configuration
└── package.json            # Root configuration & scripts
```

## 💻 Local Development

1. **Install Dependencies**
   ```bash
   # In root directory
   npm install
   # In client directory
   cd client && npm install
   # In server directory
   cd ../server && npm install
   ```

2. **Run Local Servers** (Open two terminals)

   **Terminal 1 (Backend):**
   ```bash
   cd server
   npm run dev
   ```

   **Terminal 2 (Frontend):**
   ```bash
   cd client
   npm run dev
   ```

## ✨ Key Features

- **File Support**: Analyze PDF, DOC, and DOCX resumes
- **Real-time Analysis**: Instant feedback on resume-job alignment
- **Skill Extraction**: Automatic identification of technical skills
- **Match Scoring**: Multi-factor scoring algorithm
- **Experience Detection**: Seniority level estimation
- **Project Recommendations**: Targeted suggestions based on skill gaps
- **Modern UI**: Dark-themed, responsive design with glassmorphism

## 📝 License

MIT

## 👨‍💻 Created By

Built with ❤️ by Aniket Verma
