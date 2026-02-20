import { CartForm, Money } from '@shopify/hydrogen';
import { useEffect, useRef } from 'react';
import { useFetcher } from 'react-router';

/**
 * @param {CartSummaryProps}
 */
export function CartSummary({ cart, layout }) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';

  return (
    <div aria-labelledby="cart-summary" className={`${className} border-t border-gray-100 bg-white px-6 py-6 pb-safe safe-area-bottom`}>
      <h4 className="sr-only">Totals</h4>
      <dl className="cart-subtotal mb-4 flex items-center justify-between text-base">
        <dt className="text-gray-500 font-medium">Subtotal</dt>
        <dd className="font-bold text-gray-900 tracking-tight">
          {cart?.cost?.subtotalAmount?.amount ? (
            <Money data={cart?.cost?.subtotalAmount} />
          ) : (
            '-'
          )}
        </dd>
      </dl>
      <CartDiscounts discountCodes={cart?.discountCodes} />
      <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} />
    </div>
  );
}

/**
 * @param {{checkoutUrl?: string}}
 */
function CartCheckoutActions({ checkoutUrl }) {
  if (!checkoutUrl) return null;

  return (
    <div className="mt-6">
      <a
        href={checkoutUrl}
        target="_self"
        className="flex items-center justify-center w-full rounded-full bg-[#1a1a1a] py-4 px-6 text-center !text-white !font-bold text-lg hover:bg-black hover:scale-[1.02] transition-all shadow-xl"
      >
        Continue to Checkout &rarr;
      </a>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes?: CartApiQueryFragment['discountCodes'];
 * }}
 */
function CartDiscounts({ discountCodes }) {
  const codes =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({ code }) => code) || [];

  return (
    <div className="mb-4">
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length} className="mb-2">
        <div className="flex items-center justify-between bg-green-50 px-3 py-2 rounded-lg border border-green-100">
          <dt className="text-green-800 text-sm font-medium">Discount</dt>
          <UpdateDiscountForm>
            <div className="cart-discount flex items-center gap-2">
              <code className="text-xs font-mono text-green-700 bg-white px-1.5 py-0.5 rounded border border-green-200">{codes?.join(', ')}</code>
              <button aria-label="Remove discount" className="text-green-600 hover:text-green-800">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div className="flex gap-2">
          <input
            type="text"
            name="discountCode"
            placeholder="Discount code"
            className="flex-1 rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none transition-all"
          />
          <button type="submit" className="rounded-lg bg-gray-900 text-white px-4 text-sm font-medium hover:bg-gray-800 transition-colors">Apply</button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

/**
 * @param {{
 *   discountCodes?: string[];
 *   children: React.ReactNode;
 * }}
 */
function UpdateDiscountForm({ discountCodes, children }) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

/**
 * @typedef {{
 *   cart: OptimisticCart<CartApiQueryFragment | null>;
 *   layout: CartLayout;
 * }} CartSummaryProps
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('~/components/Cart/CartMain').CartLayout} CartLayout */
/** @typedef {import('@shopify/hydrogen').OptimisticCart} OptimisticCart */
/** @typedef {import('react-router').FetcherWithComponents} FetcherWithComponents */
