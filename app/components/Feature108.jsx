import React, { useState } from "react";
import { Layout, Pointer, Zap } from "lucide-react";
import { Link } from "react-router";

// Internal Button Component
const Button = ({ children, className = "", size = "default", ...props }) => {
    const baseStyles = "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 disabled:pointer-events-none disabled:opacity-50";
    const sizeStyles = {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
    };
    const variantStyles = "bg-primary text-white hover:bg-primary/90";

    return (
        <button className={`${baseStyles} ${sizeStyles[size]} ${variantStyles} ${className}`} {...props}>
            {children}
        </button>
    );
};

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
            icon: <Zap className="h-auto w-4 shrink-0" />,
            label: "Pure Blue",
            productUrl: "/products/pure-blue",
            content: {
                badge: "Blueberry",
                title: "Hidratación Esencial",
                description:
                    "Dos gotas de agua uniéndose, simplicidad y pureza. Una experiencia de hidratación fundamental para tu día a día.",
                buttonText: "Descubrir",
                imageSrc:
                    "/IMG_9694_VSCO.JPG",
                imageAlt: "Pure Blue Product",
            },
        },
        {
            value: "tab-2",
            icon: <Pointer className="h-auto w-4 shrink-0" />,
            label: "Vital Red",
            productUrl: "/products/vital-red",
            content: {
                badge: "Frutos Rojos",
                title: "Impulso de Energía",
                description:
                    "Elementos recargándose, evoca energía vibrante. El combustible natural que necesitas para seguir en movimiento.",
                buttonText: "Descubrir",
                imageSrc:
                    "/IMG_9692_VSCO.jpg",
                imageAlt: "Vital Red Product",
            },
        },
        {
            value: "tab-3",
            icon: <Layout className="h-auto w-4 shrink-0" />,
            label: "Hydra-rest",
            productUrl: "/products/hydra-rest",
            content: {
                badge: "Uva",
                title: "Descanso y Relajación",
                description:
                    "Ojo cerrado descansando, transmite calma. La compañía perfecta para tus momentos de pausa y recuperación.",
                buttonText: "Descubrir",
                imageSrc:
                    "/IMG_9693_VSCO(1).JPG",
                imageAlt: "Hydra-rest Product",
            },
        },
    ],
}) {
    const [activeTab, setActiveTab] = useState(tabs[0].value);

    return (
        <section className="py-32 bg-white overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="flex flex-col items-center gap-4 text-center">
                    <Badge variant="outline">{badge}</Badge>
                    <h1 className="max-w-2xl text-3xl font-semibold md:text-4xl text-black">
                        {heading}
                    </h1>
                    <p className="text-gray-500">{description}</p>
                </div>

                <div className="mt-16 flex flex-col md:flex-row gap-8 lg:gap-12 items-center">
                    {/* Left Column: Vertical Tabs */}
                    <div className="w-full md:w-1/3 lg:w-1/4 flex flex-col gap-2">
                        {tabs.map((tab) => (
                            <button
                                key={tab.value}
                                onClick={() => setActiveTab(tab.value)}
                                className={`flex items-center justify-center gap-3 w-full rounded-xl px-5 py-4 font-semibold transition-all duration-200
                  ${activeTab === tab.value
                                        ? "bg-gray-100 text-black shadow-sm"
                                        : "text-gray-400 hover:text-black hover:bg-gray-50"
                                    }`}
                            >
                                <span className={`${activeTab === tab.value ? "text-black" : "text-gray-400"}`}>
                                    {tab.icon}
                                </span>
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Right Column: Content Area */}
                    <div className="w-full md:w-2/3 lg:w-3/4 rounded-3xl bg-gray-50 p-6 lg:p-12 min-h-[500px] flex items-center">
                        {tabs.map((tab) => (
                            tab.value === activeTab && (
                                <div
                                    key={tab.value}
                                    className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 lg:gap-12 w-full animate-in fade-in zoom-in-95 duration-500"
                                >
                                    <div className="flex flex-col justify-center gap-3 md:gap-6 text-left">
                                        <Badge variant="outline" className="w-fit bg-white border-gray-200 uppercase tracking-wide text-[10px] md:text-xs">
                                            {tab.content.badge}
                                        </Badge>
                                        <h3 className="text-base md:text-3xl font-bold lg:text-4xl text-black leading-tight">
                                            {tab.content.title}
                                        </h3>
                                        <p className="text-gray-500 text-xs md:text-lg leading-relaxed">
                                            {tab.content.description}
                                        </p>
                                        <Link
                                            to={tab.productUrl}
                                            className="mt-2 md:mt-4 w-fit px-4 py-3 md:px-8 md:py-6 text-xs md:text-base bg-black text-white hover:bg-gray-800 rounded-full inline-flex items-center justify-center font-medium transition-colors"
                                            style={{ color: '#ffffff' }}
                                        >
                                            {tab.content.buttonText}
                                        </Link>
                                    </div>
                                    <div className="flex items-center justify-center">
                                        <img
                                            src={tab.content.imageSrc}
                                            alt={tab.content.imageAlt}
                                            className="rounded-2xl w-full h-auto object-cover shadow-xl aspect-[4/5]"
                                        />
                                    </div>
                                </div>
                            )
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
}
