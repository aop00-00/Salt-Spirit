import { CartForm, Image } from '@shopify/hydrogen';
import { useVariantUrl } from '~/lib/variants';
import { Link } from 'react-router';
import { ProductPrice } from '~/components/Product/ProductPrice';
import { useAside } from '~/components/Layout/Aside';

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 * @param {{
 *   layout: CartLayout;
 *   line: CartLine;
 * }}
 */
export function CartLineItem({ layout, line }) {
  const { id, merchandise } = line;
  const { product, title, image, selectedOptions } = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const { close } = useAside();

  return (
    <li key={id} className="cart-line flex gap-4 py-4 border-b border-gray-100 last:border-0 relative group">
      {image && (
        <div className="shrink-0 aspect-square w-[90px] h-[90px] rounded-2xl overflow-hidden bg-gray-50 shadow-sm border border-gray-100">
          <Image
            alt={title}
            aspectRatio="1/1"
            data={image}
            height={100}
            loading="lazy"
            width={100}
            className="w-full h-full object-cover mix-blend-multiply"
          />
        </div>
      )}

      <div className="flex-1 flex flex-col justify-between py-1">
        <div>
          <div className="flex flex-col sm:flex-row sm:justify-between items-start gap-1 sm:gap-2">
            <Link
              prefetch="intent"
              to={lineItemUrl}
              onClick={() => {
                if (layout === 'aside') {
                  close();
                }
              }}
              className="font-bold text-base text-gray-900 leading-tight hover:underline decoration-1 underline-offset-2 pr-2"
            >
              {product.title}
            </Link>
            <ProductPrice price={line?.cost?.totalAmount} className="font-semibold text-sm text-gray-900 whitespace-nowrap mt-1 sm:mt-0" />
          </div>

          {selectedOptions.length > 0 && (
            <ul className="mt-1 space-y-1">
              {selectedOptions.map((option) => (
                <li key={option.name} className="text-xs text-gray-500 font-medium tracking-wide uppercase">
                  {option.name}: {option.value}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="flex items-center justify-between mt-3">
          <CartLineQuantity line={line} />
        </div>
      </div>
    </li>
  );
}

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 * @param {{line: CartLine}}
 */
function CartLineQuantity({ line }) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const { id: lineId, quantity, isOptimistic } = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="flex items-center gap-3">
      <div className="flex items-center border border-gray-200 rounded-full bg-white shadow-sm overflow-hidden h-8">
        <CartLineUpdateButton lines={[{ id: lineId, quantity: prevQuantity }]}>
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1 || !!isOptimistic}
            name="decrease-quantity"
            value={prevQuantity}
            className="w-8 h-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 text-gray-600"
          >
            <span>&#8722;</span>
          </button>
        </CartLineUpdateButton>

        <span className="w-8 text-center text-sm font-semibold text-gray-900 tabular-nums select-none">
          {quantity}
        </span>

        <CartLineUpdateButton lines={[{ id: lineId, quantity: nextQuantity }]}>
          <button
            aria-label="Increase quantity"
            name="increase-quantity"
            value={nextQuantity}
            disabled={!!isOptimistic}
            className="w-8 h-full flex items-center justify-center hover:bg-gray-50 transition-colors disabled:opacity-50 text-gray-600"
          >
            <span>&#43;</span>
          </button>
        </CartLineUpdateButton>
      </div>

      <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
    </div>
  );
}

/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 * @param {{
 *   lineIds: string[];
 *   disabled: boolean;
 * }}
 */
function CartLineRemoveButton({ lineIds, disabled }) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{ lineIds }}
    >
      <button disabled={disabled} type="submit" className="text-xs text-gray-400 underline hover:text-red-500 transition-colors">
        Remove
      </button>
    </CartForm>
  );
}

/**
 * @param {{
 *   children: React.ReactNode;
 *   lines: CartLineUpdateInput[];
 * }}
 */
function CartLineUpdateButton({ children, lines }) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{ lines }}
    >
      {children}
    </CartForm>
  );
}

/**
 * Returns a unique key for the update action. This is used to make sure actions modifying the same line
 * items are not run concurrently, but cancel each other. For example, if the user clicks "Increase quantity"
 * and "Decrease quantity" in rapid succession, the actions will cancel each other and only the last one will run.
 * @returns
 * @param {string[]} lineIds - line ids affected by the update
 */
function getUpdateKey(lineIds) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}

/** @typedef {OptimisticCartLine<CartApiQueryFragment>} CartLine */

/** @typedef {import('@shopify/hydrogen/storefront-api-types').CartLineUpdateInput} CartLineUpdateInput */
/** @typedef {import('~/components/CartMain').CartLayout} CartLayout */
/** @typedef {import('@shopify/hydrogen').OptimisticCartLine} OptimisticCartLine */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
