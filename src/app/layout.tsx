import type { Metadata } from "next";
import { Roboto, Tenor_Sans, Oswald } from "next/font/google";
import { ThemeProvider } from "@/components/theme/ThemeProvider";
import "./globals.css";

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

const tenorSans = Tenor_Sans({
  weight: ['400'],
  variable: "--font-serif",
  subsets: ["latin"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "We Do Effects",
  description: "Creative Marketing Agency",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={`${roboto.variable} ${tenorSans.variable} ${oswald.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-accent selection:text-background">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
