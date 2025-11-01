# Lili Anchor Fullstack Starter
    ██╗     ██╗██╗     ██╗     ██████╗██╗     ██╗
    ██║     ██║██║     ██║    ██╔════╝██║     ██║
    ██║     ██║██║     ██║    ██║     ██║     ██║
    ██║     ██║██║     ██║    ██║     ██║     ██║
    ███████╗██║███████╗██║    ╚██████╗███████╗██║
    ╚══════╝╚═╝╚══════╝╚═╝     ╚═════╝╚══════╝╚═╝
Monorepo that pairs an Anchor 0.29 program with a Next.js 14 dApp. Ship a full Solana feature in one repo using pnpm workspaces, generated SDK bindings, and a turnkey dev environment.

## Features

- Anchor workspace with greeting program and TypeScript tests
- Next.js App Router UI with wallet adapter and TanStack Query
- Shared SDK package generated from Anchor IDL
- Dev script that spins up a local validator, builds the program, and launches the web app
- Docker Compose recipe for reproducible localnet
- GitHub Actions workflow for lint → build → test

## Getting Started

```bash
pnpm install
pnpm run dev
```

The dev script compiles the Anchor program, runs `solana-test-validator`, generates the TypeScript client, and starts the Next.js dev server on `http://localhost:3000`.

### Deploying to Devnet

```bash
pnpm run build:program
pnpm run deploy:devnet
pnpm --filter web run build
```

Set environment variables via `.env` files referenced in each package (`anchor/.env`, `apps/web/.env.local`).

## Workspaces

- `anchor/` – Anchor workspace
- `apps/web/` – Next.js 14 app router frontend
- `packages/sdk/` – Generated client that wraps the Anchor IDL

## Useful Commands

- `pnpm run dev` – start validator + Anchor watcher + Next.js
- `pnpm run lint` – workspace lint (ESLint + TypeScript)
- `pnpm test` – Anchor + Playwright smoke tests

## Requirements

- Node.js 18+
- pnpm 8+
- Solana CLI 1.17+
- Anchor 0.29+

Happy building!
