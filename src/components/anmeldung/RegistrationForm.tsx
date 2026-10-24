"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import Link from "next/link";
import { CONSENT_MEDIA, CONSENT_NEWS, ENDPOINT, EVENT, HEARD_FROM } from "@/lib/anmeldung-content";
import { LABEL, PRIMARY, SERIF } from "@/components/anmeldung/styles";

// 16px text keeps iOS from zooming into the field
const FIELD =
  "mt-2 w-full border-b border-white/20 bg-transparent py-2.5 text-base font-light text-foreground outline-none transition-colors duration-200 ease-out placeholder:text-foreground/30 focus:border-accent";

type Status = "idle" | "sending" | "confirmed" | "waitlist" | "duplicate" | "closed" | "error" | "test";

const RESULT: Record<Exclude<Status, "idle" | "sending">, { title: string; text: string }> = {
  confirmed: {
    title: "Du bist dabei.",
    text: "Deine Anmeldung ist eingegangen. Die Bestätigung mit allen Infos kommt gleich per E-Mail – schau zur Not im Spam-Ordner nach.",
  },
  waitlist: {
    title: "Du stehst auf der Warteliste.",
    text: "Alle Plätze sind gerade vergeben. Wird einer frei, melden wir uns per E-Mail bei dir.",
  },
  duplicate: {
    title: "Du bist schon angemeldet.",
    text: "Mit dieser E-Mail-Adresse gibt es bereits eine Anmeldung. Die Bestätigung hast du per E-Mail bekommen.",
  },
  closed: {
    title: "Die Anmeldung ist geschlossen.",
    text: `Anmeldeschluss war ${EVENT.deadlineLabel}. Schreib uns gern auf Instagram, falls du noch Fragen hast.`,
  },
  error: {
    title: "Das hat nicht geklappt.",
    text: "Bitte versuch es in ein paar Minuten noch einmal oder schreib uns auf Instagram.",
  },
  test: {
    title: "Testmodus",
    text: "Das Formular funktioniert, ist aber noch nicht mit der Gästeliste verbunden. Es wurde nichts gespeichert.",
  },
};

const noSubscription = () => () => {};
const isPastDeadline = () => Date.now() > Date.parse(EVENT.deadline);

export default function RegistrationForm() {
  const [status, setStatus] = useState<Status>("idle");
  // Checked in the browser, so the static page closes on its own after the deadline
  const closed = useSyncExternalStore(noSubscription, isPastDeadline, () => false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget)) as Record<string, string>;

    // Honeypot: only bots fill in the hidden field
    if (data.website) {
      setStatus("confirmed");
      return;
    }
    if (!ENDPOINT) {
      setStatus("test");
      return;
    }

    setStatus("sending");
    try {
      // Plain-text body keeps it a simple request, which Apps Script accepts without CORS preflight
      const response = await fetch(ENDPOINT, {
        method: "POST",
        body: JSON.stringify({
          name: data.name?.trim(),
          email: data.email?.trim(),
          instagram: data.instagram?.trim(),
          heardFrom: data.heardFrom,
          consentMedia: data.consentMedia === "on",
          consentNews: data.consentNews === "on",
        }),
      });
      const result = (await response.json()) as { status?: Status };
      setStatus(result.status && result.status in RESULT ? result.status : "error");
    } catch {
      setStatus("error");
    }
  };

  if (closed || (status !== "idle" && status !== "sending")) {
    const result = RESULT[closed ? "closed" : (status as keyof typeof RESULT)];
    return (
      <div role="status" className="border border-white/10 bg-white/[0.03] p-8 sm:p-10">
        <p className={`${SERIF} text-3xl sm:text-4xl`}>{result.title}</p>
        <p className="mt-4 max-w-xl font-light leading-relaxed text-foreground/70">{result.text}</p>
        {status === "test" && (
          <button
            type="button"
            onClick={() => setStatus("idle")}
            className="mt-6 text-xs font-medium uppercase tracking-[0.15em] text-accent"
          >
            Zurück zum Formular
          </button>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
      <label className="block">
        <span className={LABEL}>Name *</span>
        <input name="name" required autoComplete="name" placeholder="Vor- und Nachname" className={FIELD} />
      </label>
      <label className="block">
        <span className={LABEL}>E-Mail *</span>
        <input name="email" type="email" required autoComplete="email" placeholder="für die Bestätigung" className={FIELD} />
      </label>
      <label className="block">
        <span className={LABEL}>Instagram</span>
        <input name="instagram" autoComplete="off" placeholder="@deinname (optional)" className={FIELD} />
      </label>
      <label className="block">
        <span className={LABEL}>Wie hast du davon erfahren?</span>
        <select name="heardFrom" defaultValue="" className={`${FIELD} [color-scheme:dark]`}>
          <option value="">Bitte wählen (optional)</option>
          {HEARD_FROM.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
      </label>

      {/* Hidden from people, tempting for bots */}
      <input name="website" tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" />

      <label className="flex cursor-pointer items-start gap-4 sm:col-span-2">
        <input name="consentMedia" type="checkbox" required className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]" />
        <span className="text-sm font-light leading-relaxed text-foreground/80">{CONSENT_MEDIA} *</span>
      </label>
      <label className="-mt-2 flex cursor-pointer items-start gap-4 sm:col-span-2">
        <input name="consentNews" type="checkbox" className="mt-1 h-5 w-5 shrink-0 accent-[var(--accent)]" />
        <span className="text-sm font-light leading-relaxed text-foreground/80">{CONSENT_NEWS}</span>
      </label>

      <div className="flex flex-col gap-5 sm:col-span-2 sm:flex-row sm:items-center sm:gap-8">
        <button type="submit" disabled={status === "sending"} className={`${PRIMARY} disabled:opacity-60`}>
          {status === "sending" ? "Wird gesendet …" : "Anmelden"}
        </button>
        <p className="text-xs font-light leading-relaxed text-foreground/50">
          {/* Not "only for this event": the optional checkbox allows future invitations */}
          * Pflichtfeld. Wofür wir deine Angaben nutzen, steht im{" "}
          <Link href="/anmeldung/rechtliches#datenschutz" className="underline underline-offset-4 hover:text-accent">
            Datenschutz
          </Link>
          .
        </p>
      </div>
    </form>
  );
}
