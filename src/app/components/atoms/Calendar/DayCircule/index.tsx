'use client'

import { useState } from "react";

// import "wired-elements/";

interface props {
  numberDay: number,
  arrayColors: string[],
  disabled?: boolean
}

export const DayCircule = ({ 
  numberDay,
  arrayColors,
  disabled
}:props) => {
  const [email, setEmail] = useState<string>(arrayColors[0]);
  const lengthC = arrayColors.length;
  
  return (
    <div id="div_content" className="
      rounded-full
      cff-flex-row-center
      flex-row
      border-2
      sm:h-20 sm:w-20
      h-12 w-12
      relative
    ">
      <span className="
        absolute
        cff-flex-row-center
        top-0.5
        text-lg
      ">{numberDay}</span>
      <span className="
        flex
        flex-row
        absolute
        bottom-2
        w-4/5
        sm:h-9
        h-3
        ml-2
        mr-2
      ">
        {/* {arrayColors.map((item, index)=>(
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
        ))} */}
        
      </span>
    </div>
  );
};