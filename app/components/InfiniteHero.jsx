import { useState, useEffect } from "react";
import ShaderBackground from "./ShaderBackground";

export default function InfiniteHero() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger animations after mount
        const timer = setTimeout(() => setIsVisible(true), 100);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative h-svh w-full overflow-hidden bg-black text-white">
            <div className="absolute inset-0">
                <ShaderBackground className="h-full w-full" />
            </div>

            <div className="pointer-events-none absolute inset-0"
                style={{
                    background: 'radial-gradient(120% 80% at 50% 50%, transparent 40%, black 100%)'
                }}
            />

            <div className="relative z-10 flex h-svh w-full items-center justify-center px-6">
                <div className="text-center">
                    <h1
                        className={`mx-auto max-w-2xl lg:max-w-4xl text-[clamp(2.25rem,6vw,4rem)] font-extralight leading-[0.95] tracking-tight transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                            }`}
                        style={{ transitionDelay: '300ms' }}
                    >
                        Somos el nuevo estándar
                    </h1>
                    <p
                        className={`mx-auto mt-4 max-w-2xl md:text-balance text-sm/6 md:text-base/7 font-light tracking-tight text-white/70 transition-all duration-800 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                        style={{ transitionDelay: '600ms' }}
                    >
                        No vendemos hidratación. Redefinimos lo que significa cuidar tu cuerpo y mente con cada sorbo.
                    </p>

                    <div
                        className={`mt-8 flex flex-row items-center justify-center gap-4 transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
                            }`}
                        style={{ transitionDelay: '900ms' }}
                    >
                        <button
                            type="button"
                            onClick={() => document.getElementById('origin-section')?.scrollIntoView({ behavior: 'smooth' })}
                            className="group relative overflow-hidden border border-white/30 bg-gradient-to-r from-white/20 to-white/10 px-4 py-2 text-sm rounded-lg font-medium tracking-wide text-white backdrop-blur-sm transition-[border-color,background-color,box-shadow] duration-500 hover:border-white/50 hover:bg-white/20 hover:shadow-lg hover:shadow-white/10 cursor-pointer"
                        >
                            Descubre más
                        </button>

                        <a
                            href="/collections/all"
                            className="group relative px-4 py-2 text-sm font-medium tracking-wide text-white/90 transition-[filter,color] duration-500 hover:drop-shadow-[0_0_6px_rgba(255,255,255,0.6)] hover:text-white cursor-pointer"
                        >
                            Shop Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
