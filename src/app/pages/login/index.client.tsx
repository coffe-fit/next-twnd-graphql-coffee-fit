'use client'
import { Suspense, useEffect, useState }from 'react';
import { useDispatch } from 'react-redux';
import { format } from 'url';
import useCustomRouter from '@/app/hooks/useCustomRouter';

import { addUser } from '@/provider/redux/userSlice';
import CustomSessionStorage from '@/lib/util/CustomSessionStorage';
import { language } from '@/lib/lenguage';

import { ButonsSocialMedia } from '@/app/components/ButonsSocialMedia';
import { SendEmail } from './SendEmail';
import useAuth from '@/app/hooks/useAuth';

export const ClientLogin = ({}:any) => {
  const [messageError, setMessageError] = useState('');
  const [successText, setSuccessText] = useState('');
  const { user, token } = useAuth();
  const customSessionStorage = CustomSessionStorage();
  
  const dispatch =  useDispatch();
  const router = useCustomRouter();

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
    photoUrl?: string,
    photoURL?: string,
    displayName?: string,
    accessToken: string,
    userId: string
  })=>{
    try {
      
      if(!user.email) throw user
      dispatch(addUser({
        id: user.userId,
        email: user.email,
        imgUser: user.photoUrl || user.photoURL,
        username: user.displayName || user.email,
      }));
      
      const url = format({
        pathname: '/pages/dashboard',
        query: {id: customSessionStorage.getItem('auth_token')}
      });
      
      router.push(url)
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
  }, [token]);

  return (
    <>
      <Suspense fallback={<div>cargando ButonsSocialMedia...</div>}>
        <ButonsSocialMedia
          lenguage={_language}
          onLogin={onHandleLogin}
          failLogin={onHandleFailLogin}
        />
      </Suspense>
      <Suspense fallback={<div>cargando sendEmail...</div>}>
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
