"use client";
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {jwtDecode} from 'jwt-decode';

const withAuth = (WrappedComponent) => {

  const checkTokenExpiry = (token) => {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp < currentTime;
  };

  const AuthComponent = (props) => {
    const router = useRouter();

    useEffect(() => {
      const token = localStorage.getItem('token');

      if (!token) {
        router.push('/login');
      } else {
        const isTokenExpired = checkTokenExpiry(token);
        if (isTokenExpired) {
          localStorage.removeItem('token');
          router.push('/login');
        }
      }
    }, []);

    return <WrappedComponent {...props} />;
  };

  AuthComponent.displayName = `withAuth(${WrappedComponent.displayName || WrappedComponent.name || 'Component'})`;

  return AuthComponent;
};

export default withAuth;
