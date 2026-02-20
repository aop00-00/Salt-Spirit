import { AddToCartButton } from '~/components/Cart/AddToCartButton';
import { useAside } from '~/components/Layout/Aside';

export default function ProductsCTA({ products = [] }) {
    const { open } = useAside();

    // Get the 3 main products: Pure Blue, Vital Red, Hydra-Rest
    const mainProducts = ['pure-blue', 'vital-red', 'hydra-rest']
        .map(handle => products.find(p => p.handle === handle))
        .filter(Boolean);

    // Create cart lines for all 3 products
    const cartLines = mainProducts
        .filter(product => product.variants?.nodes?.[0]?.id)
        .map(product => ({
            merchandiseId: product.variants.nodes[0].id,
            quantity: 1,
        }));

    return (
        <section className="products-cta relative h-[600px] md:h-[700px] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0">
                <img
                    src="/_MG_0329_VSCO.JPG"
                    alt="Elevate Your Standards"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            {/* Content with Glassmorphism */}
            <div className="relative z-0 text-center px-8 py-16 max-w-4xl mx-auto rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl">
                <h2 className="text-4xl md:text-6xl font-bold mb-6 tracking-tight text-white drop-shadow-md">
                    ELEVATE YOUR STANDARDS.
                </h2>

                <p className="text-lg md:text-xl mb-10 leading-relaxed text-white drop-shadow-sm font-medium text-center">
                    La hidratación ya no es una tarea, es tu ventaja competitiva.<br />
                    Únete a quienes exigen más de su cuerpo y de su estilo de vida.
                </p>

                <AddToCartButton
                    lines={cartLines}
                    onClick={() => {
                        open('cart');
                    }}
                    disabled={cartLines.length === 0}
                    className="inline-block mx-auto px-10 py-5 bg-white text-black font-bold text-lg tracking-wide rounded-full hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-xl"
                >
                    START YOUR TRANSFORMATION
                </AddToCartButton>
            </div>
        </section>
    );
}
