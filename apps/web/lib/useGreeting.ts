"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection, PublicKey } from "@solana/web3.js";
import { Buffer } from "buffer";

const PROGRAM_ID = new PublicKey(process.env.NEXT_PUBLIC_ANCHOR_PROGRAM_ID ?? "11111111111111111111111111111111");
const GREETING_SEED = "greeting";
const DEFAULT_RPC = process.env.NEXT_PUBLIC_SOLANA_RPC ?? "https://api.devnet.solana.com";

export type GreetingHookState = {
  message: string;
  status: string | null;
  refreshGreeting: () => Promise<void>;
  initializeGreeting: () => Promise<void>;
  updateGreeting: (nextMessage: string) => Promise<void>;
  programId: string;
};

export function useGreeting(): GreetingHookState {
  const wallet = useWallet();
  const [message, setMessage] = useState("Hello Anchor");
  const [status, setStatus] = useState<string | null>(null);

  const connection = useMemo(() => new Connection(DEFAULT_RPC, "confirmed"), []);

  const greetingAccount = useMemo(() => {
    if (!wallet.publicKey) {
      return null;
    }

    return PublicKey.findProgramAddressSync(
      [Buffer.from(GREETING_SEED), wallet.publicKey.toBuffer()],
      PROGRAM_ID
    )[0];
  }, [wallet.publicKey]);

  const refreshGreeting = useCallback(async () => {
    if (!greetingAccount) {
      setStatus("No greeting account yet – initialize to get started");
      return;
    }

    try {
      const accountInfo = await connection.getAccountInfo(greetingAccount);

      if (!accountInfo) {
        setStatus("Greeting account not found on chain");
        return;
      }

      // Anchor serializes strings with a length prefix followed by UTF-8 bytes.
      const decoded = new TextDecoder().decode(accountInfo.data.slice(8)).trim();
      setMessage(decoded.length > 0 ? decoded : "Hello Anchor");
      setStatus("Fetched on-chain greeting");
    } catch (error: unknown) {
      setStatus(error instanceof Error ? error.message : String(error));
    }
  }, [connection, greetingAccount]);

  const initializeGreeting = useCallback(async () => {
    if (!wallet.connected) {
      setStatus("Connect a wallet to initialize the greeting");
      return;
    }

    // Placeholder flow – wire up your Anchor RPC call here.
    setStatus("Pretending to send initialize instruction...");
    await new Promise((resolve) => setTimeout(resolve, 600));
    setStatus("Greeting account ready for updates");
    await refreshGreeting();
  }, [wallet.connected, refreshGreeting]);

  const updateGreeting = useCallback(
    async (nextMessage: string) => {
      if (!wallet.connected) {
        setStatus("Connect a wallet first");
        return;
      }

      setStatus("Submitting transaction...");
      await new Promise((resolve) => setTimeout(resolve, 400));
      setMessage(nextMessage);
      setStatus("Greeting updated – wire this to your Anchor method call");
    },
    [wallet.connected]
  );

  useEffect(() => {
    if (wallet.connected) {
      void refreshGreeting();
    }
  }, [wallet.connected, refreshGreeting]);

  return {
    message,
    status,
    refreshGreeting,
    initializeGreeting,
    updateGreeting,
    programId: PROGRAM_ID.toBase58()
  };
}
