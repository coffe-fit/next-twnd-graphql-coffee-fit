import { ReactNode }from 'react';

interface props {
  children: ReactNode,
  image?: ReactNode,
  onclick?: () => void, 
  bg_color?: boolean,
  className?: string,
  disabled?: boolean,
  size?: 'sm' | 'lg' | 'xs'
  type?: 'button' | 'submit' | 'reset'
}

export const Button = ({
  children,
  image,
  onclick,
  bg_color,
  size,
  className,
  disabled,
  type
}:props) => {
  
  return (
    <button 
      type={type}
      disabled={disabled}
      className={
        `
          ${className} 
          ${bg_color ? 'cff-bg-color-green-600 dark:cff-bg-color-gray-600' : ''}
          ${!size && 'h-9 w-40'}
          ${size === 'sm' && 'h-9 w-40'}
          ${size === 'lg' && 'h-12 w-60'}
          ${size === 'xs' && 'h-9 w-auto pl-4 pr-4'}
          cff-flex-row-center
          cff-border-1
          border-gray-400
          dark:border-gray-700
          relative
        `
      }
      onClick={onclick}
    >
      <span className='absolute left-5'>
        {image}
      </span>
      {children}
    </button>
  );
};
