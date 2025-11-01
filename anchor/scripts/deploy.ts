import "dotenv/config";
import { spawnSync } from "node:child_process";

const cluster = process.argv[2] ?? "local";
const url = cluster === "local" ? "http://127.0.0.1:8899" : `https://api.${cluster}.solana.com`;

const result = spawnSync(
  "solana",
  [
    "program",
    "deploy",
    "target/deploy/lili_anchor_program.so",
    "--url",
    url,
    "--keypair",
    process.env.ANCHOR_WALLET ?? "~/.config/solana/id.json"
  ],
  { stdio: "inherit" }
);

if (result.status !== 0) {
  process.exit(result.status ?? 1);
}
