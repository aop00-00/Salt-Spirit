import { CartForm } from '@shopify/hydrogen';

/**
 * @param {{
 *   analytics?: unknown;
 *   children: React.ReactNode;
 *   disabled?: boolean;
 *   lines: Array<OptimisticCartLineInput>;
 *   onClick?: () => void;
 * }}
 */
export function AddToCartButton({
  analytics,
  children,
  disabled,
  lines,
  onClick,
  className = '',
}) {
  const handleMetaPixelEvent = (e) => {
    // Call the original onClick if it was passed
    if (onClick) onClick(e);

    // Trigger Meta Pixel AddToCart event
    if (typeof window !== 'undefined' && window.fbq) {
      const productTitle = lines?.[0]?.merchandise?.product?.title || 'Producto';
      window.fbq('track', 'AddToCart', {
        content_name: productTitle,
        content_type: 'product',
        // Optional: you can extract price from lines?.[0]?.merchandise?.price
      });
    }
  };

  return (
    <CartForm route="/cart" inputs={{ lines }} action={CartForm.ACTIONS.LinesAdd}>
      {(fetcher) => (
        <>
          <input
            name="analytics"
            type="hidden"
            value={JSON.stringify(analytics)}
          />
          <button
            type="submit"
            className={className}
            onClick={handleMetaPixelEvent}
            disabled={disabled ?? fetcher.state !== 'idle'}
          >
            {children}
          </button>
        </>
      )}
    </CartForm>
  );
}

/** @typedef {import('react-router').FetcherWithComponents} FetcherWithComponents */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLineInput} OptimisticCartLineInput */
