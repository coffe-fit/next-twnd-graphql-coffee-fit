'use client'
import { useSearchParams } from 'next/navigation'
import { ReactNode } from "react";
import { DashboardHeader as Header } from '@/app/components';
import { valitateToken } from '@/lib/util/jwt';

interface props {
  children: ReactNode
}

export default  function trainLayout({children}:props) {

  // function validate(id: string) {
  //   const validate = valitateToken(id || '');
  //   console.log(validate);
  //   return validate;
  // }
  // const searchParams = useSearchParams()
  // const id = searchParams.get('id');
  
  // const decodeToken = validate(id || '');
  // const role = decodeToken?.roleName;
  // console.log(decodeToken);
  
  
  return (
    <div className="">
      {<span className="
          mt-3
          h-[calc(100%-40px)]
          absolute top-9
          overflow-y-auto
          w-full
        ">{children}</span> }
    </div>
  );
}