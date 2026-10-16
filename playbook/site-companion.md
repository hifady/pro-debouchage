# playbook/site-companion.md

*The finished live page, https://prodebouchage24.be, explained section by section for the Roro walkthrough: what it says, why it is there with the research number behind it, and the questions Roro will ask with a ready answer. Written 2026-08-28. Source of truth for the page itself stays `design/site-source/` (template.js, copy-fr.js, copy-nl.js, copy-en.js, cgv.js, legal.js).*

## How to use this file

Read it next to the live page in French. The Dutch and English pages carry the same sections in the same order, written as native copy, not as translations. Every answer below is short on purpose: say it out loud, then move on. If Roro pushes on something that is not in here, write it down and answer later. Never invent a fact in the meeting.

One thing to say at the start of the call: **every price printed on the page is now a starting price**, and the phone quote is still exact and binding. That is the 2026-08-27 walkthrough decision and it touches four sections.

---

## 1. Header and sticky call bar

**What it says.** Logo, the language chooser and a call button, always at the top. Since 2026-09-16, on a phone the language chooser is one pill: the active language with an arrow, tap it and the other two drop down. A red call button sits next to it. On desktop nothing changed: the three-pill FR, NL, EN switch and the call button. On a phone a call bar also slides in at the bottom as soon as the visitor scrolls past the first buttons.

**Why.** Emergency callers do not read to the end, they call from wherever they stopped scrolling (research/03, research/19). The bar appears only after the hero buttons leave the screen, so the top of the page is never covered by two call buttons at once. The one-pill phone header buys room for a real call button next to the language switch on a narrow screen. Since 2026-09-16 the header call button, the six service links (section 4) and the footer number are all at least 44 px tall, easy to tap with a thumb.

**Roro will ask**
- *Why three languages?* Your customers in and around Brussels are French, Dutch and expats. Same prices, same promises, three real pages.
- *Does the phone number cost the caller anything?* No. It is your normal mobile number, no premium line.
- *Does the page ever show a number that is not mine?* Only for one kind of visitor. Google's call measurement was added in September, but the site's security settings blocked it until 2026-10-08 13:03, so until then everybody saw 0480 649 649. Since then the website call counter loads after the visitor taps Accept: a visitor who accepted and came from one of your ads sees a Google forwarding number. Everybody else still sees your number. Fady made a test call on 12 Oct. It is not in Google's call list, most likely because he had not come from an ad, so the page kept the normal number. His test call through an ad on 15 Oct is checked at the 19 Oct read and never counted as a customer. It rings straight on 0480 649 649 and costs him nothing extra. That is how we will know which calls the ads paid for.

## 2. Hero

**What it says.** "Ça remonte, ça déborde, ça pue ? Appelez. On s'en occupe." Under it, one sentence: you describe the problem, we tell you the price on the phone, and that is the price you pay, confirmed at your door before the first minute of work. Two buttons: call, or send a photo on WhatsApp.

**Why.** The headline is the customer's own words for his problem, picked by Fady from the eight candidates in research/06 and confirmed in DECISIONS 2026-08-23. The price promise sits directly under it because certainty about price is the number one fear of this caller (research/18). The photo button exists because a photo shortens the phone call and the world's best pages all remove work from the customer (research/10, research/19).

**Roro will ask**
- *Why not "20 years of experience" or "number one in Brussels"?* We only write what we can prove. A false claim is the first thing a customer checks, and it is the thing that kills trust.
- *Why WhatsApp?* Half your callers can show the problem faster than they can describe it. It also gives you a written thread.
- *Is the humour line gone?* The lighter headline is parked, with no test date. This one converts on the pain.

## 3. Trust strip

**What it says.** A moving strip of six short facts: 24/7 including holidays, price said on the phone, camera inspection included, company number 1027.454.187, insured with AG Insurance, unblocking guaranteed 30 days.

**Why.** Belgian competitors publish neither prices nor a company number, so both are now table stakes and a visible differentiator (research/20). Every line is checkable, none is a slogan.

**Roro will ask**
- *Why put my company number on the site?* Because the scammers cannot. It is the cheapest proof you exist.
- *Can I add a line?* Yes, if it is true and short enough not to wrap on a phone.

## 4. Services

**What it says.** Six numbered rows: urgent unblocking, sewer and sterput, high pressure cleaning, camera inspection, septic tank emptying, flooded cellar pumping. Each has one plain sentence and a call link, each link at least 44 px tall since 2026-09-16 (it was 25 px before), easy to tap with a thumb.

**Why.** The heading is "Votre problème est probablement là-dedans.", so the visitor recognises his own case in two seconds (DECISIONS 2026-08-26). No photos in the cards: pretty tiles push the call further down the page (research/09, research/19).

**Roro will ask**
- *Why is the order like this?* Most demanded first, per the competitor scan in research/07.
- *Can I add a service?* Yes, if you really do it, with equipment we can show.

## 5. Before, during, after

**What it says.** One real job in three photos: the full bowl, Afrim with the Rioned machine, the same WC running clear. A handwritten "Parfait !" on the collage.

**Why.** Proof beats promises, and the only honest before-and-after is a real one. No generated pairs, ever (DECISIONS 2026-08-23, research/12). The "before" photo was reconstructed from your own original, and the page says so in the footer.

**Roro will ask**
- *Can we use nicer pictures from the internet?* No. Stock photos are the first tell of a fake company, and our own photos are our advantage.
- *Can I send better job photos?* Yes, always. Real jobs, and never a customer's face or address.

## 6. How it works, four steps

**What it says.** You call and describe. We tell you the price. We come with the camera and the high pressure. We confirm the price at your door, then we unblock.

**Why.** Four steps kill the two big fears at once: the price that changes at the door, and the unknown arrival (research/18). The evening and weekend surcharge is named here, inside the price you are told on the phone, not as a surprise line.

**Roro will ask**
- *What if the job is worse than the customer described?* The page says the customer learns that before you start, not on the invoice. That sentence is your protection too.
- *Must I always give an arrival hour?* You give an hour and you warn if it moves. Better a kept hour than a nice number.

## 7. Prices

**Where the figures live.** The numbers below are a copy kept here for reading aloud to Roro. The owner is the site source (`design/site-source/copy-fr.js` and nl/en, AGENTS section 4); if they ever differ, the page wins.

**What it says.** Five rows, each marked "À partir de": WC 129 €, sink or shower 119 €, sewer or sterput 199 €, high pressure curage up to 25 m 249 €, flooded cellar first hour 229 €. Three chips: VAT included, travel included, first hour included. Then the surcharge grid in full: evening (18h to 22h) and Saturday +50 %, night, Sunday and holidays +75 %. Then a block for cases not in the list, telling the customer to call for an immediate price.

**Why the "From".** On the 2026-08-27 walkthrough Roro said WC at 129 is too cheap. Rather than guess a new number, every listed amount became a floor in all three languages (FR "À partir de", NL "Vanaf", EN "From"). The price list task is CLOSED (DECISIONS 2026-08-31): Roro is happy with the prices, the "From" stays by design, and the numbers change only on his word. The phone quote did not change: it stays exact and binding. Same logic keeps the camera-alone price in the FAQ as a floor (DECISIONS 2026-08-28).

**Why these numbers at all.** They come from research/07 (17 competitors with published prices: market medians around WC 105, sink 95, sewer 180, camera alone 145) and research/16 for curage and cellar pumping. The +50 % evening and Saturday is the market pattern; night, Sunday and holidays at +75 % sits on purpose under the market's +100 % (research/07). All of it is published in full because nobody else publishes it.

**Roro will ask**
- *Why publish prices at all?* Because a caller who already saw a price calls to book, not to ask. Belgium hides prices, the Netherlands publishes them, and the Dutch pages convert better (research/20).
- *129 is too low for a WC.* That is exactly why every price says "from": the printed number is only the floor, what binds you is the phone quote. You told us you are happy with these prices (2026-08-31); the day you want different numbers, say the word and we change them the same day.
- *Am I stuck with the printed price?* No. The printed number is the floor. What binds you is what you say on the phone.
- *What about the septic tank price?* Not published. Its VAT rate is not settled (21 % by default, 6 % only in narrow cases, research/16 and research/26). It stays a phone price.
- *What if I come and nothing can be unblocked?* The FAQ says the customer pays the travel only, 60 €.

## 8. The guarantee

**What it says.** "Garantie 1 mois sur le débouchage": if the same pipe blocks again within 30 days, we come back free. A small line adds that this is on top of the customer's legal rights. A spinning seal repeats it, and a small floating seal follows the visitor down the page and steps aside once the footer comes into view (since 2026-09-22).

**Why.** One month on the unblocking is the honest market standard, taken from 11 real Belgian guarantee examples (research/16). Longer would be a promise you cannot keep, shorter is worthless. The exclusions live on the signed work order and in the CGV, not in a wall of small print on the page.

**Roro will ask**
- *What if the customer keeps pouring fat down the same pipe?* The CGV, article 12, sets the limits. The page keeps the promise simple, the work order does the fine print.
- *Does this cost me a lot?* Rarely, and it turns a suspicious caller into a customer. It is cheaper than the call you never get.

## 9. The promise line

**What it says.** One sentence with a yellow marker under it: "Le prix annoncé au téléphone est le prix sur la facture."

**Why.** It is the single idea the whole page is built on (research/19: one promise, repeated, beats five). It is the answer to the scam story in the next section.

## 10. Scam section

**What it says.** How to recognise a drain scam. It opens with a cited fact: the Halle-Vilvoorde region is known for this, more than 265 victims between 2020 and 2025, and a trial in 2025. The figure is a button: clicking it opens a small panel with the source. Then four warning signs (price that changes once the van is parked, an invoice counted per metre and per hour, no address or company number, cash only with no invoice), and next to it four lines saying we do the exact opposite.

**The source.** On 29 September 2025 the public prosecutor summoned 17 defendants before the court in the Halle-Vilvoorde judicial district, roughly 265 victims between 2020 and 2025, with invoices up to 10.000 € for one unblocked toilet. Sources named on the page: the prosecutor's press release (om-mp.be), VRT NWS and RTBF of that date, and the Moustique investigation of 17 October 2025. Found and verified in research/18. The panel carries no outbound link, decided 2026-08-28: sources are named, the visitor stays on the page.

**Roro will ask**
- *Does talking about scams scare people away from me?* The opposite. The customer is already afraid, he read the news. We name the fear and then show we fail every point on the list.
- *Is that number safe to publish?* Yes. It is a public prosecution, three named sources, and the page shows where it comes from.
- *Are we attacking a competitor?* No company is named. It is a checklist, not an accusation.

## 11. Who comes to your home

**What it says.** A paragraph, then Afrim speaking directly: "Bonjour, je suis Afrim. C'est moi qui viens chez vous, et c'est moi qui débouche." Then the van photo. The text says a team of two, 30 years of trade between them, and professional liability insurance with AG Insurance.

**Why.** People let a stranger into their house at 2 a.m. Naming him removes the anonymity that scam operations depend on (research/18). Roro's own name never appears on the site (DECISIONS 2026-08-23). The spelling is AFRIM, corrected on the 2026-08-27 call.

**Roro will ask**
- *Where is Afrim's photo?* Live. Your real photo of him is the bubble avatar since 2026-08-29, unretouched. We will never put an invented face on a real person.
- *Why is my name not on the site?* Your call, from the start. The company answers, not you personally.

## 12. Three rules

**What it says.** Three cards: the camera goes in before the hammer, an insurance report on request, an invoice every time.

**Why.** These were three loose paragraphs; they became their own band because each one answers a specific fear: damage to the house, the insurance claim, and the cash-no-paper trick (research/18).

**Roro will ask**
- *Do I have to write reports?* Only when the customer asks, after a camera inspection. It is a short document and it wins water-damage jobs.

## 13. Equipment

**What it says.** No supermarket drain snake. A Rioned UrbanJet high pressure machine in the van, plus professional inspection cameras, one of them a Rausch for small pipes. Three photos from your own jobs.

**Why.** Rioned is verified: Dutch maker, since 1956, on-site warranty in Belgium (research/20). We name them in text only, no logo, because they publish no press kit.

**Roro will ask**
- *Can I say I have more machines?* Only what we can photograph in your van.

## 14. Proof and the review

**What it says.** Three job photos with captions, then François's review in full, in his own words, then a short block saying there is one review because we only publish real ones, with a WhatsApp button to send the next one.

**Why.** The review is real, received 2026-08-27, in the customer's own words. It is published under the first name François, a name agreed with the reviewer himself on 2026-08-29 (DECISIONS.md), and no last name was ever shown. There are no stars because he wrote words, not a rating. The three-card grid is built and empty: it comes back when two more real reviews land, on Fady's word. No invented reviews, ever (rule 1).

**Roro will ask**
- *Everyone else has 200 reviews. Can we not add a few?* No. Fake reviews get a business removed from Google, and this page's whole argument is that we are the ones who do not lie.
- *How do I get more?* Ask every customer at the door, then send the WhatsApp link. Once your Google page is live they go there too.

## 15. Your situation

**What it says.** Three short blocks: tenant, owner or syndic, shop and horeca.

**Why.** Three different buyers with three different worries: who pays, private or common pipe, and hours of closed kitchen (research/18 segments).

**Roro will ask**
- *Can a tenant call me without the owner?* Yes, and he gets the invoice. If the cause is the owner's, your invoice and report let him claim it back.

## 16. Zone

**What it says.** We come to Brussels, all 19 communes, since 28 September. And all around it too, on both sides of the language border, from Alost to Louvain and from Malines to Nivelles, about 40 km around Wemmel. Then 37 town chips, Bruxelles first, then: the list stops here, our area does not, your town not listed? Call, you get a yes or no immediately. (Widened 2026-09-28: Brussels joined the zone, same prices, travel included, nothing added. Widened before that on 2026-09-10 from the old "Flemish and Walloon Brabant" wording and from 26 chips, because the ads had always run across the ring around Brussels, from Alost to Louvain and from Malines to Nivelles, and a Kontich caller landed on a page that implied we skipped her.)

**Why.** Your own decision, 2026-09-28: Brussels is in the zone now, the van is Euro 6 so it may drive in the low emission zone, and the prices stay the same. Before that, the 2026-08-23 rule kept Brussels city out for parking; that rule is retired.

**Roro will ask**
- *Why is Brussels in now?* You said yes by phone on 28 September. The van is Euro 6, so it can drive in the low emission zone, and the prices stay the same, nothing added for Brussels.
- *Are the Brussels ads live?* They ran from 28 September to 8 October: their own campaign, French keywords and ads, 16 EUR a day, four ad groups (general, WC, pipes, flooded cellar). They are paused since 8 October (149.84 EUR spent, 18 clicks, no call). Their restart is proposed at the 22 Oct verdict, with the numbers; switching them on is Fady's Go click.

## 17. FAQ

**What it says.** Eleven questions, opening with "how much does it cost". Price, surcharges, travel, camera alone (from 149 €), VAT rate, tenant, arrival time, breaking things, insurance report, towns, payment.

**Why.** The price question is first because it is the first question in every real call (research/10). The VAT answer states the real condition: 6 % for a home over 10 years, otherwise 21 %, said on the phone (DECISIONS 2026-08-24 evening).

**Roro will ask**
- *Why explain VAT to customers?* Because if the 21 % surprises them at the invoice they feel cheated. Saying it first costs nothing.

## 18. Final call and footer

**What it says.** "Un bouchon, ça n'attend pas.", the number in huge type, two buttons, and the hours line. The footer carries the company name, Guldenschaapstraat 6 in Vilvoorde, the company number, e-mail, phone, the VAT note, the photo note, and links to the privacy policy and the general conditions. Since 2026-09-18 the French and Dutch footers also link the three problem pages (blocked toilet, blocked pipe, flooded cellar) under "Problèmes fréquents" / "Veelvoorkomende problemen".

**Why.** Address plus company number in the footer is what the scam section promised the visitor he could check. The photo note says plainly which image was reconstructed from your own original: the "before" photo, one image, nothing else.

**Roro will ask**
- *Why the Vilvoorde address if the van has no base?* Legal seat only. The customer-facing copy is zone-first and never says "based in Vilvoorde" (DECISIONS 2026-08-26).
- *What's the new footer line about?* Since 18 September the footer also links your three problem pages in French and Dutch, so a visitor or Google can reach them from any page, not just from an ad.

## 19. Cookie banner

**What it says.** The consent layer is LIVE since 2026-08-27, because the site now carries Google's call measurement for the ads. On the first visit a card asks for measurement cookies, with your agreement (EN since 2026-10-16: 'Measurement cookies, if you agree'). Two equal buttons, refuse everything and accept everything, and a second layer with separate switches (audience measurement and ads measurement), both off by default. Since 2026-10-08 13:03 the site runs Google's advanced consent mode, for the Google Ads tag only. Before the visitor answers, the Ads tag loads without any cookie (nothing is stored on the phone) and sends a plain page ping; a tap on call or WhatsApp is counted as a cookieless ping too. GA4 (audience measurement) and the website call counter do NOT load until the visitor accepts. Refusing means no cookies, no GA4 and no counter (since 2026-10-16 refusing also deletes any Google cookie already set (`_gcl`, `gwcc`, `_ga`), on the site and its parent domains), and the call and WhatsApp taps are still counted without cookies. A footer link reopens the choice at any time. The call counter has been in the code since 2026-09-12; Google's loader on gstatic.com was blocked by the site's security header until the fix went live on 2026-10-08. It changes one thing, and only for a visitor who accepted and came from an ad click: the number shown becomes a Google forwarding number that rings straight on 0480 649 649. Everyone else sees the page exactly as before. The card title and the privacy pages say all this in the new, honest wording (research/68). Since 2026-09-16 the first layer on a phone is a compact 160 px strip at the bottom, not a card: a small mark and the title on one row, two short sentences naming us and saying Google's script loads at once, with no cookie before you agree, "Tout refuser" and "Tout accepter" side by side at equal size, then two text links, "Choisir" and "Tout savoir sur les cookies". The fine print with the controller's details moved to the second layer. It never covers the hero call button any more; before this change the card was tall enough to hide it (research/35). Nothing about what is stored or for how long changed, so a visitor's earlier choice still holds. Desktop keeps its corner card.

**Why.** Belgian law (art. 129 of the 2005 law) and the APD checklist want equal buttons, no cookie wall, and purposes separable in a second layer. Our build keeps to the minimum that the advanced mode needs: before Accept only the Ads tag loads, with all four consent types denied, no cookie set and no GA4 request, read off the wire (research/67, research/68).

**Roro will ask**
- *Do I need this?* Yes, from the moment we measure calls for the ads, which is now. Without consent the site sets no cookie and still works.
- *Does refusing lose me the customer?* No. Refusing changes nothing for the visitor, he can still call.
- *What loads before the visitor answers?* Only Google's Ads tag, without cookies. No GA4, no call counter, nothing stored on his phone.
- *What happens if he refuses?* No cookies, no GA4, no forwarding number. His call or WhatsApp tap is still counted, without cookies, so the ads still get the signal.
- *What does Accept add?* GA4 (visits) and the website call counter, which swaps the number for visitors who came from an ad.

## 20. Legal pages, in brief

**Privacy policy** (per language). Who handles the data (PRO DEBOUCHAGE SRL), what the visitor gives himself (a call, a WhatsApp message), why and on what legal basis, who receives it, how long it is kept, and his rights. Since the tag round it also covers the measurement cookies, with consent as the legal basis; the 2026-08-28 round adds the per-cookie table (name, purpose, duration, recipient), names Google Ireland as a recipient and states the outside-EU transfer. The 2026-10-16 rewrite (live): the IP sentence follows Google's own docs, a new section explains the website call counter (what Google shows us of a forwarded call: time, length, answered or missed, the caller's area code and, for most calls over 15 seconds, the number), the table adds `_gcl_aw` and `gwcc`, and the cookieless ad measurement rests on legitimate interest (advanced build).

**General conditions (CGV)**, 14 articles, same in FR and NL. Who we are, what they cover, how the contract forms and how the price is set, the price confirmed at the door before starting, evening and weekend surcharges, what we need from the customer, why the 14-day withdrawal right does not apply to an urgent repair, extra work and parts, technical limits and force majeure, payment and VAT, late payment, the 30-day return guarantee and its limits, our liability and insurance, complaints, mediation, applicable law and court.

**Why.** Built on the checklist in research/22: article XII.6 information duties, the VI.53 8° urgent-repair exception quoted correctly, the VI.83 blacklist, and the Livre XIX reminder and cap rules. The urgent-repair waiver is signed on the work order, never on the invoice (research/26).

**Roro will ask**
- *Can a customer cancel after I unblocked at midnight?* Not for the urgent work he asked for, and article 7 explains why. It only holds if the work order carries the signed lines. We give you those.
- *Do I really need an invoice every time?* Yes. For private customers in this trade the invoice is always mandatory, no threshold (research/26).
- *Who wrote all this?* We did, from the Belgian rules. Your accountant can read it, and anything he wants changed we change.
