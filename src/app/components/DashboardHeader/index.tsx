'use client'
import Image from 'next/image';
import { useSelector } from "react-redux";
import useCustomRouter from '@/app/hooks/useCustomRouter';

import { Button } from "@/app/components/atoms";
import { useEffect, useState } from "react";
import urlArrow from '@/app/images/icons/flecha-izquierda-99-80s.png';
import urlArrowWhite from '@/app/images/icons/flecha-izquierda-white-99-80s.png';
import { getConfiPages } from '@/lib/util';

interface props {}
export const DashboardHeader =  ({}:props) => {
  const [showBack, setShowBack] = useState<boolean>(false);
  const userData = useSelector((state: any) => state.user);
  const router = useCustomRouter();
  // const path = usePathname();
  
  const handleButtonBack = () =>{
    router.back();
  }


  // // recuerda que el codigo de la autenticacion esta en el hook useAuth 
  useEffect(() => {
    const lastPath = router.history[router.history.length - 1];
    if (getConfiPages.pagesIni.includes(lastPath)) {
      setShowBack(false)
    } else {
      setShowBack(true)
    }
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.history]);
  
  

  return (
      <header className="
        cff-flex-row-between
        absolute
        top-0
        w-full
        cff-border-1
        h-10
        cff-bg-color-green-600
        dark:cff-bg-color-gray-600
        z-50
      ">
        {/* <Button size="xs">☰</Button> */}
        {showBack && showBack === true && (
          <Button size="xs" onclick={handleButtonBack}>
            <Image className={"block dark:hidden"} src={urlArrow} alt={'alt'} width={20} height={20}/>
            <Image className={"hidden dark:block"} src={urlArrowWhite} alt={'alt'} width={20} height={20}/>
          </Button>
        )}
        
        <Button size="xs" >{`${userData.username}`}</Button>
        
        <img 
          className="
            rounded-full
            cff-flex-row-center
            flex-row
            border-2
            sm:h-10 sm:w-10
            h-9 w-9
          "
          src={userData.imgUser}
          alt=""
          width={100}
          height={100}
        />
      </header>
  );
}