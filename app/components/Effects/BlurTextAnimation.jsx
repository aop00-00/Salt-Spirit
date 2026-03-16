/* eslint-disable react/prop-types */
import React, { useEffect, useRef, useState, useMemo } from "react";

export default function BlurTextAnimation({
    text = "HYDRATE YOUR SPIRIT",
    words,
    className = "",
    textColor = "#000",
    animationDelay = 6000
}) {
    const [isAnimating, setIsAnimating] = useState(false);
    const [hasAnimated, setHasAnimated] = useState(false);
    const containerRef = useRef(null);
    const animationTimeoutRef = useRef();

    const visible = isAnimating || hasAnimated;

    const textWords = useMemo(() => {
        if (words) return words;

        const splitWords = text.split(" ");
        const totalWords = splitWords.length;

        return splitWords.map((word, index) => {
            const progress = index / totalWords;
            const exponentialDelay = Math.pow(progress, 0.8) * 0.5;
            const baseDelay = index * 0.06;
            const microVariation = (Math.random() - 0.5) * 0.05;

            return {
                text: word,
                duration: 2.2 + Math.cos(index * 0.3) * 0.3,
                delay: baseDelay + exponentialDelay + microVariation,
                blur: 12 + Math.floor(Math.random() * 8),
                scale: 0.9 + Math.sin(index * 0.2) * 0.05
            };
        });
    }, [text, words]);

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        setTimeout(() => setIsAnimating(true), 200);

                        let maxTime = 0;
                        textWords.forEach(word => {
                            maxTime = Math.max(maxTime, word.delay + word.duration);
                        });

                        animationTimeoutRef.current = setTimeout(() => {
                            setHasAnimated(true);
                            setIsAnimating(false);
                        }, (maxTime + 1) * 1000);
                    }
                });
            },
            { threshold: 0.3 }
        );

        observer.observe(el);

        return () => {
            if (animationTimeoutRef.current) clearTimeout(animationTimeoutRef.current);
            observer.unobserve(el);
        };
    }, [textWords, hasAnimated]);

    return (
        <div
            ref={containerRef}
            className={`flex items-center justify-center min-h-screen ${className}`}
        >
            <div style={{ textAlign: 'center', width: '100%', padding: '0 5vw' }}>
                <p
                    style={{
                        color: textColor,
                        fontSize: 'clamp(3rem, 10vw, 12rem)',
                        fontFamily: "'Avenir Next', 'Avenir', system-ui, sans-serif",
                        fontWeight: 700,
                        lineHeight: 1.1,
                        letterSpacing: '0.04em',
                        margin: 0,
                    }}
                >
                    {textWords.map((word, index) => (
                        <span
                            key={index}
                            style={{
                                display: 'inline-block',
                                opacity: visible ? 1 : 0,
                                transitionProperty: 'opacity, filter, transform',
                                transitionDuration: `${word.duration}s`,
                                transitionDelay: hasAnimated ? '0s' : `${word.delay}s`,
                                transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
                                filter: visible
                                    ? 'blur(0px) brightness(1)'
                                    : `blur(${word.blur}px) brightness(0.6)`,
                                transform: visible
                                    ? 'translateY(0) scale(1) rotateX(0deg)'
                                    : `translateY(20px) scale(${word.scale || 1}) rotateX(-15deg)`,
                                marginRight: '0.3em',
                                willChange: 'filter, transform, opacity',
                                transformStyle: 'preserve-3d',
                                backfaceVisibility: 'hidden',
                            }}
                        >
                            {word.text}
                        </span>
                    ))}
                </p>
            </div>
        </div>
    );
}
