export interface SolutionBlock {
  number: string;
  stage: string;
  headline: string;
  subheadline: string;
  description: string;
  highlights: string[];
  imageUrl: string;
  imageAlt: string;
}

export const FEATURED_SOLUTIONS: SolutionBlock[] = [
  {
    number: "01",
    stage: "Monetize",
    headline: "Transform idle gold into immediate productive capital.",
    subheadline: "Instant liquidity without parting with ownership.",
    description: "Household and enterprise gold often sits dormant in bank lockers. Scalen Stone Finance unlocks its full economic power within 15 minutes, offering highest per-gram valuations and minimal interest rates so your capital can work immediately.",
    highlights: [
      "Instant disbursal to bank account in 15 minutes",
      "Highest per-gram valuation aligned with live market rates",
      "Complete flexibility in repayment tenures and EMIs",
    ],
    imageUrl: "https://images.unsplash.com/photo-1610375461246-83df859d849d?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Pure gold bullion bars and premium wealth assets",
  },
  {
    number: "02",
    stage: "Liberate",
    headline: "Release pledged gold and eliminate predatory debt.",
    subheadline: "Escape high-interest traps and save on compounded fees.",
    description: "Thousands of families have gold trapped with private pawnbrokers or aggressive lenders charging exorbitant interest. Our legal desk steps in, settles the lender directly, releases your physical jewellery, and transfers the remaining surplus equity straight to your bank.",
    highlights: [
      "Direct bank-to-bank settlement of existing pawn debt",
      "Immediate halt to compounding penalty charges & auction threats",
      "Highest net cash balance paid out instantly on the spot",
    ],
    imageUrl: "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Executive signing financial documentation and gold clearance",
  },
  {
    number: "03",
    stage: "Safeguard",
    headline: "Protect what you've built with Swiss-caliber vaulting.",
    subheadline: "100% comprehensive insurance and tamper-proof security.",
    description: "Your gold represents heritage, hard work, and family pride. We preserve its sanctity in reinforced, climate-controlled biometric vault facilities with 100% comprehensive insurance coverage by top underwriters, returned in the exact pristine condition as pledged.",
    highlights: [
      "Sealed in tamper-evident barcode envelopes in your presence",
      "100% underwritten insurance at live market replacement value",
      "Zero hidden vault fees, locker rent, or appraisal charges",
    ],
    imageUrl: "https://images.unsplash.com/photo-1582139329536-e7284fece509?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "High-security bank vault with heavy steel doors and safe deposit compartments",
  },
  {
    number: "04",
    stage: "Compound",
    headline: "Strategic bullion advisory for modern family wealth.",
    subheadline: "Integrating precious metals into multi-asset portfolios.",
    description: "Gold remains the ultimate hedge against currency debasement and geopolitical turmoil. We help family offices and private clients systematically acquire, store, and manage sovereign gold assets with tax-advantaged efficiency.",
    highlights: [
      "Institutional bullion purchase & insured depository solutions",
      "Sovereign Gold Bond (SGB) & digital gold integration",
      "Succession planning for multi-generational heirloom collections",
    ],
    imageUrl: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Modern corporate financial towers representing lasting wealth",
  },
];

export const CLIENT_PERSONAS = [
  {
    title: "Gold Loan Seekers",
    desc: "Need immediate, transparent funds for urgent medical, education, or personal milestones without cumbersome credit-score barriers.",
    tag: "Instant Liquidity",
  },
  {
    title: "Pledged Gold Holders",
    desc: "Have gold stuck with high-interest pawnbrokers or NBFCs and wish to liberate the asset and pocket the leftover surplus cash.",
    tag: "Debt Release",
  },
  {
    title: "Jewellery Sellers",
    desc: "Looking to liquidate old, broken, or scrap jewellery with 100% transparent German spectrometer purity testing and live spot payout.",
    tag: "Cash for Gold",
  },
  {
    title: "Business & MSME Owners",
    desc: "Powering operational working capital, supplier payables, or seasonal inventory surges using gold assets as immediate collateral.",
    tag: "Commercial Credit",
  },
];
