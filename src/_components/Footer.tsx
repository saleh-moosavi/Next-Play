import {
  FaArrowLeft,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
  FaWhatsapp,
} from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <section className=" bg-gray-300/10 dark:bg-black/10">
      <footer className="grid grid-cols-12 gap-5 md:gap-0 p-5 lg:px-0 lg:max-w-5xl lg:mx-auto">
        {/* section 1 */}
        <section className="md:col-span-4 col-span-6 text-white dark:text-gray-900 justify-self-center md:justify-self-start">
          <h3 className="mb-5">داغ ترین مطالب</h3>
          <article className="flex gap-x-2 text-xs items-center cursor-pointer">
            <img
              className="w-8 h-8 object-cover rounded-md"
              src="https://bloody-disgusting.com/wp-content/uploads/2021/03/helloneighbor2.jpg"
            />
            <p>بازی های پربازدید</p>
          </article>
          <article className="flex gap-x-2 my-2 text-xs items-center cursor-pointer">
            <img
              className="w-8 h-8  object-cover rounded-md"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUhqaH_y-P7yp6QFby87RfBfR0NI-SkisIA&s"
            />
            <p>جدیدترین تریلرها</p>
          </article>
          <article className="flex gap-x-2 text-xs items-center cursor-pointer">
            <img
              className="w-8 h-8  object-cover rounded-md"
              src="https://gamebato.ir/wp-content/uploads/elementor/thumbs/Enotria-The.Last_.Song_.Grid_-quaa7z10lkxxcpnpt0ivv98kc9hjmbnblnjmzoe0n8.webp"
            />
            <p>بازی های مورد انتظار</p>
          </article>
        </section>

        {/* section 2 */}
        <section className="md:col-span-3 col-span-6 text-white dark:text-gray-900 justify-self-center">
          <h3 className="mb-5">پربازدیدترین صفحات</h3>
          <ul className="*:text-xs flex flex-col gap-y-2 *:cursor-pointer">
            <li>مقالات</li>
            <li>فروشگاه</li>
            <li>درباره ما</li>
            <li>تماس با ما</li>
            <li>درخواست همکاری</li>
          </ul>
        </section>

        {/* section 3 */}
        <section className="md:col-span-5 col-span-12 text-white dark:text-gray-900 justify-self-center md:justify-self-center w-full max-w-72">
          <h3 className="mb-5">عضویت در خبرنامه</h3>
          <label className="flex items-center gap-x-2 w-full h-7 relative">
            <input
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              className="w-full h-full rounded-md bg-black/20 text-white placeholder:dark:text-gray-600 dark:text-gray-900 ps-10 pe-2 text-xs font-semibold outline-none focus:shadow-[0_0_5px_rgb(249_115_22)] hover:shadow-[0_0_10px_rgb(249_115_22)] transition-all duration-700"
            />
            <div className="bg-orange-500/80 dark:bg-orange-300 p-1 rounded-md cursor-pointer">
              <FaArrowLeft />
            </div>
            <MdEmail className="text-orange-500 dark:text-orange-300 absolute right-1 top-1/2 -translate-y-1/2 text-2xl" />
          </label>
          <div className="mt-4">
            <img
              src="./assets/eNamad.jpg"
              className="h-16 w-full rounded-lg object-cover"
            />
          </div>
        </section>
      </footer>

      {/* second footer */}
      <article className="bg-orange-400 text-white">
        <section className="flex md:justify-between gap-2 md:gap-0 flex-col md:flex-row items-center py-3 px-5 lg:px-0 lg:max-w-5xl lg:mx-auto">
          <p className="text-xs font-semibold select-none order-1">
            کپی از مطالب تنها با کسب مجوز امکان پذیر است
          </p>
          <div className="flex gap-x-3 *:size-5 hover:*:scale-110 *:transition-all *:duration-300 *:cursor-pointer md:order-3">
            <FaInstagram />
            <FaWhatsapp />
            <FaLinkedin />
            <FaTwitter />
          </div>
        </section>
      </article>
    </section>
  );
}
