'use client'
import { Button } from "@/app/components/atoms";
import { useSelector } from "react-redux";

interface props {}
export const DashboardHeader =  ({}:props) => {
  const userData = useSelector((state: any) => state.user);
  

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
        <Button size="xs">☰</Button>
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