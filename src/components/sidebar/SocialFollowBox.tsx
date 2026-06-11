export default function SocialFollowBox() {
  const links = [
    { label: "فيسبوك", color: "bg-blue-600" },
    { label: "إكس", color: "bg-primary-dark" },
    { label: "واتساب", color: "bg-green-600" },
    { label: "يوتيوب", color: "bg-red-600" },
  ];

  return (
    <div className="rounded-lg editorial-card p-4">
      <h3 className="border-b border-border pb-2 text-sm font-black text-text-dark">
        تابعنا
      </h3>
      <div className="mt-3 grid grid-cols-2 gap-2">
        {links.map((item) => (
          <a
            key={item.label}
            href="#"
            className={`rounded-md px-3 py-2 text-center text-xs font-bold text-white transition opacity-90 hover:opacity-100 ${item.color}`}
          >
            {item.label}
          </a>
        ))}
      </div>
    </div>
  );
}
