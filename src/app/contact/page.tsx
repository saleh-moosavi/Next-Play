import Link from "next/link";
import {
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaGithub,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaTelegram,
  FaInstagram,
  FaHeadset,
} from "react-icons/fa";

export const metadata = {
  title: "تماس با ما | Next Play",
  description: "راه‌های ارتباطی با تیم Next Play ، فرم تماس و اطلاعات تماس",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-linear-to-b from-gray-900 via-gray-800 to-gray-900 dark:from-gray-100 dark:via-gray-50 dark:to-gray-100 rounded-xl overflow-hidden">
      {/* Hero Section */}
      <section className="flex flex-col justify-center items-center p-16 md:p-32 bg-linear-to-r from-purple-900/20 via-blue-900/20 to-purple-900/20 dark:from-purple-200/30 dark:via-blue-200/30 dark:to-purple-200/30">
        <h1 className="text-4xl md:text-6xl font-bold text-white dark:text-gray-900 mb-6">
          ارتباط با
          <span className="bg-linear-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            ما
          </span>
        </h1>
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 dark:bg-blue-500/20 rounded-full mb-6 border border-blue-500/20">
          <FaHeadset className="text-blue-400" />
          <span className="text-blue-300 dark:text-blue-600 text-sm font-medium">
            پشتیبانی ۲۴/۷
          </span>
        </div>

        <p className="text-lg text-gray-300 dark:text-gray-600 max-w-3xl mx-auto leading-relaxed">
          ما همیشه خوشحال می‌شویم که از شما بشنویم! سوال، پیشنهاد یا انتقادی
          دارید؟ با ما در تماس باشید.
        </p>
      </section>

      {/* Contact Info Cards */}
      <section className="py-8 md:py-12 grid md:grid-cols-3 gap-6 max-w-5xl mx-auto px-5">
        {[
          {
            icon: FaEnvelope,
            title: "ایمیل",
            info: "info@next-play.net",
            sub: "پاسخگویی در ۲۴ ساعت",
            color: "from-blue-500 to-blue-600",
          },
          {
            icon: FaPhone,
            title: "تلفن",
            info: "+98 21 1234 5678",
            sub: "شنبه تا چهارشنبه ۹-۱۷",
            color: "from-purple-500 to-purple-600",
          },
          {
            icon: FaMapMarkerAlt,
            title: "آدرس",
            info: "تهران، ایران",
            sub: "خیابان آزادی، پلاک ۱۲۳",
            color: "from-green-500 to-green-600",
          },
        ].map((item, index) => (
          <div
            key={index}
            className="group bg-white/5 dark:bg-gray-300/30 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/10 dark:border-gray-200/20 hover:border-blue-500/50 transition-all hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              className={`inline-flex p-4 rounded-2xl bg-linear-to-r ${item.color} mb-4 group-hover:scale-110 transition-transform`}
            >
              <item.icon className="w-6 h-6 text-white" />
            </div>
            <h3 className="font-bold text-white dark:text-gray-900 text-lg mb-2">
              {item.title}
            </h3>
            <p
              className="text-gray-300 dark:text-gray-600 font-medium"
              dir="ltr"
            >
              {item.info}
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
              {item.sub}
            </p>
          </div>
        ))}
      </section>

      {/* Social Media Section */}
      <section className="py-12 md:py-16 flex flex-col justify-center items-center">
        <h2 className="text-2xl font-bold text-white dark:text-gray-900 mb-4">
          ما را در شبکه‌های اجتماعی دنبال کنید
        </h2>
        <p className="text-gray-400 dark:text-gray-500 mb-8">
          جدیدترین اخبار و مطالب را در شبکه‌های اجتماعی ما دنبال کنید
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="#"
            className="p-4 bg-white/10 dark:bg-gray-300/30 rounded-2xl hover:bg-blue-500/20 transition-all hover:-translate-y-1"
          >
            <FaTelegram className="w-6 h-6 text-blue-400" />
          </Link>
          <Link
            href="#"
            className="p-4 bg-white/10 dark:bg-gray-300/30 rounded-2xl hover:bg-pink-500/20 transition-all hover:-translate-y-1"
          >
            <FaInstagram className="w-6 h-6 text-pink-400" />
          </Link>
          <Link
            href="#"
            className="p-4 bg-white/10 dark:bg-gray-300/30 rounded-2xl hover:bg-blue-400/20 transition-all hover:-translate-y-1"
          >
            <FaTwitter className="w-6 h-6 text-blue-400" />
          </Link>
          <Link
            href="#"
            className="p-4 bg-white/10 dark:bg-gray-300/30 rounded-2xl hover:bg-red-500/20 transition-all hover:-translate-y-1"
          >
            <FaYoutube className="w-6 h-6 text-red-400" />
          </Link>
          <Link
            href="#"
            className="p-4 bg-white/10 dark:bg-gray-300/30 rounded-2xl hover:bg-gray-500/20 transition-all hover:-translate-y-1"
          >
            <FaGithub className="w-6 h-6 text-gray-400" />
          </Link>
          <Link
            href="#"
            className="p-4 bg-white/10 dark:bg-gray-300/30 rounded-2xl hover:bg-blue-600/20 transition-all hover:-translate-y-1"
          >
            <FaLinkedin className="w-6 h-6 text-blue-400" />
          </Link>
        </div>
      </section>
    </div>
  );
}
