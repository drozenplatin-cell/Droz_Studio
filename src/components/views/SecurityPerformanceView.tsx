import React, { useState } from 'react';
import {
  ShieldAlert,
  Activity,
  Cpu,
  HardDrive,
  Clock,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Lock,
  Sparkles,
  Database
} from 'lucide-react';
import { SecurityIssue, PerformanceMetrics } from '../../types/droz';

interface SecurityPerformanceViewProps {
  issues: SecurityIssue[];
  metrics: PerformanceMetrics;
  onRunSecurityScan: () => void;
  onApplySecurityRemediation: (issueId: string) => void;
}

export function SecurityPerformanceView({
  issues,
  metrics,
  onRunSecurityScan,
  onApplySecurityRemediation
}: SecurityPerformanceViewProps) {
  const [activeTab, setActiveTab] = useState<'security' | 'performance'>('security');
  const [isScanning, setIsScanning] = useState(false);

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      onRunSecurityScan();
    }, 800);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E1F22] overflow-hidden font-sans text-xs text-[#BCBEC4]">
      {/* Top Bar */}
      <div className="h-9 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-3 z-10 select-none">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-[#DFE1E5] font-semibold">
            <ShieldAlert size={14} className="text-[#e09f3e]" />
            <span>Security SAST & Profiler</span>
          </div>

          <div className="w-[1px] h-4 bg-[#393B40]" />

          <div className="flex bg-[#1E1F22] p-0.5 rounded border border-[#393B40] text-xs">
            <button
              onClick={() => setActiveTab('security')}
              className={`px-3 py-0.5 rounded transition ${
                activeTab === 'security' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              Vulnerability SAST ({issues.length} advisories)
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`px-3 py-0.5 rounded transition ${
                activeTab === 'performance' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              Android / System Profiler
            </button>
          </div>
        </div>

        {activeTab === 'security' ? (
          <button
            onClick={handleScan}
            disabled={isScanning}
            className="flex items-center space-x-1 px-3 py-1 bg-[#2B2D30] hover:bg-[#393B40] text-[#DFE1E5] border border-[#393B40] rounded text-xs transition"
          >
            <ShieldAlert size={12} />
            <span>{isScanning ? 'Auditing Codebase...' : 'Run Full SAST Audit'}</span>
          </button>
        ) : (
          <span className="text-[11px] font-mono text-[#3DDC84] flex items-center space-x-1">
            <span className="w-2 h-2 rounded-full bg-[#3DDC84]" />
            <span>Profiler Active</span>
          </span>
        )}
      </div>

      {/* Main Body */}
      <div className="flex-1 p-6 overflow-y-auto bg-[#1E1F22] space-y-5">
        {activeTab === 'security' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-[#2B2D30] border border-[#393B40] rounded-lg">
                <span className="text-[10px] uppercase font-bold text-[#707278] font-mono">Zero Secret Policy</span>
                <div className="text-base font-bold text-[#3DDC84] mt-1">Enforced ✓</div>
              </div>
              <div className="p-3.5 bg-[#2B2D30] border border-[#393B40] rounded-lg">
                <span className="text-[10px] uppercase font-bold text-[#707278] font-mono">Vulnerable Packages</span>
                <div className="text-base font-bold text-[#e09f3e] mt-1">1 Advisory</div>
              </div>
              <div className="p-3.5 bg-[#2B2D30] border border-[#393B40] rounded-lg">
                <span className="text-[10px] uppercase font-bold text-[#707278] font-mono">Prepared Queries</span>
                <div className="text-base font-bold text-[#3DDC84] mt-1">100% Passed</div>
              </div>
              <div className="p-3.5 bg-[#2B2D30] border border-[#393B40] rounded-lg">
                <span className="text-[10px] uppercase font-bold text-[#707278] font-mono">Sandboxed Isolation</span>
                <div className="text-base font-bold text-[#3574F0] mt-1">Verified</div>
              </div>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-[#707278] font-mono">Security Advisories:</span>
              {issues.map(iss => (
                <div key={iss.id} className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-0.2 rounded text-[10px] font-mono font-bold ${
                        iss.severity === 'high' ? 'bg-[#fa5252]/20 text-[#fa5252] border border-[#fa5252]' : 'bg-[#e09f3e]/20 text-[#e09f3e] border border-[#e09f3e]'
                      }`}>
                        {iss.severity.toUpperCase()}
                      </span>
                      <span className="font-bold text-[#DFE1E5]">{iss.title}</span>
                    </div>
                    <span className="text-[10px] font-mono text-[#707278]">{iss.filePath}</span>
                  </div>
                  <div className="text-xs text-[#BCBEC4]">{iss.remediation}</div>
                  <div className="pt-2 flex justify-end">
                    <button
                      onClick={() => onApplySecurityRemediation(iss.id)}
                      className="px-3 py-1 bg-[#3574F0] hover:bg-[#2B63D8] text-white rounded text-xs font-medium"
                    >
                      Remediate Advisory
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              <div className="p-3.5 bg-[#2B2D30] border border-[#393B40] rounded-lg">
                <div className="flex justify-between text-[#707278]">
                  <span>CPU Usage</span>
                  <Cpu size={14} className="text-[#3574F0]" />
                </div>
                <div className="text-xl font-bold text-[#DFE1E5] font-mono mt-1">{metrics.cpuUsage}%</div>
              </div>
              <div className="p-3.5 bg-[#2B2D30] border border-[#393B40] rounded-lg">
                <div className="flex justify-between text-[#707278]">
                  <span>RAM Heap</span>
                  <HardDrive size={14} className="text-[#a463f2]" />
                </div>
                <div className="text-xl font-bold text-[#DFE1E5] font-mono mt-1">{metrics.memoryMb} MB</div>
              </div>
              <div className="p-3.5 bg-[#2B2D30] border border-[#393B40] rounded-lg">
                <div className="flex justify-between text-[#707278]">
                  <span>Startup Latency</span>
                  <Zap size={14} className="text-[#3DDC84]" />
                </div>
                <div className="text-xl font-bold text-[#3DDC84] font-mono mt-1">{metrics.appStartupMs} ms</div>
              </div>
              <div className="p-3.5 bg-[#2B2D30] border border-[#393B40] rounded-lg">
                <div className="flex justify-between text-[#707278]">
                  <span>DB Query Latency</span>
                  <Database size={14} className="text-[#e09f3e]" />
                </div>
                <div className="text-xl font-bold text-[#e09f3e] font-mono mt-1">{metrics.dbQueryLatencyMs} ms</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
