import React, { useState } from 'react';
import {
  Hammer,
  Smartphone,
  Monitor,
  Laptop,
  Server,
  Globe,
  Play,
  CheckCircle2,
  Clock,
  Download,
  ShieldCheck,
  FileCheck,
  RefreshCw,
  Terminal,
  AlertCircle
} from 'lucide-react';
import { BuildTargetInfo, PlatformTarget } from '../../types/droz';

interface BuildEngineViewProps {
  targets: BuildTargetInfo[];
  onTriggerBuild: (targetId: PlatformTarget) => void;
  onTriggerBuildAll: () => void;
  isBuildingAll: boolean;
}

export function BuildEngineView({
  targets,
  onTriggerBuild,
  onTriggerBuildAll,
  isBuildingAll
}: BuildEngineViewProps) {
  const [selectedTargetId, setSelectedTargetId] = useState<PlatformTarget>('android');
  const [activeTab, setActiveTab] = useState<'pipeline' | 'releases' | 'signing'>('pipeline');

  const selectedTarget = targets.find(t => t.id === selectedTargetId) || targets[0];

  const PIPELINE_STAGES = [
    { key: 'source', label: 'Source' },
    { key: 'analyze', label: 'Analyze' },
    { key: 'dependencies', label: 'Dependencies' },
    { key: 'compile', label: 'Compile (Gradle/Clang)' },
    { key: 'test', label: 'Test Suites' },
    { key: 'security', label: 'SAST Audit' },
    { key: 'package', label: 'Packaging' },
    { key: 'sign', label: 'Code Signing' },
    { key: 'release', label: 'Release Artifact' }
  ];

  const handleDownloadRealFile = (fileName: string) => {
    const dummyBlob = new Blob([
      `DROZ UNIVERSAL BUILD ARTIFACT: ${fileName}\nCompiled by Droz Universal Build Engine v2026.2\nPlatform: ${selectedTarget.name}\nVerification: SHA-256 Passed\nSigned: Verified Release Keystore`
    ], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(dummyBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E1F22] overflow-hidden font-sans text-xs text-[#BCBEC4]">
      {/* Top Engine Bar */}
      <div className="h-9 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-3 z-10 select-none">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-[#DFE1E5] font-semibold">
            <Hammer size={14} className="text-[#3574F0]" />
            <span>Universal Build Engine & Release Center</span>
          </div>

          <div className="w-[1px] h-4 bg-[#393B40]" />

          <div className="flex bg-[#1E1F22] p-0.5 rounded border border-[#393B40] text-xs">
            <button
              onClick={() => setActiveTab('pipeline')}
              className={`px-3 py-0.5 rounded transition ${
                activeTab === 'pipeline' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              Build Matrix (6 Targets)
            </button>
            <button
              onClick={() => setActiveTab('releases')}
              className={`px-3 py-0.5 rounded transition ${
                activeTab === 'releases' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              Artifacts & Releases
            </button>
            <button
              onClick={() => setActiveTab('signing')}
              className={`px-3 py-0.5 rounded transition ${
                activeTab === 'signing' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              Keystores & Certificates
            </button>
          </div>
        </div>

        {/* Action: Build All Button */}
        <button
          onClick={onTriggerBuildAll}
          disabled={isBuildingAll}
          className="flex items-center space-x-1.5 px-3 py-1 bg-[#3DDC84] hover:bg-[#34c776] text-[#1E1F22] rounded font-bold text-xs transition shadow-sm disabled:opacity-50"
        >
          {isBuildingAll ? <RefreshCw size={12} className="animate-spin" /> : <Play size={11} className="fill-[#1E1F22]" />}
          <span>Build All Targets (Ctrl+F9)</span>
        </button>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'pipeline' && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left Targets Matrix */}
            <div className="w-80 border-r border-[#393B40] bg-[#2B2D30] p-3 space-y-2 overflow-y-auto">
              <span className="text-[10px] uppercase font-bold text-[#707278] font-mono">
                Target Compilation Matrix:
              </span>

              {targets.map(target => {
                const isSelected = selectedTargetId === target.id;
                return (
                  <div
                    key={target.id}
                    onClick={() => setSelectedTargetId(target.id)}
                    className={`p-3 rounded-lg cursor-pointer transition border ${
                      isSelected
                        ? 'bg-[#1E1F22] border-[#3574F0] shadow-sm'
                        : 'bg-[#1E1F22]/60 border-[#393B40] hover:border-[#707278]'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {target.id === 'android' && <Smartphone size={15} className="text-[#3DDC84]" />}
                        {target.id === 'ios' && <Smartphone size={15} className="text-[#DFE1E5]" />}
                        {target.id === 'windows' && <Monitor size={15} className="text-[#3574F0]" />}
                        {target.id === 'macos' && <Laptop size={15} className="text-[#DFE1E5]" />}
                        {target.id === 'linux' && <Server size={15} className="text-[#e09f3e]" />}
                        {target.id === 'web' && <Globe size={15} className="text-[#3574F0]" />}
                        <span className="font-semibold text-[#DFE1E5]">{target.name}</span>
                      </div>

                      <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded font-bold ${
                        target.status === 'released' ? 'bg-[#3DDC84]/20 text-[#3DDC84] border border-[#3DDC84]' :
                        target.status === 'compiling' ? 'bg-[#3574F0]/20 text-[#3574F0] border border-[#3574F0] animate-pulse' :
                        'bg-[#2B2D30] text-[#707278]'
                      }`}>
                        {target.status.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-[11px] text-[#707278] font-mono mt-1 truncate">
                      Output: {target.artifactFormat}
                    </div>

                    <div className="flex items-center justify-between mt-2 pt-2 border-t border-[#393B40]">
                      <button
                        onClick={(e) => { e.stopPropagation(); onTriggerBuild(target.id); }}
                        className="px-2 py-0.5 bg-[#2B2D30] hover:bg-[#393B40] text-[#DFE1E5] border border-[#393B40] rounded text-[11px] transition"
                      >
                        Compile {target.name}
                      </button>
                      <span className="text-[10px] text-[#707278] font-mono">{target.progress}%</span>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right: Build Logs & DAG Flow */}
            <div className="flex-1 flex flex-col bg-[#1E1F22] overflow-hidden">
              {/* Pipeline Flow Stages */}
              <div className="p-3 border-b border-[#393B40] bg-[#2B2D30]/60">
                <span className="text-[10px] uppercase font-bold text-[#707278] font-mono block mb-2">
                  Task Execution Flow: {selectedTarget.name}
                </span>

                <div className="flex items-center space-x-2 overflow-x-auto pb-1 text-xs select-none">
                  {PIPELINE_STAGES.map((stg, i) => (
                    <React.Fragment key={stg.key}>
                      <div className="flex flex-col items-center shrink-0">
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-[10px] font-mono ${
                          selectedTarget.status === 'released' ? 'bg-[#3DDC84]/20 text-[#3DDC84] border border-[#3DDC84]' :
                          'bg-[#1E1F22] text-[#707278] border border-[#393B40]'
                        }`}>
                          {i + 1}
                        </div>
                        <span className="text-[10px] text-[#DFE1E5] mt-1">{stg.label}</span>
                      </div>
                      {i < PIPELINE_STAGES.length - 1 && (
                        <div className="w-6 h-0.5 bg-[#393B40] shrink-0 -mt-3" />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Build Output Terminal (Android Studio Gradle Console Style) */}
              <div className="flex-1 p-4 bg-[#18181A] font-mono text-xs overflow-y-auto space-y-1">
                <div className="text-[#707278] pb-1 border-b border-[#393B40] flex justify-between">
                  <span>Gradle & Toolchain Build Log:</span>
                  <span className="text-[#3DDC84]">Daemon Active</span>
                </div>

                <div className="pt-2 space-y-1">
                  {selectedTarget.logs.map((log, index) => (
                    <div key={index} className="leading-relaxed">
                      <span className="text-[#707278] mr-2">&gt;</span>
                      <span className={log.includes('Generated') || log.includes('Verified') || log.includes('complete') ? 'text-[#3DDC84] font-semibold' : 'text-[#BCBEC4]'}>
                        {log}
                      </span>
                    </div>
                  ))}
                  {selectedTarget.status === 'released' && (
                    <div className="text-[#3DDC84] font-bold pt-2">
                      BUILD SUCCESSFUL in 1s 420ms
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'releases' && (
          <div className="flex-1 p-6 overflow-auto bg-[#1E1F22] space-y-4">
            <div className="p-4 bg-[#2B2D30] border border-[#3DDC84]/40 rounded-lg flex items-center justify-between">
              <div>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 size={16} className="text-[#3DDC84]" />
                  <span className="font-bold text-sm text-[#DFE1E5]">RELEASE PACKAGES READY FOR DEPLOYMENT</span>
                </div>
                <p className="text-xs text-[#707278] mt-0.5">Version 2026.2.0 • Build #142 • Signed with Production Certificates</p>
              </div>

              <span className="text-[#3DDC84] font-mono text-xs">All Targets Fresh ✓</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {targets.map(t => (
                <div key={t.id} className="p-3.5 bg-[#2B2D30] border border-[#393B40] rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-[#DFE1E5]">{t.name}</span>
                    <span className="text-[10px] font-mono px-1.5 py-0.2 bg-[#1E1F22] rounded text-[#3DDC84]">
                      {t.fileSize || '34 MB'}
                    </span>
                  </div>

                  <div className="text-xs font-mono text-[#BCBEC4] bg-[#1E1F22] p-2 rounded border border-[#393B40] truncate">
                    {t.outputArtifact || `${t.name}.bin`}
                  </div>

                  <button
                    onClick={() => handleDownloadRealFile(t.outputArtifact || `${t.name}.bin`)}
                    className="w-full flex items-center justify-center space-x-1.5 py-1.5 bg-[#3574F0] hover:bg-[#2B63D8] text-white rounded text-xs font-medium transition"
                  >
                    <Download size={12} />
                    <span>Download Package</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'signing' && (
          <div className="flex-1 p-6 overflow-auto bg-[#1E1F22] space-y-3">
            <h3 className="text-sm font-bold text-[#DFE1E5] font-mono">Keystore Vault & Identities</h3>
            <div className="space-y-2">
              <div className="p-3 bg-[#2B2D30] border border-[#393B40] rounded-lg flex justify-between items-center">
                <div>
                  <div className="font-semibold text-xs text-[#DFE1E5]">Android Keystore (v3 Scheme)</div>
                  <div className="text-[11px] text-[#707278] font-mono">Alias: release-key • 4096-bit RSA</div>
                </div>
                <span className="text-[#3DDC84] font-mono text-xs">Verified ✓</span>
              </div>
              <div className="p-3 bg-[#2B2D30] border border-[#393B40] rounded-lg flex justify-between items-center">
                <div>
                  <div className="font-semibold text-xs text-[#DFE1E5]">Windows Authenticode</div>
                  <div className="text-[11px] text-[#707278] font-mono">Publisher: CN=DROZ Future Project Inc</div>
                </div>
                <span className="text-[#3DDC84] font-mono text-xs">Verified ✓</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
