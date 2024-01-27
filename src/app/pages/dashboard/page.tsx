import { redirect } from "next/navigation";

export default function dashboard() {
  redirect('/pages/dashboard/user')
  // return (
  //   <div className="">
  //     Hola desde Dashboard
  //   </div>
  // );
}