'use client'
import { useState } from 'react';

export interface Option {
  id: string;
  name: string;
}

interface DropdownListProps {
  options: Option[];
  textIni: string;
  classNameInput?: string;
  classNameOption?: string;
  onSelect?: (option: Option) => void;
  onHover?: (option: Option) => void;
}

export const DropdownList: React.FC<DropdownListProps> = ({
  options,
  textIni,
  classNameInput,
  classNameOption,
  onSelect,
  onHover
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [hoveredOption, setHoveredOption] = useState<Option | null>(null);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  const handleOptionHover = (option: Option) => {
    setHoveredOption(option);
    if (onHover) onHover(option);
  };

  return (
    <div className="relative">
      <button
        className={`${classNameInput} bg-gray-300 dark:bg-neutral-800 border border-gray-300 px-4 py-2 rounded-md flex justify-between items-center`}
        onClick={handleToggle}
      >
        <span className="mr-2">{selectedOption && selectedOption.name === textIni? selectedOption.name : textIni}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={`h-4 w-4 transition-transform duration-300 transform ${
            isOpen ? 'rotate-180' : ''
          }`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M10 12a1 1 0 0 0 .707-.293l4-4a1 1 0 1 0-1.414-1.414L10 9.586 6.707 6.293a1 1 0 1 0-1.414 1.414l4 4a1 1 0 0 0 .707.293z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      {isOpen && (
        <div className={`absolute top-full left-0 mt-1  border bg-gray-300 dark:bg-neutral-700 rounded-md shadow-lg`}>
          {options.map((option, index) => (
            <div
              key={index}
              className={` ${classNameOption} px-4 py-2 cursor-pointer w-48 ${
                hoveredOption && option.id === hoveredOption.id ? 'bg-gray-300 dark:bg-neutral-800' : ''
              }`}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => handleOptionHover(option)}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DropdownList;



