"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { nav } from "@/lib/content";
import { ButtonLink } from "@/components/ui";

export function SiteHeader({ logoSrc }: { logoSrc: string }) {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-navy-950/85 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-5 sm:h-20 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center" onClick={() => setOpen(false)}>
          <Image
            src={logoSrc}
            alt="HaulBooks Pro"
            width={176}
            height={72}
            priority
            style={{ width: "auto", height: "2.25rem" }}
          />
        </Link>
        <nav className="hidden items-center gap-4 text-[13px] font-medium text-muted xl:flex" aria-label="Primary">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="transition hover:text-amber-300">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-1 sm:gap-2">
          <span className="hidden sm:inline-flex">
            <ButtonLink href="/signin" variant="ghost">
              Sign in
            </ButtonLink>
          </span>
          <ButtonLink href="/signup" className="px-4 py-2 text-xs sm:text-sm">
            Start free trial
          </ButtonLink>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink xl:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </div>
      {open ? (
        <nav id="mobile-nav" className="border-t border-line bg-navy-950 px-5 py-4 xl:hidden" aria-label="Mobile">
          <ul className="space-y-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block rounded-xl px-3 py-3 text-sm font-medium text-ink hover:bg-navy-800"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/signin"
                className="block rounded-xl px-3 py-3 text-sm font-medium text-muted hover:bg-navy-800 hover:text-ink"
                onClick={() => setOpen(false)}
              >
                Sign in
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
