import { useRouter } from 'next/navigation';
import { useCallback } from 'react';

const useLogout = () => {
  const router = useRouter();

  const logout = useCallback(() => {
    localStorage.removeItem('token');
    router.push('/login');
  }, [router]);

  return logout;
};

export default useLogout;
