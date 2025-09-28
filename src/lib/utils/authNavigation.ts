import { useRouter } from "next/navigation";
import { toastSuccess } from "@/components/ui/toast";

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
      toastSuccess("Coming soon! 🚀", {
        duration: 3000,
        position: "top-center",
      });
    }
  };
  
  return { handleAuthNavigation };
};
