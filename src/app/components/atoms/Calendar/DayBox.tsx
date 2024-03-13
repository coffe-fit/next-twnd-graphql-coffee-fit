
import React, { useState, useRef } from 'react';

interface Props {
  size: 'sm' | 'md'| 'lg' | 'xl';
  numberDay: number;
  arrayColors: string[];
  disabled?: boolean;
  partyDay?: boolean;
  selected?: boolean;
  borderColor?: 'cff-bg-color-green-600' | null;
  onSelect?: () => void;
}

export const DayBox: React.FC<Props> = ({
  size,
  numberDay,
  arrayColors,
  disabled,
  partyDay,
  selected,
  borderColor,
  onSelect,
}) => {
  const lengthC = arrayColors.length;

  return (
    <div
      id="div_content"
      className={`
        cff-flex-row-center
        flex-row
        cff-border-1
        ${size === 'lg' && 'md:h-16 md:w-16'}
        ${size === 'sm' && 'sm:h-10 sm:w-10'}
        ${size === 'md' && 'md:h-12 md:w-12'}
        ${size === 'xl' && 'md:h-20 md:w-20'}
        h-10 w-10
        md:h-12 md:w-12
        relative
        ${borderColor ? `${borderColor} dark:bg-green-500` : ''}
        ${selected && !borderColor && selected === true && 'bg-green-200 dark:bg-green-300'}
        ${partyDay && !borderColor && partyDay === true && 'bg-gray-300 dark:bg-neutral-800'}
        ${disabled && !borderColor && disabled === true && 'text-neutral-200 dark:text-neutral-800'}
        cff-button
        
      `}
      style={{ userSelect: 'none' , touchAction: 'none' }}
    >
      <span className="absolute left-3 top-0.5 text-lg">{numberDay}</span>
      <span
        className={`
          flex
          flex-row
          absolute
          bottom-1
          w-4/5
          sm:h-9
          h-3
          ml-2
          mr-2
          bg-color-3
        `}
      >
        {arrayColors.map((item, index) => (
          <div
            key={index}
            className={`
              ${lengthC === 2 ? 'w-1/2' : lengthC === 3 ? 'w-1/3' : 'w-full'}
              ${
                item === 'red'
                  ? 'bg-red-400'
                  : item === 'blue'
                  ? 'bg-blue-300'
                  : item === 'green'
                  ? 'bg-green-300'
                  : 'bg-slate-500'
              }
            `}
          ></div>
        ))}
      </span>
    </div>
  );
};
