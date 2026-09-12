export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  keyPillars: string[];
  audience: string;
  deliverables: string[];
  metrics: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "gold-loans",
    number: "01",
    title: "Instant Gold Loans",
    tagline: "High per-gram value, minimal interest rates, and immediate bank transfer in 15 minutes.",
    description: "Unlock immediate liquidity against your gold jewellery and bullion with complete transparency. Enjoy industry-leading per-gram valuation, flexible repayment tenures, and zero prepayment penalties.",
    iconName: "ShieldCheck",
    keyPillars: [
      "Maximum Per-Gram Valuation Aligned With Live MCX",
      "Competitive Interest Rates Starting From 0.79% p.m.",
      "15-Minute Turnaround with Direct Bank Transfer",
    ],
    audience: "Entrepreneurs, Salaried Professionals & Families",
    deliverables: [
      "Instant Loan Sanction & Immediate Payout",
      "Sealed Tamper-Proof Storage Bagging in Front of Client",
      "100% Insured Bank Vault Custody with Zero Holding Fees",
    ],
    metrics: "Disbursal in under 15 minutes",
  },
  {
    id: "release-pledged-gold",
    number: "02",
    title: "Release Pledged Gold (Bank Buy-Back)",
    tagline: "We clear your pending debt with banks or pawn shops to release your gold with instant cash surplus.",
    description: "Stuck with high interest or threatened by auction notices? Our dedicated release desk settles your outstanding balance directly with existing banks, NBFCs, or local pawnbrokers, releases your physical gold, and pays you the remaining equity instantly.",
    iconName: "Lock",
    keyPillars: [
      "Complete Debt Clearance from Banks, NBFCs & Moneylenders",
      "Same-Day Release Execution by Certified Legal Officers",
      "Receive Highest Remaining Cash Balance Post Clearance",
    ],
    audience: "Gold Pledgers, Debt Consolidation Seekers & Distress Borrowers",
    deliverables: [
      "Transparent Settlement Calculation Statement",
      "Legal Representation & Bank Verification Handling",
      "Handover of Surplus Funds via RTGS/NEFT/IMPS",
    ],
    metrics: "Over ₹500 Cr in loans successfully liberated",
  },
  {
    id: "gold-purchase-monetization",
    number: "03",
    title: "Gold Purchase & Instant Cash",
    tagline: "Sell old, scrap, or unused gold at transparent live market rates with certified scientific purity testing.",
    description: "Monetize unwanted gold jewellery, coins, or bars with absolute fair-market precision. We utilize advanced German non-destructive laser spectrometers—zero melting loss deductions and zero hidden stone weight fraud.",
    iconName: "TrendingUp",
    keyPillars: [
      "Scientific Non-Destructive Spectrometer Karat Testing",
      "Live Transparent Market Rate Payout (No Middlemen)",
      "Instant Spot Cash or Direct Bank Account Credit",
    ],
    audience: "Jewellery Owners, Inheritors & Liquidity Seekers",
    deliverables: [
      "Computerized Purity & Valuation Certificate",
      "Immediate Digital Receipt & Proof of Transfer",
      "Zero Stone or Melting Weight Deduction Guarantee",
    ],
    metrics: "100% transparent purity evaluation",
  },
  {
    id: "business-gold-finance",
    number: "04",
    title: "Business & Working Capital Finance",
    tagline: "Structured gold liquidity facilities designed to power business growth, inventory, and trade cycles.",
    description: "Fast, flexible liquidity facilities for MSMEs, merchants, and corporate promoters backed by corporate gold reserves. Avoid lengthy commercial loan underwriting and preserve personal credit lines.",
    iconName: "Building2",
    keyPillars: [
      "High-Value Ticket Disbursals Up to ₹10 Crores",
      "Overdraft & Bullet Repayment Options Tailored to Cash Flows",
      "Minimal Documentation with Same-Day Corporate Approval",
    ],
    audience: "Growth Enterprises, MSME Owners, Wholesalers & Promoters",
    deliverables: [
      "Customized Corporate Liquidity Agreement",
      "Dedicated Relationship Banker & Fast-Track Desk",
      "Flexible Credit Re-advance Facilities",
    ],
    metrics: "Scalable commercial liquidity",
  },
  {
    id: "gold-vault-custody",
    number: "05",
    title: "Insured Vault Custody & Safety",
    tagline: "Swiss-standard bank vaults with 100% insurance coverage by premier global underwriters.",
    description: "Every gram of gold entrusted to Scalen Stone is weighed on certified scales, tagged with unique tamper-evident barcode seals in your direct presence, and stored inside high-security biometric vault chambers.",
    iconName: "Compass",
    keyPillars: [
      "100% Comprehensive Insurance Coverage at Full Market Value",
      "Multi-Tier Biometric & Surveillance Vault Protection",
      "Zero Maintenance, Storage, or Locker Rental Fees",
    ],
    audience: "High-Value Pledgers, Family Offices & Bullion Investors",
    deliverables: [
      "Individual Tamper-Proof Custody Seal Certificate",
      "Underwriter Insurance Policy Reference",
      "Guaranteed Same-Day Gold Return Upon Loan Clearance",
    ],
    metrics: "Flawless decade-long zero-loss record",
  },
  {
    id: "bullion-wealth-advisory",
    number: "06",
    title: "Bullion & Gold Wealth Advisory",
    tagline: "Strategic gold allocation, Sovereign Gold Bonds (SGB), and physical gold portfolio hedging.",
    description: "Integrate precious metals into your comprehensive multi-generational wealth strategy. We advise on physical bullion accumulation, digital gold instruments, and inflation-hedge asset allocation.",
    iconName: "Layers",
    keyPillars: [
      "Inflation-Hedging Asset Allocation Modeling",
      "Physical Bullion Procurement & Storage Advisory",
      "Sovereign Gold Bonds & Digital Gold Synthesis",
    ],
    audience: "HNW Families, Family Offices & Long-Term Investors",
    deliverables: [
      "Macroeconomic Gold Allocation Brief",
      "Tax-Optimized Bullion Purchase Directives",
      "Intergenerational Gold Succession Framework",
    ],
    metrics: "Multi-decade wealth preservation",
  },
];
