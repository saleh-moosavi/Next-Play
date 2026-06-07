import { CurrentGame } from "@/types/gamePageTypes";

export default function Description({
  currentGame,
}: {
  currentGame: CurrentGame;
}) {
  return (
    <>
      <div className="bg-gray-700 dark:bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-6">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            توضیحات بازی
          </h2>
          <div className="leading-relaxed whitespace-pre-line">
            {currentGame.fullDescription}
          </div>
        </div>
      </div>
      {currentGame.englishDescription && (
        <div className="bg-gray-700 dark:bg-white rounded-xl shadow-lg overflow-hidden">
          <div className="p-6 text-left">
            <h2 className="text-xl font-bold mb-4">About This Game</h2>
            <div className="leading-relaxed">
              {currentGame.englishDescription}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
