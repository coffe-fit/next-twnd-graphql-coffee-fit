import { findAllByRoleClient, getRutineOrderDay, getRutineOrderType } from "@/lib/services";
import { Client } from "./index.client";
import { Suspense } from "react";


interface props {
  searchParams: { id: StringConstructor }
}
export default async function userCUForm({
  searchParams: { id },
}: props) {
  console.log(26394827112369487112689387446192387);
  
  return (
    <Suspense fallback={<>cargando userList...</>}>
      <Client />
    </Suspense>
  );
}