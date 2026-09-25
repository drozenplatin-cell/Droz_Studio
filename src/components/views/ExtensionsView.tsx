import React, { useState } from 'react';
import {
  Boxes,
  Search,
  Download,
  Check,
  Star,
  ShieldCheck,
  Sparkles,
  Settings,
  Trash2,
  RefreshCw,
  ExternalLink,
  Filter,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { IDEExtension } from '../../types/droz';
import { ToastType } from '../../types/toast';

interface ExtensionsViewProps {
  extensions: IDEExtension[];
  setExtensions: React.Dispatch<React.SetStateAction<IDEExtension[]>>;
  onNotify?: (title: string, desc?: string, type?: ToastType) => void;
}

export function ExtensionsView({
  extensions,
  setExtensions,
  onNotify
}: ExtensionsViewProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedExtension, setSelectedExtension] = useState<IDEExtension | null>(extensions[0]);

  const categories = ['All', 'Languages', 'Frameworks', 'Linters', 'DevOps', 'AI'];

  const filteredExtensions = extensions.filter(ext => {
    const matchesSearch =
      ext.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ext.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ext.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'All' || ext.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleInstall = (extId: string) => {
    setExtensions(prev =>
      prev.map(ext => {
        if (ext.id === extId) {
          const newStatus = !ext.installed;
          if (onNotify) {
            onNotify(
              newStatus ? 'Extension Installed' : 'Extension Uninstalled',
              `${ext.name} v${ext.version} ${newStatus ? 'is now active in Droz Studio.' : 'has been removed.'}`,
              newStatus ? 'success' : 'info'
            );
          }
          return {
            ...ext,
            installed: newStatus,
            enabled: newStatus ? true : false
          };
        }
        return ext;
      })
    );
  };

  const toggleEnable = (extId: string) => {
    setExtensions(prev =>
      prev.map(ext => {
        if (ext.id === extId) {
          const newEnabled = !ext.enabled;
          if (onNotify) {
            onNotify(
              newEnabled ? 'Extension Enabled' : 'Extension Disabled',
              `${ext.name} has been ${newEnabled ? 'enabled' : 'disabled'}.`,
              'info'
            );
          }
          return { ...ext, enabled: newEnabled };
        }
        return ext;
      })
    );
  };

  const currentExt = selectedExtension || filteredExtensions[0] || extensions[0];

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E1F22] overflow-hidden font-sans text-xs text-[#BCBEC4]">
      {/* Top Header */}
      <div className="h-9 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-3 z-10 select-none">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-[#DFE1E5] font-semibold">
            <Boxes size={14} className="text-[#3574F0]" />
            <span>Droz Extensions Marketplace (VS Code & IntelliJ Ecosystem)</span>
          </div>

          <div className="w-[1px] h-4 bg-[#393B40]" />

          <div className="flex items-center space-x-2 text-[11px] text-[#707278] font-mono">
            <span>Installed: <strong className="text-[#3DDC84]">{extensions.filter(e => e.installed).length}</strong></span>
            <span>•</span>
            <span>Available: <strong className="text-[#DFE1E5]">{extensions.length}</strong></span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => onNotify && onNotify('Marketplace Synchronized', 'Extension registry verified against open-vsx and plugins.jetbrains.com', 'success')}
            className="flex items-center space-x-1 px-2.5 py-1 bg-[#2B2D30] hover:bg-[#393B40] text-[#DFE1E5] border border-[#393B40] rounded text-xs transition"
          >
            <RefreshCw size={11} />
            <span>Check for Updates</span>
          </button>
        </div>
      </div>

      {/* Main Split Body: Left List, Right Details */}
      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        {/* Left Side: Search, Categories, Extension Cards */}
        <div className="w-full md:w-96 border-r border-[#393B40] bg-[#2B2D30] flex flex-col overflow-hidden">
          {/* Search Box */}
          <div className="p-3 border-b border-[#393B40] space-y-2">
            <div className="relative">
              <Search size={13} className="absolute left-2.5 top-2 text-[#707278]" />
              <input
                type="text"
                placeholder="Search extensions in Marketplace (e.g. kotlin, flutter, rust)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 bg-[#1E1F22] border border-[#393B40] rounded text-xs text-[#DFE1E5] placeholder-[#707278] focus:outline-none focus:border-[#3574F0]"
              />
            </div>

            {/* Category Filter Pills */}
            <div className="flex items-center space-x-1 overflow-x-auto pb-1 text-[11px] select-none">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-2.5 py-0.5 rounded-full whitespace-nowrap transition ${
                    selectedCategory === cat
                      ? 'bg-[#3574F0] text-white font-medium'
                      : 'bg-[#1E1F22] text-[#707278] hover:text-[#DFE1E5]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Extension Cards List */}
          <div className="flex-1 overflow-y-auto p-2 space-y-1.5">
            {filteredExtensions.map(ext => {
              const isSelected = currentExt?.id === ext.id;
              return (
                <div
                  key={ext.id}
                  onClick={() => setSelectedExtension(ext)}
                  className={`p-2.5 rounded-lg cursor-pointer transition border flex items-start space-x-3 ${
                    isSelected
                      ? 'bg-[#1E1F22] border-[#3574F0] shadow-sm'
                      : 'bg-[#1E1F22]/60 border-[#393B40] hover:border-[#707278]'
                  }`}
                >
                  <div className="w-9 h-9 rounded-lg bg-[#2B2D30] border border-[#393B40] flex items-center justify-center text-[#3574F0] shrink-0 mt-0.5">
                    <Boxes size={18} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-xs text-[#DFE1E5] truncate">{ext.name}</h4>
                      {ext.installed && (
                        <span className="text-[10px] text-[#3DDC84] font-mono flex items-center space-x-0.5">
                          <Check size={11} />
                        </span>
                      )}
                    </div>

                    <p className="text-[11px] text-[#707278] line-clamp-2 mt-0.5 leading-snug">
                      {ext.description}
                    </p>

                    <div className="flex items-center justify-between mt-2 text-[10px] text-[#707278] font-mono">
                      <span>{ext.author}</span>
                      <div className="flex items-center space-x-2">
                        <span className="flex items-center space-x-0.5 text-[#e09f3e]">
                          <Star size={10} className="fill-[#e09f3e]" />
                          <span>{ext.rating}</span>
                        </span>
                        <span>{ext.downloads}</span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            {filteredExtensions.length === 0 && (
              <div className="p-8 text-center text-[#707278]">
                <Boxes size={28} className="mx-auto mb-2 opacity-40" />
                <p>No extensions found matching "{searchQuery}".</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Deep Extension Details & Interactive Config */}
        {currentExt ? (
          <div className="flex-1 bg-[#1E1F22] flex flex-col overflow-y-auto p-6">
            <div className="flex items-start justify-between pb-6 border-b border-[#393B40]">
              <div className="flex items-start space-x-4">
                <div className="w-16 h-16 rounded-xl bg-[#2B2D30] border border-[#393B40] flex items-center justify-center text-[#3574F0] shadow-md">
                  <Boxes size={32} />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-[#DFE1E5] flex items-center space-x-2">
                    <span>{currentExt.name}</span>
                    <span className="text-xs font-mono font-normal text-[#707278] bg-[#2B2D30] px-2 py-0.5 rounded border border-[#393B40]">
                      v{currentExt.version}
                    </span>
                  </h2>
                  <div className="text-xs text-[#3574F0] font-medium mt-1">
                    Publisher: {currentExt.author} • Verified Extension
                  </div>
                  <div className="flex items-center space-x-4 mt-2 text-xs text-[#707278] font-mono">
                    <span className="flex items-center space-x-1 text-[#e09f3e]">
                      <Star size={13} className="fill-[#e09f3e]" />
                      <strong className="text-[#DFE1E5]">{currentExt.rating}</strong> (1,420 reviews)
                    </span>
                    <span>•</span>
                    <span>Downloads: <strong className="text-[#DFE1E5]">{currentExt.downloads}</strong></span>
                    <span>•</span>
                    <span className="bg-[#2B2D30] text-[#BCBEC4] px-2 py-0.5 rounded">Category: {currentExt.category}</span>
                  </div>
                </div>
              </div>

              {/* Install / Uninstall & Enable Action Buttons */}
              <div className="flex items-center space-x-2">
                {currentExt.installed ? (
                  <>
                    <button
                      onClick={() => toggleEnable(currentExt.id)}
                      className={`px-3 py-1.5 rounded text-xs font-medium border transition ${
                        currentExt.enabled
                          ? 'bg-[#2B2D30] text-[#DFE1E5] border-[#393B40] hover:bg-[#393B40]'
                          : 'bg-[#e09f3e]/20 text-[#e09f3e] border-[#e09f3e]/40 hover:bg-[#e09f3e]/30'
                      }`}
                    >
                      {currentExt.enabled ? 'Disable' : 'Enable'}
                    </button>
                    <button
                      onClick={() => toggleInstall(currentExt.id)}
                      className="px-3 py-1.5 bg-[#fa5252]/10 hover:bg-[#fa5252]/20 text-[#fa5252] border border-[#fa5252]/30 rounded text-xs font-medium transition"
                    >
                      Uninstall
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => toggleInstall(currentExt.id)}
                    className="flex items-center space-x-1.5 px-4 py-1.5 bg-[#3574F0] hover:bg-[#2B63D8] text-white rounded text-xs font-bold transition shadow"
                  >
                    <Download size={13} />
                    <span>Install</span>
                  </button>
                )}
              </div>
            </div>

            {/* Readme / Overview Content */}
            <div className="py-6 space-y-6 max-w-3xl">
              <div>
                <h3 className="text-sm font-bold text-[#DFE1E5] mb-2 uppercase tracking-wider font-mono">Overview</h3>
                <p className="text-sm text-[#BCBEC4] leading-relaxed">
                  {currentExt.description}
                </p>
              </div>

              <div className="bg-[#2B2D30] p-4 rounded-xl border border-[#393B40] space-y-3">
                <h4 className="font-bold text-xs text-[#DFE1E5] flex items-center space-x-2">
                  <ShieldCheck size={15} className="text-[#3DDC84]" />
                  <span>Droz Engine Compatibility & Security Verification</span>
                </h4>
                <div className="grid grid-cols-2 gap-3 text-xs text-[#707278]">
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 size={13} className="text-[#3DDC84]" />
                    <span>Cross-Platform Sandboxed Process</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 size={13} className="text-[#3DDC84]" />
                    <span>Language Server Protocol (LSP 3.17)</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 size={13} className="text-[#3DDC84]" />
                    <span>Zero Secret Leakage Verified</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle2 size={13} className="text-[#3DDC84]" />
                    <span>Hot Reload & Fast Refresh Ready</span>
                  </div>
                </div>
              </div>

              {/* Tags */}
              <div>
                <h4 className="text-xs font-bold text-[#707278] uppercase font-mono mb-2">Extension Tags</h4>
                <div className="flex flex-wrap gap-1.5">
                  {currentExt.tags.map(tag => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-[#2B2D30] border border-[#393B40] text-[#DFE1E5] rounded text-[11px] font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Configuration Settings Sample */}
              <div>
                <h4 className="text-xs font-bold text-[#707278] uppercase font-mono mb-2">Extension Configuration Schema</h4>
                <div className="p-3 bg-[#18181A] rounded-lg border border-[#393B40] font-mono text-[11px] text-[#DFE1E5] overflow-x-auto">
                  <pre>{JSON.stringify({
                    [`droz.${currentExt.id}.enabled`]: currentExt.enabled,
                    [`droz.${currentExt.id}.autoUpdate`]: true,
                    [`droz.${currentExt.id}.trace.server`]: "verbose",
                    [`droz.${currentExt.id}.maxMemoryMb`]: 512
                  }, null, 2)}</pre>
                </div>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
