import { MobileCurrentGame } from "@/types/mobileGameTypes";

export default function Links({ game }: { game: MobileCurrentGame }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-green-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>📥</span> لینک‌های دانلود
        </h2>
      </div>
      <div className="p-6">
        {/* انتخاب نسخه */}
        {game.downloadLinks.length > 1 && (
          <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
            {game.downloadLinks.map((version, idx) => (
              <button
                key={idx}
                className={`px-4 py-2 rounded-lg whitespace-nowrap transition-all`}
              >
                {version.title}
                <span className="block text-xs opacity-75">{version.size}</span>
              </button>
            ))}
          </div>
        )}

        {/* لینک‌های دانلود */}
        <div className="space-y-3">
          {game.downloadLinks[0]?.links.map((link, idx) => (
            <div key={idx}>
              {!link.url && link.text && (
                <div className="font-bold text-gray-700 mt-4 mb-2 text-lg">
                  {link.text}
                </div>
              )}
              {link.url && (
                <a
                  href={link.url}
                  className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-green-50 transition-all group border border-transparent hover:border-green-200"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">📎</span>
                    <div>
                      <div className="font-medium text-gray-800 group-hover:text-green-600">
                        {link.text}
                      </div>
                      {link.size && (
                        <div className="text-sm text-gray-500">
                          حجم: {link.size}
                        </div>
                      )}
                    </div>
                  </div>
                  {link.serverLocation && (
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        link.serverLocation === "ایران"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {link.serverLocation === "ایران"
                        ? "🇮🇷 سرور ایران"
                        : "🌍 سرور خارج"}
                    </span>
                  )}
                </a>
              )}
            </div>
          ))}
        </div>

        {/* رمز فایل */}
        {game.metaInfo.password && (
          <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div>
                <div className="font-bold text-yellow-800">🔐 رمز فایل:</div>
                <code className="text-yellow-700 bg-yellow-100 px-2 py-1 rounded mt-1 inline-block font-mono">
                  {game.metaInfo.password}
                </code>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
