import { useState, useMemo } from 'react';
import { Money, Image } from '@shopify/hydrogen';
import { Check, ShoppingBag, ShoppingCart } from 'lucide-react';
import { AddToCartButton } from '~/components/Cart/AddToCartButton';
import { useAside } from '~/components/Layout/Aside';

export default function ComboSection({ products }) {
    const combo = useCombo(products);

    return (
        <div className="py-20 px-4 md:px-8 bg-white overflow-hidden" id="combo-section">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-[#1a2e28] mb-4">El cuidado completo en un solo clic.</h2>
                    <p className="text-gray-500 text-lg">Combina nuestros productos y recibe descuentos exclusivos.</p>
                </div>

                <div className="flex flex-col lg:flex-row gap-8 items-start">
                    {/* Left Column: Product Grid */}
                    <div className="flex-1 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 md:gap-6 w-full">
                        {products.map((product) => (
                            <ComboProductCard
                                key={product.id}
                                product={product}
                                isSelected={combo.isItemsSelected(product.id)}
                                onToggle={() => combo.toggleItem(product)}
                            />
                        ))}
                    </div>

                    {/* Right Column: Sticky Summary */}
                    <div className="w-full lg:w-[380px] lg:sticky lg:top-24">
                        <ComboSummary combo={combo} />
                    </div>
                </div>
            </div>
        </div>
    );
}

function ComboProductCard({ product, isSelected, onToggle }) {
    return (
        <div
            onClick={onToggle}
            className={`
                group relative flex flex-col justify-between
                bg-[#F9F7F5] rounded-2xl md:rounded-3xl p-3 md:p-6 cursor-pointer transition-all duration-300
                border-2 ${isSelected ? 'border-[#d97706]' : 'border-transparent hover:border-gray-200'}
            `}
        >
            <div className="absolute top-2 right-2 md:top-4 md:right-4 z-10">
                <div className={`
                    w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center transition-colors
                    ${isSelected ? 'bg-[#d97706] text-white' : 'bg-white text-transparent border border-gray-300 group-hover:border-gray-400'}
                `}>
                    <Check className="w-[14px] h-[14px] md:w-[18px] md:h-[18px]" strokeWidth={3} />
                </div>
            </div>

            <div className="aspect-square w-full flex items-center justify-center mb-3 md:mb-6">
                {product.featuredImage && (
                    <Image
                        data={product.featuredImage}
                        sizes="(min-width: 45em) 400px, 50vw"
                        className="object-contain w-3/4 h-3/4 mix-blend-multiply group-hover:scale-105 transition-transform duration-300"
                    />
                )}
            </div>

            <div>
                <div className="text-xs md:text-sm text-gray-500 font-medium mb-1">
                    {product.priceRange?.minVariantPrice && <Money data={product.priceRange.minVariantPrice} />}
                </div>
                <h3 className="text-sm md:text-xl font-bold text-[#1a2e28] leading-tight">
                    {product.title.replace(/\(?mayoreo\)?/gi, '').trim()}
                </h3>
            </div>
        </div>
    );
}

function ComboSummary({ combo }) {
    const { selectedItems, subtotal, discount, total, label } = combo;
    const isEmpty = selectedItems.length === 0;
    const { open } = useAside();

    const cartLines = selectedItems.map(item => ({
        merchandiseId: item.variants.nodes[0].id,
        quantity: 1
    }));

    return (
        <div className="bg-[#1C1C1E] text-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold mb-2">Arma tu combo</h3>
            <p className="text-gray-400 text-sm mb-8">
                {label ? '¡Descuento desbloqueado!' : 'Selecciona productos'}
            </p>

            {isEmpty ? (
                <div className="border-2 border-dashed border-gray-700 rounded-2xl h-40 flex flex-col items-center justify-center text-gray-600 mb-8">
                    <ShoppingCart size={32} className="mb-2 opacity-50" />
                    <span className="text-sm">Tu carrito está vacío</span>
                </div>
            ) : (
                <div className="space-y-4 mb-8">
                    <div className="max-h-60 overflow-y-auto pr-2 custom-scrollbar space-y-3">
                        {selectedItems.map((item, i) => (
                            <div key={`${item.id}-${i}`} className="flex justify-between items-center text-sm">
                                <span className="text-gray-300 truncate pr-4">{item.title}</span>
                                <span className="text-gray-500 tabular-nums">
                                    <Money data={item.priceRange.minVariantPrice} />
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            <div className="space-y-3 pt-6 border-t border-gray-800">
                <div className="flex justify-between text-gray-400 text-sm">
                    <span>Subtotal</span>
                    <span className="tabular-nums"><Money data={subtotal} /></span>
                </div>

                <div className="flex justify-between text-[#4ade80] text-sm">
                    <span>Descuento {label && `(${label})`}</span>
                    <span className="tabular-nums">- <Money data={discount} /></span>
                </div>

                <div className="flex justify-between items-baseline pt-2">
                    <span className="text-xl font-bold">Total</span>
                    <span className="text-3xl font-bold tabular-nums"><Money data={total} /></span>
                </div>
            </div>

            <div className="mt-8">
                <AddToCartButton
                    lines={cartLines}
                    disabled={isEmpty}
                    onClick={() => {
                        open('cart');
                    }}
                >
                    <div className={`
                        w-full py-4 rounded-xl font-bold text-center transition-all
                        ${isEmpty
                            ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                            : 'bg-white text-black hover:bg-gray-200 cursor-pointer'}
                    `}>
                        Agregar al carrito
                    </div>
                </AddToCartButton>
            </div>
        </div>
    );
}

// Logic Hook (Integrated/Scoped logic)
function useCombo(products) {
    const [selectedItems, setSelectedItems] = useState([]);

    const toggleItem = (product) => {
        const exists = selectedItems.some(i => i.id === product.id);
        if (exists) {
            setSelectedItems(prev => prev.filter(i => i.id !== product.id));
        } else {
            setSelectedItems(prev => [...prev, product]);
        }
    };

    const isItemsSelected = (id) => selectedItems.some(i => i.id === id);

    const { subtotal, discount, total, label } = useMemo(() => {
        const items = selectedItems.map(item => parseFloat(item.priceRange?.minVariantPrice?.amount || '0'));
        const currency = products[0]?.priceRange?.minVariantPrice?.currencyCode || 'USD';

        let subtotalVal = items.reduce((a, b) => a + b, 0);
        let discountVal = 0;
        let labelText = '';
        const count = items.length;

        // Discount Logic
        if (count === 2) {
            discountVal = subtotalVal * 0.10;
            labelText = '10%';
        } else if (count === 3) {
            discountVal = subtotalVal * 0.15;
            labelText = '15%';
        } else if (count >= 4) {
            items.forEach((price, index) => {
                if (index === 3) discountVal += price * 0.50;
                else discountVal += price * 0.15;
            });
            const effectivePercent = subtotalVal > 0 ? Math.round((discountVal / subtotalVal) * 100) : 0;
            labelText = `${effectivePercent}%`;
        }

        return {
            subtotal: { amount: subtotalVal.toString(), currencyCode: currency },
            discount: { amount: discountVal.toString(), currencyCode: currency },
            total: { amount: (subtotalVal - discountVal).toString(), currencyCode: currency },
            label: labelText
        };
    }, [selectedItems, products]);

    return { selectedItems, toggleItem, isItemsSelected, subtotal, discount, total, label };
}
