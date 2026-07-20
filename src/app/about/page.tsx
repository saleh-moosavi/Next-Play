import {
  FaRocket,
  FaUsers,
  FaHeart,
  FaShieldAlt,
  FaGlobe,
  FaMobile,
} from "react-icons/fa";

export const metadata = {
  title: "درباره ما | Next Play",
  description:
    "آشنایی با تیم ما ، فعالیت و دیدگاه ما در ارائه محتوای بازی‌های ویدئویی",
};

export default function Page() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-50 dark:to-gray-100 rounded-xl">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center p-16 md:p-32 bg-linear-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 dark:from-purple-200/30 dark:via-blue-200/30 dark:to-purple-200/30">
        <h1 className="text-2xl md:text-6xl font-bold text-white dark:text-gray-900 mb-6">
          درباره
          <span className="bg-linear-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Next Play
          </span>
        </h1>

        <p className="text-lg md:text-xl text-gray-300 dark:text-gray-600 text-justify">
          ما یک تیم از علاقه‌مندان به بازی‌های ویدئویی هستیم که هدف‌مان ارائه
          بهترین محتوای رسانه‌ای، دانلود بازی‌ها و اخبار روز دنیای گیمینگ به
          جامعه ایرانی است.
        </p>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 md:py-20">
        <article className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto px-4">
          <div className="bg-linear-to-br from-purple-900/20 to-blue-900/20 dark:from-purple-100/30 dark:to-blue-100/30 rounded-3xl p-8 border border-purple-500/20 dark:border-purple-300/30">
            <span className="flex items-center gap-3 mb-4">
              <p className="p-3 bg-purple-500/20 rounded-xl">
                <FaRocket className="w-6 h-6 text-purple-400" />
              </p>
              <h2 className="text-xl font-bold text-white dark:text-gray-900">
                ماموریت ما
              </h2>
            </span>
            <p className="text-gray-300 dark:text-gray-600 text-justify">
              ارائه محتوای باکیفیت، به‌روز و دسترسی آسان به بازی‌های ویدئویی
              برای جامعه ایرانی. ما تلاش می‌کنیم تا پلی بین بازیکنان و دنیای
              گیمینگ باشیم و تجربه‌ای لذت‌بخش را برای همه فراهم کنیم.
            </p>
          </div>

          <div className="bg-linear-to-br from-pink-900/20 to-purple-900/20 dark:from-pink-100/30 dark:to-purple-100/30 rounded-3xl p-8 border border-pink-500/20 dark:border-pink-300/30">
            <span className="flex items-center gap-3 mb-4">
              <p className="p-3 bg-pink-500/20 rounded-xl">
                <FaHeart className="w-6 h-6 text-pink-400" />
              </p>
              <h2 className="text-xl font-bold text-white dark:text-gray-900">
                چشم‌انداز
              </h2>
            </span>
            <p className="text-gray-300 dark:text-gray-600 text-justify">
              تبدیل شدن به بزرگترین و معتبرترین مرجع بازی‌های ویدئویی در ایران و
              ایجاد یک جامعه پویا و فعال از علاقه‌مندان به بازی که بتوانند
              تجربیات خود را به اشتراک بگذارند.
            </p>
          </div>
        </article>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 px-4 bg-linear-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 dark:from-purple-200/30 dark:via-blue-200/30 dark:to-purple-200/30">
        <h2 className="text-3xl font-bold text-white dark:text-gray-900 text-center mb-12">
          ارزش‌های <span className="text-purple-400">ما</span>
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
          {[
            {
              icon: FaShieldAlt,
              title: "اعتماد",
              desc: "محتوای معتبر و قابل اعتماد",
            },
            { icon: FaGlobe, title: "دسترسی", desc: "دسترسی آسان برای همه" },
            { icon: FaUsers, title: "جامعه", desc: "ساخت جامعه پویا" },
            { icon: FaMobile, title: "نوآوری", desc: "به‌روز با تکنولوژی" },
          ].map((value, index) => (
            <div
              key={index}
              className="text-center p-6 bg-white/5 dark:bg-gray-800/30 rounded-2xl border border-white/10 dark:border-gray-200/20 hover:border-purple-500/50 transition-all hover:-translate-y-1"
            >
              <value.icon className="w-10 h-10 text-purple-400 mx-auto mb-3" />
              <h3 className="font-bold text-white dark:text-gray-900 text-lg mb-2">
                {value.title}
              </h3>
              <p className="text-gray-400 dark:text-gray-500 text-sm">
                {value.desc}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
