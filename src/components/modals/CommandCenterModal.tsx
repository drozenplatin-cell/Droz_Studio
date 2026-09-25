import React, { useState } from 'react';
import {
  Command,
  Search,
  Hammer,
  CheckCircle2,
  ShieldCheck,
  Bug,
  FileCode,
  Globe,
  Database,
  ArrowRight,
  X,
  Sparkles
} from 'lucide-react';

interface CommandCenterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAction: (actionKey: string) => void;
}

export function CommandCenterModal({ isOpen, onClose, onSelectAction }: CommandCenterModalProps) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const COMMANDS = [
    { key: 'build-all', label: 'Build Project for all targets (Gradle / MSBuild)', category: 'Build', icon: Hammer },
    { key: 'run-tests', label: 'Run all 124 tests across unit, integration, and UI', category: 'Run', icon: CheckCircle2 },
    { key: 'find-security', label: 'Inspect security vulnerabilities & secrets', category: 'Code', icon: ShieldCheck },
    { key: 'explain-error', label: 'Explain current exception (NullPointerException)', category: 'Debug', icon: Bug },
    { key: 'api-docs', label: 'Generate OpenAPI 3.1 contract specification', category: 'Tools', icon: Globe },
    { key: 'open-extensions', label: 'Open Extensions Marketplace (VS Code & JetBrains plugins)', category: 'Marketplace', icon: Sparkles },
    { key: 'open-devices', label: 'Launch Device Manager & Android Virtual Device (AVD)', category: 'Devices', icon: FileCode },
    { key: 'optimize-db', label: 'Run SQL query optimization and schema verification', category: 'Database', icon: Database },
    { key: 'open-visual-ui', label: 'Open Visual UI Layout Inspector & Device Preview', category: 'View', icon: FileCode },
    { key: 'open-architecture', label: 'Explore the 27 Technical Architecture Pillars (Section 38)', category: 'Help', icon: Sparkles }
  ];

  const filtered = COMMANDS.filter(c =>
    c.label.toLowerCase().includes(query.toLowerCase()) ||
    c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-24 select-none">
      <div className="w-full max-w-xl bg-[#2B2D30] border border-[#393B40] rounded-lg shadow-2xl overflow-hidden font-sans text-xs text-[#BCBEC4]">
        {/* Search Everywhere Input */}
        <div className="p-3 border-b border-[#393B40] flex items-center space-x-2.5 bg-[#1E1F22]">
          <Search size={15} className="text-[#3574F0]" />
          <input
            type="text"
            autoFocus
            placeholder="Search Everywhere: classes, files, actions, symbols (Double Shift)..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm text-[#DFE1E5] placeholder-[#707278] focus:outline-none font-medium"
          />
          <button onClick={onClose} className="p-1 hover:bg-[#393B40] rounded text-[#707278]">
            <X size={14} />
          </button>
        </div>

        {/* Action Results */}
        <div className="max-h-80 overflow-y-auto p-1.5 space-y-0.5">
          {filtered.map(cmd => {
            const Icon = cmd.icon;
            return (
              <button
                key={cmd.key}
                onClick={() => { onSelectAction(cmd.key); onClose(); }}
                className="w-full p-2 rounded hover:bg-[#3574F0] hover:text-white flex items-center justify-between text-left transition-colors group text-xs text-[#DFE1E5]"
              >
                <div className="flex items-center space-x-2.5">
                  <Icon size={14} className="text-[#3574F0] group-hover:text-white" />
                  <span className="font-medium">{cmd.label}</span>
                </div>
                <span className="text-[10px] text-[#707278] group-hover:text-white font-mono uppercase">
                  {cmd.category}
                </span>
              </button>
            );
          })}
        </div>

        <div className="p-2 bg-[#1E1F22] border-t border-[#393B40] text-[11px] text-[#707278] flex justify-between font-mono">
          <span>Use ↑↓ to navigate</span>
          <span>Esc to exit</span>
        </div>
      </div>
    </div>
  );
}
