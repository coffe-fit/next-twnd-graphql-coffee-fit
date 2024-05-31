import { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/provider/redux/ReduxProvider";
import { LoadingProvider } from "@/app/hooks/useLoading";
import Loading from "@/app/components/atoms/Loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Coffee Fit",
  description: "Portal web coffee fit",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={inter.className}>
        <ReduxProvider>
          <LoadingProvider>
            <Loading>Cargando</Loading>
            {children}
          </LoadingProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
