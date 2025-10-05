import { useRouter } from "next/navigation";

export const useAuthNavigation = () => {
  const router = useRouter();
  
  const handleAuthNavigation = (path: '/login' | '/register') => {
    router.push(path);
  };
  
  return { handleAuthNavigation };
};
