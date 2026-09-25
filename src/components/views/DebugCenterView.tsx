import React, { useState } from 'react';
import {
  Bug,
  Play,
  Pause,
  RotateCcw,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  Wrench
} from 'lucide-react';
import { ToastType } from '../../types/toast';

interface DebugCenterViewProps {
  onApplyDebugFix: () => void;
  onNotify?: (title: string, desc?: string, type?: ToastType) => void;
}

export function DebugCenterView({ onApplyDebugFix, onNotify }: DebugCenterViewProps) {
  const [isDebugging, setIsDebugging] = useState(true);
  const [fixedApplied, setFixedApplied] = useState(false);

  const variables = [
    { name: 'sessionToken', type: 'String', value: '"dzk_live_9921820"' },
    { name: 'biometricPrompt', type: 'BiometricPrompt', value: 'null (NullPointerException target)' },
    { name: 'activeStudent', type: 'StudentRecord', value: '{ id: "std_01", gradeLevel: "12" }' },
    { name: 'databaseConnectionPool', type: 'Pool', value: '4 connections active' }
  ];

  const callStack = [
    'MainActivity.kt:74 (onBiometricCallbackTrigger)',
    'BiometricAuthAdapter.kt:42 (authenticateWithKeystore)',
    'StudentDashboardViewModel.kt:118 (requestAdminOverride)',
    'Looper.java:214 (loopOnce)'
  ];

  const handleFix = () => {
    setFixedApplied(true);
    onApplyDebugFix();
    setTimeout(() => setFixedApplied(false), 2500);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E1F22] overflow-hidden font-sans text-xs text-[#BCBEC4]">
      {/* Top Debug Bar */}
      <div className="h-9 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-3 z-10 select-none">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-[#DFE1E5] font-semibold">
            <Bug size={14} className="text-[#3DDC84]" />
            <span>Debugger (DAP Protocol)</span>
          </div>

          <div className="w-[1px] h-4 bg-[#393B40]" />

          {/* Stepping controls */}
          <div className="flex items-center space-x-1">
            <button
              onClick={() => setIsDebugging(!isDebugging)}
              className="p-1 bg-[#1E1F22] hover:bg-[#393B40] text-[#3DDC84] rounded border border-[#393B40]"
              title={isDebugging ? "Pause (F8)" : "Resume (F9)"}
            >
              {isDebugging ? <Pause size={11} /> : <Play size={11} className="fill-[#3DDC84]" />}
            </button>
            <button
              onClick={() => onNotify?.('Debugger: Step Over', 'Stepped to next instruction line in MainActivity.kt:75', 'info')}
              className="px-2 py-0.5 bg-[#1E1F22] hover:bg-[#393B40] text-[#DFE1E5] rounded border border-[#393B40] text-[11px] transition"
            >
              Step Over (F8)
            </button>
            <button
              onClick={() => onNotify?.('Debugger: Step Into', 'Stepped into BiometricAuthAdapter.authenticateWithKeystore()', 'info')}
              className="px-2 py-0.5 bg-[#1E1F22] hover:bg-[#393B40] text-[#DFE1E5] rounded border border-[#393B40] text-[11px] transition"
            >
              Step Into (F7)
            </button>
            <button
              onClick={() => setIsDebugging(true)}
              className="p-1 bg-[#1E1F22] hover:bg-[#393B40] text-[#fa5252] rounded border border-[#393B40]"
              title="Rerun Session (Ctrl+F5)"
            >
              <RotateCcw size={11} />
            </button>
          </div>
        </div>

        <span className="text-[11px] font-mono text-[#e09f3e] bg-[#2B2D30] px-2 py-0.5 rounded border border-[#393B40]">
          Paused at MainActivity.kt:74
        </span>
      </div>

      {/* Main Debug Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Variables & Frames */}
        <div className="w-80 border-r border-[#393B40] bg-[#2B2D30] p-3 space-y-3 overflow-y-auto font-mono text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-[#707278] block mb-1">
              Variables (Inspection)
            </span>
            <div className="space-y-1">
              {variables.map((v, i) => (
                <div key={i} className="p-1.5 rounded bg-[#1E1F22] border border-[#393B40]">
                  <div className="flex justify-between">
                    <span className="text-[#3574F0] font-semibold">{v.name}</span>
                    <span className="text-[#707278]">{v.type}</span>
                  </div>
                  <div className={`mt-0.5 truncate ${v.value.includes('NullPointer') ? 'text-[#fa5252] font-bold' : 'text-[#DFE1E5]'}`}>
                    {v.value}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-[#707278] block mb-1">
              Frames (Call Stack)
            </span>
            <div className="space-y-1">
              {callStack.map((s, idx) => (
                <div key={idx} className="p-1.5 rounded bg-[#1E1F22] border border-[#393B40] text-[#BCBEC4] truncate">
                  <span className="text-[#e09f3e] mr-1">#{idx}</span>
                  <span>{s}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right: AI Error Assistant & Exception Resolution */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#1E1F22] space-y-4">
          <div className="p-4 bg-[#2B2D30] border border-[#fa5252]/50 rounded-lg space-y-2">
            <div className="flex items-center space-x-2">
              <AlertTriangle size={16} className="text-[#fa5252]" />
              <span className="font-bold text-sm text-[#fa5252] font-mono">
                java.lang.NullPointerException
              </span>
            </div>
            <p className="text-xs text-[#BCBEC4] font-mono">
              Attempt to invoke virtual method 'void androidx.biometric.BiometricPrompt.authenticate()' on a null object reference
            </p>
          </div>

          <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg space-y-3">
            <div className="flex items-center space-x-2 text-[#3DDC84] font-semibold text-xs">
              <Sparkles size={14} />
              <span>Droz AI Plain-Language Diagnostic & Solution</span>
            </div>

            <p className="text-xs text-[#BCBEC4] leading-relaxed">
              <strong>Droz AI:</strong> The application is attempting to access the <code className="bg-[#1E1F22] px-1 py-0.5 rounded text-[#DFE1E5]">biometricPrompt</code> object before it has been initialized in the Android lifecycle.
            </p>

            <div className="p-3 bg-[#18181A] rounded border border-[#393B40] font-mono text-xs text-[#6AAB73] whitespace-pre">
{`// Guard check and safe lifecycle initialization
if (biometricPrompt == null) {
    biometricPrompt = BiometricPrompt(requireActivity(), executor, callback)
}
biometricPrompt?.authenticate(promptInfo)`}
            </div>

            <button
              onClick={handleFix}
              className="flex items-center space-x-1.5 px-3 py-1.5 bg-[#3DDC84] hover:bg-[#34c776] text-[#1E1F22] rounded font-bold text-xs transition shadow-sm"
            >
              <Wrench size={12} />
              <span>{fixedApplied ? 'Fix Applied to MainActivity.kt!' : 'Apply Automated Fix to Workspace'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
