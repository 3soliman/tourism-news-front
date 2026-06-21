"use client";

import { useState } from "react";

type NewsletterSubscribeFormProps = {
  variant?: "footer" | "sidebar";
};

export default function NewsletterSubscribeForm({
  variant = "footer",
}: NewsletterSubscribeFormProps) {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const isSidebar = variant === "sidebar";

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setStatus("idle");

    try {
      const response = await fetch("/api/newsletter/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, source: variant }),
      });
      const json = (await response.json()) as { message?: string };

      if (!response.ok) {
        setStatus("error");
        setMessage(json.message ?? "تعذر تسجيل الاشتراك.");
        return;
      }

      setStatus("success");
      setMessage(json.message ?? "تم الاشتراك بنجاح.");
      setEmail("");
    } catch {
      setStatus("error");
      setMessage("تعذر الاتصال بخدمة النشرة البريدية.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form className="mt-4 space-y-3" onSubmit={handleSubmit}>
      <input
        type="email"
        required
        value={email}
        onChange={(event) => setEmail(event.target.value)}
        placeholder="بريدك الإلكتروني"
        className={
          isSidebar
            ? "w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none backdrop-blur-sm transition placeholder:text-white/40 focus:border-accent/60 focus:bg-white/15"
            : "w-full rounded-xl border border-border bg-page-bg px-4 py-3 text-sm text-text-dark outline-none transition focus:border-primary/50 focus:ring-2 focus:ring-primary/10"
        }
      />
      <button
        type="submit"
        disabled={submitting}
        className={
          isSidebar
            ? "w-full rounded-xl bg-gradient-to-l from-accent to-amber-400 py-3 text-sm font-black text-primary-dark shadow-lg shadow-amber-500/20 transition hover:shadow-xl hover:shadow-amber-500/30 disabled:opacity-60"
            : "w-full rounded-xl bg-gradient-to-l from-primary to-primary-hover px-5 py-3 text-sm font-bold text-white shadow-md shadow-primary/20 transition hover:shadow-lg hover:shadow-primary/30 disabled:opacity-60"
        }
      >
        {submitting ? "جاري الاشتراك..." : "اشتراك ←"}
      </button>
      {message ? (
        <p
          className={`text-xs font-bold ${
            status === "success"
              ? isSidebar
                ? "text-emerald-200"
                : "text-emerald-600"
              : isSidebar
                ? "text-red-200"
                : "text-red-600"
          }`}
        >
          {message}
        </p>
      ) : null}
    </form>
  );
}
