import React, { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { IMAGE_ASSETS } from "~/lib/imagePaths";

const slides = [
    {
        img: IMAGE_ASSETS.marketing.slideshow[0].avif,
        text: ["BETWEEN SHADOW", "AND LIGHT"],
    },
    {
        img: IMAGE_ASSETS.marketing.slideshow[1].avif,
        text: ["SILENCE SPEAKS", "THROUGH FORM"],
    },
    {
        img: IMAGE_ASSETS.marketing.slideshow[2].avif,
        text: ["ESSENCE BEYOND", "PERCEPTION"],
    },
    {
        img: IMAGE_ASSETS.marketing.slideshow[3].avif,
        text: ["TRUTH IN", "EMPTINESS"],
    },
    {
        img: IMAGE_ASSETS.marketing.slideshow[4].avif,
        text: ["SURRENDER TO", "THE VOID"],
    },
];

export default function Slideshow() {
    const [current, setCurrent] = useState(0);

    const nextSlide = () => setCurrent((prev) => (prev + 1) % slides.length);
    const prevSlide = () =>
        setCurrent((prev) => (prev - 1 + slides.length) % slides.length);

    useEffect(() => {
        const intervalId = window.setInterval(() => {
            setCurrent((prev) => (prev + 1) % slides.length);
        }, 2500);

        return () => window.clearInterval(intervalId);
    }, []);

    return (
        <div className="relative w-full h-screen overflow-hidden bg-black text-white">
            {slides.map((slide, i) => (
                <div
                    key={i}
                    className={`absolute inset-0 transition-opacity duration-[1600ms] ease-out ${i === current ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    {/* Background Image */}
                    <div
                        className={`absolute inset-0 bg-cover bg-center transition-transform duration-[7000ms] ease-out ${i === current ? "scale-100" : "scale-110"
                            }`}
                        style={{ backgroundImage: `url(${slide.img})` }}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/45 transition-opacity duration-[1600ms] ease-out" />

                    {/* Text Content */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <div
                            className={`text-center font-bold tracking-tighter mix-blend-overlay transition-all duration-[1400ms] ease-out ${i === current
                                ? "translate-y-0 opacity-100"
                                : "translate-y-4 opacity-0"
                                }`}
                        >
                            {slide.text.map((t, j) => (
                                <span key={j} className="block text-5xl md:text-8xl lg:text-9xl leading-none">
                                    {t}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            ))}

            {/* Controls */}
            <div className="absolute bottom-8 left-8 z-20 flex gap-4">
                <button
                    onClick={prevSlide}
                    className="p-3 rounded-full border border-white/30 hover:bg-white/10 transition-colors text-white backdrop-blur-sm"
                >
                    <ArrowLeft size={20} />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-3 rounded-full border border-white/30 hover:bg-white/10 transition-colors text-white backdrop-blur-sm"
                >
                    <ArrowRight size={20} />
                </button>
            </div>

            {/* Counter */}
            <div className="absolute bottom-10 right-8 z-20 text-xl font-mono tracking-widest text-white/80">
                0{current + 1} / 0{slides.length}
            </div>
        </div>
    );
}
