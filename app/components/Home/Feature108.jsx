import React, { useState } from "react";
import { FaDroplet, FaMoon, FaBolt } from "react-icons/fa6";
import { Link } from "react-router";
import { IMAGE_ASSETS } from "~/lib/imagePaths";

// Internal Badge Component
const Badge = ({ children, variant = "default", className = "", ...props }) => {
    const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
    const variants = {
        default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
        secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
        outline: "text-foreground",
    };

    return (
        <div className={`${baseStyles} ${variants[variant] || variants.default} ${className}`} {...props}>
            {children}
        </div>
    );
};

export default function Feature108({
    badge = "SALT&SPIRIT",
    heading = "Hydration like never before",
    description = "Transformar la manera en que las personas se hidratan, promoviendo bienestar, autenticidad y conexión.",
    tabs = [
        {
            value: "tab-1",
            icon: <FaDroplet className="h-auto w-4 shrink-0" />,
            label: "Pure Blue",
            productUrl: "/products/pure-blue",
            activeClassName: "bg-blue-600 text-white shadow-lg scale-105 hover:bg-blue-700",
            content: {
                badge: "Blueberry",
                title: "Hidratación Esencial",
                description:
                    "Dos gotas de agua uniéndose, simplicidad y pureza. Una experiencia de hidratación fundamental para tu día a día.",
                buttonText: "Descubrir",
                imageSrc:
                    IMAGE_ASSETS.editorial.about.spiritStory.avif,
                imageAlt: "Pure Blue Product",
            },
        },
        {
            value: "tab-2",
            icon: <FaBolt className="h-auto w-4 shrink-0" />,
            label: "Vital Red",
            productUrl: "/products/vital-red",
            activeClassName: "bg-red-600 text-white shadow-lg scale-105 hover:bg-red-700",
            content: {
                badge: "Frutos Rojos",
                title: "Impulso de Energía",
                description:
                    "Elementos recargándose, evoca energía vibrante. El combustible natural que necesitas para seguir en movimiento.",
                buttonText: "Descubrir",
                imageSrc:
                    IMAGE_ASSETS.editorial.about.saltStory.avif,
                imageAlt: "Vital Red Product",
            },
        },
        {
            value: "tab-3",
            icon: <FaMoon className="h-auto w-4 shrink-0" />,
            label: "Hydra-rest",
            productUrl: "/products/hydra-rest",
            activeClassName: "bg-purple-600 text-white shadow-lg scale-105 hover:bg-purple-700",
            content: {
                badge: "Uva",
                title: "Descanso y Relajación",
                description:
                    "Ojo cerrado descansando, transmite calma. La compañía perfecta para tus momentos de pausa y recuperación.",
                buttonText: "Descubrir",
                imageSrc:
                    IMAGE_ASSETS.editorial.about.hydraRestStory.avif,
                imageAlt: "Hydra-rest Product",
            },
        },
    ],
}) {
    const [activeTab, setActiveTab] = useState(tabs[0].value);

    return (
        <section className="py-16 md:py-20 overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-4 md:gap-6 text-center mb-10 md:mb-14">
                    <h1 className="max-w-3xl text-4xl md:text-5xl lg:text-6xl text-[#1a2e28] leading-[1.1] tracking-tight">
                        <span className="font-light">Hydration like</span>
                        <br />
                        <span className="font-bold">never before</span>
                    </h1>

                    <p className="max-w-xl text-black text-sm md:text-base leading-relaxed border-r-2 border-[#d97706]/20 pr-6" style={{ color: '#000000' }}>
                        {description}
                    </p>
                </div>

                <div className="mt-8 md:mt-12">
                    <div className="w-full rounded-3xl bg-gray-50 p-5 md:p-8 lg:p-10">
                        {/* Content Area */}
                        {tabs.map((tab) => (
                            tab.value === activeTab && (
                                <div
                                    key={tab.value}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-8 lg:gap-10 w-full animate-in fade-in zoom-in-95 duration-500"
                                >
                                    <div className="order-2 md:order-1 flex flex-col justify-center gap-3 md:gap-4 text-left">
                                        <Badge variant="outline" className="w-fit bg-white border-gray-200 uppercase tracking-wide text-[10px] md:text-xs">
                                            {tab.content.badge}
                                        </Badge>
                                        <h3 className="text-lg md:text-2xl font-bold lg:text-3xl text-black leading-tight">
                                            {tab.content.title}
                                        </h3>
                                        <p className="!text-black text-xs md:text-sm lg:text-base leading-relaxed">
                                            {tab.content.description}
                                        </p>
                                        <Link
                                            to={tab.productUrl}
                                            className="mt-1 md:mt-3 w-fit px-4 py-2.5 md:px-6 md:py-3 text-xs md:text-sm bg-black text-white hover:bg-gray-800 rounded-full inline-flex items-center justify-center font-medium transition-colors"
                                            style={{ color: '#ffffff' }}
                                        >
                                            {tab.content.buttonText}
                                        </Link>
                                    </div>
                                    <div className="order-1 md:order-2 flex items-center justify-center">
                                        <img
                                            src={tab.content.imageSrc}
                                            alt={tab.content.imageAlt}
                                            className="rounded-2xl w-full h-auto object-cover shadow-xl aspect-[3/4] md:aspect-[4/5] max-h-[280px] md:max-h-[380px]"
                                        />
                                    </div>
                                </div>
                            )
                        ))}

                        <div className="mt-6 md:mt-8">
                            <div className="flex flex-wrap justify-center gap-2 md:gap-3">
                            {tabs.map((tab) => (
                                <button
                                    key={tab.value}
                                    onClick={() => setActiveTab(tab.value)}
                                    className={`flex items-center gap-2 rounded-full px-4 py-2.5 md:px-6 md:py-3 font-medium text-sm transition-all duration-300 cursor-pointer
                                        ${activeTab === tab.value
                                            ? tab.activeClassName
                                            : "bg-white text-gray-500 hover:bg-gray-200 hover:text-gray-800"
                                        }`}
                                >
                                    <span className="shrink-0">{tab.icon}</span>
                                    <span className="hidden sm:inline">{tab.label}</span>
                                </button>
                            ))}
                            </div>

                            <p className="!mt-4 text-center text-[10px] italic text-gray-400 md:text-xs">
                                Selecciona una opci&oacute;n para ver sus detalles
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
