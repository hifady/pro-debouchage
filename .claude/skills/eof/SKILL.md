---
name: eof
description: Close the day on the Pro Débouchage project. Use when Fady says "eof", "pro-eof", "close the day", "we are done for today", or leaves mid-day and wants a clean close. It gives the plain-English day summary, files everything that is not filed, rewrites HANDOFF.md, reports file sizes, applies rule improvements and saves the folder to GitHub through save-at-close.cjs when its checks pass. Use orch to start a day and orch-mid to resume one.
---

# /eof (until 2026-09-04: /pro-eof)

**Procedure only. This skill owns HOW, never WHAT.** `AGENTS.md` binds over this file, especially
sections 7 (byte budgets, rewrite in place), 8 (logging) and 9 (close it or file it). Renamed from
`pro-eof` on 2026-09-04 (the HQ consistency pass); the procedure is unchanged.

## Run it, in this order

1. **The plain-English day summary** to Fady: what changed today, what it means for him, where things
   stand. Short, scannable, IN BULLET POINTS (Fady 2026-09-01). Write it in the closing block of step 8, not here: text written before the tool calls of the steps in between may reach Fady only as a short summary. This is the session's job to give,
   never his to ask for. An eof can happen at any hour, morning included: never write "evening" or
   "tonight" from habit, use the actual time of day.
2. **File everything.** Walk the day's chat for anything loggable that is not yet in a file: done work
   to `LOG.md` (one entry for the session, max 5 lines and under about 2,500 bytes), open work to
   `NOW.md` (owner-tagged, closed lines removed and summarised in the LOG entry), decisions to
   `DECISIONS.md`, changed truths to `STATE.md`, account changes to `playbook/accounts.md`. Nothing
   stays only in chat.
3. **Size check, in bytes.** Run `wc -c STATE.md NOW.md HANDOFF.md LOG.md DECISIONS.md` and report the
   result against the budgets in `AGENTS.md` section 3: `STATE.md` 14 KB, `NOW.md` 8 KB, `HANDOFF.md`
   4 KB. `LOG.md` and `DECISIONS.md` have no file budget, report their size anyway so the growth stays
   visible. If a budget is passed, trim in this session before writing anything else, and say what
   moved where. Lines are not the measure: one line here can be 350 characters.
4. **Fact-sync if today touched a fact.** If the session changed an account, a price, a name or
   anything on a live surface, do not wait for Monday: fan out the READ-ONLY FACT-SYNC agent now
   (`AGENTS.md` section 7) to cross-check every `playbook/` file and the three READMEs that carry
   facts (site source, invoice, business card; added 2026-09-20) against `STATE.md`, `NOW.md`,
   `DECISIONS.md` and the live site source. Fix what it reports in this session or file it in
   `NOW.md`, never leave it in chat. If nothing of that kind changed, say so in one line and move on.
   (Added 2026-08-30 on Fady's yes.)
5. **Stop the background agents.** Check the session's background agents and tasks; stop any still
   running and confirm all are closed BEFORE the handoff is written, so nothing lingers as a running
   session in Fady's panel after the close. (Added 2026-08-24 on Fady's yes.)
6. **Rewrite `HANDOFF.md`** for the next session: what today did, what is next, what is waiting on
   whom, and whether the next session should start with `/orch` (a new day) or `/orch-mid`
   (same day, Fady is coming back). Budget 4 KB. Any rule improvement proposed today goes into the
   handoff the moment it is proposed, so it survives a fresh session. Then rewrite `FOR-FADY.md` (the kit template): what needs
   his eye, what waits for his decision, his answers; straight facts, one page, at most 8,000 bytes,
   nothing of his listed in a second place. He reads it through `/decide`.
7. **Improvements** to the rules or the skills: APPLY them directly, dated, and file them in `LOG.md`,
   when they only change how Claude and the files work internally. Put an improvement to Fady ONLY
   when it changes what HE does, sees or decides (rule changed 2026-09-01 on Fady's word; before that
   every improvement waited for his yes). A skill that misfired today is fixed today: correct the wording that misled, and add a new rule only if it would have helped most past sessions, not only today's. An improvement that would help every venture, a doubt about a shared rule, or a kit gap is APPENDED as one dated line to this folder's `FOR-HQ.md` (kit 2026-09-22, Fady's pick): the HQ reads every `FOR-HQ.md` on "check the projects" and at the pass and answers there. This session never edits the HQ files, and Fady never carries a note by hand.
8. **Rename, save, then the closing block** (the kit's step 8 of 2026-09-23, taken word for word on 2026-09-24 after a close had asked Fady for a double-click the door had already replaced). First rename the session to `Pro Débouchage | closed | <today>` (`set_session_title`, session "self") and make sure the browser lock is released (`node .claude/scripts/browser-lock.cjs status`), so a closed session reads as closed in the sidebar and never blocks another project's Chrome work.
   Then **the save at the close**, after the last write of this close and never earlier.
   - Call `list_sessions` (the app's session tool; it never lists this session itself). When any row has this folder as its `cwd` and `isRunning: true`, another session works here: skip the save, and the closing block says "not saved: another session works in this folder".
   - Otherwise run `node .claude/scripts/save-at-close.cjs` from this folder's root: exactly that command and nothing else in it (the one door the no-git hook names), in the foreground, with the longest shell timeout (600000 ms). It checks the folder itself (`kit/verify.cjs` in the HQ, the git lock, the remote), runs `save-to-cloud.cmd` only when all is clean, and answers in ONE line: `SAVED ...`, `UP TO DATE ...` or `NOT SAVED <reason>`. A missing script, an error or any other answer counts as NOT SAVED. Never run `save-to-cloud.cmd` or git another way, and never retry or work around a NOT SAVED.

   Then **the closing block**, always the last thing said, with no tool call after it (text written before a tool call may reach Fady only as a short summary): the day summary of step 1; the size line of step 3 and the fact-sync line of step 4; one line "what was logged and where" (or "Nothing to log this session"); the save's one line as it came. The very last paragraph is for Fady alone (2026-09-22): three lines at most, only what he must do or decide, or "Nothing for you." It says in a few words that the folder is saved when the line said SAVED or UP TO DATE; when it said NOT SAVED, or the save was skipped, one of those lines asks for his double-click on `save-to-cloud.cmd` and says why in a few words (a reminder, never an open item). He skims everything above it.

## Never
- No em dashes in anything new. No git, no `save-to-cloud.cmd` by hand; the backup's one door is step 8. Nothing edited in `../../taxi-business/`.
- Never rewrite `LOG.md` or `DECISIONS.md` history; append only.
- No money moves, no ad changes, no supplier orders, no customer mails from a close. (Kit line, added
  2026-09-20.)
