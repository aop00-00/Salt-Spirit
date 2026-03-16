import { motion, useScroll, useTransform } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import { useRef } from 'react';

const slideUp = {
  hidden: { opacity: 0, y: 150, rotate: 3 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { delay: i * 0.15, duration: 1.4, ease: [0.16, 1, 0.3, 1] },
  }),
};

const fadeIn = {
  hidden: { opacity: 0, filter: 'blur(10px)' },
  visible: (i) => ({
    opacity: 1,
    filter: 'blur(0px)',
    transition: { delay: i * 0.15 + 0.6, duration: 1.2, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function ProductsHero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 250]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const opacityOut = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="products-hero relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] pb-14 md:min-h-screen md:pb-20 "
    >
      {/* Noise Texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay z-0"
        style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}
      />

      {/* Elegant atmospheric glows */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <motion.div
          style={{ y: y2 }}
          className="absolute top-[-15%] left-[-15%] w-[70vw] h-[70vw] rounded-full bg-[#0063AD]/10 blur-[150px]"
        />
        <motion.div
          style={{ y: y1 }}
          className="absolute bottom-[-25%] right-[-15%] w-[60vw] h-[60vw] rounded-full bg-[#E00B0B]/8 blur-[140px]"
        />
        <div className="absolute top-[45%] left-[50%] translate-x-[-50%] w-[50vw] h-[50vw] rounded-full bg-[#6813AA]/8 blur-[160px]" />
      </div>

      <motion.div style={{ opacity: opacityOut }} className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-col items-center justify-center px-4 md:mt-16">
        {/* Headline — left-aligned stacked massive text */}
        <div className="flex flex-col items-start w-full px-4 md:px-12 mt-20">
          <div className="overflow-hidden w-full text-left">
            <motion.h1
              custom={0}
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="font-black leading-[0.75] tracking-[-0.05em] text-white/90 mix-blend-plus-lighter"
              style={{ fontSize: 'clamp(2rem, 8vw, 9rem)' }}
            >
              THE
            </motion.h1>
          </div>

          <div className="overflow-hidden w-full my-[-2%] md:my-[-4%] z-10 text-left">
            <motion.h1
              custom={1}
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="font-black leading-[2.2] tracking-[-0.06em] bg-gradient-to-br from-[#0063AD] via-[#E00B0B] to-[#6813AA] bg-clip-text text-transparent drop-shadow-2xl"
              style={{
                WebkitTextStroke: '1px rgba(255,255,255,0.08)',
                fontSize: 'clamp(2rem, 8vw, 10rem)'
              }}
            >
              PERFORMANCE
            </motion.h1>
          </div>

          <div className="overflow-hidden w-full text-left flex items-center justify-start gap-6 md:gap-12">
            <motion.h1
              custom={2}
              initial="hidden"
              animate="visible"
              variants={slideUp}
              className="font-black leading-[0.75] tracking-[-0.05em] text-white/90 mix-blend-plus-lighter"
              style={{ fontSize: 'clamp(2rem, 8vw, 9rem)' }}
            >
              STANDARD
            </motion.h1>
          </div>
        </div>

        {/* Subheadline and layout base */}
        <motion.div
          custom={3}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="mt-20 md:mt-24 w-full px-6 md:px-12 flex flex-col md:flex-row items-center md:items-start justify-between border-t border-white/10 pt-10"
        >
          <div className="flex-1 max-w-xl text-center md:text-left">
            <p className="text-xl md:text-3xl text-white/50 leading-snug font-light tracking-wide">
              Tecnología de hidratación<br />y precisión <span className="text-white/80 font-normal italic">diseñada para tu ritmo.</span>
            </p>
            <p className="mt-6 md:mt-8 text-lg text-white/40">
              <span className="text-white font-medium bg-gradient-to-r from-white/90 to-white/60 bg-clip-text text-transparent">0% Azúcar. 100% Esencial.</span><br />
              Redefine lo que tu cuerpo es capaz de hacer.
            </p>
          </div>

          {/* Scroll indicator moved to the side */}
          <div className="mt-12 md:mt-0 flex flex-col items-center gap-4 text-white/30 hover:text-white/80 transition-colors cursor-pointer group">
            <motion.div
              animate={{ y: [0, 15, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="md:mt-24"
            >
              <ChevronDown className="h-6 w-6 stroke-[1.5] group-hover:stroke-white transition-all" />
            </motion.div>
          </div>
        </motion.div>

      </motion.div>
    </section>
  );
}
