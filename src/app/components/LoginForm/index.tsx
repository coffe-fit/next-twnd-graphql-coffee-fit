'use client'
import { useEffect, useState }from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';


import { addUser } from '@/provider/redux/userSlice';
import { language } from '@/lib/lenguage';
import { auth, userRegister } from '@/lib/services'

import { ButonsSocialMedia } from '../';
import { Input, Button } from "../atoms";

interface props {}

export const LoginForm = ({}:props) => {
  const [email, setEmail] = useState<string>('ggg');
  const [messageError, setMessageError] = useState('');

  const dispatch =  useDispatch();
  const router = useRouter();

  const _language = language('español');

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setEmail(e.target.elements.email.value);
    const password = e.target.elements.password.value;
    validateInput(password);
    if (messageError === '') await userRegister(email, password);
  }

  const validateInput = (password: string) => {
    let validate = '';
    if(!/^\S*@\S*\.\S*$/.test(email)) validate = 'email';
    if(!/[0-9]{7}$/.test(password)) validate = 'password';
    if(validate !== '') setMessageError(`${_language.SomethingIsWrong} ${validate}.`)
    if(validate === '') setMessageError('');
  }

  const onHandleLogin = (user: any) =>{
    reduxUser(user);
    // router.push('/pages/dashboard')
  }
  const onHandleFailLogin = (error: any) =>{}

  const reduxUser = (user: any)=>{
    try {
      dispatch(addUser({
        id: user.uid,
        email: user.email,
        imgUser: user.photoURL,
        username: user.displayName || user.email
      }));
      router.push('/pages/dashboard')
    } catch (error) {
      alert(error)
    }
  }

  useEffect(() => {
    // Escuchar cambios en la autenticación
    const unsubscribe = onAuthStateChanged(auth, (user: any) => {
      reduxUser(user);
    });
    // Limpiar el observador al desmontar el componente
    return () => unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <ButonsSocialMedia
        lenguage={_language}
        onLogin={onHandleLogin}
        failLogin={onHandleFailLogin}
      />
      <form onSubmit={handleSubmit}>
        <Input
          name={'email'} id={'email'}
          className='mt-14' size='lg'
          placeholder='email' bg_color={true}
        />
        <Input
          name={'password'} id={'password'}
          type='password' className='mt-3'
          size='lg' placeholder='password'
          bg_color={true}
        />
        <Button type={'submit'} className='mt-3' size='lg' image={
          <svg
            width="2em" data-e2e=""
            height="2em" viewBox="0 0 48 48"
            fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M24.0003 7C20.1343 7 17.0003 10.134 17.0003 14C17.0003 17.866 20.1343 21 24.0003 21C27.8663 21 31.0003 17.866 31.0003 14C31.0003 10.134 27.8663 7 24.0003 7ZM13.0003 14C13.0003 7.92487 17.9252 3 24.0003 3C30.0755 3 35.0003 7.92487 35.0003 14C35.0003 20.0751 30.0755 25 24.0003 25C17.9252 25 13.0003 20.0751 13.0003 14ZM24.0003 33C18.0615 33 13.0493 36.9841 11.4972 42.4262C11.3457 42.9573 10.8217 43.3088 10.2804 43.1989L8.32038 42.8011C7.77914 42.6912 7.4266 42.1618 7.5683 41.628C9.49821 34.358 16.1215 29 24.0003 29C31.8792 29 38.5025 34.358 40.4324 41.628C40.5741 42.1618 40.2215 42.6912 39.6803 42.8011L37.7203 43.1989C37.179 43.3088 36.6549 42.9573 36.5035 42.4262C34.9514 36.9841 29.9391 33 24.0003 33Z"></path>
          </svg>
        }>{_language.register}</Button>
        {messageError && 
          <p className='text-red-500'>{messageError}</p>
        }
      </form>
    </>
  );
};