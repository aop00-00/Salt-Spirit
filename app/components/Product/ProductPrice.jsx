import { Money } from '@shopify/hydrogen';

/**
 * @param {{
 *   price?: MoneyV2;
 *   compareAtPrice?: MoneyV2 | null;
 * }}
 */
export function ProductPrice({ price, compareAtPrice }) {
  return (
    <div className="product-price inline-flex items-baseline gap-3">
      {price && <Money data={price} />}
      {compareAtPrice && (
        <s className="text-xl text-gray-400">
          <Money data={compareAtPrice} />
        </s>
      )}
    </div>
  );
}

/** @typedef {import('@shopify/hydrogen/storefront-api-types').MoneyV2} MoneyV2 */
