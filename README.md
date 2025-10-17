# 🧩 Fologen — Agentic AI-Powered Portfolio Builder SaaS

**A fully dynamic, AI-driven SaaS platform where users create, customize, and publish personal portfolio websites using Agentic AI orchestration.**

---

## 📋 Table of Contents

1. [Project Overview](#project-overview)
2. [Core Features](#core-features)
3. [Pricing & Billing](#pricing--billing)
4. [System Architecture](#system-architecture)
5. [Technology Stack](#technology-stack)
6. [Database Schema](#database-schema)
7. [Agentic AI Design](#agentic-ai-design)
8. [Implementation Phases](#implementation-phases)
9. [Security & Compliance](#security--compliance)
10. [Scalability & Performance](#scalability--performance)
11. [Roadmap & Milestones](#roadmap--milestones)

---

## 🎯 Project Overview

### Objective
Build a SaaS platform where users can:
- Sign up and create personal portfolio websites
- Use Agentic AI to automatically generate and customize portfolios
- Modify content, design, images, and structure via natural language prompts
- Publish portfolios to custom or subdomain URLs
- Manage multiple portfolios with tiered subscription plans

### Key Value Proposition
- **Zero-to-portfolio in minutes** — AI generates initial portfolio from user data
- **Natural language control** — "Make my About section more professional" or "Add a new project"
- **Dynamic & centralized** — Single changes reflect across all user portfolios
- **Fully auditable** — Complete version history and rollback capabilities
- **Enterprise-ready** — RBAC, RLS, compliance, and monitoring built-in

### Example User Workflows

\`\`\`
User Flow 1: Quick Start
1. Sign up with GitHub/Google
2. Upload resume or connect LinkedIn
3. AI generates portfolio automatically
4. User reviews and publishes
5. Portfolio live at username.fologen.com

User Flow 2: AI-Powered Customization
1. User: "Change my profile picture"
2. AI Image Agent: Fetches/generates new image
3. User: "Make my About section more professional"
4. AI Content Agent: Refines text, updates DB
5. User: "Add accessibility fixes"
6. AI Auto-Fix Agent: Scans and patches issues
7. User: "Publish to custom domain"
8. AI Deployment Agent: Builds, validates, publishes
\`\`\`

---

## ✨ Core Features

### Phase 1: MVP Features
- ✅ User authentication (Clerk/NextAuth + social login)
- ✅ Portfolio creation from templates
- ✅ Basic AI content generation (bio, project descriptions)
- ✅ Image upload & management (Cloudinary)
- ✅ Live preview & publish to subdomain
- ✅ Free tier with limited AI edits

### Phase 2: Advanced Features
- ✅ Multiple portfolios per user
- ✅ Custom domain mapping
- ✅ AI design/theme customization
- ✅ Template marketplace
- ✅ Billing integration (Lemon Squeezy)
- ✅ Premium tier with unlimited portfolios

### Phase 3: Enterprise Features
- ✅ Team collaboration & multi-editor support
- ✅ Advanced auto-fix & accessibility scanning
- ✅ White-label/self-hosted options
- ✅ Third-party plugin system
- ✅ Advanced analytics & SEO tools

---

## 💰 Pricing & Billing

### Subscription Tiers

| Plan | Price | Portfolios | AI Edits | Templates | Custom Domain | Features |
|------|-------|-----------|----------|-----------|---------------|----------|
| **Free** | $0 | 1 | 10/month | Basic | ❌ | Subdomain only |
| **Starter** | $9/mo | 3 | 100/month | Premium | ✅ | AI Image Editing |
| **Premium** | $29/mo | Unlimited | Unlimited | All | ✅ | Full AI Automation, Priority Queue |

### Billing Implementation
- **Provider:** Lemon Squeezy (no Stripe)
- **Webhook Integration:** Sync subscription status, handle upgrades/downgrades
- **Usage Tracking:** Monitor AI calls, image generations, storage
- **Quota Enforcement:** Rate limit based on plan tier
- **Pro-rated Billing:** Handle mid-cycle upgrades/downgrades

---

## 🏗️ System Architecture

### High-Level Architecture Diagram

\`\`\`
┌─────────────────────────────────────────────────────────────────┐
│                        CLIENT LAYER                              │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Next.js App Router (TypeScript + Tailwind CSS)          │   │
│  │  - Portfolio Editor UI                                   │   │
│  │  - Template Gallery                                      │   │
│  │  - Admin Dashboard                                       │   │
│  │  - Real-time Preview                                     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                      API GATEWAY LAYER                           │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Next.js API Routes / Fastify                            │   │
│  │  - Authentication endpoints                              │   │
│  │  - Portfolio CRUD operations                             │   │
│  │  - AI orchestration router                               │   │
│  │  - Webhook handlers (Lemon Squeezy, deployments)         │   │
│  │  - Rate limiting & quota enforcement                     │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                   AI ORCHESTRATION LAYER                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  OpenAI Agents SDK + Custom Router                       │   │
│  │  ┌─────────────────────────────────────────────────────┐ │   │
│  │  │ Agent Router: Routes prompts to appropriate agents  │ │   │
│  │  │ - Content Agent                                     │ │   │
│  │  │ - Design Agent                                      │ │   │
│  │  │ - Image Agent                                       │ │   │
│  │  │ - Template Agent                                    │ │   │
│  │  │ - Deployment Agent                                  │ │   │
│  │  │ - Memory Agent                                      │ │   │
│  │  │ - Audit/History Agent                               │ │   │
│  │  │ - Auto-Fix Agent                                    │ │   │
│  │  │ - Billing Agent                                     │ │   │
│  │  └─────────────────────────────────────────────────────┘ │   │
│  │  - Context management & memory retrieval                │   │
│  │  - Tool execution (DB, storage, APIs)                   │   │
│  │  - Concurrency & isolation                              │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                    DATA & STORAGE LAYER                          │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Neon (PostgreSQL) + pgvector                            │   │
│  │  - User & subscription data                              │   │
│  │  - Portfolio content (JSONB)                             │   │
│  │  - Vector embeddings (Memory Agent)                      │   │
│  │  - Audit logs & version history                          │   │
│  │  - Row-level security (RLS) for tenant isolation         │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Cloudinary / UploadThing                                │   │
│  │  - Image storage & optimization                          │   │
│  │  - CDN delivery                                          │   │
│  └──────────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  Redis (Upstash)                                         │   │
│  │  - Session management                                    │   │
│  │  - Rate limit counters                                   │   │
│  │  - Cache layer                                           │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│                  EXTERNAL SERVICES LAYER                         │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  OpenAI API (GPT-4, Vision)                              │   │
│  │  Lemon Squeezy (Billing & Subscriptions)                 │   │
│  │  Clerk / NextAuth (Authentication)                       │   │
│  │  Vercel (Hosting & Deployments)                          │   │
│  │  Cloudflare (DNS, CDN, DDoS Protection)                  │   │
│  │  Sentry (Error Monitoring)                               │   │
│  └──────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
\`\`\`

### Data Flow: User Prompt → Published Portfolio

\`\`\`
1. USER SUBMITS PROMPT
   └─> "Make my About section more professional"

2. FRONTEND SENDS REQUEST
   └─> POST /api/ai/process
       ├─ userId
       ├─ portfolioId
       ├─ prompt
       └─ context (current portfolio state)

3. API ROUTER RECEIVES REQUEST
   └─> Validates auth, checks quota, rate limits

4. AI ORCHESTRATOR ROUTES PROMPT
   └─> Analyzes prompt intent
       ├─ Detects: Content modification
       ├─ Selects: Content Agent
       └─> Retrieves user memory (tone, style, preferences)

5. CONTENT AGENT EXECUTES
   └─> Calls OpenAI with:
       ├─ Current About section
       ├─ User preferences (from Memory Agent)
       ├─ Tone guidelines
       └─> Generates refined text

6. AGENT APPLIES CHANGES
   └─> Updates Portfolio in DB
       ├─ Stores new content in JSONB
       ├─ Creates audit log entry
       ├─ Increments AI usage quota
       └─> Triggers version snapshot

7. REALTIME UPDATE TO FRONTEND
   └─> WebSocket/SSE sends:
       ├─ Updated content
       ├─ Preview URL
       └─> User sees live changes

8. USER PUBLISHES
   └─> Deployment Agent:
       ├─ Builds static/SSR snapshot
       ├─ Validates all links & assets
       ├─ Pushes to CDN
       └─> Portfolio live at username.fologen.com

9. AUDIT & MONITORING
   └─> Logs recorded:
       ├─ User action
       ├─ AI agent used
       ├─ Changes made
       ├─ Timestamp
       └─> Enables rollback & compliance
\`\`\`

---

## 🛠️ Technology Stack

### Frontend
- **Framework:** Next.js 15+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **UI Components:** shadcn/ui
- **State Management:** React Context + SWR (for data fetching)
- **Realtime:** WebSockets (Socket.io) or Server-Sent Events (SSE)
- **Forms:** React Hook Form + Zod validation

**Justification:**
- Next.js App Router provides server components, API routes, and edge functions
- TypeScript ensures type safety across frontend & backend
- Tailwind CSS enables rapid, consistent styling
- SWR handles client-side caching and synchronization
- WebSockets/SSE enable real-time AI feedback

### Backend
- **Runtime:** Node.js (Next.js API Routes or Fastify)
- **Language:** TypeScript
- **API Framework:** Next.js API Routes (preferred for simplicity) or Fastify (for performance)
- **Authentication:** Clerk or NextAuth.js v5
- **Database ORM:** Prisma (optional, can use raw SQL for performance)
- **Job Queue:** BullMQ (Redis-backed) or Vercel Cron
- **Validation:** Zod

**Justification:**
- Next.js API Routes integrate seamlessly with frontend
- Clerk provides enterprise-grade auth with social login
- Prisma simplifies DB interactions with type safety
- BullMQ handles async tasks (image generation, builds)
- Zod validates API inputs and database schemas

### AI & Orchestration
- **AI SDK:** OpenAI Agents SDK (via Vercel AI SDK v5)
- **Models:** GPT-4, GPT-4 Vision (for image analysis)
- **Orchestration:** Custom router + agent factory pattern
- **Memory:** pgvector (PostgreSQL embeddings)
- **Context Management:** Semantic search + retrieval-augmented generation (RAG)

**Justification:**
- OpenAI Agents SDK provides structured agent orchestration
- GPT-4 Vision enables image analysis & generation
- pgvector stores embeddings for semantic search
- RAG pattern enables agents to access user-specific context

### Database
- **Primary DB:** Neon (PostgreSQL)
- **Vector Store:** pgvector (PostgreSQL extension)
- **Cache:** Redis (Upstash)
- **Session Store:** Redis

**Justification:**
- PostgreSQL provides ACID compliance, JSON support, and RLS
- pgvector enables semantic search for Memory Agent
- Redis provides fast session & cache layer
- Neon offers serverless PostgreSQL with auto-scaling

### Storage & CDN
- **Image Storage:** Cloudinary or UploadThing
- **CDN:** Vercel Edge Network + Cloudflare
- **DNS:** Cloudflare

**Justification:**
- Cloudinary provides image optimization & transformation
- Vercel Edge Network ensures fast portfolio delivery
- Cloudflare provides DDoS protection & DNS management

### Billing
- **Provider:** Lemon Squeezy
- **Webhook Handler:** Next.js API route
- **Usage Tracking:** Custom middleware

**Justification:**
- Lemon Squeezy is simpler than Stripe for SaaS
- Webhooks sync subscription status in real-time
- Custom middleware enforces plan quotas

### Monitoring & Observability
- **Error Tracking:** Sentry
- **Logging:** Vercel Analytics + custom logging
- **Performance:** Vercel Web Analytics
- **Uptime:** Uptime Robot or similar

**Justification:**
- Sentry captures errors in production
- Vercel Analytics provides built-in performance metrics
- Custom logging enables audit trails

---

## 💾 Database Schema

### Core Tables

#### `users`
\`\`\`sql
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255),
  role VARCHAR(50) DEFAULT 'user', -- 'admin', 'user', 'premium_user'
  subscription_id UUID REFERENCES subscriptions(id),
  preferences JSONB DEFAULT '{}', -- tone, style, language preferences
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

#### `subscriptions`
\`\`\`sql
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  plan VARCHAR(50) NOT NULL, -- 'free', 'starter', 'premium'
  provider VARCHAR(50) NOT NULL, -- 'lemon_squeezy'
  provider_subscription_id VARCHAR(255) UNIQUE,
  status VARCHAR(50) NOT NULL, -- 'active', 'cancelled', 'past_due'
  current_period_start TIMESTAMP,
  current_period_end TIMESTAMP,
  next_billing_date TIMESTAMP,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

#### `portfolios`
\`\`\`sql
CREATE TABLE portfolios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL, -- for subdomain: slug.fologen.com
  theme_id UUID REFERENCES templates(id),
  content JSONB NOT NULL DEFAULT '{}', -- portfolio structure & content
  published_at TIMESTAMP,
  custom_domain VARCHAR(255) UNIQUE,
  domain_verified BOOLEAN DEFAULT FALSE,
  version INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, slug)
);
\`\`\`

#### `projects`
\`\`\`sql
CREATE TABLE projects (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  portfolio_id UUID NOT NULL REFERENCES portfolios(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  images TEXT[] DEFAULT '{}', -- array of image URLs
  tags TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}', -- links, dates, tech stack, etc.
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

#### `templates`
\`\`\`sql
CREATE TABLE templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  author_id UUID REFERENCES users(id) ON DELETE SET NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  schema_json JSONB NOT NULL, -- template structure
  assets JSONB DEFAULT '{}', -- images, CSS, etc.
  is_public BOOLEAN DEFAULT FALSE,
  is_featured BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
\`\`\`

#### `ai_memory`
\`\`\`sql
CREATE TABLE ai_memory (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  key VARCHAR(255) NOT NULL, -- 'tone', 'style', 'industry', etc.
  value TEXT NOT NULL,
  embedding vector(1536), -- OpenAI embedding
  last_updated TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, key)
);

CREATE INDEX idx_ai_memory_embedding ON ai_memory USING ivfflat (embedding vector_cosine_ops);
\`\`\`

#### `audit_logs`
\`\`\`sql
CREATE TABLE audit_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  entity_type VARCHAR(50) NOT NULL, -- 'portfolio', 'project', 'template'
  entity_id UUID NOT NULL,
  action VARCHAR(50) NOT NULL, -- 'create', 'update', 'delete', 'publish'
  changes JSONB DEFAULT '{}', -- diff of changes
  agent_used VARCHAR(100), -- which AI agent made the change
  timestamp TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_audit_logs_entity ON audit_logs(entity_type, entity_id);
CREATE INDEX idx_audit_logs_user ON audit_logs(user_id);
\`\`\`

#### `usage_quotas`
\`\`\`sql
CREATE TABLE usage_quotas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  month DATE NOT NULL,
  ai_calls_used INT DEFAULT 0,
  ai_calls_limit INT DEFAULT 10, -- based on plan
  images_generated INT DEFAULT 0,
  images_limit INT DEFAULT 5,
  storage_used_mb INT DEFAULT 0,
  storage_limit_mb INT DEFAULT 100,
  UNIQUE(user_id, month)
);
\`\`\`

### Key Design Decisions

1. **JSONB for Dynamic Content:** Portfolio content stored as JSONB allows flexible schema evolution without migrations
2. **pgvector for Embeddings:** Enables semantic search for Memory Agent
3. **Row-Level Security (RLS):** Enforces tenant isolation at DB level
4. **Audit Logs:** Complete history for compliance & rollback
5. **Versioning:** Track portfolio versions for rollback capability
6. **Indexes:** Optimized for common queries (user_id, slug, entity lookups)

---

## 🤖 Agentic AI Design

### Agent Architecture

\`\`\`
┌─────────────────────────────────────────────────────────────┐
│                    ORCHESTRATOR / ROUTER                     │
│  - Receives user prompt                                      │
│  - Analyzes intent (NLU)                                     │
│  - Selects appropriate agent(s)                              │
│  - Manages context & memory                                  │
│  - Handles concurrency & isolation                           │
│  - Aggregates results & sends to frontend                    │
└─────────────────────────────────────────────────────────────┘
                              ↓
        ┌─────────────────────┬─────────────────────┐
        ↓                     ↓                     ↓
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │   CONTENT   │    │   DESIGN    │    │   IMAGE     │
   │   AGENT     │    │   AGENT     │    │   AGENT     │
   └─────────────┘    └─────────────┘    └─────────────┘
        ↓                     ↓                     ↓
   Generate/refine      Propose/implement      Generate/edit
   text content         layout & CSS            images
        ↓                     ↓                     ↓
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │  TEMPLATE   │    │ DEPLOYMENT  │    │   MEMORY    │
   │   AGENT     │    │   AGENT     │    │   AGENT     │
   └─────────────┘    └─────────────┘    └─────────────┘
        ↓                     ↓                     ↓
   Parse/adapt          Build & publish      Store embeddings
   templates            portfolios           & preferences
        ↓                     ↓                     ↓
   ┌─────────────┐    ┌─────────────┐    ┌─────────────┐
   │   AUDIT     │    │  AUTO-FIX   │    │  BILLING    │
   │   AGENT     │    │   AGENT     │    │   AGENT     │
   └─────────────┘    └─────────────┘    └─────────────┘
        ↓                     ↓                     ↓
   Track versions      Scan & fix issues    Enforce quotas
   & changes           (security, a11y)     & recommend upgrades
\`\`\`

### Agent Specifications

#### 1. **Content Agent**
- **Purpose:** Generate and refine text content (bio, about, project descriptions)
- **Inputs:** Current content, user prompt, user preferences
- **Outputs:** Refined text, suggestions
- **Tools:**
  - `update_portfolio_content()` — Update DB
  - `get_user_preferences()` — Retrieve tone/style
  - `create_audit_log()` — Log changes
- **Example Workflow:**
  \`\`\`
  User: "Make my About section more professional"
  → Content Agent retrieves current About text
  → Calls OpenAI with tone guidelines
  → Generates professional version
  → Updates DB & creates audit log
  → Returns diff to user
  \`\`\`

#### 2. **Design Agent**
- **Purpose:** Propose and implement layout, theme, and CSS changes
- **Inputs:** Current design, user prompt, design guidelines
- **Outputs:** Updated CSS variables, layout changes
- **Tools:**
  - `update_theme_variables()` — Modify CSS
  - `get_design_templates()` — Retrieve design options
  - `validate_design()` — Check accessibility
- **Example Workflow:**
  \`\`\`
  User: "Make the design more modern and minimalist"
  → Design Agent analyzes current theme
  → Proposes CSS variable changes
  → Validates WCAG compliance
  → Updates portfolio theme
  → Triggers preview update
  \`\`\`

#### 3. **Image Agent**
- **Purpose:** Generate, edit, or replace images
- **Inputs:** Image prompt, current images, user preferences
- **Outputs:** Generated/edited images, URLs
- **Tools:**
  - `generate_image()` — Call DALL-E or similar
  - `upload_to_cloudinary()` — Store image
  - `optimize_image()` — Resize/compress
- **Example Workflow:**
  \`\`\`
  User: "Generate a professional headshot"
  → Image Agent calls DALL-E with prompt
  → Uploads to Cloudinary
  → Returns optimized URL
  → Updates portfolio
  \`\`\`

#### 4. **Template Agent**
- **Purpose:** Parse imported templates and map to platform schema
- **Inputs:** HTML/CSS/JSON template, user data
- **Outputs:** Normalized portfolio structure
- **Tools:**
  - `parse_html_template()` — Extract structure
  - `map_to_schema()` — Convert to platform format
  - `validate_template()` — Security & XSS checks
- **Example Workflow:**
  \`\`\`
  User uploads HTML template
  → Template Agent parses HTML
  → Extracts sections, images, styles
  → Maps to platform JSONB schema
  → Validates for XSS/injection
  → Creates portfolio from template
  \`\`\`

#### 5. **Deployment Agent**
- **Purpose:** Build and publish portfolios
- **Inputs:** Portfolio data, domain info
- **Outputs:** Published URL, deployment status
- **Tools:**
  - `build_portfolio()` — Generate static/SSR
  - `validate_links()` — Check all links work
  - `push_to_cdn()` — Deploy to Vercel/Cloudflare
  - `setup_custom_domain()` — DNS verification
- **Example Workflow:**
  \`\`\`
  User: "Publish my portfolio"
  → Deployment Agent builds static snapshot
  → Validates all links & assets
  → Pushes to CDN
  → Sets up DNS for custom domain (if applicable)
  → Returns live URL
  \`\`\`

#### 6. **Memory Agent**
- **Purpose:** Store and retrieve user preferences, tone, and project metadata
- **Inputs:** User interactions, preferences
- **Outputs:** Embeddings, retrieved context
- **Tools:**
  - `store_embedding()` — Save to pgvector
  - `semantic_search()` — Find similar memories
  - `update_preferences()` — Update user profile
- **Example Workflow:**
  \`\`\`
  User edits content multiple times
  → Memory Agent observes patterns
  → Stores tone/style embeddings
  → On next prompt, retrieves similar context
  → Applies consistent style automatically
  \`\`\`

#### 7. **Audit/History Agent**
- **Purpose:** Track versions, diffs, and enable rollback
- **Inputs:** Changes, user actions
- **Outputs:** Audit logs, version snapshots
- **Tools:**
  - `create_version_snapshot()` — Save state
  - `compute_diff()` — Calculate changes
  - `rollback_to_version()` — Restore previous state
- **Example Workflow:**
  \`\`\`
  User makes multiple edits
  → Audit Agent logs each change
  → Stores diffs in audit_logs table
  → User can rollback to any version
  → Full compliance trail maintained
  \`\`\`

#### 8. **Auto-Fix Agent**
- **Purpose:** Detect and fix bugs, security issues, accessibility problems
- **Inputs:** Portfolio content, code
- **Outputs:** Proposed fixes, patches
- **Tools:**
  - `scan_for_issues()` — Run security/a11y checks
  - `propose_fix()` — Generate patch
  - `apply_fix()` — Update portfolio
- **Example Workflow:**
  \`\`\`
  User: "Scan my site for accessibility issues"
  → Auto-Fix Agent analyzes HTML/CSS
  → Detects missing alt text, low contrast, etc.
  → Proposes fixes
  → User approves
  → Agent applies patches
  \`\`\`

#### 9. **Billing Agent**
- **Purpose:** Enforce plan limits and recommend upgrades
- **Inputs:** User plan, usage data
- **Outputs:** Quota status, upgrade recommendations
- **Tools:**
  - `check_quota()` — Verify usage limits
  - `increment_usage()` — Track AI calls
  - `recommend_upgrade()` — Suggest plan change
- **Example Workflow:**
  \`\`\`
  User on Free plan tries 11th AI edit
  → Billing Agent checks quota
  → Detects limit exceeded
  → Recommends upgrade to Starter
  → Blocks action until upgrade
  \`\`\`

#### 10. **Orchestrator / Router**
- **Purpose:** Route prompts to appropriate agents, manage context
- **Inputs:** User prompt, portfolio context, user memory
- **Outputs:** Agent selection, aggregated results
- **Logic:**
  \`\`\`
  1. Parse user prompt (NLU)
  2. Detect intent (content, design, image, deploy, etc.)
  3. Retrieve user memory & preferences
  4. Select primary agent + supporting agents
  5. Execute agents in parallel (if independent)
  6. Aggregate results
  7. Send to frontend via WebSocket/SSE
  8. Log to audit trail
  \`\`\`

### Agent Orchestration Rules

1. **Context Management:**
   - Short-term: Current request context (portfolio state, user input)
   - Long-term: User embeddings in pgvector (tone, style, preferences)
   - Retrieve relevant context before agent execution

2. **Tool-Based Pattern:**
   - Agents call internal tools (DB, storage, APIs)
   - Tools are sandboxed and logged
   - All tool calls create audit trail

3. **Concurrency & Isolation:**
   - Independent agents run in parallel
   - Dependent agents run sequentially
   - Use database transactions for consistency

4. **Human Verification:**
   - Destructive actions (delete, publish) require approval
   - High-risk changes (security patches) require review
   - Audit log tracks all approvals

5. **Error Handling:**
   - Agents catch and report errors gracefully
   - Rollback on failure
   - User notified of issues

---

## 📋 Implementation Phases

### Phase 1: MVP (Weeks 1-4)
**Goal:** Core portfolio creation & publishing

**Deliverables:**
- [ ] User authentication (Clerk)
- [ ] Portfolio CRUD operations
- [ ] Basic template system
- [ ] Content Agent (text generation)
- [ ] Publish to subdomain
- [ ] Free tier with limited AI edits

**Tech Stack:**
- Next.js App Router
- Neon PostgreSQL
- Clerk Auth
- OpenAI API
- Vercel hosting

**Database:**
- `users`, `portfolios`, `projects`, `templates`, `audit_logs`

**API Endpoints:**
- `POST /api/auth/signup`
- `POST /api/portfolios` — Create portfolio
- `GET /api/portfolios/:id` — Fetch portfolio
- `PATCH /api/portfolios/:id` — Update portfolio
- `POST /api/ai/content` — Content Agent
- `POST /api/publish` — Deploy portfolio

---

### Phase 2: Advanced AI & Billing (Weeks 5-8)
**Goal:** Multi-agent orchestration, billing integration

**Deliverables:**
- [ ] Design Agent (theme customization)
- [ ] Image Agent (image generation)
- [ ] Orchestrator / Router
- [ ] Lemon Squeezy integration
- [ ] Usage quota tracking
- [ ] Multiple portfolios per user
- [ ] Custom domain support

**New Agents:**
- Design Agent
- Image Agent
- Orchestrator

**Database:**
- Add `subscriptions`, `usage_quotas`, `ai_memory`
- Add pgvector extension

**API Endpoints:**
- `POST /api/ai/design` — Design Agent
- `POST /api/ai/image` — Image Agent
- `POST /api/ai/process` — Orchestrator
- `POST /api/billing/webhook` — Lemon Squeezy webhook
- `GET /api/quotas` — Check usage

---

### Phase 3: Enterprise Features (Weeks 9-12)
**Goal:** Auto-fix, audit, deployment, advanced features

**Deliverables:**
- [ ] Auto-Fix Agent (security, a11y scanning)
- [ ] Audit/History Agent (versioning, rollback)
- [ ] Deployment Agent (custom domains, builds)
- [ ] Memory Agent (user preferences)
- [ ] Billing Agent (quota enforcement)
- [ ] Admin dashboard
- [ ] Template marketplace

**New Agents:**
- Auto-Fix Agent
- Audit/History Agent
- Deployment Agent
- Memory Agent
- Billing Agent

**Database:**
- Optimize indexes
- Add RLS policies

**API Endpoints:**
- `POST /api/ai/autofix` — Auto-Fix Agent
- `GET /api/versions/:portfolioId` — Version history
- `POST /api/rollback` — Rollback to version
- `POST /api/deploy` — Deployment Agent
- `GET /api/admin/users` — Admin dashboard

---

### Phase 4: Scalability & Optimization (Weeks 13-16)
**Goal:** Performance, monitoring, edge cases

**Deliverables:**
- [ ] Redis caching layer
- [ ] BullMQ job queue
- [ ] Sentry error monitoring
- [ ] Performance optimization
- [ ] Load testing
- [ ] Documentation

**Infrastructure:**
- Redis (Upstash)
- BullMQ workers
- Sentry integration
- Vercel Analytics

---

### Phase 5: Team & Collaboration (Weeks 17-20)
**Goal:** Multi-user editing, permissions

**Deliverables:**
- [ ] Team management
- [ ] Collaborative editing
- [ ] Role-based permissions
- [ ] Invite system
- [ ] Activity feed

**Database:**
- Add `teams`, `team_members`, `permissions` tables

---

### Phase 6: Marketplace & Plugins (Weeks 21+)
**Goal:** Extensibility, third-party integrations

**Deliverables:**
- [ ] Template marketplace
- [ ] Plugin system
- [ ] Third-party integrations (analytics, chat)
- [ ] White-label options

---

## 🔐 Security & Compliance

### Authentication & Authorization
- **Auth Provider:** Clerk (supports social login)
- **Session Management:** JWT + refresh tokens
- **RBAC:** Admin, User, Premium User roles
- **Middleware:** Enforce auth on all protected routes
- **RLS:** Row-level security in PostgreSQL

### Data Protection
- **Encryption:** TLS in transit, encryption at rest (Neon)
- **Secrets:** Environment variables (Vercel)
- **Input Validation:** Zod schemas on all inputs
- **Output Sanitization:** DOMPurify for user-generated content
- **CSP:** Content Security Policy headers

### Security Scanning
- **Code:** Dependabot, OWASP Top 10 checks
- **Images:** Scan for malware (Cloudinary)
- **Templates:** XSS/injection prevention
- **Auto-Fix Agent:** Continuous security scanning

### Compliance
- **GDPR:** Data export, deletion, consent management
- **SOC 2:** Audit logs, access controls, monitoring
- **CCPA:** Privacy policy, opt-out mechanisms
- **Audit Trail:** Complete history of all changes

### Rate Limiting
- **API:** 100 requests/minute per user
- **AI Calls:** Based on subscription plan
- **Image Generation:** Quota-based

---

## ⚡ Scalability & Performance

### Caching Strategy
- **Redis:** Session, rate limit counters, frequently accessed data
- **CDN:** Vercel Edge Network for published portfolios
- **Browser:** Service Worker for offline support

### Database Optimization
- **Indexes:** On user_id, slug, entity lookups
- **Partitioning:** Audit logs by date
- **Connection Pooling:** Neon serverless connections
- **Query Optimization:** Avoid N+1 queries

### Background Jobs
- **BullMQ:** Image generation, builds, email notifications
- **Concurrency:** 10-20 workers based on load
- **Retry Logic:** Exponential backoff

### Monitoring & Alerting
- **Sentry:** Error tracking & alerting
- **Vercel Analytics:** Performance metrics
- **Custom Dashboards:** Usage, quota, revenue
- **Uptime Monitoring:** Uptime Robot

### Load Testing
- **Tools:** k6, Artillery
- **Targets:** 1000 concurrent users
- **Scenarios:** Portfolio creation, AI generation, publishing

---

## 🗺️ Roadmap & Milestones

### Q1 2025: MVP Launch
- ✅ User auth & portfolio creation
- ✅ Content Agent
- ✅ Publish to subdomain
- ✅ Free tier

### Q2 2025: Advanced AI & Billing
- ✅ Design & Image Agents
- ✅ Lemon Squeezy integration
- ✅ Multiple portfolios
- ✅ Starter & Premium tiers

### Q3 2025: Enterprise Features
- ✅ Auto-Fix & Audit Agents
- ✅ Custom domains
- ✅ Admin dashboard
- ✅ Template marketplace

### Q4 2025: Scalability & Optimization
- ✅ Performance optimization
- ✅ Monitoring & alerting
- ✅ Load testing
- ✅ Documentation

### 2026: Team & Marketplace
- ✅ Team collaboration
- ✅ Plugin system
- ✅ White-label options
- ✅ Advanced analytics

---

## 📚 Additional Resources

### Documentation to Create
- [ ] API Reference
- [ ] Agent Development Guide
- [ ] Database Schema Docs
- [ ] Deployment Guide
- [ ] Security Best Practices
- [ ] Troubleshooting Guide

### Tools & Services
- **Vercel:** Hosting & deployments
- **Neon:** PostgreSQL database
- **Clerk:** Authentication
- **Lemon Squeezy:** Billing
- **Cloudinary:** Image storage
- **OpenAI:** AI models
- **Sentry:** Error monitoring

---

## 🎯 Success Metrics

- **User Acquisition:** 1000 signups in first month
- **Conversion:** 10% free → paid conversion
- **Retention:** 80% monthly active users
- **AI Accuracy:** 95% user satisfaction with AI-generated content
- **Performance:** <2s portfolio load time
- **Uptime:** 99.9% availability

---

## 📞 Support & Feedback

For questions or feedback on this planning document, please reach out to the development team.

**Document Version:** 1.0  
**Last Updated:** October 2025  
**Status:** Planning Phase Complete — Ready for Development
