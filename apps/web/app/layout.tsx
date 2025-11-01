import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import { SolanaProviders } from "../components/SolanaProviders";

export const metadata: Metadata = {
  title: "Anchor Fullstack Starter",
  description: "Anchor program + Next.js UI wired through generated SDK"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <SolanaProviders>{children}</SolanaProviders>
      </body>
    </html>
  );
}
