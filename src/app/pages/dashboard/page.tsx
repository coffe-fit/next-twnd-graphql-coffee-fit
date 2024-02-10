import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function dashboard({
  searchParams: { id },
}: {
  searchParams: { id: string }
}) {
  redirect(`/pages/dashboard/user/home?id=${id}`)
  return (
    <Suspense fallback={<>cargando ...</>}>
      <div className="">
        Hola desde Dashboard
      </div>
    </Suspense>
  );
}