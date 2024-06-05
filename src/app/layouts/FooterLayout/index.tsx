'use client'
import { ButtonItem, useFooter } from '@/app/hooks/useFooter';
import { Button } from "@/app/components/atoms";
import Image from 'next/image';
// Imágenes
import urlCalendar from '@/app/images/icons/calendar-99-80s.png';
import urlCalendarWhite from '@/app/images/icons/calendar-white-99-80s.png';
import urlResume from '@/app/images/icons/lista-99-80s.png';
import urlResumeWhite from '@/app/images/icons/lista-white-99-80s.png';
import urlSave from '@/app/images/icons/salvar-99-80s.png';
import urlSaveWhite from '@/app/images/icons/salvar-white-99-80s.png';
import urlList from '@/app/images/icons/lista-imgs-99-80s.png';
import urlListWhite from '@/app/images/icons/lista-imgs-white-99-80s.png';
import urlAddUserImg from '@/app/images/icons/agregar-usuario-99.png';
import urlAddUserWhiteImg from '@/app/images/icons/agregar-usuario-white-99.png';
import urlPesa from '@/app/images/icons/pesa-99.png';
import urlPesaWhite from '@/app/images/icons/pesa-white-99.png';
import urlGrafics from '@/app/images/icons/barra-grafica-99-80s.png';
import urlGraficsWhite from '@/app/images/icons/barra-grafica-white-99.png';

import { SizeType } from "@/app/components/atoms/Button";
import { useLoading } from '@/app/hooks/useLoading';

export type IconType = 'addUser' | 'pesa' | 'calendar' | 'resume' | 'save' | 'list' | 'grafics';

export default function FooterLayout() {
  const { buttonsList, handleButtonClick } = useLoading();

  const arrayIcons: Record<IconType, JSX.Element> = {
    addUser: (
      <>
        <Image className="block dark:hidden" src={urlAddUserImg} alt="Agregar Usuario" width={40} height={40} />
        <Image className="hidden dark:block" src={urlAddUserWhiteImg} alt="Agregar Usuario Blanco" width={40} height={40} />
      </>
    ),
    pesa: (
      <>
        <Image className="block dark:hidden" src={urlPesa} alt="Pesa" width={40} height={40} />
        <Image className="hidden dark:block" src={urlPesaWhite} alt="Pesa Blanca" width={40} height={40} />
      </>
    ),
    calendar: (
      <>
        <Image className="block dark:hidden" src={urlCalendar} alt="Pesa" width={40} height={40} />
        <Image className="hidden dark:block" src={urlCalendarWhite} alt="Pesa Blanca" width={40} height={40} />
      </>
    ),
    resume: (
      <>
        <Image className="block dark:hidden" src={urlResume} alt="Pesa" width={40} height={40} />
        <Image className="hidden dark:block" src={urlResumeWhite} alt="Pesa Blanca" width={40} height={40} />
      </>
    ),
    save: (
      <>
        <Image className="block dark:hidden" src={urlSave} alt="Pesa" width={40} height={40} />
        <Image className="hidden dark:block" src={urlSaveWhite} alt="Pesa Blanca" width={40} height={40} />
      </>
    ),
    list: (
      <>
        <Image className="block dark:hidden" src={urlList} alt="Pesa" width={40} height={40} />
        <Image className="hidden dark:block" src={urlListWhite} alt="Pesa Blanca" width={40} height={40} />
      </>
    ),
    grafics: (
      <>
        <Image className="block dark:hidden" src={urlGrafics} alt="Pesa" width={40} height={40} />
        <Image className="hidden dark:block" src={urlGraficsWhite} alt="Pesa Blanca" width={40} height={40} />
      </>
    ),
  };

  return (
    <div className="w-full flex justify-between ">
      {buttonsList.map((item: ButtonItem, index: number) => (
        <span key={`buttonsFooter_${index}`}>
          <Button
            onclick={() => handleButtonClick(item.actionType, { /* datos adicionales si es necesario */ })}  
            size={item.size}
            className={`${item.className} bottom-0 cff-bg-color-green-600 dark:bg-green-500 !h-14 !w-14 `}
          >
            {arrayIcons[item.urlImage]}
            <div className="absolute -top-2 right-1">
              <p className="text-sm">{item.indicatorNumber}</p>
            </div>
          </Button>
        </span>
      ))}
    </div>
  );
}