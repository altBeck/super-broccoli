import type { Metadata } from "next";
import { siteConfig } from "@/data/site";

export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL || "https://bekanno.com";

export const defaultOgImage = "/preview.png";
export const defaultOgImageSize = {
  width: 1586,
  height: 992,
};

export function absoluteUrl(path = "/") {
  return new URL(path, siteUrl).toString();
}

type SeoMetadataOptions = {
  title?: string;
  description?: string;
  path: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  image?: string;
  noIndex?: boolean;
};

export function createSeoMetadata({
  title,
  description = siteConfig.description,
  path,
  openGraphTitle = title ?? siteConfig.title,
  openGraphDescription = description,
  image = defaultOgImage,
  noIndex = false,
}: SeoMetadataOptions): Metadata {
  return {
    title,
    description,
    alternates: {
      canonical: path,
    },
    openGraph: {
      title: openGraphTitle,
      description: openGraphDescription,
      url: path,
      siteName: siteConfig.name,
      type: "website",
      locale: "en_US",
      images: [
        {
          url: image,
          width: defaultOgImageSize.width,
          height: defaultOgImageSize.height,
          alt: openGraphTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: openGraphTitle,
      description: openGraphDescription,
      images: [image],
    },
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
        },
  };
}
