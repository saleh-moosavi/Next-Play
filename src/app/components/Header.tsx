"use client";

import { Slide } from "@/types/mainPageTypes";
import { useEffect, useRef, useState } from "react";
import { BiChevronLeftSquare } from "react-icons/bi";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa";

export default function Header({ slides }: { slides: Slide[] | undefined }) {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const slideRef = useRef<any>(null);

  let slideTimeout: any;

  const changeSlide = (id: number) => {
    if (currentSlide !== id) {
      {
        slideRef?.current?.classList.remove("show");
        slideTimeout = setTimeout(() => {
          slideRef?.current?.classList.add("show");
          setCurrentSlide(id);
        }, 300);
      }
    }
  };
  const nextSlide = (id: number) => {
    if (id + 1 > slides.length - 1) {
      changeSlide(0);
      return;
    }
    changeSlide(id + 1);
  };
  const prewSlide = (id: number) => {
    if (id - 1 < 0) {
      changeSlide(slides.length - 1);
      return;
    }
    changeSlide(id - 1);
  };

  useEffect(() => {
    changeSlide(0);
    return () => {
      clearTimeout(slideTimeout);
    };
  }, [slides]);

  useEffect(() => {
    return () => {
      clearTimeout(slideTimeout);
    };
  }, [currentSlide]);

  if (!slides || slides.length === 0) {
    return (
      <div className="grid grid-cols-3 p-5 lg:px-0 relative">
        <div className="col-span-3 text-center text-gray-500 py-10">
          <div className="animate-pulse">
            <div className="h-52 sm:h-72 md:h-80 bg-gray-200 dark:bg-gray-700 rounded-3xl mb-4"></div>
            <p>در حال بارگذاری اسلایدها...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-3 p-5 lg:px-0 relative">
      <div
        className="col-span-3 opacity-0 transition-all duration-300"
        ref={slideRef}
      >
        <img
          className="rounded-3xl h-52 sm:h-72 md:h-80 w-full object-cover"
          src={slides[currentSlide].imgUrl}
        />
        <div className="text-white absolute top-[45%] sm:top-1/2 md:bottom-5 md:top-auto left-1/2 -translate-x-1/2 md:translate-x-0 md:left-20 w-72 backdrop-blur-md dark:bg-black/30 px-5 py-1 md:py-2 rounded-3xl border-2 border-white/10">
          <p className="text-[.6rem] text-orange-400 bg-orange-400/20 inline-block px-2 rounded-full">
            مقاله جدید
          </p>
          <h4 className="font-semibold text-sm md:text-lg my-2">
            {slides[currentSlide].title}
          </h4>
          <p className="text-[.6rem] md:text-xs font-semibold text-gray-200 text-justify line-clamp-3">
            {slides[currentSlide].description}
          </p>
          <div className="flex justify-between items-center mt-5">
            <div className="flex items-center justify-between text-xs bg-purple-500 rounded-full h-fit">
              <span className="bg-white dark:bg-gray-900 rounded-full p-1">
                <LiaCommentDotsSolid className="text-gray-500 dark:text-white" />
              </span>
            </div>
            <p className="bg-purple-500 p-1 rounded-full">
              <BiChevronLeftSquare />
            </p>
          </div>
        </div>
      </div>
      <div className="mt-32 col-span-3 md:col-span-1 md:mt-5 relative">
        <FaAngleRight
          onClick={() => prewSlide(slides[currentSlide].title)}
          className="absolute top-1/2 sm:top-2/3 translate-y-1/2 md:-translate-y-1/2 bg-purple-500 -right-2 text-white rounded-full cursor-pointer hover:scale-125"
        />
        <div className="grid grid-cols-4 gap-2 *:rounded-md *:object-cover h-10 *:h-full *:cursor-pointer">
          {slides.map((slide, index) => (
            <img
              className={`${currentSlide === index && "active-slide"}`}
              key={"slider" + index}
              src={slide.imgUrl}
              onClick={() => changeSlide(index)}
            />
          ))}
        </div>
        <FaAngleLeft
          onClick={() => nextSlide(slides[currentSlide].title)}
          className="absolute top-1/2 sm:top-2/3 translate-y-1/2 md:-translate-y-1/2 bg-purple-500 -left-2 text-white rounded-full cursor-pointer hover:scale-125"
        />
      </div>
    </div>
  );
}
