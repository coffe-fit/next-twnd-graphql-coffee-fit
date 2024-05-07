
interface TextareaProps {
  onEnter?: () => void;
  onChange?: (e: any) => void;
  bgColor?: boolean;
  dark?: boolean;
  className?: string;
  size?: 'sm' | 'lg';
  placeholder?: string;
  value?: string;
  name: string;
  id: string;
  autoComplete?: 'off' | string;
}

export const Textarea = ({
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
  autoComplete,
}: TextareaProps) => {
  return (
    <span className="relative">
      <textarea
        value={value}
        id={id}
        name={name}
        onChange={onChange}
        autoComplete={autoComplete ? autoComplete : 'off'}
        placeholder={placeholder}
        className={`
          ${
            bgColor
              ? 'cff-bg-color-green-600 dark:cff-bg-color-gray-600'
              : ''
          }
          ${!size && 'h-20 w-60'}
          ${size === 'sm' && 'h-20 w-60'}
          ${size === 'lg' && 'h-32 w-80'}
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
      />
      {/* <Placeholder value={value} placeholder={placeholder} /> */}
    </span>
  );
};