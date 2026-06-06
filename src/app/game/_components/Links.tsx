import { CurrentGame } from "@/types/gamePageTypes";

export default function Links({ currentGame }: { currentGame: CurrentGame }) {
  return (
    <>
      {currentGame.downloadLinks.length > 0 && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
          <div className="p-6">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
              <svg
                className="w-6 h-6 text-blue-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              لینک‌های دانلود
            </h2>
            <div className="grid gap-3">
              {currentGame.downloadLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl hover:bg-blue-100 dark:hover:bg-blue-900/30 transition"
                >
                  <div className="flex items-center gap-3">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                      />
                    </svg>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white">
                        {link.text}
                      </p>
                      {link.size && (
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {link.size}
                        </p>
                      )}
                    </div>
                  </div>
                  <span className="text-blue-600 dark:text-blue-400">
                    دانلود
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      )}
      {currentGame.metaInfo.password && (
        <div className="mb-6 bg-yellow-50 dark:bg-yellow-900/20 border-r-4 border-yellow-500 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <svg
              className="w-6 h-6 text-yellow-600 dark:text-yellow-500 shrink-0 mt-0.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <div>
              <p className="font-semibold text-yellow-800 dark:text-yellow-400 mb-1">
                رمز فایل
              </p>
              <p className="text-yellow-700 dark:text-yellow-300 font-mono text-sm">
                {currentGame.metaInfo.password}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
