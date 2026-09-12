export interface PrincipleItem {
  number: string;
  title: string;
  quote: string;
  explanation: string;
  points: string[];
}

export const WHY_SCALEN_STONE: PrincipleItem[] = [
  {
    number: "01",
    title: "Clarity",
    quote: "Every gram, karat, and rupee calculated with 100% transparent honesty.",
    explanation: "Traditional gold pawnbrokers and unorganized lenders thrive on hidden deductions—melting loss, stone weight exaggerations, and inflated interest. At Scalen Stone, our valuations are computerized and non-destructive in front of your eyes.",
    points: [
      "German laser spectrometer non-destructive karat testing",
      "Live market-linked pricing without intermediary margin cuts",
      "Zero hidden melting fees, handling charges, or appraisal penalties",
    ],
  },
  {
    number: "02",
    title: "Strategy",
    quote: "Customized loan tenures designed to fit your real cash-flow horizon.",
    explanation: "We do not believe in one-size-fits-all debt traps. Whether you prefer monthly interest with principal at maturity, regular EMIs, or flexible overdraft credit, our structured financing adapts to your income stream.",
    points: [
      "Customizable repayment models (Bullet, Monthly, or Step-Down)",
      "Zero prepayment or foreclosure penalties at any time",
      "Immediate top-up options when gold market rates appreciate",
    ],
  },
  {
    number: "03",
    title: "Trust",
    quote: "Your family's gold treated with the reverence and security it commands.",
    explanation: "Gold is more than financial collateral; it is family history and emotional equity. We seal each item in tamper-evident security packaging in your presence and store it in biometric vaults backed by 100% insurance.",
    points: [
      "Individually serialized tamper-proof barcode security seals",
      "100% full-value insurance coverage with global underwriters",
      "Strict legal non-disclosure & confidential boardroom processing",
    ],
  },
  {
    number: "04",
    title: "Growth",
    quote: "Empowering you to turn dormant gold into productive wealth.",
    explanation: "Our mission is to help you liberate idle assets, eliminate high-interest predatory debt, and redeploy liquid funds into your business or family growth with institutional backing.",
    points: [
      "Liberation of over ₹500 Cr from predatory pawnbrokers",
      "Direct pathway to recover your gold completely debt-free",
      "Comprehensive advisory to transition from debt into compounding",
    ],
  },
];
