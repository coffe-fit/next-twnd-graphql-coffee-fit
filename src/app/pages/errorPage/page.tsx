import { Suspense } from 'react';
import { ClientErrorPage } from './index.client';
import { getDataErrorCode } from "./ErrorCodes";


export default  function ErrorPage({
  searchParams: { id },
}: {
  searchParams: { id: string }
}) {
  
  const {
    image,
    errorMessage,
    buttonMessage,
    onRetry,
    urlRetry,
    children
  } = getDataErrorCode(id)
  
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <Suspense fallback={<div>cargando.1..</div>}>
        <ClientErrorPage
          image={image}
          errorMessage={errorMessage}
          buttonMessage={buttonMessage}
          onRetry={onRetry}
          urlRetry={urlRetry}
          children={children}
        />
      </Suspense>
    </div>
  );
}
