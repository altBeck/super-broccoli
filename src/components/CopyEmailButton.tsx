"use client";

import type { ReactNode } from "react";
import { useState } from "react";

const EMAIL = "drkannobeck@gmail.com";

type Props = {
  children: ReactNode;
  className: string;
  tooltipId: string;
};

export function CopyEmailButton({ children, className, tooltipId }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
    } catch {
      const input = document.createElement("textarea");
      input.value = EMAIL;
      input.style.position = "fixed";
      input.style.opacity = "0";
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
    }

    setCopied(true);
    window.setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      className={className}
      onClick={handleCopyEmail}
      aria-label={copied ? "Email address copied" : "Copy email address"}
      aria-describedby={tooltipId}
    >
      {children}
      <span id={tooltipId} className="social-links__tooltip" role="tooltip">
        {copied ? "Copied!" : "Copy Email"}
      </span>
    </button>
  );
}
