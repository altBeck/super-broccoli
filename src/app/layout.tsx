import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { JsonLd } from "@/components/seo/JsonLd";
import { SITE_URL, site } from "@/lib/site";
import "./globals.css";

const aspekta = localFont({
  src: "../../public/fonts/aspekta/AspektaVF.woff2",
  variable: "--font-aspekta",
  display: "swap",
  style: "normal",
  weight: "50 1000",
});

const specialElite = localFont({
  src: "../../public/fonts/special-elite/SpecialElite-Regular.ttf",
  variable: "--font-special-elite",
  display: "swap",
  style: "normal",
  weight: "400",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: site.title,
    template: `%s — ${site.name}`,
  },
  description: site.description,
  applicationName: site.name,
  authors: [{ name: site.name, url: SITE_URL }],
  creator: site.name,
  keywords: [
    "Beck Kanno",
    "Product Designer",
    "Design Systems",
    "Fintech",
    "AI",
    "Portfolio",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: site.name,
    title: site.title,
    description: site.description,
    locale: site.locale,
  },
  twitter: {
    card: "summary_large_image",
    title: site.title,
    description: site.description,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  // favicon: src/app/icon.png (smiley). Social share image: drop a file at
  // src/app/opengraph-image.(png|jpg) and Next wires og:image automatically.
  // Canonical/OG URL resolves from SITE_URL (or the Vercel prod domain).
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fbf9ee",
  width: "device-width",
  initialScale: 1,
};

// Default theme is Light. (Auto/system is disabled for now — re-enable by
// restoring the prefers-color-scheme branch here and the "auto" option.)
const themeScript = `(function(){try{var p=localStorage.getItem('theme');if(p!=='light'&&p!=='dark'&&p!=='studio')p='light';var d=document.documentElement;d.setAttribute('data-theme',p);d.setAttribute('data-theme-pref',p);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${aspekta.variable} ${specialElite.variable}`}
      data-theme="light"
      data-theme-pref="light"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
        <JsonLd />
      </head>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
