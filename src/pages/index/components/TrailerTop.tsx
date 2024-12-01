import {BiSolidDislike, BiSolidLike} from "react-icons/bi";
import {CiBookmarkPlus} from "react-icons/ci";
import {GoKebabHorizontal} from "react-icons/go";
import {IoIosShareAlt} from "react-icons/io";
import VideoPlayer from "../../../components/VideoPlayer";

export default function TrailerTop() {
    return (
        <div className="bg-white/5 rounded-2xl overflow-hidden">
            <div className="w-full mb-3 overflow-hidden rounded-2xl">
                <VideoPlayer/>
            </div>
            <div className="text-white text-right p-5">
                <h2 className="text-lg font-semibold mb-2">
                    تریلر جذاب بازی Call Of Duty Mobile
                </h2>
                <p className="text-xs font-semibold text-gray-300 leading-6 text-justify">
                    فصل جدید بازی کالاف دیوتی موبایل که همین چند روز پیش و در تاریخ ۱۱ مهر
                    منتشر شد، غافلگیری‌های زیادی را برای طرفداران رو کرد. این فصل جدید که
                    Orbital Raiders نام دارد حال و هوایی علمی-تخیلی به بازی می‌دهد و آن را
                    متنوع‌تر از همیشه نشان می‌دهد.
                </p>
                <hr className="my-5 opacity-20"/>
                <article className="flex justify-between items-center">
                    <section className="text-white flex gap-x-10">
                        <div
                            className="text-xs flex gap-x-2 items-center cursor-pointer hover:text-stone-300 transition-all duration-700">
                            <CiBookmarkPlus className="w-5 h-5"/>
                            <p className="hidden sm:block">افزودن به لیست علاقه مندی ها</p>
                        </div>
                        <div
                            className="text-xs flex gap-x-2 items-center cursor-pointer hover:text-stone-300 transition-all duration-700">
                            <IoIosShareAlt className="w-5 h-5"/>
                            <p className="hidden sm:block">اشتراک گذاری</p>
                        </div
                        >
                        <div className="flex gap-x-3 items-center *:cursor-pointer">
                            <BiSolidLike className="hover:text-sky-400 transition-all duration-700"/>
                            <BiSolidDislike className="hover:text-rose-400 transition-all duration-700"/>
                        </div>
                    </section>
                    <button className="bg-white/30 p-2 rounded-md hover:bg-purple-500 transition-all duration-700">
                        <GoKebabHorizontal className="stroke-2"/>
                    </button>
                </article>
            </div>
        </div>
    );
}
