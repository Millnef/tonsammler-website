"use client";

import type { FormEvent } from "react";
import { EMAIL, type EpkText } from "@/lib/epk-content";

const LABEL = "text-[10px] font-medium uppercase tracking-[0.15em] text-foreground/50";
// 16px text keeps iOS from zooming into the field
const FIELD =
  "mt-1 w-full border-b border-white/20 bg-transparent py-2 text-base font-light text-foreground outline-none transition-colors duration-200 ease-out placeholder:text-foreground/30 focus:border-accent";

// "2027-03-14" → "14.03.2027"
function formatDate(value: string) {
  const [y, m, d] = value.split("-");
  return y && m && d ? `${d}.${m}.${y}` : value;
}

// No backend: the request is composed into an e-mail in the visitor's mail app
export default function BookingForm({ t }: { t: EpkText["contact"] }) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const get = (key: string) => String(data.get(key) ?? "").trim();
    const date = formatDate(get("date"));
    const optional = (label: string, value: string) => (value ? [`${label}: ${value}`] : []);

    const body = [
      t.greeting,
      "",
      `${t.fields.event}: ${get("event")}`,
      `${t.fields.date}: ${date}`,
      ...optional(t.fields.slot, get("slot")),
      ...optional(t.fields.fee, get("fee")),
      ...(get("message") ? ["", get("message")] : []),
      "",
      get("name"),
    ].join("\n");
    const subject = `${t.mailSubject} – ${get("event")}, ${date}`;

    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-6 gap-y-5 sm:grid-cols-2 print:gap-y-3">
      <label className="block">
        <span className={LABEL}>{t.fields.name} *</span>
        <input name="name" required autoComplete="name" className={FIELD} />
      </label>
      <label className="block">
        <span className={LABEL}>{t.fields.event} *</span>
        <input name="event" required autoComplete="organization" className={FIELD} />
      </label>
      <label className="block">
        <span className={LABEL}>{t.fields.date} *</span>
        <input name="date" type="date" required className={`${FIELD} [color-scheme:dark]`} />
      </label>
      <label className="block">
        <span className={LABEL}>{t.fields.slot}</span>
        <input name="slot" className={FIELD} />
      </label>
      <label className="block sm:col-span-2">
        <span className={LABEL}>{t.fields.fee}</span>
        <input name="fee" className={FIELD} />
      </label>
      <label className="block sm:col-span-2 print:hidden">
        <span className={LABEL}>{t.fields.message}</span>
        <textarea name="message" rows={3} className={`${FIELD} resize-none`} />
      </label>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2 print:hidden">
        <button
          type="submit"
          className="inline-flex items-center justify-center rounded-full bg-accent px-6 py-3 text-xs font-medium uppercase tracking-[0.15em] text-black transition-colors duration-200 ease-out hover:bg-foreground"
        >
          {t.submit}
        </button>
        <span className="text-xs font-light text-foreground/50">{t.formNote}</span>
      </div>
      {/* PDF: the form cannot be sent from there, so it links to the online form */}
      <a
        href="#anfrage"
        className="hidden text-xs font-medium uppercase tracking-[0.15em] text-accent sm:col-span-2 print:block"
      >
        {t.formOnline} ↗
      </a>
    </form>
  );
}
