'use client'
import { ReactNode, useEffect, useState } from "react";
import { DashboardHeader as Header } from '@/app/components';
import CustomSessionStorage from '@/lib/util/CustomSessionStorage';
import useCustomRouter from "@/app/hooks/useCustomRouter";

interface props {
  children: ReactNode
}

export default function DashboardLayout({children}:props) {
  const [showPage, setShowPage] = useState<boolean>(false);

  const router = useCustomRouter();

  const customSessionStorage = CustomSessionStorage();
  

  useEffect(() => {
    if(customSessionStorage.getItem('auth_token') === undefined) {
      // router.push('/');
      console.log('error');
      
    } else { 
      setShowPage(true);
    }
  }, []);
  return (
    <div className="flex flex-col items-center h-screen">
      <Header></Header>
      {showPage && <span className="
          h-[calc(100%-2.5rem)]
          fixed top-9
          overflow-y-auto
          w-full
        ">{children}</span>}
      
    </div>
  );
}