import React, { useState } from 'react';
import {
  GitBranch,
  RefreshCw,
  AlertTriangle,
  CheckCircle2,
  Cpu,
  Trash2,
  Terminal,
  Sparkles,
  Layers,
  Globe,
  HardDrive
} from 'lucide-react';
import { PlatformTarget } from '../../types/droz';

interface StatusBarProps {
  activePlatform: PlatformTarget;
  isBottomDrawerOpen: boolean;
  onToggleBottomDrawer: () => void;
  showAiSidebar: boolean;
  onToggleAiSidebar: () => void;
  onOpenGit: () => void;
  onOpenProblems: () => void;
  onTriggerGC?: () => void;
  activeFileName?: string;
  activeLanguage?: string;
}

export function StatusBar({
  activePlatform,
  isBottomDrawerOpen,
  onToggleBottomDrawer,
  showAiSidebar,
  onToggleAiSidebar,
  onOpenGit,
  onOpenProblems,
  onTriggerGC,
  activeFileName,
  activeLanguage = 'TypeScript'
}: StatusBarProps) {
  const [heapMemory, setHeapMemory] = useState<number>(384);
  const [isGCing, setIsGCing] = useState<boolean>(false);

  const handleGC = () => {
    setIsGCing(true);
    setTimeout(() => {
      setHeapMemory(prev => Math.max(180, Math.floor(prev * 0.65)));
      setIsGCing(false);
      if (onTriggerGC) onTriggerGC();
    }, 400);
  };

  return (
    <footer className="h-6 bg-[#2B2D30] border-t border-[#393B40] flex items-center justify-between px-2 text-[11px] font-mono text-[#BCBEC4] select-none shrink-0 z-30">
      {/* Left Status Items */}
      <div className="flex items-center space-x-3">
        {/* Git Branch */}
        <button
          onClick={onOpenGit}
          className="flex items-center space-x-1 hover:text-[#DFE1E5] hover:bg-[#393B40]/50 px-1.5 py-0.5 rounded transition"
          title="Git Branch: main (Click to open Git Manager)"
        >
          <GitBranch size={11} className="text-[#3574F0]" />
          <span className="font-semibold text-[#DFE1E5]">main</span>
          <span className="text-[#3DDC84] text-[9px]">✓</span>
        </button>

        {/* Problems Counter */}
        <button
          onClick={onOpenProblems}
          className="flex items-center space-x-1 hover:text-[#DFE1E5] hover:bg-[#393B40]/50 px-1.5 py-0.5 rounded transition"
          title="Code Analysis: 0 Errors, 2 Warnings"
        >
          <AlertTriangle size={11} className="text-[#e09f3e]" />
          <span>0 errors, 2 warnings</span>
        </button>

        <div className="w-[1px] h-3 bg-[#393B40]" />

        {/* Daemon State */}
        <div className="hidden sm:flex items-center space-x-1 text-[#707278]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#3DDC84]" />
          <span>Droz Daemon: Ready</span>
        </div>
      </div>

      {/* Right Status Items */}
      <div className="flex items-center space-x-3">
        {/* Active File & Cursor position */}
        {activeFileName && (
          <div className="hidden md:flex items-center space-x-2 text-[#707278]">
            <span>Ln 24, Col 18</span>
            <span>•</span>
            <span>Spaces: 2</span>
            <span>•</span>
            <span>UTF-8</span>
            <span>•</span>
            <span className="text-[#DFE1E5]">{activeLanguage}</span>
          </div>
        )}

        <div className="w-[1px] h-3 bg-[#393B40]" />

        {/* Platform Target */}
        <div className="flex items-center space-x-1 px-1.5 py-0.5 bg-[#1E1F22] rounded border border-[#393B40] text-[10px] text-[#3DDC84] font-semibold uppercase">
          <Layers size={10} />
          <span>{activePlatform}</span>
        </div>

        {/* JVM / V8 Heap Memory Indicator with GC */}
        <button
          onClick={handleGC}
          disabled={isGCing}
          className="flex items-center space-x-1 hover:text-[#DFE1E5] hover:bg-[#393B40]/50 px-1.5 py-0.5 rounded transition"
          title="Memory Heap Usage (Click to run Garbage Collection)"
        >
          <Cpu size={11} className={isGCing ? 'animate-spin text-[#3574F0]' : 'text-[#707278]'} />
          <span>{heapMemory}M / 2048M</span>
          <Trash2 size={10} className="text-[#707278] hover:text-[#fa5252]" />
        </button>

        <div className="w-[1px] h-3 bg-[#393B40]" />

        {/* Bottom Drawer Toggle */}
        <button
          onClick={onToggleBottomDrawer}
          className={`flex items-center space-x-1 px-1.5 py-0.5 rounded transition ${
            isBottomDrawerOpen ? 'bg-[#3574F0]/20 text-[#3574F0] font-semibold' : 'text-[#707278] hover:text-[#DFE1E5]'
          }`}
          title="Toggle Bottom Tool Window (Terminal & Logcat)"
        >
          <Terminal size={11} />
          <span>Terminal</span>
        </button>

        {/* Gemini AI Status */}
        <button
          onClick={onToggleAiSidebar}
          className={`flex items-center space-x-1 px-1.5 py-0.5 rounded transition ${
            showAiSidebar ? 'bg-[#3574F0]/20 text-[#3574F0] font-semibold' : 'text-[#707278] hover:text-[#DFE1E5]'
          }`}
          title="Gemini in Droz Studio"
        >
          <Sparkles size={11} className="text-[#3574F0]" />
          <span>Gemini AI</span>
        </button>
      </div>
    </footer>
  );
}
