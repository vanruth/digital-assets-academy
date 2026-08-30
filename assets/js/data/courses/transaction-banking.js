/* Bundled course — validate with tools/validate-course.py before committing. */
(window.DA_BUNDLED = window.DA_BUNDLED || []).push(
{
  "id": "transaction-banking",
  "title": "Transaction Banking",
  "subtitle": "Cash, trade and securities services — the plumbing that funds the bank",
  "icon": "▦",
  "updated": "2026-08-30",
  "source": {
    "kind": "bundled",
    "note": "written for you, 30 August 2026"
  },
  "modules": [
    {
      "id": "m1",
      "title": "What transaction banking is",
      "tagline": "The unglamorous business that funds the bank",
      "icon": "▦",
      "summary": "Transaction banking is the plumbing of corporate finance: moving money, financing trade, and holding assets. It is low-margin per unit, enormous in volume, and it produces the cheapest funding a bank has.",
      "outcomes": [
        "Name the three pillars and what each sells",
        "Explain why a bank values transaction banking out of proportion to its fee income",
        "Describe who buys it and what they are actually trying to fix",
        "Say why the deposit, not the fee, is usually the prize"
      ],
      "lessons": [
        {
          "id": "m1l1",
          "title": "The three pillars",
          "minutes": 8,
          "key": [
            "Cash management, trade finance and securities services are the three pillars",
            "Revenue is annuity-like: it recurs with the client's operations rather than with deals",
            "It sits in the corporate and institutional bank, alongside markets and lending"
          ],
          "body": "<p>Transaction banking is what a bank sells to companies and other financial institutions to run their day-to-day operations, as distinct from what it sells them to raise capital or take risk. Three pillars:</p>\n<h4>Cash management</h4>\n<p>Accounts, payments, collections, and the machinery for concentrating balances where they are useful. This is the largest pillar by revenue at most banks and the one that anchors the relationship — a company that runs its payroll and supplier payments through you is not casually going to move.</p>\n<h4>Trade finance</h4>\n<p>Instruments that make it safe to trade with a counterparty you do not entirely trust, and financing against the trade itself: letters of credit, guarantees, receivables and payables finance.</p>\n<h4>Securities services</h4>\n<p>Holding assets safely on behalf of institutional clients and servicing them — custody, corporate actions, fund administration. Standard Chartered runs this within <strong>Financing &amp; Securities Services</strong> in the corporate and institutional bank.</p>\n<h4>What makes it different from the rest of the bank</h4>\n<p>Investment banking revenue is <em>episodic</em>: it arrives when a deal closes. Transaction banking revenue is <em>annuity-like</em>: it arrives every time the client pays a supplier, imports a container, or receives a dividend. That recurrence is why it holds up when markets do not.</p>\n<div class=\"callout\">A useful test of whether something belongs here: does the client use it on a Tuesday in a quiet month? Payments, yes. An acquisition facility, no.</div>"
        },
        {
          "id": "m1l2",
          "title": "Why banks want it so badly",
          "minutes": 9,
          "key": [
            "Operational deposits are the cheapest and stickiest funding a bank has",
            "Basel's liquidity rules treat operational deposits far more favourably than other corporate deposits",
            "Fees are visible; the deposit and the data are usually worth more"
          ],
          "body": "<p>Read a bank's disclosures and transaction banking looks like a modest fee line. That understates it, for three reasons.</p>\n<h4>1. The deposits</h4>\n<p>A company that runs its payments through you leaves balances with you — not because it wants to lend you money, but because that is where its operations sit. These are <strong>operational deposits</strong>, and they are the cheapest funding a bank can raise. They are also unusually stable, because moving them means re-plumbing the company's treasury.</p>\n<p>Liquidity regulation recognises this. Under the Liquidity Coverage Ratio, deposits identified as operational attract a much lower assumed run-off than ordinary corporate deposits, which means the bank has to hold far less high-quality liquid assets against them. The same pound of deposit is worth materially more to the balance sheet if it arrived through cash management.</p>\n<h4>2. The capital profile</h4>\n<p>Much of the business is fee-generating and short-dated. Trade finance exposures are typically self-liquidating and measured in weeks or months, which is a very different capital proposition from a five-year term loan.</p>\n<h4>3. The anchor</h4>\n<p>Transaction banking is where the client relationship physically lives. The treasurer talks to their cash management bank constantly and their lending bank occasionally. That access is what everything else is cross-sold from.</p>\n<div class=\"callout warn\">The corollary matters for strategy: anything that lets a corporate hold operating balances somewhere other than a bank — a payments platform, a tokenised money fund, a stablecoin — attacks the funding base, not just the fee.</div>"
        },
        {
          "id": "m1l3",
          "title": "Who buys it, and what they actually want",
          "minutes": 8,
          "key": [
            "The buyer is a corporate treasurer or a financial institution, not a CFO chasing a deal",
            "Visibility, control and working capital are the recurring asks",
            "FI clients buy the bank's network rather than its balance sheet"
          ],
          "body": "<p>Two very different client types.</p>\n<h4>Corporates</h4>\n<p>The buyer is the <strong>treasurer</strong> or head of treasury operations. Their problems are consistent across industries:</p>\n<ul>\n<li><strong>Visibility</strong> — knowing what cash exists, in which entity, in which currency, today rather than at month end</li>\n<li><strong>Control</strong> — making sure only the right people can move money, and that fraud is caught before settlement rather than after</li>\n<li><strong>Working capital</strong> — being paid sooner, paying later, and financing the gap cheaply</li>\n<li><strong>Access</strong> — being able to operate in a market where they have just opened a subsidiary</li>\n</ul>\n<p>Notice that none of these is \"a better interest rate\". Price matters, but a treasurer who cannot see their cash has a bigger problem than a few basis points.</p>\n<h4>Financial institutions</h4>\n<p>Banks, brokers, insurers and fund managers buying access to a market or currency the provider is strong in — clearing US dollars, settling in a frontier currency, holding securities in a market where they have no local presence. The FI client is buying <em>network and licences</em>, which is exactly why a bank with an unusual footprint can hold this business against much larger competitors.</p>\n<p>For a bank whose franchise is Asia, Africa and the Middle East, the FI business is disproportionately important: it monetises the network itself rather than the balance sheet.</p>"
        },
        {
          "id": "m1l4",
          "title": "How it is won and priced",
          "minutes": 8,
          "key": [
            "Mandates are won through long RFPs and lost through implementation",
            "Pricing is negotiated across the relationship, not per product",
            "Wallet share, not new logos, is the growth mechanism"
          ],
          "body": "<p>Transaction banking is sold through <strong>RFPs</strong> that run for months and are decided by committee. A large multinational will re-tender its cash management perhaps every five to seven years, and the process weighs coverage, technology, service and price roughly in that order.</p>\n<h4>Implementation is the real product</h4>\n<p>Winning the mandate is the beginning. The bank then has to open accounts in a dozen jurisdictions, connect to the client's treasury system, test file formats, and migrate live payment flows without breaking payroll. Implementation routinely takes longer than the sales cycle, and it is where mandates are quietly lost — a bank that wins on paper and implements badly does not get the next region.</p>\n<h4>How pricing works</h4>\n<p>Rarely per product on its own merits. The bank prices the <em>relationship</em>: transaction fees, the value of the deposits, foreign exchange margin on cross-currency flows, and the lending relationship are traded off against each other. A headline payment fee of near zero can be perfectly rational if the balances and the FX are worth enough.</p>\n<div class=\"callout\">This is why comparing per-transaction pricing between banks tells you almost nothing. Ask instead what the bank expects to earn on the whole flow — fees, float, FX and the funding value of the balances.</div>\n<h4>Growth</h4>\n<p>Mostly <strong>wallet share</strong>: an existing client adding a country, moving another subsidiary across, or shifting more of its flows. New-name wins are rare and slow, which makes retention economics dominant.</p>"
        }
      ],
      "number": 1,
      "minutes": 33
    },
    {
      "id": "m2",
      "title": "Payments and the movement of money",
      "tagline": "Rails, messages and why cross-border is hard",
      "icon": "⇄",
      "summary": "Domestic payment rails are fast, cheap and boring. Cross-border payments run through a chain of correspondent banks, and nearly every complaint about payments is really a complaint about that chain.",
      "outcomes": [
        "Distinguish RTGS, ACH and instant rails and say when each is used",
        "Explain correspondent banking with nostro and vostro accounts",
        "Say what ISO 20022 changes and why banks care",
        "Identify what is actually attacking cross-border payments"
      ],
      "lessons": [
        {
          "id": "m2l1",
          "title": "Domestic rails",
          "minutes": 8,
          "key": [
            "RTGS settles gross in central bank money, instantly and irrevocably",
            "ACH settles net in batches — cheap, slower, and it carries credit risk between cycles",
            "Instant rails are 24/7 retail-scale systems that are increasingly used by corporates"
          ],
          "body": "<p>Every country has a small number of ways to move domestic money, and they trade off cost against finality.</p>\n<h4>RTGS — real-time gross settlement</h4>\n<p>Each payment settles individually and immediately across accounts at the central bank. Settlement is in <strong>central bank money</strong>, so once done there is no credit risk between the banks at all. Expensive per item, used for high-value and time-critical payments. CHAPS in the UK, Fedwire in the US, TARGET2 in the euro area.</p>\n<h4>ACH — automated clearing house</h4>\n<p>Payments are batched and settled net at intervals. Cheap per item, which is why payroll and supplier runs go this way. Because obligations accumulate between settlement cycles, banks carry exposure to each other in the meantime.</p>\n<h4>Instant payment rails</h4>\n<p>The newer layer: 24/7, near-instant, irrevocable, with per-payment limits that have been rising steadily. UPI in India, FPS in the UK, PIX in Brazil, FAST in Singapore. Built for retail, they increasingly carry corporate flows because a treasurer who can pay at 3am on a Sunday can run leaner buffers.</p>\n<div class=\"callout\">The gross-versus-net distinction is worth holding onto. Gross settlement removes counterparty risk and consumes liquidity all day; net settlement conserves liquidity and creates exposure between cycles. Every payment system design is somewhere on that trade-off.</div>"
        },
        {
          "id": "m2l2",
          "title": "Correspondent banking",
          "minutes": 9,
          "key": [
            "A bank holds a nostro account with a foreign bank to settle in that currency",
            "The same account is a vostro from the account-holding bank's perspective",
            "Cross-border payments are slow because each hop revalidates, not because the network is slow"
          ],
          "body": "<p>There is no global payment system. A bank in Kenya cannot settle US dollars directly, because dollar settlement happens across accounts at the Federal Reserve and it has none. So it holds an account with a bank that does.</p>\n<h4>Nostro and vostro</h4>\n<p>The same account, named from either side:</p>\n<ul>\n<li><strong>Nostro</strong> — \"our account with you.\" The Kenyan bank's dollar account held at a US bank.</li>\n<li><strong>Vostro</strong> — \"your account with us.\" The identical account, described by the US bank.</li>\n</ul>\n<p>A cross-border payment is a series of debits and credits along a chain of such accounts until the money reaches a bank that can pay the beneficiary locally.</p>\n<h4>Why it is slow and expensive</h4>\n<p>Not the messaging — a SWIFT message crosses the world in seconds. The delay is that each bank in the chain independently applies sanctions screening and financial crime checks, deducts a fee, and works to its own cut-off times and business days. Three intermediaries means three sets of checks, three fees, and three chances of a query stopping the payment.</p>\n<p>The chain also explains the two things corporates complain about most: they cannot see where a payment is, and they cannot tell the beneficiary exactly what will arrive.</p>\n<div class=\"callout warn\">Since the financial crisis, banks have exited correspondent relationships wholesale rather than carry the compliance cost — <strong>de-risking</strong>. The effect falls hardest on small banks in emerging markets, which is precisely where alternative rails have found their opening.</div>"
        },
        {
          "id": "m2l3",
          "title": "Messaging and ISO 20022",
          "minutes": 8,
          "key": [
            "SWIFT is a messaging network, not a settlement system — it moves instructions, not money",
            "ISO 20022 replaces terse MT messages with structured, far richer data",
            "The value is in what the richer data enables: reconciliation, screening, analytics"
          ],
          "body": "<p><strong>SWIFT</strong> is a member-owned cooperative running a secure messaging network between financial institutions. It is important to be precise: SWIFT moves <em>instructions</em>. The money moves across the correspondent accounts described in the last lesson. When people say a payment \"went through SWIFT\", they mean the instruction did.</p>\n<h4>From MT to MX</h4>\n<p>The legacy format is the <strong>MT</strong> message — compact, positional, designed when bandwidth was precious. An MT103 customer payment squeezes name, address and reference into a handful of tight fields, which is why beneficiary details arrive truncated and why screening systems generate so many false positives.</p>\n<p><strong>ISO 20022</strong> replaces this with XML messages carrying structured, labelled data: separate fields for each element of a name and address, structured remittance information, purpose codes, a clean chain of parties. Major market infrastructures have been migrating to it, with coexistence periods rather than hard cutovers.</p>\n<h4>Why it actually matters</h4>\n<ul>\n<li><strong>Reconciliation</strong> — structured remittance data lets a corporate match an incoming payment to an invoice automatically instead of by hand</li>\n<li><strong>Screening</strong> — properly separated party data cuts false positives, which is where compliance cost lives</li>\n<li><strong>Analytics</strong> — purpose codes and clean data make flow genuinely legible</li>\n</ul>\n<p>The migration itself is unglamorous and expensive, and its benefits arrive only when both ends and everyone in between have moved. That coordination problem is the whole story of payments modernisation.</p>"
        },
        {
          "id": "m2l4",
          "title": "Payment products",
          "minutes": 8,
          "key": [
            "Virtual accounts give one real account many addressable identifiers",
            "Bulk files, not single payments, are how corporates actually pay",
            "Host-to-host and API connectivity is where the relationship becomes hard to move"
          ],
          "body": "<p>What a bank actually sells on top of the rails.</p>\n<h4>Bulk payments</h4>\n<p>Corporates rarely make single payments. They send a file of thousands — payroll, supplier runs, dividends — and the bank splits it across the right rails. Getting file formats to work between the client's ERP and the bank is most of an implementation project.</p>\n<h4>Collections and virtual accounts</h4>\n<p>Being paid is harder than paying, because the payer controls the reference. <strong>Virtual accounts</strong> solve this elegantly: the bank issues many account identifiers that all settle into one real account, so an insurer can give every policyholder their own number and identify every incoming payment automatically. The reconciliation problem disappears at the point of receipt.</p>\n<h4>Direct debits and mandates</h4>\n<p>Pull rather than push, and therefore governed by mandate rules and refund rights that vary sharply by country.</p>\n<h4>Connectivity</h4>\n<p>How instructions reach the bank:</p>\n<ul>\n<li><strong>Portal</strong> — the bank's own screen, for smaller clients</li>\n<li><strong>Host-to-host</strong> — an automated file link from the client's ERP, still the workhorse for large corporates</li>\n<li><strong>API</strong> — real-time balances, payment initiation and status, increasingly embedded directly inside the client's treasury system</li>\n<li><strong>SWIFT for corporates</strong> — a large multinational connecting once and reaching all its banks</li>\n</ul>\n<div class=\"callout\">Connectivity is quietly the deepest moat in the business. Once a client's ERP is wired into your systems and tested, switching is a project with a budget and a risk register — not a decision.</div>"
        },
        {
          "id": "m2l5",
          "title": "What is attacking cross-border",
          "minutes": 9,
          "key": [
            "The pressure is on the correspondent chain, not on domestic rails",
            "Fintechs pre-fund local accounts and net internally rather than routing through the chain",
            "Instant-rail interlinking and stablecoins attack the same weakness from different directions"
          ],
          "body": "<p>Domestic payments are largely solved: fast, cheap, reliable. Cross-border is where the complaints and the competition are.</p>\n<h4>Payment fintechs</h4>\n<p>Wise, Nium, Airwallex and similar do not use the correspondent chain for each payment. They hold local accounts in both countries, pay out locally from pre-funded balances, and net their own positions periodically. The customer's money never crosses a border; only the obligation does. That is why it is fast and transparent — and why it demands working capital in every market.</p>\n<h4>Instant rail interlinking</h4>\n<p>If two countries both have instant domestic rails, connecting them is a smaller problem than building something new. Project Nexus, coordinated through the BIS, aims at a common way to link them. Singapore–Thailand and India–Singapore links already work.</p>\n<h4>Stablecoins</h4>\n<p>Covered properly in the digital assets course, but the shape of the threat is the same: a dollar-denominated instrument that settles in minutes disintermediates the correspondent chain precisely in corridors where that chain is thin and expensive. Adoption is concentrated in business-to-business flows in emerging markets — the same corridors where emerging-market banks earn their margin.</p>\n<h4>What the incumbents have</h4>\n<p>Licences, local clearing access, credit, the ability to hold operating balances, and someone to call when a payment stops. None of that is nothing. But the specific claim that cross-border must be slow and opaque is no longer defensible, which is why SWIFT gpi, instant rails and tokenised settlement all exist.</p>"
        }
      ],
      "number": 2,
      "minutes": 42
    },
    {
      "id": "m3",
      "title": "Cash and liquidity management",
      "tagline": "Making a company's own money useful to it",
      "icon": "◫",
      "summary": "A large group's cash is scattered across entities, currencies and countries, much of it unusable where it sits. Liquidity management is the business of concentrating it — and the constraints are legal and tax, not technical.",
      "outcomes": [
        "Explain physical pooling and notional pooling and the difference between them",
        "Say why cash gets trapped and what that costs",
        "Describe the cash conversion cycle and where a bank can shorten it",
        "Explain how a bank earns on balances it holds"
      ],
      "lessons": [
        {
          "id": "m3l1",
          "title": "Account structures",
          "minutes": 7,
          "key": [
            "Structure follows legal entities, which follow tax and regulation",
            "In-house banks let one entity bank the others internally",
            "Every extra account is an extra reconciliation and an extra control point"
          ],
          "body": "<p>A multinational's account structure looks baroque because it mirrors the legal entity structure, which exists for tax and regulatory reasons long before anyone thought about treasury.</p>\n<h4>The building blocks</h4>\n<ul>\n<li><strong>Operating accounts</strong> — one per entity per currency, where the actual business flows</li>\n<li><strong>Header or concentration accounts</strong> — where balances are gathered</li>\n<li><strong>Multi-currency accounts</strong> — several currencies under one account relationship, reducing the account sprawl</li>\n<li><strong>Virtual accounts</strong> — identifiers rather than real accounts, used to segregate flows without opening more of them</li>\n</ul>\n<h4>The in-house bank</h4>\n<p>Large groups often designate one entity to bank the others: subsidiaries hold intercompany positions with the treasury entity rather than external accounts everywhere. It concentrates external banking into few relationships and turns dozens of external accounts into internal ledger entries — but it needs proper intercompany documentation and defensible transfer pricing, or it becomes a tax problem.</p>\n<div class=\"callout\">Every account is a reconciliation, a set of signatories, a fraud surface and an audit line. Structures are simplified as often as they are extended, and \"fewer accounts\" is a legitimate treasury project on its own.</div>"
        },
        {
          "id": "m3l2",
          "title": "Pooling and sweeping",
          "minutes": 9,
          "key": [
            "Physical pooling actually moves money and creates intercompany loans",
            "Notional pooling offsets balances for interest without moving them",
            "Cross-border pooling is constrained by capital controls and tax, not technology"
          ],
          "body": "<p>Two mechanisms, routinely confused, with quite different consequences.</p>\n<h4>Physical pooling (cash concentration, sweeping)</h4>\n<p>Money genuinely moves. At end of day, balances sweep from participating accounts into a header account, often automatically and by rule — sweep everything, or sweep to leave a target balance. Consequences:</p>\n<ul>\n<li>Each sweep creates an <strong>intercompany loan</strong> between the entity and the header entity, which needs documentation and arm's-length interest</li>\n<li>Withholding tax can apply to that interest</li>\n<li>The group ends up with one external position instead of many, which is the point</li>\n</ul>\n<h4>Notional pooling</h4>\n<p>No money moves. The bank calculates interest as though the balances were one, so a subsidiary £2m overdrawn and another £3m in credit are charged and paid as if on £1m net. Attractive because it avoids intercompany lending entirely.</p>\n<p>The catch is on the bank's side. To offset for interest, the bank generally needs legal right of set-off across the participants, and cross-guarantees between them. Bank capital and leverage rules constrain when balances can be presented net rather than gross, and several banks pulled back from offering true cross-border notional pooling once those rules bit.</p>\n<h4>Cross-border</h4>\n<p>The hard constraints are external. Capital controls in many markets restrict moving cash out; some currencies cannot leave at all. Withholding tax and transfer pricing shape what is worth doing. A treasurer with cash in a restricted market is not short of technology.</p>"
        },
        {
          "id": "m3l3",
          "title": "Trapped cash and the working capital cycle",
          "minutes": 8,
          "key": [
            "Trapped cash is real money that cannot be deployed where it is needed",
            "The cash conversion cycle is DSO plus DIO minus DPO",
            "Shortening the cycle is usually worth more than the interest rate on the balances"
          ],
          "body": "<p>Two ideas a treasurer thinks about constantly.</p>\n<h4>Trapped cash</h4>\n<p>Cash that legally exists but cannot be moved to where it is wanted — blocked by capital controls, by a tax charge on repatriation, by a regulatory minimum, or by a joint venture partner's consent rights. Groups routinely borrow at the centre while holding idle balances in restricted markets, because the alternative is worse.</p>\n<h4>The cash conversion cycle</h4>\n<p>How long a company's cash is tied up in operations:</p>\n<p><strong>CCC = DSO + DIO − DPO</strong></p>\n<ul>\n<li><strong>DSO</strong> — days sales outstanding: how long customers take to pay</li>\n<li><strong>DIO</strong> — days inventory outstanding: how long stock sits</li>\n<li><strong>DPO</strong> — days payable outstanding: how long the company takes to pay suppliers</li>\n</ul>\n<p>A shorter cycle means less cash locked in the business. Every transaction banking product aims at one of these terms: collections and receivables finance at DSO, payables finance at DPO, inventory and trade finance at DIO.</p>\n<div class=\"callout\">This is the frame that makes the product set coherent. A treasurer is not buying a payment; they are buying days out of the cycle. Sell a service that removes five days of DSO and the interest rate on the balance is a rounding error by comparison.</div>"
        },
        {
          "id": "m3l4",
          "title": "How the bank earns on balances",
          "minutes": 8,
          "key": [
            "Net interest income on deposits is usually larger than the fee income",
            "Operational deposits get favourable liquidity treatment, so they are worth more",
            "Falling policy rates compress this income, which changes how the business is priced"
          ],
          "body": "<p>Three revenue lines, in rough order of size for most cash management franchises.</p>\n<h4>1. Net interest income</h4>\n<p>The bank holds the client's balances and earns more on them than it pays. In a high-rate environment this dwarfs everything else, which is why cash management revenue at most banks rose sharply as rates rose — and why it compresses when they fall. A business whose economics swing with policy rates has to be managed with that in mind.</p>\n<h4>2. Fees</h4>\n<p>Per transaction, per account, per report. Visible, negotiated hard, and often the smallest of the three.</p>\n<h4>3. Foreign exchange</h4>\n<p>Every cross-currency payment carries a spread. For a bank whose clients constantly convert between currencies, this is substantial and frequently under-appreciated by the client, because it is not itemised as a fee.</p>\n<h4>Why deposit quality matters</h4>\n<p>Not all deposits are equal to a bank. Under the Liquidity Coverage Ratio a bank assumes a run-off rate for each deposit type and holds high-quality liquid assets against it. Deposits that are genuinely <strong>operational</strong> — needed by the client to run clearing, custody or cash management — attract a much lower assumed run-off than balances parked for yield.</p>\n<p>So a pound of operational deposit requires less liquidity buffer than a pound of non-operational deposit, and is worth more. This is why banks care about being the operating bank rather than merely holding a balance, and why \"is this deposit operational?\" is a real, audited question rather than a marketing one.</p>"
        }
      ],
      "number": 3,
      "minutes": 32
    },
    {
      "id": "m4",
      "title": "Trade finance",
      "tagline": "Making it safe to trade with a stranger",
      "icon": "▤",
      "summary": "Trade finance solves a specific problem: the exporter will not ship before payment and the importer will not pay before shipment. Banks resolve the standoff by inserting their own credit, then finance the gap.",
      "outcomes": [
        "Explain the standoff trade finance exists to solve",
        "Describe a letter of credit and why banks examine documents rather than goods",
        "Distinguish demand from conditional guarantees and say why it matters",
        "Explain payables finance and what went wrong at Greensill"
      ],
      "lessons": [
        {
          "id": "m4l1",
          "title": "The problem, and open account",
          "minutes": 8,
          "key": [
            "Trade finance exists because neither side wants to go first",
            "Most world trade is now open account, not documentary",
            "Documentary instruments persist where trust, distance or regulation demand them"
          ],
          "body": "<p>An exporter in Vietnam and an importer in Nigeria have never met. The exporter will not ship without assurance of payment; the importer will not pay without assurance of shipment. Somebody has to go first, and neither will.</p>\n<h4>The four ways to settle</h4>\n<ul>\n<li><strong>Cash in advance</strong> — importer pays first. All risk on the importer.</li>\n<li><strong>Open account</strong> — exporter ships and invoices, payment follows in 30 to 90 days. All risk on the exporter.</li>\n<li><strong>Documentary collection</strong> — banks pass documents against payment or acceptance, but no bank guarantees anything.</li>\n<li><strong>Letter of credit</strong> — a bank undertakes to pay against compliant documents. Risk moves to the bank.</li>\n</ul>\n<h4>Open account dominates</h4>\n<p>The large majority of world trade by value now settles on open account. Established relationships do not need an instrument, and credit insurance covers what remains. Documentary trade has been shrinking for decades as a share of the total.</p>\n<p>What remains documentary clusters where you would expect: new counterparties, politically or economically volatile markets, regulated commodity flows, and jurisdictions where an LC is required to obtain foreign exchange or clear customs.</p>\n<div class=\"callout\">Open account shifting risk onto the exporter is precisely what created the modern receivables and supply chain finance market. The instrument did not disappear — the financing need moved.</div>"
        },
        {
          "id": "m4l2",
          "title": "Letters of credit",
          "minutes": 9,
          "key": [
            "Four parties: applicant, issuing bank, beneficiary, advising or confirming bank",
            "The credit is independent of the sale contract — the autonomy principle",
            "Banks pay against compliant documents; discrepancies are the ordinary failure"
          ],
          "body": "<p>A letter of credit substitutes a bank's promise for the buyer's. That single substitution is the product.</p>\n<h4>The parties</h4>\n<ul>\n<li><strong>Applicant</strong> — the buyer, who asks its bank to issue</li>\n<li><strong>Issuing bank</strong> — takes on the obligation to pay</li>\n<li><strong>Beneficiary</strong> — the seller, entitled to be paid</li>\n<li><strong>Advising bank</strong> — in the seller's country, authenticates and passes on the credit</li>\n<li><strong>Confirming bank</strong> — optionally adds its own independent undertaking, which matters when the issuing bank or its country is the risk the seller is worried about</li>\n</ul>\n<h4>The autonomy principle</h4>\n<p>The credit is a separate contract from the sale. A dispute about the goods does not by itself relieve the bank of its obligation to pay against compliant documents. Without this, the instrument would be worthless — a bank cannot be asked to adjudicate commercial disputes.</p>\n<h4>Documents, not goods</h4>\n<p>Nobody at the issuing bank inspects the cargo. The bank checks whether the documents presented — invoice, transport document, insurance certificate, certificate of origin — comply with the credit on their face, under the ICC's <strong>UCP 600</strong> rules.</p>\n<p>A mismatch is a <strong>discrepancy</strong>, and discrepancies are the normal failure mode: a date out by a day, a goods description that does not read identically, an insured amount below the required percentage. A very large share of first presentations are discrepant. Most are curable if there is time before expiry, which is why presentation deadlines matter more than they appear to.</p>\n<div class=\"callout warn\">Fraud is the recognised exception to autonomy: courts will restrain payment where fraud is clearly established. The bar is deliberately high, because a low one would destroy the instrument.</div>"
        },
        {
          "id": "m4l3",
          "title": "Guarantees and standby credits",
          "minutes": 8,
          "key": [
            "A demand guarantee pays on a compliant demand, without proof of default",
            "A conditional guarantee requires the beneficiary to establish default first",
            "The distinction decides who funds the dispute, not who is right"
          ],
          "body": "<p>Where a letter of credit is a payment mechanism expected to be drawn, a guarantee is a security expected <em>not</em> to be drawn. It sits behind an obligation and pays only if something goes wrong.</p>\n<h4>Demand versus conditional</h4>\n<p>A <strong>demand guarantee</strong> pays on presentation of a compliant demand. The beneficiary need not prove the other side actually defaulted. A <strong>conditional guarantee</strong> pays only once default is established, which may mean a judgment or an arbitral award.</p>\n<p>The distinction does not change who is ultimately right. It changes <em>who is out of pocket while that is decided</em> — and in a dispute running years, that is most of the commercial substance.</p>\n<h4>Common types</h4>\n<ul>\n<li><strong>Performance guarantee</strong> — the contractor will perform, typically 5–10% of contract value</li>\n<li><strong>Advance payment guarantee</strong> — an advance will be repaid if the work is not done</li>\n<li><strong>Bid or tender bond</strong> — a bidder that wins will enter the contract</li>\n<li><strong>Standby letter of credit</strong> — functionally a guarantee, issued in LC form, common where US banks were historically restricted from issuing guarantees</li>\n</ul>\n<h4>Rules and risk</h4>\n<p>Demand guarantees are commonly issued under the ICC's <strong>URDG 758</strong>. The applicant's exposure is an <strong>unfair calling</strong>: a beneficiary demanding payment where nothing has gone wrong. Courts will restrain payment only for clearly established fraud or abuse, so the practical protections are drafting, expiry dates and reduction clauses.</p>\n<div class=\"callout\">Ask of any guarantee: who holds the cash while the argument runs? That, and not the label on the document, is what has actually been negotiated.</div>"
        },
        {
          "id": "m4l4",
          "title": "Supply chain and receivables finance",
          "minutes": 9,
          "key": [
            "Payables finance lets suppliers be paid early at the buyer's credit rating",
            "Receivables finance is the seller financing its own invoices",
            "Greensill showed the accounting and concentration risks are real"
          ],
          "body": "<p>The fastest-growing part of trade finance, and the part that most often goes wrong.</p>\n<h4>Payables finance (reverse factoring)</h4>\n<p>A large buyer with a strong credit rating approves supplier invoices. A bank offers those suppliers early payment, discounted at a rate reflecting <em>the buyer's</em> credit, not the supplier's. The bank is repaid by the buyer at the original due date.</p>\n<p>Everyone appears to gain: the supplier is paid in days at a good rate, the buyer keeps or extends its payment terms, the bank earns a short-dated exposure to a strong name. It is genuinely useful — and it has a sharp edge.</p>\n<h4>The accounting question</h4>\n<p>If the buyer's obligation is still a trade payable, it sits in working capital. If the arrangement has changed its character enough to be borrowing, it is debt. Programmes that extend payment terms far beyond commercial norms, or where the bank's rights differ materially from a supplier's, invite reclassification. Accounting standard-setters have moved toward requiring disclosure of these programmes precisely because they were being used to flatter reported leverage.</p>\n<h4>Receivables finance</h4>\n<p>The mirror image: a seller finances its own invoices. <strong>Factoring</strong> sells them outright, often with the buyer notified; <strong>invoice discounting</strong> borrows against them, usually confidentially. The key question is whether it is <em>with recourse</em> — if the debtor does not pay, does the risk come back to the seller? With recourse it is a loan; without, it is closer to a sale of the asset.</p>\n<div class=\"callout warn\">Greensill Capital collapsed in 2021 having built enormous supply chain finance exposure with heavy concentration in a small number of obligors, funded by investment funds sold to investors as low-risk, and extending into \"future receivables\" that were not receivables at all. The lesson was not that the product is unsound — it is that short-dated self-liquidating exposure stops being either if you concentrate it and stretch the definition.</div>"
        },
        {
          "id": "m4l5",
          "title": "Documents, digitisation and fraud",
          "minutes": 8,
          "key": [
            "The bill of lading is a document of title — whoever holds it controls the goods",
            "Duplicate financing of the same cargo is a chronic commodity trade fraud",
            "MLETR and the UK's Electronic Trade Documents Act removed the legal blocker; adoption is the coordination problem"
          ],
          "body": "<p>Trade finance still runs on paper, and the reason is legal rather than technological.</p>\n<h4>Why the bill of lading is special</h4>\n<p>It is not merely a receipt. A negotiable bill of lading is a <strong>document of title</strong>: whoever holds the original controls the goods, and it can be transferred by endorsement while the cargo is at sea. That is what makes it usable as collateral — and it is exactly why it resisted digitisation. A legal system that recognises possession of a physical original does not straightforwardly recognise a file that can be copied.</p>\n<h4>The legal fix</h4>\n<p>The UNCITRAL <strong>Model Law on Electronic Transferable Records (MLETR)</strong> supplies a framework for giving electronic records the same legal effect, provided a reliable system ensures exclusive control. The UK's <strong>Electronic Trade Documents Act 2023</strong> implemented this in a major trade law jurisdiction, and others have followed.</p>\n<p>What remains is coordination. An electronic bill of lading is only useful if the carrier, both traders, both banks, the insurer and the destination port authority all accept it. That is a network problem, and it is why trade digitisation has been two years away for a decade.</p>\n<h4>Fraud</h4>\n<p>Commodity trade finance has a recurring failure: the same cargo financed several times with different banks, each believing it holds security over it. Because banks could not see each other's exposures, a trader could pledge one shipment repeatedly. A run of large losses in commodity trading hubs around 2020 followed exactly this pattern, and it is the strongest argument for a shared registry — where a bank could check whether a document has already been pledged.</p>\n<div class=\"callout\">Note how neatly this maps onto the digital assets syllabus: the binding constraint is record-keeping, the legal blocker has been removed, and what is left is getting everyone onto the same record at once.</div>"
        }
      ],
      "number": 4,
      "minutes": 42
    },
    {
      "id": "m5",
      "title": "Securities services",
      "tagline": "Holding other people's assets, and everything that follows",
      "icon": "▥",
      "summary": "Custody looks like safekeeping and is really record-keeping and servicing. The fees are thin, the volumes vast, and the risk sits in the operational detail rather than in credit.",
      "outcomes": [
        "Describe the custody chain from investor to central depository",
        "Explain why asset servicing carries more operational risk than safekeeping",
        "Distinguish custody, fund administration and depositary roles"
      ],
      "lessons": [
        {
          "id": "m5l1",
          "title": "The custody chain",
          "minutes": 8,
          "key": [
            "Global custodian, sub-custodian, CSD — each link is a record, not a vault",
            "Assets are held in omnibus or segregated accounts, and the difference matters in insolvency",
            "A bank with local presence sells sub-custody to global custodians who lack it"
          ],
          "body": "<p>An institutional investor does not hold securities directly. Ownership is recorded through a chain.</p>\n<ul>\n<li><strong>Investor</strong> — a pension fund or asset manager</li>\n<li><strong>Global custodian</strong> — a single relationship covering many markets</li>\n<li><strong>Sub-custodian</strong> — a bank in each local market, appointed by the global custodian</li>\n<li><strong>CSD</strong> — the central securities depository where the definitive record sits</li>\n<li><strong>ICSD</strong> — Euroclear or Clearstream, for internationally traded instruments</li>\n</ul>\n<p>Nothing is in a vault. Each link is an entry in a register, and custody is the business of maintaining those entries accurately and reconciling them constantly.</p>\n<h4>Omnibus versus segregated</h4>\n<p>Assets of many clients may sit in one <strong>omnibus</strong> account at the sub-custodian, with the custodian's own books identifying who owns what — efficient, and it makes the custodian's records the thing standing between a client and its assets in an insolvency. A <strong>segregated</strong> account holds one client's assets in their own name: safer, more expensive, and demanded by clients who have thought about failure.</p>\n<h4>The commercial shape</h4>\n<p>A bank with strong local presence in markets global custodians cannot reach economically sells <strong>sub-custody</strong> to those custodians. This is the FI business again: monetising network and licences rather than balance sheet, and it is why footprint in less-covered markets is a real asset.</p>"
        },
        {
          "id": "m5l2",
          "title": "Asset servicing",
          "minutes": 8,
          "key": [
            "Corporate actions are where custody's operational risk concentrates",
            "A missed election is a direct loss the custodian usually bears",
            "Income collection and tax reclaim are unglamorous and highly valued"
          ],
          "body": "<p>Safekeeping is the easy half. Servicing is where the work and the risk are.</p>\n<h4>Corporate actions</h4>\n<p>Anything an issuer does that affects holders: dividends, rights issues, mergers, splits, tender offers, conversions. Split into two kinds:</p>\n<ul>\n<li><strong>Mandatory</strong> — happens regardless. The custodian must process it correctly.</li>\n<li><strong>Voluntary</strong> — the holder must choose by a deadline: take cash or shares, tender or not, exercise or lapse.</li>\n</ul>\n<p>Voluntary actions are the dangerous ones. The custodian must find the event, interpret ambiguous issuer documentation, notify every affected client with enough time, collect elections, and submit them before a deadline that is often earlier than the issuer's. Miss it and the client suffers a quantifiable loss — and the custodian generally pays.</p>\n<h4>Income and tax</h4>\n<p>Collecting dividends and coupons on time, in the right currency, to the right account. Then <strong>tax reclaim</strong>: recovering withholding tax over-deducted at source under double taxation treaties, which is slow, jurisdictionally fiddly, and genuinely valuable to a client with cross-border holdings.</p>\n<h4>Proxy voting</h4>\n<p>Passing meeting notices to holders, collecting instructions and lodging votes — increasingly scrutinised as asset owners are held to account for stewardship.</p>\n<div class=\"callout\">Custody fees are measured in basis points on assets. The economics only work at scale, which is why the industry keeps consolidating and why operational error is so damaging: one missed election can erase the fee income of a large mandate.</div>"
        },
        {
          "id": "m5l3",
          "title": "Funds, clearing and collateral",
          "minutes": 8,
          "key": [
            "Fund administration values the fund; the depositary independently oversees it",
            "Clearing through a CCP replaces bilateral counterparty risk with exposure to the clearing house",
            "Margin rules turned collateral management into a real business"
          ],
          "body": "<p>Three services that sit around custody.</p>\n<h4>Fund services</h4>\n<ul>\n<li><strong>Fund administration</strong> — striking the net asset value, keeping the books, producing investor reporting</li>\n<li><strong>Transfer agency</strong> — maintaining the investor register, processing subscriptions and redemptions</li>\n<li><strong>Depositary</strong> — a distinct regulated role in Europe under UCITS and AIFMD: independent oversight of the fund, cash monitoring, and strict liability for loss of assets in custody</li>\n</ul>\n<p>The depositary role is worth understanding because the liability standard is unusually hard. A depositary that loses financial instruments held in custody must generally return them regardless of fault, subject to narrow exceptions — which changes how the service is priced and how sub-custodians are selected.</p>\n<h4>Clearing</h4>\n<p>A <strong>central counterparty</strong> interposes itself between buyer and seller, so each faces the CCP rather than each other. Counterparty risk is mutualised and netted. Access requires clearing membership, which many firms do not have, so they clear through a bank as a client — a fee business with real risk, since the clearing member stands behind its clients' obligations.</p>\n<h4>Collateral management</h4>\n<p>Post-crisis margin rules for uncleared derivatives created a permanent operational need: calculating exposures, calling for margin, moving eligible collateral daily, and substituting it as needs change. This turned collateral from a back-office chore into a service line — and it is the reason collateral mobility appears in the tokenisation arguments in the digital assets syllabus.</p>"
        }
      ],
      "number": 5,
      "minutes": 24
    },
    {
      "id": "m6",
      "title": "Risk, capital and compliance",
      "tagline": "Why the business is shaped the way it is",
      "icon": "⚖",
      "summary": "Transaction banking's risks are mostly not credit. They are intraday, operational and criminal — and the regulatory treatment of each explains much of how the business is priced and organised.",
      "outcomes": [
        "Describe the credit risks specific to transaction banking",
        "Explain why correspondent banking is the financial crime frontline",
        "Say how trade finance and operational deposits are treated under Basel",
        "Identify where operational loss actually occurs"
      ],
      "lessons": [
        {
          "id": "m6l1",
          "title": "Credit risk in transaction banking",
          "minutes": 8,
          "key": [
            "Intraday exposure is real credit risk even when the position closes by evening",
            "Guarantees and unused limits are contingent exposures that must be capitalised",
            "Trade exposures are short-dated and self-liquidating, which is why capital treatment differs"
          ],
          "body": "<p>Transaction banking looks low-credit-risk, and mostly is. But three exposures are easy to overlook.</p>\n<h4>Intraday exposure</h4>\n<p>A bank routinely releases payments for a client before the covering funds arrive, so that the client's payments go out on time. The exposure may last hours and close by evening — but it is credit risk, and if the client fails at midday the bank has paid out money it never received. Intraday limits are set, monitored and consume capacity even though they never appear on a period-end balance sheet.</p>\n<h4>Contingent exposure</h4>\n<p>A guarantee is a promise to pay if something happens. It is not a drawn loan, but it is a real obligation and is capitalised through a <strong>credit conversion factor</strong> that converts the off-balance-sheet amount into a credit-equivalent exposure. Undrawn committed limits work the same way.</p>\n<h4>Trade credit risk</h4>\n<p>Short-dated, self-liquidating, and secured on goods that exist and are usually insured. Loss experience has historically been low relative to general corporate lending — the ICC's default register was assembled substantially to evidence this to regulators, because trade exposures were being capitalised as though they behaved like term lending.</p>\n<div class=\"callout\">A recurring theme: transaction banking spends much of its regulatory energy arguing that its exposures are genuinely different from lending. Sometimes it wins that argument, and where it does, the economics of the whole business change.</div>"
        },
        {
          "id": "m6l2",
          "title": "Financial crime",
          "minutes": 9,
          "key": [
            "Correspondent banking is the highest-risk relationship a bank has",
            "You must know your customer's customer, which is genuinely hard",
            "De-risking is a rational response with a serious public cost"
          ],
          "body": "<p>Transaction banking moves money for people the bank does not see. That is the whole compliance problem.</p>\n<h4>Why correspondent banking is the frontline</h4>\n<p>When a bank provides a vostro account to a foreign bank, it processes payments for that bank's customers — whom it has never onboarded and cannot see. It is exposed to the quality of another institution's controls in another jurisdiction. Every major correspondent banking enforcement case has this shape.</p>\n<p>Hence <strong>KYCC</strong> — know your customer's customer. In practice: diligence on the respondent bank's own AML programme, ownership and regulator; restrictions on nested relationships where a third bank uses the respondent's account; and transaction monitoring for patterns inconsistent with the respondent's stated business.</p>\n<h4>Sanctions</h4>\n<p>Screening every payment against sanctions lists, in real time, before release. The hard parts are practical rather than conceptual: transliteration of names across alphabets, common names generating volumes of false positives, and the truncated party data in legacy MT messages — one of the strongest practical arguments for ISO 20022.</p>\n<h4>Trade-based money laundering</h4>\n<p>Value moved by misrepresenting trade: over- or under-invoicing, phantom shipments, multiple invoicing of one cargo. It is difficult to detect because it requires knowing what goods are actually worth, and a bank checking documents against a credit is not doing that.</p>\n<h4>De-risking</h4>\n<p>Faced with this, many banks simply exited whole categories of correspondent relationship. Rational institution by institution; in aggregate it has cut correspondent relationships sharply and pushed flows in affected regions toward less transparent channels. Regulators now say publicly that wholesale de-risking is itself a problem.</p>"
        },
        {
          "id": "m6l3",
          "title": "Capital and liquidity treatment",
          "minutes": 8,
          "key": [
            "Credit conversion factors turn off-balance-sheet trade items into credit exposure",
            "The leverage ratio counts exposures without regard to how safe they are",
            "Operational deposits are the reason cash management is strategically valuable"
          ],
          "body": "<p>Three pieces of the Basel framework shape this business more than any commercial decision.</p>\n<h4>Credit conversion factors</h4>\n<p>Off-balance-sheet items are converted into credit-equivalent amounts by a CCF. Short-term self-liquidating trade letters of credit attract a low factor, reflecting genuinely low historical loss; performance guarantees a higher one; unconditionally cancellable commitments the lowest. The calibration of these factors is a live and consequential argument between the trade finance industry and regulators.</p>\n<h4>The leverage ratio</h4>\n<p>A deliberately risk-insensitive backstop: total exposure against capital, ignoring how safe the exposure is. For a business built on large volumes of very low-risk short-dated assets, the leverage ratio — rather than risk-weighted capital — is frequently the binding constraint. Notional pooling ran into exactly this problem.</p>\n<h4>Liquidity</h4>\n<p>The <strong>LCR</strong> assumes a run-off rate for each funding type over a 30-day stress. Operational deposits attract a materially lower assumed run-off than non-operational corporate deposits, so less high-quality liquid asset must be held against them. This single rule is the clearest financial statement of why banks want to be the operating bank rather than merely a place where money sits.</p>\n<p>The <strong>NSFR</strong> works over a one-year horizon, requiring stable funding against assets. Short-dated trade assets require relatively little.</p>\n<div class=\"callout\">If you want to understand why a bank is pushing a particular product, look at which constraint binds. A bank near its leverage ratio behaves very differently from one with surplus capital but scarce stable funding.</div>"
        },
        {
          "id": "m6l4",
          "title": "Operational risk",
          "minutes": 8,
          "key": [
            "Payment fraud is overwhelmingly social engineering, not systems intrusion",
            "Sanctions and screening failures are the largest fine category",
            "Resilience obligations now treat payment outages as regulatory events"
          ],
          "body": "<p>Where money is actually lost.</p>\n<h4>Payment fraud</h4>\n<p>Rarely a broken system. Almost always a person persuaded to authorise something: a spoofed email from a chief executive, a supplier's genuine mailbox compromised and bank details changed, an urgent request timed for a Friday afternoon. Controls that work are procedural — callback verification on any change of bank details, dual authorisation, payment limits, and anomaly detection on beneficiaries never paid before.</p>\n<h4>Sanctions and screening failure</h4>\n<p>The largest fines in the sector's history are for processing payments that should have been stopped, or for stripping information from messages so screening could not catch them. This is why release controls sit before payment, not after: an executed payment cannot be recalled.</p>\n<h4>Cut-offs and value dating</h4>\n<p>Every currency and rail has a cut-off. Miss it and value moves to the next business day — and if that is a Friday before a holiday, a client's supplier is unpaid for four days. Unglamorous, and a leading cause of client complaints.</p>\n<h4>Resilience</h4>\n<p>Regulators increasingly treat payment services as critical infrastructure, with obligations to define impact tolerances for important business services, test against severe but plausible scenarios, and manage third-party concentration. An outage in a cash management platform is now a supervisory event, not merely a service failure.</p>\n<div class=\"callout warn\">Note the shape shared with digital assets: irreversibility. Once a payment is released it cannot be recalled, so every meaningful control has to sit before release.</div>"
        }
      ],
      "number": 6,
      "minutes": 33
    },
    {
      "id": "m7",
      "title": "The competitive picture",
      "tagline": "Where the business is going and who is coming for it",
      "icon": "◎",
      "summary": "Transaction banking is being attacked at the edges rather than the core: in cross-border corridors, in the software layer where treasurers actually work, and in the assumption that balances must sit at a bank.",
      "outcomes": [
        "Name who competes and on what basis",
        "Explain why embedding in the client's software matters more than the portal",
        "Connect tokenisation to the transaction banking business",
        "Apply a framework to judge any new proposition"
      ],
      "lessons": [
        {
          "id": "m7l1",
          "title": "Who competes",
          "minutes": 8,
          "key": [
            "Global banks compete on network; regional banks on local depth",
            "Fintechs attack specific corridors and products, not the whole franchise",
            "ERP and treasury software vendors sit between the bank and the client"
          ],
          "body": "<p>Four groups, competing on different things.</p>\n<h4>Global transaction banks</h4>\n<p>Citi, HSBC, JPMorgan, Standard Chartered, BNP Paribas, Deutsche. They compete on network — the ability to serve a client in fifty markets under one contract — and on scale in clearing.</p>\n<h4>Regional and local banks</h4>\n<p>Better local knowledge, better local service, sometimes better local rails access. They win the domestic mandate and lose the regional one, and they are often the global banks' FI clients.</p>\n<h4>Fintechs and payment institutions</h4>\n<p>They do not attack the franchise; they attack a corridor or a product. Cross-border payments for SMEs, virtual accounts for marketplaces, expense cards, receivables platforms. Individually small, cumulatively significant, and they set the client's expectation of what a good experience looks like.</p>\n<h4>Software vendors</h4>\n<p>The most strategically interesting. SAP, Oracle, Kyriba and their peers own the treasury workstation where the client actually works. If the ERP aggregates balances across banks and initiates payments through whichever is cheapest, the bank is pushed toward being an interchangeable rail. Card networks and correspondent-network services push from the other direction.</p>\n<div class=\"callout\">The competitive question is not \"who has the best product\" but \"who owns the layer the treasurer looks at every morning\". A bank whose only presence is its own portal has already lost that layer.</div>"
        },
        {
          "id": "m7l2",
          "title": "APIs, embedding and real-time treasury",
          "minutes": 8,
          "key": [
            "APIs change the unit of integration from a nightly file to a call",
            "Being embedded in the client's ERP is stickier than any portal",
            "Real-time balances only pay off if the treasurer can act on them"
          ],
          "body": "<p>The technology shift that actually matters is unglamorous: from batch files to interfaces the client's own systems call directly.</p>\n<h4>What APIs change</h4>\n<ul>\n<li><strong>Balances on demand</strong> rather than a statement file at 6am</li>\n<li><strong>Payment initiation</strong> from inside the client's system, with immediate status</li>\n<li><strong>Payment status</strong> continuously, rather than a query to a service desk</li>\n<li><strong>Onboarding</strong> — virtual account creation and mandate management without a form</li>\n</ul>\n<h4>Why embedding beats a portal</h4>\n<p>A treasurer does not want to log into six bank portals. They want their treasury system to show one position. The bank that is well integrated into that system is consulted constantly and is painful to remove; the bank reachable only through its own screen is a tab nobody opens.</p>\n<p>This inverts the usual instinct. Investing in your own front end can be less valuable than investing in being properly present inside someone else's.</p>\n<h4>Real-time treasury, honestly</h4>\n<p>Instant rails and API balances make continuous cash management possible. Whether it is <em>useful</em> depends on the client. A company with predictable weekly flows gains little from second-by-second visibility. One with volatile collections across many markets can genuinely run smaller buffers — and a smaller buffer is a permanent reduction in working capital, which is worth real money.</p>\n<p>The honest position: real-time is valuable where volatility is high and buffers are expensive, and largely a demo everywhere else.</p>"
        },
        {
          "id": "m7l3",
          "title": "Tokenisation and what to watch",
          "minutes": 9,
          "key": [
            "Tokenised deposits keep the bank in the structure; stablecoins do not necessarily",
            "Atomic settlement attacks intraday liquidity buffers, which is a real cost",
            "Judge propositions by the cost they remove, not the technology they use"
          ],
          "body": "<p>The digital assets syllabus covers the mechanics. Here is what it means for this business specifically.</p>\n<h4>Tokenised deposits</h4>\n<p>A deposit on a shared ledger is still a deposit: same balance sheet, same protection, same client relationship. What changes is that it can move 24/7, settle atomically against an asset, and carry conditions. Partior, JPMorgan's deposit tokens and DBS Token Services are all versions of this, and they are deliberately incremental — the bank stays in the structure.</p>\n<h4>Stablecoins</h4>\n<p>The more disruptive case, because balances can sit outside the banking system entirely. The threat is sharpest exactly where correspondent banking is thin and expensive, which is where emerging-market franchises earn their margin. Standard Chartered's participation in Anchorpoint is the incumbent response: if the flow is going to move to a licensed dollar or Hong Kong dollar token, better to issue it than to watch it leave.</p>\n<h4>Atomic settlement and intraday liquidity</h4>\n<p>The most underrated link. Banks hold large intraday liquidity buffers because payment and delivery legs settle at different times. Settle both simultaneously and part of that buffer is unnecessary. Project Agorá's real-value testing is aimed squarely at this, and freed intraday liquidity is a hard, measurable saving — unlike most claims made for the technology.</p>\n<h4>How to judge any of it</h4>\n<ol>\n<li><strong>What named cost does it remove?</strong> Reconciliation, settlement lag, trapped cash, intraday buffers, manual servicing. If the answer is \"efficiency\", be sceptical.</li>\n<li><strong>Whose problem is it?</strong> A treasurer's or a bank operations team's — both are valid, but they are sold to different people.</li>\n<li><strong>Does it need everyone, or can one client adopt it?</strong> Network-dependent propositions are much slower than they look.</li>\n<li><strong>What does the incumbent process cost?</strong> Cross-border to a thin corridor is genuinely bad; domestic instant payments are already excellent.</li>\n</ol>\n<div class=\"callout\">The same test as the digital assets course, because it is the same test everywhere: name the cost, name the buyer, and compare against the incumbent rather than against nothing.</div>"
        }
      ],
      "number": 7,
      "minutes": 25
    }
  ],
  "questions": [
    {
      "id": "q1_1",
      "m": "m1",
      "l": "m1l1",
      "type": "mc",
      "q": "Which best distinguishes transaction banking revenue from investment banking revenue?",
      "options": [
        "It is larger in absolute terms",
        "It recurs with the client's operations rather than arriving on deals",
        "It carries no credit risk",
        "It is unregulated"
      ],
      "answer": 1,
      "explain": "Transaction banking is annuity-like — it earns every time the client pays, imports or settles. Investment banking revenue is episodic."
    },
    {
      "id": "q1_2",
      "m": "m1",
      "l": "m1l1",
      "type": "match",
      "q": "Match each pillar to what it sells.",
      "pairs": [
        [
          "Cash management",
          "Accounts, payments, collections and liquidity"
        ],
        [
          "Trade finance",
          "Instruments and financing around trade risk"
        ],
        [
          "Securities services",
          "Custody and asset servicing for institutional clients"
        ]
      ],
      "explain": "Three pillars, three distinct buyers inside the same client."
    },
    {
      "id": "q1_3",
      "m": "m1",
      "l": "m1l2",
      "type": "mc",
      "q": "Why is an operational deposit worth more to a bank than an ordinary corporate deposit of the same size?",
      "options": [
        "It pays a higher rate",
        "Liquidity rules assume a lower run-off, so less liquid asset must be held against it",
        "It is exempt from deposit insurance levies",
        "It counts as regulatory capital"
      ],
      "answer": 1,
      "explain": "The LCR assumes operational deposits are far stickier, so the required high-quality liquid asset buffer is smaller."
    },
    {
      "id": "q1_4",
      "m": "m1",
      "l": "m1l2",
      "type": "multi",
      "q": "Why do banks value transaction banking beyond its fee income? (Select all that apply)",
      "options": [
        "It generates cheap, stable operational deposits",
        "Exposures are often short-dated and self-liquidating",
        "It is the day-to-day anchor of the client relationship",
        "It carries no operational risk"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "Operational risk is one of its largest risks. The other three are the real reasons."
    },
    {
      "id": "q1_5",
      "m": "m1",
      "l": "m1l2",
      "type": "tf",
      "q": "Anything letting corporates hold operating balances outside banks attacks the funding base, not only fee income.",
      "answer": true,
      "explain": "The deposit is usually worth more than the fee, so displacement of balances is the more serious threat."
    },
    {
      "id": "q1_6",
      "m": "m1",
      "l": "m1l3",
      "type": "mc",
      "q": "What does a financial institution client mainly buy from a transaction bank?",
      "options": [
        "Its balance sheet",
        "Its network, licences and local market access",
        "Its research",
        "Its underwriting capacity"
      ],
      "answer": 1,
      "explain": "FI clients buy reach into markets and currencies where they have no presence — which monetises the network itself."
    },
    {
      "id": "q1_7",
      "m": "m1",
      "l": "m1l3",
      "type": "multi",
      "q": "Which are recurring corporate treasurer problems? (Select all that apply)",
      "options": [
        "Visibility of cash across entities and currencies",
        "Control over who can move money",
        "Financing the working capital gap",
        "Choosing an equity research provider"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "Research is not a treasury concern. The first three are the standing agenda."
    },
    {
      "id": "q1_8",
      "m": "m1",
      "l": "m1l4",
      "type": "mc",
      "q": "Where are cash management mandates most often lost?",
      "options": [
        "In the pricing round",
        "During implementation",
        "At the credit committee",
        "In the annual review"
      ],
      "answer": 1,
      "explain": "Winning the RFP is the start. Account opening, ERP connectivity and migration are where banks fail visibly."
    },
    {
      "id": "q1_9",
      "m": "m1",
      "l": "m1l4",
      "type": "mc",
      "q": "Why does comparing per-transaction fees between banks tell you little?",
      "options": [
        "Fees are confidential",
        "Pricing is negotiated across the whole relationship — fees, balances, FX and lending",
        "Fees are regulated to be identical",
        "Fees change daily"
      ],
      "answer": 1,
      "explain": "A near-zero payment fee can be rational if balances and FX earn enough. Look at the total expected economics of the flow."
    },
    {
      "id": "q1_10",
      "m": "m1",
      "l": "m1l4",
      "type": "type",
      "q": "What is the term for growing revenue by taking more of an existing client's flows rather than winning new clients?",
      "accept": [
        "wallet share",
        "share of wallet",
        "wallet-share"
      ],
      "hint": "Two words, about a client's total spend",
      "explain": "Mandates are rare and slow, so growth comes mostly from deepening existing relationships."
    },
    {
      "id": "q1_11",
      "m": "m1",
      "l": "m1l1",
      "type": "mc",
      "q": "Standard Chartered runs securities services within which division?",
      "options": [
        "Wealth and Retail Banking",
        "Financing and Securities Services in the corporate and institutional bank",
        "Global Markets treasury",
        "SC Ventures"
      ],
      "answer": 1,
      "explain": "It sits in the corporate and institutional bank, alongside the financing business."
    },
    {
      "id": "q1_12",
      "m": "m1",
      "l": "m1l2",
      "type": "order",
      "q": "Order these by how stable a bank should assume the funding is, most stable first.",
      "items": [
        "Operational deposits from a client's payment activity",
        "Non-operational corporate deposits placed for yield",
        "Short-term wholesale funding"
      ],
      "explain": "Operational balances are stickiest because moving them means re-plumbing the client's treasury."
    },
    {
      "id": "q2_1",
      "m": "m2",
      "l": "m2l1",
      "type": "mc",
      "q": "What distinguishes RTGS from ACH?",
      "options": [
        "RTGS is cheaper per item",
        "RTGS settles each payment individually in central bank money, with no interbank credit risk",
        "ACH is irrevocable and RTGS is not",
        "ACH only handles foreign currency"
      ],
      "answer": 1,
      "explain": "Gross, immediate settlement in central bank money removes interbank exposure — at a higher cost per item."
    },
    {
      "id": "q2_2",
      "m": "m2",
      "l": "m2l1",
      "type": "multi",
      "q": "Which are true of net settlement systems such as ACH? (Select all that apply)",
      "options": [
        "They are cheap per item",
        "Obligations accumulate between cycles, creating interbank exposure",
        "They conserve liquidity relative to gross settlement",
        "They settle each payment individually and immediately"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "Settling individually and immediately is gross settlement — the opposite design."
    },
    {
      "id": "q2_3",
      "m": "m2",
      "l": "m2l2",
      "type": "mc",
      "q": "A Kenyan bank holds a US dollar account at a New York bank. From the Kenyan bank's point of view this is a:",
      "options": [
        "Vostro account",
        "Nostro account",
        "Loro account",
        "Escrow account"
      ],
      "answer": 1,
      "explain": "Nostro means 'our account with you'. The same account is a vostro to the New York bank."
    },
    {
      "id": "q2_4",
      "m": "m2",
      "l": "m2l2",
      "type": "mc",
      "q": "Why are cross-border payments slow?",
      "options": [
        "Messages travel slowly between countries",
        "Each bank in the chain independently screens, charges and applies its own cut-offs",
        "Central banks batch them weekly",
        "Currency conversion takes days to compute"
      ],
      "answer": 1,
      "explain": "The message crosses in seconds. The delay is repeated compliance and operations at every hop."
    },
    {
      "id": "q2_5",
      "m": "m2",
      "l": "m2l2",
      "type": "type",
      "q": "What is the term for banks exiting correspondent relationships rather than carrying the compliance cost?",
      "accept": [
        "de-risking",
        "derisking",
        "de risking"
      ],
      "hint": "A hyphenated word about shedding risk",
      "explain": "It has fallen hardest on small banks in emerging markets, which is where alternative rails found their opening."
    },
    {
      "id": "q2_6",
      "m": "m2",
      "l": "m2l3",
      "type": "tf",
      "q": "SWIFT moves money between banks.",
      "answer": false,
      "explain": "SWIFT moves instructions. Money moves across correspondent accounts and, ultimately, central bank accounts."
    },
    {
      "id": "q2_7",
      "m": "m2",
      "l": "m2l3",
      "type": "multi",
      "q": "What does ISO 20022 enable that MT messages did not? (Select all that apply)",
      "options": [
        "Structured remittance data that automates reconciliation",
        "Cleanly separated party data that reduces screening false positives",
        "Purpose codes that make flows legible",
        "Instant settlement finality"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "It is a data standard, not a settlement mechanism — it changes what the message carries, not how money settles."
    },
    {
      "id": "q2_8",
      "m": "m2",
      "l": "m2l4",
      "type": "mc",
      "q": "What problem do virtual accounts solve?",
      "options": [
        "Holding multiple currencies in one account",
        "Identifying who sent an incoming payment, without opening more real accounts",
        "Avoiding withholding tax on interest",
        "Reducing FX spread"
      ],
      "answer": 1,
      "explain": "Many addressable identifiers settle into one real account, so receipts reconcile automatically at the point of collection."
    },
    {
      "id": "q2_9",
      "m": "m2",
      "l": "m2l4",
      "type": "mc",
      "q": "Why is connectivity described as the deepest moat in cash management?",
      "options": [
        "It is patented",
        "Once a client's ERP is wired in and tested, switching becomes a project rather than a decision",
        "Regulators forbid changing providers",
        "It is the highest-margin product"
      ],
      "answer": 1,
      "explain": "Implementation cost and operational risk are what actually hold the relationship."
    },
    {
      "id": "q2_10",
      "m": "m2",
      "l": "m2l5",
      "type": "mc",
      "q": "How do payment fintechs avoid the correspondent chain?",
      "options": [
        "They use SWIFT directly",
        "They hold pre-funded local accounts on both sides and net internally",
        "They settle in central bank money",
        "They batch payments weekly"
      ],
      "answer": 1,
      "explain": "The customer's money never crosses a border; only the obligation does. The cost is working capital in every market."
    },
    {
      "id": "q2_11",
      "m": "m2",
      "l": "m2l5",
      "type": "multi",
      "q": "What do incumbent banks still hold in cross-border payments? (Select all that apply)",
      "options": [
        "Licences and local clearing access",
        "The ability to extend credit and hold operating balances",
        "Someone accountable when a payment stops",
        "A structural speed advantage over instant rails"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "Speed is precisely where they no longer have an advantage, which is why gpi and tokenised settlement exist."
    },
    {
      "id": "q2_12",
      "m": "m2",
      "l": "m2l1",
      "type": "order",
      "q": "Order these rails by typical cost per item, cheapest first.",
      "items": [
        "ACH batch payment",
        "Instant payment rail",
        "RTGS high-value payment"
      ],
      "explain": "Batch netting is cheapest, gross settlement in central bank money dearest."
    },
    {
      "id": "q3_1",
      "m": "m3",
      "l": "m3l1",
      "type": "mc",
      "q": "Why does a multinational's account structure look so complicated?",
      "options": [
        "Banks require it",
        "It mirrors a legal entity structure that exists for tax and regulatory reasons",
        "Auditors mandate one account per currency",
        "It reduces FX cost"
      ],
      "answer": 1,
      "explain": "Treasury structure follows legal structure, which was designed for reasons that had nothing to do with treasury."
    },
    {
      "id": "q3_2",
      "m": "m3",
      "l": "m3l2",
      "type": "mc",
      "q": "What is the defining feature of notional pooling?",
      "options": [
        "Balances sweep into a header account nightly",
        "Interest is calculated as if balances were combined, but no money moves",
        "Only one currency may participate",
        "It requires a central bank licence"
      ],
      "answer": 1,
      "explain": "Nothing moves, so no intercompany loans are created — which is exactly its attraction."
    },
    {
      "id": "q3_3",
      "m": "m3",
      "l": "m3l2",
      "type": "multi",
      "q": "What does physical pooling create that notional pooling avoids? (Select all that apply)",
      "options": [
        "Intercompany loans requiring documentation",
        "Potential withholding tax on intercompany interest",
        "Transfer pricing considerations",
        "Foreign exchange exposure on every sweep"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "Sweeps are usually same-currency. The first three are the real consequences of moving money between entities."
    },
    {
      "id": "q3_4",
      "m": "m3",
      "l": "m3l2",
      "type": "mc",
      "q": "Why did several banks retreat from cross-border notional pooling?",
      "options": [
        "Clients stopped asking for it",
        "Capital and leverage rules constrained presenting balances net rather than gross",
        "It was made illegal",
        "The technology proved unreliable"
      ],
      "answer": 1,
      "explain": "Offsetting needs legal right of set-off and cross-guarantees, and the balance sheet treatment turned out to be expensive."
    },
    {
      "id": "q3_5",
      "m": "m3",
      "l": "m3l3",
      "type": "type",
      "q": "What is the formula for the cash conversion cycle? Give it in the form DSO ... DIO ... DPO.",
      "accept": [
        "dso + dio - dpo",
        "dso plus dio minus dpo",
        "dso+dio-dpo"
      ],
      "hint": "Two of them add, one subtracts",
      "explain": "Receivables and inventory tie cash up; payables release it."
    },
    {
      "id": "q3_6",
      "m": "m3",
      "l": "m3l3",
      "type": "match",
      "q": "Match each product to the part of the cycle it targets.",
      "pairs": [
        [
          "Receivables finance",
          "DSO — being paid sooner"
        ],
        [
          "Payables finance",
          "DPO — paying later"
        ],
        [
          "Inventory and trade finance",
          "DIO — stock sitting"
        ]
      ],
      "explain": "The whole product set maps onto one equation, which is what makes it coherent."
    },
    {
      "id": "q3_7",
      "m": "m3",
      "l": "m3l3",
      "type": "mc",
      "q": "What is trapped cash?",
      "options": [
        "Cash a company has forgotten about",
        "Cash that legally exists but cannot be moved to where it is needed",
        "Cash held in a notional pool",
        "Cash pledged as collateral"
      ],
      "answer": 1,
      "explain": "Capital controls, repatriation tax, regulatory minimums or partner consent. Groups often borrow centrally while holding idle restricted balances."
    },
    {
      "id": "q3_8",
      "m": "m3",
      "l": "m3l4",
      "type": "mc",
      "q": "For most cash management franchises, which revenue line is typically largest?",
      "options": [
        "Transaction fees",
        "Net interest income on balances",
        "Account maintenance charges",
        "Implementation fees"
      ],
      "answer": 1,
      "explain": "Which is also why the business compresses when policy rates fall."
    },
    {
      "id": "q3_9",
      "m": "m3",
      "l": "m3l4",
      "type": "tf",
      "q": "Foreign exchange spread on cross-currency payments is usually itemised as a fee to the client.",
      "answer": false,
      "explain": "It is embedded in the rate, which is why clients routinely under-appreciate how much of the economics it represents."
    },
    {
      "id": "q3_10",
      "m": "m3",
      "l": "m3l4",
      "type": "multi",
      "q": "Why do banks care whether a deposit is classified as operational? (Select all that apply)",
      "options": [
        "It changes the assumed run-off rate under the LCR",
        "It changes how much high-quality liquid assets must be held",
        "It is an audited determination, not a marketing claim",
        "It exempts the deposit from all capital requirements"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "No deposit is exempt from capital requirements. The first three are exactly why the classification matters."
    },
    {
      "id": "q3_11",
      "m": "m3",
      "l": "m3l1",
      "type": "mc",
      "q": "What is an in-house bank?",
      "options": [
        "A bank owned by a corporate group",
        "One group entity banking the others internally, turning external accounts into intercompany positions",
        "A branch located on a client's premises",
        "A central bank facility for corporates"
      ],
      "answer": 1,
      "explain": "It concentrates external banking into few relationships, but needs proper documentation and defensible transfer pricing."
    },
    {
      "id": "q3_12",
      "m": "m3",
      "l": "m3l3",
      "type": "mc",
      "q": "Why is shortening the cash conversion cycle usually worth more than the interest rate on balances?",
      "options": [
        "Interest rates are always near zero",
        "Days removed from the cycle free up cash permanently, at a scale that dwarfs the spread on balances",
        "Regulators cap deposit rates",
        "It avoids withholding tax"
      ],
      "answer": 1,
      "explain": "A treasurer is buying days out of the cycle, not basis points on a balance."
    },
    {
      "id": "q4_1",
      "m": "m4",
      "l": "m4l1",
      "type": "mc",
      "q": "What problem does trade finance exist to solve?",
      "options": [
        "Currency volatility",
        "Neither side of a trade wants to perform first",
        "Shipping delays",
        "Customs tariffs"
      ],
      "answer": 1,
      "explain": "The exporter will not ship before payment and the importer will not pay before shipment. A bank's credit breaks the standoff."
    },
    {
      "id": "q4_2",
      "m": "m4",
      "l": "m4l1",
      "type": "order",
      "q": "Order these settlement methods from most exporter risk to least.",
      "items": [
        "Open account",
        "Documentary collection",
        "Letter of credit",
        "Cash in advance"
      ],
      "explain": "Open account puts everything on the exporter; cash in advance puts everything on the importer."
    },
    {
      "id": "q4_3",
      "m": "m4",
      "l": "m4l1",
      "type": "tf",
      "q": "Most world trade by value now settles on open account rather than by documentary credit.",
      "answer": true,
      "explain": "Documentary trade has shrunk as a share for decades — which is what created the modern receivables finance market."
    },
    {
      "id": "q4_4",
      "m": "m4",
      "l": "m4l2",
      "type": "mc",
      "q": "Under the autonomy principle, what is true of a letter of credit?",
      "options": [
        "It can be cancelled by the applicant at will",
        "It is a separate contract from the sale, so a goods dispute does not by itself excuse payment",
        "It must be confirmed by a second bank",
        "It expires when the goods arrive"
      ],
      "answer": 1,
      "explain": "Without autonomy the instrument would be worthless — a bank cannot adjudicate commercial disputes."
    },
    {
      "id": "q4_5",
      "m": "m4",
      "l": "m4l2",
      "type": "match",
      "q": "Match each letter of credit party to its role.",
      "pairs": [
        [
          "Applicant",
          "The buyer, who asks its bank to issue"
        ],
        [
          "Beneficiary",
          "The seller, entitled to be paid"
        ],
        [
          "Issuing bank",
          "Takes on the obligation to pay"
        ],
        [
          "Confirming bank",
          "Adds its own independent undertaking"
        ]
      ],
      "explain": "Confirmation matters when the issuing bank or its country is the risk the seller is worried about."
    },
    {
      "id": "q4_6",
      "m": "m4",
      "l": "m4l2",
      "type": "type",
      "q": "What is the ICC rulebook governing documentary credits called? Give the abbreviation and number.",
      "accept": [
        "ucp 600",
        "ucp600",
        "ucp 600 "
      ],
      "hint": "Three letters and a number",
      "explain": "UCP 600 governs how compliance of documents is assessed."
    },
    {
      "id": "q4_7",
      "m": "m4",
      "l": "m4l2",
      "type": "mc",
      "q": "A bank refuses payment though the goods arrived perfectly. Most likely cause?",
      "options": [
        "The goods were mis-described in the sale contract",
        "The documents presented were discrepant",
        "The buyer instructed refusal",
        "The credit was confirmed"
      ],
      "answer": 1,
      "explain": "Compliance is documentary. Perfect goods do not cure discrepant documents, and the reverse is also true."
    },
    {
      "id": "q4_8",
      "m": "m4",
      "l": "m4l3",
      "type": "mc",
      "q": "What does a demand guarantee require before it pays?",
      "options": [
        "Proof of the applicant's default",
        "A compliant demand",
        "An arbitral award",
        "Consent from the applicant"
      ],
      "answer": 1,
      "explain": "That is exactly what on-demand means, and it is why the applicant's exposure is an unfair calling."
    },
    {
      "id": "q4_9",
      "m": "m4",
      "l": "m4l3",
      "type": "mc",
      "q": "What does the demand-versus-conditional distinction actually decide?",
      "options": [
        "Who is legally in the right",
        "Who is out of pocket while the dispute runs",
        "Which law governs",
        "The guarantee's price"
      ],
      "answer": 1,
      "explain": "It reallocates the funding of the dispute, which over years is most of the commercial substance."
    },
    {
      "id": "q4_10",
      "m": "m4",
      "l": "m4l3",
      "type": "multi",
      "q": "Which are types of guarantee or standby? (Select all that apply)",
      "options": [
        "Performance guarantee",
        "Advance payment guarantee",
        "Bid or tender bond",
        "Documentary collection"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "A documentary collection is a settlement method, not a guarantee."
    },
    {
      "id": "q4_11",
      "m": "m4",
      "l": "m4l4",
      "type": "mc",
      "q": "In payables finance, at whose credit rating is the supplier's invoice discounted?",
      "options": [
        "The supplier's",
        "The buyer's",
        "The bank's",
        "The insurer's"
      ],
      "answer": 1,
      "explain": "That is the whole point — a small supplier gets early payment priced off a large buyer's credit."
    },
    {
      "id": "q4_12",
      "m": "m4",
      "l": "m4l4",
      "type": "multi",
      "q": "Why did supply chain finance attract accounting scrutiny? (Select all that apply)",
      "options": [
        "Programmes could extend payment terms far beyond commercial norms",
        "The obligation might be closer to borrowing than to a trade payable",
        "It could flatter reported leverage",
        "It is prohibited under IFRS"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "It is not prohibited. Standard-setters moved toward requiring disclosure precisely because classification was being stretched."
    },
    {
      "id": "q4_13",
      "m": "m4",
      "l": "m4l4",
      "type": "mc",
      "q": "What is the key question about a receivables finance facility?",
      "options": [
        "Whether it is confidential",
        "Whether it is with recourse to the seller if the debtor does not pay",
        "Which currency it is in",
        "Whether it is insured"
      ],
      "answer": 1,
      "explain": "With recourse it behaves like a loan; without, it is closer to a sale of the asset."
    },
    {
      "id": "q4_14",
      "m": "m4",
      "l": "m4l4",
      "type": "mc",
      "q": "What was the substantive lesson of the Greensill collapse?",
      "options": [
        "Supply chain finance is inherently unsound",
        "Short-dated self-liquidating exposure stops being either if concentrated and stretched",
        "Banks should not finance suppliers",
        "Receivables cannot be insured"
      ],
      "answer": 1,
      "explain": "Heavy obligor concentration, fund-based funding sold as low risk, and 'future receivables' that were not receivables."
    },
    {
      "id": "q4_15",
      "m": "m4",
      "l": "m4l5",
      "type": "mc",
      "q": "Why is a negotiable bill of lading legally special?",
      "options": [
        "It is issued by a bank",
        "It is a document of title — holding the original controls the goods",
        "It is required for customs",
        "It carries the insurance"
      ],
      "answer": 1,
      "explain": "Which is what makes it usable as collateral, and why a copyable file resisted legal recognition for so long."
    },
    {
      "id": "q4_16",
      "m": "m4",
      "l": "m4l5",
      "type": "type",
      "q": "Which UNCITRAL model law gives electronic trade documents legal effect? Give the abbreviation.",
      "accept": [
        "mletr"
      ],
      "hint": "Five letters, about electronic transferable records",
      "explain": "MLETR, implemented in the UK by the Electronic Trade Documents Act 2023."
    },
    {
      "id": "q4_17",
      "m": "m4",
      "l": "m4l5",
      "type": "mc",
      "q": "What remains the obstacle to electronic bills of lading?",
      "options": [
        "The law does not recognise them anywhere",
        "Coordination — carrier, traders, banks, insurer and port must all accept them",
        "They cannot be encrypted",
        "Insurers refuse to cover them"
      ],
      "answer": 1,
      "explain": "The legal blocker was removed. What is left is a network problem, which is why it has been 'two years away' for a decade."
    },
    {
      "id": "q4_18",
      "m": "m4",
      "l": "m4l5",
      "type": "tf",
      "q": "Financing the same cargo with several banks at once is a recurring commodity trade fraud.",
      "answer": true,
      "explain": "Banks could not see each other's exposures, so one shipment could be pledged repeatedly — the argument for a shared registry."
    },
    {
      "id": "q5_1",
      "m": "m5",
      "l": "m5l1",
      "type": "order",
      "q": "Order the custody chain from the investor outward.",
      "items": [
        "Investor",
        "Global custodian",
        "Sub-custodian",
        "Central securities depository"
      ],
      "explain": "Each link is a record, not a vault. The CSD holds the definitive one."
    },
    {
      "id": "q5_2",
      "m": "m5",
      "l": "m5l1",
      "type": "mc",
      "q": "What is the practical difference between omnibus and segregated custody accounts?",
      "options": [
        "Omnibus is cheaper but the custodian's records stand between client and assets in an insolvency",
        "Segregated accounts cannot hold foreign securities",
        "Omnibus accounts are unregulated",
        "Segregated accounts settle faster"
      ],
      "answer": 0,
      "explain": "Omnibus is efficient; segregation is safer and dearer, and is demanded by clients who have thought about failure."
    },
    {
      "id": "q5_3",
      "m": "m5",
      "l": "m5l1",
      "type": "mc",
      "q": "What does a bank with strong local presence sell to global custodians?",
      "options": [
        "Fund administration",
        "Sub-custody in markets they cannot reach economically",
        "Proprietary trading",
        "Clearing membership"
      ],
      "answer": 1,
      "explain": "The FI business again — monetising network and licences rather than balance sheet."
    },
    {
      "id": "q5_4",
      "m": "m5",
      "l": "m5l2",
      "type": "mc",
      "q": "Which corporate actions carry the most operational risk for a custodian?",
      "options": [
        "Mandatory events, because they happen automatically",
        "Voluntary events, because a holder must elect before a deadline",
        "Dividend payments",
        "Stock splits"
      ],
      "answer": 1,
      "explain": "Find the event, interpret it, notify in time, collect elections, submit before a deadline earlier than the issuer's."
    },
    {
      "id": "q5_5",
      "m": "m5",
      "l": "m5l2",
      "type": "tf",
      "q": "If a custodian misses a voluntary corporate action deadline, the client generally bears the loss.",
      "answer": false,
      "explain": "The custodian generally pays, which is why one missed election can erase the fee income of a large mandate."
    },
    {
      "id": "q5_6",
      "m": "m5",
      "l": "m5l2",
      "type": "type",
      "q": "What is the service called that recovers withholding tax over-deducted at source under a double taxation treaty?",
      "accept": [
        "tax reclaim",
        "tax reclaims",
        "withholding tax reclaim"
      ],
      "hint": "Two words",
      "explain": "Slow, jurisdictionally fiddly, and genuinely valuable to a client with cross-border holdings."
    },
    {
      "id": "q5_7",
      "m": "m5",
      "l": "m5l3",
      "type": "match",
      "q": "Match each fund role to what it does.",
      "pairs": [
        [
          "Fund administration",
          "Strikes the NAV and keeps the books"
        ],
        [
          "Transfer agency",
          "Maintains the investor register"
        ],
        [
          "Depositary",
          "Independent oversight with strict liability for assets in custody"
        ]
      ],
      "explain": "The depositary is a distinct regulated role in Europe under UCITS and AIFMD."
    },
    {
      "id": "q5_8",
      "m": "m5",
      "l": "m5l3",
      "type": "mc",
      "q": "What does a central counterparty do?",
      "options": [
        "Executes trades on an exchange",
        "Interposes itself so each side faces the CCP rather than each other",
        "Provides custody of the underlying",
        "Sets margin rates for regulators"
      ],
      "answer": 1,
      "explain": "Counterparty risk is mutualised and netted, at the cost of concentrating it in the clearing house."
    },
    {
      "id": "q5_9",
      "m": "m5",
      "l": "m5l3",
      "type": "mc",
      "q": "Why did collateral management become a service line rather than a back-office chore?",
      "options": [
        "Interest rates rose",
        "Post-crisis margin rules for uncleared derivatives created a daily operational need",
        "Custodians were required to offer it",
        "Collateral became scarce"
      ],
      "answer": 1,
      "explain": "Daily exposure calculation, margin calls, movement and substitution — which is also why collateral mobility features in tokenisation arguments."
    },
    {
      "id": "q5_10",
      "m": "m5",
      "l": "m5l1",
      "type": "tf",
      "q": "A custodian keeps client securities in a physical vault.",
      "answer": false,
      "explain": "Nothing is in a vault. Every link in the chain is an entry in a register, constantly reconciled."
    },
    {
      "id": "q5_11",
      "m": "m5",
      "l": "m5l3",
      "type": "mc",
      "q": "Why is the depositary liability standard unusual?",
      "options": [
        "It is unlimited in time",
        "Lost financial instruments must generally be returned regardless of fault",
        "It applies only to cash",
        "It cannot be insured"
      ],
      "answer": 1,
      "explain": "Strict liability with narrow exceptions, which changes both pricing and how sub-custodians are selected."
    },
    {
      "id": "q5_12",
      "m": "m5",
      "l": "m5l2",
      "type": "multi",
      "q": "Which are asset servicing activities? (Select all that apply)",
      "options": [
        "Processing corporate actions",
        "Collecting dividends and coupons",
        "Reclaiming over-deducted withholding tax",
        "Executing the client's trades"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "Execution is a markets function, not a custody one."
    },
    {
      "id": "q6_1",
      "m": "m6",
      "l": "m6l1",
      "type": "mc",
      "q": "Why is intraday exposure real credit risk?",
      "options": [
        "It appears on the period-end balance sheet",
        "The bank may release payments before covering funds arrive, and the client could fail meanwhile",
        "It is always uncollateralised",
        "It attracts a leverage ratio charge"
      ],
      "answer": 1,
      "explain": "The position may close by evening, but if the client fails at midday the bank has paid out money it never received."
    },
    {
      "id": "q6_2",
      "m": "m6",
      "l": "m6l1",
      "type": "type",
      "q": "What converts an off-balance-sheet item such as a guarantee into a credit-equivalent exposure? Give the three-word term.",
      "accept": [
        "credit conversion factor",
        "credit conversion factors",
        "ccf"
      ],
      "hint": "Abbreviated CCF",
      "explain": "Short-term self-liquidating trade LCs attract a low factor; performance guarantees a higher one."
    },
    {
      "id": "q6_3",
      "m": "m6",
      "l": "m6l1",
      "type": "multi",
      "q": "Why is trade credit risk treated differently from term lending? (Select all that apply)",
      "options": [
        "It is short-dated",
        "It is self-liquidating from the transaction financed",
        "It is often secured on goods that exist and are insured",
        "It carries no risk of loss"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "Loss experience is low, not zero — the ICC default register exists to evidence exactly how low."
    },
    {
      "id": "q6_4",
      "m": "m6",
      "l": "m6l2",
      "type": "mc",
      "q": "Why is correspondent banking the financial crime frontline?",
      "options": [
        "It handles the largest payments",
        "The bank processes payments for a foreign bank's customers whom it has never onboarded",
        "It is exempt from screening",
        "It operates outside regulated hours"
      ],
      "answer": 1,
      "explain": "You are exposed to the quality of another institution's controls in another jurisdiction."
    },
    {
      "id": "q6_5",
      "m": "m6",
      "l": "m6l2",
      "type": "type",
      "q": "What is the acronym for having to understand a respondent bank's own customers?",
      "accept": [
        "kycc",
        "kyc c",
        "know your customer's customer"
      ],
      "hint": "Four letters",
      "explain": "It drives diligence on the respondent's AML programme and restrictions on nested relationships."
    },
    {
      "id": "q6_6",
      "m": "m6",
      "l": "m6l2",
      "type": "mc",
      "q": "What makes trade-based money laundering hard to detect?",
      "options": [
        "It uses encrypted messaging",
        "It requires knowing what goods are actually worth, which document checking does not establish",
        "It only occurs in cash",
        "It is always domestic"
      ],
      "answer": 1,
      "explain": "Over- and under-invoicing move value while the paperwork looks compliant."
    },
    {
      "id": "q6_7",
      "m": "m6",
      "l": "m6l2",
      "type": "tf",
      "q": "De-risking is now regarded by regulators as itself a problem, not just a prudent response.",
      "answer": true,
      "explain": "Rational for one bank, but in aggregate it pushes flows in affected regions toward less transparent channels."
    },
    {
      "id": "q6_8",
      "m": "m6",
      "l": "m6l3",
      "type": "mc",
      "q": "Why is the leverage ratio often the binding constraint in transaction banking?",
      "options": [
        "It is the strictest capital rule for all banks",
        "It counts exposures without regard to how safe they are, and this business holds large volumes of very low-risk assets",
        "It applies only to trade finance",
        "It replaced risk-weighted capital"
      ],
      "answer": 1,
      "explain": "A deliberately risk-insensitive backstop bites hardest on high-volume, low-risk balance sheets — as notional pooling found."
    },
    {
      "id": "q6_9",
      "m": "m6",
      "l": "m6l3",
      "type": "match",
      "q": "Match each rule to what it constrains.",
      "pairs": [
        [
          "Credit conversion factor",
          "How off-balance-sheet trade items become credit exposure"
        ],
        [
          "Leverage ratio",
          "Total exposure against capital, ignoring risk"
        ],
        [
          "Liquidity Coverage Ratio",
          "Liquid assets held against 30-day assumed run-off"
        ]
      ],
      "explain": "Which constraint binds explains most of a bank's product behaviour."
    },
    {
      "id": "q6_10",
      "m": "m6",
      "l": "m6l4",
      "type": "mc",
      "q": "What is the dominant form of payment fraud?",
      "options": [
        "Intrusion into the bank's core systems",
        "Social engineering — persuading a person to authorise something",
        "Interception of SWIFT messages",
        "Counterfeit documentation"
      ],
      "answer": 1,
      "explain": "Spoofed executives and compromised supplier mailboxes. The effective controls are procedural, above all callback on changed bank details."
    },
    {
      "id": "q6_11",
      "m": "m6",
      "l": "m6l4",
      "type": "mc",
      "q": "Why must payment controls sit before release rather than after?",
      "options": [
        "It is cheaper",
        "An executed payment cannot be recalled",
        "Regulators audit only pre-release controls",
        "Post-release checks are impossible"
      ],
      "answer": 1,
      "explain": "The same irreversibility that defines digital asset risk — controls must precede the point of no return."
    },
    {
      "id": "q6_12",
      "m": "m6",
      "l": "m6l4",
      "type": "multi",
      "q": "Which are genuine operational risks in transaction banking? (Select all that apply)",
      "options": [
        "Missing a currency cut-off and moving value to the next business day",
        "Sanctions screening failure",
        "Third-party concentration in a critical platform",
        "Adverse movement in the bank's equity price"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "Equity price movement is market risk to shareholders, not an operational risk of the business."
    },
    {
      "id": "q7_1",
      "m": "m7",
      "l": "m7l1",
      "type": "mc",
      "q": "Why are treasury software vendors strategically interesting competitors?",
      "options": [
        "They hold banking licences",
        "They own the layer the treasurer actually works in and can route payments to whichever bank is cheapest",
        "They lend at lower rates",
        "They clear payments directly"
      ],
      "answer": 1,
      "explain": "If the ERP aggregates and initiates, the bank risks becoming an interchangeable rail."
    },
    {
      "id": "q7_2",
      "m": "m7",
      "l": "m7l1",
      "type": "match",
      "q": "Match each competitor to what it competes on.",
      "pairs": [
        [
          "Global transaction banks",
          "Network across many markets under one contract"
        ],
        [
          "Regional banks",
          "Local depth, service and rails access"
        ],
        [
          "Payment fintechs",
          "Specific corridors and products"
        ],
        [
          "Treasury software vendors",
          "Ownership of the client's working layer"
        ]
      ],
      "explain": "Four groups competing on genuinely different bases."
    },
    {
      "id": "q7_3",
      "m": "m7",
      "l": "m7l2",
      "type": "mc",
      "q": "Why can being embedded in a client's ERP beat investing in your own portal?",
      "options": [
        "Portals are more expensive to build",
        "A treasurer wants one position in their own system, not six bank logins",
        "Regulators require API access",
        "Portals cannot show real-time balances"
      ],
      "answer": 1,
      "explain": "The well-integrated bank is consulted constantly and painful to remove; the portal-only bank is a tab nobody opens."
    },
    {
      "id": "q7_4",
      "m": "m7",
      "l": "m7l2",
      "type": "tf",
      "q": "Real-time treasury is valuable to essentially every corporate client.",
      "answer": false,
      "explain": "It pays off where flows are volatile and buffers expensive. For predictable weekly flows it is largely a demo."
    },
    {
      "id": "q7_5",
      "m": "m7",
      "l": "m7l2",
      "type": "multi",
      "q": "What do APIs change relative to nightly file exchange? (Select all that apply)",
      "options": [
        "Balances available on demand",
        "Payment status continuously rather than by query",
        "Virtual account creation without a form",
        "The underlying settlement rails"
      ],
      "answers": [
        0,
        1,
        2
      ],
      "explain": "The rails are unchanged. What changes is how the client reaches them."
    },
    {
      "id": "q7_6",
      "m": "m7",
      "l": "m7l3",
      "type": "mc",
      "q": "What distinguishes a tokenised deposit from a stablecoin, for a bank?",
      "options": [
        "Tokenised deposits settle faster",
        "A tokenised deposit is still the bank's deposit, so the bank stays in the structure",
        "Stablecoins cannot be used cross-border",
        "Tokenised deposits are unregulated"
      ],
      "answer": 1,
      "explain": "Same balance sheet, same protection, same relationship — which is why banks find them incremental rather than threatening."
    },
    {
      "id": "q7_7",
      "m": "m7",
      "l": "m7l3",
      "type": "mc",
      "q": "Why is atomic settlement described as the most underrated link to transaction banking?",
      "options": [
        "It eliminates FX risk",
        "It attacks intraday liquidity buffers, which are a large real cost",
        "It removes the need for custody",
        "It replaces correspondent banking overnight"
      ],
      "answer": 1,
      "explain": "Buffers exist because legs settle at different times. Settle them together and part of the buffer is unnecessary — a measurable saving."
    },
    {
      "id": "q7_8",
      "m": "m7",
      "l": "m7l3",
      "type": "mc",
      "q": "Standard Chartered's participation in Anchorpoint is best read as what?",
      "options": [
        "A hedge against falling interest rates",
        "An incumbent choosing to issue the instrument rather than watch the flow leave",
        "An exit from correspondent banking",
        "A custody expansion"
      ],
      "answer": 1,
      "explain": "If flows move to a licensed token in a corridor you earn margin in, better to be the issuer."
    },
    {
      "id": "q7_9",
      "m": "m7",
      "l": "m7l3",
      "type": "order",
      "q": "Order these questions when judging a new transaction banking proposition.",
      "items": [
        "What named cost does it remove?",
        "Whose problem is it, and who buys it?",
        "Does it need everyone to adopt, or can one client start?",
        "What does the incumbent process actually cost?"
      ],
      "explain": "Name the cost, name the buyer, check the network dependency, compare against the incumbent rather than against nothing."
    },
    {
      "id": "q7_10",
      "m": "m7",
      "l": "m7l3",
      "type": "multi",
      "q": "Where is the stablecoin threat to a transaction bank sharpest? (Select all that apply)",
      "options": [
        "Corridors where correspondent banking is thin and expensive",
        "Emerging-market business-to-business flows",
        "Domestic instant payments in developed markets",
        "Markets where the bank earns correspondent margin"
      ],
      "answers": [
        0,
        1,
        3
      ],
      "explain": "Domestic instant rails are already fast and cheap — there is little to displace."
    },
    {
      "id": "q7_11",
      "m": "m7",
      "l": "m7l1",
      "type": "tf",
      "q": "Payment fintechs are best understood as attacking the whole transaction banking franchise at once.",
      "answer": false,
      "explain": "They attack a corridor or a product. Cumulatively significant, and they reset the client's expectation of a good experience."
    },
    {
      "id": "q7_12",
      "m": "m7",
      "l": "m7l2",
      "type": "mc",
      "q": "What is the permanent benefit of a corporate running smaller cash buffers?",
      "options": [
        "Higher interest income",
        "A lasting reduction in working capital tied up in the business",
        "Lower FX spread",
        "Reduced audit cost"
      ],
      "answer": 1,
      "explain": "Which is why real-time visibility matters most where flows are volatile and buffers are expensive."
    }
  ],
  "glossary": [
    {
      "t": "Transaction banking",
      "l": "m1l1",
      "d": "The business of serving clients' day-to-day operations — cash management, trade finance and securities services — as distinct from raising capital or taking risk for them."
    },
    {
      "t": "Cash management",
      "l": "m1l1",
      "d": "Accounts, payments, collections and the machinery for concentrating balances where they are useful."
    },
    {
      "t": "Securities services",
      "l": "m1l1",
      "d": "Holding and servicing assets for institutional clients: custody, corporate actions, fund administration."
    },
    {
      "t": "Annuity revenue",
      "l": "m1l1",
      "d": "Income that recurs with a client's ordinary operations rather than arriving when a deal closes."
    },
    {
      "t": "Operational deposit",
      "l": "m1l2",
      "d": "A balance a client needs in order to run its clearing, custody or cash management activity — treated as far stickier under liquidity rules than a deposit placed for yield."
    },
    {
      "t": "Liquidity Coverage Ratio",
      "l": "m1l2",
      "d": "The Basel rule requiring banks to hold enough high-quality liquid assets to survive a 30-day stress, with an assumed run-off rate applied to each type of funding."
    },
    {
      "t": "Self-liquidating exposure",
      "l": "m1l2",
      "d": "Credit that repays itself out of the transaction it financed, typical of short-dated trade finance."
    },
    {
      "t": "Treasurer",
      "l": "m1l3",
      "d": "The corporate officer responsible for cash, liquidity, funding and financial risk — the buyer of most transaction banking services."
    },
    {
      "t": "FI client",
      "l": "m1l3",
      "d": "A financial institution buying access to a market, currency or infrastructure where it has no presence of its own."
    },
    {
      "t": "Wallet share",
      "l": "m1l4",
      "d": "The proportion of a client's total transaction banking spend held by one bank; the main growth mechanism in a business where new mandates are rare."
    },
    {
      "t": "Implementation",
      "l": "m1l4",
      "d": "The project of opening accounts, connecting systems and migrating live flows after a mandate is won — where mandates are most often lost."
    },
    {
      "t": "RTGS",
      "l": "m2l1",
      "d": "Real-time gross settlement: each payment settles individually and immediately in central bank money, removing interbank credit risk."
    },
    {
      "t": "ACH",
      "l": "m2l1",
      "d": "Automated clearing house: payments batched and settled net at intervals — cheap per item, with exposure accumulating between cycles."
    },
    {
      "t": "Instant payment rail",
      "l": "m2l1",
      "d": "A 24/7 near-instant irrevocable domestic system such as UPI, FPS, PIX or FAST."
    },
    {
      "t": "Nostro account",
      "l": "m2l2",
      "d": "'Our account with you' — an account a bank holds with a foreign bank to settle in that bank's currency."
    },
    {
      "t": "Vostro account",
      "l": "m2l2",
      "d": "'Your account with us' — the same account described from the account-holding bank's side."
    },
    {
      "t": "Correspondent banking",
      "l": "m2l2",
      "d": "The chain of bilateral bank accounts through which cross-border payments are settled in the absence of any global payment system."
    },
    {
      "t": "De-risking",
      "l": "m2l2",
      "d": "Banks exiting correspondent relationships wholesale rather than carrying the financial crime compliance cost, falling hardest on small emerging-market banks."
    },
    {
      "t": "SWIFT",
      "l": "m2l3",
      "d": "A member-owned cooperative operating the secure messaging network banks use to send payment instructions. It moves instructions, not money."
    },
    {
      "t": "MT message",
      "l": "m2l3",
      "d": "The legacy compact SWIFT format with tight positional fields, which truncates party data and drives screening false positives."
    },
    {
      "t": "ISO 20022",
      "l": "m2l3",
      "d": "A structured XML messaging standard carrying separated party data, structured remittance information and purpose codes."
    },
    {
      "t": "Virtual account",
      "l": "m2l4",
      "d": "An account identifier that settles into a single real account, letting a company identify every incoming payment automatically."
    },
    {
      "t": "Host-to-host",
      "l": "m2l4",
      "d": "An automated file connection between a client's ERP and its bank — still the workhorse channel for large corporates."
    },
    {
      "t": "SWIFT gpi",
      "l": "m2l5",
      "d": "The service adding end-to-end tracking, fee transparency and same-day availability to correspondent payments."
    },
    {
      "t": "Project Nexus",
      "l": "m2l5",
      "d": "A BIS-coordinated effort to define a common way of linking countries' instant payment systems for cross-border use."
    },
    {
      "t": "Concentration account",
      "l": "m3l1",
      "d": "The header account into which balances from operating accounts are gathered."
    },
    {
      "t": "In-house bank",
      "l": "m3l1",
      "d": "An arrangement where one group entity banks the others internally, converting external accounts into intercompany positions."
    },
    {
      "t": "Physical pooling",
      "l": "m3l2",
      "d": "Cash concentration in which balances actually move into a header account, creating intercompany loans."
    },
    {
      "t": "Notional pooling",
      "l": "m3l2",
      "d": "Calculating interest as though participating balances were combined, without moving any money."
    },
    {
      "t": "Right of set-off",
      "l": "m3l2",
      "d": "The legal ability to offset balances between parties, which a bank generally needs before it can pool notionally."
    },
    {
      "t": "Trapped cash",
      "l": "m3l3",
      "d": "Cash that legally exists but cannot be deployed where needed, because of capital controls, repatriation tax, regulatory minimums or partner consent."
    },
    {
      "t": "Cash conversion cycle",
      "l": "m3l3",
      "d": "DSO + DIO − DPO: how long cash is tied up in operations before it returns."
    },
    {
      "t": "DSO",
      "l": "m3l3",
      "d": "Days sales outstanding — how long customers take to pay."
    },
    {
      "t": "DPO",
      "l": "m3l3",
      "d": "Days payable outstanding — how long the company takes to pay its suppliers."
    },
    {
      "t": "Net interest income",
      "l": "m3l4",
      "d": "The margin a bank earns between what it makes on client balances and what it pays for them — typically the largest cash management revenue line."
    },
    {
      "t": "Open account",
      "l": "m4l1",
      "d": "Settlement where the exporter ships and invoices, with payment following later — placing the risk on the exporter, and now the majority of world trade."
    },
    {
      "t": "Documentary collection",
      "l": "m4l1",
      "d": "Banks exchange documents against payment or acceptance without guaranteeing anything themselves."
    },
    {
      "t": "Letter of credit",
      "l": "m4l2",
      "d": "A bank's undertaking to pay a seller against documents complying with the credit's terms."
    },
    {
      "t": "Applicant",
      "l": "m4l2",
      "d": "The buyer, who asks its bank to issue a letter of credit."
    },
    {
      "t": "Beneficiary",
      "l": "m4l2",
      "d": "The party entitled to be paid under a credit — normally the seller."
    },
    {
      "t": "Confirming bank",
      "l": "m4l2",
      "d": "A second bank adding its own independent undertaking, used when the issuing bank or its country is the risk."
    },
    {
      "t": "Autonomy principle",
      "l": "m4l2",
      "d": "The rule that a credit is separate from the underlying sale, so a goods dispute does not by itself excuse payment."
    },
    {
      "t": "UCP 600",
      "l": "m4l2",
      "d": "The ICC rules governing documentary credits and how documentary compliance is assessed."
    },
    {
      "t": "Discrepancy",
      "l": "m4l2",
      "d": "A mismatch between the documents presented and the credit's terms — the ordinary reason a presentation fails."
    },
    {
      "t": "Demand guarantee",
      "l": "m4l3",
      "d": "A guarantee payable on presentation of a compliant demand, without proof of default."
    },
    {
      "t": "Conditional guarantee",
      "l": "m4l3",
      "d": "A guarantee payable only once the beneficiary establishes the other side's default."
    },
    {
      "t": "Standby letter of credit",
      "l": "m4l3",
      "d": "A guarantee issued in letter of credit form, common where banks were restricted from issuing guarantees directly."
    },
    {
      "t": "URDG 758",
      "l": "m4l3",
      "d": "The ICC's Uniform Rules for Demand Guarantees, the usual rulebook for demand guarantees."
    },
    {
      "t": "Unfair calling",
      "l": "m4l3",
      "d": "A beneficiary demanding payment under a guarantee where nothing has actually gone wrong."
    },
    {
      "t": "Payables finance",
      "l": "m4l4",
      "d": "Reverse factoring: a bank pays a large buyer's approved supplier invoices early, priced off the buyer's credit."
    },
    {
      "t": "Factoring",
      "l": "m4l4",
      "d": "Outright sale of receivables to a financier, often with the debtor notified."
    },
    {
      "t": "Invoice discounting",
      "l": "m4l4",
      "d": "Borrowing against receivables, usually confidentially, with the seller still collecting."
    },
    {
      "t": "With recourse",
      "l": "m4l4",
      "d": "A receivables facility where the risk returns to the seller if the debtor does not pay — which makes it behave like a loan."
    },
    {
      "t": "Bill of lading",
      "l": "m4l5",
      "d": "The carrier's document which, when negotiable, is a document of title: holding the original controls the goods."
    },
    {
      "t": "MLETR",
      "l": "m4l5",
      "d": "The UNCITRAL Model Law on Electronic Transferable Records, giving electronic trade documents legal effect where a reliable system ensures exclusive control."
    },
    {
      "t": "Duplicate financing",
      "l": "m4l5",
      "d": "Financing the same cargo with several banks at once — a chronic commodity trade fraud and the argument for a shared registry."
    },
    {
      "t": "Global custodian",
      "l": "m5l1",
      "d": "A single custody relationship covering many markets, appointing sub-custodians in each."
    },
    {
      "t": "Sub-custodian",
      "l": "m5l1",
      "d": "A bank holding assets in a local market on behalf of a global custodian."
    },
    {
      "t": "CSD",
      "l": "m5l1",
      "d": "Central securities depository — where the definitive record of ownership for a market sits."
    },
    {
      "t": "Omnibus account",
      "l": "m5l1",
      "d": "An account holding many clients' assets together, with the custodian's own books identifying ownership."
    },
    {
      "t": "Corporate action",
      "l": "m5l2",
      "d": "An issuer event affecting holders — dividend, rights issue, merger, tender — either mandatory or requiring an election."
    },
    {
      "t": "Voluntary corporate action",
      "l": "m5l2",
      "d": "An event where the holder must choose by a deadline; the concentration point of custody operational risk."
    },
    {
      "t": "Tax reclaim",
      "l": "m5l2",
      "d": "Recovering withholding tax over-deducted at source under a double taxation treaty."
    },
    {
      "t": "Fund administration",
      "l": "m5l3",
      "d": "Striking a fund's net asset value, keeping its books and producing investor reporting."
    },
    {
      "t": "Transfer agency",
      "l": "m5l3",
      "d": "Maintaining a fund's investor register and processing subscriptions and redemptions."
    },
    {
      "t": "Depositary",
      "l": "m5l3",
      "d": "A regulated European role providing independent oversight of a fund, with strict liability for loss of assets held in custody."
    },
    {
      "t": "Central counterparty",
      "l": "m5l3",
      "d": "A clearing house interposing itself between buyer and seller so each faces it rather than each other."
    },
    {
      "t": "Collateral management",
      "l": "m5l3",
      "d": "Calculating exposures, calling margin and moving eligible collateral — a service line created by post-crisis margin rules."
    },
    {
      "t": "Intraday exposure",
      "l": "m6l1",
      "d": "Credit risk arising when a bank releases payments before covering funds arrive, even though the position closes the same day."
    },
    {
      "t": "Contingent exposure",
      "l": "m6l1",
      "d": "An obligation such as a guarantee or undrawn limit that is not a drawn loan but must still be capitalised."
    },
    {
      "t": "Credit conversion factor",
      "l": "m6l1",
      "d": "The multiplier converting an off-balance-sheet item into a credit-equivalent exposure for capital purposes."
    },
    {
      "t": "KYCC",
      "l": "m6l2",
      "d": "Know your customer's customer — diligence on a respondent bank's own clients and controls in correspondent relationships."
    },
    {
      "t": "Nested relationship",
      "l": "m6l2",
      "d": "A third bank using a respondent bank's correspondent account, obscuring who is really transacting."
    },
    {
      "t": "Trade-based money laundering",
      "l": "m6l2",
      "d": "Moving value by misrepresenting trade — over- or under-invoicing, phantom shipments or multiple invoicing of one cargo."
    },
    {
      "t": "Leverage ratio",
      "l": "m6l3",
      "d": "A risk-insensitive backstop measuring total exposure against capital, often the binding constraint on high-volume low-risk business."
    },
    {
      "t": "NSFR",
      "l": "m6l3",
      "d": "Net Stable Funding Ratio — requires stable funding against assets over a one-year horizon; short-dated trade assets require relatively little."
    },
    {
      "t": "Impact tolerance",
      "l": "m6l4",
      "d": "The maximum disruption a firm judges acceptable for an important business service, defined under operational resilience rules."
    },
    {
      "t": "Callback verification",
      "l": "m6l4",
      "d": "Independently telephoning a known contact to confirm a change of bank details — the single most effective control against payment fraud."
    },
    {
      "t": "Value dating",
      "l": "m6l4",
      "d": "The business day on which a payment takes effect, determined by currency and rail cut-off times."
    },
    {
      "t": "Treasury workstation",
      "l": "m7l1",
      "d": "The software a corporate treasurer works in, aggregating balances and initiating payments across banks."
    },
    {
      "t": "Payment initiation API",
      "l": "m7l2",
      "d": "An interface letting a client's own system instruct and track payments directly, rather than exchanging files."
    },
    {
      "t": "Real-time treasury",
      "l": "m7l2",
      "d": "Continuous visibility and movement of cash, valuable where flows are volatile and buffers expensive."
    },
    {
      "t": "Tokenised deposit",
      "l": "m7l3",
      "d": "A commercial bank deposit recorded on a shared ledger — same balance sheet and protection, but able to move continuously and settle atomically."
    },
    {
      "t": "Partior",
      "l": "m7l3",
      "d": "An interbank cross-border clearing and settlement network on a shared ledger, founded by JPMorgan, DBS and Temasek."
    },
    {
      "t": "Anchorpoint Financial",
      "l": "m7l3",
      "d": "The Standard Chartered, HKT and Animoca joint venture holding one of the first HKMA stablecoin issuer licences."
    },
    {
      "t": "Intraday liquidity buffer",
      "l": "m7l3",
      "d": "Funds held during the day because payment and delivery legs settle at different times — a cost atomic settlement attacks directly."
    }
  ]
}
);
