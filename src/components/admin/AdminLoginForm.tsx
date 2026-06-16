"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { LockKeyhole, LogIn } from "lucide-react";
import { admin } from "@/components/admin/admin-ui";
import { loginAdmin } from "@/lib/api/auth";

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("admin@tourismnews.com");
  const [password, setPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const forbiddenFromUrl = searchParams.get("error") === "forbidden";
  const [error, setError] = useState<string | null>(
    forbiddenFromUrl ? "ليس لديك صلاحية الدخول للوحة التحكم" : null,
  );

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
    <div className="mx-auto flex min-h-screen w-full max-w-sm flex-col justify-center px-4 py-8">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="mb-5 text-center">
          <span className="mx-auto mb-2 grid h-10 w-10 place-items-center rounded-lg bg-sky-50 text-sky-600">
            <LockKeyhole size={18} />
          </span>
          <h1 className={admin.pageTitle}>تسجيل الدخول</h1>
          <p className={admin.pageDesc}>لوحة تحكم أخبار السياحة</p>
        </div>

        {error ? <div className={`${admin.error} mb-3`}>{error}</div> : null}

        <form onSubmit={handleSubmit} className="space-y-3">
          <label>
            <span className={admin.label}>البريد الإلكتروني</span>
            <input
              type="email"
              required
              dir="ltr"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={admin.input}
            />
          </label>

          <label>
            <span className={admin.label}>كلمة المرور</span>
            <input
              type="password"
              required
              dir="ltr"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className={admin.input}
            />
          </label>

          <button
            type="submit"
            disabled={submitting}
            className={`${admin.btnPrimary} w-full justify-center py-2`}
          >
            <LogIn size={14} />
            {submitting ? "جاري الدخول..." : "دخول"}
          </button>
        </form>

        <p className="mt-4 text-center text-[11px] font-semibold text-slate-400">
          admin@tourismnews.com (مدير) — editor@tourismnews.com (رئيس تحرير) —
          journalist@tourismnews.com (محرر)
          <br />
          كلمة المرور: password
        </p>
      </div>
    </div>
  );
}
