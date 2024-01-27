interface props {
  name: string,
  id: string,
}
export const ExerciseType = ({
  name,
  id
}:props) => {
  return (
    <div className="
      cff-flex-row-center
      h-40
      w-40
      cff-bg-color-green-700
      cff-border-1
    ">
      {name}
    </div>
  );
}