import { redirect } from "next/navigation";


const pageError = `/pages/errorPage?id=`
export const redirectClient = (path: string, error?: any)=>{
  console.log('redirectClient', path);
  try {
    // redirige desde client
    window.location.href = `${pageError}${path}&error=${JSON.stringify(error)}`
  } catch (error) {
    // redirige desde server
    redirectServer(path, error)
  }
}

export const redirectServer = (path: string, error?: any)=>{
  console.log('redirectServer', path);
  redirect(`${pageError}${path}&error=${JSON.stringify(error)}`);
}
