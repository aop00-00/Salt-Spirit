import { useState, useMemo } from 'react';
import { Money } from '@shopify/hydrogen';
import { X, ShoppingBag, ArrowRight } from 'lucide-react';
import { AddToCartButton } from '~/components/Cart/AddToCartButton';
import { useAside } from '~/components/Layout/Aside';

export function useCombo() {
    const [selectedItems, setSelectedItems] = useState([]);

    const addToCombo = (product) => {
        setSelectedItems((prev) => [...prev, product]);
    };

    const removeFromCombo = (index) => {
        setSelectedItems((prev) => prev.filter((_, i) => i !== index));
    };

    const { subtotal, discount, total, label } = useMemo(() => {
        // Basic calculation assuming 'minVariantPrice' exists on products
        const items = selectedItems.map(item => parseFloat(item.priceRange?.minVariantPrice?.amount || '0'));
        const currency = selectedItems[0]?.priceRange?.minVariantPrice?.currencyCode || 'USD';

        let subtotalVal = items.reduce((a, b) => a + b, 0);
        let discountVal = 0;
        let labelText = '';

        const count = items.length;

        if (count === 2) {
            discountVal = subtotalVal * 0.10;
            labelText = '10% OFF';
        } else if (count === 3) {
            discountVal = subtotalVal * 0.15;
            labelText = '15% OFF';
        } else if (count >= 4) {
            items.forEach((price, index) => {
                if (index === 3) { // The 4th item (0-indexed)
                    discountVal += price * 0.50;
                } else {
                    discountVal += price * 0.15;
                }
            });
            labelText = 'MEGA COMBO';
        }

        return {
            subtotal: { amount: subtotalVal.toString(), currencyCode: currency },
            discount: { amount: discountVal.toString(), currencyCode: currency },
            total: { amount: (subtotalVal - discountVal).toString(), currencyCode: currency },
            label: labelText
        };
    }, [selectedItems]);

    return { selectedItems, addToCombo, removeFromCombo, subtotal, discount, total, label };
}

export function ComboStickyBar({ combo }) { // Maintained name to avoid breaking import in _index.jsx
    const { selectedItems, removeFromCombo, subtotal, discount, total, label } = combo;
    const { open } = useAside();

    if (selectedItems.length === 0) return null;

    return (
        <div className="fixed bottom-6 right-6 left-6 md:left-auto w-auto md:w-96 bg-[#1a1a1a] rounded-2xl shadow-2xl overflow-hidden z-50 animate-in slide-in-from-right-10 border border-gray-800 font-sans text-white">
            <div className="p-6">
                <h2 className="text-xl font-bold mb-1">Arma tu combo</h2>
                {label ? (
                    <p className="text-[#4ade80] text-sm mb-4">¡Descuento desbloqueado!</p>
                ) : (
                    <p className="text-gray-400 text-sm mb-4">Agrega productos para descuento</p>
                )}

                {/* Product List */}
                <div className="space-y-3 mb-6 max-h-60 overflow-y-auto pr-2">
                    {selectedItems.map((item, i) => (
                        <div key={`${item.id}-${i}`} className="flex justify-between items-center group">
                            <div className="flex items-center gap-3 overflow-hidden">
                                <button
                                    onClick={() => removeFromCombo(i)}
                                    className="text-gray-500 hover:text-red-500 transition-colors shrink-0"
                                >
                                    <X size={14} />
                                </button>
                                <div className="min-w-0">
                                    <p className="text-sm font-medium text-gray-200 truncate">{item.title}</p>
                                </div>
                            </div>
                            <div className="text-sm text-gray-400 shrink-0">
                                {item.priceRange?.minVariantPrice && <Money data={item.priceRange.minVariantPrice} />}
                            </div>
                        </div>
                    ))}
                </div>

                <div className="h-px w-full bg-gray-800 mb-4" />

                {/* Totals */}
                <div className="space-y-2 mb-6">
                    <div className="flex justify-between text-gray-400 text-sm">
                        <span>Subtotal</span>
                        <Money data={subtotal} />
                    </div>

                    {label && (
                        <div className="flex justify-between text-[#4ade80] text-sm font-medium">
                            <span>Descuento ({label})</span>
                            <span>- <Money data={discount} /></span>
                        </div>
                    )}

                    <div className="flex justify-between items-end mt-4">
                        <span className="text-lg font-bold">Total</span>
                        <span className="text-2xl font-bold"><Money data={total} /></span>
                    </div>
                </div>

                <AddToCartButton
                    lines={selectedItems.map(item => ({
                        merchandiseId: item.variants?.nodes?.[0]?.id || item.selectedOrFirstAvailableVariant?.id,
                        quantity: 1
                    }))}
                    disabled={selectedItems.length === 0}
                    onClick={() => {
                        open('cart');
                    }}
                >
                    <div className={`
                        w-full bg-white hover:bg-gray-200 text-black font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-colors
                        ${selectedItems.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}
                    `}>
                        Agregar al carrito
                        <ArrowRight size={18} />
                    </div>
                </AddToCartButton>
            </div>
        </div>
    );
}
