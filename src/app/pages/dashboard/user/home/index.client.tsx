'use client'

import useCustomRouter  from '@/app/hooks/useCustomRouter';
import Image from 'next/image';
import { useDispatch, useSelector } from "react-redux"; 
import { Button, Calendar } from "@/app/components/atoms";

import { CalendarDayInterface } from "@/lib/interfaces/calendarDay.interface";

import { addRutineSelected } from "@/provider/redux/userSlice";
import CustomSessionStorage from '@/lib/util/CustomSessionStorage';
// import { useLoading } from '@/app/hooks/useLoading';
import { useEffect, useState } from 'react';
import MainLayout from '@/app/layouts/MainWithLoading';
import { ClientRutineDay } from '../rutine_day/index.client';
import { language } from '@/lib/lenguage';


import urlGrafics from '@/app/images/icons/barra-grafica-99-80s.png';
import urlGraficsWhite from '@/app/images/icons/barra-grafica-white-99.png';

export const ClientHome = ({
  rutineType, rutineDay
}:any) => {

  const router = useCustomRouter();

  const dispatch = useDispatch();
  const todayreal = new Date().toLocaleString("en-ZA", {timeZone: "America/Bogota"}).replaceAll('/','-').split(',')[0]
  
  const todayNum = new Date(todayreal).getUTCDay();
  const [stateTodayNum, setStateTodayNum] = useState<string>(todayNum.toString());

  let user = useSelector((state: any) => state.user);
  
  const customSessionStorage = CustomSessionStorage();
  const _language = language('español');
  // const { setLoading } = useLoading();
  // useEffect(() => {
  //   setLoading(false);
  // }, []);
  dispatch(addRutineSelected({
    rutines: rutineDay 
  }));
  const handleClickCalendar = (day: CalendarDayInterface) => {
    dispatch(addRutineSelected({
      rutines: rutineDay 
    }));
    console.log(day, todayNum);
    
    setStateTodayNum(_language.daysArray.indexOf(day.dayName).toString())
    // const url = format({
    //   pathname: '/pages/dashboard/user/rutine_day',
    //   query: {
    //     id: customSessionStorage.getItem('auth_token'),
    //     day:  day.dayName
    //   }
    // });
    // router.push(url);
  }

  
  
  return (
    <MainLayout>
    <div className="flex flex-col overflow-y-auto items-center h-full">
      <span className="
        cff-flex-row-center
        flex-col
        md:flex-row
      ">
        <span>
          <Calendar onclick={handleClickCalendar} size="xl" bgImage={true} />
        </span>
      </span>
      <ClientRutineDay day={_language.daysArray[+stateTodayNum]}></ClientRutineDay>
      <span className="absolute bottom-1 flex justify-center w-full ">
        <Button size="lg"
          className="bottom-0 cff-bg-color-green-600 dark:bg-green-500 !h-14 !w-14 "
          onclick={()=>{
            console.log(user);
            
            router.push(`/pages/dashboard/user/progressCharts?id=${customSessionStorage.getItem('auth_token')}&user=${user.id}`);
          }}
        >
          <Image className={"block dark:hidden "} src={urlGrafics} alt={'alt'} width={45} height={45}/>
          <Image className={"hidden dark:block "} src={urlGraficsWhite} alt={'alt'} width={45} height={45}/>
        </Button>
      </span>
    </div>
    </MainLayout>
  );
};
