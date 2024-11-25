import { FaAngleLeft, FaAngleRight } from "react-icons/fa";
import { LiaCommentDotsSolid } from "react-icons/lia";
import { LuChevronLeftSquare } from "react-icons/lu";
import slides from "../../../db/hero-slide.json";
import { useEffect, useRef, useState } from "react";

export default function Header() {
  const [currentSlide, setCurrentSlide] = useState<number>(1);
  const slideRef = useRef<any>(null);

  let slideTimeout: any;

  const changeSlide = (id: number) => {
    if (currentSlide !== id) {
      {
        slideRef.current.classList.remove("show");
        slideTimeout = setTimeout(() => {
          slideRef.current.classList.add("show");
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
  }, []);

  useEffect(() => {
    return () => {
      clearTimeout(slideTimeout);
    };
  }, [currentSlide]);

  return (
    <div className="grid grid-cols-3 p-5 relative">
      <div
        className="col-span-3 opacity-0 transition-all duration-300"
        ref={slideRef}
      >
        <img
          className="rounded-3xl h-80 w-full object-cover"
          src={slides[currentSlide].img}
        />
        <div className="text-white absolute bottom-5 left-20 w-72 backdrop-blur-md px-5 py-1 rounded-3xl border-2 border-white/10">
          <p className="text-[.65rem] text-orange-400 bg-orange-400/20 inline-block px-2 rounded-full">
            مقاله جدید
          </p>
          <h4 className="font-semibold text-lg my-2">
            {slides[currentSlide].title}
          </h4>
          <p className="text-xs font-semibold text-gray-200 text-justify line-clamp-3">
            {slides[currentSlide].desc}
          </p>
          <div className="flex justify-between items-center mt-5">
            <div className="flex items-center justify-between text-xs bg-purple-500 rounded-full h-fit">
              <span className="bg-white rounded-full p-1">
                <LiaCommentDotsSolid className="text-black" />
              </span>
              <p className="px-2">{slides[currentSlide].comments}</p>
            </div>
            <p className="bg-purple-500 p-1 rounded-full">
              <LuChevronLeftSquare />
            </p>
          </div>
        </div>
      </div>
      <div className="mt-5 relative">
        <FaAngleRight
          onClick={() => prewSlide(slides[currentSlide].id)}
          className="absolute top-1/2 -translate-y-1/2 bg-purple-500 -right-2 text-white rounded-full cursor-pointer hover:scale-125"
        />
        <div className="grid grid-cols-4 gap-2 *:rounded-md *:object-cover h-10 *:h-full *:cursor-pointer">
          {slides.map((slide) => (
            <img
              className={`${currentSlide === slide.id && "active-slide"}`}
              key={slide.id}
              src={slide.img}
              onClick={() => changeSlide(slide.id)}
            />
          ))}
        </div>
        <FaAngleLeft
          onClick={() => nextSlide(slides[currentSlide].id)}
          className="absolute top-1/2 -translate-y-1/2 bg-purple-500 -left-2 text-white rounded-full cursor-pointer hover:scale-125"
        />
      </div>
    </div>
  );
}
