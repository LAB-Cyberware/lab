import Navbar from "@/components/Navbar";
import "./globals.css"
import { Providers } from "./Providers";
import FooterClient from "@/components/FooterClient";
// Metadata ahora funcionará como se espera en un Server Component


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <meta name="google-site-verification" content="3ywNHIOQHjrxUF43eHALVp3v9m2k5xnYBnkUXyYmUiI" />
        <meta name="facebook-domain-verification" content="wnnrhtsydmmog5wl223j29osk9u98u" />
      </head>
      <body>
        <Providers>
          <Navbar />
          {children}
          <FooterClient />
        </Providers>
      </body>
    </html>
  );
}
