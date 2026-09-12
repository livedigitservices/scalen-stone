export interface StatItem {
  value: number;
  suffix: string;
  prefix?: string;
  label: string;
  sublabel: string;
}

export const TRUST_STATS: StatItem[] = [
  {
    value: 10,
    suffix: "+",
    label: "Years of Experience",
    sublabel: "Decade of disciplined advisory across market cycles",
  },
  {
    value: 500,
    suffix: "+",
    label: "Clients Served",
    sublabel: "High-net-worth families, professionals & corporate partners",
  },
  {
    value: 2500,
    prefix: "₹",
    suffix: " Cr+",
    label: "Assets Advised & Structured",
    sublabel: "Portfolio capital guided with institutional rigor",
  },
  {
    value: 25,
    suffix: "+",
    label: "Financial Solutions",
    sublabel: "Multi-asset diversification and bespoke architectures",
  },
];
