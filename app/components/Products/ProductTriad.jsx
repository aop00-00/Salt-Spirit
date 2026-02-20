import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { motion, AnimatePresence } from 'framer-motion';
import { AddToCartButton } from '~/components/Cart/AddToCartButton';
import { useAside } from '~/components/Layout/Aside';

const products = [
    {
        id: 1,
        name: "Vital Red",
        handle: 'vital-red',
        subtitle: "Frutos Rojos",
        price: 450,
        description: "Energía limpia y sostenida. Sin picos, sin caídas. Fuel for the ambitious.",
        image: "/vital-red-2.jpg",
        topBadge: "Keto Friendly",
        tags: [
            { text: "Best Seller", color: "#FFD700" },
            { text: "Energy", color: "#ffffff" }
        ],
        accentColor: "#E00B0B"
    },
    {
        id: 2,
        name: "Pure Blue",
        handle: 'pure-blue',
        subtitle: "Blueberry",
        price: 450,
        description: "Claridad mental e hidratación celular. Mantén tu mente afilada.",
        image: "/pure-blue-2.jpg",
        topBadge: "Office Essential",
        tags: [
            { text: "Focus", color: "#AEEEEE" },
            { text: "Hydration", color: "#ffffff" }
        ],
        accentColor: "#0063AD"
    },
    {
        id: 3,
        name: "Hydra-Rest",
        handle: 'hydra-rest',
        subtitle: "Uva",
        price: 450,
        description: "Recuperación profunda con Magnesio. Master the art of rest.",
        image: "/hydra-rest-1.jpg",
        topBadge: "Sugar Free",
        tags: [
            { text: "Recovery", color: "#D8BFD8" },
            { text: "Night", color: "#ffffff" }
        ],
        accentColor: "#6813AA"
    },
    {
        id: 4,
        name: "The 24-Hour Ritual",
        handle: 'mix',
        subtitle: "Full Cycle Kit",
        price: 1200,
        description: "El ecosistema completo. Energía, Enfoque y Descanso en perfecta sincronía.",
        image: "/Mix.jpg",
        topBadge: "Best Value",
        tags: [
            { text: "Complete", color: "#1D1E20" },
            { text: "Full Cycle", color: "#ffffff" }
        ],
        accentColor: "#1D1E20"
    }
];

export default function ProductTriad({ products: shopifyProducts = [] }) {
    const navigate = useNavigate();
    const { open } = useAside();
    const [bundleItems, setBundleItems] = useState([]);

    // Merge Shopify product data with static display data
    const enrichedProducts = products.map(staticProduct => {
        const shopifyProduct = shopifyProducts.find(p => p.handle === staticProduct.handle);
        return {
            ...staticProduct,
            shopifyId: shopifyProduct?.id,
            variantId: shopifyProduct?.variants?.nodes?.[0]?.id,
            price: shopifyProduct?.priceRange?.minVariantPrice?.amount || staticProduct.price,
        };
    });

    const handleCardClick = (handle) => {
        navigate(`/products/${handle}`);
    };

    const handleAddToBundle = (e, product) => {
        e.stopPropagation();
        if (bundleItems.find(item => item.id === product.id)) {
            alert("Este producto ya está en tu bundle");
            return;
        }
        setBundleItems([...bundleItems, product]);
    };

    const handleRemoveFromBundle = (productId) => {
        setBundleItems(bundleItems.filter(item => item.id !== productId));
    };

    // Bundle Logic with Tiered Discounts
    const subtotal = bundleItems.reduce((sum, item) => {
        const price = parseFloat(item.price) || 0;
        return sum + price;
    }, 0);

    let discountRate = 0;
    if (bundleItems.length === 2) {
        discountRate = 0.10;
    } else if (bundleItems.length >= 3) {
        discountRate = 0.15;
    }

    const discountAmount = subtotal * discountRate;
    const finalPrice = subtotal - discountAmount;

    return (
        <section className="product-triad py-8 md:py-24 px-4 md:px-6 bg-[#f4f4f4]">
            <div className="max-w-7xl mx-auto">
                {/* Products Grid */}
                <div id="ss-product-container" className="mb-8 md:mb-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
                        {enrichedProducts.map((product) => (
                            <div
                                key={product.id}
                                className="ss-card"
                                onClick={() => handleCardClick(product.handle)}
                            >
                                <img src={product.image} alt={product.name} className="ss-card-bg" />
                                <div className="ss-overlay"></div>

                                <div className="ss-badge-top">{product.topBadge}</div>

                                <div className="ss-content">
                                    <div className="ss-header">
                                        <h3 className="ss-title text-white">{product.name}</h3>
                                        <div className="ss-price-tag text-white">${product.price}</div>
                                    </div>

                                    <p className="ss-desc">{product.description}</p>

                                    <div className="ss-tags">
                                        {product.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="ss-tag"
                                                style={{ backgroundColor: tag.color }}
                                            >
                                                {tag.text}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex gap-2">
                                        <button
                                            className="ss-btn flex-1"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/products/${product.handle}`);
                                            }}
                                        >
                                            View Product
                                        </button>
                                        <button
                                            className="ss-btn flex-1 bg-black text-white hover:bg-gray-800"
                                            style={{ backgroundColor: '#1D1E20', color: 'white' }}
                                            onClick={(e) => handleAddToBundle(e, product)}
                                        >
                                            Make bundle
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Bundle Summary Card */}
                <div className="bg-white rounded-[32px] p-8 shadow-xl max-w-4xl mx-auto border border-gray-100">
                    <h3 className="text-2xl font-bold mb-6 text-[#1D1E20]">Your Custom Bundle</h3>

                    {bundleItems.length === 0 ? (
                        <div className="text-center py-12 text-gray-500 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
                            <p className="text-lg">Select products above to build your perfect ritual</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Selected Items List */}
                            <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                <AnimatePresence>
                                    {bundleItems.map((item) => (
                                        <motion.div
                                            key={item.id}
                                            initial={{ opacity: 0, y: 10, height: 0 }}
                                            animate={{ opacity: 1, y: 0, height: 'auto' }}
                                            exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                                            transition={{ duration: 0.2 }}
                                            className="flex items-center gap-4 bg-gray-50 p-3 rounded-xl border border-gray-100"
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="w-16 h-16 object-cover rounded-lg shadow-sm"
                                            />
                                            <div className="flex-1">
                                                <h4 className="font-bold text-[#1D1E20]">{item.name}</h4>
                                                <p className="text-sm text-gray-500">${item.price}</p>
                                            </div>
                                            <button
                                                onClick={() => handleRemoveFromBundle(item.id)}
                                                className="w-8 h-8 flex items-center justify-center rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 transition-colors"
                                                title="Remove from bundle"
                                            >
                                                ✕
                                            </button>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            </div>

                            {/* Total & Checkout */}
                            <div className="bg-[#f8f9fa] p-6 rounded-2xl flex flex-col justify-between border border-gray-100">
                                <div className="space-y-2">
                                    {/* Discount Notification */}
                                    {bundleItems.length === 1 && (
                                        <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-lg mb-4 flex items-center gap-2">
                                            <span>💡</span>
                                            <span>Add 1 more item for <b>10% OFF</b>!</span>
                                        </div>
                                    )}
                                    {bundleItems.length === 2 && (
                                        <div className="bg-blue-50 text-blue-800 text-sm p-3 rounded-lg mb-4 flex items-center gap-2">
                                            <span>💡</span>
                                            <span>Add 1 more item for <b>15% OFF</b>!</span>
                                        </div>
                                    )}
                                    {discountRate > 0 && (
                                        <div className="bg-green-50 text-green-800 text-sm p-3 rounded-lg mb-4 flex items-center gap-2">
                                            <span>🎉</span>
                                            <span>{Math.round(discountRate * 100)}% Bundle Discount Applied!</span>
                                        </div>
                                    )}

                                    <div className="flex justify-between items-center text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${subtotal}</span>
                                    </div>

                                    {discountRate > 0 && (
                                        <div className="flex justify-between items-center text-green-600">
                                            <span>Discount ({Math.round(discountRate * 100)}%)</span>
                                            <span>-${discountAmount.toFixed(2)}</span>
                                        </div>
                                    )}

                                    <div className="h-px bg-gray-200 my-2"></div>

                                    <div className="flex justify-between items-center text-xl font-bold">
                                        <span className="text-[#1D1E20]">Total Bundle</span>
                                        <span className="text-[#1D1E20]">${finalPrice.toFixed(2)}</span>
                                    </div>
                                </div>
                                <AddToCartButton
                                    lines={bundleItems
                                        .filter(item => item.variantId) // Only include items with valid variant IDs
                                        .map(item => ({
                                            merchandiseId: item.variantId,
                                            quantity: 1,
                                        }))
                                    }
                                    className="w-full mt-6 bg-[#1D1E20] text-white py-4 rounded-xl font-bold text-lg hover:scale-[1.02] active:scale-[0.98] transition-transform shadow-lg"
                                    onClick={() => {
                                        open('cart');
                                    }}
                                    disabled={bundleItems.length === 0 || !bundleItems.some(item => item.variantId)}
                                >
                                    Add Bundle to Cart - ${finalPrice.toFixed(2)}
                                </AddToCartButton>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}
