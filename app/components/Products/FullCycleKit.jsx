import { AddToCartButton } from '~/components/Cart/AddToCartButton';
import { useAside } from '~/components/Layout/Aside';
import { IMAGE_ASSETS } from '~/lib/imagePaths';

const ritualSteps = [
    {
        time: 'AM',
        title: 'Energia para arrancar',
        description:
            'Activa el sistema con hidratacion funcional y una base estable para empezar fuerte.',
    },
    {
        time: 'DAY',
        title: 'Enfoque para ejecutar',
        description:
            'Mantiene claridad y rendimiento durante las horas donde mas exiges de tu cuerpo.',
    },
    {
        time: 'PM',
        title: 'Descanso para reconstruir',
        description:
            'Cierra el ciclo con recuperacion real para dormir mejor y rendir mejor al dia siguiente.',
    },
];

export default function FullCycleKit({ products = [] }) {
    const { open } = useAside();

    const kitProducts = ['pure-blue', 'vital-red', 'hydra-rest']
        .map((handle) => products.find((product) => product.handle === handle))
        .filter(Boolean);

    const cartLines = kitProducts
        .filter((product) => product.variants?.nodes?.[0]?.id)
        .map((product) => ({
            merchandiseId: product.variants.nodes[0].id,
            quantity: 1,
        }));

    return (
        <section className="full-cycle-kit overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f7f4ef_100%)] !px-4 py-16 sm:px-6 md:py-24">
            <div className="mx-auto max-w-6xl">
                <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
                    <div className="order-2 lg:order-1">
                        <div className="relative overflow-hidden rounded-[2rem] bg-[#f5f2ec] shadow-[0_30px_80px_rgba(29,30,32,0.08)]">
                            <div className="pointer-events-none absolute inset-x-5 top-5 z-10 flex items-start justify-between rounded-full bg-white/85 px-4 py-3 backdrop-blur-sm sm:inset-x-8 sm:top-8">
                                <div>
                                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#7a6f63]">
                                        Ritual completo
                                    </p>
                                    <p className="mt-1 text-sm font-semibold !text-[#1D1E20] sm:text-base">
                                        Manana, dia y noche
                                    </p>
                                </div>
                                <div className="rounded-full bg-[#1D1E20] px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.22em] text-white">
                                    24H
                                </div>
                            </div>

                            <img
                                src={IMAGE_ASSETS.products.mix.card.avif}
                                alt="The 24-Hour Ritual Kit"
                                className="aspect-[4/4.9] w-full object-cover sm:aspect-[4/4.4] lg:aspect-square"
                            />
                        </div>
                    </div>

                    <div className="order-1 lg:order-2">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center rounded-full border border-[#1D1E20]/10 bg-white/85 px-4 py-2 text-[0.65rem] font-semibold uppercase tracking-[0.28em] text-[#7a6f63]">
                                Sistema circadiano
                            </div>

                            <h2 className="!mt-5 text-[2.35rem] font-bold leading-[0.95] tracking-[-0.04em] text-[#1D1E20] sm:text-5xl lg:text-6xl">
                                THE 24-HOUR RITUAL
                            </h2>

                            <p className="!mt-5 max-w-lg text-base leading-7 !text-[#1D1E20]/80 sm:text-lg">
                                Tu cuerpo no necesita lo mismo a las 7:00 AM que a las 10:00 PM.
                                Creamos un sistema que acompana tu ritmo biologico con soporte
                                especifico para cada momento del dia.
                            </p>

                            <div className="mt-8 grid gap-3 sm:gap-4">
                                {ritualSteps.map((step) => (
                                    <div
                                        key={step.time}
                                        className="grid grid-cols-[auto_1fr] items-start gap-4 rounded-2xl border border-[#1D1E20]/10 bg-white/80 p-4 shadow-[0_10px_30px_rgba(29,30,32,0.04)] backdrop-blur-sm sm:p-5"
                                    >
                                        <div className="rounded-xl bg-[#1D1E20] px-3 py-2 text-center text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-white">
                                            {step.time}
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold uppercase tracking-[0.14em] text-[#1D1E20] sm:text-[0.95rem]">
                                                {step.title}
                                            </h3>
                                            <p className="mt-1 text-sm leading-6 text-[#1D1E20]/70 sm:text-[0.95rem]">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="mt-6 text-sm italic leading-6 text-[#1D1E20]/65 sm:text-base">
                                No elijas uno solo. Optimiza tu ciclo completo.
                            </p>

                            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
                                <AddToCartButton
                                    lines={cartLines}
                                    onClick={() => {
                                        open('cart');
                                    }}
                                    disabled={cartLines.length === 0}
                                    className="inline-flex min-h-14 items-center justify-center rounded-full bg-[#1D1E20] px-7 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#333438] sm:w-auto"
                                >
                                    Shop The Full Kit
                                </AddToCartButton>

                                <p className="text-sm leading-6 text-[#1D1E20]/60">
                                    Una sola compra para cubrir energia, rendimiento y recuperacion
                                    nocturna.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
