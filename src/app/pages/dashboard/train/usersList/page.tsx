import { findAllByRoleClient, getRutineOrderDay, getRutineOrderType } from "@/lib/services";
import { Client } from "./index.client";
import { Suspense } from "react";


interface props {
  searchParams: { id: string }
}
export default async function User({
  searchParams: { id },
}: props) {
  const usersList = await findAllByRoleClient(id);
  
  return (
    <Suspense fallback={<>cargando ...</>}>
      <Client usersList={usersList}/>
    </Suspense>
  );
}
