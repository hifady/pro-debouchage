# The legal basis of the cookieless Ads pings, 2026-10-17

One read-only agent (Claude Code, Opus), files and web only, no browser. 19:11 to about 19:25 (this machine's clock). No site file, no state file changed. Question: NOW.md, "THE LEGAL BASIS of the cookieless Ads pings" (checker of 2026-10-16). Not legal advice: a research read of primary texts, for a Belgian lawyer to confirm if the business wants certainty.

## 0. The answer in five lines

1. "Legitimate interest" does NOT hold for the cookieless pings on a Belgian site. The Belgian authority (GBA) wrote in November 2025 that legitimate interest cannot be used for non-necessary trackers, ad measurement named among them (decision 176/2025).
2. The pings are in scope: the EDPB says JavaScript that makes the browser send information "clearly falls within" Art. 5(3); the call-tap ping also reads screen size and device model.
3. Belgium's rule is no longer Art. 129 WEC (repealed 10 January 2022). It is now Art. 10/2 of the Law of 30 July 2018: consent, or "strictly necessary" for a service the user asked for. Belgium has no audience-measurement exemption; the GBA says counting visitors is in principle not exempt.
4. No wording can fix it while advanced mode runs: any honest basis line is either "legitimate interest" (rejected by the GBA) or "consent" (untrue before the answer).
5. Recommended: switch back to BASIC consent mode (one build, the old wording comes back by itself). Confidence that legitimate interest fails: high for the tap ping, medium-high for the page_view ping.

## 1. Are the pings inside Art. 5(3) ePrivacy and its Belgian rule?

**The Belgian rule today.** Art. 129 of the Law of 13 June 2005 reads, on the official consolidated text: "Abrogé par L 2021-12-21/05, art. 173 ... En vigueur : 10-01-2022". Its content moved to **Art. 10/2 of the Law of 30 July 2018** (inserted by L 2021-12-21/05, art. 256, in force 10-01-2022). Art. 10/2 allows storing or accessing information in the terminal only if the user "ait donné son consentement après avoir été informé". The only exception: the sole purpose of sending a communication, or a service "demandé expressément" by the user "lorsque cela est strictement nécessaire à cet effet". The GBA's own cookie checklist now cites Art. 10/2 (footnotes 1 and 11). So the brief's "Art. 129 WEC" is outdated; the substance is the same.
Source: ejustice consolidated texts, Law 13 June 2005 (cn 2005061332) and Law 30 July 2018 (cn 2018073046).

**The EDPB reading (Guidelines 2/2023, v2.0, adopted 7 October 2024).**
- Para 33, JavaScript that instructs the browser to send asynchronous requests: "Such access clearly falls within the scope of Article 5(3) ePD".
- Para 43, HTTP headers and the user agent, used to collect information: "can lead to the application of Article 5(3) ePD".
- Para 51, dynamically built tracking pixels: "the distribution of the applicative logic (usually a JavaScript code) that constitutes the instruction".
- Para 39: "stored information" includes information produced by the device's own processes, whoever stored it.
- Para 1 and paras 9 to 12: Art. 5(3) covers "information", personal data or not, so "no identifier is kept" does not take a ping out of scope.
- Para 56: being in scope "does not systematically mean that consent needs to be collected": an exemption must be checked (section 2 below).

**The GBA reading.**
- Cookie checklist, footnote 1: "cookies" covers other tracking under Art. 10/2, such as "het gebruik van een pixel, device fingerprinting, local storage".
- Decision 176/2025 of 3 November 2025 (Litigation Chamber, prima facie warning), para 13: Art. 5(3) is lex specialis and comes before GDPR Art. 6, so it is "niet mogelijk ... een beroep te doen op het 'gerechtvaardigd belang'" for non-strictly-necessary cookies. Its footnote 1 lists the purposes concerned, including "de prestaties van advertenties meten" (measuring ad performance).
- GBA cookie page (updated 17/11/2023): an analytics cookie "ne répond en principe donc pas à ces deux conditions" (the strictly-necessary test).

**Applied to our two pings (fields from research/68 section 2, read off the wire on 2026-10-08).**
- **The call/WhatsApp tap conversion ping** (`pagead/conversion/...`): Google's script reads and sends `u_w`, `u_h` (screen size), `uam`, `uap`, `uapv`, `uafvl`, `uaa`, `uab`, `uaw` (device model, system and version, browser brands, processor details), plus page title and referrer. Device model and full versions come from the browser's high-entropy client hints, which a script must actively ask for; they are not a passive header. This is the EDPB para 33 case and the fingerprinting family of para 43. **In scope, high confidence.**
- **The page_view ping** (`ccm/collect`): page address, referrer, timestamp, a random number, consent state, tag settings, and the passive headers (IP, user agent). No screen size or device model (research/68). It is still a JavaScript-built request to a third party (para 33, para 51), and it reads the referrer from the browser. **In scope, medium-high confidence**: weaker than the tap ping, but no text puts it outside, and the GBA lists pixels inside.
- Google's own page lists only passive and "coarse" fields for cookieless pings ("timestamp, user agent ... and referrer", consent state, random number). The wire read of 2026-10-08 shows the conversion ping carries more than that list (screen and device fields). So Google's description cannot be relied on for our legal position.

## 2. Is there an exemption that fits?

- **Strictly necessary for a service the user asked for** (Art. 10/2 second paragraph): no. The visitor asked to see the page and to call; the call works without the ping. Ad measurement serves the advertiser and Google. GBA checklist footnote 12: "Het tellen van bezoekers valt hier om deze reden in beginsel niet onder", quoting WP29 Opinion 04/2012 (the user "can access all the functionalities" without such cookies).
- **Transmission of a communication**: no. The ping is an extra request, not the transport of the page or the call.
- **Audience measurement exemption (France)**: the CNIL (page of 4 July 2025) exempts tools only for a purpose "strictement limitée à la seule mesure de l'audience du site", for the publisher's exclusive account, anonymous statistics only, no cross-matching, no transfer of non-anonymous data to third parties. A Google Ads conversion ping fails on every point: purpose is ad performance, data goes to Google, which uses it for its own modelling. And this is French law (Art. 82 Loi Informatique et Libertés), not Belgian.
- **Belgium**: no such exemption. GBA checklist footnote 12 says some other regulators allow one under strict conditions, sometimes through a change of national law; Belgium has made none (Art. 10/2 has only the two classic exceptions).
- **EU Digital Omnibus**: a proposal. Practitioner sources report a Council text of 3 September 2026 with six consent exemptions, possibly including some ad measurement, and no Council mandate as of 12 October 2026. Not law; nothing to rely on today.

## 3. Does "legitimate interest" hold?

**It does not hold** for the access step (the script making the browser send these pings before or against consent). Reasons, strongest first:
1. Art. 10/2 Law 30 July 2018 allows only consent or strict necessity; legitimate interest is not on the list.
2. GBA 176/2025 says so in writing, for ad-performance measurement by name, and warned a site for it.
3. EDPB 2/2023 puts JavaScript-instructed requests and device reads in scope.
4. No exemption fits (section 2).

"Partly holds" is not a fair reading: legitimate interest could only cover later GDPR processing of data that was lawfully obtained, and here the obtaining itself needs consent (GBA 176/2025 para 13, EDPB Opinion 5/2019 as cited there).

**Confidence**: high (about 85 percent) for the call-tap ping with device fields; medium-high (about 70 percent) for the page_view ping. What keeps it below certainty: no GBA or EDPB text names Google Consent Mode or "cookieless pings"; 176/2025 is a prima facie warning about cookies, not a merits ruling on pings; Belgian courts annulled some earlier GBA cookie decisions on procedure (research/65 section 3).

Note also: the live privacy page states the basis in plain words. That makes a complaint easy to write, and the GBA has already answered that exact argument once.

## 4. The fix options and what each costs

**(a) Keep advanced, change the wording.** No wording is both honest and defensible. GDPR Art. 13 asks for a stated basis; the only candidates are legitimate interest (rejected by the GBA) or consent (false before the answer). An honest line would be, for example: "Avant votre choix, et si vous refusez, la balise Google Ads envoie ces données sans votre consentement." That is true, and it is close to admitting the breach. Cost: no measurement loss; the legal risk stays, and grows with a public admission. Not recommended.

**(b) Switch to BASIC consent mode.** The Ads tag loads only after Accept. The old basic wording ("Rien n'est chargé avant votre choix", basis = consent) is still in `legal.js` COOKIES_TAG and the copy files, and a plain build ships basic (research/68 line 8), so the change is one build without `CONSENT_MODE=advanced` and a deploy; the privacy update date would need a new date. What it costs (research/65 section 3, DECISIONS 2026-10-08 COOKIES line):
- Google counts nothing from website visitors who do not accept: no page_view, no tap conversion. At about 6 clicks a day, Google does not model the gap (thresholds of 100 a day or 700 a week, research/65).
- Smart Bidding (Maximize Conversions) gets fewer signals and learns slower.
- What it does NOT cost, per Google's pages (research/65 section 2, not fully confirmed): "Calls from ads" through the call button on the ad and Google's forwarding number need no site tag and no cookie answer. Those still count.
- Roro's own call log (`playbook/jobs-ledger.md`) stays the ground truth either way.

**(c) Middle ways checked.**
- **Pings without device fields**: no documented Google Ads tag setting found that stops the conversion ping from reading screen size and device model. Could not confirm one exists. Even if it did, the page_view ping would still be in scope (section 1), so this lowers risk but does not remove it.
- **url_passthrough**: it carries the ad-click id from page to page in the address when cookies are refused. That is a tracking link in the sense of EDPB paras 49 to 51: in scope, needs consent too. It is OFF on the live site (research/68 section 1) and should stay off.
- **Basic plus a better consent card**: equal Accept and Refuse buttons are already required (GBA checklist); no nudging is allowed. Clear, short wording about why ("savoir si nos annonces amènent des appels") is allowed and may lift the accept rate. Honest, no extra legal risk.
- **Basic plus the counts that do not need the site**: keep "Calls from ads" as the primary conversion (call reporting on, forwarding number), and judge the ads on Roro's call log over 14 days, as `ads-program.md` section 2 already says.
- **Wait for the Digital Omnibus**: not law; may never cover a third-party ad tag. Revisit if it is adopted.

Why advanced was chosen on 2026-10-08 (DECISIONS.md, the expert decisions entry, COOKIES line): every call tap reaches Google, basic counts nothing from callers who do not accept and at 6 clicks a day models nothing, "no Belgian ruling exists either way", the APD checklist forbids cookies before consent and advanced sets none, reversible with one build. GBA decision 176/2025 (3 November 2025) and the move of the rule to Art. 10/2 were not in that read; with them, the "no ruling either way" premise no longer holds for the legitimate-interest wording.

## 5. Recommendation for Fady (plain English)

Go back to basic mode: Google's ad tag waits until the visitor says yes, and the privacy page says "consent" again, which is true. We lose Google's count of website taps from people who say no, but the calls from the ad's own call button are still counted by Google, and Roro's call log stays the real score.

**Risk if we keep advanced and the GBA disagrees**, in plain words: the GBA acts mostly on complaints. For a small site the usual first step is a letter and a warning with time to fix (as in 176/2025); a fine is possible, and practitioner news reports a 15,000 EUR fine on a Belgian site that placed analytics cookies without consent (not checked against the decision itself). The bigger realistic cost is Roro's name on a GBA decision and the time to answer it. Low chance, real but small cost, and fully avoidable with one build.

## Sources (all read 2026-10-17)

Primary:
- Belgian Law of 13 June 2005, consolidated, Art. 129 marked repealed: https://www.ejustice.just.fgov.be/cgi_loi/change_lg.pl?language=fr&la=F&cn=2005061332&table_name=loi
- Belgian Law of 30 July 2018, consolidated, Art. 10/2: https://www.ejustice.just.fgov.be/cgi_loi/change_lg.pl?language=fr&la=F&cn=2018073046&table_name=loi
- EDPB Guidelines 2/2023 v2.0 (7 October 2024), full text read: https://edpb.europa.eu/system/files/2024-10/edpb_guidelines_202302_technical_scope_art_53_eprivacydirective_v2_en_0.pdf
- GBA Litigation Chamber decision 176/2025 of 3 November 2025, full text read: https://www.autoriteprotectiondonnees.be/publications/avertissement-n0-176-2025.pdf
- GBA cookie checklist (Dutch), full text read: https://www.gegevensbeschermingsautoriteit.be/publications/cookie-checklist.pdf
- GBA cookie page (updated 17/11/2023, fetch summary): https://www.autoriteprotectiondonnees.be/citoyen/themes/internet/cookies
- CNIL, audience measurement exemption (4 July 2025, fetch summary): https://www.cnil.fr/fr/cookies-solutions-pour-les-outils-de-mesure-daudience
- Google, consent mode developer page (updated 2026-07-30, fetch summary): https://developers.google.com/tag-platform/security/concepts/consent-mode
- Google Ads Help, About consent mode (fetch summary): https://support.google.com/google-ads/answer/10000067?hl=en
- In this folder: research/68 section 2 (the wire read), research/65 sections 2 and 3, DECISIONS.md 2026-10-08, design/site-source/legal.js lines 273 to 325.

Practitioner (search summaries, not relied on for the legal answer):
- https://secureprivacy.ai/blog/eu-digital-omnibus-what-article-88a-changes-for-cookie-consent-2026 and https://ppc.land/digital-omnibus/ (Omnibus status)
- https://legalnews.be/handel-consument/geen-e-commerce-zonder-analytics-data-sirius-legal/ (the 15,000 EUR fine report)
- https://brianclifton.com/blog/2022/03/14/google-consent-mode-breaks-privacy-laws/ and https://www.didomi.io/blog/google-consent-mode-v2-what-you-need-to-know (practitioner views on advanced mode)

## Could not confirm

- Any GBA, EDPB or Belgian court text that names Google Consent Mode or "cookieless pings". None found.
- Whether 176/2025 became final or went to a merits hearing (it was a prima facie warning with 30 days to object).
- The 15,000 EUR fine (the "Jubel" case): practitioner report only, decision not read.
- A Google Ads tag setting that drops screen size and device model from the conversion ping.
- Whether "Calls from ads" counts are fully independent of the site consent state (Google pages say so; not tested here).
- The current text of the Digital Omnibus and whether it will cover ad measurement by a third party.
- Whether Belgian lawmakers plan to add an audience-measurement exemption to Art. 10/2.
