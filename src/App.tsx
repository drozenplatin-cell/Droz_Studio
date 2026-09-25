/**
 * Droz_Future_Project (DROZ)
 * Universal Software Creation Platform
 * Authentic Android Studio & IntelliJ IDEA Architecture
 */

import React, { useState, useEffect } from 'react';
import { HeaderBar } from './components/layout/HeaderBar';
import { ActivityBar } from './components/layout/ActivityBar';
import { Sidebar } from './components/layout/Sidebar';
import { BottomDrawer } from './components/layout/BottomDrawer';
import { RightSidebar } from './components/layout/RightSidebar';
import { StatusBar } from './components/layout/StatusBar';

// Views
import { CodeEditorView } from './components/views/CodeEditorView';
import { VisualUIBuilderView } from './components/views/VisualUIBuilderView';
import { DatabaseStudioView } from './components/views/DatabaseStudioView';
import { APIStudioView } from './components/views/APIStudioView';
import { BuildEngineView } from './components/views/BuildEngineView';
import { DeviceLabView } from './components/views/DeviceLabView';
import { TestingCenterView } from './components/views/TestingCenterView';
import { SecurityPerformanceView } from './components/views/SecurityPerformanceView';
import { DebugCenterView } from './components/views/DebugCenterView';
import { GitControlView } from './components/views/GitControlView';
import { ArchitectureDocView } from './components/views/ArchitectureDocView';
import { ProjectHealthView } from './components/views/ProjectHealthView';
import { ExtensionsView } from './components/views/ExtensionsView';

// Modals & Notifications
import { CommandCenterModal } from './components/modals/CommandCenterModal';
import { NewProjectModal } from './components/modals/NewProjectModal';
import { ToastContainer } from './components/common/ToastContainer';
import { ToastMessage, ToastType } from './types/toast';

// Initial Datasets
import {
  INITIAL_FILES,
  INITIAL_TABLES,
  INITIAL_ENDPOINTS,
  INITIAL_BUILD_TARGETS,
  INITIAL_DEVICES,
  INITIAL_TESTS,
  INITIAL_SECURITY_ISSUES,
  INITIAL_PERFORMANCE,
  INITIAL_UI_CANVAS_ITEMS,
  INITIAL_EXTENSIONS
} from './data/initialProject';

import {
  FileNode,
  DatabaseTable,
  APIEndpoint,
  BuildTargetInfo,
  ConnectedDevice,
  TestCase,
  SecurityIssue,
  PerformanceMetrics,
  UIComponentItem,
  PlatformTarget,
  ProjectTemplate,
  IDEExtension
} from './types/droz';

export default function App() {
  // Navigation & Platform Targets
  const [activeView, setActiveView] = useState<string>('editor');
  const [activePlatform, setActivePlatform] = useState<PlatformTarget>('android');
  const [theme, setTheme] = useState<string>('android-studio-dark');

  // Workspaces & Files
  const [files, setFiles] = useState<FileNode[]>(INITIAL_FILES);
  const [openFiles, setOpenFiles] = useState<FileNode[]>([
    INITIAL_FILES[0].children![0], // droz.config.json
    INITIAL_FILES[0].children![1].children![0] // student.ts
  ]);
  const [activeFile, setActiveFile] = useState<FileNode | null>(openFiles[1]);

  // Database, API, Build, Devices
  const [tables, setTables] = useState<DatabaseTable[]>(INITIAL_TABLES);
  const [selectedTable, setSelectedTable] = useState<DatabaseTable | null>(INITIAL_TABLES[0]);

  const [endpoints, setEndpoints] = useState<APIEndpoint[]>(INITIAL_ENDPOINTS);
  const [selectedEndpoint, setSelectedEndpoint] = useState<APIEndpoint | null>(INITIAL_ENDPOINTS[0]);

  const [buildTargets, setBuildTargets] = useState<BuildTargetInfo[]>(INITIAL_BUILD_TARGETS);
  const [isBuildingAll, setIsBuildingAll] = useState(false);

  const [devices, setDevices] = useState<ConnectedDevice[]>(INITIAL_DEVICES);
  const [selectedDevice, setSelectedDevice] = useState<ConnectedDevice | null>(INITIAL_DEVICES[0]);

  // Tests, Security, Performance
  const [tests, setTests] = useState<TestCase[]>(INITIAL_TESTS);
  const [isRunningTests, setIsRunningTests] = useState(false);

  const [securityIssues, setSecurityIssues] = useState<SecurityIssue[]>(INITIAL_SECURITY_ISSUES);
  const [performanceMetrics, setPerformanceMetrics] = useState<PerformanceMetrics>(INITIAL_PERFORMANCE);

  // Visual UI Builder Canvas Items
  const [canvasItems, setCanvasItems] = useState<UIComponentItem[]>(INITIAL_UI_CANVAS_ITEMS);

  // VS Code Marketplace Extensions
  const [extensions, setExtensions] = useState<IDEExtension[]>(INITIAL_EXTENSIONS);

  // Panels & AI State
  const [showAiSidebar, setShowAiSidebar] = useState<boolean>(true);
  const [isBottomDrawerOpen, setIsBottomDrawerOpen] = useState<boolean>(true);
  const [isCommandCenterOpen, setIsCommandCenterOpen] = useState<boolean>(false);
  const [isNewProjectModalOpen, setIsNewProjectModalOpen] = useState<boolean>(false);
  const [aiModel, setAiModel] = useState<string>('gemini-3.8-flash');

  // Dynamic Adjustable Panel Dimensions (Android Studio / VS Code style draggable resizers)
  const [sidebarWidth, setSidebarWidth] = useState<number>(260);
  const [isDraggingSidebar, setIsDraggingSidebar] = useState<boolean>(false);

  const [rightSidebarWidth, setRightSidebarWidth] = useState<number>(360);
  const [isDraggingRightSidebar, setIsDraggingRightSidebar] = useState<boolean>(false);

  const [bottomDrawerHeight, setBottomDrawerHeight] = useState<number>(250);
  const [isDraggingBottomDrawer, setIsDraggingBottomDrawer] = useState<boolean>(false);

  // Global mousemove / mouseup drag listeners for smooth resizing
  useEffect(() => {
    if (!isDraggingSidebar && !isDraggingRightSidebar && !isDraggingBottomDrawer) return;

    const handleMouseMove = (e: MouseEvent) => {
      if (isDraggingSidebar) {
        const newWidth = Math.max(180, Math.min(600, e.clientX - 48));
        setSidebarWidth(newWidth);
      }
      if (isDraggingRightSidebar) {
        const newWidth = Math.max(260, Math.min(700, window.innerWidth - e.clientX));
        setRightSidebarWidth(newWidth);
      }
      if (isDraggingBottomDrawer) {
        const newHeight = Math.max(120, Math.min(window.innerHeight - 150, window.innerHeight - e.clientY));
        setBottomDrawerHeight(newHeight);
      }
    };

    const handleMouseUp = () => {
      setIsDraggingSidebar(false);
      setIsDraggingRightSidebar(false);
      setIsDraggingBottomDrawer(false);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingSidebar, isDraggingRightSidebar, isDraggingBottomDrawer]);

  // In-App Non-blocking Toast Notification Manager (Replaces window.alert)
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const showToast = (title: string, description?: string, type: ToastType = 'info') => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).substr(2, 4)}`;
    const newToast: ToastMessage = {
      id,
      title,
      description,
      type,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })
    };
    setToasts(prev => [...prev.slice(-4), newToast]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4500);
  };

  // Global Keyboard Shortcuts (Ctrl+K for Command Center, Ctrl+J for AI Panel)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandCenterOpen(prev => !prev);
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        setShowAiSidebar(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // File management
  const handleSelectFile = (file: FileNode) => {
    if (file.type === 'file') {
      if (!openFiles.find(f => f.id === file.id)) {
        setOpenFiles(prev => [...prev, file]);
      }
      setActiveFile(file);
      setActiveView('editor');
    }
  };

  const handleCloseTab = (fileId: string) => {
    const remaining = openFiles.filter(f => f.id !== fileId);
    setOpenFiles(remaining);
    if (activeFile?.id === fileId) {
      setActiveFile(remaining.length > 0 ? remaining[remaining.length - 1] : null);
    }
  };

  const handleFileContentChange = (newContent: string) => {
    if (!activeFile) return;

    const updated = { ...activeFile, content: newContent };
    setActiveFile(updated);

    // Update in open tabs
    setOpenFiles(prev => prev.map(f => f.id === activeFile.id ? updated : f));

    // Update recursively in file tree
    const updateRecursive = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(n => {
        if (n.id === activeFile.id) {
          return updated;
        }
        if (n.children) {
          return { ...n, children: updateRecursive(n.children) };
        }
        return n;
      });
    };
    setFiles(prev => updateRecursive(prev));
  };

  const handleCreateNewFile = (parentFolder: string, fileName: string) => {
    const extension = fileName.split('.').pop() || 'ts';
    let language = 'typescript';
    if (extension === 'json') language = 'json';
    if (extension === 'sql') language = 'sql';
    if (extension === 'kt' || extension === 'kts') language = 'kotlin';
    if (extension === 'tsx') language = 'typescript';

    const newFile: FileNode = {
      id: `f-${Date.now()}`,
      name: fileName,
      path: `${parentFolder}/${fileName}`,
      type: 'file',
      language,
      content: `// ${fileName}\n// Created in Droz Studio\n\nexport const moduleInfo = {\n  created: new Date().toISOString(),\n  platform: 'universal'\n};\n`
    };

    const addRecursive = (nodes: FileNode[]): FileNode[] => {
      return nodes.map(n => {
        if (n.name === parentFolder && n.type === 'directory') {
          return { ...n, children: [...(n.children || []), newFile] };
        }
        if (n.children) {
          return { ...n, children: addRecursive(n.children) };
        }
        return n;
      });
    };

    setFiles(prev => addRecursive(prev));
    setOpenFiles(prev => [...prev, newFile]);
    setActiveFile(newFile);
    setActiveView('editor');
    showToast('File Created', `${fileName} added to /${parentFolder}/ and opened in editor.`, 'success');
  };

  const handleDeleteFile = (fileId: string) => {
    handleCloseTab(fileId);
    setFiles(prev => {
      const deleteRecursive = (nodes: FileNode[]): FileNode[] => {
        return nodes
          .filter(n => n.id !== fileId)
          .map(n => n.children ? { ...n, children: deleteRecursive(n.children) } : n);
      };
      return deleteRecursive(prev);
    });
    showToast('File Deleted', 'File removed from workspace.', 'info');
  };

  // Add component to visual canvas from sidebar palette
  const handleAddComponentToCanvas = (type: UIComponentItem['type'], name: string) => {
    const newItem: UIComponentItem = {
      id: `ui-${Date.now()}`,
      name,
      type,
      category: 'layout',
      props: {
        title: `${name}`,
        subtitle: 'Interactive element preview',
        badge: 'Android 15'
      }
    };
    setCanvasItems(prev => [...prev, newItem]);
    showToast('Component Added', `Added ${name} to visual design canvas.`, 'info');
  };

  // Save generated UI code into the workspace
  const handleSaveGeneratedCodeToWorkspace = (generatedCode: string) => {
    const newFile: FileNode = {
      id: `f-ui-gen-${Date.now()}`,
      name: 'StudentPortalDashboard.tsx',
      path: 'ui/StudentPortalDashboard.tsx',
      type: 'file',
      language: 'typescript',
      content: generatedCode
    };

    setOpenFiles(prev => [...prev, newFile]);
    setActiveFile(newFile);
    setActiveView('editor');
    showToast('Source Code Committed', 'Generated UI code saved to /ui/StudentPortalDashboard.tsx', 'success');
  };

  // Build Operations
  const handleTriggerBuild = (targetId: PlatformTarget) => {
    setBuildTargets(prev => prev.map(t => {
      if (t.id === targetId) {
        return {
          ...t,
          status: 'compiling',
          progress: 50,
          logs: [...t.logs, `> Task :app:compile${targetId.toUpperCase()}Incremental`]
        };
      }
      return t;
    }));

    setTimeout(() => {
      setBuildTargets(prev => prev.map(t => {
        if (t.id === targetId) {
          return {
            ...t,
            status: 'released',
            progress: 100,
            logs: [...t.logs, `BUILD SUCCESSFUL in 1s 210ms`]
          };
        }
        return t;
      }));
      showToast('Build Completed', `Target ${targetId.toUpperCase()} package compiled and signed.`, 'success');
    }, 900);
  };

  const handleTriggerBuildAll = () => {
    setIsBuildingAll(true);
    setBuildTargets(prev => prev.map(t => ({ ...t, status: 'compiling', progress: 40 })));

    setTimeout(() => {
      setIsBuildingAll(false);
      setBuildTargets(prev => prev.map(t => ({
        ...t,
        status: 'released',
        progress: 100,
        logs: [...t.logs, `BUILD SUCCESSFUL: ${t.name} distribution package signed.`]
      })));
      showToast('Build All Successful', 'Android APK/AAB, Windows MSIX, iOS IPA, macOS DMG, Linux AppImage, and Web Bundle ready!', 'success');
    }, 1200);
  };

  // Test Operations
  const handleRunAllTests = () => {
    setIsRunningTests(true);
    setTimeout(() => {
      setIsRunningTests(false);
      setTests(prev => prev.map(t => ({ ...t, status: 'passed' })));
      showToast('Tests Passed', '124 tests executed: 124 passed (0 failed). All assertions green ✓', 'success');
    }, 800);
  };

  const handleApplyFixToTest = (testId: string) => {
    setTests(prev => prev.map(t => t.id === testId ? { ...t, status: 'passed' } : t));
    showToast('Test Fixed', 'Assertion resolved. Test is now passing ✓', 'success');
  };

  // Security & Health Remediations
  const handleApplySecurityRemediation = (issueId: string) => {
    setSecurityIssues(prev => prev.filter(i => i.id !== issueId));
    showToast('Security Remediated', 'Vulnerability resolved: updated cryptographic algorithm and rotated salt.', 'success');
  };

  const handleFixAllHealthIssues = () => {
    setTests(prev => prev.map(t => ({ ...t, status: 'passed' })));
    setSecurityIssues([]);
    showToast('Health Score 100%', 'All build warnings, test failures, and security notices resolved.', 'success');
  };

  // AI Diff commit to workspace
  const handleCommitAiDiff = (stagedCode: string) => {
    const newFile: FileNode = {
      id: `f-ai-${Date.now()}`,
      name: 'AttendanceBiometricEngine.kt',
      path: 'core/AttendanceBiometricEngine.kt',
      type: 'file',
      language: 'kotlin',
      content: stagedCode
    };
    setOpenFiles(prev => [...prev, newFile]);
    setActiveFile(newFile);
    setActiveView('editor');
    showToast('AI Changes Merged', 'AttendanceBiometricEngine.kt added to workspace tree.', 'success');
  };

  const handleLoadTemplate = (tpl: ProjectTemplate) => {
    showToast('Workspace Switched', `Project loaded: ${tpl.name} (${tpl.tagline})`, 'info');
    setActiveView('editor');
  };

  const handleCommandCenterAction = (key: string) => {
    switch (key) {
      case 'build-all':
        handleTriggerBuildAll();
        setActiveView('build');
        break;
      case 'run-tests':
        handleRunAllTests();
        setActiveView('tests');
        break;
      case 'find-security':
        setActiveView('security');
        break;
      case 'open-ai':
        setShowAiSidebar(true);
        break;
      case 'open-devices':
        setActiveView('devices');
        break;
      case 'open-extensions':
        setActiveView('extensions');
        break;
      case 'open-database':
        setActiveView('database');
        break;
      case 'open-api':
        setActiveView('api');
        break;
      case 'open-git':
        setActiveView('git');
        break;
      case 'open-architecture':
        setActiveView('architecture');
        break;
      default:
        setActiveView('editor');
        break;
    }
  };

  const failedTestCount = tests.filter(t => t.status === 'failed').length;
  const testStats = {
    total: 124,
    passed: 124 - failedTestCount,
    failed: failedTestCount,
    skipped: 0
  };

  const themeClass =
    theme === 'darcula-classic'
      ? 'theme-darcula-classic'
      : theme === 'obsidian-contrast'
      ? 'theme-obsidian-contrast'
      : '';

  return (
    <div className={`h-screen w-screen flex flex-col bg-[#1E1F22] text-[#DFE1E5] overflow-hidden font-sans select-none ${themeClass}`}>
      {/* Top Header Menu Bar */}
      <HeaderBar
        activeView={activeView}
        setActiveView={setActiveView}
        activePlatform={activePlatform}
        setActivePlatform={setActivePlatform}
        onOpenCommandCenter={() => setIsCommandCenterOpen(true)}
        onOpenNewProject={() => setIsNewProjectModalOpen(true)}
        onRunActiveTarget={() => {
          setActiveView('devices');
        }}
        onBuildAll={handleTriggerBuildAll}
        onRunAllTests={handleRunAllTests}
        testStats={testStats}
        aiModel={aiModel}
        setAiModel={setAiModel}
        theme={theme}
        setTheme={setTheme}
        onOpenNewFileDialog={() => {
          const timestamp = Date.now().toString().slice(-4);
          handleCreateNewFile('core', `UniversalModule_${timestamp}.kt`);
        }}
        onNotify={showToast}
      />

      {/* Main Studio Middle Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Leftmost Activity Bar */}
        <ActivityBar
          activeView={activeView}
          setActiveView={setActiveView}
          showAiSidebar={showAiSidebar}
          setShowAiSidebar={setShowAiSidebar}
          failedTestCount={failedTestCount}
          securityWarningCount={securityIssues.length}
        />

        {/* Context-Aware Sidebar with Draggable Resize Handle */}
        {(activeView === 'editor' || activeView === 'visual-ui' || activeView === 'database' || activeView === 'api' || activeView === 'devices') && (
          <>
            <Sidebar
              activeView={activeView}
              files={files}
              selectedFile={activeFile}
              onSelectFile={handleSelectFile}
              tables={tables}
              selectedTable={selectedTable}
              onSelectTable={setSelectedTable}
              endpoints={endpoints}
              selectedEndpoint={selectedEndpoint}
              onSelectEndpoint={setSelectedEndpoint}
              devices={devices}
              selectedDevice={selectedDevice}
              onSelectDevice={setSelectedDevice}
              onAddComponentToCanvas={handleAddComponentToCanvas}
              onCreateNewFile={handleCreateNewFile}
              onDeleteFile={handleDeleteFile}
              width={sidebarWidth}
            />
            {/* Draggable Splitter Handle for Left Sidebar */}
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                setIsDraggingSidebar(true);
              }}
              onDoubleClick={() => setSidebarWidth(260)}
              title="Drag to adjust sidebar width (Double click to reset to 260px)"
              className={`w-1 hover:w-1.5 cursor-col-resize hover:bg-[#3574F0] transition-colors relative z-20 shrink-0 ${
                isDraggingSidebar ? 'bg-[#3574F0] w-1.5 shadow-[0_0_8px_#3574F0]' : 'bg-[#393B40]/40'
              }`}
            />
          </>
        )}

        {/* Center Primary Workspace View */}
        <main className="flex-1 flex flex-col overflow-hidden bg-[#1E1F22]">
          {activeView === 'editor' && (
            <CodeEditorView
              activeFile={activeFile}
              openFiles={openFiles}
              onSelectTab={setActiveFile}
              onCloseTab={handleCloseTab}
              onFileContentChange={handleFileContentChange}
              onAskAIAboutFile={() => setShowAiSidebar(true)}
              onNotify={showToast}
            />
          )}

          {activeView === 'visual-ui' && (
            <VisualUIBuilderView
              canvasItems={canvasItems}
              setCanvasItems={setCanvasItems}
              onSaveToWorkspace={handleSaveGeneratedCodeToWorkspace}
            />
          )}

          {activeView === 'database' && (
            <DatabaseStudioView
              tables={tables}
              selectedTable={selectedTable}
              onSelectTable={setSelectedTable}
              onAnalyzeImpact={() => setShowAiSidebar(true)}
            />
          )}

          {activeView === 'api' && (
            <APIStudioView
              endpoints={endpoints}
              selectedEndpoint={selectedEndpoint}
              onSelectEndpoint={setSelectedEndpoint}
              onAskAIAboutApi={() => setShowAiSidebar(true)}
            />
          )}

          {activeView === 'build' && (
            <BuildEngineView
              targets={buildTargets}
              onTriggerBuild={handleTriggerBuild}
              onTriggerBuildAll={handleTriggerBuildAll}
              isBuildingAll={isBuildingAll}
            />
          )}

          {activeView === 'devices' && (
            <DeviceLabView
              devices={devices}
              selectedDevice={selectedDevice}
              onSelectDevice={setSelectedDevice}
              onRunOnDevice={(dev) => showToast('Deploying Build', `Deploying universal package to ${dev.name}...`, 'info')}
              onNotify={showToast}
            />
          )}

          {activeView === 'tests' && (
            <TestingCenterView
              tests={tests}
              onRunAllTests={handleRunAllTests}
              isRunningTests={isRunningTests}
              onDiagnoseTestWithAI={() => setShowAiSidebar(true)}
              onApplyFixToTest={handleApplyFixToTest}
            />
          )}

          {activeView === 'security' && (
            <SecurityPerformanceView
              issues={securityIssues}
              metrics={performanceMetrics}
              onRunSecurityScan={() => showToast('SAST Scan Complete', 'Codebase scanned: 0 critical vulnerabilities, Zero-Secret policy intact.', 'success')}
              onApplySecurityRemediation={handleApplySecurityRemediation}
            />
          )}

          {activeView === 'debug' && (
            <DebugCenterView
              onApplyDebugFix={() => {
                setTests(prev => prev.map(t => t.id === 't-9' ? { ...t, status: 'passed' } : t));
                showToast('NullPointerException Fixed', 'BiometricPrompt lifecycle check committed to MainActivity.kt:74', 'success');
              }}
              onNotify={showToast}
            />
          )}

          {activeView === 'git' && (
            <GitControlView onNotify={showToast} />
          )}

          {activeView === 'extensions' && (
            <ExtensionsView
              extensions={extensions}
              setExtensions={setExtensions}
              onNotify={showToast}
            />
          )}

          {activeView === 'architecture' && (
            <ArchitectureDocView />
          )}

          {activeView === 'health' && (
            <ProjectHealthView
              onFixAllIssues={handleFixAllHealthIssues}
              onNotify={showToast}
            />
          )}
        </main>

        {/* Right Gemini in Droz Studio Drawer with Draggable Resizer */}
        {showAiSidebar && (
          <>
            {/* Draggable Splitter Handle for Right AI Panel */}
            <div
              onMouseDown={(e) => {
                e.preventDefault();
                setIsDraggingRightSidebar(true);
              }}
              onDoubleClick={() => setRightSidebarWidth(360)}
              title="Drag to adjust AI Assistant width (Double click to reset to 360px)"
              className={`w-1 hover:w-1.5 cursor-col-resize hover:bg-[#3574F0] transition-colors relative z-20 shrink-0 ${
                isDraggingRightSidebar ? 'bg-[#3574F0] w-1.5 shadow-[0_0_8px_#3574F0]' : 'bg-[#393B40]/40'
              }`}
            />
            <RightSidebar
              onClose={() => setShowAiSidebar(false)}
              onCommitAiDiff={handleCommitAiDiff}
              onNotify={showToast}
              width={rightSidebarWidth}
            />
          </>
        )}
      </div>

      {/* Bottom Tool Window Drawer with Draggable Top Handle */}
      <BottomDrawer
        isOpen={isBottomDrawerOpen}
        setIsOpen={setIsBottomDrawerOpen}
        height={bottomDrawerHeight}
        onStartDrag={(e) => {
          e.preventDefault();
          setIsDraggingBottomDrawer(true);
        }}
        onResetHeight={() => setBottomDrawerHeight(250)}
        onNotify={showToast}
        onExecuteCommand={(cmd) => {
          if (cmd === 'build') handleTriggerBuildAll();
          if (cmd === 'test') handleRunAllTests();
        }}
      />

      {/* JetBrains / Android Studio Status Bar */}
      <StatusBar
        activePlatform={activePlatform}
        isBottomDrawerOpen={isBottomDrawerOpen}
        onToggleBottomDrawer={() => setIsBottomDrawerOpen(prev => !prev)}
        showAiSidebar={showAiSidebar}
        onToggleAiSidebar={() => setShowAiSidebar(prev => !prev)}
        onOpenGit={() => setActiveView('git')}
        onOpenProblems={() => setIsBottomDrawerOpen(true)}
        onTriggerGC={() => showToast('Garbage Collection Complete', 'JVM / V8 Heap clean: 142MB memory reclaimed.', 'success')}
        activeFileName={activeFile?.name}
        activeLanguage={activeFile?.language}
      />

      {/* Command Center Modal (Search Everywhere / Ctrl+K) */}
      <CommandCenterModal
        isOpen={isCommandCenterOpen}
        onClose={() => setIsCommandCenterOpen(false)}
        onSelectAction={handleCommandCenterAction}
      />

      {/* New Project Wizard Modal */}
      <NewProjectModal
        isOpen={isNewProjectModalOpen}
        onClose={() => setIsNewProjectModalOpen(false)}
        onLoadTemplate={handleLoadTemplate}
        onGenerateFromPrompt={() => {
          setShowAiSidebar(true);
        }}
      />

      {/* JetBrains / Android Studio Notifications Toast Container */}
      <ToastContainer
        toasts={toasts}
        onDismiss={(id) => setToasts(prev => prev.filter(t => t.id !== id))}
      />
    </div>
  );
}
