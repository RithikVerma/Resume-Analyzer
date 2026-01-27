import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
import InputForm from './components/InputForm';
import LoadingOverlay from './components/LoadingOverlay';
import ResultsDashboard from './components/ResultsDashboard';
import { analyzeResume } from './utils/api';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [showLanding, setShowLanding] = useState(true);
  const [showInput, setShowInput] = useState(false);

  const handleGetStarted = () => {
    setShowLanding(false);
    setShowInput(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAnalyze = async (resumeFile, jobDescription) => {
    setIsLoading(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const analysisResults = await analyzeResume(resumeFile, jobDescription);

      setResults(analysisResults);
      setShowInput(false);
      setIsLoading(false);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setIsLoading(false);
      alert('Error analyzing resume: ' + error.message);
    }
  };

  const handleAnalyzeAgain = () => {
    setResults(null);
    setShowLanding(false);
    setShowInput(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <LoadingOverlay isLoading={isLoading} />

      <Header
        onGetStarted={handleGetStarted}
        showLanding={showLanding}
      />

      <div className="minimal-container">
        {showLanding && <LandingPage onGetStarted={handleGetStarted} />}

        {showInput && <InputForm onAnalyze={handleAnalyze} />}

        {results && (
          <ResultsDashboard
            results={results}
            onAnalyzeAgain={handleAnalyzeAgain}
          />
        )}
      </div>

      {showLanding && <Footer />}
    </div>
  );
}

export default App;
