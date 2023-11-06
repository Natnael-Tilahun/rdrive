import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Inter } from 'next/font/google'
const font = Inter({subsets: ['latin']})

export default function Layout ({ children }: { children: React.ReactNode; }) {
return (
    <main className={`flex min-h-screen flex-col items-center justify-center bg-white dark:bg-black ${font.className}`}>
        <div className="flex w-full flex-1 flex-col">
            <Navbar />
            <div className="mx-auto w-full max-w-6xl p-1">
            {children}
            </div>
        </div>
        <Footer />
    </main>
  );
};

