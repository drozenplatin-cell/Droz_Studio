/**
 * Droz_Future_Project (DROZ)
 * MVP Roadmap Structured Data Specification
 */

export interface RoadmapPhase {
  number: number;
  id: string;
  title: string;
  timeline: string;
  quarter: string;
  status: 'completed' | 'in-progress' | 'planned';
  goal: string;
  deliverables: {
    category: string;
    items: string[];
  }[];
  exitGate: string;
  pillars: number[];
  progressPercentage: number;
}

export interface PriorityMatrixItem {
  module: string;
  pillar: string;
  priority: 'P0 (Critical)' | 'P1 (High)' | 'P2 (Medium)';
  complexity: 'High' | 'Medium' | 'Low';
  risk: 'High' | 'Medium' | 'Low';
  status: 'Ready' | 'In Progress' | 'Planned';
}

export const DROZ_ROADMAP_PHASES: RoadmapPhase[] = [
  {
    number: 1,
    id: 'phase-1',
    title: 'Core Shell & Workspace Infrastructure',
    timeline: 'Weeks 1–4',
    quarter: 'Q1 2026',
    status: 'completed',
    goal: 'Establish high-performance native desktop & web shell, virtual filesystem, and project manifest contracts.',
    deliverables: [
      {
        category: 'Native Core Shell',
        items: [
          'Rust core engine via Tauri v2 + React 19 + TypeScript',
          'Memory footprint capped under 60MB baseline at startup',
          'IntelliJ/Android Studio New UI dark theme architecture'
        ]
      },
      {
        category: 'Workspace Contracts',
        items: [
          'Universal manifest droz.config.json for multi-target specs',
          'Virtual File System (VFS) with <2ms event propagation',
          'Unified workspace layout: core/, ui/, api/, database/, targets/'
        ]
      }
    ],
    exitGate: 'Sub-millisecond file tree browsing, tab navigation, and clean project loading with zero lag.',
    pillars: [1, 2, 4],
    progressPercentage: 100
  },
  {
    number: 2,
    id: 'phase-2',
    title: 'Multi-Platform Abstraction Layer (MAL) & Declarative UI Engine',
    timeline: 'Weeks 5–8',
    quarter: 'Q1 2026',
    status: 'completed',
    goal: 'Build visual drag-and-drop designer and clean native code emitters without vendor lock-in.',
    deliverables: [
      {
        category: 'Droz Declarative IR (D-DIR)',
        items: [
          'Abstract syntax for Buttons, Cards, Grids, Forms, Navbars, Modals',
          'Bi-directional sync between visual canvas and code buffer'
        ]
      },
      {
        category: 'Native Platform Emitters',
        items: [
          'Android: Jetpack Compose Material 3 (Kotlin 2.1+)',
          'Web: React 19 + Tailwind CSS',
          'Desktop & iOS: WinUI 3 (C#) & SwiftUI (Swift 6.0)'
        ]
      },
      {
        category: 'Device Preview Frames',
        items: [
          'Google Pixel 9 Pro frame with punch-hole & Android navigation',
          'Tablet & Desktop responsive viewport toggles'
        ]
      }
    ],
    exitGate: 'Drag-and-drop creation of student portal screen generating clean, editable Kotlin Compose and React code.',
    pillars: [2, 14],
    progressPercentage: 100
  },
  {
    number: 3,
    id: 'phase-3',
    title: 'Database Studio & API Studio Foundation',
    timeline: 'Weeks 9–12',
    quarter: 'Q1 2026',
    status: 'completed',
    goal: 'Provide first-class relational schema modeling and REST/WebSocket testing inside the IDE.',
    deliverables: [
      {
        category: 'Droz Universal Schema (DUSD)',
        items: [
          'Single schema emitting PostgreSQL 16 migrations & SQLite 3.45',
          'Interactive ERD visualizer for 1-to-many entity relations'
        ]
      },
      {
        category: 'DataGrip-Grade Query Console',
        items: [
          'Live SQL query editor with sub-millisecond execution & tabular output',
          'CSV / JSON table export and foreign key drilldowns'
        ]
      },
      {
        category: 'API Studio',
        items: [
          'Method picker (GET, POST, PUT, DELETE), headers & auth token manager',
          'Real response inspector with status code, latency timer, and JSON tree',
          'Auto-generated OpenAPI 3.1 specifications'
        ]
      }
    ],
    exitGate: 'Executing SQL queries and REST requests with live tabular results in <20ms.',
    pillars: [15, 16],
    progressPercentage: 100
  },
  {
    number: 4,
    id: 'phase-4',
    title: 'DAG Build Engine & Cross-Compilation Toolchains',
    timeline: 'Weeks 13–16',
    quarter: 'Q2 2026',
    status: 'completed',
    goal: 'Implement parallel multi-target compiler pipeline with cryptographic content caching.',
    deliverables: [
      {
        category: 'DAG Task Orchestration',
        items: [
          'Directed Acyclic Graph dependency solver running jobs across CPU cores',
          'SHA-256 Content-Addressable Storage (CAS) skipping unchanged code'
        ]
      },
      {
        category: 'Hermetic Platform Bridges',
        items: [
          'Android: AGP & Gradle daemon bridge with R8 dexing & Keystore v3',
          'Windows: MSBuild / Windows App SDK MSIX packaging',
          'iOS/macOS: Clang / Xcodebuild and remote Mac worker mTLS protocol',
          'Web: Vite 8 production bundler with PWA manifest & service worker'
        ]
      }
    ],
    exitGate: 'Build All Platforms successfully outputs signed .apk, .msix, .ipa, .dmg, .AppImage, and web bundle.',
    pillars: [8, 9, 11],
    progressPercentage: 100
  },
  {
    number: 5,
    id: 'phase-5',
    title: 'Device Lab & Real-Time ADB Orchestration',
    timeline: 'Weeks 17–19',
    quarter: 'Q2 2026',
    status: 'completed',
    goal: 'Device discovery, automated installation, screen mirroring, and live logcat debugging.',
    deliverables: [
      {
        category: 'ADB Socket Engine',
        items: [
          'Direct socket interface with localhost:5037 ADB daemon',
          'Automatic discovery of physical Android devices (Redmi Note, Galaxy) and emulators'
        ]
      },
      {
        category: 'Live Viewport & Log Stream',
        items: [
          'Clickable phone viewport with system navigation (Home, Back, Recents)',
          'High-throughput Logcat stream with tag and log-level filtering (I, D, W, E)'
        ]
      }
    ],
    exitGate: 'Single-click APK compile, install, and activity launch with live logcat streaming.',
    pillars: [9],
    progressPercentage: 100
  },
  {
    number: 6,
    id: 'phase-6',
    title: 'Tree-sitter AST Indexing & Project Memory Hub',
    timeline: 'Weeks 20–22',
    quarter: 'Q2 2026',
    status: 'completed',
    goal: 'Provide deep semantic project understanding across the entire multi-tier codebase.',
    deliverables: [
      {
        category: 'Sub-Millisecond Parsing',
        items: [
          'Tree-sitter incremental AST parser updating within 1.2ms on keystroke',
          'Cross-file symbol indexing for TypeScript, Kotlin, SQL, and JSON'
        ]
      },
      {
        category: 'Bidirectional Call Graph',
        items: [
          'Maps Database columns <-> Backend APIs <-> UI Components <-> Test specs',
          'Instant impact analysis warning when changing database fields'
        ]
      }
    ],
    exitGate: 'Database column schema changes immediately highlight affected API controllers and UI forms.',
    pillars: [7],
    progressPercentage: 100
  },
  {
    number: 7,
    id: 'phase-7',
    title: 'Droz AI Engine & 14-Step Supervised Agent Pipeline',
    timeline: 'Weeks 23–26',
    quarter: 'Q3 2026',
    status: 'completed',
    goal: 'Multi-step autonomous software generation under strict developer supervisory review.',
    deliverables: [
      {
        category: 'Gemini Intelligence Gateway',
        items: [
          'Server-side proxy supporting Gemini 3.8 Flash, 3.1 Pro, and local fallback',
          'Token-efficient AST prompt assembly with zero hallucination'
        ]
      },
      {
        category: '14-Step Supervised Agent Pipeline',
        items: [
          'Autonomous progression: Requirements -> Architecture -> DB -> Backend -> Frontend -> Tests -> Report',
          'Developer Review Gate: Interactive diff preview requiring explicit approval before commit'
        ]
      }
    ],
    exitGate: 'Natural language prompts turn into working code, database tables, and tests with developer approval.',
    pillars: [6, 31],
    progressPercentage: 100
  },
  {
    number: 8,
    id: 'phase-8',
    title: 'Unified Testing Center & DAP Interactive Debugger',
    timeline: 'Weeks 27–29',
    quarter: 'Q3 2026',
    status: 'completed',
    goal: 'Holistic test validation across unit, integration, UI, and DAP breakpoint debugging.',
    deliverables: [
      {
        category: 'Testing Suite Matrix',
        items: [
          '124-test suite running Unit, Integration, API, and UI tests simultaneously',
          'Stack trace analyzer with plain-English AI root-cause diagnostics',
          'One-click automated patch applicator converting red tests to green'
        ]
      },
      {
        category: 'DAP Debugger Core',
        items: [
          'Step Over, Step Into, Step Out, Continue controls',
          'Interactive call stack navigation, local variables tree, and breakpoint manager'
        ]
      }
    ],
    exitGate: 'Triggering breakpoints, inspecting variables, and applying AI fixes turning failing tests green.',
    pillars: [17],
    progressPercentage: 100
  },
  {
    number: 9,
    id: 'phase-9',
    title: 'Security SAST, Performance Profiler & Release Center',
    timeline: 'Weeks 30–32',
    quarter: 'Q3 2026',
    status: 'completed',
    goal: 'Enterprise-grade security enforcement, system resource profiling, and verified binary distribution.',
    deliverables: [
      {
        category: 'Security & Compliance',
        items: [
          'Continuous SAST scanner blocking leaked API secrets and insecure algorithms',
          'Software Bill of Materials (SBOM) auditing dependencies for CVEs'
        ]
      },
      {
        category: 'Profiler & Release Artifacts',
        items: [
          'Live CPU, RAM, cold-start latency, and DB query performance dials',
          'Release Center managing cryptographic SHA-256 hashes and download triggers'
        ]
      }
    ],
    exitGate: '100% Project Health scorecard pass and one-click export of verified production binaries.',
    pillars: [10, 18, 20],
    progressPercentage: 100
  },
  {
    number: 10,
    id: 'phase-10',
    title: 'Wasm Plugin Marketplace & Enterprise Cloud Federation',
    timeline: 'Weeks 33+',
    quarter: 'Q4 2026',
    status: 'in-progress',
    goal: 'Open Droz ecosystem to community compilers, language servers, and cloud build farms.',
    deliverables: [
      {
        category: 'Extensibility Framework',
        items: [
          'WASI / Extism WebAssembly sandboxed plugin runtime',
          'Third-party database connectors (Cassandra, Redis, Couchbase)'
        ]
      },
      {
        category: 'Cloud Federation',
        items: [
          'Autoscaling remote build worker farm with OCI container isolation',
          'P2P live multi-cursor pair programming and shared remote shells'
        ]
      }
    ],
    exitGate: 'Installation of custom Wasm plugin from marketplace extending Droz IDE capabilities.',
    pillars: [5, 19],
    progressPercentage: 45
  }
];

export const DROZ_PRIORITY_MATRIX: PriorityMatrixItem[] = [
  { module: 'Rust Core Shell & VFS', pillar: 'Pillars 1, 2, 4', priority: 'P0 (Critical)', complexity: 'High', risk: 'Low', status: 'Ready' },
  { module: 'Visual UI Builder & Native Emitters', pillar: 'Pillars 2, 14', priority: 'P0 (Critical)', complexity: 'High', risk: 'Medium', status: 'Ready' },
  { module: 'Database Studio & DUSD Schema', pillar: 'Pillar 15', priority: 'P0 (Critical)', complexity: 'Medium', risk: 'Low', status: 'Ready' },
  { module: 'API Studio & HTTP Client', pillar: 'Pillar 16', priority: 'P0 (Critical)', complexity: 'Medium', risk: 'Low', status: 'Ready' },
  { module: 'DAG Build Engine & AGP Bridge', pillar: 'Pillars 8, 9, 11', priority: 'P0 (Critical)', complexity: 'High', risk: 'High', status: 'Ready' },
  { module: 'Device Lab & Real ADB Stream', pillar: 'Pillar 9', priority: 'P1 (High)', complexity: 'Medium', risk: 'Medium', status: 'Ready' },
  { module: 'Tree-Sitter AST & Impact Graph', pillar: 'Pillar 7', priority: 'P1 (High)', complexity: 'High', risk: 'Medium', status: 'Ready' },
  { module: '14-Step AI Agent & Review Gate', pillar: 'Pillars 6, 31', priority: 'P1 (High)', complexity: 'High', risk: 'Medium', status: 'Ready' },
  { module: 'Testing Center & DAP Debugger', pillar: 'Pillar 17', priority: 'P1 (High)', complexity: 'Medium', risk: 'Low', status: 'Ready' },
  { module: 'Security SAST & Release Center', pillar: 'Pillars 10, 18, 20', priority: 'P1 (High)', complexity: 'Medium', risk: 'Low', status: 'Ready' },
  { module: 'Wasm Plugin Sandbox', pillar: 'Pillar 5', priority: 'P2 (Medium)', complexity: 'High', risk: 'High', status: 'In Progress' },
  { module: 'Cloud Build Farm & Remote Mac', pillar: 'Pillar 19', priority: 'P2 (Medium)', complexity: 'High', risk: 'High', status: 'In Progress' }
];

export const DROZ_DEFINITION_OF_DONE = [
  { title: 'Deterministic Multi-Platform Compilation', desc: 'Single project compiles cleanly into signed Android APK/AAB, Windows MSIX, and Web PWA bundle.', done: true },
  { title: 'Sub-Second Performance Budget', desc: 'IDE cold start <350ms; Tree-sitter incremental re-index <1.2ms; idle RAM baseline <65MB.', done: true },
  { title: 'Zero Proprietary Lock-In', desc: 'Emitted Kotlin Compose and React code compiles directly in standard Android Studio and VS Code.', done: true },
  { title: 'Developer Supervisory Review Gate', desc: '100% of AI-generated code diffs require explicit developer approval before committing to disk.', done: true },
  { title: 'Quality & Test Matrix Scorecard', desc: 'All 124 unit, integration, and UI tests in the test suite pass with 0 failing assertions.', done: true },
  { title: 'Architectural Transparency', desc: 'All 27 technical pillars and the phase-by-phase roadmap are inspectable inside the IDE and exportable as Markdown.', done: true }
];
