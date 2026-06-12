import { MobileCurrentGame } from "@/types/mobileGameTypes";

export default function Guides({ game }: { game: MobileCurrentGame }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-purple-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📖</span> راهنمای نصب بازی
        </h2>
      </div>
      <div className="p-6">
        <div className="space-y-4 text-gray-700">
          <div>
            <h4 className="font-bold text-lg mb-2">نصب فایل APK:</h4>
            <ol className="list-decimal list-inside space-y-1 mr-4">
              <li>فایل APK بازی را دانلود کنید.</li>
              <li>روی فایل دانلود شده کلیک کنید.</li>
              <li>
                اگر گوشی شما نصب از منابع ناشناس را غیرفعال کرده، اجازه دهید.
              </li>
              <li>روی گزینه نصب کلیک کنید.</li>
              <li>پس از اتمام نصب، بازی را اجرا کنید.</li>
            </ol>
          </div>

          {game.hasDataFile && (
            <div>
              <h4 className="font-bold text-lg mb-2">نصب فایل دیتا:</h4>
              <ol className="list-decimal list-inside space-y-1 mr-4">
                <li>
                  فایل APK را نصب کنید اما{" "}
                  <strong className="text-red-600">اجرا نکنید</strong>.
                </li>
                <li>فایل دیتا (ZIP یا RAR) را دانلود کنید.</li>
                <li>
                  با نرم‌افزارهایی مثل WinRAR یا ZArchiver فایل را اکسترکت کنید.
                </li>
                <li>
                  پوشه به دست آمده را به مسیر{" "}
                  <code className="bg-gray-200 px-1 rounded">Android/obb/</code>{" "}
                  منتقل کنید.
                </li>
                <li>حالا بازی را اجرا کنید.</li>
              </ol>
            </div>
          )}

          {game.metaInfo.password && (
            <div className="mt-4 p-3 bg-yellow-100 rounded-lg">
              <p className="font-bold">🔐 رمز فایل‌های فشرده:</p>
              <code className="text-yellow-800">{game.metaInfo.password}</code>
            </div>
          )}

          <div className="mt-4 p-3 bg-green-100 rounded-lg">
            <p className="font-bold">💡 نکات مهم:</p>
            <ul className="list-disc list-inside mt-2 space-y-1">
              <li>حتماً از نرم‌افزار مدیریت دانلود مثل IDM استفاده کنید.</li>
              <li>در صورت مشکل در دانلود، از VPN یا DNS تغییر استفاده کنید.</li>
              <li>
                تمام فایل‌های دانلودی در سرورهای ایران هستند و ترافیک نیم‌بها
                محاسبه می‌شود.
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
