"use client";

import { useEffect } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import Underline from "@tiptap/extension-underline";
import TextAlign from "@tiptap/extension-text-align";
import { Color } from "@tiptap/extension-color";
import { TextStyle } from "@tiptap/extension-text-style";
import FontFamily from "@tiptap/extension-font-family";
import Highlight from "@tiptap/extension-highlight";
import Placeholder from "@tiptap/extension-placeholder";
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  Bold,
  Eraser,
  Heading2,
  Heading3,
  Highlighter,
  Italic,
  Link2,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Strikethrough,
  Underline as UnderlineIcon,
  Undo2,
  Unlink,
} from "lucide-react";
import { admin } from "@/components/admin/admin-ui";

const FONT_OPTIONS = [
  { label: "افتراضي", value: "" },
  { label: "Cairo", value: "Cairo, sans-serif" },
  { label: "Tajawal", value: "Tajawal, sans-serif" },
  { label: "Noto Naskh Arabic", value: '"Noto Naskh Arabic", serif' },
  { label: "Amiri", value: "Amiri, serif" },
  { label: "Arial", value: "Arial, sans-serif" },
];

const TEXT_COLORS = [
  "#0f172a",
  "#1d4ed8",
  "#0369a1",
  "#15803d",
  "#b45309",
  "#b91c1c",
  "#7c3aed",
  "#475569",
];

const HIGHLIGHT_COLORS = [
  "#fef08a",
  "#bbf7d0",
  "#bfdbfe",
  "#fecdd3",
  "#e9d5ff",
  "#fde68a",
];

type ToolbarButtonProps = {
  onClick: () => void;
  active?: boolean;
  disabled?: boolean;
  title: string;
  children: React.ReactNode;
};

function ToolbarButton({
  onClick,
  active,
  disabled,
  title,
  children,
}: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={`grid h-7 w-7 place-items-center rounded border text-slate-600 transition ${
        active
          ? "border-sky-300 bg-sky-50 text-sky-700"
          : "border-transparent hover:border-slate-200 hover:bg-slate-50"
      } disabled:opacity-40`}
    >
      {children}
    </button>
  );
}

type AdminRichTextEditorProps = {
  label?: string;
  value: string;
  onChange: (html: string) => void;
  placeholder?: string;
};

export default function AdminRichTextEditor({
  label,
  value,
  onChange,
  placeholder = "اكتب محتوى الخبر هنا...",
}: AdminRichTextEditorProps) {
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({
        heading: { levels: [2, 3] },
      }),
      Underline,
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-sky-600 underline",
          rel: "noopener noreferrer",
          target: "_blank",
        },
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
      }),
      TextStyle,
      Color,
      FontFamily,
      Highlight.configure({ multicolor: true }),
      Placeholder.configure({ placeholder }),
    ],
    content: value,
    editorProps: {
      attributes: {
        class:
          "admin-rich-editor min-h-[280px] px-3 py-2 text-sm leading-7 text-slate-800 outline-none",
        dir: "rtl",
      },
    },
    onUpdate: ({ editor: currentEditor }) => {
      onChange(currentEditor.getHTML());
    },
  });

  useEffect(() => {
    if (!editor) return;

    const current = editor.getHTML();
    if (value !== current) {
      editor.commands.setContent(value || "<p></p>", { emitUpdate: false });
    }
  }, [editor, value]);

  const setLink = () => {
    if (!editor) return;

    const previousUrl = editor.getAttributes("link").href as string | undefined;
    const url = window.prompt("أدخل رابط URL:", previousUrl ?? "https://");

    if (url === null) return;

    if (url.trim() === "") {
      editor.chain().focus().extendMarkRange("link").unsetLink().run();
      return;
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: url.trim() }).run();
  };

  if (!editor) {
    return (
      <div className="rounded-md border border-slate-200 bg-white p-3 text-xs text-slate-500">
        جاري تحميل المحرر...
      </div>
    );
  }

  return (
    <div>
      {label ? <span className={admin.label}>{label}</span> : null}

      <div className="overflow-hidden rounded-md border border-slate-200 bg-white">
        <div className="flex flex-wrap items-center gap-1 border-b border-slate-100 bg-slate-50 px-2 py-1.5">
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBold().run()}
            active={editor.isActive("bold")}
            title="عريض"
          >
            <Bold size={14} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleItalic().run()}
            active={editor.isActive("italic")}
            title="مائل"
          >
            <Italic size={14} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleUnderline().run()}
            active={editor.isActive("underline")}
            title="تحته خط"
          >
            <UnderlineIcon size={14} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleStrike().run()}
            active={editor.isActive("strike")}
            title="يتوسطه خط"
          >
            <Strikethrough size={14} />
          </ToolbarButton>

          <span className="mx-0.5 h-5 w-px bg-slate-200" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            active={editor.isActive("heading", { level: 2 })}
            title="عنوان فرعي"
          >
            <Heading2 size={14} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            active={editor.isActive("heading", { level: 3 })}
            title="عنوان أصغر"
          >
            <Heading3 size={14} />
          </ToolbarButton>

          <span className="mx-0.5 h-5 w-px bg-slate-200" />

          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBulletList().run()}
            active={editor.isActive("bulletList")}
            title="قائمة نقطية"
          >
            <List size={14} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
            active={editor.isActive("orderedList")}
            title="قائمة مرقّمة"
          >
            <ListOrdered size={14} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
            active={editor.isActive("blockquote")}
            title="اقتباس"
          >
            <Quote size={14} />
          </ToolbarButton>

          <span className="mx-0.5 h-5 w-px bg-slate-200" />

          <ToolbarButton
            onClick={setLink}
            active={editor.isActive("link")}
            title="إضافة رابط"
          >
            <Link2 size={14} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().unsetLink().run()}
            disabled={!editor.isActive("link")}
            title="إزالة الرابط"
          >
            <Unlink size={14} />
          </ToolbarButton>

          <span className="mx-0.5 h-5 w-px bg-slate-200" />

          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
            active={editor.isActive({ textAlign: "right" })}
            title="محاذاة يمين"
          >
            <AlignRight size={14} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
            active={editor.isActive({ textAlign: "center" })}
            title="توسيط"
          >
            <AlignCenter size={14} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
            active={editor.isActive({ textAlign: "left" })}
            title="محاذاة يسار"
          >
            <AlignLeft size={14} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
            active={editor.isActive({ textAlign: "justify" })}
            title="ضبط"
          >
            <AlignJustify size={14} />
          </ToolbarButton>

          <span className="mx-0.5 h-5 w-px bg-slate-200" />

          <select
            value={editor.getAttributes("textStyle").fontFamily ?? ""}
            onChange={(event) =>
              editor
                .chain()
                .focus()
                .setFontFamily(event.target.value || "")
                .run()
            }
            className="h-7 max-w-[120px] rounded border border-slate-200 bg-white px-1.5 text-[11px] text-slate-700 outline-none"
            title="نوع الخط"
          >
            {FONT_OPTIONS.map((font) => (
              <option key={font.label} value={font.value}>
                {font.label}
              </option>
            ))}
          </select>

          <div className="flex items-center gap-0.5" title="لون النص">
            {TEXT_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => editor.chain().focus().setColor(color).run()}
                className="h-4 w-4 rounded-full border border-slate-200"
                style={{ backgroundColor: color }}
                aria-label={`لون ${color}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-0.5" title="تمييز النص">
            <Highlighter size={13} className="text-slate-500" />
            {HIGHLIGHT_COLORS.map((color) => (
              <button
                key={color}
                type="button"
                onClick={() => editor.chain().focus().toggleHighlight({ color }).run()}
                className="h-4 w-4 rounded border border-slate-200"
                style={{ backgroundColor: color }}
                aria-label={`تمييز ${color}`}
              />
            ))}
          </div>

          <span className="mx-0.5 h-5 w-px bg-slate-200" />

          <ToolbarButton
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().undo()}
            title="تراجع"
          >
            <Undo2 size={14} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().redo()}
            title="إعادة"
          >
            <Redo2 size={14} />
          </ToolbarButton>
          <ToolbarButton
            onClick={() => editor.chain().focus().clearNodes().unsetAllMarks().run()}
            title="مسح التنسيق"
          >
            <Eraser size={14} />
          </ToolbarButton>
        </div>

        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
