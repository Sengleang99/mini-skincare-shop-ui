// src/app/layout.tsx
import type { Metadata } from 'next';
import './style/globals.css'
import { Inter } from 'next/font/google';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { AuthProvider } from './context/AuthContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Skincare Shop',
  description: 'Discover the best skincare products for your routine',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}