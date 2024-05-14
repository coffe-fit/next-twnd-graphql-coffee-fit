import { closePopup } from '@/provider/redux/popupSlice';
import React, { useState } from 'react';
interface PopupProps {
  children: React.ReactNode;
  title?: string;
  buttonText1?: string;
  buttonText2?: string;
  onClickButton1?: () => void;
  onClickButton2?: () => void;
  isOpen: boolean;
  onClose: () => void;
  
}

export const Popup2 = ({
  children,
  title,
  buttonText1,
  buttonText2,
  onClickButton1,
  onClickButton2,
  onClose,
  isOpen
}: PopupProps) => {

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-800 bg-opacity-60 mx-10">
          <div className="bg-white flex dark:bg-gray-800 dark:bg-opacity-90 shadow-lg rounded-lg !rounded-tl-xl p-6 max-w-sm w-full relative">
            <div className='absolute w-full top-0 right-0 bg-gray-100 dark:bg-gray-800 flex justify-end rounded-tr-lg rounded-tl-lg'>
              <span className="w-full flex justify-center text-lg mt-1 mb-1">
                {title && (
                  <>{title}</>
                )}
              </span>
              <button onClick={onClose} className= {`relative top-0 right-0 rounded-tr-lg h-8 px-2 bg-gray-300 dark:bg-gray-600 text-white `}>
                x
              </button>
            </div>
            <span className="min-h-44 mt-7 mb-7 w-full">
              {children}
            </span>
            {buttonText1 && buttonText2 && (
              <span className="absolute bottom-0 flex justify-between w-full right-0">
                <button onClick={onClickButton1} className=" w-full mr-2 px-4 py-2 cff-bg-color-green-600 dark:cff-bg-color-green-700 dark:text-white text-gray-500 rounded hover:bg-opacity-20">
                  {buttonText1}
                </button>
                <button onClick={onClickButton2} className=" w-full px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500">
                  {buttonText2}
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </>
  );
};
