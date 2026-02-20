import { Link } from 'react-router';
import { Droplet, Brain, Zap, Moon, ChevronDown } from 'lucide-react';
import { Suspense, lazy } from 'react';
import { ClientOnly } from '~/components/Common/ClientOnly';
import { MagicText } from '~/components/MagicText';

const LavaLamp = lazy(() => import('~/components/LavaLamp').then(m => ({ default: m.LavaLamp })));

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
    return [
        { title: 'About Us | Salt & Spirit' },
        {
            name: 'description',
            content: 'Somos el nuevo estándar. Hidratación celular real sin azúcar, con una estética que quieras presumir.'
        }
    ];
};

export default function AboutPage() {
    return (
        <div className="about-page bg-white text-[#1D1E20]">

            {/* Hero Section with LavaLamp */}
            <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
                {/* LavaLamp Background */}
                <ClientOnly fallback={<div className="absolute inset-0 bg-black" />}>
                    <Suspense fallback={<div className="absolute inset-0 bg-black" />}>
                        <LavaLamp />
                    </Suspense>
                </ClientOnly>

                <div className="relative z-10 container mx-auto px-6 py-20" style={{ mixBlendMode: 'difference' }}>
                    <div className="max-w-5xl mx-auto text-center text-white">
                        <h1 className="text-7xl md:text-9xl lg:text-[12rem] font-bold mb-6 leading-[0.9] tracking-tight text-white">
                            Somos el<br />nuevo estándar
                        </h1>
                        <p className="text-xl md:text-2xl lg:text-4xl mb-12 text-white/90 max-w-3xl mx-auto font-light">
                            No vendemos hidratación. Redefinimos lo que significa cuidar tu cuerpo y mente con cada sorbo.
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Link
                                to="/products"
                                className="px-8 py-4 bg-white text-black rounded-full font-bold text-lg hover:bg-white/90 transition-all duration-300 hover:scale-105 shadow-xl flex items-center gap-2"
                            >
                                Descubre más
                            </Link>
                        </div>
                    </div>
                </div>

                {/* Indicador de scroll */}
                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                    <ChevronDown className="text-white/60" size={32} />
                </div>
            </section>

            {/* El Origen - The Spark */}
            <section id="origin-section" className="py-32 px-6 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-5xl mx-auto">
                    <div className="mb-16">
                        <span className="inline-block px-4 py-2 bg-[#0063AD]/10 text-[#0063AD] text-xs uppercase tracking-widest font-bold rounded-full mb-4">
                            The Spark
                        </span>
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#1D1E20]">
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
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">Salt + Spirit</h2>
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
                                    backgroundImage: 'url(/IMG_9692_VSCO.jpg)',
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
                                    backgroundImage: 'url(/IMG_9694_VSCO.JPG)',
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
                        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-[#1D1E20]">
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
                        <h2 className="text-4xl md:text-6xl font-bold mb-8 text-[#1D1E20]">
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
                        <h2 className="text-4xl md:text-6xl font-bold mb-6">La Tríada</h2>
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
                    <h2 className="text-5xl md:text-7xl font-bold mb-8 text-[#1D1E20]">
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
