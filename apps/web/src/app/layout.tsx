import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

// next/font downloads at build time and self-hosts the files; no font is
// requested from an external CDN at runtime.
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const description =
  "Nova Systems Lab builds systems software, developer tools, platform integrations, and experimental runtime technologies for modern computing.";

export const metadata: Metadata = {
  metadataBase: new URL("https://novasystemslab.org"),
  title: {
    default: "Nova Systems Lab",
    template: "%s · Nova Systems Lab",
  },
  description,
  applicationName: "Nova Systems Lab",
  openGraph: {
    type: "website",
    siteName: "Nova Systems Lab",
    title: "Nova Systems Lab",
    description,
    url: "/",
    locale: "en",
  },
  twitter: {
    card: "summary",
    title: "Nova Systems Lab",
    description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-dvh flex-col">{children}</body>
    </html>
  );
}
