import { useState } from 'react';
import Header from './components/Header';
import InputForm from './components/InputForm';
import LoadingOverlay from './components/LoadingOverlay';
import ResultsDashboard from './components/ResultsDashboard';
import { analyzeResume } from './utils/api';
import './index.css';

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [showInput, setShowInput] = useState(true);

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
    setShowInput(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <LoadingOverlay isLoading={isLoading} />

      <div className="minimal-container">
        <Header />

        {showInput && <InputForm onAnalyze={handleAnalyze} />}

        {results && (
          <ResultsDashboard
            results={results}
            onAnalyzeAgain={handleAnalyzeAgain}
          />
        )}
      </div>
    </div>
  );
}

export default App;
