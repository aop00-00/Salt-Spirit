import { useOptimisticCart } from '@shopify/hydrogen';
import { Link } from 'react-router';
import { useAside } from '~/components/Layout/Aside';
import { CartLineItem } from '~/components/Cart/CartLineItem';
import { CartSummary } from './CartSummary';

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 * @param {CartMainProps}
 */
export function CartMain({ layout, cart: originalCart }) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;

  return (
    <div className={`${className} h-full flex flex-col bg-white w-full max-w-[100vw] overflow-x-hidden`}>
      <CartEmpty hidden={linesCount} layout={layout} />
      <div className="cart-details flex flex-col h-full w-full overflow-hidden">
        <div aria-labelledby="cart-lines" className="flex-1 overflow-y-auto custom-scrollbar px-4 md:px-6 py-4 w-full">
          <ul className="space-y-6 w-full">
            {(cart?.lines?.nodes ?? []).map((line) => (
              <CartLineItem key={line.id} line={line} layout={layout} />
            ))}
          </ul>
        </div>
        {cartHasItems && <CartSummary cart={cart} layout={layout} />}
      </div>
    </div>
  );
}

/**
 * @param {{
 *   hidden: boolean;
 *   layout?: CartMainProps['layout'];
 * }}
 */
function CartEmpty({ hidden = false }) {
  const { close } = useAside();
  return (
    <div hidden={hidden} className="px-6 py-12 text-center">
      <div className="max-w-md mx-auto space-y-4">
        <h3 className="text-2xl font-bold text-[#1D1E20]">
          Tu ritual perfecto te espera
        </h3>
        <p className="text-gray-600 text-lg">
          Energía, Enfoque y Descanso. Elige tu fórmula y empieza a optimizar cada hora de tu día.
        </p>
      </div>
    </div>
  );
}

/** @typedef {'page' | 'aside'} CartLayout */
/**
 * @typedef {{
 *   cart: CartApiQueryFragment | null;
 *   layout: CartLayout;
 * }} CartMainProps
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
