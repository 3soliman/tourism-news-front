"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ArrowRight, LockKeyhole, LogIn, Mail, Newspaper } from "lucide-react";
import { loginAdmin } from "@/lib/api/auth";

function resolveInitialError(searchParams: URLSearchParams) {
  if (searchParams.get("error") === "forbidden") {
    return "ليس لديك صلاحية الدخول إلى لوحة التحكم.";
  }

  if (searchParams.get("stale") === "1") {
    return "انتهت جلستك. سجّل الدخول مرة أخرى.";
  }

  return null;
}

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(resolveInitialError(searchParams));

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await loginAdmin(email.trim(), password);

    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    const nextPath = searchParams.get("next") || "/admin";
    router.push(nextPath);
    router.refresh();
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_#dbeafe_0%,_#f7faff_42%,_#eef4fb_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-24 top-16 h-56 w-56 rounded-full bg-sky-200/40 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-10 h-64 w-64 rounded-full bg-cyan-200/30 blur-3xl"
        aria-hidden
      />

      <div className="relative w-full max-w-[420px]">
        <div className="mb-6 text-center">
          <span className="mx-auto mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-sky-600 text-white shadow-lg shadow-sky-600/25">
            <Newspaper size={26} strokeWidth={2} />
          </span>
          <h1 className="text-2xl font-black text-slate-900">لوحة التحكم</h1>
          <p className="mt-1 text-sm font-semibold text-slate-500">
            أخبار السياحة — تسجيل دخول المحررين
          </p>
        </div>

        <div className="rounded-2xl border border-white/80 bg-white/95 p-6 shadow-xl shadow-slate-200/60 backdrop-blur sm:p-7">
          <div className="mb-5 flex items-center gap-2 text-slate-700">
            <LockKeyhole size={16} className="text-sky-600" />
            <p className="text-sm font-bold">ادخل بيانات حسابك للمتابعة</p>
          </div>

          {error ? (
            <div
              className="mb-4 rounded-xl border border-red-200 bg-red-50 px-3 py-2.5 text-sm font-semibold text-red-700"
              role="alert"
            >
              {error}
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-4">
            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-slate-600">
                البريد الإلكتروني
              </span>
              <span className="relative block">
                <Mail
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="email"
                  required
                  autoComplete="email"
                  dir="ltr"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </span>
            </label>

            <label className="block">
              <span className="mb-1.5 block text-xs font-bold text-slate-600">
                كلمة المرور
              </span>
              <span className="relative block">
                <LockKeyhole
                  size={16}
                  className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="password"
                  required
                  autoComplete="current-password"
                  dir="ltr"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-slate-200 bg-slate-50/80 py-2.5 pl-3 pr-10 text-sm text-slate-900 outline-none transition focus:border-sky-500 focus:bg-white focus:ring-2 focus:ring-sky-100"
                />
              </span>
            </label>

            <button
              type="submit"
              disabled={submitting}
              className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-3 text-sm font-black text-white shadow-md shadow-sky-600/20 transition hover:bg-sky-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              <LogIn size={16} />
              {submitting ? "جاري الدخول..." : "تسجيل الدخول"}
            </button>
          </form>
        </div>

        <div className="mt-5 text-center">
          <Link
            href="/"
            className="inline-flex items-center gap-1.5 text-sm font-bold text-slate-500 transition hover:text-sky-600"
          >
            <ArrowRight size={14} />
            العودة إلى الموقع
          </Link>
        </div>
      </div>
    </div>
  );
}
