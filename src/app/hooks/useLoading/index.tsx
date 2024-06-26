// // LoadingContext.tsx
'use client'
import React, { createContext, useState, useContext, useEffect } from 'react';

import { SizeType } from '@/app/components/atoms/Button';
import { IconType } from '@/app/layouts/FooterLayout';


export interface ButtonItem {
  urlImage: IconType;
  actionType: string;
  size: SizeType;
  className: string;
}
interface LoadingContextType {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  
  buttonsList: ButtonItem[];
  setButtonsList: (buttons: ButtonItem[]) => void;
  registerAction: (actionType: string, action: (data?: any) => void) => void;
  handleButtonClick: (actionType: string, data?: any) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function LoadingProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [loading, setLoading] = useState(false);
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
    <LoadingContext.Provider value={{ loading, setLoading, buttonsList, setButtonsList, registerAction, handleButtonClick }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = (): LoadingContextType => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};