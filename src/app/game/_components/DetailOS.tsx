import { CurrentGame } from "@/types/gamePageTypes";

export default function DetailOS({
  currentGame,
}: {
  currentGame: CurrentGame;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden mb-6">
      <div className="p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <svg
            className="w-6 h-6 text-purple-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 3v2m6-2v2M9 19v2m6-2v2M5 7h14M5 17h14M5 7v10a2 2 0 002 2h10a2 2 0 002-2V7H5z"
            />
          </svg>
          سیستم مورد نیاز
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {/* Minimum */}
          <div className="bg-red-50 dark:bg-red-900/20 rounded-xl p-5">
            <h3 className="font-bold text-lg text-red-700 dark:text-red-400 mb-3">
              حداقل سیستم مورد نیاز
            </h3>
            <ul className="space-y-2 text-sm">
              {currentGame.minOS.os && (
                <li className="flex justify-between items-center border-b border-red-200 dark:border-red-800 pb-2">
                  <span className="font-semibold">سیستم عامل:</span>
                  <span>{currentGame.minOS.os}</span>
                </li>
              )}
              {currentGame.minOS.processor && (
                <li className="flex justify-between items-center border-b border-red-200 dark:border-red-800 pb-2">
                  <span className="font-semibold">پردازنده:</span>
                  <span className="text-left">
                    {currentGame.minOS.processor}
                  </span>
                </li>
              )}
              {currentGame.minOS.memory && (
                <li className="flex justify-between items-center border-b border-red-200 dark:border-red-800 pb-2">
                  <span className="font-semibold">رم:</span>
                  <span>{currentGame.minOS.memory}</span>
                </li>
              )}
              {currentGame.minOS.graphics && (
                <li className="flex justify-between items-center border-b border-red-200 dark:border-red-800 pb-2">
                  <span className="font-semibold">گرافیک:</span>
                  <span className="text-left">
                    {currentGame.minOS.graphics}
                  </span>
                </li>
              )}
              {currentGame.minOS.directX && (
                <li className="flex justify-between items-center border-b border-red-200 dark:border-red-800 pb-2">
                  <span className="font-semibold">DirectX:</span>
                  <span>{currentGame.minOS.directX}</span>
                </li>
              )}
              {currentGame.minOS.storage && (
                <li className="flex justify-between items-center">
                  <span className="font-semibold">فضای ذخیره‌سازی:</span>
                  <span>{currentGame.minOS.storage}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Recommended */}
          <div className="bg-green-50 dark:bg-green-900/20 rounded-xl p-5">
            <h3 className="font-bold text-lg text-green-700 dark:text-green-400 mb-3">
              سیستم پیشنهادی
            </h3>
            <ul className="space-y-2 text-sm">
              {currentGame.recommendOS.os && (
                <li className="flex justify-between items-center border-b border-green-200 dark:border-green-800 pb-2">
                  <span className="font-semibold">سیستم عامل:</span>
                  <span>{currentGame.recommendOS.os}</span>
                </li>
              )}
              {currentGame.recommendOS.processor && (
                <li className="flex justify-between items-center border-b border-green-200 dark:border-green-800 pb-2">
                  <span className="font-semibold">پردازنده:</span>
                  <span className="text-left">
                    {currentGame.recommendOS.processor}
                  </span>
                </li>
              )}
              {currentGame.recommendOS.memory && (
                <li className="flex justify-between items-center border-b border-green-200 dark:border-green-800 pb-2">
                  <span className="font-semibold">رم:</span>
                  <span>{currentGame.recommendOS.memory}</span>
                </li>
              )}
              {currentGame.recommendOS.graphics && (
                <li className="flex justify-between items-center border-b border-green-200 dark:border-green-800 pb-2">
                  <span className="font-semibold">گرافیک:</span>
                  <span className="text-left">
                    {currentGame.recommendOS.graphics}
                  </span>
                </li>
              )}
              {currentGame.recommendOS.directX && (
                <li className="flex justify-between items-center border-b border-green-200 dark:border-green-800 pb-2">
                  <span className="font-semibold">DirectX:</span>
                  <span>{currentGame.recommendOS.directX}</span>
                </li>
              )}
              {currentGame.recommendOS.storage && (
                <li className="flex justify-between items-center">
                  <span className="font-semibold">فضای ذخیره‌سازی:</span>
                  <span>{currentGame.recommendOS.storage}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
