// Builds THE site (design v1, locked 2026-08-26) into ../../site-v1/ from template.js (markup), copy-fr/nl/en.js (copy),
// styles.css (design, INLINED into every <head>), cgv.js (general terms), the local legal.js
// (privacy pages, reused with the enterprise-number prefix fix) and assets/prepared/web/ (images).
// Run: node design/site-source/build.js     Output is generated: never edit site-v1/ by hand.
// ADS_TAG_ID=AW-... and/or GA4_ID=G-... build the consent + Google-tag layer (commands in ./README.md).
const fs = require('fs'), path = require('path');
const T = require('./template.js');
const COPY = { fr: require('./copy-fr.js'), nl: require('./copy-nl.js'), en: require('./copy-en.js') };
const CGV = require('./cgv.js');
// Privacy text is the v2 one (facts unchanged); the only edit: the enterprise number loses its
// wrong "BE " prefix (BE belongs to the VAT number, overnight legal research 2026-08-26).
const LEGAL_V2 = require('./legal.js'); // local since the 2026-08-26 lock-in; formerly ../canvas-v2/legal.js
const fixBce = s => s
  .replace(/Numéro d'entreprise BE 1027\.454\.187/g, `Numéro d'entreprise 1027.454.187`)
  .replace(/Ondernemingsnummer BE 1027\.454\.187/g, 'Ondernemingsnummer 1027.454.187')
  .replace(/(Company|Enterprise) number BE 1027\.454\.187/g, '$1 number 1027.454.187');
const LEGAL_TEXT = { fr: fixBce(LEGAL_V2.fr), nl: fixBce(LEGAL_V2.nl), en: fixBce(LEGAL_V2.en), COOKIES_TAG: LEGAL_V2.COOKIES_TAG, RECIP_TAG: LEGAL_V2.RECIP_TAG, BASIS_TAG: LEGAL_V2.BASIS_TAG };

const ROOT = path.resolve(__dirname, '..', '..');
const OUT = path.join(ROOT, 'site-v1');
const WEB = path.join(ROOT, 'assets', 'prepared', 'web');
const HOST = 'https://prodebouchage24.be';
const BUILD_YEAR = '2026';
// Since G5 (2026-08-27) the tag ids are baked in as DEFAULTS so a plain `node build.js` ships
// the live tagged site; a bare build can no longer silently drop the tags. The ids are public
// (visible in the page source), never secrets. TAGS_OFF=1 builds the clean zero-Google output.
const TAGS_OFF = process.env.TAGS_OFF === '1';
const ADS_TAG_ID = TAGS_OFF ? '' : (process.env.ADS_TAG_ID || 'AW-18413234511');
const ADS_CALL_LABEL = TAGS_OFF ? '' : (process.env.ADS_CALL_LABEL || '_diMCKD12OgcEM_SjsxE');
const ADS_WA_LABEL = TAGS_OFF ? '' : (process.env.ADS_WA_LABEL || 'XldOCKP12OgcEM_SjsxE');
// CALLS FROM WEBSITE VISITS (added 2026-09-12). Google's own call tracking: when the visitor came
// from an ad click AND accepted cookies, Google's script swaps the displayed number for a Google
// forwarding number and counts a conversion when the call lasts long enough. The call-length
// threshold is set on the conversion action in the Ads account, not here: playbook/ads-program.md
// section 4 owns the current number.
// LABEL BAKED IN 2026-09-12: the conversion action "Calls from website" exists in the Ads account
// and its label is the default below; ADS_PHONE_LABEL=... still overrides it for one build, and
// ADS_PHONE_LABEL= (empty) or TAGS_OFF=1 removes the feature from the output byte for byte.
// TWO THINGS THAT ARE ACCOUNT STEPS, NOT BUILD STEPS: (1) which conversion action is PRIMARY is an
// account setting owned by playbook/ads-program.md section 4, not by this file; (2) the number swap
// only ever happens for visitors who arrived from an ad click and accepted cookies, so most
// visitors keep seeing the real number.
// The string below must match the number AS WRITTEN IN THE PAGE TEXT, character for character.
// Every visible occurrence on this site is "0480 649 649" (66 of them). The tel: hrefs
// (tel:+32480649649), the wa.me links and the JSON-LD telephone are a different format and are NOT
// swapped, which is correct: Google only rewrites the displayed text and the href of links whose
// text it replaced.
const ADS_PHONE_LABEL = TAGS_OFF ? '' : (process.env.ADS_PHONE_LABEL || 'u0RxCNu5nPUcEM_SjsxE');
const ADS_PHONE_NUMBER = '0480 649 649';
// GA4_ID rides the SAME consent gate as ADS_TAG_ID (added 2026-08-27, tag round G5).
const GA4_ID = TAGS_OFF ? '' : (process.env.GA4_ID || 'G-S3SQ25WZMK');
// One switch for the whole tag layer: consent stub, banner, consent.js, footer credit, privacy
// cookie section, reopen link, Google CSP. TAGS_OFF=1 = none of it exists in the output.
const TAG_ON = !!(ADS_TAG_ID || GA4_ID);
let CONSENT_HASH = ''; // set below from the generated consent.js; busts the edge cache on any change
const CONSENT_VER = '2026-08-27-purposes'; // bumped with the two-purpose shape: old one-button records are invalidated
const CONSENT_DAYS = 182; // how long a stored answer holds; consent.js and the advanced head read share it (2026-10-08)
// CONSENT MODE, TWO BUILDABLE VARIANTS (added 2026-10-08, the counting fix, DECISIONS 2026-09-28,
// research/58, 59, 67). Which one the LIVE site ships is Fady's call; this switch only makes both buildable.
// - unset, or CONSENT_MODE=basic: today's site BYTE FOR BYTE. No Google script loads before the
//   visitor answers the card, so a tap made before an answer is never counted.
// - CONSENT_MODE=advanced: Google's "advanced" Consent Mode v2 FOR THE ADS TAG ONLY (narrowed 2026-10-08,
//   research/68). The gtag.js loader with the Ads tag loads on EVERY page that carries the card before any
//   answer; GA4 waits for the analytics Accept exactly as in basic. The head sets all four consent types to denied FIRST, then
//   ads_data_redaction true and url_passthrough false, then applies a stored answer if there is one,
//   then the loader and the Ads config. Accept still grants per purpose (ads, analytics) as before;
//   ad_personalization is granted in no branch, ever. The call and WhatsApp conversions fire on a tap in
//   EVERY consent state (cookieless pings while denied). The number swap (ADS_PHONE_LABEL) still waits
//   for ads consent, because Google's loader sets cookies.
// Any other value throws, so a typo can never ship one variant while you meant the other.
const CONSENT_MODE = process.env.CONSENT_MODE || 'basic';
if (CONSENT_MODE !== 'basic' && CONSENT_MODE !== 'advanced') throw new Error(`CONSENT_MODE must be "advanced" or unset (got "${CONSENT_MODE}").`);
const ADVANCED = TAG_ON && CONSENT_MODE === 'advanced';
// NARROWED TO THE ADS TAG (2026-10-08, research/68, the session's review): under advanced ONLY the Google
// Ads tag loads before the answer. GA4 stays exactly as in basic: no GA4 config, no GA4 request, until the
// visitor accepts the analytics purpose (consent.js then sends the one GA4 config). So advanced needs an
// Ads id; without one it would quietly be a different site, so the build stops.
if (ADVANCED && !ADS_TAG_ID) throw new Error('CONSENT_MODE=advanced needs ADS_TAG_ID: the advanced variant only moves the Ads tag before consent.');
// The two pieces the advanced head adds; both are '' in the basic variant, which is what keeps it byte
// for byte. HEAD_ADV runs inside the head's first inline script, right after the consent default.
const HEAD_ADV = !ADVANCED ? '' : `gtag('set','ads_data_redaction',true);gtag('set','url_passthrough',false);(function(){try{var r=JSON.parse(localStorage.getItem('pd_consent'));if(!r||r.v!==${JSON.stringify(CONSENT_VER)}||Date.now()-r.t>${CONSENT_DAYS}*864e5)return;var u={};if(r.ads){u.ad_storage='granted';u.ad_user_data='granted'}if(r.analytics){u.analytics_storage='granted'}if(u.ad_storage||u.analytics_storage)gtag('consent','update',u)}catch(e){}})();gtag('js',new Date());gtag('config',${JSON.stringify(ADS_TAG_ID)});`;
const HEAD_ADV_LOADER = !ADVANCED ? '' : `\n<script async src="https://www.googletagmanager.com/gtag/js?id=${ADS_TAG_ID}"></script>`;

const rm = p => fs.rmSync(p, { recursive: true, force: true });
const mk = p => fs.mkdirSync(p, { recursive: true });
const cp = (a, b) => { mk(path.dirname(b)); fs.copyFileSync(a, b); };
const w = (rel, s) => { const p = path.join(OUT, rel); mk(path.dirname(p)); fs.writeFileSync(p, s, 'utf8'); };

// SNAPSHOT, BEFORE THE WIPE BELOW ERASES IT (2026-09-18, for the true sitemap lastmod further down).
// The only honest record of what each page looked like BEFORE this build is whatever site-v1
// already holds on disk, so it is read here, once, before the next line deletes it. Every later
// write goes through `w()` above, which never touches this map, so it stays the "before" for the
// whole run. Keyed by the same relative path `w()` takes (e.g. "fr/index.html").
const PREV_FILES = {};
(function snapshotPrev(dir, rel) {
  let ents; try { ents = fs.readdirSync(dir, { withFileTypes: true }); } catch (e) { return; }
  for (const e of ents) {
    const r = rel ? rel + '/' + e.name : e.name;
    if (e.isDirectory()) snapshotPrev(path.join(dir, e.name), r);
    else { try { PREV_FILES[r] = fs.readFileSync(path.join(dir, e.name), 'utf8'); } catch (err) {} }
  }
})(OUT, '');
// Filled in as pages are generated below: URL -> the relative file `w()` wrote it to, and URL -> the
// HTML string itself, so the lastmod step near the sitemap never has to re-read site-v1 from disk.
const URL_FILE = {};
const PAGE_HTML = {};

mk(OUT); for (const e of fs.readdirSync(OUT)) rm(path.join(OUT, e));

// ---------- assets ----------
for (const f of ['archivo-var-latin.woff2', 'archivo-var-latin-ext.woff2', 'caveat-note.woff2']) cp(path.join(__dirname, f), path.join(OUT, 'assets', 'fonts', f));
// caveat-note.woff2 is Caveat (SIL Open Font License) SUBSET to the 15 glyphs the handwritten note
// on the photo story needs, 8KB instead of 75 for one decorative line. A letter outside that set
// renders in a system script face, silently, and only in the language nobody re-checked. So the
// build refuses it: change `baNote` and this throws with the character it cannot draw. To widen the
// set, re-subset (fonts.googleapis.com/css2?family=Caveat:wght@600&text=...) and update BOTH lists,
// here and the @font-face unicode-range in styles.css.
const NOTE_GLYPHS = ' !Pacefirt'; // re-subsetted 2026-08-27 for the one-word note: 'Parfait !' / 'Perfect!'
for (const [l] of T.LANGS) {
  const note = COPY[l].baNote || '';
  if (typeof note !== 'string' || note.length < 2) throw new Error(`copy-${l}.js: baNote must be the handwritten note, one short string.`);
  for (const ch of note) if (!NOTE_GLYPHS.includes(ch)) throw new Error(`copy-${l}.js baNote uses "${ch}", which is not in the subsetted Caveat (${NOTE_GLYPHS.trim()} and space). Re-subset the font or change the wording.`);
}
// The BOM strip is not cosmetic. This CSS is INLINED into <style>, where a leading U+FEFF is a
// stray token: the parser opens a bogus rule on it and swallows the FIRST real rule, which is the
// main Archivo @font-face. The page then falls back to Arial, which has no weight axis, so every
// weight from 600 up renders as the same faux bold. That is what made v3 look thin next to v2 for
// four review rounds (2026-08-26). A Windows editor can re-add the BOM at any save, so it is
// stripped here as well as in the file. Guarded by the assert below.
let css = fs.readFileSync(path.join(__dirname, 'styles.css'), 'utf8').replace(/^﻿/, '');
if (!/^\s*\/\*|^\s*@|^\s*[.#:a-zA-Z]/.test(css)) throw new Error('styles.css starts with an unexpected character; the first CSS rule would be swallowed.');
if (TAG_ON) css += `
/* THE CONSENT CARD (built only with the tag layer on). Restyled 2026-08-27 to read as part of the
   site and not as a bolted-on legal widget: paper card, the page's radius ladder, the same yellow
   rule that opens every section, the same weight ladder, the same teal focus ring.
   TWO THINGS HERE ARE LAW, NOT TASTE (research/29 A4, B11, Mediahuis September 2024):
   1. Refuse and Accept are ONE rule, so they can never drift apart: same size, same weight, same
      fill, same border. Never give Accept a colour that Refuse does not have.
   2. "Choisir" is quieter than both, but it is full-weight, full-contrast, underlined and 44px
      tall. It ADDS a layer, it never replaces the Refuse button. */
.linklike{background:none;border:0;padding:0;font:inherit;color:inherit;text-decoration:underline;cursor:pointer}
/* THE DIM BEHIND THE CARD (Fady 2026-08-27 round 4). It is POINTER-EVENTS:NONE and that is not a
   detail, it is the whole reason it is allowed: the page underneath stays fully usable, so this is
   a visual weighting and never a cookie wall (research/29 A7). It also sits at z-index 190, UNDER
   the sticky call bar at 200, so the phone number stays bright and tappable while the card is up,
   which B9 asks for by name. The choices layer dims harder than the first, because by then the
   visitor is deciding rather than glancing. */
.c-dim{position:fixed;inset:0;z-index:190;background:rgba(16,42,74,.34);pointer-events:none;transition:background-color .3s ease}
.c-dim-2{background:rgba(16,42,74,.6)}

/* THE MOVING STROKE (Fady 2026-08-27 round 4, a test). Colours lifted from the logo file itself,
   not invented: its aqua #25FEC0 and #22B3A6, its blues #2E6FB1 and #0F4A6A, its yellow #FFDC52 and
   its orange #FE7740. One slow turn every 18 seconds.
   IT IS BUILT TO COST NOTHING. A conic gradient on a square that is only ROTATED is a compositor
   animation: the GPU spins one existing layer and the main thread never repaints, which is why this
   and not an animated gradient angle (that one repaints the whole card every frame) or an SVG dash
   offset. The card clips it, and .c-body sits on top leaving 2px of it showing as the border.
   The scroll had to move from .consent to .c-body for this: overflow:hidden on the frame is what
   clips the spinning square, so the body is what scrolls now. */
/* WHERE THE CARD SITS ON A PHONE (rewritten 2026-09-16, research/35). It used to be parked above
   the sticky call bar's height at all times, which is 86px of empty screen while the bar is still
   hidden, and the card was 502px tall, so it ran from y224 to y726 on a 375x812 screen and covered
   the hero call button at y535 to y599. An ad click landed on a page with nothing tappable that
   calls. Now the card is anchored at the BOTTOM of the screen, 12px off the edge, and only rides up
   over the bar once the bar is actually there (html.cb-on, the same class the bar and the guarantee
   badge already use). Short card plus bottom anchor is what clears the hero CTA. */
.consent{position:fixed;left:12px;right:12px;bottom:calc(env(safe-area-inset-bottom,0px) + 12px);z-index:290;border-radius:var(--r-card);box-shadow:0 14px 44px rgba(16,42,74,.22);max-width:440px;margin-inline:auto;background:var(--card);overflow:hidden}
.cb-on .consent{bottom:calc(var(--bar-h) + env(safe-area-inset-bottom,0px) + 14px)}
.consent:focus{outline:none}
@media (min-width:1000px){.consent,.cb-on .consent{left:auto;right:24px;bottom:24px;margin:0}}
.c-ring{position:absolute;top:50%;left:50%;width:820px;height:820px;pointer-events:none;
  background:conic-gradient(from 0turn,#25FEC0,#22B3A6,#2E6FB1,#0F4A6A,#2E6FB1,#FFDC52,#FE7740,#25FEC0);
  animation:cring 18s linear infinite}
@keyframes cring{from{transform:translate(-50%,-50%) rotate(0turn)}to{transform:translate(-50%,-50%) rotate(1turn)}}
/* Bottom padding is bigger than the top on purpose: the card ends in 13px fine print, which needs
   more room under it than a 20px block would give before it reads as sitting on the edge (Fady
   2026-08-27 round 6). */
.c-body{position:relative;z-index:1;margin:2px;border-radius:calc(var(--r-card) - 2px);background:var(--card);color:var(--text);padding:20px 20px 26px;max-height:min(82vh,680px);overflow:auto;overscroll-behavior:contain}
/* THE CHOICES LAYER CENTRES ITSELF ON A PHONE (Fady 2026-08-27 round 6). Layer one is a glance, so
   it stays a sheet at the bottom near the thumb; layer two is a decision, it is the tallest thing
   the card ever shows, and bottom-anchored it ran from just under the status bar to just above the
   call bar and read as a page rather than a dialog. Centred it is a dialog again, and it leaves the
   bottom of the screen free, which keeps the call bar clear as well.
   Desktop keeps its corner: the card is small there and a corner card is the point. */
@media (max-width:999px){.consent.c-mid{top:50%;bottom:auto;transform:translateY(-50%)}}
@media (prefers-reduced-motion:reduce){.c-ring{animation:none}.c-dim{transition:none}}
/* ONE SPACING RHYTHM (Fady 2026-08-27): 10px inside a group, 16px between groups, 18px before the
   fine print. Nothing in this card is spaced by feel any more. */
/* The mark, small and left-aligned above the title (Fady 2026-08-27 round 5), which also buys the
   card the extra height he wanted so it covers a little more of the page. 26px against the site
   header's 34 and the footer's 44: the smallest of the three, because here it is a signature and
   not a navigation target. Decorative, alt="", since the dialog already carries its own label. */
.c-logo{display:block;height:26px;width:auto;margin:0 0 12px}
.consent h2{font-size:1.25rem;font-weight:900;line-height:1.15;margin:0;color:var(--ink);text-transform:none;font-stretch:100%;letter-spacing:var(--track-title)}
.c-rule{border:0;width:44px;height:5px;border-radius:var(--r-dot);background:var(--mark);margin:12px 0 14px}
.consent p{font-size:.9375rem;line-height:1.5;margin:0 0 16px}
/* Restyled on Fady's round 2 (2026-08-27): the two answers are FILLED NAVY and hover to the house
   yellow, because the old white-on-white pair with a paper tint on hover did not look pressable at
   all. "Choisir" became a real ghost button in the same shape.
   THE LAW IS UNTOUCHED AND IT IS WHY REFUSE AND ACCEPT SHARE ONE SELECTOR (research/29 A4, B11;
   APD v Mediahuis, September 2024): same fill, same border, same size, same weight, same hover.
   A ghost next to them is fine, and only fine, because it is the THIRD control: it opens the
   per-purpose layer, it never stands in for the reject button, which is right there beside Accept
   at full strength. If anyone ever gives Accept a colour Refuse does not have, that is the breach.
   One hover language across the whole card: yellow fill, navy ink. */
/* EVERY CONTROL IN THE CARD IS THE SAME BUTTON (Fady 2026-08-27, his round 3: the ghost "looked
   like it did not belong"). Shared shape, height, radius, border weight, type size and hover, set
   once on .c-btns button, .c-more so they cannot drift; only the fill separates a decision from the
   ghost. The ghost runs the FULL WIDTH under the answers, which is what makes the hierarchy read:
   two answers side by side, then the quieter full-width way in, then the fine print with real air
   under it.
   THE LAW IS UNCHANGED. Refuse and Accept are two children of the same rule with the same flex, so
   they are identical by construction (research/29 A4 and B11, APD v Mediahuis September 2024).
   The ghost is legal because it ADDS the per-purpose layer and never stands in for the reject
   button, which is on layer one at full strength. */
.c-btns,.c-more{font:inherit;font-weight:800;font-size:.9375rem;line-height:1.2}
.c-btns{display:flex;gap:10px}
.c-btns button,.c-more{min-height:52px;padding:12px 14px;cursor:pointer;border:2px solid var(--ink);border-radius:var(--r-btn);font:inherit;font-weight:800;font-size:.9375rem;line-height:1.2;transition:background-color .16s ease,color .16s ease,border-color .16s ease}
.c-btns button{flex:1;background:var(--ink);color:#fff}
.c-more{display:block;width:100%;margin:10px 0 0;background:transparent;color:var(--ink)}
/* HOVER IS A DARKER NAVY, NOT YELLOW, AND IT ONLY EXISTS WHERE A REAL POINTER DOES.
   Fady reported the answer button showing yellow on a fresh incognito load and only turning navy
   after switching layers. Both halves of that are the yellow hover: the resting fill has been navy
   since round 5, the ONLY yellow rule left was :hover, and a browser does not re-evaluate hover
   when innerHTML is replaced until the pointer moves again, which is exactly why toggling the
   layers "fixed" it. On a touchscreen the same rule sticks to whatever was last tapped, the defect
   .servlist already carries a comment about.
   So: --ink-press, the darker navy, following the same convention the red CTA already uses
   (--cta / --cta-press), and every hover wrapped in (hover:hover). :focus-visible stays outside it,
   because keyboard focus is real on any device, and it gets the darker fill plus the global teal
   ring. */
@media (hover:hover){
  .c-btns button:hover{background:var(--ink-press);border-color:var(--ink-press);color:#fff}
  .c-more:hover{background:var(--ink);border-color:var(--ink);color:#fff}
}
.c-btns button:focus-visible{background:var(--ink-press);border-color:var(--ink-press);color:#fff}
.c-more:focus-visible{background:var(--ink);border-color:var(--ink);color:#fff}
.c-btns button:active{background:var(--ink-press);border-color:var(--ink-press);color:#fff}
.c-more:active{background:var(--ink);border-color:var(--ink);color:#fff}
/* Yellow answers on phones were tried on 2026-08-27 (round 4) and dropped the same evening: Fady
   prefers the navy, at every width. Do not reintroduce a width-dependent fill here without keeping
   both answers on this one selector. */
@media (prefers-reduced-motion:reduce){.c-btns button,.c-more{transition:none}}
/* .consent .c-fine, NOT .c-fine: the fine print is a <p>, so ".consent p" (one class plus one type)
   outranks a lone class and was silently winning the margin. It has had NO gap above it and a stray
   16px below it since the card was built; Fady spotted the missing gap on 2026-08-27 round 3. */
.consent .c-fine{font-size:.8125rem;line-height:1.45;color:var(--muted);margin:18px 0 0}
.c-fine a{color:var(--ink);font-weight:600}
/* LAYER ONE IS A SHORT SHEET NOW (2026-09-16, research/35). The old first layer carried the mark,
   the title, a four-line paragraph, the two answers, a full-width "Choisir" button and three lines
   of fine print: 502px on a 375px phone, sitting on top of the one button that makes the phone ring.
   It carries the same information in a quarter of the height: mark and title on one row, ONE
   sentence that names the controller, the two equal answers, then one line with "Choisir" and the
   cookies link. The fine print moved to layer two, where the visitor is reading rather than glancing.
   THE LAW IS UNTOUCHED. Refuse and Accept are still two children of one selector, side by side, same
   fill, same border, same height (research/29 A4 and B11, APD v Mediahuis September 2024). "Choisir"
   is quieter than both, it still ADDS the per-purpose layer and never stands in for the reject
   button, and it keeps a 36px hit area on a 13px label. */
.c-head{display:block}
.consent .c-links{display:flex;flex-wrap:wrap;align-items:center;gap:2px 18px;margin:10px 0 0;font-size:.875rem}
.c-pick,.c-all{display:inline-flex;align-items:center;min-height:36px;font:inherit;font-weight:700;color:var(--ink);text-decoration:underline;text-decoration-thickness:2px;text-underline-offset:3px}
.c-pick{background:none;border:0;padding:0;cursor:pointer}
@media (hover:hover){.c-pick:hover,.c-all:hover{color:var(--cta)}}
/* THE PHONE NUMBERS ARE MEASURED, NOT FELT, AND THE NOTCH IS PART OF THE SUM. On a 375x812 screen
   the hero call button ends at y599 and the card is anchored 12px off the bottom, so on a flat
   viewport anything over about 200px starts eating the button. But the page ships
   viewport-fit=cover, so on an iPhone env(safe-area-inset-bottom) is 34px and the card rises by
   that much: the real budget is 812 - 34 - 12 - 599 = 167px, and the card is built to 160.
   That is why every value below is small: the 48px answers, the mark and the two-line sentence are
   fixed, so the 16px had to come out of the paddings, the gaps and the links row. */
@media (max-width:999.98px){
  .c-one .c-body{padding:9px 14px 9px}
  .c-one .c-head{display:flex;align-items:center;gap:8px}
  .c-one .c-logo{height:16px;margin:0;flex:none}
  .c-one h2{font-size:.875rem;line-height:1.15}
  .c-one .c-rule{display:none}
  .c-one p{font-size:.8125rem;line-height:1.33;margin:4px 0 0}
  .c-one .c-btns{margin-top:8px}
  .c-one .c-btns button{min-height:48px;font-size:.875rem;padding:10px 8px;white-space:nowrap}
  .c-one .c-links{margin-top:0;font-size:.8125rem;gap:2px 16px}
  .c-one .c-pick,.c-one .c-all{min-height:26px}
}
/* layer two: one row per purpose, both switches OFF on a first visit (no pre-ticked anything,
   Planet49 C-673/17). On a reopen they show what is actually stored, which is a readout of the
   visitor's own decision, not a pre-tick. */
.c-sw{list-style:none;margin:0 0 16px;padding:0;display:grid;gap:10px}
.c-sw li{background:var(--paper);border-radius:var(--r-img);padding:10px 14px 12px}
.c-lab{display:flex;align-items:center;justify-content:space-between;gap:14px;min-height:44px;cursor:pointer}
.c-lt{font-weight:900;font-size:1rem;color:var(--ink);letter-spacing:var(--track-title)}
.c-sw p{font-size:.8125rem;line-height:1.45;color:var(--muted);margin:2px 0 0}
.c-tog{appearance:none;-webkit-appearance:none;position:relative;flex:none;width:52px;height:30px;margin:0;cursor:pointer;background:#fff;border:2px solid var(--ink);border-radius:999px;transition:background-color .18s ease,border-color .18s ease}
.c-tog::after{content:"";position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;background:var(--ink);transition:transform .18s ease,background-color .18s ease}
.c-tog:checked{background:var(--teal);border-color:var(--teal)}
.c-tog:checked::after{background:#fff;transform:translateX(22px)}
@media (prefers-reduced-motion:reduce){.c-tog,.c-tog::after{transition:none}}
`;

// THE CSS INTEGRITY CHECK. A stray "*/" or one unbalanced brace does not break the build and does
// not look wrong in the file: the browser's parser gives up at that point and silently drops EVERY
// RULE AFTER IT. On 2026-08-27 a rewritten comment left one line of prose outside its /* */ and the
// FAQ, the sticky call bar, the guarantee badge, the final call and the footer all shipped unstyled
// to the live site. A DOM measurement caught it; the build had said "site-v1 built". Now it cannot.
{
  let bare = "", i = 0, unclosed = false;
  while (i < css.length) {
    const a = css.indexOf("/*", i);
    if (a < 0) { bare += css.slice(i); break; }
    bare += css.slice(i, a);
    const b = css.indexOf("*/", a + 2);
    if (b < 0) { unclosed = true; break; }
    i = b + 2;
  }
  if (unclosed) throw new Error("styles.css: a /* comment that is never closed.");
  if (bare.includes("*/")) throw new Error("styles.css: a */ that closes nothing. Every rule after it is dropped by the browser.");
  let open = 0, close = 0;
  for (const ch of bare) { if (ch === "{") open++; else if (ch === "}") close++; }
  if (open !== close) throw new Error(`styles.css: ${open} opening braces against ${close} closing. Everything after the mismatch is dropped by the browser.`);
}

// THE COMMENTS DO NOT SHIP (design/05 section C14, checked 2026-08-28). styles.css is INLINED into
// every page, and it carries long explanations of why each rule is the way it is: 76KB of CSS in
// the page against a 25KB budget, and about two thirds of it was prose no visitor will ever read.
// It belongs in the SOURCE, where the next person to edit a rule needs it, not in the delivered
// bytes.  is the comment-stripped text the integrity check above already had to build, so
// this reuses that one parse rather than running a second, differently-wrong stripper over the
// file. Blank runs are collapsed; nothing inside a rule is touched.
{
  let bare = "", i = 0;
  while (i < css.length) {
    const a = css.indexOf("/*", i);
    if (a < 0) { bare += css.slice(i); break; }
    bare += css.slice(i, a);
    i = css.indexOf("*/", a + 2) + 2;
  }
  const shipped = bare.split(String.fromCharCode(10)).map(function(l){return l.replace(/[ 	]+$/, "")}).filter(function(l,n,arr){return l !== "" || (arr[n-1]||"") !== ""}).join(String.fromCharCode(10));
  if (shipped.length > css.length) throw new Error("styles.css: the comment strip grew the file, which means it went wrong.");
  if (shipped.indexOf("{") < 0) throw new Error("styles.css: the comment strip left no rules.");
  css = shipped;
}

const LEGAL_PATH = { fr: '/fr/confidentialite', nl: '/nl/privacy', en: '/en/privacy' }; // declared here, above the consent card, which links to it (research/29 B1)
// THE SCRIPT URL CARRIES A CONTENT HASH (2026-08-27). Cloudflare caches /assets/js/consent.js
// at the edge for an hour and the browser for four, so a deploy that changes the banner would keep
// serving the OLD card to real visitors, and to our own verification, long after the HTML is new.
// The URL now ends in a hash of the file itself, so ANY change to the banner is live the second
// the deploy is, and a change that does not touch stored consent needs no CONSENT_VER bump.
// consent.js: written only with a tag id (same proven machinery as v2, research/13). One gtag.js
// loader serves both destinations: the Ads tag (conversions) and the GA4 property (traffic).
// LAYER TWO HAS NO "REFUSE ALL" since Fady's round 3 (2026-08-27), and that is safe: the reject
// button the APD requires has to sit on the FIRST layer beside accept, at equal prominence, and it
// does. Both switches are off until the visitor turns them on, so Save with nothing ticked IS a
// refusal and runs the same wipe; Back returns to the pair in one tap. research/29 B2 suggested
// keeping a second Refuse here, which was a belt-and-braces preference, not the requirement.
// TWO LAYERS since 2026-08-27 (research/29 B2): layer one is the simple pair of equal buttons,
// layer two splits the choice by purpose, which the Belgian APD asks for. pd_consent therefore
// carries {ads, analytics} and CONSENT_VER was bumped, so every record written by the one-button
// version is invalidated and the question is asked again. Nothing is granted that was not ticked:
// ad_storage and ad_user_data ride `ads`, analytics_storage rides `analytics`, ad_personalization
// is granted in NO branch, ever, which is what keeps "no profiling, no retargeting" true.
if (TAG_ON) {
  // The call-tracking config line, emitted only when the label exists (see ADS_PHONE_LABEL above).
  // It sits inside the consent-granted branch, right after the Ads tag's own config, so nothing
  // about it runs before Accept.
  const PHONE_CFG = (ADS_TAG_ID && ADS_PHONE_LABEL)
    ? `\nif(ID&&addAds)gtag('config',ID+'/'+${JSON.stringify(ADS_PHONE_LABEL)},{'phone_conversion_number':${JSON.stringify(ADS_PHONE_NUMBER)}});`
    : '';
  const STR = {};
  for (const [l] of T.LANGS) STR[l] = {
    t: COPY[l].consentT, p: COPY[l].consentP, refuse: COPY[l].consentRefuse, accept: COPY[l].consentAccept,
    choose: COPY[l].consentChoose, fine: COPY[l].consentFine, more: COPY[l].consentMore, href: LEGAL_PATH[l],
    t2: COPY[l].consentT2, p2: COPY[l].consentP2, sw: COPY[l].consentSw,
    save: COPY[l].consentSave, back: COPY[l].consentBack,
  };
  // 2026-10-08 (research/67). Three build-time switches inside consent.js, all '' or unchanged in the
  // basic variant so its output stays byte for byte: (1) advanced: `loaded` starts true, because the
  // loader is already in the head, so a tap is sent before any answer; (2) advanced: Accept only
  // updates consent, adds the number-swap config and, on the analytics Accept only, the one GA4 config;
  // it never loads gtag.js again or re-sends the Ads config (the head did); (3) advanced: the Ads
  // conversion on a tap no longer waits for state.ads, Google sends it cookieless while denied.
  // In BOTH variants a cta that starts with "review" sends the GA4 event but never an Ads conversion:
  // the review button (template.js) is not a lead, and whatsapp_click is a PRIMARY Ads conversion.
  // 2026-10-16: wipe() also clears gwcc on an ads refusal, the cookie Google's call-tracking help names
  // (support.google.com/google-ads/answer/6095883, which does not say what it stores), listed on the
  // privacy page. Google can write its cookies on a parent domain (on the preview, .pages.dev level), so
  // wipe() tries the host and every parent domain down to, not including, the bare suffix ("be", "dev").
  const consentJs = `// Generated by design/site-source/build.js. Do not edit here.
(function(){
var ID=${JSON.stringify(ADS_TAG_ID)},GA=${JSON.stringify(GA4_ID)},CALL=${JSON.stringify(ADS_CALL_LABEL)},WA=${JSON.stringify(ADS_WA_LABEL)};
var KEY='pd_consent',VER=${JSON.stringify(CONSENT_VER)},DAYS=${CONSENT_DAYS};
var STR=${JSON.stringify(STR)};
var s=STR[(document.documentElement.lang||'fr').slice(0,2)]||STR.fr;
function read(){try{var r=JSON.parse(localStorage.getItem(KEY));if(!r||r.v!==VER)return null;if(Date.now()-r.t>DAYS*864e5){localStorage.removeItem(KEY);return null}return r}catch(e){return null}}
function save(c){try{localStorage.setItem(KEY,JSON.stringify({ads:!!c.ads,analytics:!!c.analytics,v:VER,t:Date.now()}))}catch(e){}}
var loaded=${ADVANCED ? 'true' : 'false'},state={ads:false,analytics:false};
function enable(c){
var was={ads:state.ads,analytics:state.analytics};
state.ads=!!c.ads;state.analytics=!!c.analytics;
if(loaded){var d={};
if(!state.ads&&was.ads){d.ad_storage='denied';d.ad_user_data='denied'}
if(!state.analytics&&was.analytics){d.analytics_storage='denied'}
if(d.ad_storage||d.analytics_storage)gtag('consent','update',d);}
var addAds=state.ads&&!was.ads,addAn=state.analytics&&!was.analytics;
if(!addAds&&!addAn)return;
var u={};if(addAds){u.ad_storage='granted';u.ad_user_data='granted'}if(addAn){u.analytics_storage='granted'}
gtag('consent','update',u);${ADVANCED ? `${PHONE_CFG}
if(GA&&addAn)gtag('config',GA);` : `
var lid=state.ads&&ID?ID:(state.analytics&&GA?GA:null);if(!lid)return;
if(!loaded){loaded=true;
var sc=document.createElement('script');sc.async=true;sc.src='https://www.googletagmanager.com/gtag/js?id='+lid;document.head.appendChild(sc);
gtag('js',new Date());}
if(ID&&addAds)gtag('config',ID);${PHONE_CFG}
if(GA&&addAn)gtag('config',GA);`}}
function wipe(c){var h=location.hostname.split('.'),ds=[''];
for(var i=0;i<h.length-1;i++){var p=h.slice(i).join('.');ds.push('domain='+p+';','domain=.'+p+';')}
document.cookie.split(';').forEach(function(k){var n=k.split('=')[0].trim();
if(!((/^(_gcl|gwcc)/.test(n)&&!c.ads)||(/^_ga/.test(n)&&!c.analytics)))return;
ds.forEach(function(d){document.cookie=n+'=;path=/;'+d+'expires=Thu, 01 Jan 1970 00:00:00 GMT';});});}
function stored(){var r=read();return{ads:!!(r&&r.ads),analytics:!!(r&&r.analytics)}}
var card=null,dim=null,opener=null,layer=1,pend={ads:false,analytics:false};
function close(){if(dim){dim.remove();dim=null}if(!card)return;card.remove();card=null;layer=1;if(opener&&document.contains(opener)){opener.focus()}opener=null}
function esc(e){if(e.key==='Escape'&&card&&opener){close()}}
function fine(){return '<p class="c-fine">'+s.fine+' <a href="'+s.href+'">'+s.more+'</a></p>'}
function paint(){
card.setAttribute('aria-label',layer===1?s.t:s.t2);
if(dim)dim.className=layer===2?'c-dim c-dim-2':'c-dim';
card.className='consent '+(layer===2?'c-mid':'c-one');
card.innerHTML='<span class="c-ring" aria-hidden="true"></span><div class="c-body">'+(layer===1
?'<div class="c-head"><img class="c-logo" src="/assets/img/logo-icon.svg" alt="" width="816" height="499"><h2>'+s.t+'</h2></div><hr class="c-rule"><p>'+s.p+'</p><div class="c-btns"><button type="button" data-c="no">'+s.refuse+'</button><button type="button" data-c="yes">'+s.accept+'</button></div><div class="c-links"><button type="button" class="c-pick" data-c="more">'+s.choose+'</button><a class="c-all" href="'+s.href+'">'+s.more+'</a></div>'
:'<h2>'+s.t2+'</h2><hr class="c-rule"><p>'+s.p2+'</p><ul class="c-sw">'+s.sw.map(function(x,i){var k=i===0?'analytics':'ads';
return '<li><label class="c-lab"><span class="c-lt">'+x[0]+'</span><input type="checkbox" class="c-tog" data-p="'+k+'"'+(pend[k]?' checked':'')+'></label><p>'+x[1]+'</p></li>'}).join('')
+'</ul><div class="c-btns"><button type="button" data-c="save">'+s.save+'</button></div><button type="button" class="c-more" data-c="back">'+s.back+'</button>'+fine())+'</div>'}
function apply(c){save(c);close();wipe(c);enable(c)}
function show(focus){if(card)return;
dim=document.createElement('div');dim.className='c-dim';document.body.appendChild(dim);
card=document.createElement('div');card.className='consent';card.setAttribute('role','dialog');card.setAttribute('tabindex','-1');
layer=1;pend=stored();paint();
card.addEventListener('click',function(e){var b=e.target.closest('button[data-c]');if(!b)return;var v=b.getAttribute('data-c');
if(v==='more'||v==='back'){layer=v==='more'?2:1;if(layer===2){pend=stored()}paint();card.focus();return}
if(v==='save'){var g=function(k){var el=card.querySelector('[data-p="'+k+'"]');return !!(el&&el.checked)};apply({ads:g('ads'),analytics:g('analytics')});return}
apply({ads:v==='yes',analytics:v==='yes'})});
document.body.appendChild(card);
if(focus){card.focus()}}
document.addEventListener('keydown',esc);
document.addEventListener('click',function(e){
var o=e.target.closest('[data-consent-open]');
if(o){opener=o;show(true);return}
var a=e.target.closest('a[data-cta]');if(!a||!loaded)return;
var isWa=a.dataset.cta.indexOf('whatsapp')>-1;
gtag('event',isWa?'whatsapp_click':'call_click',{cta:a.dataset.cta});
var lb=a.dataset.cta.indexOf('review')===0?'':(isWa?WA:CALL);if(ID&&lb${ADVANCED ? '' : '&&state.ads'})gtag('event','conversion',{send_to:ID+'/'+lb});
});
var r=read();if(!r)show(false);else enable(r);
})();
`;
  w('assets/js/consent.js', consentJs);
  CONSENT_HASH = require('crypto').createHash('sha256').update(consentJs).digest('hex').slice(0, 10);
}

// images: manifest key -> exported sizes in assets/prepared/web/img/
const IMGS = {
  'collage-van.webp':   { base: 'hero-van-wide', widths: [800, 1200, 1600], w: 1600, h: 900, sizes: '(min-width: 820px) 440px, 100vw' },
  'collage-job1.webp':  { base: 'hero-job-1', widths: [480, 800], w: 800, h: 1000, sizes: '(min-width: 820px) 200px, 78vw' },
  'collage-job2.webp':  { base: 'hero-job-2', widths: [480, 770], w: 770, h: 962, sizes: '(min-width: 820px) 200px, 78vw' },
  'job-wc.webp':     { base: 'job-wc', widths: [480, 800, 1200], w: 1200, h: 1500, sizes: '(min-width: 1000px) 360px, (min-width: 700px) 33vw, 78vw' },
  'machine.webp':    { base: 'machine-haute-pression', widths: [480, 800, 1200], w: 1200, h: 1500, sizes: '(min-width: 1000px) 360px, (min-width: 700px) 33vw, 78vw' },
  'camera.webp':     { base: 'camera-ecran', widths: [480, 800, 1200], w: 1200, h: 1500, sizes: '(min-width: 1000px) 360px, (min-width: 700px) 33vw, 78vw' },
  'chambre.webp':    { base: 'chambre-visite-jardin', widths: [480, 800], w: 800, h: 1000, sizes: '(min-width: 1000px) 360px, (min-width: 700px) 33vw, 78vw' },
  'siphon.webp':     { base: 'camera-siphon', widths: [480, 800], w: 800, h: 1000, sizes: '(min-width: 820px) 200px, 78vw' },
  'allee.webp':      { base: 'allee-haute-pression', widths: [480, 800, 1200], w: 1200, h: 1200, sizes: '(min-width: 1000px) 360px, (min-width: 700px) 33vw, 78vw' },
  'moniteur.webp':   { base: 'camera-moniteur-tenue', widths: [480, 800], w: 800, h: 1000, sizes: '(min-width: 1000px) 360px, (min-width: 700px) 33vw, 78vw' },
  'tick-drain.webp': { base: 'hero-job-drain', widths: [480, 800], w: 800, h: 1066, sizes: '190px' },
  // The real van, shot at sunrise in the depot car park (Roro, 2026-08-28). It replaces the
  // generated street scene, which carried a printed phone number the van does not have.
  'tick-van.webp':   { base: 'van-sunrise', widths: [480, 800, 1200], w: 1200, h: 675, sizes: '444px' },
  'car-van.webp':    { base: 'van-garden-45', widths: [480, 800], w: 800, h: 1000, sizes: '78vw' },
  // The who-comes photo. A TALL 4:5 frame ON PURPOSE (2026-08-28): the panel is cropped by
  // object-fit from the middle of it, so the column can take whatever height the words beside it
  // end up with and the van still sits whole in the frame at every viewport. Never swap this for a
  // landscape crop, or a tall panel would cut the van's nose and roof.
  'van-sunrise-tall.webp': { base: 'van-sunrise-tall', widths: [480, 800, 1200], w: 1200, h: 1500, sizes: '(min-width: 56rem) 620px, 100vw' },
  // Afrim's portrait in the who-comes chat bubble. Since 2026-08-29 it is his own unretouched
  // photo (`assets/raw/afrim-portrait-real.jpg`), squared and nothing else, under the -3 name
  // because the -2 URLs were already warm on the Cloudflare edge. It renders round at 52 to 70
  // CSS px, so the widths are the 1x, 2x and 3x of that and nothing bigger; the square is centred
  // on his face because a circular mask keeps only the middle.
  'afrim-avatar-3.webp': { base: 'afrim-avatar-3', widths: [96, 192, 384], w: 384, h: 384, sizes: '70px' },
  'ba-before.webp':  { base: 'ba-before', widths: [480, 800], w: 800, h: 1000, sizes: '(min-width: 56rem) 340px, 92vw' },
  'ba-after.webp':   { base: 'ba-after', widths: [480, 800], w: 800, h: 1000, sizes: '(min-width: 56rem) 340px, 92vw' },
  // Fady's brush arrows, drawn in Figma and exported 2026-08-26. alpha:true swaps the JPEG
  // fallback for a PNG, because a JPEG has no transparency and would ship a white box.
  'arrow-curve.png': { base: 'arrow-curve', widths: [273], w: 273, h: 185, sizes: '(min-width: 56rem) 10vw, 24vw', alpha: true },
  'arrow-zig.png':   { base: 'arrow-zig', widths: [267], w: 267, h: 138, sizes: '(min-width: 56rem) 10vw, 24vw', alpha: true },
  'arrow-hook.png':  { base: 'arrow-hook', widths: [157], w: 157, h: 271, sizes: '(min-width: 56rem) 6vw, 15vw', alpha: true },
};
for (const k in IMGS) {
  const m = IMGS[k];
  for (const wd of m.widths) for (const ext of ['avif', 'webp']) cp(path.join(WEB, 'img', `${m.base}-${wd}.${ext}`), path.join(OUT, 'assets', 'img', `${m.base}-${wd}.${ext}`));
  const last = m.widths[m.widths.length - 1];
  const fb = m.alpha ? 'png' : 'jpg';
  cp(path.join(WEB, 'img', `${m.base}-${last}.${fb}`), path.join(OUT, 'assets', 'img', `${m.base}-${last}.${fb}`));
}
for (const f of ['logo-icon.svg', 'og-banner-van-2.jpg', 'icon-512.png', 'icon-512-maskable.png']) cp(path.join(WEB, 'img', f), path.join(OUT, 'assets', 'img', f));
cp(path.join(WEB, 'img', 'favicon.svg'), path.join(OUT, 'favicon.svg'));
cp(path.join(WEB, 'img', 'apple-touch-icon-180.png'), path.join(OUT, 'apple-touch-icon.png'));

function IMG(name, alt, w0, h0, extra) {
  if (name === 'logo-icon.svg') return `<img src="/assets/img/logo-icon.svg" width="816" height="499" alt="${alt}"${extra ? ' ' + extra : ''}>`;
  const m = IMGS[name]; if (!m) throw new Error('unknown image ' + name);
  const set = ext => m.widths.map(wd => `/assets/img/${m.base}-${wd}.${ext} ${wd}w`).join(', ');
  const last = m.widths[m.widths.length - 1];
  return `<picture><source type="image/avif" srcset="${set('avif')}" sizes="${m.sizes}"><source type="image/webp" srcset="${set('webp')}" sizes="${m.sizes}"><img src="/assets/img/${m.base}-${last}.${m.alpha ? 'png' : 'jpg'}" width="${m.w}" height="${m.h}" alt="${alt}"${extra ? ' ' + extra : ''}></picture>`;
}

// ---------- head ----------
// opts.bare (2026-10-08): the root language chooser and the 404 carry no consent card and no consent.js,
// so the advanced variant never loads Google there either: the tag only runs on a page where the visitor
// can also answer the card and reach the "Cookies et mesure" link. Basic output is unaffected.
function head(lang, paths, m, opts = {}) {
  const self = paths[lang];
  const alts = Object.entries(paths).map(([l, p]) => `<link rel="alternate" hreflang="${l}-BE" href="${HOST}${p}">`).join('\n');
  return `<!DOCTYPE html>
<!-- Generated by design/site-source/build.js. Do not edit by hand: edit the sources in design/site-source/ and rebuild. -->
<html lang="${lang}-BE" class="no-js">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<meta name="format-detection" content="telephone=no">
<script>document.documentElement.classList.remove('no-js');document.documentElement.classList.add('js');${TAG_ON ? `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments)}gtag('consent','default',{ad_storage:'denied',ad_user_data:'denied',ad_personalization:'denied',analytics_storage:'denied',wait_for_update:500});` : ''}${opts.bare ? '' : HEAD_ADV}</script>${opts.bare ? '' : HEAD_ADV_LOADER}
<title>${m.title}</title>
<meta name="description" content="${m.desc}">
<link rel="canonical" href="${HOST}${self}">
${alts}
<link rel="alternate" hreflang="x-default" href="${HOST}${paths.fr}">
<meta name="robots" content="${opts.noindex ? 'noindex, follow' : 'index, follow'}">
<meta name="theme-color" content="#102A4A">
<meta property="og:type" content="website">
<meta property="og:locale" content="${m.locale}">
<meta property="og:url" content="${HOST}${self}">
<meta property="og:site_name" content="Pro Débouchage">
<meta property="og:title" content="${m.ogt}">
<meta property="og:description" content="${m.ogd}">
<meta property="og:image" content="${HOST}/assets/img/og-banner-van-2.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="${m.ogAlt}">
<meta name="twitter:card" content="summary_large_image">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<link rel="icon" href="/apple-touch-icon.png" type="image/png" sizes="180x180">
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<link rel="preload" as="font" type="font/woff2" href="/assets/fonts/archivo-var-latin.woff2" crossorigin>
<style>${css}</style>
</head>
<body>
`;
}

const TAIL = (extra = '') => `
<script>${T.PAGE_JS}</script>${TAG_ON ? `
<script src="/assets/js/consent.js?v=${CONSENT_HASH}" defer></script>` : ''}${extra}
</body>
</html>
`;

// ---------- JSON-LD ----------
const strip = s => s.replace(/ /g, ' ').replace(/&#8239;/g, ' ').replace(/<[^>]+>/g, '');
// `v` is a per-problem variant (see VARIANTS below) or nothing at all for the three main pages. It
// only ever moves the page's own address and adds the page's own description; the business it
// describes is the same business, so `name` stays the company's name and never becomes a page title.
function jsonld(c, lang, v) {
  const self = v ? v.paths[lang] : '/' + lang + '/';
  const towns = c.towns.map(t => ({ '@type': 'City', name: t }));
  const faq = c.faq.map(q => ({ '@type': 'Question', name: strip(q[0]), acceptedAnswer: { '@type': 'Answer', text: strip(q[1]) } }));
  const data = { '@context': 'https://schema.org', '@graph': [
    { '@type': ['Plumber', 'EmergencyService'], '@id': HOST + '/#business', name: 'Pro Débouchage', legalName: 'PRO DEBOUCHAGE SRL', url: HOST + self, ...(v ? { description: strip(c.meta.desc) } : {}), telephone: '+32480649649', email: 'info@prodebouchage24.be',
      image: HOST + '/assets/img/og-banner-van-2.jpg', identifier: '1027.454.187', priceRange: '€€', currenciesAccepted: 'EUR',
      address: { '@type': 'PostalAddress', streetAddress: 'Guldenschaapstraat 6', postalCode: '1800', addressLocality: 'Vilvoorde', addressCountry: 'BE' },
      openingHoursSpecification: [{ '@type': 'OpeningHoursSpecification', dayOfWeek: ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'], opens: '00:00', closes: '23:59' }],
      areaServed: towns,
      availableLanguage: [{ '@type': 'Language', name: 'French', alternateName: 'fr' }, { '@type': 'Language', name: 'Dutch', alternateName: 'nl' }, { '@type': 'Language', name: 'English', alternateName: 'en' }],
      // MINIMUMS, NOT PRICES (Roro's walkthrough, 2026-08-27). The page stopped claiming fixed
      // amounts the day the rows became "à partir de", and the schema has to say the same thing or
      // it contradicts the page it describes. Offer.price would assert a fixed amount; a
      // PriceSpecification with minPrice asserts a floor, which is what we actually promise.
      // Parsed from the same copy the rows render, so the two can never drift apart.
      makesOffer: c.prices.map(p => ({ '@type': 'Offer', itemOffered: { '@type': 'Service', name: strip(p[0]) },
        priceSpecification: { '@type': 'PriceSpecification', minPrice: Number(String(p[1]).replace(/[^0-9]/g, '')), priceCurrency: 'EUR', valueAddedTaxIncluded: true } })) },
    { '@type': 'FAQPage', '@id': HOST + self + '#faq', inLanguage: lang + '-BE', mainEntity: faq },
  ] };
  return `<script type="application/ld+json">\n${JSON.stringify(data, null, 1)}\n</script>`;
}

// ---------- pages ----------
const LANDING = {}; for (const [l] of T.LANGS) LANDING[l] = '/' + l + '/';
const CGV_PATH = { fr: '/fr/conditions-generales', nl: '/nl/algemene-voorwaarden', en: '/en/terms' };
// langHref is only ever passed for a per-problem page, where the language switch and the footer's
// language links point at the SAME problem in the other language instead of at the generic landing
// page. English has no variant (DECISIONS 2026-08-26), so it falls through to /en/ inside the
// template. Passing nothing, which is what every other page does, leaves the markup untouched.
const shell = (c, lang, langHref, footProblems) => T.pageHtml(c, { img: IMG, privacyHref: LEGAL_PATH[lang], cgvHref: CGV_PATH[lang], adsTag: TAG_ON, ...(langHref ? { langHref } : {}), ...(footProblems ? { footProblems } : {}) });
// THE FOOTER'S PER-PROBLEM ROW (2026-09-18, fixes the six per-problem pages being orphans: nothing
// on the site linked to them, only the sitemap and the ads, and Google had indexed zero pages).
// Built straight off the LANGUAGE'S OWN `variants` list in the copy file, never off VARIANT_PAGES
// below (which only exists once every main page has already been built), so a language with no
// variants (English) gets nothing back, and a variant added to a copy file appears in the row with
// no change here. `c` is post-variantCopy when called for a per-problem page, but variantCopy never
// touches `variants` or `footProbH`, so both are always the language's real, complete list.
function footProblemsFor(c, lang, currentSlug) {
  const list = c.variants || [];
  if (!list.length) return null;
  return { label: c.footProbH, links: list.map(x => ({ href: '/' + lang + '/' + x.slug + '/', label: x.footLabel, current: x.slug === currentSlug })) };
}
// PER PROBLEM PAGES (2026-09-17, DECISIONS 2026-09-16). Google was scoring the one landing page
// "below average" for landing page experience on most keywords, because one generic page had to
// answer every search. So the SAME page is generated once per problem with six strings swapped and
// its own service row lifted to the top of the list; nothing else about it changes, which is the
// whole point: the consent card, the prices, the scam band, the FAQ, the footer and the call bar are
// the landing page byte for byte, and one edit to the page still reaches all nine pages at once.
// The three main pages must come out of this IDENTICAL to what they were, so every variant branch
// below is guarded by `v` and the main call passes nothing.
function variantCopy(c, v) {
  const i = c.services.findIndex(s => s[0] === v.serv);
  if (i < 0) throw new Error(`copy-${c.dir}.js: the variant "${v.slug}" points at a service "${v.serv}" that is not in the services list. It has to repeat the row's title character for character.`);
  return { ...c,
    eyebrow: v.eyebrow, h1: v.h1, h1b: v.h1b || c.h1b, sub: v.sub,
    // 2026-10-08 (NOW.md, research/67): the page's own WhatsApp text (copy files, variants[].wa), used
    // by every WhatsApp button and the call bar of THIS page; without one it falls back to c.wa.
    wa: v.wa || c.wa,
    // the matching row first, everybody else in the order they were already in
    services: [c.services[i], ...c.services.filter((_, n) => n !== i)],
    meta: { ...c.meta, title: v.title, desc: v.desc } };
}
function landing(c, lang, v) {
  if (v) c = variantCopy(c, v);
  const { body } = shell(c, lang, v ? v.paths : undefined, footProblemsFor(c, lang, v ? v.slug : null));
  // THE SHARE CARD LEADS ON THE NAME, the <title> tag does not (Fady 2026-08-27). A page title is
  // written for a search result, where the brand can come last; a WhatsApp card is written for
  // someone a person they know just sent a link to, and it has to say WHOSE link it is first. So
  // og:title is meta.ogTitle (name, then service, then zone) and <title> is untouched. meta.ogt,
  // the pain headline, is no longer used as a share title: it reads as a complaint out of context.
  return head(lang, v ? v.paths : LANDING, { ...c.meta, ogt: c.meta.ogTitle || c.meta.title }) + body + '\n' + jsonld(c, lang, v) + TAIL();
}
for (const [l] of T.LANGS) { const file = l + '/index.html', html = landing(COPY[l], l); w(file, html); URL_FILE[LANDING[l]] = file; PAGE_HTML[LANDING[l]] = html; }

// THE VARIANT TABLE. The strings live in copy-fr.js and copy-nl.js, next to the hero strings they
// replace (AGENTS.md section 4: the copy the customer reads has one owner and it is the copy file).
// What lives HERE is the pairing: a French page and its Dutch twin are ONE variant in two languages,
// joined by `key`, and that pairing is what the canonical, the hreflang set and the sitemap are built
// from. A variant that loses its twin throws, because FR and NL ship together (AGENTS.md section 6),
// and an English one throws too: there are no English ads, so there is no English variant
// (DECISIONS 2026-08-26).
const VARIANTS = {};
for (const [l] of T.LANGS) for (const v of (COPY[l].variants || [])) (VARIANTS[v.key] = VARIANTS[v.key] || {})[l] = v;
const VARIANT_PAGES = [];
for (const [key, pair] of Object.entries(VARIANTS)) {
  if (pair.en) throw new Error(`variant "${key}" has an English page. There are no English ads, so there are no English variants (DECISIONS 2026-08-26).`);
  if (!pair.fr || !pair.nl) throw new Error(`variant "${key}" exists in ${Object.keys(pair).join(' and ')} only. Every variant ships French and Dutch together (AGENTS.md section 6).`);
  const paths = { fr: '/fr/' + pair.fr.slug + '/', nl: '/nl/' + pair.nl.slug + '/' };
  for (const l of ['fr', 'nl']) VARIANT_PAGES.push({ lang: l, path: paths[l], v: { ...pair[l], paths } });
}
for (const p of VARIANT_PAGES) { const file = p.path.slice(1) + 'index.html', html = landing(COPY[p.lang], p.lang, p.v); w(file, html); URL_FILE[p.path] = file; PAGE_HTML[p.path] = html; }

// legal + cgv pages: the document <main> under the v3 shell (header, footer, call bar).
function docShell(lang, paths, main, title, desc) {
  const c = COPY[lang];
  const { body } = shell(c, lang);
  // ANCHOR EVERY ONE OF THESE ON ITS OWN CLASS, AND CHECK WHAT CAME BACK. Taking the FIRST footer
  // element in the page gives the reviewer's review-card footer, not the site one, because the featured
  // review card ships a <footer class="feat-who"> above it. The six legal and CGV pages went live
  // on 2026-08-27 carrying a stray review credit where the legal mentions, the enterprise number,
  // the privacy and terms links and the credit line belong; and because the credit line is what
  // carries <span id="y">, the page script threw on its very first statement, so NOTHING ran on
  // those pages and the sticky call bar stayed off screen for good. Found by reading the console
  // on the CGV page. The asserts are the real fix: slicing markup out is fine, slicing it out
  // without checking what you got is what shipped this.
  const grab = (openTag, closeTag, must, what) => {
    const from = body.indexOf(openTag);
    if (from < 0) throw new Error(`docShell: no ${what} (${openTag}) in the landing body.`);
    const to = body.indexOf(closeTag, from);
    if (to < 0) throw new Error(`docShell: the ${what} is never closed by ${closeTag}.`);
    const out = body.slice(from, to + closeTag.length);
    for (const needle of must) if (!out.includes(needle)) throw new Error(`docShell: the ${what} it took has no "${needle}" in it, so it matched the wrong element or was cut short.`);
    return out;
  };
  let header = grab('<header class="site-header"', '</header>', ['langswitch', 'header-call'], 'site header');
  for (const [l, p] of Object.entries(paths)) header = header.replace(`href="/${l}/" lang="${l}"`, `href="${p}" lang="${l}"`);
  const footer = grab('<footer class="site-footer"', '</footer>', ['class="credit"', 'id="y"', 'foot-links'], 'site footer');
  const bar = grab('<div class="callbar"', '</div>', ['cb-call', 'cb-wa'], 'sticky call bar');
  // The share card's title is NOT the <title> tag (Fady 2026-08-27). A page title is written for a
  // search result, where the brand can come last; a WhatsApp card is written for someone who was
  // sent a link by a person they know, and it has to say WHOSE it is first. So og:title leads on
  // the name and then carries the service and the zone, while <title> is left exactly as it was.
  const m = { title, desc, ogt: c.meta.ogTitle || title, ogd: desc, locale: c.meta.locale, ogAlt: c.meta.ogAlt };
  return head(lang, paths, m) + `<a class="skip" href="#contenu">${c.skip}</a>\n` + header + '\n' + main + '\n' + footer + '\n' + bar + TAIL();
}
// privacy (v2 text under the v3 shell; give its <main> the skip-link id)
const LEGAL_FILE = { fr: 'fr/confidentialite.html', nl: 'nl/privacy.html', en: 'en/privacy.html' };
const LEGAL_META = {
  fr: ['Politique de vie privée | Pro Débouchage', 'Politique de vie privée de PRO DEBOUCHAGE SRL. Quelles données nous traitons, pourquoi, combien de temps, et vos droits.'],
  nl: ['Privacybeleid | Pro Débouchage', 'Privacybeleid van PRO DEBOUCHAGE BV. Welke gegevens wij verwerken, waarom, hoelang, en uw rechten.'],
  en: ['Privacy policy | Pro Débouchage', 'Privacy policy of PRO DEBOUCHAGE SRL. What data we handle, why, for how long, and your rights.'],
};
for (const [l] of T.LANGS) {
  // Three tag-day swaps, not one (research/29 B3, B4, B5, B7). The markers are removed in BOTH
  // branches, so a tag-off build can never leak an empty <!--recip--> into the page and can never
  // claim a recipient or a legal basis that does not exist on that build.
  const main = (TAG_ON
    ? LEGAL_TEXT[l].replace(/<!--cookies-->[\s\S]*?<!--\/cookies-->/, LEGAL_TEXT.COOKIES_TAG[l])
        .replace('<!--recip-->', LEGAL_TEXT.RECIP_TAG[l]).replace('<!--basis-->', LEGAL_TEXT.BASIS_TAG[l])
    : LEGAL_TEXT[l].replace('<!--cookies-->\n', '').replace('\n<!--/cookies-->', '')
        .replace('<!--recip-->', '').replace('<!--basis-->', ''))
    .replace('<main>', '<main id="contenu">');
  if (main.includes('<!--recip-->') || main.includes('<!--basis-->')) throw new Error('legal.js: a tag-day marker survived the swap in ' + l);
  const html = docShell(l, LEGAL_PATH, main, LEGAL_META[l][0], LEGAL_META[l][1]);
  w(LEGAL_FILE[l], html); URL_FILE[LEGAL_PATH[l]] = LEGAL_FILE[l]; PAGE_HTML[LEGAL_PATH[l]] = html;
}
// CGV
const CGV_FILE = { fr: 'fr/conditions-generales.html', nl: 'nl/algemene-voorwaarden.html', en: 'en/terms.html' };
const CGV_META = {
  fr: ['Conditions générales | Pro Débouchage', 'Les conditions générales de PRO DEBOUCHAGE SRL : prix confirmé avant de commencer, suppléments annoncés, garantie 30 jours, vos droits.'],
  nl: ['Algemene voorwaarden | Pro Débouchage', 'De algemene voorwaarden van PRO DEBOUCHAGE BV: prijs bevestigd voor wij beginnen, aangekondigde toeslagen, 30 dagen garantie, uw rechten.'],
  en: ['Terms and conditions | Pro Débouchage', 'Terms and conditions of PRO DEBOUCHAGE SRL: price confirmed before we start, published surcharges, 30-day guarantee, your rights.'],
};
for (const [l] of T.LANGS) { const html = docShell(l, CGV_PATH, CGV[l], CGV_META[l][0], CGV_META[l][1]); w(CGV_FILE[l], html); URL_FILE[CGV_PATH[l]] = CGV_FILE[l]; PAGE_HTML[CGV_PATH[l]] = html; }

// root chooser
const CHOOSE = { fr: ['Français', 'Débouchage 24h/24'], nl: ['Nederlands', 'Ontstopping 24/7'], en: ['English', 'Drain unblocking 24/7'] };
const chooserBtns = T.LANGS.map(([l]) => `<a class="btn btn-ghost" href="/${l}/" lang="${l}" hreflang="${l}-BE">${CHOOSE[l][0]} &rarr; ${CHOOSE[l][1]}</a>`).join('\n');
const chooserTitle = T.LANGS.map(([l]) => CHOOSE[l][0]).join(' &middot; ');
w('index.html', head('fr', LANDING, { title: 'Pro Débouchage | ' + chooserTitle.replace(/&middot;/g, '·'), desc: 'Débouchage 24h/24 à Bruxelles et alentours. Choisissez votre langue. Ontstopping 24/7 in en rond Brussel. Kies uw taal. Drain unblocking in and around Brussels, 24/7. 0480 649 649.', ogt: 'Pro Débouchage · Débouchage 24h/24 à Bruxelles et alentours', ogd: 'Débouchage 24h/24 à Bruxelles et alentours. Ontstopping 24/7 in en rond Brussel. Drain unblocking in and around Brussels, 24/7. 0480 649 649.', locale: 'fr_BE', ogAlt: COPY.fr.meta.ogAlt }, { noindex: false, bare: true }) + `
<main class="chooser"><div class="box">
${IMG('logo-icon.svg', 'Pro Débouchage', 320, 200, '')}
<h1 style="font-size:1.5rem">${chooserTitle}</h1>
<p class="lead" style="font-size:1rem">Choisissez votre langue. Kies uw taal. Choose your language.</p>
${chooserBtns}
<p><a class="btn btn-call" href="tel:+32480649649" data-cta="chooser-call">${T.PHONE}0480 649 649</a></p>
<p class="chooser-legal">PRO DEBOUCHAGE SRL, Guldenschaapstraat 6, 1800 Vilvoorde. 1027.454.187.<br>
<a href="mailto:info@prodebouchage24.be">info@prodebouchage24.be</a><br>
<span class="cl-set"><a href="/fr/confidentialite" lang="fr" hreflang="fr-BE">Vie priv&eacute;e</a> <a href="/fr/conditions-generales" lang="fr" hreflang="fr-BE">Conditions g&eacute;n&eacute;rales</a></span>
<span class="cl-set"><a href="/nl/privacy" lang="nl" hreflang="nl-BE">Privacy</a> <a href="/nl/algemene-voorwaarden" lang="nl" hreflang="nl-BE">Algemene voorwaarden</a></span>
<span class="cl-set"><a href="/en/privacy" lang="en" hreflang="en-BE">Privacy</a> <a href="/en/terms" lang="en" hreflang="en-BE">Terms</a></span></p>
</div></main>
<span id="y" hidden>${BUILD_YEAR}</span>
<script>document.getElementById('y').textContent=new Date().getFullYear();</script>
</body>
</html>
`);

// 404, trilingual
const NOTFOUND = {
  fr: [`Cette page n'existe pas.`, 'Mais nous, oui.', 'Appeler 0480 649 649', `Retour à la page d'accueil`],
  nl: ['Deze pagina bestaat niet.', 'Wij wel.', 'Bel 0480 649 649', 'Terug naar de startpagina'],
  en: ['This page does not exist.', 'We do.', 'Call 0480 649 649', 'Back to the home page'],
};
const nf = T.LANGS.map(([l], i) => `${i ? '<hr class="rule" style="margin:24px auto">\n' : ''}<h${i ? 2 : 1} style="font-size:${i ? '1.4rem' : '1.6rem'}" lang="${l}">${NOTFOUND[l][0]}</h${i ? 2 : 1}>
<p class="lead" lang="${l}">${NOTFOUND[l][1]}</p>
<p><a class="btn btn-call" href="tel:+32480649649" data-cta="404-call-${l}" lang="${l}">${T.PHONE}${NOTFOUND[l][2]}</a></p>
<p><a href="/${l}/" lang="${l}">${NOTFOUND[l][3]}</a></p>`).join('\n');
w('404.html', head('fr', LANDING, { title: 'Page introuvable | Pro Débouchage', desc: `Cette page n'existe pas. Appelez le 0480 649 649.`, ogt: 'Pro Débouchage', ogd: 'Débouchage 24h/24 à Bruxelles et alentours.', locale: 'fr_BE', ogAlt: COPY.fr.meta.ogAlt }, { noindex: true, bare: true }) + `
<main class="chooser"><div class="box">
${IMG('logo-icon.svg', 'Pro Débouchage', 320, 200, '')}
${nf}
<p class="chooser-legal">PRO DEBOUCHAGE SRL, Guldenschaapstraat 6, 1800 Vilvoorde. 1027.454.187.<br>
<a href="mailto:info@prodebouchage24.be">info@prodebouchage24.be</a><br>
<span class="cl-set"><a href="/fr/confidentialite" lang="fr" hreflang="fr-BE">Vie priv&eacute;e</a> <a href="/fr/conditions-generales" lang="fr" hreflang="fr-BE">Conditions g&eacute;n&eacute;rales</a></span>
<span class="cl-set"><a href="/nl/privacy" lang="nl" hreflang="nl-BE">Privacy</a> <a href="/nl/algemene-voorwaarden" lang="nl" hreflang="nl-BE">Algemene voorwaarden</a></span>
<span class="cl-set"><a href="/en/privacy" lang="en" hreflang="en-BE">Privacy</a> <a href="/en/terms" lang="en" hreflang="en-BE">Terms</a></span></p>
</div></main>
<span id="y" hidden>${BUILD_YEAR}</span>
<script>document.getElementById('y').textContent=new Date().getFullYear();</script>
</body>
</html>
`);

// static files
w('robots.txt', `# Pro Débouchage, prodebouchage24.be\nUser-agent: *\nAllow: /\n\nSitemap: ${HOST}/sitemap.xml\n`);
// ---------- sitemap lastmod: TRUE per-URL dates (2026-09-18, replacing a hardcoded constant) ----------
// `lastmod.json`, next to this script, stores for every sitemap URL the sha256 of that URL's last
// shipped HTML and the date that hash was first seen. A build that leaves a page's bytes unchanged
// keeps its date; a build that changes even one byte of it sets the date to today and remembers the
// new hash. That makes two builds in a row with no source change produce the identical sitemap: the
// second build sees the hash the first one just stored and finds nothing to change.
const LASTMOD_PATH = path.join(__dirname, 'lastmod.json');
const pad2 = n => String(n).padStart(2, '0');
const TODAY = (() => { const d = new Date(); return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`; })();
// The six per-problem pages went live 2026-09-17 (DECISIONS 2026-09-17, research/40): that is their
// true first date, used ONLY the first time this mechanism ever runs for a given variant URL, even
// though today's footer-links change (this same build) legitimately touches their bytes too.
const VARIANT_SEED_DATE = '2026-09-17';
const VARIANT_URL_SET = new Set(VARIANT_PAGES.map(p => p.path));
const sha256 = s => require('crypto').createHash('sha256').update(s).digest('hex');
// Strips the one build-wide value in a page that is not that page's own content: the cache-busting
// hash on consent.js's own <script src> (README, "the script URL carries a content hash"). It moves
// only when the consent banner's text changes, in EVERY language at once, which would otherwise mark
// every single page on the site as "changed today" no matter which page's own copy actually moved.
// Nothing else in a page differs between two builds that changed no source.
const normalizeForHash = html => html.replace(/\/assets\/js\/consent\.js\?v=[0-9a-f]+/g, '/assets/js/consent.js?v=STATIC');
let prior = {}, bootstrapping = false;
try {
  prior = JSON.parse(fs.readFileSync(LASTMOD_PATH, 'utf8'));
} catch (e) {
  // BOOTSTRAP, this mechanism's first run only: lastmod.json does not exist, so there is no stored
  // hash to compare a page against. The best "before" available is whatever site-v1 already held on
  // disk before this build wiped it (PREV_FILES, snapshotted at the very top of this file), dated
  // 2026-08-26, the constant this replaces: if a page's hash matches that snapshot it keeps that
  // date, and if this build actually changed it (the footer row changes every FR and NL page today,
  // on purpose) it correctly gets today's date. The six variant URLs are seeded directly in
  // lastmodFor below and skipped here, since 2026-09-17 is a fact, not something to derive from a
  // hash comparison.
  bootstrapping = true;
  for (const [u, file] of Object.entries(URL_FILE)) {
    if (VARIANT_URL_SET.has(u)) continue;
    const old = PREV_FILES[file];
    if (old === undefined) continue;
    prior[u] = { hash: sha256(normalizeForHash(old)), date: '2026-08-26' };
  }
}
const lastmodStore = {};
function lastmodFor(u) {
  const html = PAGE_HTML[u];
  if (html === undefined) throw new Error(`lastmod: no generated HTML captured for ${u}.`);
  const hash = sha256(normalizeForHash(html));
  let date;
  if (bootstrapping && VARIANT_URL_SET.has(u)) date = VARIANT_SEED_DATE;
  else { const before = prior[u]; date = (before && before.hash === hash) ? before.date : TODAY; }
  lastmodStore[u] = { hash, date };
  return date;
}
const url = (loc, paths) => `  <url>\n    <loc>${HOST}${loc}</loc>\n    <lastmod>${lastmodFor(loc)}</lastmod>\n` +
  Object.entries(paths).map(([l, p]) => `    <xhtml:link rel="alternate" hreflang="${l}-BE" href="${HOST}${p}"/>\n`).join('') +
  `    <xhtml:link rel="alternate" hreflang="x-default" href="${HOST}${paths.fr}"/>\n  </url>\n`;
const urls = Object.values(LANDING).map(p => url(p, LANDING)).join('')
  // the per-problem pages, each one paired with its twin in the other language and nothing else
  + VARIANT_PAGES.map(p => url(p.path, p.v.paths)).join('')
  + Object.values(LEGAL_PATH).map(p => url(p, LEGAL_PATH)).join('')
  + Object.values(CGV_PATH).map(p => url(p, CGV_PATH)).join('');
w('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">\n${urls}</urlset>\n`);
fs.writeFileSync(LASTMOD_PATH, JSON.stringify(lastmodStore, null, 2) + '\n', 'utf8');
w('site.webmanifest', JSON.stringify({ name: 'Pro Débouchage', short_name: 'Pro Débouchage', start_url: '/fr/', display: 'browser', background_color: '#F6F3EE', theme_color: '#102A4A', icons: [{ src: '/assets/img/icon-512.png', sizes: '512x512', type: 'image/png' }, { src: '/assets/img/icon-512-maskable.png', sizes: '512x512', type: 'image/png', purpose: 'maskable' }] }, null, 2));

const CSP_DAY1 = `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self'; font-src 'self'; connect-src 'self'; frame-src 'none'; media-src 'self'; manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests`;
// 2026-10-08, the counting fix (DECISIONS 2026-09-28, research/54, research/67): https://www.gstatic.com
// joins script-src. Google's call-tracking loader for "Calls from website" (ADS_PHONE_LABEL) is
// https://www.gstatic.com/wcm/loader.js, and this policy blocked it, so the number swap never ran.
// Exactly one host, no wildcard, no 'unsafe-eval'. Nothing else in the policy moved.
const CSP_TAG = `Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-inline' https://*.googletagmanager.com https://*.googleadservices.com https://googleads.g.doubleclick.net https://pagead2.googlesyndication.com https://www.gstatic.com; style-src 'self' 'unsafe-inline'; img-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://*.googleadservices.com https://*.doubleclick.net https://*.google.com https://*.google.be https://*.google.nl https://*.google.fr; font-src 'self'; connect-src 'self' https://*.googletagmanager.com https://*.google-analytics.com https://*.analytics.google.com https://*.googleadservices.com https://*.doubleclick.net https://pagead2.googlesyndication.com https://*.google.com https://*.google.be https://*.google.nl https://*.google.fr; frame-src https://td.doubleclick.net https://www.googletagmanager.com; media-src 'self'; manifest-src 'self'; object-src 'none'; base-uri 'self'; form-action 'none'; frame-ancestors 'none'; upgrade-insecure-requests`;
w('_headers', `/*
  Strict-Transport-Security: max-age=31536000; includeSubDomains
  X-Content-Type-Options: nosniff
  X-Frame-Options: DENY
  Referrer-Policy: strict-origin-when-cross-origin
  Permissions-Policy: camera=(), microphone=(), geolocation=(), payment=()
  ${TAG_ON ? CSP_TAG : CSP_DAY1}

# Preview hosts only: never index ANY *.pages.dev host. Written with placeholders, not with the
# project name, so moving the preview to another Pages project cannot silently make it indexable
# (2026-08-26: the old alias broke and the project had to be swapped).
https://:project.pages.dev/*
  X-Robots-Tag: noindex
https://:version.:project.pages.dev/*
  X-Robots-Tag: noindex

/assets/fonts/*
  Cache-Control: public, max-age=31536000, immutable
/assets/img/*
  Cache-Control: public, max-age=86400
/favicon.svg
  Cache-Control: public, max-age=604800
/apple-touch-icon.png
  Cache-Control: public, max-age=604800
/site.webmanifest
  Cache-Control: public, max-age=604800
${TAG_ON ? `/assets/js/consent.js
  Cache-Control: public, max-age=3600
` : ''}`);

// www-to-apex lives as a zone Redirect Rule "www to apex" in the Cloudflare dashboard (2026-08-28):
// a `_redirects` host rule was tried first and Pages ignored it, so no `_redirects` ships at all.
// The rule fires at the edge before Pages, 301, path and query preserved; apex requests never match.

// The placeholder-review tripwire retired 2026-08-27: the invented cards are deleted from the copy
// files and the reviewer's real review ships as `featured` (DECISIONS). `reviews` is the parked grid and
// may only ever be refilled with real customers' words, so a non-empty array is no longer a fault.
// The Afrim-avatar tripwire retired 2026-08-28: his real portrait ships in the bubble, so the
// monogram and the warning about it are both gone. The generic check stays, because it costs
// nothing and any data-placeholder that ever reappears must still be answered for.
const ph = Object.keys(COPY).filter(l => fs.readFileSync(path.join(OUT, l, 'index.html'), 'utf8').includes('data-placeholder'));
if (ph.length) console.warn('WARNING: a data-placeholder survived into /' + ph.join('/, /') + '/. Nothing on a live page may stand in for a real person or a real fact (rule 5).');
console.log('site-v1 built');
if (ADVANCED) console.log('consent mode: ADVANCED (the Ads tag loads before consent, all four types denied by default; GA4 waits for the analytics Accept). Not the default: rebuild without CONSENT_MODE for the basic site.');
