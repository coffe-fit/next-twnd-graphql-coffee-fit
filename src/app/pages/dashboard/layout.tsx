'use client'
import { ReactNode, useEffect, useState } from "react";
import { DashboardHeader as Header } from '@/app/components';
import CustomSessionStorage from '@/lib/util/CustomSessionStorage';
import useCustomRouter from "@/app/hooks/useCustomRouter";
// import { useLoading } from "@/app/hooks/useLoading";

interface props {
  children: ReactNode
}

export default function DashboardLayout({children}:props) {
  const [showPage, setShowPage] = useState<boolean>(false);

  const router = useCustomRouter();

  const customSessionStorage = CustomSessionStorage();
  
  useEffect(() => {
    if(customSessionStorage.getItem('auth_token') === undefined) {
      router.push(`/pages/errorPage?id=AUTH_TOKEN_FAIL`);
    } else { 
      setShowPage(true);
    }
  }, []);
  return (
    
    <div className="flex flex-col items-center h-screen">
      <Header></Header>
      {showPage && <span className="
          h-[calc(100%-40px)]
          absolute top-9
          overflow-y-auto
          w-full
        ">{children}</span>}
      
    </div>
  );
}