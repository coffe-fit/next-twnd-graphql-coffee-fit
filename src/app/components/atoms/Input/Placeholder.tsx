'use client'
import { useEffect, useState }from 'react';

interface props {
  placeholder?: string;
  value: string
}

export const Placeholder = ({
  placeholder,
  value,
}:props) => {
  const [showSpan, setShowSpan] = useState<boolean>(false);


  useEffect(() => {
    console.log('value', value);
    
    if(value && value !== '') {
      setShowSpan(true)
    } else {
      setShowSpan(false)
    }
  }, [value]);
  
  return (
    <span >
      {placeholder && showSpan &&
        <span className='absolute left-2 -top-3 text-sm'>
          {placeholder}
        </span>
      }
    </span>
  );
};
