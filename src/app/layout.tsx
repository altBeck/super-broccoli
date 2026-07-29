import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { NavigationHistoryTracker } from "@/components/layout/NavigationHistoryTracker";
import { SiteBanner } from "@/components/layout/SiteBanner";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { StructuredData } from "@/components/seo/StructuredData";
import { siteConfig } from "@/data/site";
import {
  absoluteUrl,
  defaultOgImage,
  defaultOgImageSize,
  siteUrl,
} from "@/lib/seo";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteConfig.title,
    template: "%s — Beck Kanno",
  },
  description: siteConfig.description,
  alternates: {
    canonical: absoluteUrl("/"),
  },
  applicationName: "Caesar",
  authors: [{ name: "Beck Kanno" }],
  creator: "Beck Kanno",
  publisher: "Beck Kanno",
  keywords: [
    "Beck Kanno",
    "Product Designer",
    "UX Designer",
    "UX Architect",
    "Design Engineer",
    "Fintech Product Designer",
    "AI Product Designer",
    "Compliance Product Designer",
    "Enterprise UX",
    "Product Design Portfolio",
    "Nigeria Product Designer",
  ],
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icons/caesar-logo.svg",
    shortcut: "/icons/caesar-logo.svg",
    apple: "/icons/caesar-logo.svg",
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    siteName: "Caesar",
    url: absoluteUrl("/"),
    type: "website",
    locale: "en_US",
    images: [
      {
        url: absoluteUrl(defaultOgImage),
        width: defaultOgImageSize.width,
        height: defaultOgImageSize.height,
        alt: siteConfig.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
    images: [absoluteUrl(defaultOgImage)],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FBF9EE" },
    { media: "(prefers-color-scheme: dark)", color: "#080F0C" },
  ],
  colorScheme: "light dark",
};

function ThemeInitScript() {
  const code = `(function(){try{var stored=localStorage.getItem("caesar-theme");var system=window.matchMedia("(prefers-color-scheme: dark)").matches?"dark":"light";var theme=stored||system;document.documentElement.classList.toggle("dark",theme==="dark");document.documentElement.dataset.theme=theme;}catch(e){}})();`;

  return <script dangerouslySetInnerHTML={{ __html: code }} />;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="viewport-shell antialiased">
        <ThemeInitScript />
        <ThemeProvider>
          <NavigationHistoryTracker />
          <StructuredData />
          <SiteBanner banner={siteConfig.banner} />
          <div className="site-shell viewport-shell flex flex-col pt-8">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
