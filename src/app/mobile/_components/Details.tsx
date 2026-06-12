import { MobileCurrentGame } from "@/types/mobileGameTypes";
import Image from "next/image";

export default function Details({ game }: { game: MobileCurrentGame }) {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="bg-blue-600 px-6 py-4">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <span>ℹ️</span> اطلاعات بازی
        </h2>
      </div>
      <div className="p-6 space-y-6">
        {/* جدول اطلاعات */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">👨‍💻 سازنده</div>
            <div className="font-medium">{game.mobileInfo.developer}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">🎮 سبک</div>
            <div className="font-medium">{game.mobileInfo.genre}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">📱 سیستم عامل</div>
            <div className="font-medium">{game.mobileInfo.os}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">🤖 حداقل نسخه اندروید</div>
            <div className="font-medium">{game.minOS}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">🔞 رده سنی</div>
            <div className="font-medium">{game.mobileInfo.ageRating}</div>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="text-sm text-gray-500">💰 قیمت</div>
            <div className="font-medium">{game.mobileInfo.price}</div>
          </div>
        </div>

        {/* توضیحات */}
        {game.fullDescription && (
          <div>
            <h3 className="text-xl font-bold mb-3">📝 توضیحات بازی</h3>
            <div className="prose prose-sm max-w-none bg-gray-50 p-6 rounded-lg">
              {game.fullDescription.split("\n").map(
                (paragraph, idx) =>
                  paragraph.trim() && (
                    <p key={idx} className="mb-2">
                      {paragraph}
                    </p>
                  ),
              )}
            </div>
          </div>
        )}

        {/* اسکرین شات‌ها */}
        {game.gameScreenshots.length > 0 && (
          <div>
            <h3 className="text-xl font-bold mb-3">📸 تصاویر بازی</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {game.gameScreenshots.map((screenshot, idx) => (
                <a
                  key={idx}
                  href={screenshot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 group"
                >
                  <Image
                    src={screenshot}
                    alt={`${game.title} - تصویر ${idx + 1}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all flex items-center justify-center">
                    <span className="opacity-0 group-hover:opacity-100 text-white text-2xl">
                      🔍
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
