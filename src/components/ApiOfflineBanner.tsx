import { WifiOff } from "lucide-react";

export default function ApiOfflineBanner() {
  return (
    <div
      role="status"
      className="border-b border-amber-300 bg-amber-50 px-4 py-3 text-amber-950"
    >
      <div className="mx-auto flex max-w-7xl items-center gap-3 text-sm font-bold">
        <WifiOff size={18} className="shrink-0 text-amber-700" />
        <p>
          السيرفر غير متصل حاليًا{" "}
          {/* <span className="font-black text-amber-900">http://127.0.0.1:8070</span> */}
        </p>
      </div>
    </div>
  );
}
