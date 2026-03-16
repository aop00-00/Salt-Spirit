import { Link } from 'react-router';
import { Droplet, Brain, Zap, Moon, ChevronDown, ArrowRight } from 'lucide-react';
import { Suspense, lazy, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ClientOnly } from '~/components/Shared/ClientOnly';
import { MagicText } from '~/components/Effects/MagicText';
import { IMAGE_ASSETS } from '~/lib/imagePaths';
import { SHARING_IMAGES, buildWebPageJsonLd, createPageSeo, mergeRouteMeta } from '~/lib/seo';

const LavaLamp = lazy(() => import('~/components/Effects/LavaLamp').then(m => ({ default: m.LavaLamp })));

/**
 * @type {Route.MetaFunction}
 */
const oldMeta = () => {
    return [
        { title: 'About Us | Salt & Spirit' },
        {
            name: 'description',
            content: 'Somos el nuevo estándar. Hidratación celular real sin azúcar, con una estética que quieras presumir.'
        }
    ];
};

void oldMeta;

export const meta = ({ matches }) => {
    const seo = createPageSeo({
        title: 'About Us',
        description: 'Somos el nuevo estandar. Hidratacion celular real, sin azucar y con una identidad visual pensada para alto rendimiento.',
        path: '/about',
        image: SHARING_IMAGES.about,
        jsonLd: buildWebPageJsonLd({
            title: 'About Us',
            description: 'Somos el nuevo estandar. Hidratacion celular real, sin azucar y con una identidad visual pensada para alto rendimiento.',
            path: '/about',
            image: SHARING_IMAGES.about,
        }),
    });

    return mergeRouteMeta({ matches, seo });
};

export default function AboutPage() {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ['start start', 'end start'],
    });
    const opacityOut = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

    return (
        <div className="about-page bg-white text-[#1D1E20]">

            {/* Hero Section with LavaLamp */}
            <section ref={containerRef} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
                {/* LavaLamp Background */}
                <div className="absolute inset-0 z-0">
                    <ClientOnly fallback={<div className="absolute inset-0 bg-black" />}>
                        <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
                            <LavaLamp />
                        </Suspense>
                    </ClientOnly>
                </div>
                {/* Dark overlay to ensure text contrast */}
                <div className="absolute inset-0 bg-black/30 z-[5]" />

                <motion.div style={{ opacity: opacityOut }} className="relative z-10 w-full px-6 md:px-16 flex flex-col justify-center mt-20 max-w-[1600px] mx-auto pointer-events-none">

                    {/* Multi-layered Grid Layout */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-end pointer-events-auto h-full min-h-[70vh]">
                        {/* Left Side: Subtext and Button */}
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.6, duration: 1 }}
                            className="md:col-span-5 flex flex-col items-start justify-end pb-12 order-2 md:order-1"
                        >
                            <p className="text-xl md:text-3xl text-white/50 leading-snug font-light tracking-wide mb-8">
                                No vendemos hidratación.<br />
                                <span className="text-white/90 font-medium">Redefinimos lo que significa</span><br />
                                cuidar tu cuerpo y mente<br />con cada sorbo.
                            </p>

                            <Link
                                to="/products"
                                className="group relative px-8 py-4 mt-4 bg-transparent border border-white/30 text-white rounded-full font-bold text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all duration-500 flex items-center gap-4 overflow-hidden"
                            >
                                <span className="relative z-10">Descubre Más</span>
                                <ArrowRight className="relative z-10 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </motion.div>

                        {/* Right Side: Massive Typography */}
                        <div className="md:col-span-7 flex flex-col items-start md:items-end text-left md:text-right order-1 md:order-2 w-full pt-20 md:pt-0">
                            <div className="overflow-visible w-full">
                                <motion.h1
                                    initial={{ opacity: 0, y: 100, rotate: -3 }}
                                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                                    transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="font-black leading-[1.75] tracking-[-0.05em] text-white/90 mix-blend-plus-lighter"
                                    style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)' }}
                                >
                                    SOMOS EL
                                </motion.h1>
                            </div>

                            <div className="overflow-visible w-full my-[-2%] z-10 md:mr-12">
                                <motion.h1
                                    initial={{ opacity: 0, scale: 0.9 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.2, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="font-black leading-[1.75] tracking-[-0.07em] inline-block mix-blend-difference"
                                    style={{
                                        WebkitTextStroke: '1px rgba(255,255,255,0.9)',
                                        color: 'transparent',
                                        fontSize: 'clamp(3rem, 11vw, 9rem)'
                                    }}
                                >
                                    NUEVO
                                </motion.h1>
                            </div>

                            <div className="overflow-visible w-full flex justify-start md:justify-end items-center gap-6">
                                <motion.div
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    transition={{ delay: 0.6, duration: 1 }}
                                    className="hidden md:block h-[1px] w-[10vw] max-w-[150px] bg-white/40 origin-right"
                                />
                                <motion.h1
                                    initial={{ opacity: 0, y: 100, rotate: -3 }}
                                    animate={{ opacity: 1, y: 0, rotate: 0 }}
                                    transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                                    className="font-black leading-[1.75] tracking-[-0.05em] text-white/90 mix-blend-plus-lighter"
                                    style={{ fontSize: 'clamp(2.5rem, 9vw, 7rem)' }}
                                >
                                    ESTÁNDAR
                                </motion.h1>
                            </div>
                        </div>
                    </div>

                </motion.div>

                {/* Vertical Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="absolute bottom-8 right-8 md:right-16 flex flex-col items-center gap-4 text-white/40"
                >
                    <span className="text-[10px] uppercase font-bold tracking-[0.4em] rotate-180" style={{ writingMode: 'vertical-rl' }}>
                        Scroll
                    </span>
                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                    >
                        <ChevronDown className="h-5 w-5" />
                    </motion.div>
                </motion.div>
            </section>

            {/* El Origen - The Spark */}
            <section id="origin-section" className="!py-20 !px-6 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-16">
                        <span className="inline-block px-4 py-2 bg-[#0063AD]/10 text-[#0063AD] text-xs uppercase tracking-widest font-bold rounded-full mb-4">
                            The Spark
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black leading-[0.85] tracking-[-0.04em] mb-6 text-[#1D1E20] uppercase">
                            El Origen
                        </h2>
                    </div>

                    <div className="text-gray-700">
                        <MagicText text="El mercado actual nos presentaba dos opciones: fórmulas farmacéuticas clínicas o bebidas deportivas cargadas de azúcar. Buscábamos algo diseñado para un ritmo de vida de alto rendimiento—entrenamientos intensos, jornadas exigentes y desafíos mentales constantes—sin comprometer la salud ni la estética. No existía una opción que equilibrara potencia y pureza. Así que la creamos." />
                    </div>
                </div>
            </section>

            {/* La Filosofía del Nombre - Salt + Spirit */}
            <section className="py-32 px-6 bg-[#1D1E20] text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <h2 className="text-5xl md:text-7xl font-black leading-[0.85] tracking-[-0.04em] mb-6 text-white uppercase drop-shadow-md">Salt + Spirit</h2>
                        <p className="text-xl md:text-2xl text-white/80">
                            La dualidad que define quiénes somos
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
                        {/* Salt Card */}
                        <div className="group relative p-10 rounded-3xl overflow-hidden border-2 border-[#0063AD]/30 hover:border-[#0063AD] transition-all duration-500 hover:shadow-2xl hover:shadow-[#0063AD]/20">
                            {/* Background Image with Blur */}
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-40"
                                style={{
                                    backgroundImage: `url(${IMAGE_ASSETS.editorial.about.saltStory.avif})`,
                                    filter: 'blur(3px)',
                                }}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#0063AD]/60 to-[#0063AD]/30" />

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="mb-8">
                                    <Droplet className="text-white drop-shadow-lg" size={56} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-md">Salt</h3>
                                <p className="text-lg text-white/95 leading-relaxed mb-8 drop-shadow-sm">
                                    La parte <strong>física</strong>. El rendimiento. El sudor. La ciencia detrás de cada mineral: Sodio, Potasio, Magnesio. La absorción celular que tu cuerpo necesita para funcionar al máximo.
                                </p>
                                <div className="flex flex-wrap gap-3 text-sm font-bold">
                                    <span className="px-4 py-2 bg-white/30 backdrop-blur-sm text-white rounded-full border border-white/20">RENDIMIENTO</span>
                                    <span className="px-4 py-2 bg-white/30 backdrop-blur-sm text-white rounded-full border border-white/20">CIENCIA</span>
                                    <span className="px-4 py-2 bg-white/30 backdrop-blur-sm text-white rounded-full border border-white/20">ACCIÓN</span>
                                </div>
                            </div>
                        </div>

                        {/* Spirit Card */}
                        <div className="group relative p-10 rounded-3xl overflow-hidden border-2 border-[#6813AA]/30 hover:border-[#6813AA] transition-all duration-500 hover:shadow-2xl hover:shadow-[#6813AA]/20">
                            {/* Background Image with Blur */}
                            <div
                                className="absolute inset-0 bg-cover bg-center opacity-40"
                                style={{
                                    backgroundImage: `url(${IMAGE_ASSETS.editorial.about.spiritStory.avif})`,
                                    filter: 'blur(3px)',
                                }}
                            />

                            {/* Gradient Overlay */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#6813AA]/60 to-[#6813AA]/30" />

                            {/* Content */}
                            <div className="relative z-10">
                                <div className="mb-8">
                                    <Brain className="text-white drop-shadow-lg" size={56} strokeWidth={1.5} />
                                </div>
                                <h3 className="text-3xl md:text-4xl font-bold mb-6 text-white drop-shadow-md">Spirit</h3>
                                <p className="text-lg text-white/95 leading-relaxed mb-8 drop-shadow-sm">
                                    La <strong>mentalidad</strong>. La calma. El enfoque. El ritual de cuidarte con intención. No es solo lo que tomas, es <em>cómo</em> lo tomas. Es el momento que te regalas.
                                </p>
                                <div className="flex flex-wrap gap-3 text-sm font-bold">
                                    <span className="px-4 py-2 bg-white/30 backdrop-blur-sm text-white rounded-full border border-white/20">MENTALIDAD</span>
                                    <span className="px-4 py-2 bg-white/30 backdrop-blur-sm text-white rounded-full border border-white/20">ENFOQUE</span>
                                    <span className="px-4 py-2 bg-white/30 backdrop-blur-sm text-white rounded-full border border-white/20">RITUAL</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* No Negociables - Our Standards */}
            <section className="py-32 px-6 bg-gradient-to-b from-gray-50 to-white">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <span className="inline-block px-4 py-2 bg-gray-200 text-gray-600 text-xs uppercase tracking-widest font-bold rounded-full mb-4">
                            Our Standards
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black leading-[0.85] tracking-[-0.04em] mb-6 text-[#1D1E20] uppercase">
                            No Negociables
                        </h2>
                        <p className="text-xl text-gray-600">
                            Los estándares que nunca comprometemos
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        <div className="text-center p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
                            <div className="text-7xl font-black text-[#E00B0B] mb-4">0%</div>
                            <div className="text-2xl font-bold mb-3 text-[#1D1E20]">Azúcar</div>
                            <p className="text-gray-600">
                                Energía real, sin los picos y caídas del azúcar.
                            </p>
                        </div>

                        <div className="text-center p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
                            <div className="text-7xl font-black text-[#0063AD] mb-4">100%</div>
                            <div className="text-2xl font-bold mb-3 text-[#1D1E20]">Natural</div>
                            <p className="text-gray-600">
                                Ingredientes que puedes pronunciar y reconocer.
                            </p>
                        </div>

                        <div className="text-center p-8 rounded-3xl bg-white shadow-lg hover:shadow-2xl transition-shadow border border-gray-100">
                            <div className="text-7xl font-black text-[#6813AA] mb-4">∞</div>
                            <div className="text-2xl font-bold mb-3 text-[#1D1E20]">Keto Friendly</div>
                            <p className="text-gray-600">
                                Compatible con cualquier estilo de vida consciente.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Más allá del agua - The Science */}
            <section className="py-32 px-6 bg-gradient-to-br from-[#0063AD]/5 via-white to-[#6813AA]/5">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-16">
                        <span className="inline-block px-4 py-2 bg-[#0063AD]/10 text-[#0063AD] text-xs uppercase tracking-widest font-bold rounded-full mb-4">
                            The Science
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black leading-[0.85] tracking-[-0.04em] mb-8 text-[#1D1E20] uppercase">
                            Más allá del agua
                        </h2>
                    </div>

                    <div className="bg-white rounded-3xl p-10 md:p-16 shadow-2xl border border-gray-100">
                        <p className="text-3xl md:text-4xl font-bold mb-8 text-[#1D1E20]">
                            El agua sola no es suficiente.
                        </p>
                        <p className="text-lg md:text-xl leading-relaxed mb-6 text-gray-700">
                            Tu cuerpo necesita <strong className="text-[#0063AD]">electrolitos</strong> para absorber y utilizar el agua a nivel celular. Sin ellos, el agua simplemente pasa a través de ti sin hidratarte realmente.
                        </p>
                        <p className="text-lg md:text-xl leading-relaxed mb-12 text-gray-700">
                            Nuestra fórmula balanceada de <strong className="text-[#0063AD]">Sodio, Potasio y Magnesio</strong> activa la hidratación celular inmediata—llevando nutrientes a cada célula, regulando la función nerviosa, optimizando el rendimiento muscular y manteniendo tu cerebro funcionando al 100%.
                        </p>

                        <div className="grid md:grid-cols-3 gap-6">
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#0063AD]/10 to-[#0063AD]/5 border border-[#0063AD]/20">
                                <h4 className="font-bold text-xl mb-3 text-[#0063AD]">Sodio</h4>
                                <p className="text-gray-700">
                                    Regulación de líquidos y función nerviosa
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#E00B0B]/10 to-[#E00B0B]/5 border border-[#E00B0B]/20">
                                <h4 className="font-bold text-xl mb-3 text-[#E00B0B]">Potasio</h4>
                                <p className="text-gray-700">
                                    Contracción muscular y ritmo cardíaco
                                </p>
                            </div>
                            <div className="p-6 rounded-2xl bg-gradient-to-br from-[#6813AA]/10 to-[#6813AA]/5 border border-[#6813AA]/20">
                                <h4 className="font-bold text-xl mb-3 text-[#6813AA]">Magnesio</h4>
                                <p className="text-gray-700">
                                    Energía celular y recuperación
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


            {/* La Tríada - Nuestros Pilares */}
            <section className="py-32 px-6 bg-gradient-to-b from-[#1D1E20] to-black text-white">
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-20">
                        <span className="inline-block px-4 py-2 bg-white/10 text-white/70 text-xs uppercase tracking-widest font-bold rounded-full mb-4">
                            Nuestros Pilares
                        </span>
                        <h2 className="text-5xl md:text-7xl font-black leading-[0.85] tracking-[-0.04em] mb-6 text-white uppercase drop-shadow-md">La Tríada</h2>
                        <p className="text-xl md:text-2xl text-white/70">
                            El ciclo completo de tu día, cubierto
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Energía - Vital Red */}
                        <div className="group relative p-10 rounded-3xl bg-gradient-to-br from-[#E00B0B]/30 via-[#E00B0B]/10 to-transparent border-2 border-[#E00B0B]/40 hover:border-[#E00B0B] transition-all duration-500 overflow-hidden hover:scale-105">
                            <div className="absolute top-8 right-8 opacity-20 group-hover:opacity-30 transition-opacity">
                                <Zap size={100} className="text-[#E00B0B]" strokeWidth={1.5} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-full bg-[#E00B0B] flex items-center justify-center mb-6">
                                    <Zap size={32} className="text-white" strokeWidth={2} />
                                </div>
                                <h3 className="text-3xl font-bold mb-4">Energía</h3>
                                <p className="text-xl font-bold text-[#E00B0B] mb-4">Vital Red</p>
                                <p className="text-white/90 leading-relaxed">
                                    Tu boost matutino. Energía limpia para despertar el cuerpo y la mente sin el crash de la cafeína.
                                </p>
                            </div>
                        </div>

                        {/* Enfoque - Pure Blue */}
                        <div className="group relative p-10 rounded-3xl bg-gradient-to-br from-[#0063AD]/30 via-[#0063AD]/10 to-transparent border-2 border-[#0063AD]/40 hover:border-[#0063AD] transition-all duration-500 overflow-hidden hover:scale-105">
                            <div className="absolute top-8 right-8 opacity-20 group-hover:opacity-30 transition-opacity">
                                <Brain size={100} className="text-[#0063AD]" strokeWidth={1.5} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-full bg-[#0063AD] flex items-center justify-center mb-6">
                                    <Brain size={32} className="text-white" strokeWidth={2} />
                                </div>
                                <h3 className="text-3xl font-bold mb-4">Enfoque</h3>
                                <p className="text-xl font-bold text-[#0063AD] mb-4">Pure Blue</p>
                                <p className="text-white/90 leading-relaxed">
                                    Claridad mental. Concentración sostenida durante tus horas más productivas del día.
                                </p>
                            </div>
                        </div>

                        {/* Descanso - Hydra-Rest */}
                        <div className="group relative p-10 rounded-3xl bg-gradient-to-br from-[#6813AA]/30 via-[#6813AA]/10 to-transparent border-2 border-[#6813AA]/40 hover:border-[#6813AA] transition-all duration-500 overflow-hidden hover:scale-105">
                            <div className="absolute top-8 right-8 opacity-20 group-hover:opacity-30 transition-opacity">
                                <Moon size={100} className="text-[#6813AA]" strokeWidth={1.5} />
                            </div>
                            <div className="relative z-10">
                                <div className="w-16 h-16 rounded-full bg-[#6813AA] flex items-center justify-center mb-6">
                                    <Moon size={32} className="text-white" strokeWidth={2} />
                                </div>
                                <h3 className="text-3xl font-bold mb-4">Descanso</h3>
                                <p className="text-xl font-bold text-[#6813AA] mb-4">Hydra-Rest</p>
                                <p className="text-white/90 leading-relaxed">
                                    Recuperación nocturna. Magnesio y electrolitos para un sueño profundo y despertar renovado.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Únete al Club - Call to Action Final */}
            <section className="py-40 px-6 bg-gradient-to-br from-gray-50 via-white to-gray-100">
                <div className="max-w-5xl mx-auto text-center">
                    <h2 className="text-6xl md:text-8xl font-black leading-[0.85] tracking-[-0.04em] mb-8 bg-gradient-to-br from-[#0063AD] via-[#E00B0B] to-[#6813AA] bg-clip-text text-transparent drop-shadow-xl inline-block uppercase pb-2">
                        Únete al Club
                    </h2>
                    <p className="text-xl md:text-2xl leading-relaxed mb-12 text-gray-700 max-w-3xl mx-auto">
                        No solo vendemos productos. Creamos una comunidad de personas que exigen más de sí mismas. Que entienden que el bienestar no se negocia. Que saben que la hidratación es el fundamento de todo.
                    </p>

                    <div className="my-16 py-12 px-8 bg-gradient-to-r from-[#0063AD] to-[#6813AA] rounded-3xl shadow-2xl max-w-3xl mx-auto">
                        <p className="text-3xl md:text-4xl font-bold italic text-white leading-relaxed">
                            "No es solo lo que bebes. Es quién eliges ser."
                        </p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12">
                        <Link
                            to="/products"
                            className="px-12 py-5 bg-[#1D1E20] text-white rounded-full font-bold text-lg hover:bg-[#1D1E20]/90 transition-all duration-300 hover:scale-105 shadow-xl"
                            style={{ color: 'white' }}
                        >
                            Comprar Ahora
                        </Link>
                    </div>
                </div>
            </section>

        </div>
    );
}

/** @typedef {import('./+types/about').Route} Route */
