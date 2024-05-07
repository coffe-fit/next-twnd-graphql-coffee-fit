import { getRutineTypes, exerciseFindExcerciseByRutineTypeId } from "@/lib/services";
import { Client } from "./index.client";
import { Suspense } from "react";


interface props {
  searchParams: { id: string, user: string }
}
export default async function User({
  searchParams: { id, user },
}: props) {
  const rutineTypes = await getRutineTypes(id);
  
  const ejercisesToFirstRutineType = await exerciseFindExcerciseByRutineTypeId(id, "e4726076-e964-4c0e-b2de-04b855a36296");
  // const ejercisesToFirstRutineType = await exerciseFindExcerciseByRutineTypeId(rutineTypes[0].id);
  
  return (
    <Suspense fallback={<>cargando ...</>}>
      <Client
        idPage={id}
        userSelected={{userId: user}}
        rutineTypes={rutineTypes}
        firstExercises={ejercisesToFirstRutineType}
      />
    </Suspense>
  );
}
