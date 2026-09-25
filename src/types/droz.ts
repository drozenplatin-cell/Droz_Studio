/**
 * Droz_Future_Project (DROZ)
 * Universal Software Creation Platform - Core Data Contracts
 */

export type PlatformTarget = 'android' | 'ios' | 'windows' | 'macos' | 'linux' | 'web';

export interface FileNode {
  id: string;
  name: string;
  path: string;
  type: 'file' | 'directory';
  content?: string;
  language?: string;
  children?: FileNode[];
  platformSpecific?: PlatformTarget[];
}

export interface UIComponentItem {
  id: string;
  name: string;
  type: 'text' | 'button' | 'image' | 'card' | 'table' | 'form' | 'input' | 'navigation' | 'modal' | 'list' | 'container' | 'chart' | 'tabs' | 'sidebar' | 'header' | 'footer';
  category: 'layout' | 'typography' | 'inputs' | 'data' | 'navigation' | 'feedback';
  props: Record<string, any>;
  children?: UIComponentItem[];
}

export interface DatabaseField {
  name: string;
  type: 'INTEGER' | 'VARCHAR' | 'TEXT' | 'BOOLEAN' | 'TIMESTAMP' | 'DECIMAL' | 'UUID';
  isPrimary?: boolean;
  isNullable?: boolean;
  foreignKey?: {
    table: string;
    field: string;
  };
}

export interface DatabaseTable {
  id: string;
  name: string;
  fields: DatabaseField[];
  rowCount?: number;
}

export interface APIEndpoint {
  id: string;
  name: string;
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  description: string;
  headers: Record<string, string>;
  requestBody?: string;
  sampleResponse?: string;
  status?: number;
}

export interface BuildTargetInfo {
  id: PlatformTarget;
  name: string;
  icon: string;
  artifactFormat: string;
  status: 'idle' | 'analyzing' | 'dependencies' | 'compiling' | 'testing' | 'security' | 'packaging' | 'signing' | 'released' | 'failed';
  progress: number;
  outputArtifact?: string;
  fileSize?: string;
  checksum?: string;
  signingStatus?: string;
  logs: string[];
}

export interface ConnectedDevice {
  id: string;
  name: string;
  platform: 'android' | 'ios' | 'windows' | 'macos' | 'web';
  osVersion: string;
  connectionType: 'USB' | 'WiFi' | 'Local' | 'Simulator';
  status: 'connected' | 'offline' | 'debugging' | 'running';
  batteryLevel?: number;
  screenResolution: string;
}

export interface TestCase {
  id: string;
  name: string;
  suite: 'unit' | 'integration' | 'api' | 'ui' | 'build';
  status: 'passed' | 'failed' | 'running' | 'idle';
  durationMs: number;
  errorMessage?: string;
}

export interface SecurityIssue {
  id: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  title: string;
  category: 'Vulnerable Dependency' | 'Exposed Secret' | 'Unsafe API' | 'Auth Leak' | 'Insecure Query';
  filePath: string;
  line?: number;
  remediation: string;
}

export interface PerformanceMetrics {
  cpuUsage: number;
  memoryMb: number;
  buildTimeSec: number;
  appStartupMs: number;
  apiLatencyMs: number;
  dbQueryLatencyMs: number;
  fps: number;
}

export interface AgentStep {
  id: number;
  title: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  details?: string;
  generatedArtifact?: string;
}

export interface AIAgentPlan {
  prompt: string;
  status: 'idle' | 'analyzing' | 'awaiting_review' | 'applying' | 'completed';
  steps: AgentStep[];
  currentStepIndex: number;
  summaryReport?: string;
}

export interface ProjectTemplate {
  id: string;
  name: string;
  tagline: string;
  category: 'Enterprise' | 'Web' | 'Mobile' | 'SaaS' | 'Healthcare' | 'Education' | 'E-commerce';
  description: string;
  platforms: PlatformTarget[];
  features: string[];
}

export interface ArchitecturePillar {
  number: number;
  title: string;
  summary: string;
  selectedTech: string;
  alternatives: { name: string; pros: string; cons: string }[];
  rationale: string;
  implementationCode: string;
}

export interface IDEExtension {
  id: string;
  name: string;
  author: string;
  version: string;
  description: string;
  icon: string;
  rating: number;
  downloads: string;
  category: 'Languages' | 'Frameworks' | 'Linters' | 'Themes' | 'DevOps' | 'AI' | 'Testing';
  installed: boolean;
  enabled: boolean;
  tags: string[];
}

export interface LogcatEntry {
  id: string;
  timestamp: string;
  level: 'V' | 'D' | 'I' | 'W' | 'E' | 'A';
  tag: string;
  pid: number;
  tid: number;
  message: string;
  package: string;
}

export interface NetworkInspectionItem {
  id: string;
  timestamp: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  status: number;
  durationMs: number;
  sizeKb: number;
  type: 'json' | 'image' | 'wasm' | 'websocket';
}

export interface ProfilerState {
  cpuHistory: number[];
  memoryBreakdown: {
    java: number;
    native: number;
    graphics: number;
    code: number;
    stack: number;
  };
  networkRequests: NetworkInspectionItem[];
  batteryDrainPerHr: number;
  fps: number;
}

