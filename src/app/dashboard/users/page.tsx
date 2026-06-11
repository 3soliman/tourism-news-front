import { Plus, Shield, UserCog } from "lucide-react";
import DashboardSection from "@/components/dashboard/DashboardSection";
import { dashboardUsers } from "@/data/dashboard";

const permissions = ["تحرير الأخبار", "نشر الأخبار", "إدارة التصنيفات", "إدارة السيو", "عرض التحليلات", "إدارة المستخدمين"];

export default function DashboardUsersPage() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h1 className="text-3xl font-black text-[#17243a]">إدارة المستخدمين والإعدادات</h1>
          <p className="mt-2 text-[#6e7e99]">إدارة فريق العمل وصلاحيات الموقع الأساسية والتقنية</p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-[#0677e8] px-5 py-3 font-black text-white">
          <Plus size={17} strokeWidth={1.85} />
          إضافة مستخدم
        </button>
      </div>

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.85fr]">
        <DashboardSection title="المستخدمون">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[720px] text-sm">
              <thead>
                <tr className="border-b border-[#dce7f5] text-[#6e7e99]">
                  <th className="px-3 py-3 text-right">المستخدم</th>
                  <th className="px-3 py-3 text-right">الدور</th>
                  <th className="px-3 py-3 text-right">الحالة</th>
                  <th className="px-3 py-3 text-right">آخر تسجيل دخول</th>
                  <th className="px-3 py-3 text-right">الصلاحيات</th>
                </tr>
              </thead>
              <tbody>
                {dashboardUsers.map((user) => (
                  <tr key={user.slug} className="border-b border-[#edf2f8] last:border-0">
                    <td className="px-3 py-4">
                      <div className="flex items-center gap-3">
                        <img src={user.image} alt="" className="h-10 w-10 rounded-full object-cover" />
                        <div>
                          <p className="font-black text-[#17243a]">{user.name}</p>
                          <p className="text-xs text-[#6e7e99]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-4 font-bold text-[#4d5e7c]">{user.role}</td>
                    <td className="px-3 py-4">
                      <span className="rounded-full bg-[#eafaf1] px-3 py-1 font-bold text-[#16a34a]">
                        {user.status}
                      </span>
                    </td>
                    <td className="px-3 py-4 text-[#4d5e7c]">{user.lastSeen}</td>
                    <td className="px-3 py-4 font-bold text-[#0677e8]">{user.permissions}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </DashboardSection>

        <DashboardSection title="الأدوار والصلاحيات">
          <div className="space-y-3">
            {permissions.map((permission, index) => (
              <div key={permission} className="grid grid-cols-[1fr_repeat(4,48px)] items-center gap-2 border-b border-[#edf2f8] pb-3 last:border-0">
                <span className="font-bold text-[#17243a]">{permission}</span>
                {[0, 1, 2, 3].map((role) => (
                  <span
                    key={role}
                    className={`mx-auto h-6 w-11 rounded-full ${role <= (index % 4) ? "bg-[#0677e8]" : "bg-[#dce7f5]"}`}
                  />
                ))}
              </div>
            ))}
          </div>
          <button className="mt-5 inline-flex items-center gap-2 text-sm font-black text-[#0677e8]">
            <UserCog size={17} strokeWidth={1.85} />
            إدارة الأدوار
          </button>
        </DashboardSection>
      </div>

      <DashboardSection title="صفحات الثقة">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {["من نحن", "سياسة الخصوصية", "شروط الاستخدام", "اتصل بنا"].map((page) => (
            <div key={page} className="flex items-center justify-between rounded-lg border border-[#edf2f8] p-4">
              <span className="font-bold text-[#17243a]">{page}</span>
              <Shield size={17} strokeWidth={1.85} className="text-[#157347]" />
            </div>
          ))}
        </div>
      </DashboardSection>
    </div>
  );
}
