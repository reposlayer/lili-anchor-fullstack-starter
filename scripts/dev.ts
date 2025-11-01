import { spawn } from "node:child_process";
import { join } from "node:path";

const root = process.cwd();
const anchorDir = join(root, "anchor");

const validator = spawn("solana-test-validator", [], { stdio: "inherit" });

const anchorBuild = spawn("pnpm", ["--filter", "anchor", "run", "build"], { stdio: "inherit" });

anchorBuild.on("exit", (code) => {
  if (code !== 0) {
    validator.kill();
    process.exit(code ?? 1);
  }

  const sdk = spawn("pnpm", ["--filter", "@lili/sdk", "run", "build"], { stdio: "inherit" });

  sdk.on("exit", (sdkCode) => {
    if (sdkCode !== 0) {
      validator.kill();
      process.exit(sdkCode ?? 1);
    }

    const web = spawn("pnpm", ["--filter", "web", "run", "dev"], {
      stdio: "inherit",
      env: { ...process.env, ANCHOR_WORKSPACE: anchorDir }
    });

    web.on("exit", () => validator.kill());
  });
});
