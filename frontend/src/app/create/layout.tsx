import type { Metadata } from "next";
import { Inter } from "next/font/google";
// import "./globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScoutX - Modern Recruitment Platform",
  description: "A modern recruitment platform powered by AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <SidebarProvider>



            {children}
          
        </SidebarProvider>
      </body>
    </html>
  );
}
