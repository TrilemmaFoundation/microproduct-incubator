/**
 * Navigation items used in Header and Footer.
 * Centralized for consistency and easier maintenance.
 */

interface NavItem {
  label: string;
  icon: string;
  href: string;
}

export const NAV_ITEMS: NavItem[] = [];

interface SocialLink {
  name: string;
  href: string;
  fullName: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    name: "Discord",
    href: "https://discord.gg/AS7WMx7Cy2",
    fullName: "Discord",
  },
  {
    name: "X",
    href: "https://x.com/TrilemmaFdn",
    fullName: "X (Twitter)",
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/trilemma-foundation/",
    fullName: "LinkedIn",
  },
  {
    name: "GitHub",
    href: "https://github.com/TrilemmaFoundation",
    fullName: "GitHub",
  },
  {
    name: "Email",
    href: "mailto:matt@trilemma.foundation",
    fullName: "Email",
  },
];

interface FooterLink {
  label: string;
  href: string;
}

export const FOOTER_QUICK_LINKS: FooterLink[] = [];

