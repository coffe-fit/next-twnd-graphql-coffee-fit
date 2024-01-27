import { Button } from "@/app/components/atoms";
import { language } from '@/lib/lenguage';

interface props {}
export const DashboardHeader = ({}:props) => {
  const _language = language('español');
  return (
      <header className="
        cff-flex-row-between
        absolute
        top-0
        w-full
        cff-border-1
        h-10
        cff-bg-color-green-600
        dark:cff-bg-color-gray-600
        z-50
      ">
        <Button size="xs">☰</Button>
        <Button size="xs">{`${_language.singOut}`}</Button>
      </header>
  );
}