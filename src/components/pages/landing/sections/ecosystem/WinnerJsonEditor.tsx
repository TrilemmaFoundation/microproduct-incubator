import { memo } from "react";

interface WinnerInfo {
  tournament: string;
  university: string;
  program: string;
  region: string;
}

interface WinnerJsonEditorProps {
  info: WinnerInfo;
  className?: string;
}

const WinnerJsonEditor = memo(
  ({ info, className = "" }: WinnerJsonEditorProps) => {
    const handleCopy = () => {
      const jsonText = JSON.stringify(info, null, 2);
      navigator.clipboard.writeText(jsonText);
    };

    return (
      <div
        className={`w-full bg-black/40 rounded-lg border border-white/10 overflow-hidden ${className}`}
      >
        {/* Editor Chrome */}
        <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
          <div className="flex gap-1.5 grayscale opacity-50">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] uppercase tracking-wider text-white/40 font-mono">
              winner.json
            </span>
            <span className="px-1.5 py-0.5 rounded bg-brand-blue/10 text-brand-blue text-[9px] font-bold uppercase tracking-tighter">
              JSON
            </span>
          </div>
          <button
            type="button"
            onClick={handleCopy}
            className="p-1 hover:bg-white/10 rounded transition-colors group"
            title="Copy to clipboard"
          >
            <svg
              className="w-3.5 h-3.5 text-white/40 group-hover:text-white/80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
              focusable="false"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
              />
            </svg>
          </button>
        </div>

        {/* Editor Content */}
        <div className="py-3 font-mono text-[9px] sm:text-[11px] md:text-sm leading-[1.4] flex flex-col max-h-[300px] overflow-auto scrollbar-thin scrollbar-track-white/5 scrollbar-thumb-white/10">
          <div className="min-w-fit">
            {/* Line 1: Opening Brace */}
            <div className="flex items-start px-3 py-0 group hover:bg-white/5 transition-colors">
              <span className="w-8 shrink-0 text-white/10 text-right pr-3 select-none">
                1
              </span>
              <span className="text-white/20">{`{`}</span>
            </div>

            {/* Line 2: Tournament */}
            <div className="flex items-start px-3 py-0 group hover:bg-white/5 transition-colors">
              <span className="w-8 shrink-0 text-white/10 text-right pr-3 select-none">
                2
              </span>
              <div className="pl-4 grid grid-cols-[85px,1fr] sm:grid-cols-[110px,1fr] gap-x-1 flex-1 text-nowrap pr-6">
                <span className="text-brand-blue">
                  <span className="text-white/20">"</span>tournament
                  <span className="text-white/20">"</span>
                  <span className="text-white/20">:</span>
                </span>
                <span className="text-brand-orange">
                  <span className="text-white/20"> "</span>
                  {info.tournament}
                  <span className="text-white/20">"</span>
                  <span className="text-white/20">,</span>
                </span>
              </div>
            </div>

            {/* Line 3: University */}
            <div className="flex items-start px-3 py-0 group hover:bg-white/5 transition-colors">
              <span className="w-8 shrink-0 text-white/10 text-right pr-3 select-none">
                3
              </span>
              <div className="pl-4 grid grid-cols-[85px,1fr] sm:grid-cols-[110px,1fr] gap-x-1 flex-1 text-nowrap pr-6">
                <span className="text-brand-blue">
                  <span className="text-white/20">"</span>university
                  <span className="text-white/20">"</span>
                  <span className="text-white/20">:</span>
                </span>
                <span className="text-brand-orange">
                  <span className="text-white/20"> "</span>
                  {info.university}
                  <span className="text-white/20">"</span>
                  <span className="text-white/20">,</span>
                </span>
              </div>
            </div>

            {/* Line 4: Program */}
            <div className="flex items-start px-3 py-0 group hover:bg-white/5 transition-colors">
              <span className="w-8 shrink-0 text-white/10 text-right pr-3 select-none">
                4
              </span>
              <div className="pl-4 grid grid-cols-[85px,1fr] sm:grid-cols-[110px,1fr] gap-x-1 flex-1 text-nowrap pr-6">
                <span className="text-brand-blue">
                  <span className="text-brand-blue">
                    <span className="text-white/20">"</span>program
                    <span className="text-white/20">"</span>
                    <span className="text-white/20">:</span>
                  </span>
                </span>
                <span className="text-brand-orange">
                  <span className="text-white/20"> "</span>
                  {info.program}
                  <span className="text-white/20">"</span>
                  <span className="text-white/20">,</span>
                </span>
              </div>
            </div>

            {/* Line 5: Region */}
            <div className="flex items-start px-3 py-0 group hover:bg-white/5 transition-colors">
              <span className="w-8 shrink-0 text-white/10 text-right pr-3 select-none">
                5
              </span>
              <div className="pl-4 grid grid-cols-[85px,1fr] sm:grid-cols-[110px,1fr] gap-x-1 flex-1 text-nowrap pr-6">
                <span className="text-brand-blue">
                  <span className="text-white/20">"</span>region
                  <span className="text-white/20">"</span>
                  <span className="text-white/20">:</span>
                </span>
                <span className="text-brand-orange">
                  <span className="text-white/20"> "</span>
                  {info.region}
                  <span className="text-white/20">"</span>
                </span>
              </div>
            </div>

            {/* Line 6: Closing Brace */}
            <div className="flex items-start px-3 py-0 group hover:bg-white/5 transition-colors">
              <span className="w-8 shrink-0 text-white/10 text-right pr-3 select-none">
                6
              </span>
              <span className="text-white/20">{`}`}</span>
            </div>
          </div>
        </div>
      </div>
    );
  },
);

WinnerJsonEditor.displayName = "WinnerJsonEditor";

export default WinnerJsonEditor;
