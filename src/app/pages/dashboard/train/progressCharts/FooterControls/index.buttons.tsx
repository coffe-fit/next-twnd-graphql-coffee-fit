'use client'
import { useEffect, useState,  } from 'react';
import { ButtonItem } from '@/app/hooks/useFooter';
import { useLoading } from '@/app/hooks/useLoading';


export const FooterButtons = ({ setShowDataForm,setShowChart}: any) => {

  const { setButtonsList, registerAction  } = useLoading();
  useEffect(() => {
    createButtonsFooter();
  }, []);

  const createButtonsFooter = ()=>{
    const newButtonsList: ButtonItem[] = [
      { urlImage: 'grafics', actionType: 'ADD_GRAFICS', size: 'lg', className: '', indicatorNumber: '+' },
    ];
    setButtonsList(newButtonsList);

    registerAction('ADD_GRAFICS', (data) => {
      setShowDataForm(true);
      setShowChart(false);
    });
  }
  return (
    <>
    </>
  );
};
