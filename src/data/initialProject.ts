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
  IDEExtension,
  LogcatEntry,
  ProfilerState
} from '../types/droz';

export const INITIAL_FILES: FileNode[] = [
  {
    id: 'f-root',
    name: 'DrozProject',
    path: '',
    type: 'directory',
    children: [
      {
        id: 'f-droz-config',
        name: 'droz.config.json',
        path: 'droz.config.json',
        type: 'file',
        language: 'json',
        content: `{
  "name": "SchoolSphere_Universal",
  "identity": "DROZ_APP_001",
  "version": "1.4.2",
  "framework": "Droz Universal Runtime v2.0",
  "philosophy": "Build Once. Create Everywhere.",
  "targets": ["android", "ios", "windows", "macos", "linux", "web"],
  "database": {
    "engine": "postgresql",
    "fallback": "sqlite",
    "schemaVersion": "2026.09"
  },
  "security": {
    "zeroSecretPolicy": true,
    "sastAuditOnBuild": true
  }
}`
      },
      {
        id: 'd-core',
        name: 'core',
        path: 'core',
        type: 'directory',
        children: [
          {
            id: 'f-domain-student',
            name: 'student.ts',
            path: 'core/student.ts',
            type: 'file',
            language: 'typescript',
            content: `/**
 * Core Domain Entity: Student Model
 * Shared across Android, iOS, Windows, macOS, and Web runtimes.
 */

export interface StudentRecord {
  id: string;
  admissionNo: string;
  fullName: string;
  gradeLevel: string;
  status: 'active' | 'graduated' | 'suspended';
  guardianEmail: string;
  createdAt: string;
}

export function validateAdmission(admissionNo: string): boolean {
  return /^SCH-[0-9]{4}-[A-Z]{2}$/.test(admissionNo.trim());
}

export function calculateGPA(results: { grade: number; credits: number }[]): number {
  if (results.length === 0) return 0.0;
  const totalWeighted = results.reduce((acc, curr) => acc + (curr.grade * curr.credits), 0);
  const totalCredits = results.reduce((acc, curr) => acc + curr.credits, 0);
  return Number((totalWeighted / (totalCredits || 1)).toFixed(2));
}`
          },
          {
            id: 'f-domain-auth',
            name: 'auth.ts',
            path: 'core/auth.ts',
            type: 'file',
            language: 'typescript',
            content: `/**
 * Unified Cross-Platform Auth Provider
 * Bridges Keystore (Android), Keychain (iOS), Credential Manager (Windows), and WebCrypto.
 */

export interface UserSession {
  userId: string;
  role: 'super_admin' | 'principal' | 'teacher' | 'bursar' | 'parent';
  authToken: string;
  expiresAt: number;
}

export async function verifySessionExpiry(session: UserSession): Promise<boolean> {
  const now = Date.now();
  return session.expiresAt > now;
}`
          }
        ]
      },
      {
        id: 'd-ui',
        name: 'ui',
        path: 'ui',
        type: 'directory',
        children: [
          {
            id: 'f-ui-dashboard',
            name: 'StudentDashboard.tsx',
            path: 'ui/StudentDashboard.tsx',
            type: 'file',
            language: 'typescript',
            content: `import React, { useState } from 'react';
import { StudentRecord } from '../core/student';

export function StudentDashboard() {
  const [students] = useState<StudentRecord[]>([
    { id: '1', admissionNo: 'SCH-2026-AB', fullName: 'Alexander Vance', gradeLevel: 'Grade 12', status: 'active', guardianEmail: 'vance@example.com', createdAt: '2026-01-10' },
    { id: '2', admissionNo: 'SCH-2026-CD', fullName: 'Elena Rostova', gradeLevel: 'Grade 11', status: 'active', guardianEmail: 'elena.parent@example.com', createdAt: '2026-02-14' }
  ]);

  return (
    <div className="p-6 bg-slate-900 text-slate-100 rounded-xl">
      <header className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-cyan-400">Droz Education Portal</h1>
          <p className="text-sm text-slate-400">Real-time attendance, results & tuition records</p>
        </div>
        <button className="px-4 py-2 bg-cyan-600 hover:bg-cyan-500 rounded-lg text-sm font-medium">
          + Enroll New Student
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
          <span className="text-xs text-slate-400">Total Enrollment</span>
          <p className="text-2xl font-semibold mt-1">1,248</p>
        </div>
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
          <span className="text-xs text-slate-400">Attendance Today</span>
          <p className="text-2xl font-semibold text-emerald-400 mt-1">98.4%</p>
        </div>
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
          <span className="text-xs text-slate-400">Outstanding Fees</span>
          <p className="text-2xl font-semibold text-amber-400 mt-1">$4,850</p>
        </div>
        <div className="p-4 bg-slate-800 rounded-lg border border-slate-700">
          <span className="text-xs text-slate-400">Examinations Active</span>
          <p className="text-2xl font-semibold text-purple-400 mt-1">Midterm Fall</p>
        </div>
      </div>
    </div>
  );
}`
          }
        ]
      },
      {
        id: 'd-api',
        name: 'api',
        path: 'api',
        type: 'directory',
        children: [
          {
            id: 'f-api-routes',
            name: 'routes.ts',
            path: 'api/routes.ts',
            type: 'file',
            language: 'typescript',
            content: `/**
 * Droz API Studio: Unified Route Definitions
 * Automatically synchronized with OpenAPI 3.1 & database models.
 */

export const studentApiRoutes = {
  listStudents: { path: '/api/v1/students', method: 'GET' },
  createStudent: { path: '/api/v1/students', method: 'POST' },
  recordAttendance: { path: '/api/v1/attendance', method: 'POST' },
  submitResults: { path: '/api/v1/results', method: 'POST' },
  processPayment: { path: '/api/v1/payments', method: 'POST' }
};`
          }
        ]
      },
      {
        id: 'd-database',
        name: 'database',
        path: 'database',
        type: 'directory',
        children: [
          {
            id: 'f-db-schema',
            name: 'schema.sql',
            path: 'database/schema.sql',
            type: 'file',
            language: 'sql',
            content: `-- Droz Universal Schema Definition (DUSD)
-- Target: PostgreSQL / SQLite hybrid

CREATE TABLE students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  admission_no VARCHAR(50) UNIQUE NOT NULL,
  name VARCHAR(100) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE results (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  term VARCHAR(20) NOT NULL,
  subject VARCHAR(60) NOT NULL,
  score DECIMAL(5,2) NOT NULL
);

CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE RESTRICT,
  amount DECIMAL(10,2) NOT NULL,
  receipt_no VARCHAR(40) UNIQUE NOT NULL,
  paid_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attendance (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id),
  date DATE NOT NULL,
  status VARCHAR(20) CHECK (status IN ('present', 'absent', 'late', 'excused'))
);`
          }
        ]
      },
      {
        id: 'd-targets',
        name: 'targets',
        path: 'targets',
        type: 'directory',
        children: [
          {
            id: 'd-target-android',
            name: 'android',
            path: 'targets/android',
            type: 'directory',
            platformSpecific: ['android'],
            children: [
              {
                id: 'f-android-gradle',
                name: 'build.gradle.kts',
                path: 'targets/android/build.gradle.kts',
                type: 'file',
                language: 'kotlin',
                content: `plugins {
    alias(libs.plugins.android.application)
    alias(libs.plugins.kotlin.android)
}

android {
    namespace = "com.droz.schoolsphere"
    compileSdk = 35

    defaultConfig {
        applicationId = "com.droz.schoolsphere"
        minSdk = 26
        targetSdk = 35
        versionCode = 142
        versionName = "1.4.2"
    }

    buildTypes {
        release {
            isMinifyEnabled = true
            proguardFiles(getDefaultProguardFile("proguard-android-optimize.txt"), "proguard-rules.pro")
        }
    }
}`
              }
            ]
          },
          {
            id: 'd-target-ios',
            name: 'ios',
            path: 'targets/ios',
            type: 'directory',
            platformSpecific: ['ios'],
            children: [
              {
                id: 'f-ios-app',
                name: 'App.swift',
                path: 'targets/ios/App.swift',
                type: 'file',
                language: 'swift',
                content: `import SwiftUI

@main
struct DrozApp: App {
    var body: some Scene {
        WindowGroup {
            ContentView()
        }
    }
}`
              }
            ]
          },
          {
            id: 'd-target-windows',
            name: 'windows',
            path: 'targets/windows',
            type: 'directory',
            platformSpecific: ['windows'],
            children: [
              {
                id: 'f-win-manifest',
                name: 'Package.appxmanifest',
                path: 'targets/windows/Package.appxmanifest',
                type: 'file',
                language: 'xml',
                content: `<?xml version="1.0" encoding="utf-8"?>
<Package xmlns="http://schemas.microsoft.com/appx/manifest/foundation/windows10">
  <Identity Name="Droz.SchoolSphere" Publisher="CN=DROZ" Version="1.4.2.0" />
  <Properties>
    <DisplayName>SchoolSphere Universal</DisplayName>
    <PublisherDisplayName>DROZ Engineering</PublisherDisplayName>
    <Logo>Assets\\StoreLogo.png</Logo>
  </Properties>
</Package>`
              }
            ]
          },
          {
            id: 'd-target-web',
            name: 'web',
            path: 'targets/web',
            type: 'directory',
            platformSpecific: ['web'],
            children: [
              {
                id: 'f-web-manifest',
                name: 'manifest.json',
                path: 'targets/web/manifest.json',
                type: 'file',
                language: 'json',
                content: `{
  "name": "SchoolSphere Universal Portal",
  "short_name": "SchoolSphere",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#0B0F17",
  "theme_color": "#06B6D4"
}`
              }
            ]
          }
        ]
      }
    ]
  }
];

export const INITIAL_TABLES: DatabaseTable[] = [
  {
    id: 'tbl-students',
    name: 'Students',
    rowCount: 1248,
    fields: [
      { name: 'id', type: 'UUID', isPrimary: true, isNullable: false },
      { name: 'admission_no', type: 'VARCHAR', isNullable: false },
      { name: 'name', type: 'VARCHAR', isNullable: false },
      { name: 'created_at', type: 'TIMESTAMP', isNullable: false }
    ]
  },
  {
    id: 'tbl-results',
    name: 'Results',
    rowCount: 4992,
    fields: [
      { name: 'id', type: 'UUID', isPrimary: true, isNullable: false },
      { name: 'student_id', type: 'UUID', foreignKey: { table: 'Students', field: 'id' } },
      { name: 'term', type: 'VARCHAR', isNullable: false },
      { name: 'subject', type: 'VARCHAR', isNullable: false },
      { name: 'score', type: 'DECIMAL', isNullable: false }
    ]
  },
  {
    id: 'tbl-payments',
    name: 'Payments',
    rowCount: 2130,
    fields: [
      { name: 'id', type: 'UUID', isPrimary: true, isNullable: false },
      { name: 'student_id', type: 'UUID', foreignKey: { table: 'Students', field: 'id' } },
      { name: 'amount', type: 'DECIMAL', isNullable: false },
      { name: 'receipt_no', type: 'VARCHAR', isNullable: false },
      { name: 'paid_at', type: 'TIMESTAMP', isNullable: false }
    ]
  },
  {
    id: 'tbl-attendance',
    name: 'Attendance',
    rowCount: 48900,
    fields: [
      { name: 'id', type: 'UUID', isPrimary: true, isNullable: false },
      { name: 'student_id', type: 'UUID', foreignKey: { table: 'Students', field: 'id' } },
      { name: 'date', type: 'TIMESTAMP', isNullable: false },
      { name: 'status', type: 'VARCHAR', isNullable: false }
    ]
  }
];

export const INITIAL_ENDPOINTS: APIEndpoint[] = [
  {
    id: 'ep-get-students',
    name: 'List All Students',
    path: '/api/v1/students',
    method: 'GET',
    description: 'Fetch paginated roster of active students with grade affiliation',
    headers: { 'Authorization': 'Bearer dzk_live_9921', 'Content-Type': 'application/json' },
    sampleResponse: `{\n  "total": 1248,\n  "page": 1,\n  "students": [\n    {\n      "id": "std_01",\n      "admissionNo": "SCH-2026-AB",\n      "name": "Alexander Vance",\n      "status": "active"\n    }\n  ]\n}`,
    status: 200
  },
  {
    id: 'ep-post-student',
    name: 'Enroll New Student',
    path: '/api/v1/students',
    method: 'POST',
    description: 'Register a new student entity with automated fee ledger creation',
    headers: { 'Authorization': 'Bearer dzk_live_9921', 'Content-Type': 'application/json' },
    requestBody: `{\n  "admissionNo": "SCH-2026-EF",\n  "name": "Sophia Chen",\n  "gradeLevel": "Grade 10",\n  "guardianEmail": "chen.fam@example.com"\n}`,
    sampleResponse: `{\n  "success": true,\n  "studentId": "std_02",\n  "status": "enrolled",\n  "ledgerCreated": true\n}`,
    status: 201
  },
  {
    id: 'ep-get-results',
    name: 'Get Student Results',
    path: '/api/v1/results/:studentId',
    method: 'GET',
    description: 'Retrieve academic transcripts and grade breakdowns for a student',
    headers: { 'Authorization': 'Bearer dzk_live_9921' },
    sampleResponse: `{\n  "studentId": "std_01",\n  "term": "Fall 2026",\n  "gpa": 3.85,\n  "subjects": [\n    { "name": "Calculus", "score": 94 },\n    { "name": "Physics", "score": 89 }\n  ]\n}`,
    status: 200
  },
  {
    id: 'ep-post-payment',
    name: 'Submit Tuition Payment',
    path: '/api/v1/payments',
    method: 'POST',
    description: 'Process bank or card payment against outstanding student fees',
    headers: { 'Authorization': 'Bearer dzk_live_9921', 'Content-Type': 'application/json' },
    requestBody: `{\n  "studentId": "std_01",\n  "amount": 750.00,\n  "paymentMethod": "wire_transfer"\n}`,
    sampleResponse: `{\n  "receiptNo": "RCP-88921-2026",\n  "status": "settled",\n  "remainingBalance": 0.00\n}`,
    status: 200
  },
  {
    id: 'ep-post-attendance',
    name: 'Log Daily Attendance',
    path: '/api/v1/attendance',
    method: 'POST',
    description: 'Record biometric attendance batch for morning roll call',
    headers: { 'Authorization': 'Bearer dzk_live_9921', 'Content-Type': 'application/json' },
    requestBody: `{\n  "records": [\n    { "studentId": "std_01", "status": "present" },\n    { "studentId": "std_02", "status": "late" }\n  ]\n}`,
    sampleResponse: `{\n  "processed": 2,\n  "timestamp": "2026-09-24T08:30:00Z"\n}`,
    status: 200
  }
];

export const INITIAL_BUILD_TARGETS: BuildTargetInfo[] = [
  {
    id: 'android',
    name: 'Android',
    icon: 'Smartphone',
    artifactFormat: 'APK / AAB (Google Play)',
    status: 'released',
    progress: 100,
    outputArtifact: 'SchoolSphere-v1.4.2-universal.apk',
    fileSize: '34.2 MB',
    checksum: 'sha256:8b4f17c29e...38a',
    signingStatus: 'Verified (Android Keystore v3 Scheme)',
    logs: [
      '[DROZ ANDROID] Gradle Daemon initialized (JDK 21, AGP 8.6.0)',
      '[DROZ ANDROID] Compiling Kotlin Multiplatform domain & Compose UI',
      '[DROZ ANDROID] Running Proguard minification & R8 shrinker',
      '[DROZ ANDROID] Signed with release keystore: key-alias=droz-release',
      '[DROZ ANDROID] Release Artifact Generated: SchoolSphere-v1.4.2-universal.apk (34.2 MB)'
    ]
  },
  {
    id: 'ios',
    name: 'iOS',
    icon: 'Apple',
    artifactFormat: 'IPA (App Store & TestFlight)',
    status: 'idle',
    progress: 0,
    outputArtifact: 'SchoolSphere-v1.4.2.ipa',
    fileSize: '41.8 MB',
    checksum: 'sha256:c92a71d0...92b',
    signingStatus: 'Ready (Apple Developer ID: Droz Inc)',
    logs: [
      '[DROZ iOS] Xcodebuild adapter standing by for Mac host or Cloud Mac runner'
    ]
  },
  {
    id: 'windows',
    name: 'Windows',
    icon: 'Monitor',
    artifactFormat: 'MSIX / EXE (Windows 10/11)',
    status: 'released',
    progress: 100,
    outputArtifact: 'SchoolSphere-Setup-x64.msix',
    fileSize: '28.9 MB',
    checksum: 'sha256:d17c91fa...01e',
    signingStatus: 'Code Signed (DigiCert EV Certificate)',
    logs: [
      '[DROZ WINDOWS] Invoking MSBuild with WinUI 3 toolchain',
      '[DROZ WINDOWS] Packaging AppX manifest & bundling native runtime',
      '[DROZ WINDOWS] Output generated: SchoolSphere-Setup-x64.msix (28.9 MB)'
    ]
  },
  {
    id: 'macos',
    name: 'macOS',
    icon: 'Laptop',
    artifactFormat: 'APP / DMG (Universal Binary)',
    status: 'idle',
    progress: 0,
    outputArtifact: 'SchoolSphere-Universal.dmg',
    fileSize: '31.4 MB',
    checksum: 'sha256:39a0ef19...55c',
    signingStatus: 'Notarization Ready',
    logs: [
      '[DROZ macOS] Universal binary Clang compilation pipeline queued'
    ]
  },
  {
    id: 'linux',
    name: 'Linux',
    icon: 'Server',
    artifactFormat: 'AppImage / Flatpak',
    status: 'released',
    progress: 100,
    outputArtifact: 'SchoolSphere-x86_64.AppImage',
    fileSize: '26.1 MB',
    checksum: 'sha256:77f10a8c...41d',
    signingStatus: 'GPG Key Signed',
    logs: [
      '[DROZ LINUX] Bundling shared dependencies into standalone AppDir',
      '[DROZ LINUX] Output generated: SchoolSphere-x86_64.AppImage (26.1 MB)'
    ]
  },
  {
    id: 'web',
    name: 'Web & PWA',
    icon: 'Globe',
    artifactFormat: 'Production Bundle / PWA',
    status: 'released',
    progress: 100,
    outputArtifact: 'dist-web/ (Vite ESNext)',
    fileSize: '1.8 MB (gzipped: 412 KB)',
    checksum: 'sha256:1a84f33b...90c',
    signingStatus: 'TLS/HTTPS Edge Ready',
    logs: [
      '[DROZ WEB] Vite 8 rollup optimization complete',
      '[DROZ WEB] Service Worker Workbox pre-caching generated',
      '[DROZ WEB] Web app manifest validated'
    ]
  }
];

export const INITIAL_DEVICES: ConnectedDevice[] = [
  {
    id: 'dev-redmi-15',
    name: 'Redmi Device',
    platform: 'android',
    osVersion: 'Android 15 (Vanilla Ice Cream)',
    connectionType: 'USB',
    status: 'connected',
    batteryLevel: 92,
    screenResolution: '1080 x 2400 (FHD+)'
  },
  {
    id: 'dev-win-11',
    name: 'Windows PC (Host)',
    platform: 'windows',
    osVersion: 'Windows 11 Pro 24H2',
    connectionType: 'Local',
    status: 'connected',
    batteryLevel: 100,
    screenResolution: '3840 x 2160 (4K UHD)'
  },
  {
    id: 'dev-iphone-16',
    name: 'iPhone 16 Pro Simulator',
    platform: 'ios',
    osVersion: 'iOS 18.1 (Simulated)',
    connectionType: 'Simulator',
    status: 'connected',
    screenResolution: '1179 x 2556'
  },
  {
    id: 'dev-web-browser',
    name: 'Edge / Chrome Runtime',
    platform: 'web',
    osVersion: 'Chromium 128 (Edge/Chrome)',
    connectionType: 'Local',
    status: 'connected',
    screenResolution: 'Responsive Viewport'
  }
];

export const INITIAL_TESTS: TestCase[] = [
  { id: 't-1', name: 'validateAdmission() rejects malformed format', suite: 'unit', status: 'passed', durationMs: 4 },
  { id: 't-2', name: 'calculateGPA() computes weighted credit scores', suite: 'unit', status: 'passed', durationMs: 6 },
  { id: 't-3', name: 'verifySessionExpiry() flags expired timestamps', suite: 'unit', status: 'passed', durationMs: 2 },
  { id: 't-4', name: 'Students table foreign keys integrity constraint', suite: 'integration', status: 'passed', durationMs: 18 },
  { id: 't-5', name: 'POST /api/v1/students creates ledger row atomically', suite: 'api', status: 'passed', durationMs: 34 },
  { id: 't-6', name: 'POST /api/v1/payments validates non-negative amount', suite: 'api', status: 'passed', durationMs: 22 },
  { id: 't-7', name: 'StudentDashboard renders active roster grid', suite: 'ui', status: 'passed', durationMs: 45 },
  { id: 't-8', name: 'Attendance batch roll call records timestamps', suite: 'integration', status: 'passed', durationMs: 28 },
  { id: 't-9', name: 'Biometric Keystore signature verification handshake', suite: 'integration', status: 'failed', durationMs: 62, errorMessage: 'NullPointerException: BiometricPrompt.AuthenticationCallback listener target not initialized on Android 15 fallback mock.' },
  { id: 't-10', name: 'Receipt number uniqueness collision detector', suite: 'unit', status: 'passed', durationMs: 12 },
  { id: 't-11', name: 'Export transcript PDF report generation stream', suite: 'integration', status: 'failed', durationMs: 91, errorMessage: 'TimeoutError: PDF font descriptor metrics stream failed to resolve Arial Bold.' },
  { id: 't-12', name: 'Cross-platform PWA offline service worker caching', suite: 'ui', status: 'failed', durationMs: 50, errorMessage: 'AssertionError: Expected cache key "v1.4.2" but received undefined.' }
];

export const INITIAL_SECURITY_ISSUES: SecurityIssue[] = [
  {
    id: 'sec-1',
    severity: 'high',
    title: 'Outdated Encryption Algorithm in Auth Helper',
    category: 'Vulnerable Dependency',
    filePath: 'core/auth.ts',
    line: 14,
    remediation: 'Migrate from deprecated SHA-1 hash to modern Argon2id or Ed25519 standard.'
  },
  {
    id: 'sec-2',
    severity: 'medium',
    title: 'Hardcoded Mock Token In Header Test Preset',
    category: 'Exposed Secret',
    filePath: 'api/routes.ts',
    line: 8,
    remediation: 'Inject authorization bearer tokens dynamically via Droz Environment Manager rather than inline strings.'
  }
];

export const INITIAL_PERFORMANCE: PerformanceMetrics = {
  cpuUsage: 14.2,
  memoryMb: 248.5,
  buildTimeSec: 4.8,
  appStartupMs: 320,
  apiLatencyMs: 38,
  dbQueryLatencyMs: 4.2,
  fps: 60
};

export const INITIAL_UI_CANVAS_ITEMS: UIComponentItem[] = [
  {
    id: 'ui-comp-header',
    name: 'Top Header Bar',
    type: 'header',
    category: 'layout',
    props: {
      title: 'SchoolSphere Portal',
      subtitle: 'Universal Academic Suite',
      badge: 'v1.4.2 Live',
      bgColor: 'bg-slate-900',
      textColor: 'text-cyan-400'
    }
  },
  {
    id: 'ui-comp-metrics',
    name: 'Key Stats Grid',
    type: 'container',
    category: 'layout',
    props: {
      columns: 4,
      cards: [
        { label: 'Active Students', value: '1,248', trend: '+12% this term', color: 'emerald' },
        { label: 'Today Attendance', value: '98.4%', trend: 'Roll call synced', color: 'cyan' },
        { label: 'Collected Fees', value: '$184,200', trend: '94% collected', color: 'purple' },
        { label: 'Active Teachers', value: '64', trend: 'Full roster', color: 'amber' }
      ]
    }
  },
  {
    id: 'ui-comp-actions',
    name: 'Action Bar',
    type: 'navigation',
    category: 'navigation',
    props: {
      buttons: [
        { label: '+ Enroll Student', variant: 'primary', icon: 'UserPlus' },
        { label: 'Record Attendance', variant: 'secondary', icon: 'CheckCircle' },
        { label: 'Issue Report Card', variant: 'secondary', icon: 'FileText' },
        { label: 'Export Ledger', variant: 'outline', icon: 'Download' }
      ]
    }
  },
  {
    id: 'ui-comp-table',
    name: 'Student Roster Table',
    type: 'table',
    category: 'data',
    props: {
      title: 'Recent Registrations',
      headers: ['Admission No', 'Student Name', 'Grade Level', 'Guardian Contact', 'Status', 'Actions'],
      rows: [
        ['SCH-2026-AB', 'Alexander Vance', 'Grade 12', 'vance@example.com', 'Active', 'Edit'],
        ['SCH-2026-CD', 'Elena Rostova', 'Grade 11', 'rostova.p@example.com', 'Active', 'Edit'],
        ['SCH-2026-EF', 'Sophia Chen', 'Grade 10', 'chen.fam@example.com', 'Active', 'Edit'],
        ['SCH-2026-GH', 'Marcus Thorne', 'Grade 12', 'thorne.m@example.com', 'Suspended', 'Review']
      ]
    }
  }
];

export const INITIAL_EXTENSIONS: IDEExtension[] = [
  {
    id: 'ext-kmp',
    name: 'Kotlin Multiplatform Mobile & Compose',
    author: 'JetBrains',
    version: '2.1.20',
    description: 'First-class KMP support for Android, iOS, Desktop, and Web with Jetpack Compose previews and Gradle build sync.',
    icon: 'Smartphone',
    rating: 4.9,
    downloads: '5.4M',
    category: 'Languages',
    installed: true,
    enabled: true,
    tags: ['kotlin', 'compose', 'android', 'ios', 'kmp']
  },
  {
    id: 'ext-flutter',
    name: 'Flutter & Dart Supercharged',
    author: 'Dart Code Team',
    version: '3.88.0',
    description: 'Hot reload, widget inspector, devtools profiler, and code navigation for Flutter cross-platform applications.',
    icon: 'Layers',
    rating: 4.8,
    downloads: '8.2M',
    category: 'Frameworks',
    installed: true,
    enabled: true,
    tags: ['flutter', 'dart', 'mobile', 'web']
  },
  {
    id: 'ext-gitlens',
    name: 'GitLens — Git supercharged',
    author: 'GitKraken',
    version: '15.4.1',
    description: 'Supercharge Git inside Droz Studio: line blame, commit graph, visual branch comparison, worktrees, and interactive rebase.',
    icon: 'GitBranch',
    rating: 4.9,
    downloads: '32.1M',
    category: 'DevOps',
    installed: true,
    enabled: true,
    tags: ['git', 'version-control', 'diff', 'blame']
  },
  {
    id: 'ext-winui',
    name: 'Windows App SDK & WinUI 3 Tools',
    author: 'Microsoft DevDiv',
    version: '1.6.0',
    description: 'Visual XAML hot reload, MSIX packaging, and native C#/WinUI 3 tooling for Windows 10 and Windows 11 modern apps.',
    icon: 'Monitor',
    rating: 4.7,
    downloads: '2.1M',
    category: 'Frameworks',
    installed: true,
    enabled: true,
    tags: ['windows', 'winui', 'msix', 'xaml', 'csharp']
  },
  {
    id: 'ext-tailwind',
    name: 'Tailwind CSS IntelliSense',
    author: 'Tailwind Labs',
    version: '0.12.7',
    description: 'Intelligent autocomplete, class linting, hover documentation, and CSS color decorators for Tailwind CSS v4.',
    icon: 'Sparkles',
    rating: 4.9,
    downloads: '18.9M',
    category: 'Linters',
    installed: true,
    enabled: true,
    tags: ['css', 'tailwind', 'styling', 'autocomplete']
  },
  {
    id: 'ext-docker',
    name: 'Docker & Microservices Studio',
    author: 'Docker Community',
    version: '1.29.0',
    description: 'Manage containers, docker-compose orchestration, image registries, and cloud deployment pipelines directly in Droz.',
    icon: 'Boxes',
    rating: 4.8,
    downloads: '24.6M',
    category: 'DevOps',
    installed: false,
    enabled: false,
    tags: ['docker', 'containers', 'kubernetes', 'cloud']
  },
  {
    id: 'ext-rust',
    name: 'Rust Analyzer Pro',
    author: 'rust-lang.org',
    version: '0.4.21',
    description: 'Blazing fast Rust language server, borrow checker hints, macro expansion, and Cargo test runner integration.',
    icon: 'Cpu',
    rating: 4.9,
    downloads: '6.7M',
    category: 'Languages',
    installed: false,
    enabled: false,
    tags: ['rust', 'cargo', 'native', 'performance']
  },
  {
    id: 'ext-sonar',
    name: 'SonarQube SAST & Zero-Day Scanner',
    author: 'SonarSource',
    version: '4.9.0',
    description: 'Deep static application security testing (SAST), code smells detection, vulnerability prevention, and OWASP Top 10 compliance.',
    icon: 'ShieldCheck',
    rating: 4.8,
    downloads: '7.8M',
    category: 'AI',
    installed: true,
    enabled: true,
    tags: ['security', 'sast', 'code-quality', 'audit']
  }
];

export const INITIAL_LOGCAT_ENTRIES: LogcatEntry[] = [
  {
    id: 'log-1',
    timestamp: '14:20:01.102',
    level: 'I',
    tag: 'ActivityTaskManager',
    pid: 1420,
    tid: 1420,
    message: 'START u0 {act=android.intent.action.MAIN cat=[android.intent.category.LAUNCHER] cmp=com.droz.schoolsphere/.MainActivity}',
    package: 'com.droz.schoolsphere'
  },
  {
    id: 'log-2',
    timestamp: '14:20:01.145',
    level: 'D',
    tag: 'DrozRuntime',
    pid: 1420,
    tid: 1435,
    message: 'Engine v2026.2 initialized on Android 15 (API 35) ARM64-v8a',
    package: 'com.droz.schoolsphere'
  },
  {
    id: 'log-3',
    timestamp: '14:20:01.198',
    level: 'D',
    tag: 'AndroidKeystore',
    pid: 1420,
    tid: 1438,
    message: 'Hardware enclave key "droz_biometric_master_rsa" successfully loaded & validated.',
    package: 'com.droz.schoolsphere'
  },
  {
    id: 'log-4',
    timestamp: '14:20:01.240',
    level: 'I',
    tag: 'DrozSQLite',
    pid: 1420,
    tid: 1439,
    message: 'Database opened: /data/user/0/com.droz.schoolsphere/databases/schoolsphere.db (WAL mode: ON, encryption: AES-256)',
    package: 'com.droz.schoolsphere'
  },
  {
    id: 'log-5',
    timestamp: '14:20:01.312',
    level: 'D',
    tag: 'Compose',
    pid: 1420,
    tid: 1420,
    message: 'Recomposing StudentDashboardView: 12 child nodes rendered in 2.4ms (60 FPS locked)',
    package: 'com.droz.schoolsphere'
  },
  {
    id: 'log-6',
    timestamp: '14:20:01.450',
    level: 'I',
    tag: 'DrozWebSocket',
    pid: 1420,
    tid: 1442,
    message: 'Connected to wss://gateway.droz.dev/realtime/v2 (handshake took 38ms, TLS 1.3)',
    package: 'com.droz.schoolsphere'
  },
  {
    id: 'log-7',
    timestamp: '14:20:01.620',
    level: 'W',
    tag: 'RenderThread',
    pid: 1420,
    tid: 1450,
    message: 'Missed vsync window by 0.6ms during high-density SVG asset rasterization (non-blocking)',
    package: 'com.droz.schoolsphere'
  },
  {
    id: 'log-8',
    timestamp: '14:20:01.780',
    level: 'I',
    tag: 'StudentRepository',
    pid: 1420,
    tid: 1439,
    message: 'Cached 1,248 student indices in memory buffer (allocated 1.8 MB)',
    package: 'com.droz.schoolsphere'
  },
  {
    id: 'log-9',
    timestamp: '14:20:02.100',
    level: 'D',
    tag: 'VulkanRenderer',
    pid: 1420,
    tid: 1450,
    message: 'VkDeviceQueue: 0xb4000072cb0 ready with PipelineCache hit rate 99.4%',
    package: 'com.droz.schoolsphere'
  },
  {
    id: 'log-10',
    timestamp: '14:20:02.340',
    level: 'I',
    tag: 'DrozSyncWorker',
    pid: 1420,
    tid: 1455,
    message: 'WorkManager scheduled periodic background sync for Attendance records (Interval: 15m)',
    package: 'com.droz.schoolsphere'
  }
];

export const INITIAL_PROFILER_STATE: ProfilerState = {
  cpuHistory: [14, 28, 42, 65, 38, 22, 18, 29, 35, 19, 15, 24, 30, 22, 17, 19],
  memoryBreakdown: {
    java: 42.5,
    native: 38.2,
    graphics: 18.6,
    code: 14.1,
    stack: 4.8
  },
  networkRequests: [
    {
      id: 'net-1',
      timestamp: '14:20:01',
      method: 'GET',
      url: '/api/v1/students?grade=12&limit=50',
      status: 200,
      durationMs: 42,
      sizeKb: 14.2,
      type: 'json'
    },
    {
      id: 'net-2',
      timestamp: '14:20:01',
      method: 'GET',
      url: '/assets/icons/student_badge.svg',
      status: 304,
      durationMs: 8,
      sizeKb: 2.1,
      type: 'image'
    },
    {
      id: 'net-3',
      timestamp: '14:20:02',
      method: 'POST',
      url: '/api/v1/attendance/verify-biometric',
      status: 200,
      durationMs: 68,
      sizeKb: 1.4,
      type: 'json'
    },
    {
      id: 'net-4',
      timestamp: '14:20:02',
      method: 'GET',
      url: 'wss://gateway.droz.dev/realtime',
      status: 101,
      durationMs: 38,
      sizeKb: 0.8,
      type: 'websocket'
    }
  ],
  batteryDrainPerHr: 1.8,
  fps: 60
};

