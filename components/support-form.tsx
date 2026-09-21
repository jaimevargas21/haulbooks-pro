"use client";

import { FormEvent, useState } from "react";
import { site } from "@/lib/site";

export function SupportForm() {
  const [opened, setOpened] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const subject = String(data.get("subject") || "HaulBooks Pro support").trim();
    const message = String(data.get("message") || "").trim();
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    window.location.href = `mailto:${site.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  }

  return (
    <form onSubmit={onSubmit} className="space-y-4 rounded-3xl border border-line bg-navy-900/70 p-5 sm:p-6">
      <label className="block text-sm">
        <span className="font-semibold">Your name</span>
        <input name="name" required autoComplete="name" className="mt-1 w-full rounded-xl border border-line bg-navy-950 px-3 py-2" />
      </label>
      <label className="block text-sm">
        <span className="font-semibold">Email</span>
        <input name="email" type="email" required autoComplete="email" className="mt-1 w-full rounded-xl border border-line bg-navy-950 px-3 py-2" />
      </label>
      <label className="block text-sm">
        <span className="font-semibold">Subject</span>
        <input name="subject" required defaultValue="Question about HaulBooks Pro" className="mt-1 w-full rounded-xl border border-line bg-navy-950 px-3 py-2" />
      </label>
      <label className="block text-sm">
        <span className="font-semibold">How can we help?</span>
        <textarea name="message" required rows={6} className="mt-1 w-full rounded-xl border border-line bg-navy-950 px-3 py-2" />
      </label>
      <button type="submit" className="rounded-full bg-amber-500 px-5 py-3 text-sm font-bold text-navy-950 hover:bg-amber-400">
        Email support
      </button>
      <p className="text-xs leading-relaxed text-muted">
        This opens your email app with the message filled in. This website does not store the ticket.
        You can also write directly to {site.supportEmail}.
      </p>
      {opened ? (
        <p className="text-sm text-amber-300" role="status">
          If your email app did not open, send the same note to {site.supportEmail}.
        </p>
      ) : null}
    </form>
  );
}
