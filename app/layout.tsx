import type { Metadata } from "next";
import { Cinzel, Inter } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "X&Y Bakehouse & Bistro | Kolkata",
  description: "Where every table is yours. Artisanal bakehouse & bistro in Kolkata crafted for mornings, lingering lunches, and slow evenings.",
  icons: {
    icon: "/Logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${cinzel.variable} ${inter.variable}`}>
      <body className="bg-cream-100 text-charcoal-900 antialiased selection:bg-gold-500 selection:text-navy-900">
        {children}
      </body>
    </html>
  );
}
