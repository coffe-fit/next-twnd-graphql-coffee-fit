import { ReactNode }from 'react';

interface props {
  title: string,
  children: ReactNode
}

export const BoxWithTitle = ({
  title,
  children
}:props) => {
  
  return (
    <div className="flex flex-col items-center h-full 
    !rounded-tl-xl 
    !rounded-tr-xl ">
      <div className="cff-border-1 w-80 h-full">
        <span className="
          flex flex-col
          items-center
          w-full text-2xl
          cff-bg-color-green-600
          dark:bg-green-500
          rounded-t-lg
        ">
          {title}
        </span>
        <div className="cff-border-1 w-auto"></div>
        {children}
      </div>
    </div>
  );
};
