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
    <div aria-labelledby="cart-summary" className={`${className} bg-white px-6 py-6 pb-safe safe-area-bottom`}>
      <h4 className="sr-only">Totals</h4>

      <CartDiscounts discountCodes={cart?.discountCodes} />

      <div className="space-y-3 mb-6">
        <dl className="flex items-center justify-between text-sm">
          <dt className="text-[#111] font-bold">Sub Total</dt>
          <dd className="font-bold text-[#111]">
            {cart?.cost?.subtotalAmount?.amount ? (
              <Money data={cart?.cost?.subtotalAmount} />
            ) : (
              '-'
            )}
          </dd>
        </dl>
        <dl className="flex items-center justify-between text-sm">
          <dt className="text-[#111] font-bold">Delivery Fee</dt>
          <dd className="font-bold text-[#111]">$15.00</dd>
        </dl>
        {cart?.discountCodes && cart?.discountCodes.length > 0 && (
          <dl className="flex items-center justify-between text-sm">
            <dt className="text-[#111] font-bold">Discount</dt>
            <dd className="font-bold text-[#1ab75a]">
              - <Money data={cart?.cost?.totalDutyAmount} />
            </dd>
          </dl>
        )}
      </div>

      <div className="border-t border-dashed border-gray-200 my-4" />

      <dl className="flex items-center justify-between text-base mb-6">
        <dt className="text-[#111] font-bold">Total</dt>
        <dd className="font-extrabold text-[#111] text-2xl tracking-tight">
          {cart?.cost?.totalAmount?.amount ? (
            <Money data={cart?.cost?.totalAmount} />
          ) : (
            '-'
          )}
        </dd>
      </dl>

      <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} cart={cart} />
    </div>
  );
}

/**
 * @param {{checkoutUrl?: string, cart?: any}}
 */
function CartCheckoutActions({ checkoutUrl, cart }) {
  if (!checkoutUrl) return null;

  const handleCheckoutClick = () => {
    if (typeof window !== 'undefined' && window.fbq) {
      const value = parseFloat(cart?.cost?.totalAmount?.amount || 0);
      const currency = cart?.cost?.totalAmount?.currencyCode || 'MXN';
      window.fbq('track', 'InitiateCheckout', {
        value,
        currency,
      });
    }
  };

  return (
    <div className="mt-2">
      <a
        href={checkoutUrl}
        target="_self"
        onClick={handleCheckoutClick}
        className="flex items-center justify-center w-full rounded-full bg-[#1ab75a] py-4 px-6 text-center text-white font-bold text-[17px] hover:bg-[#159a4c] hover:scale-[1.01] transition-all active:scale-[0.98]"
      >
        Checkout
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
    <div className="mb-6">
      <p className="text-[13px] text-gray-400 mb-3 tracking-wide">Have a coupon code?</p>
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length} className="mb-2">
        <div className="flex items-center justify-between bg-white px-4 py-3 rounded-full border border-[#1ab75a]">
          <UpdateDiscountForm>
            <div className="cart-discount flex items-center justify-between w-full">
              <code className="text-[13px] font-bold text-[#111] bg-transparent outline-none">{codes?.join(', ')}</code>
              <div className="flex items-center gap-2">
                <span className="text-[#1ab75a] text-xs font-bold">Available</span>
                <button aria-label="Remove discount" className="bg-[#1ab75a] rounded-full p-0.5 text-white hover:bg-[#159a4c]">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check"><path d="M20 6 9 17l-5-5" /></svg>
                </button>
              </div>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div hidden={codes.length > 0} className="flex gap-2">
          <input
            type="text"
            name="discountCode"
            placeholder="Discount code"
            className="flex-1 rounded-full border border-gray-200 bg-white px-4 py-3 text-sm focus:border-[#1ab75a] focus:ring-1 focus:ring-[#1ab75a] outline-none transition-all font-bold text-[#111]"
          />
          <button type="submit" className="rounded-full bg-gray-100 text-[#111] px-5 text-sm font-bold hover:bg-gray-200 transition-colors">Apply</button>
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
