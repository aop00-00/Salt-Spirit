import {useEffect, useState} from 'react';
import {useNavigate} from 'react-router';
import {AnimatePresence, motion} from 'framer-motion';
import {AddToCartButton} from '~/components/Cart/AddToCartButton';
import {useAside} from '~/components/Layout/Aside';
import {IMAGE_ASSETS} from '~/lib/imagePaths';

const products = [
    {
        id: 1,
        name: 'Vital Red',
        handle: 'vital-red',
        subtitle: 'Frutos Rojos',
        price: 450,
        description: 'Energia limpia y sostenida. Sin picos, sin caidas. Fuel for the ambitious.',
        image: IMAGE_ASSETS.products.vitalRed.card.avif,
        topBadge: 'Keto Friendly',
        tags: [
            {text: 'Best Seller', color: '#FFD700'},
            {text: 'Energy', color: '#ffffff'},
        ],
        accentColor: '#E00B0B',
    },
    {
        id: 2,
        name: 'Pure Blue',
        handle: 'pure-blue',
        subtitle: 'Blueberry',
        price: 450,
        description: 'Claridad mental e hidratacion celular. Manten tu mente afilada.',
        image: IMAGE_ASSETS.products.pureBlue.card.avif,
        topBadge: 'Office Essential',
        tags: [
            {text: 'Focus', color: '#AEEEEE'},
            {text: 'Hydration', color: '#ffffff'},
        ],
        accentColor: '#0063AD',
    },
    {
        id: 3,
        name: 'Hydra-Rest',
        handle: 'hydra-rest',
        subtitle: 'Uva',
        price: 450,
        description: 'Recuperacion profunda con Magnesio. Master the art of rest.',
        image: IMAGE_ASSETS.products.hydraRest.card.avif,
        topBadge: 'Sugar Free',
        tags: [
            {text: 'Recovery', color: '#D8BFD8'},
            {text: 'Night', color: '#ffffff'},
        ],
        accentColor: '#6813AA',
    },
    {
        id: 4,
        name: 'The 24-Hour Ritual',
        handle: 'mix',
        subtitle: 'Full Cycle Kit',
        price: 1200,
        description: 'El ecosistema completo. Energia, enfoque y descanso en perfecta sintonia.',
        image: IMAGE_ASSETS.products.mix.card.avif,
        topBadge: 'Best Value',
        tags: [
            {text: 'Complete', color: '#FFFFFF'},
            {text: 'Full Cycle', color: '#ffffff'},
        ],
        accentColor: '#1D1E20',
    },
];

export default function ProductTriad({products: shopifyProducts = []}) {
    const navigate = useNavigate();
    const {open} = useAside();
    const [bundleItems, setBundleItems] = useState([]);
    const [isBundleSidebarOpen, setIsBundleSidebarOpen] = useState(false);

    const enrichedProducts = products.map((staticProduct) => {
        const shopifyProduct = shopifyProducts.find((product) => product.handle === staticProduct.handle);

        return {
            ...staticProduct,
            shopifyId: shopifyProduct?.id,
            variantId: shopifyProduct?.variants?.nodes?.[0]?.id,
            price: shopifyProduct?.priceRange?.minVariantPrice?.amount || staticProduct.price,
        };
    });

    useEffect(() => {
        if (!isBundleSidebarOpen) return;

        const previousHtmlOverflow = document.documentElement.style.overflow;
        const previousOverflow = document.body.style.overflow;
        const previousOverscroll = document.body.style.overscrollBehavior;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        document.body.style.overscrollBehavior = 'none';

        return () => {
            document.documentElement.style.overflow = previousHtmlOverflow;
            document.body.style.overflow = previousOverflow;
            document.body.style.overscrollBehavior = previousOverscroll;
        };
    }, [isBundleSidebarOpen]);

    const handleCardClick = (handle) => {
        navigate(`/products/${handle}`);
    };

    const handleAddToBundle = (event, product) => {
        event.stopPropagation();

        if (bundleItems.find((item) => item.id === product.id)) {
            setIsBundleSidebarOpen(true);
            return;
        }

        setBundleItems((currentItems) => [...currentItems, product]);
    };

    const handleRemoveFromBundle = (productId) => {
        setBundleItems((currentItems) => currentItems.filter((item) => item.id !== productId));
    };

    const subtotal = bundleItems.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        return sum + price;
    }, 0);

    let discountRate = 0;
    if (bundleItems.length === 2) {
        discountRate = 0.1;
    } else if (bundleItems.length >= 3) {
        discountRate = 0.15;
    }

    const discountAmount = subtotal * discountRate;
    const finalPrice = subtotal - discountAmount;
    const hasInvalidBundleItems = bundleItems.some((item) => !item.variantId);
    const cartLines = bundleItems
        .filter((item) => item.variantId)
        .map((item) => ({
            merchandiseId: item.variantId,
            quantity: 1,
        }));

    const formatPrice = (value) =>
        new Intl.NumberFormat('es-MX', {
            style: 'currency',
            currency: 'MXN',
            maximumFractionDigits: 2,
        }).format(Number(value) || 0);

    return (
        <section className="product-triad bg-[#f4f4f4] px-4 py-8 md:px-6 md:py-24">
            <div className="mx-auto max-w-7xl">
                <div id="ss-product-container" className="mb-8 md:mb-12">
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
                        {enrichedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="ss-card"
                                role="button"
                                tabIndex={0}
                                onClick={() => handleCardClick(product.handle)}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        handleCardClick(product.handle);
                                    }
                                }}
                            >
                                <img src={product.image} alt={product.name} className="ss-card-bg" />
                                <div className="ss-overlay"></div>

                                <div className="ss-badge-top">{product.topBadge}</div>

                                <div className="ss-content">
                                    <div className="ss-header">
                                        <h3 className="ss-title text-white">{product.name}</h3>
                                        <div className="ss-price-tag text-white">{formatPrice(product.price)}</div>
                                    </div>

                                    <p className="ss-desc">{product.description}</p>

                                    <div className="ss-tags">
                                        {product.tags.map((tag) => (
                                            <span
                                                key={`${product.id}-${tag.text}`}
                                                className="ss-tag"
                                                style={{backgroundColor: tag.color}}
                                            >
                                                {tag.text}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            className="ss-btn flex-1"
                                            onClick={(event) => {
                                                event.stopPropagation();
                                                navigate(`/products/${product.handle}`);
                                            }}
                                        >
                                            View Product
                                        </button>
                                        <button
                                            className="ss-btn flex-1 bg-black text-white hover:bg-gray-800"
                                            style={{backgroundColor: '#1D1E20', color: 'white'}}
                                            onClick={(event) => handleAddToBundle(event, product)}
                                        >
                                            Make bundle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <motion.button
                type="button"
                whileHover={{y: -2}}
                whileTap={{scale: 0.98}}
                onClick={() => setIsBundleSidebarOpen(true)}
                className="fixed bottom-5 right-5 z-[120] flex items-center gap-3 rounded-full bg-[#1D1E20] px-5 py-4 text-left text-white shadow-[0_20px_45px_rgba(29,30,32,0.22)] transition-colors hover:bg-[#2f3034] sm:bottom-8 sm:right-8"
                aria-label={`Open bundle builder with ${bundleItems.length} selected products`}
            >
                <span className="relative flex h-11 w-11 items-center justify-center rounded-full bg-white/12">
                    <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M6 7h12" />
                        <path d="M6 12h12" />
                        <path d="M6 17h8" />
                    </svg>
                    {bundleItems.length > 0 && (
                        <span className="absolute -right-1 -top-1 flex min-h-6 min-w-6 items-center justify-center rounded-full bg-[#E00B0B] px-1 text-xs font-bold text-white shadow-lg">
                            {bundleItems.length}
                        </span>
                    )}
                </span>
                <span className="pr-1">
                    <span className="block text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/60">
                        Bundle
                    </span>
                    <span className="block text-sm font-semibold">
                        {bundleItems.length > 0 ? `Ver resumen ${formatPrice(finalPrice)}` : 'Arma tu ritual'}
                    </span>
                </span>
            </motion.button>

            <AnimatePresence>
                {isBundleSidebarOpen && (
                    <>
                        <motion.button
                            type="button"
                            initial={{opacity: 0}}
                            animate={{opacity: 1}}
                            exit={{opacity: 0}}
                            transition={{duration: 0.2}}
                            onClick={() => setIsBundleSidebarOpen(false)}
                            className="fixed inset-0 z-[125] bg-[#1D1E20]/40 backdrop-blur-[2px]"
                            aria-label="Close bundle sidebar"
                        />

                        <motion.aside
                            data-lenis-prevent
                            initial={{x: '100%'}}
                            animate={{x: 0}}
                            exit={{x: '100%'}}
                            transition={{duration: 0.32, ease: [0.22, 1, 0.36, 1]}}
                            className="fixed right-0 top-0 z-[130] flex h-[100dvh] w-full max-w-[420px] flex-col overflow-hidden bg-[#f7f4ef] shadow-[-24px_0_60px_rgba(29,30,32,0.22)]"
                            aria-label="Bundle summary"
                        >
                            <div className="flex items-center justify-between border-b border-black/10 bg-white/90 px-6 py-5 backdrop-blur-sm">
                                <div>
                                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-[#7a6f63]">
                                        Custom bundle
                                    </p>
                                    <h3 className="mt-1 text-xl font-bold text-[#1D1E20]">
                                        Tu ritual
                                    </h3>
                                </div>
                                <button
                                    type="button"
                                    onClick={() => setIsBundleSidebarOpen(false)}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white text-2xl leading-none text-[#1D1E20] transition-colors hover:bg-[#f3efe7]"
                                    aria-label="Close bundle sidebar"
                                >
                                    &times;
                                </button>
                            </div>

                            <div className="custom-scrollbar flex-1 overflow-y-auto overscroll-contain px-6 py-6 [touch-action:pan-y]">
                                {bundleItems.length === 0 ? (
                                    <div className="flex h-full flex-col justify-center rounded-[2rem] border border-dashed border-black/10 bg-white/70 px-8 py-12 text-center">
                                        <p className="text-[0.7rem] font-semibold uppercase tracking-[0.24em] text-[#7a6f63]">
                                            Bundle vacio
                                        </p>
                                        <h4 className="mt-3 text-2xl font-bold text-[#1D1E20]">
                                            Selecciona productos
                                        </h4>
                                        <p className="mt-3 text-sm leading-6 text-[#1D1E20]/65">
                                            Agrega productos del bundler y vuelve aqui para revisar el descuento antes de mandar el bundle al carrito.
                                        </p>
                                    </div>
                                ) : (
                                    <div className="space-y-6">
                                        <div className="rounded-[1.75rem] bg-[#1D1E20] p-5 text-white shadow-[0_20px_45px_rgba(29,30,32,0.15)]">
                                            <div className="flex items-end justify-between gap-4">
                                                <div>
                                                    <p className="text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-white/55">
                                                        Total bundle
                                                    </p>
                                                    <p className="mt-2 text-3xl font-bold tracking-[-0.04em]">
                                                        {formatPrice(finalPrice)}
                                                    </p>
                                                </div>
                                                <div className="rounded-full bg-white/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white/80">
                                                    {bundleItems.length} productos
                                                </div>
                                            </div>

                                            {bundleItems.length === 1 && (
                                                <p className="mt-4 rounded-2xl bg-white/8 px-4 py-3 text-sm text-white/80">
                                                    Agrega 1 producto mas para desbloquear 10% off.
                                                </p>
                                            )}
                                            {bundleItems.length === 2 && (
                                                <p className="mt-4 rounded-2xl bg-white/8 px-4 py-3 text-sm text-white/80">
                                                    Agrega 1 producto mas para subir a 15% off.
                                                </p>
                                            )}
                                            {discountRate > 0 && (
                                                <p className="mt-4 rounded-2xl bg-[#E00B0B] px-4 py-3 text-sm font-semibold text-white">
                                                    {Math.round(discountRate * 100)}% de descuento aplicado al bundle.
                                                </p>
                                            )}
                                        </div>

                                        <div className="space-y-3">
                                            <h4 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#7a6f63]">
                                                Productos seleccionados
                                            </h4>
                                            <AnimatePresence initial={false}>
                                                {bundleItems.map((item) => (
                                                    <motion.div
                                                        key={item.id}
                                                        layout
                                                        initial={{opacity: 0, y: 12}}
                                                        animate={{opacity: 1, y: 0}}
                                                        exit={{opacity: 0, y: -12}}
                                                        className="flex items-center gap-4 rounded-[1.5rem] border border-black/8 bg-white px-4 py-4 shadow-[0_12px_28px_rgba(29,30,32,0.06)]"
                                                    >
                                                        <img
                                                            src={item.image}
                                                            alt={item.name}
                                                            className="h-20 w-16 rounded-[1rem] object-cover"
                                                        />
                                                        <div className="min-w-0 flex-1">
                                                            <h5 className="font-semibold text-[#1D1E20]">{item.name}</h5>
                                                            <p className="mt-1 text-sm text-[#1D1E20]/60">{item.subtitle}</p>
                                                            <p className="mt-2 text-sm font-semibold text-[#1D1E20]">
                                                                {formatPrice(item.price)}
                                                            </p>
                                                        </div>
                                                        <button
                                                            type="button"
                                                            onClick={() => handleRemoveFromBundle(item.id)}
                                                            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#f5f2ec] text-lg text-[#1D1E20]/60 transition-colors hover:bg-[#fde8e8] hover:text-[#E00B0B]"
                                                            title="Remove from bundle"
                                                        >
                                                            &times;
                                                        </button>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>

                                        <div className="rounded-[1.75rem] border border-black/8 bg-white p-5">
                                            <div className="flex items-center justify-between text-sm text-[#1D1E20]/65">
                                                <span>Subtotal</span>
                                                <span>{formatPrice(subtotal)}</span>
                                            </div>

                                            {discountRate > 0 && (
                                                <div className="mt-3 flex items-center justify-between text-sm font-semibold text-[#E00B0B]">
                                                    <span>Discount ({Math.round(discountRate * 100)}%)</span>
                                                    <span>-{formatPrice(discountAmount)}</span>
                                                </div>
                                            )}

                                            {hasInvalidBundleItems && (
                                                <p className="mt-4 rounded-2xl bg-[#fff3f1] px-4 py-3 text-sm leading-6 text-[#9f2c22]">
                                                    Uno de los productos no tiene variante disponible para agregarlo al carrito.
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="border-t border-black/10 bg-white px-6 py-5">
                                <AddToCartButton
                                    lines={cartLines}
                                    className="w-full rounded-full bg-[#1D1E20] px-6 py-4 text-sm font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-[#333438] disabled:cursor-not-allowed disabled:bg-[#b9b3aa]"
                                    onClick={() => {
                                        setIsBundleSidebarOpen(false);
                                        open('cart');
                                    }}
                                    disabled={bundleItems.length === 0 || hasInvalidBundleItems}
                                >
                                    {bundleItems.length === 0
                                        ? 'Selecciona productos'
                                        : `Agregar bundle ${formatPrice(finalPrice)}`}
                                </AddToCartButton>
                            </div>
                        </motion.aside>
                    </>
                )}
            </AnimatePresence>
        </section>
    );
}
