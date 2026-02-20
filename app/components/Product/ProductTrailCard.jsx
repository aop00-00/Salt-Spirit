
import * as React from "react";
import { motion } from "framer-motion";
import { ArrowRight, ShoppingBag, Plus } from "lucide-react";
import { Link } from "react-router";
import { cn } from "~/lib/utils";
import { Image, Money } from '@shopify/hydrogen';

// Placeholder Button component if not strictly using shadcn
const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? "span" : "button"
    return (
        <Comp
            className={cn(
                "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
                "bg-secondary text-secondary-foreground hover:bg-secondary/80", // Simplified secondary variant
                "h-10 px-4 py-2",
                className
            )}
            ref={ref}
            {...props}
        />
    )
})
Button.displayName = "Button"

const StatItem = ({ label, value }) => (
    <div className="flex flex-col">
        <span className="text-sm font-semibold text-foreground">{value}</span>
        <span className="text-xs text-muted-foreground">{label}</span>
    </div>
);

export const ProductTrailCard = React.forwardRef(
    (
        {
            className,
            product,
            onDirectionsClick,
            onAddToCombo,
            ...props
        },
        ref
    ) => {
        // Map product data to 'trail' compatible fields or new relevant fields
        const title = product.title;
        const location = product.productType || "Wellness";
        const difficulty = product.availableForSale ? "In Stock" : "Out of Stock";
        const creators = product.vendor;
        const price = product.priceRange?.minVariantPrice;

        // Arbitrary stats for demo matching the requested layout
        const distance = "Standard";
        const elevation = "Premium";
        const duration = "Fast";

        const imageUrl = product.featuredImage?.url;

        return (
            <motion.div
                ref={ref}
                className={cn(
                    "w-full max-w-sm overflow-hidden rounded-2xl bg-white text-black shadow-lg mx-auto",
                    className
                )}
                whileHover={{ y: -5, scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                {...props}
            >
                {/* Top section */}
                <div className="relative h-60 w-full">
                    {imageUrl ? (
                        <Image
                            data={product.featuredImage}
                            alt={title}
                            className="h-full w-full object-cover"
                            sizes="(min-width: 45em) 400px, 100vw"
                        />
                    ) : (
                        <div className="h-full w-full bg-gray-200" />
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute bottom-0 left-0 flex w-full items-end justify-between p-4">
                        <div className="text-white">
                            <h3 className="text-xl font-bold">{title}</h3>
                            <p className="text-sm text-white/90">{location}</p>
                        </div>


                    </div>
                </div>

                {/* Bottom section */}
                <div className="p-5">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-bold text-foreground">{difficulty}</p>
                            <p className="text-xs text-muted-foreground">{creators}</p>
                        </div>
                        {/* Price as the "map" element or similar prominent feature */}
                        <div className="h-10 px-3 flex items-center justify-center bg-gray-100 rounded-md font-bold">
                            {price && <Money data={price} />}
                        </div>
                    </div>
                    <div className="my-4 h-px w-full bg-gray-200" />
                    <div className="flex justify-between">
                        <StatItem label="Quality" value={distance} />
                        <StatItem label="Grade" value={elevation} />
                        <StatItem label="Shipping" value={duration} />
                    </div>

                    <div className="mt-6 flex gap-3">
                        <Button
                            variant="secondary" // Keep secondary or change to outline/ghost as per design
                            className="bg-gray-100 text-black hover:bg-gray-200 cursor-pointer flex-1 gap-2"
                            onClick={(e) => {
                                e.preventDefault();
                                // TODO: Add to cart logic
                                console.log("Add to cart");
                            }}
                        >
                            <ShoppingBag className="w-4 h-4" />
                            Add to Cart
                        </Button>
                        <Button
                            className="bg-black text-white hover:bg-gray-800 cursor-pointer flex-1 gap-2"
                            onClick={(e) => {
                                e.preventDefault();
                                if (onAddToCombo) {
                                    onAddToCombo(product);
                                }
                            }}
                        >
                            <Plus className="w-4 h-4" />
                            Combo
                        </Button>
                    </div>
                </div>
            </motion.div>
        );
    }
);

ProductTrailCard.displayName = "ProductTrailCard";
