import { ProjectTemplate } from '../types/droz';

export const DROZ_TEMPLATES: ProjectTemplate[] = [
  {
    id: 'school-management',
    name: 'School Management System',
    tagline: 'Complete student registration, fees, exams, attendance & admin portal',
    category: 'Education',
    description: 'Enterprise educational platform supporting student onboarding, academic result grading, tuition payment tracking, and real-time attendance across Android tablets, Windows PCs, and Web.',
    platforms: ['android', 'ios', 'windows', 'macos', 'web'],
    features: ['Student & Staff Registry', 'Grading & Exam Engine', 'Fee Billing & Receipt Generation', 'Biometric & Daily Attendance', 'Multi-role RBAC']
  },
  {
    id: 'hospital-management',
    name: 'Hospital & Healthcare Suite',
    tagline: 'Patient registration, appointment booking, EHR & clinical dashboard',
    category: 'Healthcare',
    description: 'HIPAA-compliant healthcare management application with triage check-in, doctor scheduling, electronic prescription generation, and pharmacy inventory sync.',
    platforms: ['android', 'ios', 'windows', 'web'],
    features: ['Patient Medical Records (EHR)', 'Doctor Appointment Scheduling', 'Pharmacy & Lab Orders', 'In-hospital Bed Allocation', 'Secure Medical Telemetry']
  },
  {
    id: 'banking-fintech',
    name: 'Banking & FinTech Dashboard',
    tagline: 'Multi-currency ledger, fraud detection, cards & transfers',
    category: 'Enterprise',
    description: 'High-security financial creation template featuring double-entry transaction ledgers, biometric authentication (FaceID, Windows Hello), instant payments, and compliance audit logs.',
    platforms: ['android', 'ios', 'windows', 'macos', 'web'],
    features: ['Real-time Account Balances', 'Wire & Peer-to-Peer Transfers', 'Virtual Card Management', 'Fraud Anomaly Detection', 'Regulatory Compliance Reporting']
  },
  {
    id: 'ecommerce-omnichannel',
    name: 'Omnichannel E-Commerce',
    tagline: 'Global storefront, real-time cart, inventory sync & checkout',
    category: 'E-commerce',
    description: 'High-conversion cross-platform retail application with mobile POS for in-store staff, customer native mobile apps, and high-speed web storefront with edge caching.',
    platforms: ['android', 'ios', 'web'],
    features: ['Product Catalog & Variants', 'Real-time Stock Inventory', 'Stripe / Multi-provider Checkout', 'Order Fulfillment Pipeline', 'Customer Loyalty Points']
  },
  {
    id: 'saas-analytics-platform',
    name: 'SaaS Multi-Tenant Analytics',
    tagline: 'Subscription billing, team workspaces, live telemetry & charts',
    category: 'SaaS',
    description: 'Modern B2B SaaS boilerplate featuring team tenant isolation, usage-based billing, webhook dispatchers, and hardware-accelerated time-series metric charts.',
    platforms: ['windows', 'macos', 'linux', 'web'],
    features: ['Multi-tenant Isolation', 'Role & Permission Granularity', 'Usage Metering & Invoicing', 'Custom Webhooks & Events', 'Export to CSV / PDF']
  }
];
