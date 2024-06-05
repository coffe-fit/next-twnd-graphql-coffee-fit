
'use client'
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { SizeType } from '@/app/components/atoms/Button';
import { IconType } from '@/app/layouts/FooterLayout';


export interface ButtonItem {
  urlImage: IconType;
  actionType: string;
  size: SizeType;
  className: string;
  indicatorNumber?:string
}

interface FooterContextProps {
  buttonsList: ButtonItem[];
  setButtonsList: (buttons: ButtonItem[]) => void;
  registerAction: (actionType: string, action: (data?: any) => void) => void;
  handleButtonClick: (actionType: string, data?: any) => void;
}

const FooterContext = createContext<FooterContextProps | undefined>(undefined);


export const FooterProvider = ({ children }: { children: ReactNode }) => {
  const [buttonsList, setButtonsList] = useState<ButtonItem[]>([]);
  const [actions, setActions] = useState<Record<string, (data?: any) => void>>({});

  const registerAction = (actionType: string, action: (data?: any) => void) => {
    setActions((prevActions) => ({ ...prevActions, [actionType]: action }));
  };

  const handleButtonClick = (actionType: string, data?: any) => {
    if (actions[actionType]) {
      actions[actionType](data);
    }
  };

  return (
    <FooterContext.Provider value={{ buttonsList, setButtonsList, registerAction, handleButtonClick }}>
      {children}
    </FooterContext.Provider>
  );
};

export const useFooter = () => {
  const context = useContext(FooterContext);
  if (!context) {
    throw new Error('useFooter must be used within a FooterProvider');
  }
  return context;
};