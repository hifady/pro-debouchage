---
name: design
description: Fady's design round, in any folder, attended or overnight. Use when Fady says design, redesign, "the look", "make it beautiful", asks for a new site, page, brand look, app screen, product visual or document cover, "three directions" or "a design round", or when a build needs a look before it starts. Runs instead of the Figma tools or an Artifact Design type for a new look (a builder may use them inside a route, his words of 10-13).
---

# /design: the round

**Procedure only.** Taste in `TASTE.md`, the rubric in `JUDGE.md`, the anti-generic list in `CHECKLIST.md`,
all in `C:\Users\fadya\Desktop\fady.be\kit\design\`. The folder's `AGENTS.md` and brand rules win on its
facts, brand, money, the references Fady named, its Keep list and its own design routines (a routine
its rulebook names for this work runs, with these files inside). Elsewhere this file replaces any older
design phase. **The look file** is the one its rulebook names (okipop `brand/LOOK.md`), else
`brand/DESIGN.md`; never a second.

**Where it writes:** `brand/rounds/<YYYY-MM-DD>-<slug>/` (the date by `date`), with `references/`, `baseline/` and
one `route-<code>/` per route (`ROUTE.md`, `DESIGN.md`, `index.html`, `renders/`); each step names its file.

**Models (name `model` and `effort` on every Agent call):** the driver is the session (Fable when Fady
sits in, Opus medium alone). Strategist, art directors, creative director, judges, blind reader: Opus
high. Builders: Opus high, Sonnet medium for small fixes. A round is at most 27 agents (9 before the
judges, then per judge round 4 plus one refinement per surviving route). Unattended, the driver reads the usage before step 5 and each judge round, and stops
after the current step when under a quarter of the weekly pool is left.

## The steps

**0. Ready.** Name the session (`set_session_title`), read `date`. Read the folder's facts, its customer
research and persona, its look file (the Keep list) and the kit design files. Gather what is
real: the owner's and Fady's photos, the sign, the menu, the reviews, the business's own posts on its
Google Business Profile, Instagram and Facebook (the business's own, never guests'; never published
before the owner says yes), and every reference Fady named here (his words verbatim into `INPUTS.md`). No persona: the strategist writes a provisional one; never a stop.

**1. Discovery (strategist) -> `DISCOVERY.md`.**
- The subject sheet: raw materials of this business's own world (the street, the sign, the tools, the
  menu card, the ritual of a visit, customers' words quoted). Each cites its source (a file, a photo, a
  dated review, a URL); an item with no source is struck. Fewer than 10 is fine; invent none.
- The customer and the job: who, on which device, what they must know or feel in 3 seconds.
- What the category always does: 4 to 6 rival sites rendered with the step 6 command on their URL; the
  moves that repeat are what the routes avoid.
- The one thing only this business has, and two or three personality ends chosen strongly.
- The baseline: a fresh Sonnet agent that knows only the kind of business and the town writes the 5
  ideas any model would give, then builds `baseline/index.html` from one line ("a website for <kind> in
  <town>", 10 minutes). It is the 4 the judges compare against (`JUDGE.md`).

**2. The brand idea (strategist) -> `PLATFORM.md`.** Three ideas, each one sentence that makes shapes
("always in build" makes stacking; "warm hospitality" makes nothing), each with its insight and an
idea-to-form table (mark, layout, type, colour, image, motion, the one signature mechanic). Run `CHECKLIST.md` A and C on paper.
**Gate A (a fresh creative director) -> `CRIT-A.md`.** An idea that matches one of the baseline's 5 in
meaning can only be the mild route. From the last five lines of the `TASTE.md` picks log: an idea of the
same kind as a recent winner elsewhere (the page as a menu card, a poster, a ticket, a departure board;
one giant word) is a "house move", once per round at most, never the hot route. It scores Idea,
Originality and Fit on paper (`JUDGE.md`), kills the weak, and sets THREE ROUTES on one strategy:
**mild** (the references Fady named, else the category's clearest layout; either way carrying the brand
idea, which sets at least the image rule and the signature mechanic), **medium** (an idea from outside
the category), **hot** (one bold idea in layout, type or motion, made only from the subject's real
world; no invented shapes or ornaments). They differ in idea, layout and risk, never three skins of one
skeleton. An app screen whose structure Fady described keeps it and varies the look. Each route gets a
nature code name (Fern, Slate, Ember).

**3. References (one art director per route).** One to three per route, never a blended board. The mild
route starts from what Fady named in this folder (`INPUTS.md`), and `ROUTE.md` names the one it sits
nearest to; for his own brands also `TASTE.md` part 2; for a client never part 2, nor Apple, Aesop, Stripe,
Linear, Kinfolk, Notion or Vercel, unless he named them here. Medium and hot may take the look from
outside the category, each naming the `TASTE.md` part 1 line it keeps. Looks come from rendered pages
(the step 6 command on a URL) and from printed or photographed things outside the category (a hotel, a
tailor, a magazine), each checked against `CHECKLIST.md` A and B; one that hits an item is dropped. Mobbin is for
function (booking flow, menu, hours block); a look only where the folder's rulebook names it his
reference, or in medium and hot from the route's idea in plain words (not the category), checked
against A and B. Query by one screen's visible elements, `limit` 6 to 8, `search_screens` with
`platform: ios` for a phone (`search_sections` is desktop only). Third-party images (Mobbin screens,
rival renders) go by curl into `references/` only where the folder's `.gitignore` keeps
`**/references/` off GitHub (Mobbin forbids re-hosting); else into the scratchpad, plus one `FOR-HQ.md`
line. Each reference
becomes a spec in `ROUTE.md`: what to take (spacing, type weight, image treatment, layout), what to
leave, the twist that is only this business's.

**4. The route's system (the art director) -> `DESIGN.md`.** 4 to 6 named colours with a reason each,
type roles and scale, spacing, radius, motion rules, the image rule, a shot list. Check it against
`CHECKLIST.md` A, B and C; write what changed.

**5. Build (one builder per route) -> `index.html`.** Phone first at 390 px, then 1440: the first screen
and one scroll, self-contained (fonts and images local), real content and facts, the conversion floor
(`CHECKLIST.md` E) on a local business site. Photos: real only, or what `JUDGE.md` binary 9 allows a
product brand. Magnific only relights, crops, extends or regrades a real photo; any credit spend waits
for Fady's go (a Go click naming the credits; unattended, the morning), or the folder's own credit
rule where its rulebook has one. Guests'
photos never leave the machine. No real photo for a slot: build it from type, material and facts, add
the shot to the shot list, never a placeholder; at most one route per round rests on a giant word or a
type poster in place of photos. The builder runs the step 6 command on its route, looks at its screens
twice, fixes.

**6. Judge -> `CRIT-<n>.md`.** One command per width, then the same with `--width 1440` into `lint-1440.json`:
```
node C:\Users\fadya\Desktop\fady.be\kit\scripts\layout-lint.cjs <round>\route-<code>\index.html --width 390 --out <round>\route-<code>\renders\lint-390.json --shots <round>\route-<code>\renders
``` It writes the JSON, a boxed full page for the builder only, and the clean
first two screens (`route-<code>-390x844-1.jpg`, `-2.jpg`). The same for `baseline\` and each
`skeleton.html` (`JUDGE.md`). Then three judges and one blind reader as `JUDGE.md` says. The builder
refines or pivots on the medians and top fixes.

**7. Show -> `SHOW.md` and one private page.** Publish with `files` mapping
each `route-<code>/index.html` and every file it loads at the same relative paths. On his phone, one
route per screen as a live frame at true 390 px, swiped in one snap strip, its code name on top; a switch shows 1440 scaled to fit. Nothing on the frames: no label, chip, score or
caption. Under each, a small legend naming its parts (header, hero, photos, cards) so he can point and
mix, and its references as small thumbnails (never a Mobbin screen: name it in a line instead; his
pick tells which he likes; they go into `INPUTS.md`).
Then ONE AskUserQuestion widget: first the route nearest his references (`JUDGE.md` ranking), a "mix
parts" option, the essentials in the options; above it, each route's idea in one plain line with one
example. None cleared the bar: shown as `JUDGE.md` gates say. Unattended: publish the page, write
`SHOW.md`, add the pick as one line to the folder's open-items file, run the folder's close (save), and
only then the widget, last.

**8. After his pick.** His words verbatim into `SHOW.md`. The picked route's `DESIGN.md` goes into the
folder's look file (header), with a Keep list of every part he liked, from any route, in his words. One
line in the `TASTE.md` picks log: directly in the HQ; from another folder, one dated line in its own
`FOR-HQ.md` ("TASTE pick: ...") that the HQ copies at "check the projects". A later round starts from the last version he saw and keeps the Keep parts; a
change to an approved part comes as a sample beside it.

## Never

- Build the full piece before his pick: the round IS his three small samples.
- Show three skins of one skeleton, a described direction, a flat sheet, or a route under the bar
  (except as the `JUDGE.md` gates allow).
- Direct by adjective ("premium", "a $1M agency"): name the element, the property and the value.
