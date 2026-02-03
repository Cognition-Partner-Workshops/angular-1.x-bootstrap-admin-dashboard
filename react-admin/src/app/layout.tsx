"use client";

import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { PageTop } from "@/components/layout/PageTop";
import { Footer } from "@/components/layout/Footer";
import { SidebarProvider, useSidebar } from "@/lib/sidebar-context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

function MainContent({ children }: { children: React.ReactNode }) {
  const { isCollapsed } = useSidebar();

  return (
    <div
      className={`min-h-screen transition-all duration-300 ${
        isCollapsed ? "ml-[52px]" : "ml-[180px]"
      }`}
    >
      <PageTop />
      <main className="p-6 pt-20 pb-16 bg-gray-100 min-h-screen">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>React Admin Dashboard</title>
        <meta name="description" content="Admin dashboard built with Next.js 15 and React" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SidebarProvider>
          <Sidebar />
          <MainContent>{children}</MainContent>
        </SidebarProvider>
      </body>
    </html>
  );
}
