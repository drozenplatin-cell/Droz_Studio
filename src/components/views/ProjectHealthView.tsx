import React, { useState } from 'react';
import {
  HeartPulse,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  Hammer
} from 'lucide-react';
import { ToastType } from '../../types/toast';

interface ProjectHealthViewProps {
  onFixAllIssues: () => void;
  onNotify?: (title: string, desc?: string, type?: ToastType) => void;
}

export function ProjectHealthView({ onFixAllIssues, onNotify }: ProjectHealthViewProps) {
  const [activeTab, setActiveTab] = useState<'health' | 'migration' | 'docs'>('health');

  const HEALTH_METRICS = [
    { label: 'Universal Build', status: 'healthy', icon: Hammer, details: 'Android, iOS, Windows, macOS, Linux, Web ready', value: '100%' },
    { label: 'Test Suite', status: 'warning', icon: CheckCircle2, details: '121 passed, 3 failed across Keystore & PWA suites', value: '97.5%' },
    { label: 'Security SAST', status: 'warning', icon: ShieldCheck, details: '1 vulnerable dependency, zero exposed secrets', value: '92%' },
    { label: 'Dependencies', status: 'warning', icon: RefreshCw, details: '1 outdated package (argon2-kmp minor bump available)', value: '95%' },
    { label: 'Performance', status: 'healthy', icon: Zap, details: '320ms startup, 34ms API latency, 60 FPS UI', value: '99%' },
    { label: 'Deployment', status: 'healthy', icon: HeartPulse, details: 'Signed release packages & Google Play / MSIX bundles ready', value: '100%' }
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E1F22] overflow-hidden font-sans text-xs text-[#BCBEC4]">
      {/* Top Bar */}
      <div className="h-9 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-3 z-10 select-none">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-[#DFE1E5] font-semibold">
            <HeartPulse size={14} className="text-[#3DDC84]" />
            <span>Project Health Dashboard (Section 27)</span>
          </div>

          <div className="w-[1px] h-4 bg-[#393B40]" />

          <div className="flex bg-[#1E1F22] p-0.5 rounded border border-[#393B40] text-xs">
            <button
              onClick={() => setActiveTab('health')}
              className={`px-3 py-0.5 rounded transition ${
                activeTab === 'health' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              Health Scorecard
            </button>
            <button
              onClick={() => setActiveTab('migration')}
              className={`px-3 py-0.5 rounded transition ${
                activeTab === 'migration' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              Smart Migration (Section 28)
            </button>
            <button
              onClick={() => setActiveTab('docs')}
              className={`px-3 py-0.5 rounded transition ${
                activeTab === 'docs' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              Living Documentation (Section 29)
            </button>
          </div>
        </div>

        <button
          onClick={onFixAllIssues}
          className="flex items-center space-x-1.5 px-3 py-1 bg-[#3DDC84] hover:bg-[#34c776] text-[#1E1F22] rounded font-bold text-xs transition shadow-sm"
        >
          <Sparkles size={12} />
          <span>Resolve Health Warnings (100%)</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#1E1F22] space-y-5">
        {activeTab === 'health' && (
          <div className="space-y-4">
            <div className="p-5 bg-[#2B2D30] border border-[#393B40] rounded-lg flex flex-col md:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-[10px] uppercase font-bold text-[#707278] font-mono">Overall Project Quality Index</span>
                <div className="text-2xl font-bold text-[#DFE1E5] font-mono mt-1 flex items-baseline space-x-2">
                  <span>95.4</span>
                  <span className="text-xs font-normal text-[#707278]">/ 100</span>
                  <span className="text-xs text-[#3DDC84] font-semibold ml-2">Production Grade</span>
                </div>
                <p className="text-xs text-[#707278] mt-1">
                  Validated against all 6 platform targets, ProGuard rules, and JUnit assertions.
                </p>
              </div>

              <div className="flex items-center space-x-4">
                <div className="text-center font-mono">
                  <span className="text-xs text-[#707278]">Passing Checks</span>
                  <div className="text-xl font-bold text-[#3DDC84]">22 / 25</div>
                </div>
                <div className="text-center font-mono">
                  <span className="text-xs text-[#707278]">Attention Required</span>
                  <div className="text-xl font-bold text-[#e09f3e]">3 Items</div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {HEALTH_METRICS.map((m, idx) => {
                const Icon = m.icon;
                return (
                  <div key={idx} className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Icon size={16} className={m.status === 'healthy' ? 'text-[#3DDC84]' : 'text-[#e09f3e]'} />
                        <span className="font-bold text-[#DFE1E5]">{m.label}</span>
                      </div>
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.2 rounded ${
                        m.status === 'healthy' ? 'bg-[#3DDC84]/20 text-[#3DDC84]' : 'bg-[#e09f3e]/20 text-[#e09f3e]'
                      }`}>
                        {m.status === 'healthy' ? '✓ OK' : '⚠️ Warning'}
                      </span>
                    </div>
                    <p className="text-xs text-[#707278]">{m.details}</p>
                    <div className="text-[11px] font-mono text-[#DFE1E5] pt-1 border-t border-[#393B40]">
                      Score: <strong>{m.value}</strong>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {activeTab === 'migration' && (
          <div className="space-y-4">
            <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg">
              <h3 className="font-bold text-[#DFE1E5] text-xs font-mono">Smart Migration Engine (Section 28)</h3>
              <p className="text-xs text-[#707278] mt-1">
                Automated migration paths with zero-risk AST rewrites before permanent commit.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg space-y-2">
                <span className="text-[10px] font-bold text-[#3574F0] uppercase font-mono">Android Language Upgrade</span>
                <div className="font-bold text-[#DFE1E5]">Java ➔ Kotlin Multiplatform (KMP)</div>
                <p className="text-xs text-[#707278]">Converts legacy Android Java classes into idiomatic Kotlin Compose state flows.</p>
                <button
                  onClick={() => onNotify?.('Migration Plan Generated', 'Droz AI generated Kotlin Multiplatform (KMP) migration plan: staged in Git.', 'success')}
                  className="px-3 py-1 bg-[#1E1F22] hover:bg-[#393B40] text-[#3574F0] border border-[#393B40] rounded text-xs transition"
                >
                  Analyze & Plan KMP Migration
                </button>
              </div>

              <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg space-y-2">
                <span className="text-[10px] font-bold text-[#3DDC84] uppercase font-mono">Web Modernization</span>
                <div className="font-bold text-[#DFE1E5]">JavaScript ➔ Strict TypeScript 5.8</div>
                <p className="text-xs text-[#707278]">Synthesizes strict contract validation across all web components.</p>
                <button
                  onClick={() => onNotify?.('Types Synthesized', 'Strict TypeScript type definitions emitted for all client modules.', 'success')}
                  className="px-3 py-1 bg-[#1E1F22] hover:bg-[#393B40] text-[#3DDC84] border border-[#393B40] rounded text-xs transition"
                >
                  Synthesize TypeScript Types
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="space-y-3">
            <h3 className="font-bold text-[#DFE1E5] font-mono text-xs">Automated Living Documentation (Section 29)</h3>
            <div className="p-3 bg-[#2B2D30] border border-[#393B40] rounded-lg flex justify-between items-center">
              <div>
                <div className="font-semibold text-xs text-[#DFE1E5] font-mono">README.md (Architecture & Gradle Quickstart)</div>
                <div className="text-[11px] text-[#707278]">Updated automatically from workspace files</div>
              </div>
              <button className="px-2.5 py-1 bg-[#1E1F22] text-[#3574F0] border border-[#393B40] rounded text-xs">View</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
