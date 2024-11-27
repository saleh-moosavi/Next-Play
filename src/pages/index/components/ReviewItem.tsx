import { FaPlay } from "react-icons/fa6";

export default function ReviewItem({ data }: any) {
  return (
    <div className="relative w-full h-72 rounded-2xl overflow-hidden cursor-pointer group">
      <img
        className="w-full h-full object-cover group-hover:blur-sm transition-all duration-700"
        src={data.img}
      />
      <div className="absolute w-full flex flex-col justify-center items-center bottom-5 text-white text-center group-hover:bottom-1/2 group-hover:translate-y-1/2 transition-all duration-700">
        <h3 className="font-semibold mb-2">ویدئو نقد و بررسی</h3>
        <p className="text-xs mb-5">{data.title}</p>
        <p className="bg-white/20 p-2 rounded-full inline-block group-hover:bg-orange-500 transition-all duration-700">
          <FaPlay />
        </p>
      </div>
    </div>
  );
}
