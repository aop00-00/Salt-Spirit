import { ProductPrice } from '~/components/Product/ProductPrice';
import { ProductForm } from '~/components/Product/ProductForm';
import { AddToCartButton } from '~/components/Cart/AddToCartButton';
import { useAside } from '~/components/Layout/Aside';
import { Truck, ShieldCheck, Clock, ChevronRight, Copy, Star } from 'lucide-react';
import { useState, Suspense } from 'react';
import { Await } from 'react-router';

export function ProductDetails({ product, selectedVariant, productOptions, recommendedProducts }) {
    const { title, descriptionHtml } = product;
    const [isShippingExpanded, setIsShippingExpanded] = useState(false);
    const [copiedCode, setCopiedCode] = useState(false);

    const handleCopyCode = () => {
        navigator.clipboard.writeText('HYDRATE');
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2000);
    };

    // Mock data for demo - in production, this would come from product metafields
    const reviewCount = 196;
    const rating = 5;
    const affirmMonthlyPrice = '59.75';
    const promoCode = 'HYDRATE';
    const promoDescription = 'ENVIO GRATUITO EN COMPRAS MAYORES A $599';

    return (
        <div className="product-details w-full md:w-1/2 p-6 md:p-12 flex flex-col">
            <div className="max-w-xl">
                {/* Product Title */}
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-3">
                    {title}
                </h1>

                {/* Star Rating */}
                <div className="flex items-center gap-2 mb-6">
                    <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star
                                key={i}
                                size={18}
                                className={i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                            />
                        ))}
                    </div>
                    <span className="text-sm text-gray-600">({reviewCount})</span>
                </div>

                {/* Price Section */}
                <div className="flex items-center gap-3 mb-2">
                    <div className="text-3xl md:text-4xl font-bold text-gray-900">
                        <ProductPrice
                            price={selectedVariant?.price}
                            compareAtPrice={selectedVariant?.compareAtPrice}
                        />
                    </div>
                    {selectedVariant?.compareAtPrice && (
                        <span className="bg-gray-900 text-white text-xs font-semibold px-2 py-1 rounded">
                            New
                        </span>
                    )}
                </div>

                {/* Affirm Payment */}
                <div className="flex items-center gap-2 mb-6 text-sm text-gray-600">
                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
                        <rect x="2" y="6" width="20" height="12" rx="2" stroke="currentColor" strokeWidth="2" />
                        <path d="M2 10h20" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    <span>Starting at ${affirmMonthlyPrice}/mo with <span className="font-semibold">affirm</span></span>
                </div>

                {/* Shipping & Support Accordion */}
                <div className="border-t border-b border-gray-200 mb-6">
                    <button
                        onClick={() => setIsShippingExpanded(!isShippingExpanded)}
                        className="w-full flex items-center justify-between py-4 text-left hover:bg-gray-50 transition-colors"
                    >
                        <span className="font-semibold text-gray-900">Shipping & Support</span>
                        <ChevronRight
                            size={20}
                            className={`text-gray-400 transition-transform ${isShippingExpanded ? 'rotate-90' : ''}`}
                        />
                    </button>
                    {isShippingExpanded && (
                        <div className="pb-4 space-y-3">
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Truck size={18} className="text-gray-400 flex-shrink-0" />
                                <span>Free shipping $75+</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <ShieldCheck size={18} className="text-gray-400 flex-shrink-0" />
                                <span>30-Day, Money-Back Guarantee</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                                <Clock size={18} className="text-gray-400 flex-shrink-0" />
                                <span>24-Month, Hassle-Free Warranty</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Promo Banner */}
                <div className="bg-gradient-to-r from-yellow-50 to-green-50 border border-yellow-200 rounded-lg p-4 mb-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-semibold text-green-800 mb-1">{promoDescription}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-xs text-gray-600">Code:</span>
                                <code className="bg-white px-2 py-1 rounded text-sm font-mono font-semibold">
                                    {promoCode}
                                </code>
                            </div>
                        </div>
                        <button
                            onClick={handleCopyCode}
                            className="bg-white border border-gray-300 hover:bg-gray-50 px-3 py-1.5 rounded text-sm font-medium transition-colors flex items-center gap-1.5"
                        >
                            <Copy size={14} />
                            {copiedCode ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>

                {/* Product Options & Form */}
                <div className="mb-6">
                    <ProductForm
                        productOptions={productOptions}
                        selectedVariant={selectedVariant}
                    />
                </div>

                {/* Perfect Match Bundle - 3 Products */}
                <Suspense fallback={<div className="h-32 bg-gray-50 rounded-lg animate-pulse" />}>
                    <Await resolve={recommendedProducts}>
                        {(products) => (
                            <PerfectMatchBundle
                                selectedVariant={selectedVariant}
                                products={products?.products?.nodes || []}
                            />
                        )}
                    </Await>
                </Suspense>
            </div>
        </div>
    );
}

function PerfectMatchBundle({ selectedVariant, products }) {
    const { open } = useAside();
    const [selectedProducts, setSelectedProducts] = useState([]);

    // Map real products to bundle structure
    const bundleProducts = products.map(p => ({
        id: p.id, // This is gid://... from query, or should be variant id?
        // Query returns variants(first: 1). We need variant ID for cart.
        variantId: p.variants?.nodes?.[0]?.id,
        name: p.title,
        price: parseFloat(p.priceRange?.minVariantPrice?.amount || '0'),
        image: p.featuredImage?.url
    })).filter(p => p.variantId); // Ensure valid variant ID

    const toggleProduct = (productId) => {
        setSelectedProducts(prev =>
            prev.includes(productId)
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    // Calculate bundle discount - ONLY for selected bundle products
    const calculateDiscount = () => {
        const count = selectedProducts.length;
        const bundleTotal = selectedProducts.reduce((sum, id) => {
            const product = bundleProducts.find(p => p.id === id);
            return sum + (product?.price || 0);
        }, 0);

        let discount = 0;
        let discountLabel = '';

        if (count === 2) {
            discount = bundleTotal * 0.10;
            discountLabel = '10% OFF';
        } else if (count >= 3) {
            discount = bundleTotal * 0.15;
            discountLabel = '15% OFF';
        }

        return { subtotal: bundleTotal, discount, total: bundleTotal - discount, discountLabel };
    };

    const { subtotal, discount, total, discountLabel } = calculateDiscount();

    return (
        <div className="border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 mb-4">
                <span className="bg-orange-500 text-white text-xs font-bold px-2 py-0.5 rounded">
                    PERFECT MATCH
                </span>
                <span className="text-sm font-semibold text-gray-900">Complete el set</span>
                {discountLabel && (
                    <span className="ml-auto text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded">
                        {discountLabel}
                    </span>
                )}
            </div>

            {/* 3 Products in a row */}
            <div className="grid grid-cols-3 gap-2 mb-4">
                {bundleProducts.map((product) => (
                    <div
                        key={product.id}
                        onClick={() => toggleProduct(product.id)}
                        className={`border-2 rounded-lg p-2 cursor-pointer transition-all ${selectedProducts.includes(product.id)
                            ? 'border-orange-500 bg-orange-50'
                            : 'border-gray-200 hover:border-gray-300'
                            }`}
                    >
                        <div className="aspect-square w-full bg-gray-100 rounded mb-2 overflow-hidden">
                            <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                        </div>
                        <p className="text-xs font-semibold text-gray-900 mb-1 text-center">{product.name}</p>
                        <p className="text-xs font-bold text-gray-900 text-center mb-2">${product.price}</p>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                toggleProduct(product.id);
                            }}
                            className={`w-full text-xs font-semibold py-1.5 px-2 rounded transition-colors ${selectedProducts.includes(product.id)
                                ? 'bg-orange-500 text-white hover:bg-orange-600'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            {selectedProducts.includes(product.id) ? 'En Bundle' : '+ Agregar'}
                        </button>
                    </div>
                ))}
            </div>

            {/* Pricing Summary - Only shows when products are selected */}
            {selectedProducts.length > 0 && (
                <>
                    <div className="space-y-2 pt-3 border-t border-gray-100">
                        <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Bundle Subtotal ({selectedProducts.length} productos)</span>
                            <span className="font-semibold text-gray-900">${subtotal.toFixed(2)}</span>
                        </div>
                        {discount > 0 && (
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-green-600">Descuento Bundle</span>
                                <span className="font-semibold text-green-600">-${discount.toFixed(2)}</span>
                            </div>
                        )}
                        <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                            <span className="text-base font-bold text-gray-900">Total Bundle</span>
                            <span className="text-xl font-bold text-gray-900">${total.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Add Bundle to Cart Button - Functional */}
                    <div className="mt-4">
                        <AddToCartButton
                            lines={selectedProducts.map(productId => {
                                const product = bundleProducts.find(p => p.id === productId);
                                return {
                                    merchandiseId: product?.variantId,
                                    quantity: 1,
                                };
                            })}
                            className="w-full"
                            onClick={() => {
                                open('cart');
                            }}
                        >
                            <span className="w-full block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition-colors text-center">
                                Agregar Bundle al Carrito ({selectedProducts.length})
                            </span>
                        </AddToCartButton>
                    </div>
                </>
            )}
        </div>
    );
}
