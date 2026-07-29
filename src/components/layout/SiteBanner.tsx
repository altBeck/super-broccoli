type SiteBannerProps = {
  banner: {
    enabled: boolean;
    text: string;
    mode: "ticker";
  };
};

export function SiteBanner({ banner }: SiteBannerProps) {
  if (!banner.enabled) {
    return null;
  }

  const repeatedText = Array.from({ length: 8 }, () => banner.text);

  return (
    <div className="site-banner fixed inset-x-0 top-0 z-50 h-8 overflow-hidden bg-banner-bg text-banner-fg">
      <p className="sr-only">{banner.text}</p>
      <div
        className="ticker-track flex h-full w-max items-center gap-8 whitespace-nowrap text-center text-[13px] font-medium uppercase leading-none"
        aria-hidden="true"
      >
        {[...repeatedText, ...repeatedText].map((text, index) => (
          <span key={`${text}-${index}`} className="inline-flex items-center gap-8">
            <span>{text}</span>
            <span>/</span>
          </span>
        ))}
      </div>
    </div>
  );
}
