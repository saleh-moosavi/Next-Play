"use client";

import Link from "next/link";
import Image from "next/image";
import { News } from "@/types/mainPageTypes";
import { useGameNewsSlider } from "../hooks/useGameNewsSlider";
import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";

export default function NewsRight({ news }: { news: News[] }) {
  const { sliderRef, loaded, currentSlide, sliderInstance } =
    useGameNewsSlider();

  if (!news || news.length === 0) {
    return (
      <div className="relative w-full h-120 rounded-xl overflow-hidden bg-gray-700 dark:bg-gray-300 flex items-center justify-center">
        <p className="text-white dark:text-gray-900">هیچ خبری یافت نشد</p>
      </div>
    );
  }

  return (
    <article className="relative w-full h-120 rounded-xl overflow-hidden text-white bg-black/20 group">
      <div ref={sliderRef} className="keen-slider h-full">
        {news.map((item, idx) => (
          <div key={idx} className="keen-slider__slide relative h-full">
            <Image
              width={500}
              height={500}
              className="w-full h-2/3 object-cover"
              src={item.imageUrl || "/alter-image.jpg"}
              alt={item.title}
            />

            <div className="p-5">
              <div className="mb-2">
                <span className="text-xs font-semibold px-3 py-1 rounded-lg bg-purple-500/80 backdrop-blur-sm">
                  {item.date}
                </span>
              </div>
              <Link
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="my-3 font-bold text-xl cursor-pointer hover:text-purple-300 transition-colors line-clamp-2"
              >
                {item.title}
              </Link>
            </div>
          </div>
        ))}
      </div>

      {loaded && sliderInstance && news.length > 1 && (
        <div className="absolute top-5 left-5 flex gap-x-2">
          <button
            onClick={() => sliderInstance.current?.prev()}
            className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
            aria-label="اسلاید قبلی"
          >
            <FaCircleArrowRight className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={() => sliderInstance.current?.next()}
            className="w-8 h-8 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center transition-all hover:scale-110 cursor-pointer"
            aria-label="اسلاید بعدی"
          >
            <FaCircleArrowLeft className="w-5 h-5 text-white" />
          </button>
        </div>
      )}

      {loaded && sliderInstance && news.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-x-2">
          {news.map((_, idx) => (
            <button
              key={idx}
              onClick={() => sliderInstance.current?.moveToIdx(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${
                currentSlide === idx
                  ? "w-6 bg-purple-500"
                  : "w-2 bg-white/50 hover:bg-white/80"
              }`}
              aria-label={`رفتن به اسلاید ${idx + 1}`}
            />
          ))}
        </div>
      )}
    </article>
  );
}
