Here is the comprehensive list of all the technologies that could be featured in the **Barbets Duet** architecture diagram and their specific functions within this self-hosted, type-safe ecosystem:

### **Core Engine & Architecture**

* **Next.js (FE \+ BE):** The foundational framework handling both the frontend user interface and backend API routes. It enables features like server-side rendering (SSR) for fast image loading and static site generation for exhibition archives.  
* **oRPC:** An Object-based Remote Procedure Call framework. It acts as the API layer, allowing the frontend to call backend functions directly with automatic type safety, ensuring a seamless data contract across the app.  
* **Zod:** A TypeScript-first schema declaration and validation library. It acts as the "gatekeeper," validating any data entering or leaving the system (e.g., verifying form inputs or API request bodies).

### **UI/UX & Creative Presentation**

* **Base UI:** A headless, unstyled React component library focused on accessibility (WAI-ARIA compliance). It provides the core structural components of the site.  
* **ShadcnUI:** A component collection built on top of accessible primitives, giving full design control over the interface elements.  
* **Tailwind CSS:** A utility-first CSS framework used for rapid, precise styling, easily facilitating a minimalist, high-end contemporary art gallery aesthetic.  
* **Spline:** A 3D design tool used to embed interactive 3D elements—perfect for showcasing virtual gallery spaces or interactive digital art installations.  
* **GSAP (GreenSock Animation Platform):** A robust JavaScript animation library used to orchestrate complex, high-performance UI transitions and scroll-driven interactions.  
* **Fumadocs:** A specialized documentation framework used to maintain typesafe, markdown-driven technical docs, collection guides, or editorial archives.

### **Database & Persistence**

* **Prisma:** A typesafe Object-Relational Mapper (ORM) that makes querying database tables feel like writing standard TypeScript code.  
* **Neon:** A serverless PostgreSQL database engine that scales automatically and offers instant database branching for staging and preview deployments.  
* **Redis:** An in-memory, high-performance database, cache, and message broker used for instantaneous session handling and rapid data lookups.  
* **Cloudflare R2:** Global object storage used to store high-resolution artwork images and media files with zero egress (download) fees.

### **Authentication & Security**

* **Better-Auth:** An open-source, self-hosted identity solution used to securely manage artist, visitor, and staff user authentication.  
* **Arcjet:** Native security middleware built into the code to handle rate limiting, bot protection, and email validation to prevent abuse of reservation or contact forms.

### **AI & Gateways**

* **AI SDK:** A unified developer toolkit used to integrate language models into the application.  
* **Open-Router:** An AI gateway that aggregates access to multiple large language models (LLMs) through a single API, allowing the app to switch models smoothly.

### **Third-Party Services & Operational Integrations**

* **Stripe:** A global payment processor utilized to securely handle gallery donations, patron subscriptions, workshop booking fees, and art book shop sales.  
* **Odoo CRM:** A comprehensive customer relationship management platform used to track art sales, collector profiles, and visitor engagement.  
* **Listmonk:** A lightweight, self-hosted newsletter manager used to handle automated transactional emails, mailing lists, and exhibition announcement campaigns.  
* **NodeBB / Next.js:** A modern, real-time, forum ecosystem integrated into the app to cultivate community discussions, artist forums, and critical discourse around exhibitions.  
* **Umami:** A privacy-focused, open-source, and cookie-free web analytics tool used to ethically track site traffic and gallery page performance without needing invasive cookie consent banners.  
* **Coolify:** A self-hosted Platform-as-a-Service (PaaS) engine (running on **Hetzner/DigitalOcean VPS**) that automates the deployment, SSL management, and container orchestration of the entire ecosystem.

### **How Next.js Interacts with Sanity CDN in this Layout**

* **`apicdn.sanity.io` (Edge Queries):** Next.js uses GROQ or GraphQL via `next-sanity` to request content. These queries hit cached edge nodes, yielding response times usually under 50ms.  
* **On-Demand Revalidation (Webhooks):** Since you are self-hosting on Coolify, when an curator hits "Publish" in Sanity, a webhook fires from Sanity's cloud straight into your **Next.js** API layer (`oRPC` or a dedicated route), telling the Next.js cache to clear immediately. This ensures instant updates on the live gallery site without rebuilding the container.  
* **`cdn.sanity.io` (Asset Transformation):** Exhibition posters and artist images are delivered through Sanity's asset pipeline, automatically compressed to Next-generation image formats (`webp`, `avif`) on the fly.

