<div align="center">

# 🍔 Order.uk

### Full-Stack Food Delivery Platform

[![Next.js](https://img.shields.io/badge/Next.js_16-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_v4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)](https://postgresql.org)
[![Prisma](https://img.shields.io/badge/Prisma_7-2D3748?style=for-the-badge&logo=prisma)](https://prisma.io)

**[🌐 Live Demo](https://your-url.vercel.app)** · **[🔐 Admin Panel](https://your-url.vercel.app/admin)** · **[📂 Repository](https://github.com/Fanchuk/order-uk)**

![Order.uk Preview](./public/preview.png)

</div>

---

## 📖 Overview

Order.uk is a production-grade food delivery application built to demonstrate full-stack development skills — from database schema design to admin operations. The project covers two distinct problem classes: **transactional e-commerce** on the customer side and **real-time data management** on the admin side.

> Built as Portfolio Project #1 of 3. Each project targets a distinct engineering challenge.

---

## ✨ Features

### 🧑‍💻 Customer Experience
| Feature | Details |
|---------|---------|
| Restaurant Browser | Dynamic menus grouped by 11 categories |
| Sticky Navigation | Scroll-spy with active category highlight |
| Cart & Checkout | Zustand state, coupon validation, order flow |
| Order Tracking | Real-time status updates |
| Responsive Design | Mobile-first, works on all screen sizes |

### 🛠 Admin Panel `/admin`
| Feature | Details |
|---------|---------|
| Authentication | httpOnly cookie, middleware-protected routes |
| Dashboard | Live stats — orders, revenue, charts (Recharts) |
| Orders Table | Inline status updates with optimistic UI |
| Menu CRUD | Add / edit / delete items via react-hook-form + Zod |

---

## 🏗 Architecture Highlights

app/
├── admin/               # Protected admin section
│   ├── page.tsx         # Dashboard — Server Component + Recharts
│   ├── orders/          # Orders table with optimistic updates
│   └── menu/[id]/       # Menu CRUD per restaurant
├── api/
│   ├── admin/login/     # Cookie auth (POST + DELETE)
│   └── orders/[id]/     # PATCH status endpoint + Zod validation
└── restaurants/[id]/    # Dynamic restaurant pages

**Key decisions:**
- **Server Components** fetch directly from Prisma — zero client-side waterfall for page loads
- **Optimistic UI** in orders table — instant feedback before server confirms
- **Integer pricing** (pence) — avoids floating-point arithmetic errors
- **Parallel queries** via `Promise.all` — dashboard loads 5 DB queries simultaneously
- **httpOnly cookies** — admin session invisible to JavaScript, immune to XSS

---

## 🛠 Tech Stack

| Layer | Technology | Why |
|-------|-----------|-----|
| Framework | Next.js 16 App Router | Server Components + file-based routing |
| Language | TypeScript | Type safety across full stack |
| Styling | Tailwind CSS v4 | Utility-first, zero runtime |
| Database | PostgreSQL (Neon) | Serverless Postgres, free tier |
| ORM | Prisma 7 | Type-safe queries, migrations |
| State | Zustand | Lightweight cart management |
| Validation | Zod | Runtime + compile-time safety |
| Charts | Recharts | Client-side SVG charts |
| Auth | Custom cookies | httpOnly, sameSite, secure |

---

## 🚀 Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/Fanchuk/order-uk.git
cd order-uk

# 2. Install dependencies
npm install

# 3. Configure environment
cp .env.example .env
# Fill in DATABASE_URL and ADMIN_PASSWORD

# 4. Set up the database
npx prisma db push
npx prisma db seed

# 5. Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

**Admin access:** navigate to `/admin` → use password from your `.env`

---

## 🔐 Environment Variables

Create a `.env` file in the `client/` directory:

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=verify-full"
ADMIN_PASSWORD="your_secure_password"
```

> ⚠️ Never commit `.env` to version control. It is excluded via `.gitignore`.

---

## 📁 Project Structure

client/
├── prisma/
│   ├── schema.prisma    # Database schema (10 models)
│   └── seed.ts          # Seed data — 6 restaurants, menus, orders
├── src/
│   ├── app/             # Next.js App Router pages & API routes
│   ├── components/      # Reusable UI components
│   ├── features/        # Feature modules (basket, catalog)
│   └── shared/          # Utilities, constants, Prisma client
└── public/              # Static assets & images

---

## 📸 Screenshots

| Customer View | Admin Dashboard |
|:---:|:---:|
| ![Customer](./public/preview.png) | ![Admin](./public/preview-admin.png) |

---

## 📄 License

MIT © [Nazar Fanchuk](https://github.com/Fanchuk)

---

<div align="center">

**Built with ❤️ as part of a 3-project Junior Frontend portfolio**

[Portfolio](https://your-portfolio.vercel.app) · [LinkedIn](https://linkedin.com/in/your-profile) · [GitHub](https://github.com/Fanchuk)

</div>
