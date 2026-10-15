---
name: guide
description: Live step-by-step help while Fady does something by hand that Claude cannot do for him (a sign-in, a passkey, a setting on his phone, a client's laptop or phone, a call). Use when he types /guide, says "guide me", "walk me through it", "what are my exact steps", "step by step", or "now what". One step per message, one phone screen each, then it waits for his "done".
---

# /guide: one step at a time

**Procedure only.** The shared rules and the folder's `AGENTS.md` bind over this file.

*Kit template (`../fady.be/kit/`), version 2026-10-15, from the night audit: 57 of his messages in 45 days
were "done / sent / step N" and 49 were "what are my exact steps".*

## Run it

0. **Name the session** if it is new (`set_session_title`, `<folder> | guide | <today>`).
1. **The goal in one line.** Say what you understood he wants to reach, in one short line. Ask only if
   two goals are possible.
2. **First, can Claude do it instead?** If the whole job or a part of it can be done safely with the
   tools in reach (a page in the Browser pane, a file, a draft, a form filled up to the final click), do
   that part now and tell him in one line. Only what truly needs his hands stays in the guide: a password,
   a passkey, a code on his phone, a payment, an access grant, a client's own device, a send.
3. **Find the real path before the first step.** Read the official help page or the folder's own notes
   for the exact menu names as they are today (the field guide section 6 has several). Never guess a
   button name; if the screen may differ, say what to look for instead.
4. **One step per message:**
   - the action, verb first, with the exact button or menu text in **bold**;
   - where it is on the screen (top right, under the photo, the third line);
   - what he should see after it, in a few words;
   - nothing else: no background, no next steps, no list.
   Then wait for "done", "next", a question or a screenshot.
5. **When it looks different,** ask for one screenshot (or read the one he sends), find the path from what
   is really there, and give the next single step. Never repeat a step that did not work in the same words.
6. **Safety:** he never types a password, a code or a card number into the chat; if he starts to, stop
   him in one line. Claude never signs in for him, never accepts terms for him and never sends anything
   for him.
7. **At the end:** one line that says what is now done; file the result where the folder keeps it (the
   log, the open-items file, the client's state) in the same session; then the Fady block.

## Language

His language is simple English, short sentences. When a client sits next to him and the steps are for
the client, the steps are in the client's language (simple Dutch in Flanders), in the ik-vorm when he
reads them out.
