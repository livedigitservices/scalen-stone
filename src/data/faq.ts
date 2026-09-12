export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export const FAQS: FAQItem[] = [
  {
    question: "What makes Scalen Stone Finance different from traditional wealth managers?",
    answer: "Scalen Stone operates on a fiduciary, client-first model. We do not distribute high-commission third-party products under hidden incentives. Every portfolio recommendation is derived from proprietary quantitative research, institutional risk modeling, and a fee structure that aligns our success strictly with your long-term capital preservation.",
    category: "General",
  },
  {
    question: "Who is your typical advisory client?",
    answer: "We primarily advise high-net-worth families, enterprise founders, corporate C-suite executives, and growing businesses requiring sophisticated wealth architectures, capital structuring, and disciplined multi-asset governance.",
    category: "Clients",
  },
  {
    question: "How do you construct and manage investment portfolios?",
    answer: "We begin with a customized Investment Policy Statement (IPS) reflecting your liquidity timeline, risk tolerance, and tax profile. Portfolios are constructed across global & domestic equities, fixed-income yield curves, and alternative hedging instruments, monitored continuously, and rebalanced systematically when market thresholds trigger.",
    category: "Investment",
  },
  {
    question: "Are client assets held directly by Scalen Stone?",
    answer: "No. In accordance with institutional safety standards, client securities, funds, and portfolios are held in your direct name with top-tier SEBI-regulated custodians and premier depository participants. We act as your fiduciary advisor and asset manager without ever commingling funds.",
    category: "Security",
  },
  {
    question: "What is the process to begin working together?",
    answer: "Our engagement begins with a confidential Discovery Consultation where we assess your current balance sheet, liabilities, and aspirations. Following this, we present a Diagnostic Roadmap with concrete strategic recommendations before formal engagement.",
    category: "Onboarding",
  },
];
