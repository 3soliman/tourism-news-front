"use client";

import { useRef, useState } from "react";
import { ImagePlus, Loader2 } from "lucide-react";
import { admin } from "@/components/admin/admin-ui";
import { uploadAdminMedia } from "@/lib/api/admin-media";
import { resolveMediaUrl, toStoredMediaPath } from "@/lib/media-url";

type MediaUploadFieldProps = {
  label: string;
  value: string;
  onChange: (url: string) => void;
  required?: boolean;
  placeholder?: string;
  previewClassName?: string;
  showUrlInput?: boolean;
};

export default function MediaUploadField({
  label,
  value,
  onChange,
  required = false,
  placeholder = "/storage/... أو https://...",
  previewClassName = "h-16 w-24 rounded object-cover",
  showUrlInput = true,
}: MediaUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  const previewUrl = resolveMediaUrl(value);

  return (
    <div className="space-y-1.5">
      {label ? <span className={admin.label}>{label}</span> : null}

      {showUrlInput ? (
        <input
          type="text"
          required={required}
          dir="ltr"
          value={value}
          onChange={(event) => onChange(toStoredMediaPath(event.target.value))}
          placeholder={placeholder}
          className={admin.input}
        />
      ) : null}

      <div className="flex flex-wrap items-center gap-2">
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/jpg,image/png,image/webp,image/gif"
          className="hidden"
          onChange={handleFileChange}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={uploading}
          className={admin.btnSecondary}
        >
          {uploading ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <ImagePlus size={14} />
          )}
          {uploading ? "جاري الرفع..." : "رفع صورة"}
        </button>

        <span className="text-[10px] font-medium text-slate-400">
          JPG, PNG, WEBP — حتى 2MB
        </span>
      </div>

      {error ? <p className="text-xs font-semibold text-red-600">{error}</p> : null}

      {previewUrl ? (
        <img src={previewUrl} alt="" className={previewClassName} />
      ) : null}
    </div>
  );
}
