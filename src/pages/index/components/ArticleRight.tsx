import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

export default function ArticleRight() {
  return (
    <article className="relative w-full h-[30rem] rounded-xl overflow-hidden text-white">
      <img
        className="w-full h-full object-cover"
        src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/forza-5/0/0f/Forza_motorsport_5.jpg"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60"></div>
      <div className="absolute bottom-5 px-5">
        <div className="flex gap-x-2 items-center *:text-xs *:font-semibold *:px-4 *:rounded-full *:bg-purple-500/70">
          <p>پازل</p>
          <p>فکری</p>
        </div>
        <h3 className="my-3 font-semibold cursor-pointer">
          بازی Hello Neighbor منتشر شد
        </h3>
        <p className="text-xs line-clamp-2">
          سلام همسایه از خاص ترین ، زیباترین و محبوب ترین بازیهای ماجراجویی
          ترسناک با ساخت فوق العاده از tinyBuild برای اندروید است که تا دقایقی
          پیش
        </p>
        <button className="px-4 py-1 bg-purple-600 rounded-lg mt-3 text-sm">
          مشاهده مقاله
        </button>
      </div>
      <div className="absolute top-5 left-5 flex gap-x-2 *:w-6 *:h-6 *:cursor-pointer">
        <FaCircleArrowRight />
        <FaCircleArrowLeft />
      </div>
    </article>
  );
}
