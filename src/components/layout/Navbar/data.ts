export type MenuKey = "products" | "community" | "learn";

type MenuItem = {
  title: string;
  href: string;
  icon?: string;
};

export const megaMenu: Record<MenuKey, MenuItem[]> = {
  products: [
    { title: "Editor", href: "/editor" },
    { title: "Format", href: "/format"},
    { title: "Runtime", href: "/runtime" },
    { title: "Renderer", href: "/renderer", icon: "move-up-right" },
  ],
  community: [
    { title: "Community", href: "/community"},
    { title: "Marketplace", href: "/community/marketplace" },
    { title: "Experts", href: "/community/experts" },
    { title: "Merch", href: "/community/merch" },
  ],
  learn: [
    { title: "Docs", href: "/learn/docs" },
    { title: "Tutorials", href: "/learn/tutorials" },
    { title: "Blog", href: "/learn/blog" },
    { title: "Examples", href: "/learn/examples", icon: "move-up-right" },
  ],
};


