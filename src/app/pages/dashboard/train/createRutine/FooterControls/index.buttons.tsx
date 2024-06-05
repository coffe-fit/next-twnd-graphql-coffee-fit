'use client'
import { useEffect, useState,  } from 'react';
import { ButtonItem } from '@/app/hooks/useFooter';
import { useLoading } from '@/app/hooks/useLoading';

export const FooterButtons = ({ statePage, setStatePage, setShowPopupSave,indicatorNumber}: any) => {
  const { setButtonsList, registerAction  } = useLoading();
  useEffect(() => {
    createButtonsFooter();
  }, [indicatorNumber, statePage]);

  const createButtonsFooter = ()=>{
    let newButtonsList: ButtonItem[] = statePage === 4 ? [
      { urlImage: 'calendar', actionType: 'SHOW_CALENDAR', size: 'lg', className: '' },
      { urlImage: 'list', actionType: 'SHOW_LIST', size: 'lg', className: '', indicatorNumber: indicatorNumber },
      { urlImage: 'save', actionType: 'SHOW_SAVE', size: 'lg', className: '' }
    ]:[
      { urlImage: 'calendar', actionType: 'SHOW_CALENDAR', size: 'lg', className: '' },
      { urlImage: 'resume', actionType: 'SHOW_RESUME', size: 'lg', className: '', indicatorNumber: indicatorNumber  },
      { urlImage: 'save', actionType: 'SHOW_SAVE', size: 'lg', className: '' }
    ]

    setButtonsList(newButtonsList);

    registerAction('SHOW_CALENDAR', (data) => {
      setStatePage(0)
    });

    registerAction('SHOW_RESUME', (data) => {
      setStatePage(4)
    });

    registerAction('SHOW_LIST', (data) => {
      setStatePage(2)
    });

    registerAction('SHOW_SAVE', (data) => {
      setShowPopupSave(true)
    });
  }
  return (
    <>
    </>
  );
};

