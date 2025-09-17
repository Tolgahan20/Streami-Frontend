import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export const useAuthNavigation = () => {
  const router = useRouter();
  
  // Check if we're in development mode
  const isDevelopment = process.env.NODE_ENV === 'development';
  
  const handleAuthNavigation = (path: '/login' | '/register') => {
    if (isDevelopment) {
      // In development, navigate normally
      router.push(path);
    } else {
      // In production, show "Coming soon" toaster
      toast.success("Coming soon! 🚀", {
        duration: 3000,
        position: "top-center",
        style: {
          background: "var(--primary)",
          color: "var(--primary-foreground)",
          borderRadius: "var(--radius-lg)",
          padding: "12px 16px",
          fontSize: "14px",
          fontWeight: "500",
        },
      });
    }
  };
  
  return { handleAuthNavigation };
};
