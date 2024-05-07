import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/provider/redux/ReduxProvider";
import Loading from "./Loading";
// import { LoadingProvider } from "./hooks/useLoading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coffee Fit",
  description: "Portal web coffee fit",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReduxProvider>
      {/* <LoadingProvider> */}
      <html lang="es">
        <body className={inter.className}>
          {/* <Loading>Cargando</Loading> */}
          {children}
        </body>
      </html>
      {/* </LoadingProvider> */}
    </ReduxProvider>
  );
}
