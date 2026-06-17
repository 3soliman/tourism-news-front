import type { Metadata } from "next";
import Link from "next/link";
import StaticPageLayout from "@/components/StaticPageLayout";
import CookiePreferencesLink from "@/components/cookies/CookiePreferencesLink";

export const metadata: Metadata = {
  title: "سياسة ملفات تعريف الارتباط",
  description:
    "تعرف على كيفية استخدام موقع أخبار السياحة لملفات تعريف الارتباط وكيفية التحكم بها.",
};

const LAST_UPDATED = "18 يونيو 2026";

const cookieRows = [
  {
    type: "ضرورية",
    name: "cookie_consent",
    purpose: "حفظ اختيارك بخصوص ملفات تعريف الارتباط",
    duration: "6 أشهر",
  },
  {
    type: "ضرورية",
    name: "admin_token",
    purpose: "الاحتفاظ بجلسة تسجيل الدخول للوحة التحكم (للمحررين فقط)",
    duration: "30 يومًا",
  },
  {
    type: "تحليلات",
    name: "_ga / _gid",
    purpose: "قياس زيارات الموقع عبر Google Analytics — عند التفعيل فقط",
    duration: "حتى سنتين / 24 ساعة",
  },
  {
    type: "إعلانات",
    name: "google_ads_*",
    purpose: "عرض وقياس الإعلانات عند تفعيل Google AdSense",
    duration: "حسب سياسة Google",
  },
] as const;

export default function CookiePolicyPage() {
  return (
    <StaticPageLayout
      title="سياسة ملفات تعريف الارتباط"
      description="نوضح هنا كيف نستخدم ملفات تعريف الارتباط في موقع أخبار السياحة وكيف يمكنك إدارة تفضيلاتك."
    >
      <p className="text-sm font-semibold text-text-muted">
        آخر تحديث: {LAST_UPDATED}
      </p>

      <h2>ما هي ملفات تعريف الارتباط؟</h2>
      <p>
        ملفات تعريف الارتباط (Cookies) هي ملفات نصية صغيرة تُخزَّن على جهازك
        عند زيارة الموقع. تساعدنا على تشغيل الموقع بشكل صحيح، وتذكر بعض
        التفضيلات، و—بموافقتك—قياس الزيارات أو عرض إعلانات مناسبة.
      </p>

      <h2>لماذا نستخدمها؟</h2>
      <p>
        بصفتنا منصة إخبارية سياحية، نعتمد على فهم كيفية استخدام الزوار للموقع
        لتحسين المحتوى، ومعرفة الأقسام الأكثر قراءة، ومصادر الزيارات، و—عند
        الموافقة—دعم الإعلانات وتحليل الأداء. نجمع هذه البيانات بشفافية وبما
        يتوافق مع اختياراتك.
      </p>

      <h2>أنواع الكوكيز التي نستخدمها</h2>
      <ul>
        <li>
          <strong>ضرورية:</strong> مطلوبة لتشغيل الموقع وحفظ موافقتك على
          الكوكيز.
        </li>
        <li>
          <strong>تحليلات:</strong> لفهم عدد الزوار وسلوك التصفح (مثل Google
          Analytics) — تُفعَّل فقط بعد موافقتك.
        </li>
        <li>
          <strong>إعلانات:</strong> لعرض وقياس الإعلانات عند تفعيل خدمات مثل
          AdSense — تُفعَّل فقط بعد موافقتك.
        </li>
        <li>
          <strong>تخصيص:</strong> لتذكر تفضيلاتك مثل الدولة أو الاهتمامات —
          تُفعَّل فقط بعد موافقتك.
        </li>
      </ul>

      <h2>قائمة ملفات تعريف الارتباط</h2>
      <div className="not-prose overflow-x-auto">
        <table className="w-full min-w-[640px] border-collapse text-sm">
          <thead>
            <tr className="bg-[#eaf6fb] text-[#244958]">
              <th className="border border-border px-3 py-2 text-start font-bold">
                النوع
              </th>
              <th className="border border-border px-3 py-2 text-start font-bold">
                الاسم
              </th>
              <th className="border border-border px-3 py-2 text-start font-bold">
                الغرض
              </th>
              <th className="border border-border px-3 py-2 text-start font-bold">
                المدة
              </th>
            </tr>
          </thead>
          <tbody>
            {cookieRows.map((row) => (
              <tr key={row.name}>
                <td className="border border-border px-3 py-2">{row.type}</td>
                <td className="border border-border px-3 py-2 font-mono text-xs">
                  {row.name}
                </td>
                <td className="border border-border px-3 py-2">{row.purpose}</td>
                <td className="border border-border px-3 py-2">{row.duration}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="text-sm text-text-muted">
        لا ندرج في هذه القائمة إلا ما نستخدمه فعليًا أو ما نخطط لتفعيله بشكل
        واضح بعد موافقتك. كوكيز التحليلات والإعلانات لا تُشغَّل حاليًا إلا إذا
        وافقت عليها من شريط الموافقة.
      </p>

      <h2>كوكيز الطرف الثالث</h2>
      <p>
        قد تُضاف لاحقًا خدمات طرف ثالث مثل Google Analytics أو Google AdSense.
        في هذه الحالة، تخضع هذه الخدمات لسياسات الخصوصية الخاصة بمقدّميها، ولا
        نُفعِّلها إلا بعد موافقتك الصريحة.
      </p>

      <h2>كيف يمكنك التحكم بها؟</h2>
      <p>
        عند أول زيارة، يظهر شريط يتيح لك قبول الكل، أو رفض الكوكيز غير
        الضرورية، أو تخصيص الاختيارات. يمكنك أيضًا تعديل إعدادات المتصفح
        لحذف أو حظر الكوكيز، مع العلم أن ذلك قد يؤثر على بعض وظائف الموقع.
      </p>

      <h2>تغيير الموافقة لاحقًا</h2>
      <p>
        يمكنك في أي وقت إعادة فتح لوحة التفضيلات من الرابط أدناه أو من الفوتر
        عبر «إدارة تفضيلات الكوكيز».
      </p>
      <p>
        <CookiePreferencesLink />
      </p>

      <h2>معلومات التواصل</h2>
      <p>
        لأي استفسار بخصوص ملفات تعريف الارتباط أو الخصوصية، راجع{" "}
        <Link href="/privacy-policy" className="font-bold text-primary hover:underline">
          سياسة الخصوصية
        </Link>{" "}
        أو{" "}
        <Link href="/contact" className="font-bold text-primary hover:underline">
          اتصل بنا
        </Link>
        .
      </p>
    </StaticPageLayout>
  );
}
