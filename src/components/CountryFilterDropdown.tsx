"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { ChevronDown, Globe2 } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import {
  buildAllCountriesFilterHref,
  buildCountryFilterHref,
} from "@/lib/country-filter";
import type { Category, Country } from "@/types";

type CountryFilterDropdownProps = {
  countries: Country[];
  categories: Category[];
  onNavigate?: () => void;
};

export default function CountryFilterDropdown({
  countries,
  categories,
  onNavigate,
}: CountryFilterDropdownProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeSlug = searchParams.get("country") ?? undefined;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLLIElement>(null);
  const listboxId = useId();
  const activeCountry = countries.find((country) => country.slug === activeSlug);
  const currentParams = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  if (countries.length === 0) return null;

  const closeMenu = () => {
    setOpen(false);
    onNavigate?.();
  };

  return (
    <li ref={rootRef} className="relative flex items-center lg:mr-auto">
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        onClick={() => setOpen((value) => !value)}
        className={`flex w-full items-center justify-between gap-2 rounded-lg px-3 py-3 text-sm font-bold transition lg:my-2 lg:inline-flex lg:justify-start lg:py-2.5 ${
          open || activeSlug
            ? "bg-primary text-white shadow-sm shadow-primary/15"
            : "text-text-dark hover:bg-primary-50 hover:text-primary"
        }`}
      >
        <span className="inline-flex items-center gap-2">
          {activeCountry ? (
            <>
              <span className="text-base" aria-hidden="true">{activeCountry.flag}</span>
              <span>{activeCountry.name}</span>
            </>
          ) : (
            <>
              <Globe2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>كل الدول</span>
            </>
          )}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
          aria-hidden="true"
        />
      </button>

      {open ? (
        <div
          id={listboxId}
          role="listbox"
          aria-label="قائمة الدول"
          className="absolute left-0 top-full z-60 mt-1 w-72 overflow-hidden rounded-xl border border-border/60 bg-white shadow-xl shadow-primary-dark/10 lg:left-auto lg:right-0"
        >
          <div className="border-b border-border/60 px-4 py-3 text-xs font-bold tracking-wider text-text-muted uppercase">
            تصفية الأخبار حسب الدولة
          </div>
          <div className="max-h-72 overflow-y-auto p-2">
            <Link
              href={buildAllCountriesFilterHref(pathname, categories, currentParams)}
              role="option"
              aria-selected={!activeSlug}
              onClick={closeMenu}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold transition ${
                !activeSlug
                  ? "bg-primary text-white"
                  : "text-text-dark hover:bg-primary-50 hover:text-primary"
              }`}
            >
              <Globe2 className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>كل الدول</span>
            </Link>
            <div className="my-2 h-px bg-border/50" />
            <ul className="space-y-0.5">
              {countries.map((country) => (
                <li key={country.slug}>
                  <Link
                    href={buildCountryFilterHref(country.slug, pathname, categories, currentParams)}
                    role="option"
                    aria-selected={activeSlug === country.slug}
                    onClick={closeMenu}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-bold transition ${
                      activeSlug === country.slug
                        ? "bg-primary text-white"
                        : "text-text-dark hover:bg-primary-50 hover:text-primary"
                    }`}
                  >
                    <span className="text-lg" aria-hidden="true">{country.flag}</span>
                    <span>{country.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ) : null}
    </li>
  );
}
