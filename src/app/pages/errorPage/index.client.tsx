'use client'
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { language } from '@/lib/lenguage';
import useCustomRouter from '@/app/hooks/useCustomRouter';
// import { useLoading } from "@/app/hooks/useLoading";
import { Button } from '@/app/components/atoms';
import MainLayout from '@/app/layouts/MainWithLoading';

interface ErrorComponentProps {
  image?: string;
  errorMessage?: string;
  buttonMessage?:string;
  onRetry?: () => void;
  urlRetry: string;
  _children?: React.ReactNode;
}
export const ClientErrorPage = ({
  image,
  errorMessage,
  buttonMessage,
  onRetry,
  urlRetry,
  _children
}:ErrorComponentProps) => {
  const router = useCustomRouter();
  const _language = language('español');
  // const { setLoading } = useLoading();
  // useEffect(() => {
  //   setLoading(false);
  // }, []);
 

  return (
    <MainLayout>
      <div className="flex justify-center items-center h-screen">
        <div className="text-center flex">
          {image && <img src={image} alt="Error" width={200} height={200} />}
          {errorMessage && <p className="mt-4">{errorMessage}</p>}
          {onRetry && (
            <button onClick={onRetry} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              {buttonMessage}
            </button>
          )}
          {urlRetry && (
            <span className="absolute bottom-3 flex justify-center w-full">
              <Button
                size="lg"
                className="bottom-10"
                bgColor={true}
                onclick={()=>router.push(urlRetry)} 
              >{`${buttonMessage}`}
              </Button>
            </span>
          )}
          {_children}
        </div>
      </div>
    </MainLayout>
  );
};

function setLoading(arg0: boolean) {
  throw new Error('Function not implemented.');
}
