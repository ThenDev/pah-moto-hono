# 🧾 Moto Payment System — Project Specification

## 📌 Project Overview
- **Project Name**: Moto Payment System
- **Purpose**: A secure, staff-facing web app for collecting card payments over the phone (MOTO) via Stripe in test mode.
- **Deployment Target**: Local production build running on a shop computer
- **Frontend Flow**: Step-based form with one field per screen (e.g. name → phone → postcode → card payment)
- **Environment**: Cloudflare Pages + Cloudflare Workers

---

## 🧰 Core Stack

| Layer        | Technology              |
|-------------|--------------------------|
| Frontend     | HTML + Alpine.js         |
| Styling      | Tailwind CSS v4          |
| Backend      | Hono (TypeScript)        |
| Database     | Cloudflare D1 (SQLite)   |
| Storage      | None (stateless app)     |
| Payment API  | Stripe (test mode, Elements) |
| Key/Secret Management | Wrangler Environment Bindings |

---

## 🔐 Authentication & Security

- **Auth Type**: PIN-based access control
- **Locking**: Enforced via D1 — lockout on multiple failed attempts
- **KV Usage**: ❌ Not used (due to eventual consistency)
- **D1**: ✅ Used for real-time locking, logging, and customer data

---

## 💳 Stripe Integration Notes

- **Integration Method**: Stripe Elements (client-side card input)
- **MOTO Flag**: `moto: true` is *not supported* with Elements
- **Metadata**: Customer name, phone, postcode, and description should be attached to `PaymentIntent` via metadata
- **Test Mode**: All payments are conducted in Stripe test mode

---

## 🧠 Form Flow (Step-by-Step)

1. Enter PIN (validated via middleware)
2. Enter customer name
3. Enter customer phone
4. Enter billing postcode
5. Enter sale description
6. Enter payment amount (in cents or formatted)
7. Submit payment via Stripe Elements

---

## 🧱 File/Directory Structure

```
/public/
├── index.html              # Step form with Alpine.js + Stripe Elements
├── js/
│   └── step-form.js        # Alpine.js component state and form logic
├── css/
│   └── styles.css          # Optional Tailwind base

/worker/
├── src/
│   ├── index.ts            # Hono app entry point
│   ├── middleware/
│   │   └── pin.ts          # Middleware to validate and lock PINs
│   └── routes/
│       ├── customer.ts     # Handlers for name, phone, etc.
│       └── payment.ts      # Stripe PaymentIntent logic
└── wrangler.toml           # Cloudflare project config with bindings
```

---

## 🔧 Backend Conventions

- All backend code is TypeScript with strict mode enabled
- Use Hono’s middleware for CORS, PIN verification, error handling
- All requests and responses must be typed
- Stripe keys must be securely injected via Wrangler env bindings
- Avoid direct DOM manipulation or client logic in Workers

---

## 🧩 Frontend Conventions

- Use Alpine.js (`x-data`, `x-show`, `x-model`, `x-if`) for all interactivity
- Use `fetch` to interact with `/api/*` routes
- Handle all errors with user feedback
- Use Tailwind CSS utility classes only (no custom classes)
- Ensure all UI elements are mobile/touch-friendly

---

## 🔄 Git Workflow

- All code changes must include a commit message using the following format:
```
feature: short description of the change
```

- Do not include git commands — commit messages only
- Use lowercase prefix (`feature:`) and present-tense verbs

---

## 📋 TypeScript & Linting Rules

- Use `strict` mode
- No implicit `any`
- No unused variables
- Avoid unused catch variables
- Prefer `interface` over `type`
- Avoid `enum` — use const maps

---

## ✅ UI Behaviour

- Every click interaction must support mobile touch
- Stripe Elements must handle all card data input
- Display user-friendly error messages for failed steps
- Card payment is the only supported payment method

---

## 📌 Project Summary

| Feature                     | Included |
|----------------------------|----------|
| Step-based form            | ✅        |
| PIN login and lockout      | ✅        |
| Stripe Elements integration| ✅        |
| MOTO payment metadata      | ✅        |
| Cloudflare D1 (realtime)   | ✅        |
| Cloudflare KV              | ❌        |
| Alpine.js frontend         | ✅        |
| Tailwind 4 styling         | ✅        |
| Test mode only             | ✅        |
