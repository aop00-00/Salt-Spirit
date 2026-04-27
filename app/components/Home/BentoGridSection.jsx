import React from "react";
import { BentoGridShowcase } from "./BentoGridShowcase";
import { Zap, Star, Check, PackageCheck, Truck } from "lucide-react";
import { AddToCartButton } from "~/components/Cart/AddToCartButton";
import { useAside } from "~/components/Layout/Aside";
import { IMAGE_ASSETS } from "~/lib/imagePaths";

const Card = ({ title, subtitle, className = "", children, background, titleClassName = "text-gray-900", subtitleClassName = "text-gray-600" }) => (
    <div className={`h-full w-full rounded-2xl md:rounded-3xl p-4 md:p-6 flex flex-col justify-between overflow-hidden relative ${className}`}>
        {background && <div className="absolute inset-0 z-0">{background}</div>}
        <div className="z-0 relative">
            <h3 className={`text-sm md:text-lg font-bold mb-1 ${titleClassName}`}>{title}</h3>
            {subtitle && <p className={`text-xs md:text-sm ${subtitleClassName}`}>{subtitle}</p>}
        </div>
        <div className="z-0 relative mt-4">
            {children}
        </div>
    </div>
);

export default function BentoGridSection({ products = [] }) {
    const { open } = useAside();

    // Get the 3 main products: Pure Blue, Vital Red, Hydra-Rest
    const collectionProducts = ['pure-blue', 'vital-red', 'hydra-rest']
        .map(handle => products.find(p => p.handle === handle))
        .filter(Boolean);

    // Create cart lines for all 3 products
    const cartLines = collectionProducts
        .filter(product => product.variants?.nodes?.[0]?.id)
        .map(product => ({
            merchandiseId: product.variants.nodes[0].id,
            quantity: 1,
        }));

    return (
        <div className="py-24 px-4 max-w-7xl mx-auto overflow-hidden">
            <div className="mb-20 text-right flex flex-col items-end">
                <div className="flex items-center gap-3 mb-6">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-[#d97706]/40" />
                    <div className="w-2 h-2 rotate-45 bg-[#d97706]" />
                </div>

                <h2 className="text-4xl md:text-6xl lg:text-7xl text-[#1a2e28] leading-[1.05] mb-6 tracking-tight">
                    <span className="font-light">Hydrate your</span>
                    <br />
                    <span className="font-bold">spirit</span>
                </h2>

                <div className="mt-8 max-w-xl border-r-2 border-[#d97706]/20 pr-6">
                    <p className="text-[#1a2e28] text-sm md:text-lg leading-relaxed">
                        To awaken the spirit within by redefining hydration—pure, natural, and elevated.
                    </p>
                </div>
            </div>
            <BentoGridShowcase
                integrations={
                    <Card title="Clean Energy" subtitle="Sin picos, sin caídas." className="bg-orange-50/80 border border-orange-100">
                        <div className="absolute right-0 bottom-0 opacity-10">
                            <Zap size={120} className="text-orange-500" />
                        </div>
                        <p className="text-orange-800/80 mt-2 font-medium">0% Azúcar, 100% Enfoque. La gasolina premium que tu cuerpo pide a gritos a las 3 PM.</p>
                    </Card>
                }
                featureTags={
                    <Card title="Envío Gratis" subtitle="A todo México." className="bg-emerald-50/80 border border-emerald-100">
                        <div className="absolute right-0 bottom-0 opacity-10">
                            <Truck size={120} className="text-emerald-500" />
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex items-center gap-2 text-sm text-emerald-800 font-medium">
                                <PackageCheck size={16} className="text-emerald-600 shrink-0" />
                                Empaque premium protegido
                            </div>
                            <div className="flex items-center gap-2 text-sm text-emerald-800 font-medium">
                                <Truck size={16} className="text-emerald-600 shrink-0" />
                                Entrega en 3–5 días hábiles
                            </div>
                            <div className="flex items-center gap-2 text-sm text-emerald-800 font-medium">
                                <Check size={16} className="text-emerald-600 shrink-0" />
                                Rastreo en tiempo real
                            </div>
                        </div>
                    </Card>
                }
                mainFeature={
                    <Card

                        className="bg-stone-900 border border-stone-800 text-white relative group"
                        background={
                            <img src={IMAGE_ASSETS.marketing.bento.elevateRitual.avif} className="w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity duration-500" alt="Ritual" />
                        }
                    >
                        <div className="relative z-0 h-full flex flex-col justify-end">
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">Diseñado para el bienestar</h3>
                            <p className="text-stone-300">Donde la hidratación se encuentra con el Performance. Hidratación que funciona.</p>
                            <AddToCartButton
                                lines={cartLines}
                                onClick={() => {
                                    open('cart');
                                }}
                                disabled={cartLines.length === 0}
                                className="mt-4 px-6 py-2 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-semibold hover:bg-white/30 transition-colors w-fit"
                            >
                                Shop The Collection
                            </AddToCartButton>
                        </div>

                    </Card>
                }
                secondaryFeature={
                    <Card
                        title="Science Backed"
                        subtitle="No es magia, es química."
                        titleClassName="text-white font-bold"
                        subtitleClassName="text-white font-semibold"
                        className="bg-purple-50/80 border border-purple-100 relative overflow-hidden"
                        background={
                            <>
                                <img src={IMAGE_ASSETS.marketing.bento.scienceBackedBg.avif} className="w-full h-full object-cover absolute inset-0 z-0 scale-110" alt="Science Backed Background" />
                                <div className="absolute inset-0 bg-purple-900/30 z-0" />
                            </>
                        }
                    >
                        <div className="mt-2 flex items-center justify-between relative z-10">
                            <span className="text-4xl font-bold text-white">100%</span>
                            <Star className="text-white" size={40} />
                        </div>
                        <p className="text-white font-semibold text-sm mt-2 relative z-10">Una fórmula precisa de Sodio, Potasio y Magnesio diseñada para absorción celular inmediata.</p>
                    </Card>
                }
                statistic={
                    <Card

                        className="bg-green-50/80 border border-green-100 relative overflow-hidden"
                        background={
                            <>
                                <img src={IMAGE_ASSETS.editorial.homeGallery.ssStandard.avif} className="w-full h-full object-cover absolute inset-0 z-0 scale-110" alt="S&S Standard Background" />
                                <div className="absolute inset-0 bg-white/40 z-0" />
                            </>
                        }
                    >
                        <ul className="space-y-3 mt-2 relative z-10">
                            <li className="flex items-center gap-2 p-2 bg-white/80 rounded-lg text-sm border border-white/50 shadow-sm">
                                <Check size={18} className="text-green-600" />
                                <span className="font-medium text-gray-800">Keto & Fasting Friendly</span>
                            </li>
                            <li className="flex items-center gap-2 p-2 bg-white/80 rounded-lg text-sm border border-white/50 shadow-sm">
                                <Check size={18} className="text-green-600" />
                                <span className="font-medium text-gray-800">Ingredientes 100% Naturales</span>
                            </li>
                            <li className="flex items-center gap-2 p-2 bg-white/80 rounded-lg text-sm border border-white/50 shadow-sm">
                                <Check size={18} className="text-green-600" />
                                <span className="font-medium text-gray-800">Envío Rápido a todo MX</span>
                            </li>
                        </ul>
                    </Card>
                }
                journey={
                    <Card title="Tu Ritual Diario" className="bg-rose-50/80 border border-rose-100">
                        <p className="text-rose-900/80 mb-4">
                            Dejamos de beber agua por inercia. Empezamos a hidratarnos con propósito e intención.
                        </p>
                        <p className="text-rose-900/80 font-serif italic text-lg leading-relaxed">
                            "Hydrate your spirit."
                        </p>
                    </Card>
                }
            />
        </div>
    );
}

