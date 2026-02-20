import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";

const transition = {
    type: "spring",
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

export const MenuItem = ({
    setActive,
    active,
    item,
    children,
    href,
}) => {
    const content = (
        <motion.p
            transition={{ duration: 0.3 }}
            className="cursor-pointer text-black hover:opacity-[0.9]"
        >
            {item}
        </motion.p>
    );

    return (
        <div onMouseEnter={() => setActive(item)} className="relative ">
            {href ? (
                <Link to={href}>
                    {content}
                </Link>
            ) : (
                content
            )}
            {active !== null && (
                <motion.div
                    initial={{ opacity: 0, scale: 0.85, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    transition={transition}
                >
                    {active === item && (
                        <div className="absolute top-[calc(100%_+_1.2rem)] left-1/2 transform -translate-x-1/2 pt-4">
                            <motion.div
                                transition={transition}
                                layoutId="active" // layoutId ensures smooth animation
                                className="bg-white/80 backdrop-blur-md rounded-2xl overflow-hidden border border-stone-200 shadow-xl"
                            >
                                <motion.div
                                    layout // layout ensures smooth animation
                                    className="w-max h-full p-4"
                                >
                                    {children}
                                </motion.div>
                            </motion.div>
                        </div>
                    )}
                </motion.div>
            )}
        </div>
    );
};

export const Menu = ({
    setActive,
    children,
}) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)} // resets the state
            className="relative rounded-full border border-stone-200/50 bg-white/30 backdrop-blur-md shadow-sm 
                       flex justify-center items-center
                       space-x-2 md:space-x-4 
                       px-3 md:px-8 
                       py-2 md:py-4 
                       z-50
                       text-xs md:text-base"
        >
            {children}
        </nav>
    );
};

export const ProductItem = ({
    title,
    description,
    href,
    src,
}) => {
    return (
        <Link to={href} className="flex space-x-2">
            <img
                src={src}
                alt={title}
                className="flex-shrink-0 rounded-md shadow-2xl w-[140px] h-[70px] object-cover"
            />
            <div>
                <h4 className="text-xl font-bold mb-1 text-black">
                    {title}
                </h4>
                <p className="text-neutral-700 text-sm max-w-[10rem]">
                    {description}
                </p>
            </div>
        </Link>
    );
};

export const HoveredLink = ({ children, ...rest }) => {
    return (
        <Link
            {...rest}
            className="text-neutral-700 hover:text-black "
        >
            {children}
        </Link>
    );
};

export default function NavbarMenu() {
    const [active, setActive] = useState(null);
    return (
        <div className="flex items-center justify-center">
            <Menu setActive={setActive}>
                <Link to="/" className="text-black hover:opacity-90 text-xs md:text-base">Home</Link>
                <Link to="/products" className="text-black hover:opacity-90 text-xs md:text-base">Products</Link>
                <Link to="/about" className="text-black hover:opacity-90 text-xs md:text-base">About</Link>
            </Menu>
        </div>
    );
}
