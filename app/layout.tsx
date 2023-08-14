import 'react-perfect-scrollbar/dist/css/styles.css';
import "../styles/index.css";

import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import classnames from 'classnames';
import Head from "next/head";
import { ThemeProviders } from '@/components/theme-providers';
import { NextAuthProvider } from "./SessionProvider";

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PDF Chatbot',
  description: 'This chatbot chats with PDF files. It was built with Next.js,Tailwind CSS, and LangChain',
  icons: '/favicon.ico'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={classnames("dark:bg-black", inter.className) }>
        <ThemeProviders>
          <NextAuthProvider>
          {children}
          </NextAuthProvider>
        </ThemeProviders>
      </body>
    </html>
  )
}
