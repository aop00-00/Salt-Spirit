import React from "react";
import { TestimonialsColumn } from "./TestimonialsColumn";
import { motion } from "framer-motion";

const testimonials = [
    {
        text: "Llevo 3 meses tomando Pure Blue después de entrenar y la diferencia es notable. Ya no me dan calambres y me recupero mucho más rápido.",
        name: "Carlos Mendoza",
        role: "Entrenador Personal",
    },
    {
        text: "El sabor de Vital Red es increíble. Lo tomo cada mañana y me da la energía que necesito sin ponerme nerviosa como el café.",
        name: "Ana Sofía Martínez",
        role: "Diseñadora Gráfica",
    },
    {
        text: "Hydra-Rest me ayudó a mejorar mi sueño. Antes me despertaba varias veces en la noche, ahora duermo de corrido.",
        name: "Roberto Sánchez",
        role: "Ingeniero de Software",
    },
    {
        text: "No puedo creer que algo sin azúcar sepa tan bien. Pure Blue es mi favorito absoluto, lo llevo a todas partes.",
        name: "Valeria Torres",
        role: "Nutrióloga",
    },
    {
        text: "Compré el Mix Pack para probar y terminé enganchada con todos. Cada uno tiene su momento perfecto del día.",
        name: "Diego Ramírez",
        role: "Fotógrafo",
    },
    {
        text: "Como runner, la hidratación es clave. Salt & Spirit es lo único que uso en mis entrenamientos largos. Funciona de verdad.",
        name: "Laura Hernández",
        role: "Maratonista",
    },
    {
        text: "El empaque es hermoso y la calidad del producto es premium. Se nota que cuidan cada detalle.",
        name: "Miguel Ángel Castro",
        role: "Arquitecto",
    },
    {
        text: "Dejé las bebidas energéticas comerciales por Vital Red. Me siento mejor, tengo más claridad mental y cero crashes.",
        name: "Daniela Ruiz",
        role: "Abogada",
    },
    {
        text: "Lo mejor es que toda mi familia lo puede tomar. Es saludable, sabe rico y realmente hidrata. Vale cada peso.",
        name: "Fernando Gutiérrez",
        role: "Chef",
    },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


const Testimonials = () => {
    return (
        <section className="bg-stone-50/50 my-20 relative overflow-hidden">
            <div className="container z-10 mx-auto px-4 py-20">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                    viewport={{ once: true }}
                    className="flex flex-col items-center text-center max-w-[640px] mx-auto mb-16"
                >
                    <div className="flex items-center justify-center gap-3 mb-6">
                        <div className="h-px w-8 bg-[#d97706]/30" />
                        <span className="text-[10px] tracking-[0.3em] uppercase text-[#d97706] font-bold">Testimonios</span>
                        <div className="h-px w-8 bg-[#d97706]/30" />
                    </div>

                    <h2 className="text-4xl md:text-6xl lg:text-7xl text-stone-900 leading-[1.05] mb-6 tracking-tight">
                        <span className="font-light">Lo que dicen</span>
                        <br />
                        <span className="font-bold">nuestros clientes</span>
                    </h2>

                    <div className="border-b-2 border-[#d97706]/20 pb-4 max-w-xl mx-auto">
                        <p className="text-stone-400 text-sm md:text-base leading-relaxed">
                            Miles de personas ya transformaron su hidratación con Salt & Spirit.
                        </p>
                    </div>
                </motion.div>

                <div className="flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_10%,black_90%,transparent)] h-[600px] overflow-hidden">
                    <TestimonialsColumn testimonials={firstColumn} duration={15} />
                    <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
                    <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
                </div>
            </div>
        </section>
    );
};

export default Testimonials;
