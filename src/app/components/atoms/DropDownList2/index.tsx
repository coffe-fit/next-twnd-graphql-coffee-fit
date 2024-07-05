import { useState } from 'react';
import { Popup2 } from '../Popup2';
import { language, translateString } from '@/lib/lenguage';

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
  size?: 'sm' | 'lg';
  textHeader?: string;
}

export const DropdownList: React.FC<DropdownListProps> = ({
  options,
  textIni,
  classNameInput,
  classNameOption,
  onSelect,
  onHover,
  size,
  textHeader
}) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<Option | null>(null);
  const [hoveredOption, setHoveredOption] = useState<Option | null>(null);

  const _language = language('español');

  const handleToggle = () => {
    setIsPopupOpen(true);
  };

  const handleOptionClick = (option: Option) => {
    setSelectedOption(option);
    setIsPopupOpen(false);
    if (onSelect) onSelect(option);
  };

  const handleOptionHover = (option: Option) => {
    setHoveredOption(option);
    if (onHover) onHover(option);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  return (
    <>
      <div className="relative">
        <button
          className={`
          ${!size && 'h-9 w-40'}
          ${size === 'sm' && 'h-9 w-40'}
          ${size === 'lg' && 'h-12 w-60'}
          ${classNameInput} bg-gray-300 dark:bg-neutral-800 border border-gray-300 px-4 py-2 rounded-md flex justify-between items-center`}
          onClick={handleToggle}
        >
          <span className="mr-2">{selectedOption ? translateString(_language, selectedOption.name ) : textIni}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-4 w-4 transition-transform duration-300 transform"
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
      </div>

      <Popup2 isOpen={isPopupOpen} onClose={handleClosePopup} title={`${textHeader || ''}`}>
        <div className="flex flex-col">
          {options.map((option, index) => (
            <div
              key={index}
              className={`
                ${classNameOption} px-4 py-2 cursor-pointer
                ${hoveredOption && option.id === hoveredOption.id ? 'bg-gray-300 dark:bg-neutral-800' : ''}
              `}
              onClick={() => handleOptionClick(option)}
              onMouseEnter={() => handleOptionHover(option)}
              style={{ width: '100%' }} // Asegura que cada opción ocupe el ancho completo
            >
              {translateString(_language, option.name)}
            </div>
          ))}
        </div>
      </Popup2>
    </>
  );
};

