/* Digital Assets Academy — curriculum data
 * Content current as of August 2026. Figures are point-in-time; see sources.md.
 * Plain global (no build step) so the app runs from file:// or any static host.
 */
window.DA_CURRICULUM = {
  version: "2026.08",
  updated: "August 2026",
  modules: [

  /* ============================== MODULE 1 ============================== */
  {
    id: "m1",
    number: 1,
    title: "What a digital asset actually is",
    tagline: "Taxonomy before technology",
    icon: "◈",
    minutes: 40,
    summary: "Most confusion in this field is a category error. Before any technology, you need a taxonomy that separates the token from the thing it represents, and the claim from the bearer instrument.",
    outcomes: [
      "Place any digital asset into one of six categories and say who bears the risk",
      "Distinguish a bearer instrument from a registered claim, and explain why it matters legally",
      "Explain why 'crypto' and 'digital assets' are not synonyms in an institutional setting",
      "Read the 2026 market by size rather than by noise"
    ],
    lessons: [
      {
        id: "m1l1",
        title: "The six categories",
        minutes: 9,
        body: `
<p>The single most useful thing you can carry into any digital-asset conversation is a taxonomy. Nearly every argument in this field — is it a security, who regulates it, does it need capital held against it — collapses once you know which box the thing sits in.</p>

<h4>1. Native crypto-assets</h4>
<p>Tokens whose value comes from the network itself and which reference no external claim. Bitcoin, Ether. Nobody owes you anything. There is no issuer, no balance sheet, no redemption. Basel calls these <strong>Group 2</strong> and treats them as the riskiest thing a bank can hold.</p>

<h4>2. Stablecoins</h4>
<p>Tokens designed to hold a fixed value against a reference — almost always the US dollar. The token is a <em>liability of an issuer</em>, backed by reserves. Circle's USDC, Tether's USDT, and from 2026 a growing set of licensed bank-issued coins. The interesting question is never "is it stable" but "who is the issuer, what is in the reserve, and what is my legal right to redeem".</p>

<h4>3. Tokenised deposits</h4>
<p>A commercial bank deposit, recorded on a distributed ledger rather than in a conventional core banking system. Still a deposit: same depositor protection, same balance sheet, same regulatory perimeter. JPMorgan's deposit tokens, DBS Token Services, Partior. Banks like this category because it changes the plumbing without changing the law.</p>

<h4>4. Tokenised securities and real-world assets (RWAs)</h4>
<p>A conventional financial instrument — a Treasury bill, a money market fund unit, a private credit loan, an equity share — where the register of ownership lives on a ledger. BlackRock's BUIDL, Franklin Templeton's BENJI, Standard Chartered's Libeara. Legally these are still securities. The token is a new <em>record-keeping</em> technology, not a new <em>asset class</em>.</p>

<h4>5. Central bank digital currency (CBDC)</h4>
<p>A direct liability of a central bank in tokenised form. Split hard into two very different animals: <strong>wholesale</strong> CBDC (for banks, settling interbank obligations — real, live, and boring in the best sense) and <strong>retail</strong> CBDC (for the public — politically fraught, slow, and in retreat in several jurisdictions).</p>

<h4>6. Non-fungible and utility tokens</h4>
<p>Tokens representing a unique item or an access right rather than a financial claim: NFTs, gaming assets, governance tokens. Institutionally marginal in 2026, but the <em>uniqueness</em> mechanic underpins serious use cases — carbon credits, trade documents, warehouse receipts.</p>

<div class="callout">
<strong>The test that does the work:</strong> ask "if this token becomes worthless tomorrow, who did I have a claim against?" Nobody → native crypto. An issuer with reserves → stablecoin. A bank → tokenised deposit. A fund or corporate → tokenised security. A central bank → CBDC.
</div>`,
        key: [
          "Six categories: native crypto, stablecoins, tokenised deposits, tokenised securities/RWAs, CBDC, non-fungible/utility",
          "The category is determined by who owes you something, not by the technology",
          "Tokenisation changes the record of ownership, not the legal nature of the asset"
        ]
      },
      {
        id: "m1l2",
        title: "Bearer instruments and the transfer of title",
        minutes: 8,
        body: `
<p>Traditional finance almost never uses bearer instruments any more. Your shares are recorded in a register held by a central securities depository; your money is an entry in a bank's ledger. Ownership is <strong>a name on a list maintained by an intermediary</strong>.</p>

<p>A public blockchain inverts this. Control of a private key <em>is</em> control of the asset. That produces three consequences institutions spend most of their energy managing:</p>

<h4>Finality is brutal</h4>
<p>A confirmed transfer cannot be reversed by an operator. There is no chargeback, no recall, no "please unwind that". Payments people love this (settlement risk disappears). Operational risk people hate it (a fat-fingered address is a permanent loss).</p>

<h4>Custody becomes the whole game</h4>
<p>If the key is the asset, then key management is asset safekeeping. This is why a bank's digital-asset business almost always starts with custody: it is the control point, the fee line, and the regulatory anchor all at once.</p>

<h4>Legal title and ledger position can diverge</h4>
<p>For native crypto they are the same thing. For a tokenised security they may not be. If a court can order a transfer agent to reassign a share, then the token is evidence of title, not title itself. Jurisdictions that want serious tokenised markets have had to legislate this explicitly — Luxembourg's blockchain laws, Switzerland's DLT Act, the UK's work on digital securities.</p>

<div class="callout warn">
<strong>Watch for:</strong> a "tokenised bond" where the ledger is authoritative for trading but a traditional register remains authoritative for legal ownership. You then have two records that can disagree, and reconciliation — the exact cost tokenisation was supposed to remove.
</div>`,
        key: [
          "Public-chain assets behave as bearer instruments: the key is the asset",
          "Settlement finality removes counterparty risk but removes recourse too",
          "For tokenised securities, ask whether the ledger is legally authoritative or merely a mirror"
        ]
      },
      {
        id: "m1l3",
        title: "Fungible, divisible, programmable",
        minutes: 7,
        body: `
<p>Three properties explain most of what tokenisation is actually good for.</p>

<h4>Fungibility</h4>
<p>Interchangeable units, like cash or a share class. Fungible tokens (the ERC-20 standard) suit money and securities. Non-fungible tokens suit unique items — a specific loan, a specific bill of lading, a specific property title.</p>

<h4>Divisibility</h4>
<p>A token can be split far below the natural denomination of the underlying. A $100,000 minimum private-credit fund becomes accessible at $100. This is the argument behind "democratising access", and it is real — but it collides with securities law, which usually restricts <em>who</em> can hold the asset regardless of ticket size.</p>

<h4>Programmability</h4>
<p>This is the property with genuine institutional value. Rules travel <em>with</em> the asset instead of living in a separate system:</p>
<ul>
<li><strong>Transfer restrictions</strong> — the token refuses to move to a wallet that has not been whitelisted (the ERC-3643 permissioned-token standard exists for exactly this)</li>
<li><strong>Atomic settlement</strong> — delivery and payment either both happen or neither does, eliminating principal risk</li>
<li><strong>Automated servicing</strong> — coupon payments, redemptions, waterfall distributions executed by code rather than by an operations team</li>
<li><strong>Conditional payments</strong> — funds release when a shipping document is presented, or an escrow expires</li>
</ul>

<p>Programmability is why private credit — an asset class notorious for manual servicing, opaque valuation and no secondary market — became the second-largest tokenised category by 2026 at roughly <strong>$8bn</strong>. The problem it solves is operational, not speculative.</p>`,
        key: [
          "Fungibility, divisibility and programmability are the three levers tokenisation pulls",
          "Programmability, not divisibility, is where the institutional value sits",
          "Rules embedded in the asset replace rules enforced in a separate system"
        ]
      },
      {
        id: "m1l4",
        title: "Where the money actually is, mid-2026",
        minutes: 8,
        body: `
<p>Sizing the market cuts through a lot of noise. As of mid-2026:</p>

<table class="data">
<thead><tr><th>Segment</th><th>Size</th><th>Direction</th></tr></thead>
<tbody>
<tr><td>Stablecoins outstanding</td><td>~$308bn (Aug 2026)</td><td>+14% YoY, ~99% USD-denominated</td></tr>
<tr><td>Tokenised RWAs (ex-stablecoins)</td><td>~$29–34bn</td><td>Roughly tripled from 2024 levels</td></tr>
<tr><td>— tokenised Treasuries</td><td>~$15–16bn</td><td>Largest single RWA category</td></tr>
<tr><td>— private credit</td><td>~$8bn</td><td>Fastest institutional adoption</td></tr>
<tr><td>— tokenised equities</td><td>~$2.4bn</td><td>Smallest, fastest-growing</td></tr>
<tr><td>Real stablecoin payment volume</td><td>~$400bn/yr</td><td>~60% B2B</td></tr>
</tbody>
</table>

<p>Three readings worth holding on to:</p>

<p><strong>Stablecoins are an order of magnitude larger than everything else tokenised put together.</strong> If you only have attention for one segment, it is this one. Everything else is early.</p>

<p><strong>The dollar dominance is nearly total.</strong> About 99% of stablecoin supply references the US dollar. Every non-USD stablecoin project — HKD, EUR, SGD, GBP — is fighting network effects, not just regulation. This is precisely why several central banks treat stablecoins as a monetary sovereignty question rather than a payments question.</p>

<p><strong>Tokenised Treasuries and private credit are the only categories with genuine product-market fit.</strong> A common 2026 argument is that only one asset class is truly ready for prime time. Treasuries work because the underlying is simple, liquid, and yields something; private credit works because the operational pain being solved is enormous.</p>

<div class="callout">
<strong>Sanity check any tokenisation pitch with:</strong> what does putting this on a ledger remove? If the answer is not a named cost — reconciliation, settlement lag, manual servicing, collateral immobility — it is a technology looking for a problem.
</div>`,
        key: [
          "Stablecoins (~$308bn) dwarf all other tokenised assets (~$29–34bn) combined",
          "~99% of stablecoin supply is USD-referenced — a sovereignty issue, not just a market fact",
          "Tokenised Treasuries (~$15bn) and private credit (~$8bn) lead on genuine product-market fit"
        ]
      },
      {
        id: "m1l5",
        title: "Why 'crypto' and 'digital assets' are different words",
        minutes: 8,
        body: `
<p>Inside a bank the two terms describe almost opposite businesses, and conflating them is the fastest way to lose an argument in a risk committee.</p>

<table class="data">
<thead><tr><th></th><th>Crypto</th><th>Digital assets (institutional)</th></tr></thead>
<tbody>
<tr><td>Typical asset</td><td>BTC, ETH, tokens</td><td>Tokenised deposits, MMFs, Treasuries, licensed stablecoins</td></tr>
<tr><td>Revenue model</td><td>Trading, custody fees, spread</td><td>Settlement, servicing, collateral efficiency, distribution</td></tr>
<tr><td>Capital treatment</td><td>Basel Group 2, up to 1250% risk weight</td><td>Basel Group 1, treated like the underlying</td></tr>
<tr><td>Main risk</td><td>Price, reputational, AML</td><td>Operational, legal, technology</td></tr>
<tr><td>Buyer</td><td>Trading desks, wealth clients</td><td>Corporate treasurers, asset managers, FI clients</td></tr>
</tbody>
</table>

<p>The Basel line is the sharpest one. Under the crypto-asset standard <strong>SCO60</strong>, effective 1 January 2026, a tokenised Treasury bill that meets the classification conditions sits in Group 1 and attracts broadly the same capital as the bill itself. Unbacked Bitcoin sits in Group 2 with a punitive risk weight and an exposure limit. Same technology, wildly different economics for a regulated balance sheet.</p>

<p>This is why banks that publicly distance themselves from "crypto" simultaneously run large digital-asset programmes. It is not hypocrisy; the two things carry different capital, different clients, and different failure modes.</p>

<div class="callout">
<strong>Useful framing for a bank:</strong> crypto is an asset you might hold or trade for a client. Digital assets are a set of rails you might run your existing business on. The second is a much bigger prize and a much slower build.
</div>`,
        key: [
          "'Crypto' and 'digital assets' describe different businesses, clients and capital treatments",
          "Basel SCO60 (effective 1 Jan 2026) splits Group 1 tokenised traditional assets from Group 2 unbacked crypto",
          "Banks pursue digital-asset rails while limiting crypto exposure — a coherent position, not a contradiction"
        ]
      }
    ]
  },

  /* ============================== MODULE 2 ============================== */
  {
    id: "m2",
    number: 2,
    title: "The machine underneath",
    tagline: "Enough cryptography and consensus to reason properly",
    icon: "⛓",
    minutes: 45,
    summary: "You do not need to write cryptography, but you do need to know what a blockchain guarantees, what it does not, and where the guarantees stop. Almost every failure in this industry happens at the boundary.",
    outcomes: [
      "Explain hashing, keys and signatures well enough to reason about custody risk",
      "Distinguish proof of work from proof of stake and say what each actually secures",
      "Define probabilistic versus deterministic finality and why settlement teams care",
      "Identify what a chain guarantees and what sits outside the guarantee"
    ],
    lessons: [
      {
        id: "m2l1",
        title: "Hashes, keys and signatures",
        minutes: 9,
        body: `
<p>Three primitives carry the entire structure.</p>

<h4>Cryptographic hash</h4>
<p>A one-way function turning any input into a fixed-length fingerprint. Same input, always the same output; change one character and the output is unrecognisably different; you cannot run it backwards. Blocks chain together because each block contains the hash of the one before it — alter any historical transaction and every subsequent hash breaks. That is the "immutability" people talk about: not magic, just a tamper-evident chain of fingerprints.</p>

<h4>Public/private key pairs</h4>
<p>Generate a random private key; derive a public key from it mathematically; derive an address from the public key. The derivation runs one way only. The private key never leaves your control and never appears on-chain. Lose it and the asset is unrecoverable — not frozen, not recoverable by an administrator, gone.</p>

<h4>Digital signatures</h4>
<p>To move an asset you sign a transaction with the private key. Anyone can verify with the public key that the holder of the corresponding private key authorised this exact message. No shared secret, no trusted intermediary.</p>

<div class="callout">
<strong>The institutional consequence:</strong> because the signature is the only authorisation, every control a bank normally applies — four eyes, limits, sanctions screening, dual approval — has to be enforced <em>before</em> the signature is produced. This is the entire design problem of institutional custody, and it is why <em>policy engines</em> matter more than vaults.
</div>

<h4>Seed phrases and derivation</h4>
<p>Most wallets do not store one key but a <strong>seed</strong> — typically 12 or 24 words — from which an effectively unlimited tree of keys is derived deterministically (the BIP-32/39/44 standards). Back up the seed and you back up every key. This is convenient and dangerous in equal measure: one compromised seed exposes an entire wallet hierarchy.</p>`,
        key: [
          "Hashing gives tamper evidence; signatures give authorisation; keys give control",
          "Private keys never appear on-chain; loss is permanent and unrecoverable",
          "Institutional controls must be enforced before signing — hence policy engines, not just vaults",
          "A seed phrase derives an entire key tree, so one compromise exposes everything below it"
        ]
      },
      {
        id: "m2l2",
        title: "Accounts, UTXOs and what a transaction really is",
        minutes: 8,
        body: `
<p>Two ledger models dominate, and the difference shows up in everything from privacy to smart-contract design.</p>

<h4>UTXO model (Bitcoin)</h4>
<p>The ledger is a set of <em>unspent transaction outputs</em> — discrete chunks of value, each locked to a condition. Spending consumes whole outputs and creates new ones, including change back to yourself. There is no "balance" stored anywhere; your balance is the sum of outputs you can unlock. Good for parallel validation and privacy hygiene, awkward for complex state.</p>

<h4>Account model (Ethereum and most others)</h4>
<p>The ledger is a mapping of addresses to balances and stored data, much like a bank ledger. A transaction mutates state directly. This makes smart contracts natural — a contract is just an account with code and storage — at the cost of easier transaction-graph analysis.</p>

<h4>Anatomy of a transaction</h4>
<ul>
<li><strong>Nonce</strong> — a per-account counter preventing replay and forcing ordering</li>
<li><strong>To / value / data</strong> — recipient, amount, and any contract call payload</li>
<li><strong>Fee parameters</strong> — how much you will pay for execution and how much you will tip for priority</li>
<li><strong>Signature</strong> — the authorisation</li>
</ul>

<p>Once broadcast, the transaction sits in the <strong>mempool</strong> — a public waiting room — until a block producer includes it. That visibility window is exploitable: observers can front-run, back-run or sandwich a pending trade. This is <strong>MEV</strong> (maximal extractable value), and for institutions executing size on public chains it is a real execution-quality problem, mitigated with private order flow, batch auctions, or simply not trading on a public mempool.</p>`,
        key: [
          "UTXO tracks discrete unspent outputs; account model tracks balances and state",
          "The account model makes smart contracts natural, which is why most programmable chains use it",
          "Pending transactions are publicly visible in the mempool, creating MEV and execution risk"
        ]
      },
      {
        id: "m2l3",
        title: "Consensus: proof of work and proof of stake",
        minutes: 9,
        body: `
<p>Consensus answers one question: among many candidate versions of history, which one is real? It does not verify that a transaction is <em>wise</em>, only that it is valid and ordered.</p>

<h4>Proof of work</h4>
<p>Producers race to find a hash below a target by brute force. Winning costs electricity, so rewriting history costs electricity retroactively. Security is bought with energy and is external to the system. Bitcoin's entire security model.</p>

<h4>Proof of stake</h4>
<p>Validators post capital as collateral. Propose or attest incorrectly and the protocol destroys part of that capital — <strong>slashing</strong>. Security is bought with capital at risk and is internal to the system. Ethereum moved to this in 2022, and it is the default for essentially every chain launched since.</p>

<table class="data">
<thead><tr><th></th><th>Proof of work</th><th>Proof of stake</th></tr></thead>
<tbody>
<tr><td>Cost of attack</td><td>Acquire hashpower + energy</td><td>Acquire stake, then lose it to slashing</td></tr>
<tr><td>Energy</td><td>Very high by design</td><td>Negligible</td></tr>
<tr><td>Yield to participants</td><td>Mining rewards, net of cost</td><td>Staking rewards — an income asset</td></tr>
<tr><td>Centralisation pressure</td><td>Cheap power, hardware supply</td><td>Large staking pools, liquid staking providers</td></tr>
<tr><td>Institutional angle</td><td>Mining is an energy business</td><td>Staking is a yield product with regulatory questions</td></tr>
</tbody>
</table>

<p>Proof of stake matters commercially because it turns a network token into a <strong>yield-bearing instrument</strong>. That immediately raises questions custodians and regulators have spent years on: is staking-as-a-service a securities offering? Who bears slashing loss? Does a custodian's lien survive when assets are bonded and subject to an unstaking queue?</p>`,
        key: [
          "Consensus decides ordering and validity, not merit",
          "PoW buys security with energy (external); PoS buys it with slashable capital (internal)",
          "PoS makes the token yield-bearing, creating custody, disclosure and securities questions"
        ]
      },
      {
        id: "m2l4",
        title: "Finality — the concept settlement people care about",
        minutes: 8,
        body: `
<p>In payments and securities, <strong>settlement finality</strong> is a legal state: the transfer is irrevocable and unconditional, and it survives the insolvency of a participant. On a blockchain, finality is a technical property that may or may not line up with the legal one.</p>

<h4>Probabilistic finality</h4>
<p>Bitcoin never declares a transaction final. Each additional block makes reversal exponentially more expensive. Convention says six confirmations (roughly an hour) is enough. It is a risk judgment dressed as a rule.</p>

<h4>Deterministic (economic) finality</h4>
<p>Ethereum's proof-of-stake consensus finalises checkpoints. Once finalised, reverting requires an attacker to forfeit an enormous amount of staked capital. Not a mathematical impossibility — an economic one.</p>

<h4>Instant finality</h4>
<p>Permissioned and BFT-style networks used in institutional settings finalise as soon as a quorum of known validators agrees, in one round. No reorganisations. This is one of the strongest reasons banks build on permissioned infrastructure: reorg risk is not a risk anyone wants to explain to a regulator.</p>

<div class="callout warn">
<strong>The gap that matters:</strong> technical finality is not legal finality. Legal finality comes from a designated system under settlement finality law — in the EU, the Settlement Finality Directive. A chain can be technically irreversible while a court still unwinds the transfer. Jurisdictions building serious tokenised markets have to close this gap explicitly, and many have not.
</div>`,
        key: [
          "Probabilistic (Bitcoin), economic (Ethereum PoS), instant (permissioned BFT)",
          "Technical irreversibility is not the same as legal settlement finality",
          "Reorg risk is a major reason institutions favour permissioned networks"
        ]
      },
      {
        id: "m2l5",
        title: "Nodes, clients and the boundary of the guarantee",
        minutes: 8,
        body: `
<p>A blockchain guarantees a narrow set of things very well and guarantees nothing at all outside that set. Almost every large loss in this industry happens outside the boundary.</p>

<h4>Inside the guarantee</h4>
<ul>
<li>Only the holder of a private key can move the asset controlled by it</li>
<li>Transaction history cannot be silently rewritten</li>
<li>Everyone converges on the same ordered state</li>
<li>Code executes exactly as written</li>
</ul>

<h4>Outside the guarantee</h4>
<ul>
<li><strong>That the code says what its author intended.</strong> Faithful execution of a flawed contract is still a loss.</li>
<li><strong>That off-chain data is true.</strong> Prices, identity, reserve attestations — all arrive from outside via oracles.</li>
<li><strong>That the issuer of a backed token holds the reserves.</strong> A chain can prove tokens exist; only an auditor can prove dollars do.</li>
<li><strong>That your key management is sound.</strong> The overwhelming majority of losses are key and access-control failures, not consensus failures.</li>
<li><strong>That a bridged asset is redeemable.</strong> Cross-chain bridges have been the single most damaging category of exploit.</li>
</ul>

<h4>Client diversity</h4>
<p>A network is run by independent implementations of the protocol. If one client holds a supermajority, a bug in it becomes a network-wide event. This is a live operational-risk item for anyone running validators, and one that most institutional risk frameworks are still not written to capture.</p>

<div class="callout">
<strong>Carry this:</strong> "trustless" describes the consensus layer only. Every real application reintroduces trusted parties — issuers, oracles, custodians, bridge operators, upgrade admins. The right question is never "is it trustless" but "which parties am I trusting, and what happens when one fails?"
</div>`,
        key: [
          "Chains guarantee key control, ordering, tamper evidence and faithful execution — nothing more",
          "Reserves, prices, identity, intent and key management all sit outside the guarantee",
          "Bridges and access control, not consensus, account for most large losses"
        ]
      }
    ]
  }
  ,
  /* ============================== MODULE 3 ============================== */
  {
    id: "m3",
    number: 3,
    title: "Programmability and the token stack",
    tagline: "Smart contracts, standards, oracles and admin keys",
    icon: "⚙",
    minutes: 45,
    summary: "A token is not a file — it is a row in a contract's ledger. Understanding what a smart contract is, which standards matter, and who holds the upgrade key explains most of the operational risk in this field.",
    outcomes: [
      "Explain what a smart contract is and what gas actually pays for",
      "Name the token standards that matter institutionally and what each one solves",
      "Describe how oracles work and why they are the most common single point of failure",
      "Ask the right questions about upgradeability and admin control"
    ],
    lessons: [
      {
        id: "m3l1",
        title: "Smart contracts and gas",
        minutes: 8,
        body: `
<p>A smart contract is a program deployed to an address on a chain. It has its own storage, it can hold assets, and its code runs identically on every node. It is neither smart nor a contract: it is deterministic code with no discretion and no legal force of its own.</p>

<p>Three properties define the model:</p>
<ul>
<li><strong>Deterministic</strong> — same input, same state, same result, everywhere. No randomness, no clock, no network calls.</li>
<li><strong>Public</strong> — bytecode is visible to everyone, and usually the source is verified and published too</li>
<li><strong>Reactive</strong> — contracts never act on their own. Something must call them. "Automatic" coupon payments are automatic only because someone or something triggers them.</li>
</ul>

<h4>Gas</h4>
<p>Every operation costs <strong>gas</strong>, a unit of computational work. Your fee is gas used × gas price, and the price floats with demand. Gas exists to stop infinite loops and to price scarce block space. Practical consequences:</p>
<ul>
<li>Fees are unpredictable and spike with network congestion, which makes them awkward to pass through to a client</li>
<li>Complex logic costs more, so contracts are written tersely — which reduces readability and raises audit risk</li>
<li>If gas runs out mid-execution the transaction reverts entirely but the fee is still paid</li>
<li>Somebody must hold the native token to pay fees, an operational nuisance for institutions solved with paymasters and account abstraction</li>
</ul>

<h4>The EVM</h4>
<p>The Ethereum Virtual Machine is the dominant execution environment, replicated across dozens of other chains. EVM compatibility is a network effect: tooling, auditors, wallets and developer supply all cluster there. It is why even chains with better technical designs often choose to be EVM-compatible anyway.</p>`,
        key: [
          "Smart contracts are deterministic, public, and purely reactive — they never self-trigger",
          "Gas prices computation and prevents infinite loops; failed transactions still pay",
          "EVM compatibility is a network effect around tooling and developer supply"
        ]
      },
      {
        id: "m3l2",
        title: "Token standards that matter",
        minutes: 9,
        body: `
<p>A token is not a native feature of most chains — it is a contract following an agreed interface. Standards are what make wallets, exchanges and custodians interoperable.</p>

<table class="data">
<thead><tr><th>Standard</th><th>What it is</th><th>Why it matters</th></tr></thead>
<tbody>
<tr><td><strong>ERC-20</strong></td><td>Fungible token</td><td>The universal interface. Every stablecoin and most tokenised funds are ERC-20 or a superset.</td></tr>
<tr><td><strong>ERC-721</strong></td><td>Non-fungible token</td><td>Unique items: a specific loan, deed, document or credit.</td></tr>
<tr><td><strong>ERC-1155</strong></td><td>Multi-token</td><td>Many token types in one contract. Efficient for tranches and series.</td></tr>
<tr><td><strong>ERC-4626</strong></td><td>Tokenised vault</td><td>Standard interface for a yield-bearing share of a pool. The nearest on-chain analogue to a fund unit.</td></tr>
<tr><td><strong>ERC-3643 (T-REX)</strong></td><td>Permissioned security token</td><td>Enforces identity and eligibility checks on transfer. The standard institutions actually reach for when tokenising regulated assets.</td></tr>
<tr><td><strong>ERC-4337 / 7702</strong></td><td>Account abstraction</td><td>Programmable accounts: multi-sig policy, session limits, fee sponsorship, recovery. Quietly the most institutionally useful development of recent years.</td></tr>
</tbody>
</table>

<h4>Permissioned transfer is the institutional pivot</h4>
<p>Plain ERC-20 lets anyone hold and transfer. That is unacceptable for a regulated security where eligibility, jurisdiction and sanctions status must be checked <em>at transfer</em>, not after. ERC-3643 and similar designs bind an on-chain identity registry to the token so a non-compliant transfer simply fails.</p>

<p>This is the mechanism behind 2026's permissioned-liquidity moves — Uniswap's permissioned pools for tokenised funds and equities being the clearest example: public infrastructure, gated participation.</p>

<div class="callout">
<strong>The trade-off nobody escapes:</strong> permissioning restores control and shrinks the liquidity pool. Fully open tokens are liquid but unusable for regulated assets. Fully closed tokens are compliant but recreate the walled gardens tokenisation was meant to dissolve. Every serious design in 2026 is a negotiated point on that line.
</div>`,
        key: [
          "ERC-20 fungible, ERC-721 unique, ERC-4626 vaults, ERC-3643 permissioned securities",
          "Account abstraction (ERC-4337/7702) brings policy, limits and recovery to accounts",
          "Permissioning trades liquidity for compliance — the central design tension in tokenised markets"
        ]
      },
      {
        id: "m3l3",
        title: "Oracles: the bridge to the real world",
        minutes: 8,
        body: `
<p>A chain is deliberately sealed off. It cannot fetch a price, read a bank balance, check a shipment or know the date beyond block timestamps. Anything external must be <em>pushed in</em> by an <strong>oracle</strong>.</p>

<h4>How they work</h4>
<p>A decentralised oracle network takes readings from many independent sources and node operators, aggregates them (typically a median to blunt outliers), and writes the result on-chain, where contracts read it. Chainlink is the dominant provider; Pyth is prominent in low-latency market data.</p>

<h4>Why they are the classic failure point</h4>
<ul>
<li><strong>Manipulation</strong> — thin-market prices can be pushed to trigger liquidations. Many early DeFi exploits were oracle-manipulation attacks, not code bugs.</li>
<li><strong>Staleness</strong> — an oracle that updates on a threshold can be minutes behind in a fast market, exactly when accuracy matters most.</li>
<li><strong>Source concentration</strong> — a "decentralised" oracle whose nodes all read the same underlying API is a single point of failure wearing a disguise.</li>
<li><strong>The last mile is trusted</strong> — an oracle reporting a fund's NAV is only as good as the administrator producing it. Decentralising transport does not decentralise truth.</li>
</ul>

<h4>Why it is escalating in importance</h4>
<p>Oracles used to matter mostly to DeFi lending. As tokenised equities and funds move onto public rails, they become market infrastructure: institutional-grade market data now sits behind tokenised stock products (Coinbase's tokenised stocks on Base use Chainlink as official oracle infrastructure, announced August 2026). Reference-price integrity is becoming a market-structure question, not a plumbing detail.</p>

<div class="callout warn">
<strong>Due-diligence question:</strong> for any on-chain product with a price, ask what the oracle is, how many independent sources feed it, how often it updates, and what the contract does when the feed goes stale. The answer to the last one is the one that surprises people.
</div>`,
        key: [
          "Chains cannot access external data; oracles push it in",
          "Oracle manipulation and staleness cause more losses than contract bugs",
          "Decentralised transport does not make the underlying data source decentralised",
          "As tokenised equities scale, oracles become regulated-market infrastructure"
        ]
      },
      {
        id: "m3l4",
        title: "Upgradeability, admin keys and the myth of immutability",
        minutes: 8,
        body: `
<p>"Code is law" is marketing. Most significant contracts in production are upgradeable, and someone holds the key.</p>

<h4>The proxy pattern</h4>
<p>Users interact with a proxy contract that holds the state and forwards calls to a separate logic contract. Point the proxy at new logic and the behaviour changes while balances stay put. Practical for fixing bugs. It also means the rules governing your asset can change after you bought it.</p>

<h4>Privileged functions</h4>
<p>Regulated token contracts routinely include powers that would horrify a purist and reassure a compliance officer:</p>
<ul>
<li><strong>Pause</strong> — freeze all transfers</li>
<li><strong>Blacklist / freeze</strong> — immobilise a specific address (used by major stablecoin issuers under law-enforcement orders, routinely)</li>
<li><strong>Mint / burn</strong> — expand or contract supply</li>
<li><strong>Force transfer</strong> — move tokens without the holder's signature, for court orders or lost-key recovery</li>
<li><strong>Upgrade</strong> — replace the logic entirely</li>
</ul>

<p>These are not flaws in an institutional token. They are requirements. A tokenised security without a force-transfer power cannot honour a court order or reissue after a lost key. The question is never whether the powers exist but <strong>who holds them and under what governance</strong>.</p>

<h4>The questions to ask</h4>
<ol>
<li>Is the contract upgradeable, and by whom?</li>
<li>Is the admin a single key, a multi-sig, or a timelocked governance process?</li>
<li>Is there a delay between an upgrade being announced and taking effect? (A timelock is the difference between a governed system and a trusted one.)</li>
<li>Who can freeze my holding, on what legal basis, and with what appeal?</li>
<li>What happens to the contract if the issuer fails?</li>
</ol>

<div class="callout">
<strong>The reframe:</strong> stop asking "is it decentralised" and start asking "what is the trust structure". Every real product has one. The good ones write it down.
</div>`,
        key: [
          "Most production contracts are upgradeable via proxy patterns",
          "Pause, freeze, mint, burn and force-transfer are requirements for regulated tokens, not defects",
          "Governance of the admin key — multi-sig, timelock, disclosure — is the real control question"
        ]
      },
      {
        id: "m3l5",
        title: "Composability and what breaks it",
        minutes: 7,
        body: `
<p><strong>Composability</strong> is the property that on-chain components can call each other freely, so new products are assembled from existing ones without permission or integration projects. A tokenised Treasury fund becomes collateral in a lending market, whose receipt token becomes collateral somewhere else. This is genuinely novel: in traditional finance every such link is a bilateral integration taking months.</p>

<h4>What it buys</h4>
<ul>
<li>Collateral mobility — the same asset can be posted, rehypothecated or margined without leaving custody</li>
<li>Rapid product assembly with no counterparty onboarding</li>
<li>Price discovery across venues without a central book</li>
</ul>

<h4>What it costs</h4>
<ul>
<li><strong>Correlated failure</strong> — a bug or depeg propagates instantly through everything that composed with it. Risk is not contained by a legal entity boundary.</li>
<li><strong>Opaque leverage</strong> — recursive borrowing against the same underlying stacks leverage invisibly, exactly the dynamic that made the 2022 failures so fast and so total.</li>
<li><strong>Valuation loops</strong> — asset A is collateral for B, whose price feeds A's valuation</li>
</ul>

<h4>Permissioning constrains it deliberately</h4>
<p>Permissioned tokens cannot compose with arbitrary protocols, because the transfer would fail eligibility checks. Institutions accept the loss of composability to keep the risk perimeter legible. The emerging 2026 middle ground — permissioned pools on public AMMs, whitelisted lending markets accepting tokenised collateral — is an attempt to buy some composability back without opening the perimeter.</p>

<div class="callout">
<strong>The honest summary:</strong> composability is the strongest genuine argument for public infrastructure, and the strongest genuine argument against it. Which side you land on depends on whether your institution can price correlated tail risk it does not control.
</div>`,
        key: [
          "Composability lets components call each other without integration projects",
          "It creates collateral mobility — and correlated failure and hidden leverage",
          "Permissioning deliberately sacrifices composability to keep the risk perimeter legible"
        ]
      }
    ]
  },

  /* ============================== MODULE 4 ============================== */
  {
    id: "m4",
    number: 4,
    title: "Scaling and the multi-chain reality",
    tagline: "Rollups, blobspace, bridges and permissioned networks",
    icon: "⬡",
    minutes: 42,
    summary: "By 2026 the question is no longer whether blockchains can scale but which of many chains an asset should live on, and how it moves between them. Fragmentation, not throughput, is the live problem.",
    outcomes: [
      "Explain the rollup model and the difference between optimistic and zero-knowledge designs",
      "Describe what Fusaka and PeerDAS changed for costs in 2026",
      "Assess bridge risk and why it dominates exploit losses",
      "Say when a permissioned network is the right answer for an institution"
    ],
    lessons: [
      {
        id: "m4l1",
        title: "The scaling trilemma and the rollup answer",
        minutes: 8,
        body: `
<p>The framing that shaped a decade of design: a chain wants decentralisation, security and scalability, and can comfortably optimise for two. Push throughput up on a single chain and hardware requirements rise, node count falls, and decentralisation degrades.</p>

<p>The answer the industry converged on is <strong>modularity</strong>: stop asking one chain to do everything. Split the job into execution, settlement, consensus and data availability, and let a base layer specialise in security and data while execution happens elsewhere.</p>

<h4>Rollups</h4>
<p>A rollup executes transactions off the base chain, then posts compressed data and a proof of correctness back to it. Users get cheap, fast execution; the base chain still provides data availability and dispute resolution. Ethereum's roadmap explicitly centres this — the base layer is a security and data platform, and rollups are where activity lives.</p>

<table class="data">
<thead><tr><th></th><th>Optimistic rollup</th><th>Zero-knowledge rollup</th></tr></thead>
<tbody>
<tr><td>Assumption</td><td>Assume valid; allow challenge</td><td>Prove valid cryptographically</td></tr>
<tr><td>Withdrawal delay</td><td>~7 days (challenge window)</td><td>Minutes to hours</td></tr>
<tr><td>Cost profile</td><td>Cheap to post, no proving cost</td><td>Proving is compute-heavy</td></tr>
<tr><td>Maturity</td><td>Very mature (Arbitrum, Optimism, Base)</td><td>Maturing fast (zkSync, Starknet, Linea, Scroll)</td></tr>
<tr><td>Institutional relevance</td><td>Deep liquidity today</td><td>Faster finality suits settlement; privacy potential</td></tr>
</tbody>
</table>

<p>For a settlement use case the seven-day optimistic challenge window is a genuine problem — you cannot tell a treasurer their funds are provably theirs but immobile for a week. That, plus the privacy properties of the underlying cryptography, is why institutional interest skews toward ZK designs even where liquidity is thinner.</p>`,
        key: [
          "The trilemma pushed the industry to modularity: separate execution from settlement and data",
          "Rollups execute off-chain and post data plus correctness assurances to the base layer",
          "Optimistic = mature but ~7-day withdrawal window; ZK = fast finality, heavier proving"
        ]
      },
      {
        id: "m4l2",
        title: "Fusaka, blobs and what changed in 2026",
        minutes: 8,
        body: `
<p>Rollups do not post full transaction data as ordinary calldata any more. They post it into <strong>blobs</strong> — a separate, cheaper, temporary data space introduced specifically for rollups, which nodes retain for a period and then discard. Rollup cost is dominated by the cost of that data, so blob capacity is the main lever on end-user fees.</p>

<h4>Fusaka</h4>
<p>Activated on Ethereum mainnet on <strong>3 December 2025</strong>, the Fusaka upgrade introduced <strong>PeerDAS</strong> — peer data availability sampling. The change is structural: nodes no longer need to download and store <em>all</em> blob data. Each samples a portion, and statistical guarantees establish that the whole is available. Removing that requirement removes the ceiling on blob capacity.</p>

<h4>What it did to capacity and price</h4>
<ul>
<li>Blob targets were raised progressively rather than all at once. By <strong>7 January 2026</strong> the target stood at 14 blobs with a maximum of 21, up from single digits.</li>
<li>The stated path is continued increases toward a ceiling in the region of 48 blobs</li>
<li>Fusaka is characterised as enabling on the order of an <strong>8×</strong> theoretical increase in blob capacity</li>
<li>Expected effect on L2 transaction costs: reductions of roughly <strong>50–90%</strong></li>
<li>Aggregate L2 throughput projections rose from the ~5,600 TPS range toward 24,000+ TPS, with individual chains such as Base targeting 10,000–20,000 TPS</li>
</ul>

<p>The follow-on upgrade, <strong>Glamsterdam</strong>, is scoped and in progress, with the subsequent one (Hegotá) already taking proposals as of early 2026.</p>

<div class="callout">
<strong>Why a banker should care:</strong> per-transaction cost determines which use cases are viable at all. Micro-payments, per-invoice settlement, high-frequency collateral moves and streaming payments are arithmetic problems before they are product problems. A 50–90% cost reduction moves several of them from "interesting" to "modelable".
</div>`,
        key: [
          "Rollups post data into blobs; blob capacity drives L2 fees",
          "Fusaka (3 Dec 2025) introduced PeerDAS — nodes sample rather than store all blob data",
          "Blob target reached 14 (max 21) by Jan 2026, heading toward ~48; ~8x theoretical capacity",
          "Expected 50–90% reduction in L2 transaction costs"
        ]
      },
      {
        id: "m4l3",
        title: "Bridges, interoperability and the biggest loss category",
        minutes: 8,
        body: `
<p>Assets do not natively move between chains. A "bridged" token is almost always a lock-and-mint arrangement: the original is immobilised on chain A and a claim is minted on chain B. The claim is only as good as whatever secures the lock.</p>

<h4>Designs, weakest to strongest</h4>
<ol>
<li><strong>Custodial / federated</strong> — a multi-sig holds the locked assets. Compromise the signers, take everything. This design has produced the largest single losses in the industry's history.</li>
<li><strong>Light-client / native verification</strong> — chain B verifies chain A's consensus directly. Strong, expensive, hard to build.</li>
<li><strong>Messaging protocols with independent validation</strong> — Chainlink's CCIP, LayerZero, Wormhole, and Cosmos IBC for chains that share a security model. Better, still an additional trust assumption.</li>
<li><strong>Issuer-native mint/burn</strong> — the issuer burns on one chain and mints on another, keeping one canonical liability. Circle's cross-chain transfer mechanism works this way.</li>
</ol>

<p>The last is the model institutions should prefer, because it removes the wrapped-asset problem entirely: there is one issuer, one liability, and no synthetic claim whose backing can be stolen.</p>

<div class="callout warn">
<strong>Structural point:</strong> a wrapped token is a credit exposure to the bridge, not the underlying asset. If you hold wrapped BTC on another chain you hold a claim on a custodian or a contract. Risk systems that record it as "BTC" are mismarking the exposure.
</div>

<h4>Fragmentation is the strategic problem</h4>
<p>Liquidity for the same asset ends up split across a dozen venues and chains. This is why the interoperability question — and standards work such as the Interoperability Standards for tokenised assets and MAS's Global Layer One initiative — matters more to institutions than raw throughput. A tokenised bond that cannot reach the buyers on another network is a bond with a smaller market.</p>`,
        key: [
          "Bridged assets are claims; the claim inherits the bridge's security, not the asset's",
          "Custodial/federated bridges have produced the largest losses in the sector",
          "Issuer-native burn-and-mint avoids wrapped-asset credit risk entirely",
          "Fragmented liquidity, not throughput, is the binding constraint on tokenised markets"
        ]
      },
      {
        id: "m4l4",
        title: "Public, private and permissioned networks",
        minutes: 9,
        body: `
<p>Not all institutional activity belongs on a public chain, and the industry has stopped pretending otherwise.</p>

<table class="data">
<thead><tr><th></th><th>Public permissionless</th><th>Public permissioned</th><th>Private / consortium</th></tr></thead>
<tbody>
<tr><td>Who validates</td><td>Anyone</td><td>Known operators on public infra</td><td>Named consortium members</td></tr>
<tr><td>Who transacts</td><td>Anyone</td><td>Whitelisted participants</td><td>Members only</td></tr>
<tr><td>Finality</td><td>Probabilistic / economic</td><td>Varies</td><td>Instant, deterministic</td></tr>
<tr><td>Privacy</td><td>Pseudonymous but fully visible</td><td>Configurable</td><td>Strong by default</td></tr>
<tr><td>Composability</td><td>Maximum</td><td>Constrained</td><td>Minimal</td></tr>
<tr><td>Examples</td><td>Ethereum, Solana, L2s</td><td>Permissioned pools, gated subnets</td><td>Canton, SWIAT, Partior, Fnality</td></tr>
</tbody>
</table>

<h4>Why banks keep building permissioned infrastructure</h4>
<ul>
<li><strong>Confidentiality</strong> — a bank cannot publish counterparty positions and trade sizes to a public ledger</li>
<li><strong>Deterministic finality</strong> — no reorganisations to explain to a regulator</li>
<li><strong>Known validators</strong> — an operational risk framework can actually name them</li>
<li><strong>Legal certainty</strong> — a defined operator can be designated under settlement finality law</li>
</ul>

<h4>Why they keep disappointing</h4>
<p>The value of a network is in its participants. A consortium chain with eight banks and no external liquidity delivers a shared database with extra steps. Most enterprise blockchain disappointment traces back to this single fact rather than to technology.</p>

<p>The 2026 consensus is a hybrid: <strong>public rails for reach and liquidity, permissioned layers for confidentiality and control</strong>, with the token issuer enforcing eligibility at the contract level rather than by choosing a walled network. The permissioned-pool designs and the wholesale settlement architectures in Module 6 are both expressions of that compromise.</p>`,
        key: [
          "Confidentiality, deterministic finality and named validators drive institutions to permissioned networks",
          "Consortium chains fail on network effects, not technology",
          "The 2026 pattern is hybrid: public rails, permissioned participation enforced at the token level"
        ]
      },
      {
        id: "m4l5",
        title: "Reading the multi-chain landscape",
        minutes: 7,
        body: `
<p>A practical map of where things actually happen, and why an issuer would pick each.</p>

<ul>
<li><strong>Ethereum mainnet</strong> — the settlement and security layer. Highest value at rest, deepest institutional tooling, most tokenised RWA issuance. Expensive, so it hosts value rather than activity.</li>
<li><strong>Ethereum L2s (Base, Arbitrum, Optimism, and ZK chains)</strong> — where transactions increasingly happen. Base in particular has become the venue of choice for consumer and tokenised-equity products.</li>
<li><strong>Solana</strong> — a single high-throughput chain rather than a modular stack. Strong in payments and consumer flows, growing institutional presence.</li>
<li><strong>Institutional/permissioned networks</strong> — Canton (privacy-preserving, strong in collateral and funds), SWIAT (bank-owned, digital securities), Partior (cross-border interbank settlement), Fnality (wholesale settlement in central-bank-backed money).</li>
<li><strong>Bank-internal ledgers</strong> — deposit-token systems run by single banks. Not really a "chain" in the network sense, but commercially significant.</li>
</ul>

<h4>How an issuer chooses</h4>
<ol>
<li><strong>Where are the buyers?</strong> Liquidity beats elegance every time.</li>
<li><strong>What confidentiality does the asset require?</strong> A syndicated loan and a money market fund have very different answers.</li>
<li><strong>What finality does the settlement leg need?</strong></li>
<li><strong>What does the custodian support?</strong> This is a harder constraint than most issuers expect.</li>
<li><strong>Can it reach other networks credibly?</strong> Issuance on an island is issuance into a smaller market.</li>
</ol>

<div class="callout">
<strong>Direction of travel:</strong> the winning pattern in 2026 is not one chain. It is one canonical issuance with credible, issuer-controlled distribution to several networks — which is exactly why burn-and-mint interoperability and standards work has become strategically important rather than merely technical.
</div>`,
        key: [
          "Ethereum mainnet holds value; L2s and Solana carry activity",
          "Canton, SWIAT, Partior and Fnality serve confidentiality and settlement use cases",
          "Issuers choose on liquidity, confidentiality, finality, custodian support and reach"
        ]
      }
    ]
  }
  ,
  /* ============================== MODULE 5 ============================== */
  {
    id: "m5",
    number: 5,
    title: "Stablecoins",
    tagline: "The only segment at genuine scale",
    icon: "◉",
    minutes: 55,
    summary: "At roughly $308bn outstanding and ~$400bn of annual real payment volume, stablecoins are the one part of this industry operating at institutional scale. 2026 is the year the regulation caught up.",
    outcomes: [
      "Explain the mint, redeem and reserve mechanics and where the economics come from",
      "Distinguish fiat-backed, crypto-collateralised and algorithmic designs and their failure modes",
      "Summarise the GENIUS Act, MiCA, Hong Kong and Singapore regimes and how they differ",
      "Assess the strategic position of a bank-issued, non-USD stablecoin"
    ],
    lessons: [
      {
        id: "m5l1",
        title: "Mechanics: mint, redeem, reserve",
        minutes: 9,
        body: `
<p>A fiat-backed stablecoin is a very old financial product wearing new plumbing: a narrow-bank liability, redeemable at par, backed by short-dated safe assets.</p>

<h4>The primary market</h4>
<p>Only approved participants deal directly with the issuer. A client wires $10m; the issuer invests it in reserves and mints $10m of tokens to the client's wallet. Redemption reverses it: tokens are returned and burned, dollars are wired out. Everyone else buys and sells in the <strong>secondary market</strong> on exchanges, at whatever price the market clears.</p>

<p>That two-tier structure is the whole stability mechanism. The peg holds because arbitrageurs with primary-market access buy below $1 and redeem at $1, and mint at $1 to sell above. <strong>If redemption is slow, restricted, or doubted, the arbitrage stops working and the peg is only a promise.</strong></p>

<h4>The reserve</h4>
<p>What backs the token determines almost everything about its risk. A conservative reserve is overwhelmingly short-dated Treasury bills and overnight reverse repo, with a small bank-deposit buffer for redemptions. Weaker reserves reach for commercial paper, corporate debt, secured loans or other crypto — all of which introduce credit and liquidity risk into something marketed as cash.</p>

<p>Post-2025 regulation attacks this directly. The GENIUS Act's framework requires reserves in a defined set of high-quality liquid assets; MiCA imposes reserve, segregation and redemption-at-par requirements; Hong Kong's Stablecoins Ordinance prioritises 1:1 high-quality reserve backing, local incorporation and robust redemption rights. The Basel amendments finalised in July 2024 tightened the conditions for stablecoins to qualify for preferential treatment, specifically on the quality and liquidity of reserve assets.</p>

<h4>The economics</h4>
<p>The issuer holds the reserve and earns the yield; the holder earns nothing. At a $300bn market and short-rate yields, that is a multi-billion-dollar annual float business. This creates two structural facts:</p>
<ul>
<li><strong>Stablecoin issuance is a rate-sensitive business.</strong> Revenue falls with policy rates.</li>
<li><strong>Distribution captures most of the economics.</strong> Issuers pay large shares of reserve income to the exchanges, wallets and platforms that put the coin in front of users. Whoever owns distribution has the pricing power — which is exactly why banks and telcos entering this market matter.</li>
</ul>`,
        key: [
          "Two-tier market: authorised participants mint/redeem at par, everyone else trades secondary",
          "The peg depends on credible, fast redemption — arbitrage is the mechanism",
          "The issuer earns reserve yield; the holder earns none. It is a float business",
          "Distribution partners capture much of the economics, which is why the issuer is not always the winner"
        ]
      },
      {
        id: "m5l2",
        title: "Design types and how they fail",
        minutes: 9,
        body: `
<h4>1. Fiat-backed (fully reserved)</h4>
<p>USDC, USDT, and the new licensed bank issues. Backed by cash and short-dated government paper. <strong>Failure mode:</strong> reserve quality or accessibility. USDC briefly traded to about $0.87 in March 2023 because $3.3bn of its reserve sat at Silicon Valley Bank and nobody knew if it would be recoverable. The reserve was real; access to it was in doubt for a weekend, and that was enough.</p>

<h4>2. Crypto-collateralised (over-collateralised)</h4>
<p>DAI and successors. Users lock volatile collateral worth more than the stablecoins minted — typically 130–200% — with automated liquidation if the ratio falls. <strong>Failure mode:</strong> collateral crash faster than liquidations can clear, plus oracle dependence. Capital-inefficient by construction, and in practice these designs have drifted toward holding substantial fiat-backed stablecoins and real-world assets as collateral, which reintroduces the very centralisation they were built to avoid.</p>

<h4>3. Algorithmic / undercollateralised</h4>
<p>No meaningful reserve; the peg is defended by a mint-and-burn relationship with a second, volatile token. <strong>Failure mode:</strong> a reflexive death spiral. TerraUSD's collapse in May 2022 destroyed roughly $40bn in days: as UST fell below the peg the mechanism minted LUNA to defend it, LUNA's price collapsed under the supply, which destroyed the collateral value defending the peg. It is a bank run where the assets are made of the bank's own shares.</p>

<p>Regulation in 2026 has effectively closed this category for regulated issuance. MiCA's requirements and the GENIUS framework both presuppose a reserve. Algorithmic designs survive only outside regulated perimeters.</p>

<h4>4. Yield-bearing "stablecoins"</h4>
<p>The important 2026 grey zone. Tokens that pass through reserve yield to holders look like stablecoins and function like money market funds — which usually makes them <em>securities</em>. The GENIUS Act restricts payment stablecoin issuers from paying interest, and MiCA's review is actively examining the stablecoin interest ban. Expect the boundary between "payment stablecoin" and "tokenised money market fund" to be one of the most contested lines into 2027.</p>

<div class="callout warn">
<strong>The diagnostic:</strong> a stablecoin that pays you yield is telling you the issuer has decided to compete on economics rather than on payment utility. Ask immediately what the instrument is legally, who regulates it, and what happens to your redemption right in stress.
</div>`,
        key: [
          "Fiat-backed fails on reserve access (USDC/SVB, March 2023, ~$0.87)",
          "Crypto-collateralised fails on collateral crashes and oracle dependence",
          "Algorithmic fails reflexively (Terra/UST, ~$40bn, May 2022) and is now largely closed by regulation",
          "Yield-bearing stablecoins blur into money market funds — a live regulatory boundary"
        ]
      },
      {
        id: "m5l3",
        title: "The GENIUS Act and the US framework",
        minutes: 9,
        body: `
<p>The <strong>GENIUS Act</strong> (Guiding and Establishing National Innovation for U.S. Stablecoins) was enacted in <strong>July 2025</strong> — the first comprehensive US federal framework for fiat-backed payment stablecoins. It ended years of ambiguity about whether a stablecoin was a security, a commodity, a deposit or none of the above.</p>

<h4>What it establishes</h4>
<ul>
<li>A defined category of <strong>payment stablecoin</strong> and a licensed issuer regime</li>
<li>Reserve requirements in high-quality liquid assets, with segregation and disclosure</li>
<li>Redemption rights at par</li>
<li>A <strong>dual federal/state path</strong>: an issuer with total market capitalisation of not more than <strong>$10bn</strong> may opt into a state regime, provided that regime is substantially similar to the federal framework. Above that threshold, federal supervision applies.</li>
<li>Restrictions on payment stablecoin issuers paying interest to holders</li>
</ul>

<h4>Where implementation actually stands</h4>
<p>This is the part most summaries get wrong. The statute instructed the prudential bank regulators and Treasury to write implementing rules. They missed the deadline.</p>
<ul>
<li>The OCC issued a proposed rule on <strong>25 February 2026</strong>. As of late July 2026 it remained a proposal.</li>
<li>Major implementing rules across the OCC, FDIC, Treasury, FinCEN and OFAC were <strong>all still pending finalisation</strong> as of July 2026.</li>
<li>Because regulators missed the <strong>18 July 2026</strong> rulemaking deadline, the statute's fallback trigger governs: the effective date is <strong>18 months after enactment — 18 January 2027</strong>.</li>
</ul>

<div class="callout warn">
<strong>The practical read:</strong> through the whole of 2026 the US has had a stablecoin <em>law</em> without finalised stablecoin <em>rules</em>. Firms have been building to a statute whose operational detail is still being written, against a hard effective date in January 2027. That gap — law in force, rules unwritten, deadline fixed — is the defining compliance condition of the year.
</div>`,
        key: [
          "GENIUS Act enacted July 2025 — first US federal payment stablecoin framework",
          "Issuers ≤$10bn market cap may opt into a substantially similar state regime",
          "Payment stablecoin issuers are restricted from paying interest",
          "Regulators missed the 18 July 2026 rulemaking deadline; effective date defaults to 18 January 2027"
        ]
      },
      {
        id: "m5l4",
        title: "MiCA, Hong Kong, Singapore and the UK",
        minutes: 10,
        body: `
<h4>European Union — MiCA</h4>
<p>MiCA reached <strong>full force on 1 July 2026</strong>, when the grandfathering period for national regimes expired. After that date, any entity providing crypto-asset services to EU clients without a MiCA licence is in breach of EU law and must stop. Roughly <strong>280 firms</strong> were authorised as the transition completed.</p>
<p>MiCA splits stablecoins into <strong>EMTs</strong> (e-money tokens, referencing a single currency) and <strong>ARTs</strong> (asset-referenced tokens, referencing a basket or other assets), with heavier requirements for significant issuers. The European Commission launched two parallel consultations on <strong>19 May 2026</strong> reviewing whether MiCA remains fit for purpose, with <strong>86 questions</strong> covering the stablecoin interest ban, staking, lending and DeFi, and a deadline of <strong>30 September 2026</strong> for responses.</p>

<h4>Hong Kong — the Stablecoins Ordinance</h4>
<p>The Ordinance took effect <strong>1 August 2025</strong>. Requirements centre on 1:1 high-quality reserve backing, local incorporation and robust redemption rights.</p>
<p>On <strong>10 April 2026</strong> the HKMA granted the first licences — <strong>two out of 36 applicants</strong>, an approval rate of about 5.6%. The two were <strong>HSBC</strong> and <strong>Anchorpoint Financial Limited</strong>, a joint venture led by Standard Chartered with HKT and Animoca Brands. Both indicated HKD-referenced stablecoin launches in the second half of 2026.</p>
<p>The signal in that number is the point: Hong Kong chose a deliberately narrow first cohort of highly regulated incumbents rather than an open licensing round.</p>

<h4>Singapore — MAS</h4>
<p>MAS published a standalone stablecoin framework in <strong>August 2023</strong> covering single-currency stablecoins pegged to SGD or G10 currencies, requiring full reserve backing, prompt redemption and AML compliance. Singapore's distinctive move is pairing this with wholesale infrastructure: MAS announced a <strong>2026 pilot for tokenised government bills settled with a wholesale CBDC</strong>, and continues to expand Project Guardian's scope.</p>

<h4>United Kingdom</h4>
<p>The FCA named supporting UK-issued stablecoins a <strong>priority for 2026</strong>, working jointly with the Bank of England. Four firms — <strong>Monee, ReStabilise, Revolut Group and VVTX</strong> — were selected for a stablecoin Regulatory Sandbox cohort beginning testing in <strong>Q1 2026</strong>, covering payments, wholesale settlement and crypto trading. Monee is simultaneously in the Bank of England's Digital Securities Sandbox, the only firm in both.</p>
<p>The full UK cryptoasset authorisation regime goes live in <strong>October 2027</strong>, with the application gateway opening in <strong>September 2026</strong>.</p>

<div class="callout">
<strong>The comparative point:</strong> four jurisdictions, four philosophies. The US legislated first and is still writing rules. The EU built a single comprehensive rulebook and is already reviewing it. Hong Kong licensed a tiny cohort of incumbents. The UK is sandboxing before authorising. Anyone building a multi-jurisdiction stablecoin business is managing four different clocks.
</div>`,
        key: [
          "MiCA fully in force 1 July 2026; ~280 firms authorised; review consultation closes 30 Sept 2026",
          "MiCA splits EMTs (single currency) from ARTs (basket/other assets)",
          "HKMA granted first 2 of 36 licences on 10 April 2026: HSBC and Anchorpoint (SC/HKT/Animoca)",
          "MAS: SCS framework since Aug 2023, plus a 2026 tokenised T-bill pilot settled in wholesale CBDC",
          "UK: FCA sandbox from Q1 2026, gateway opens Sept 2026, full regime live October 2027"
        ]
      },
      {
        id: "m5l5",
        title: "Payments: where stablecoins actually get used",
        minutes: 9,
        body: `
<p>Strip out trading collateral and the residual real-economy usage is substantial and growing fast.</p>

<ul>
<li>Real-world stablecoin payment volume reached roughly <strong>$400bn in 2025</strong>, of which about <strong>60% was B2B</strong></li>
<li>B2B stablecoin payments in emerging markets grew <strong>733% year on year</strong></li>
<li><strong>71% of LATAM firms</strong> reported using stablecoins for cross-border settlement</li>
<li>Asia accounts for roughly <strong>60% of stablecoin payment activity</strong>, concentrated in Singapore, Hong Kong and Japan</li>
<li>The addressable cross-border market is measured in the <strong>$16–24 trillion</strong> range depending on whether you count non-G20 or non-G10 flows</li>
</ul>

<h4>Why it works where it works</h4>
<p>The winning corridors are not US–EU. They are corridors where correspondent banking is thin, settlement takes days, FX spreads are wide and local currency access is hard. Adoption is being driven by <strong>ship brokers, steel traders, commodity firms and import/export businesses</strong> — not crypto-native companies. The buyer is a treasurer with a working capital problem, not a technologist.</p>

<h4>The honest limitations</h4>
<ul>
<li><strong>On and off ramps are the bottleneck.</strong> The chain leg is minutes; converting to and from local currency is where the cost, delay and compliance burden actually sit.</li>
<li><strong>Dollarisation concern.</strong> A ~99% USD-denominated instrument spreading through emerging markets is a monetary sovereignty issue, and central banks say so plainly.</li>
<li><strong>Compliance overhead is real.</strong> Travel Rule, sanctions screening and wallet analytics apply in full.</li>
<li><strong>Accounting and treasury policy lag.</strong> Many corporates still cannot classify a stablecoin balance cleanly, which blocks adoption regardless of the economics.</li>
</ul>

<div class="callout">
<strong>The bank's strategic question:</strong> stablecoin payments disintermediate correspondent banking in exactly the corridors where emerging-market franchises earn their margin. A bank with a strong footprint in those corridors has two choices — issue and distribute, or watch the flow migrate. This is the entire logic behind incumbent banks pursuing licensed issuance rather than resisting it.
</div>`,
        key: [
          "~$400bn real payment volume in 2025, ~60% B2B; EM B2B up 733% YoY",
          "71% of LATAM firms use stablecoins for cross-border settlement; Asia is ~60% of activity",
          "Adoption is driven by traditional traders and importers, not crypto-native firms",
          "On/off ramps, dollarisation concerns and accounting treatment are the real constraints"
        ]
      },
      {
        id: "m5l6",
        title: "The non-USD problem and bank-issued coins",
        minutes: 9,
        body: `
<p>About 99% of stablecoin supply references the US dollar. Every non-USD project is therefore fighting a network effect, not just a regulator.</p>

<h4>Why the dollar wins by default</h4>
<ul>
<li>Global trade is invoiced in dollars, so the demand is already there</li>
<li>Liquidity begets liquidity: the deepest markets, the tightest spreads, the most venues</li>
<li>The reserve asset — US Treasury bills — is the deepest, most liquid safe asset in existence</li>
<li>A user in a high-inflation economy wants dollars specifically, not "a stablecoin"</li>
</ul>

<h4>Why jurisdictions issue anyway</h4>
<ul>
<li><strong>Monetary sovereignty</strong> — a domestic digital payment instrument denominated in the domestic currency</li>
<li><strong>Domestic settlement</strong> — local securities, local payroll, local commerce need local currency on-chain</li>
<li><strong>Regulatory leverage</strong> — a licensed domestic issuer is supervisable in a way an offshore USD issuer is not</li>
<li><strong>Strategic positioning</strong> — being early in a currency that later matters</li>
</ul>

<h4>The bank-issuer thesis</h4>
<p>A licensed bank entering stablecoin issuance brings things a crypto-native issuer cannot: an existing balance sheet and reserve management capability, an established regulatory relationship, corporate and FI clients who already trust it with money, and existing payment corridors to plug into. What it typically lacks is distribution to end users and speed.</p>

<p>That combination explains the structure of the Hong Kong licensees. Anchorpoint Financial pairs a bank (Standard Chartered) with a telco (HKT, for distribution and reach) and a Web3 firm (Animoca, for ecosystem and technical presence). It is a deliberate assembly of the three things a stablecoin needs: reserve credibility, distribution, and native-ecosystem relevance.</p>

<div class="callout">
<strong>The test to apply to any non-USD stablecoin:</strong> what is the natural demand for this currency on-chain? If the answer is only "domestic policy wants it", adoption will be slow. If the answer is a real settlement use case — local securities settlement, a payroll corridor, a retail payment network with existing users — it has a chance.
</div>`,
        key: [
          "~99% USD dominance is a network effect, reinforced by the depth of the T-bill market",
          "Jurisdictions issue non-USD coins for sovereignty, domestic settlement and supervisability",
          "Banks bring reserves, regulation and corporate clients; they lack retail distribution and speed",
          "Anchorpoint's bank + telco + Web3 structure is a deliberate answer to that gap"
        ]
      }
    ]
  },

  /* ============================== MODULE 6 ============================== */
  {
    id: "m6",
    number: 6,
    title: "The tokenised money hierarchy",
    tagline: "Deposits, stablecoins, wholesale CBDC and settlement",
    icon: "▤",
    minutes: 45,
    summary: "Money has always been layered: central bank money at the base, commercial bank money above it, private instruments above that. Tokenisation does not flatten the hierarchy — it reproduces it, and the projects that matter are the ones building each layer.",
    outcomes: [
      "Rank tokenised money forms by the quality of the underlying claim",
      "Explain why banks prefer tokenised deposits to stablecoins",
      "Describe Project Agorá, Ensemble and Guardian and what each proved",
      "Explain atomic settlement, DvP and PvP and the risk each removes"
    ],
    lessons: [
      {
        id: "m6l1",
        title: "The hierarchy of money, tokenised",
        minutes: 9,
        body: `
<p>Not all money is the same money. The layering is unchanged by tokenisation; only the plumbing is new.</p>

<table class="data">
<thead><tr><th>Layer</th><th>Claim on</th><th>Credit risk</th><th>Tokenised form</th></tr></thead>
<tbody>
<tr><td>Central bank money</td><td>The central bank</td><td>None (risk-free by definition)</td><td>Wholesale CBDC</td></tr>
<tr><td>Commercial bank money</td><td>A licensed bank</td><td>Bank credit risk, mitigated by deposit protection and supervision</td><td>Tokenised deposit</td></tr>
<tr><td>Regulated e-money</td><td>A licensed issuer with segregated reserves</td><td>Issuer and reserve risk</td><td>Licensed stablecoin (EMT)</td></tr>
<tr><td>Private money</td><td>An unregulated issuer</td><td>Full issuer and reserve risk</td><td>Offshore stablecoin</td></tr>
</tbody>
</table>

<p>The <strong>singleness of money</strong> — the principle that a dollar is a dollar regardless of which bank holds it — is maintained by central bank settlement and the supervisory framework around it. Every dollar in the system is interchangeable at par because they all settle at the central bank.</p>

<p>This is the central bankers' objection to a stablecoin-dominated future: a world of many private dollar tokens, each with different reserves, different redemption terms and different issuers, is a world where a dollar is not always a dollar. Historically that is not a hypothetical — it is the US free banking era, where notes from different banks traded at different discounts.</p>

<div class="callout">
<figure class="figure"><svg viewBox="0 0 720 250" role="img" aria-label="The hierarchy of money from central bank money down to unregulated private money, with tokenised equivalents"><text x="205" y="26" text-anchor="middle" font-size="12" class="t-strong">Claim on</text><text x="545" y="26" text-anchor="middle" font-size="12" class="t-strong">Tokenised form</text><rect x="40" y="38" width="330" height="44" rx="8" fill="color-mix(in srgb, var(--good) 14%, transparent)" stroke="var(--good)" stroke-width="1.5"/><text x="205.0" y="56.0" text-anchor="middle" font-size="13" class="t-strong">Central bank</text><text x="205.0" y="73.0" text-anchor="middle" font-size="11" class="t-mute">no credit risk by definition</text><rect x="400" y="38" width="290" height="44" rx="8" fill="color-mix(in srgb, var(--good) 14%, transparent)" stroke="var(--good)" stroke-width="1.5"/><text x="545.0" y="64.0" text-anchor="middle" font-size="13" class="t-strong">Wholesale CBDC</text><rect x="60" y="90" width="310" height="44" rx="8" fill="var(--bg2)" stroke="var(--line2)" stroke-width="1.5"/><text x="215.0" y="108.0" text-anchor="middle" font-size="13" class="t-strong">A licensed bank</text><text x="215.0" y="125.0" text-anchor="middle" font-size="11" class="t-mute">deposit protection, supervision</text><rect x="400" y="90" width="290" height="44" rx="8" fill="var(--bg2)" stroke="var(--line2)" stroke-width="1.5"/><text x="545.0" y="116.0" text-anchor="middle" font-size="13" class="t-strong">Tokenised deposit</text><rect x="80" y="142" width="290" height="44" rx="8" fill="var(--bg2)" stroke="var(--line2)" stroke-width="1.5"/><text x="225.0" y="160.0" text-anchor="middle" font-size="13" class="t-strong">A licensed e-money issuer</text><text x="225.0" y="177.0" text-anchor="middle" font-size="11" class="t-mute">segregated reserves</text><rect x="400" y="142" width="290" height="44" rx="8" fill="var(--bg2)" stroke="var(--line2)" stroke-width="1.5"/><text x="545.0" y="168.0" text-anchor="middle" font-size="13" class="t-strong">Licensed stablecoin &#183; EMT</text><rect x="100" y="194" width="270" height="44" rx="8" fill="color-mix(in srgb, var(--bad) 9%, transparent)" stroke="var(--bad)" stroke-width="1.5"/><text x="235.0" y="212.0" text-anchor="middle" font-size="13" class="t-strong">An unregulated issuer</text><text x="235.0" y="229.0" text-anchor="middle" font-size="11" class="t-mute">issuer and reserve risk</text><rect x="400" y="194" width="290" height="44" rx="8" fill="color-mix(in srgb, var(--bad) 9%, transparent)" stroke="var(--bad)" stroke-width="1.5"/><text x="545.0" y="220.0" text-anchor="middle" font-size="13" class="t-strong">Offshore stablecoin</text><line x1="24" y1="42" x2="24" y2="234" stroke="var(--line2)" stroke-width="2"/><text x="16" y="52" text-anchor="end" font-size="10.5" class="t-mute"></text></svg><figcaption>The indent is the point: each layer down is a claim on a weaker party. Tokenisation reproduces the hierarchy rather than flattening it &#8212; which is why <b>wholesale CBDC sits underneath tokenised deposits</b> in every serious architecture, rather than competing with them.</figcaption></figure>
<strong>The architecture that resolves it</strong> — articulated most clearly in Hong Kong's EnsembleTX framework and the UK's Regulated Liability Network — puts <strong>wholesale CBDC as the central bank settlement layer, with tokenised deposits as the commercial banking layer above it</strong>. Private tokens interoperate but settle down into central bank money. The hierarchy is preserved deliberately.
</div>`,
        key: [
          "The money hierarchy survives tokenisation: central bank → commercial bank → e-money → private",
          "Singleness of money depends on central bank settlement, and stablecoin proliferation strains it",
          "EnsembleTX and the RLN both put wholesale CBDC at the base with tokenised deposits above"
        ]
      },
      {
        id: "m6l2",
        title: "Tokenised deposits versus stablecoins",
        minutes: 9,
        body: `
<p>The distinction banks care about most, and the one most commentary blurs.</p>

<table class="data">
<thead><tr><th></th><th>Tokenised deposit</th><th>Stablecoin</th></tr></thead>
<tbody>
<tr><td>Legal nature</td><td>A bank deposit</td><td>An issuer liability backed by reserves</td></tr>
<tr><td>On balance sheet?</td><td>Yes — it is the bank's balance sheet</td><td>No — reserves are segregated</td></tr>
<tr><td>Deposit protection</td><td>Yes, within limits</td><td>No</td></tr>
<tr><td>Interest</td><td>Can pay interest</td><td>Restricted for payment stablecoins under GENIUS</td></tr>
<tr><td>Transferability</td><td>Usually within a closed network of known participants</td><td>Bearer, potentially to anyone</td></tr>
<tr><td>Credit intermediation</td><td>Funds lending, as deposits always have</td><td>Sits in reserves; does not fund lending</td></tr>
<tr><td>KYC</td><td>Every holder is a bank customer</td><td>Holders may be unknown to the issuer</td></tr>
</tbody>
</table>

<h4>Why banks prefer deposits</h4>
<p>A tokenised deposit changes the ledger technology without changing the legal or economic structure. The deposit still funds lending, still counts for liquidity purposes, still carries deposit insurance, and every holder is already a KYC'd customer. Regulators find it far easier to approve.</p>

<p>The systemic worry runs the other way: if deposits migrate into stablecoins, funds move from banks — where they fund credit — into reserve accounts and Treasury bills, where they do not. Large-scale deposit substitution would tighten credit supply. That is not a hypothetical objection banks invented; it is a mainstream financial-stability concern.</p>

<h4>Why stablecoins keep winning anyway</h4>
<p>Tokenised deposits are usually restricted to a bank's own clients or a closed consortium. Stablecoins are bearer instruments that anyone can hold, on public networks, with deep liquidity, 24/7, across borders. Reach beats safety in adoption terms — which is exactly the tension the wholesale settlement projects are trying to resolve.</p>

<div class="callout">
<strong>The likely endpoint:</strong> not one winning. Tokenised deposits for intra-bank and closed institutional flows, licensed stablecoins for open cross-border and consumer-facing use, both settling into central bank money at the base layer. This is what the architecture in the next lesson is actually building.
</div>`,
        key: [
          "Tokenised deposits keep the legal and economic structure; stablecoins replace it",
          "Deposits stay on balance sheet, fund lending, carry protection, and hold every holder as a customer",
          "Large-scale deposit substitution into stablecoins is a genuine credit-supply concern",
          "Stablecoins win on reach: bearer, public, 24/7, cross-border"
        ]
      },
      {
        id: "m6l3",
        title: "Project Agorá, Ensemble and Guardian",
        minutes: 10,
        body: `
<p>Three public-sector programmes carry most of the institutional weight. They are worth knowing by name and by what each actually demonstrated.</p>

<h4>Project Agorá — BIS, seven central banks, ~40 private firms</h4>
<p>The most ambitious. It tests tokenised commercial bank deposits and tokenised central bank reserves on a unified programmable platform for <strong>wholesale cross-border payments</strong>.</p>
<p>Findings published in <strong>May 2026</strong>: the prototype demonstrated that tokenisation and programmability can address long-standing inefficiencies in wholesale cross-border payments <em>at scale</em>, while preserving the safety and integrity of settlement in central bank reserves. It showed <strong>atomic settlement of wholesale cross-border transactions using tokenised central bank reserves and tokenised commercial bank deposits, with finality, across currencies and jurisdictions</strong>.</p>
<p>The next step announced on <strong>27 May 2026</strong> is <strong>real-value testing</strong> — actual transactions in certain currencies with certain participants, not simulation. The <strong>Bank of Canada joined</strong> in May 2026.</p>
<p>Why it matters: correspondent banking is slow and expensive because of sequential messaging, compliance checks repeated at each hop, and settlement across many uncoordinated ledgers. Agorá's claim is that a shared programmable platform removes the sequencing problem without removing central bank money from the base of the system.</p>

<h4>Project Ensemble — HKMA</h4>
<p>A regulatory sandbox for tokenised deposits and wholesale CBDC in Hong Kong, extending into the <strong>EnsembleTX</strong> framework — the clearest published articulation of the layered architecture: wholesale CBDC as the central bank settlement layer, tokenised deposits as the commercial banking layer above it. Use cases have concentrated on tokenised asset settlement, trade finance and supply-chain financing.</p>

<h4>Project Guardian — MAS</h4>
<p>A cross-border collaborative sandbox testing asset tokenisation across <strong>fixed income, foreign exchange and asset management</strong>. Its distinguishing feature is industry-led pilots with real institutions rather than central-bank-only prototypes, and MAS has continued expanding its scope. Alongside it, MAS announced a <strong>2026 pilot for tokenised government bills settled using wholesale CBDC</strong>, and the Global Layer One initiative addressing shared infrastructure and standards.</p>

<div class="callout">
<strong>What all three have in common:</strong> none of them are trying to replace central bank money. All are trying to make central bank money programmable and available where tokenised assets settle. That is the single most important structural fact about institutional digital assets in 2026 — and it is why "crypto replaces banks" was always the wrong frame.
</div>`,
        key: [
          "Agorá (BIS): tokenised reserves + deposits for wholesale cross-border; May 2026 findings, now moving to real-value testing; Bank of Canada joined",
          "Ensemble (HKMA): wholesale CBDC and tokenised deposit sandbox; EnsembleTX defines the layered architecture",
          "Guardian (MAS): industry-led pilots in fixed income, FX and asset management; 2026 tokenised T-bill pilot with wholesale CBDC",
          "All three preserve central bank money at the base rather than replacing it"
        ]
      },
      {
        id: "m6l4",
        title: "Atomic settlement, DvP and PvP",
        minutes: 9,
        body: `
<p>This is the mechanism that makes the whole tokenisation argument work, and the one that survives every hype cycle.</p>

<h4>The problem</h4>
<p>In conventional settlement, the cash leg and the asset leg travel through different systems on different timelines. Between the two, someone is exposed. That gap is <strong>principal risk</strong> — the risk you deliver and never get paid. Herstatt Bank's failure in 1974, mid-settlement across time zones, is the canonical example and the reason CLS exists for FX.</p>
<p>The industry's answers so far have been elaborate and expensive: central counterparties, settlement banks, CLS, margin, and a T+1 or T+2 cycle that exists largely so the plumbing can keep up.</p>

<h4>Atomicity</h4>
<figure class="figure"><svg viewBox="0 0 720 250" role="img" aria-label="Sequential settlement leaves an exposure window; atomic settlement removes it"><text x="20" y="26" font-size="12.5" class="t-strong">Settled separately</text><line x1="40" y1="70" x2="680" y2="70" stroke="var(--line2)" stroke-width="2"/><circle cx="160" cy="70" r="7" fill="var(--bg2)" stroke="var(--ink2)" stroke-width="2"/><circle cx="520" cy="70" r="7" fill="var(--bg2)" stroke="var(--ink2)" stroke-width="2"/><text x="160" y="54" text-anchor="middle" font-size="11">asset delivered</text><text x="520" y="54" text-anchor="middle" font-size="11">cash arrives</text><rect x="160" y="82" width="360" height="30" rx="6" fill="color-mix(in srgb, var(--bad) 16%, transparent)" stroke="var(--bad)" stroke-width="1.5"/><text x="340" y="102" text-anchor="middle" font-size="12" class="t-strong">principal risk &#8212; you have delivered and not been paid</text><text x="40" y="134" font-size="11" class="t-mute">Herstatt, 1974. Everything from CLS to CCPs to T+1 exists to shrink this box.</text><line x1="20" y1="152" x2="700" y2="152" stroke="var(--line)" stroke-width="1"/><text x="20" y="180" font-size="12.5" class="t-strong">Settled atomically</text><line x1="40" y1="216" x2="680" y2="216" stroke="var(--line2)" stroke-width="2"/><circle cx="340" cy="216" r="8" fill="var(--good)"/><text x="340" y="200" text-anchor="middle" font-size="11">both legs, or neither</text><text x="500" y="240" font-size="11" class="t-mute">no window &#8212; but both sides must be funded at that instant</text></svg><figcaption>Atomic settlement does not remove risk so much as <b>relocate it</b>: principal risk becomes intraday liquidity risk. A good trade for most institutions, but a trade &#8212; and it is the treasury team that feels it.</figcaption></figure>
<p>If both legs are tokenised on a shared ledger, a single transaction can transfer both simultaneously, and either both succeed or neither does. No window, no exposure, no CCP needed for that particular risk.</p>
<ul>
<li><strong>DvP</strong> — delivery versus payment: security against cash. The core of securities settlement.</li>
<li><strong>PvP</strong> — payment versus payment: currency against currency. The core of FX settlement.</li>
<li><strong>Atomic swap</strong> — the general case, extending to conditional and multi-leg transactions</li>
</ul>

<h4>What it actually saves</h4>
<ul>
<li>Principal risk eliminated on the settled leg</li>
<li>Collateral and margin held against settlement exposure freed up</li>
<li>Intraday liquidity buffers reduced — a large, unglamorous, very real cost</li>
<li>Failed trades, reconciliation and break investigation reduced</li>
</ul>

<h4>The catch</h4>
<p><strong>Atomic settlement requires both legs on the same ledger, at the same moment.</strong> That is the whole difficulty. It is easy inside one system and hard across institutions, currencies and jurisdictions — which is precisely why Agorá, Ensemble and Fnality exist. It also demands that both parties hold tokenised cash <em>at that instant</em>, which shifts the problem from settlement risk to <strong>intraday liquidity management</strong>. Firms that netted at end of day now need funded positions in real time.</p>

<div class="callout warn">
<strong>The unsexy truth:</strong> atomic settlement does not remove risk, it relocates it — from credit risk to liquidity risk. That is a good trade for most institutions, but it is a trade, and treasury teams are the ones who feel it.
</div>`,
        key: [
          "Principal risk arises when the cash and asset legs settle separately (Herstatt, 1974)",
          "Atomic settlement makes both legs succeed or fail together: DvP for securities, PvP for FX",
          "Savings come from freed collateral, lower intraday liquidity buffers and fewer breaks",
          "It converts credit risk into intraday liquidity risk — a trade, not a free lunch"
        ]
      },
      {
        id: "m6l5",
        title: "Who is building the rails",
        minutes: 8,
        body: `
<p>A map of the operating infrastructure, as distinct from the pilots.</p>

<ul>
<li><strong>Partior</strong> — interbank cross-border clearing and settlement on a shared ledger, founded by JPMorgan, DBS and Temasek, with Standard Chartered among the participants. Live commercial flows rather than a sandbox.</li>
<li><strong>Fnality</strong> — wholesale settlement in central-bank-backed money, structured through omnibus accounts at central banks. Bank-owned. Aimed squarely at intraday liquidity and settlement finality.</li>
<li><strong>SWIAT</strong> — a bank-owned permissioned network for digital securities, originating from the German banking sector.</li>
<li><strong>Canton Network</strong> — privacy-preserving infrastructure with significant traction in collateral mobility and tokenised funds.</li>
<li><strong>JPMorgan deposit tokens / DBS Token Services</strong> — single-bank tokenised deposit systems now in production for corporate clients.</li>
<li><strong>Libeara</strong> — tokenisation platform incubated in SC Ventures, holding a MAS Capital Markets Services licence since <strong>March 2026</strong>, with more than $1bn on-chain.</li>
<li><strong>Zodia Custody / Zodia Solutions</strong> — institutional custody and infrastructure. Zodia Custody is majority-owned by Standard Chartered with SBI and Northern Trust as minority investors, FCA-registered in the UK and CSSF-authorised in Luxembourg — a practical route to a MiCA-compatible custody arrangement for EU funds. The custody business was folded into the bank's Financing &amp; Securities Services in <strong>May 2026</strong>, with Zodia Solutions carved out as the infrastructure business.</li>
</ul>

<h4>How to read the landscape</h4>
<p>Three distinct plays are running at once:</p>
<ol>
<li><strong>Consortium settlement networks</strong> (Partior, Fnality, SWIAT) — shared infrastructure, bank-owned, solving interbank problems. Slow to build, hard to displace once live.</li>
<li><strong>Single-institution platforms</strong> (JPM, DBS) — faster, fully controlled, limited to that bank's client base.</li>
<li><strong>Public-chain-native issuance</strong> (Securitize, Ondo, Libeara) — maximum reach, permissioning at the token level, dependent on public infrastructure.</li>
</ol>
<p>None has won. The realistic 2026 view is that all three persist, and the strategic question for any institution is which layers it owns and which it rents.</p>`,
        key: [
          "Partior and Fnality are live interbank settlement rails, not pilots",
          "Single-bank deposit token platforms (JPM, DBS) trade reach for speed and control",
          "Libeara holds a MAS CMS licence (March 2026) with >$1bn on-chain",
          "Zodia Custody is FCA-registered and CSSF-authorised — a MiCA-compatible custody route"
        ]
      }
    ]
  }
  ,
  /* ============================== MODULE 7 ============================== */
  {
    id: "m7",
    number: 7,
    title: "Tokenising assets",
    tagline: "What works, what does not, and why",
    icon: "▦",
    minutes: 50,
    summary: "Tokenised RWAs reached roughly $29–34bn by 2026, but the growth is concentrated in two categories. Understanding why those two work — and why real estate keeps failing — is the most transferable judgment in this field.",
    outcomes: [
      "Explain the tokenisation stack from legal wrapper to secondary trading",
      "Say why Treasuries and private credit succeeded where other classes stalled",
      "Name the major issuance platforms and what differentiates them",
      "Diagnose a tokenisation proposal in five questions"
    ],
    lessons: [
      {
        id: "m7l1",
        title: "The tokenisation stack",
        minutes: 9,
        body: `
<p>Tokenising an asset is a legal exercise with a technical component, in that order. Six layers, and the token is only one of them.</p>

<h4>1. The asset and its legal wrapper</h4>
<p>Something must exist and someone must own it. Usually a special purpose vehicle or a fund holds the underlying, and the token represents an interest in that vehicle. The wrapper determines investor rights, jurisdiction, tax treatment and what happens in insolvency. Get this wrong and nothing above it matters.</p>

<h4>2. Custody of the underlying</h4>
<p>Who holds the actual Treasury bills, the loan documents, the gold? A tokenised gold product needs a vault, an auditor and an insurer. The token is a claim on that arrangement, not on metal.</p>

<h4>3. The register and the transfer agent</h4>
<p>Someone must be legally responsible for the ownership record — issuing, redeeming, handling corporate actions, executing court orders. In the US this is a registered transfer agent. Securitize's expanded FINRA permissions explicitly cover custody of tokenised securities and atomic on-chain delivery-versus-payment with stablecoins, which is what makes it more than a technology vendor.</p>

<h4>4. The token contract</h4>
<p>Standard, permissioning logic, identity registry, freeze and force-transfer powers, upgrade path. Usually ERC-20 with restrictions, or ERC-3643 where eligibility must be enforced on transfer.</p>

<h4>5. Distribution</h4>
<p>How do investors find and buy it? Direct from the issuer, through a broker, on a regulated venue, or via a DeFi protocol accepting it as collateral. <strong>This is where most tokenisation projects die.</strong> A beautifully engineered token with no distribution is a private placement with extra steps.</p>

<h4>6. Secondary liquidity and servicing</h4>
<p>Can holders exit before maturity? Who makes markets? How are coupons, redemptions and corporate actions handled? Programmability helps here, but liquidity is a market-structure problem, not a code problem.</p>

<div class="callout warn">
<strong>The recurring failure:</strong> teams optimise layer 4 (the token) because it is the fun part, and under-invest in layers 1, 5 and 6 — legal wrapper, distribution and liquidity — which are the ones that determine whether the product exists in any meaningful sense.
</div>`,
        key: [
          "Six layers: legal wrapper, custody, register/transfer agent, token contract, distribution, secondary liquidity",
          "The legal wrapper determines rights, tax and insolvency treatment — everything else sits on it",
          "Distribution and liquidity, not the token, are where most projects fail"
        ]
      },
      {
        id: "m7l2",
        title: "Tokenised Treasuries and money market funds",
        minutes: 9,
        body: `
<p>The largest and cleanest category: roughly <strong>$15–16bn</strong> by mid-2026, across around 100 assets, with 16 products holding more than $100m each.</p>

<h4>Why it works</h4>
<ul>
<li><strong>The underlying is simple.</strong> A T-bill has no covenants, no idiosyncratic risk and a well-understood price. Valuation is not a negotiation.</li>
<li><strong>It yields something.</strong> After 2022, holding idle stablecoins meant forgoing meaningful yield. A tokenised T-bill fund is stablecoin-like but earns the short rate.</li>
<li><strong>It is instantly useful as collateral.</strong> This is the real driver. High-quality, yield-bearing, transferable collateral that moves in seconds solves a genuine problem for trading firms and treasuries.</li>
<li><strong>The buyer already existed.</strong> Crypto-native institutions holding large stablecoin balances were the natural first market, and they had no onboarding problem.</li>
</ul>

<h4>The main products</h4>
<ul>
<li><strong>BlackRock BUIDL</strong> — the flagship; establishing that the largest asset manager in the world would issue on public infrastructure changed institutional conversations more than the AUM did</li>
<li><strong>Franklin Templeton BENJI</strong> — earlier to market, with its own transfer-agent infrastructure and a strong regulatory posture</li>
<li><strong>Ondo</strong> — crypto-native distribution, packaging Treasury exposure for on-chain users</li>
<li><strong>Superstate</strong> — targeting institutional allocators with registered structures</li>
<li><strong>Libeara</strong> — SC Ventures' platform, MAS CMS licensed from March 2026, over $1bn on-chain</li>
</ul>

<h4>The limitation</h4>
<p>Most of this is a better wrapper around an existing product for an existing buyer. The tokenised T-bill fund is genuinely useful, but it has largely reallocated crypto-native balances rather than bringing new capital into Treasuries. Growth beyond that requires traditional allocators to accept on-chain records — which is a custody, accounting and mandate question, not a technology one.</p>`,
        key: [
          "Tokenised Treasuries ~$15–16bn, the largest RWA category, ~100 assets",
          "Works because the underlying is simple, yields, and is immediately useful as collateral",
          "BUIDL, BENJI, Ondo, Superstate, Libeara are the reference products",
          "Growth so far is largely reallocation of crypto-native balances, not new capital"
        ]
      },
      {
        id: "m7l3",
        title: "Private credit — the operational case",
        minutes: 9,
        body: `
<p>Roughly <strong>$8bn</strong> tokenised by 2026, and the category with the most interesting institutional logic. It is not a yield story; it is an operations story.</p>

<h4>What is broken in private credit</h4>
<ul>
<li><strong>Manual servicing.</strong> Payment waterfalls, amortisation schedules and covenant tests run on spreadsheets and email. Errors are common and expensive.</li>
<li><strong>Opaque valuation.</strong> Marks are infrequent, model-driven and hard for an LP to verify.</li>
<li><strong>No secondary market.</strong> Positions are effectively locked for the fund's life, so investors demand an illiquidity premium and smaller allocations.</li>
<li><strong>Slow, expensive reporting.</strong> Every LP query is a data-assembly project.</li>
</ul>

<h4>What tokenisation does to each</h4>
<p>Tokenisation addresses all four directly, which is why the migration is described as structural rather than speculative. Servicing becomes programmatic — the waterfall executes rather than being calculated. Position and performance data are visible to permitted parties continuously rather than quarterly. A transferable token creates the possibility of a secondary market where none existed. Reporting is a query against a shared record.</p>

<h4>The honest caveats</h4>
<ul>
<li><strong>The underlying is still illiquid.</strong> A tradeable token on an untradeable loan portfolio does not create liquidity by itself; it creates the <em>possibility</em> of liquidity if buyers appear.</li>
<li><strong>Valuation still comes from off-chain.</strong> An oracle publishing a NAV is only as good as the administrator producing it. Tokenisation does not solve the hard part of private credit valuation.</li>
<li><strong>Credit risk is unchanged.</strong> The borrowers are the same borrowers. Some early tokenised credit pools had real defaults, and the ledger recorded them faithfully.</li>
</ul>

<div class="callout">
<strong>The transferable lesson:</strong> tokenisation adds most value where the <em>operational</em> burden is highest, not where the asset is most exciting. Rank candidate asset classes by servicing cost and reconciliation pain, not by market size, and the shortlist looks very different.
</div>`,
        key: [
          "~$8bn tokenised private credit; the case is operational, not speculative",
          "It attacks manual servicing, opaque valuation, no secondary market and slow reporting",
          "It does not make the underlying liquid, fix valuation, or reduce credit risk",
          "Rank tokenisation candidates by servicing pain, not by asset class size"
        ]
      },
      {
        id: "m7l4",
        title: "Tokenised equities — the 2026 story",
        minutes: 9,
        body: `
<p>The smallest major category at roughly <strong>$2.4bn</strong>, but the fastest-growing, and the one that moved from proof-of-concept to production infrastructure during 2026 following a very large expansion in 2025.</p>

<h4>The three structures, which are not equivalent</h4>
<ol>
<li><strong>Direct tokenised shares</strong> — the token <em>is</em> the share, with a transfer agent maintaining the register on-chain. Full shareholder rights. Legally hardest, only viable in jurisdictions that have legislated for it.</li>
<li><strong>Depositary receipt model</strong> — a custodian holds real shares; tokens represent a beneficial interest. Economic exposure and usually dividends; voting rights vary. The most common institutional structure.</li>
<li><strong>Synthetic exposure</strong> — a derivative referencing the share price with no underlying holding. Cheapest to build, and a credit exposure to the issuer rather than ownership of anything. Frequently marketed as if it were the first structure.</li>
</ol>

<h4>What changed in 2026</h4>
<ul>
<li>Infrastructure moved to institutional grade: <strong>Coinbase partnered with Chainlink on 24 August 2026</strong> to provide institutional market data behind its tokenised stocks, making Chainlink the official oracle infrastructure for tokenised stocks on Base</li>
<li><strong>Uniswap introduced Permissioned Pools</strong> (July 2026) for tokenised funds, equities and other regulated assets — allowing issuers to enforce investor eligibility on-chain while using public AMM infrastructure</li>
<li>Tokenised stocks began functioning as <strong>DeFi collateral</strong>, with fixed-rate lending markets accepting them — moving DeFi collateral beyond crypto for the first time at any scale</li>
<li>Tokenised assets overall reached a record <strong>$28.9bn</strong> in May 2026, with tokenised stocks up 20.4% in that month alone</li>
</ul>

<h4>Why the appeal, and why the resistance</h4>
<p>The appeal is 24/7 trading, fractional access, instant settlement, and global reach without a local brokerage relationship — genuinely valuable in markets with limited access to US equities. The resistance is that equities already have excellent, cheap, liquid market infrastructure in developed markets. The value proposition is strongest exactly where regulators are least equipped to supervise it, which is the central tension in the category.</p>

<div class="callout warn">
<strong>The question that separates the three structures:</strong> "if the issuer of this token fails, what do I own?" Direct share: the share. Depositary receipt: a claim on segregated custodied shares. Synthetic: an unsecured claim on a failed counterparty.
</div>`,
        key: [
          "~$2.4bn and fastest-growing; three structures — direct, depositary receipt, synthetic",
          "Coinbase/Chainlink (Aug 2026) put institutional oracle infrastructure behind tokenised stocks on Base",
          "Uniswap Permissioned Pools (July 2026) enable eligibility enforcement on public AMM infrastructure",
          "Tokenised stocks became DeFi collateral, extending collateral beyond crypto assets"
        ]
      },
      {
        id: "m7l5",
        title: "Why real estate keeps failing",
        minutes: 8,
        body: `
<p>Real estate is the perennial tokenisation pitch and the perennial disappointment. It is worth understanding precisely why, because the same reasoning applies to most proposals you will be shown.</p>

<h4>The pitch</h4>
<p>A $50m building is illiquid and inaccessible. Tokenise it into a million $50 tokens and you get fractional ownership, global investors and a liquid secondary market.</p>

<h4>Why it does not work</h4>
<ul>
<li><strong>The legal wrapper is the constraint, not the ledger.</strong> You cannot tokenise a building; you tokenise shares in an SPV that owns it. Those shares are securities in every relevant jurisdiction, with all the attached restrictions. The token changes nothing about who may hold them.</li>
<li><strong>Fractional ownership already exists.</strong> It is called a REIT, it is liquid, regulated and cheap. Tokenisation has to beat a good incumbent product, not a gap in the market.</li>
<li><strong>The valuation problem is unsolved.</strong> A building has no observable price between transactions. An oracle reporting a valuation is reporting a surveyor's opinion, quarterly.</li>
<li><strong>Governance is genuinely hard.</strong> Who decides on the roof repair, the tenant dispute, the sale? A thousand token holders cannot manage a property, so a manager is appointed — and you have reinvented a fund with a worse liquidity profile.</li>
<li><strong>Liquidity does not follow from tradability.</strong> Making something transferable does not create buyers. Most tokenised real estate has thin-to-nonexistent secondary trading.</li>
</ul>

<h4>The five-question diagnostic</h4>
<ol>
<li><strong>What named cost does the ledger remove?</strong> Reconciliation, settlement lag, manual servicing, collateral immobility — or nothing?</li>
<li><strong>Who is the buyer, and do they exist today?</strong></li>
<li><strong>What is the legal wrapper, and who may hold it?</strong></li>
<li><strong>Where does the price come from?</strong></li>
<li><strong>What does the incumbent product cost, and is this meaningfully better?</strong></li>
</ol>
<p>Treasuries and private credit answer all five. Real estate answers roughly one.</p>`,
        key: [
          "You tokenise an SPV's shares, not a building — securities law applies unchanged",
          "REITs already provide liquid fractional real estate ownership",
          "Valuation, governance and the absence of buyers all remain unsolved",
          "Diagnostic: named cost removed, existing buyer, legal wrapper, price source, incumbent comparison"
        ]
      },
      {
        id: "m7l6",
        title: "Commodities, carbon, trade and the long tail",
        minutes: 8,
        body: `
<p>Beyond the big three categories sits a long tail where the arguments are genuinely different.</p>

<h4>Gold and commodities</h4>
<p>The clearest of the tail. Tokenised gold works because the underlying is fungible, storable, well-priced and already held in vaults with established custody and audit practice. It is essentially a bearer version of an existing allocated-gold product. Useful, modest in size.</p>

<h4>Carbon credits</h4>
<p>Structurally well suited: the market's core problems are double counting, opaque registries and unverifiable retirement — all record-keeping failures a shared ledger addresses directly. The obstacle is not technology but the fragmentation and credibility of the underlying credits themselves. Tokenising a credit of questionable integrity produces a well-recorded questionable credit.</p>

<h4>Trade and supply chain</h4>
<p>Trade finance is the great unrealised case. Documents are paper, processes are sequential, fraud through duplicate financing of the same cargo is a chronic loss, and settlement takes days across many parties. Electronic transferable records legislation — the UK's Electronic Trade Documents Act being the landmark — removed the legal blocker that had stalled digital bills of lading for years.</p>
<p>What remains is a coordination problem: a bill of lading is only useful digitally if the carrier, the shipper, both banks, the insurer and the port authority all accept it. This is precisely the network-effect problem from Module 4, and it is why trade digitisation has been "two years away" for a decade.</p>

<h4>Funds and collateral mobility</h4>
<p>Quietly one of the most promising areas. Tokenised fund units usable as collateral without redemption solves a real problem: an investor posting margin currently sells the fund, moves cash, and buys back in. Making the unit itself postable removes a full cycle of friction. This is where privacy-preserving institutional networks have found genuine traction.</p>

<div class="callout">
<strong>Pattern across the tail:</strong> tokenisation succeeds where the binding constraint is <em>record-keeping</em> and fails where the binding constraint is <em>valuation, governance or demand</em>. Sort any proposal by that test before anything else.
</div>`,
        key: [
          "Gold works: fungible, storable, priced, already vaulted and audited",
          "Carbon is structurally suited but limited by the integrity of the underlying credits",
          "Trade finance is blocked by network coordination, not law — ETDA removed the legal barrier",
          "Collateral mobility for fund units is one of the strongest under-discussed use cases"
        ]
      }
    ]
  },

  /* ============================== MODULE 8 ============================== */
  {
    id: "m8",
    number: 8,
    title: "Market structure and institutional plumbing",
    tagline: "Custody, venues, ETFs, prime brokerage, staking",
    icon: "▥",
    minutes: 48,
    summary: "Where the institutional revenue actually is. Custody is the control point, ETFs were the access unlock, and the missing prime brokerage layer explains most of the market's remaining inefficiency.",
    outcomes: [
      "Compare custody models and explain MPC versus HSM in plain terms",
      "Explain why custody is the strategic control point for a bank",
      "Describe the ETF structure and what it changed",
      "Identify the gaps in crypto market structure that traditional markets solved decades ago"
    ],
    lessons: [
      {
        id: "m8l1",
        title: "Custody models",
        minutes: 9,
        body: `
<p>Custody is the foundational institutional service. Everything else — trading, lending, staking, tokenised issuance — depends on a credible answer to "where are the keys".</p>

<h4>Self-custody</h4>
<p>You hold the keys. Maximum control, maximum operational burden, and no recourse. Viable for a treasury with real security engineering. Usually unacceptable to a fiduciary managing client assets, because a fiduciary needs segregation, audit and insurance.</p>

<h4>Exchange custody</h4>
<p>Assets sit with the trading venue. Convenient, and a concentration of counterparty risk that 2022 demonstrated conclusively. "Not your keys, not your coins" was a slogan until FTX made it an insolvency lesson. Institutional practice since has moved decisively toward keeping assets away from venues, with off-exchange settlement arrangements to enable trading without depositing.</p>

<h4>Qualified / regulated custodian</h4>
<p>A licensed entity holds assets in segregated accounts under a regulatory regime, with audit, insurance and clear bankruptcy-remoteness. This is what fiduciaries require and is where banks compete. The key questions are always: which licence, whose balance sheet, segregated or omnibus, and what happens to my assets if the custodian fails.</p>

<h4>The 2026 provider landscape</h4>
<ul>
<li><strong>Anchorage Digital</strong> — holds the only OCC federal bank charter in crypto; custody, settlement, staking and fiat on one platform; serves BlackRock and PayPal</li>
<li><strong>Fireblocks</strong> — technically wallet infrastructure with custodial features rather than a chartered custodian; regulated workflows route through partner trust companies or NYDFS-licensed subsidiaries. Its defining asset is the Fireblocks Network, a closed graph of 2,000+ connected counterparties enabling direct settlement without rebroadcasting addresses.</li>
<li><strong>Zodia Custody</strong> — majority-owned by Standard Chartered with SBI and Northern Trust as minority investors; FCA-registered in the UK and authorised by Luxembourg's CSSF, making it one of the more straightforward routes to a MiCA-compatible custody arrangement for EU-domiciled funds</li>
<li><strong>BitGo, Copper, Komainu, Taurus, Coinbase Custody</strong> — the rest of the competitive set</li>
<li><strong>BNY Mellon, Fidelity, State Street</strong> — traditional custodians building out regulated digital-asset custody</li>
</ul>

<p>The market is estimated at around <strong>$953.5bn</strong> in 2026 by assets under custody, growing at a projected CAGR in the low twenties.</p>`,
        key: [
          "Self, exchange, and qualified custodian — fiduciaries need the third",
          "FTX made venue custody concentration an insolvency lesson, not a slogan",
          "Anchorage holds the only OCC federal charter; Fireblocks' moat is its 2,000+ counterparty network",
          "Zodia Custody's FCA + CSSF authorisations give EU funds a MiCA-compatible route"
        ]
      },
      {
        id: "m8l2",
        title: "MPC, HSMs and the mechanics of key security",
        minutes: 8,
        body: `
<p>Two technologies dominate institutional key protection, and they solve different problems.</p>

<h4>Hardware security modules (HSMs)</h4>
<p>Tamper-resistant hardware that generates and stores keys and performs signing internally. The key never exists in software. Mature, certified (FIPS 140-2/3), well understood by auditors and regulators. The weakness is that at signing time a single complete key exists inside one device — a single point of both failure and compromise, and a physical dependency for disaster recovery.</p>

<h4>Multi-party computation (MPC)</h4>
<p>The private key is never assembled anywhere. It is generated as shares distributed across several parties or devices, and signing is performed jointly through a protocol where no participant ever sees the whole key. There is no single moment or place where the complete key exists.</p>
<ul>
<li>Compromising one share yields nothing</li>
<li>Shares can be refreshed periodically without changing the address, so an attacker must compromise a threshold of shares within one refresh window</li>
<li>The signature appears on-chain as an ordinary signature, so it works on any chain, unlike on-chain multi-sig</li>
<li>Trade-off: newer cryptography, implementation-sensitive, harder to certify — the security depends on the protocol being right</li>
</ul>

<h4>On-chain multi-signature</h4>
<p>The chain itself enforces that M of N keys must sign. Transparent, auditable and simple to reason about. Limitations: not supported uniformly across chains, more expensive in gas, and the policy is publicly visible — which is itself a disclosure some institutions dislike.</p>

<h4>Warm, cold and the policy layer</h4>
<p>Most institutions run tiers: a small hot balance for operations, a warm tier with tighter controls, and cold storage — offline, geographically distributed, with multi-person ceremonies for access. But the technology tier is the easy part. <strong>The policy engine is what makes custody institutional</strong>: transaction limits, address allow-lists, time delays, dual authorisation, sanctions screening and travel-rule checks enforced <em>before</em> a signature is produced. As established in Module 2, once the signature exists it is too late.</p>`,
        key: [
          "HSMs are certified and mature but assemble a complete key at signing time",
          "MPC never assembles the key; shares can be refreshed, and it works chain-agnostically",
          "On-chain multi-sig is transparent but chain-specific, costlier and publicly visible",
          "The policy engine — limits, allow-lists, screening, dual approval — is what makes custody institutional"
        ]
      },
      {
        id: "m8l3",
        title: "Trading venues: CEX, DEX and the missing middle",
        minutes: 9,
        body: `
<h4>Centralised exchanges</h4>
<p>Order books, matching engines, custody of client assets, fiat rails. Familiar in shape but structurally unusual: a single entity is simultaneously exchange, broker, custodian and clearing house — a combination that would be prohibited in regulated equity markets and which is exactly what made FTX possible.</p>

<h4>Decentralised exchanges</h4>
<p>Trading through smart contracts with no custody of user funds. The dominant design is the <strong>automated market maker</strong>: liquidity providers deposit pairs of assets into a pool, and price is set by a formula against pool balances rather than by a matching engine.</p>
<ul>
<li>No counterparty risk from the venue; assets stay in user control until the trade</li>
<li>Anyone can list anything, which is both the feature and the problem</li>
<li>Liquidity providers face <strong>impermanent loss</strong> — divergent price movement between the pooled assets leaves them worse off than simply holding</li>
<li>Fully transparent order flow, which enables MEV extraction against large trades</li>
</ul>
<p>The 2026 institutional development is <strong>permissioned pools</strong> — Uniswap's framework for tokenised funds and equities, where issuers enforce investor eligibility on-chain while still using public AMM infrastructure. This is the clearest attempt yet to combine public liquidity infrastructure with regulated participation.</p>

<h4>The missing middle</h4>
<p>Traditional markets separate execution, clearing and custody into different entities for good reasons, with a central counterparty absorbing counterparty risk. Crypto markets largely lack this layer, which produces concrete inefficiency:</p>
<ul>
<li><strong>Fragmented liquidity</strong> across dozens of venues with no consolidated tape</li>
<li><strong>Pre-funding requirements</strong> — capital sits idle at each venue because there is no netting across them</li>
<li><strong>No cross-venue netting or portfolio margining</strong></li>
<li><strong>Counterparty risk at every venue</strong> rather than mutualised at a CCP</li>
</ul>
<p>Off-exchange settlement — where assets remain with a qualified custodian and are mirrored for trading — is the pragmatic workaround, and the fastest-growing institutional service. It is a partial answer to a structural gap that market-structure legislation is intended to close.</p>`,
        key: [
          "CEXs combine exchange, broker, custodian and clearer in one entity — structurally unusual",
          "AMMs remove venue custody risk but create impermanent loss and MEV exposure",
          "Permissioned pools (2026) combine public AMM infrastructure with enforced eligibility",
          "The missing clearing layer causes fragmentation, pre-funding and no cross-venue netting"
        ]
      },
      {
        id: "m8l4",
        title: "ETFs and the access unlock",
        minutes: 8,
        body: `
<p>Spot crypto ETFs were the single largest change to institutional access, because they let capital gain exposure without touching any of the operational problems above.</p>

<h4>The structure</h4>
<p>A conventional exchange-traded product holding the asset with a qualified custodian, with authorised participants creating and redeeming shares to keep the price near NAV. The investor holds a security in a normal brokerage account. No wallets, no keys, no counterparty questions, and — critically — <strong>no new mandate approval required</strong>, which is the actual unlock. A pension fund that cannot hold Bitcoin can very often hold an ETF.</p>

<h4>2026 flows</h4>
<ul>
<li>The week of <strong>17–21 August 2026</strong> was the strongest of the year: US spot Bitcoin and Ethereum ETFs took in <strong>$2.62bn</strong> combined. Bitcoin ETFs alone drew <strong>$1.92bn</strong>, a 2026 record; Ethereum ETFs took <strong>$697m</strong>, also a year-to-date high.</li>
<li>Mid-August flows of about <strong>$1.1bn</strong> ended a prolonged run of net outflows earlier in 2026 — flows had been negative for much of the year before reversing.</li>
<li><strong>BlackRock's IBIT</strong> accounted for roughly <strong>80%</strong> of Bitcoin ETF inflows — extreme concentration in a single product.</li>
<li>Bitcoin broke decisively above <strong>$65,000</strong> on the earlier August inflows, though ETF trading volumes remained subdued — near the second-lowest level since October 2024.</li>
</ul>

<h4>How to read that combination</h4>
<p>Strong inflows with weak trading volumes describes <em>allocation</em> rather than <em>speculation</em>: money arriving to sit, not to trade. That is a healthier structural signal than a volume-driven rally, and the concentration in IBIT tells you these are large allocators using the most liquid instrument rather than a broad retail bid.</p>

<div class="callout">
<strong>What ETFs did not do:</strong> they did not bring institutions on-chain. An ETF holder never touches a wallet, never uses a stablecoin, never participates in tokenised settlement. ETFs solved <em>exposure</em>. Everything in Modules 5–7 is about solving <em>usage</em>, and it is a completely separate problem with a completely separate timeline.
</div>`,
        key: [
          "ETFs unlocked access by removing operational and mandate barriers, not by improving the asset",
          "17–21 Aug 2026: $2.62bn combined inflows — BTC $1.92bn (2026 record), ETH $697m (YTD high)",
          "IBIT took ~80% of Bitcoin ETF inflows; BTC broke above $65,000 on subdued volumes",
          "Strong inflows with low volume signals allocation, not speculation — and ETFs bring nobody on-chain"
        ]
      },
      {
        id: "m8l5",
        title: "Staking, lending and yield",
        minutes: 8,
        body: `
<p>Once assets are held, the next question is always what they earn. Each source of yield has a different risk and a different regulatory question.</p>

<h4>Staking</h4>
<p>Bonding proof-of-stake tokens to secure a network in return for protocol rewards. The nearest thing to a native risk-free rate in this space, but with real complications:</p>
<ul>
<li><strong>Slashing</strong> — validator misbehaviour or downtime destroys capital. Who bears it: the client, the custodian, or an insurer?</li>
<li><strong>Unbonding queues</strong> — exiting is not instant, creating a liquidity mismatch if the product promises redemption on demand</li>
<li><strong>Securities characterisation</strong> — staking-as-a-service offered by an intermediary has been treated as a securities offering in some jurisdictions and is explicitly within the scope of the UK's regime work and MiCA's review</li>
<li><strong>Custody interaction</strong> — bonded assets are encumbered. Whether a custodian's segregation and lien arrangements survive bonding is a real legal question, not a theoretical one.</li>
</ul>

<h4>Liquid staking</h4>
<p>Stake and receive a transferable receipt token representing the staked position plus accrued rewards. Solves the liquidity mismatch and introduces smart-contract risk, provider concentration risk, and the possibility of the receipt trading below the underlying in stress.</p>

<h4>Lending</h4>
<p>Over-collateralised lending is the on-chain norm: borrow less than you post, with automated liquidation if the ratio breaches. It works without credit assessment precisely because it is over-collateralised — which also means it does not extend credit in any economically meaningful sense. Under-collateralised on-chain lending requires identity and enforceability, which is the frontier the permissioned tokenised-collateral markets are working on.</p>

<h4>The RWA collateral development</h4>
<p>2026's significant shift: tokenised Treasuries, funds and equities being accepted as collateral in on-chain lending markets. The stated logic is symmetrical — DeFi needs institutional adoption to grow, and institutions need high-quality collateral. Fixed-rate lending markets accepting tokenised stock collateral mark the point where DeFi collateral moved beyond crypto assets.</p>`,
        key: [
          "Staking yield brings slashing loss allocation, unbonding queues and securities questions",
          "Liquid staking solves the liquidity mismatch by adding contract and concentration risk",
          "Over-collateralised lending works without credit assessment — and extends no real credit",
          "RWA collateral in lending markets is 2026's structural shift beyond crypto-only collateral"
        ]
      }
    ]
  }
  ,
  /* ============================== MODULE 9 ============================== */
  {
    id: "m9",
    number: 9,
    title: "Risk, capital and compliance",
    tagline: "Basel SCO60, travel rule, sanctions, accounting, operational risk",
    icon: "⚖",
    minutes: 52,
    summary: "The part that determines whether anything actually gets built inside a regulated institution. Capital treatment sets the economics, compliance sets the operating model, and operational risk decides whether you survive.",
    outcomes: [
      "Apply the Basel SCO60 Group 1 / Group 2 classification and its consequences",
      "Explain the FATF Travel Rule and how it works for wallet transfers",
      "Describe sanctions and analytics obligations for on-chain activity",
      "Rank operational risks by realised loss rather than by intuition"
    ],
    lessons: [
      {
        id: "m9l1",
        title: "Basel SCO60 — the capital rules",
        minutes: 10,
        body: `
<p>The Basel Committee's crypto-asset standard, <strong>SCO60</strong>, took effect on <strong>1 January 2026</strong> after being deferred by a year in May 2024. It is the single most consequential document for a bank's digital-asset strategy, because it sets the price of holding anything.</p>

<h4>The classification</h4>
<p><strong>Group 1</strong> — tokenised traditional assets and qualifying stablecoins that meet a set of classification conditions. Treated broadly like their conventional equivalents. A tokenised bond that qualifies attracts roughly the capital of the bond.</p>
<ul>
<li><strong>Group 1a</strong> — tokenised traditional assets</li>
<li><strong>Group 1b</strong> — stablecoins meeting a redemption risk test and issuer requirements</li>
</ul>
<p><strong>Group 2</strong> — everything else, including unbacked crypto such as Bitcoin and Ether, and stablecoins that fail the tests.</p>
<ul>
<li><strong>Group 2a</strong> — meets hedging recognition criteria; a modified market risk treatment applies</li>
<li><strong>Group 2b</strong> — everything remaining, carrying a <strong>1250% risk weight</strong></li>
</ul>

<h4>What 1250% actually means</h4>
<p>A 1250% risk weight combined with an 8% minimum capital ratio produces capital equal to the full exposure: hold $100 of the asset, hold $100 of capital against it. The asset is treated as an immediate and total loss for capital purposes. On top of that sits an <strong>exposure limit</strong> capping aggregate Group 2 exposures as a share of Tier 1 capital.</p>
<p>The effect is deliberate and effective: proprietary bank holdings of unbacked crypto are economically pointless. Banks can facilitate, custody and intermediate — none of which is a balance-sheet exposure — but they will not hold.</p>

<h4>The July 2024 amendments</h4>
<p>The Committee finalised revisions on <strong>17 July 2024</strong>, tightening the conditions for stablecoins to receive preferential Group 1b treatment — specifically on the <strong>quality and liquidity of the reserve assets</strong> — and adding due diligence obligations plus a more granular disclosure template for crypto-asset exposures. A bank cannot simply accept an issuer's claim; it must diligence the reserve.</p>

<h4>The divergence problem</h4>
<p>Basel standards are not law until jurisdictions implement them, and a clear split has emerged between the EU and the US on prudential crypto rules, with each pursuing its own approach. That produces regulatory arbitrage: the same exposure carries different capital in different jurisdictions, and a global bank must run to the strictest applicable standard across its group.</p>

<div class="callout">
<strong>The one-line consequence:</strong> SCO60 is why banks build custody, tokenisation and settlement businesses rather than trading books. Group 1 activity is economically viable; Group 2 balance-sheet exposure is not. The rulebook, not risk appetite, shaped the industry's structure.
</div>`,
        key: [
          "SCO60 effective 1 January 2026 after a one-year deferral agreed in May 2024",
          "Group 1a tokenised traditional assets, 1b qualifying stablecoins; Group 2b carries a 1250% risk weight",
          "1250% at an 8% ratio means capital equal to the full exposure, plus a Tier 1-based exposure limit",
          "July 2024 amendments tightened stablecoin reserve quality tests and added due diligence and disclosure",
          "EU and US are diverging on implementation, creating arbitrage a global bank must manage"
        ]
      },
      {
        id: "m9l2",
        title: "The FATF Travel Rule",
        minutes: 9,
        body: `
<p>The Travel Rule extends a long-standing wire-transfer requirement to virtual assets: identifying information about the originator and beneficiary must travel with the transfer.</p>

<h4>The obligation</h4>
<p>A VASP — exchange, custodian, wallet provider — must collect, verify and transmit originator and beneficiary information when sending virtual assets to another VASP. Thresholds are <strong>$3,000 in the US and $1,000 in most other jurisdictions</strong>.</p>

<h4>Why it is harder than for wire transfers</h4>
<ul>
<li><strong>There is no messaging network.</strong> A blockchain transaction carries an address and an amount, and nothing else. The identifying data must travel over an entirely separate channel, and both parties must be using a compatible one.</li>
<li><strong>The counterparty may not be a VASP.</strong> Transfers to self-hosted wallets have no institution on the other side, so there is nobody to send the data to. Treatment of these varies significantly by jurisdiction.</li>
<li><strong>VASP discovery is unsolved.</strong> Given an address, working out which institution controls it — if any — is inference, not lookup.</li>
<li><strong>The sunrise problem.</strong> Jurisdictions implemented at different times, so a compliant VASP frequently transacts with one facing no equivalent obligation.</li>
</ul>

<h4>The 2025–26 direction</h4>
<p>In <strong>June 2025 FATF adopted revisions to Recommendation 16</strong>, introducing more consistent data requirements across payment types, with countries expected to complete implementation <strong>by the end of 2030</strong>. That is a long runway and tells you how hard the coordination problem is.</p>
<p>The practical compliance stack in 2026 combines licensing where required, KYC/KYB, wallet screening, transaction monitoring, sanctions controls, and reporting and record-keeping. The framing that matters: <em>it is no longer a question of whether obligations apply, but which set applies, where, and when</em>.</p>

<div class="callout warn">
<strong>The design implication:</strong> Travel Rule compliance has to be enforced in the policy engine before signing — the same architectural point as custody controls. A transfer that breaches it cannot be recalled once broadcast.
</div>`,
        key: [
          "Originator and beneficiary data must travel with transfers above $3,000 (US) / $1,000 (most others)",
          "Blockchains carry no identity field, so data moves over a separate, compatible channel",
          "Self-hosted wallets, VASP discovery and the sunrise problem remain unsolved",
          "FATF revised Recommendation 16 in June 2025; implementation expected by end-2030"
        ]
      },
      {
        id: "m9l3",
        title: "Sanctions, analytics and the limits of pseudonymity",
        minutes: 9,
        body: `
<p>Public blockchains are pseudonymous, not anonymous. Every transaction is permanently visible to everyone, which makes them in several respects <em>more</em> traceable than cash.</p>

<h4>Blockchain analytics</h4>
<p>Firms such as Chainalysis and Elliptic cluster addresses into entities using heuristics, attribute clusters to known services, score wallets for exposure to illicit activity, and trace flows across hops. These tools integrate with AML platforms and underpin most institutional screening. They are inference engines, and they are wrong sometimes — which matters when a false positive freezes a client.</p>

<h4>Sanctions screening</h4>
<p>Screening applies to addresses, not just names. OFAC and equivalent bodies designate specific wallet addresses, and dealing with them is prohibited. Two features make this genuinely hard:</p>
<ul>
<li><strong>You cannot refuse an incoming transfer.</strong> Anyone can send to your address without permission. Receiving tainted funds is not a choice, and institutions need a documented handling procedure for it.</li>
<li><strong>Sanctions can attach to code.</strong> The designation of the Tornado Cash mixer raised the question of what it means to sanction an autonomous smart contract nobody controls, and the litigation around it has left a set of unresolved questions about immutable software and sanctions law.</li>
</ul>
<p>Compliance with the Travel Rule is incomplete without sanctions screening; the absence of screening exposes institutions to enforcement action and reputational damage.</p>

<h4>Privacy technology and the coming tension</h4>
<p>Zero-knowledge cryptography allows a party to prove a statement without revealing the underlying data — proving eligibility without disclosing identity, or solvency without disclosing positions. This is the technology that could reconcile institutional confidentiality requirements with public infrastructure, and it is central to why institutions look at ZK rollups beyond their scaling properties.</p>
<p>It is also the technology that makes supervision hardest. The unresolved question for the second half of the decade is whether privacy-preserving compliance — proving a transaction is compliant without revealing who transacted — is acceptable to regulators. Nobody has answered it yet.</p>`,
        key: [
          "Public chains are pseudonymous and permanently visible — often more traceable than cash",
          "Analytics firms cluster and attribute addresses; the output is inference, with false positives",
          "You cannot refuse an incoming transfer, so tainted-funds handling must be a documented procedure",
          "Sanctioning immutable code (Tornado Cash) left unresolved legal questions",
          "ZK proofs could reconcile confidentiality with public rails — supervisory acceptance is unresolved"
        ]
      },
      {
        id: "m9l4",
        title: "Accounting, tax and audit",
        minutes: 8,
        body: `
<p>The unglamorous blockers. Many adoption decisions are made or killed here rather than in strategy discussions.</p>

<h4>Accounting</h4>
<p>Under US GAAP, crypto assets were historically treated as indefinite-lived intangibles: written down on any price fall, never written up until sale. Holders reported losses in falling markets and nothing in rising ones. The FASB's crypto assets standard replaced this with <strong>fair value measurement through net income</strong> for in-scope assets, which removed a significant deterrent to corporate holding — a rare instance of an accounting change directly enabling a market.</p>
<p>Under IFRS, treatment depends on facts and circumstances: inventory for a dealer, intangible assets otherwise, with financial-instrument treatment where the token carries a contractual claim. Tokenised securities generally follow the accounting for the underlying instrument, which is the point of tokenising them.</p>

<h4>Tax</h4>
<ul>
<li>Most jurisdictions treat disposals of crypto assets as taxable events, including crypto-to-crypto exchanges — which creates an onerous record-keeping burden for active portfolios</li>
<li>Staking rewards are generally income on receipt, at a valuation that may be hard to establish</li>
<li>Stablecoin payments can trigger gain or loss calculations on every transaction if the coin is treated as property rather than currency — a real friction for payment use cases</li>
<li>VAT/GST treatment of tokens and token services varies widely and is frequently unsettled</li>
</ul>

<h4>Audit and assurance</h4>
<p>Auditors must verify existence, ownership and valuation.</p>
<ul>
<li><strong>Existence</strong> is straightforward — the ledger is public</li>
<li><strong>Ownership</strong> requires proving control of keys without exposing them, typically via a signed message or a controlled test transaction</li>
<li><strong>Valuation</strong> requires defensible price sources for thinly traded assets</li>
<li><strong>Reserve attestation</strong> for stablecoin issuers is an agreed-upon-procedures engagement, which is weaker than a full audit and is exactly why reserve composition disclosure matters so much</li>
<li><strong>Proof of reserves</strong> published by exchanges typically demonstrates assets while saying nothing about liabilities. A proof of reserves without a proof of liabilities is not a solvency statement, and it has been marketed as one.</li>
</ul>`,
        key: [
          "FASB moved US GAAP to fair value through net income, removing a major corporate holding deterrent",
          "IFRS treatment is facts-dependent; tokenised securities generally follow the underlying",
          "Crypto-to-crypto disposals, staking income and stablecoin gain/loss create heavy record-keeping",
          "Reserve attestations are agreed-upon procedures, not audits; proof of reserves without liabilities is not solvency"
        ]
      },
      {
        id: "m9l5",
        title: "Operational risk, ranked by realised loss",
        minutes: 9,
        body: `
<p>Intuition ranks these badly. The historical loss record does not.</p>

<h4>1. Key and access-control compromise</h4>
<p>The largest category by value. Stolen keys, compromised signing infrastructure, insider access, and social engineering of the humans who approve transactions. Mitigations: MPC or HSM, tiered warm/cold architecture, hardware-enforced approvals, allow-lists, transaction limits and genuinely independent dual authorisation.</p>

<h4>2. Bridge exploits</h4>
<p>Cross-chain bridges have been the single most damaging category of protocol exploit, because they concentrate enormous locked value behind trust assumptions that are usually weaker than either chain's. Mitigation: avoid wrapped assets where an issuer-native burn-and-mint route exists.</p>

<h4>3. Smart-contract vulnerabilities</h4>
<p>Reentrancy, arithmetic errors, flawed access control, upgrade mistakes. Mitigations: multiple independent audits, formal verification for high-value logic, bug bounties, timelocks on upgrades, and staged value caps on new deployments. An audit is a point-in-time opinion, not a warranty — treat "audited" as necessary and nowhere near sufficient.</p>

<h4>4. Oracle manipulation</h4>
<p>Covered in Module 3. Frequently the root cause in incidents attributed loosely to "a DeFi hack".</p>

<h4>5. Counterparty and custody failure</h4>
<p>The 2022 cluster — exchanges, lenders and funds — was not a technology failure at all. It was leverage, rehypothecation and absent segregation. Traditional credit analysis would have caught most of it.</p>

<h4>6. Operational error</h4>
<p>Wrong address, wrong chain, wrong decimal precision, wrong token contract. Irreversible by design. Mitigations: address allow-lists, test transactions, simulation before signing, and human-readable transaction previews.</p>

<h4>7. Consensus-level failure</h4>
<p>Vanishingly rare on major networks, and disproportionately worried about by people new to the field.</p>

<div class="callout">
<strong>The framing to bring to a risk committee:</strong> this is not one exotic risk. It is a familiar set — access control, third-party dependency, software defect, data integrity, counterparty, processing error — with one unfamiliar property: <strong>irreversibility</strong>. That property removes the recovery step every existing control framework quietly assumes exists, which is why controls must move to the pre-signature stage.
</div>`,
        key: [
          "Key and access-control compromise is the largest realised loss category",
          "Bridges are the most damaging protocol exploit category; avoid wrapped assets where possible",
          "Audits are point-in-time opinions — necessary, not sufficient",
          "2022's failures were leverage and rehypothecation, not technology",
          "The genuinely new property is irreversibility, which removes the recovery step controls assume"
        ]
      }
    ]
  },

  /* ============================== MODULE 10 ============================== */
  {
    id: "m10",
    number: 10,
    title: "The 2026 field map",
    tagline: "What is real, what is next, what to watch",
    icon: "◎",
    minutes: 45,
    summary: "Everything assembled: the current state, the live regulatory clocks, the honest failures, and a framework for judging what comes next without re-reading the whole syllabus.",
    outcomes: [
      "State the position of each major segment as of August 2026 with numbers",
      "Track the regulatory calendar into 2027",
      "Apply a repeatable framework to assess any new proposal",
      "Name the open questions that will decide the next two years"
    ],
    lessons: [
      {
        id: "m10l1",
        title: "State of play, August 2026",
        minutes: 9,
        body: `
<h4>Stablecoins — at scale, newly regulated</h4>
<p>~$308bn outstanding, +14% YoY, ~99% USD. ~$400bn annual real payment volume, ~60% B2B. GENIUS Act law but rules unfinalised, effective 18 January 2027. MiCA fully in force since 1 July 2026. Hong Kong licensed two of 36 applicants. UK sandboxing ahead of an October 2027 regime.</p>

<h4>Tokenised assets — real but small</h4>
<p>~$29–34bn ex-stablecoins, roughly tripled from 2024, a record $28.9bn in May 2026. Treasuries ~$15–16bn, private credit ~$8bn, equities ~$2.4bn and growing fastest. Concentrated in two working categories, with a long tail of pilots.</p>

<h4>Infrastructure — the constraint moved</h4>
<p>Fusaka shipped December 2025; blob targets reached 14/21 by January 2026 heading toward ~48; L2 costs down 50–90%. Throughput is no longer the binding constraint. <strong>Fragmentation and interoperability are.</strong></p>

<h4>Institutional adoption — exposure solved, usage not</h4>
<p>ETFs took $2.62bn in the strongest week of 2026 (17–21 August), with IBIT at ~80% of Bitcoin flows and volumes subdued — allocation rather than speculation. Custody consolidated around a small set of licensed providers. Basel SCO60 live since 1 January 2026 has fixed the shape of what banks will and will not hold.</p>

<h4>Public infrastructure — from prototype to real value</h4>
<p>Project Agorá published findings in May 2026 and is moving to real-value testing with the Bank of Canada joining. Ensemble defined the layered architecture. Guardian expanded scope, with MAS piloting tokenised government bills settled in wholesale CBDC during 2026.</p>

<div class="callout">
<strong>The single-sentence summary of 2026:</strong> the regulatory perimeter closed, the cost constraint lifted, stablecoins scaled, tokenisation found two real products, and the remaining problems are coordination problems — interoperability, liquidity fragmentation, and four jurisdictions running four different clocks.
</div>`,
        key: [
          "Stablecoins ~$308bn; tokenised RWAs ~$29–34bn; the gap is an order of magnitude",
          "Fusaka lifted the cost constraint; fragmentation replaced throughput as the binding problem",
          "ETF flows show allocation, not speculation; SCO60 fixed what banks will hold",
          "Agorá moved from prototype to real-value testing — the clearest signal of institutional seriousness"
        ]
      },
      {
        id: "m10l2",
        title: "The regulatory calendar into 2027",
        minutes: 8,
        body: `
<p>The dates that actually bind. This is the most useful single page to keep.</p>

<table class="data">
<thead><tr><th>Date</th><th>Jurisdiction</th><th>Event</th></tr></thead>
<tbody>
<tr><td>1 Aug 2025</td><td>Hong Kong</td><td>Stablecoins Ordinance in effect</td></tr>
<tr><td>Jul 2025</td><td>US</td><td>GENIUS Act enacted</td></tr>
<tr><td>3 Dec 2025</td><td>Ethereum</td><td>Fusaka activated</td></tr>
<tr><td>1 Jan 2026</td><td>Global (Basel)</td><td>SCO60 crypto-asset capital standard effective</td></tr>
<tr><td>Q1 2026</td><td>UK</td><td>FCA stablecoin sandbox testing begins (Monee, ReStabilise, Revolut, VVTX)</td></tr>
<tr><td>25 Feb 2026</td><td>US</td><td>OCC GENIUS proposed rule issued — still a proposal as of late July</td></tr>
<tr><td>Mar 2026</td><td>Singapore</td><td>Libeara granted MAS Capital Markets Services licence</td></tr>
<tr><td>10 Apr 2026</td><td>Hong Kong</td><td>First stablecoin licences: HSBC and Anchorpoint (2 of 36)</td></tr>
<tr><td>May 2026</td><td>US</td><td>Revised CLARITY Act clears Senate Banking Committee</td></tr>
<tr><td>19 May 2026</td><td>EU</td><td>Commission opens MiCA review consultations (86 questions)</td></tr>
<tr><td>27 May 2026</td><td>BIS</td><td>Agorá findings published; real-value testing announced; Bank of Canada joins</td></tr>
<tr><td>1 Jul 2026</td><td>EU</td><td>MiCA fully in force; grandfathering ends; ~280 firms authorised</td></tr>
<tr><td>18 Jul 2026</td><td>US</td><td>GENIUS rulemaking deadline missed — 18-month trigger now governs</td></tr>
<tr><td>Sep 2026</td><td>UK</td><td>Cryptoasset authorisation application gateway opens</td></tr>
<tr><td>15 Sep 2026</td><td>US</td><td>Senate cloture vote scheduled on CLARITY Act (needs 60)</td></tr>
<tr><td>30 Sep 2026</td><td>EU</td><td>MiCA review consultation closes</td></tr>
<tr><td>H2 2026</td><td>Hong Kong</td><td>HSBC and Anchorpoint HKD stablecoin launches indicated</td></tr>
<tr><td>18 Jan 2027</td><td>US</td><td><strong>GENIUS Act effective date</strong></td></tr>
<tr><td>Late 2027</td><td>US</td><td>CLARITY operational provisions would take effect if enacted</td></tr>
<tr><td>Oct 2027</td><td>UK</td><td>Full cryptoasset authorisation regime live</td></tr>
<tr><td>End 2030</td><td>Global (FATF)</td><td>Revised Recommendation 16 implementation expected complete</td></tr>
</tbody>
</table>`,
        key: [
          "SCO60 effective 1 Jan 2026; MiCA fully in force 1 Jul 2026",
          "GENIUS effective 18 Jan 2027 after the July 2026 rulemaking deadline was missed",
          "CLARITY cloture vote scheduled 15 Sep 2026; operational provisions would land late 2027",
          "UK gateway opens Sep 2026, full regime Oct 2027"
        ]
      },
      {
        id: "m10l3",
        title: "The CLARITY Act and the US market structure question",
        minutes: 8,
        body: `
<p>Stablecoins got their statute. The much larger question — who regulates everything else — is still open, and it is the biggest single unresolved item in the field.</p>

<h4>What the bill does</h4>
<p>The <strong>Digital Asset Market Clarity (CLARITY) Act</strong> would allocate jurisdiction between the SEC and the CFTC, granting the <strong>CFTC exclusive jurisdiction over digital commodity spot markets</strong> while the <strong>SEC retains jurisdiction over investment contract assets</strong>. It introduces a mechanism for an asset to be certified as sufficiently decentralised to move from the securities perimeter to the commodity perimeter — the "maturity" concept that carries most of the bill's weight and most of its controversy.</p>

<h4>Where it stands</h4>
<ul>
<li>Passed the House in <strong>July 2025</strong>, 294–134, a genuinely bipartisan margin</li>
<li>A revised version cleared the <strong>Senate Banking Committee in May 2026</strong></li>
<li>Senate Republicans released updated text in <strong>July 2026</strong></li>
<li>Majority Leader Thune committed on <strong>3 August 2026</strong> to a floor vote before the recess; the Senate acted on <strong>8 August</strong></li>
<li>As of late August 2026 it had <strong>not cleared the Senate floor</strong>. A procedural cloture vote on the motion to proceed is scheduled for <strong>15 September 2026</strong>, requiring 60 votes to overcome a filibuster.</li>
<li>Even on passage, most operational provisions — registration, maturity certification — would not take effect until <strong>late 2027</strong>, since implementing rules must still be written</li>
</ul>

<h4>Why it matters beyond the US</h4>
<p>The US is the largest capital market and the issuer of the currency behind ~99% of stablecoins. Its classification choices propagate globally through listing decisions, custody arrangements and index inclusion. A resolved SEC/CFTC boundary would let US institutions build products they have avoided for years. Continued deadlock keeps activity offshore and keeps the EU, Singapore, Hong Kong and the UAE competing for it.</p>

<div class="callout warn">
<strong>Forecasting discipline:</strong> a scheduled cloture vote is not passage, committee approval is not floor time, and enactment is not effectiveness. GENIUS is the object lesson — enacted July 2025, still without final rules more than a year later. Watch the rulemaking, not the headline.
</div>`,
        key: [
          "CLARITY would give the CFTC exclusive jurisdiction over digital commodity spot markets",
          "House passed July 2025 (294–134); Senate Banking cleared a revised version May 2026",
          "Not through the Senate floor as of late Aug 2026; cloture vote set for 15 Sep 2026 (needs 60)",
          "Operational provisions would not take effect until late 2027 even if enacted"
        ]
      },
      {
        id: "m10l4",
        title: "A framework for judging what comes next",
        minutes: 9,
        body: `
<p>The specifics in this syllabus will date. The questions will not. Run any new proposal, product or headline through these five.</p>

<h4>1. What named cost does this remove?</h4>
<p>Reconciliation, settlement lag, principal risk, manual servicing, collateral immobility, intraday liquidity buffers. If the answer is not on that list, be sceptical. "Transparency", "efficiency" and "innovation" are not costs.</p>

<h4>2. Who is the buyer, and do they exist today?</h4>
<p>Tokenised Treasuries worked because crypto-native institutions holding stablecoins were already there. Tokenised real estate fails partly because its buyer is hypothetical. Existing demand beats a well-argued addressable market.</p>

<h4>3. What is the trust structure?</h4>
<p>Not "is it decentralised". Name the parties: issuer, custodian, oracle, upgrade admin, bridge operator, transfer agent. For each, ask what happens if they fail or act badly. Every real product has a list. Good ones publish it.</p>

<h4>4. Which regulatory perimeter does it sit in, in which jurisdictions?</h4>
<p>Securities, payments, banking, or none. If none, that is a fact about timing rather than a permanent state. Then map the clock: four jurisdictions, four timelines, as Module 5 sets out.</p>

<h4>5. What is the incumbent, and is this meaningfully better?</h4>
<p>Not different — better, by an amount that justifies a migration. Correspondent banking is genuinely bad in specific corridors, so stablecoins win there. US equity settlement is genuinely good, so tokenised equities struggle there. Location matters more than technology.</p>

<div class="callout">
<strong>The meta-point:</strong> the questions that separate real projects from theatre are ordinary finance questions — what does it cost, who buys it, who do I trust, who regulates it, what is it replacing. The technology changes what is possible. It never changes what makes a business work.
</div>`,
        key: [
          "Five questions: named cost removed, existing buyer, trust structure, regulatory perimeter, incumbent comparison",
          "Reject 'transparency' and 'efficiency' as answers to the cost question",
          "'What is the trust structure' replaces 'is it decentralised' as the useful question",
          "Technology changes what is possible; it does not change what makes a business work"
        ]
      },
      {
        id: "m10l5",
        title: "Open questions for 2027",
        minutes: 8,
        body: `
<p>The genuinely unresolved items. Anyone claiming confident answers to these is selling something.</p>

<h4>1. Does deposit substitution actually happen?</h4>
<p>If stablecoins scale into everyday corporate and retail balances, deposits leave banks and stop funding credit. The banking system's response — issue your own, or lose the flow — is already visible in the Hong Kong licensees. The magnitude is unknown, and it is the question central banks care about most.</p>

<h4>2. Does anything non-USD ever achieve escape velocity?</h4>
<p>~99% USD dominance is a network effect, not a policy choice. HKD, EUR, SGD and GBP stablecoins all launch into that. Watch whether any finds a settlement use case with genuine domestic demand rather than policy sponsorship. H2 2026 HKD launches are the first real test.</p>

<h4>3. Does tokenisation reach a buyer who is not already on-chain?</h4>
<p>Nearly all tokenised RWA demand to date is reallocation of crypto-native balances. The step change requires traditional allocators to hold on-chain records — a custody, accounting and mandate problem, not a technology one. No convincing evidence either way yet.</p>

<h4>4. Do the US rules land, and in what shape?</h4>
<p>GENIUS effective January 2027 with rules still being written. CLARITY facing a September cloture vote. Two years of legislative work could still produce a workable regime, a mess, or continued limbo.</p>

<h4>5. Can privacy and supervision be reconciled?</h4>
<p>Institutions cannot publish positions. Regulators cannot supervise what they cannot see. Zero-knowledge proofs offer a theoretical resolution — proving compliance without revealing data — that no regulator has yet blessed at scale. If this is solved, public infrastructure becomes viable for far more institutional activity. If it is not, permissioned networks persist indefinitely.</p>

<h4>6. Does interoperability get solved by standards or by a winner?</h4>
<p>Fragmentation is the binding constraint. It resolves either through standards and messaging protocols, or through one network accumulating enough liquidity that the question stops mattering. History in market infrastructure favours the second more often than practitioners like to admit.</p>

<h4>7. What breaks next?</h4>
<p>Every cycle has had a failure that reset the regulatory conversation — Mt Gox, The DAO, Terra, FTX. The current build-out concentrates value in stablecoin issuers, a handful of custodians, oracle networks and a few large ETFs. Those are the places where a failure would be systemic rather than merely expensive.</p>

<div class="callout">
<strong>Where to keep watching:</strong> BIS and central bank innovation publications for architecture, the rulemaking dockets rather than the legislation for the US, MiCA review outputs for the EU, HKMA and MAS announcements for Asia, and RWA and stablecoin supply data for what is actually happening rather than what is being announced.
</div>`,
        key: [
          "Deposit substitution magnitude is the question central banks care about most",
          "H2 2026 HKD stablecoin launches are the first real test of non-USD viability",
          "Tokenised RWA demand is still crypto-native reallocation, not new allocators",
          "Privacy-versus-supervision is unresolved and determines whether public rails scale institutionally",
          "Concentration in stablecoin issuers, custodians, oracles and large ETFs is where the next systemic failure would come from"
        ]
      }
    ]
  }

  ]
};
