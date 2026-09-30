export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  description: string;
  image: string;
  iconName: string;
  keyPillars: string[];
  audience: string;
  deliverables: string[];
  metrics: string;
  ctaText?: string;
  ctaLink?: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: "gold-loan",
    number: "01",
    title: "Gold Loan",
    tagline: "Instant loans at ₹7,000 per gram with lowest interest rates and 15-minute disbursal.",
    description: "We provide high-value gold loans against gold jewellery, coins, and ornaments at competitive market rates with complete transparency and minimal documentation.",
    image: "https://i.pinimg.com/736x/39/0d/ae/390daec6136cccca807af6da491cd812.jpg",
    iconName: "ShieldCheck",
    keyPillars: [
      "Loans up to ₹7,000 per gram based on live MCX",
      "Nominal interest rates starting from 0.79% per month",
      "Instant loan approval & bank transfer within 15 minutes",
    ],
    audience: "Individuals, Entrepreneurs & Families",
    deliverables: [
      "Instant Loan Sanction Letter & Receipt",
      "100% Insured Bank Vault Custody",
      "Flexible Repayment & Pre-Closure with Zero Charges",
    ],
    metrics: "Disbursal in under 15 minutes",
    ctaText: "Apply for Gold Loan",
    ctaLink: "/gold-purchase"
  },
  {
    id: "gold-purchase",
    number: "02",
    title: "Gold Purchase",
    tagline: "Sell old, scrap, or physical gold at live market rates with zero deduction.",
    description: "We purchase gold at no extra charges with the best market rates. Instant cash or direct bank transfer with certified non-destructive laser purity testing.",
    image: "https://i.pinimg.com/736x/e2/e6/49/e2e649673ed3b2c48307a4ccfb545c8d.jpg",
    iconName: "TrendingUp",
    keyPillars: [
      "Best live market pricing with zero middleman margin",
      "German laser purity testing with zero melting loss",
      "Instant spot payment via cash or IMPS/RTGS",
    ],
    audience: "Gold Sellers & Liquidity Seekers",
    deliverables: [
      "Computerized Purity & Valuation Certificate",
      "Instant Payment Confirmation",
      "Zero Deduction on Stones or Wastage",
    ],
    metrics: "Highest market value guaranteed",
    ctaText: "Sell Gold / Purchase Form",
    ctaLink: "/gold-purchase"
  },
  {
    id: "bank-buy-back",
    number: "03",
    title: "Bank Buy Back",
    tagline: "Release pledged gold from any bank, NBFC, or pawnbroker with instant cash surplus.",
    description: "We takeover gold from any Private and Public Sector Banks or NBFCs at no extra charges. We clear your pending loan balance, release your gold, and pay you the remaining cash balance.",
    image: "https://i.pinimg.com/736x/3f/34/d0/3f34d085df6f8e879fc8adec09b842d0.jpg",
    iconName: "Lock",
    keyPillars: [
      "Takeover from any public/private bank or pawn broker",
      "Full debt clearance settled directly by our team",
      "Immediate handover of leftover balance cash to you",
    ],
    audience: "Customers with pledged gold in high-interest accounts",
    deliverables: [
      "Bank Account Clearance Statement",
      "Legal Release Assistance & Custody Transfer",
      "Remaining Equity Disbursed Instantly",
    ],
    metrics: "Same-day gold release assistance",
    ctaText: "Release Pledged Gold",
    ctaLink: "/gold-purchase"
  },
  {
    id: "interest-rates",
    number: "04",
    title: "Nominal Interest Rate",
    tagline: "Market-leading low interest rates with 100% transparent fee structure.",
    description: "Our Interest Rates are very much considerable when compared to other Gold Loan Partners in the Market. Zero hidden administrative charges, zero processing penalties.",
    image: "https://i.pinimg.com/736x/56/e5/fd/56e5fdaf21e5d7ef6dc874ec364c465d.jpg",
    iconName: "Compass",
    keyPillars: [
      "Lowest monthly interest rates in the industry",
      "No hidden processing fees or appraisal charges",
      "Transparent monthly statement & receipt generation",
    ],
    audience: "Borrowers seeking budget-friendly gold finance",
    deliverables: [
      "Complete EMI & Interest Schedule Table",
      "Custom Tenure from 3 Months to 36 Months",
      "Digital Payment Receipt with Detailed Breakdown",
    ],
    metrics: "Starting from 0.79% per month",
    ctaText: "Calculate Your Interest",
    ctaLink: "/#calculator"
  },
  {
    id: "other-loans",
    number: "05",
    title: "Other Loans",
    tagline: "Property, housing, and construction collateral finance with flexible terms.",
    description: "We also provide loans for Houses, Construction, and Business Expansion on collateral with flexible repayment terms, fast approvals, and custom schedules.",
    image: "https://i.pinimg.com/736x/69/68/9f/69689fad596bc7792dbefdc605efaf85.jpg",
    iconName: "Building2",
    keyPillars: [
      "Loans for residential housing and commercial construction",
      "Flexible collateral-backed business credit facilities",
      "Fast-track verification and multi-year tenure options",
    ],
    audience: "Property Owners, Builders & MSME Businesses",
    deliverables: [
      "Collateral Property Evaluation Report",
      "Flexible Structured Repayment Schedule",
      "Dedicated Relationship Banker Support",
    ],
    metrics: "Approvals within 24 to 48 hours",
    ctaText: "Enquire About Other Loans",
    ctaLink: "/contact"
  },
  {
    id: "payments",
    number: "06",
    title: "Online / Offline Payments",
    tagline: "Seamless EMI payments via UPI, Net Banking, Debit Card, or Cash at branch.",
    description: "Make payments easily either Online or Offline with instant digital receipts. Enjoy multiple payment modes, automated reminders, and instant loan account ledger updates.",
    image: "https://i.pinimg.com/736x/ef/3a/b9/ef3ab994ca4278eb5a8bac482e60c493.jpg",
    iconName: "Layers",
    keyPillars: [
      "Multiple online options: UPI, NetBanking, Debit Card",
      "Offline cash and cheque settlements at all branch desks",
      "Instant SMS and digital PDF receipt confirmation",
    ],
    audience: "All Active Loan Account Holders",
    deliverables: [
      "Instant Downloadable Payment Dossier & Receipt",
      "24/7 Digital Statement Access",
      "Automated Due Date Alert Reminders",
    ],
    metrics: "Instant payment confirmation",
    ctaText: "Contact Payment Desk",
    ctaLink: "/contact"
  }
];
