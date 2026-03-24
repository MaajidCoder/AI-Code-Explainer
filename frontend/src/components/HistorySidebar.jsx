import { Clock, Code as CodeIcon, ChevronRight } from 'lucide-react';

export default function HistorySidebar({ history, onSelect }) {
  if (!history || history.length === 0) {
    return (
      <div className="flex-1 p-6 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-[#0f172a] shadow-inner flex items-center justify-center mb-5 border border-[#334155]">
          <Clock className="w-6 h-6 text-gray-500" />
        </div>
        <p className="text-gray-300 font-medium text-sm">No analysis history yet.</p>
        <p className="text-gray-500 text-xs mt-2 leading-relaxed max-w-[200px]">Your past code explanations will be saved here for easy access.</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
      <h3 className="text-[11px] font-bold text-gray-400 uppercase tracking-widest px-4 pt-4 pb-3 flex items-center">
         <Clock className="w-3.5 h-3.5 mr-2 opacity-70" />
         Recent Analysis
      </h3>
      {history.map((item) => (
        <button
          key={item._id}
          onClick={() => onSelect(item)}
          className="w-full text-left p-4 rounded-xl hover:bg-[#334155]/60 transition-all group flex flex-col items-start border border-transparent hover:border-[#334155] relative overflow-hidden"
        >
          <div className="absolute inset-y-0 left-0 w-1 bg-indigo-500 scale-y-0 group-hover:scale-y-100 transition-transform origin-center"></div>
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-[10px] font-bold text-indigo-300 bg-indigo-500/20 px-2 py-1 rounded shadow-sm uppercase tracking-wider">
              {item.language}
            </span>
            <span className="text-[11px] text-gray-500 font-medium">
              {new Date(item.createdAt).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
            </span>
          </div>
          <p className="text-[13px] text-gray-300 font-mono line-clamp-2 mt-1 opacity-70 group-hover:opacity-100 transition-opacity leading-relaxed">
            {item.codeSnippet.split('\n').filter(l => l.trim()).slice(0, 2).map((l, i) => (
              <span key={i} className="block truncate">{l}</span>
            ))}
          </p>
        </button>
      ))}
    </div>
  );
}
