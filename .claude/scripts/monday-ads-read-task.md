---
name: pd-monday-ads-read
description: Every Monday, the read-only Google Ads read of Pro Débouchage (CID 166-502-9105), one browser agent, nothing changed in the account, one report file for the Monday /orch.
---

*The full prompt of the app task `pd-monday-ads-read` (registered 2026-10-17 by the `Pro Débouchage | orch sweep | 2026-10-17` session on hi@fady.be, Monday 10:30 local, `30 10 * * 1`). Built on taxi's pattern (`../../taxi-business/.claude/scheduled-tasks/monday-ads-read.md`, read only) on the HQ's answer of 2026-10-16 in `FOR-HQ.md` and Fady's words of that day: "I want my systems to work all the same." It sits in `.claude/scripts/` because that folder is in the backup whitelist. The app task holds only a pointer to this file. The owner of the routine is `playbook/ads-program.md` section 6; this file wins only on what the unattended shape adds.*

You are the MONDAY ADS READ of Pro Débouchage, a scheduled run in the folder C:\Users\fadya\Desktop\flybys\pro-debouchage. You start with no memory of any earlier run. Work alone, finish in one run, and stop. Fady is not watching. THIS RUN READS AND PROPOSES; IT CHANGES NOTHING IN ANY ACCOUNT (the shared rules, Permissions and money: unattended, none of it happens).

First, call set_session_title (session "self") with: Pro Débouchage | monday ads read | <today as YYYY-MM-DD>

## The gates (stop early, write one line, no lock, no browser, no file)

1. Run `date`. If today is before 2026-10-26: "First run is 2026-10-26. Stopped."
2. THE ONCE-A-WEEK GATE (the app fires a catch-up run of every enabled task when Fady signs in, whatever the weekday). Compute this week's Monday (Monday to Sunday, Europe/Brussels). Look for this week's read: a file `assets/prepared/monday-reads/monday-ads-read-<a date of this week>.md`, or a `LOG.md` heading dated this week that names an Ads read ("W4", "W5", "Ads read", "weekly read"). Found: "This week's read exists: <path or log heading>. Stopped." Not found: run, even late in the week.

## Read first

1. `AGENTS.md` sections 5, 8 and 9 (it binds over everything below).
2. `playbook/ads-program.md` section 6 (the weekly check: what it reads, what each number triggers) and section 2 (the structure: campaigns, ad groups, ids).
3. `NOW.md` whole: the ADS and BRUSSELS lines carry the expected state (what is on, what is paused, the hands-off window, the last numbers). Every expected fact you pass to the agent comes from these files, read today, never from this prompt.
4. The newest earlier report in `assets/prepared/monday-reads/`, if any, for last week's numbers.

## The run

1. Browser, before any agent: `node .claude/scripts/browser-lock.cjs acquire "Pro Débouchage-Monday-read"`. HELD means another project drives: skip to point 4 with the file half only, say "Chrome half NOT REACHED: lock held" at the top of the report. Never `--force`.
2. Route (the field guide section 6, "The in-app pane", and the HQ answer of 2026-10-16): the in-app Browser pane only if ads.google.com there shows hi@fady.be and 166-502-9105 ON THE PAGE. A sign-in or consent page there: type nothing; the fallback is Chrome profile fady.be, opened ONLY with `node .claude/scripts/chrome.cjs open "fady.be" https://ads.google.com/`. A fresh window needs 30 to 60 seconds to connect: call list_connected_browsers after 60 seconds and again a minute later. No browser after the second check: the Chrome half is NOT REACHED; release the lock, do point 4 with what the files give, and say so at the top of the report. Never run chrome.exe yourself. Never conclude that the ads are down from a browser failure.
3. ONE browser agent, on Sonnet (browser reading that must judge what it finds). Its brief: READ ONLY without exception (no Save, no toggle, no negative, no status change, no recommendation chip, no auto-apply); confirm the account FROM THE PAGE as hi@fady.be and 166-502-9105; never type a password (a sign-in page: stop, leave the tab, report); re-acquire the lock (`acquire "Pro Débouchage-Monday-read"`) before every item and every 10 minutes; never resize_window; close only its own tabs and leave one tab open; a Google "Confirm it's you" dialog should not fire on a read: if it does, click nothing, leave the tab, report it (Fady is not there to tap his phone). Ranges: last week Monday to Sunday, and the 3 days since the last report if that is useful; every number carries its range. Items:
   - A. Per campaign (the ring 24185896982, Brussels 24297024674): status, cost EUR, clicks, impressions, CTR, average CPC, conversions, `call_click`, impression share with lost to budget and lost to rank.
   - B. Per ad group of the ring: status, clicks, cost, `call_click`.
   - C. The four conversion actions (call_click, whatsapp_click, Calls from ads, Calls from website): counts for the week and all time, status text.
   - D. Call details (Insights and reports > Reports > Ads and assets > Call details), the week: every row with date and time, duration in seconds, status, source, caller area. A row the files name as Fady's test is marked TEST and kept out of every total.
   - E. Search terms of the week, ring campaign, sorted by cost: term, matched keyword, ad group, clicks, cost, conversions; then candidates for negatives (irrelevant, DIY, jobs, products, outside the zone, competitors), each with its reason. LIST ONLY.
   - F. Disapprovals and asset status: any ad, asset or sitelink not Eligible, with Google's reason text; the business name asset's status.
   - G. Billing > Summary: balance, last charge date and amount, threshold, card ending. Billing > Promotions: status text, credits granted. Click nothing.
   - H. Change history of the week: every row, with who made it; Google's own system rows named as system rows.
   - I. On the way in: any passkey or identity prompt, and whether the yellow "Improve account security" banner shows. Click nothing in it.
   Return: route used, account read from the page, start and end time, one table per item, "not read" with the reason rather than a blank, anomalies against NOW.md, and the closing line "Nothing was changed in the account." only if true.
4. The file half, no browser: the VIES poll of BE 1027454187 by curl against the EU VIES service, and the KBO public search for 1027.454.187 by curl (VAT quality, the commercial name "Pro Débouchage", the data date). Compare with the last values in `STATE.md`.
5. Write ONE file, `assets/prepared/monday-reads/monday-ads-read-<today>.md`: at the top, whether the Chrome half was reached and by which route; the gist in three lines; then items A to I, the VIES/KBO result, the triggers of `ads-program.md` section 6 that fire (CTR under 2 percent, zero conversions at 50 to 100 clicks, impression share lost to budget or to rank, near-zero impressions); negatives and disapproval fixes PROPOSED with the exact text, never executed; a READY LOG LINE in one line; a proposed `SCORE.md` line in the shape at the top of `SCORE.md`. Then release the lock: `node .claude/scripts/browser-lock.cjs release "Pro Débouchage-Monday-read"`. This run does NOT write `LOG.md`, `STATE.md`, `NOW.md`, `FOR-FADY.md` or any playbook file: the Monday `/orch` reads the report and files what it found. No Roro report draft here; the session drafts it.

## Never

- No bid, budget, copy, keyword, geo, negative, asset, sitelink, status or strategy change; no disapproval fix; nothing in the account changes in this run. Pausing to stop spend is the one act always allowed and a read never needs it.
- Never guess an account number, a campaign id, a count or a conversion label. If it cannot be read, say so.
- Never run git, `save-to-cloud.cmd` or `save-at-close.cjs`. No em dashes anywhere. Never send anything, never spend anything, never touch the live site, never open another venture folder.
- Never leave the lock held: release it before the last line of the report, even on failure.

END OF RUN: the report file written (or the one gate line), the lock released, and one plain summary: the gist, whether the Chrome half was reached, and the file's path.
