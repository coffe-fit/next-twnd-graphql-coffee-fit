import { language } from '../lenguage';
// interface DayInfo {
//   dayNumber: number;
//   dayName: string;
// }

export const getDaysInMonth = (month: number, year: number) =>{
  const startDate = new Date(year, month - 1, 1);
  const endDate = new Date(year, month, 0);

  const daysInMonth: any[] = [];

  // Rellenar días del mes anterior
  const prevMonthLastDay = new Date(year, month - 1, 0).getDate();
  for (let i = startDate.getDay(); i > 0; i--) {
    const dayNumber = prevMonthLastDay - (i - 1);
    const dayName = getDayName(new Date(year, month - 2, dayNumber).getDay());
    const dayFull = new Date(year, month - 2, dayNumber);

    daysInMonth.push({ dayNumber, dayName, isCurrentMonth: false,dayFull });
  }

  // Rellenar días del mes actual
  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    const dayNumber = date.getDate();
    const dayName = getDayName(date.getDay());
    const dayFull = `${dayNumber}-${date.getUTCMonth()+1}-${date.getFullYear()}`;
    daysInMonth.push({ dayNumber, dayName, isCurrentMonth: true, dayFull });
  }

  // Rellenar días del próximo mes
  const nextMonthFirstDay = new Date(year, month, 1).getDay();
  for (let i = 1; i <= 7 - nextMonthFirstDay; i++) {
    const dayNumber = i;
    const dayName = getDayName(new Date(year, month, dayNumber).getDay());
    const dayFull = new Date(year, month, dayNumber);

    daysInMonth.push({ dayNumber, dayName, isCurrentMonth: false, dayFull });
  }

  // Dividir el array en subarrays de 7 días
  const chunkedArray: any[][] = [];
  for (let i = 0; i < daysInMonth.length; i += 7) {
    chunkedArray.push(daysInMonth.slice(i, i + 7));
  }

  return chunkedArray;
}

function getDayName(dayIndex: number): string {
  const daysOfWeek = language('español').daysArray;
  return daysOfWeek[dayIndex];
}