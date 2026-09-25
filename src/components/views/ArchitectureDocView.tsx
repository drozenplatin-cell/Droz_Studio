import React, { useState } from 'react';
import {
  BookOpen,
  Search,
  CheckCircle2,
  Code2,
  Cpu,
  Layers,
  ShieldCheck,
  Zap,
  Server,
  Terminal,
  Download,
  FileText,
  Workflow,
  Sparkles,
  Smartphone,
  Monitor,
  Globe,
  Database,
  GitBranch,
  Boxes,
  Calendar,
  Clock,
  ArrowRight,
  AlertTriangle,
  Flame,
  Check
} from 'lucide-react';
import { DROZ_ARCHITECTURE_PILLARS } from '../../data/architectureDoc';
import { ArchitecturePillar } from '../../types/droz';
import {
  DROZ_ROADMAP_PHASES,
  DROZ_PRIORITY_MATRIX,
  DROZ_DEFINITION_OF_DONE,
  RoadmapPhase
} from '../../data/mvpRoadmapData';

export function ArchitectureDocView() {
  const [activeTab, setActiveTab] = useState<'pillars' | 'roadmap' | 'mal' | 'build-pipeline' | 'indexer'>('pillars');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPillar, setSelectedPillar] = useState<ArchitecturePillar>(DROZ_ARCHITECTURE_PILLARS[0]);
  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase>(DROZ_ROADMAP_PHASES[0]);

  const filteredPillars = DROZ_ARCHITECTURE_PILLARS.filter(p =>
    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.selectedTech.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.summary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDownloadSpec = () => {
    const markdownContent = `# Droz_Future_Project (DROZ)
## Comprehensive Technical Architecture & Engineering Specification

**Product Identity:** Droz_Future_Project (\`DROZ\`)  
**Product Philosophy:** «Build Once. Create Everywhere.»  
**Target Runtimes:** Android, iOS, Windows, macOS, Linux, Web / PWA, Backend Cloud APIs

---

### 1. Multi-Platform Abstraction Layer (MAL)
- Declarative UI Intermediate Representation (D-DIR)
- Native Platform Generators: Jetpack Compose (Android), SwiftUI (iOS), WinUI 3 (Windows), React 19 (Web)
- Hardware Capability Bridges: Android Keystore, Apple Keychain, Windows Credential Manager, WebCrypto
- Unified Storage: DUSD emitting PostgreSQL 16 and SQLite 3.45

### 2. Cross-Compilation Build Pipeline Architecture
- Directed Acyclic Graph (DAG) Task Orchestration
- Cryptographic Task Input Hashing (SHA-256)
- Pipeline Stages: Source -> Analyze -> Dependencies -> Compile -> Test -> SAST -> Package -> Sign -> Release
- Platform Toolchains: Android AGP, Apple Xcodebuild / Remote Mac Worker, MSVC / Windows App SDK, Clang Universal, AppImage, Vite 8

### 3. Workspace Indexing Engine & Project Memory
- Tree-sitter Incremental AST Parser (<1.2ms updates)
- Bidirectional Relational Call Graph (Database Column <-> Backend <-> API Endpoint <-> UI Component)
- HNSW Vector Index for Semantic Natural Language Retrieval
- Strict Developer-Supervised Safety Review Gate

(Full 27-pillar specification recorded in /ARCHITECTURE_SPECIFICATION.md)`;

    const blob = new Blob([markdownContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DROZ_ARCHITECTURE_SPECIFICATION.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadRoadmap = () => {
    const roadmapContent = `# Droz_Future_Project (DROZ)
## Minimum Viable Product (MVP) Engineering Roadmap

**Product Identity:** Droz_Future_Project (\`DROZ\`)  
**Philosophy:** «Build Once. Create Everywhere.»  
**Target Delivery:** Q1–Q4 2026

---

### Phase 1: Core Shell & Workspace Infrastructure (Weeks 1–4)
- Rust + Tauri v2 + React 19 Desktop Shell (<60MB startup)
- droz.config.json unified manifest contracts
- Virtual File System (VFS) with <2ms event propagation

### Phase 2: Multi-Platform Abstraction Layer & UI Engine (Weeks 5–8)
- Droz Declarative IR (D-DIR)
- Kotlin Compose, React 19, SwiftUI, and WinUI 3 Emitters
- Pixel 9 Pro and Desktop responsive preview frames

### Phase 3: Database & API Studio (Weeks 9–12)
- DUSD emitting PostgreSQL 16 & SQLite 3.45 schemas
- Live SQL runner with tabular results & CSV export
- REST/WebSocket client with OpenAPI 3.1 generation

### Phase 4: DAG Build Engine (Weeks 13–16)
- Directed Acyclic Graph task solver with SHA-256 CAS
- Android AGP, MSBuild, Xcodebuild, and Vite 8 bridges

### Phase 5: Device Lab & ADB Orchestration (Weeks 17–19)
- ADB socket engine (localhost:5037)
- Clickable screen mirror with interactive navigation
- High-throughput streaming Logcat

### Phase 6: Tree-sitter AST Indexing (Weeks 20–22)
- Incremental AST updates (<1.2ms)
- Cross-layer bidirectional impact graph (DB <-> API <-> UI <-> Test)

### Phase 7: Droz AI Engine & 14-Step Agent (Weeks 23–26)
- Gemini Intelligence Gateway (Flash & Pro)
- 14-step autonomous software generation pipeline
- Developer Supervisory Review Gate with diff inspector

### Phase 8: Unified Testing & DAP Debugger (Weeks 27–29)
- 124-test suite running Unit, Integration, and UI tests
- DAP protocol breakpoint debugger
- Plain-English AI exception diagnostics & 1-click fixes

### Phase 9: Security SAST & Release Center (Weeks 30–32)
- Zero-Secret policy & CycloneDX SBOM
- Hardware telemetry & verifiable binary downloads

### Phase 10: Wasm Plugin Marketplace (Weeks 33+)
- WebAssembly sandboxed plugin runtime (WASI / Extism)
- Cloud build worker federation`;

    const blob = new Blob([roadmapContent], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'DROZ_MVP_ROADMAP.md';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-[#1E1F22] overflow-hidden font-sans text-xs text-[#BCBEC4]">
      {/* Top Architecture Bar */}
      <div className="h-9 bg-[#2B2D30] border-b border-[#393B40] flex items-center justify-between px-3 z-10 select-none">
        <div className="flex items-center space-x-3">
          <div className="flex items-center space-x-1.5 text-[#DFE1E5] font-semibold">
            <BookOpen size={14} className="text-[#3574F0]" />
            <span>Architecture & Engineering Specification</span>
          </div>

          <div className="w-[1px] h-4 bg-[#393B40]" />

          <div className="flex bg-[#1E1F22] p-0.5 rounded border border-[#393B40] text-xs">
            <button
              onClick={() => setActiveTab('pillars')}
              className={`px-2.5 py-0.5 rounded transition ${
                activeTab === 'pillars' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              27 Architectural Pillars
            </button>
            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-2.5 py-0.5 rounded transition flex items-center space-x-1 ${
                activeTab === 'roadmap' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              <Calendar size={11} className="mr-1" />
              <span>MVP Roadmap</span>
            </button>
            <button
              onClick={() => setActiveTab('mal')}
              className={`px-2.5 py-0.5 rounded transition ${
                activeTab === 'mal' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              Multi-Platform Layer (MAL)
            </button>
            <button
              onClick={() => setActiveTab('build-pipeline')}
              className={`px-2.5 py-0.5 rounded transition ${
                activeTab === 'build-pipeline' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              Build Pipeline (DAG)
            </button>
            <button
              onClick={() => setActiveTab('indexer')}
              className={`px-2.5 py-0.5 rounded transition ${
                activeTab === 'indexer' ? 'bg-[#3574F0] text-white font-medium' : 'text-[#707278] hover:text-[#DFE1E5]'
              }`}
            >
              Indexing & AST Graph
            </button>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {activeTab === 'pillars' && (
            <div className="relative w-56">
              <Search size={12} className="absolute left-2.5 top-2 text-[#707278]" />
              <input
                type="text"
                placeholder="Filter pillars..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full bg-[#1E1F22] border border-[#393B40] rounded px-2 py-0.5 pl-7 text-xs text-[#DFE1E5] focus:outline-none focus:border-[#3574F0] font-mono"
              />
            </div>
          )}

          {activeTab === 'roadmap' && (
            <button
              onClick={handleDownloadRoadmap}
              className="flex items-center space-x-1 px-2.5 py-1 bg-[#1E1F22] hover:bg-[#393B40] text-[#DFE1E5] border border-[#393B40] rounded text-xs transition"
              title="Download MVP roadmap markdown file"
            >
              <Download size={12} className="text-[#3574F0]" />
              <span>Export Roadmap (.md)</span>
            </button>
          )}

          <button
            onClick={handleDownloadSpec}
            className="flex items-center space-x-1 px-2.5 py-1 bg-[#1E1F22] hover:bg-[#393B40] text-[#DFE1E5] border border-[#393B40] rounded text-xs transition"
            title="Download full specification markdown file"
          >
            <Download size={12} className="text-[#3DDC84]" />
            <span>Export Spec (.md)</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="flex-1 flex overflow-hidden">
        {activeTab === 'pillars' && (
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Left List of 27 Pillars */}
            <div className="w-80 border-r border-[#393B40] bg-[#2B2D30] p-2 overflow-y-auto space-y-1">
              {filteredPillars.map(p => {
                const isSelected = selectedPillar.number === p.number;
                return (
                  <div
                    key={p.number}
                    onClick={() => setSelectedPillar(p)}
                    className={`p-2 rounded cursor-pointer transition border text-left ${
                      isSelected
                        ? 'bg-[#1E1F22] border-[#3574F0] text-[#DFE1E5]'
                        : 'bg-[#1E1F22]/50 border-[#393B40] hover:bg-[#1E1F22] text-[#BCBEC4]'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-[#2B2D30] text-[#3574F0] font-bold shrink-0 border border-[#393B40]">
                        #{p.number}
                      </span>
                      <span className="text-xs font-semibold truncate font-mono">{p.title}</span>
                    </div>
                    <div className="text-[10px] text-[#707278] truncate mt-1 pl-6">
                      {p.selectedTech}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Detailed Pillar Breakdown */}
            <div className="flex-1 p-6 overflow-y-auto bg-[#1E1F22] space-y-5">
              <div className="pb-3 border-b border-[#393B40]">
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.2 rounded bg-[#2B2D30] text-[#3574F0] border border-[#393B40] text-[11px] font-mono font-bold">
                    Pillar #{selectedPillar.number}
                  </span>
                  <h2 className="text-base font-bold text-[#DFE1E5] font-mono">{selectedPillar.title}</h2>
                </div>
                <p className="text-xs text-[#707278] mt-1">{selectedPillar.summary}</p>
              </div>

              <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg space-y-2">
                <span className="text-[10px] uppercase font-bold text-[#3DDC84] font-mono tracking-wider">
                  Selected Production Stack
                </span>
                <div className="text-sm font-bold text-[#DFE1E5] font-mono">{selectedPillar.selectedTech}</div>
                <p className="text-xs text-[#BCBEC4] leading-relaxed pt-1">{selectedPillar.rationale}</p>
              </div>

              {/* Trade-offs Grid */}
              <div className="space-y-3">
                <span className="text-[11px] font-bold text-[#DFE1E5] uppercase font-mono tracking-wider">
                  Evaluated Alternatives & Architectural Trade-offs
                </span>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {(selectedPillar.alternatives || []).map((to, idx) => (
                    <div key={idx} className="p-3 bg-[#2B2D30] border border-[#393B40] rounded-md flex flex-col justify-between">
                      <div>
                        <div className="flex items-center justify-between pb-1 border-b border-[#393B40]">
                          <span className="font-semibold text-xs text-[#DFE1E5]">{to.name}</span>
                          <span className="text-[10px] text-[#f25555] font-mono bg-[#f25555]/10 px-1 rounded">Rejected</span>
                        </div>
                        <div className="mt-2 text-[11px] text-[#3DDC84]">
                          <strong className="text-[10px] block uppercase text-[#707278]">Upside:</strong>
                          {to.pros}
                        </div>
                      </div>
                      <div className="mt-2 text-[11px] text-[#f25555]">
                        <strong className="text-[10px] block uppercase text-[#707278]">Critical Flaw / Rejection Cause:</strong>
                        {to.cons}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Implementation Architecture Snippet */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-bold text-[#DFE1E5] uppercase font-mono tracking-wider">
                    Core Technical Contract / Implementation
                  </span>
                  <span className="text-[10px] text-[#707278] font-mono">Droz Runtime Spec</span>
                </div>
                <div className="bg-[#18181A] border border-[#393B40] rounded-lg p-4 font-mono text-xs overflow-x-auto text-[#DFE1E5]">
                  <pre>{selectedPillar.implementationCode}</pre>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Interactive MVP Roadmap */}
        {activeTab === 'roadmap' && (
          <div className="flex-1 flex flex-col overflow-hidden bg-[#1E1F22]">
            {/* Roadmap Header Summary */}
            <div className="p-4 bg-[#2B2D30] border-b border-[#393B40] flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="px-2 py-0.5 rounded bg-[#3574F0]/20 text-[#3574F0] border border-[#3574F0]/40 text-[10px] font-mono font-bold uppercase">
                    Execution Plan
                  </span>
                  <h2 className="text-base font-bold text-[#DFE1E5] font-mono">
                    Minimum Viable Product (MVP) Engineering Roadmap
                  </h2>
                </div>
                <p className="text-xs text-[#A9ACB3] mt-1">
                  10-phase milestone plan prioritizing P0 critical systems, hermetic build bridges, and developer supervisory AI agent.
                </p>
              </div>

              {/* Progress Summary Pills */}
              <div className="flex items-center space-x-3 text-xs font-mono">
                <div className="bg-[#1E1F22] px-3 py-1.5 rounded border border-[#393B40]">
                  <span className="text-[#707278] block text-[10px]">Total Phases</span>
                  <strong className="text-[#DFE1E5]">10 Phases</strong>
                </div>
                <div className="bg-[#1E1F22] px-3 py-1.5 rounded border border-[#393B40]">
                  <span className="text-[#3DDC84] block text-[10px]">Phases 1–9 Status</span>
                  <strong className="text-[#3DDC84]">100% Implemented</strong>
                </div>
                <div className="bg-[#1E1F22] px-3 py-1.5 rounded border border-[#393B40]">
                  <span className="text-[#3574F0] block text-[10px]">Phase 10 (Ecosystem)</span>
                  <strong className="text-[#3574F0]">In Progress (45%)</strong>
                </div>
              </div>
            </div>

            {/* Roadmap Body */}
            <div className="flex-1 flex overflow-hidden">
              {/* Left Phase Selector */}
              <div className="w-80 border-r border-[#393B40] bg-[#2B2D30] p-2 overflow-y-auto space-y-1.5">
                <span className="text-[10px] font-bold text-[#707278] uppercase px-2 font-mono">
                  Phased Timeline (Q1 - Q4 2026)
                </span>
                {DROZ_ROADMAP_PHASES.map(phase => {
                  const isSelected = selectedPhase.id === phase.id;
                  return (
                    <div
                      key={phase.id}
                      onClick={() => setSelectedPhase(phase)}
                      className={`p-2.5 rounded cursor-pointer transition border text-left ${
                        isSelected
                          ? 'bg-[#1E1F22] border-[#3574F0] text-[#DFE1E5]'
                          : 'bg-[#1E1F22]/50 border-[#393B40] hover:bg-[#1E1F22] text-[#BCBEC4]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded bg-[#2B2D30] text-[#3574F0] border border-[#393B40]">
                          Phase {phase.number}
                        </span>
                        <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${
                          phase.status === 'completed'
                            ? 'bg-[#3DDC84]/15 text-[#3DDC84] border border-[#3DDC84]/30'
                            : 'bg-[#3574F0]/15 text-[#3574F0] border border-[#3574F0]/30'
                        }`}>
                          {phase.status === 'completed' ? 'Completed' : 'In Progress'}
                        </span>
                      </div>
                      <div className="font-semibold text-xs text-[#DFE1E5] mt-1.5 truncate">
                        {phase.title}
                      </div>
                      <div className="flex items-center justify-between text-[10px] text-[#707278] mt-1 font-mono">
                        <span>{phase.timeline}</span>
                        <span>{phase.quarter}</span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right Phase Details & Matrix */}
              <div className="flex-1 p-6 overflow-y-auto space-y-6">
                {/* Active Phase Banner */}
                <div className="p-5 bg-[#2B2D30] border border-[#393B40] rounded-lg space-y-3">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded bg-[#3574F0] text-white text-[11px] font-mono font-bold">
                        Phase {selectedPhase.number} of 10
                      </span>
                      <h3 className="text-base font-bold text-[#DFE1E5] font-mono">{selectedPhase.title}</h3>
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-mono">
                      <span className="text-[#707278]">{selectedPhase.timeline}</span>
                      <span className="text-[#393B40]">•</span>
                      <span className="text-[#3574F0] font-semibold">{selectedPhase.quarter}</span>
                    </div>
                  </div>

                  <p className="text-xs text-[#BCBEC4] leading-relaxed">
                    <strong className="text-[#DFE1E5]">Phase Objective:</strong> {selectedPhase.goal}
                  </p>

                  <div className="flex items-center space-x-2 pt-1 text-[11px] font-mono">
                    <span className="text-[#707278]">Associated Architecture Pillars:</span>
                    {selectedPhase.pillars.map(pill => (
                      <span key={pill} className="bg-[#1E1F22] px-2 py-0.5 rounded border border-[#393B40] text-[#3574F0]">
                        #{pill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Key Deliverables Cards */}
                <div className="space-y-3">
                  <span className="text-[11px] font-bold text-[#DFE1E5] uppercase font-mono tracking-wider">
                    Key Deliverables & Engineered Components
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {selectedPhase.deliverables.map((deliv, idx) => (
                      <div key={idx} className="p-3.5 bg-[#2B2D30] border border-[#393B40] rounded-lg space-y-2">
                        <div className="text-xs font-bold text-[#3574F0] font-mono flex items-center space-x-1.5">
                          <CheckCircle2 size={13} className="text-[#3DDC84]" />
                          <span>{deliv.category}</span>
                        </div>
                        <ul className="space-y-1 pl-4 text-xs text-[#BCBEC4] list-disc marker:text-[#3574F0]">
                          {deliv.items.map((it, itemIdx) => (
                            <li key={itemIdx} className="leading-snug">{it}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Exit Gate Specification */}
                <div className="p-4 bg-[#1E1F22] border border-[#393B40] rounded-lg space-y-2">
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] uppercase font-bold text-[#E09F3E] font-mono tracking-wider flex items-center">
                      <Flame size={12} className="mr-1" />
                      Strict Technical Exit Gate
                    </span>
                  </div>
                  <p className="text-xs text-[#DFE1E5] font-mono leading-relaxed bg-[#2B2D30] p-3 rounded border border-[#393B40]">
                    "{selectedPhase.exitGate}"
                  </p>
                </div>

                {/* Priority Matrix & Definition of Done Section */}
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-bold text-[#DFE1E5] uppercase font-mono tracking-wider">
                    Core Feature Priority Matrix (P0 / P1 / P2)
                  </span>
                  <div className="overflow-x-auto border border-[#393B40] rounded-lg">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-[#2B2D30] text-[#707278] border-b border-[#393B40]">
                        <tr>
                          <th className="p-2.5">Feature Module</th>
                          <th className="p-2.5">Architecture Pillar</th>
                          <th className="p-2.5">Priority</th>
                          <th className="p-2.5">Complexity</th>
                          <th className="p-2.5">Risk Level</th>
                          <th className="p-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-[#393B40] bg-[#1E1F22]">
                        {DROZ_PRIORITY_MATRIX.map((row, idx) => (
                          <tr key={idx} className="hover:bg-[#2B2D30]/60 transition">
                            <td className="p-2.5 font-bold text-[#DFE1E5]">{row.module}</td>
                            <td className="p-2.5 text-[#3574F0]">{row.pillar}</td>
                            <td className="p-2.5">
                              <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                row.priority.includes('P0') ? 'bg-[#F25555]/15 text-[#F25555]' :
                                row.priority.includes('P1') ? 'bg-[#3574F0]/15 text-[#3574F0]' :
                                'bg-[#A9ACB3]/15 text-[#A9ACB3]'
                              }`}>
                                {row.priority}
                              </span>
                            </td>
                            <td className="p-2.5 text-[#BCBEC4]">{row.complexity}</td>
                            <td className="p-2.5 text-[#BCBEC4]">{row.risk}</td>
                            <td className="p-2.5">
                              <span className="flex items-center space-x-1 text-[#3DDC84]">
                                <Check size={12} />
                                <span>{row.status}</span>
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Definition of Done (DoD) */}
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-bold text-[#3DDC84] uppercase font-mono tracking-wider">
                    Definition of Done (DoD) for MVP Release
                  </span>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {DROZ_DEFINITION_OF_DONE.map((dod, idx) => (
                      <div key={idx} className="p-3 bg-[#2B2D30] border border-[#393B40] rounded-lg flex items-start space-x-2.5">
                        <CheckCircle2 size={16} className="text-[#3DDC84] shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-bold text-[#DFE1E5] font-mono">{dod.title}</h4>
                          <p className="text-[11px] text-[#A9ACB3] mt-0.5 leading-snug">{dod.desc}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Multi-Platform Abstraction Layer */}
        {activeTab === 'mal' && (
          <div className="flex-1 p-6 overflow-y-auto bg-[#1E1F22] space-y-6">
            <div className="pb-3 border-b border-[#393B40]">
              <h2 className="text-base font-bold text-[#DFE1E5] font-mono">
                Multi-Platform Abstraction Layer (MAL) Architecture
              </h2>
              <p className="text-xs text-[#707278] mt-1">
                Zero-compromise multi-target engine translating Declarative IR into authentic platform-native code.
              </p>
            </div>

            {/* Architecture Flow Diagram */}
            <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg space-y-3 font-mono text-xs">
              <span className="text-[10px] font-bold text-[#3574F0] uppercase">Unified Code Generation Matrix</span>
              <div className="bg-[#18181A] p-4 rounded border border-[#393B40] leading-relaxed whitespace-pre text-[#BCBEC4]">
{`                         [Droz Project Workspace]
                                     │
                     ┌───────────────┴───────────────┐
                     │   Multi-Platform Layer (MAL)  │
                     └───────────────┬───────────────┘
                                     │
       ┌─────────────────────────────┼─────────────────────────────┐
       ▼                             ▼                             ▼
 [Android Bridge]              [iOS/macOS Bridge]           [Windows Bridge]
 Jetpack Compose 1.7+          SwiftUI 6.0 / Swift          WinUI 3 / XAML C#
 Android SDK 35 / AAPT2        Clang / Xcodebuild           Windows App SDK 1.5
       │                             │                             │
       ▼                             ▼                             ▼
  .APK / .AAB                     .IPA / .DMG                   .MSIX / .EXE`}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg space-y-2">
                <div className="flex items-center space-x-2 text-[#3DDC84]">
                  <Smartphone size={16} />
                  <span className="font-bold text-xs font-mono">Android Target</span>
                </div>
                <p className="text-xs text-[#BCBEC4] leading-relaxed">
                  Emits Kotlin 2.1 code using Jetpack Compose Material 3. Compiles via AGP 8.6 with R8 tree-shaking, ProGuard optimization, and APK/AAB signing.
                </p>
              </div>

              <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg space-y-2">
                <div className="flex items-center space-x-2 text-[#3574F0]">
                  <Monitor size={16} />
                  <span className="font-bold text-xs font-mono">Windows & Desktop</span>
                </div>
                <p className="text-xs text-[#BCBEC4] leading-relaxed">
                  Generates WinUI 3 (C# / .NET 9) with MSIX packaging, Clang Universal for macOS DMG, and AppImage/Flatpak for Linux distributions.
                </p>
              </div>

              <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg space-y-2">
                <div className="flex items-center space-x-2 text-[#e09f3e]">
                  <Globe size={16} />
                  <span className="font-bold text-xs font-mono">Web & PWA Target</span>
                </div>
                <p className="text-xs text-[#BCBEC4] leading-relaxed">
                  Emits React 19 / TypeScript with Tailwind CSS, Workbox service worker caching, Web App Manifest, and offline-first IndexedDB sync.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Build Pipeline DAG */}
        {activeTab === 'build-pipeline' && (
          <div className="flex-1 p-6 overflow-y-auto bg-[#1E1F22] space-y-6">
            <div className="pb-3 border-b border-[#393B40]">
              <h2 className="text-base font-bold text-[#DFE1E5] font-mono">
                Cross-Compilation Directed Acyclic Graph (DAG) Pipeline
              </h2>
              <p className="text-xs text-[#707278] mt-1">
                Content-addressable caching (SHA-256 CAS), parallel task execution, and hermetic compiler sandboxes.
              </p>
            </div>

            <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg space-y-3 font-mono text-xs">
              <span className="text-[10px] font-bold text-[#3574F0] uppercase">DAG Task Execution Stages</span>
              <div className="bg-[#18181A] p-4 rounded border border-[#393B40] leading-relaxed whitespace-pre text-[#BCBEC4]">
{`[1. Source Verification] ──> [2. AST & Typecheck] ──> [3. CAS Hash Lookup]
                                                              │
                     ┌────────────────────────────────────────┴───────────────────┐
                     ▼                                                            ▼
          [Cache Hit: Instant Restore]                                [Cache Miss: Hermetic Compile]
                     │                                                            │
                     └────────────────────────────────────────┬───────────────────┘
                                                              ▼
                                                   [4. Parallel Compilation]
                                                   ├── Android AGP :app:assembleRelease
                                                   ├── Windows MSBuild /p:Configuration=Release
                                                   ├── Web Vite 8 tree-shaking
                                                   └── Clang Universal x86_64/arm64
                                                              ▼
                                                   [5. SAST Security & Cryptographic Signing]
                                                              ▼
                                                   [6. Release Artifact Deployment]`}
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: AST Indexer */}
        {activeTab === 'indexer' && (
          <div className="flex-1 p-6 overflow-y-auto bg-[#1E1F22] space-y-6">
            <div className="pb-3 border-b border-[#393B40]">
              <h2 className="text-base font-bold text-[#DFE1E5] font-mono">
                Workspace Indexing Engine & Relational Knowledge Graph
              </h2>
              <p className="text-xs text-[#707278] mt-1">
                Sub-millisecond AST parser, bidirectional call graphs, and HNSW vector index powering Droz Project Memory.
              </p>
            </div>

            <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg space-y-3 font-mono text-xs">
              <span className="text-[10px] font-bold text-[#3574F0] uppercase">Incremental AST Indexing Flow</span>
              <div className="bg-[#18181A] p-4 rounded border border-[#393B40] leading-relaxed whitespace-pre text-[#BCBEC4]">
{`[Keystroke / File Event] ──> [Tree-Sitter Incremental AST (<1.2ms)]
                                        │
             ┌──────────────────────────┼──────────────────────────┐
             ▼                          ▼                          ▼
    [Symbol Inverted Index]    [Relational Call Graph]    [HNSW Vector Store]
    Classes, Types, Functions   DB ➔ API ➔ UI Bindings    Semantic Embeddings
             │                          │                          │
             └──────────────────────────┼──────────────────────────┘
                                        ▼
                           [Droz Project Memory Hub]
                                        │
                                        ▼
             [Context-Assembled AI Prompt (Token-Efficient, Zero-Hallucination)]`}
              </div>
            </div>

            {/* Bidirectional Relational Impact Analyzer */}
            <div className="p-4 bg-[#2B2D30] border border-[#393B40] rounded-lg space-y-3">
              <span className="text-[10px] font-bold text-[#3DDC84] uppercase font-mono">
                Cross-Layer Relationship Understanding
              </span>
              <p className="text-xs text-[#BCBEC4] leading-relaxed">
                When a developer alters a database column (e.g. <code className="text-[#e09f3e]">students.admission_no</code>), the Relational Call Graph maps out every affected file across the stack:
              </p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2 font-mono text-[11px]">
                <div className="p-2 bg-[#18181A] border border-[#393B40] rounded text-[#BCBEC4]">
                  <strong className="text-[#3574F0] block">Database</strong>
                  schema.sql alter migration
                </div>
                <div className="p-2 bg-[#18181A] border border-[#393B40] rounded text-[#BCBEC4]">
                  <strong className="text-[#3574F0] block">Backend API</strong>
                  POST /api/v1/students payload
                </div>
                <div className="p-2 bg-[#18181A] border border-[#393B40] rounded text-[#BCBEC4]">
                  <strong className="text-[#3574F0] block">Frontend UI</strong>
                  StudentDashboard.tsx table column
                </div>
                <div className="p-2 bg-[#18181A] border border-[#393B40] rounded text-[#BCBEC4]">
                  <strong className="text-[#3574F0] block">Testing Suite</strong>
                  student.test.ts assertions
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
