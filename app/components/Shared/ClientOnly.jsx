import { useState, useEffect } from 'react';

/**
 * Render children only on the client side to avoid SSR issues.
 * @param {{children: React.ReactNode, fallback?: React.ReactNode}} props
 */
export function ClientOnly({ children, fallback = null }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return mounted ? children : fallback;
}
