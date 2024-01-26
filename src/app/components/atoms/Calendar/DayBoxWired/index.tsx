'use client'

import { useState } from "react";

import "wired-elements/";
import styles from './styles.module.css';


interface props {
  numberDay: number,
  arrayColors: string[],
  disabled?: boolean
}

export const DayBoxWired = ({
  numberDay,
  arrayColors,
  disabled
}:props) => {
  const lengthC = arrayColors.length;
  
  return (
    <wired-card>
      <div id="div_content" className="
      cff-flex-row-center
      flex-row
      md:h-16 md:w-16
      h-8 w-8
      relative
    ">
      <span className="
        absolute
        lg:left-3
        left-1
        md:top-0.5
        -top-1
        text-lg
      ">{numberDay}</span>
      <span className="
        flex
        flex-row
        absolute
        md:bottom-0.5
        bottom-0
        w-4/5
        md:h-9
        h-3
        ml-2
        mr-2
      ">
        {arrayColors.map((item, index)=>(
          <div 
            key={index}
            className={`
              ${lengthC === 2 ? 'w-1/2' :
                lengthC === 3 ? 'w-1/3' :
                'w-full'}
              ${item ==='red' ? 'bg-red-400':
                item ==='blue' ? 'bg-blue-300':
                item ==='green' ? 'bg-green-300':
                'bg-slate-500'
              }
          `}></div>
        ))}
        
      </span>
    </div>
    </wired-card>
  );
};