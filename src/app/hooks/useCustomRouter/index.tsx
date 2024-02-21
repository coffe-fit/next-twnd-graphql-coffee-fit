import { useRouter, usePathname  } from 'next/navigation';
import { useState, useEffect } from 'react';

const useCustomRouter = () => {
  const path = usePathname();
  const nextRouter = useRouter();
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    setHistory(prevHistory => [...prevHistory, path]);
  }, [path]);

  const push = (path: string) => {
    nextRouter.push(path);
  };

  const replace = (path: string) => {
    nextRouter.replace(path);
  };

  const back = () => {
    nextRouter.back();
    // Elimina el último elemento del historial al retroceder
    setHistory(prevHistory => prevHistory.slice(0, -1));
  };

  return { ...nextRouter, push, replace, back, history };
};

export default useCustomRouter;
