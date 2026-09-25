import React, { useState } from 'react';
import {
  GitBranch,
  GitCommit,
  Sparkles,
  RefreshCw,
  ArrowUp,
  Check,
  SplitSquareVertical,
  Plus
} from 'lucide-react';
import { ToastType } from '../../types/toast';

interface GitControlViewProps {
  onNotify?: (title: string, desc?: string, type?: ToastType) => void;
}

export function GitControlView({ onNotify }: GitControlViewProps = {}) {
  const [branch, setBranch] = useState('main');
  const [commitMessage, setCommitMessage] = useState('feat: add biometric prompt lifecycle guard & universal database schema');
  const [stagedFiles, setStagedFiles] = useState<string[]>([
    'core/student.ts',
    'ui/StudentDashboard.tsx',
    'database/schema.sql'
  ]);
  const [isCommitting, setIsCommitting] = useState(false);
  const [commitSuccess, setCommitSuccess] = useState(false);

  const [commitHistory, setCommitHistory] = useState([
    { sha: '8b41f92', msg: 'feat: add universal schema migrations', author: 'DROZ Developer', time: '20 mins ago' },
    { sha: '3a180c4', msg: 'fix: android keystore biometric callback', author: 'DROZ Developer', time: '1 hour ago' },
    { sha: '9921e01', msg: 'init: bootstrap Droz Studio universal project', author: 'DROZ Developer', time: '3 hours ago' }
  ]);

  const handleCommit = () => {
    setIsCommitting(true);
    setTimeout(() => {
      setIsCommitting(false);
      setCommitSuccess(true);
      setCommitHistory(prev => [
        { sha: Math.random().toString(16).substring(2, 9), msg: commitMessage, author: 'DROZ Developer', time: 'Just now' },
        ...prev
      ]);
      setStagedFiles([]);
      if (onNotify) {
        onNotify('Git Commit Successful', `Commit created: "${commitMessage.substring(0, 45)}..."`, 'success');
      }
      setTimeout(() => setCommitSuccess(false), 2500);
    }, 600);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E1F22] overflow-hidden font-sans text-xs text-[#BCBEC4]">
      {/* Top Bar */}
      <div className="h-9 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-3 z-10 select-none">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-[#DFE1E5] font-semibold">
            <GitBranch size={14} className="text-[#3574F0]" />
            <span>Git Version Control (Alt+9)</span>
          </div>

          <div className="w-[1px] h-4 bg-[#393B40]" />

          <div className="flex items-center space-x-2 bg-[#1E1F22] px-2 py-0.5 rounded border border-[#393B40] font-mono text-[11px]">
            <span className="text-[#707278]">Branch:</span>
            <strong className="text-[#3574F0]">{branch}</strong>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNotify ? onNotify('Git Fetch Complete', 'Working tree is up-to-date with origin/main.', 'info') : null}
            className="flex items-center space-x-1 px-2.5 py-1 bg-[#2B2D30] hover:bg-[#393B40] text-[#DFE1E5] border border-[#393B40] rounded text-xs transition"
          >
            <RefreshCw size={11} />
            <span>Update Project (Ctrl+T)</span>
          </button>
          <button
            onClick={() => onNotify ? onNotify('Git Push Successful', 'Pushed 1 commit to origin/main (all branches clean).', 'success') : null}
            className="flex items-center space-x-1 px-3 py-1 bg-[#3574F0] hover:bg-[#2B63D8] text-white rounded text-xs font-medium transition"
          >
            <ArrowUp size={11} />
            <span>Push (Ctrl+Shift+K)</span>
          </button>
        </div>
      </div>

      {/* Main Git Workspace */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left: Commit Tool Window */}
        <div className="w-80 border-r border-[#393B40] bg-[#2B2D30] p-3 flex flex-col justify-between overflow-hidden">
          <div className="space-y-3 overflow-y-auto">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#707278] font-mono">
                Changes ({stagedFiles.length})
              </span>
              <button
                onClick={() => setStagedFiles([])}
                className="text-[10px] text-[#707278] hover:text-[#fa5252]"
              >
                Unstage
              </button>
            </div>

            <div className="space-y-1 font-mono text-xs">
              {stagedFiles.map((f, i) => (
                <div key={i} className="flex items-center justify-between p-1.5 rounded bg-[#1E1F22] border border-[#393B40] text-[#DFE1E5]">
                  <span className="truncate">{f}</span>
                  <span className="text-[#3DDC84] text-[10px]">modified</span>
                </div>
              ))}
              {stagedFiles.length === 0 && (
                <div className="p-4 text-center text-[#707278] font-sans">
                  Working tree clean.
                </div>
              )}
            </div>
          </div>

          {/* Commit Message Box */}
          <div className="pt-3 border-t border-[#393B40] space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-[#707278] font-mono">Commit Message</span>
              <button
                onClick={() => setCommitMessage('feat(universal): synchronized student domain entities with Compose & REST endpoints')}
                className="flex items-center space-x-1 text-[11px] text-[#3574F0] hover:underline"
              >
                <Sparkles size={11} />
                <span>AI Message</span>
              </button>
            </div>

            <textarea
              value={commitMessage}
              onChange={e => setCommitMessage(e.target.value)}
              rows={3}
              className="w-full bg-[#1E1F22] border border-[#393B40] rounded p-2 font-mono text-xs text-[#DFE1E5] focus:outline-none focus:border-[#3574F0] resize-none"
            />

            <button
              onClick={handleCommit}
              disabled={isCommitting || stagedFiles.length === 0}
              className="w-full py-1.5 bg-[#3574F0] hover:bg-[#2B63D8] text-white rounded font-medium text-xs transition flex items-center justify-center space-x-1 disabled:opacity-50"
            >
              {commitSuccess ? (
                <>
                  <Check size={12} />
                  <span>Committed!</span>
                </>
              ) : (
                <>
                  <GitCommit size={12} />
                  <span>Commit (Ctrl+K)</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Right: Visual Diff Viewer */}
        <div className="flex-1 p-4 overflow-y-auto bg-[#1E1F22] space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-[#393B40]">
            <h3 className="text-xs font-bold text-[#DFE1E5] font-mono">Diff: core/student.ts (Working Copy vs HEAD)</h3>
            <span className="text-[11px] text-[#707278] font-mono">2 lines added, 1 line modified</span>
          </div>

          {/* Visual Diff Lines (JetBrains Diff Style) */}
          <div className="bg-[#18181A] border border-[#393B40] rounded font-mono text-xs overflow-hidden leading-relaxed">
            <div className="p-2 bg-[#2B2D30] text-[#707278] border-b border-[#393B40]">
              @@ -14,6 +14,8 @@
            </div>
            <div className="p-1 px-3 text-[#BCBEC4]">
              &nbsp;&nbsp;export interface StudentRecord &#123;
            </div>
            <div className="p-1 px-3 text-[#BCBEC4]">
              &nbsp;&nbsp;&nbsp;&nbsp;id: string;
            </div>
            <div className="p-1 px-3 bg-[#fa5252]/15 text-[#fa5252] flex">
              <span className="w-5 select-none">-</span>
              <span>&nbsp;&nbsp;guardianEmail?: string;</span>
            </div>
            <div className="p-1 px-3 bg-[#3DDC84]/15 text-[#3DDC84] flex">
              <span className="w-5 select-none">+</span>
              <span>&nbsp;&nbsp;guardianEmail: string;</span>
            </div>
            <div className="p-1 px-3 bg-[#3DDC84]/15 text-[#3DDC84] flex">
              <span className="w-5 select-none">+</span>
              <span>&nbsp;&nbsp;emergencyContactNumber: string;</span>
            </div>
            <div className="p-1 px-3 text-[#BCBEC4]">
              &nbsp;&nbsp;&#125;
            </div>
          </div>

          <div className="pt-2">
            <h4 className="text-xs font-bold text-[#DFE1E5] font-mono mb-2">Commit Log (main)</h4>
            <div className="space-y-1.5 font-mono text-xs">
              {commitHistory.map(c => (
                <div key={c.sha} className="p-2.5 bg-[#2B2D30] border border-[#393B40] rounded flex justify-between items-center">
                  <div>
                    <span className="text-[#DFE1E5] font-sans font-medium">{c.msg}</span>
                    <div className="text-[11px] text-[#707278] font-sans mt-0.5">{c.author} • {c.time}</div>
                  </div>
                  <span className="text-[#3574F0] px-1.5 py-0.5 rounded bg-[#1E1F22] border border-[#393B40]">
                    {c.sha}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
