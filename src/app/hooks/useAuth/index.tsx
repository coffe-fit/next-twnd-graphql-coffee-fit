
import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import { auth, handleSignInWithPopup, handleVerification } from '../../../lib/services';
import { onAuthStateChanged } from 'firebase/auth';

const useAuth = () => {
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string>(searchParams.get('email') || '');
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      debugger
      if (email !== '' && user === null) {
        user = await handleVerification(email);
      };
      setUser(user);
      setLoading(false);
      sessionStorage.setItem('auth_token', user?.accessToken);
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

  return { user, loading, signInWithGoogle, signOut };
};

export default useAuth;
// como implementarloe
// const { use, loading, signInWithGoogle, signOut } = useAuth();
