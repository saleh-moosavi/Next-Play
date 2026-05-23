export default function TrailerBottom({ data }: any) {
  return (
    <div className="w-full h-full relative rounded-2xl overflow-hidden bg-white/5 dark:bg-black/10 hover:bg-purple-500/20 group text-white transition-all duration-700">
      <img
        className="w-full h-52 md:h-72 lg:h-52 object-cover group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-700"
        src={data.img}
      />
      <p className="absolute top-2 right-2 flex items-center bg-black/60 px-2 py-[.1rem] text-[.6rem] font-semibold rounded-full select-none">
        {data.duration}
      </p>
      <div className="p-5 text-right">
        <h3 className="text-xs font-semibold text-justify cursor-pointer dark:text-gray-900">
          {data.title}
        </h3>
        <div className="flex my-3 items-center gap-x-5 *:text-xs *:text-gray-400 *:dark:text-gray-700">
          <p>
            <span className="w-2 h-2 rounded-full bg-orange-400 inline-block me-2"></span>
            {data.view} بازدید
          </p>
          <p>
            <span className="w-2 h-2 rounded-full bg-purple-400 inline-block me-2"></span>
            {data.published_at}
          </p>
        </div>
        <div className="flex gap-x-3 items-center">
          <img
            className="w-5 h-5 rounded-full"
            src="https://techcrunch.com/wp-content/uploads/2018/07/fortnite03.jpg"
          />
          <p className="text-xs dark:text-gray-700 group-hover:text-purple-300 dark:group-hover:text-purple-600 transition-all duration-700">
            منتشر کننده : {data.publisher}
          </p>
        </div>
      </div>
    </div>
  );
}
