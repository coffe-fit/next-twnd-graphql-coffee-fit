import { Calendar } from "@/app/components/atoms/Calendar";

export default function dashboard() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      hola desde dashboard
      <Calendar></Calendar>
    </div>
  );
}