import Link from "next/link";
import Button from "@/_components/Button";
import { MobileCurrentGame } from "@/types/mobileGameTypes";

export default function Links({ game }: { game: MobileCurrentGame }) {
  return (
    <div className="bg-gray-700 dark:bg-white rounded-xl shadow-lg overflow-hidden p-5 space-y-5">
      <h2 className="text-xl font-bold flex items-center gap-2">
        لینک‌های دانلود
      </h2>
      <div className="space-y-5">
        <div className="space-y-5">
          {game.downloadLinks[0]?.links.map((link, idx) => (
            <div key={idx}>
              {!link.url && link.text && (
                <h3 className="font-bold text-lg">{link.text}</h3>
              )}
              {link.url && (
                <Link
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-gray-800 dark:bg-gray-100 rounded-lg transition-all group border border-transparent"
                >
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-medium">{link.text}</div>
                      {link.size && (
                        <div className="text-sm">حجم : {link.size}</div>
                      )}
                    </div>
                  </div>
                  {link.serverLocation && (
                    <Button rounded="md">
                      {link.serverLocation === "ایران"
                        ? "سرور ایران"
                        : "سرور خارج"}
                    </Button>
                  )}
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>
      {game.metaInfo.password && (
        <div className="overflow-hidden space-y-5">
          <h2 className="text-xl font-bold">رمز فایل‌های فشرده</h2>
          <div className="bg-gray-800 dark:bg-gray-100 w-full p-5 rounded-lg">
            <code className="text-yellow-200 dark:text-yellow-600">
              {game.metaInfo.password}
            </code>
          </div>
        </div>
      )}
    </div>
  );
}
