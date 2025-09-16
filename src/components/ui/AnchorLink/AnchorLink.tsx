"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { navigateWithScroll } from "@/lib/utils/scrollTo";

interface AnchorLinkProps {
  href: string;
  section?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const AnchorLink: React.FC<AnchorLinkProps> = ({
  href,
  section,
  children,
  className,
  onClick,
}) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    
    if (onClick) {
      onClick();
    }
    
    navigateWithScroll(href, section, router);
  };

  const linkHref = section ? `${href}#${section}` : href;

  return (
    <Link 
      href={linkHref} 
      className={className}
      onClick={handleClick}
    >
      {children}
    </Link>
  );
};

