import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import GlassClientEffects from "@/components/GlassClientEffects";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import QueryProviders from "../providers/QueryProvider";
import LenisProvider from "../providers/LenisProvider";
import ScrollToTop from "@/components/modules/shared/ScrollToTop";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HireGPT — AI Recruitment Platform",
  description:
    "AI-powered recruitment platform connecting recruiters and candidates efficiently.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen flex flex-col antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <LenisProvider>
            <QueryProviders>

              {/* ===================== BACKGROUND ===================== */}
              <div className="relative min-h-screen bg-[#070711] text-white overflow-hidden">

                {/* GLASS GLOW */}
                <div className="absolute inset-0">
                  <div className="absolute top-0 left-1/2 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-[#640D5F]/20 blur-[140px]" />
                  <div className="absolute bottom-0 right-0 h-[400px] w-[400px] rounded-full bg-[#EB5B00]/10 blur-[120px]" />
                  <div className="absolute top-1/3 left-1/4 h-[300px] w-[300px] rounded-full bg-[#FFCC00]/10 blur-[120px]" />
                </div>

                {/* GRID */}
                <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:70px_70px] opacity-[0.05]" />

                {/* GLASS OVERLAY */}
                <div className="absolute inset-0 bg-black/20 backdrop-blur-3xl" />

                {/* FLOATING PARTICLES */}
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute top-20 left-10 h-2 w-2 rounded-full bg-[#FFCC00]/70 animate-pulse" />
                  <div className="absolute top-40 right-20 h-2 w-2 rounded-full bg-[#EB5B00]/60 animate-bounce" />
                  <div className="absolute bottom-32 left-1/3 h-2 w-2 rounded-full bg-[#640D5F]/70 animate-pulse" />
                  <div className="absolute top-1/2 left-1/4 h-1 w-1 rounded-full bg-white/60 animate-ping" />
                  <div className="absolute bottom-20 right-1/3 h-2 w-2 rounded-full bg-[#FFCC00]/40 animate-pulse" />
                </div>

                {/* CURSOR GLOW (safe SSR) */}
                <div
                  id="cursor-glow"
                  className="pointer-events-none fixed z-50 h-32 w-32 rounded-full bg-gradient-to-br from-[#EB5B00]/30 to-[#640D5F]/30 blur-3xl opacity-60"
                  style={{ transform: "translate(-9999px, -9999px)" }}
                />

                {/* CONTENT */}
                <div className="relative z-10 flex flex-col min-h-screen">
                  <GlassClientEffects />

                  <main className="flex-1 w-full">
                    {children}
                    <Toaster richColors />
                  </main>

                  <ScrollToTop />
                </div>
              </div>

            </QueryProviders>
          </LenisProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}