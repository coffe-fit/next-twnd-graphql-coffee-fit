'use client'
import { FC, useState, useEffect } from 'react';
// import styles from './InputAutoComplete.module.scss';
import { removeAccents } from '@/lib/util';

interface PropsInputAutoComplete {
  options?: any;
  placeholder: string;
  value?: any;
  fullWith?: boolean;
  onSelect: (item: any) => void;
  onSelected?: (item: any) => void;
  classNameInput?: string;
  classNameContainerList?: string;
  hideList?: boolean;
}

export const InputAutoComplete: FC<PropsInputAutoComplete> = ({
  options,
  placeholder,
  value,
  fullWith,
  onSelect,
  onSelected,
  hideList,
  // classNameInput,
  // classNameContainerList,
}) => {
  const [openList, setOpenList] = useState(false);
  const [inputValue, setInputValue] = useState(value);
  const [selected, setSelected] = useState(false);
  

  useEffect(() => {
    setOpenList(inputValue !== '' && !selected ? true : false);
  }, [inputValue, selected]);

  // const classTransformPlaceholder =
  //   inputValue !== '' ? styles['transform'] : '';
  // const classFullWith = fullWith ? styles['fullWith'] : '';

  const changeValue = (item: any) => {
    onSelect && onSelect(item);
    setSelected(true);
    const name = item.city
      ? `${item.name} - ${item.city}`
      : item.extendedName || item.name;
    setInputValue(name);
  };

  const filteredOptions = options.filter((item: any) => {
    const filterName = removeAccents(item.name);
    const filterKeywords = removeAccents(item.keywords);
    return (
      filterName?.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.name?.toLowerCase().includes(inputValue.toLowerCase()) ||
      filterKeywords?.toLowerCase().includes(inputValue.toLowerCase()) ||
      item.keywords?.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  const list = filteredOptions.map((item: any, index: number) => {
    const name = item.extendedName ? item.extendedName : item.name;
    const itemSelected = name === value ? 'btn-select-list' : '';
    const optionText = item.city
      ? `${item.name} - ${item.city}`
      : item.extendedName || item.name;
    const key = item.id ? item.id : `input-list-${index}`;
    const regex = new RegExp(`(.*?)(${inputValue})(.*)`, 'gi');
    const markedText: RegExpExecArray | null = regex.exec(optionText);

    return (
      <div
        data-testid={`test-option-list-${index}`}
        key={key}
        onClick={() => changeValue(item)}
        className='pt-2 pb-2 pl-4 pr-4 text-slate-500 hover:bg-slate-500'
        // className={`${styles['item-list']} t p-text-2 text-color-3 ${styles[itemSelected]} text-capitalize`}
      >
        {markedText ? (
          <span>
            {markedText[1]}
            <b className="">{markedText[2]}</b>
            {markedText[3]}
          </span>
        ) : (
          <span>{optionText}</span>
        )}
      </div>
    );
  });

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(false);
    setInputValue(event.target.value);
    setOpenList(true);
    onSelect({ name: '' });
  };

  return (
    <>
      <div className={`${fullWith ===true ? 'w-full': ''}`}>
        <div className={`flex flex-row items-center w-full bg-slate-400 ${fullWith ===true ? 'w-full': ''}`}>
          <input
            data-testid="input-autocomplete"
            type="text"
            value={inputValue.toLowerCase()}
            onChange={handleInput}
            className={`
              cff-border-1
              ${fullWith ===true ? 'w-full': ''}
              hover:transition-all
              focus:transition-all
              leading-4
              dark:cff-bg-color-gray-600
              shadow-[#50d71e]

            `}
            // className={`${styles['input']} ${classFullWith} text-capitalize ${classNameInput}`}
            onSelect={onSelected}
          />
          <span
            className={`leading-4 font-sans `}
            // className={`${styles['placeholder']} ${classTransformPlaceholder}`}
          >
            {placeholder}
          </span>
        </div>
        <div
          style={{ display: openList ? 'block' : 'none' }}
          // className={`${styles['container-list']} ${classNameContainerList}`}
        >
          {!hideList ? list : <></>}
        </div>
      </div>
    </>
  );
};

InputAutoComplete.defaultProps = {
  placeholder: '',
};
