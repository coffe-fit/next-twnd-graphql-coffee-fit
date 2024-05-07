import { Suspense } from 'react';
import { ClientLogin } from './index.client';


export default  function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Suspense fallback={<div>cargando.1..</div>}>
        <ClientLogin />
      </Suspense>
    </div>
  );
}
