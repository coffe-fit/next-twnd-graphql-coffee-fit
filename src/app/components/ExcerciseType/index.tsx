interface props {
  name: string,
  id: string,
  excersises?: string[]
}
export const ExerciseType = ({
  name,
  id,
  excersises
}:props) => {
  return (
    <div className="
      cff-flex-row-center
      h-auto
      w-40
      cff-bg-color-green-700
      cff-border-1
      flex-col
      pl-6 pr-1
      relative
    ">
      <span id='title'>
        {name}
      </span>
      <span id='text' className={`
        text-xs
        overflow-auto
      `}>
        {excersises && excersises.map((item, index) =>(
          <li key={index}> {item} </li>
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
      {/* <span id='color'className={`
        absolute
        right-3
        bottom-2
        h-[calc(100%-2.5rem)]
        w-2
        bg-green-300
      `}></span> */}
      {/* <span id='color'className={`
        absolute
        -z-10
        top-5
        w-[calc(100%-2.5rem)]
        h-2
        bg-green-300
      `}></span> */}
      {/* <span id='color'className={`
        absolute
        -z-10
        bottom-3
        w-[calc(100%-2.5rem)]
        h-2
        bg-green-300
      `}></span> */}
    </div>
  );
}