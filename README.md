# 🌊 MAVY Seafood — Premium Natural Seafood E-Commerce & AI Culinary Studio

> An immersive, high-performance seafood e-commerce platform and context-aware AI Culinary Studio built for Vietnam's premium wild seafood brand **MAVY Seafood**.

[![Next.js](https://img.shields.io/badge/Next.js-16.3-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12.4-0055FF?style=for-the-badge&logo=framer&logoColor=white)](https://www.framer.com/motion/)
[![Google Gemini](https://img.shields.io/badge/Google_Gemini-2.0_Flash-8E75B2?style=for-the-badge&logo=googlegemini&logoColor=white)](https://aistudio.google.com/)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](#license)

---

## 📖 1. Project Overview

**MAVY Seafood** is a modern direct-to-consumer (D2C) culinary platform showcasing and distributing premium wild-caught seafood from Ca Mau, Vietnam:
- 🦀 **Ca Mau Roe Crab (Cua Gạch Cà Mau)**: Verified meat density ≥ 95%, ultra-light binding rope (< 20g).
- 🦐 **VIP Frozen Black Tiger Shrimp (Tôm Sú VIP)**: Harvested from mangrove ecosystems, flash-frozen at -18°C.
- 🦑 **Frozen Egg Squid (Mực Trứng Cấp Đông)**: 100% whole squid with intact roe, zero chemical preservation.

The platform combines storytelling-driven motion graphics with an intelligent in-browser culinary advisor powered by Google Gemini, helping customers not only purchase premium ingredients but also master chef-grade seafood cooking at home.

---

## ✨ 2. Key Technical & Architectural Highlights

### 🎯 Purposeful Storytelling & Orchestrated Motion Design
- **Orchestrated Hero Reveal**: Tiered entry animations that guide the user's attention from brand mission to product categories.
- **Shared-Element Transitions**: Smooth modal popups that expand naturally from product cards without abrupt layout shifts.
- **4-Stage Interactive Cooking Stepper**: Visual step-by-step cooking progress indicator breaking down heat levels, timings, and resting stages.
- **IQF Flash Freezing Diagram**: Educational animated graphic demonstrating the preservation of cellular tissue at -18°C.

### 🤖 Context-Aware AI Culinary Studio (Gemini 2.0 / 1.5 Flash)
- **Zero-Friction Ingredient Pairing**: Users input ingredients already in their refrigerator, and the AI chef suggests authentic Vietnamese and international seafood recipes.
- **Temperature & Stage Breakdown**: Recipes provide exact pan temperatures, simmering timings, and chef tips rather than generic cooking instructions.
- **Serverless API Route**: Implemented via Next.js App Router API Route (`/api/chat`) with strict request validation using **Zod**.
- **Fault-Tolerant LLM Rotator (`lib/llm-rotator.ts`)**: Supports multi-key round-robin rotation for Google Gemini API and features an automated procedural fallback generator so users never see an error state even during network outages.

### 📊 Radical Transparency & Comparison Engine
- Interactive comparison matrix displaying quantifiable metrics: **MAVY Seafood vs. Traditional Wet Markets** (string weight ratio, meat yield guarantee, cold-chain compliance).

### 🎨 Centralized Design Token System
- Design Tokens strictly maintained in `tailwind.config.ts`:
  - `navy-950`, `navy-900`, `navy-800` (Deep oceanic foundation)
  - `gold` (Warm culinary accent `#E5B869`)
  - `ink-light`, `ink-muted` (High-contrast typography)
  - `sale` (`#E53E3E` alert tone)

---

## 🛠️ 3. Tech Stack

| Domain | Technology / Library | Description |
|---|---|---|
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) | React Server Components, Streaming, API Handlers |
| **Language** | [TypeScript 5.7](https://www.typescriptlang.org/) | Strict mode, end-to-end interface safety |
| **UI Library** | [React 19](https://react.dev/) | Latest concurrent features and component lifecycles |
| **Styling** | [Tailwind CSS 3.4](https://tailwindcss.com/) | Utility-first CSS with custom semantic tokens |
| **Animations** | [Framer Motion 12](https://www.framer.com/motion/) | Shared-element transitions, scroll-linked animations |
| **Icons** | [Ionicons 5 & Lucide React](https://lucide.dev/) | Crisp, lightweight SVG iconography |
| **AI Engine** | [Google Gemini API](https://aistudio.google.com/) | Powered by `gemini-2.0-flash` & `gemini-1.5-flash` |
| **Validation** | [Zod 4](https://zod.dev/) | Type-safe schema validation for API payloads |

---

## 📂 4. Project Structure

```text
MAVY/
├── public/
│   └── assets/
│       ├── image/             # High-resolution optimized product assets
│       └── video/             # 1080p web-optimized field documentary video
├── src/
│   ├── app/
│   │   ├── api/chat/          # Serverless Route Handler for AI Chef & Rate Limiter
│   │   ├── globals.css        # Global CSS, scrollbar styles & utility classes
│   │   ├── layout.tsx         # Root Layout (Be Vietnam Pro & Inter typography)
│   │   └── page.tsx           # Primary Landing Page: Hero → Video → Products → Recipes → Standards
│   ├── components/
│   │   ├── layout/            # Navbar, Mobile Menu, Footer
│   │   ├── sections/          # HeroSection, VideoShowcase, ProductsSection, QualityCertifications
│   │   ├── chatbot/           # ChatMessage, RecipeCard, ChatWindow (AI Culinary Studio)
│   │   └── ui/                # AnimeCounter, Modal, SharedElement wrappers
│   ├── data/                  # brandInfo.ts, products.ts, recipes.ts
│   ├── lib/                   # llm-rotator.ts (Key rotation & Procedural Fallback Generator)
│   └── types/                 # Product, Recipe, ChatMessage schema definitions
├── .env.local.example         # Template for environment configuration
├── tailwind.config.ts         # Single Source of Truth for Design Tokens
└── tsconfig.json              # TypeScript compilation configuration
```

---

## 🚀 5. Getting Started

### Prerequisites
- Node.js 18.18 or higher (Node 20+ recommended)
- npm, pnpm, or yarn

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone https://github.com/lqkhanh295/MAVY.git
   cd MAVY
   ```

2. **Install project dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy the example environment file:
   ```bash
   cp .env.local.example .env.local
   ```
   Open `.env.local` and add your Google Gemini API key:
   ```env
   # Google Gemini API Key (Obtain from https://aistudio.google.com/)
   GEMINI_API_KEY=your_gemini_api_key_here

   # (Optional) Round-robin rotation between multiple API keys
   # GEMINI_API_KEYS=key_1,key_2,key_3
   ```

4. **Launch Development Server:**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your web browser.

5. **Build for Production:**
   ```bash
   npm run build
   npm start
   ```

---

## 📡 6. API Reference

### AI Culinary Studio Endpoint
- **URL**: `/api/chat`
- **Method**: `POST`
- **Headers**: `Content-Type: application/json`

#### Request Payload:
```json
{
  "messages": [
    {
      "role": "user",
      "content": "I have frozen Ca Mau crab, garlic, and butter. What can I cook in under 20 minutes?"
    }
  ]
}
```

#### Response Payload:
```json
{
  "recipe": {
    "title": "Garlic Butter Pan-Seared Ca Mau Roe Crab",
    "prepTime": "10 mins",
    "cookTime": "15 mins",
    "servings": 2,
    "temperatureStages": [
      { "stage": "Searing", "temp": "Medium-High", "time": "5 mins", "action": "Caramelize garlic and brown crab shell" },
      { "stage": "Butter Glazing", "temp": "Low", "time": "8 mins", "action": "Baste constantly with butter emulsion" }
    ],
    "ingredients": ["Ca Mau Roe Crab", "Unsalted Butter", "Garlic", "Black Pepper"],
    "steps": ["Step 1...", "Step 2...", "Step 3..."]
  }
}
```

---

## 📐 7. Architecture & Code Guidelines

- **Token-Driven Styling**: Direct hex codes inside components are forbidden. All colors, spacing, and font sizes must derive from `tailwind.config.ts`.
- **Motion Restraint**: To avoid visual fatigue, only one primary animated focal point is active per viewport (Hero reveal, modal expand, or step transition).
- **Graceful Degradation**: If the Gemini API reaches its rate limit or is unreachable, `llm-rotator.ts` activates the internal rule-based recipe generator to return structured advice instantly.

---

## 📄 License

This project is open-source and licensed under the [MIT License](LICENSE).
Copyright © 2026 [Le Quoc Khanh](https://github.com/lqkhanh295).
