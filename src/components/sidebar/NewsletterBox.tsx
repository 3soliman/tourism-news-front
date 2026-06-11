export default function NewsletterBox() {
  return (
    <div className="rounded border border-border bg-primary/5 p-4">
      <h3 className="text-sm font-black text-text-dark">النشرة البريدية</h3>
      <p className="mt-2 text-xs leading-6 text-text-muted">
        اشترك لتصلك أهم أخبار السياحة والعروض مباشرة إلى بريدك.
      </p>
      <form className="mt-3 space-y-2" action="/contact">
        <input
          type="email"
          placeholder="بريدك الإلكتروني"
          className="w-full rounded border border-border bg-surface px-3 py-2 text-sm outline-none focus:border-primary"
        />
        <button
          type="submit"
          className="w-full rounded bg-primary py-2 text-sm font-bold text-white transition hover:bg-primary-dark"
        >
          اشتراك
        </button>
      </form>
    </div>
  );
}
