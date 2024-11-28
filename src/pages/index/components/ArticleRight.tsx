import { FaCircleArrowLeft, FaCircleArrowRight } from "react-icons/fa6";
import { useEffect, useRef, useState } from "react";

export default function ArticleRight({ allArticles }: any) {
  const [filteredArts, setFilteredArts] = useState<any>(null);
  const [currentArt, setCurrentArt] = useState<any>(null);
  const containerRef = useRef<any>(null);

  //set filtered and current slide in first load
  useEffect(() => {
    const filtered = allArticles.filter((article: any) => article.desc);
    setFilteredArts(filtered);
    setCurrentArt(filtered[0]);
  }, []);

  // change slide
  let slideTimeout: any;
  const changeArticle = (type: any) => {
    let currentIndex = filteredArts.indexOf(currentArt);
    containerRef?.current.classList.remove("show");
    switch (type) {
      case "next":
        currentIndex =
          currentIndex + 1 > filteredArts.length - 1 ? 0 : currentIndex + 1;
        slideTimeout = setTimeout(() => {
          containerRef?.current.classList.add("show");
          setCurrentArt(filteredArts[currentIndex]);
        }, 700);
        break;
      case "prev":
        currentIndex =
          currentIndex - 1 < 0 ? filteredArts.length - 1 : currentIndex - 1;
        slideTimeout = setTimeout(() => {
          containerRef?.current.classList.add("show");
          setCurrentArt(filteredArts[currentIndex]);
        }, 700);
        break;
    }
  };

  //add show to slide and clear timeout
  useEffect(() => {
    containerRef?.current.classList.add("show");
    return () => {
      clearTimeout(slideTimeout);
    };
  }, [currentArt]);

  return (
    <article className="relative w-full h-[30rem] rounded-xl overflow-hidden text-white bg-black/20">
      <div
        className="w-full h-full transition-all duration-700 opacity-0"
        ref={containerRef}
      >
        <img className="w-full h-full object-cover" src={currentArt?.img} />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60"></div>
        <div className="absolute bottom-5 px-5">
          <div className="flex gap-x-2 items-center *:text-xs *:font-semibold *:px-4 *:rounded-full *:bg-purple-500/70">
            {currentArt?.type.map((t: any, index: any) => (
              <p key={index}>{t}</p>
            ))}
          </div>
          <h3 className="my-3 font-semibold cursor-pointer">
            {currentArt?.title}
          </h3>
          <p className="text-xs line-clamp-3 text-justify">
            {currentArt?.desc}
          </p>
          <button className="px-4 py-1 bg-purple-600 rounded-lg mt-3 text-sm">
            مشاهده مقاله
          </button>
        </div>
      </div>
      <div className="absolute top-5 left-5 flex gap-x-2 *:w-6 *:h-6 *:cursor-pointer">
        <FaCircleArrowRight onClick={() => changeArticle("next")} />
        <FaCircleArrowLeft onClick={() => changeArticle("prev")} />
      </div>
    </article>
  );
}
