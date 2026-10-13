# Business card, first draft (2026-09-02)

Roro's card for Pro Débouchage, two sides, two language versions. `card.html` is the source and the
only file to edit. `preview.png` is a render of the four artboards. Nothing here touches
`design/site-source/` or `site-v1/`. Nothing is printed from `card.html` today, and it is not
print-ready as it stands: it still carries the zone wording that left the site on 2026-09-10.

## What is on the card

**Front (one idea: call this number).** Logo and wordmark, the small teal line "Débouchage 24h/24"
(NL "Ontstopping 24/7"), the promise from the hero of the site, then a red band bleeding off the
bottom edge with the phone number in Archivo 900 at 21 pt and "Appel ou WhatsApp" under it.

**Back (the practical side).** Logo and wordmark small, "24h/24 · 7j/7" in marker yellow, the six
services in two columns, the 30-day guarantee in a yellow chip, the price promise and the zone,
then phone and WhatsApp, website, e-mail, and the company name plus enterprise number at 7 pt.

The exact strings, per side and per language, are in the HTML and were taken from
`design/site-source/copy-fr.js` and `copy-nl.js`. The NL side is the site's own Flemish copy, not a
translation of the French. Two of them are now stale, the zone lines "Prix dit au téléphone. Autour
de Bruxelles, Brabant flamand et wallon." (line 153) and "Prijs aan de telefoon. Rond Brussel,
Vlaams-Brabant en Waals-Brabant." (line 212), whose wording left the site on 2026-09-10, and both
must be replaced from the current `copy-fr.js` and `copy-nl.js` before any export or print.

No address, no stars, no review count, no "since" claim, no price figure.

## To swap before print

1. **The domain.** `prodebouchage24.be` appears twice per back side (web line and e-mail). Search
   and replace `prodebouchage24` in `card.html` if the final domain changes.
2. **The logo for print.** The card references `assets/prepared/web/img/logo-icon.svg`, which is the
   web mark and is built from **gradients**. Gradients are not CMYK-safe flat colour. Ask the
   printer for a flat version of the mark, or have one made, before the plate is cut. Everything
   else on the card is already flat ink: `#102A4A`, `#D63A17`, `#0B7A70`, `#FFD635`, `#F6F3EE`.
3. **Decide the language split.** Two versions are drawn. Roro decides whether to print FR one side
   and NL the other on a single card, or two separate stacks. The current draft is two stacks.

## Print spec

- Trim 85 x 55 mm, landscape. Bleed 3 mm on every side, so each artboard is 91 x 61 mm.
- Safe margin 4 mm inside the trim. Nothing readable crosses it.
- Smallest type 7 pt (the company name and enterprise number). Everything else is 7.5 pt or larger.
- Flat colours only, no gradients except the logo mark (see above), no shadows, no transparency.
- Suggested stock: 350 gsm, matt laminate. Not decided, it is the printer's quote.

## Export to PDF

Open `card.html` in Chrome, Ctrl+P, destination "Save as PDF", margins "None", scale 100%, tick
"Background graphics". Each artboard prints on its own page at exact size with the bleed included;
the dashed trim guide is hidden on the print sheet.

## Regenerate the preview

```
"C:\Program Files\Google\Chrome\Application\chrome.exe" --headless --disable-gpu --hide-scrollbars ^
  --screenshot=preview.png --window-size=1880,1360 --virtual-time-budget=4000 ^
  "file:///C:/Users/fadya/Desktop/flybys/pro-debouchage/design/business-card/card.html"
```

## Notes

- Fonts are referenced by relative path to `../site-source/*.woff2`, so nothing is duplicated.
- Caveat, the site's handwriting face, is deliberately not used: it ships subset to ten glyphs, and
  any other word would silently fall back to a system script face.

## Figma version (2026-09-03)

Editable Figma file: https://www.figma.com/design/urgopOrCTqnE8zFtvvHRcy

Four frames on the page "Business card", side by side, named exactly `FR front`, `FR back`,
`NL front`, `NL back`. Each frame is 1075 x 720 px, which is 91 x 61 mm at 300 dpi, so the 3 mm
bleed is inside the artboard. Each frame carries a locked group `GUIDES (hide before export)` with
two dashed rectangles: `GUIDE trim 85x55mm` (magenta) and `GUIDE safe area (4mm inside trim)`
(cyan). Figma has no per-node export flag, so hide or delete that group before exporting the print
PDF. `card.html` stays the HTML source; the Figma file is the version Roro and the printer can edit.

- **Font.** Archivo from Figma's Google Fonts list, styles Black, ExtraBold and SemiBold. Figma
  serves Archivo as static cuts, so the site's narrow width axis (84 to 92 percent) is not
  available. `Archivo Narrow` exists but only up to SemiBold, with no Black or ExtraBold, so the
  promise and the phone number use the normal-width `Archivo Black`. They still fit inside the safe
  margin. Caveat is not used.
- **Colours.** A variable collection `Card colours` with `ink`, `ink-deep`, `red`, `teal`,
  `yellow`, `paper`, `card`, `line`. Every brand fill is bound to a variable, so one edit there
  changes all four frames. Flat only, no gradients.
- **Logo.** The web mark was imported as a real editable vector tree and recoloured flat to `ink`
  (`#102A4A`), one single colour, no gradients. The layer is named `logo-flat (needs check)` on all
  four frames: the flattening is mechanical, so the shape still needs a human look before the plate
  is cut. On the two backs it sits on a white rounded chip.
- **Back given more air** on Fady's note. Contact lines are one item per line, the service rows and
  the blocks between them carry wider gaps, and content now ends exactly on the safe line with room
  between every block. Smallest type is still 7 pt (the company line).

### Strings changed from `card.html`

| Side | Before | After |
|---|---|---|
| FR back | `Prix dit au téléphone. Autour de Bruxelles, Brabant flamand et wallon.` | dropped |
| NL back | `Prijs aan de telefoon. Rond Brussel, Vlaams-Brabant en Waals-Brabant.` | dropped |
| both backs | `Web prodebouchage24.be` and `E-mail info@prodebouchage24.be` on separate labelled items | one line, `prodebouchage24.be · info@prodebouchage24.be` |

The zone and price line was the one thing fighting the six services, the chip and the contact block
for room. Dropping it is what bought the air. Everything the brief said must stay is on the card.
Every other string is verbatim from `card.html`, per language.

**Bilingual simple version (2026-09-03, PARTIAL).** Frame `BILINGUAL front (FR)` is done: headline "Canalisation bouchée ? Appelez-nous.", teal info line "24h/24 · 7j/7 · prodebouchage24.be", red call band. Frame `BILINGUAL back (NL)` exists but is still a raw clone of `FR front` with French content: the Figma MCP quota (Starter plan) ran out mid-task. Still to do on it: headline "Verstopte afvoer? Bel ons.", band sub-line "BELLEN OF WHATSAPP", info line "24/7 · prodebouchage24.be", the 7 pt company line as on the NL back (`PRO DEBOUCHAGE BV · Ondernemingsnr. 1027.454.187`), eyebrow removed. Neither frame was screenshot-verified.
