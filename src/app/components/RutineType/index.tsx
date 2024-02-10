interface props {
  name: string,
  id: string,
  rutines?: any[]
}
export const RutineType = ({
  name,
  id,
  rutines
}:props) => {
  return (
    <div className="
      h-auto
      w-40
      cff-bg-color-green-700
      cff-border-1
      flex-col
      pl-6 pr-1
      relative
    ">
      <span className="cff-flex-row-center"id='title'>
        {name}
      </span>
      <span id='text' className={`
        text-xs
        overflow-auto
      `}>
        {rutines && rutines.map((item, index) =>(
          <li key={index}> {item.exercise.name} </li>
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