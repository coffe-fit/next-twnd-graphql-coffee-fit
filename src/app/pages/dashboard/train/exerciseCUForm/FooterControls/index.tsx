'use client'
import { useEffect, useState,  } from 'react';
import { language } from '@/lib/lenguage';
import useCustomRouter from '@/app/hooks/useCustomRouter';
import { ButtonItem } from '@/app/hooks/useFooter';
import { useDispatch } from 'react-redux';
import { useLoading } from '@/app/hooks/useLoading';
import { resetExerciseSelected} from '@/provider/redux/trainSlice';
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
    //recuerda que las imahgenes estan en el layout FooterLayout
    const newButtonsList: ButtonItem[] = [
      { urlImage: 'addUser', actionType: 'USER_ACTION', size: 'lg', className: '' },
      { urlImage: 'pesa', actionType: 'PESA_ACTION', size: 'lg', className: '' }
    ];
    setButtonsList(newButtonsList);

    registerAction('USER_ACTION', (data) => {
      dispatch(resetExerciseSelected());
      setButtonsList(newButtonsList);
      router.push(`/pages/dashboard/train/usersList?id=${customSessionStorage.getItem('auth_token')}`);
    });

    registerAction('PESA_ACTION', (data) => {
      dispatch(resetExerciseSelected());
      setButtonsList(newButtonsList);
      router.push(`/pages/dashboard/train/exerciseList?id=${customSessionStorage.getItem('auth_token')}`);
    });
  }
  return (
    <>
    </>
  );
};
