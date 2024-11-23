import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { LuChevronLeftSquare } from "react-icons/lu";

export default function Header() {
  return (
    <div className="grid grid-cols-3 p-5 relative">
      <div className="col-span-3">
        <img
          className="rounded-3xl h-80 w-full object-cover"
          src="https://www.creocommunity.pt/wp-content/uploads/2024/02/Modern-Warfare-3-e-Warzone-Season-2-chegam-em-7.jpg"
        />
        <div className="text-white absolute bottom-5 left-20 w-72 backdrop-blur-md px-5 py-1 rounded-3xl border-2 border-white/10">
          <p className="text-[.65rem] text-orange-400 bg-orange-400/20 inline-block px-2 rounded-full">
            مقاله جدید
          </p>
          <h4 className="font-semibold text-lg my-2">Call of Duty Warzone</h4>
          <p className="text-xs font-semibold text-gray-200 text-justify line-clamp-3">
            مانند دیگر بازیهای بتل رویال سوار یک هواپیما خواهید شد و روی نقشه
            فرود خواهید آمد . وجه تفاوت این بازی نسبت به بقیه در تعداد بازیکنان
            آن است
          </p>
          <div className="flex justify-between items-center mt-5">
            <div className="flex items-center justify-between text-xs bg-purple-500 rounded-full h-fit">
              <span className="bg-white rounded-full p-1">
                <LiaCommentDotsSolid className="text-black" />
              </span>
              <p className="px-2">20نظر</p>
            </div>
            <p className="bg-purple-500 p-1 rounded-full">
              <LuChevronLeftSquare />
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 relative">
        <FaAngleRight className="absolute top-1/2 -translate-y-1/2 bg-purple-500 -right-2 text-white rounded-full cursor-pointer" />
        <div className="grid grid-cols-4 gap-2 *:rounded-md *:object-cover h-10 *:h-full *:cursor-pointer">
          <img src="https://www.creocommunity.pt/wp-content/uploads/2024/02/Modern-Warfare-3-e-Warzone-Season-2-chegam-em-7.jpg" />
          <img src="https://techcrunch.com/wp-content/uploads/2018/07/fortnite03.jpg" />
          <img src="https://www.digitaltrends.com/wp-content/uploads/2024/03/Marvel-Rivals-2.jpg?resize=1000%2C600&p=1" />
          <img src="https://oyster.ignimgs.com/mediawiki/apis.ign.com/forza-5/0/0f/Forza_motorsport_5.jpg" />
        </div>
        <FaAngleLeft className="absolute top-1/2 -translate-y-1/2 bg-purple-500 -left-2 text-white rounded-full cursor-pointer" />
      </div>
    </div>
  );
}
