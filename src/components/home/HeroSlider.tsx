"use client";

import { useState, useCallback } from "react";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, EffectFade, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import { ArrowRight, Camera, Music, Mic, Play, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { ISlide } from "@/lib/types/Slider";
import Image from "next/image";


const slides: ISlide[] = [
  {
    id: 1,
    headline: "Book World-Class\nPhoto Studios",
    subtext:
      "Discover cyc walls, natural-light lofts, and fully equipped photography studios — available by the hour. Create stunning visuals in spaces designed for your craft.",
    cta: {
      label: "Explore Studios",
      href: "/studios",
      icon: <ArrowRight className="h-4 w-4" />,
    },
    secondaryCta: { label: "Host Your Space", href: "/studios" },
    bgImage:
      "https://images.unsplash.com/photo-1604514628550-37477afdf4e3?q=80&w=2070&auto=format&fit=crop",
    overlayGradient:
      "from-slate-950/80 via-slate-950/50 to-slate-950/20",
    accent: "#00A8E8",
    icon: <Camera className="h-5 w-5" />,
    tag: "Photography",
  },
  {
    id: 2,
    headline: "Professional\nRecording Suites",
    subtext:
      "From soundproofed vocal booths to full-scale mixing rooms — find the perfect recording suite for your next hit. Equipped with top-tier gear and acoustics.",
    cta: {
      label: "Explore Studios",
      href: "/studios",
      icon: <ArrowRight className="h-4 w-4" />,
    },
    secondaryCta: { label: "Host Your Space", href: "/studios" },
    bgImage:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2070&auto=format&fit=crop",
    overlayGradient:
      "from-slate-950/80 via-slate-950/50 to-slate-950/20",
    accent: "#7C3AED",
    icon: <Music className="h-5 w-5" />,
    tag: "Music",
  },
  {
    id: 3,
    headline: "Podcast & Film\nProduction Spaces",
    subtext:
      "Cinema sound stages, podcast lounges, and content creation studios awaiting your next project. Professional setups with flexible scheduling.",
    cta: {
      label: "Explore Studios",
      href: "/studios",
      icon: <ArrowRight className="h-4 w-4" />,
    },
    secondaryCta: { label: "Host Your Space", href: "/studios" },
    bgImage:
      "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?q=80&w=2070&auto=format&fit=crop",
    overlayGradient:
      "from-slate-950/80 via-slate-950/50 to-slate-950/20",
    accent: "#F59E0B",
    icon: <Mic className="h-5 w-5" />,
    tag: "Podcast & Film",
  },
];

const HeroSlider = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperRef, setSwiperRef] = useState<SwiperType | null>(null);
  const [isReady] = useState(false);

  const currentSlide = slides[activeIndex];

  const handlePrev = useCallback(() => {
    swiperRef?.slidePrev();
  }, [swiperRef]);

  const handleNext = useCallback(() => {
    swiperRef?.slideNext();
  }, [swiperRef]);

  return (
    <section className="relative w-full overflow-hidden bg-slate-950">
      <Swiper
        onSwiper={setSwiperRef}
        modules={[Autoplay, Pagination, EffectFade, Navigation]}
        effect="fade"
        fadeEffect={{ crossFade: true }}
        autoplay={{ delay: 6000, disableOnInteraction: false, pauseOnMouseEnter: true }}
        pagination={false}
        loop
        speed={800}
        onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
        className="h-[500px] sm:h-[560px] md:h-[620px] lg:h-[680px]"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            {/* Background Image */}
            <div className="absolute inset-0">
              <Image
                src={slide.bgImage}
                alt=""
                fill
                className="h-full w-full object-cover"
                loading={slide.id === 1 ? "eager" : "lazy"}
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${slide.overlayGradient}`} />
              {/* Subtle animated grain overlay */}
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iLjA1Ii8+PC9zdmc+')] opacity-40" />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ── Content Overlay (positioned on top of swiper) ── */}
      <div className="pointer-events-none absolute inset-0 z-10 flex items-center">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl">
            {/* Category Tag */}
            <div
              className={`mb-4 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 backdrop-blur-sm transition-all duration-500 ${isReady ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"}`}
            >
              <span style={{ color: currentSlide.accent }}>{currentSlide.icon}</span>
              <span className="text-xs font-semibold uppercase tracking-wider text-white/90">
                {currentSlide.tag}
              </span>
            </div>

            {/* Headline */}
            <h1
              key={`headline-${activeIndex}`}
              className="mb-4 text-4xl font-extrabold leading-tight tracking-tight text-white whitespace-pre-line sm:text-5xl md:text-6xl lg:text-7xl animate-in fade-in slide-in-from-bottom-4 duration-700"
            >
              {currentSlide.headline}
            </h1>

            {/* Subtext */}
            <p
              key={`subtext-${activeIndex}`}
              className="mb-8 max-w-lg text-base leading-relaxed text-slate-300 sm:text-lg animate-in fade-in slide-in-from-bottom-4 duration-700 delay-150"
            >
              {currentSlide.subtext}
            </p>

            {/* CTA Buttons */}
            <div
              key={`cta-${activeIndex}`}
              className="pointer-events-auto flex flex-wrap items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-700 delay-300"
            >
              <Link href={currentSlide.cta.href}>
                <Button
                  size="lg"
                  className="gap-2 rounded-full px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 sm:text-base"
                  style={{ backgroundColor: currentSlide.accent }}
                >
                  {currentSlide.cta.label}
                  {currentSlide.cta.icon}
                </Button>
              </Link>
              <Link href={currentSlide.secondaryCta.href}>
                <Button
                  variant="outline"
                  size="lg"
                  className="gap-2 rounded-full border-white/30 px-6 py-3 text-sm font-semibold transition-transform hover:scale-105 hover:bg-white/10 sm:text-base"
                  style={{ borderColor: 'rgba(255, 255, 255, 0.3)' }}
                >
                  <Play className="h-4 w-4" />
                  {currentSlide.secondaryCta.label}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom Controls: Pagination + Nav Arrows ── */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between">
          {/* Custom Dot Pagination */}
          <div className="flex items-center gap-2">
            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => swiperRef?.slideToLoop(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className="group relative flex h-3 items-center"
              >
                <span
                  className={`block rounded-full transition-all duration-500 ${idx === activeIndex
                      ? "h-2.5 w-8"
                      : "h-2 w-2 bg-white/40 group-hover:bg-white/60"
                    }`}
                  style={
                    idx === activeIndex
                      ? { backgroundColor: currentSlide.accent }
                      : undefined
                  }
                />
              </button>
            ))}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              onClick={handlePrev}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={handleNext}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-white backdrop-blur-sm transition-all hover:bg-white/20"
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* ── Slide Counter ── */}
      <div className="absolute top-6 right-6 z-20 hidden items-center gap-1.5 rounded-full bg-black/30 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-sm sm:flex">
        <span style={{ color: currentSlide.accent }}>
          {String(activeIndex + 1).padStart(2, "0")}
        </span>
        <span className="text-white/40">/</span>
        <span>{String(slides.length).padStart(2, "0")}</span>
      </div>
    </section>
  );
}

export default HeroSlider;