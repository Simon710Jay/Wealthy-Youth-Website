import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "../styles/index.css";
import { Toaster } from "./components/ui/sonner";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import AuthProvider from "./components/AuthProvider";

const inter = Inter({ 
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({ 
  subsets: ["latin"],
  variable: "--font-playfair",
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
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen flex flex-col font-sans antialiased text-foreground bg-background">
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
