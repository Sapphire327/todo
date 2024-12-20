import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import {getServerSession} from "next-auth";
import SessionProvider from "@/providers/SessionProvider";
import {Provider} from "react-redux";
import StoreProvider from "@/providers/StoreProvider";
import Header from "@/components/Header/Header";
import { Roboto  } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})
export const metadata: Metadata = {
  title: "ToDo",
  description: "The app for your notes",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();
  return (
    <html lang="en">
      <body className={`${roboto.className}`} >
        <SessionProvider session={session}>
          <StoreProvider>
            <Header/>
            {children  }
          </StoreProvider>,
        </SessionProvider>
      </body>
    </html>
  );
}
