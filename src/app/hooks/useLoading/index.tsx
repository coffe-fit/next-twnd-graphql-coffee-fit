// // LoadingContext.tsx
// 'use client'
// import React, { createContext, useState, useContext } from 'react';

// interface LoadingContextType {
//   loading: boolean;
//   setLoading: React.Dispatch<React.SetStateAction<boolean>>;
// }

// const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

// export function LoadingProvider({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   const [loading, setLoading] = useState(false);

//   return (
//     <LoadingContext.Provider value={{ loading, setLoading }}>
//       {children}
//     </LoadingContext.Provider>
//   );
// };

// export const useLoading = (): LoadingContextType => {
//   const context = useContext(LoadingContext);
//   if (!context) {
//     throw new Error('useLoading must be used within a LoadingProvider');
//   }
//   return context;
// };