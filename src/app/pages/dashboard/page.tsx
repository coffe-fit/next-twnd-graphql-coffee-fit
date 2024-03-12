import { valitateToken } from "@/lib/util/jwt";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default function dashboard({
  searchParams: { id },
}: {
  searchParams: { id: string }
}) {
  const decodeToken = valitateToken(id);
  const role = decodeToken?.roleName;

  if (role === "TRAIN") {
    redirect(`/pages/dashboard/train/usersList?id=${id}`)
  } else {
    redirect(`/pages/dashboard/user/home?id=${id}`)
  }
}