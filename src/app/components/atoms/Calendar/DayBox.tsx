'use client'
interface props {
  numberDay: number,
  arrayColors: string[]
}

export const DayBox = ({
  numberDay,
  arrayColors
}:props) => {
  
  return (
    <div className="
      cff-flex-row-center
      flex-col
      border-2
      h-20 w-20
      relative
    ">
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
        bottom-2
        w-4/5
        h-9
        ml-2
        mr-2
      ">
        {arrayColors.map((item, index)=>(
          <div 
            key={item}
            className={`
              ${arrayColors.length === 1 && 'w-full'} 
              w-1/${arrayColors.length}
              ${item ==='red' ? 'bg-red-400':
                item ==='blue' ? 'bg-blue-300':
                'bg-slate-500'
              }
          `}></div>
        ))}
        
      </span>
    </div>
  );
};