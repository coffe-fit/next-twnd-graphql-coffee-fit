'use client'
import { language, translateString } from "@/lib/lenguage";
interface props {
  name: string,
  id: string,
  rutines?: any[]
  keyProp: number,
  bgColor: string
}
export const RutineTypeBox = ({
  name,
  id,
  rutines,
  bgColor
}:props) => {
  const _language = language('español');
  return (
    <div className={`
      h-auto
      w-40
      cff-border-1
      flex-col
      pl-6 pr-1
      relative
      cff-button
      ${bgColor ? `cff-bg-color-green-600 dark:bg-green-500`: ''}
    `}>
      <span className="cff-flex-row-center"id='title'>
        {translateString(_language,name)}
      </span>
      <span id='text' className={`
        text-xs
        overflow-auto
      `}>
        {rutines && rutines.map((item, index) =>(
          <li className ={`truncate`} key={index}> {translateString(_language,item.exercise.name)} </li>
        ))}
      </span>
      
      <span id='color'className={`
        absolute
        left-3
        bottom-2
        h-[calc(100%-2.5rem)]
        w-2
        bg-green-300
      `}></span>
    </div>
  );
}