import Image from "next/image";
import { redirect } from "next/navigation";

export default function Home() {
  redirect('/pages/login')
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-0 h-screen">
    </main>
  );
}
