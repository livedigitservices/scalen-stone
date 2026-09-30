export interface NavItem {
  label: string;
  href: string;
  badge?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Location", href: "/location" },
  { label: "Contact Us", href: "/contact" },
  { label: "Gold Purchase", href: "/gold-purchase", badge: "PDF" },
];

export const FOOTER_NAV = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Our Locations", href: "/location" },
    { label: "Contact Us", href: "/contact" },
    { label: "Gold Purchase Desk", href: "/gold-purchase" },
  ],
  services: [
    { label: "Gold Loan (₹7,000/g)", href: "/services#gold-loan" },
    { label: "Gold Purchase", href: "/gold-purchase" },
    { label: "Bank Buy Back", href: "/services#bank-buy-back" },
    { label: "Nominal Interest Rates", href: "/services#interest-rates" },
    { label: "Other Loans", href: "/services#other-loans" },
    { label: "Online/Offline Payments", href: "/services#payments" },
  ],
  quickAccess: [
    { label: "Gold Loan Calculator", href: "/#calculator" },
    { label: "Gold Sanction PDF Dossier", href: "/gold-purchase" },
    { label: "Branch Finder & Maps", href: "/location" },
    { label: "Customer Helpline", href: "/contact" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy-policy" },
    { label: "Terms & Conditions", href: "/terms-conditions" },
  ]
};
