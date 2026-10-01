# TribalSetu

TribalSetu is a mobile-first unified scholarship portal concept for students from Scheduled Tribe (ST) communities. It brings scholarship discovery, application tracking, document management, verification follow-up, and payment status into one student experience, with a separate administrative workspace.

The project is a React frontend prototype. It demonstrates the proposed service and user journeys using local mock data; it is not an official Ministry of Tribal Affairs (MoTA) service and does not currently connect to government identity, document, education, or payment systems.

## Goals

The proposal responds to a fragmented scholarship experience in which students may need to use separate portals, repeatedly provide the same documents, and follow application and payment progress across disconnected systems. TribalSetu explores a unified profile and dashboard to make that process easier to understand and manage.

The product concept covers five MoTA scholarship and fellowship schemes:

- Pre-Matric Scholarship for ST students
- Post-Matric Scholarship for ST students
- Top Class Education for ST students
- National Fellowship for ST students (NFST)
- National Overseas Scholarship (NOS)

Scheme eligibility, award rules, and the one-scholarship-at-a-time policy must always follow the current official scheme guidelines. The prototype's sample data and copy are illustrative, not authoritative policy.

## Demonstrated Workflows

- **Public portal:** Browse schemes, use the eligibility wizard, read FAQs, and access help content.
- **Student workspace:** View a consolidated dashboard and application statuses, start an application, manage a sample document wallet, respond to deficiencies, track sample DBT payments, review notifications, and view a profile.
- **Administrative workspace:** Review applications and verification queues, manage deficiencies and disbursements, inspect institutions, view outreach and analytics, and review audit activity.
- **Guidance:** A JAGO-branded chatbot interface demonstrates scholarship help and status-query flows.
- **Responsive UI:** The app is designed for mobile and desktop use.

The current services use in-memory/mock data and simulated asynchronous responses. Actions in the demo do not submit official applications or change government records.

## Proposed Production Integrations

The attached concept describes integrations that would require authorized APIs, institutional agreements, security review, and backend implementation. They are not wired up in this frontend prototype.

- **Authentication and registration:** Aadhaar-linked One-Time Registration (OTR), with consent, OTP/MFA, and compliant identity verification.
- **Digital documents:** DigiLocker credentials and National Academic Depository records for reusable certificates and academic documents, with secure local upload as a fallback.
- **Eligibility and verification:** Relevant state e-District and tribal welfare services, UIDAI-authorized verification, AISHE/UDISE+ institutional records, UDID, and applicable UGC/NTA records.
- **Payments:** PFMS/DBT payment status and transaction history.
- **Notifications and assistance:** SMS, email, push, multilingual JAGO support, and possible Bhashini translation.
- **Operations:** Role-scoped access, auditable actions, secure API gateway, encrypted storage and transport, monitoring, and analytics for scheme reach and processing bottlenecks.

Integrations involving Aadhaar, financial data, or government records must only be implemented through approved channels and applicable consent, privacy, security, and legal processes. Do not use real personal data with this demo.

## Technology

- React 19 and TypeScript
- Vite
- React Router
- Tailwind CSS
- Zustand for client state
- TanStack Query
- Recharts and Lucide React

## Getting Started

Prerequisites: Node.js and npm versions supported by the installed Vite release.

```bash
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

To create and preview a production build:

```bash
npm run build
npm run preview
```

## Project Structure

```text
src/
  components/common/  Shared navigation, footer, chatbot, and document modal
  data/               Illustrative scholarship, student, and admin data
  layouts/            Public, student, and admin application shells
  pages/admin/        Administrative dashboard and workflow screens
  pages/public/       Landing, scheme discovery, eligibility, and help screens
  pages/student/      Student applications, profile, wallet, and payment screens
  services/           Frontend service adapters backed by mock data
  stores/             Shared client-side state
  types/              TypeScript domain types
```

## Current Limitations

- There is no backend, database, production authentication, or real student account.
- Government identity, DigiLocker, AISHE, UDISE+, e-District, UGC/NTA, UDID, PFMS, SMS, and translation APIs are not connected.
- Sample students, applications, documents, verification results, and payments are mock data.
- The prototype is not a source of official eligibility decisions, scheme terms, sanction information, or payment confirmation.

## Project Status

TribalSetu is a frontend concept/demo for exploring a unified tribal scholarship experience. Production use would require validated scheme rules, backend services, approved integrations, privacy and security controls, accessibility and security testing, and operational readiness with MoTA and relevant government partners.
