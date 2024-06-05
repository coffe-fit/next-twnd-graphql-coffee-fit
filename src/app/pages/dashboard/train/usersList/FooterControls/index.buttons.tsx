'use client'
import { useEffect, useState,  } from 'react';
import { language } from '@/lib/lenguage';
import useCustomRouter from '@/app/hooks/useCustomRouter';
import { ButtonItem } from '@/app/hooks/useFooter';
import { useDispatch } from 'react-redux';
import { useLoading } from '@/app/hooks/useLoading';
import { resetUserSelected } from '@/provider/redux/trainSlice';
import CustomSessionStorage from '@/lib/util/CustomSessionStorage';


export const FooterButtons = ({ statePage, setStatePage, setShowPopupSave,indicatorNumber}: any) => {
  const router = useCustomRouter();
  const _language = language('español');
  const { setButtonsList, registerAction  } = useLoading();
  const dispatch = useDispatch();
  const customSessionStorage = CustomSessionStorage();
  useEffect(() => {
    createButtonsFooter();
  }, []);

  const createButtonsFooter = ()=>{
    const newButtonsList: ButtonItem[] = [
      { urlImage: 'addUser', actionType: 'ADD_USER', size: 'lg', className: '' },
      { urlImage: 'pesa', actionType: 'PESA_ACTION', size: 'lg', className: '' }
    ];
    setButtonsList(newButtonsList);

    registerAction('ADD_USER', (data) => {
      dispatch(resetUserSelected());
      setButtonsList(newButtonsList);
      router.push(`/pages/dashboard/train/userCUForm?id=${customSessionStorage.getItem('auth_token')}`);
    });

    registerAction('PESA_ACTION', (data) => {
      // lógica específica para 'PESA_ACTION' con datos adicionales
      console.log('PESA_ACTION clicked', data);
    });
  }
  return (
    <>
    </>
  );
};
