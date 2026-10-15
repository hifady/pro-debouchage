---
name: orch-mid
description: Resume the day on this venture. Use when the day already started and HANDOFF.md was written by an earlier session today, when Fady says "continuity", "pick up where we left off", "continue", or opens a fresh session in the afternoon or evening on this folder. Skips the sweep and the overview and resumes from the handoff. Use orch at the start of a day and eof to close it.
---

# /orch-mid: resume the day

**Procedure only. This skill owns HOW, never WHAT.** Facts live in the owner files named in
`AGENTS.md`, which binds over this file.

*Kit template (`../../fady.be/kit/`), version 2026-10-15, with this folder's file names and its own Ads
line in step 3. `/orch` runs these steps by itself when today's handoff shows the day already started,
so Fady may type either.*

## Run it

0. **Name the session first:** `set_session_title` (session "self") with `Pro Débouchage | orch-mid | <today>`,
   so the sidebar and every Chrome tab group carry the venture's name. Then tell Fady in one line which
   model this session runs on (the driver rule: Fable when he sits in the chat, Opus when Claude runs
   alone) and which effort to pick in the app's menu (a check-up: low or medium; a build day: high, one level lower on
   Opus; `../../fady.be/kit/model-and-effort-guide.md`).
1. Read `HANDOFF.md` whole, then `STATE.md`, `NOW.md` and the last block of `LOG.md` (`AGENTS.md` is
   already loaded through `CLAUDE.md`). Read the "While the day runs" and "Never" blocks of
   `.claude/skills/orch/SKILL.md` now; they bind for the rest of the day.
   Re-read `HANDOFF.md`, `STATE.md` and `NOW.md` again immediately before the session's first
   write: a day resumed here may have been driven from another device in between, and a session
   never overwrites what it has not re-read.
2. **Confirm out loud in two lines** what the handoff says the day already did and what is next. If
   `HANDOFF.md` is from an earlier day, or missing, say so plainly and run `/orch` instead:
   continuation without a same-day handoff is guessing. One exception: a handoff that names a night
   brief to run is resumed whatever its date (a night often starts after midnight).
3. **Skip** the sweep, the live-surface checks and the overview. They ran today and would cost tokens
   and tell Fady nothing new. Two exceptions, each said in one line: if Fady says something changed
   since the handoff that no session's closing report covers, run the `/orch` sweep anyway; and a spend
   above the cap that `NOW.md` or the handoff reports is the first line whatever mode we are in. The
   spend comes from the Ads read the files already hold (the weekly Monday read of
   `playbook/ads-program.md` section 6, or a read Fady asked for): `/orch-mid` never adds an Ads read of
   its own.
4. Resume from the handoff: pick up the open thread. When the handoff already holds Fady's go for the
   next steps, continue without asking again; otherwise propose the plan for what is left of the day
   with one-line reasons (three items maximum), explain each proposed agent's job in plain English, and
   WAIT for his go. Real decisions go into an AskUserQuestion widget, essentials inside it.
5. Close with `/eof`, by yourself when the plan is done and nothing waits on him.
