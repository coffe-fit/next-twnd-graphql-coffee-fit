import { DayBox } from "./DayBox";

interface props {}

export const Calendar = ({}:props) => {
  
  return (
    <>
      <br />Calendar
      <DayBox numberDay={1} arrayColors={['red']}></DayBox>
      <DayBox numberDay={2} arrayColors={['red', 'blue']}></DayBox>
      <DayBox numberDay={3} arrayColors={['red', 'blue', 'green']}></DayBox>
      <DayBox numberDay={3} arrayColors={['red', 'blue', 'green', 'black']}></DayBox>
      <DayBox numberDay={3} arrayColors={['red', 'blue', 'green', 'black', 'pink']}></DayBox>
    </>
  );
};
