import { useState, useEffect } from 'react';
import axios from 'axios';
import { Sparkles, History as HistoryIcon, Code2, Menu, X } from 'lucide-react';
import CodeInput from './components/CodeInput';
import ExplanationDisplay from './components/ExplanationDisplay';
import HistorySidebar from './components/HistorySidebar';

const API_URL = 'http://127.0.0.1:5000/api';

function App() {
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('javascript');
  const [explanation, setExplanation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const fetchHistory = async () => {
    try {
      const res = await axios.get(`${API_URL}/history`);
      setHistory(res.data);
    } catch (err) {
      console.error('Failed to fetch history:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleExplain = async () => {
    if (!code.trim()) return;
    
    setIsLoading(true);
    setExplanation(null);
    try {
      const res = await axios.post(`${API_URL}/explain`, { code, language });
      setExplanation(res.data);
      fetchHistory(); // Refresh history
    } catch (err) {
      console.error('Explanation error:', err);
      // Fallback pseudo error explanation for UI purposes
      setExplanation({
        error: true,
        eli5: "Sorry, I couldn't generate an explanation. Please try again or check if the backend is running."
      });
    } finally {
      setIsLoading(false);
    }
  };

  const loadFromHistory = (item) => {
    setCode(item.codeSnippet);
    setLanguage(item.language);
    setExplanation(item.explanation);
    setIsSidebarOpen(false);
  };

  return (
    <div className="min-h-screen flex bg-[#0f172a] overflow-hidden">
      {/* Sidebar Overlay for Mobile */}
      {isSidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed lg:static inset-y-0 left-0 z-50 w-80 bg-[#1e293b] border-r border-[#334155] transform transition-transform duration-300 ease-in-out ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-full flex flex-col">
          <div className="p-6 border-b border-[#334155] flex items-center justify-between">
            <div className="flex items-center space-x-3 text-indigo-400">
              <Sparkles className="w-6 h-6" />
              <h1 className="text-xl font-bold text-white tracking-wide">AI Explainer</h1>
            </div>
            <button className="lg:hidden text-gray-400 hover:text-white" onClick={() => setIsSidebarOpen(false)}>
              <X className="w-6 h-6" />
            </button>
          </div>
          <HistorySidebar history={history} onSelect={loadFromHistory} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative h-screen overflow-hidden">
        {/* Header */}
        <header className="h-20 shrink-0 border-b border-[#334155] bg-[#1e293b]/50 backdrop-blur-md flex items-center px-6 lg:px-12 z-10 sticky top-0">
          <button 
            className="lg:hidden mr-4 text-gray-400 hover:text-white transition-colors"
            onClick={() => setIsSidebarOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </button>
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Code2 className="w-6 h-6 text-indigo-400" />
            </div>
            <div>
              <h2 className="text-lg font-semibold text-white">Code Analysis Playground</h2>
              <p className="text-sm text-gray-400 hidden sm:block">Paste your code and let AI break it down for you.</p>
            </div>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-12">
          <div className="max-w-6xl mx-auto space-y-8 pb-20">
            <div className="glass-panel p-6 shadow-[0_0_40px_-15px_rgba(99,102,241,0.2)]">
              <CodeInput 
                code={code} 
                setCode={setCode} 
                language={language} 
                setLanguage={setLanguage}
                onAnalyze={handleExplain}
                isLoading={isLoading}
              />
            </div>
            
            {(explanation || isLoading) && (
              <div className="glass-panel p-6 shadow-[0_0_50px_-20px_rgba(99,102,241,0.3)] border-indigo-500/20">
                <ExplanationDisplay explanation={explanation} isLoading={isLoading} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
