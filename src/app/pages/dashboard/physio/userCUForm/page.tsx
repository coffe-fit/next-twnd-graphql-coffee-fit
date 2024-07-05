import { findAllByRoleClient, getRutineOrderDay, getRutineOrderType } from "@/lib/services";
import { Client } from "./index.client";
import { Suspense } from "react";
import MainLayout from "@/app/layouts/MainWithLoading";
import { findAllRole } from "@/lib/services/graphql/role/findAll.service";
import { findAllCompany } from "@/lib/services/graphql/company/findAll.service";


interface props {
  searchParams: { id: string }
}
export default async function userCUForm({
  searchParams: { id },
}: props) {

  const roleList = await findAllRole(id);
  const companyList = await findAllCompany(id);
  console.log(roleList);
  console.log(companyList);
  
  return (
    // <MainLayout>
    <Suspense fallback={<>cargando userList...</>}>
      <Client
        idPage={id}
        roleList={roleList}
        companyList={companyList}
      />
    </Suspense>
    // </MainLayout>
  );
}