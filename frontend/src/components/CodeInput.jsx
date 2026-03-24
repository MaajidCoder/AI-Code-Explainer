import { Code, Send } from 'lucide-react';

const LANGUAGES = [
  { id: 'javascript', label: 'JavaScript' },
  { id: 'python', label: 'Python' },
  { id: 'java', label: 'Java' },
  { id: 'cpp', label: 'C++' },
  { id: 'typescript', label: 'TypeScript' },
  { id: 'go', label: 'Go' },
  { id: 'rust', label: 'Rust' },
  { id: 'html', label: 'HTML/CSS' },
];

export default function CodeInput({ code, setCode, language, setLanguage, onAnalyze, isLoading }) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <label className="flex items-center space-x-2 text-sm font-medium text-gray-300">
          <Code className="w-4 h-4 text-indigo-400" />
          <span>Source Code</span>
        </label>
        <div className="flex items-center space-x-3">
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="bg-[#0f172a] border border-[#334155] text-white text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:w-auto p-2.5 outline-none transition-all cursor-pointer"
          >
            {LANGUAGES.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.label}</option>
            ))}
          </select>
          <button
            onClick={onAnalyze}
            disabled={isLoading || !code.trim()}
            className={`
              flex items-center justify-center space-x-2 px-6 py-2.5 rounded-lg font-medium text-white transition-all w-full sm:w-auto
              ${isLoading || !code.trim() 
                ? 'bg-[#334155] cursor-not-allowed text-gray-400' 
                : 'bg-indigo-600 hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.4)] active:scale-95'
              }
            `}
          >
            <span>{isLoading ? 'Analyzing...' : 'Explain Code'}</span>
            {!isLoading && <Send className="w-4 h-4 ml-1" />}
          </button>
        </div>
      </div>
      
      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder={`Paste your ${LANGUAGES.find(l => l.id === language)?.label || 'code'} here...`}
          className="relative w-full h-80 bg-[#0b1120] text-gray-100 font-mono text-sm p-6 rounded-xl border border-[#334155] focus:border-indigo-500 outline-none resize-y shadow-inner leading-relaxed"
          spellCheck="false"
        />
      </div>
    </div>
  );
}
