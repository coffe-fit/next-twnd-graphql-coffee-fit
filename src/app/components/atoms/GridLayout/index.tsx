'use client'
import { useState, ReactNode } from 'react';
import { removeAccents } from '@/lib/util';
import { Input } from '..';
import { Row } from './row';
import { language, translateString } from '@/lib/lenguage';
import { StaticImageData } from 'next/image';

interface Props {
  cols: any[];
  btns: {
    name: string;
    img: string | StaticImageData;
    imgDark?: string | StaticImageData;
    action: (item: any) => void;
  }[];
  hideHeader?: boolean;
  showOnlyColumns?: string[];
  filterInputBy: string;
  filterInputByText?: string;
  classNameContainer?: string;
  classNameGrid?: string;
  classNameRow?: string;
}

export const GridLayout = ({
  cols,
  btns,
  hideHeader,
  showOnlyColumns,
  filterInputBy,
  classNameContainer,
  classNameGrid,
  filterInputByText,
  classNameRow,
}: Props) => {
  const [inputValue, setInputValue] = useState('');
  const [selected, setSelected] = useState(false);
  const [openList, setOpenList] = useState(false);

  const currentLanguage = language('español');

  const headers = showOnlyColumns ? showOnlyColumns : Object.keys(cols[0]);
  const headerLength = btns ? headers.length + 1 : headers.length;

  // Duplicate cols to avoid modifying the original
  const colsSearch = [...cols];

  // Function to rename keys in objects
  function renameKey(obj: any, oldKey: string, newKey: string) {
    if (obj[newKey] !== obj[oldKey]) obj[newKey] = obj[oldKey];
  }

  // Rename keys in the objects
  colsSearch.forEach((obj: any) => renameKey(obj, filterInputBy, 'id'));
  colsSearch.forEach((obj: any) => renameKey(obj, filterInputBy, 'name'));

  // Filter options based on input value
  const filteredOptions = colsSearch.filter((item: any) => {
    const originalName = item.name || '';
    const translatedName = translateString(currentLanguage, originalName) || originalName;
    const originalKeywords = item.keywords || '';
    const translatedKeywords = translateString(currentLanguage, originalKeywords) || originalKeywords;

    const filterName = removeAccents(translatedName);
    const filterKeywords = removeAccents(translatedKeywords);

    return (
      filterName.toLowerCase().includes(inputValue.toLowerCase()) ||
      originalName.toLowerCase().includes(inputValue.toLowerCase()) ||
      filterKeywords.toLowerCase().includes(inputValue.toLowerCase()) ||
      originalKeywords.toLowerCase().includes(inputValue.toLowerCase())
    );
  });

  // Render list of filtered options
  const renderList = filteredOptions.map((item: any, index: number) => {
    const regex = new RegExp(`(${inputValue})`, 'gi'); // Simplified regex
    const getValue = (_value: any) => {
      const value = translateString(currentLanguage, _value) || _value;
      return (
        <span className="font-sans line-clamp-1">
          {value.split(regex).map((part: string, idx: number) =>
            part.toLowerCase() === inputValue.toLowerCase() ? <b key={idx}>{part}</b> : part
          )}
        </span>
      );
    };

    return (
      <span key={`1_${index}`} id={`1_${index}`}>
        <Row
          item={item}
          index={index}
          headers={headers}
          imageLeft={item.imgGood ? item.imgGood : undefined}
          btns={btns}
          _headLength={headerLength}
          maskField={getValue}
          showOnlyColumns={showOnlyColumns}
          classNameRow={classNameRow}
        />
      </span>
    );
  });

  // Handle input change
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelected(false);
    setInputValue(event.target.value);
    setOpenList(true);
  };

  return (
    <div className={classNameContainer}>
      <div className="flex justify-end">
        <Input
          size="sm"
          bgColor={true}
          type="text"
          value={inputValue.toLowerCase()}
          onChange={handleInputChange}
          name=""
          id=""
          placeholder={filterInputByText}
        />
      </div>
      {!hideHeader && (
        <div className={`
          grid row-auto
          grid-cols-${headerLength}
          w-full cff-border-1
          cff-bg-color-green-600 dark:bg-green-500
        `}>
          {headers.map((header, index) => (
            <div key={index} className="p-2">
              {header}
            </div>
          ))}
        </div>
      )}
      <div className={classNameGrid}>
        {renderList}
      </div>
    </div>
  );
};
