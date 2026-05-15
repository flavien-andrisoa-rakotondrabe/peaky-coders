import type { Metadata } from "next";
// import { Geist, Geist_Mono, Inter } from "next/font/google";
import { Fira_Code } from "next/font/google";
import "./globals.css";
import "leaflet/dist/leaflet.css";
import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import ToastProvider from "@/providers/ToastProvider";
import ReduxProvider from "@/providers/ReduxProvider";
import { AuthProvider } from "@/providers/AuthProvider";
import LeafletProvider from "@/providers/LeafletProvider";

const slabo = Fira_Code({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-fira",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mada Smart",
  description: "Mada Smart App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn("h-full", "antialiased", "font-sans", slabo.variable)}
    >
      <body className="min-h-full flex flex-col" cz-shortcut-listen="true">
        <ReduxProvider>
          <TooltipProvider>
            <ToastProvider>
              <LeafletProvider>
                <AuthProvider>{children}</AuthProvider>
              </LeafletProvider>
            </ToastProvider>
          </TooltipProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
