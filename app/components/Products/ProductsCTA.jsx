import {AddToCartButton} from '~/components/Cart/AddToCartButton';
import {useAside} from '~/components/Layout/Aside';
import {IMAGE_ASSETS} from '~/lib/imagePaths';

export default function ProductsCTA({products = []}) {
    const {open} = useAside();

    const mainProducts = ['pure-blue', 'vital-red', 'hydra-rest']
        .map((handle) => products.find((product) => product.handle === handle))
        .filter(Boolean);

    const cartLines = mainProducts
        .filter((product) => product.variants?.nodes?.[0]?.id)
        .map((product) => ({
            merchandiseId: product.variants.nodes[0].id,
            quantity: 1,
        }));

    return (
        <section className="products-cta relative flex min-h-[600px] items-center justify-center overflow-hidden px-4 py-10 sm:px-6 md:min-h-[700px] md:px-8 md:py-16">
            <div className="absolute inset-0">
                <img
                    src={IMAGE_ASSETS.editorial.homeGallery.ritualPremium.avif}
                    alt="Elevate Your Standards"
                    className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-black/30" />
            </div>

            <div className="relative z-10 mx-auto w-full max-w-5xl">
                <div className="mx-auto w-full max-w-4xl rounded-3xl border border-white/20 bg-white/10 px-8 py-14 text-center shadow-2xl backdrop-blur-md md:px-12 md:py-16">
                    <h2 className="mb-6 text-4xl font-bold tracking-tight text-white drop-shadow-md md:text-5xl">
                        ELEVATE YOUR STANDARDS.
                    </h2>

                    <p className="mb-10 text-center text-lg font-medium leading-relaxed text-white drop-shadow-sm md:text-xl">
                        La hidratación ya no es una tarea, es tu ventaja competitiva.
                        <br />
                        Únete a quienes exigen más de su cuerpo y de su estilo de vida.
                    </p>

                    <div className="flex justify-center pt-10">
                        <AddToCartButton
                            lines={cartLines}
                            onClick={() => {
                                open('cart');
                            }}
                            disabled={cartLines.length === 0}
                            className="inline-block rounded-full bg-white px-10 py-5 text-lg font-bold tracking-wide text-black shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gray-100"
                        >
                            START YOUR TRANSFORMATION
                        </AddToCartButton>
                    </div>
                </div>
            </div>
        </section>
    );
}
