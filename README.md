# AI Resume Analyzer

An intelligent resume analysis tool that matches resumes against job descriptions using advanced skill extraction and scoring algorithms. Built with modern web technologies for seamless user experience.

##  Features

- **Multiple File Format Support**: Upload resumes in PDF, DOC, or DOCX formats
- **Text Input Option**: Paste resume text directly for quick analysis
- **Smart Skill Matching**: Automatically extracts and matches technical skills
- **Comprehensive Scoring**: Multi-factor algorithm considering skills, experience, and projects
- **Experience Level Detection**: Identifies candidate seniority (Fresher, Junior, Mid, Senior)
- **Personalized Recommendations**: 
  - Actionable improvement suggestions
  - Project ideas based on skill gaps
  - Resume optimization tips
- **Modern UI**: Clean, minimal design with responsive layouts
- **Real-time Analysis**: Instant feedback with smooth loading animations

## Tech Stack

### Frontend
- **React 19** with Vite for fast development
- **Tailwind CSS v4** for modern styling
- **shadcn/ui** components for polished UI
- **Axios** for API communication
- **Lucide React** for icons

### Backend
- **Node.js / Express** server
- **Multer** for file uploads
- **pdf-parse v1.1.1** for PDF text extraction
- **mammoth** for DOC/DOCX parsing
- Custom skill extraction and analysis algorithms

### Deployment
- **Vercel** for hosting and serverless functions
- Environment-based configuration for dev/prod

## Project Structure

```
AI-Resume-Analyzer/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # UI Components
│   │   │   ├── ui/        # Reusable UI elements (shadcn/ui style)
│   │   │   ├── Header.jsx
│   │   │   ├── InputForm.jsx
│   │   │   ├── ResultsDashboard.jsx
│   │   │   └── ...
│   │   ├── utils/         # API helpers
│   │   └── App.jsx        # Main application
│   └── package.json
│
├── server/                 # Node.js Backend
│   ├── controllers/       # Request handlers
│   ├── middleware/        # File upload middleware
│   ├── routes/            # API routes
│   ├── utils/             # Analysis algorithms
│   │   ├── skillExtractor.js
│   │   ├── scoreCalculator.js
│   │   ├── levelDetector.js
│   │   ├── recommendationEngine.js
│   │   └── fileParser.js
│   └── server.js          # Express entry point
│
├── api/                    # Vercel Serverless Functions
│   └── analyze.js         # Production API endpoint
│
├── vercel.json            # Deployment configuration
└── README.md
```

## Getting Started

### Prerequisites
- Node.js v18+ installed
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd AI-Resume-Analyzer
   ```

2. **Install server dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install client dependencies**
   ```bash
   cd ../client
   npm install
   ```

### Running Locally

You'll need **two terminal windows** to run both servers:

**Terminal 1 - Backend Server:**
```bash
cd server
npm run dev
```
Server runs on http://localhost:5000

**Terminal 2 - Frontend Client:**
```bash
cd client
npm run dev
```
Client runs on http://localhost:5173

### Environment Variables

Create a `.env` file in the `server` directory:
```env
PORT=5000
```

For production deployment, configure:
```env
VITE_API_URL=https://your-domain.vercel.app/api
```

## How to Use

1. **Open the application** at http://localhost:5173
2. **Choose input method**:
   - Upload a resume file (PDF/DOC/DOCX)
   - Or paste resume text directly
3. **Enter the job description** you want to match against
4. **Click "Analyze Resume"** and wait for results
5. **Review the analysis**:
   - Overall match score
   - Matched vs missing skills
   - Candidate experience level
   - Strengths and improvement areas
   - Project recommendations

## Analysis Algorithm

The analyzer uses multiple factors to calculate match scores:

- **Skill Matching (70%)**: Technical skills found in both resume and job description
- **Experience Indicators (15%)**: Keywords like "developed", "led", "managed"
- **Project Mentions (10%)**: Evidence of hands-on work
- **Education (5%)**: Degree and university mentions

Experience levels are detected through:
- Years of experience patterns
- Seniority keywords (Senior, Lead, Junior, etc.)
- Resume content length and complexity

##  Troubleshooting

### Port Already in Use
If you see `EADDRINUSE` error:
```bash
# Windows
netstat -ano | findstr :5000
taskkill /F /PID <PID>

# Linux/Mac
lsof -ti:5000 | xargs kill -9
```

### PDF Parsing Issues
The project uses `pdf-parse@1.1.1` for stability. If you encounter issues:
- Ensure the PDF is not encrypted
- Try re-saving the PDF or using a different file

## Deployment

### Deploy to Vercel

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Deploy**
   ```bash
   vercel
   ```

3. **Configure environment variables** in Vercel dashboard

The `vercel.json` configuration handles:
- Client static file serving
- API serverless functions
- Proper routing and rewrites

## API Endpoints

### POST `/api/analyze`

Analyzes a resume against a job description.

**Request:**
- `Content-Type: multipart/form-data` (for file uploads)
  - `resume`: File (PDF/DOC/DOCX)
  - `jobDescription`: String
- `Content-Type: application/json` (for text input)
  - `resumeText`: String
  - `jobDescription`: String

**Response:**
```json
{
  "candidate_level": "Mid",
  "match_score": 75,
  "matched_skills": ["React", "Node.js", "MongoDB"],
  "missing_skills": ["AWS", "Docker"],
  "resume_strengths": ["Strong technical skill set...", "..."],
  "resume_improvements": ["Add quantifiable metrics...", "..."],
  "project_recommendations": [
    {
      "title": "Project Name",
      "description": "...",
      "skills_covered": ["skill1", "skill2"]
    }
  ],
  "overall_summary": "Good candidate match (75%)..."
}
```

## Contributing

Contributions are welcome! Feel free to:
- Report bugs
- Suggest new features
- Submit pull requests

## License

This project is licensed under the MIT License.

## Author

**Built with ❤️ by Rithik Verma**
