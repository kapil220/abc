import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import '@/styles/globals.css';

export const metadata = {
  title: 'The Ink Pot Group',
  description: 'Delivering exceptional visual content for your brand',
  icons: {
    icon: "images/logo.webp", // or "/favicon.png"
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://use.typekit.net/YOUR-KIT-ID.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Forum&family=Roboto:wght@400;500;700&display=swap"
        />
      </head>
      <body className="font-body">
        <SpeedInsights />  {/* Add this here */}
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
