export default function ArticleLeft({ article }: any) {
  return (
    <div className="grid grid-cols-5 w-full gap-x-2 items-center bg-gray-700 hover:bg-purple-900/40 transition-all duration-700 p-2 rounded-xl text-white group">
      <div className="h-32 col-span-2 rounded-xl relative overflow-hidden">
        <div className="absolute w-full h-full border-2 border-white opacity-0 rounded-xl scale-110 group-hover:scale-75 group-hover:opacity-100 transition-all duration-700 z-50"></div>
        <img
          className="w-full h-full rounded-xl object-cover group-hover:grayscale transition-all duration-700 -z-10"
          src={article.img}
        />
      </div>
      <article className="col-span-3 flex flex-col items-start justify-between">
        <div className="flex gap-x-2 items-center *:text-[.7rem] *:font-semibold *:px-4 *:rounded-md *:bg-purple-500/20 group-hover:*:bg-gray-400/20 text-purple-400 group-hover:*:text-white *:transition-all *:duration-700">
          {article.type.map((t: any, index: any) => (
            <p key={index}>{t}</p>
          ))}
        </div>
        <h3 className="text-xs font-semibold my-3 cursor-pointer">
          {article.title}
        </h3>
        <p className="text-[.7rem] text-gray-400 flex items-center gap-x-2 group-hover:text-purple-300 transition-all duration-700">
          <span className="w-[.4rem] h-[.4rem] bg-orange-500 group-hover:bg-purple-400 transition-all duration-700 inline-block rounded-full"></span>
          {article.views} نفر این مقاله را خواندند
        </p>
        <button className="text-[.6rem] font-semibold bg-gray-800 group-hover:bg-purple-600 transition-all duration-700 px-4 py-1 rounded-md mt-1">
          مشاهده مقاله
        </button>
      </article>
    </div>
  );
}
