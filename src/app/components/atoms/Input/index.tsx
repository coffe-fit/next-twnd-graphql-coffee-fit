import { useState } from 'react';

interface Props {
  onEnter?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  bgColor?: boolean;
  dark?: boolean;
  className?: string;
  size?: 'sm' | 'lg';
  placeholder?: string;
  value?: string;
  name: string;
  id: string;
  type?: 'text' | 'password' | 'number' | 'phone';
  autoComplete?: 'off' | string;
  required?: boolean;
  pattern?: string;
  title?: string;
  disable?: boolean
}

export const Input = ({
  onEnter,
  bgColor,
  dark,
  size,
  className,
  placeholder,
  value,
  onChange,
  name,
  id,
  type = 'text',
  autoComplete = 'off',
  required,
  pattern,
  title,
  disable
}: Props) => {
  const [showTitleTop, setShowTitleTop] = useState<boolean>(false);
  const [classTransition, setClassTransition] = useState<string>('-z-50 opacity-10');
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };
  const arrayPlaceholder = placeholder ? placeholder.toString().split('') : [];
  return (
    <span className="relative">
      <input
        value={value}
        id={id}
        name={name}
        type={type}
        onChange={handleChange}
        autoComplete={autoComplete}
        placeholder={classTransition === '-z-50 opacity-10' ? placeholder : ''}
        className={`
          ${className}
          ${disable && 'opacity-35'}
          ${bgColor ? 'bg-neutral-100 dark:cff-bg-color-gray-600' : ''}
          ${!size && 'h-9 w-40'}
          ${size === 'sm' && 'h-9 w-40'}
          ${size === 'lg' && 'h-12 w-60'}
          ${dark === true && 'dark:!cff-bg-color-gray-600'}
          cff-flex-row-center
          cff-border-1
          p-3
          border-gray-400
          dark:border-gray-700
          dark:text-slate-100
          relative
          placeholder:text-gray-600
          dark:placeholder:text-gray-400
          focus-visible:border-green-500
        `}
        required={required}
        pattern={pattern}
        title={title}
        disabled={disable}
        onFocus={(e: any)=>{
          setClassTransition('opacity-95 -translate-y-[1rem] delay-150')

          setShowTitleTop(true)}
        }
        onBlur={(e: any)=>{
          if(!value){

            setClassTransition('-z-50 opacity-10')
            setShowTitleTop(false)}
          }
        }
      />
      <>
      {size === 'sm' && 
        <>
        {classTransition !== '-z-50 opacity-10' &&
          <span className={` absolute -top-[18px] ml-3 w-full ${bgColor ? ' text-neutral-100 dark:text-zinc-700' : ''} w-3`}>{arrayPlaceholder?.map(()=><>_</>)}</span>
        }
        <span className={`  truncate w-full absolute bottom-0 ml-3 mb-2 transition-all ${classTransition} duration-700 ease-out${bgColor ? ' text-neutral-100 dark:text-neutral-400' : ''}`}>{placeholder}</span>
        </>
      }
      </>

      {/* <>
      {size === 'lg' && 
        <>
        {classTransition !== '-z-50 opacity-10' &&
          <span className={` absolute top-[4px] ml-3 ${bgColor ? ' text-neutral-100 dark:text-zinc-700' : ''} w-3`}>{arrayPlaceholder?.map(()=><>_</>)}</span>
        }
        <span className={` absolute bottom-3 ml-3 mb-2 transition-all ${classTransition} duration-700 ease-out`}>{placeholder}</span>
        </>
      }
      </> */}
    </span>
  );
};