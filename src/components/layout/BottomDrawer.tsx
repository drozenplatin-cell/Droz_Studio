import React, { useState, useEffect } from 'react';
import {
  Terminal as TerminalIcon,
  AlertTriangle,
  FileText,
  Hammer,
  ChevronUp,
  ChevronDown,
  Bug,
  Activity,
  ListFilter,
  Trash2,
  Download,
  Copy,
  Check,
  Search,
  Maximize2,
  Minimize2,
  Play,
  RotateCcw,
  Sparkles,
  Wifi,
  Cpu,
  Layers,
  HardDrive
} from 'lucide-react';
import { LogcatEntry, ProfilerState } from '../../types/droz';
import { ToastType } from '../../types/toast';
import { INITIAL_LOGCAT_ENTRIES, INITIAL_PROFILER_STATE } from '../../data/initialProject';

interface BottomDrawerProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onExecuteCommand?: (cmd: string) => void;
  logcatEntries?: LogcatEntry[];
  setLogcatEntries?: React.Dispatch<React.SetStateAction<LogcatEntry[]>>;
  profilerState?: ProfilerState;
  onNotify?: (title: string, desc?: string, type?: ToastType) => void;
  height?: number;
  onStartDrag?: (e: React.MouseEvent) => void;
  onResetHeight?: () => void;
}

export function BottomDrawer({
  isOpen,
  setIsOpen,
  onExecuteCommand,
  logcatEntries: externalLogcat,
  setLogcatEntries: externalSetLogcat,
  profilerState: externalProfiler,
  onNotify,
  height = 250,
  onStartDrag,
  onResetHeight
}: BottomDrawerProps) {
  const [activeTab, setActiveTab] = useState<'terminal' | 'logcat' | 'profiler' | 'problems' | 'build' | 'debug'>('terminal');
  const [isExpanded, setIsExpanded] = useState(false);
  const [terminalSession, setTerminalSession] = useState<'zsh' | 'bash' | 'adb'>('zsh');

  // Terminal state
  const [commandInput, setCommandInput] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    'Droz Studio Unified Terminal (ZSH / POSIX Environment)',
    'Connected to Droz VFS Daemon (Local Virtual Disk).',
    'Type "help", "droz build --all", "droz test", or "adb devices" to run tasks.',
    'Ready.'
  ]);

  // Logcat state
  const [localLogcat, setLocalLogcat] = useState<LogcatEntry[]>(INITIAL_LOGCAT_ENTRIES);
  const logcats = externalLogcat || localLogcat;
  const setLogcats = externalSetLogcat || setLocalLogcat;

  const [logLevelFilter, setLogLevelFilter] = useState<'ALL' | 'V' | 'D' | 'I' | 'W' | 'E'>('ALL');
  const [logTagFilter, setLogTagFilter] = useState('');
  const [logSearchQuery, setLogSearchQuery] = useState('');

  // Profiler state
  const [profiler, setProfiler] = useState<ProfilerState>(externalProfiler || INITIAL_PROFILER_STATE);
  const [copiedLogcat, setCopiedLogcat] = useState(false);

  // Debug console REPL
  const [debugInput, setDebugInput] = useState('');
  const [debugLogs, setDebugLogs] = useState<string[]>([
    'Connected to JVM / V8 Debugger on port 5005',
    'Thread [main] (Suspended at breakpoint Line 14 in student.ts)',
    '> Ready for expression evaluation'
  ]);

  // Dynamic simulation for profiler & logcat when open
  useEffect(() => {
    if (!isOpen) return;
    const interval = setInterval(() => {
      setProfiler(prev => {
        const nextVal = Math.floor(Math.random() * 25) + 15;
        const newHistory = [...prev.cpuHistory.slice(1), nextVal];
        return {
          ...prev,
          cpuHistory: newHistory,
          fps: Math.random() > 0.1 ? 60 : 59
        };
      });
    }, 2000);
    return () => clearInterval(interval);
  }, [isOpen]);

  const handleRunCmd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commandInput.trim()) return;
    const cmd = commandInput.trim();
    setCommandInput('');
    setTerminalHistory(prev => [...prev, `$ ${cmd}`]);

    const lower = cmd.toLowerCase();

    if (lower === 'clear') {
      setTerminalHistory(['Droz Studio Terminal Ready.']);
      return;
    }

    if (lower === 'help' || lower === 'droz help') {
      setTerminalHistory(prev => [
        ...prev,
        'Droz Developer Toolset v2026.2:',
        '  droz build --all        Compile all 6 cross-platform targets (Android, Windows, iOS, macOS, Linux, Web)',
        '  droz test               Execute full suite of unit, integration, and UI tests',
        '  adb devices             List connected physical devices & Android Virtual Devices (AVD)',
        '  git status              Inspect working tree changes and staged files',
        '  gradle assembleRelease  Build optimized APK and AAB with R8 shrinking',
        '  clear                   Reset terminal output'
      ]);
    } else if (lower.includes('build')) {
      setTerminalHistory(prev => [
        ...prev,
        '> Task :core:compileKotlin UP-TO-DATE',
        '> Task :ui:compileJetpackCompose SUCCESS',
        '> Task :app:packageUniversalArtifacts',
        'BUILD SUCCESSFUL in 1.42s (4 actionable tasks: 2 executed, 2 up-to-date)'
      ]);
      if (onExecuteCommand) onExecuteCommand('build');
    } else if (lower.includes('test')) {
      setTerminalHistory(prev => [
        ...prev,
        '> Executing 124 tests across Android, Windows, and Web suites...',
        '✓ validateAdmission() passed (2ms)',
        '✓ calculateGPA() passed (1ms)',
        '✓ biometricKeystoreEnclave() passed (4ms)',
        'PASS: 124 passed, 0 failed, 100% test coverage.'
      ]);
      if (onExecuteCommand) onExecuteCommand('test');
    } else if (lower.includes('adb devices')) {
      setTerminalHistory(prev => [
        ...prev,
        'List of devices attached',
        'redmi_15_usb        device  product:redmi_15  model:Redmi_15  device:redmi',
        'pixel_9_emu_5554    device  product:sdk_gphone64_arm64  model:Pixel_9'
      ]);
    } else if (lower.includes('git status')) {
      setTerminalHistory(prev => [
        ...prev,
        'On branch main',
        'Your branch is up to date with \'origin/main\'.',
        'Changes to be committed:',
        '  (use "git restore --staged <file>..." to unstage)',
        '        modified:   core/student.ts',
        '        modified:   ui/StudentDashboard.tsx'
      ]);
    } else if (lower.includes('ls')) {
      setTerminalHistory(prev => [
        ...prev,
        'droz.config.json  core/  ui/  database/  api/  tests/  package.json'
      ]);
    } else {
      setTerminalHistory(prev => [
        ...prev,
        `Executed: ${cmd} (exit status: 0)`
      ]);
    }
  };

  const handleDebugEval = (e: React.FormEvent) => {
    e.preventDefault();
    if (!debugInput.trim()) return;
    const expr = debugInput.trim();
    setDebugInput('');
    setDebugLogs(prev => [...prev, `> ${expr}`]);

    if (expr.includes('student')) {
      setDebugLogs(prev => [
        ...prev,
        `Result: { id: "SCH-001", fullName: "Alexander Vance", gradeLevel: "Grade 12", gpa: 3.9 }`
      ]);
    } else if (expr.includes('calculateGPA')) {
      setDebugLogs(prev => [...prev, `Result: 3.85 (number)`]);
    } else {
      setDebugLogs(prev => [
        ...prev,
        `Result: evaluated successfully -> true`
      ]);
    }
  };

  const filteredLogcats = logcats.filter(log => {
    const matchesLevel = logLevelFilter === 'ALL' || log.level === logLevelFilter;
    const matchesTag = !logTagFilter || log.tag.toLowerCase().includes(logTagFilter.toLowerCase());
    const matchesSearch = !logSearchQuery ||
      log.message.toLowerCase().includes(logSearchQuery.toLowerCase()) ||
      log.tag.toLowerCase().includes(logSearchQuery.toLowerCase());
    return matchesLevel && matchesTag && matchesSearch;
  });

  const clearLogcat = () => {
    setLogcats([]);
    if (onNotify) onNotify('Logcat Cleared', 'Log buffer reset to 0 entries.', 'info');
  };

  const exportLogcat = () => {
    const text = filteredLogcats.map(l => `${l.timestamp} ${l.pid}-${l.tid} ${l.tag} ${l.level}: ${l.message}`).join('\n');
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `droz_logcat_${Date.now()}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    if (onNotify) onNotify('Logcat Exported', 'Saved logcat buffer to disk.', 'success');
  };

  if (!isOpen) {
    return (
      <div className="h-6 bg-[#2B2D30] border-t border-[#393B40] flex items-center justify-between px-3 text-[11px] text-[#707278] select-none">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => { setActiveTab('terminal'); setIsOpen(true); }}
            className="flex items-center space-x-1.5 hover:text-[#DFE1E5] transition"
          >
            <TerminalIcon size={12} />
            <span>Terminal</span>
          </button>
          <button
            onClick={() => { setActiveTab('logcat'); setIsOpen(true); }}
            className="flex items-center space-x-1.5 hover:text-[#3DDC84] transition"
          >
            <Activity size={12} className="text-[#3DDC84]" />
            <span>Logcat ({logcats.length})</span>
          </button>
          <button
            onClick={() => { setActiveTab('profiler'); setIsOpen(true); }}
            className="flex items-center space-x-1.5 hover:text-[#3574F0] transition"
          >
            <Cpu size={12} className="text-[#3574F0]" />
            <span>Profiler (CPU {profiler.cpuHistory[profiler.cpuHistory.length - 1]}%)</span>
          </button>
          <button
            onClick={() => { setActiveTab('problems'); setIsOpen(true); }}
            className="flex items-center space-x-1 hover:text-[#e09f3e] transition"
          >
            <AlertTriangle size={12} className="text-[#e09f3e]" />
            <span>Problems (2)</span>
          </button>
        </div>
        <button
          onClick={() => setIsOpen(true)}
          className="hover:text-white transition p-0.5"
          title="Expand Tool Window"
        >
          <ChevronUp size={13} />
        </button>
      </div>
    );
  }

  const currentHeight = isExpanded ? Math.max(height, 420) : height;

  return (
    <div
      style={{ height: `${currentHeight}px` }}
      className="bg-[#18181A] border-t border-[#393B40] flex flex-col font-mono text-xs select-none z-10 text-[#BCBEC4] relative shrink-0"
    >
      {/* Top Drag Handle for Resizing Height */}
      <div
        onMouseDown={onStartDrag}
        onDoubleClick={onResetHeight || (() => setIsExpanded(prev => !prev))}
        title="Drag up/down to adjust panel height (Double click to reset)"
        className="h-1.5 w-full bg-[#2B2D30] hover:bg-[#3574F0] cursor-row-resize flex items-center justify-center transition-colors group z-20"
      >
        <div className="w-12 h-0.5 rounded-full bg-[#707278]/40 group-hover:bg-white transition-colors" />
      </div>
      {/* Drawer Tabs (IntelliJ / Android Studio Style) */}
      <div className="h-7 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-2">
        <div className="flex items-center space-x-1">
          {[
            { id: 'terminal', label: 'Terminal', icon: TerminalIcon },
            { id: 'logcat', label: `Logcat (${logcats.length})`, icon: Activity },
            { id: 'profiler', label: 'Profiler', icon: Cpu },
            { id: 'problems', label: 'Problems (2)', icon: AlertTriangle },
            { id: 'build', label: 'Build Output', icon: Hammer },
            { id: 'debug', label: 'Debug Console', icon: Bug }
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-1.5 px-2.5 py-1 rounded transition text-[11px] ${
                  isActive
                    ? 'bg-[#1E1F22] text-[#DFE1E5] font-semibold border-b-2 border-[#3574F0]'
                    : 'text-[#707278] hover:text-[#BCBEC4]'
                }`}
              >
                <Icon size={12} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        <div className="flex items-center space-x-1 text-[#707278]">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hover:text-white p-1 rounded hover:bg-[#393B40] transition"
            title={isExpanded ? 'Restore Size' : 'Maximize Tool Window'}
          >
            {isExpanded ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
          </button>
          <button
            onClick={() => setIsOpen(false)}
            className="hover:text-white p-1 rounded hover:bg-[#393B40] transition"
            title="Minimize Tool Window"
          >
            <ChevronDown size={13} />
          </button>
        </div>
      </div>

      {/* Drawer Content */}
      <div className="flex-1 overflow-hidden flex flex-col bg-[#1E1F22]">
        {/* TAB: TERMINAL */}
        {activeTab === 'terminal' && (
          <div className="flex-1 flex flex-col p-2 bg-[#18181A] overflow-hidden">
            {/* Terminal Session Bar */}
            <div className="flex items-center justify-between pb-1.5 mb-1.5 border-b border-[#393B40] text-[11px]">
              <div className="flex items-center space-x-2">
                <span className="text-[#707278]">Shell:</span>
                {(['zsh', 'bash', 'adb'] as const).map(sh => (
                  <button
                    key={sh}
                    onClick={() => setTerminalSession(sh)}
                    className={`px-2 py-0.5 rounded text-[10px] font-mono transition ${
                      terminalSession === sh
                        ? 'bg-[#3574F0] text-white font-bold'
                        : 'bg-[#2B2D30] text-[#707278] hover:text-[#DFE1E5]'
                    }`}
                  >
                    {sh === 'adb' ? 'adb shell' : sh}
                  </button>
                ))}
              </div>
              <div className="text-[10px] text-[#707278]">
                Press Enter to run command
              </div>
            </div>

            {/* Scrollable history */}
            <div className="flex-1 overflow-y-auto space-y-1 font-mono text-[11px] leading-relaxed text-[#BCBEC4]">
              {terminalHistory.map((item, idx) => (
                <div key={idx} className={item.startsWith('$') ? 'text-[#3DDC84] font-bold' : item.includes('SUCCESS') || item.includes('PASS') ? 'text-[#3DDC84]' : ''}>
                  {item}
                </div>
              ))}
            </div>

            {/* Interactive Command Input */}
            <form onSubmit={handleRunCmd} className="flex items-center space-x-2 pt-1 border-t border-[#393B40]">
              <span className="text-[#3DDC84] font-bold">
                {terminalSession === 'adb' ? 'adb-sh$' : `${terminalSession}$`}
              </span>
              <input
                type="text"
                placeholder="Type command (e.g. droz build --all, droz test, adb devices, git status, help)..."
                value={commandInput}
                onChange={e => setCommandInput(e.target.value)}
                className="flex-1 bg-transparent text-[#DFE1E5] focus:outline-none text-xs font-mono"
              />
            </form>
          </div>
        )}

        {/* TAB: LOGCAT (Full Android Studio parity) */}
        {activeTab === 'logcat' && (
          <div className="flex-1 flex flex-col bg-[#18181A] overflow-hidden">
            {/* Logcat Filter Toolbar */}
            <div className="h-8 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-2 text-xs">
              <div className="flex items-center space-x-2">
                {/* Level selector */}
                <select
                  value={logLevelFilter}
                  onChange={e => setLogLevelFilter(e.target.value as any)}
                  className="bg-[#1E1F22] border border-[#393B40] rounded px-2 py-0.5 text-[11px] text-[#DFE1E5] focus:outline-none"
                  aria-label="Logcat Level Filter"
                >
                  <option value="ALL">All Levels</option>
                  <option value="V">Verbose (V)</option>
                  <option value="D">Debug (D)</option>
                  <option value="I">Info (I)</option>
                  <option value="W">Warn (W)</option>
                  <option value="E">Error (E)</option>
                </select>

                {/* Tag Filter */}
                <input
                  type="text"
                  placeholder="Filter by Tag (e.g. ActivityTaskManager)..."
                  value={logTagFilter}
                  onChange={e => setLogTagFilter(e.target.value)}
                  className="bg-[#1E1F22] border border-[#393B40] rounded px-2 py-0.5 text-[11px] text-[#DFE1E5] w-48 focus:outline-none focus:border-[#3574F0]"
                />

                {/* Search Text */}
                <div className="relative">
                  <Search size={11} className="absolute left-2 top-1.5 text-[#707278]" />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={logSearchQuery}
                    onChange={e => setLogSearchQuery(e.target.value)}
                    className="bg-[#1E1F22] border border-[#393B40] rounded pl-6 pr-2 py-0.5 text-[11px] text-[#DFE1E5] w-40 focus:outline-none focus:border-[#3574F0]"
                  />
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center space-x-1.5 text-[#707278]">
                <button
                  onClick={clearLogcat}
                  className="p-1 hover:bg-[#393B40] hover:text-[#fa5252] rounded transition"
                  title="Clear Logcat"
                >
                  <Trash2 size={12} />
                </button>
                <button
                  onClick={exportLogcat}
                  className="p-1 hover:bg-[#393B40] hover:text-[#DFE1E5] rounded transition"
                  title="Export Logcat as File"
                >
                  <Download size={12} />
                </button>
              </div>
            </div>

            {/* Logcat entries list */}
            <div className="flex-1 overflow-y-auto p-2 space-y-0.5 font-mono text-[11px] leading-relaxed">
              {filteredLogcats.map((log, idx) => {
                const levelColor =
                  log.level === 'E'
                    ? 'text-[#fa5252] bg-[#fa5252]/10'
                    : log.level === 'W'
                    ? 'text-[#e09f3e] bg-[#e09f3e]/10'
                    : log.level === 'I'
                    ? 'text-[#3574F0]'
                    : log.level === 'D'
                    ? 'text-[#3DDC84]'
                    : 'text-[#707278]';

                return (
                  <div key={log.id || idx} className="hover:bg-[#2B2D30]/60 px-1.5 py-0.5 rounded flex items-baseline space-x-2">
                    <span className="text-[#707278] text-[10px] shrink-0">{log.timestamp}</span>
                    <span className="text-[#707278] text-[10px] shrink-0">{log.pid}-{log.tid}</span>
                    <span className={`px-1 rounded text-[10px] font-bold shrink-0 ${levelColor}`}>{log.level}</span>
                    <span className="text-[#BCBEC4] font-semibold shrink-0">/{log.tag}:</span>
                    <span className="text-[#DFE1E5] break-all">{log.message}</span>
                  </div>
                );
              })}

              {filteredLogcats.length === 0 && (
                <div className="p-4 text-center text-[#707278] text-xs">
                  No logcat entries match current filter.
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB: PROFILER (Android Studio & Instruments style) */}
        {activeTab === 'profiler' && (
          <div className="flex-1 flex flex-col p-3 bg-[#18181A] overflow-y-auto text-xs space-y-3">
            {/* Top Metric Gauges */}
            <div className="grid grid-cols-4 gap-2">
              <div className="p-2 bg-[#2B2D30] rounded border border-[#393B40]">
                <div className="flex justify-between items-center text-[10px] text-[#707278]">
                  <span>CPU UTILIZATION</span>
                  <Cpu size={12} className="text-[#3574F0]" />
                </div>
                <div className="text-base font-bold text-[#3574F0] mt-1">
                  {profiler.cpuHistory[profiler.cpuHistory.length - 1]}%
                </div>
                <span className="text-[9px] text-[#3DDC84]">4 Cores Active • Vulkan 1.3</span>
              </div>

              <div className="p-2 bg-[#2B2D30] rounded border border-[#393B40]">
                <div className="flex justify-between items-center text-[10px] text-[#707278]">
                  <span>TOTAL MEMORY</span>
                  <HardDrive size={12} className="text-[#3DDC84]" />
                </div>
                <div className="text-base font-bold text-[#3DDC84] mt-1">
                  {(profiler.memoryBreakdown.java + profiler.memoryBreakdown.native + profiler.memoryBreakdown.graphics).toFixed(1)} MB
                </div>
                <span className="text-[9px] text-[#707278]">Java Heap: {profiler.memoryBreakdown.java} MB</span>
              </div>

              <div className="p-2 bg-[#2B2D30] rounded border border-[#393B40]">
                <div className="flex justify-between items-center text-[10px] text-[#707278]">
                  <span>DISPLAY FPS</span>
                  <Activity size={12} className="text-[#e09f3e]" />
                </div>
                <div className="text-base font-bold text-[#DFE1E5] mt-1">
                  {profiler.fps} FPS
                </div>
                <span className="text-[9px] text-[#3DDC84]">0 dropped frames</span>
              </div>

              <div className="p-2 bg-[#2B2D30] rounded border border-[#393B40]">
                <div className="flex justify-between items-center text-[10px] text-[#707278]">
                  <span>ENERGY IMPACT</span>
                  <Layers size={12} className="text-[#3DDC84]" />
                </div>
                <div className="text-base font-bold text-[#3DDC84] mt-1">
                  Low ({profiler.batteryDrainPerHr}%/hr)
                </div>
                <span className="text-[9px] text-[#707278]">Zero wake locks held</span>
              </div>
            </div>

            {/* Live CPU Timeline Bar Graph */}
            <div className="bg-[#2B2D30] p-2.5 rounded border border-[#393B40]">
              <div className="flex justify-between text-[10px] text-[#707278] mb-1 font-mono">
                <span>REAL-TIME CPU HISTORY (LAST 30 SECONDS)</span>
                <span>Max: 100%</span>
              </div>
              <div className="h-14 flex items-end space-x-1.5 pt-2">
                {profiler.cpuHistory.map((val, idx) => (
                  <div key={idx} className="flex-1 bg-[#1E1F22] rounded-t h-full flex items-end">
                    <div
                      style={{ height: `${val}%` }}
                      className={`w-full rounded-t transition-all duration-300 ${
                        val > 50 ? 'bg-[#e09f3e]' : 'bg-[#3574F0]'
                      }`}
                      title={`Sample ${idx}: ${val}%`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Network Waterfall */}
            <div className="bg-[#2B2D30] p-2.5 rounded border border-[#393B40]">
              <span className="text-[10px] font-bold text-[#707278] uppercase font-mono block mb-2">
                NETWORK TRAFFIC INSPECTION (HTTP/WSS)
              </span>
              <div className="space-y-1">
                {profiler.networkRequests.map(req => (
                  <div key={req.id} className="flex items-center justify-between p-1 bg-[#1E1F22] rounded text-[11px] font-mono">
                    <div className="flex items-center space-x-2 truncate">
                      <span className="text-[#3574F0] font-bold">{req.method}</span>
                      <span className="text-[#DFE1E5] truncate">{req.url}</span>
                    </div>
                    <div className="flex items-center space-x-3 shrink-0 text-[#707278]">
                      <span className="text-[#3DDC84]">HTTP {req.status}</span>
                      <span>{req.durationMs}ms</span>
                      <span>{req.sizeKb} KB</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB: PROBLEMS */}
        {activeTab === 'problems' && (
          <div className="flex-1 overflow-y-auto p-3 space-y-2 text-xs">
            <div className="p-2.5 bg-[#2B2D30] rounded border border-[#393B40] flex items-start space-x-2">
              <AlertTriangle size={14} className="text-[#e09f3e] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#DFE1E5]">Unused imported parameter in student.ts (Line 14)</span>
                <p className="text-[#707278] text-[11px]">Parameter 'guardianEmail' is declared but never read in domain mapper.</p>
                <div className="mt-1 flex items-center space-x-2 font-mono text-[10px]">
                  <span className="text-[#3574F0]">core/student.ts:14:5</span>
                  <span className="text-[#707278]">• Rule: @typescript-eslint/no-unused-vars</span>
                </div>
              </div>
            </div>

            <div className="p-2.5 bg-[#2B2D30] rounded border border-[#393B40] flex items-start space-x-2">
              <AlertTriangle size={14} className="text-[#e09f3e] shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-[#DFE1E5]">Missing platform-specific proguard rule for biometric auth</span>
                <p className="text-[#707278] text-[11px]">Keep rule '-keep class androidx.biometric.**' suggested for R8 release shrinking.</p>
                <div className="mt-1 flex items-center space-x-2 font-mono text-[10px]">
                  <span className="text-[#3574F0]">android/proguard-rules.pro:8</span>
                  <span className="text-[#707278]">• Lint: AndroidR8Rules</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB: BUILD OUTPUT */}
        {activeTab === 'build' && (
          <div className="flex-1 overflow-y-auto p-3 font-mono text-xs space-y-1 text-[#BCBEC4]">
            <div className="text-[#707278]">Starting Droz Build Engine v2026.2...</div>
            <div>[14:20:00] &gt; Executing multi-platform build graph across 6 targets...</div>
            <div className="text-[#3DDC84]">[14:20:01] ✓ Target [Android]: Gradle 8.9 assembleRelease produced app-release.apk (18.4 MB)</div>
            <div className="text-[#3DDC84]">[14:20:01] ✓ Target [Windows]: MSIX packager created SchoolSphere_x64.msix (24.1 MB)</div>
            <div className="text-[#3DDC84]">[14:20:02] ✓ Target [iOS]: Xcodebuild produced SchoolSphere.ipa (21.8 MB)</div>
            <div className="text-[#3DDC84]">[14:20:02] ✓ Target [macOS]: Universal binary signed (Apple Notarized)</div>
            <div className="text-[#3DDC84]">[14:20:02] ✓ Target [Linux]: AppImage runtime generated (31.2 MB)</div>
            <div className="text-[#3DDC84]">[14:20:02] ✓ Target [Web]: Vite production bundle optimized (gzip: 184 KB)</div>
            <div className="text-[#3DDC84] font-bold pt-2 border-t border-[#393B40]">
              ✓ ALL PLATFORM TARGETS COMPILED & READY FOR DEPLOYMENT.
            </div>
          </div>
        )}

        {/* TAB: DEBUG CONSOLE */}
        {activeTab === 'debug' && (
          <div className="flex-1 flex flex-col p-2 bg-[#18181A] overflow-hidden">
            <div className="flex-1 overflow-y-auto space-y-1 font-mono text-xs text-[#BCBEC4]">
              {debugLogs.map((log, idx) => (
                <div key={idx} className={log.startsWith('>') ? 'text-[#3574F0] font-bold' : ''}>
                  {log}
                </div>
              ))}
            </div>

            <form onSubmit={handleDebugEval} className="flex items-center space-x-2 pt-1 border-t border-[#393B40]">
              <span className="text-[#3574F0] font-bold">eval&gt;</span>
              <input
                type="text"
                placeholder="Evaluate expression (e.g. student.fullName, calculateGPA([]))..."
                value={debugInput}
                onChange={e => setDebugInput(e.target.value)}
                className="flex-1 bg-transparent text-[#DFE1E5] focus:outline-none text-xs font-mono"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
