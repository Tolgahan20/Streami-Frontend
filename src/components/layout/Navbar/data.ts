export type MenuKey = "products" | "community" | "learn";

type MenuItem = {
  title: string;
  href: string;
  description?: string;
  badge?: string;
};

type MenuGroup = {
  heading: string;
  items: MenuItem[];
};

export const megaMenu: Record<MenuKey, MenuGroup[]> = {
  products: [
    { heading: "Editor", items: [{ title: "Editor", href: "/editor", description: "Create, tweak and export animations." }] },
    { heading: "Format", items: [{ title: "Format", href: "/format", description: "Lightweight vector-first asset format." }] },
    { heading: "Runtime", items: [{ title: "Runtime", href: "/runtime", description: "Embeddable player and APIs across platforms." }] },
    { heading: "Renderer", items: [{ title: "Renderer", href: "/renderer", description: "Blazing-fast vector renderer (open source)." }] },
  ],
  community: [
    {
      heading: "Community",
      items: [
        { title: "Community", href: "/community", description: "Get support, ask questions, and request features" },
      ],
    },
    {
      heading: "Marketplace",
      items: [
        { title: "Marketplace", href: "/community/marketplace", description: "Discover what other creators are working on" },
      ],
    },
    {
      heading: "Experts",
      items: [
        { title: "Experts", href: "/community/experts", description: "Post jobs and get hired to work on projects" },
      ],
    },
    {
      heading: "Merch",
      items: [
        { title: "Merch", href: "/community/merch", description: "Show your support with T‑shirts and more" },
      ],
    },
  ],
  learn: [
    { heading: "Docs", items: [{ title: "Docs", href: "/learn/docs", description: "Deep dives and API guides." }] },
    { heading: "Tutorials", items: [{ title: "Tutorials", href: "/learn/tutorials", description: "Step-by-step lessons." }] },
    { heading: "Blog", items: [{ title: "Blog", href: "/learn/blog", description: "News and best practices." }] },
    { heading: "Examples", items: [{ title: "Examples", href: "/learn/examples", description: "Production-ready examples." }] },
  ],
};


