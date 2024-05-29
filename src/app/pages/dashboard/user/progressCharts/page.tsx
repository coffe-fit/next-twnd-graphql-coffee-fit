import { findAllByRoleClient, getRutineOrderDay, getRutineOrderType } from "@/lib/services";
import { Client } from "../../train/progressCharts/index.client";
import { Suspense } from "react";
import { progress_find_by_user_id } from "@/lib/services/graphql/progress/findByUserId.service";



interface props {
  searchParams: { id: string, user: string }
}
export default async function Progress({
  searchParams: { id, user }
}: props) {
  const progressList = await progress_find_by_user_id({token: id, _data: {userId: user, numProgress: 2}});
  console.log(progressList);
  
  return (
    <Suspense fallback={<>cargando process...</>}>
      <Client progressList={progressList} userSelected={user}/>
    </Suspense>
  );
}