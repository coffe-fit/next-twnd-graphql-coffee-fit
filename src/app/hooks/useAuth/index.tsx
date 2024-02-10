
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { auth, handleSignInWithPopup, handleVerification } from '../../../lib/services';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthForanyToken, input as inputAuthService } from '@/lib/services/graphql/auth/signInForanyToken.service';

const useAuth = () => {
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string>(searchParams.get('email') || '');
  const router = useRouter();

  const sendUser = async (data: inputAuthService) =>{
    return await AuthForanyToken(data);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (email !== '' && user === null) {
        user = await handleVerification(email);
      };
      setUser(user);
      setLoading(false);
      const ownToken = await sendUser({
        email: user.email,
        token: user?.accessToken,
        name: user.displayName || ''
      })

      sessionStorage.setItem('auth_token', ownToken.token);
      setToken(ownToken.token)

    });

    return () => unsubscribe();
  }, []);

  const signInWithGoogle = async () => {
    try {
      await handleSignInWithPopup('google');
    } catch (error: any) {
      console.error(error.message);
    }
  };

  const signOut = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return {
    user,
    loading,
    token,
    signInWithGoogle,
    signOut
  };
};

export default useAuth;
