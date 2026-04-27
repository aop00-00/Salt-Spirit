import { useScroll, useTransform, motion } from 'framer-motion';
import { useRef } from 'react';
import { Link } from 'react-router';

const Card = ({ title, src, color, link, i, progress, range, targetScale }) => {
    const scale = useTransform(progress, range, [1, targetScale]);
    return (
        <div className="h-[100vh] w-full sticky top-0 flex items-center justify-center p-4">
            <motion.div
                style={{ backgroundColor: color, scale, top: `calc(-5vh + ${i * 25}px)` }}
                className="relative flex flex-col items-center justify-center w-full h-[90vh] md:h-[80vh] rounded-3xl overflow-hidden origin-top shadow-2xl"
            >
                <div className="absolute inset-0 z-0">
                    <img className="w-full h-full object-cover" src={src} alt={title || 'Background'} />
                </div>

                <div className="absolute inset-0 bg-black/30 z-10" />

                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-20">
                    <h2 className="text-white text-3xl md:text-4xl font-bold tracking-tight drop-shadow-lg text-center">
                        {title}
                    </h2>
                    <Link
                        to={link}
                        className="px-7 py-2.5 rounded-full text-sm font-semibold text-white
                            bg-white/15 backdrop-blur-md border border-white/30
                            hover:bg-white/30 transition-all duration-300"
                    >
                        Comprar
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export function CardsParallax({ items }) {
    const container = useRef(null);
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    });

    return (
        <div ref={container} className="relative mt-[5vh]">
            {items.map((project, i) => {
                const targetScale = 1 - ((items.length - i) * 0.05);
                return (
                    <Card key={`p_${i}`} i={i} {...project} progress={scrollYProgress} range={[i * .25, 1]} targetScale={targetScale} />
                );
            })}
        </div>
    );
}
