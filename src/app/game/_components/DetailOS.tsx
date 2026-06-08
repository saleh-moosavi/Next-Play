import { CurrentGame } from "@/types/gamePageTypes";

export default function DetailOS({
  currentGame,
}: {
  currentGame: CurrentGame;
}) {
  if (!currentGame.minOS && !currentGame.recommendOS) return null;
  return (
    <div
      className={`grid md:grid-cols-${currentGame.minOS && currentGame.recommendOS ? 2 : 1} gap-6`}
    >
      {currentGame.minOS && (
        <div className="bg-red-900 dark:bg-red-100 rounded-xl p-5 shadow-lg">
          <h3 className="font-bold text-lg text-red-400 dark:text-red-400 mb-3">
            حداقل سیستم مورد نیاز
          </h3>
          <ul className="space-y-2 text-sm text-left">
            {currentGame.minOS
              .split(
                /(?=OS:|Processor:|Memory:|Graphics:|DirectX:|Storage:|Sound Card:|Additional Notes:)/,
              )
              .map((line, index) => (
                <li key={"min" + index}>{line.trim()}</li>
              ))}
          </ul>
        </div>
      )}

      {currentGame.recommendOS && (
        <div className="bg-green-900 dark:bg-green-100 rounded-xl p-5 shadow-lg">
          <h3 className="font-bold text-lg text-green-400 dark:text-green-400 mb-3">
            سیستم پیشنهادی
          </h3>
          <ul className="space-y-2 text-sm text-left">
            {currentGame.recommendOS
              .split(
                /(?=OS:|Processor:|Memory:|Graphics:|DirectX:|Storage:|Sound Card:|Additional Notes:)/,
              )
              .map((line, index) => (
                <li key={"recomended" + index}>{line.trim()}</li>
              ))}
          </ul>
        </div>
      )}
    </div>
  );
}
