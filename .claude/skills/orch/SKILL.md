---
name: orch
description: Start the day on the Pro Débouchage project (Roro's drain-unblocking business). Use when Fady opens a session on this folder and says "orch", "pro-orch", "run today", "where are we", asks for the morning overview or the day's plan. It reads the small state files, checks them against each other, checks the live surfaces read-only, gives the CLAUDE'S / A HUMAN'S / A CLOCK'S overview and proposes the day, then waits. Use orch-mid to resume a day already started, and eof to close it.
---

# /orch (until 2026-09-04: /pro-orch)

**Procedure only. This skill owns HOW, never WHAT.** Facts, dates, gates and client state live in the
owner files named in `AGENTS.md` section 4. Read them fresh, never recall them. `AGENTS.md` binds over
this file. Renamed from `pro-orch` on 2026-09-04 (the HQ consistency pass) so every venture folder
answers to the same three words; the procedure is unchanged.
Kit version 2026-09-20 re-applied on 2026-09-20 (the HQ sweep): the `DECISIONS.md` tail in step 1,
the live-surface step 4, the overview headers, the Models bullet, the typed go for money, the last
"Never" line.

## Run it, in this order

0. **Name the session first:** call `set_session_title` (session "self") with
   `Pro Débouchage | orch | <today>` before anything else, so the sidebar entry and every Chrome tab
   group this session creates carry the project's name and never a bare "Orchestration" (Fady,
   2026-09-04). Rename again if the scope changes.
   Then one line on effort: which level this mode expects from the app's menu, per `../../fady.be/kit/model-and-effort-guide.md` (a check-up: low or medium; a build day: high, one level lower on Opus; max only when Fady asks), because a session cannot change its own effort (kit, 2026-09-15).
1. **Read, in full, the four small files:** `STATE.md`, `NOW.md`, `HANDOFF.md`, and the last entry of
   `LOG.md`; `DECISIONS.md` only its last 10 lines. They are held to byte budgets by rule (`STATE.md`
   14 KB, `NOW.md` 8 KB, `HANDOFF.md` 4 KB), so reading them whole is cheap. Then `FOR-HQ.md`, only the lines dated after the last `LOG.md` entry: the HQ answers there and may leave an instruction for the next session here (added 2026-09-24: an HQ line of 23 Sep asked this folder to take the kit's save-at-close door before anything else; nobody read it and the close asked Fady for a backup the door had replaced). Open a playbook file only when an open item points into it.
   Never open `research/` unless the day's work needs a source.
2. **One-line sweep.** Do the four files agree with each other (dates, what is open, what the handoff
   says was done)? Clean: say "Sweep clean." and nothing more. Not clean: stop, put the contradiction
   to Fady before anything else, and fix the file on his answer.
   - **On Monday, and after any session that changed an account, a price, a name or a live surface,
     fan out the FACT-SYNC audit alongside this sweep**, in the same batch as the weekly ads check.
     One READ-ONLY agent cross-checks every `playbook/` file, plus the three READMEs that carry
     facts (`design/site-source/`, `assets/prepared/invoice/`, `design/business-card/`; added
     2026-09-20), against `STATE.md`, `NOW.md`, `DECISIONS.md` and the live site source and reports
     contradictions with file and line (`AGENTS.md` section 7). It reports, it never fixes: fold its findings into the day's plan at
     step 6, then fix them in the session or file them in `NOW.md`. It is read-only and cheap, so it
     never holds up the overview. The sweep covers the live state files, this covers the playbook,
     which nothing else forces anyone to re-read.
3. **If the handoff says the day already started, stop here and run `/orch-mid` instead.**
4. **Check the live surfaces this venture has** (read-only, no approval needed): the live site
   answers (its address is in `STATE.md`), read from the Browser pane, no login. Google Ads keeps the
   WEEKLY rhythm of `playbook/ads-program.md` section 6: this step does not add a daily Ads read
   (Fady removed the daily glance himself on 2026-09-08, `DECISIONS.md`; corrected 2026-09-20, the
   sweep's apply agent had made it daily). On the day of the weekly read, a spend above the cap, a
   stopped campaign or a billing problem is the first line of the overview. Nothing is changed on
   any surface during the check.
5. **The overview.** ONE numbered list, 1..N continuous, grouped under three bold headers:
   **CLAUDE'S** (a session or agent can act on it now) · **A HUMAN'S** (waiting on Fady, on Roro or on
   someone else, Fady's visit to Roro included) · **A CLOCK'S** (deliberately waiting on a date or a
   verdict, for example Google's verification). One or two plain sentences per item. Fady answers by
   number.
6. **The proposed plan, with reasons.** Which agents, in what order, what is time-sensitive, what
   deliberately waits. Describe each proposed agent's job in plain English (what it does, what Fady
   gets back, and whether it uses Chrome and for about how long: Fady runs other projects' sessions
   on the same Chrome connection, so "no Chrome" is said in the widget and again in the line that
   announces each launch; added 2026-09-20 after he had to ask mid-run), placed right after any question that needs his decision, so ONE reply from him gives
   the go. Never a bare menu. Then WAIT for Fady's go.
7. **Decisions that are Fady's go in an AskUserQuestion widget**, essentials inside the widget, 2 to 4
   options, recommended option first. He sees the widget, not the prose.

## While the day runs
- **Models (Fady, 2026-09-15, reworded 2026-09-20 from Anthropic's guidance for the current models, tiers only since 2026-09-22; the versions, the prices and the table are `../../fady.be/kit/model-and-effort-guide.md`):** one agent unless the work truly splits. Every subagent gets the cheapest model that can do its job, named in the Agent call's `model` field by tier, never by version: Haiku for mechanical work (file scans, listings, byte checks, page reads, extraction), Sonnet for the middle (research with sources, first drafts, code, browser reading), Opus only where judgment carries money or the brand (legal text, the judge of an image against a photo, a review of a live surface, a long build, an audit), Fable never as a worker except to rescue a stuck job. Every brief names its acceptance criteria and a time limit, and every worker returns the evidence of what it did (paths, lines, the result re-read). A fresh, stronger reader checks only work that ships: money, the brand, a live surface, legal text. A worker that says it is unsure is retried one rung up. In this folder a register read (KBO, VIES) that Roro will be told about goes to Sonnet or is re-read by the session (`AGENTS.md` section 7).
- Fan out to subagents on the model the rule above names. Read-only agents may run in parallel; agents that edit
  files run ONE at a time. Before a file agent runs, note which files it will touch; after it closes,
  open those files and confirm the claim matches the disk.
- Do the work by default: anything without payment, credentials or a decision that is truly Fady's is
  done, browser included. Passwords, access grants and payments are planned as Fady's own clicks
  (agent inventories, Fady clicks, agent verifies read-only). A money move or a mail to a customer
  follows `AGENTS.md` section 15 "Permissions and money": Fady TYPES the go, naming the action and the
  amount. Anything else that touches a live client surface still comes to Fady first (`AGENTS.md`
  section 10).
- Browser work follows `AGENTS.md` section 14: take the machine-wide lock first
  (`node .claude/scripts/browser-lock.cjs acquire "Pro Débouchage"`, and stop if it says HELD: another
  project is driving Chrome), open the right Chrome profile by command
  (`node .claude/scripts/chrome.cjs open "Pro Debouchage"` for info@, `"fady.be"` for hi@), confirm
  the account from the page, close your own tabs, release the lock, verify the result and never the
  submission. A sub-agent that drives Chrome gets the acquire and release lines in its brief.
- Same-session logging (`AGENTS.md` section 8). Close it or file it (section 9).
- Keep `HANDOFF.md` current at each big step, so a fresh session can always resume with `/orch-mid`.
  A long context alone is no reason to stop: the app compacts it by itself. A new task that has nothing
  to do with the day's work starts better in a fresh session (kit, 2026-09-22).
- **Close the day yourself when it is done (Fady, 2026-09-22).** When everything planned for the day is done and nothing in this session waits on Fady, run the steps of `/eof` without being asked. Otherwise close on his word. Every close ends with ONE paragraph for Fady alone, three lines at most: what only he must do or decide, or "Nothing for you." He skims everything above it.

## Never
- No em dashes in anything new. No git, no `save-to-cloud.cmd` by hand; the backup's one door is `/eof` step 8. Nothing edited in `../taxi-business/`.
- Never propose what a file marks as decided against, dropped or gated, without naming the gate.
- Never repeat a fact from memory that a file owns: open the owner and read it.
- Never change the session's own permission mode, and never edit a permission rule or a hook to get
  past a block. A blocked action is parked in `NOW.md` with the reason and told to Fady; it is retried only after he names the action in his own words, never forced through another route.
