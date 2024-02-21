import { Suspense } from "react";
import { ClientRutineDay } from "./index.client";
import { getRutineOrderDay } from "@/lib/services";
import { language } from "@/lib/lenguage";

interface props {
  searchParams: { id: string, day: string }
}

export default async function RutineDay({
  searchParams: { id, day },
}: props) {

  return (
    <Suspense fallback={<>cargando ...</>}>
      <ClientRutineDay day={day} />
    </Suspense>
  );
}
