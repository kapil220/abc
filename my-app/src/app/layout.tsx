import { SpeedInsights } from "@vercel/speed-insights/next";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Loading from "./loading"; // Import your Loading component
import "@/styles/globals.css";

export const metadata = {
  title: "The Ink Pot Group",
  description: "Delivering exceptional visual content for your brand",
  icons: {
    icon: "/favicon.ico", // Recommended for browsers
    shortcut: "/favicon.png", // Alternative shortcut icon
    apple: "/apple-touch-icon.png", // Apple devices
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
  loading?: boolean; // Optionally accept a loading prop
}

export default function RootLayout({ children, loading }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <link rel="stylesheet" href="https://use.typekit.net/YOUR-KIT-ID.css" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Forum&family=Roboto:wght@400;500;700&display=swap"
        />
      </head>
      <body className="font-body">
        <SpeedInsights />
        <div className="min-h-screen flex flex-col">
          {loading ? (
            <Loading /> // Render the Loading component conditionally
          ) : (
            <>
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </>
          )}
        </div>
      </body>
    </html>
  );
}
