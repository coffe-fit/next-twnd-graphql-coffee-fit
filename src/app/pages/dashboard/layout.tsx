'use client'
import { ReactNode, useEffect, useState } from "react";
import { DashboardHeader as Header } from '@/app/components';
import CustomSessionStorage from '@/lib/util/CustomSessionStorage';
import useCustomRouter from "@/app/hooks/useCustomRouter";
import { useSelector } from "react-redux";
// import { useLoading } from "@/app/hooks/useLoading";

interface props {
  children: ReactNode
}

export default function DashboardLayout({children}:props) {
  const [showPage, setShowPage] = useState<boolean>(false);
  let layout = useSelector((state: any) => state.layout);
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
    
    <div className="flex flex-col items-center h-screen relative">
      {layout.headerDisplay && (
        <>
        <span className="mb-10"></span>
        <Header></Header>
        </>
      )}
      {showPage && <span className="
          overflow-y-auto
          w-full
        ">{children}</span>}
      {layout.footerDisplay && (
        <span className="
        mb-14 
        fixed
        bottom-0"></span>
      )}
    </div>
  );
}