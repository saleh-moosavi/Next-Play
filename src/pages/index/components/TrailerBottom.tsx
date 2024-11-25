export default function TrailerBottom() {
  return (
    <div className="w-full relative rounded-2xl overflow-hidden bg-white/5 hover:bg-purple-500/20 group text-white transition-all duration-700">
      <img
        className="w-full object-cover group-hover:scale-110 group-hover:-translate-y-2 transition-all duration-700"
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUhqaH_y-P7yp6QFby87RfBfR0NI-SkisIA&s"
      />
      <p className="absolute top-2 right-2 flex items-center bg-black/60 px-2 py-[.1rem] text-[.6rem] font-semibold rounded-full select-none">
        05:24
      </p>
      <div className="p-5 text-right">
        <h3 className="text-xs font-semibold text-justify cursor-pointer">
          نخستین تریلر بازی Marvel`s Spider-Man 2 منتشر شد
        </h3>
        <div className="flex my-3 items-center gap-x-5 *:text-xs *:text-gray-400">
          <p>
            <span className="w-2 h-2 rounded-full bg-orange-400 inline-block me-2"></span>
            32 بازدید
          </p>
          <p>
            <span className="w-2 h-2 rounded-full bg-purple-400 inline-block me-2"></span>
            یک ماه پیش
          </p>
        </div>
        <div className="flex gap-x-3 items-center">
          <img
            className="w-5 h-5 rounded-full"
            src="https://techcrunch.com/wp-content/uploads/2018/07/fortnite03.jpg"
          />
          <p className="text-xs group-hover:text-purple-300 transition-all duration-700">
            منتشر کننده : محمد
          </p>
        </div>
      </div>
    </div>
  );
}
