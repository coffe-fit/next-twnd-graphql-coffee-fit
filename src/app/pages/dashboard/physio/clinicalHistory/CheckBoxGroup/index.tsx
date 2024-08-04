import React, { useEffect, useState } from 'react';
import {CheckBoxWithLabel} from '@/app/components/atoms';

interface CheckBoxGroupProps {
  title: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CheckBoxGroup: React.FC<CheckBoxGroupProps> = ({ title, onChange }) => {
  const [valueInput, setValueInput] = useState<any>('');

  const [checkboxes, setCheckedValues] = React.useState<{ [key: string]: boolean }>({
    madre: false,
    padre: false,
    paciente: false,
  });

  
  const handleCheckboxChange = (name: string, value: boolean, checked: boolean) => {
    setCheckedValues((prevState) => ({
      ...prevState,
      [name]: checked,
    }));
  };
  useEffect(() => {
    const selectedValues = Object.keys(checkboxes)
      .filter((key) => checkboxes[key])
      .join(', ');
      console.log(selectedValues);
      
      setValueInput(selectedValues);
  }, [checkboxes, onChange]);

  return (
    <div>
      <h2>{title}</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around' }}>
        <div className="my-3">
          <CheckBoxWithLabel
            name="madre"
            value={checkboxes.madre}
            onChange={handleCheckboxChange}
            label=''
          />
        </div>
        <div className="my-3">
          <CheckBoxWithLabel
            name="padre"
            value={checkboxes.padre}
            onChange={handleCheckboxChange}
            label=''
          />
        </div>
        <div className="my-3">
          <CheckBoxWithLabel
            name="paciente"
            value={checkboxes.paciente}
            onChange={handleCheckboxChange}
            label=''
          />
        </div>
        <input type="text" className="hidden" value={valueInput} onChange={onChange}/>
      </div>
    </div>
  );
};

export default CheckBoxGroup;