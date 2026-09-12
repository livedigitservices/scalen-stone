export interface ProcessStep {
  step: string;
  name: string;
  title: string;
  description: string;
  details: string[];
  deliverable: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  {
    step: "01",
    name: "Discovery",
    title: "Assessment & Objective Clarification",
    description: "We understand your gold profile, liquidity timeline, or existing pledged debt status in private consultation.",
    details: [
      "Review of gold items, ornaments, coins, or existing pawn receipts",
      "Identification of optimal solution (Loan, Release, or Outright Sale)",
      "Confidential briefing in our private executive boardroom",
    ],
    deliverable: "Preliminary Assessment Brief",
  },
  {
    step: "02",
    name: "Evaluation",
    title: "Scientific Non-Destructive Purity Testing",
    description: "Your gold is weighed on certified scales and tested via computerized German laser spectrometers in your direct presence.",
    details: [
      "Precise karat determination (18K, 20K, 22K, 24K) without scratching or damage",
      "Zero stone weight deduction discrepancies",
      "Live market valuation calculated against current gold exchange benchmark",
    ],
    deliverable: "Certified Computerized Purity Slip",
  },
  {
    step: "03",
    name: "Disbursal",
    title: "Instant Liquidity or Bank Clearance",
    description: "Immediate fund transfer directly to your bank account via RTGS/NEFT or spot clearance of existing lender debts.",
    details: [
      "Direct settlement of pending loans with existing banks/NBFCs",
      "Instant transfer of remaining balance or full loan amount in 15 mins",
      "Transparent sanction letter with zero hidden charges",
    ],
    deliverable: "Instant Fund Transfer & Sanction Letter",
  },
  {
    step: "04",
    name: "Safeguard",
    title: "Sealed Vault Custody or Debt-Free Return",
    description: "Gold is packaged in serialized tamper-proof bags, vaulted with 100% insurance, and returned safely upon loan repayment.",
    details: [
      "Client-witnessed tamper-proof barcode sealing",
      "Continuous vault monitoring with comprehensive underwriter policy",
      "Pristine, untouched return upon loan completion",
    ],
    deliverable: "Insured Custody Vault Certificate",
  },
];
