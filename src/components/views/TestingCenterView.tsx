import React, { useState } from 'react';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Play,
  Sparkles,
  RefreshCw,
  Filter,
  Wrench
} from 'lucide-react';
import { TestCase } from '../../types/droz';

interface TestingCenterViewProps {
  tests: TestCase[];
  onRunAllTests: () => void;
  isRunningTests: boolean;
  onDiagnoseTestWithAI: (test: TestCase) => void;
  onApplyFixToTest: (testId: string) => void;
}

export function TestingCenterView({
  tests,
  onRunAllTests,
  isRunningTests,
  onDiagnoseTestWithAI,
  onApplyFixToTest
}: TestingCenterViewProps) {
  const [suiteFilter, setSuiteFilter] = useState<string>('all');
  const [selectedTest, setSelectedTest] = useState<TestCase | null>(
    tests.find(t => t.status === 'failed') || tests[0]
  );

  const total = 124;
  const failed = tests.filter(t => t.status === 'failed').length;
  const passed = total - failed;

  const filteredTests = suiteFilter === 'all'
    ? tests
    : tests.filter(t => t.suite === suiteFilter);

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E1F22] overflow-hidden font-sans text-xs text-[#BCBEC4]">
      {/* Top Test Bar */}
      <div className="h-9 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-3 z-10 select-none">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-[#DFE1E5] font-semibold">
            <CheckCircle2 size={14} className="text-[#3DDC84]" />
            <span>Test Runner (JUnit & Vitest)</span>
          </div>

          <div className="w-[1px] h-4 bg-[#393B40]" />

          {/* Test Metrics Counter */}
          <div className="flex items-center space-x-3 bg-[#1E1F22] px-2.5 py-0.5 rounded border border-[#393B40] font-mono text-[11px]">
            <span>Total: <strong className="text-[#DFE1E5]">{total}</strong></span>
            <span className="text-[#3DDC84] font-semibold">Passed: {passed}</span>
            {failed > 0 && <span className="text-[#fa5252] font-semibold">Failed: {failed}</span>}
          </div>
        </div>

        {/* Run All Tests Action */}
        <button
          onClick={onRunAllTests}
          disabled={isRunningTests}
          className="flex items-center space-x-1.5 px-3 py-1 bg-[#3DDC84] hover:bg-[#34c776] text-[#1E1F22] rounded font-bold text-xs transition shadow-sm disabled:opacity-50"
        >
          {isRunningTests ? <RefreshCw size={11} className="animate-spin" /> : <Play size={11} className="fill-[#1E1F22]" />}
          <span>Run All Tests (Ctrl+Shift+F10)</span>
        </button>
      </div>

      {/* Main Testing View */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Test Roster */}
        <div className="w-96 border-r border-[#393B40] bg-[#2B2D30] flex flex-col overflow-hidden">
          <div className="p-2 border-b border-[#393B40] flex items-center space-x-2">
            <Filter size={12} className="text-[#707278]" />
            <select
              value={suiteFilter}
              onChange={e => setSuiteFilter(e.target.value)}
              aria-label="Filter Test Suite"
              className="bg-[#1E1F22] border border-[#393B40] rounded px-2 py-0.5 text-[#DFE1E5] text-xs font-mono focus:outline-none"
            >
              <option value="all">All Suites (Unit, Integration, API, UI)</option>
              <option value="unit">Unit Tests Only</option>
              <option value="integration">Integration Tests</option>
              <option value="api">API Endpoint Tests</option>
              <option value="ui">UI Tests</option>
            </select>
          </div>

          <div className="flex-1 overflow-y-auto p-1.5 space-y-1 font-mono">
            {filteredTests.map(t => {
              const isSelected = selectedTest?.id === t.id;
              return (
                <div
                  key={t.id}
                  onClick={() => setSelectedTest(t)}
                  className={`p-2 rounded cursor-pointer transition border text-xs ${
                    isSelected
                      ? 'bg-[#1E1F22] border-[#3574F0]'
                      : 'bg-[#1E1F22]/50 border-[#393B40] hover:bg-[#1E1F22]'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1.5 truncate">
                      {t.status === 'passed' ? (
                        <CheckCircle2 size={13} className="text-[#3DDC84] shrink-0" />
                      ) : (
                        <XCircle size={13} className="text-[#fa5252] shrink-0" />
                      )}
                      <span className="truncate text-[#DFE1E5]">{t.name}</span>
                    </div>
                    <span className="text-[10px] text-[#707278] shrink-0 ml-2">{t.durationMs}ms</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Test Diagnostics */}
        <div className="flex-1 p-6 overflow-y-auto bg-[#1E1F22] space-y-4">
          {selectedTest ? (
            <div className="space-y-4">
              <div className="flex justify-between items-center pb-3 border-b border-[#393B40]">
                <div>
                  <div className="flex items-center space-x-2">
                    <span className={`px-2 py-0.2 rounded font-mono font-bold text-xs ${
                      selectedTest.status === 'passed' ? 'bg-[#3DDC84]/20 text-[#3DDC84] border border-[#3DDC84]' : 'bg-[#fa5252]/20 text-[#fa5252] border border-[#fa5252]'
                    }`}>
                      {selectedTest.status.toUpperCase()}
                    </span>
                    <h3 className="text-sm font-bold text-[#DFE1E5] font-mono">{selectedTest.name}</h3>
                  </div>
                  <div className="text-xs text-[#707278] font-mono mt-1">
                    Suite: {selectedTest.suite.toUpperCase()} • Time: {selectedTest.durationMs}ms
                  </div>
                </div>

                {selectedTest.status === 'failed' && (
                  <button
                    onClick={() => onDiagnoseTestWithAI(selectedTest)}
                    className="flex items-center space-x-1 px-3 py-1 bg-[#2B2D30] hover:bg-[#393B40] text-[#3574F0] border border-[#393B40] rounded text-xs transition"
                  >
                    <Sparkles size={12} />
                    <span>AI Diagnosis</span>
                  </button>
                )}
              </div>

              {selectedTest.status === 'failed' ? (
                <div className="space-y-3">
                  <span className="text-[10px] uppercase font-bold text-[#fa5252] font-mono block">
                    Stack Trace & Failure Log
                  </span>
                  <div className="p-3 bg-[#18181A] border border-[#fa5252]/40 rounded font-mono text-xs text-[#fa5252] leading-relaxed whitespace-pre">
                    {selectedTest.errorMessage}
                  </div>

                  <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg space-y-3">
                    <div className="font-semibold text-[#DFE1E5] text-xs">Recommended Remediation:</div>
                    <p className="text-xs text-[#BCBEC4]">
                      The callback was invoked before the lifecycle reached initialized state. Applying guard logic resolves the NullPointer assertion.
                    </p>
                    <button
                      onClick={() => onApplyFixToTest(selectedTest.id)}
                      className="flex items-center space-x-1.5 px-3 py-1 bg-[#3DDC84] hover:bg-[#34c776] text-[#1E1F22] rounded font-bold text-xs transition shadow-sm"
                    >
                      <Wrench size={12} />
                      <span>Apply Fix & Re-run Test</span>
                    </button>
                  </div>
                </div>
              ) : (
                <div className="p-6 text-center bg-[#2B2D30] rounded-lg border border-[#393B40]">
                  <CheckCircle2 size={32} className="text-[#3DDC84] mx-auto mb-2" />
                  <div className="font-bold text-[#DFE1E5]">Test Passed Cleanly</div>
                  <div className="text-xs text-[#707278] mt-1">No assertions failed.</div>
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-12 text-[#707278]">Select a test case to view output.</div>
          )}
        </div>
      </div>
    </div>
  );
}
