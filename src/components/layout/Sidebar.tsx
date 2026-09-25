import React, { useState } from 'react';
import {
  Folder,
  FolderOpen,
  FileCode,
  FileText,
  FileJson,
  ChevronRight,
  ChevronDown,
  Plus,
  Search,
  Smartphone,
  Monitor,
  Globe,
  Database,
  Layers,
  Trash2,
  Edit2,
  Component,
  Sparkles,
  Settings2,
  FolderPlus,
  FilePlus
} from 'lucide-react';
import { FileNode, DatabaseTable, APIEndpoint, ConnectedDevice, UIComponentItem } from '../../types/droz';

interface SidebarProps {
  activeView: string;
  files: FileNode[];
  selectedFile: FileNode | null;
  onSelectFile: (file: FileNode) => void;
  tables: DatabaseTable[];
  selectedTable: DatabaseTable | null;
  onSelectTable: (table: DatabaseTable) => void;
  endpoints: APIEndpoint[];
  selectedEndpoint: APIEndpoint | null;
  onSelectEndpoint: (ep: APIEndpoint) => void;
  devices: ConnectedDevice[];
  selectedDevice: ConnectedDevice | null;
  onSelectDevice: (device: ConnectedDevice) => void;
  onAddComponentToCanvas: (type: UIComponentItem['type'], name: string) => void;
  onCreateNewFile: (parentPath: string, fileName: string) => void;
  onDeleteFile: (fileId: string) => void;
  width?: number;
}

export function Sidebar({
  activeView,
  files,
  selectedFile,
  onSelectFile,
  tables,
  selectedTable,
  onSelectTable,
  endpoints,
  selectedEndpoint,
  onSelectEndpoint,
  devices,
  selectedDevice,
  onSelectDevice,
  onAddComponentToCanvas,
  onCreateNewFile,
  onDeleteFile,
  width = 256
}: SidebarProps) {
  const [searchFilter, setSearchFilter] = useState('');
  const [projectExplorerMode, setProjectExplorerMode] = useState<'project' | 'android' | 'packages'>('project');
  const [expandedFolders, setExpandedFolders] = useState<Record<string, boolean>>({
    'f-root': true,
    'd-core': true,
    'd-ui': true,
    'd-api': true,
    'd-database': true,
    'd-targets': true,
    'd-target-android': true,
    'd-target-web': true
  });

  const toggleFolder = (id: string) => {
    setExpandedFolders(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getFileIcon = (fileName: string) => {
    if (fileName.endsWith('.kt')) return <span className="text-[#a463f2] font-mono text-[11px] font-bold">K</span>;
    if (fileName.endsWith('.swift')) return <span className="text-[#fa7343] font-mono text-[11px] font-bold">S</span>;
    if (fileName.endsWith('.ts') || fileName.endsWith('.tsx')) return <FileCode size={14} className="text-[#3574F0] shrink-0" />;
    if (fileName.endsWith('.json')) return <FileJson size={14} className="text-[#e09f3e] shrink-0" />;
    if (fileName.endsWith('.sql')) return <Database size={14} className="text-[#3ddc84] shrink-0" />;
    if (fileName.endsWith('.xml') || fileName.endsWith('.html')) return <FileText size={14} className="text-[#fa5252] shrink-0" />;
    return <FileText size={14} className="text-[#bcbec4] shrink-0" />;
  };

  const renderFileNode = (node: FileNode, depth = 0) => {
    // If filtering, check if match
    if (searchFilter && node.type === 'file' && !node.name.toLowerCase().includes(searchFilter.toLowerCase())) {
      return null;
    }

    if (node.type === 'directory') {
      const isExpanded = !!expandedFolders[node.id];
      return (
        <div key={node.id} className="select-none">
          <div
            onClick={() => toggleFolder(node.id)}
            style={{ paddingLeft: `${depth * 14 + 6}px` }}
            className="flex items-center space-x-1.5 py-1 px-1.5 hover:bg-[#393B40]/60 rounded cursor-pointer text-[#BCBEC4] hover:text-[#DFE1E5] transition group text-xs"
          >
            {isExpanded ? <ChevronDown size={13} className="text-[#707278]" /> : <ChevronRight size={13} className="text-[#707278]" />}
            {isExpanded ? <FolderOpen size={14} className="text-[#e09f3e] shrink-0" /> : <Folder size={14} className="text-[#e09f3e] shrink-0" />}
            <span className="truncate font-mono">{node.name}</span>
            {node.platformSpecific && (
              <span className="ml-auto text-[9px] bg-[#1E1F22] text-[#3DDC84] border border-[#393B40] px-1 rounded uppercase font-mono">
                {node.platformSpecific.join(',')}
              </span>
            )}
          </div>
          {isExpanded && node.children && (
            <div>
              {node.children.map(child => renderFileNode(child, depth + 1))}
            </div>
          )}
        </div>
      );
    }

    const isSelected = selectedFile?.id === node.id;
    return (
      <div
        key={node.id}
        onClick={() => onSelectFile(node)}
        style={{ paddingLeft: `${depth * 14 + 20}px` }}
        className={`flex items-center justify-between py-1 px-1.5 rounded cursor-pointer transition select-none group text-xs ${
          isSelected
            ? 'bg-[#3574F0]/25 text-[#DFE1E5] border-l-2 border-[#3574F0] font-medium'
            : 'text-[#BCBEC4] hover:text-[#DFE1E5] hover:bg-[#393B40]/40'
        }`}
      >
        <div className="flex items-center space-x-1.5 truncate">
          {getFileIcon(node.name)}
          <span className="truncate font-mono">{node.name}</span>
        </div>

        {/* Delete action on hover */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (confirm(`Delete ${node.name}?`)) onDeleteFile(node.id);
          }}
          className="opacity-0 group-hover:opacity-100 p-0.5 hover:text-[#fa5252] text-[#707278] transition"
          title="Delete file"
        >
          <Trash2 size={11} />
        </button>
      </div>
    );
  };

  const handlePromptNewFile = () => {
    const fileName = prompt('Enter new file name with extension (e.g. UserService.ts, Screen.tsx):');
    if (fileName && fileName.trim()) {
      onCreateNewFile('core', fileName.trim());
    }
  };

  return (
    <div
      style={{ width: `${width}px` }}
      className="bg-[#2B2D30] border-r border-[#393B40] flex flex-col h-full text-[#BCBEC4] select-none overflow-hidden shrink-0"
    >
      {/* Tool Window Title Bar */}
      <div className="h-8 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-3 text-xs">
        <div className="flex items-center space-x-2 font-medium text-[#DFE1E5]">
          {activeView === 'visual-ui' ? (
            <>
              <Component size={14} className="text-[#3574F0]" />
              <span className="font-semibold">Component Palette</span>
            </>
          ) : activeView === 'database' ? (
            <>
              <Database size={14} className="text-[#3DDC84]" />
              <span className="font-semibold">Schemas & Tables</span>
            </>
          ) : activeView === 'api' ? (
            <>
              <Globe size={14} className="text-[#3574F0]" />
              <span className="font-semibold">Endpoints (OpenAPI)</span>
            </>
          ) : activeView === 'devices' ? (
            <>
              <Smartphone size={14} className="text-[#3DDC84]" />
              <span className="font-semibold">Device Manager</span>
            </>
          ) : (
            <div className="flex items-center space-x-1.5">
              <span className="font-bold text-[#DFE1E5]">Project</span>
              <select
                value={projectExplorerMode}
                onChange={(e: any) => setProjectExplorerMode(e.target.value)}
                aria-label="Explorer View Mode"
                className="bg-[#1E1F22] border border-[#393B40] text-[10px] text-[#3DDC84] rounded px-1.5 py-0.5 focus:outline-none cursor-pointer font-mono"
              >
                <option value="project">Project Tree</option>
                <option value="android">Android View</option>
                <option value="packages">Packages</option>
              </select>
            </div>
          )}
        </div>

        {activeView === 'editor' && (
          <div className="flex items-center space-x-1">
            <button
              onClick={handlePromptNewFile}
              title="New File (Alt+Insert)"
              className="p-1 hover:bg-[#393B40] rounded text-[#BCBEC4] hover:text-white transition"
            >
              <FilePlus size={13} />
            </button>
          </div>
        )}
      </div>

      {/* Main Sidebar Contents */}
      {activeView === 'visual-ui' ? (
        <div className="flex-1 overflow-y-auto p-2.5 space-y-3 font-sans text-xs">
          <p className="text-[11px] text-[#707278]">
            Click any element to add it directly to the canvas:
          </p>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#707278] font-mono tracking-wider">Layout & Containers</span>
            <div className="space-y-1">
              {[
                { type: 'header', name: 'Header App Banner' },
                { type: 'container', name: 'Metric Stats Cards' },
                { type: 'card', name: 'Surface Card' },
                { type: 'sidebar', name: 'Side Navigation' }
              ].map(c => (
                <button
                  key={c.name}
                  onClick={() => onAddComponentToCanvas(c.type as any, c.name)}
                  className="w-full text-left p-2 rounded bg-[#1E1F22] border border-[#393B40] hover:border-[#3574F0] hover:bg-[#393B40]/50 transition flex items-center justify-between text-[#DFE1E5]"
                >
                  <span>{c.name}</span>
                  <Plus size={12} className="text-[#3574F0]" />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-1">
            <span className="text-[10px] uppercase font-bold text-[#707278] font-mono tracking-wider">Data & Actions</span>
            <div className="space-y-1">
              {[
                { type: 'table', name: 'Data Roster Table' },
                { type: 'navigation', name: 'Action Button Bar' },
                { type: 'button', name: 'Action Button' },
                { type: 'input', name: 'Text Input Field' }
              ].map(c => (
                <button
                  key={c.name}
                  onClick={() => onAddComponentToCanvas(c.type as any, c.name)}
                  className="w-full text-left p-2 rounded bg-[#1E1F22] border border-[#393B40] hover:border-[#3574F0] hover:bg-[#393B40]/50 transition flex items-center justify-between text-[#DFE1E5]"
                >
                  <span>{c.name}</span>
                  <Plus size={12} className="text-[#3574F0]" />
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : activeView === 'database' ? (
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5 font-mono text-xs">
          <div className="text-[10px] uppercase text-[#707278] px-1 font-bold">Relational Tables</div>
          {tables.map(tbl => (
            <div
              key={tbl.id}
              onClick={() => onSelectTable(tbl)}
              className={`p-2 rounded cursor-pointer transition border ${
                selectedTable?.id === tbl.id
                  ? 'bg-[#3574F0]/20 border-[#3574F0] text-[#DFE1E5]'
                  : 'bg-[#1E1F22] border-[#393B40] hover:bg-[#393B40]/50 text-[#BCBEC4]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-xs text-[#DFE1E5]">{tbl.name}</span>
                <span className="text-[10px] px-1 bg-[#2B2D30] rounded text-[#707278]">
                  {tbl.rowCount} rows
                </span>
              </div>
              <div className="text-[10px] text-[#707278] mt-1 truncate">
                {tbl.fields.length} columns • {tbl.fields.map(f => f.name).join(', ')}
              </div>
            </div>
          ))}
        </div>
      ) : activeView === 'api' ? (
        <div className="flex-1 overflow-y-auto p-2 space-y-1 font-mono text-xs">
          <div className="text-[10px] uppercase text-[#707278] px-1 font-bold">Endpoints</div>
          {endpoints.map(ep => (
            <div
              key={ep.id}
              onClick={() => onSelectEndpoint(ep)}
              className={`p-2 rounded cursor-pointer transition border ${
                selectedEndpoint?.id === ep.id
                  ? 'bg-[#3574F0]/20 border-[#3574F0] text-[#DFE1E5]'
                  : 'bg-[#1E1F22] border-[#393B40] hover:bg-[#393B40]/50 text-[#BCBEC4]'
              }`}
            >
              <div className="flex items-center space-x-2">
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded ${
                  ep.method === 'GET' ? 'bg-[#3574F0]/30 text-[#56A8F5]' :
                  ep.method === 'POST' ? 'bg-[#3DDC84]/30 text-[#3DDC84]' :
                  ep.method === 'DELETE' ? 'bg-[#fa5252]/30 text-[#fa5252]' : 'bg-[#e09f3e]/30 text-[#e09f3e]'
                }`}>
                  {ep.method}
                </span>
                <span className="truncate text-xs text-[#DFE1E5]">{ep.path}</span>
              </div>
              <div className="text-[10px] text-[#707278] mt-1 truncate font-sans">{ep.name}</div>
            </div>
          ))}
        </div>
      ) : activeView === 'devices' ? (
        <div className="flex-1 overflow-y-auto p-2 space-y-1.5 text-xs font-mono">
          <div className="text-[10px] uppercase text-[#707278] px-1 font-bold">ADB Devices</div>
          {devices.map(dev => (
            <div
              key={dev.id}
              onClick={() => onSelectDevice(dev)}
              className={`p-2 rounded cursor-pointer transition border ${
                selectedDevice?.id === dev.id
                  ? 'bg-[#3574F0]/20 border-[#3574F0] text-[#DFE1E5]'
                  : 'bg-[#1E1F22] border-[#393B40] hover:bg-[#393B40]/50 text-[#BCBEC4]'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className="font-semibold text-[#DFE1E5] font-sans">{dev.name}</span>
                <span className="w-2 h-2 rounded-full bg-[#3DDC84]" />
              </div>
              <div className="text-[10px] text-[#707278] mt-0.5">
                {dev.osVersion} • {dev.connectionType}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* Default: Android Studio Project Tree */
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Filter / Search input */}
          <div className="p-2 border-b border-[#393B40]">
            <div className="relative">
              <Search size={12} className="absolute left-2.5 top-2 text-[#707278]" />
              <input
                type="text"
                placeholder="Filter files..."
                value={searchFilter}
                onChange={e => setSearchFilter(e.target.value)}
                className="w-full bg-[#1E1F22] border border-[#393B40] rounded px-2 py-1 pl-7 text-xs text-[#DFE1E5] placeholder-[#707278] focus:outline-none focus:border-[#3574F0] font-mono"
              />
            </div>
          </div>

          {/* File Tree */}
          <div className="flex-1 overflow-y-auto p-1 space-y-0.5 font-mono text-xs">
            {files.map(rootNode => renderFileNode(rootNode))}
          </div>

          <div className="p-2 border-t border-[#393B40] bg-[#1E1F22] text-[10px] text-[#707278] flex justify-between font-mono">
            <span>Branch: <strong className="text-[#3574F0]">main</strong></span>
            <span>Target: 6 OS</span>
          </div>
        </div>
      )}
    </div>
  );
}
