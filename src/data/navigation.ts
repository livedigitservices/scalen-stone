export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Solutions", href: "/solutions" },
  { label: "Why Scalen Stone", href: "/why-choose-us" },
  { label: "Insights", href: "/insights" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_NAV = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Why Scalen Stone", href: "/why-choose-us" },
    { label: "Leadership & Governance", href: "/about#governance" },
    { label: "Client Testimonials", href: "/why-choose-us#testimonials" },
    { label: "Careers & Advisory Fellows", href: "/contact" },
  ],
  services: [
    { label: "Wealth Management", href: "/services#wealth-management" },
    { label: "Investment Planning", href: "/services#investment-planning" },
    { label: "Financial Planning", href: "/services#financial-planning" },
    { label: "Business Finance", href: "/services#business-finance" },
    { label: "Risk Management", href: "/services#risk-management" },
    { label: "Portfolio Advisory", href: "/services#portfolio-advisory" },
  ],
  solutions: [
    { label: "Private Individuals", href: "/solutions#individuals" },
    { label: "High-Net-Worth Families", href: "/solutions#hnwi" },
    { label: "Founders & Business Owners", href: "/solutions#founders" },
    { label: "Corporate Treasury", href: "/solutions#corporate" },
    { label: "Goal-Based Investing", href: "/solutions#goals" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
    { label: "Fiduciary Disclosures", href: "/terms-conditions#fiduciary" },
    { label: "Regulatory Compliance", href: "/terms-conditions#regulatory" },
    { label: "Security Architecture", href: "/privacy-policy#security" },
  ]
};
