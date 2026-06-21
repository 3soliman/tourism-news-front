import NewsletterSubscribeForm from "@/components/newsletter/NewsletterSubscribeForm";

export default function NewsletterBox() {
  return (
    <div className="rounded-xl bg-gradient-to-br from-primary-dark via-primary-900 to-primary-dark p-6 text-white shadow-xl shadow-primary-dark/20">
      <h3 className="text-lg font-black tracking-tight">النشرة البريدية</h3>
      <p className="mt-2 text-sm leading-6 text-white/70">
        اشترك لتصلك أهم أخبار السياحة مباشرة إلى بريدك.
      </p>
      <NewsletterSubscribeForm variant="sidebar" />
    </div>
  );
}
