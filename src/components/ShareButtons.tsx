"use client";

type ShareButtonsProps = {
  title: string;
  url: string;
};

export default function ShareButtons({ title, url }: ShareButtonsProps) {
  const whatsappText = encodeURIComponent(`${title}\n${url}`);
  const encodedUrl = encodeURIComponent(url);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      alert("تم نسخ الرابط");
    } catch {
      alert(url);
    }
  };

  return (
    <div className="mt-6 rounded border border-border bg-surface p-4">
      <h3 className="text-sm font-black text-text-dark">شارك الخبر</h3>
      <div className="mt-3 flex flex-wrap gap-2">
        <a
          href={`https://wa.me/?text=${whatsappText}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-green-600 px-4 py-2 text-xs font-bold text-white transition hover:bg-green-700"
        >
          واتساب
        </a>
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded bg-blue-700 px-4 py-2 text-xs font-bold text-white transition hover:bg-blue-800"
        >
          فيسبوك
        </a>
        <button
          type="button"
          onClick={copyLink}
          className="rounded bg-primary px-4 py-2 text-xs font-bold text-white transition hover:bg-primary-dark"
        >
          نسخ الرابط
        </button>
      </div>
    </div>
  );
}
