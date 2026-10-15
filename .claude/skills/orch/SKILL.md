---
name: orch
description: Start the day on this venture. Use when Fady types /orch, says "run today", "where are we", asks for the morning overview or the day's plan. Reads the small state files, checks them against each other, gives the overview, proposes the day, then waits for his go. When today's handoff shows the day already started, it resumes it by itself (the orch-mid steps). eof closes the day.
---

# /orch: the day opener

**Procedure only. This skill owns HOW, never WHAT.** Facts, dates, gates and state live in the owner
files named in `AGENTS.md`. Read them fresh, never recall them. `AGENTS.md` binds over this file.

*Kit template (`../../fady.be/kit/`), version 2026-10-15. This copy changes the file names and adds this
folder's own lines: the fact-sync in step 3, the live surfaces in step 4, the Chrome note in step 6, the
agents and browser lines below. The shared rules every folder follows (backup door, browser, money,
calendar, the habits) load by themselves from `~/.claude/rules/fady-system.md`; this skill does not
repeat them.*

## Run it, in this order

0. **Name the session first:** call `set_session_title` (session "self") with `Pro Débouchage | orch | <today>`
   before anything else, so the sidebar and every Chrome tab group this session creates carry the
   venture's name. Rename the same way when the scope changes. Then tell Fady in one line which model
   this session runs on (the driver rule: Fable when he sits in the chat, Opus when Claude runs alone)
   and which effort to pick in the app's menu (a check-up: low or medium; a build day: high, one level lower on Opus;
   `../../fady.be/kit/model-and-effort-guide.md`).
1. **Read, in full, the small files:** `STATE.md`, `NOW.md`, `HANDOFF.md`, and the last block of
   `LOG.md`; `DECISIONS.md` only its last 10 lines; and the lines of `FOR-HQ.md` newer than the last
   `LOG.md` entry (the HQ's answers and instructions land there, and nobody else brings them; an
   instruction found there leads the plan of step 6; only one that blocks today's work, such as a wrong
   deploy target before a deploy, is done before the overview, and a carve waits for the close). `AGENTS.md` is not read here: `CLAUDE.md` imports it
   at launch and the app re-reads it after a compaction. The files are held to byte budgets by rule, so
   reading them whole is cheap. Open a playbook file only when an open item points into it. Never open
   `research/` unless the day's work needs a source.
2. **A day already started resumes, with no second command.** If `HANDOFF.md` is from today and says
   the day already started, or it names a night brief to run (whatever its date), do not run the steps
   below: follow `.claude/skills/orch-mid/SKILL.md` from its step 1 and say "Resuming today's work" in
   one line. Fady types `/orch` either way.
3. **One-line sweep.** Do the files agree with each other (dates, what is open, what the handoff says
   was done, what exists on disk)? Clean: say "Sweep clean." and nothing more. Not clean: fix what the
   files themselves settle (the newer dated line wins) and say so in one line; put a contradiction to
   Fady only when it touches money, the brand, a live surface or his words.
   - **On Monday, and after any session that changed an account, a price, a name or a live surface,**
     fan out the READ-ONLY fact-sync agent of `AGENTS.md` section 7 alongside this sweep, in the same
     batch as the weekly ads read. It reports with file and line and never fixes: fold its findings
     into the plan at step 6, then fix them in the session or file them in `NOW.md`. It never holds up
     the overview.
4. **Check the live surfaces** (read-only, no approval needed). Nothing is changed on any surface during
   the check.
   - The live site answers: its address is in `STATE.md`; one curl over its pages, no browser.
   - Google Ads keeps the WEEKLY read of `playbook/ads-program.md` section 6 (Monday): this step adds no
     daily Ads read. On the day of the weekly read, a spend above the cap, a stopped campaign or a
     billing problem is the first line of the overview.
5. **The overview.** ONE numbered list, 1..N continuous, grouped under three bold headers:
   **CLAUDE'S** (a session or agent can act on it now) · **A HUMAN'S** (waiting on Fady, on Roro or on
   someone else) · **A CLOCK'S** (deliberately waiting on a date or a verdict). One or two plain
   sentences per item. Fady answers by number.
6. **The proposed plan, with reasons.** Which agents, in what order, what is time-sensitive, what
   deliberately waits. Describe each proposed agent's job in plain English (what it does, what Fady
   gets back, and whether it uses Chrome and for about how long: Fady runs other folders' sessions on
   the same Chrome connection, so "no Chrome" is said in the widget and again in the line that
   announces each launch), placed right after any question that needs his decision, so ONE reply from
   him gives the go. Never a bare menu. Then WAIT for Fady's go.
7. **Decisions that are Fady's go in an AskUserQuestion widget**, essentials inside the widget, 2 to 4
   options, recommended option first. He sees the widget, not the prose: the app folds text written
   between tool calls, so steps he must follow or a list he must read come as plain text at the END
   of the turn, with no tool call after them.

## While the day runs

- **Models** (`../../fady.be/kit/model-and-effort-guide.md`). In this folder the session never executes
  a task itself (`AGENTS.md` section 8): one agent unless the job splits into parts that share no state.
  Name the model and the effort in every Agent call: Haiku at low for mechanical
  reads and checks; Sonnet at medium for drafts, code and browser reading; Opus at high for research or a
  judge whose result shapes a decision of Fady's, and wherever a mistake costs money or the brand (legal
  text, a live surface, image judging, a long build, an audit). Fable drives sessions and never works as
  an agent. Each brief says what done looks like and the worker stops there; a cap on time or agents only
  for an unattended run. Each worker returns evidence (paths, lines, the result re-read); an unsure worker
  is retried one tier up. Before a fleet or an unattended run, read `../../fady.be/kit/field-guide.md`.
- Read-only agents may run in parallel; agents that edit files run one at a time in this folder. After
  a file agent closes, open its files and confirm the claim matches the disk.
- Browser work starts with the machine-wide lock: `node .claude/scripts/browser-lock.cjs acquire "Pro Débouchage"`
  (stop if it says HELD); the rest is in the shared rules.
- Do the work by default, browser included, through agents (`AGENTS.md` section 8; the shared rules:
  `fady-system.md`). Passwords, access
  grants and payments are planned as Fady's own clicks; money and a mail to a customer or to Roro wait
  for his Go click on a widget that names the action and the amount. Anything else that touches a live
  client surface comes to Fady first (`AGENTS.md` section 8).
- When the day needs a second session (a night run, a side task in another folder), propose it with
  `start_session` and a complete brief after your own close (started at once only when he asked for it);
  never hand him a prompt to paste.
- Log in the same session; nothing stays only in chat (`/eof` step 2: done, filed with an owner, or
  dropped with a reason). Re-read the live state files right
  before the first write of a stretch of work: the folder may have moved under you.
- Keep `HANDOFF.md` current at each big step, so a fresh session can always resume with `/orch`.
  A long context alone is no reason to stop: the app compacts it by itself.
- **`SCORE.md`** (active ventures only): at the first close of the week, append the week's line in the
  shape of `../../fady.be/kit/templates/SCORE.md`.
- **Close the day yourself when it is done.** When everything planned is done and nothing in this
  session waits on Fady, run `/eof` without being asked.

## Never

- Never propose what a file marks as decided against, dropped or gated, without naming the gate.
- Never repeat a fact from memory that a file owns: open the owner and read it.
- Nothing edited outside this folder; `../../taxi-business/` least of all (the `protect-paths.cjs` hook).
- Hooks block git and em dashes in files; a blocked action is parked in `NOW.md` and never worked around.
- Never change the session's own permission mode, and never edit a permission rule or a hook to get
  past a block. A parked action is told to Fady with its reason and retried only after he names it in
  his own words.
