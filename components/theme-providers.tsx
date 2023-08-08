"use client";

import { ThemeProvider } from "next-themes";

export function ThemeProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" enableSystem={false} defaultTheme="dark">
    {/* <ThemeProvider attribute="class" enableSystem={false} defaultTheme="light"> */}
      {children}
    </ThemeProvider>
  );
}
