import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "../components/organisms/Navbar";
import Footer from "../components/organisms/Footer";
import { AppProvider } from '@/contexts/AppContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Webstie",
  description: "Website bán sách trực tuyến",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="vi">
      <AppProvider>
        <body className={inter.className}>
          <header>
            <Navbar />
          </header>

          <main>
            {children}
          </main>

          <footer>
            <Footer />
          </footer>
        </body>
      </AppProvider>
    </html>

  );
}
