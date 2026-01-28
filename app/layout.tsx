import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KKN 21 Sukodadi - Profil Kegiatan",
  description: "Dokumentasi kegiatan dan profil KKN Kelompok 21 Desa Sukodadi, Wagir, Malang.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body className={`${inter.className} antialiased bg-gray-50 text-gray-900`}>
        <Navbar />
        <main className="pt-16 min-h-screen">
          {children}
        </main>
        <footer className="bg-gray-900 text-white py-8 text-center text-sm">
          <div className="container mx-auto px-4">
            <p>&copy; {new Date().getFullYear()} KKN 21 Sukodadi. Universitas Negeri Malang (Example). All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
