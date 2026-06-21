"use client";

import { useState } from "react";
import { Send } from "lucide-react";
import { sendNewsletterCampaign } from "@/lib/api/admin-newsletter";
import { admin } from "@/components/admin/admin-ui";

export default function AdminNewsletterCampaignForm() {
  const [subject, setSubject] = useState("");
  const [preheader, setPreheader] = useState("");
  const [body, setBody] = useState("");
  const [sendNow, setSendNow] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setMessage(null);
    setSuccess(false);

    const result = await sendNewsletterCampaign({
      subject,
      preheader,
      body,
      send_now: sendNow,
    });

    setSubmitting(false);

    if (!result.ok) {
      setMessage(result.message);
      return;
    }

    setSuccess(true);
    setMessage(sendNow ? "تم إرسال الحملة أو إضافتها لقائمة الإرسال." : "تم حفظ الحملة كمسودة.");
    setSubject("");
    setPreheader("");
    setBody("");
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      {message ? (
        <div className={success ? admin.success : admin.error}>{message}</div>
      ) : null}

      <label>
        <span className={admin.label}>عنوان الرسالة</span>
        <input
          required
          value={subject}
          onChange={(event) => setSubject(event.target.value)}
          className={admin.input}
          placeholder="أهم أخبار السياحة هذا الأسبوع"
        />
      </label>

      <label>
        <span className={admin.label}>نص تمهيدي</span>
        <input
          value={preheader}
          onChange={(event) => setPreheader(event.target.value)}
          className={admin.input}
          placeholder="ملخص قصير يظهر في البريد"
        />
      </label>

      <label>
        <span className={admin.label}>محتوى الرسالة</span>
        <textarea
          required
          value={body}
          onChange={(event) => setBody(event.target.value)}
          className={admin.textareaLg}
          placeholder="اكتب محتوى الرسالة البريدية..."
        />
      </label>

      <label className={admin.checkboxRow}>
        <input
          type="checkbox"
          checked={sendNow}
          onChange={(event) => setSendNow(event.target.checked)}
        />
        إرسال الآن إلى المشتركين النشطين
      </label>

      <button type="submit" disabled={submitting} className={admin.btnPrimary}>
        <Send size={14} />
        {submitting ? "جاري الإرسال..." : "إرسال الحملة"}
      </button>
    </form>
  );
}
