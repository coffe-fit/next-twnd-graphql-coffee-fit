import { ExerciseType } from "@/app/components";
import { Button, Calendar } from "@/app/components/atoms";

interface props {}

export default function User({}:props) {
  return (
    <div className="flex flex-col items-center h-screen">
      <span className="
        cff-flex-row-center
        flex-col
        md:flex-row
      ">
        <span>
          <Calendar/>
        </span>
        <span className="
          cff-flex-row-center
          flex-row
          md:flex-col
          flex-wrap
        ">
          <ExerciseType name="Pierna" id="123"/>
          <ExerciseType name="Pierna" id="123"/>
          <ExerciseType name="Pierna" id="123"/>
          <span className="sm:hidden"><ExerciseType name="Piernaf" id="123"/></span>
        </span>
      </span>
      <span className="
        flex
        items-center
        sm:flex-start
        cff-flex-row-center
        flex-row
        flex-wrap
      ">
        <span className="max-sm:hidden"><ExerciseType name="Piernaf" id="123"/></span>
        <ExerciseType name="Pierna" id="123"/>
        <ExerciseType name="Pierna" id="123"/>
      </span>
    </div>
  );
}