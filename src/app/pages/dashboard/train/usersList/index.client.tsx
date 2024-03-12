'use client'
import { useState, useEffect } from "react";
import Image from 'next/image';

import urlAddUserImg from '@/app/images/icons/agregar-usuario-99.png'
import urlAddUserWhiteImg from '@/app/images/icons/agregar-usuario-white-99.png'
import urlEditUserImg from '@/app/images/icons/editar-usuario-99-80s.png'
import urlEditUserWhiteImg from '@/app/images/icons/editar-usuario-white-99-80s.png'
import urlGrafics from '@/app/images/icons/barra-grafica-99-80s.png'
import urlGraficsWhite from '@/app/images/icons/barra-grafica-white-99.png'
import urlRutine from '@/app/images/icons/rutina-de-ejercicios-99.png'
import urlRutineWhite from '@/app/images/icons/rutina-de-ejercicios-white-99.png';
import urlPesa from '@/app/images/icons/pesa-99.png';
import urlPesaWhite from '@/app/images/icons/pesa-white-99.png';



import { Button, GridLayout, InputAutoComplete } from '@/app/components/atoms';
import { language } from '@/lib/lenguage';
import useCustomRouter from "@/app/hooks/useCustomRouter";
import { format } from "url";
import CustomSessionStorage from "@/lib/util/CustomSessionStorage";

export const Client = ({
  usersList
}:any) => {

  const router = useCustomRouter();
  const customSessionStorage = CustomSessionStorage();
  const _language = language('español');
  
  let usersNew = usersList.filter((
    item: { role: { name: string; }; }) => 
    item.role.name === "NEW_CLIENT" 
  );

  const usersActive = usersList.filter((
    item: { role: { name: string; }; }) => 
    item.role.name === "CLIENT" || item.role.name === "TRAIN"
  );
  
  const cols2 = [...usersNew, ...usersActive];

  // Calcular si la fila o el boton va resaltado
  cols2.forEach((user: any) => {
    if (user.role.name === 'NEW_CLIENT') {
      user.resalt = true
    } else {
      if(user.rutines.length === 0) {
        user.resaltBtn0 = true
      }
      if (
        user.email, user.username, user.phone, user.document === '' 
        || user.age === 0
      ) {
        user.resaltBtn2 = true
      }
    }
  });
  // console.log(cols2);
  
  // const cols = [...usersNew, ...usersActive];
  const cols = [
    ...usersNew, ...usersActive];
  // const cols = [{
  //   email: "1alexgm@gmial.com",
  //   username: "5a",
  //   col2: "1a",
  //   // resalt: true,
  //   // resaltBtn1: true
  // }]
const btns= [
  {
    name: 'editar',
    imgDark: urlEditUserWhiteImg,
    img: urlEditUserImg,
    action: (e: any)=>{console.log('editar', e);}
  },
  {
    name: 'rutine',
    imgDark: urlRutineWhite,
    img: urlRutine,
    action: (e: any)=>{
      const url = format({
        pathname: '/pages/dashboard/train/createRutine',
        query: {
          id: customSessionStorage.getItem('auth_token'),
          user: JSON.stringify(e)
        }
      });
      router.push(url);
    }
  },
  {
    name: 'valoracion',
    imgDark: urlGraficsWhite,
    img: urlGrafics,
    action: (e: any)=>{console.log('valoracion', e);}
  },

]
const showOnlyColumns = ["email", "username"];
const filterInputBy = "email";

  return (
    <div className={`
      flex flex-col items-center h-full
      ${cols.length < 10 ? 'pt-20': 'pt-3'}
    `}>
      <span className="flex flex-col items-center w-full text-2xl pt-4 pb-4">
        {_language.users}
      </span>

      <GridLayout 
        cols={cols}
        btns={btns}
        hideHeader={true}
        showOnlyColumns={showOnlyColumns}
        filterInputBy={filterInputBy}
        classNameContainer="h-[calc(100vh-15rem)]"
        classNameGrid=" h-[calc(100vh-15rem)] overflow-y-auto"
      />
      <span className="absolute bottom-1 flex justify-between ">
        <Button size="lg" className="bottom-0 cff-bg-color-green-600 dark:bg-green-500 !h-20 !w-20">
          <Image className={"block dark:hidden"} src={urlAddUserImg} alt={'alt'} width={40} height={40}/>
          <Image className={"hidden dark:block"} src={urlAddUserWhiteImg} alt={'alt'} width={40} height={40}/>
        </Button>
        <Button size="lg" className="bottom-0 cff-bg-color-green-600 dark:bg-green-500 !h-20 !w-20">
          <Image className={"block dark:hidden"} src={urlPesa} alt={'alt'} width={40} height={40}/>
          <Image className={"hidden dark:block"} src={urlPesaWhite} alt={'alt'} width={40} height={40}/>
        </Button>
      </span>
    </div>
  );
};
