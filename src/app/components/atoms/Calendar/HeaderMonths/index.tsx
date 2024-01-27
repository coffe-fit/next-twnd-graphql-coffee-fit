
import { language } from '@/lib/lenguage';
import { Button } from '../../';

interface props {
  month: number,
  year: number,
  onChangemonth: (m: number) => void,
  onChangeYear: (y: number) => void,
}
export const HeaderMonths = ({
  month,
  year,
  onChangemonth,
  onChangeYear
}:props) => {
  const _language = language('español');

  const onClickBack = () => {
    if(month === 1) {
      onChangeYear(year-1);
      onChangemonth(12)
    } else{
      onChangemonth(--month)
    }
  }

  const onClickNext = () => {
    if(month === 12) {
      onChangeYear(year+1);
      onChangemonth(1)
    } else{
      onChangemonth(++month)
    }
  }

  const onclickYear= () =>{
    alert('Aún no esta disponible ir a un año o mes en especifico, pero estamos trabajando en ello.')
  }
  return (
      <div className="
        cff-flex-row-between
        top-0
        w-full
        cff-border-1
        h-10
      ">
        <Button size='xs' onclick={onClickBack}>{'<'}</Button>
        {_language.monthsArray[month-1]} 
        <span>{` `}</span>
        <span onClick={onclickYear}>{year}</span>
        <Button size='xs'  onclick={onClickNext}>{'>'}</Button>
      </div>
  );
}