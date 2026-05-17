import type { Metadata, Viewport } from "next";
import { Geist_Mono, Inter_Tight, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SiteBanner } from "@/components/layout/SiteBanner";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { siteConfig } from "@/data/site";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair-display",
  style: ["italic"],
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Beck Kanno - Product Designer",
    template: "%s - Caesar",
  },
  description:
    "Product designer making complex products make sense across fintech, compliance, AI tools, and enterprise workflows.",
  applicationName: "Caesar",
  manifest: "/manifest.webmanifest",
  icons: {
    icon: "/icons/caesar-logo.svg",
    shortcut: "/icons/caesar-logo.svg",
    apple: "/icons/caesar-logo.svg",
  },
  openGraph: {
    title: "Beck Kanno - Product Designer",
    description:
      "Product designer making complex products make sense across fintech, compliance, AI tools, and enterprise workflows.",
    siteName: "Caesar",
    url: siteUrl,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Beck Kanno - Product Designer",
    description:
      "Product designer making complex products make sense across fintech, compliance, AI tools, and enterprise workflows.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#0A130C" },
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${interTight.variable} ${geistMono.variable} ${playfairDisplay.variable} min-h-screen antialiased`}
      >
        <ThemeInitScript />
        <ThemeProvider>
          <SiteBanner banner={siteConfig.banner} />
          <div className="flex min-h-screen flex-col pt-8">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
