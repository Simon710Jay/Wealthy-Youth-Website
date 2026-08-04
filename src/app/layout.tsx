import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/index.css";
import { Toaster } from "./components/ui/sonner";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AuthProvider from "./components/AuthProvider";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: 'Wealthy Youth | An Expression of Grace Nation',
  description: 'Empowering the next generation to discover their divine purpose.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className={`${inter.variable} font-sans min-h-screen flex flex-col antialiased text-foreground bg-background`}>
        <AuthProvider>
          <Navigation />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
          <Toaster position="top-center" richColors />
        </AuthProvider>
      </body>
    </html>
  );
}
