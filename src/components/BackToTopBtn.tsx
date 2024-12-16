import { FaChevronCircleUp } from "react-icons/fa";
import scrollStore from "../stateManager/scrollStore";
import { useEffect } from "react";

export default function BackToTopBtn() {
  const { scrollHeight, setScrollHeight } = scrollStore();

  useEffect(() => {
    window.addEventListener("scroll", () => {
      setScrollHeight(window.scrollY);
    });
    return window.removeEventListener("scroll", () => {
      setScrollHeight(window.scrollY);
    });
  }, [scrollHeight]);

  const backToTopOfSite = () => {
    window.scrollTo(0, 0);
    setScrollHeight(0);
  };

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 cursor-pointer hover:scale-110 transition-all duration-300 ${
        scrollHeight < 50 && "hidden"
      }`}
    >
      <FaChevronCircleUp
        className="size-6 text-purple-600"
        onClick={backToTopOfSite}
      />
    </div>
  );
}
