export interface ComparisonItem {
  slug: string;
  title: string;
  tagline: string;
  category: "Frontend" | "Backend" | "Database" | "DevOps" | "API" | "Styling" | "Tooling";
  verdict: string;
  techA: {
    name: string;
    badge: string;
    color: string;
    maintainer: string;
    runtime: string;
    paradigm: string;
    ecosystem: string;
    strengths: string;
  };
  techB: {
    name: string;
    badge: string;
    color: string;
    maintainer: string;
    runtime: string;
    paradigm: string;
    ecosystem: string;
    strengths: string;
  };
  matrix: Array<{
    feature: string;
    techA: string;
    techB: string;
    advantage: "techA" | "techB" | "tie";
  }>;
  benchmarks: Array<{
    metric: string;
    techA: string;
    techB: string;
    winner: "techA" | "techB" | "tie";
    note: string;
  }>;
  codeComparison: {
    title: string;
    problem: string;
    filenameA: string;
    languageA: string;
    codeA: string;
    filenameB: string;
    languageB: string;
    codeB: string;
  };
  decisionGuide: {
    chooseA: string[];
    chooseB: string[];
  };
  relatedGuides: Array<{
    title: string;
    href: string;
    type: "guide" | "recipe" | "command" | "error";
  }>;
}

export const comparisonList: ComparisonItem[] = [
  {
    slug: "nextjs-vs-vue",
    title: "Next.js vs Vue (Nuxt 3)",
    tagline: "React Server Components & App Router vs Vue Composition API & Nitro Engine",
    category: "Frontend",
    verdict: "Choose Next.js for large enterprise teams deeply invested in TypeScript, React Server Components, and the vast React ecosystem. Choose Vue / Nuxt 3 for superior developer ergonomics, faster build speeds, and intuitive two-way reactive state.",
    techA: {
      name: "Next.js 15 (React 19)",
      badge: "React Framework",
      color: "from-blue-600 to-indigo-600",
      maintainer: "Vercel & Open Source",
      runtime: "Node.js / Edge / Serverless",
      paradigm: "Component-driven, React Server Components (RSC), JSX",
      ecosystem: "Vast (~220k GitHub stars, dominant in enterprise)",
      strengths: "Seamless Server Actions, partial prerendering (PPR), deep Vercel optimization",
    },
    techB: {
      name: "Vue 3 / Nuxt 3",
      badge: "Vue Framework",
      color: "from-emerald-500 to-teal-600",
      maintainer: "Evan You & NuxtLabs",
      runtime: "Nitro Engine / Universal (Node, Deno, Bun, Cloudflare)",
      paradigm: "Single File Components (SFC), Composition API, Proxy Reactivity",
      ecosystem: "Mature (~50k Nuxt stars, massive in Asia & Europe)",
      strengths: "Zero-config auto-imports, fine-grained reactivity without dependency arrays",
    },
    matrix: [
      {
        feature: "Reactivity Model",
        techA: "Immutable state with `useState` & dependency arrays (`useEffect`, `useMemo`)",
        techB: "Fine-grained Proxy reactivity (`ref()`, `reactive()`, `computed()`) with zero dependency arrays",
        advantage: "techB",
      },
      {
        feature: "Server Components (RSC)",
        techA: "First-class React Server Components with async server component trees & Server Actions",
        techB: "Nuxt Island Components & Server-only components (functional, but less unified than RSC)",
        advantage: "techA",
      },
      {
        feature: "TypeScript Integration",
        techA: "Native end-to-end TSX with strict generic component typing and zero compile transforms",
        techB: "Volar/Vue-TSC support, excellent with `<script setup lang=\"ts\">`",
        advantage: "techA",
      },
      {
        feature: "Deployment Portability",
        techA: "Best on Vercel; requires standalone Docker container or OpenNext for AWS/Cloudflare",
        techB: "Nitro engine builds natively for 30+ targets (Cloudflare, AWS Lambda, Node, Netlify, Vercel)",
        advantage: "techB",
      },
      {
        feature: "Learning Curve",
        techA: "Steeper due to RSC boundaries, server/client serialization, and cache invalidation rules",
        techB: "Gentle; SFC templates, auto-imports, and intuitive mental model",
        advantage: "techB",
      },
      {
        feature: "Ecosystem Size & Jobs",
        techA: "Dominates US/global enterprise job market; largest UI component library ecosystem",
        techB: "Strong community, excellent official libraries (Pinia, Vue Router), but fewer job openings",
        advantage: "techA",
      },
    ],
    benchmarks: [
      {
        metric: "Cold Start Server Latency",
        techA: "~45ms (Node 22 standalone)",
        techB: "~18ms (Nitro minimal worker bundle)",
        winner: "techB",
        note: "Nuxt's Nitro engine produces significantly smaller server bundles for serverless environments.",
      },
      {
        metric: "Client JS Baseline Bundle",
        techA: "~84 KB (React 19 + Next App Router runtime)",
        techB: "~48 KB (Vue 3 + Nuxt 3 core runtime)",
        winner: "techB",
        note: "Vue 3 runtime is lighter than React 19 + Next.js client runtime.",
      },
      {
        metric: "Large Data Table Hydration",
        techA: "Fast with React 19 Concurrent Scheduler",
        techB: "Ultra-fast due to fine-grained direct DOM proxy mutations",
        winner: "techB",
        note: "Vue updates only exact mutated DOM nodes without re-running parent component functions.",
      },
    ],
    codeComparison: {
      title: "Data Fetching & Server Mutation Example",
      problem: "Creating a user profile update form with server-side validation and database persistence.",
      filenameA: "app/actions/update-user.ts (Next.js)",
      languageA: "typescript",
      codeA: `"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";
import { auth } from "@/lib/auth";

const ProfileSchema = z.object({
  name: z.string().min(2),
  bio: z.string().max(160),
});

export async function updateProfile(formData: FormData) {
  const session = await auth();
  if (!session) throw new Error("Unauthorized");

  const validated = ProfileSchema.parse({
    name: formData.get("name"),
    bio: formData.get("bio"),
  });

  await db.users.update({
    where: { id: session.userId },
    data: validated,
  });

  revalidatePath("/profile");
  return { success: true };
}`,
      filenameB: "server/api/profile.put.ts (Nuxt 3)",
      languageB: "typescript",
      codeB: `import { z } from "zod";

const ProfileSchema = z.object({
  name: z.string().min(2),
  bio: z.string().max(160),
});

export default defineEventHandler(async (event) => {
  const session = await getUserSession(event);
  if (!session) {
    throw createError({ statusCode: 401, message: "Unauthorized" });
  }

  const body = await readValidatedBody(event, (b) => ProfileSchema.parse(b));

  const updated = await db.users.update({
    where: { id: session.userId },
    data: body,
  });

  return { success: true, user: updated };
});`,
    },
    decisionGuide: {
      chooseA: [
        "Your team is proficient in React and TypeScript.",
        "You want React Server Components to eliminate client-side waterfall requests.",
        "You rely on React UI libraries like Radix UI, shadcn/ui, or Tailwind UI.",
        "Enterprise job availability and hiring velocity are top priorities.",
      ],
      chooseB: [
        "You want cleaner syntax without `useMemo`, `useCallback`, or dependency array pitfalls.",
        "You need native multi-cloud deployment (Cloudflare Workers, Deno, AWS, Node) without lock-in.",
        "You prefer Single File Components (`.vue`) with scoped styling and automated imports.",
        "Fast initial build times and lightweight client runtime bundles are essential.",
      ],
    },
    relatedGuides: [
      { title: "Next.js App Router Architecture Guide", href: "/docs", type: "guide" },
      { title: "Next.js Authentication with JWT Recipe", href: "/recipes/auth/react-nextjs-auth-jwt", type: "recipe" },
      { title: "Dockerize Next.js App Recipe", href: "/recipes/docker/dockerize-nextjs", type: "recipe" },
    ],
  },
  {
    slug: "nodejs-vs-go",
    title: "Node.js vs Go (Golang)",
    tagline: "V8 Event Loop & Async I/O vs Compiled Goroutines & High-Throughput Concurrency",
    category: "Backend",
    verdict: "Choose Node.js for rapid full-stack JavaScript/TypeScript velocity, rich web framework ecosystems, and I/O-heavy web APIs. Choose Go for high-concurrency microservices, network proxies, low-latency workloads, and CPU-intensive distributed systems.",
    techA: {
      name: "Node.js 22 (TypeScript)",
      badge: "JavaScript Runtime",
      color: "from-green-600 to-emerald-700",
      maintainer: "OpenJS Foundation",
      runtime: "V8 Engine + libuv event loop",
      paradigm: "Single-threaded event loop, asynchronous non-blocking I/O",
      ecosystem: "npm (Largest package registry in the world)",
      strengths: "Shared language across frontend/backend, fast prototyping speed",
    },
    techB: {
      name: "Go 1.23 (Golang)",
      badge: "Compiled Language",
      color: "from-cyan-500 to-blue-600",
      maintainer: "Google & Open Source",
      runtime: "Native compiled binary with CSP runtime scheduler",
      paradigm: "Multi-threaded concurrency with Goroutines & Channels",
      ecosystem: "Standard library first, minimal external dependencies",
      strengths: "Predictable low memory footprint, sub-millisecond execution, single binary deployment",
    },
    matrix: [
      {
        feature: "Concurrency Architecture",
        techA: "Single main thread with event loop; CPU tasks block the loop without Worker Threads",
        techB: "Native lightweight Goroutines (2 KB stack size) multiplexed across all CPU cores via Go scheduler",
        advantage: "techB",
      },
      {
        feature: "Development Speed",
        techA: "Extremely fast with TypeScript, JSON manipulation, and npm libraries",
        techB: "Fast, but more verbose error handling (`if err != nil`) and strict struct typing",
        advantage: "techA",
      },
      {
        feature: "Memory Footprint",
        techA: "~40MB–150MB baseline RSS per Node process due to V8 JIT compiler",
        techB: "~10MB–25MB baseline RAM; highly predictable garbage collection",
        advantage: "techB",
      },
      {
        feature: "Compilation & Deployment",
        techA: "Requires Node runtime + `node_modules` in Docker container (~150MB+)",
        techB: "Compiles to a single static binary (~15MB), deployable in a `FROM scratch` container",
        advantage: "techB",
      },
      {
        feature: "Ecosystem & Tooling",
        techA: "Huge ecosystem with Prisma, Fastify, Next.js, Express, NestJS, and npm",
        techB: "World-class standard library (`net/http`, `crypto`, `sync`, `io`), Gin, Fiber",
        advantage: "tie",
      },
    ],
    benchmarks: [
      {
        metric: "HTTP JSON API Throughput",
        techA: "~42,000 req/sec (Fastify on 4 vCPU)",
        techB: "~118,000 req/sec (Go Gin on 4 vCPU)",
        winner: "techB",
        note: "Go's compiled binary and direct goroutine handling achieves 2.8x higher throughput.",
      },
      {
        metric: "Memory Under 10k Concurrent WS",
        techA: "~380 MB",
        techB: "~48 MB",
        winner: "techB",
        note: "Goroutines use 2KB initial memory versus V8 context memory overhead.",
      },
      {
        metric: "Time to First Working Prototype",
        techA: "Hours (rapid JSON handling & libraries)",
        techB: "Slightly longer due to explicit structs and error checks",
        winner: "techA",
        note: "TypeScript + npm provides faster initial prototyping velocity.",
      },
    ],
    codeComparison: {
      title: "Concurrent HTTP Service Implementation",
      problem: "Fetching user data and concurrent analytics metrics before responding with aggregated JSON.",
      filenameA: "server.ts (Node.js + Fastify)",
      languageA: "typescript",
      codeA: `import Fastify from "fastify";
const app = Fastify({ logger: true });

app.get("/users/:id/summary", async (req, reply) => {
  const { id } = req.params as { id: string };

  // Fetch both streams concurrently with Promise.all
  const [profile, analytics] = await Promise.all([
    fetchUserProfile(id),
    fetchUserAnalytics(id),
  ]);

  return {
    userId: id,
    profile,
    analytics,
    timestamp: new Date().toISOString(),
  };
});

await app.listen({ port: 3000, host: "0.0.0.0" });`,
      filenameB: "main.go (Golang + Gin)",
      languageB: "go",
      codeB: `package main

import (
	"net/http"
	"sync"
	"time"
	"github.com/gin-gonic/gin"
)

func getUserSummary(c *gin.Context) {
	userId := c.Param("id")
	var wg sync.WaitGroup
	var profile Profile
	var analytics Analytics

	wg.Add(2)
	go func() {
		defer wg.Done()
		profile = fetchUserProfile(userId)
	}()
	go func() {
		defer wg.Done()
		analytics = fetchUserAnalytics(userId)
	}()
	wg.Wait()

	c.JSON(http.StatusOK, gin.H{
		"userId":    userId,
		"profile":   profile,
		"analytics": analytics,
		"timestamp": time.Now().UTC().Format(time.RFC3339),
	})
}

func main() {
	r := gin.Default()
	r.GET("/users/:id/summary", getUserSummary)
	r.Run(":3000")
}`,
    },
    decisionGuide: {
      chooseA: [
        "You are building full-stack web applications where developers write TypeScript end-to-end.",
        "Your service is primarily I/O-bound (REST APIs, GraphQL, database CRUD, web scraping).",
        "You want access to npm packages (auth libraries, ORMs like Prisma/Drizzle, SDKs).",
        "Rapid prototyping and time-to-market are primary drivers.",
      ],
      chooseB: [
        "You need sustained high-throughput performance with predictable microsecond latencies.",
        "You are building microservices, network proxies, stream processors, or background daemons.",
        "You want minimal Docker container sizes (<20MB) and low RAM consumption on small cloud instances.",
        "You want strong type safety with zero runtime interpretation overhead.",
      ],
    },
    relatedGuides: [
      { title: "Client-Server Architecture Fundamentals", href: "/docs/backend/client-server-architecture", type: "guide" },
      { title: "Deploy Go Gin API on VPS Recipe", href: "/recipes/devops/deploy-go-gin-vps", type: "recipe" },
      { title: "Node.js EADDRINUSE Port Collision Fix", href: "/errors/node/eaddrinuse", type: "error" },
    ],
  },
  {
    slug: "postgres-vs-mongodb",
    title: "PostgreSQL vs MongoDB",
    tagline: "Relational ACID & JSONB Powerhouse vs Flexible Document Store & Distributed Sharding",
    category: "Database",
    verdict: "Choose PostgreSQL as the default primary database for 95% of modern web applications requiring relational integrity, ACID transactions, complex queries, and hybrid JSONB documents. Choose MongoDB when data schemas are highly polymorphic, write throughput exceeds single-node limits, or hierarchical documents map 1:1 to application domain objects.",
    techA: {
      name: "PostgreSQL 16",
      badge: "Relational SQL + JSONB",
      color: "from-blue-600 to-sky-700",
      maintainer: "PostgreSQL Global Development Group",
      runtime: "C Engine / Multi-process",
      paradigm: "Relational schema, Strict ACID, SQL, JSONB indexing",
      ecosystem: "Extensions ecosystem (PostGIS, pgvector, TimescaleDB, PgBouncer)",
      strengths: "Rock-solid data integrity, advanced indexing (BTREE, GIN, GiST), vector embeddings",
    },
    techB: {
      name: "MongoDB 7",
      badge: "NoSQL Document Store",
      color: "from-emerald-600 to-green-700",
      maintainer: "MongoDB Inc.",
      runtime: "C++ WiredTiger Engine",
      paradigm: "BSON Document Model, Schema-optional, Aggregation Pipeline",
      ecosystem: "Atlas Cloud, Mongoose, Compass",
      strengths: "Horizontal sharding out-of-the-box, natural JSON document storage, rapid schema evolution",
    },
    matrix: [
      {
        feature: "Data Structure & Schema",
        techA: "Strict relational tables with columns, types, foreign keys, plus semi-structured JSONB columns",
        techB: "Dynamic BSON documents grouped in collections; optional schema validation",
        advantage: "techA",
      },
      {
        feature: "ACID Transactions",
        techA: "Full multi-table ACID transactions by default with configurable isolation levels",
        techB: "Multi-document ACID transactions supported, but carries performance overhead in sharded clusters",
        advantage: "techA",
      },
      {
        feature: "Complex Joins & Analytics",
        techA: "Native ANSI SQL joins, Window Functions, CTEs, and cost-based query optimizer",
        techB: "$lookup aggregation stages (slower than native SQL relational joins on large datasets)",
        advantage: "techA",
      },
      {
        feature: "Horizontal Scalability",
        techA: "Vertical scaling default; read replicas + connection pooling (PgBouncer); sharding via Citus extension",
        techB: "Native horizontal sharding across distributed replica sets built into core architecture",
        advantage: "techB",
      },
      {
        feature: "AI & Vector Search",
        techA: "First-class `pgvector` extension allows storing and querying vector embeddings alongside relational data",
        techB: "Atlas Vector Search available (managed cloud only)",
        advantage: "techA",
      },
    ],
    benchmarks: [
      {
        metric: "Relational Join Query (3 Tables)",
        techA: "1.2ms (Indexed BTREE)",
        techB: "8.4ms ($lookup aggregation)",
        winner: "techA",
        note: "PostgreSQL's cost-based query planner excels at relational joins.",
      },
      {
        metric: "High-Volume Document Ingestion",
        techA: "~32k inserts/sec",
        techB: "~78k inserts/sec",
        winner: "techB",
        note: "MongoDB's WiredTiger engine handles high write concurrency with lower schema verification overhead.",
      },
      {
        metric: "JSON Field Query (`WHERE data->>'tier' = 'pro'`)",
        techA: "0.4ms (GIN Index on JSONB)",
        techB: "0.5ms (Indexed BSON path)",
        winner: "tie",
        note: "PostgreSQL JSONB with GIN indexing matches native MongoDB document query performance.",
      },
    ],
    codeComparison: {
      title: "Querying User Orders with Filtering",
      problem: "Retrieving paid orders created in the last 30 days along with user metadata.",
      filenameA: "queries/orders.sql (PostgreSQL)",
      languageA: "sql",
      codeA: `SELECT
  o.id,
  o.total_amount,
  o.created_at,
  u.email,
  u.full_name
FROM orders o
INNER JOIN users u ON u.id = o.user_id
WHERE o.status = 'PAID'
  AND o.created_at >= NOW() - INTERVAL '30 days'
ORDER BY o.created_at DESC
LIMIT 50;`,
      filenameB: "queries/orders.ts (MongoDB Aggregation)",
      languageB: "typescript",
      codeB: `db.orders.aggregate([
  {
    $match: {
      status: "PAID",
      createdAt: { $gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) }
    }
  },
  {
    $lookup: {
      from: "users",
      localField: "userId",
      foreignField: "_id",
      as: "user"
    }
  },
  { $unwind: "$user" },
  { $sort: { createdAt: -1 } },
  { $limit: 50 },
  {
    $project: {
      _id: 1,
      totalAmount: 1,
      createdAt: 1,
      "user.email": 1,
      "user.fullName": 1
    }
  }
]);`,
    },
    decisionGuide: {
      chooseA: [
        "Financial, e-commerce, healthcare, or SaaS apps where data integrity and ACID transactions are paramount.",
        "Your data has natural relationships (Users -> Teams -> Invoices -> Payments).",
        "You want a unified database for relational tables, JSON documents, and AI vector search (`pgvector`).",
        "You want to use modern ORMs like Prisma, Drizzle, or TypeORM.",
      ],
      chooseB: [
        "Content management systems, catalogs, or real-time event logs with constantly changing data shapes.",
        "Your application data naturally maps to self-contained documents without relational joins.",
        "You require automated horizontal sharding across multi-region clusters out-of-the-box.",
        "Your team wants native JavaScript object-to-database interaction.",
      ],
    },
    relatedGuides: [
      { title: "Next.js + PostgreSQL + Prisma ORM Recipe", href: "/recipes/nextjs/nextjs-postgres-prisma", type: "recipe" },
      { title: "PostgreSQL Database Dump Reference", href: "/commands/postgresql/dump-database", type: "command" },
      { title: "PostgreSQL Database Restore Reference", href: "/commands/postgresql/restore-database", type: "command" },
    ],
  },
  {
    slug: "docker-vs-kubernetes",
    title: "Docker vs Kubernetes",
    tagline: "Container Packaging & Single-Node Compose vs Multi-Node Declarative Cluster Orchestration",
    category: "DevOps",
    verdict: "Docker and Kubernetes are complementary technologies, not direct competitors. Use Docker (and Docker Compose) to package, build, and run applications on a single machine or small production VPS. Use Kubernetes when managing tens to hundreds of microservices requiring automated self-healing, rolling zero-downtime updates, multi-cloud traffic routing, and auto-scaling.",
    techA: {
      name: "Docker (Docker Compose)",
      badge: "Container Engine & Runtime",
      color: "from-blue-500 to-cyan-600",
      maintainer: "Docker Inc. & Moby Project",
      runtime: "containerd / runc",
      paradigm: "Single-host container runtime, declarative `compose.yaml`",
      ecosystem: "Docker Hub, Docker Desktop, BuildKit",
      strengths: "Simplicity, instant local dev environment setup, minimal configuration overhead",
    },
    techB: {
      name: "Kubernetes (K8s)",
      badge: "Cluster Orchestrator",
      color: "from-indigo-600 to-blue-700",
      maintainer: "Cloud Native Computing Foundation (CNCF)",
      runtime: "CRI-O / containerd runtime abstraction",
      paradigm: "Declarative cluster state, self-healing controllers, desired state reconciliation",
      ecosystem: "Helm, ArgoCD, Prometheus, Istio, cert-manager",
      strengths: "Automated scaling (HPA/VPA), zero-downtime rollouts, self-healing multi-node resilience",
    },
    matrix: [
      {
        feature: "Primary Role",
        techA: "Packaging application code and dependencies into isolated container images",
        techB: "Orchestrating, scaling, networking, and healing containers across clusters of machines",
        advantage: "tie",
      },
      {
        feature: "Operational Complexity",
        techA: "Low; single `Dockerfile` and `compose.yaml` file runs anywhere in seconds",
        techB: "High; requires understanding Nodes, Pods, Deployments, Services, Ingress, RBAC, and ETCD",
        advantage: "techA",
      },
      {
        feature: "Self-Healing & Auto-scaling",
        techA: "Basic container restart policies (`restart: unless-stopped`) on a single node",
        techB: "Automated Horizontal Pod Autoscaler (HPA), liveness/readiness probes, node rescheduling",
        advantage: "techB",
      },
      {
        feature: "Zero-Downtime Deployments",
        techA: "Requires manual reverse-proxy reload or port swapping on a single machine",
        techB: "Native Rolling Updates, Blue-Green deployments, and Canary rollouts with health gates",
        advantage: "techB",
      },
    ],
    benchmarks: [
      {
        metric: "Setup Time from Scratch",
        techA: "5 minutes (`docker compose up -d`)",
        techB: "Hours/Days to configure Ingress, TLS, storage classes, and cluster networking",
        winner: "techA",
        note: "Docker Compose is vastly simpler for development and small production workloads.",
      },
      {
        metric: "Hardware Node Failure Recovery",
        techA: "Manual intervention required if the physical VPS dies",
        techB: "Automated pod rescheduling onto healthy cluster nodes within seconds",
        winner: "techB",
        note: "Kubernetes automatically detects dead nodes and reschedules workloads.",
      },
      {
        metric: "Resource Overhead",
        techA: "~30 MB for Docker daemon",
        techB: "~1 GB–2 GB for Control Plane (API server, etcd, kubelet, CNI network plugin)",
        winner: "techA",
        note: "Kubernetes control plane has a noticeable footprint on small servers.",
      },
    ],
    codeComparison: {
      title: "Deploying a Replicated Web App with Load Balancing",
      problem: "Defining 3 replicas of an application with an internal load balancer.",
      filenameA: "compose.yaml (Docker Compose)",
      languageA: "yaml",
      codeA: `services:
  web:
    image: mycompany/api:v1.4.0
    restart: unless-stopped
    deploy:
      replicas: 3
    environment:
      - NODE_ENV=production
      - DATABASE_URL=\${DATABASE_URL}
    ports:
      - "3000:3000"`,
      filenameB: "deployment.yaml (Kubernetes)",
      languageB: "yaml",
      codeB: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: api-deployment
  labels:
    app: api
spec:
  replicas: 3
  selector:
    matchLabels:
      app: api
  template:
    metadata:
      labels:
        app: api
    spec:
      containers:
        - name: api
          image: mycompany/api:v1.4.0
          ports:
            - containerPort: 3000
          resources:
            limits:
              cpu: "500m"
              memory: "512Mi"
          livenessProbe:
            httpGet:
              path: /healthz
              port: 3000
---
apiVersion: v1
kind: Service
metadata:
  name: api-service
spec:
  selector:
    app: api
  ports:
    - protocol: TCP
      port: 80
      targetPort: 3000`,
    },
    decisionGuide: {
      chooseA: [
        "Local development environments and CI/CD automated test pipelines.",
        "Small to medium applications running on a single dedicated VPS (e.g. Hetzner, DigitalOcean).",
        "Teams without dedicated DevOps/Platform engineers.",
        "You want minimal operational complexity and fast configuration.",
      ],
      chooseB: [
        "Enterprise platforms with multi-node infrastructure and high availability requirements.",
        "Applications requiring automatic traffic spike scaling (e.g., scaling from 3 to 50 pods).",
        "Zero-downtime rolling updates with automatic rollback on failed health checks.",
        "You need standardized policy enforcement, RBAC, and GitOps with ArgoCD.",
      ],
    },
    relatedGuides: [
      { title: "Docker Run Command Reference", href: "/commands/docker/run", type: "command" },
      { title: "Docker Container Exits Immediately Fix", href: "/errors/docker/container-exits-immediately", type: "error" },
      { title: "Dockerize Next.js App Recipe", href: "/recipes/docker/dockerize-nextjs", type: "recipe" },
    ],
  },
  {
    slug: "rest-vs-graphql",
    title: "REST vs GraphQL",
    tagline: "Resource-Based HTTP Endpoints vs Client-Specified Schema Queries",
    category: "API",
    verdict: "Choose REST for straightforward microservices, public developer APIs, resource-based CRUD applications, and when taking full advantage of HTTP/CDN caching is critical. Choose GraphQL for complex frontends fetching relational data from multiple sources, mobile apps needing minimal payload sizes, or unified API gateways.",
    techA: {
      name: "REST APIs (RESTful)",
      badge: "HTTP Standard",
      color: "from-blue-600 to-indigo-600",
      maintainer: "Roy Fielding / IETF Standards",
      runtime: "Native HTTP/1.1, HTTP/2, HTTP/3",
      paradigm: "Resource-oriented URIs, standard HTTP verbs (`GET`, `POST`, `PUT`, `DELETE`)",
      ecosystem: "OpenAPI / Swagger, Fetch, Axios, Postman",
      strengths: "Flawless HTTP/CDN caching, intuitive conventions, zero client query runtime",
    },
    techB: {
      name: "GraphQL",
      badge: "Query Language",
      color: "from-pink-600 to-rose-600",
      maintainer: "GraphQL Foundation & Linux Foundation",
      runtime: "GraphQL execution engine (Apollo, Yoga, Relay)",
      paradigm: "Schema definition language (SDL), Single `/graphql` endpoint, precise field selection",
      ecosystem: "Apollo Client, Relay, GraphQL Yoga, Urql, CodeGen",
      strengths: "Eliminates over-fetching and under-fetching, strongly typed schema contracts",
    },
    matrix: [
      {
        feature: "Data Over/Under-Fetching",
        techA: "Can over-fetch unused properties or require multiple sequential requests (under-fetching)",
        techB: "Client specifies exactly the fields needed; single query fetches deep nested relations",
        advantage: "techB",
      },
      {
        feature: "Caching Mechanism",
        techA: "Built on HTTP caching headers (`Cache-Control`, `ETag`, CDN edge caching at URL level)",
        techB: "Complex; single POST endpoint requires normalized client cache (Apollo InMemoryCache)",
        advantage: "techA",
      },
      {
        feature: "Type Safety & Schema",
        techA: "Requires OpenAPI/Swagger generation tools or tRPC for TypeScript safety",
        techB: "Strictly typed schema is core to the specification; automated code generation",
        advantage: "techB",
      },
      {
        feature: "Learning Curve & Overhead",
        techA: "Minimal; universal HTTP understanding across all languages and platforms",
        techB: "Higher; requires resolver design, N+1 query mitigation (Dataloaders), and query complexity analyzers",
        advantage: "techA",
      },
    ],
    benchmarks: [
      {
        metric: "Payload Size for Mobile Feed",
        techA: "~42 KB (Fixed JSON fields from REST endpoint)",
        techB: "~8 KB (Only requested mobile screen fields)",
        winner: "techB",
        note: "GraphQL reduces mobile network bandwidth consumption significantly.",
      },
      {
        metric: "Edge CDN Cache Hit Response Time",
        techA: "1.4ms (Cached at Cloudflare Edge POP)",
        techB: "18ms (Must hit origin GraphQL server to parse query AST)",
        winner: "techA",
        note: "REST URLs cache effortlessly at CDN edges without application server execution.",
      },
      {
        metric: "N+1 Database Query Risk",
        techA: "Low (Explicit SQL join in handler)",
        techB: "High if nested resolvers are unbatched (Requires DataLoader pattern)",
        winner: "techA",
        note: "GraphQL requires Dataloaders to prevent N+1 database bottlenecks in resolvers.",
      },
    ],
    codeComparison: {
      title: "Fetching Author and Post Data",
      problem: "Querying a user's details along with their 5 most recent published post titles.",
      filenameA: "routes/users.ts (REST API)",
      languageA: "typescript",
      codeA: `// GET /api/users/123?include=posts&limit=5
app.get("/api/users/:id", async (req, res) => {
  const user = await db.users.findUnique({
    where: { id: req.params.id },
    select: {
      id: true,
      name: true,
      avatarUrl: true,
      posts: {
        where: { published: true },
        take: 5,
        select: { id: true, title: true, slug: true }
      }
    }
  });

  res.setHeader("Cache-Control", "public, s-maxage=60, stale-while-revalidate=300");
  return res.json(user);
});`,
      filenameB: "schema.graphql (GraphQL Query)",
      languageB: "graphql",
      codeB: `# Client specifies exact field shape
query GetUserPosts($userId: ID!) {
  user(id: $userId) {
    id
    name
    avatarUrl
    posts(limit: 5, filter: { published: true }) {
      id
      title
      slug
    }
  }
}`,
    },
    decisionGuide: {
      chooseA: [
        "Public third-party APIs used by arbitrary HTTP clients and SDKs.",
        "Applications relying heavily on HTTP edge CDN caching (Cloudflare/Fastly).",
        "Standard CRUD architectures with predictable data models.",
        "Simple microservices communicating internally over HTTP/REST or gRPC.",
      ],
      chooseB: [
        "Complex frontends (dashboards, social feeds, mobile apps) querying deeply nested relationships.",
        "Teams wanting automated TypeScript types generated directly from API schema definitions.",
        "Aggregating data from multiple microservices into a single unified frontend gateway.",
        "Bandwidth-constrained mobile applications needing minimal payload footprints.",
      ],
    },
    relatedGuides: [
      { title: "Client-Server Architecture Guide", href: "/docs/backend/client-server-architecture", type: "guide" },
      { title: "Blocked by CORS Policy Error Troubleshooting", href: "/errors/web/cors-policy", type: "error" },
    ],
  },
  {
    slug: "prisma-vs-drizzle",
    title: "Prisma vs Drizzle ORM",
    tagline: "Heavyweight Type-Safe Schema Engine vs Lightweight SQL-First TypeScript ORM",
    category: "Database",
    verdict: "Choose Prisma if your team prioritizes rapid prototyping, declarative migrations, and intuitive relations with minimal raw SQL knowledge. Choose Drizzle ORM if you demand serverless zero-cold-start performance, exact SQL control, and near-zero bundle overhead.",
    techA: {
      name: "Prisma",
      badge: "Schema-Driven ORM",
      color: "from-teal-600 to-emerald-700",
      maintainer: "Prisma Inc. (VC-backed)",
      runtime: "Node.js / Rust query engine engine binaries",
      paradigm: "Custom DSL schema (`schema.prisma`) generating TypeScript client",
      ecosystem: "Mature, vast community, Prisma Studio, Prisma Accelerate/Pulse",
      strengths: "Intuitive query API, automated migration diffing, rich relation filtering",
    },
    techB: {
      name: "Drizzle ORM",
      badge: "SQL-First TypeScript ORM",
      color: "from-amber-500 to-lime-600",
      maintainer: "Drizzle Team",
      runtime: "Every JS runtime (Node.js, Bun, Cloudflare Workers, Edge)",
      paradigm: "Pure TypeScript schema definitions mirroring native SQL",
      ecosystem: "Fast-growing, lightweight, native integration with SQL dialects",
      strengths: "Zero runtime dependencies, ~0ms cold starts, direct SQL control, tiny bundle",
    },
    matrix: [
      {
        feature: "Schema Definition",
        techA: "Custom DSL (`schema.prisma`) requiring CLI generator step",
        techB: "Standard TypeScript code files (`schema.ts`) with zero code generation",
        advantage: "techB",
      },
      {
        feature: "Cold Start & Edge Performance",
        techA: "Heavier engine binary (mitigated by Prisma Accelerate or WASM drivers)",
        techB: "Instant 0ms cold starts on Cloudflare Workers and AWS Lambda",
        advantage: "techB",
      },
      {
        feature: "Developer Ergonomics & Nesting",
        techA: "Fluent nesting syntax (`include`, `select`) makes deep joins effortless",
        techB: "Relational queries available, but complex joins require SQL mindset",
        advantage: "techA",
      },
      {
        feature: "SQL Transparency",
        techA: "Abstracted away behind generated query engine queries",
        techB: "What You See Is What Runs: exact 1-to-1 mapping with raw SQL queries",
        advantage: "techB",
      },
      {
        feature: "Admin UI / Studio",
        techA: "Built-in visual data browser (`npx prisma studio`)",
        techB: "Drizzle Studio (`npx drizzle-kit studio`) web UI",
        advantage: "tie",
      },
    ],
    benchmarks: [
      {
        metric: "Bundle Size Overhead",
        techA: "~2-14 MB (including Query Engine binaries/WASM)",
        techB: "< 50 KB (Pure JS/TS zero-dependency footprint)",
        winner: "techB",
        note: "Drizzle has virtually no bundle weight, making it ideal for edge functions.",
      },
      {
        metric: "Query Execution Overhead",
        techA: "0.8 - 1.5ms overhead from serialization & IPC engine layer",
        techB: "0.1 - 0.2ms (Direct SQL string interpolation & execution)",
        winner: "techB",
        note: "Drizzle is measurably faster under heavy concurrency query loops.",
      },
      {
        metric: "Schema Migration Safety",
        techA: "Prisma Migrate handles shadow databases and rollback validations automatically",
        techB: "Drizzle Kit generates clean SQL migrations with manual confirmation checkpoints",
        winner: "techA",
        note: "Prisma Migrate provides higher automated safety for enterprise schemas.",
      },
    ],
    codeComparison: {
      title: "Querying Users with Active Orders",
      problem: "Selecting users with verified email addresses and fetching their active orders sorted by creation date.",
      filenameA: "lib/prisma-query.ts",
      languageA: "typescript",
      codeA: `import { prisma } from "@/lib/db";

// Type-safe nested relation query
const usersWithOrders = await prisma.user.findMany({
  where: {
    emailVerified: { not: null },
    status: "ACTIVE",
  },
  select: {
    id: true,
    name: true,
    email: true,
    orders: {
      where: { status: "PROCESSING" },
      orderBy: { createdAt: "desc" },
      take: 5,
    },
  },
});`,
      filenameB: "lib/drizzle-query.ts",
      languageB: "typescript",
      codeB: `import { db } from "@/lib/db";
import { users, orders } from "@/lib/schema";
import { eq, isNotNull, desc } from "drizzle-orm";

// SQL-like relational query
const usersWithOrders = await db.query.users.findMany({
  where: (u, { eq, and, isNotNull }) => and(
    isNotNull(u.emailVerified),
    eq(u.status, "ACTIVE")
  ),
  with: {
    orders: {
      where: (o, { eq }) => eq(o.status, "PROCESSING"),
      orderBy: (o, { desc }) => [desc(o.createdAt)],
      limit: 5,
    },
  },
});`,
    },
    decisionGuide: {
      chooseA: [
        "Teams wanting the cleanest developer experience for relational queries without writing SQL.",
        "Full-stack Next.js applications deployed to traditional Node.js/Docker server environments.",
        "Engineers who love Prisma Studio and automated migration diffs out of the box.",
        "Projects requiring battle-tested mature ecosystem plugins and broad community support.",
      ],
      chooseB: [
        "Edge-first architectures (Cloudflare Workers, Vercel Edge Runtime, AWS Lambda).",
        "Developers who know SQL well and want total control over the exact generated queries.",
        "Applications demanding minimal memory usage and zero cold start latency.",
        "Monorepos preferring pure TypeScript schemas over external DSL files.",
      ],
    },
    relatedGuides: [
      { title: "PostgreSQL Production Setup & Configuration", href: "/docs/postgresql/postgresql-overview", type: "guide" },
      { title: "Prisma Getting Started & Setup Guide", href: "/docs/prisma/prisma-overview", type: "guide" },
      { title: "Client-Server Architecture Guide", href: "/docs/backend/client-server-architecture", type: "guide" },
    ],
  },
];

