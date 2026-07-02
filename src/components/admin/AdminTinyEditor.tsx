"use client";

import { Editor } from "@tinymce/tinymce-react";
import { admin } from "@/components/admin/admin-ui";
import { uploadAdminMedia } from "@/lib/api/admin-media";
import { resolveMediaUrl } from "@/lib/media-url";

const TINYMCE_CDN = "https://cdn.jsdelivr.net/npm/tinymce@8.6.0";

type AdminTinyEditorProps = {
  label?: string;
  value: string;
  onChange: (html: string) => void;
};
type TinyMceBlobInfo = {
  blob: () => Blob;
  filename: () => string;
};


export default function AdminTinyEditor({
  label,
  value,
  onChange,
}: AdminTinyEditorProps) {
  return (
    <div className="admin-tinymce-wrap">
      {label ? <span className={admin.label}>{label}</span> : null}

      <Editor
        tinymceScriptSrc={`${TINYMCE_CDN}/tinymce.min.js`}
        licenseKey="gpl"
        value={value}
        onEditorChange={(content) => onChange(content)}
        init={{
          height: 520,
          min_height: 420,
          menubar: "edit view insert format table tools",
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "help",
            "wordcount",
            "directionality",
            "autoresize",
          ],
          toolbar:
            "undo redo | blocks fontsize | bold italic underline strikethrough | " +
            "forecolor backcolor | alignright aligncenter alignleft alignjustify | " +
            "bullist numlist outdent indent | link image media table blockquote | " +
            "ltr rtl | removeformat code fullscreen",
          directionality: "rtl",
          branding: false,
          promotion: false,
          resize: true,
          autoresize_bottom_margin: 24,
          skin_url: `${TINYMCE_CDN}/skins/ui/oxide`,
          content_css: `${TINYMCE_CDN}/skins/content/default/content.min.css`,
          block_formats:
            "فقرة=p;عنوان رئيسي=h2;عنوان فرعي=h3;عنوان صغير=h4;اقتباس=blockquote",
          font_family_formats:
            "افتراضي=inherit;Cairo=Cairo,sans-serif;Tajawal=Tajawal,sans-serif;Amiri=Amiri,serif;Arial=Arial,sans-serif",
          fontsize_formats: "14px 16px 18px 20px 24px 28px 32px",
          content_style: `
            body {
              font-family: Cairo, Tahoma, Arial, sans-serif;
              font-size: 16px;
              line-height: 1.9;
              direction: rtl;
              color: #0f172a;
              padding: 12px 16px;
              margin: 0;
            }
            p { margin: 0 0 1em; }
            h2, h3, h4 { line-height: 1.5; margin: 1em 0 0.5em; }
            img { max-width: 100%; height: auto; border-radius: 4px; }
            iframe, video {
              max-width: 100%;
              width: 100%;
              aspect-ratio: 16 / 9;
              height: auto;
              min-height: 220px;
              border: 0;
              border-radius: 8px;
              display: block;
              margin: 1rem 0;
            }
            blockquote {
              border-right: 4px solid #0284c7;
              background: #f0f9ff;
              margin: 1em 0;
              padding: 0.75rem 1rem;
            }
          `,
          images_upload_handler: async (blobInfo: TinyMceBlobInfo) => {
            const file = new File([blobInfo.blob()], blobInfo.filename(), {
              type: blobInfo.blob().type,
            });
            const result = await uploadAdminMedia(file);

            if (!result.ok) {
              throw new Error(result.message);
            }

            return resolveMediaUrl(result.data.url);
          },
          paste_data_images: true,
          media_live_embeds: true,
          image_caption: true,
          table_toolbar:
            "tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol",
        }}
      />
    </div>
  );
}
