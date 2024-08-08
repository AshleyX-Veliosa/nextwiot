import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer";
import NavBar from "@/components/Navbar";
import SessionProvider from "@/components/SessionProvider";
import { getServerSession } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Temp Dashboard",
  description: "Created by AshleyX",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider session={session}>
          <NavBar />
          {children}
          <Footer />
        </SessionProvider>
      </body>
    </html>
  );
}
