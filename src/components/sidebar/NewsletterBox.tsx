export default function NewsletterBox() {
  return (
    <div className="rounded-xl bg-gradient-to-br from-primary-dark via-primary-900 to-primary-dark p-6 text-white shadow-xl shadow-primary-dark/20">
      <h3 className="text-lg font-black tracking-tight">النشرة البريدية</h3>
      <p className="mt-2 text-sm leading-6 text-white/70">
        اشترك لتصلك أهم أخبار السياحة مباشرة إلى بريدك.
      </p>
      <form className="mt-5 space-y-3" action="/contact">
        <input
          type="email"
          placeholder="بريدك الإلكتروني"
          className="w-full rounded-xl border border-white/15 bg-white/10 px-4 py-3 text-sm text-white outline-none backdrop-blur-sm transition placeholder:text-white/40 focus:border-accent/60 focus:bg-white/15"
        />
        <button
          type="submit"
          className="w-full rounded-xl bg-gradient-to-l from-accent to-amber-400 py-3 text-sm font-black text-primary-dark shadow-lg shadow-amber-500/20 transition hover:shadow-xl hover:shadow-amber-500/30"
        >
          اشتراك ←
        </button>
      </form>
    </div>
  );
}
