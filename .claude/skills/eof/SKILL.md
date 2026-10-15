---
name: eof
description: Close the day on this venture. Use when Fady says "eof", "eod", "close the day", "we are done for today", or leaves mid-day and wants a clean close. Files everything, rewrites HANDOFF.md, saves the folder to GitHub through save-at-close.cjs when its checks pass, and ends with the closing block. Use orch to start a day and orch-mid to resume one.
---

# /eof: the day close

**Procedure only. This skill owns HOW, never WHAT.** `AGENTS.md` binds over this file.

*Kit template (`../../fady.be/kit/`), version 2026-10-15. Only the file names in step 2, the budgets in
step 3 and the fact-sync list in step 4 are this folder's own. The shared rules
(`~/.claude/rules/fady-system.md`) hold the save door, the Fady block and the habits; this skill applies
them.*

## Run it, in this order

1. **The plain-English day summary**, in bullet points: what changed today, what it means for him, where
   things stand. Write it in the closing block of step 8, not here: text written before the tool calls of
   steps 2 to 7 may reach Fady only as a short summary. An eof can happen at any hour, a morning close is
   normal: use the actual time of day, never "tonight" from habit.
2. **File everything.** Walk the day's chat, and every report the day's agents wrote (their proposed
   lines, owed items and rule ideas, each ticked as filed, dropped with a reason, or carried), for
   anything loggable that is not yet in a file: done work
   to `LOG.md` (one dated block for the session, maximum 5 lines and under about 2,500 bytes, money
   always mentioned), open work to `NOW.md` (owner-tagged, closed lines removed and summarised in the
   LOG block), decisions to `DECISIONS.md` (append only, with the reason), changed truths to `STATE.md`
   (rewritten in place), the week's `SCORE.md` line if this is the week's first close and it is not
   written yet, account and access changes to `playbook/accounts.md`, every call and job Roro reported
   to `playbook/jobs-ledger.md`. Nothing stays only in chat: it is done, filed with an owner, or dropped
   with a reason.
3. **Size check, in bytes.** Run `wc -c STATE.md NOW.md HANDOFF.md LOG.md DECISIONS.md FOR-HQ.md` and
   compare the result with the budgets in `AGENTS.md`: `STATE.md` 14 KB, `NOW.md` 8 KB, `HANDOFF.md`
   4 KB. Over budget: trim in this session before writing anything else, and note what moved where.
   Lines are not the measure: one line here can be 350 characters. **The carve** (the
   shared rules): any `LOG.md`, `DECISIONS.md` or `FOR-HQ.md` over 150 KB, in a folder with the cloud
   backup, is carved now by `node C:/Users/fadya/Desktop/fady.be/kit/scripts/carve-log.cjs <file>`,
   alone in the command: the oldest whole blocks move byte for byte into `_archive/logs/` until the file
   is under 100 KB, with one pointer line at its top. Never by hand (lines run past 12,000 characters).
   First call `list_sessions`: when a row has this folder as its `cwd` and `isRunning: true`, the carve
   waits for the next close. A missing script or an error is one line in `FOR-HQ.md`, and the close
   goes on. The one-line result is said in the closing block of step 8.
4. **Fact-sync if today touched a fact.** If the session changed an account, a price, a name or
   anything on a live surface, do not wait for Monday: fan out the READ-ONLY fact-sync agent of
   `AGENTS.md` section 7 now, to cross-check every `playbook/` file and the READMEs of
   `design/site-source/`, `assets/prepared/invoice/` and `design/business-card/` against `STATE.md`,
   `NOW.md`, `DECISIONS.md` and the live site source. Fix what it reports in this session or file it in
   `NOW.md`, never leave it in chat. Its one-line result, or "no fact changed today", is said in the
   closing block of step 8.
5. **Stop the background agents.** Check for running agents and tasks. A seat that edits files is never
   stopped mid-work: wait for its report and verify it on disk first. A fleet this session launched to
   run through the night is not stopped either: it is named in the handoff with the file its filer will
   write, and the closing block says which seats are still out. Everything else is stopped and confirmed
   closed BEFORE the handoff is written, so nothing lingers in Fady's panel after the close.
6. **Rewrite `HANDOFF.md`** for the next session: what today did, what is next, what is waiting on
   whom; the next session starts with `/orch`, which resumes by itself when the handoff is from today.
   Under 4 KB. When `list_sessions` shows another session running here, re-read `HANDOFF.md` and merge
   into it, never write over its part. A rule improvement proposed today goes into the handoff the moment it is
   proposed, so it survives a fresh session. Then rewrite `FOR-FADY.md` (the kit template): what needs
   his eye, what waits for his decision, his answers; straight facts, one page, at most 8,000 bytes,
   nothing of his listed in a second place. He reads it through `/decide`.
7. **Improvements.** A lesson goes to the cheapest place that holds it: a script or hook first, then a
   line in the skill or playbook that hit it, the rulebook only for a mistake seen twice. Fix this
   folder's own playbooks now, with a line in `LOG.md`; a change to this folder's skills, `AGENTS.md` or
   `CLAUDE.md` goes as one dated line in `FOR-HQ.md` (the app refuses a session editing its own rules),
   never retried here. A playbook keeps only today's rule (the old wording and its date go to
   `DECISIONS.md`). Ask Fady only when a change alters what he does, sees or decides; hard rules enter
   `AGENTS.md` only on his yes, through the HQ. A problem in a kit file
   (`/orch`, `/orch-mid`, `/eof`, `/decide`, the shared rules `fady-system.md`) or an idea for every venture goes as one dated
   line in `FOR-HQ.md`; the HQ answers it there. A playbook's close bullet is capped: about 150 words,
   one sentence per lesson, a pointer to a kit file instead of a restatement (taxi 2026-10-09: nineteen
   bullets carved in one day and the playbook still over its cap); a playbook over its cap is carved in
   this session, never left for later.
8. **Rename, save, then the closing block.** First rename the session to `Pro Débouchage | closed | <today>`
   (`set_session_title`, session "self") and release the browser lock
   (`node .claude/scripts/browser-lock.cjs release "Pro Débouchage"` with this session's own string, when it or
   its agents took it, then `status`; a lock held by another string is left alone), so a closed session reads as closed in the sidebar
   and never blocks another project's Chrome work.
   Then **the save at the close**, after the last write of this close and never earlier. A folder with
   no cloud backup (mom-visit) skips it.
   - Call `list_sessions` (the app's session tool; it never lists this session itself). When any row has
     this folder as its `cwd` and `isRunning: true`, another session works here: skip the save, and the
     closing block says "not saved: another session works in this folder".
   - Otherwise run `node .claude/scripts/save-at-close.cjs` from this folder's root: exactly that command
     and nothing else in it (the one door the no-git hook names), in the foreground, with the longest shell
     timeout (600000 ms). It checks the folder itself (`kit/verify.cjs` in the HQ, the git lock, the remote),
     runs `save-to-cloud.cmd` only when all is clean, and answers in ONE line: `SAVED ...`, `UP TO DATE ...`
     or `NOT SAVED <reason>`. A missing script, an error or any other answer counts as NOT SAVED. Never run
     `save-to-cloud.cmd` or git another way, and never retry or work around a NOT SAVED.

   Then **the closing block**, always the last thing said, with no tool call after it (text written before
   a tool call may reach Fady only as a short summary): the day summary of step 1; the size line of step 3
   and the fact-sync line of step 4; one line "what was logged and where" (or "Nothing to log this
   session"); the save's one line as it came. Then the Fady block, as his preferences and the shared rules say: it starts with
   "Fady:", one short paragraph by default, a numbered list when there are orders, the texts he must
   paste in copy boxes under it, the save state as its last line (a NOT SAVED is an order: the
   double-click on `save-to-cloud.cmd` once no session writes here, with the reason; a save skipped for
   another running session says so and orders nothing; a folder with no cloud backup says so). Before it is written, it is reread:
   every step in it that a session can do safely with the tools in reach (a draft, an attachment, a file
   move, a download, a page in the right profile) is done now and reported, never handed to him; only
   sending, paying, signing, handing in and publishing stay his. His words of 2026-10-11: "Claude must
   try to simplify my life and get things done for me where safe." Every reply of the day ends with the
   block, not only the close.

## Never

- Hooks block git and em dashes in files; a blocked action is parked in `NOW.md` and never worked
  around. The backup's one door is step 8.
- Never rewrite `LOG.md` or `DECISIONS.md` history; corrections are dated notes.
- No money moves, no ad changes, no supplier orders, no customer mails from a close.
- Nothing edited in `../../taxi-business/`.
