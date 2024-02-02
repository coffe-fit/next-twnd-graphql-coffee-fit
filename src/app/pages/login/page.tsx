import { Suspense } from 'react';
import { LoginForm } from '../../components';


export default  function Login() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Suspense fallback={<div>cargando...</div>}>
        <LoginForm />
      </Suspense>
    </div>
  );
}
