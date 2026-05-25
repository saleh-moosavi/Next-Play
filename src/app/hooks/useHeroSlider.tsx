"use client";

import { KeenSliderInstance } from "keen-slider";
import { useKeenSlider } from "keen-slider/react";
import { useState, useEffect, useRef } from "react";

export function useHeroSlider() {
  const [loaded, setLoaded] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderInstance, setSliderInstance] =
    useState<KeenSliderInstance | null>(null);
  const autoPlayInterval = useRef<NodeJS.Timeout | null>(null);

  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slideChanged(slider: KeenSliderInstance) {
      setCurrentSlide(slider.track.details.rel);
      if (thumbnailInstanceRef.current) {
        thumbnailInstanceRef.current.moveToIdx(slider.track.details.rel);
      }
    },
    created(slider: KeenSliderInstance) {
      setLoaded(true);
      setSliderInstance(slider);
    },
    loop: true,
    mode: "snap",
    slides: {
      perView: 1,
      spacing: 0,
    },
  });

  const [thumbnailRef, thumbnailInstanceRef] = useKeenSlider<HTMLDivElement>({
    initial: 0,
    slides: {
      perView: 5,
      spacing: 10,
      origin: "auto",
    },
    slideChanged(slider: KeenSliderInstance) {
      if (sliderInstance) {
        sliderInstance.moveToIdx(slider.track.details.rel);
      }
    },
  });

  useEffect(() => {
    if (sliderInstance && thumbnailInstanceRef.current) {
      thumbnailInstanceRef.current.moveToIdx(currentSlide);
    }
  }, [sliderInstance, currentSlide, thumbnailInstanceRef]);

  useEffect(() => {
    if (!sliderInstance) return;

    autoPlayInterval.current = setInterval(() => {
      sliderInstance.next();
    }, 5000);

    return () => {
      if (autoPlayInterval.current) {
        clearInterval(autoPlayInterval.current);
      }
    };
  }, [sliderInstance]);

  return {
    sliderRef,
    thumbnailRef,
    loaded,
    currentSlide,
    sliderInstance,
  };
}
