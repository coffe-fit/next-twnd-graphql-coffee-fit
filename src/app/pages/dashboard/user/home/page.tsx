import { getRutineOrderDay, getRutineOrderType } from "@/lib/services";
import { ClientHome } from "./index.client";
import { Suspense } from "react";


interface props {
  searchParams: { id: string }
}
export default async function User({
  searchParams: { id },
}: props) {
  
  const rutineByType = await getRutineOrderType(id);
  const rutineByDays = await getRutineOrderDay(id);
  console.log(rutineByType);
  console.log(rutineByDays);
  console.log('rutineByDays1');
  
  
  return (
    <Suspense fallback={<>cargando ...</>}>
      <ClientHome rutineType={rutineByType} rutineDay={rutineByDays}/>
    </Suspense>
  );
}
