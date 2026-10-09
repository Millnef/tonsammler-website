"use client";

import { useState } from "react";

// Copies a text (e.g. a bio for an event page) and confirms it briefly
export default function CopyButton({
  text,
  label,
  copiedLabel,
}: {
  text: string;
  label: string;
  copiedLabel: string;
}) {
  const [copied, setCopied] = useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard not available (e.g. insecure context): the text stays selectable
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`shrink-0 rounded-full border px-3 py-1 text-[10px] font-medium uppercase tracking-[0.15em] transition-colors duration-200 ease-out print:hidden ${
        copied
          ? "border-accent bg-accent text-black"
          : "border-white/20 text-foreground/70 hover:border-accent hover:text-accent"
      }`}
    >
      {copied ? copiedLabel : label}
    </button>
  );
}
