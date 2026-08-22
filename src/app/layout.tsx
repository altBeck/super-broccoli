import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
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
  title: "Beck Kanno — Product Designer",
  description:
    "Product designer turning complex products into clear, scalable experiences through strategy, systems and craft.",
  // favicon is provided by src/app/icon.png (the smiley)
};

export const viewport: Viewport = {
  colorScheme: "light",
  themeColor: "#fbf9ee",
  width: "device-width",
  initialScale: 1,
};

const themeScript = `(function(){try{var p=localStorage.getItem('theme')||'auto';var r=p;if(p==='auto'){r=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}var d=document.documentElement;d.setAttribute('data-theme',r);d.setAttribute('data-theme-pref',p);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`;

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
      data-theme-pref="auto"
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>{children}</body>
    </html>
  );
}
