export default function NewsletterBox() {
  return (
    <div className="rounded-lg bg-primary-dark p-5 text-white shadow-xl shadow-primary-dark/10">
      <h3 className="text-base font-black">النشرة البريدية</h3>
      <p className="mt-2 text-xs leading-6 text-white/75">
        اشترك لتصلك أهم أخبار السياحة والعروض مباشرة إلى بريدك.
      </p>
      <form className="mt-3 space-y-2" action="/contact">
        <input
          type="email"
          placeholder="بريدك الإلكتروني"
          className="w-full rounded-md border border-white/15 bg-white px-3 py-2 text-sm text-text-dark outline-none focus:border-accent"
        />
        <button
          type="submit"
          className="w-full rounded-md bg-accent py-2 text-sm font-black text-primary-dark transition hover:bg-gold"
        >
          اشتراك
        </button>
      </form>
    </div>
  );
}
