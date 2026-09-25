# Droz_Future_Project (DROZ)
## Comprehensive Minimum Viable Product (MVP) Engineering Roadmap

**Product Identity:** Droz_Future_Project (`DROZ`)  
**Core Philosophy:** «Build Once. Create Everywhere.»  
**Document Classification:** Product Delivery & Engineering Roadmap  
**Target Milestone:** Production MVP Launch (Phases 1–9) followed by Ecosystem Extensibility (Phase 10)

---

## 1. Executive Summary & MVP Scope Boundary

### 1.1 The Objective
The goal of the `Droz_Future_Project` MVP is to deliver a serious, production-grade universal software development platform that allows a single developer or engineering team to design, code, test, debug, compile, package, deploy, and maintain cross-platform applications from a unified environment.

### 1.2 Core Scope Boundary (What is in the MVP vs Post-MVP)
* **IN MVP SCOPE:**
  1. High-performance desktop and web studio shell built with an authentic dark IDE aesthetic (Charcoal `#1E1F22` / Slate `#2B2D30`, JetBrains Blue `#3574F0`, Android Studio Green `#3DDC84`).
  2. Multi-Platform Abstraction Layer (MAL) supporting simultaneous generation for **Android (APK/AAB), Windows (MSIX/EXE), Web (PWA/SPA), iOS (IPA), macOS (DMG), and Linux (AppImage)**.
  3. Declarative UI Builder (D-DIR) with interactive device frames (Pixel 9 Pro, Tablet, Desktop) and clean source code emitters (Jetpack Compose, React, Flutter, SwiftUI).
  4. Database Studio with DUSD schema editor, ERD relationship visualizer, and live SQL query console.
  5. API Studio with real HTTP execution, headers, auth token injection, and OpenAPI 3.1 spec generation.
  6. Directed Acyclic Graph (DAG) build engine with cryptographic caching (SHA-256 CAS).
  7. Connected Device Lab with ADB socket bridge, live logcat stream, and clickable phone viewport.
  8. Incremental Tree-sitter AST indexer with cross-layer relational impact graphs (DB ➔ API ➔ UI ➔ Tests).
  9. Droz AI Engine & 14-Step Supervised Agent Pipeline with developer review gates.
  10. Testing Center running a 124-test matrix with AI test failure diagnostics.
  11. Debug Center with DAP protocol, call stack, variables, breakpoints, and plain-English exception fixes.
  12. Security SAST scanner, Zero-Secret policy, and release artifact manager with binary downloads.
* **POST-MVP (Ecosystem & Cloud):**
  1. Distributed cloud build worker farm with autoscaling OCI containers.
  2. P2P multi-cursor real-time team collaboration with shared remote terminals.
  3. WebAssembly community plugin marketplace (Extism sandbox).

---

## 2. Phase-by-Phase Roadmap Timeline

```
Q1 2026                 Q2 2026                 Q3 2026                 Q4 2026
┌───────────────────────┬───────────────────────┬───────────────────────┬───────────────────────┐
│ Phase 1: Core Shell   │ Phase 4: DAG Build    │ Phase 7: AI Agent     │ Phase 10: Marketplace │
│ Phase 2: MAL & UI IR  │ Phase 5: Device Lab   │ Phase 8: Testing/DAP  │ Enterprise Features   │
│ Phase 3: DB & API     │ Phase 6: AST Indexer  │ Phase 9: Security/Rel │ Cloud Build Farm      │
└───────────────────────┴───────────────────────┴───────────────────────┴───────────────────────┘
```

---

### Phase 1: Droz Core Architecture & Workspace Infrastructure (Weeks 1–4)
* **Goal:** Establish the high-performance native desktop and web shell, virtual filesystem, and project manifest contracts.
* **Key Deliverables:**
  * **Native Core Shell:** Rust backend via Tauri v2 + React 19 + TypeScript. Memory footprint capped at $<60\text{ MB}$ at startup.
  * **Project Manifest (`droz.config.json`):** Unified configuration defining target platforms, SDK targets (Android SDK 35, Windows App SDK 1.5, iOS 18), database engines, and security flags.
  * **Virtual File System (VFS):** Fast asynchronous file watching with `notify-rs` capable of tracking $100,000+$ project files with $<2\text{ms}$ change propagation.
  * **IntelliJ-Grade UI Shell:** Activity bar, collapsible tool windows, tabbed editor with dirty indicators, breadcrumbs, and command palette (`Ctrl+K`).
* **Exit Gate:** Clean compilation of workspace folder hierarchy (`core/`, `ui/`, `api/`, `database/`, `targets/`) with sub-millisecond tab switching.

---

### Phase 2: Multi-Platform Abstraction Layer (MAL) & Declarative UI Engine (Weeks 5–8)
* **Goal:** Build the visual design surface and clean code generators that translate D-DIR components into native code.
* **Key Deliverables:**
  * **Droz Declarative IR (D-DIR):** Component grammar for Containers, Cards, Buttons, DataGrids, Forms, and Navigation.
  * **Native Emitters:**
    * *Android Emitter:* Clean Kotlin 2.1+ code utilizing Jetpack Compose Material 3.
    * *Web Emitter:* Clean React 19 + Tailwind CSS.
    * *Cross-Platform Emitter:* Flutter (Dart) and SwiftUI (iOS/macOS).
  * **Device Preview Canvas:** Realistic frames for **Google Pixel 9 Pro (Android 15)** with status bar, camera cutout, and gesture navigation; iPad/Tablet frame; and Desktop window.
  * **Bi-directional Sync:** Canvas component attribute edits immediately regenerate code; manual code edits update the canvas layout.
* **Exit Gate:** Drag-and-drop creation of a complex student roster screen exporting valid, runnable Kotlin Compose and React code.

---

### Phase 3: Database Studio & API Studio Foundation (Weeks 9–12)
* **Goal:** Provide first-class relational schema modeling and REST/WebSocket testing without leaving the IDE.
* **Key Deliverables:**
  * **Droz Universal Schema Definition (DUSD):** Single schema definition producing:
    * Production PostgreSQL 16 migrations.
    * Embedded SQLite 3.45 schemas for offline mobile/desktop usage.
  * **DataGrip-Style Interactive Console:** Query console with syntax highlighting, latency timing, table pagination, and CSV export.
  * **ERD Schema Visualizer:** Interactive graph visualizing 1-to-many relationships (`Students` ──< `Results`, `Payments`, `Attendance`).
  * **API Client:** Method selector (GET, POST, PUT, DELETE, PATCH), live HTTP execution, headers table, request body editor, response latency timing, and OpenAPI 3.1 generator.
* **Exit Gate:** Executing SQL queries and HTTP requests inside Droz with live table outputs in $<20\text{ms}$.

---

### Phase 4: DAG Build Engine & Hermetic Toolchain Bridges (Weeks 13–16)
* **Goal:** Implement the multi-target compiler pipeline with content-addressable caching.
* **Key Deliverables:**
  * **DAG Task Orchestrator:** Task dependency solver executing hermetic compile jobs in parallel across CPU cores.
  * **Cryptographic CAS:** SHA-256 caching skipping compilation for unchanged code trees.
  * **Android AGP Bridge:** Direct socket connection to the Gradle Daemon; executes R8 dexing, AAPT2 resource linking, and Keystore v3 signing.
  * **Windows MSBuild Bridge:** Bundling Windows App SDK (WinUI 3) and MSIX packaging.
  * **iOS Xcode Bridge:** Dual-mode compiler (native `xcodebuild` on macOS; mTLS encrypted remote Mac worker on Windows/Linux).
  * **Web/PWA Bridge:** Vite 8 bundle pipeline with Workbox service worker caching and Web App Manifest generation.
* **Exit Gate:** "Build All Platforms" successfully generates valid `.apk`, `.msix`, `.ipa`, `.dmg`, `.AppImage`, and `dist-web` artifacts.

---

### Phase 5: Device Lab & Real-Time ADB Orchestration (Weeks 17–19)
* **Goal:** Real device discovery, installation, and live debugging via Android Debug Bridge.
* **Key Deliverables:**
  * **ADB Socket Client:** Direct communication with `localhost:5037` to detect physical Android phones (e.g. Redmi Android 15) and emulators (Pixel 9).
  * **Interactive Screen Mirror:** Clickable, typable mobile viewport allowing direct interaction with the running application.
  * **Logcat Stream Engine:** High-throughput streaming log viewer with subsystem filters (`I/`, `D/`, `E/`, tag search).
  * **Run-on-Device Automation:** Single-click APK build, push, install, and activity launch sequence.
* **Exit Gate:** Connecting a physical Android device or emulator and streaming live logs while interacting with the application.

---

### Phase 6: Tree-sitter Indexing & Project Memory Hub (Weeks 20–22)
* **Goal:** Provide deep semantic project understanding for the AI engine.
* **Key Deliverables:**
  * **Incremental AST Parsing:** Tree-sitter worker updating syntax trees in $<1.2\text{ms}$ on keystroke.
  * **Cross-Layer Relational Call Graph:** Bidirectional dependency matrix tracking relationships across:
    $$\text{Database Column} \Longleftrightarrow \text{Backend API} \Longleftrightarrow \text{UI Component} \Longleftrightarrow \text{Test Suite}$$
  * **HNSW Vector Index:** Fast cosine similarity search across project documentation, architectural blueprints, and domain logic.
* **Exit Gate:** Modifying a database column instantly highlights all affected APIs and UI components in the editor.

---

### Phase 7: Droz AI Engine & 14-Step Supervised Agent Mode (Weeks 23–26)
* **Goal:** Multi-step autonomous software generation under developer supervision.
* **Key Deliverables:**
  * **Gemini Intelligence Gateway:** Server-side proxy integrating `gemini-3.8-flash` for rapid assistance and `gemini-3.1-pro-preview` for deep reasoning, with local offline fallback.
  * **14-Step Supervised Agent Pipeline:**
    1. Analyze requirements ➔ 2. Inquire missing rules ➔ 3. Design architecture ➔ 4. Create directory structure ➔ 5. Create database schema ➔ 6. Generate backend ➔ 7. Generate frontend ➔ 8. Generate auth ➔ 9. Generate APIs ➔ 10. Generate tests ➔ 11. Run build validation ➔ 12. Identify errors ➔ 13. Apply fixes ➔ 14. Produce release report.
  * **Developer Review Gate (Section 31):** Staged diff inspector requiring explicit approval before changes are committed to disk.
* **Exit Gate:** Submitting a prompt like *"Build a school management system with attendance and fees"* and watching the agent generate a complete, reviewable project.

---

### Phase 8: Multi-Layer Testing & Debugger Suite (Weeks 27–29)
* **Goal:** Unified test execution and interactive debugging.
* **Key Deliverables:**
  * **Unified Test Runner:** Aggregates Unit, Integration, API, and UI tests into a single dashboard (e.g. Tests: 124, Passed: 121, Failed: 3).
  * **DAP Debugger:** Variable inspection, frame/call stack navigation, step over/into/out, and line-number breakpoints.
  * **Plain-English AI Diagnostics:** Translates complex runtime exceptions (`NullPointerException`) into root-cause explanations with one-click automated fixes.
* **Exit Gate:** Triggering a breakpoint, inspecting memory variables, and applying an AI fix that turns failing tests green.

---

### Phase 9: Security SAST, Performance Profiler & Release Center (Weeks 30–32)
* **Goal:** Production-grade security enforcement and release artifact distribution.
* **Key Deliverables:**
  * **Zero-Secret Policy:** Continuous AST scanner blocking exposed API keys and credentials before commit.
  * **Automated SBOM:** CycloneDX manifest auditing dependencies for CVEs.
  * **Profiler Telemetry:** Continuous monitoring of CPU utilization, RAM heap, cold-start latency, and database query times.
  * **Release Center:** Artifact repository managing checksums (SHA-256), signing certificates, and downloadable binary packages (`.apk`, `.msix`, `.dmg`, `.zip`).
* **Exit Gate:** Clean SAST audit pass, 100% Project Health scorecard, and verifiable binary download.

---

### Phase 10: Extensibility Architecture & Plugin Ecosystem (Weeks 33+)
* **Goal:** Open Droz to community compilers, databases, and AI models.
* **Key Deliverables:**
  * **Wasm Plugin Host:** Isolated WebAssembly sandbox (WASI / Extism) allowing third parties to add language servers and toolchains.
  * **AI Provider Switcher:** Seamless runtime switching between Gemini, local Ollama/LLaMA, Anthropic, or custom enterprise endpoints.
  * **Distributed Cloud Workers:** Remote containerized build nodes for enterprise teams.

---

## 3. Core Feature Priority Matrix

| Feature Module | Architecture Pillar | MVP Priority | Complexity | Risk Level |
| :--- | :--- | :--- | :--- | :--- |
| **Rust Core Shell & VFS** | Pillar 1, 2, 4 | **P0 (Critical)** | High | Low |
| **Visual UI Builder & Emitters** | Pillar 2, 14 | **P0 (Critical)** | High | Medium |
| **Database Studio & DUSD** | Pillar 15 | **P0 (Critical)** | Medium | Low |
| **API Studio & HTTP Client** | Pillar 16 | **P0 (Critical)** | Medium | Low |
| **DAG Build Engine & AGP Bridge**| Pillar 8, 9, 11 | **P0 (Critical)** | High | High |
| **Device Lab & ADB Stream** | Pillar 9 | **P1 (High)** | Medium | Medium |
| **Tree-Sitter AST & Impact Graph**| Pillar 7 | **P1 (High)** | High | Medium |
| **14-Step AI Agent & Review Gate**| Pillar 6, 31 | **P1 (High)** | High | Medium |
| **Testing Center & DAP Debugger**| Pillar 17 | **P1 (High)** | Medium | Low |
| **Security SAST & Release Center**| Pillar 10, 18, 20 | **P1 (High)** | Medium | Low |
| **Wasm Plugin Sandbox** | Pillar 5 | **P2 (Medium)** | High | High |
| **Cloud Build Farm** | Pillar 19 | **P2 (Medium)** | High | High |

---

## 4. Definition of Done (DoD) for MVP Launch

1. **Deterministic Multi-Platform Compilation:** A single project workspace compiles without manual intervention into a signed Android APK/AAB, Windows MSIX, and Web PWA bundle.
2. **Sub-Second Performance Budget:**
   * IDE cold start: $<350\text{ms}$.
   * Tree-sitter incremental re-index: $<2\text{ms}$ on keystroke.
   * Total memory baseline: $<65\text{MB}$ idle RAM.
3. **Zero Proprietary Lock-In:** Exported UI and backend code compiles in standard Android Studio and VS Code without Droz dependencies.
4. **Safety & Zero-Secret Enforcement:** 100% of AI-generated diffs require explicit developer approval before disk commit; no raw secrets permitted in source code.
5. **Quality Index:** All 124 tests in the test suite pass cleanly with 0 failing assertions.
6. **Complete Architectural Transparency:** All 27 pillars and the MVP roadmap are accessible directly inside the IDE interface and downloadable as markdown specifications.

---
*© 2026 Droz_Future_Project. All rights reserved. «Build Once. Create Everywhere.»*
