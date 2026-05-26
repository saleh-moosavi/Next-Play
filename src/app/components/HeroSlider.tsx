"use client";

import Image from "next/image";
import { Slide } from "@/types/mainPageTypes";
import { useHeroSlider } from "../hooks/useHeroSlider";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function HeroSlider({ slides }: { slides: Slide[] }) {
  const { sliderRef, thumbnailRef, loaded, currentSlide, sliderInstance } =
    useHeroSlider();

  if (!slides || slides.length === 0) {
    return (
      <div className="w-full h-96 bg-gray-200 dark:bg-gray-700 rounded-2xl flex items-center justify-center">
        <p className="text-gray-500">مشکلی در بارگذاری پیش آمده</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-5 lg:px-0">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl group">
        <div ref={sliderRef} className="keen-slider">
          {slides.map((slide, idx) => (
            <div key={idx} className="keen-slider__slide relative">
              <Image
                width={1920}
                height={1080}
                src={slide.imgUrl}
                alt={slide.title}
                className="w-full h-64 sm:h-96 md:h-125 object-cover"
                loading={idx === 0 ? "eager" : "lazy"}
                priority={idx === 0}
              />

              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/40 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 text-white flex justify-center items-center">
                <div className="max-w-2xl">
                  <h2 className="text-xl md:text-3xl lg:text-2xl font-bold mb-2 line-clamp-2">
                    {slide.title}
                  </h2>
                  <p className="text-sm md:text-base text-justify text-gray-200 line-clamp-3 mb-4">
                    {slide.description}
                  </p>
                  <a
                    href={slide.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 md:px-6 py-2 md:py-3 rounded-full text-sm md:text-base transition-all hover:scale-105"
                  >
                    مشاهده جزئیات
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {loaded && sliderInstance && (
          <>
            <button
              onClick={() => sliderInstance.prev()}
              className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-purple-600 text-white p-2 md:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm z-10 cursor-pointer"
              aria-label="اسلاید قبلی"
            >
              <FaAngleLeft className="text-xl md:text-2xl" />
            </button>

            <button
              onClick={() => sliderInstance.next()}
              className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-purple-600 text-white p-2 md:p-3 rounded-full transition-all opacity-0 group-hover:opacity-100 backdrop-blur-sm z-10 cursor-pointer"
              aria-label="اسلاید بعدی"
            >
              <FaAngleRight className="text-xl md:text-2xl" />
            </button>
          </>
        )}
      </div>

      {loaded && sliderInstance && (
        <div className="flex justify-center gap-2 mt-4">
          {slides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => sliderInstance.moveToIdx(idx)}
              className={`h-1 rounded-full transition-all duration-300 cursor-pointer ${
                currentSlide === idx
                  ? "bg-purple-600 w-8"
                  : "bg-gray-300 dark:bg-gray-600 w-4 hover:bg-purple-400"
              }`}
              aria-label={`برو به اسلاید ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {loaded && sliderInstance && slides.length > 4 && (
        <div className="mt-6">
          <div ref={thumbnailRef} className="keen-slider">
            {slides.map((slide, idx) => (
              <div
                key={idx}
                className={`keen-slider__slide cursor-pointer transition-all duration-300 rounded-lg overflow-hidden ${
                  currentSlide === idx
                    ? "opacity-100 scale-95 ring-2 ring-purple-600"
                    : "opacity-50 hover:opacity-80"
                }`}
                onClick={() => sliderInstance.moveToIdx(idx)}
              >
                <div className="relative w-full h-20 md:h-24">
                  <Image
                    src={slide.thumbnailUrl || slide.imgUrl}
                    alt={slide.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 20vw, 15vw"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
