import React from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

export const TestimonialsColumn = ({ testimonials, className, duration = 10 }) => (
    <div className={cn("relative h-full w-full overflow-hidden", className)}>
        <motion.div
            animate={{
                y: ["0%", "-50%"],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
            }}
            className="flex flex-col gap-6 pb-6"
        >
            {[...testimonials, ...testimonials].map((testimonial, index) => (
                <div key={index} className="p-6 rounded-2xl bg-white border border-stone-100 shadow-sm hover:shadow-md transition-shadow">
                    <p className="text-stone-600 mb-4 leading-relaxed">"{testimonial.text}"</p>
                    <div className="flex items-center gap-3">
                        <div>
                            <h4 className="font-semibold text-stone-900 text-sm">{testimonial.name}</h4>
                            <p className="text-xs text-stone-400">{testimonial.role}</p>
                        </div>
                    </div>
                </div>
            ))}
        </motion.div>
    </div>
);
