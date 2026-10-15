import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["200", "300", "500"],
});

export const metadata: Metadata = {
  // Absolute URLs (link previews) point to the own domain, not the Vercel one
  metadataBase: new URL("https://www.tonsammler.com"),
  title: "TONSAMMLER",
  description: "TONSAMMLER",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="de" className={`${raleway.variable}`}>
      <body className="bg-background text-foreground antialiased">
        {children}
      </body>
    </html>
  );
}
