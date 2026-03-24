import { useState } from 'react';
import { AlignLeft, Zap, ShieldAlert, Baby, Loader2, AlertTriangle } from 'lucide-react';

const TABS = [
  { id: 'lineByLine', label: 'Line-by-Line', icon: AlignLeft },
  { id: 'complexity', label: 'Complexity', icon: Zap },
  { id: 'edgeCases', label: 'Edge Cases', icon: ShieldAlert },
  { id: 'eli5', label: 'ELI5', icon: Baby },
];

export default function ExplanationDisplay({ explanation, isLoading }) {
  const [activeTab, setActiveTab] = useState('lineByLine');

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 animate-pulse">
        <div className="relative">
          <div className="absolute inset-0 bg-indigo-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
          <Loader2 className="w-12 h-12 text-indigo-400 animate-spin relative z-10" />
        </div>
        <p className="mt-6 text-indigo-300 font-medium tracking-wide">Analyzing your code with AI...</p>
      </div>
    );
  }

  if (!explanation) return null;

  if (explanation.error) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-red-400">
        <AlertTriangle className="w-12 h-12 mb-4 opacity-80" />
        <p className="text-center max-w-md">{explanation.eli5}</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full animate-in fade-in duration-500 slide-in-from-bottom-4">
      <div className="flex space-x-1 border-b border-[#334155] mb-6 overflow-x-auto pb-px custom-scrollbar">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center space-x-2 px-5 py-3 text-sm font-medium transition-all whitespace-nowrap
                ${isActive 
                  ? 'text-indigo-400 border-b-2 border-indigo-400 bg-indigo-500/10 rounded-t-lg shadow-[inset_0_2px_10px_rgba(99,102,241,0.05)]' 
                  : 'text-gray-400 hover:text-gray-200 hover:bg-white/5 rounded-t-lg border-b-2 border-transparent'
                }
              `}
            >
              <Icon className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      <div className="flex-1 pr-2 ai-explanation">
        {activeTab === 'lineByLine' && explanation.lineByLine && (
          <div className="space-y-4">
            {explanation.lineByLine.map((item, index) => (
              <div key={index} className="bg-[#0f172a] border border-[#334155] rounded-xl p-5 transition-all hover:border-indigo-500/50 hover:shadow-[0_4px_20px_-10px_rgba(99,102,241,0.3)] group">
                <div className="font-mono text-xs font-semibold text-indigo-300 bg-indigo-500/10 inline-block px-2.5 py-1 rounded-md mb-3 border border-indigo-500/20 shadow-sm">
                  Lines {item.line}
                </div>
                <p className="text-gray-300 text-sm text-[15px] leading-relaxed group-hover:text-gray-200 transition-colors">{item.explanation}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'complexity' && explanation.complexity && (
          <div className="grid sm:grid-cols-2 gap-5">
            <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-[#334155] rounded-xl p-7 relative overflow-hidden group hover:border-blue-500/50 transition-all">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-500/10 rounded-full blur-3xl group-hover:bg-blue-500/20 transition-all duration-700"></div>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center">
                <Zap className="w-4 h-4 mr-2 text-blue-400" />
                Time Complexity
              </h3>
              <div className="text-3xl font-mono text-blue-300 mb-4 tracking-tight drop-shadow-[0_0_10px_rgba(59,130,246,0.5)]">
                {explanation.complexity.time.split(' ')[0]}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{explanation.complexity.time}</p>
            </div>
            
            <div className="bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-[#334155] rounded-xl p-7 relative overflow-hidden group hover:border-purple-500/50 transition-all">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl group-hover:bg-purple-500/20 transition-all duration-700"></div>
              <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3 flex items-center">
                <AlignLeft className="w-4 h-4 mr-2 text-purple-400" />
                Space Complexity
              </h3>
              <div className="text-3xl font-mono text-purple-300 mb-4 tracking-tight drop-shadow-[0_0_10px_rgba(168,85,247,0.5)]">
                {explanation.complexity.space.split(' ')[0]}
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">{explanation.complexity.space}</p>
            </div>
          </div>
        )}

        {activeTab === 'edgeCases' && explanation.edgeCases && (
          <div className="bg-[#0f172a] border border-[#334155] rounded-xl p-7 relative overflow-hidden">
             <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-amber-500/0 via-amber-500/50 to-amber-500/0 opacity-50"></div>
            <h3 className="text-lg font-semibold text-amber-300 mb-5 flex items-center">
              <ShieldAlert className="w-6 h-6 mr-3 text-amber-400" />
              Potential Pitfalls & Edge Cases
            </h3>
            <ul className="space-y-4">
              {explanation.edgeCases.map((edgeCase, index) => (
                <li key={index} className="flex items-start text-gray-300 text-[15px] bg-[#1e293b]/50 p-4 rounded-lg border border-white/5 hover:border-amber-500/20 transition-colors">
                  <span className="flex-shrink-0 w-6 h-6 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center text-xs font-bold mr-4 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="leading-relaxed pt-0.5">{edgeCase}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {activeTab === 'eli5' && explanation.eli5 && (
          <div className="bg-gradient-to-br from-indigo-500/10 via-purple-500/5 to-transparent border border-indigo-500/20 rounded-xl p-8 lg:p-10 relative overflow-hidden shadow-inner">
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <Baby className="w-16 h-16 text-indigo-400/30 absolute top-8 right-8 mix-blend-screen" />
            <h3 className="text-2xl font-semibold text-white mb-6 tracking-tight flex items-center">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-purple-400">
                In Simple Terms...
              </span>
            </h3>
            <p className="text-[17px] text-indigo-100/90 leading-relaxed max-w-3xl relative z-10 font-medium drop-shadow-sm">
              {explanation.eli5}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
