import { FaArrowLeft } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function Footer() {
  return (
    <section className=" bg-gray-300/10">
      <footer className="grid grid-cols-12 p-5 lg:px-0 lg:max-w-5xl lg:mx-auto">
        <section className="col-span-4 text-white justify-self-start">
          <h3 className="mb-5">داغ ترین مطالب</h3>
          <article className="flex gap-x-2 text-xs items-center">
            <img
              className="w-8 h-8 object-cover rounded-md"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUhqaH_y-P7yp6QFby87RfBfR0NI-SkisIA&s"
            />
            <p>بازی های پربازدید</p>
          </article>
          <article className="flex gap-x-2 my-2 text-xs items-center">
            <img
              className="w-8 h-8  object-cover rounded-md"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUhqaH_y-P7yp6QFby87RfBfR0NI-SkisIA&s"
            />
            <p>جدیدترین تریلرها</p>
          </article>
          <article className="flex gap-x-2 text-xs items-center">
            <img
              className="w-8 h-8  object-cover rounded-md"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSFUhqaH_y-P7yp6QFby87RfBfR0NI-SkisIA&s"
            />
            <p>بازی های مورد انتظار</p>
          </article>
        </section>

        <section className="col-span-3 text-white justify-self-center">
          <h3 className="mb-5">پربازدیدترین صفحات</h3>
          <ul className="*:text-xs flex flex-col gap-y-2">
            <li>مقالات</li>
            <li>فروشگاه</li>
            <li>درباره ما</li>
            <li>تماس با ما</li>
            <li>درخواست همکاری</li>
          </ul>
        </section>

        <section className="col-span-5 text-white justify-self-end w-full max-w-72">
          <h3 className="mb-5">عضویت در خبرنامه</h3>
          <label className="flex items-center gap-x-2 w-full h-7 relative">
            <input
              type="email"
              placeholder="ایمیل خود را وارد کنید"
              className="w-full h-full rounded-md bg-black/20 text-white ps-10 pe-2 text-xs font-semibold"
            />
            <div className="bg-orange-500/80 p-1 rounded-md">
              <FaArrowLeft />
            </div>
            <MdEmail className="text-orange-500 absolute right-1 top-1/2 -translate-y-1/2 text-2xl" />
          </label>
          <div className="mt-4">
            <img
              src="./assets/eNamad.jpg"
              className="h-16 w-full rounded-lg object-cover"
            />
          </div>
        </section>
      </footer>
    </section>
  );
}
