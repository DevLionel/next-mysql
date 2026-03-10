import type { ReactNode } from "react";
import AppProvider from "@/context/appProvider";
import { Varela_Round } from "next/font/google";
import "./globals.css";

const varelaRound = Varela_Round({
  weight: "400",
  variable: "--font-varela-sans",
  subsets: ["latin"],
});

export const metadata = {
  title: "NextJS MySQL CRUD tutorial",
  description: "NextJS MySQL CRUD tutorial",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css?family=Roboto|Varela+Round"
        />
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
        />
        <link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
        />
      </head>
      <body className={varelaRound.className}>
        <AppProvider>
          {children}
        </AppProvider>
      </body>
    </html>
  );
}