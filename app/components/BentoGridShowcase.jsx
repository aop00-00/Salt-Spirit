import React from "react";
import { motion } from "framer-motion";
import { cn } from "~/lib/utils";

// Animation variants for the container to stagger children
const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.1,
        },
    },
};

// Animation variants for each grid item
const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 10,
        },
    },
};

/**
 * A responsive, animated 3-column bento grid layout component.
 */
export const BentoGridShowcase = ({
    integrations,
    featureTags,
    mainFeature,
    secondaryFeature,
    statistic,
    journey,
    className,
}) => {
    return (
        <motion.section
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className={cn(
                // Core grid layout: 1 col on mobile, 2 on tablet, 3 on desktop
                "grid w-full grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 md:grid-cols-3",
                // Defines 3 explicit rows on medium screens and up
                "md:grid-rows-3",
                // Use minmax to ensure cards can grow but have a minimum height
                "auto-rows-[minmax(180px,auto)] md:auto-rows-[minmax(200px,auto)]",
                className
            )}
        >
            {/* Slot 1: Integrations (1,1) */}
            <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
                {integrations}
            </motion.div>

            {/* Slot 2: Main Feature (1,2) - Spans 3 rows */}
            <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-3">
                {mainFeature}
            </motion.div>

            {/* Slot 3: Feature Tags (1,3) */}
            <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
                {featureTags}
            </motion.div>

            {/* Slot 4: Secondary Feature (2,1) */}
            <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
                {secondaryFeature}
            </motion.div>

            {/* Slot 5: Statistic (2,3) - Spans 2 rows */}
            <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-2">
                {statistic}
            </motion.div>

            {/* Slot 6: Journey (3,1) */}
            <motion.div variants={itemVariants} className="md:col-span-1 md:row-span-1">
                {journey}
            </motion.div>
        </motion.section>
    );
};
