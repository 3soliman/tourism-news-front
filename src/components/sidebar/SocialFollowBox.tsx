import { Globe, MessageCircle, Send, ExternalLink } from "lucide-react";

export default function SocialFollowBox() {
  const links = [
    { label: "فيسبوك", icon: Globe, color: "bg-blue-600 hover:bg-blue-700" },
    { label: "إكس", icon: Send, color: "bg-primary-dark hover:bg-black" },
    { label: "واتساب", icon: MessageCircle, color: "bg-green-600 hover:bg-green-700" },
    { label: "يوتيوب", icon: ExternalLink, color: "bg-red-600 hover:bg-red-700" },
  ];

  return (
    <div className="rounded-xl bg-white p-5 editorial-card">
      <h3 className="flex items-center gap-2 border-b border-border/60 pb-3 text-sm font-black text-text-dark">
        <span className="section-accent" />
        تابعنا
      </h3>
      <div className="mt-4 grid grid-cols-2 gap-2.5">
        {links.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2.5 text-xs font-bold text-white transition-all ${item.color} shadow-sm`}
          >
            <item.icon size={14} />
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
