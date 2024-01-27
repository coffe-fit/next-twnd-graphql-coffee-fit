
interface props {
  numberDay: number,
  arrayColors: string[],
  disabled?: boolean,
  partyDay?: boolean
}

export const DayBox = ({
  numberDay,
  arrayColors,
  disabled,
  partyDay
}:props) => {
  const lengthC = arrayColors.length;
  
  return (
    <div id="div_content" className={`
    cff-flex-row-center
    flex-row
    cff-border-1
    md:h-20 md:w-20
    h-12 w-12
    relative
    ${partyDay && partyDay === true && 'bg-gray-300 dark:bg-neutral-800'}
    ${disabled && disabled === true && 'text-neutral-200 dark:text-neutral-800'}
    `}>
      <span className="
        absolute
        left-3
        top-0.5
        text-lg
      ">{numberDay}</span>
      <span className="
        flex
        flex-row
        absolute
        bottom-1
        w-4/5
        sm:h-9
        h-3
        ml-2
        mr-2
      ">
        {arrayColors.map((item, index)=>(
          <div 
            key={index}
            className={`
              ${lengthC === 2 ? 'w-1/2' :
                lengthC === 3 ? 'w-1/3' :
                'w-full'}
              ${item ==='red' ? 'bg-red-400':
                item ==='blue' ? 'bg-blue-300':
                item ==='green' ? 'bg-green-300':
                'bg-slate-500'
              }
          `}></div>
        ))}
        
      </span>
    </div>
  );
};