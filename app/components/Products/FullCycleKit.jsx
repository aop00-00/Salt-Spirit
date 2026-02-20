import { Link } from 'react-router';
import { AddToCartButton } from '~/components/Cart/AddToCartButton';
import { useAside } from '~/components/Layout/Aside';

export default function FullCycleKit({ products = [] }) {
    const { open } = useAside();

    // Get the 3 products: Pure Blue, Vital Red, Hydra-Rest
    const kitProducts = ['pure-blue', 'vital-red', 'hydra-rest']
        .map(handle => products.find(p => p.handle === handle))
        .filter(Boolean);

    // Create cart lines for all 3 products
    const cartLines = kitProducts
        .filter(product => product.variants?.nodes?.[0]?.id)
        .map(product => ({
            merchandiseId: product.variants.nodes[0].id,
            quantity: 1,
        }));

    return (
        <section className="full-cycle-kit py-20 md:py-32 px-6 bg-white overflow-hidden">
            <div className="max-w-6xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    {/* Image */}
                    <div className="order-2 md:order-1">
                        <div className="relative aspect-square rounded-lg overflow-hidden bg-[#FAFAFA]">
                            <img
                                src="/Mix.jpg"
                                alt="The 24-Hour Ritual Kit"
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>

                    {/* Content */}
                    <div className="order-1 md:order-2 space-y-6">
                        <h2 className="text-4xl md:text-5xl font-bold text-[#1D1E20] tracking-tight">
                            THE 24-HOUR RITUAL
                        </h2>

                        <div className="space-y-4 text-base md:text-lg leading-relaxed opacity-90 text-[#1D1E20]">
                            <p className="text-[#1D1E20]">
                                Tu cuerpo no necesita lo mismo a las 7:00 AM que a las 10:00 PM.
                                Hemos creado un ecosistema completo que se adapta a tu biología circadiana.
                            </p>

                            <div className="space-y-2 font-semibold text-[#1D1E20]">
                                <p className="text-[#1D1E20]">✓ Energía para arrancar.</p>
                                <p className="text-[#1D1E20]">✓ Enfoque para ejecutar.</p>
                                <p className="text-[#1D1E20]">✓ Descanso para reconstruir.</p>
                            </div>

                            <p className="italic text-[#1D1E20]">
                                No elijas uno solo; optimiza tu ciclo completo.
                            </p>
                        </div>

                        <AddToCartButton
                            lines={cartLines}
                            onClick={() => {
                                open('cart');
                            }}
                            disabled={cartLines.length === 0}
                            className="inline-block mt-8 px-8 py-4 bg-transparent text-[#1D1E20] border-2 border-[#1D1E20] font-semibold tracking-wide rounded-lg hover:bg-[#1D1E20] hover:text-white transition-all duration-300 transform hover:scale-105"
                        >
                            Shop The Full Kit
                        </AddToCartButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
