import { spawn } from "node:child_process";
import path from "node:path";

const root = process.cwd();
const nextBin = path.join(root, "node_modules", "next", "dist", "bin", "next");
const worker = path.join(root, "scripts", "content-worker.mjs");
const requestedMode = process.argv[2];
const nextMode = requestedMode === "dev" ? "dev" : "start";
const portArguments = requestedMode === "dev" || requestedMode === "start"
  ? process.argv.slice(3)
  : process.argv.slice(2);

const web = spawn(process.execPath, [nextBin, nextMode, ...portArguments], { cwd: root, stdio: "inherit" });
const content = spawn(process.execPath, [worker], { cwd: root, stdio: "inherit" });

function shutdown(signal) {
  web.kill(signal);
  content.kill(signal);
}

process.on("SIGINT", () => shutdown("SIGINT"));
process.on("SIGTERM", () => shutdown("SIGTERM"));
web.on("exit", (code) => { content.kill("SIGTERM"); process.exitCode = code ?? 0; });
content.on("exit", (code) => { if (code) console.error(`Content worker stopped with code ${code}`); });
