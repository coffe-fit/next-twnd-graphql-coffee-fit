import { RutineFindAllByUserId } from "@/lib/services";
import { ClientHome } from "./index.client";
import { Suspense } from "react";


interface props {
  searchParams: { id: string }
}
export default async function User({
  searchParams: { id },
}: props) {
  
  const rutineType = await RutineFindAllByUserId(id);

  return (
    <Suspense fallback={<>cargando ...</>}>
      <ClientHome rutineType={rutineType}/>
    </Suspense>
  );
}
