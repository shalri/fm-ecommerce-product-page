import type { Metadata } from "next";
import { Kumbh_Sans } from "next/font/google";
import "./globals.css";

const kumbh = Kumbh_Sans({ subsets: ["latin"], weight: ["400", "700"] });
// TODO: fonts
export const metadata: Metadata = {
  title: "Ecommerce Product Page| FScode",
  description:
    "Solution for Ecommerce Product Page challenge from Frontend Mentor",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${kumbh.className} flex min-h-screen flex-col`}>
        {children}
      </body>
    </html>
  );
}
