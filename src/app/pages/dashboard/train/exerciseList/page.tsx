import { findAllByRoleClient, getRutineOrderDay, getRutineOrderType } from "@/lib/services";
import { Client } from "./index.client";
import { Suspense } from "react";
import { findAllExercise } from "@/lib/services/graphql/exercises/findAll.service";


interface props {
  searchParams: { id: string }
}
export default async function User({
  searchParams: { id },
}: props) {
  
  return (
    <Suspense fallback={<>cargando userList...</>}>
      <Client />
    </Suspense>
  );
}