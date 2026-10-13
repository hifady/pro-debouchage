---
name: decide
description: Fady's decision sitting. Use when Fady types /decide, says "my verdicts", "what do you need from me", "ask me what you need", or opens a fresh session to decide. Reads the one file for him (FOR-FADY.md), shows one thing at a time with one short paragraph in plain English, asks by widget and records his words. It builds nothing and spends nothing.
---

# /decide: one thing at a time

**Procedure only. This skill owns HOW, never WHAT.** `AGENTS.md` binds over this file.

*Kit template (`../../fady.be/kit/`), version 2026-09-29, taken from BePet's own routine of the same day,
written on his words: "a dedicated Opus session fires and it shows me what I need to react to, with one
paragraph context explanation in plain simple English then it asks me for a decision". It follows
Anthropic's own advice for Claude Code: let Claude interview you with the AskUserQuestion tool, then start
a fresh session with clean context to do the work.*

## Run it

0. **Name the session first:** `set_session_title` (session "self") with `Pro Débouchage | decide | <today>`.
   Tell him in one line that this sitting runs best on Opus (the app's model menu).
1. Read `FOR-FADY.md` whole, then the folder's state file and `HANDOFF.md`. Read the clock.
2. **Say in two lines what waits:** how many things, which come first. The order: what blocks the work,
   then his verdicts on designs, then the rest. Ask by widget how much time he has.
3. **One thing at a time:**
   - first, for any item from an older list, search `DECISIONS.md` (and the folder's order files, where
     it keeps them) for an earlier answer; if one exists, show it in one line and move on;
   - a question about mechanics (routines, hooks, tools, settings) is not asked: decide it and tell him
     in one line;
   - one short paragraph: what it is and why it matters, in plain simple English, with one example
     where it helps;
   - at most ONE link: the page or the picture to look at;
   - one line with the data and one with the judges' view, when they exist; "no data yet" when not.
     His order of a decision: "data, then the judges, then me as the last judge";
   - the question by widget, the recommended answer first, the essentials inside the widget (the app
     folds text written between tool calls); an answer is marked "(Recommended)" only where a red team
     or real data stands behind it;
   - when he answers "explain" on a choice he cannot picture, make one picture by code from files on
     disk (no image model, no credit), then ask again;
   - his answer is written at once, word for word, with its clock read, under "Your answers" in
     `FOR-FADY.md`.
4. **A verdict on a design** takes three things from him: what he likes, what he does not like, his
   pick. Whether a pick is a working choice or a lock is asked, never assumed.
5. **A spend** is never made here. When an item is a spend, the sitting asks for his typed go, naming
   the action and the amount, and files it for the session that does the work.
6. **Stop** when he says stop or his time is over. What was not asked stays in `FOR-FADY.md`.
7. **Close:** his decisions to `DECISIONS.md` (append only, his words), changed truths to the state
   file, the answered items leave part 2 of `FOR-FADY.md`, the work his answers set in motion goes to
   the open-items file for Claude. Then `/eof`.

## Never

- No build, no fleet, no picture from an image model, no spend, no mail, no deploy. This sitting asks
  and records.
- No lines he already knows (nothing spent, nothing live). Straight facts.
- Never two things in one question. Never a list of links.
- Never decide for him. Never turn a working choice into a lock.
