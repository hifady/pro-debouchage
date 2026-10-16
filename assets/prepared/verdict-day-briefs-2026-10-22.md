# Verdict day briefs, Thursday 2026-10-22

Written 2026-10-16 on today's rules (HANDOFF.md item 4). Source of the agenda: NOW.md line 16 (the line starting "[Claude, Thu 22 Oct, one at a time, in this order]"), research/71 section 9, ads-program.md section 10 (the last bullets, "Open, the verdict Thu 2026-10-22"). Six SEPARATE briefs, one job each, run ONE AT A TIME in this order, never two agents at once. Each brief is pasted to a FRESH agent by the session, after the session has filled "Decided by". An approval is never relayed to a running agent mid-task (AGENTS.md section 9).

Not a brief: the session first reads the call log and Roro's word (the verdict itself, never the click price). If the verdict is "no call", skip to the last brief (Branch N) and do not run 1 to 6.

## Rules that apply to EVERY brief below (paste the whole block into each)

- Route: Chrome profile fady.be only, opened with `node .claude/scripts/chrome.cjs open "fady.be" https://ads.google.com`. Never run chrome.exe. Wait 30 to 60 seconds for the extension. Sign-in or password page: stop, report, never type a password.
- Lock: `node .claude/scripts/browser-lock.cjs acquire "Pro Débouchage"` before EVERY step and every 10 minutes while waiting. HELD: stop and report. Never `--force`. Release with `node .claude/scripts/browser-lock.cjs release "Pro Débouchage"` as the last action, after closing every tab you opened and leaving one blank tab.
- State in the report the route used and the account read FROM THE PAGE (166-502-9105 Pro Débouchage, hi@fady.be), never from a /u/N URL.
- Identity check (AGENTS.md section 9). Google's "Confirm it's you" can fire at any Save. Fady's "ready" comes BEFORE the agent starts, with one question, at the desk or out. At the desk he clicks Confirm himself. Out, the agent clicks Confirm or Continue ONCE, reads the number, and sends it at once by SendMessage to "main"; the session runs the agent in the background, tells Fady in chat and by PushNotification, and he stays reachable until the agent reports. The agent re-reads the page every 20 seconds for up to 10 minutes and repeats the lock acquire every 10 minutes while it waits. On "Try again": click nothing more, leave the tab open, report. After it clears: reload, check the object exists, then Save again. It can fire twice.
- Work in ONE tab. Save by element ref. Never close a tab while a form is open or holds an unsaved or just-confirmed edit. After a refused Save, leave the form open and report (the 8 Oct brief that worked used one tab and Save by ref, research/70).
- Verify the result, never the submission: after Save, reload fully and re-read the page where the answer lives (status, text, count). Report what the page shows, with a screenshot path.
- Change ONLY what the brief names. Budget, bidding strategy and bid caps are never touched unless the brief names them. Never edit an existing ad in place (an edit is a new ad and the stats reset): add next to it. Pausing to stop runaway spend is always allowed.
- Never type a password, never create anything not named, never touch another project's tabs.

Fields every brief carries: "Money or switch-on", "Who decides", "Decided by".

---

## Brief 1. The three NL per-problem groups back on

- Exact change: set to ENABLED the ad groups NL | Wc verstopt, NL | Afvoer verstopt, NL | Kelder leegpompen in the ring campaign PD | Search | Ring Bruxelles | FR+NL (24185896982). Order: the least risky first. Suggested order: NL | Kelder leegpompen (storm-driven, call-ready), then NL | Wc verstopt, then NL | Afvoer verstopt (it took 135.63 EUR of the 212.41 EUR NL spend in the 18 to 26 Sep window, ads-program.md section 10). If the session decides on the day to turn on fewer than three, the "Decided by" line says which. In the SAME step, for each group turned on, PAUSE (never remove) its keyword copies in NL emergency, so each keyword lives in one group: for NL | Wc verstopt [wc verstopt]; for NL | Afvoer verstopt [afvoer verstopt], [riool verstopt], [gootsteen verstopt], "water komt omhoog", "riool verstopt wie bellen"; for NL | Kelder leegpompen "kelder leegpompen" (7 copies, enabled again in NL emergency on 8 Oct while the groups were paused, research/69; [ontstoppingsdienst] never moved and stays on). Order per group: enable the group, read its keywords back, then pause the copies. Nothing else changes: no other keyword, no ad, no bid.
- Before the change, read and report: the status of each of the three groups (expected Paused since 2026-09-28), their keywords (5, 9, 5 per the 2026-09-19 count) and each group's ad (final URL /nl/wc-verstopt/, /nl/afvoer-verstopt/, /nl/kelder-leegpompen/, status Eligible or not).
- Verify after: each enabled group reads Enabled, its ad Eligible or Under review (no policy issue), its copies in NL emergency read Paused, NL emergency's other keywords unchanged, campaign budget still 30 EUR a day, bidding still Maximize Conversions.
- Money or switch-on: it is an ad-group switch-on inside a running campaign, no budget change in the campaign, but the groups spend from the same 30 EUR a day.
- Who decides: Settled: the session's call on the data (Fady by widget 2026-10-16 about 21:32, 'Claude, on the data (Recommended)', DECISIONS 2026-10-16). Background: DECISIONS.md 2026-09-23 (line 252) leaves ad structure to the session and keeps the daily budget, the bid cap and switching a campaign on as Fady's Go click; ads-program.md section 10 says "each back on one at a time or left paused, on the read".
- Decided by: ____ (who, when, through what, quoted; DECISIONS entry)

---

## Brief 2. The second RSA for FR | Canalisation bouchée (then WC)

- Exact change: ADD a NEW responsive search ad to the ad group FR | Canalisation bouchée, next to the live one (never an edit, never pause the live one). Final URL https://prodebouchage24.be/fr/canalisation-bouchee/. Headlines, descriptions and display paths exactly as drafted in `assets/prepared/fr-per-problem-rsa-2-draft-2026-09-28.md`: the session re-checks that file the same morning (headline limit 30 characters, description limit 90, no price numbers, nothing pinned, each headline opening on a different word) and pastes the final text into this brief before launching the agent. Do NOT write the copy from memory. Item to do second, in a SEPARATE agent: the same for FR | WC bouché (final URL /fr/wc-bouche/), only after item 2a is read back.
- Least risky first: add the ad, then check it reads Eligible or Under review, never edit the old one. No budget, no bidding, no keywords touched.
- Verify after: reload the Ads list for the group: two ads, the old one unchanged and still Enabled, the new one Enabled with the final URL, review status and Ad strength shown, no policy issue; count the headlines and descriptions on the new ad.
- Money or switch-on: no. Adds an ad inside an enabled group, no budget change.
- Who decides: the session's own ads decision. Quote (DECISIONS.md 2026-09-23): "ad copy, ad structure, keywords, sitelinks and negatives are decided by the session on the data, filed here and told to him, never asked." Precedent: second RSAs were added by agents on 2026-09-12 and 2026-09-27 (ads-program.md section 2). Filed in DECISIONS and told to Fady in one line.
- Decided by: ____ (who, when, through what, quoted; DECISIONS entry)

---

## Brief 3. The call-conversion rule, 10 seconds to 1 second

- Exact change: in Goals > Conversions > Summary, open "Calls from ads" and "Calls from website" (id 7762025691): set the call-length threshold from 10 seconds to 1 second. Nothing else on those actions: category, value, count one, attribution and the primary status stay. call_click and whatsapp_click are NOT touched. Read and report before the change: the current threshold on each, their status text and counts (both 0 ever as read 12 Oct).
- Least risky first: "Calls from ads" first, read back, then "Calls from website".
- Why (research/71 section 9 item 3): five of the six calls ever logged are under 10 seconds, so neither action has ever counted a call. At 1 second every answered call feeds Smart Bidding. Note for the session: both actions are PRIMARY, so a 1-second call would count as a conversion; a wrong number or a hang-up of 2 seconds would count too. Say this to Fady in one line. The flip rule (ads-program.md section 4: "Calls from website" counting its first call flips call_click to SECONDARY) does NOT fire on the first 1-second count: the session flips only once a counted website call matches a real customer call (Roro's word or a duration that is a conversation), and the agent never touches primary status (DECISIONS 2026-10-16, the sweep).
- Verify after: reload, reopen each action, read the threshold, expect 1 second.
- Money or switch-on: no money moves directly, but it changes what Smart Bidding optimises for (a bidding signal) in a live account. NOW.md line 16 item 3 says "consider 1 second, no money"; research/71 section 9 says "a settings change, no money".
- Who decides: Settled: the session's call on the data (Fady by widget 2026-10-16 about 21:32, 'Claude, on the data (Recommended)', DECISIONS 2026-10-16). No money moves with this setting; budget, bidding and switch-ons stay his Go click.
- Decided by: ____ (who, when, through what, quoted; DECISIONS entry)

---

## Brief 4. "société de débouchage": pause if still no tap

- Exact change: first read, then decide on the day. Read for "société de débouchage" (FR emergency; Keywords tab): status, Quality Score (QS 1 as read), clicks, cost, `call_click` and conversions, over 12 Oct to 21 Oct and since it started (reference: 27 EUR for 7 clicks, no tap). THE CONDITION (DECISIONS 2026-10-12, "paused if still no tap"): if the keyword still has zero taps and zero conversions, PAUSE that keyword only (status to Paused, never remove). If it has any tap or call, change nothing and report. Which match types: pause every match type of that text present in the group (exact and phrase), report each.
- Verify after: reload the Keywords tab, the keyword rows read Paused, the other keywords of the group unchanged.
- Money or switch-on: no. A pause stops spend; it is the safe direction.
- Who decides: the session's own ads decision. Quote (DECISIONS.md 2026-09-23): "ad copy, ad structure, keywords, sitelinks and negatives are decided by the session on the data". Precedent: [débouchage bruxelles] paused in the ring on 2026-10-08. Filed and told to him in one line.
- Decided by: ____ (who, when, through what, quoted; DECISIONS entry)

---

## Brief 5. The Brussels restart

- Exact change: set the campaign PD | Search | Bruxelles | FR (24297024674) to ENABLED, and only that. Budget stays 16 EUR a day (about 486 a month, a day up to 32), bidding stays Maximize Conversions, no target CPA, no cap. At restart ADD the two campaign-level negatives "fleurus" and "liege" (PHRASE match, campaign level), seen in its search terms (ads-program.md section 2, research/66). Nothing else: no ad, keyword or location change. Before the switch: read and report the current state (Paused since 2026-10-08 about 12:50, 149.84 EUR, 18 clicks, no call, no tap, its stop rule), the budget and bidding as shown, the ad strength of its ads, and the billing balance.
- Order: the money-stopping change first, which here means: add the two negatives BEFORE the switch-on (a negative added while paused spends nothing), then switch on, then verify.
- Verify after: reload, the campaign reads Enabled (Eligible or Learning), budget 16.00, strategy Maximize Conversions, the two negatives listed. Report the time of the switch-on.
- Its own 14-day read follows (ads-program.md section 2 and 10); the stop rule applies again.
- Money or switch-on: YES. A switch-on of a campaign that spends 16 EUR a day (up to 32), on Roro's card Mastercard 2616.
- Who decides: Fady, by a Go click on a widget that names the action and the amount (AGENTS.md section 8; shared rules "Permissions and money"). Proposed with the 22 Oct numbers, never before. The files say "Go click" (NOW.md, AGENTS.md, ads-program.md section 10); "typed go" survives only as 28 Sep history in ads-program.md section 2 and in DECISIONS 2026-09-23. The shared rules of 2026-10-11 make the Go click on a widget count. Use the widget. Unattended, it does not happen.
- Decided by: ____ (who, when, through what, quoted; DECISIONS entry)

---

## Brief 6. The sitelink "Le prix d'un débouchage" and the name asset

- Exact change: READ FIRST, change only if a rule below fires. Find the sitelink: account-level Sitelinks list, each campaign's sitelinks, each ad group's sitelinks, filters on ALL statuses including Removed (it was not in the account-level list on 12 Oct: removed, campaign-level or filtered, not determined). Also read the business name asset "Pro Débouchage" status on both campaigns (the 19 Oct read already reported it; confirm it reads Eligible).
  - If it serves (Eligible): change nothing.
  - If Disapproved: read the reason; reword (create a new sitelink, never an edit of the old text) or drop it, on the data. No price numbers in the text while the VAT wording is unsettled (ads-program.md section 10 "Never"). The session writes the new text into the brief before the agent starts.
  - If not found anywhere: report it and where you looked, change nothing; the session decides on the day whether to create it again.
  - Local Services Ads: NOT part of this brief (only after the GBP verdict; support +32 800 58 270).
- Verify after: reload, the sitelink reads the new status in the right list; the name asset reads Eligible.
- Money or switch-on: no.
- Who decides: the session's own ads decision. Quote (DECISIONS.md 2026-09-23): "ad copy, ad structure, keywords, sitelinks and negatives are decided by the session on the data".
- Decided by: ____ (who, when, through what, quoted; DECISIONS entry)

---

## Branch N. The "no call" verdict: Manual CPC, phones first

Use ONLY if the verdict on 22 Oct (the call log and Roro's word) is "no call". It replaces items 1 to 6 (the structure does not change in a no-call week).

- Exact change: ring campaign 24185896982 bidding strategy from Maximize Conversions to Manual CPC (research/64 option 2a, "phones first"). The exact bids, the device adjustments (phones first: raise the mobile bid adjustment, the exact percentage) and the keyword-level max CPCs come from research/64 option 2a; the session reads that section the same morning and pastes the numbers into the brief. This brief does NOT invent them. Enhanced CPC off or on as the research names. Budget stays 30 EUR a day unless the Go click names a different amount.
- Order: read the current bid strategy and the keyword list first; change the strategy; then the keyword bids; the learning period resets, so no other change that day.
- Verify after: reload, strategy reads Manual CPC, listed bids match the pasted numbers, budget as named.
- Money or switch-on: YES. It moves bidding (money) in a live campaign and can raise or cut the cost per click.
- Who decides: Fady, by a Go click on a widget naming the action and the amount (AGENTS.md section 8; NOW.md line 15 "Manual CPC, phones first, Fady's Go click"). Note on file history: ads-program.md section 2 says the CPC-cap fallback was RETIRED on 2026-09-28 (the 6 EUR cap ran 17 to 28 Sep and cut off the 11 to 15 EUR clicks that were the five calls, DECISIONS 2026-10-08); the widget text must show that, so Fady sees why Manual CPC differs from the old cap. It must also show the risk on file against it (DECISIONS 2026-10-08): Google ties the ad's call button to Smart Bidding, so "Manual CPC risks losing the button the 5 calls came through".
- Decided by: ____ (who, when, through what, quoted; DECISIONS entry)

---

## Contradictions and gaps found while writing (the session settles them)

1. Who decides items 1 and 3 (ad groups back on, conversion rule): settled, the session's call on the data (DECISIONS 2026-10-16). See Briefs 1 and 3.
2. "Typed go" in DECISIONS.md line 252 points to "AGENTS.md section 15", which no longer exists (AGENTS.md now has sections 1 to 9; the rule is section 8 and the shared rules, "Go click"). ads-program.md line 154 says "Go click"; "typed go" there is 28 Sep history only (section 2).
4. The 22 Oct agenda says item 4 pause is "if still no tap" (DECISIONS line 370, 2026-10-12); NOW.md line 16 and research/71 section 9 call it "a pause candidate". Same meaning, the condition is stated in Brief 4.
