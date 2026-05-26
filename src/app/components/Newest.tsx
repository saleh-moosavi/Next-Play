import NewestItem from "./NewestItem";
import { Game } from "@/types/mainPageTypes";

export default function Newest({ games }: { games: Game[] }) {
  return (
    <div className="px-5 lg:px-0">
      <h2 className="font-semibold text-white dark:text-gray-900 mt-10">
        بازی های جدید
      </h2>
      <section className="grid grid-cols-1 md:grid-cols-3 gap-3 py-5">
        {games.map((game, index: number) => (
          <NewestItem key={"game" + index} game={game} />
        ))}
      </section>
    </div>
  );
}
