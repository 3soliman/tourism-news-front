import type { Metadata } from "next";
import StaticPageLayout from "@/components/StaticPageLayout";

export const metadata: Metadata = {
  title: "اتصل بنا",
  description:
    "تواصل مع فريق أخبار السياحة للاستفسارات، الاقتراحات، والتعاون الإعلامي.",
};

export default function ContactPage() {
  return (
    <StaticPageLayout
      title="اتصل بنا"
      description="يسعدنا استقبال استفساراتك واقتراحاتك وملاحظاتك حول المحتوى أو التعاون."
    >
      <p>
        إذا كان لديك سؤال حول مقال منشور، اقتراح لموضوع سياحي، أو رغبة في
        التعاون مع المنصة، يمكنك التواصل معنا عبر القنوات التالية:
      </p>

      <h2>قنوات التواصل</h2>
      <ul>
        <li>
          البريد الإلكتروني:{" "}
          <a href="mailto:info@example.com">info@example.com</a>
        </li>
        <li>
          واتساب:{" "}
          <a
            href="https://wa.me/967000000000"
            target="_blank"
            rel="noopener noreferrer"
          >
            تواصل عبر واتساب
          </a>
        </li>
      </ul>

      <h2>أوقات الرد</h2>
      <p>
        نسعى للرد على الرسائل خلال أيام العمل. قد تستغرق بعض الاستفسارات وقتًا
        إضافيًا حسب نوع الطلب.
      </p>

      <h2>ملاحظة</h2>
      <p>
        المنصة لا تقدم خدمات حجز مباشرة حاليًا، لكن يمكن توجيهك لاحقًا إلى
        قنوات الحجز أو العروض المناسبة عند توفرها.
      </p>
    </StaticPageLayout>
  );
}
