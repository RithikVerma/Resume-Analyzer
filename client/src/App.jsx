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

  const handleAnalyze = async (resumeData, jobDescription, inputMode) => {
    setIsLoading(true);

    try {
      // Simulate delay for better UX (like original app)
      await new Promise(resolve => setTimeout(resolve, 2000));

      const analysisResults = await analyzeResume(resumeData, jobDescription, inputMode);

      setResults(analysisResults);
      setShowInput(false);
      setIsLoading(false);

      // Scroll to top to show results
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      setIsLoading(false);
      alert('Error: ' + error.message);
    }
  };

  const handleAnalyzeAgain = () => {
    setResults(null);
    setShowInput(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      {/* Background Gradient */}
      <div className="gradient-bg"></div>

      {/* Loading Overlay */}
      <LoadingOverlay isLoading={isLoading} />

      {/* Main Container */}
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        <Header />

        {showInput && <InputForm onAnalyze={handleAnalyze} />}

        {results && (
          <ResultsDashboard
            results={results}
            onAnalyzeAgain={handleAnalyzeAgain}
          />
        )}
      </div>
    </>
  );
}

export default App;
