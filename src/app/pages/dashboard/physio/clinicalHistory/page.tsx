import { findAllByRoleClient, getRutineOrderDay, getRutineOrderType } from "@/lib/services";
import { Client } from "./index.client";
import { Suspense } from "react";
import { findAllRole } from "@/lib/services/graphql/role/findAll.service";


interface props {
  searchParams: { id: string }
}
export default async function userCUForm({
  searchParams: { id },
}: props) {

  // const roleList = await findAllRole(id);
  const roleList = {};
  
  return (
    // <MainLayout>
    <Suspense fallback={<>cargando clinicalHistory...</>}>
      <Client
        idPage={id}
        roleList={roleList}
      />
    </Suspense>
    // </MainLayout>
  );
}