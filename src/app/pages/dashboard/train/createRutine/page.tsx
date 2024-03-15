import { findAllByRoleClient, getRutineOrderDay, getRutineOrderType, getRutineTypes } from "@/lib/services";
import { Client } from "./index.client";
import { Suspense } from "react";


interface props {
  searchParams: { id: string, user: string }
}
export default async function User({
  searchParams: { id, user },
}: props) {
  const rutineTypes = await getRutineTypes(id);
  
  return (
    <Suspense fallback={<>cargando ...</>}>
      <Client user={JSON.parse(user)} rutineTypes={rutineTypes}/>
    </Suspense>
  );
}
