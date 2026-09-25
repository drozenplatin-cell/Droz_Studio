import React, { useState } from 'react';
import {
  Play,
  Hammer,
  Bug,
  GitBranch,
  Search,
  Settings,
  Bot,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  ChevronDown,
  Monitor,
  Smartphone,
  Layers,
  Palette
} from 'lucide-react';
import { PlatformTarget } from '../../types/droz';
import { ToastType } from '../../types/toast';

interface HeaderBarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  activePlatform: PlatformTarget;
  setActivePlatform: (p: PlatformTarget) => void;
  onOpenCommandCenter: () => void;
  onOpenNewProject: () => void;
  onRunActiveTarget: () => void;
  onBuildAll: () => void;
  onRunAllTests: () => void;
  testStats: { total: number; passed: number; failed: number; skipped: number };
  aiModel: string;
  setAiModel: (model: string) => void;
  theme: string;
  setTheme: (theme: string) => void;
  onOpenNewFileDialog: () => void;
  onNotify?: (title: string, desc?: string, type?: ToastType) => void;
}

export function HeaderBar({
  activeView,
  setActiveView,
  activePlatform,
  setActivePlatform,
  onOpenCommandCenter,
  onOpenNewProject,
  onRunActiveTarget,
  onBuildAll,
  onRunAllTests,
  testStats,
  aiModel,
  setAiModel,
  theme,
  setTheme,
  onOpenNewFileDialog,
  onNotify
}: HeaderBarProps) {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const notify = (title: string, desc?: string, type: ToastType = 'info') => {
    if (onNotify) {
      onNotify(title, desc, type);
    }
  };

  const menus: Record<string, { label: string; action: () => void; shortcut?: string; divider?: boolean }[]> = {
    File: [
      { label: 'New Project...', action: onOpenNewProject, shortcut: 'Ctrl+N' },
      { label: 'New File...', action: onOpenNewFileDialog, shortcut: 'Alt+Insert' },
      { label: 'Open Workspace...', action: () => notify('Workspace Loaded', 'Folder: SchoolSphere_Universal loaded cleanly into VFS.', 'info'), shortcut: 'Ctrl+O' },
      { label: 'divider', action: () => {}, divider: true },
      { label: 'Save All', action: () => notify('Workspace Saved', 'All files synchronized to local virtual disk.', 'success'), shortcut: 'Ctrl+S' },
      {
        label: 'Export Project Bundle (ZIP)',
        action: () => {
          const zipManifest = `# Droz_Future_Project Archive\nGenerated on: ${new Date().toISOString()}\nTarget: SchoolSphere_Universal (All Platforms)`;
          const blob = new Blob([zipManifest], { type: 'application/zip' });
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'SchoolSphere_Universal_Project.zip';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);
          notify('Export Completed', 'Full workspace archive downloaded as SchoolSphere_Universal_Project.zip', 'success');
        },
        shortcut: 'Ctrl+Shift+E'
      }
    ],
    Edit: [
      { label: 'Undo', action: () => {}, shortcut: 'Ctrl+Z' },
      { label: 'Redo', action: () => {}, shortcut: 'Ctrl+Y' },
      { label: 'divider', action: () => {}, divider: true },
      { label: 'Find in Files...', action: onOpenCommandCenter, shortcut: 'Ctrl+Shift+F' },
      { label: 'AI Optimize Code', action: () => setActiveView('editor') }
    ],
    View: [
      { label: 'Project Explorer', action: () => setActiveView('editor'), shortcut: 'Alt+1' },
      { label: 'Visual UI Designer', action: () => setActiveView('visual-ui') },
      { label: 'Database Studio', action: () => setActiveView('database') },
      { label: 'API Studio', action: () => setActiveView('api') },
      { label: 'divider', action: () => {}, divider: true },
      { label: 'Device Lab (ADB & Emulators)', action: () => setActiveView('devices') },
      { label: 'Extensions Marketplace', action: () => setActiveView('extensions'), shortcut: 'Ctrl+Shift+X' },
      { label: 'Testing Center', action: () => setActiveView('tests') },
      { label: 'Security & Profiler', action: () => setActiveView('security') },
      { label: 'Technical Architecture (27 Pillars)', action: () => setActiveView('architecture') },
      { label: 'Project Health Dashboard', action: () => setActiveView('health') }
    ],
    Build: [
      { label: 'Build Project (All Targets)', action: onBuildAll, shortcut: 'Ctrl+F9' },
      { label: 'Build Android APK / AAB (Gradle)', action: () => { setActivePlatform('android'); setActiveView('build'); } },
      { label: 'Build Windows (MSIX / WinUI)', action: () => { setActivePlatform('windows'); setActiveView('build'); } },
      { label: 'Build iOS IPA (Xcodebuild)', action: () => { setActivePlatform('ios'); setActiveView('build'); } },
      { label: 'Build macOS DMG (Clang / Swift)', action: () => { setActivePlatform('macos'); setActiveView('build'); } },
      { label: 'Build Linux (AppImage)', action: () => { setActivePlatform('linux'); setActiveView('build'); } },
      { label: 'Build Web Bundle (Vite Production)', action: () => { setActivePlatform('web'); setActiveView('build'); } }
    ],
    Run: [
      { label: `Run 'app' on ${activePlatform.toUpperCase()}`, action: onRunActiveTarget, shortcut: 'Shift+F10' },
      { label: `Debug 'app' on ${activePlatform.toUpperCase()}`, action: () => setActiveView('debug'), shortcut: 'Shift+F9' },
      { label: 'Run All Tests (Unit, Integration, UI)', action: onRunAllTests, shortcut: 'Ctrl+Shift+F10' }
    ],
    Git: [
      { label: 'Commit...', action: () => setActiveView('git'), shortcut: 'Ctrl+K' },
      { label: 'Push...', action: () => setActiveView('git'), shortcut: 'Ctrl+Shift+K' },
      { label: 'Update Project (Pull / Rebase)...', action: () => setActiveView('git'), shortcut: 'Ctrl+T' },
      { label: 'Branches...', action: () => setActiveView('git') }
    ],
    Tools: [
      { label: 'Droz AI Agent (14-Step Supervised Pipeline)', action: () => {} },
      { label: 'Security SAST Vulnerability Scanner', action: () => setActiveView('security') },
      { label: 'Database Schema Migration Tool', action: () => setActiveView('database') },
      { label: 'OpenAPI 3.1 Spec Generator', action: () => setActiveView('api') }
    ]
  };

  return (
    <header className="h-10 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-3 z-30 select-none text-xs text-[#BCBEC4]">
      {/* Left: Brand + Standard IntelliJ Menu Bar */}
      <div className="flex items-center space-x-3">
        {/* Android Studio style logo mark */}
        <div className="flex items-center space-x-2 mr-1">
          <div className="w-6 h-6 rounded-md bg-[#3DDC84] flex items-center justify-center text-[#1E1F22] font-black text-xs font-mono shadow-sm">
            DZ
          </div>
          <span className="font-semibold text-sm text-[#DFE1E5] tracking-tight">Droz Studio</span>
          <span className="text-[10px] bg-[#1E1F22] text-[#3DDC84] border border-[#393B40] px-1.5 py-0.2 rounded font-mono font-medium">
            2026.2
          </span>
        </div>

        {/* IDE Top Menus */}
        <nav className="flex items-center space-x-0.5 relative">
          {Object.keys(menus).map((menuName) => (
            <div key={menuName} className="relative">
              <button
                onClick={() => setActiveMenu(activeMenu === menuName ? null : menuName)}
                onMouseEnter={() => { if (activeMenu) setActiveMenu(menuName); }}
                className={`px-2 py-1 rounded text-[#BCBEC4] hover:text-[#DFE1E5] hover:bg-[#393B40] transition-colors ${activeMenu === menuName ? 'bg-[#3574F0] text-white font-medium' : ''}`}
              >
                {menuName}
              </button>

              {activeMenu === menuName && (
                <div
                  className="absolute top-full left-0 mt-0.5 w-64 bg-[#2B2D30] border border-[#393B40] rounded-md shadow-2xl py-1 z-50 text-xs text-[#DFE1E5]"
                  onMouseLeave={() => setActiveMenu(null)}
                >
                  {menus[menuName].map((item, idx) => (
                    item.divider ? (
                      <div key={idx} className="my-1 border-t border-[#393B40]" />
                    ) : (
                      <button
                        key={idx}
                        onClick={() => { item.action(); setActiveMenu(null); }}
                        className="w-full text-left px-3 py-1.5 hover:bg-[#3574F0] hover:text-white flex items-center justify-between transition-colors"
                      >
                        <span>{item.label}</span>
                        {item.shortcut && (
                          <span className="font-mono text-[10px] text-[#707278] group-hover:text-white">
                            {item.shortcut}
                          </span>
                        )}
                      </button>
                    )
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>
      </div>

      {/* Middle: Android Studio Standard Run/Debug/Target Bar */}
      <div className="flex items-center space-x-1.5 bg-[#1E1F22] border border-[#393B40] px-2 py-1 rounded-md">
        {/* Project Module dropdown */}
        <div className="flex items-center space-x-1 px-1.5 text-xs text-[#DFE1E5] font-mono">
          <span className="text-[#707278]">app:</span>
          <select
            value={activePlatform}
            onChange={(e) => setActivePlatform(e.target.value as PlatformTarget)}
            aria-label="Build & Run Target Platform"
            className="bg-transparent text-[#3DDC84] font-semibold focus:outline-none cursor-pointer text-xs"
          >
            <option value="android" className="bg-[#2B2D30] text-[#DFE1E5]">Android (Pixel 9 / Redmi 15)</option>
            <option value="windows" className="bg-[#2B2D30] text-[#DFE1E5]">Windows 11 (MSIX / WinUI)</option>
            <option value="ios" className="bg-[#2B2D30] text-[#DFE1E5]">iOS (iPhone 16 Pro Sim)</option>
            <option value="macos" className="bg-[#2B2D30] text-[#DFE1E5]">macOS (Universal DMG)</option>
            <option value="linux" className="bg-[#2B2D30] text-[#DFE1E5]">Linux (AppImage / Flatpak)</option>
            <option value="web" className="bg-[#2B2D30] text-[#DFE1E5]">Web (PWA / Vite Edge)</option>
          </select>
        </div>

        <div className="w-[1px] h-4 bg-[#393B40]" />

        {/* Real Android Studio Green Play Button */}
        <button
          onClick={onRunActiveTarget}
          title="Run 'app' (Shift+F10)"
          className="flex items-center space-x-1 px-2.5 py-1 bg-[#3DDC84] hover:bg-[#34c776] text-[#1E1F22] rounded font-bold transition shadow-sm"
        >
          <Play size={12} className="fill-[#1E1F22]" />
          <span>Run</span>
        </button>

        {/* Debug Button */}
        <button
          onClick={() => setActiveView('debug')}
          title="Debug 'app' (Shift+F9)"
          className="flex items-center space-x-1 px-2 py-1 bg-[#393B40] hover:bg-[#43454A] text-[#DFE1E5] rounded transition"
        >
          <Bug size={12} className="text-[#3DDC84]" />
          <span>Debug</span>
        </button>

        {/* Build Hammer */}
        <button
          onClick={onBuildAll}
          title="Build Project (Ctrl+F9)"
          className="flex items-center space-x-1 px-2 py-1 bg-[#393B40] hover:bg-[#43454A] text-[#DFE1E5] rounded transition"
        >
          <Hammer size={12} className="text-[#3574F0]" />
          <span>Build All</span>
        </button>
      </div>

      {/* Right: Search Everywhere, Tests status, AI Model, Theme Switcher */}
      <div className="flex items-center space-x-2">
        {/* Search Everywhere (Double Shift / Ctrl+K) */}
        <button
          onClick={onOpenCommandCenter}
          className="flex items-center space-x-1.5 px-2.5 py-1 bg-[#1E1F22] hover:bg-[#393B40] border border-[#393B40] rounded text-[#BCBEC4] hover:text-[#DFE1E5] transition"
          title="Search Everywhere (Double Shift or Ctrl+K)"
        >
          <Search size={12} className="text-[#707278]" />
          <span>Search</span>
          <kbd className="text-[10px] text-[#707278] bg-[#2B2D30] px-1 rounded border border-[#393B40]">
            Ctrl+K
          </kbd>
        </button>

        {/* Test Counter Pill */}
        <button
          onClick={onRunAllTests}
          title="Run All Tests"
          className="flex items-center space-x-1 px-2 py-1 bg-[#1E1F22] border border-[#393B40] rounded text-[11px] hover:border-[#3574F0] transition font-mono"
        >
          <CheckCircle2 size={12} className={testStats.failed > 0 ? "text-[#e09f3e]" : "text-[#3DDC84]"} />
          <span>Tests: <strong className="text-[#DFE1E5]">{testStats.total}</strong></span>
          <span className="text-[#3DDC84]">P:{testStats.passed}</span>
          {testStats.failed > 0 && <span className="text-[#fa5252]">F:{testStats.failed}</span>}
        </button>

        {/* Theme Chooser */}
        <div className="flex items-center space-x-1 bg-[#1E1F22] border border-[#393B40] px-2 py-1 rounded text-xs">
          <Palette size={12} className="text-[#707278]" />
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            aria-label="IDE Theme"
            className="bg-transparent text-[11px] text-[#DFE1E5] focus:outline-none cursor-pointer"
          >
            <option value="android-studio-dark" className="bg-[#2B2D30]">Android Studio (New UI Dark)</option>
            <option value="darcula-classic" className="bg-[#2B2D30]">Android Studio Darcula Classic</option>
            <option value="obsidian-contrast" className="bg-[#2B2D30]">JetBrains Obsidian Contrast</option>
          </select>
        </div>

        {/* AI Model provider */}
        <div className="flex items-center space-x-1 bg-[#1E1F22] border border-[#393B40] px-2 py-1 rounded text-xs font-mono text-[11px]">
          <Bot size={12} className="text-[#3574F0]" />
          <select
            value={aiModel}
            onChange={(e) => setAiModel(e.target.value)}
            aria-label="AI Intelligence Provider"
            className="bg-transparent text-[#3574F0] font-semibold focus:outline-none cursor-pointer"
          >
            <option value="gemini-3.8-flash" className="bg-[#2B2D30] text-[#DFE1E5]">Gemini 3.8 Flash</option>
            <option value="gemini-3.1-pro-preview" className="bg-[#2B2D30] text-[#DFE1E5]">Gemini 3.1 Pro</option>
            <option value="local-offline" className="bg-[#2B2D30] text-[#DFE1E5]">Local Offline Core</option>
          </select>
        </div>
      </div>
    </header>
  );
}
