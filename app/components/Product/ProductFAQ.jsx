import { useState } from 'react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
    { q: "How do I clean my Salt & Spirit bottle?", a: "Hand wash with warm soapy water. The lid is dishwasher safe (top rack only)." },
    { q: "Is it really leak-proof?", a: "Yes! Our patented triple-seal technology ensures zero leaks, even when thrown in your gym bag." },
    { q: "Does it keep drinks cold?", a: "Absolutely. Double-wall vacuum insulation keeps drinks ice-cold for up to 24 hours." },
    { q: "What is the warranty policy?", a: "We offer a 24-month hassle-free warranty against any manufacturing defects." },
    { q: "Where does it ship from?", a: "All orders ship directly from our warehouse in Austin, Texas." },
    { q: "Can I use it for hot drinks?", a: "Yes, it keeps beverages hot for up to 12 hours. Caution: liquids will remain very hot." },
    { q: "Is the material BPA-free?", a: "100%. We use only premium 18/8 food-grade stainless steel and BPA-free plastics." },
];

export function ProductFAQ({ items }) {
    const [openIndex, setOpenIndex] = useState(null);
    const data = items || FAQS;

    const toggle = (i) => {
        setOpenIndex(openIndex === i ? null : i);
    };

    return (
        <section className="py-24 bg-white">
            <div className="max-w-3xl mx-auto px-6">
                <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
                <div className="divide-y divide-gray-100 border-t border-b border-gray-100">
                    {data.map((faq, i) => (
                        <div key={i} className="py-6">
                            <button
                                onClick={() => toggle(i)}
                                className="flex items-center justify-between w-full text-left focus:outline-none group"
                            >
                                <span className="font-medium text-lg pr-8 group-hover:text-gray-600 transition-colors">{faq.q}</span>
                                <span className="text-gray-400">
                                    {openIndex === i ? <Minus size={20} /> : <Plus size={20} />}
                                </span>
                            </button>
                            <div
                                className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${openIndex === i ? 'max-h-40 opacity-100 mt-4' : 'max-h-0 opacity-0'
                                    }`}
                            >
                                <p className="text-gray-500 leading-relaxed">{faq.a}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
