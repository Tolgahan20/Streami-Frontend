export type MenuKey = "creatorhub" | "networkhub" | "profiles" | "community" | "messaging" | "about-us";

type MenuItem = {
  title: string;
  href: string;
  icon?: string;
  section?: string; // For auto-scroll to specific sections
};

type MenuConfig = {
  mainHref: string; // Main page URL for the dropdown trigger
  items: MenuItem[];
};

export const megaMenu: Record<MenuKey, MenuConfig> = {
  creatorhub: {
    mainHref: "/creator-hub",
    items: [
      { title: "Creator Marketplace", href: "/creator-hub", section: "creator-marketplace" },
      { title: "Creator connect", href: "/creator-hub", section: "creator-connect" },
    ]
  },
  networkhub: {
    mainHref: "/network-hub",
    items: [
      { title: "Sponsorships", href: "/network-hub", section: "sponsorships" },
      { title: "Brand deals", href: "/network-hub", section: "brand-deals" },
      { title: "Streami affiliate", href: "/network-hub", section: "streami-affiliate" },
      { title: "Ad Hub", href: "/network-hub", section: "ad-hub" },
    ]
  },
  profiles: {
    mainHref: "/profiles",
    items: [
      { title: "Social links", href: "/profiles", section: "social-links" },
      { title: "Analytics", href: "/profiles", section: "analytics" },
      { title: "Dashboards", href: "/profiles", section: "dashboards" },
    ]
  },
  community: {
    mainHref: "/community",
    items: [
      { title: "Social Feed", href: "/community", section: "social-feed" },
      { title: "Streamers community", href: "/community", section: "streamers-community" },
      { title: "Creators community", href: "/community", section: "creators-community" },
    ]
  },
  messaging: {
    mainHref: "/messaging",
    items: [
      { title: "General", href: "/messaging", section: "general" },
      { title: "Streamer groups", href: "/messaging", section: "streamer-groups" },
      { title: "Creator groups", href: "/messaging", section: "creator-groups" },
    ]
  },
  "about-us": {
    mainHref: "/about-us",
    items: [
      { title: "What is Streami?", href: "/about-us", section: "what-is-streami" },
      { title: "FAQ", href: "/about-us", section: "faq" },
    ]
  },
};


