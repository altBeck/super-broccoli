"use client";

import Image from "next/image";
import { useState } from "react";

const EMAIL = "drkannobeck@gmail.com";

/**
 * The footer's oversized email — click anywhere on it to copy. Mirrors the
 * clipboard fallback used by CopyEmailButton, but renders as a stacked label
 * ("Click to Copy" → "Copied!") to match the footer reference.
 */
export function FooterEmail() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
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
      className="site-footer__email"
      onClick={handleCopy}
      aria-label={copied ? "Email address copied" : "Copy email address"}
    >
      <span className="site-footer__email-address">{EMAIL}</span>
      <span className="site-footer__email-hint">
        <Image
          src="/icons/copy.svg"
          alt=""
          width={18}
          height={18}
          aria-hidden="true"
        />
        {copied ? "Copied!" : "Click to Copy"}
      </span>
    </button>
  );
}
