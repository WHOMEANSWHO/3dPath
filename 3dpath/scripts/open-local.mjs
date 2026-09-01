import { existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const html = resolve(root, "3dPath.html");
const script = resolve(root, "scripts", "serve-local.ps1");

if (!existsSync(html) && !existsSync(resolve(root, "dist", "index.html"))) {
  const built = spawnSync("npm", ["run", "build"], { cwd: root, stdio: "inherit", shell: true });
  if (built.status !== 0) process.exit(built.status ?? 1);
}

const ps = spawnSync(
  "powershell",
  ["-NoProfile", "-ExecutionPolicy", "Bypass", "-File", script],
  { cwd: root, stdio: "inherit" },
);
process.exit(ps.status ?? 0);
