"use client";

import { useState } from "react";
import { useKeenSlider } from "keen-slider/react";

export function useGameNewsSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const [sliderRef, sliderInstance] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 0,
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    created() {
      setLoaded(true);
    },
  });

  return {
    sliderRef,
    loaded,
    currentSlide,
    sliderInstance,
  };
}
