import { language } from "../lenguage"

export const getTodayFormat = () => {
  return new Date().toLocaleString("en-ZA", {timeZone: "America/Bogota"}).replaceAll('/','-').replaceAll(',','')
}
export const dateToStringCol = (date: string) => {
    return new Date(date).toLocaleString("en-ZA", {timeZone: "America/Bogota"}).replaceAll('/','-').replaceAll(',','')
  }
export const timestampToString = (timestamp: string) => {
  // Convierte el timestamp a una fecha
  let date = new Date(+timestamp);

  // Formatea la fecha en formato colombiano (dd/mm/yyyy)
  let day = date.getDate().toString().padStart(2, '0');
  let month = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses empiezan desde 0
  let year = date.getFullYear();
  return `${day}/${getMontName(+month)}/${year}`;
} 

function getDayName(dayIndex: number): string {
  const daysOfWeek = language('español').daysArray;
  return daysOfWeek[dayIndex];
}

function getMontName(montIndex: number): string {
  const daysOfWeek = language('español').monthsArray;
  return daysOfWeek[montIndex];
}