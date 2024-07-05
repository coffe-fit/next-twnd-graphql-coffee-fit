import { useState } from 'react';

interface CheckBoxWithLabelProps {
  label: string;
  name: string;
  value: boolean;
  onChange: (name: string, value: boolean, checked: boolean) => void;
}

export const CheckBoxWithLabel: React.FC<CheckBoxWithLabelProps> = ({ label, name, value, onChange }) => {
  const [isChecked, setIsChecked] = useState(value);

  const toggleCheckbox = () => {
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange(name, value, newChecked);
  };

  return (
    <div className="flex items-center">
      <div
        className={`w-6 h-6 flex items-center justify-center border-2 rounded-md ${
          isChecked ? 'border-green-500 shadow shadow-green-300/30' : 'border-gray-400 shadow shadow-gray-300/30'
        } cursor-pointer transition duration-200 ease-in-out`}
        onClick={toggleCheckbox}
      >
        {isChecked && (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 text-green-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        )}
      </div>
      <span className="ml-2 text-center">{label}</span>
    </div>
  );
};
