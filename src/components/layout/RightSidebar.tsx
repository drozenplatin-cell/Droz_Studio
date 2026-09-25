import React, { useState } from 'react';
import {
  Bot,
  Sparkles,
  Send,
  CheckCircle2,
  Clock,
  Play,
  Check,
  X,
  ShieldCheck,
  RefreshCw,
  Terminal,
  ArrowRight
} from 'lucide-react';
import { AgentStep } from '../../types/droz';
import { ToastType } from '../../types/toast';
import { askDrozAI, createInitialAgentSteps } from '../../services/aiService';

interface RightSidebarProps {
  onClose: () => void;
  onCommitAiDiff: (code: string) => void;
  onNotify?: (title: string, desc?: string, type?: ToastType) => void;
  width?: number;
}

export function RightSidebar({ onClose, onCommitAiDiff, onNotify, width = 360 }: RightSidebarProps) {
  const [activeTab, setActiveTab] = useState<'agent' | 'assistant' | 'impact'>('agent');
  const [userInput, setUserInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [chatMessages, setChatMessages] = useState<{ sender: 'user' | 'droz'; text: string; source?: string }[]>([
    {
      sender: 'droz',
      text: 'Hello! I am **Gemini in Droz Studio**. I understand your entire project architecture across Android (Compose/Gradle), Windows (WinUI), and Web. Ask me to refactor code, fix exceptions, or run the 14-step autonomous AI Agent.',
      source: 'gemini-3.8-flash'
    }
  ]);

  // AI Agent Pipeline State
  const [agentSteps, setAgentSteps] = useState<AgentStep[]>(createInitialAgentSteps());
  const [agentRunning, setAgentRunning] = useState(false);
  const [stagedDiff, setStagedDiff] = useState<string | null>(null);

  const handleSendChat = async () => {
    if (!userInput.trim() || isLoading) return;
    const q = userInput;
    setUserInput('');
    setChatMessages(prev => [...prev, { sender: 'user', text: q }]);
    setIsLoading(true);

    try {
      const resp = await askDrozAI(q, 'general');
      setChatMessages(prev => [
        ...prev,
        { sender: 'droz', text: resp.text, source: resp.source }
      ]);
    } catch (e: any) {
      setChatMessages(prev => [
        ...prev,
        { sender: 'droz', text: 'Error: ' + e?.message }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const runAgentPipeline = () => {
    setAgentRunning(true);
    let stepIdx = 0;

    const executeStep = () => {
      if (stepIdx >= agentSteps.length) {
        setAgentRunning(false);
        setStagedDiff(`// Staged AI-Generated Module: AttendanceBiometricEngine.kt
package com.droz.schoolsphere.biometrics

import androidx.biometric.BiometricPrompt
import kotlinx.coroutines.flow.StateFlow

class AttendanceBiometricEngine(
    private val keyStoreVault: DrozKeyStoreVault
) {
    fun recordRollCall(studentId: String): Boolean {
        // Authenticated cryptographically against hardware keystore
        return true
    }
}`);
        return;
      }

      setAgentSteps(prev => prev.map((s, i) => {
        if (i === stepIdx) return { ...s, status: 'completed' };
        if (i === stepIdx + 1) return { ...s, status: 'in_progress' };
        return s;
      }));

      stepIdx++;
      setTimeout(executeStep, 380);
    };

    executeStep();
  };

  const handleApproveDiff = () => {
    if (stagedDiff) {
      onCommitAiDiff(stagedDiff);
      setStagedDiff(null);
      if (onNotify) {
        onNotify('Developer Approved', 'AI generated changes committed to /core workspace cleanly.', 'success');
      }
    }
  };

  return (
    <div
      style={{ width: `${width}px` }}
      className="bg-[#2B2D30] border-l border-[#393B40] flex flex-col h-full text-[#BCBEC4] font-sans text-xs select-none overflow-hidden z-20 shrink-0"
    >
      {/* Top Header (Gemini in Android Studio Style) */}
      <div className="h-9 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-3">
        <div className="flex items-center space-x-1.5 text-[#DFE1E5] font-semibold">
          <Sparkles size={14} className="text-[#3574F0]" />
          <span>Gemini in Droz Studio</span>
        </div>

        {/* Tabs */}
        <div className="flex bg-[#1E1F22] p-0.5 rounded border border-[#393B40] text-[11px]">
          <button
            onClick={() => setActiveTab('agent')}
            className={`px-2 py-0.5 rounded transition ${
              activeTab === 'agent' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
            }`}
          >
            AI Agent
          </button>
          <button
            onClick={() => setActiveTab('assistant')}
            className={`px-2 py-0.5 rounded transition ${
              activeTab === 'assistant' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
            }`}
          >
            Chat
          </button>
          <button
            onClick={() => setActiveTab('impact')}
            className={`px-2 py-0.5 rounded transition ${
              activeTab === 'impact' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
            }`}
          >
            Impact
          </button>
        </div>
      </div>

      {/* Main Body */}
      {activeTab === 'agent' ? (
        <div className="flex-1 flex flex-col overflow-hidden bg-[#1E1F22]">
          {/* Natural Language Prompt */}
          <div className="p-3 border-b border-[#393B40] bg-[#2B2D30] space-y-2">
            <span className="text-[10px] uppercase font-bold text-[#3DDC84] font-mono">
              Natural Language Development (Section 4)
            </span>
            <div className="flex space-x-2">
              <input
                type="text"
                placeholder="e.g. Build school management system with attendance..."
                value={userInput}
                onChange={e => setUserInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter') runAgentPipeline(); }}
                className="flex-1 bg-[#1E1F22] border border-[#393B40] rounded px-2.5 py-1 text-xs text-[#DFE1E5] placeholder-[#707278] focus:outline-none focus:border-[#3574F0]"
              />
              <button
                onClick={runAgentPipeline}
                disabled={agentRunning}
                className="px-3 py-1 bg-[#3DDC84] hover:bg-[#34c776] text-[#1E1F22] rounded text-xs font-bold transition flex items-center space-x-1 disabled:opacity-50"
              >
                {agentRunning ? <RefreshCw size={11} className="animate-spin" /> : <Play size={11} className="fill-[#1E1F22]" />}
                <span>Execute</span>
              </button>
            </div>
          </div>

          {/* 14-Step Agent Pipeline */}
          <div className="flex-1 overflow-y-auto p-3 space-y-1">
            <div className="flex items-center justify-between text-[11px] text-[#707278] font-mono pb-1">
              <span>Supervised Agent Stages (14):</span>
              <span className="text-[#3DDC84] font-bold">{agentSteps.filter(s => s.status === 'completed').length} / 14</span>
            </div>

            {agentSteps.map(step => (
              <div
                key={step.id}
                className={`p-2 rounded border text-xs flex items-center justify-between transition ${
                  step.status === 'completed'
                    ? 'bg-[#2B2D30] border-[#3DDC84]/40 text-[#DFE1E5]'
                    : step.status === 'in_progress'
                    ? 'bg-[#3574F0]/10 border-[#3574F0] text-[#3574F0]'
                    : 'bg-[#1E1F22] border-[#393B40] text-[#707278]'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  <span className="font-mono text-[10px] text-[#707278]">#{step.id}</span>
                  <span className="truncate">{step.title}</span>
                </div>
                {step.status === 'completed' ? (
                  <CheckCircle2 size={13} className="text-[#3DDC84] shrink-0" />
                ) : step.status === 'in_progress' ? (
                  <RefreshCw size={13} className="text-[#3574F0] animate-spin shrink-0" />
                ) : (
                  <Clock size={13} className="text-[#707278] shrink-0" />
                )}
              </div>
            ))}
          </div>

          {/* Developer Review Barrier */}
          {stagedDiff && (
            <div className="p-3 bg-[#2B2D30] border-t border-[#393B40] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold text-[#e09f3e] font-mono flex items-center space-x-1">
                  <ShieldCheck size={12} />
                  <span>Developer Review Gate (Section 31)</span>
                </span>
              </div>

              <div className="bg-[#18181A] border border-[#393B40] rounded p-2 text-[10px] font-mono text-[#6AAB73] max-h-24 overflow-y-auto whitespace-pre">
                {stagedDiff}
              </div>

              <div className="flex space-x-2">
                <button
                  onClick={handleApproveDiff}
                  className="flex-1 py-1 bg-[#3DDC84] hover:bg-[#34c776] text-[#1E1F22] rounded text-xs font-bold flex items-center justify-center space-x-1"
                >
                  <Check size={12} />
                  <span>Approve & Apply</span>
                </button>
                <button
                  onClick={() => setStagedDiff(null)}
                  className="px-3 py-1 bg-[#1E1F22] hover:bg-[#393B40] text-[#DFE1E5] rounded text-xs"
                >
                  Reject
                </button>
              </div>
            </div>
          )}
        </div>
      ) : activeTab === 'assistant' ? (
        <div className="flex-1 flex flex-col overflow-hidden bg-[#1E1F22]">
          <div className="flex-1 overflow-y-auto p-3 space-y-3 font-sans">
            {chatMessages.map((msg, idx) => (
              <div
                key={idx}
                className={`p-3 rounded-lg leading-relaxed text-xs ${
                  msg.sender === 'user'
                    ? 'bg-[#3574F0] text-white ml-6'
                    : 'bg-[#2B2D30] border border-[#393B40] text-[#DFE1E5] mr-3'
                }`}
              >
                {msg.sender === 'droz' && (
                  <div className="text-[10px] font-mono text-[#3DDC84] mb-1 font-bold">
                    GEMINI
                  </div>
                )}
                <div className="whitespace-pre-wrap">{msg.text}</div>
              </div>
            ))}
            {isLoading && (
              <div className="p-2.5 bg-[#2B2D30] border border-[#393B40] rounded text-xs text-[#3574F0] flex items-center space-x-2">
                <RefreshCw size={12} className="animate-spin" />
                <span>Thinking...</span>
              </div>
            )}
          </div>

          <div className="p-2.5 border-t border-[#393B40] bg-[#2B2D30] flex space-x-2">
            <input
              type="text"
              placeholder="Ask Gemini about project files or code..."
              value={userInput}
              onChange={e => setUserInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') handleSendChat(); }}
              className="flex-1 bg-[#1E1F22] border border-[#393B40] rounded px-2.5 py-1.5 text-xs text-[#DFE1E5] focus:outline-none focus:border-[#3574F0]"
            />
            <button
              onClick={handleSendChat}
              disabled={isLoading || !userInput.trim()}
              className="px-3 py-1.5 bg-[#3574F0] hover:bg-[#2B63D8] text-white rounded text-xs font-medium disabled:opacity-50"
            >
              <Send size={11} />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-[#1E1F22]">
          <span className="text-[10px] uppercase font-bold text-[#3DDC84] font-mono">
            Cross-Layer Schema Map
          </span>
          <div className="p-3 bg-[#2B2D30] rounded border border-[#393B40] space-y-2 font-mono text-xs">
            <div className="text-[#3DDC84] font-bold">Impact Graph Trace:</div>
            <p className="text-[#BCBEC4]">
              Modifying <span className="text-[#e09f3e]">students.admission_no</span> cascades to:
            </p>
            <ul className="space-y-1 text-[#707278] pl-2 text-[11px]">
              <li>• API: <span className="text-[#DFE1E5]">POST /api/v1/students</span></li>
              <li>• Backend: <span className="text-[#DFE1E5]">validateAdmission()</span></li>
              <li>• UI: <span className="text-[#DFE1E5]">StudentDashboard.tsx</span></li>
              <li>• Tests: <span className="text-[#DFE1E5]">student.test.ts</span></li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
