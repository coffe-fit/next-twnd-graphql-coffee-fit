import { redirect } from "next/navigation";


const pageError = `/pages/errorPage?id=`
export const redirectClient = (path: string)=>{
  console.log('redirectClient', path);
  try {
    window.location.href = `${pageError}${path}`
  } catch (error) {
    redirectServer(path)
  }
}

export const redirectServer = (path: string)=>{
  console.log('redirectServer', path);
  redirect(`${pageError}${path}`);
}
