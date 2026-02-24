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
    <li key={id} className="cart-line flex gap-4 py-4 relative group">
      {image && (
        <div className="shrink-0 aspect-square w-[100px] h-[100px] rounded-[1.5rem] overflow-hidden bg-gray-100 p-2">
          <Image
            alt={title}
            aspectRatio="1/1"
            data={image}
            height={100}
            loading="lazy"
            width={100}
            className="w-full h-full object-contain mix-blend-multiply"
          />
        </div>
      )}

      <div className="flex-1 flex flex-col justify-between py-1">
        <div className="flex justify-between items-start">
          <Link
            prefetch="intent"
            to={lineItemUrl}
            onClick={() => {
              if (layout === 'aside') {
                close();
              }
            }}
            className="font-medium text-[15px] text-gray-400 leading-[1.2] hover:underline decoration-1 underline-offset-2 pr-8"
          >
            {product.title}
          </Link>

          <div className="absolute right-0 top-6">
            <CartLineRemoveButton lineIds={[id]} disabled={!!line.isOptimistic} />
          </div>
        </div>

        {selectedOptions.length > 0 && selectedOptions[0].value !== 'Default Title' && (
          <ul className="mt-1 space-y-1">
            {selectedOptions.map((option) => (
              <li key={option.name} className="text-[11px] text-gray-400 font-medium tracking-wide">
                {option.name}: {option.value}
              </li>
            ))}
          </ul>
        )}

        <div className="flex items-end justify-between mt-auto pt-2">
          <ProductPrice price={line?.cost?.totalAmount} className="font-extrabold text-[#111] text-lg tracking-tight" />
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
      <div className="flex items-center bg-gray-100/80 rounded-full p-1 gap-1">
        <CartLineUpdateButton lines={[{ id: lineId, quantity: prevQuantity }]}>
          <button
            aria-label="Decrease quantity"
            disabled={quantity <= 1 || !!isOptimistic}
            name="decrease-quantity"
            value={prevQuantity}
            className="w-7 h-7 flex items-center justify-center hover:bg-gray-200 rounded-full transition-colors disabled:opacity-50 text-[#1ab75a] font-bold text-lg"
          >
            <span className="mb-0.5">&#8722;</span>
          </button>
        </CartLineUpdateButton>

        <span className="w-6 text-center text-sm font-bold text-[#111] tabular-nums select-none">
          {quantity}
        </span>

        <CartLineUpdateButton lines={[{ id: lineId, quantity: nextQuantity }]}>
          <button
            aria-label="Increase quantity"
            name="increase-quantity"
            value={nextQuantity}
            disabled={!!isOptimistic}
            className="w-7 h-7 bg-[#1ab75a] text-white rounded-full flex items-center justify-center hover:bg-[#159a4c] transition-colors disabled:opacity-50 font-bold text-lg"
          >
            <span className="mb-0.5">&#43;</span>
          </button>
        </CartLineUpdateButton>
      </div>
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
      <button disabled={disabled} type="submit" className="text-red-500 hover:text-red-600 transition-colors p-1">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /><line x1="10" x2="10" y1="11" y2="17" /><line x1="14" x2="14" y1="11" y2="17" /></svg>
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
