"use client";

import { useState } from "react";
import { ImagePlus, Save } from "lucide-react";
import DashboardSection from "@/components/dashboard/DashboardSection";
import HeaderImageSlot from "@/components/admin/HeaderImageSlot";
import { admin } from "@/components/admin/admin-ui";
import {
  updateAdminAppearanceSettings,
  type AdminAppearanceSettings,
} from "@/lib/api/admin-appearance";

const MAX_IMAGES = 6;

type AdminHeaderImagesFormProps = {
  initial: AdminAppearanceSettings;
};

export default function AdminHeaderImagesForm({ initial }: AdminHeaderImagesFormProps) {
  const [images, setImages] = useState<string[]>(
    initial.background_images.length > 0 ? initial.background_images : [],
  );
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const updateImage = (index: number, value: string) => {
    setImages((current) => {
      const next = [...current];
      next[index] = value;
      return next;
    });
    setSuccess(null);
  };

  const addImage = () => {
    if (images.length >= MAX_IMAGES) return;
    setImages((current) => [...current, ""]);
    setSuccess(null);
  };

  const removeImage = (index: number) => {
    setImages((current) => current.filter((_, i) => i !== index));
    setSuccess(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    setSuccess(null);

    const payload = images.map((url) => url.trim()).filter(Boolean);

    if (payload.length === 0) {
      setSubmitting(false);
      setError("أضف صورة واحدة على الأقل لخلفية الموقع.");
      return;
    }

    const result = await updateAdminAppearanceSettings(payload);
    setSubmitting(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    setImages(result.data.background_images);
    setSuccess("تم حفظ صور الخلفية بنجاح.");
  };

  const filledCount = images.filter(Boolean).length;

  return (
    <form onSubmit={handleSubmit} className={admin.form}>
      <DashboardSection title="صور خلفية الهيدر">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 pb-3">
          <p className="text-xs font-semibold text-slate-500">
            {filledCount} / {MAX_IMAGES} صور — WEBP أو JPG حتى 2MB — يُفضّل 1600×900
          </p>
          <button type="submit" disabled={submitting} className={admin.btnPrimary}>
            <Save size={14} />
            {submitting ? "جاري الحفظ..." : "حفظ"}
          </button>
        </div>

        <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-6">
          {images.map((image, index) => (
            <HeaderImageSlot
              key={`header-image-${index}`}
              index={index}
              value={image}
              onChange={(value) => updateImage(index, value)}
              onRemove={() => removeImage(index)}
            />
          ))}

          {images.length < MAX_IMAGES ? (
            <button
              type="button"
              onClick={addImage}
              className="flex aspect-[16/10] flex-col items-center justify-center gap-1 rounded-lg border-2 border-dashed border-slate-200 bg-slate-50 text-slate-400 transition hover:border-sky-300 hover:bg-sky-50/50 hover:text-sky-600"
            >
              <ImagePlus size={20} strokeWidth={1.5} />
              <span className="text-[10px] font-bold">إضافة</span>
            </button>
          ) : null}
        </div>

        {images.length === 0 ? (
          <button
            type="button"
            onClick={addImage}
            className={`${admin.btnSecondary} mt-3`}
          >
            <ImagePlus size={14} />
            إضافة أول صورة
          </button>
        ) : null}
      </DashboardSection>

      {error ? <div className={admin.error}>{error}</div> : null}
      {success ? <div className={admin.success}>{success}</div> : null}
    </form>
  );
}
