import { ExerciseType } from "@/app/components";
import { Button, Calendar } from "@/app/components/atoms";
import { CalendarDayInterface } from "@/lib/interfaces/calendarDay.interface";

interface props {}

export default function User({}:props) {
  const exersices1 = [
    'Lorem ipsum dolor sit ame ',
    'Lorem ipsum dolor sit amet consectetur ',
    'Lorem ipsum dolor ',
    'Lorem ipsum dolor sit amet cons ',
    'Lorem ipsum dolor sit amet cons ',
    'Lorem ipsum dolor sit amet cons ',
  ];
  const exersices2 = [
    'Lorem ipsum dolor ',
    'Lorem ipsum dolor  ',
    'Lorem ipsum dolor sit ',
    'Lorem ipsum dolor sit am ',
  ]
  const exersices3 = [
    'Lorem ipsum dolor  ',
    'Lorem ipsum dolor sit amet conr ',
    'Lorem ipsum dolor tetur ',
    'Lorem ipsum dolor sitctetur ',
  ];

  const handleClickCalendar = (day: any) => {
    alert(`${day.dayNumber} '-' ${day.dayName}`);
  }

  return (
    <div className="flex flex-col items-center h-full">
      <span className="
        cff-flex-row-center
        flex-col
        md:flex-row
      ">
        <span>
          <Calendar size="lg" />
        </span>
        <span className="
          flex
          justify-center
          h-full
          md:justify-end
          flex-row
          md:flex-col
          flex-wrap
        ">
          <span className="max-sm:hidden"><ExerciseType  excersises={exersices1}name="Piernaf1" id="123"/></span>
          <span className="max-sm:hidden"><ExerciseType excersises={exersices2}name="Piernaf1" id="123"/></span>
        </span>
      </span>
      <span className="
        flex
        justify-center
        flex-row
        flex-wrap
        max-sm:hidden
      ">
        <ExerciseType excersises={exersices3} name="Pierna" id="123"/>
        <ExerciseType name="Pierna" id="123"/>
        <ExerciseType name="Pierna" id="123"/>
      </span>
      {/* se repite la seccion anterior para lograr sincronia con el tamaño de las cajas*/}
      <span className="
        flex
        justify-center
        flex-row
        flex-wrap
        sm:hidden
      ">
        <ExerciseType excersises={exersices1}name="Piernaf2" id="123"/>
        <ExerciseType excersises={exersices2}name="Piernaf2" id="123"/>
        <ExerciseType excersises={exersices3} name="Pierna" id="123"/>
        <ExerciseType name="Pierna" id="123"/>
        <ExerciseType name="Pierna" id="123"/>
      </span>
    </div>
  );
}