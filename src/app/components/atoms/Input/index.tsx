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
}: Props) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (onChange) {
      onChange(e);
    }
  };

  return (
    <span className="relative">
      <input
        value={value}
        id={id}
        name={name}
        type={type}
        onChange={handleChange}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`
          ${bgColor ? 'cff-bg-color-green-600 dark:cff-bg-color-gray-600' : ''}
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
          ${className}
        `}
        required={required}
        pattern={pattern}
        title={title}
      />
    </span>
  );
};