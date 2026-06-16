"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2, Trash2, Upload } from "lucide-react";
import { uploadAdminMedia } from "@/lib/api/admin-media";
import { resolveMediaUrl, toStoredMediaPath } from "@/lib/media-url";

type HeaderImageSlotProps = {
  index: number;
  value: string;
  onChange: (url: string) => void;
  onRemove: () => void;
};

export default function HeaderImageSlot({
  index,
  value,
  onChange,
  onRemove,
}: HeaderImageSlotProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const previewUrl = resolveMediaUrl(value);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    event.target.value = "";

    if (!file) return;

    setUploading(true);
    setError(null);

    const result = await uploadAdminMedia(file);
    setUploading(false);

    if (!result.ok) {
      setError(result.message);
      return;
    }

    onChange(toStoredMediaPath(result.data.url));
  };

  return (
    <div className="overflow-hidden rounded-lg border border-slate-200 bg-white">
      <div className="relative aspect-[16/10] bg-slate-100">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt={`صورة خلفية ${index + 1}`}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-1 text-slate-400">
            <ImagePlus size={20} strokeWidth={1.5} />
            <span className="text-[10px] font-bold">فارغة</span>
          </div>
        )}

        {uploading ? (
          <div className="absolute inset-0 flex items-center justify-center bg-white/80">
            <Loader2 size={20} className="animate-spin text-sky-600" />
          </div>
        ) : null}

        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      <div className="flex items-center gap-1 border-t border-slate-100 p-1.5">
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className="inline-flex flex-1 items-center justify-center gap-1 rounded bg-slate-100 px-2 py-1.5 text-[10px] font-bold text-slate-700 hover:bg-sky-50 hover:text-sky-700"
        >
          <Upload size={11} />
          {previewUrl ? "استبدال" : "رفع"}
        </button>

        {value ? (
          <button
            type="button"
            onClick={onRemove}
            className="inline-flex items-center justify-center rounded bg-red-50 px-2 py-1.5 text-red-600 hover:bg-red-100"
            aria-label="حذف الصورة"
          >
            <Trash2 size={12} />
          </button>
        ) : null}
      </div>

      {error ? (
        <p className="border-t border-red-100 bg-red-50 px-2 py-1 text-[10px] font-semibold text-red-600">
          {error}
        </p>
      ) : null}
    </div>
  );
}
