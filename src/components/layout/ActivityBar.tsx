import React from 'react';
import {
  FolderTree,
  Layout,
  Database,
  Globe,
  Hammer,
  Smartphone,
  Bug,
  CheckCircle2,
  ShieldCheck,
  GitBranch,
  BookOpen,
  HeartPulse,
  Settings,
  Bot,
  Boxes
} from 'lucide-react';

interface ActivityBarProps {
  activeView: string;
  setActiveView: (view: string) => void;
  showAiSidebar: boolean;
  setShowAiSidebar: (show: boolean) => void;
  failedTestCount: number;
  securityWarningCount: number;
}

export function ActivityBar({
  activeView,
  setActiveView,
  showAiSidebar,
  setShowAiSidebar,
  failedTestCount,
  securityWarningCount
}: ActivityBarProps) {
  const topNavItems = [
    { id: 'editor', label: 'Project Explorer (Alt+1)', icon: FolderTree },
    { id: 'visual-ui', label: 'Visual UI Designer', icon: Layout },
    { id: 'database', label: 'Database Studio', icon: Database },
    { id: 'api', label: 'API Studio', icon: Globe },
    { id: 'build', label: 'Build & Releases', icon: Hammer },
    { id: 'devices', label: 'Device Lab (ADB & Emulators)', icon: Smartphone },
    { id: 'debug', label: 'Debugger (Shift+F9)', icon: Bug },
    { id: 'tests', label: 'Testing Center', icon: CheckCircle2, badge: failedTestCount > 0 ? failedTestCount : undefined, badgeColor: 'bg-[#fa5252]' },
    { id: 'security', label: 'Security & Performance Profiler', icon: ShieldCheck, badge: securityWarningCount > 0 ? securityWarningCount : undefined, badgeColor: 'bg-[#e09f3e]' },
    { id: 'git', label: 'Git Version Control (Alt+9)', icon: GitBranch },
    { id: 'extensions', label: 'Extensions Marketplace (Ctrl+Shift+X)', icon: Boxes },
    { id: 'architecture', label: 'Technical Architecture (27 Pillars)', icon: BookOpen },
    { id: 'health', label: 'Project Health Dashboard', icon: HeartPulse }
  ];

  return (
    <aside className="w-12 bg-[#18181A] border-r border-[#393B40] flex flex-col justify-between items-center py-2 z-20 select-none">
      {/* Tool Windows Icons */}
      <div className="flex flex-col items-center space-y-1 w-full">
        {topNavItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              title={item.label}
              className={`relative w-9 h-9 rounded-md flex items-center justify-center transition-colors ${
                isActive
                  ? 'bg-[#2B2D30] text-[#3574F0] border-l-2 border-[#3574F0]'
                  : 'text-[#707278] hover:text-[#DFE1E5] hover:bg-[#2B2D30]/60'
              }`}
            >
              <Icon size={18} />
              {item.badge && (
                <span className={`absolute -top-1 -right-1 text-[9px] font-bold text-white ${item.badgeColor} w-3.5 h-3.5 rounded-full flex items-center justify-center font-mono`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom: Droz AI Assistant & Settings */}
      <div className="flex flex-col items-center space-y-2 w-full pt-2 border-t border-[#393B40]">
        <button
          onClick={() => setShowAiSidebar(!showAiSidebar)}
          title="Toggle Droz AI Engine & Agent (Ctrl+J)"
          className={`relative w-9 h-9 rounded-md flex items-center justify-center transition-colors ${
            showAiSidebar
              ? 'bg-[#3574F0] text-white shadow-sm'
              : 'text-[#3DDC84] bg-[#2B2D30] hover:bg-[#393B40]'
          }`}
        >
          <Bot size={18} />
          <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-[#3DDC84] rounded-full ring-2 ring-[#18181A]" />
        </button>

        <button
          onClick={() => setActiveView('architecture')}
          title="IDE Settings"
          className="w-9 h-9 rounded-md flex items-center justify-center text-[#707278] hover:text-[#DFE1E5] hover:bg-[#2B2D30] transition"
        >
          <Settings size={17} />
        </button>
      </div>
    </aside>
  );
}
