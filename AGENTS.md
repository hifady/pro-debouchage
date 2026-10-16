# AGENTS.md

*Pro Débouchage. The shared rules (~/.claude/rules/fady-system.md) and Fady's preferences load in every session; this file holds only what is this folder's own. History: `DECISIONS.md`, `_archive/AGENTS-until-2026-10-15.md`.*

## 1. The project

Pro Débouchage is a 24/7 drain-unblocking, sewer cleaning, camera inspection, septic emptying and flooded-cellar pumping service based in Vilvoorde, serving Brussels and the towns 40 to 60 km around it, in French and Dutch. Owned by Roro (Fady's cousin), the work done by Afrim, it is a client of Fady's agency (fady.be, hi@fady.be) for ONE converting landing page plus Google Ads that make the phone ring. A single client with its own site: nothing here is reused across clients.

## 2. The people

- **Roro** owner. French and English fluent, Arabic native. Fady and Roro talk in English or Arabic. Questions by WhatsApp, batched.
- **Afrim** the technician in the van. French working level, German better, English basic. Gets his brief from Roro.
- **Roro's wife** administration. French fluent, good Dutch.
- **Roro's accountant** exists; company facts come from the public register first, from Roro second.
- **Fady** the agency: owner of the plan, the taste, the clicks that need a human (payments, credentials, account grants). Claude is planner, executor, ads specialist, landing-page designer and developer, and treats this as its own project.

## 3. The folder map

- `STATE.md` what is true today, 14 KB. `NOW.md` what is open, one line each, tagged `[Fady]` / `[Claude]` / `[Roro]` / `[clock: date]`, 8 KB; a closed line moves to `LOG.md` the same session. `HANDOFF.md` the note for the next session, 4 KB. Budgets are bytes, never lines; over budget is trimmed before anything is added.
- `DECISIONS.md` append-only, max 5 lines per entry. `LOG.md` append-only, one entry per session under about 2,500 bytes; changes, not activity.
- `FOR-FADY.md` all that waits on Fady (`/decide`). `FOR-HQ.md` lines to the HQ and its answers. `SCORE.md` the weekly line.
- `playbook/` the owners of section 4, read on demand. `research/` dated agent reports, read-only, listed in `research/INDEX.md`, never the owner of a fact.
- `assets/raw/` what Roro sent, untouched; `assets/prepared/` what we made from it.
- `design/site-source/` THE page source (the one locked design); its README has the build and deploy commands. `site-v1/` is the output of `node design/site-source/build.js`, never edited by hand.
- `to-delete/` the waiting room; the monthly pass empties what waited 30 days, its list in the report first (the shared rules).
- Hooks: `deny-git.cjs`, `no-emdash.cjs`, and this folder's own `protect-paths.cjs`, which refuses writes into `site-v1/` (rule 5) and `../../taxi-business/` (rule 6).

## 4. Where facts live (trust the file, never memory)

All in `playbook/`: `business-brief.md` client facts (people, services, zone, equipment, what Roro said). `accounts.md` accounts, ownership, access, domains, hosting. `launch-plan.md` the launch plan and its gates. `landing-page.md` the page: structure, headline, copy decisions, legal musts. `ads-program.md` ads: structure, keywords, routine, checkpoints, what is measured. `invoicing-flow.md` what Roro sends Steph per job, invoice and credit-note rules, Peppol for VAT-registered business customers. `jobs-ledger.md` every call and job Roro reports, the only base for a cost per job, no names, numbers or streets. `separation.md` the separation of clients and accounts, and custody and control (who manages, who owns on record, where the second factors live). `site-companion.md` the page section by section with answers to Roro's likely questions, uncapped.
Prices the agency charges Roro: `DECISIONS.md` (no offer file until there is an offer). Prices the customer sees (the From grid): `design/site-source/copy-fr.js` and nl/en.

## 5. The rules that never bend

1. **Never fake anything.** No fake reviews, no fake counters, no unproven claims ("20 years", "1M users", "97%") in any copy. We claim only what Roro confirms and what we can show.
2. **The client owns what matters and is never locked in:** his domain, his Google account, his Business Profile, his Ads account and its billing, his reviews. The agency is a manager on them, never the owner. A reply to a negative Google review goes up under his business name only after Fady's pick and Roro's own yes.
3. **No ad-ROI promises** to Roro before real numbers exist.
4. **The Business Profile is a gate:** no address or name goes onto Google before the address question (section 1 of `playbook/launch-plan.md`) is settled.
5. **One live page, one design.** Changes are made in `design/site-source/`, rebuilt and redeployed; nothing is edited on the live host by hand.
6. **`../../taxi-business/` is read-only from here.** We learn from it, never change it, never reuse its accounts (`playbook/separation.md`).

## 6. Writing rules

- **No em dashes**, ever, in anything new: chat, files, copy, scripts, WhatsApp drafts.
- **Customer-facing copy is French first and Dutch second, simple words, short sentences**, no marketing fog, no unproven claims. Both languages ship together.
- **Copy is written to convert, never merely translated:** the page's voice per language (FR spoken "on", everyday Flemish, EN with contractions), the customer in their situation, selling the call; a word-for-word translation is a bug.
- **Anything for Roro is simple English**, WhatsApp length, one question per line.
- **Long numbers digit by digit** in anything read aloud. Prices in euros, VAT stated.

## 7. This folder's own working rules

- Shell commands stay under about 8,000 characters.
- A brief never tells a file agent to record an action still in flight. A register read (KBO, VIES) that Roro will be told about goes to Sonnet or is re-read by the session.
- Fady drives sessions from his phone and the cloud too: a moved state file is merged, never overwritten. Never Cowork and Claude Code here at the same time.
- State and playbook files are rewritten in place, with no dated correction notes.
- No password, recovery code, API token or card number in any file (`playbook/accounts.md` says WHICH account and WHO owns it, never HOW to get in). No customer personal data beyond what the page shows. No identity document, not even redacted or briefly: work on it outside the folder.
- After any edit to the page source, rebuild and check the result, styles included. Pick images by looking, never by filename. A changed image ships under a new filename (the Cloudflare edge keeps old bytes up to 24 hours).
- A design round is done only when deployed to the preview and verified there.
- **The fact-sync audit**, weekly (Monday `/orch`) and after any change to an account, a price, a name or a live surface: one READ-ONLY agent checks every `playbook/` file and the READMEs of `design/site-source/`, `assets/prepared/invoice/`, `design/business-card/` against `STATE.md`, `NOW.md`, `DECISIONS.md` and the site source, with file and line. The session fixes or files in `NOW.md`.

## 8. How the work runs

- Fady never logs anything. What happens is filed in the same session (`LOG.md`, `NOW.md`, `DECISIONS.md`, `STATE.md`, `playbook/accounts.md`); nothing waits in chat for "later"; a session's last reply names what was logged and where, or "Nothing to log this session."
- The session plans, briefs agents, verifies and files. It does a one-line task itself, and what only it can do (a widget pick, a permission grant); browser work, builds and bigger edits go to agents.
- Fady first: money and mail to a customer or Roro (his Go click on a widget naming the action and the amount), passwords, account-level agreements, anything that touches a live client surface. When an Ads setting may move: `ads-program.md` section 6; the caps: `STATE.md` and the ADS line of `NOW.md`, the open-items file.
- The goal: a business mostly run by agents, Roro's setup dead simple. Say in one line when a task could be automated or a rule improved, and when an idea is Claude's own.

## 9. Backup and git, browser work: this folder's own lines

Backup: the private GitHub repo `hifady/pro-debouchage`.
- Lock: `node .claude/scripts/browser-lock.cjs acquire "Pro Débouchage"`. A stale lock is taken only from a finished, failed or silent agent.
- Chrome (the fallback): `Profile 4` = Pro Debouchage (info@prodebouchage24.be, the Business Profile and the payments centre), `Profile 6` = fady.be (hi@fady.be, Ads admin).
- Two browser-agent failures in a row, any step: stop spawning, say what state that leaves, give Fady the click or move the item.
- One job per browser brief, the money-stopping change first; after a dead agent, the next one re-verifies the account.
- Google's identity check can fire at any Save on the Ads account (it fired on new ad groups and ads; plain edits did not so far): Fady's "ready" before any agent that saves there, with one question, at the desk or out. At the desk he clicks Confirm himself. Out, the agent clicks Confirm or Continue once, reads the number and sends it by SendMessage to "main". The session runs that agent in the background, so it tells him at once in chat and by PushNotification. The agent re-reads the page every 20 seconds for up to 10 minutes and repeats the lock acquire every 10 minutes while it waits. On "Try again" it clicks nothing more, leaves the tab open and reports. After it clears: reload, check the object exists, then Save again. It can fire twice, so he stays reachable until the agent reports (`ads-program.md` section 2).
- A live-account brief names who decided, when, through what (quoted) and the `DECISIONS.md` entry, never "approved". An approval is never relayed to a running agent mid-task: a fresh agent gets the better brief.
- google.be and pagespeed.web.dev refuse the pane: Ads Ad Preview and Diagnosis and PageSpeed run in Chrome.
