'use client'
import { Suspense, useEffect, useState }from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';

import { addUser } from '@/provider/redux/userSlice';
import { language } from '@/lib/lenguage';

import { ButonsSocialMedia } from '../';
import { SendEmail } from './SendEmail';
import useAuth from '@/app/hooks/useAuth';

interface props {}

export const LoginForm = ({}:props) => {
  const [messageError, setMessageError] = useState('');
  const [successText, setSuccessText] = useState('');
  const { user } = useAuth();
  const dispatch =  useDispatch();
  const router = useRouter();

  const _language = language('español');
  
  //Methods que retornan del componente ButtonSocialmedia 
  const onHandleLogin = (user: any) =>{
    reduxUser(user);
  }
  const onHandleFailLogin = (error: any) =>{
    handleSendEmailFail(error)
  }

  //Methods que retornan del componente sendEmail  
  const handleSendEmailFail = (message: string)=>{
    setSuccessText('');
    setMessageError(message);
  }
  const handleSendEmailSuccess = (message: string)=>{
    setMessageError('');
    setSuccessText(message);
  }

  const reduxUser = (user: {
    uid: any,
    email: string,
    photoURL: string,
    displayName?: string,
    accessToken: string
  })=>{
    try {
      if(!user.email) throw user
      dispatch(addUser({
        id: user.uid,
        email: user.email,
        imgUser: user.photoURL,
        username: user.displayName || user.email
      }));
      
      router.push('/pages/dashboard')
    } catch (error) {
      setMessageError('servidor 2')
      console.error(error);
    }
  }

  // recuerda que el codigo de la autenticacion esta en el hook useAuth 
  useEffect(() => {
    if (user) {
      reduxUser(user)
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <Suspense>
        <ButonsSocialMedia
          lenguage={_language}
          onLogin={onHandleLogin}
          failLogin={onHandleFailLogin}
        />
      </Suspense>
      <Suspense fallback={<div>cargando...</div>}>
        <SendEmail onFail={handleSendEmailFail} onSuccess={handleSendEmailSuccess}/>
      </Suspense>
      {messageError && 
          <p className='text-red-500 absolute top-28 w-64'>{messageError}</p>
        }
        {successText && 
          <p className='text-green-500 absolute top-28 w-64'>{successText}</p>
        }
    </>
  );
};
