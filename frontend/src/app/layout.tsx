// frontend/src/app/layout.tsx

import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Footer from "../components/Footer";
import { Toaster } from "sonner";
import { Loader } from "@/components/Loader";

// const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "AgroSmart",
  description: "Agricultura Inteligente",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <body className={inter.className}> */}
      <body>
        {/* <Loader /> */}
        <Toaster richColors />
        <main>{children}</main>
        {/* <Footer /> Include the Footer component here */}
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
      </body>
    </html>
  );
}
