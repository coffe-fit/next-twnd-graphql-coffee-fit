import { findAllByRoleClient, getRutineOrderDay, getRutineOrderType } from "@/lib/services";
import { Client } from "./index.client";
import { Suspense } from "react";
import MainLayout from "@/app/layouts/MainWithLoading";
import { findAllRole } from "@/lib/services/graphql/role/findAll.service";
import { findAllCompany } from "@/lib/services/graphql/company/findAll.service";
import { findAllRutineType } from "@/lib/services/graphql/rutineType/findAll.service";
import { findAllExerciseMetrics } from "@/lib/services/graphql/exercisesMetrics/findAll.service";


interface props {
  searchParams: { id: string }
}
export default async function exerciseCUForm({
  searchParams: { id },
}: props) {

  const muscularGroupList = await findAllRutineType(id);
  const metricsList = await findAllExerciseMetrics(id);
  
  return (
    // <MainLayout>
    <Suspense >
      <Client
        idPage={id}
        muscularGroupList={muscularGroupList}
        metricsList={metricsList}
      />
    </Suspense>
    // </MainLayout>
  );
}