import { Button, Input } from "@/app/components/atoms";
import { language } from '@/lib/lenguage';
import { sendVerificationEmail } from "@/lib/services";
import {  Suspense } from "react";

interface props {
  onSuccess: (message: string)=>void,
  onFail: (validate: string)=>void
}

export const SendEmail = async ({
  onSuccess,
  onFail
}:props) => {
  
  const _language = language('español');
  const handleSubmit = async (e: any) => {
    try {
      e.preventDefault();
      const _email = e.target.elements.email.value;
      const validate = validateInput(_email);
      if (validate !== '') {
        onFail(`${_language.SomethingIsWrong} ${validate}`);
      } else {
        const emailSended = await sendVerificationEmail(_email);
        console.log(emailSended);
        
        onSuccess(_language.success.code[100])
      }
    } catch (error: any) {
      onFail(_language.error.code[0]);
      if (error.code === 'auth/invalid-email') onFail(_language.error.code['auth/invalid-email']);
      if (error.code === 'auth/quota-exceeded') onFail(_language.error.code['auth/quota-exceeded']);
      console.log('sendEmail-handleSubmit',error);
    }
  }

  const validateInput = (_email: string) => {
    let validate = '';
    console.log(_email);
    
    if(!/^\S*@\S*\.\S*$/.test(_email)) validate = 'email';
    return validate
  }
  return (
    <Suspense fallback={<div>cargando1...</div>}>
      <form onSubmit={handleSubmit}>
      <Input
        name={'email'} id={'email'}
        className='mt-14' size='lg'
        placeholder='email' bgColor={true}
      />
      
        <Button type={'submit'} className='mt-3' size='lg' image={
          <svg
            width="2em" data-e2e=""
            height="2em" viewBox="0 0 48 48"
            fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M24.0003 7C20.1343 7 17.0003 10.134 17.0003 14C17.0003 17.866 20.1343 21 24.0003 21C27.8663 21 31.0003 17.866 31.0003 14C31.0003 10.134 27.8663 7 24.0003 7ZM13.0003 14C13.0003 7.92487 17.9252 3 24.0003 3C30.0755 3 35.0003 7.92487 35.0003 14C35.0003 20.0751 30.0755 25 24.0003 25C17.9252 25 13.0003 20.0751 13.0003 14ZM24.0003 33C18.0615 33 13.0493 36.9841 11.4972 42.4262C11.3457 42.9573 10.8217 43.3088 10.2804 43.1989L8.32038 42.8011C7.77914 42.6912 7.4266 42.1618 7.5683 41.628C9.49821 34.358 16.1215 29 24.0003 29C31.8792 29 38.5025 34.358 40.4324 41.628C40.5741 42.1618 40.2215 42.6912 39.6803 42.8011L37.7203 43.1989C37.179 43.3088 36.6549 42.9573 36.5035 42.4262C34.9514 36.9841 29.9391 33 24.0003 33Z"></path>
          </svg>
        }>{_language.register}</Button>
    </form>
  </Suspense>
  );
}