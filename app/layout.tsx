import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import AdminFloatingBar from "@/components/AdminFloatingBar";

import { Instagram } from "lucide-react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KKN 21 Sukodadi - Profil Kegiatan",
  description: "Dokumentasi kegiatan dan profil KKN Kelompok 21 Desa Sukodadi, Wagir, Malang.",
  icons: {
    icon: "/favicon.png",
  },
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
        <AdminFloatingBar />
        <footer className="bg-gray-900 text-white py-12 border-t border-gray-800">
          <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="text-center md:text-left">
              <h4 className="font-bold text-lg mb-2">KKN 21 Sukodadi</h4>
              <p className="text-gray-400 text-sm">&copy; {new Date().getFullYear()} Universitas Merdeka Malang.</p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <a
                href="https://www.instagram.com/kkn21_sukodadi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all hover:text-pink-400 group border border-white/5 hover:border-pink-500/30"
              >
                <Instagram size={20} />
                <span className="font-medium text-sm">@kkn21_sukodadi</span>
              </a>

              <a
                href="https://www.tiktok.com/@kkn21_sukodadi"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 transition-all hover:text-cyan-400 group border border-white/5 hover:border-cyan-500/30"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
                <span className="font-medium text-sm">@kkn21_sukodadi</span>
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
