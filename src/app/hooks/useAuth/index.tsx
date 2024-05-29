
import { useEffect, useState } from 'react';
import useCustomRouter from '@/app/hooks/useCustomRouter';
import { useSearchParams } from 'next/navigation';

import { auth, handleSignInWithPopup, handleVerification } from '../../../lib/services';
import { onAuthStateChanged } from 'firebase/auth';
import { AuthForanyToken, input as inputAuthService } from '@/lib/services/graphql/auth/signInForanyToken.service';
import CustomSessionStorage from '@/lib/util/CustomSessionStorage';

const useAuth = () => {
  const searchParams = useSearchParams();
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState<string>(searchParams.get('email') || '');
  const customSessionStorage = CustomSessionStorage();
  const router = useCustomRouter();

  const sendUser = async (data: inputAuthService) =>{
    return await AuthForanyToken(data);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user: any) => {
      if (email !== '' && user === null) {
        user = await handleVerification(email);
      };
      let mockFirebase: any = process.env.NEXT_PUBLIC_FIREBASE_SERVICE && JSON.parse(process.env.NEXT_PUBLIC_FIREBASE_SERVICE).user
      mockFirebase.accessToken = mockFirebase.stsTokenManager.accessToken
      if (!user && mockFirebase) user = mockFirebase
      console.log(JSON.stringify(user));
      // if (email) {
        // setLoading(false);
        
        const ownToken = await sendUser({
          email: user.email,
          token: user?.accessToken,
          name: user.displayName || ''
        })
        
        customSessionStorage.setItem('auth_token', ownToken.token);
        user.userId = ownToken.id;
        setUser(user);
        setToken(ownToken.token)
      // }
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
