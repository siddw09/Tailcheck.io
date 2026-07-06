# TailCheck Monorepo

A full-stack aircraft tracking monorepo with:

- `backend`: Express + TypeScript API layer
- `frontend`: Next.js App Router dashboard with Tailwind and shadcn-friendly primitives
- `shared`: Zod schemas and shared TypeScript types

## Stack

- Turbo monorepo orchestration
- pnpm workspaces
- Express backend
- Next.js frontend
- Tailwind CSS for styling
- Radix UI compatible component patterns

## Run

1. Install dependencies with `npm install`.
2. Start development with `npm run dev`.

## UI direction

The frontend is prepared for shadcn/ui and Radix UI. The recommended path is to keep the dashboard shell in `frontend/src/components/dashboard` and add reusable primitives in `frontend/src/components/ui`.

For a polished console-style UI, pair shadcn/ui primitives with custom Tailwind tokens, gradients, and a restrained color system rather than relying on default component styling.