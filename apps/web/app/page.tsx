"use client";

import { ChangeEvent, useState } from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useGreeting } from "../lib/useGreeting";

export default function Home() {
  const [nextMessage, setNextMessage] = useState("GM Lili");
  const { message, status, initializeGreeting, updateGreeting } = useGreeting();

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col gap-10 px-6 py-12">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-sm uppercase tracking-[0.4em] text-brand">Anchor + Next.js</p>
          <h1 className="text-4xl font-semibold text-white">Fullstack dApp Scaffold</h1>
          <p className="mt-2 max-w-xl text-slate-300">
            Generated TypeScript SDK, Anchor workspace, and Next.js App Router UI in one repo. Update
            the greeting account and watch state sync across the stack.
          </p>
        </div>
        <WalletMultiButton className="w-full rounded bg-brand px-4 py-2 text-sm font-medium text-slate-950 shadow transition hover:bg-brand-dark sm:w-auto" />
      </header>

      <section className="grid gap-6 rounded-xl border border-white/10 bg-white/5 p-6">
        <div className="space-y-2">
          <p className="text-sm text-slate-400">Current greeting</p>
          <p className="text-2xl font-semibold text-white">{message}</p>
        </div>

        <div className="grid gap-4 sm:grid-cols-[2fr,auto]">
          <input
            className="rounded border border-white/10 bg-black/40 px-3 py-2 text-sm text-white"
            value={nextMessage}
            onChange={(event: ChangeEvent<HTMLInputElement>) => setNextMessage(event.target.value)}
          />
          <button
            className="rounded bg-brand px-4 py-2 text-sm font-semibold text-slate-950 shadow"
            onClick={() => {
              void updateGreeting(nextMessage).catch((error: unknown) => console.error(error));
            }}
          >
            Update greeting
          </button>
        </div>

        <button
          className="rounded border border-white/20 px-4 py-2 text-sm font-semibold text-white"
          onClick={() => {
            void initializeGreeting().catch((error: unknown) => console.error(error));
          }}
        >
          Initialize account
        </button>

        {status && <p className="text-xs text-slate-400">{status}</p>}
      </section>
    </main>
  );
}
