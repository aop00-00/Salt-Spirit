import { Zap, Dna, Brain } from 'lucide-react';

const features = [
    {
        id: 'zero-sugar',
        icon: <Zap strokeWidth={1.5} size={48} className="text-[#1D1E20]" />,
        title: 'Cero Azúcar y Keto Friendly',
        description: 'Combustible puro sin impacto glucémico. Mantén tu estado de Flow y quema grasa eficientemente sin romper tu ayuno.',
    },
    {
        id: 'bio-available',
        icon: <Dna strokeWidth={1.5} size={48} className="text-[#1D1E20]" />,
        title: 'Minerales Biodisponibles',
        description: 'No es solo agua con sabor. Es una matriz de Sodio, Potasio y Magnesio que tus células absorben al instante para una hidratación real.',
    },
    {
        id: 'aesthetic-performance',
        icon: <Brain strokeWidth={1.5} size={48} className="text-[#1D1E20]" />,
        title: 'Rendimiento Estético',
        description: 'Funcionalidad clínica con una estética que inspira. Porque tu rutina de bienestar merece verse tan bien como te hace sentir.',
    },
];

export default function ScienceSection() {
    return (
        <section className="science-section !py-20 md:!py-32 !px-6 bg-[#F4F4F4] overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <h2 className="text-4xl md:text-5xl lg:text-6xl text-center !mb-16 md:!mb-20 text-[#1D1E20] leading-[1.1] tracking-tight">
                    <span className="font-light">Ingeniería para tu biología,</span>
                    <br />
                    <span className="font-bold">diseñado para tu vida.</span>
                </h2>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16">
                    {features.map((feature) => (
                        <div key={feature.id} className="text-center flex flex-col items-center">
                            {/* Icon */}
                            <div className="mb-6 opacity-90 p-4 bg-white rounded-2xl shadow-sm">
                                {feature.icon}
                            </div>

                            {/* Title */}
                            <h3 className="text-xl md:text-2xl font-bold mb-4 text-[#1D1E20]">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-sm md:text-base !text-[#1D1E20] leading-relaxed opacity-80 max-w-sm mx-auto text-center">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
