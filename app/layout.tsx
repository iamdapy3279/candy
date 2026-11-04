import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Montserrat:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-cream-100 text-charcoal-900 antialiased selection:bg-gold-500 selection:text-navy-900">
        {children}
      </body>
    </html>
  );
}
