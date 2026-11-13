import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { I18nProvider } from "@/lib/i18n/context";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Webjoz UI — Standard Web UX & Theme Showcase",
  description: "Standard Web UX, Component Library & Theme Engine for Webjoz",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className={`${inter.className} antialiased bg-background text-foreground min-h-screen selection:bg-primary/20 selection:text-primary`}>
        <I18nProvider defaultLocale="id">
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
