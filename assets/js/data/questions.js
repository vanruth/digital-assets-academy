/* Digital Assets Academy — question bank
 * Types: mc (single choice), multi (select all), tf (true/false),
 *        type (typed answer), match (pair up), order (sequence)
 */
window.DA_QUESTIONS = [

/* ============================ MODULE 1 ============================ */
{id:"q1001",m:"m1",l:"m1l1",type:"mc",q:"Which question most reliably tells you which category a digital asset belongs to?",
 options:["Which blockchain is it issued on?","If it became worthless tomorrow, who did you have a claim against?","How volatile has its price been?","Is it fungible or non-fungible?"],
 answer:1,explain:"The category is determined by who owes you something. Nobody = native crypto. An issuer with reserves = stablecoin. A bank = tokenised deposit. A central bank = CBDC."},

{id:"q1002",m:"m1",l:"m1l1",type:"mc",q:"A money market fund unit recorded on a distributed ledger is best described as:",
 options:["A stablecoin","A tokenised security","A tokenised deposit","A utility token"],
 answer:1,explain:"It is a conventional security whose ownership register lives on a ledger. Tokenisation changes the record-keeping, not the legal nature of the instrument."},

{id:"q1003",m:"m1",l:"m1l1",type:"tf",q:"A tokenised deposit and a stablecoin are legally the same instrument.",
 answer:false,explain:"A tokenised deposit is a bank deposit — on balance sheet, deposit-protected, funding lending. A stablecoin is an issuer liability backed by segregated reserves."},

{id:"q1004",m:"m1",l:"m1l1",type:"match",q:"Match each asset to its category.",
 pairs:[["Bitcoin","Native crypto-asset"],["USDC","Stablecoin"],["JPMorgan deposit token","Tokenised deposit"],["BlackRock BUIDL","Tokenised security"]],
 explain:"Six categories, distinguished by who bears the obligation, not by the technology involved."},

{id:"q1005",m:"m1",l:"m1l2",type:"mc",q:"Why does custody become the central problem on public blockchains?",
 options:["Because transaction fees are unpredictable","Because control of the private key is control of the asset","Because blockchains are slow","Because regulators require it"],
 answer:1,explain:"Public-chain assets behave as bearer instruments. If the key is the asset, key management is asset safekeeping — which is why banks start their digital-asset businesses with custody."},

{id:"q1006",m:"m1",l:"m1l2",type:"mc",q:"For a tokenised bond, what is the most important legal question about the ledger?",
 options:["Which consensus mechanism secures it","Whether the ledger is legally authoritative for title or merely a mirror","How many nodes validate it","Whether the token is fungible"],
 answer:1,explain:"If a separate traditional register remains authoritative, you have two records that can disagree — reintroducing the reconciliation cost tokenisation was meant to remove."},

{id:"q1007",m:"m1",l:"m1l2",type:"tf",q:"Settlement finality on a public chain means an operator can reverse an erroneous transfer on request.",
 answer:false,explain:"There is no chargeback and no recall. Finality removes counterparty risk and removes recourse at the same time."},

{id:"q1008",m:"m1",l:"m1l3",type:"mc",q:"Which property of tokenisation carries the most institutional value?",
 options:["Divisibility","Fungibility","Programmability","Anonymity"],
 answer:2,explain:"Programmability lets rules travel with the asset: transfer restrictions, atomic settlement, automated servicing and conditional payments."},

{id:"q1009",m:"m1",l:"m1l3",type:"multi",q:"Which of these are examples of programmability delivering real institutional value? (Select all that apply)",
 answers:[0,1,3],options:["Atomic delivery-versus-payment","A token that refuses transfer to a non-whitelisted wallet","Splitting a fund unit into smaller denominations","Automated coupon and redemption servicing"],
 explain:"Divisibility is a separate property. The other three are programmability — rules enforced by the asset rather than by a separate system."},

{id:"q1010",m:"m1",l:"m1l3",type:"mc",q:"Why did private credit become the second-largest tokenised category?",
 options:["It offers the highest yields","It solves an operational problem: manual servicing, opaque valuation, no secondary market","It is the least regulated asset class","It has the largest addressable market"],
 answer:1,explain:"The migration is structural, not speculative. Tokenisation addresses servicing, valuation transparency and transferability directly."},

{id:"q1011",m:"m1",l:"m1l4",type:"mc",q:"Approximately how large was total stablecoin supply in mid-August 2026?",
 options:["About $85bn","About $308bn","About $1.2 trillion","About $34bn"],
 answer:1,explain:"Roughly $308bn, up about 14% year on year, with around 99% dollar-denominated."},

{id:"q1012",m:"m1",l:"m1l4",type:"mc",q:"Roughly what share of stablecoin supply is denominated in US dollars?",
 options:["About 60%","About 75%","About 88%","About 99%"],
 answer:3,explain:"Near-total dollar dominance. Every non-USD stablecoin project is fighting a network effect, not just a regulator."},

{id:"q1013",m:"m1",l:"m1l4",type:"type",q:"Which tokenised asset category is the largest by AUM, at roughly $15–16bn?",
 accept:["treasuries","treasury","tokenised treasuries","tokenized treasuries","us treasuries","t-bills","treasury bills"],
 hint:"Short-dated US government debt",
 explain:"Tokenised Treasuries lead the RWA category — the underlying is simple, liquid, yields, and works immediately as collateral."},

{id:"q1014",m:"m1",l:"m1l4",type:"mc",q:"How does the size of tokenised RWAs compare with stablecoins in 2026?",
 options:["RWAs are roughly twice the size","They are roughly equal","Stablecoins are roughly an order of magnitude larger","RWAs are larger but growing more slowly"],
 answer:2,explain:"~$308bn of stablecoins against ~$29–34bn of tokenised RWAs. If you can only follow one segment, follow stablecoins."},

{id:"q1015",m:"m1",l:"m1l5",type:"mc",q:"Under Basel SCO60, what risk weight applies to Group 2b crypto-assets such as unbacked Bitcoin?",
 options:["100%","250%","1250%","0% if hedged"],
 answer:2,explain:"1250% at an 8% minimum ratio means capital equal to the full exposure — the asset is treated as an immediate total loss for capital purposes."},

{id:"q1016",m:"m1",l:"m1l5",type:"tf",q:"A bank that limits crypto exposure while investing heavily in tokenisation is being inconsistent.",
 answer:false,explain:"They are different businesses with different capital treatments, clients and risks. Group 1 activity is economically viable; Group 2 balance-sheet exposure is not."},

{id:"q1017",m:"m1",l:"m1l5",type:"mc",q:"The best institutional framing of the difference between crypto and digital assets is:",
 options:["Crypto is retail, digital assets are wholesale","Crypto is an asset you might hold or trade; digital assets are rails you might run your existing business on","Crypto is unregulated, digital assets are regulated","They are marketing terms for the same thing"],
 answer:1,explain:"The rails framing is the bigger prize and the slower build — which is why banks pursue it while limiting balance-sheet crypto exposure."},

{id:"q1018",m:"m1",l:"m1l1",type:"mc",q:"Which of these is a direct liability of a central bank?",
 options:["A tokenised deposit","A licensed stablecoin","A wholesale CBDC","A tokenised money market fund"],
 answer:2,explain:"CBDC is central bank money in tokenised form. Wholesale CBDC (bank-to-bank) is live and progressing; retail CBDC is politically fraught and slower."},

{id:"q1019",m:"m1",l:"m1l4",type:"mc",q:"Roughly what share of real stablecoin payment volume is B2B?",
 options:["About 20%","About 40%","About 60%","About 90%"],
 answer:2,explain:"Around 60% of roughly $400bn annual real payment volume is business-to-business, driven by traditional traders rather than crypto-native firms."},

{id:"q1020",m:"m1",l:"m1l3",type:"type",q:"What is the token standard designed to enforce eligibility checks at the point of transfer for regulated securities?",
 accept:["erc-3643","erc3643","3643","t-rex","erc 3643"],
 hint:"Also known as T-REX",
 explain:"ERC-3643 binds an on-chain identity registry to the token, so a non-compliant transfer simply fails."},

{id:"q1021",m:"m1",l:"m1l2",type:"multi",q:"Which are direct consequences of assets behaving as bearer instruments? (Select all that apply)",
 answers:[0,1,3],options:["Finality is irreversible with no chargeback","Key management becomes asset safekeeping","Regulators cannot supervise the activity","Legal title and ledger position can diverge for tokenised securities"],
 explain:"Regulators supervise this heavily. The other three are real structural consequences institutions design around."},

{id:"q1022",m:"m1",l:"m1l4",type:"mc",q:"Which sanity check best separates a real tokenisation proposal from theatre?",
 options:["Does it use a public blockchain?","Does it name a specific cost that the ledger removes?","Is the token fully decentralised?","Is the market size large enough?"],
 answer:1,explain:"Reconciliation, settlement lag, manual servicing, collateral immobility. If the answer is 'transparency' or 'efficiency', be sceptical."},

{id:"q1023",m:"m1",l:"m1l5",type:"match",q:"Match each characteristic to crypto or institutional digital assets.",
 pairs:[["Basel Group 2, up to 1250% risk weight","Crypto"],["Basel Group 1, treated like the underlying","Digital assets"],["Revenue from trading and spread","Crypto"],["Revenue from settlement and servicing","Digital assets"]],
 explain:"The Basel line is the sharpest distinction, and it is what shaped the industry's institutional structure."},

{id:"q1024",m:"m1",l:"m1l1",type:"tf",q:"Tokenising a corporate bond changes its legal nature from a security to a commodity.",
 answer:false,explain:"Tokenisation is a record-keeping technology. A tokenised security is still a security in every relevant jurisdiction."},

/* ============================ MODULE 2 ============================ */
{id:"q2001",m:"m2",l:"m2l1",type:"mc",q:"What does a cryptographic hash provide to a blockchain?",
 options:["Encryption of transaction contents","Tamper evidence, because each block contains the hash of the previous one","Authorisation to move assets","Privacy for participants"],
 answer:1,explain:"Alter any historical transaction and every subsequent hash breaks. That is what 'immutability' means in practice — a tamper-evident chain of fingerprints."},

{id:"q2002",m:"m2",l:"m2l1",type:"mc",q:"Why must institutional controls be applied BEFORE a transaction is signed?",
 options:["Signing is computationally expensive","Because the signature is the only authorisation and the transfer cannot be recalled","Because gas prices rise after signing","Because regulators mandate pre-signing checks"],
 answer:1,explain:"This is the entire design problem of institutional custody, and why the policy engine matters more than the vault."},

{id:"q2003",m:"m2",l:"m2l1",type:"tf",q:"A private key is published on-chain when you make a transfer.",
 answer:false,explain:"Only the signature and the public data appear on-chain. The private key never leaves the holder's control."},

{id:"q2004",m:"m2",l:"m2l1",type:"mc",q:"What is the risk created by seed phrase derivation (BIP-32/39/44)?",
 options:["Keys become predictable to attackers","One compromised seed exposes an entire hierarchy of derived keys","Transactions become slower to sign","Addresses can no longer be reused"],
 answer:1,explain:"Convenient and dangerous in equal measure: back up the seed and you back up every key — but compromise it and you lose everything below it."},

{id:"q2005",m:"m2",l:"m2l2",type:"mc",q:"What distinguishes the account model from the UTXO model?",
 options:["The account model stores balances and state directly, making smart contracts natural","The account model is more private","The UTXO model supports smart contracts better","The account model has no transaction fees"],
 answer:0,explain:"UTXO tracks discrete unspent outputs; the account model maps addresses to balances and stored data. That is why most programmable chains use the account model."},

{id:"q2006",m:"m2",l:"m2l2",type:"type",q:"What is the name of the public waiting area where pending transactions sit before inclusion in a block?",
 accept:["mempool","memory pool","the mempool"],
 hint:"Short for memory pool",
 explain:"Its visibility is what enables MEV — front-running, back-running and sandwiching of pending trades."},

{id:"q2007",m:"m2",l:"m2l2",type:"mc",q:"Why is MEV an execution-quality problem for institutions?",
 options:["It raises gas prices for everyone equally","Observers can see and trade ahead of pending orders in the public mempool","It delays block finality","It exposes private keys"],
 answer:1,explain:"Mitigated with private order flow, batch auctions, or simply not executing size on a public mempool."},

{id:"q2008",m:"m2",l:"m2l3",type:"mc",q:"What does proof of stake use to secure the network?",
 options:["Energy expenditure","Slashable capital posted as collateral","Government licensing of validators","Hardware attestation"],
 answer:1,explain:"Security is internal to the system: misbehave and the protocol destroys part of your stake. Proof of work buys security externally, with energy."},

{id:"q2009",m:"m2",l:"m2l3",type:"multi",q:"Which questions does proof of stake raise for custodians? (Select all that apply)",
 answers:[0,1,3],options:["Who bears slashing losses","Whether staking-as-a-service is a securities offering","Whether hashing consumes too much energy","Whether custody segregation survives assets being bonded"],
 explain:"Energy is a proof-of-work question. The other three are live custody and regulatory issues created by staking."},

{id:"q2010",m:"m2",l:"m2l3",type:"tf",q:"Consensus verifies that a transaction is economically sensible before including it.",
 answer:false,explain:"Consensus decides ordering and validity, not merit. A perfectly valid transaction can be a catastrophic mistake."},

{id:"q2011",m:"m2",l:"m2l4",type:"match",q:"Match each network type to its finality model.",
 pairs:[["Bitcoin","Probabilistic — reversal grows exponentially costly"],["Ethereum proof of stake","Economic — reverting forfeits enormous staked capital"],["Permissioned BFT network","Instant — quorum of known validators, one round"]],
 explain:"Reorg risk is a major reason institutions favour permissioned infrastructure: no reorganisations to explain to a regulator."},

{id:"q2012",m:"m2",l:"m2l4",type:"mc",q:"What is the gap between technical and legal finality?",
 options:["There is none once a block is confirmed","A chain can be technically irreversible while a court can still unwind the transfer","Legal finality always arrives first","Legal finality only applies to CBDCs"],
 answer:1,explain:"Legal finality comes from a designated system under settlement finality law. Many jurisdictions have not closed this gap."},

{id:"q2013",m:"m2",l:"m2l5",type:"multi",q:"Which of these sit OUTSIDE a blockchain's guarantees? (Select all that apply)",
 answers:[0,1,2],options:["That a stablecoin issuer actually holds the reserves","That an oracle's price is accurate","That the contract code matches the author's intent","That transaction history cannot be silently rewritten"],
 explain:"Tamper evidence is inside the guarantee. Reserves, external data and developer intent are all outside it — and that is where the losses happen."},

{id:"q2014",m:"m2",l:"m2l5",type:"mc",q:"What is the better question to ask than 'is it trustless'?",
 options:["Is it decentralised?","Which parties am I trusting, and what happens when one fails?","How many nodes are there?","Is the code open source?"],
 answer:1,explain:"'Trustless' describes the consensus layer only. Every real application reintroduces issuers, oracles, custodians, bridge operators and upgrade admins."},

{id:"q2015",m:"m2",l:"m2l5",type:"mc",q:"Why does client diversity matter as an operational risk?",
 options:["More clients mean faster transactions","If one implementation holds a supermajority, a bug in it becomes a network-wide event","It reduces gas fees","It improves privacy"],
 answer:1,explain:"A live risk item for anyone running validators, and one most institutional risk frameworks are not yet written to capture."},

{id:"q2016",m:"m2",l:"m2l1",type:"mc",q:"What do digital signatures prove?",
 options:["That the transaction is profitable","That the holder of the corresponding private key authorised this exact message","That the sender passed KYC","That the recipient accepted the transfer"],
 answer:1,explain:"Verification requires only the public key. No shared secret and no trusted intermediary are needed."},

{id:"q2017",m:"m2",l:"m2l2",type:"mc",q:"What does the nonce in a transaction do?",
 options:["Sets the fee ceiling","Provides a per-account counter that prevents replay and forces ordering","Encrypts the payload","Identifies the recipient"],
 answer:1,explain:"Without it, a signed transaction could be replayed indefinitely."},

{id:"q2018",m:"m2",l:"m2l3",type:"mc",q:"Proof of stake turns a network token into what, commercially?",
 options:["A payment instrument","A yield-bearing instrument","A governance-only right","A non-fungible asset"],
 answer:1,explain:"Which is exactly why staking raises securities, disclosure and custody questions that proof-of-work mining does not."},

{id:"q2019",m:"m2",l:"m2l4",type:"tf",q:"Bitcoin declares a transaction final after a fixed number of blocks defined in the protocol.",
 answer:false,explain:"Bitcoin never declares finality. The six-confirmation convention is a risk judgment dressed as a rule."},

{id:"q2020",m:"m2",l:"m2l5",type:"type",q:"Which category of exploit has caused the most damaging protocol losses in the industry?",
 accept:["bridges","bridge","bridge exploits","cross-chain bridges","cross chain bridges","bridge hacks"],
 hint:"They connect one chain to another",
 explain:"Bridges concentrate enormous locked value behind trust assumptions weaker than either chain's own security."},

{id:"q2021",m:"m2",l:"m2l1",type:"order",q:"Put the key derivation chain in order, from most secret to most public.",
 items:["Private key","Public key","Address"],
 explain:"Each step derives one-way from the last. You cannot run the derivation backwards."},

{id:"q2022",m:"m2",l:"m2l5",type:"multi",q:"Which of these ARE guaranteed by a blockchain? (Select all that apply)",
 answers:[0,2],options:["Only the private key holder can move the asset","That the token's issuer is solvent","That everyone converges on the same ordered state","That the price feed is accurate"],
 explain:"Key control and ordering are inside the guarantee. Solvency and prices come from outside and must be trusted separately."},

{id:"q2023",m:"m2",l:"m2l3",type:"mc",q:"What is slashing?",
 options:["Cutting transaction fees during congestion","The protocol destroying part of a validator's staked capital for misbehaviour","Reducing block size to speed up finality","Removing a node from the peer network"],
 answer:1,explain:"It is what makes proof-of-stake security economic rather than physical — and it creates a real loss-allocation question for custodians."},

{id:"q2024",m:"m2",l:"m2l2",type:"tf",q:"In the UTXO model, your balance is stored as a single number on the ledger.",
 answer:false,explain:"There is no stored balance. Your balance is the sum of the unspent outputs you can unlock."}
,
/* ============================ MODULE 3 ============================ */
{id:"q3001",m:"m3",l:"m3l1",type:"mc",q:"Which statement about smart contracts is correct?",
 options:["They execute automatically on a schedule","They are purely reactive — something must call them","They can fetch external data directly","They cannot hold assets"],
 answer:1,explain:"'Automatic' coupon payments are automatic only because someone or something triggers the call. Contracts never act on their own."},

{id:"q3002",m:"m3",l:"m3l1",type:"mc",q:"If a transaction runs out of gas mid-execution, what happens?",
 options:["It completes but with reduced functionality","It reverts entirely, and the fee is still paid","It is queued for the next block at no cost","The remaining gas is refunded in full"],
 answer:1,explain:"You pay for the computation performed even though the state change is undone."},

{id:"q3003",m:"m3",l:"m3l1",type:"multi",q:"Why is gas a practical problem for institutions? (Select all that apply)",
 answers:[0,1,3],options:["Fees are unpredictable and spike with congestion","Someone must hold the native token to pay fees","Gas costs are charged in the client's home currency","Complex logic costs more, pushing contracts toward terse, harder-to-audit code"],
 explain:"Fees are paid in the chain's native token, not fiat. Account abstraction and paymasters exist partly to solve the token-holding nuisance."},

{id:"q3004",m:"m3",l:"m3l2",type:"match",q:"Match each token standard to what it does.",
 pairs:[["ERC-20","Fungible token — the universal interface"],["ERC-721","Non-fungible, unique items"],["ERC-4626","Tokenised vault / yield-bearing share of a pool"],["ERC-3643","Permissioned security token with eligibility checks on transfer"]],
 explain:"ERC-3643 is the one institutions reach for when tokenising regulated assets."},

{id:"q3005",m:"m3",l:"m3l2",type:"mc",q:"What is the central design tension that permissioned tokens create?",
 options:["Speed versus cost","Liquidity versus compliance","Privacy versus throughput","Custody versus self-custody"],
 answer:1,explain:"Fully open tokens are liquid but unusable for regulated assets. Fully closed tokens are compliant but recreate walled gardens. Every serious 2026 design is a negotiated point on that line."},

{id:"q3006",m:"m3",l:"m3l2",type:"type",q:"What is the term for programmable accounts that support policy, limits, fee sponsorship and recovery (ERC-4337/7702)?",
 accept:["account abstraction","aa","smart accounts","smart account"],
 hint:"Two words, begins with 'account'",
 explain:"Quietly one of the most institutionally useful developments — it brings bank-style controls to a bearer-instrument model."},

{id:"q3007",m:"m3",l:"m3l3",type:"mc",q:"What is an oracle?",
 options:["A validator that orders transactions","A mechanism that pushes external data onto a chain for contracts to read","A regulator-approved auditor of smart contracts","A type of bridge between two chains"],
 answer:1,explain:"Chains are deliberately sealed off. They cannot fetch a price, a NAV or a shipment status without an oracle pushing it in."},

{id:"q3008",m:"m3",l:"m3l3",type:"mc",q:"Why is a 'decentralised' oracle whose nodes all read the same API still a single point of failure?",
 options:["Because the nodes are geographically clustered","Because decentralising transport does not decentralise the underlying truth","Because median aggregation is mathematically unsound","Because it costs too much gas"],
 answer:1,explain:"Source concentration is a single point of failure wearing a disguise. Ask how many genuinely independent sources feed the feed."},

{id:"q3009",m:"m3",l:"m3l3",type:"multi",q:"Which are genuine oracle failure modes? (Select all that apply)",
 answers:[0,1,2],options:["Manipulation of thin-market prices to trigger liquidations","Staleness during fast-moving markets","Source concentration behind apparent decentralisation","Consensus reorganisation of the base chain"],
 explain:"Reorgs are a consensus issue, not an oracle one. Oracle manipulation causes more losses than contract bugs do."},

{id:"q3010",m:"m3",l:"m3l3",type:"tf",q:"As of August 2026, Chainlink is the official oracle infrastructure behind Coinbase's tokenised stocks on Base.",
 answer:true,explain:"Announced 24 August 2026. Reference-price integrity is becoming a market-structure question rather than a plumbing detail."},

{id:"q3011",m:"m3",l:"m3l4",type:"mc",q:"Why do regulated token contracts include force-transfer and freeze powers?",
 options:["They are security flaws that auditors miss","They are requirements — a tokenised security must be able to honour court orders and handle lost keys","They exist only on permissioned chains","They are used to manipulate the token price"],
 answer:1,explain:"The question is never whether the powers exist, but who holds them and under what governance."},

{id:"q3012",m:"m3",l:"m3l4",type:"mc",q:"What does a timelock on contract upgrades provide?",
 options:["Lower gas costs for upgrades","A delay between announcement and effect — the difference between a governed system and a merely trusted one","Immunity from smart contract bugs","Automatic regulatory approval"],
 answer:1,explain:"It gives holders time to exit or object before the rules governing their asset change."},

{id:"q3013",m:"m3",l:"m3l4",type:"multi",q:"Which questions should you ask about a token contract's admin powers? (Select all that apply)",
 answers:[0,1,2,3],options:["Is it upgradeable, and by whom?","Is the admin a single key, a multi-sig, or timelocked governance?","Who can freeze my holding and on what legal basis?","What happens to the contract if the issuer fails?"],
 explain:"All four. Stop asking 'is it decentralised' and start asking 'what is the trust structure'."},

{id:"q3014",m:"m3",l:"m3l4",type:"tf",q:"Most significant production contracts are immutable once deployed.",
 answer:false,explain:"Most are upgradeable via proxy patterns. 'Code is law' is marketing; someone holds the key."},

{id:"q3015",m:"m3",l:"m3l5",type:"mc",q:"What is composability?",
 options:["The ability to write contracts in multiple languages","The property that on-chain components can call each other freely, so products assemble without integration projects","The ability to run the same contract on several chains","A method of compressing transaction data"],
 answer:1,explain:"In traditional finance every such link is a bilateral integration taking months. That is what makes it genuinely novel."},

{id:"q3016",m:"m3",l:"m3l5",type:"multi",q:"What does composability cost? (Select all that apply)",
 answers:[0,1,2],options:["Correlated failure that propagates instantly","Opaque, recursively stacked leverage","Valuation loops where assets price each other","Higher base-layer transaction fees"],
 explain:"Risk is not contained by a legal entity boundary — which is exactly the dynamic that made the 2022 failures so fast."},

{id:"q3017",m:"m3",l:"m3l5",type:"mc",q:"Why do permissioned tokens sacrifice composability?",
 options:["They run on slower chains","Transfers to arbitrary protocols fail eligibility checks","They cannot be audited","They use a different cryptographic curve"],
 answer:1,explain:"Institutions accept the loss to keep the risk perimeter legible. Permissioned pools are the 2026 attempt to buy some of it back."},

{id:"q3018",m:"m3",l:"m3l1",type:"mc",q:"Why does EVM compatibility matter even for chains with better technical designs?",
 options:["It is legally required in the EU","It is a network effect: tooling, auditors, wallets and developer supply all cluster there","It reduces energy consumption","It provides deterministic finality"],
 answer:1,explain:"The EVM's dominance is about the ecosystem around it, not the virtual machine itself."},

{id:"q3019",m:"m3",l:"m3l2",type:"tf",q:"A plain ERC-20 token is suitable for a regulated security because transfers can be reversed if a holder is ineligible.",
 answer:false,explain:"Plain ERC-20 lets anyone hold and transfer, and transfers cannot be reversed. Eligibility must be checked at transfer — hence ERC-3643."},

{id:"q3020",m:"m3",l:"m3l3",type:"mc",q:"What is the most overlooked oracle due-diligence question?",
 options:["Which programming language it uses","What the contract does when the feed goes stale","How many transactions it has processed","Whether it is open source"],
 answer:1,explain:"The answer to that one surprises people most often, and it is the behaviour that matters in exactly the moments that count."},

{id:"q3021",m:"m3",l:"m3l4",type:"order",q:"Order these upgrade governance arrangements from weakest to strongest.",
 items:["Single admin key","Multi-signature admin","Multi-sig with a timelock","Timelocked on-chain governance with published process"],
 explain:"Each step adds either distribution of control or advance notice to holders."},

{id:"q3022",m:"m3",l:"m3l5",type:"mc",q:"What is the strongest genuine argument BOTH for and against public infrastructure?",
 options:["Transaction cost","Composability","Regulatory clarity","Energy consumption"],
 answer:1,explain:"It delivers collateral mobility and instant product assembly, and it delivers correlated failure you do not control. Which side you land on depends on whether you can price that tail risk."},

{id:"q3023",m:"m3",l:"m3l1",type:"type",q:"What is the unit of computational work that a transaction pays for on Ethereum?",
 accept:["gas"],
 hint:"Three letters",
 explain:"It exists to stop infinite loops and to price scarce block space."},

{id:"q3024",m:"m3",l:"m3l2",type:"mc",q:"Uniswap's Permissioned Pools (July 2026) allow issuers to do what?",
 options:["Set their own trading fees","Enforce investor eligibility on-chain while using public AMM infrastructure","Bypass MEV entirely","Issue tokens without a legal wrapper"],
 answer:1,explain:"Public infrastructure with gated participation — the clearest expression of the 2026 hybrid compromise."},

/* ============================ MODULE 4 ============================ */
{id:"q4001",m:"m4",l:"m4l1",type:"mc",q:"What is the scaling trilemma?",
 options:["Speed, cost and privacy cannot all be optimised","Decentralisation, security and scalability — a chain can comfortably optimise for two","Custody, liquidity and compliance conflict","Throughput, finality and energy use conflict"],
 answer:1,explain:"Pushing throughput up on a single chain raises hardware requirements, reduces node count and degrades decentralisation."},

{id:"q4002",m:"m4",l:"m4l1",type:"mc",q:"How does a rollup work?",
 options:["It compresses the base chain's history periodically","It executes transactions off the base chain and posts data plus correctness assurances back to it","It runs a parallel consensus with its own validator set only","It batches transactions into a single signature"],
 answer:1,explain:"Users get cheap fast execution; the base chain still provides data availability and dispute resolution."},

{id:"q4003",m:"m4",l:"m4l1",type:"mc",q:"Why is the optimistic rollup withdrawal window a problem for settlement use cases?",
 options:["It costs too much gas","Funds are provably yours but immobile for roughly seven days","It exposes transaction details publicly","It requires a trusted sequencer"],
 answer:1,explain:"You cannot tell a treasurer their funds are theirs but locked for a week. This, plus privacy potential, is why institutional interest skews to ZK designs."},

{id:"q4004",m:"m4",l:"m4l1",type:"match",q:"Match each rollup type to its characteristic.",
 pairs:[["Optimistic rollup","Assume valid, allow challenge; ~7-day withdrawal"],["Zero-knowledge rollup","Prove valid cryptographically; minutes-to-hours withdrawal"]],
 explain:"Optimistic rollups are more mature with deeper liquidity; ZK rollups offer faster finality and privacy potential."},

{id:"q4005",m:"m4",l:"m4l2",type:"mc",q:"What did the Fusaka upgrade introduce?",
 options:["Proof of stake","PeerDAS — data availability sampling, so nodes no longer store all blob data","Account abstraction","Zero-knowledge proofs for the base layer"],
 answer:1,explain:"Removing the requirement that every node store all blob data removed the ceiling on blob capacity."},

{id:"q4006",m:"m4",l:"m4l2",type:"mc",q:"When did Fusaka activate on Ethereum mainnet?",
 options:["3 December 2025","1 January 2026","7 January 2026","1 July 2026"],
 answer:0,explain:"Activated 3 December 2025, with blob capacity then raised progressively through early 2026."},

{id:"q4007",m:"m4",l:"m4l2",type:"mc",q:"What was the expected effect of Fusaka on L2 transaction costs?",
 options:["A reduction of roughly 10–20%","A reduction of roughly 50–90%","No change; it only affected the base layer","An increase, offset by higher throughput"],
 answer:1,explain:"Cost determines which use cases are viable at all — micro-payments, per-invoice settlement and streaming payments are arithmetic problems first."},

{id:"q4008",m:"m4",l:"m4l2",type:"type",q:"By January 2026, what was Ethereum's blob target (the number, not the maximum)?",
 accept:["14","fourteen"],
 hint:"The maximum was 21",
 explain:"Target 14, maximum 21 by 7 January 2026, on a stated path toward a ceiling in the region of 48."},

{id:"q4009",m:"m4",l:"m4l3",type:"mc",q:"What is a wrapped token, in risk terms?",
 options:["The same asset on a different chain","A credit exposure to the bridge, not the underlying asset","A derivative regulated as a security","A stablecoin backed by another stablecoin"],
 answer:1,explain:"Risk systems recording wrapped BTC as 'BTC' are mismarking the exposure."},

{id:"q4010",m:"m4",l:"m4l3",type:"order",q:"Order these bridge designs from weakest to strongest security.",
 items:["Custodial / federated multi-sig","Messaging protocol with independent validation","Light-client native verification","Issuer-native burn-and-mint"],
 explain:"Issuer-native burn-and-mint removes the wrapped-asset problem entirely: one issuer, one liability, no synthetic claim to steal."},

{id:"q4011",m:"m4",l:"m4l3",type:"mc",q:"What is the binding constraint on tokenised markets in 2026?",
 options:["Transaction throughput","Fragmented liquidity and interoperability","Energy consumption","Cryptographic security"],
 answer:1,explain:"Fusaka lifted the cost constraint. A tokenised bond that cannot reach buyers on another network is a bond with a smaller market."},

{id:"q4012",m:"m4",l:"m4l4",type:"multi",q:"Why do banks build permissioned networks? (Select all that apply)",
 answers:[0,1,2,3],options:["Confidentiality of counterparty positions","Deterministic finality with no reorganisations","Named validators an operational risk framework can identify","Legal certainty for designation under settlement finality law"],
 explain:"All four. The trade-off is that a consortium chain with few participants and no external liquidity is a shared database with extra steps."},

{id:"q4013",m:"m4",l:"m4l4",type:"mc",q:"Why do most consortium blockchains disappoint?",
 options:["The technology is immature","They fail on network effects — the value of a network is its participants","They are too expensive to operate","Regulators prohibit them"],
 answer:1,explain:"Most enterprise blockchain disappointment traces to this single fact rather than to technology."},

{id:"q4014",m:"m4",l:"m4l4",type:"match",q:"Match each network to its type.",
 pairs:[["Ethereum, Solana","Public permissionless"],["Canton, SWIAT, Partior, Fnality","Private / consortium"],["Permissioned pools on a public AMM","Public with permissioned participation"]],
 explain:"The 2026 pattern is hybrid: public rails for reach, permissioning enforced at the token level rather than by choosing a walled network."},

{id:"q4015",m:"m4",l:"m4l5",type:"multi",q:"What should an issuer consider when choosing a network? (Select all that apply)",
 answers:[0,1,2,3],options:["Where the buyers are","What confidentiality the asset requires","What finality the settlement leg needs","What the custodian supports"],
 explain:"Custodian support is a harder constraint than most issuers expect. Liquidity beats elegance every time."},

{id:"q4016",m:"m4",l:"m4l5",type:"mc",q:"What is the winning distribution pattern in 2026?",
 options:["Issue on a single dominant chain","One canonical issuance with issuer-controlled distribution to several networks","Issue separately and independently on each chain","Avoid public chains entirely"],
 answer:1,explain:"Which is exactly why burn-and-mint interoperability and standards work became strategically important rather than merely technical."},

{id:"q4017",m:"m4",l:"m4l5",type:"mc",q:"Which network has become the venue of choice for consumer and tokenised-equity products?",
 options:["Bitcoin","Base","Fnality","SWIAT"],
 answer:1,explain:"Base carries much of the tokenised-equity activity, with Chainlink as its oracle infrastructure since August 2026."},

{id:"q4018",m:"m4",l:"m4l1",type:"tf",q:"Modularity means separating execution from settlement, consensus and data availability.",
 answer:true,explain:"Stop asking one chain to do everything. Let a base layer specialise in security and data while execution happens elsewhere."},

{id:"q4019",m:"m4",l:"m4l2",type:"mc",q:"What are blobs?",
 options:["Compressed smart contract bytecode","A separate, cheaper, temporary data space for rollup data that nodes discard after a period","Encrypted transaction payloads","Batched validator signatures"],
 answer:1,explain:"Rollup cost is dominated by data cost, so blob capacity is the main lever on end-user fees."},

{id:"q4020",m:"m4",l:"m4l4",type:"mc",q:"What does a permissioned network give up relative to a public one?",
 options:["Deterministic finality","Composability and reach","Confidentiality","Regulatory certainty"],
 answer:1,explain:"It gains confidentiality, finality and named validators; it loses composability and the participant network effect."},

{id:"q4021",m:"m4",l:"m4l5",type:"mc",q:"Which network is bank-owned wholesale settlement infrastructure using omnibus accounts at central banks?",
 options:["Canton","Fnality","Base","Ondo"],
 answer:1,explain:"Fnality targets intraday liquidity and settlement finality in central-bank-backed money."},

{id:"q4022",m:"m4",l:"m4l3",type:"tf",q:"Bridging an asset to another chain moves the original asset to that chain.",
 answer:false,explain:"The original is locked on chain A and a claim is minted on chain B. The claim is only as good as whatever secures the lock."},

{id:"q4023",m:"m4",l:"m4l2",type:"mc",q:"Roughly what scale-up in blob capacity is Fusaka characterised as enabling?",
 options:["About 2x","About 8x","About 50x","About 100x"],
 answer:1,explain:"Roughly 8x theoretically, with aggregate L2 throughput projections rising from about 5,600 TPS toward 24,000+."},

{id:"q4024",m:"m4",l:"m4l1",type:"mc",q:"In the modular model, what is Ethereum mainnet's role?",
 options:["The primary execution venue","A security and data availability platform hosting value at rest","A permissioned settlement layer for banks","A bridge between other chains"],
 answer:1,explain:"It is expensive, so it hosts value rather than activity. Activity increasingly happens on L2s."}
,
/* ============================ MODULE 5 ============================ */
{id:"q5001",m:"m5",l:"m5l1",type:"mc",q:"What actually holds a fiat-backed stablecoin's peg?",
 options:["The issuer buying tokens on the open market","Arbitrage by participants with primary-market mint and redeem access","An algorithm adjusting supply automatically","A central bank backstop"],
 answer:1,explain:"Buy below $1 and redeem at $1; mint at $1 and sell above. If redemption is slow, restricted or doubted, the arbitrage stops and the peg is only a promise."},

{id:"q5002",m:"m5",l:"m5l1",type:"mc",q:"Who earns the yield on a payment stablecoin's reserves?",
 options:["The token holder","The issuer, who holds the reserve","The blockchain validators","It is split evenly with holders"],
 answer:1,explain:"The issuer earns it and the holder earns nothing. At a $300bn market this is a multi-billion-dollar float business — and a rate-sensitive one."},

{id:"q5003",m:"m5",l:"m5l1",type:"mc",q:"Why is stablecoin distribution strategically more valuable than issuance?",
 options:["Distributors face lower capital requirements","Issuers pay large shares of reserve income to the exchanges and wallets that reach users","Distribution is unregulated","Issuance cannot be licensed in most jurisdictions"],
 answer:1,explain:"Whoever owns distribution has the pricing power — which is why banks partnering with telcos and platforms matters."},

{id:"q5004",m:"m5",l:"m5l2",type:"mc",q:"What caused USDC to trade to about $0.87 in March 2023?",
 options:["The reserve was found to be fraudulent","$3.3bn of the reserve sat at Silicon Valley Bank and access was in doubt","An algorithmic mechanism failed","A smart contract exploit drained the reserve"],
 answer:1,explain:"The reserve was real; access to it was uncertain for a weekend, and that was enough to break the arbitrage."},

{id:"q5005",m:"m5",l:"m5l2",type:"mc",q:"What made TerraUSD's collapse a reflexive death spiral?",
 options:["The reserve was invested in illiquid corporate debt","Defending the peg minted more of a volatile token, whose price collapsed under the supply, destroying the collateral value defending the peg","A regulator froze the issuer's bank accounts","Validators censored redemption transactions"],
 answer:1,explain:"A bank run where the assets are made of the bank's own shares. Roughly $40bn destroyed in days in May 2022."},

{id:"q5006",m:"m5",l:"m5l2",type:"match",q:"Match each stablecoin design to its failure mode.",
 pairs:[["Fiat-backed","Reserve quality or access to the reserve"],["Crypto-collateralised","Collateral crash outpacing liquidations; oracle dependence"],["Algorithmic","Reflexive death spiral with no reserve to fall back on"]],
 explain:"Regulation in 2026 has effectively closed the algorithmic category for regulated issuance."},

{id:"q5007",m:"m5",l:"m5l2",type:"mc",q:"Why is a yield-bearing 'stablecoin' a regulatory problem?",
 options:["Yields are unsustainable","It functions like a money market fund, which usually makes it a security","It cannot maintain a peg","Blockchains cannot calculate interest accurately"],
 answer:1,explain:"GENIUS restricts payment stablecoin issuers from paying interest, and MiCA's review is examining the interest ban. Expect this boundary to be contested into 2027."},

{id:"q5008",m:"m5",l:"m5l3",type:"mc",q:"When was the GENIUS Act enacted?",
 options:["January 2025","July 2025","February 2026","July 2026"],
 answer:1,explain:"Enacted July 2025 — the first comprehensive US federal framework for fiat-backed payment stablecoins."},

{id:"q5009",m:"m5",l:"m5l3",type:"mc",q:"What is the GENIUS Act's effective date, and why?",
 options:["July 2026, 12 months after enactment","18 January 2027, because regulators missed the rulemaking deadline so the 18-month trigger governs","25 February 2026, when the OCC proposed its rule","It took effect immediately on enactment"],
 answer:1,explain:"The effective date is the earlier of 18 months after enactment or 120 days after final rules. Regulators missed the 18 July 2026 deadline, so the 18-month trigger applies."},

{id:"q5010",m:"m5",l:"m5l3",type:"mc",q:"Under GENIUS, at what market capitalisation may an issuer opt into a state-level regime?",
 options:["Not more than $1bn","Not more than $5bn","Not more than $10bn","Any size, if the state regime is approved"],
 answer:2,explain:"Up to $10bn, provided the state regime is substantially similar to the federal framework. Above that, federal supervision applies."},

{id:"q5011",m:"m5",l:"m5l3",type:"tf",q:"As of late July 2026, the OCC's GENIUS implementing rule had been finalised.",
 answer:false,explain:"The OCC proposed its rule on 25 February 2026 and it remained a proposal. Major rules across OCC, FDIC, Treasury, FinCEN and OFAC were all still pending."},

{id:"q5012",m:"m5",l:"m5l4",type:"mc",q:"When did MiCA come fully into force with the grandfathering period expired?",
 options:["30 December 2024","1 January 2026","1 July 2026","30 September 2026"],
 answer:2,explain:"From 1 July 2026, any entity providing crypto-asset services to EU clients without a MiCA licence is in breach of EU law. Around 280 firms were authorised."},

{id:"q5013",m:"m5",l:"m5l4",type:"mc",q:"What is the difference between an EMT and an ART under MiCA?",
 options:["EMTs are issued by banks, ARTs by fintechs","EMTs reference a single currency; ARTs reference a basket or other assets","EMTs are permissioned, ARTs are public","EMTs pay interest, ARTs do not"],
 answer:1,explain:"E-money tokens reference one currency; asset-referenced tokens reference a basket or other assets, with heavier requirements for significant issuers."},

{id:"q5014",m:"m5",l:"m5l4",type:"mc",q:"On 10 April 2026, how many Hong Kong stablecoin licences were granted, and to whom?",
 options:["Five, to a mix of banks and exchanges","Two of 36 applicants: HSBC and Anchorpoint Financial","Twelve, to all qualifying local banks","One, to HSBC only"],
 answer:1,explain:"An approval rate of about 5.6%. Anchorpoint is a joint venture led by Standard Chartered with HKT and Animoca Brands."},

{id:"q5015",m:"m5",l:"m5l4",type:"type",q:"Which UK regulator named supporting UK-issued stablecoins a priority for 2026 and ran a sandbox cohort from Q1?",
 accept:["fca","financial conduct authority","the fca"],
 hint:"Three letters",
 explain:"Four firms — Monee, ReStabilise, Revolut Group and VVTX — began testing in Q1 2026. The full UK regime goes live October 2027."},

{id:"q5016",m:"m5",l:"m5l4",type:"match",q:"Match each jurisdiction to its regulatory philosophy in 2026.",
 pairs:[["United States","Legislated first, still writing the rules"],["European Union","Single comprehensive rulebook, already under review"],["Hong Kong","Licensed a tiny cohort of regulated incumbents"],["United Kingdom","Sandboxing ahead of full authorisation"]],
 explain:"Four jurisdictions, four philosophies, four clocks — the core problem for anyone building a multi-jurisdiction stablecoin business."},

{id:"q5017",m:"m5",l:"m5l5",type:"mc",q:"Roughly how fast did B2B stablecoin payments grow in emerging markets year on year?",
 options:["About 40%","About 150%","About 733%","About 2,500%"],
 answer:2,explain:"733% YoY. And 71% of LATAM firms reported using stablecoins for cross-border settlement."},

{id:"q5018",m:"m5",l:"m5l5",type:"mc",q:"Who is actually driving stablecoin payment adoption?",
 options:["Crypto-native trading firms","Ship brokers, steel traders, commodity firms and import/export businesses","Retail consumers in developed markets","Central banks"],
 answer:1,explain:"The buyer is a treasurer with a working capital problem, not a technologist."},

{id:"q5019",m:"m5",l:"m5l5",type:"multi",q:"What are the real limitations on stablecoin payments? (Select all that apply)",
 answers:[0,1,2,3],options:["On and off ramps are the bottleneck, not the chain leg","Dollarisation raises monetary sovereignty concerns","Travel Rule and sanctions compliance apply in full","Corporate accounting treatment often blocks adoption"],
 explain:"All four. The chain leg takes minutes; everything around it is where the cost and friction sit."},

{id:"q5020",m:"m5",l:"m5l5",type:"mc",q:"Which corridors do stablecoins actually win in?",
 options:["US to EU, where volumes are highest","Corridors with thin correspondent banking, slow settlement, wide FX spreads and hard local currency access","Intra-eurozone payments","Domestic retail payments in developed markets"],
 answer:1,explain:"They disintermediate correspondent banking precisely where emerging-market franchises earn their margin."},

{id:"q5021",m:"m5",l:"m5l6",type:"multi",q:"Why does the US dollar dominate stablecoins? (Select all that apply)",
 answers:[0,1,2,3],options:["Global trade is invoiced in dollars","Liquidity begets liquidity","US T-bills are the deepest safe reserve asset","Users in high-inflation economies want dollars specifically"],
 explain:"It is a network effect reinforced by reserve-asset depth — not a policy choice any single jurisdiction can reverse."},

{id:"q5022",m:"m5",l:"m5l6",type:"mc",q:"What does the Anchorpoint structure (Standard Chartered + HKT + Animoca) deliberately assemble?",
 options:["Regulatory arbitrage across three jurisdictions","Reserve credibility, distribution, and native-ecosystem relevance","Three separate licences under one entity","A hedge against HKD depegging"],
 answer:1,explain:"A bank brings reserves and regulation; a telco brings distribution and reach; a Web3 firm brings ecosystem presence. Banks typically lack the second."},

{id:"q5023",m:"m5",l:"m5l6",type:"mc",q:"What is the right test for any non-USD stablecoin?",
 options:["Is the issuer a licensed bank?","What is the natural on-chain demand for this currency?","Is it issued on a public chain?","Does it pay yield to holders?"],
 answer:1,explain:"If the answer is only 'domestic policy wants it', adoption will be slow. A real settlement use case gives it a chance."},

{id:"q5024",m:"m5",l:"m5l1",type:"order",q:"Order the steps in a stablecoin primary-market mint.",
 items:["Authorised participant wires fiat to the issuer","Issuer places the funds into reserve assets","Issuer mints tokens to the participant's wallet","Participant sells tokens into the secondary market"],
 explain:"Redemption reverses it: tokens returned and burned, fiat wired out. That round trip is the peg mechanism."},

{id:"q5025",m:"m5",l:"m5l3",type:"multi",q:"What does the GENIUS Act establish? (Select all that apply)",
 answers:[0,1,2],options:["A licensed payment stablecoin issuer regime","Reserve requirements in high-quality liquid assets with segregation and disclosure","Redemption rights at par","CFTC jurisdiction over digital commodity spot markets"],
 explain:"The last is the CLARITY Act, which is separate and still not through the Senate floor."},

{id:"q5026",m:"m5",l:"m5l4",type:"tf",q:"The European Commission's MiCA review consultation covers the stablecoin interest ban, staking, lending and DeFi.",
 answer:true,explain:"Launched 19 May 2026 with 86 questions across two tracks, closing 30 September 2026."},

/* ============================ MODULE 6 ============================ */
{id:"q6001",m:"m6",l:"m6l1",type:"order",q:"Order these forms of tokenised money from the strongest claim to the weakest.",
 items:["Wholesale CBDC","Tokenised deposit","Licensed stablecoin (EMT)","Unregulated offshore stablecoin"],
 explain:"Central bank money at the base, commercial bank money above, regulated e-money above that, private money last."},

{id:"q6002",m:"m6",l:"m6l1",type:"mc",q:"What is the 'singleness of money' and why do stablecoins strain it?",
 options:["That all money must be issued by a central bank; stablecoins are private","That a dollar is a dollar regardless of which bank holds it; many private dollar tokens with different reserves and redemption terms break that","That money supply must be fixed; stablecoins expand it","That money must be physical; stablecoins are digital"],
 answer:1,explain:"The historical analogue is the US free banking era, where notes from different banks traded at different discounts."},

{id:"q6003",m:"m6",l:"m6l1",type:"mc",q:"What architecture do EnsembleTX and the UK's Regulated Liability Network both describe?",
 options:["Stablecoins replacing bank deposits entirely","Wholesale CBDC as the central bank settlement layer with tokenised deposits as the commercial layer above","A single global permissioned chain operated by the BIS","Retail CBDC issued directly to the public"],
 answer:1,explain:"The hierarchy is preserved deliberately. Private tokens interoperate but settle down into central bank money."},

{id:"q6004",m:"m6",l:"m6l2",type:"multi",q:"Which are true of tokenised deposits but NOT of stablecoins? (Select all that apply)",
 answers:[0,1,2,3],options:["They stay on the bank's balance sheet","They carry deposit protection within limits","They continue to fund lending","Every holder is already a KYC'd customer of the issuer"],
 explain:"All four. This is why regulators find tokenised deposits far easier to approve — the legal and economic structure is unchanged."},

{id:"q6005",m:"m6",l:"m6l2",type:"mc",q:"What is the systemic concern about large-scale deposit substitution into stablecoins?",
 options:["Stablecoins are more volatile than deposits","Funds move from banks, where they fund credit, into reserves and T-bills, where they do not","Stablecoins cannot be used for payments at scale","Deposit insurance funds would become overcapitalised"],
 answer:1,explain:"It would tighten credit supply. This is a mainstream financial-stability concern, not a defensive argument banks invented."},

{id:"q6006",m:"m6",l:"m6l2",type:"mc",q:"Why do stablecoins keep winning adoption despite tokenised deposits being safer?",
 options:["They offer higher yields","Reach — bearer, public, deep liquidity, 24/7, cross-border","They are cheaper to issue","They face no compliance requirements"],
 answer:1,explain:"Tokenised deposits are usually restricted to one bank's clients or a closed consortium. Reach beats safety in adoption terms."},

{id:"q6007",m:"m6",l:"m6l3",type:"mc",q:"What did Project Agorá demonstrate in its May 2026 findings?",
 options:["That retail CBDC can replace cash","Atomic settlement of wholesale cross-border transactions using tokenised central bank reserves and tokenised commercial bank deposits, with finality, across currencies and jurisdictions","That stablecoins are safe for wholesale settlement","That permissionless chains are unsuitable for banking"],
 answer:1,explain:"It also announced a move to real-value testing, with the Bank of Canada joining in May 2026."},

{id:"q6008",m:"m6",l:"m6l3",type:"match",q:"Match each project to its sponsor.",
 pairs:[["Agorá","BIS with seven central banks"],["Ensemble","HKMA"],["Guardian","MAS"]],
 explain:"None of the three is trying to replace central bank money. All are making it programmable where tokenised assets settle."},

{id:"q6009",m:"m6",l:"m6l3",type:"mc",q:"What distinguishes Project Guardian from the others?",
 options:["It is the only one using a public blockchain","Industry-led pilots with real institutions across fixed income, FX and asset management","It focuses exclusively on retail payments","It has no central bank involvement"],
 answer:1,explain:"MAS has continued expanding its scope, alongside a 2026 pilot of tokenised government bills settled in wholesale CBDC."},

{id:"q6010",m:"m6",l:"m6l4",type:"mc",q:"What risk does atomic settlement eliminate?",
 options:["Market risk","Principal risk — delivering without being paid","Liquidity risk","Operational risk"],
 answer:1,explain:"Herstatt Bank's 1974 failure mid-settlement across time zones is the canonical example, and the reason CLS exists for FX."},

{id:"q6011",m:"m6",l:"m6l4",type:"match",q:"Match each settlement term to its meaning.",
 pairs:[["DvP","Delivery versus payment — security against cash"],["PvP","Payment versus payment — currency against currency"],["Atomic swap","The general case: both legs succeed or neither does"]],
 explain:"All three require both legs on the same ledger at the same moment, which is the hard part."},

{id:"q6012",m:"m6",l:"m6l4",type:"mc",q:"What does atomic settlement convert credit risk INTO?",
 options:["Market risk","Intraday liquidity risk","Operational risk","Reputational risk"],
 answer:1,explain:"Both parties must hold tokenised cash at that instant. Firms that netted at end of day now need funded positions in real time — a good trade, but a trade."},

{id:"q6013",m:"m6",l:"m6l4",type:"multi",q:"What does atomic settlement actually save? (Select all that apply)",
 answers:[0,1,2,3],options:["Principal risk on the settled leg","Collateral and margin held against settlement exposure","Intraday liquidity buffers","Failed trades and reconciliation breaks"],
 explain:"Intraday liquidity buffers in particular are a large, unglamorous and very real cost."},

{id:"q6014",m:"m6",l:"m6l5",type:"match",q:"Match each platform to what it does.",
 pairs:[["Partior","Interbank cross-border clearing and settlement"],["Fnality","Wholesale settlement in central-bank-backed money"],["Libeara","Tokenisation platform, MAS CMS licensed"],["Zodia Custody","Institutional digital asset custody"]],
 explain:"Partior and Fnality are live rails rather than pilots — an important distinction when reading announcements."},

{id:"q6015",m:"m6",l:"m6l5",type:"mc",q:"What licence did Libeara obtain in March 2026?",
 options:["An HKMA stablecoin issuer licence","A MAS Capital Markets Services licence","An FCA cryptoasset registration","An OCC national trust bank charter"],
 answer:1,explain:"MAS CMS licence, with more than $1bn on-chain. Libeara was incubated in SC Ventures."},

{id:"q6016",m:"m6",l:"m6l5",type:"mc",q:"What makes Zodia Custody a practical route to MiCA-compatible custody for EU funds?",
 options:["It is majority-owned by a bank","It is FCA-registered in the UK and authorised by Luxembourg's CSSF","It uses MPC rather than HSMs","It holds an OCC federal charter"],
 answer:1,explain:"The CSSF authorisation is the EU-facing part. Standard Chartered is majority owner, with SBI and Northern Trust as minority investors."},

{id:"q6017",m:"m6",l:"m6l5",type:"multi",q:"Which three distinct strategic plays are running simultaneously in settlement infrastructure? (Select all that apply)",
 answers:[0,1,2],options:["Consortium settlement networks (Partior, Fnality, SWIAT)","Single-institution platforms (JPMorgan, DBS)","Public-chain-native issuance (Securitize, Ondo, Libeara)","Retail CBDC issued directly by central banks"],
 explain:"None has won. The strategic question for an institution is which layers it owns and which it rents."},

{id:"q6018",m:"m6",l:"m6l1",type:"tf",q:"Tokenisation flattens the hierarchy of money by making all tokens equivalent.",
 answer:false,explain:"It reproduces the hierarchy. The projects that matter are the ones deliberately building each layer."},

{id:"q6019",m:"m6",l:"m6l2",type:"mc",q:"Under GENIUS, can a payment stablecoin pay interest to holders?",
 options:["Yes, without restriction","It is restricted","Only if the issuer is a bank","Only above a $10bn market cap"],
 answer:1,explain:"A tokenised deposit can pay interest; a payment stablecoin is restricted from doing so. That difference shapes competition between the two."},

{id:"q6020",m:"m6",l:"m6l3",type:"tf",q:"Project Agorá is designed to replace central bank money with a private settlement token.",
 answer:false,explain:"The opposite. It preserves settlement in central bank reserves while making them programmable — which is the most important structural fact about institutional digital assets in 2026."},

{id:"q6021",m:"m6",l:"m6l4",type:"mc",q:"Why is atomic settlement hard in practice?",
 options:["Blockchains are too slow","Both legs must be on the same ledger at the same moment, across institutions, currencies and jurisdictions","Smart contracts cannot handle two transfers","Regulators prohibit simultaneous settlement"],
 answer:1,explain:"Easy inside one system, hard across them — which is exactly why Agorá, Ensemble and Fnality exist."},

{id:"q6022",m:"m6",l:"m6l5",type:"mc",q:"When was Zodia Custody's custody business folded into Standard Chartered's Financing & Securities Services?",
 options:["April 2026","May 2026","July 2026","August 2026"],
 answer:1,explain:"May 2026, with Zodia Solutions carved out separately as the infrastructure business."},

{id:"q6023",m:"m6",l:"m6l2",type:"mc",q:"What is the likely endpoint for tokenised money?",
 options:["Stablecoins replace deposits entirely","Tokenised deposits for closed institutional flows, licensed stablecoins for open cross-border use, both settling into central bank money","Wholesale CBDC replaces both","Retail CBDC becomes dominant"],
 answer:1,explain:"Not one winning. This is precisely what the wholesale settlement architecture is building toward."},

{id:"q6024",m:"m6",l:"m6l1",type:"type",q:"What is the term for central bank money in tokenised form used for interbank settlement?",
 accept:["wholesale cbdc","wcbdc","wholesale central bank digital currency","wholesale central bank digital money"],
 hint:"Two words plus an acronym",
 explain:"Distinct from retail CBDC, which is politically fraught and in retreat in several jurisdictions."}
,
/* ============================ MODULE 7 ============================ */
{id:"q7001",m:"m7",l:"m7l1",type:"order",q:"Order the six layers of the tokenisation stack, from the bottom up.",
 items:["Asset and legal wrapper","Custody of the underlying","Register and transfer agent","Token contract","Distribution","Secondary liquidity and servicing"],
 explain:"Teams optimise layer 4 because it is the fun part, and under-invest in 1, 5 and 6 — which determine whether the product exists in any meaningful sense."},

{id:"q7002",m:"m7",l:"m7l1",type:"mc",q:"Where do most tokenisation projects actually die?",
 options:["At the token contract design stage","At distribution — a beautifully engineered token with no buyers","At the choice of blockchain","At the audit stage"],
 answer:1,explain:"A token with no distribution is a private placement with extra steps."},

{id:"q7003",m:"m7",l:"m7l1",type:"mc",q:"What makes Securitize more than a technology vendor?",
 options:["It operates its own blockchain","Expanded FINRA permissions covering custody of tokenised securities and atomic on-chain DvP with stablecoins","It is owned by BlackRock","It holds a banking charter"],
 answer:1,explain:"Someone must be legally responsible for the ownership record — issuing, redeeming, corporate actions, court orders. That is the transfer agent function."},

{id:"q7004",m:"m7",l:"m7l2",type:"multi",q:"Why did tokenised Treasuries work? (Select all that apply)",
 answers:[0,1,2,3],options:["The underlying is simple with an observable price","It yields, unlike idle stablecoins","It is immediately useful as transferable collateral","The buyer already existed — crypto-native institutions holding stablecoins"],
 explain:"All four. High-quality yield-bearing collateral that moves in seconds solves a real problem for trading firms and treasuries."},

{id:"q7005",m:"m7",l:"m7l2",type:"mc",q:"What is the honest limitation of tokenised Treasury growth so far?",
 options:["Regulatory prohibition in most jurisdictions","It has largely reallocated crypto-native balances rather than bringing new capital in","The yield is below the underlying T-bill","Custody solutions do not exist"],
 answer:1,explain:"The step change requires traditional allocators to accept on-chain records — a custody, accounting and mandate question, not a technology one."},

{id:"q7006",m:"m7",l:"m7l2",type:"match",q:"Match each tokenised Treasury product to its issuer or backer.",
 pairs:[["BUIDL","BlackRock"],["BENJI","Franklin Templeton"],["Libeara","SC Ventures"]],
 explain:"BlackRock issuing on public infrastructure changed institutional conversations more than the AUM did."},

{id:"q7007",m:"m7",l:"m7l3",type:"multi",q:"What is structurally broken in private credit that tokenisation addresses? (Select all that apply)",
 answers:[0,1,2,3],options:["Manual servicing on spreadsheets and email","Opaque, infrequent valuation","No secondary market","Slow, expensive LP reporting"],
 explain:"All four. The case for tokenised private credit is operational, not speculative — which is why it reached about $8bn."},

{id:"q7008",m:"m7",l:"m7l3",type:"multi",q:"What does tokenising private credit NOT fix? (Select all that apply)",
 answers:[0,1,2],options:["The illiquidity of the underlying loans","The difficulty of valuing private credit","The credit risk of the borrowers","The cost of servicing waterfalls"],
 explain:"Servicing is exactly what it does fix. A tradeable token on an untradeable portfolio creates the possibility of liquidity, not liquidity itself."},

{id:"q7009",m:"m7",l:"m7l3",type:"mc",q:"What is the transferable lesson from private credit's success?",
 options:["Tokenise the largest asset classes first","Rank candidates by servicing and reconciliation pain, not by market size","Only tokenise assets with daily pricing","Always use a public blockchain"],
 answer:1,explain:"Tokenisation adds most value where the operational burden is highest, not where the asset is most exciting."},

{id:"q7010",m:"m7",l:"m7l4",type:"order",q:"Order these tokenised equity structures from strongest to weakest holder position.",
 items:["Direct tokenised shares — the token is the share","Depositary receipt — a claim on segregated custodied shares","Synthetic exposure — an unsecured derivative claim on the issuer"],
 explain:"Ask 'if the issuer of this token fails, what do I own?' Synthetic exposure is frequently marketed as if it were the first structure."},

{id:"q7011",m:"m7",l:"m7l4",type:"mc",q:"Roughly how large was the tokenised equity market in 2026?",
 options:["About $250m","About $2.4bn","About $16bn","About $29bn"],
 answer:1,explain:"The smallest major category but the fastest-growing, up 20.4% in May 2026 alone."},

{id:"q7012",m:"m7",l:"m7l4",type:"mc",q:"What was the central tension in the tokenised equity case?",
 options:["The technology is not ready","The value proposition is strongest exactly where regulators are least equipped to supervise it","Custody is impossible for equities","Oracles cannot price equities"],
 answer:1,explain:"Developed markets already have excellent, cheap, liquid equity infrastructure. The appeal is greatest in markets with limited access."},

{id:"q7013",m:"m7",l:"m7l4",type:"tf",q:"In 2026 tokenised stocks began functioning as collateral in on-chain lending markets.",
 answer:true,explain:"The first time at any scale that DeFi collateral moved beyond crypto assets. The logic is symmetrical: DeFi needs institutional adoption, institutions need high-quality collateral."},

{id:"q7014",m:"m7",l:"m7l5",type:"multi",q:"Why does tokenised real estate keep failing? (Select all that apply)",
 answers:[0,1,2,3],options:["The legal wrapper, not the ledger, is the binding constraint","REITs already provide liquid fractional ownership","Valuation between transactions is unobservable","Token holders cannot govern a physical property"],
 explain:"Tokenisation has to beat a good incumbent product, not fill a gap in the market."},

{id:"q7015",m:"m7",l:"m7l5",type:"mc",q:"Which is NOT one of the five diagnostic questions for a tokenisation proposal?",
 options:["What named cost does the ledger remove?","Who is the buyer, and do they exist today?","Which blockchain has the highest throughput?","What does the incumbent product cost?"],
 answer:2,explain:"Throughput is almost never the constraint. The five are: named cost, existing buyer, legal wrapper, price source, incumbent comparison."},

{id:"q7016",m:"m7",l:"m7l5",type:"tf",q:"Making an asset transferable creates secondary market liquidity.",
 answer:false,explain:"Tradability is not liquidity. Most tokenised real estate has thin-to-nonexistent secondary trading despite being fully transferable."},

{id:"q7017",m:"m7",l:"m7l6",type:"mc",q:"Why does tokenised gold work relatively well?",
 options:["Gold has no price volatility","The underlying is fungible, storable, well-priced and already vaulted with established custody and audit practice","It is exempt from securities law everywhere","Central banks guarantee it"],
 answer:1,explain:"Essentially a bearer version of an existing allocated-gold product. Useful, and modest in size."},

{id:"q7018",m:"m7",l:"m7l6",type:"mc",q:"What is the obstacle to tokenised carbon credits?",
 options:["The technology cannot represent retirement","The fragmentation and credibility of the underlying credits themselves","Regulators prohibit tokenised carbon","Blockchains cannot handle the transaction volume"],
 answer:1,explain:"Tokenising a credit of questionable integrity produces a well-recorded questionable credit."},

{id:"q7019",m:"m7",l:"m7l6",type:"mc",q:"What legal change removed the blocker to digital bills of lading?",
 options:["MiCA","The UK Electronic Trade Documents Act","Basel SCO60","The GENIUS Act"],
 answer:1,explain:"Electronic transferable records legislation. What remains is a network coordination problem — carrier, shipper, both banks, insurer and port must all accept it."},

{id:"q7020",m:"m7",l:"m7l6",type:"mc",q:"Why is collateral mobility for tokenised fund units promising?",
 options:["Fund units are the largest asset class","It removes a full redeem-move-repurchase cycle when posting margin","It eliminates counterparty risk entirely","Regulators mandate it from 2027"],
 answer:1,explain:"Currently an investor sells the fund, moves cash and buys back in. Making the unit itself postable removes that friction — and privacy-preserving institutional networks have found real traction here."},

{id:"q7021",m:"m7",l:"m7l6",type:"mc",q:"What is the pattern across the tokenisation long tail?",
 options:["It succeeds where the asset is largest","It succeeds where the binding constraint is record-keeping and fails where it is valuation, governance or demand","It succeeds only on permissioned networks","It succeeds only with regulatory mandate"],
 answer:1,explain:"Sort any proposal by that test before anything else."},

{id:"q7022",m:"m7",l:"m7l1",type:"mc",q:"What does the legal wrapper determine?",
 options:["Which blockchain to use","Investor rights, jurisdiction, tax treatment and what happens in insolvency","The token's gas efficiency","The oracle provider"],
 answer:1,explain:"Get this wrong and nothing built on top of it matters."},

{id:"q7023",m:"m7",l:"m7l4",type:"mc",q:"What did Uniswap's Permissioned Pools enable for tokenised equities in 2026?",
 options:["Zero-fee trading","Issuers enforcing investor eligibility on-chain while using public AMM infrastructure","Guaranteed liquidity provision","Regulatory approval in the EU"],
 answer:1,explain:"Introduced July 2026 for tokenised funds, equities and other regulated assets."},

{id:"q7024",m:"m7",l:"m7l2",type:"type",q:"What is the largest tokenised RWA category, and roughly what was it worth by mid-2026? Name the category.",
 accept:["treasuries","tokenised treasuries","tokenized treasuries","treasury","us treasuries","t-bills"],
 hint:"Around $15–16bn",
 explain:"Roughly $15–16bn across around 100 assets, with 16 products holding more than $100m each."},

/* ============================ MODULE 8 ============================ */
{id:"q8001",m:"m8",l:"m8l1",type:"mc",q:"Why do fiduciaries require a qualified custodian rather than self-custody?",
 options:["Self-custody is illegal for institutions","They need segregation, audit, insurance and clear bankruptcy-remoteness","Self-custody cannot support staking","Regulators mandate a specific technology"],
 answer:1,explain:"Self-custody is viable for a treasury with real security engineering, but not for someone managing client assets."},

{id:"q8002",m:"m8",l:"m8l1",type:"mc",q:"What lesson did FTX establish about exchange custody?",
 options:["Exchanges should not offer derivatives","Concentrating assets at a trading venue is an insolvency risk, not just a slogan","Exchanges need better matching engines","Offshore exchanges are always unsafe"],
 answer:1,explain:"Institutional practice since has moved decisively toward keeping assets away from venues, using off-exchange settlement to trade without depositing."},

{id:"q8003",m:"m8",l:"m8l1",type:"match",q:"Match each custodian to its distinguishing feature.",
 pairs:[["Anchorage Digital","The only OCC federal bank charter in crypto"],["Fireblocks","A closed network of 2,000+ connected counterparties"],["Zodia Custody","FCA-registered and CSSF-authorised, majority-owned by Standard Chartered"]],
 explain:"Fireblocks is technically wallet infrastructure with custodial features rather than a chartered custodian."},

{id:"q8004",m:"m8",l:"m8l2",type:"mc",q:"What is the key security difference between MPC and an HSM?",
 options:["MPC uses stronger encryption","MPC never assembles a complete key anywhere; an HSM assembles one internally at signing time","HSMs cannot be certified","MPC works only on Ethereum"],
 answer:1,explain:"With MPC there is no single moment or place where the whole key exists — so compromising one share yields nothing."},

{id:"q8005",m:"m8",l:"m8l2",type:"multi",q:"What are advantages of MPC over on-chain multi-signature? (Select all that apply)",
 answers:[0,1,2],options:["The signature appears on-chain as an ordinary signature, so it works on any chain","Shares can be refreshed without changing the address","The policy is not publicly visible on-chain","It is easier to certify under FIPS standards"],
 explain:"Certification is where MPC is weaker — it is newer cryptography and implementation-sensitive."},

{id:"q8006",m:"m8",l:"m8l2",type:"mc",q:"What actually makes custody 'institutional'?",
 options:["Cold storage in geographically distributed vaults","The policy engine: limits, allow-lists, delays, dual authorisation and screening enforced before signing","Insurance coverage","Support for the largest number of chains"],
 answer:1,explain:"The technology tier is the easy part. Once the signature exists it is too late."},

{id:"q8007",m:"m8",l:"m8l3",type:"mc",q:"What is structurally unusual about a centralised crypto exchange?",
 options:["It uses an order book","One entity is simultaneously exchange, broker, custodian and clearing house","It operates 24/7","It lists many assets"],
 answer:1,explain:"A combination prohibited in regulated equity markets — and exactly what made FTX possible."},

{id:"q8008",m:"m8",l:"m8l3",type:"mc",q:"What is impermanent loss?",
 options:["Gas fees lost on failed transactions","The loss a liquidity provider suffers when pooled asset prices diverge, relative to simply holding","Value extracted by MEV searchers","The cost of bridging assets between chains"],
 answer:1,explain:"It is the core economic risk of providing liquidity to an automated market maker."},

{id:"q8009",m:"m8",l:"m8l3",type:"multi",q:"What does the missing clearing layer cost crypto markets? (Select all that apply)",
 answers:[0,1,2,3],options:["Fragmented liquidity with no consolidated tape","Pre-funding, leaving capital idle at each venue","No cross-venue netting or portfolio margining","Counterparty risk at every venue instead of mutualised at a CCP"],
 explain:"Off-exchange settlement is the pragmatic workaround and the fastest-growing institutional service."},

{id:"q8010",m:"m8",l:"m8l4",type:"mc",q:"What did spot crypto ETFs actually unlock?",
 options:["Cheaper access to the underlying asset","Exposure without operational barriers, and critically without needing new mandate approval","On-chain participation for pension funds","Regulated custody for the first time"],
 answer:1,explain:"A pension fund that cannot hold Bitcoin can very often hold an ETF. The mandate question is the real unlock."},

{id:"q8011",m:"m8",l:"m8l4",type:"mc",q:"How much did US spot Bitcoin and Ethereum ETFs take in during the week of 17–21 August 2026?",
 options:["$697m","$1.1bn","$2.62bn","$5.4bn"],
 answer:2,explain:"$2.62bn combined — the strongest week of 2026. Bitcoin ETFs alone drew $1.92bn, a 2026 record; Ethereum ETFs $697m, a YTD high."},

{id:"q8012",m:"m8",l:"m8l4",type:"mc",q:"Roughly what share of Bitcoin ETF inflows went to BlackRock's IBIT?",
 options:["About 25%","About 45%","About 60%","About 80%"],
 answer:3,explain:"Extreme concentration in a single product — a sign of large allocators using the most liquid instrument rather than a broad retail bid."},

{id:"q8013",m:"m8",l:"m8l4",type:"mc",q:"How should you read strong ETF inflows combined with subdued trading volumes?",
 options:["A speculative bubble forming","Allocation rather than speculation — money arriving to sit, not to trade","Market makers withdrawing liquidity","Imminent redemption pressure"],
 answer:1,explain:"A healthier structural signal than a volume-driven rally."},

{id:"q8014",m:"m8",l:"m8l4",type:"tf",q:"ETFs brought institutional investors on-chain.",
 answer:false,explain:"An ETF holder never touches a wallet, a stablecoin or tokenised settlement. ETFs solved exposure; usage is an entirely separate problem with a separate timeline."},

{id:"q8015",m:"m8",l:"m8l5",type:"multi",q:"What complications does staking create for custodians? (Select all that apply)",
 answers:[0,1,2,3],options:["Who bears slashing losses","Unbonding queues creating liquidity mismatch","Securities characterisation of staking-as-a-service","Whether segregation and liens survive assets being bonded"],
 explain:"Bonded assets are encumbered. Whether custody arrangements survive that is a real legal question, not a theoretical one."},

{id:"q8016",m:"m8",l:"m8l5",type:"mc",q:"What does liquid staking solve, and what does it introduce?",
 options:["Solves slashing; introduces gas costs","Solves the liquidity mismatch; introduces smart-contract and provider-concentration risk","Solves securities classification; introduces custody risk","Solves oracle dependence; introduces bridge risk"],
 answer:1,explain:"The receipt token can also trade below the underlying in stress."},

{id:"q8017",m:"m8",l:"m8l5",type:"mc",q:"Why does over-collateralised lending not extend credit in any meaningful economic sense?",
 options:["Interest rates are too high","Borrowers post more value than they receive, so no credit assessment or credit extension occurs","Loans are too short-dated","It is prohibited by regulation"],
 answer:1,explain:"Under-collateralised on-chain lending requires identity and enforceability — the frontier permissioned tokenised-collateral markets are working on."},

{id:"q8018",m:"m8",l:"m8l1",type:"mc",q:"Roughly how large was the digital asset custody market in 2026 by assets under custody?",
 options:["About $95bn","About $683bn","About $953bn","About $4.4 trillion"],
 answer:2,explain:"About $953.5bn in 2026, up from $683.4bn in 2024, growing at a projected CAGR in the low twenties."},

{id:"q8019",m:"m8",l:"m8l2",type:"order",q:"Order these custody tiers from most accessible to most protected.",
 items:["Hot wallet for operations","Warm tier with tighter controls","Cold storage, offline and geographically distributed"],
 explain:"But the tiering is the easy part — the policy engine governing what gets signed is what matters."},

{id:"q8020",m:"m8",l:"m8l3",type:"mc",q:"What is the main risk of an automated market maker for a large institutional trade?",
 options:["The venue may become insolvent","Fully transparent order flow enables MEV extraction against the trade","The smart contract cannot handle large sizes","Settlement takes several days"],
 answer:1,explain:"AMMs remove venue custody risk but expose order flow. Institutions use private order flow or batch auctions to mitigate."},

{id:"q8021",m:"m8",l:"m8l5",type:"mc",q:"What was 2026's structural shift in DeFi collateral?",
 options:["Stablecoins replaced crypto as the primary collateral","Tokenised Treasuries, funds and equities began being accepted as collateral","Collateral requirements were removed","Central banks began accepting crypto collateral"],
 answer:1,explain:"DeFi needs institutional adoption to grow, and institutions need high-quality collateral. The move beyond crypto-only collateral is the point."},

{id:"q8022",m:"m8",l:"m8l1",type:"tf",q:"An omnibus custody account and a segregated account give a client the same protection in the custodian's insolvency.",
 answer:false,explain:"Segregation is one of the key questions to ask, alongside which licence, whose balance sheet, and what happens if the custodian fails."},

{id:"q8023",m:"m8",l:"m8l2",type:"mc",q:"What is the weakness of an HSM as a custody technology?",
 options:["It cannot be audited","At signing time a single complete key exists inside one device — a single point of failure and a physical DR dependency","It only supports Bitcoin","It cannot enforce transaction limits"],
 answer:1,explain:"HSMs are mature and certifiable, which is why they remain widely used despite this."},

{id:"q8024",m:"m8",l:"m8l3",type:"tf",q:"Off-exchange settlement lets an institution trade on a venue while assets remain with a qualified custodian.",
 answer:true,explain:"A pragmatic workaround for the missing clearing layer, and the fastest-growing institutional service."}
,
/* ============================ MODULE 9 ============================ */
{id:"q9001",m:"m9",l:"m9l1",type:"mc",q:"When did the Basel SCO60 crypto-asset standard take effect?",
 options:["1 January 2025","1 January 2026","1 July 2026","18 January 2027"],
 answer:1,explain:"Originally set for 1 January 2025 and deferred by a year in May 2024."},

{id:"q9002",m:"m9",l:"m9l1",type:"match",q:"Match each SCO60 group to what it contains.",
 pairs:[["Group 1a","Tokenised traditional assets"],["Group 1b","Stablecoins meeting the redemption risk test"],["Group 2a","Meets hedging recognition criteria; modified market risk treatment"],["Group 2b","Everything else — 1250% risk weight"]],
 explain:"Group 1 is treated broadly like the conventional equivalent. Group 2b is treated as an immediate total loss for capital purposes."},

{id:"q9003",m:"m9",l:"m9l1",type:"mc",q:"What does a 1250% risk weight mean in practice at an 8% minimum capital ratio?",
 options:["Capital equal to 12.5% of the exposure","Capital equal to the full exposure","A prohibition on holding the asset","A 12.5x leverage limit"],
 answer:1,explain:"Hold $100 of the asset, hold $100 of capital. On top of that sits an exposure limit as a share of Tier 1 capital."},

{id:"q9004",m:"m9",l:"m9l1",type:"mc",q:"What did the July 2024 Basel amendments tighten?",
 options:["The definition of a bank","Conditions for stablecoins to receive preferential Group 1b treatment, focused on reserve asset quality and liquidity","The leverage ratio","Operational risk capital"],
 answer:1,explain:"They also added due diligence obligations and a more granular disclosure template. A bank cannot simply accept an issuer's claim about its reserve."},

{id:"q9005",m:"m9",l:"m9l1",type:"mc",q:"Why is SCO60 described as having shaped the industry's structure?",
 options:["It banned crypto trading by banks","It made Group 1 activity viable and Group 2 balance-sheet exposure uneconomic, pushing banks into custody, tokenisation and settlement","It required banks to issue stablecoins","It harmonised rules across all jurisdictions"],
 answer:1,explain:"The rulebook, not risk appetite, is why banks build custody and settlement businesses rather than trading books."},

{id:"q9006",m:"m9",l:"m9l1",type:"tf",q:"Basel standards become binding law automatically in member jurisdictions.",
 answer:false,explain:"They are not law until implemented. A clear EU/US split on prudential crypto rules has already emerged, creating arbitrage a global bank must manage."},

{id:"q9007",m:"m9",l:"m9l2",type:"mc",q:"What are the FATF Travel Rule thresholds?",
 options:["$1,000 in the US and $3,000 elsewhere","$3,000 in the US and $1,000 in most other jurisdictions","$10,000 everywhere","There is no threshold"],
 answer:1,explain:"Above the threshold, originator and beneficiary information must be collected, verified and transmitted between VASPs."},

{id:"q9008",m:"m9",l:"m9l2",type:"multi",q:"Why is the Travel Rule harder for crypto than for wire transfers? (Select all that apply)",
 answers:[0,1,2,3],options:["Blockchains carry no identity field, so data needs a separate compatible channel","Transfers to self-hosted wallets have no institution on the other side","Determining which institution controls an address is inference, not lookup","Jurisdictions implemented at different times — the sunrise problem"],
 explain:"All four remain live problems in 2026."},

{id:"q9009",m:"m9",l:"m9l2",type:"mc",q:"When did FATF adopt revisions to Recommendation 16, and by when is implementation expected?",
 options:["June 2025, implementation by end of 2030","July 2024, implementation by end of 2027","January 2026, implementation by end of 2028","August 2026, implementation by end of 2032"],
 answer:0,explain:"A long runway, which tells you how hard the international coordination problem is."},

{id:"q9010",m:"m9",l:"m9l2",type:"mc",q:"Where must Travel Rule compliance be enforced architecturally?",
 options:["In the block explorer","In the policy engine, before signing","At the exchange listing stage","In the smart contract itself"],
 answer:1,explain:"Same architectural point as custody controls: a transfer that breaches it cannot be recalled once broadcast."},

{id:"q9011",m:"m9",l:"m9l3",type:"mc",q:"Why are public blockchains in some respects MORE traceable than cash?",
 options:["Wallets require government ID","Every transaction is permanently visible to everyone","Transaction amounts are reported to regulators automatically","Addresses expire after a period"],
 answer:1,explain:"Pseudonymous, not anonymous. Analytics firms cluster addresses into entities and trace flows across hops."},

{id:"q9012",m:"m9",l:"m9l3",type:"mc",q:"What makes sanctions screening structurally hard on-chain?",
 options:["Sanctions lists are not published","You cannot refuse an incoming transfer — anyone can send to your address","Addresses cannot be designated by OFAC","Screening tools do not exist"],
 answer:1,explain:"Receiving tainted funds is not a choice, so institutions need a documented handling procedure for it."},

{id:"q9013",m:"m9",l:"m9l3",type:"mc",q:"What unresolved question did the Tornado Cash designation raise?",
 options:["Whether mixers improve privacy","What it means to sanction an autonomous smart contract that nobody controls","Whether OFAC can designate foreign entities","Whether analytics tools are admissible evidence"],
 answer:1,explain:"The litigation left a set of unresolved questions about immutable software and sanctions law."},

{id:"q9014",m:"m9",l:"m9l3",type:"mc",q:"What could zero-knowledge proofs offer institutions?",
 options:["Faster block times","Proving a statement — eligibility, solvency, compliance — without revealing the underlying data","Immunity from the Travel Rule","Guaranteed settlement finality"],
 answer:1,explain:"It is central to why institutions look at ZK rollups beyond scaling — and it is the technology that makes supervision hardest."},

{id:"q9015",m:"m9",l:"m9l3",type:"tf",q:"Blockchain analytics attribution is definitive rather than inferential.",
 answer:false,explain:"These are inference engines using clustering heuristics. They are wrong sometimes, which matters when a false positive freezes a client."},

{id:"q9016",m:"m9",l:"m9l4",type:"mc",q:"What did the FASB's crypto assets standard change for US GAAP?",
 options:["It required crypto to be held off balance sheet","It replaced indefinite-lived intangible treatment with fair value measurement through net income","It prohibited corporates from holding crypto","It required daily audit of holdings"],
 answer:1,explain:"Previously holders wrote down on any price fall and never wrote up until sale. A rare case of an accounting change directly enabling a market."},

{id:"q9017",m:"m9",l:"m9l4",type:"multi",q:"Which create real tax friction for digital assets? (Select all that apply)",
 answers:[0,1,2,3],options:["Crypto-to-crypto exchanges are usually taxable disposals","Staking rewards are generally income on receipt, at a value that may be hard to establish","Stablecoin payments can trigger gain or loss on every transaction","VAT/GST treatment of token services varies and is often unsettled"],
 explain:"The stablecoin point is a real friction for payment use cases specifically."},

{id:"q9018",m:"m9",l:"m9l4",type:"mc",q:"Why is a proof of reserves not a solvency statement?",
 options:["It cannot be independently verified","It typically demonstrates assets while saying nothing about liabilities","It is only valid for one block","Regulators do not accept it"],
 answer:1,explain:"It has nonetheless been marketed as one. Reserve attestations are agreed-upon-procedures engagements, weaker than a full audit."},

{id:"q9019",m:"m9",l:"m9l4",type:"mc",q:"How does an auditor verify ownership of on-chain assets?",
 options:["By inspecting the private key directly","Via a signed message or a controlled test transaction proving control without exposing the key","By requesting confirmation from the blockchain operator","Ownership cannot be audited"],
 answer:1,explain:"Existence is easy — the ledger is public. Ownership and valuation are the harder parts."},

{id:"q9020",m:"m9",l:"m9l5",type:"order",q:"Order these risk categories by realised loss, largest first.",
 items:["Key and access-control compromise","Bridge exploits","Smart-contract vulnerabilities","Consensus-level failure"],
 explain:"Intuition ranks these badly. Consensus failure on major networks is vanishingly rare and disproportionately worried about."},

{id:"q9021",m:"m9",l:"m9l5",type:"mc",q:"What was the actual cause of the 2022 exchange, lender and fund failures?",
 options:["Smart contract exploits","Leverage, rehypothecation and absent segregation — not technology","Consensus failures on major chains","Oracle manipulation"],
 answer:1,explain:"Traditional credit analysis would have caught most of it. It was not a technology failure at all."},

{id:"q9022",m:"m9",l:"m9l5",type:"mc",q:"How should you treat an 'audited' smart contract?",
 options:["As warranted secure by the auditor","As a point-in-time opinion — necessary and nowhere near sufficient","As equivalent to formal verification","As requiring no further controls"],
 answer:1,explain:"Multiple independent audits, formal verification for high-value logic, bug bounties, upgrade timelocks and staged value caps are the fuller answer."},

{id:"q9023",m:"m9",l:"m9l5",type:"mc",q:"What is the genuinely new property that digital asset risk introduces?",
 options:["Cryptographic complexity","Irreversibility, which removes the recovery step existing control frameworks assume exists","Twenty-four hour markets","Cross-border reach"],
 answer:1,explain:"That is why controls must move to the pre-signature stage. Everything else is a familiar risk category in unfamiliar clothing."},

{id:"q9024",m:"m9",l:"m9l5",type:"multi",q:"Which mitigate operational error on irreversible transfers? (Select all that apply)",
 answers:[0,1,2,3],options:["Address allow-lists","Test transactions","Transaction simulation before signing","Human-readable transaction previews"],
 explain:"Wrong address, wrong chain, wrong decimal precision, wrong token contract — all irreversible by design."},

{id:"q9025",m:"m9",l:"m9l1",type:"type",q:"What is the Basel Committee's standard covering bank cryptoasset exposures?",
 accept:["sco60","sco 60","sco-60"],
 hint:"Three letters and two digits",
 explain:"Effective 1 January 2026, and the single most consequential document for a bank's digital asset strategy."},

{id:"q9026",m:"m9",l:"m9l2",type:"tf",q:"A VASP can satisfy the Travel Rule using data fields carried in the blockchain transaction itself.",
 answer:false,explain:"A blockchain transaction carries an address and an amount. Identifying data must travel over an entirely separate, compatible channel."},

/* ============================ MODULE 10 ============================ */
{id:"q10001",m:"m10",l:"m10l1",type:"mc",q:"What single sentence best summarises 2026?",
 options:["Crypto went mainstream and replaced traditional finance","The regulatory perimeter closed, the cost constraint lifted, stablecoins scaled, tokenisation found two real products, and the rest are coordination problems","Institutional adoption stalled and capital left the sector","Central banks launched retail CBDCs and displaced stablecoins"],
 answer:1,explain:"Interoperability, liquidity fragmentation, and four jurisdictions running four different clocks."},

{id:"q10002",m:"m10",l:"m10l1",type:"mc",q:"What replaced throughput as the binding constraint in 2026?",
 options:["Regulatory uncertainty","Fragmentation and interoperability","Custody capacity","Energy costs"],
 answer:1,explain:"Fusaka lifted the cost constraint. Reaching buyers on other networks is now the problem."},

{id:"q10003",m:"m10",l:"m10l2",type:"order",q:"Put these 2026 regulatory milestones in chronological order.",
 items:["Basel SCO60 effective (1 Jan)","OCC GENIUS proposed rule (25 Feb)","First HK stablecoin licences (10 Apr)","MiCA fully in force (1 Jul)","GENIUS rulemaking deadline missed (18 Jul)"],
 explain:"Five dates that shaped the year. The GENIUS miss pushed the effective date to 18 January 2027."},

{id:"q10004",m:"m10",l:"m10l2",type:"mc",q:"What happens in the UK in September 2026 and October 2027 respectively?",
 options:["Sandbox opens; sandbox closes","Cryptoasset authorisation gateway opens; full regime goes live","Stablecoin licences granted; MiCA equivalence agreed","FCA consultation opens; Bank of England issues CBDC"],
 answer:1,explain:"The FCA's roadmap: applications from September 2026, full authorisation regime live October 2027."},

{id:"q10005",m:"m10",l:"m10l2",type:"mc",q:"When is the GENIUS Act's effective date?",
 options:["18 July 2026","15 September 2026","18 January 2027","October 2027"],
 answer:2,explain:"Eighteen months after the July 2025 enactment, because the rulemaking deadline was missed."},

{id:"q10006",m:"m10",l:"m10l3",type:"mc",q:"What would the CLARITY Act do?",
 options:["Create a federal stablecoin issuer regime","Give the CFTC exclusive jurisdiction over digital commodity spot markets while the SEC retains investment contract assets","Implement Basel SCO60 in US law","Establish a US retail CBDC"],
 answer:1,explain:"It also introduces a mechanism to certify an asset as sufficiently decentralised to move from the securities to the commodity perimeter."},

{id:"q10007",m:"m10",l:"m10l3",type:"mc",q:"What was the CLARITY Act's status as of late August 2026?",
 options:["Signed into law","Passed the House in July 2025 and cleared Senate Banking in May 2026, but not the Senate floor; cloture vote set for 15 September","Defeated in the Senate","Never introduced in the Senate"],
 answer:1,explain:"The cloture vote on the motion to proceed requires 60 votes to overcome a filibuster."},

{id:"q10008",m:"m10",l:"m10l3",type:"mc",q:"Even if CLARITY passes, when would most operational provisions take effect?",
 options:["Immediately","Within 90 days","Late 2027, after implementing rules are written","2030"],
 answer:2,explain:"Registration and maturity-certification rules require regulator rulemaking. GENIUS is the object lesson: enactment is not effectiveness."},

{id:"q10009",m:"m10",l:"m10l3",type:"mc",q:"Why do US classification choices propagate globally?",
 options:["Other jurisdictions are legally bound by them","The US is the largest capital market and issues the currency behind ~99% of stablecoins","FATF requires it","Basel defers to US rules"],
 answer:1,explain:"Effects travel through listing decisions, custody arrangements and index inclusion — and deadlock keeps activity offshore."},

{id:"q10010",m:"m10",l:"m10l4",type:"multi",q:"Which are the five questions for judging any new proposal? (Select all that apply)",
 answers:[0,1,2,3],options:["What named cost does this remove?","Who is the buyer, and do they exist today?","What is the trust structure?","Which regulatory perimeter does it sit in, in which jurisdictions?"],
 explain:"The fifth is: what is the incumbent, and is this meaningfully better?"},

{id:"q10011",m:"m10",l:"m10l4",type:"mc",q:"Which answers should you reject to 'what cost does this remove'?",
 options:["Reconciliation and settlement lag","Transparency, efficiency and innovation","Manual servicing","Collateral immobility"],
 answer:1,explain:"Those are not costs. The others are named, measurable and defensible."},

{id:"q10012",m:"m10",l:"m10l4",type:"mc",q:"Why do stablecoins win in emerging-market corridors but tokenised equities struggle in the US?",
 options:["Regulation is lighter in emerging markets","Location matters more than technology — the incumbent is bad in one case and excellent in the other","Emerging markets have better infrastructure","US investors are more risk-averse"],
 answer:1,explain:"Correspondent banking is genuinely bad in specific corridors; US equity settlement is genuinely good."},

{id:"q10013",m:"m10",l:"m10l5",type:"mc",q:"Which open question do central banks care about most?",
 options:["Whether Ethereum can scale further","Whether large-scale deposit substitution into stablecoins pulls funding away from credit provision","Whether NFTs recover","Whether ZK proofs are cryptographically sound"],
 answer:1,explain:"The banking system's response — issue your own or lose the flow — is already visible in the Hong Kong licensees."},

{id:"q10014",m:"m10",l:"m10l5",type:"mc",q:"What is the first real test of non-USD stablecoin viability?",
 options:["The EU's digital euro pilot","The H2 2026 HKD stablecoin launches by HSBC and Anchorpoint","Singapore's SGD stablecoin framework","The UK sandbox cohort"],
 answer:1,explain:"Watch whether they find genuine domestic demand rather than policy sponsorship."},

{id:"q10015",m:"m10",l:"m10l5",type:"mc",q:"Why does the privacy-versus-supervision question matter so much?",
 options:["It determines transaction costs","If solved, public infrastructure becomes viable for far more institutional activity; if not, permissioned networks persist indefinitely","It affects only retail users","It determines Basel capital treatment"],
 answer:1,explain:"Institutions cannot publish positions; regulators cannot supervise what they cannot see. No regulator has blessed ZK compliance at scale."},

{id:"q10016",m:"m10",l:"m10l5",type:"multi",q:"Where would the next systemic failure most plausibly originate? (Select all that apply)",
 answers:[0,1,2,3],options:["Stablecoin issuers","A handful of large custodians","Oracle networks","A few very large ETFs"],
 explain:"That is where the current build-out concentrates value. Every cycle has had a failure that reset the regulatory conversation."},

{id:"q10017",m:"m10",l:"m10l5",type:"mc",q:"How is interoperability most likely to be resolved, based on market infrastructure history?",
 options:["Through open standards alone","Either through standards and messaging protocols, or by one network accumulating enough liquidity that the question stops mattering","Through regulatory mandate","It will not be resolved"],
 answer:1,explain:"History in market infrastructure favours the second more often than practitioners like to admit."},

{id:"q10018",m:"m10",l:"m10l1",type:"mc",q:"Where does tokenised RWA demand still come from, predominantly?",
 options:["Pension funds and insurers","Reallocation of crypto-native balances","Retail investors","Sovereign wealth funds"],
 answer:1,explain:"The step change requires traditional allocators to hold on-chain records — a custody, accounting and mandate problem."},

{id:"q10019",m:"m10",l:"m10l4",type:"mc",q:"What replaces 'is it decentralised' as the useful question?",
 options:["Is it audited?","What is the trust structure — name the parties and what happens if each fails","How many users does it have?","Which chain is it on?"],
 answer:1,explain:"Issuer, custodian, oracle, upgrade admin, bridge operator, transfer agent. Every real product has a list; good ones publish it."},

{id:"q10020",m:"m10",l:"m10l2",type:"mc",q:"What did the BIS announce on 27 May 2026?",
 options:["A global stablecoin ban","Project Agorá findings, a move to real-value testing, and the Bank of Canada joining","The launch of a BIS-operated blockchain","New Basel capital rules for crypto"],
 answer:1,explain:"Moving from prototype to real value is the clearest signal of institutional seriousness in the whole field."},

{id:"q10021",m:"m10",l:"m10l1",type:"mc",q:"What did Basel SCO60, live since 1 January 2026, effectively fix?",
 options:["Which chains banks may use","The shape of what banks will and will not hold on balance sheet","Stablecoin reserve composition globally","Custody licensing requirements"],
 answer:1,explain:"Group 1 activity is viable; Group 2 exposure is not. That is why banks build rails rather than trading books."},

{id:"q10022",m:"m10",l:"m10l4",type:"mc",q:"What is the meta-point of the assessment framework?",
 options:["Technology determines outcomes","The questions that separate real projects from theatre are ordinary finance questions","Regulation is the only thing that matters","Market size predicts success"],
 answer:1,explain:"Technology changes what is possible. It never changes what makes a business work."},

{id:"q10023",m:"m10",l:"m10l2",type:"tf",q:"FATF's revised Recommendation 16 is expected to be fully implemented by the end of 2030.",
 answer:true,explain:"A long runway that reflects how hard international coordination on the Travel Rule has proven."},

{id:"q10024",m:"m10",l:"m10l5",type:"mc",q:"What should you watch to see what is actually happening rather than what is being announced?",
 options:["Token prices and social media sentiment","Rulemaking dockets, BIS and central bank publications, MiCA review outputs, and RWA and stablecoin supply data","Exchange listing announcements","Venture funding rounds"],
 answer:1,explain:"Watch the rulemaking, not the headline. GENIUS is the object lesson."}

];
