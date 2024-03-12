import { findAllByRoleClient, getRutineOrderDay, getRutineOrderType } from "@/lib/services";
import { Client } from "./index.client";
import { Suspense } from "react";


interface props {
  searchParams: { id: string, user: string }
}
export default async function User({
  searchParams: { id, user },
}: props) {
  
  return (
    <Suspense fallback={<>cargando ...</>}>
      <Client user={JSON.parse(user)}/>
    </Suspense>
  );
}
