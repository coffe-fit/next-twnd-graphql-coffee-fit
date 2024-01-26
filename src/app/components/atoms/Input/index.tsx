import { ReactNode }from 'react';
import { Placeholder } from './Placeholder';

interface props {
  onenter?: () => void,
  onChange?: (e:any) => void, 
  bg_color?: boolean,
  className?: string;
  size?: 'sm' | 'lg';
  placeholder?: string;
  value?: any,
  name: string,
  id: string,
  type?: 'text' | 'password' | 'number',
  autoComplete?: 'off' | string 
}

export const Input = ({
  onenter,
  bg_color,
  size,
  className,
  placeholder,
  value,
  onChange,
  name,
  id,
  type,
  autoComplete,
}:props) => {
  
  return (
    <span className='relative'>
      <input
        id={id}
        name={name}
        type={type ? type : 'text'}
        onChange={onChange}
        autoComplete={autoComplete ? autoComplete : 'off'}
        placeholder={placeholder}
        className={
          `
            ${bg_color ? 'cff-bg-color-green-600 dark:cff-bg-color-gray-600' : ''}
            ${!size && 'h-9 w-40'}
            ${size === 'sm' && 'h-9 w-40'}
            ${size === 'lg' && 'h-12 w-60'}
            cff-flex-row-center
            cff-border-1
            p-3
            border-gray-400
            dark:border-gray-700
            relative
            // placeholder:text-gray-600
            dark:placeholder:text-gray-400
            ${className} 
          `
        }
      >
      </input>
      {/* <Placeholder value={value} placeholder={placeholder}/> */}
    </span>
    
  );
};
