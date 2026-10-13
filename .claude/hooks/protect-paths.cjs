// PreToolUse hook for Write, Edit and NotebookEdit.
// AGENTS.md rule 5: site-v1/ is generated build output, never edited by hand.
// AGENTS.md rule 6: ../../taxi-business/ is read-only from here.
// Reads the tool input as JSON on stdin, denies writes to those paths.

const path = require("path");

const ROOT = path.resolve(__dirname, "..", "..");

const SITE_V1_REASON =
  "AGENTS.md rule 5 (one live page, one design): site-v1/ is generated build output. Edit design/site-source/ and rebuild with node design/site-source/build.js.";
const TAXI_REASON =
  "AGENTS.md rule 6: ../../taxi-business/ is read-only from here. Never edit the taxi business from this folder.";

function norm(p) {
  return p.split("\\").join("/").toLowerCase();
}

function deny(reason) {
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: "PreToolUse",
        permissionDecision: "deny",
        permissionDecisionReason: reason,
      },
    })
  );
  process.exit(0);
}

let raw = "";
process.stdin.setEncoding("utf8");
process.stdin.on("data", (c) => (raw += c));
process.stdin.on("end", () => {
  let input = {};
  try {
    input = JSON.parse(raw || "{}");
  } catch (e) {
    process.exit(0);
  }
  const ti = input.tool_input || {};
  const given = String(ti.file_path || ti.notebook_path || "");
  if (!given) process.exit(0);

  const abs = norm(path.resolve(ROOT, given));

  // The substring test used to catch this folder's own research/01-taxi-business-lessons.md too. Fixed 2026-09-20.
  // The folder sits in Desktop/flybys/ since 2026-10-13 (the HQ's move, Fady's pick), so the taxi folder is two levels up.
  const taxi = norm(path.resolve(ROOT, "..", "..", "taxi-business")).replace(/\/+$/, "");
  if (abs === taxi || abs.startsWith(taxi + "/")) deny(TAXI_REASON);

  const root = norm(ROOT).replace(/\/+$/, "");
  if (abs.startsWith(root + "/site-v1/")) deny(SITE_V1_REASON);

  process.exit(0);
});
