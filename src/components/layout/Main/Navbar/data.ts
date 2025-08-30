export type MenuKey = "creatorhub" | "networkhub" | "profiles" | "community" | "messaging" | "about-us";

type MenuItem = {
  title: string;
  href: string;
  icon?: string;
};

export const megaMenu: Record<MenuKey, MenuItem[]> = {
  creatorhub: [
    { title: "Creator Marketplace", href: "/creator-hub/creator-marketplace" },
    { title: "Creator connect", href: "/creator-hub/creator-connect"},
    
  ],
  networkhub: [
    { title: "Sponsorships", href: "/network-hub/sponsorships"},
    { title: "Brand deals", href: "/network-hub/brand-deals" },
    { title: "Streami affiliate", href: "/network-hub/streami-affiliate" },
    { title: "Ad Hub", href: "/network-hub/ad-hub" },
  ],
  profiles: [
    { title: "Social links", href: "/profiles/social-links" },
    { title: "Analytics", href: "/profiles/analytics" },
    { title: "Dashboards", href: "/profiles/dashboards" },
  ],
  community: [
    { title: "Social Feed", href: "social-feed/community" },
    { title: "Streamers community", href: "streamers-community/community" },
    { title: "Creators community", href: "creators-community/community" },
  ],
  messaging: [
    { title: "General", href: "/messaging/general" },
    { title: "Streamer groups", href: "/messaging/streamer-groups" },
    { title: "Creator groups", href: "/messaging/creator-groups" },
  ],
  "about-us": [
    { title: "What is Streami?", href: "/about-us/what-is-streami" },
    { title: "FAQ", href: "/about-us/faq" },

  ],
};


