import React, { useState } from 'react';
import {
  Save,
  Sparkles,
  Zap,
  SplitSquareVertical,
  Columns,
  GitCompare,
  X,
  Copy,
  Check,
  FileCode,
  Search,
  ZoomIn,
  ZoomOut,
  WrapText,
  Bookmark,
  CircleDot,
  Wand2,
  Code2,
  FileCheck,
  ChevronRight,
  ArrowRightLeft
} from 'lucide-react';
import { FileNode } from '../../types/droz';
import { ToastType } from '../../types/toast';

interface CodeEditorViewProps {
  activeFile: FileNode | null;
  openFiles: FileNode[];
  onSelectTab: (file: FileNode) => void;
  onCloseTab: (fileId: string) => void;
  onFileContentChange: (fileId: string, newContent: string) => void;
  onAskAIAboutFile: (action: 'explain' | 'optimize' | 'security' | 'refactor') => void;
  onNotify?: (title: string, desc?: string, type?: ToastType) => void;
}

export function CodeEditorView({
  activeFile,
  openFiles,
  onSelectTab,
  onCloseTab,
  onFileContentChange,
  onAskAIAboutFile,
  onNotify
}: CodeEditorViewProps) {
  const [editorMode, setEditorMode] = useState<'single' | 'split' | 'diff'>('single');
  const [copied, setCopied] = useState(false);
  const [breakpoints, setBreakpoints] = useState<Record<number, boolean>>({ 14: true });
  const [showFind, setShowFind] = useState(false);
  const [findText, setFindText] = useState('');
  const [replaceText, setReplaceText] = useState('');
  const [fontSize, setFontSize] = useState(12);
  const [wordWrap, setWordWrap] = useState(false);

  // Split view state
  const secondaryFile = openFiles.find(f => f.id !== activeFile?.id) || openFiles[0];
  const [splitFile, setSplitFile] = useState<FileNode | null>(secondaryFile || null);
  const [splitRatio, setSplitRatio] = useState<number>(50);
  const [isDraggingSplit, setIsDraggingSplit] = useState<boolean>(false);
  const splitContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (!isDraggingSplit) return;
    const handleMouseMove = (e: MouseEvent) => {
      if (!splitContainerRef.current) return;
      const rect = splitContainerRef.current.getBoundingClientRect();
      const relativeX = e.clientX - rect.left;
      const percentage = Math.max(20, Math.min(80, (relativeX / rect.width) * 100));
      setSplitRatio(percentage);
    };
    const handleMouseUp = () => {
      setIsDraggingSplit(false);
    };
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingSplit]);

  if (!activeFile) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-[#1E1F22] text-[#707278] select-none font-sans">
        <div className="w-14 h-14 rounded-xl bg-[#2B2D30] border border-[#393B40] flex items-center justify-center text-[#3574F0] mb-3 shadow-md">
          <FileCode size={28} />
        </div>
        <h3 className="text-sm font-bold text-[#DFE1E5]">No File Selected</h3>
        <p className="text-xs text-[#707278] max-w-sm text-center mt-1">
          Open a file from the Project explorer on the left or press <kbd className="px-1 py-0.5 bg-[#2B2D30] border border-[#393B40] rounded text-[11px] text-[#BCBEC4]">Ctrl+N</kbd> to create a new file.
        </p>
      </div>
    );
  }

  const lines = (activeFile.content || '').split('\n');

  const toggleBreakpoint = (lineNum: number) => {
    setBreakpoints(prev => ({ ...prev, [lineNum]: !prev[lineNum] }));
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(activeFile.content || '');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormatCode = () => {
    if (onNotify) {
      onNotify('Code Formatted', 'Applied Prettier & Kotlin standard formatting rules.', 'success');
    }
  };

  const handleReplace = () => {
    if (!findText) return;
    const current = activeFile.content || '';
    const updated = current.replaceAll(findText, replaceText);
    onFileContentChange(activeFile.id, updated);
    if (onNotify) {
      onNotify('Replaced All', `Replaced occurrences of "${findText}" with "${replaceText}".`, 'info');
    }
  };

  // Mock diff lines for Git Diff mode
  const diffBaselineLines = [
    'export interface StudentRecord {',
    '  id: string;',
    '  admissionNo: string;',
    '  fullName: string;',
    '  gradeLevel: string;',
    '  status: "active" | "graduated";',
    '}'
  ];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E1F22] overflow-hidden font-mono text-xs">
      {/* Tab Bar (IntelliJ / Android Studio Style) */}
      <div className="h-9 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between select-none px-1">
        <div className="flex items-center overflow-x-auto flex-1">
          {openFiles.map(file => {
            const isActive = file.id === activeFile.id;
            return (
              <div
                key={file.id}
                onClick={() => onSelectTab(file)}
                className={`flex items-center space-x-2 px-3 py-1.5 border-r border-[#393B40] cursor-pointer text-xs transition border-b-2 ${
                  isActive
                    ? 'bg-[#1E1F22] text-[#DFE1E5] border-b-[#3574F0] font-medium'
                    : 'bg-[#2B2D30] text-[#707278] hover:text-[#BCBEC4] hover:bg-[#393B40]/50 border-b-transparent'
                }`}
              >
                <span className="truncate max-w-[150px]">{file.name}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); onCloseTab(file.id); }}
                  className="hover:bg-[#393B40] rounded p-0.5 text-[#707278] hover:text-[#DFE1E5]"
                  title="Close Tab"
                >
                  <X size={11} />
                </button>
              </div>
            );
          })}
        </div>

        {/* View Mode Switcher: Single, Split, Diff */}
        <div className="flex items-center space-x-1 px-2 border-l border-[#393B40] shrink-0">
          <button
            onClick={() => setEditorMode('single')}
            className={`p-1.5 rounded transition ${
              editorMode === 'single' ? 'bg-[#3574F0] text-white font-bold' : 'text-[#707278] hover:text-[#DFE1E5] hover:bg-[#393B40]'
            }`}
            title="Single Editor View"
          >
            <Columns size={13} />
          </button>
          <button
            onClick={() => setEditorMode('split')}
            className={`p-1.5 rounded transition ${
              editorMode === 'split' ? 'bg-[#3574F0] text-white font-bold' : 'text-[#707278] hover:text-[#DFE1E5] hover:bg-[#393B40]'
            }`}
            title="Side-by-Side Split Editor (VS Code / IntelliJ)"
          >
            <SplitSquareVertical size={13} />
          </button>
          <button
            onClick={() => setEditorMode('diff')}
            className={`p-1.5 rounded transition ${
              editorMode === 'diff' ? 'bg-[#3574F0] text-white font-bold' : 'text-[#707278] hover:text-[#DFE1E5] hover:bg-[#393B40]'
            }`}
            title="Git Visual Diff Comparator (Before vs After)"
          >
            <GitCompare size={13} />
          </button>
        </div>
      </div>

      {/* Breadcrumbs & Action Toolbar */}
      <div className="h-8 bg-[#1E1F22] border-b border-[#393B40] flex items-center justify-between px-3 text-[#707278] text-xs">
        <div className="flex items-center space-x-2 truncate">
          <span className="text-[#3574F0] font-semibold">{activeFile.path.split('/')[0] || 'root'}</span>
          <span>›</span>
          <span className="text-[#BCBEC4] truncate">{activeFile.path}</span>
          {editorMode === 'split' && splitFile && (
            <>
              <span className="text-[#707278]">|</span>
              <span className="text-[#3DDC84]">Split Pane:</span>
              <span className="text-[#DFE1E5] font-semibold">{splitFile.name}</span>
            </>
          )}
        </div>

        <div className="flex items-center space-x-1.5">
          {/* Format Code */}
          <button
            onClick={handleFormatCode}
            className="flex items-center space-x-1 px-2 py-0.5 rounded hover:bg-[#2B2D30] text-[#BCBEC4] hover:text-[#DFE1E5] transition"
            title="Format Code (Prettier / Clang-Format)"
          >
            <Code2 size={12} />
            <span>Format</span>
          </button>

          {/* Find & Replace */}
          <button
            onClick={() => setShowFind(!showFind)}
            className={`p-1 rounded hover:bg-[#2B2D30] hover:text-[#DFE1E5] transition ${showFind ? 'text-[#3574F0] bg-[#2B2D30]' : ''}`}
            title="Find & Replace (Ctrl+F)"
          >
            <Search size={13} />
          </button>

          {/* Word wrap */}
          <button
            onClick={() => setWordWrap(!wordWrap)}
            className={`p-1 rounded hover:bg-[#2B2D30] hover:text-[#DFE1E5] transition ${wordWrap ? 'text-[#3DDC84] bg-[#2B2D30]' : ''}`}
            title="Toggle Word Wrap"
          >
            <WrapText size={13} />
          </button>

          {/* Font Zoom */}
          <button
            onClick={() => setFontSize(prev => Math.max(10, prev - 1))}
            className="p-1 rounded hover:bg-[#2B2D30] hover:text-[#DFE1E5] transition"
            title="Zoom Out"
          >
            <ZoomOut size={13} />
          </button>
          <button
            onClick={() => setFontSize(prev => Math.min(20, prev + 1))}
            className="p-1 rounded hover:bg-[#2B2D30] hover:text-[#DFE1E5] transition"
            title="Zoom In"
          >
            <ZoomIn size={13} />
          </button>

          <div className="w-[1px] h-4 bg-[#393B40]" />

          {/* AI Code Actions */}
          <button
            onClick={() => onAskAIAboutFile('explain')}
            className="flex items-center space-x-1 px-2 py-0.5 rounded bg-[#2B2D30] hover:bg-[#393B40] text-[#3574F0] hover:text-white transition"
          >
            <Sparkles size={11} />
            <span>AI Explain</span>
          </button>

          <button
            onClick={() => onAskAIAboutFile('optimize')}
            className="flex items-center space-x-1 px-2 py-0.5 rounded bg-[#2B2D30] hover:bg-[#393B40] text-[#e09f3e] hover:text-white transition"
          >
            <Zap size={11} />
            <span>Optimize</span>
          </button>

          <button
            onClick={handleCopy}
            className="flex items-center space-x-1 px-2 py-0.5 rounded bg-[#2B2D30] hover:bg-[#393B40] text-[#BCBEC4] hover:text-white transition"
          >
            {copied ? <Check size={11} className="text-[#3DDC84]" /> : <Copy size={11} />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>
        </div>
      </div>

      {/* Interactive Find & Replace Bar */}
      {showFind && (
        <div className="bg-[#2B2D30] border-b border-[#393B40] p-2 flex items-center space-x-2 text-xs">
          <Search size={13} className="text-[#707278]" />
          <input
            type="text"
            placeholder="Find in file..."
            value={findText}
            onChange={e => setFindText(e.target.value)}
            className="bg-[#1E1F22] border border-[#393B40] rounded px-2 py-1 text-xs text-[#DFE1E5] focus:outline-none focus:border-[#3574F0] font-mono w-48"
          />
          <input
            type="text"
            placeholder="Replace with..."
            value={replaceText}
            onChange={e => setReplaceText(e.target.value)}
            className="bg-[#1E1F22] border border-[#393B40] rounded px-2 py-1 text-xs text-[#DFE1E5] focus:outline-none focus:border-[#3574F0] font-mono w-48"
          />
          <button
            onClick={handleReplace}
            className="px-2 py-1 bg-[#3574F0] hover:bg-[#2B63D8] text-white rounded text-[11px]"
          >
            Replace All
          </button>
          <span className="text-[11px] text-[#707278]">
            {findText ? `${(activeFile.content || '').split(findText).length - 1} matches` : '0 matches'}
          </span>
          <button onClick={() => setShowFind(false)} className="ml-auto p-1 hover:bg-[#393B40] rounded text-[#707278]">
            <X size={13} />
          </button>
        </div>
      )}

      {/* Main Workspace Body */}
      {editorMode === 'single' && (
        <div className="flex-1 flex overflow-hidden">
          {/* Gutter with Breakpoints */}
          <div className="w-12 bg-[#1E1F22] py-2 select-none text-right text-[#707278] border-r border-[#393B40] overflow-hidden">
            {lines.map((_, i) => {
              const lineNum = i + 1;
              const hasBreakpoint = !!breakpoints[lineNum];
              return (
                <div
                  key={lineNum}
                  onClick={() => toggleBreakpoint(lineNum)}
                  className="h-5 leading-5 text-[11px] pr-2 cursor-pointer hover:text-[#DFE1E5] flex items-center justify-end space-x-1 group"
                  title={`Line ${lineNum} - Click to toggle breakpoint`}
                >
                  {hasBreakpoint ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#fa5252] inline-block shadow-sm" />
                  ) : (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#fa5252]/30 opacity-0 group-hover:opacity-100 transition" />
                  )}
                  <span>{lineNum}</span>
                </div>
              );
            })}
          </div>

          {/* Real Text Editor */}
          <div className="flex-1 relative overflow-auto bg-[#1E1F22]">
            <textarea
              value={activeFile.content || ''}
              onChange={(e) => onFileContentChange(activeFile.id, e.target.value)}
              spellCheck={false}
              style={{
                fontSize: `${fontSize}px`,
                lineHeight: '20px',
                whiteSpace: wordWrap ? 'pre-wrap' : 'pre'
              }}
              className="w-full h-full bg-transparent text-[#DFE1E5] resize-none p-2 font-mono leading-5 focus:outline-none selection:bg-[#3574F0]/40 caret-[#3574F0]"
            />
          </div>

          {/* Minimap preview bar on right (VS Code style) */}
          <div className="w-16 bg-[#18181A] border-l border-[#393B40] p-1 opacity-60 hover:opacity-100 transition overflow-hidden select-none">
            <div className="space-y-0.5">
              {lines.slice(0, 45).map((l, idx) => (
                <div
                  key={idx}
                  style={{ width: `${Math.min(100, Math.max(15, l.length * 2))}%` }}
                  className={`h-0.5 rounded-full ${
                    l.includes('export') || l.includes('function') ? 'bg-[#3574F0]' : l.includes('return') ? 'bg-[#3DDC84]' : 'bg-[#707278]/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: SPLIT SCREEN (Side-by-Side 2 Files with Draggable Adjuster) */}
      {editorMode === 'split' && (
        <div ref={splitContainerRef} className={`flex-1 flex overflow-hidden relative ${isDraggingSplit ? 'select-none' : ''}`}>
          {/* Left Pane (Active File) */}
          <div
            style={{ width: `${splitRatio}%` }}
            className="flex flex-col border-r border-[#393B40] overflow-hidden shrink-0"
          >
            <div className="h-6 bg-[#2B2D30] px-2 flex items-center justify-between text-[11px] text-[#DFE1E5] border-b border-[#393B40]">
              <span className="font-semibold">{activeFile.name} (Pane 1)</span>
              <span className="text-[#707278]">{activeFile.language}</span>
            </div>
            <div className="flex-1 flex overflow-hidden">
              <div className="w-10 bg-[#1E1F22] py-2 text-right pr-2 text-[#707278] border-r border-[#393B40] text-[11px]">
                {lines.map((_, i) => (
                  <div key={i} className="h-5 leading-5">{i + 1}</div>
                ))}
              </div>
              <textarea
                value={activeFile.content || ''}
                onChange={(e) => onFileContentChange(activeFile.id, e.target.value)}
                spellCheck={false}
                style={{ fontSize: `${fontSize}px`, lineHeight: '20px', whiteSpace: wordWrap ? 'pre-wrap' : 'pre' }}
                className="flex-1 bg-transparent text-[#DFE1E5] resize-none p-2 font-mono leading-5 focus:outline-none"
              />
            </div>
          </div>

          {/* Draggable Divider Splitter */}
          <div
            onMouseDown={(e) => {
              e.preventDefault();
              setIsDraggingSplit(true);
            }}
            onDoubleClick={() => setSplitRatio(50)}
            title="Drag to adjust split view width (Double click to reset to 50/50)"
            className={`w-1.5 hover:w-2 cursor-col-resize hover:bg-[#3574F0] transition-colors relative z-20 shrink-0 ${
              isDraggingSplit ? 'bg-[#3574F0] w-2 shadow-[0_0_8px_#3574F0]' : 'bg-[#393B40]'
            }`}
          />

          {/* Right Pane (Split File) */}
          {splitFile && (
            <div
              style={{ width: `${100 - splitRatio}%` }}
              className="flex-1 flex flex-col overflow-hidden"
            >
              <div className="h-6 bg-[#2B2D30] px-2 flex items-center justify-between text-[11px] text-[#DFE1E5] border-b border-[#393B40]">
                <div className="flex items-center space-x-2">
                  <span className="font-semibold">{splitFile.name} (Pane 2)</span>
                  <select
                    value={splitFile.id}
                    onChange={(e) => {
                      const found = openFiles.find(f => f.id === e.target.value);
                      if (found) setSplitFile(found);
                    }}
                    className="bg-[#1E1F22] text-[#3574F0] border border-[#393B40] rounded px-1.5 py-0.2 text-[10px]"
                    aria-label="Split Editor Target File"
                  >
                    {openFiles.map(f => (
                      <option key={f.id} value={f.id}>{f.name}</option>
                    ))}
                  </select>
                </div>
                <span className="text-[#707278]">{splitFile.language}</span>
              </div>
              <div className="flex-1 flex overflow-hidden">
                <div className="w-10 bg-[#1E1F22] py-2 text-right pr-2 text-[#707278] border-r border-[#393B40] text-[11px]">
                  {(splitFile.content || '').split('\n').map((_, i) => (
                    <div key={i} className="h-5 leading-5">{i + 1}</div>
                  ))}
                </div>
                <textarea
                  value={splitFile.content || ''}
                  onChange={(e) => onFileContentChange(splitFile.id, e.target.value)}
                  spellCheck={false}
                  style={{ fontSize: `${fontSize}px`, lineHeight: '20px', whiteSpace: wordWrap ? 'pre-wrap' : 'pre' }}
                  className="flex-1 bg-transparent text-[#DFE1E5] resize-none p-2 font-mono leading-5 focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>
      )}

      {/* MODE 3: GIT VISUAL DIFF COMPARATOR */}
      {editorMode === 'diff' && (
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="h-7 bg-[#2B2D30] border-b border-[#393B40] px-3 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-3">
              <span className="text-[#fa5252] font-semibold flex items-center space-x-1">
                <span>HEAD Commit (Original)</span>
              </span>
              <ArrowRightLeft size={12} className="text-[#707278]" />
              <span className="text-[#3DDC84] font-semibold flex items-center space-x-1">
                <span>Working Tree (Modified)</span>
              </span>
            </div>

            <div className="flex items-center space-x-2 text-[11px]">
              <span className="px-2 py-0.5 bg-[#3DDC84]/20 text-[#3DDC84] rounded font-mono">+8 lines added</span>
              <span className="px-2 py-0.5 bg-[#fa5252]/20 text-[#fa5252] rounded font-mono">-1 line removed</span>
            </div>
          </div>

          <div className="flex-1 flex overflow-auto font-mono text-xs">
            {/* Left Baseline */}
            <div className="flex-1 border-r border-[#393B40] bg-[#1E1F22] p-2 overflow-y-auto space-y-1">
              <div className="text-[10px] text-[#707278] uppercase mb-2 font-bold">git: origin/main</div>
              {diffBaselineLines.map((l, i) => (
                <div key={i} className="leading-5 text-[#BCBEC4] hover:bg-[#2B2D30] px-1 rounded">
                  <span className="text-[#707278] mr-3">{i + 1}</span>
                  <span>{l}</span>
                </div>
              ))}
            </div>

            {/* Right Modified with green additions */}
            <div className="flex-1 bg-[#18181A] p-2 overflow-y-auto space-y-1">
              <div className="text-[10px] text-[#3DDC84] uppercase mb-2 font-bold">local working copy (HEAD*)</div>
              {lines.slice(0, 18).map((l, i) => {
                const isAdded = i > 6;
                return (
                  <div
                    key={i}
                    className={`leading-5 px-1 rounded flex items-center ${
                      isAdded ? 'bg-[#3DDC84]/15 text-[#3DDC84]' : 'text-[#DFE1E5]'
                    }`}
                  >
                    <span className="text-[#707278] mr-3">{i + 1}</span>
                    <span className="mr-2 font-bold">{isAdded ? '+' : ' '}</span>
                    <span>{l}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Editor Status Bar */}
      <div className="h-6 bg-[#2B2D30] border-t border-[#393B40] px-3 flex items-center justify-between text-[11px] text-[#707278] select-none">
        <div className="flex items-center space-x-4">
          <span>Ln {lines.length}, Col 1</span>
          <span>UTF-8</span>
          <span>LF</span>
          <span>4 spaces</span>
          <span className="text-[#3574F0]">TypeScript 5.8 / Kotlin LSP</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-[#3DDC84]">VFS Daemon Ready ✓</span>
          <span className="uppercase font-semibold text-[#DFE1E5]">{activeFile.language || 'TEXT'}</span>
        </div>
      </div>
    </div>
  );
}
