/* Bundled course — validate with tools/validate-course.py before committing. */
(window.DA_BUNDLED = window.DA_BUNDLED || []).push(
{
  "id": "trade-finance",
  "title": "Trade Finance Basics",
  "subtitle": "Instruments, risk and who pays when it goes wrong",
  "icon": "▤",
  "source": {
    "kind": "bundled",
    "note": "written 2026-08-30"
  },
  "modules": [
    {
      "id": "m1",
      "title": "Letters of credit",
      "tagline": "The instrument everything else refers to",
      "icon": "▤",
      "summary": "How a letter of credit substitutes a bank's promise for a buyer's, and where that leaves each party.",
      "outcomes": [
        "Name the four parties and what each owes",
        "Say why banks examine documents rather than goods"
      ],
      "lessons": [
        {
          "id": "m1l1",
          "title": "The four parties",
          "minutes": 7,
          "body": "<p>A letter of credit replaces a buyer's promise to pay with a <strong>bank's</strong> promise to pay. That single substitution is the whole product.</p><h4>Who is who</h4><ul><li><strong>Applicant</strong> — the buyer, who asks its bank to issue the credit</li><li><strong>Issuing bank</strong> — takes on the obligation to pay</li><li><strong>Beneficiary</strong> — the seller, entitled to be paid</li><li><strong>Advising or confirming bank</strong> — the seller's bank, which may add its own promise</li></ul><p>The seller no longer carries the buyer's credit risk. It carries the issuing bank's, which is usually a great deal better and, more importantly, assessable.</p><div class=\"callout\">The credit is a separate contract from the sale. A dispute about the goods does not by itself excuse the bank from paying.</div>",
          "key": [
            "A credit substitutes bank risk for buyer risk",
            "The credit is independent of the underlying sale contract"
          ]
        },
        {
          "id": "m1l2",
          "title": "Documents, not goods",
          "minutes": 7,
          "body": "<p>Banks deal in documents. Nobody at the issuing bank inspects the cargo, and nothing in the credit obliges them to.</p><h4>What this means in practice</h4><p>The bank pays when the documents presented match the credit's terms on their face. If they match, it pays even where the goods turn out to be defective. If they do not match, it may refuse even where the goods are perfect.</p><h4>Discrepancies</h4><p>A mismatch between the documents and the credit is a <strong>discrepancy</strong>, and discrepancies are the ordinary failure mode of the instrument — a date out by a day, a description that does not read the same, an insurance certificate for the wrong amount.</p><p>Most are curable if there is time before the credit expires. That is why presentation deadlines matter more than they look.</p>",
          "key": [
            "Payment turns on documentary compliance, not on the goods",
            "Discrepancies are the normal failure, and most are curable if caught early"
          ]
        }
      ]
    },
    {
      "id": "m2",
      "title": "Guarantees and standbys",
      "tagline": "Promises that pay on demand",
      "icon": "◆",
      "summary": "Demand guarantees and standby letters of credit, and why the difference between demand and conditional decides who has to sue whom.",
      "outcomes": [
        "Distinguish a demand guarantee from a conditional one",
        "Explain why the distinction decides who bears the cost of a dispute"
      ],
      "lessons": [
        {
          "id": "m2l1",
          "title": "Demand guarantees",
          "minutes": 7,
          "body": "<p>A <strong>demand guarantee</strong> pays on presentation of a compliant demand. The beneficiary does not have to prove the other side actually defaulted.</p><h4>Why that matters</h4><p>Under a conditional guarantee, the beneficiary must establish default before it sees any money — so it funds the dispute and waits. Under a demand guarantee it is paid first, and the applicant must sue to get the money back.</p><p>The instrument does not change who is right. It changes <em>who is out of pocket while that is being decided</em>, which in a long dispute is most of the commercial substance.</p><div class=\"callout\">Ask of any guarantee: who holds the cash while the argument runs? That, not the label, is what has been negotiated.</div>",
          "key": [
            "A demand guarantee pays without proof of default",
            "The real negotiation is over who funds the dispute"
          ]
        }
      ]
    }
  ],
  "questions": [
    {
      "id": "q1",
      "m": "m1",
      "l": "m1l1",
      "type": "mc",
      "q": "What does a letter of credit fundamentally substitute?",
      "options": [
        "Goods for money",
        "A bank's promise to pay for the buyer's",
        "Insurance for inspection",
        "A guarantee for a bond"
      ],
      "answer": 1,
      "explain": "The seller stops carrying the buyer's credit risk and starts carrying the issuing bank's."
    },
    {
      "id": "q2",
      "m": "m1",
      "l": "m1l1",
      "type": "tf",
      "q": "The applicant under a letter of credit is the seller.",
      "answer": false,
      "explain": "The applicant is the buyer. The seller is the beneficiary."
    },
    {
      "id": "q3",
      "m": "m1",
      "l": "m1l1",
      "type": "match",
      "q": "Match each party to its role.",
      "pairs": [
        [
          "Applicant",
          "The buyer"
        ],
        [
          "Beneficiary",
          "The seller"
        ],
        [
          "Issuing bank",
          "Takes on the obligation to pay"
        ]
      ],
      "explain": "Four parties, four distinct obligations."
    },
    {
      "id": "q4",
      "m": "m1",
      "l": "m1l2",
      "type": "mc",
      "q": "A bank refuses payment although the goods arrived in perfect condition. What most likely happened?",
      "options": [
        "The goods were mis-described in the sale contract",
        "The documents presented were discrepant",
        "The buyer instructed it to refuse",
        "The credit was confirmed"
      ],
      "answer": 1,
      "explain": "Compliance is documentary. Perfect goods do not cure discrepant documents."
    },
    {
      "id": "q5",
      "m": "m1",
      "l": "m1l2",
      "type": "type",
      "q": "What is the term for a mismatch between the documents presented and the credit's terms?",
      "accept": [
        "discrepancy",
        "discrepancies",
        "a discrepancy"
      ],
      "hint": "It is the ordinary failure mode",
      "explain": "Discrepancies are the standard reason a presentation fails, and most are curable if caught before expiry."
    },
    {
      "id": "q6",
      "m": "m1",
      "l": "m1l2",
      "type": "multi",
      "q": "Which are true of documentary compliance? (Select all that apply)",
      "options": [
        "The bank checks documents on their face",
        "The bank inspects the goods",
        "Discrepancies can often be cured before expiry",
        "A defective cargo excuses payment against compliant documents"
      ],
      "answers": [
        0,
        2
      ],
      "explain": "Banks never inspect goods, and compliant documents oblige payment regardless of the cargo's condition."
    },
    {
      "id": "q7",
      "m": "m2",
      "l": "m2l1",
      "type": "mc",
      "q": "When does a demand guarantee pay?",
      "options": [
        "After the beneficiary proves default",
        "On presentation of a compliant demand",
        "After arbitration concludes",
        "On delivery of the goods"
      ],
      "answer": 1,
      "explain": "That is precisely what on-demand means — no proof of default required."
    },
    {
      "id": "q8",
      "m": "m2",
      "l": "m2l1",
      "type": "mc",
      "q": "What does the demand-versus-conditional distinction really decide?",
      "options": [
        "Who is legally in the right",
        "Who holds the cash while the dispute is resolved",
        "Which court hears the case",
        "How much the guarantee costs"
      ],
      "answer": 1,
      "explain": "It reallocates who is out of pocket during the argument, not who ultimately wins it."
    },
    {
      "id": "q9",
      "m": "m2",
      "l": "m2l1",
      "type": "order",
      "q": "Order what happens under a demand guarantee.",
      "items": [
        "A compliant demand is presented",
        "The bank checks the demand against the guarantee's terms",
        "The bank pays",
        "The applicant sues to recover if it disputes the call"
      ],
      "explain": "Payment comes first; the argument comes after."
    }
  ],
  "glossary": [
    {
      "t": "Letter of credit",
      "l": "m1l1",
      "d": "A bank's undertaking to pay a seller against documents that comply with the credit's terms."
    },
    {
      "t": "Applicant",
      "l": "m1l1",
      "d": "The buyer, who asks its bank to issue a credit."
    },
    {
      "t": "Beneficiary",
      "l": "m1l1",
      "d": "The party entitled to be paid under a credit — normally the seller."
    },
    {
      "t": "Autonomy principle",
      "l": "m1l1",
      "d": "The rule that a credit is a separate contract from the underlying sale, so a dispute about the goods does not by itself excuse payment."
    },
    {
      "t": "Documentary compliance",
      "l": "m1l2",
      "d": "The requirement that documents match the credit on their face, which is what payment turns on."
    },
    {
      "t": "Discrepancy",
      "l": "m1l2",
      "d": "A mismatch between the documents presented and the credit's terms — the ordinary reason a presentation fails."
    },
    {
      "t": "Demand guarantee",
      "l": "m2l1",
      "d": "A guarantee payable on presentation of a compliant demand, with no need to prove default."
    },
    {
      "t": "Conditional guarantee",
      "l": "m2l1",
      "d": "A guarantee that pays only once the beneficiary establishes the other side's default."
    }
  ]
}
);
