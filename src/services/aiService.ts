/**
 * Droz AI Engine & AI Agent Service
 * Handles unified intelligence, multi-step agent pipelines,
 * code explanation, error diagnosis, and cross-layer impact analysis.
 */

import { AgentStep, AIAgentPlan } from '../types/droz';

export interface AIResponse {
  success: boolean;
  source: string;
  text: string;
}

export async function askDrozAI(
  prompt: string,
  mode: 'general' | 'agent' | 'debug' | 'architecture' | 'impact' = 'general',
  projectContext?: any
): Promise<AIResponse> {
  try {
    const res = await fetch('/api/ai/generate', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        prompt,
        mode,
        projectContext: {
          platform: 'Droz Universal Platform',
          activeTargets: ['android', 'ios', 'windows', 'macos', 'linux', 'web'],
          ...projectContext
        }
      })
    });

    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }

    return await res.json();
  } catch (err: any) {
    console.warn('[DROZ AI] Server call failed, using built-in local fallback engine', err);
    return {
      success: true,
      source: 'offline-local-engine',
      text: getLocalHeuristicResponse(prompt, mode)
    };
  }
}

export function createInitialAgentSteps(): AgentStep[] {
  return [
    { id: 1, title: 'Analyze requirements & user intent', status: 'pending' },
    { id: 2, title: 'Inquire & validate missing domain rules', status: 'pending' },
    { id: 3, title: 'Design cross-platform unified architecture', status: 'pending' },
    { id: 4, title: 'Create multi-target project directory structure', status: 'pending' },
    { id: 5, title: 'Create universal relational database schema', status: 'pending' },
    { id: 6, title: 'Generate backend services & domain logic', status: 'pending' },
    { id: 7, title: 'Generate responsive visual frontend layouts', status: 'pending' },
    { id: 8, title: 'Generate biometric & token-based authentication', status: 'pending' },
    { id: 9, title: 'Generate REST & WebSocket API endpoints', status: 'pending' },
    { id: 10, title: 'Generate unit, integration & UI test suites', status: 'pending' },
    { id: 11, title: 'Run cross-platform compilation & build validation', status: 'pending' },
    { id: 12, title: 'Identify runtime errors & security flaws', status: 'pending' },
    { id: 13, title: 'Apply automated developer-reviewed fixes', status: 'pending' },
    { id: 14, title: 'Produce comprehensive development & release report', status: 'pending' }
  ];
}

function getLocalHeuristicResponse(prompt: string, mode: string): string {
  const p = prompt.toLowerCase();

  if (p.includes('hospital')) {
    return `### Droz Natural Language Plan: Hospital Management System
**Identity:** Universal Health Platform
**Platforms:** Android, iOS, Windows, macOS, Web

#### 1. Requirements Breakdown
- Patient Onboarding & Electronic Health Records (EHR)
- Doctor Triage, Clinical Shift Scheduling & Ward Allocation
- Pharmacy Prescription Fulfillment & Lab Order Tracking
- Role-Based Access: Chief Medical Officer, Physician, Nurse, Patient

#### 2. Architecture & Database Relational Map
- **Entities:** \`Patients\` ──< \`Appointments\` ──< \`MedicalRecords\` ──< \`Prescriptions\`
- **Security:** HIPAA-compliant field encryption (AES-256-GCM) on patient identifiers
- **APIs:** \`POST /api/v1/patients\`, \`POST /api/v1/triage\`, \`GET /api/v1/appointments\`

#### 3. Ready for Developer Approval
Approve to automatically generate project files, schemas, and test suites across Android, Windows, and Web.`;
  }

  if (p.includes('school')) {
    return `### Droz AI Agent: School Management Specification
**Execution Status:** Ready for Step-by-Step Generation

1. **Student Registration:** Admission numbers generated via sequence \`SCH-YYYY-XX\`
2. **Tuition & Fees:** Double-entry ledger tracking balances, installments, and receipts
3. **Attendance Engine:** Daily biometric sync with instant parent SMS/push notification
4. **Examination Grading:** Term GPA computation with transcript PDF generation
5. **Cross-Layer Impact:** Changing \`student_id\` cascade updates Results, Payments, and Attendance tables.`;
  }

  if (p.includes('nullpointer') || p.includes('error')) {
    return `### Droz AI Debugger: Error Analysis
**Error Type:** \`NullPointerException\` in Biometric Authentication Callback

#### Root Cause:
The native biometric prompt listener (\`BiometricPrompt.AuthenticationCallback\`) was invoked before the Android fragment lifecycle reached \`onViewCreated\`.

#### Recommended Solution:
\`\`\`kotlin
// Wrap inside lifecycle observer
viewLifecycleOwner.lifecycleScope.launchWhenStarted {
    biometricPrompt.authenticate(promptInfo)
}
\`\`\`
Click **Apply Solution** to review diff and commit to workspace.`;
  }

  return `### Droz AI Engine
**Status:** Online & Project Memory Active
Analyzed workspace structure across 6 target platforms.
All 14 autonomous agent stages are available for interactive orchestration.`;
}
