# Web Development Tech Stack & Workflow Recommendations

**Created:** December 20, 2024  
**Purpose:** Modern tooling to replace WordPress/Divi for professional marketing sites

---

## Executive Summary

**Goal:** Build professional marketing sites (therapist practices, light e-commerce) with minimal technical friction, focusing on design work rather than wrestling with WordPress limitations.

**Solution:** Modern JAMstack architecture with headless CMS, static site generation, and AI-assisted workflows.

---

## Tech Stack Overview

| Component | Choice | Why |
|-----------|--------|-----|
| **IDE** | VSCode | Best web dev ecosystem, free, extensive Astro support |
| **Framework** | Astro | Static-first, blazing fast, islands architecture |
| **CMS** | Sanity.io | Headless, structured content, beautiful client UX |
| **Deployment** | Vercel | Git-push deploys, auto-rebuilds, generous free tier |
| **Design** | Figma | Industry standard, great for design-to-code handoff |

---

## 1. IDE Setup: VSCode

### Why VSCode Over PyCharm Community

- PyCharm Community has limited web development features
- VSCode is purpose-built for JavaScript/TypeScript/web frameworks
- The entire Astro/React ecosystem assumes VSCode
- Better extension ecosystem for modern web development
- Free and actively maintained

### Installation

1. Download from https://code.visualstudio.com/
2. Install for your OS

### Essential Extensions

**Must-Have:**
- **Astro** (astro-build.astro-vscode) - Syntax highlighting, IntelliSense
- **Prettier** (esbenp.prettier-vscode) - Code formatting
- **ESLint** (dbaeumer.vscode-eslint) - JavaScript linting
- **Tailwind CSS IntelliSense** (bradlc.vscode-tailwindcss) - If using Tailwind
- **IntelliJ IDEA Keybindings** (k--kato.intellij-idea-keybindings) - Familiar shortcuts

**Recommended:**
- **GitLens** (eamodio.gitlens) - Supercharged git
- **Error Lens** (usernamehw.errorlens) - Inline error display
- **Auto Rename Tag** (formulahendry.auto-rename-tag) - HTML/JSX tag sync
- **Path Intellisense** (christian-kohler.path-intellisense) - File path autocomplete
- **Thunder Client** (rangav.vscode-thunder-client) - API testing (like Postman)

### Recommended Settings

Create/edit `.vscode/settings.json` in your projects:

```json
{
  "editor.formatOnSave": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "files.autoSave": "onFocusChange",
  "editor.tabSize": 2,
  "editor.insertSpaces": true,
  "editor.minimap.enabled": false,
  "workbench.colorTheme": "Default Dark Modern"
}
```

### Ease the Transition from JetBrains

1. Install IntelliJ IDEA Keybindings extension
2. Common keyboard shortcuts will work identically
3. Expect 2-3 days to feel comfortable, 1 week to feel proficient
4. Keep PyCharm for your Python day job work

---

## 2. Framework: Astro

### What is Astro?

Astro is a modern web framework for building fast, content-focused websites. It's designed for marketing sites, blogs, portfolios, and e-commerce.

**Key Features:**
- **Static-first:** Generates HTML at build time (blazing fast)
- **Islands Architecture:** Add interactive components only where needed
- **Framework-agnostic:** Use React, Vue, Svelte, or none at all
- **Zero JS by default:** Only ships JavaScript when you need it
- **Built-in optimizations:** Image optimization, CSS bundling, etc.

### Why Astro for Marketing Sites?

✅ Perfect for content-heavy sites (therapist practices, professional services)  
✅ Excellent performance out of the box  
✅ Simple to learn if you know HTML/CSS/JS  
✅ Great documentation and growing community  
✅ Works seamlessly with Sanity CMS  

### Getting Started

```bash
# Create new Astro project
npm create astro@latest

# Follow prompts:
# - Where should we create your new project? ./my-project
# - How would you like to start? Use blog template (or Empty)
# - Install dependencies? Yes
# - TypeScript? Yes (recommended)
# - Strictness? Strict
# - Initialize git? Yes

cd my-project
npm run dev
```

### Project Structure

```
my-project/
├── src/
│   ├── components/     # Reusable components
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   └── ServiceCard.astro
│   ├── layouts/        # Page layouts
│   │   └── BaseLayout.astro
│   ├── pages/          # File-based routing
│   │   ├── index.astro
│   │   ├── about.astro
│   │   └── services.astro
│   └── styles/         # Global styles
├── public/             # Static assets
├── astro.config.mjs    # Astro configuration
└── package.json
```

### Key Concepts

**Components (.astro files):**
```astro
---
// Component Script (runs at build time)
const { title, description } = Astro.props;
---

<!-- Component Template (HTML) -->
<div class="service-card">
  <h3>{title}</h3>
  <p>{description}</p>
</div>

<style>
  /* Scoped CSS */
  .service-card {
    border: 1px solid #ccc;
    padding: 1rem;
  }
</style>
```

**Pages (routes):**
- `src/pages/index.astro` → `/`
- `src/pages/about.astro` → `/about`
- `src/pages/blog/[slug].astro` → `/blog/dynamic-slug`

**Fetching Data:**
```astro
---
// Fetch data at build time
const response = await fetch('https://api.sanity.io/...');
const services = await response.json();
---

<ul>
  {services.map(service => (
    <li>{service.title}</li>
  ))}
</ul>
```

### Resources

- Official Docs: https://docs.astro.build/
- Tutorial: https://docs.astro.build/en/tutorial/0-introduction/
- Themes: https://astro.build/themes/

---

## 3. CMS: Sanity.io

### What is Sanity?

Sanity is a headless CMS (Content Operating System) that separates content management from presentation. Your content lives in Sanity's cloud, accessible via API to any platform.

**Key Difference from WordPress:**
- WordPress: Content + Design locked together
- Sanity: Content as structured data, design is separate

### Problems Sanity Solves

✅ **Client can't break the design** - They edit structured content, not page layouts  
✅ **Content reusability** - Use the same content on website, mobile app, emails  
✅ **Better developer experience** - Clean APIs, modern tooling  
✅ **Real-time collaboration** - Google Docs-style editing  
✅ **Performance** - No database queries slowing down your site  

### Free Tier (Perfect for Small Sites)

- Unlimited API requests
- 3 users
- 10GB assets
- 100,000 documents
- Community support

**When you'd pay:** Pro tier at $99/month for more users/storage (unlikely for these sites)

### Getting Started

```bash
# Install Sanity CLI
npm install -g @sanity/cli

# Create new project
sanity init

# Follow prompts:
# - Create new project
# - Project name: therapist-site-cms
# - Dataset: production
# - Template: Blog (or clean)

# Start Sanity Studio locally
cd my-sanity-project
sanity dev
```

Studio opens at `http://localhost:3333`

### Defining Content Schemas

Schemas define your content structure. Example for a therapist site:

```javascript
// schemas/service.js
export default {
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Service Title',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number'
    },
    {
      name: 'duration',
      title: 'Duration (minutes)',
      type: 'number'
    },
    {
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true // Enables image cropping
      }
    }
  ]
}
```

**Other useful schemas for therapist sites:**
- Team members
- Testimonials
- Blog posts
- FAQs
- Pages (for flexible page building)

### Connecting Sanity to Astro

```bash
# Install Sanity client in your Astro project
npm install @sanity/client @sanity/image-url
```

```javascript
// src/lib/sanity.js
import { createClient } from '@sanity/client';

export const sanityClient = createClient({
  projectId: 'your-project-id',
  dataset: 'production',
  useCdn: true, // Enable CDN for faster responses
  apiVersion: '2024-01-01'
});
```

```astro
---
// src/pages/services.astro
import { sanityClient } from '../lib/sanity';

const services = await sanityClient.fetch(
  `*[_type == "service"] | order(title asc)`
);
---

<h1>Our Services</h1>
{services.map(service => (
  <div class="service">
    <h2>{service.title}</h2>
    <p>{service.description}</p>
    <p>Duration: {service.duration} minutes</p>
    <p>Price: ${service.price}</p>
  </div>
))}
```

### GROQ Query Language

GROQ is Sanity's query language (similar to GraphQL but simpler):

```javascript
// Get all services
`*[_type == "service"]`

// Get single service by slug
`*[_type == "service" && slug.current == "therapy-session"][0]`

// Get services with specific fields only
`*[_type == "service"]{ title, price, "imageUrl": image.asset->url }`

// Get services sorted by price
`*[_type == "service"] | order(price asc)`
```

### Deploying Sanity Studio

```bash
# Deploy to Sanity's hosting (free)
sanity deploy

# You'll get a URL like: your-project.sanity.studio
```

Give this URL to your client for content management.

### Resources

- Official Docs: https://www.sanity.io/docs
- Schema Types: https://www.sanity.io/docs/schema-types
- GROQ Docs: https://www.sanity.io/docs/groq
- Astro + Sanity Guide: https://docs.astro.build/en/guides/cms/sanity/

---

## 4. Deployment: Vercel

### What is Vercel?

Vercel is a deployment platform built for frontend frameworks. It's made by the creators of Next.js but works perfectly with Astro, React, Vue, and more.

**Key Feature:** Git-connected deployments - push to GitHub → automatic deploy.

### Why Vercel Over AWS

**Vercel:**
- ✅ Zero configuration
- ✅ Automatic SSL certificates
- ✅ Global CDN included
- ✅ Preview deployments for branches
- ✅ Free tier is genuinely generous
- ✅ 30-second setup

**AWS (S3 + CloudFront):**
- ✅ Cheaper at high scale (~$1-3/month)
- ✅ More control
- ❌ 1-2 hours manual setup
- ❌ You manage everything
- ❌ No built-in CI/CD

**For marketing sites: Vercel wins on time savings.**

### Free Tier

- Unlimited sites
- 100GB bandwidth/month (plenty for small sites)
- 6,000 build minutes/month
- Automatic previews for PRs
- Custom domains (unlimited)
- Global edge network

**When you'd pay:** Pro tier at $20/month for 1TB bandwidth (only needed for high-traffic sites)

### Getting Started

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy from your project directory
cd my-astro-project
vercel

# Follow prompts - done in 30 seconds
```

### Git-Connected Workflow (Recommended)

**One-time setup:**

1. Push your Astro project to GitHub
2. Go to https://vercel.com/new
3. Import your GitHub repo
4. Vercel auto-detects Astro
5. Click "Deploy"

**Every day after:**

```bash
git add .
git commit -m "Updated services page"
git push
```

Vercel automatically:
- Builds your site
- Deploys to production (if pushing to main branch)
- Creates preview URL for other branches
- Comments on GitHub with deployment URL

### Environment Variables

For Sanity API keys and other secrets:

1. Vercel Dashboard → Your Project → Settings → Environment Variables
2. Add variables:
   - `PUBLIC_SANITY_PROJECT_ID`
   - `PUBLIC_SANITY_DATASET`
   - `SANITY_API_TOKEN` (if using authenticated requests)

### Custom Domains

1. Vercel Dashboard → Your Project → Settings → Domains
2. Add your domain (e.g., `drsmith-therapy.com`)
3. Update DNS settings (Vercel provides instructions)
4. SSL certificate auto-generated

### Webhooks for Auto-Rebuild

When client updates content in Sanity, trigger automatic rebuild:

1. Vercel Dashboard → Your Project → Settings → Git → Deploy Hooks
2. Create deploy hook → Copy URL
3. Sanity Dashboard → API → Webhooks
4. Add webhook → Paste Vercel URL
5. Trigger on: Create/Update/Delete

Now: Client updates content → Site rebuilds automatically (~30 seconds).

### Resources

- Vercel Docs: https://vercel.com/docs
- Astro on Vercel: https://vercel.com/docs/frameworks/astro
- Deploy Hooks: https://vercel.com/docs/deployments/deploy-hooks

---

## 5. Design Tool: Figma

### Why Figma

- Industry standard for web design
- Browser-based (no installation needed)
- Better collaboration than Affinity Designer for web projects
- Excellent developer handoff tools
- Component systems map well to code components

### Free Tier

- Unlimited personal files
- Up to 3 Figma files and 3 FigJam files in drafts
- Unlimited collaborators on view-only mode

### Design-to-Code Workflow

1. **Design in Figma:**
   - Create components (Header, Button, ServiceCard)
   - Use Auto Layout (maps to flexbox/grid)
   - Define text/color styles (becomes CSS variables)

2. **Inspect & Export:**
   - Developer mode shows CSS properties
   - Export assets (images, icons, logos)
   - Copy SVG code directly

3. **Build in Astro:**
   - Create corresponding `.astro` components
   - Use Figma's spacing/sizing as guide
   - Export images to `/public` folder

### Resources

- Figma for Developers: https://www.figma.com/developers
- Design Systems: https://www.figma.com/design-systems/

---

## Complete Workflow Example

### Initial Setup (One-Time)

1. **Design Phase:**
   - Create mockups in Figma
   - Define component structure
   - Export assets

2. **Development Phase:**
   - Create Astro project: `npm create astro@latest`
   - Create Sanity project: `sanity init`
   - Define content schemas in Sanity
   - Build Astro components matching Figma design
   - Connect Astro to Sanity API
   - Test locally

3. **Deployment Phase:**
   - Push to GitHub
   - Connect to Vercel
   - Configure environment variables
   - Set up Sanity webhooks
   - Add custom domain

### Daily Client Content Updates

**Client's perspective:**
1. Visit `yoursite.sanity.studio`
2. Click "New Service" (or edit existing)
3. Fill in form fields
4. Upload image
5. Click "Publish"
6. Wait ~30 seconds
7. New content is live

**Your involvement:** Zero. It just works.

### Making Design Changes

1. Update components in Astro
2. Commit and push to git
3. Vercel auto-deploys
4. Changes live in ~30 seconds

---

## Project File Structure (Recommended)

```
~/dev/web-projects/
├── skills/                          # Claude SKILL.md files
│   ├── astro-sanity-setup.md
│   ├── vercel-deployment.md
│   └── new-client-onboarding.md
│
├── boilerplate/                     # Starter template (future)
│   ├── astro-base/
│   └── sanity-schemas/
│
└── clients/                         # Actual client projects
    ├── therapist-jane/
    │   ├── site/                    # Astro project
    │   └── cms/                     # Sanity project
    └── client-b/
        ├── site/
        └── cms/
```

---

## Next Steps

### Phase 1: Learn the Stack (Current)

**Week 1-2: Fundamentals**
- [ ] Install VSCode and essential extensions
- [ ] Complete Astro tutorial (https://docs.astro.build/en/tutorial/0-introduction/)
- [ ] Create a simple Astro site (portfolio, practice project)
- [ ] Experiment with components and layouts

**Week 3-4: Add Sanity**
- [ ] Create Sanity project
- [ ] Define 2-3 simple schemas
- [ ] Connect Sanity to Astro project
- [ ] Practice GROQ queries

**Week 5: Deploy**
- [ ] Deploy to Vercel
- [ ] Set up custom domain
- [ ] Configure webhooks
- [ ] Test the full workflow

### Phase 2: Build Therapist Site (Next)

- [ ] Design in Figma
- [ ] Set up project structure
- [ ] Build core components
- [ ] Define Sanity schemas for therapist content
- [ ] Connect everything
- [ ] Deploy and hand off to client

### Phase 3: Create Boilerplate (Future)

- [ ] Extract reusable components
- [ ] Create starter schemas for service businesses
- [ ] Build setup scripts
- [ ] Document the process

### Phase 4: Claude Integration (Future)

Create SKILL.md files for:
- [ ] `astro-sanity-setup.md` - Rapid project scaffolding
- [ ] `vercel-deployment.md` - Deployment automation
- [ ] `new-client-onboarding.md` - Client setup checklist
- [ ] `component-library.md` - Reusable component patterns

---

## Learning Resources

### Astro
- Official Tutorial: https://docs.astro.build/en/tutorial/0-introduction/
- Astro Blog Course: https://www.youtube.com/watch?v=XoIHKO6AkoM
- Astro + Sanity: https://www.sanity.io/plugins/sanity-astro

### Sanity
- Sanity Crash Course: https://www.youtube.com/watch?v=32RP-sG1njE
- Schema Guides: https://www.sanity.io/guides
- GROQ Tutorial: https://www.sanity.io/docs/how-queries-work

### Vercel
- Vercel Quickstart: https://vercel.com/docs/getting-started-with-vercel
- Deploy Astro: https://vercel.com/guides/deploying-astro-with-vercel

### VSCode
- VSCode Tips: https://code.visualstudio.com/docs/getstarted/tips-and-tricks
- Keyboard Shortcuts: https://code.visualstudio.com/shortcuts/keyboard-shortcuts-windows.pdf

---

## Troubleshooting Common Issues

### Sanity Schema Not Updating
```bash
# Restart Sanity Studio
sanity dev --host 0.0.0.0 --port 3333
```

### Vercel Build Failing
- Check build logs in Vercel dashboard
- Ensure environment variables are set
- Test build locally: `npm run build`

### Content Not Updating on Site
- Check if webhook is configured correctly
- Manually trigger rebuild in Vercel dashboard
- Verify Sanity API token permissions

### VSCode IntelliSense Not Working
- Restart VSCode
- Ensure TypeScript version is current
- Check workspace settings

---

## Cost Breakdown

### Free Tier (Good for Starting)
- VSCode: **Free**
- Astro: **Free** (open source)
- Sanity: **Free** (up to 3 users, 10GB assets)
- Vercel: **Free** (100GB bandwidth/month)
- Figma: **Free** (personal use)

**Total: $0/month**

### Paid Tier (If Needed)
- Domain name: **~$12-15/year**
- Sanity Pro (if needed): **$99/month**
- Vercel Pro (if needed): **$20/month**
- Figma Pro (if collaborating): **$12/month**

**Likely monthly cost per project: $0-20** (most sites stay on free tiers)

---

## Key Differences from WordPress/Divi

| Aspect | WordPress/Divi | Astro + Sanity |
|--------|---------------|----------------|
| **Content Editing** | WYSIWYG page builder | Structured forms |
| **Performance** | Slow (database queries) | Fast (static HTML) |
| **Client Control** | Can break design | Can only edit content |
| **Updates** | Plugins, themes, core | Just your code |
| **Hosting** | Traditional server needed | Static hosting (cheap) |
| **Maintenance** | Regular updates required | Minimal |
| **Developer Experience** | Frustrating | Modern & clean |
| **Learning Curve** | Low for basics | Medium for setup |

---

## When NOT to Use This Stack

**Use WordPress instead if:**
- Client needs to edit page layouts themselves
- Client is non-technical and wants full DIY control
- Need extensive plugin ecosystem (very specific features)
- Very limited budget for development time

**Use Shopify/BigCommerce instead if:**
- Primary focus is e-commerce with 100+ products
- Need built-in payment processing, inventory management
- Client needs e-commerce admin dashboard

**Use Webflow instead if:**
- You want visual development without code
- Client wants some layout control
- You don't want to write code at all

---

## Summary: Why This Stack Works

✅ **Eliminates WordPress frustration** - Modern, clean tooling  
✅ **Focuses on design** - Technical scaffolding becomes routine with practice  
✅ **Client-friendly** - Beautiful content editing experience  
✅ **Performance** - Fast sites out of the box  
✅ **Future-proof** - Content reusable, modern architecture  
✅ **Cost-effective** - Free tier handles most projects  
✅ **AI-assisted** - Claude can help with setup, deployment, troubleshooting  

---

## Support & Community

- **Astro Discord:** https://astro.build/chat
- **Sanity Slack:** https://slack.sanity.io/
- **Stack Overflow:** Tag questions with `astro`, `sanity`, `vercel`
- **Claude (this conversation):** Revisit for detailed help on any topic

---

**Last Updated:** December 20, 2024  
**Version:** 1.0  
**Author:** Web Development Recommendations for Modern Marketing Sites
