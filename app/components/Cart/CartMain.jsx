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
        <div aria-labelledby="cart-lines" className="flex-1 overflow-y-auto custom-scrollbar px-6 py-6 w-full">
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
    <div hidden={hidden} className="px-6 py-16 text-center flex flex-col items-center justify-center h-[60vh]">
      <div className="max-w-md mx-auto space-y-6 flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" /><path d="M3 6h18" /><path d="M16 10a4 4 0 0 1-8 0" /></svg>
        </div>
        <h3 className="text-2xl font-bold text-gray-900 tracking-tight">
          Tu carrito está vacío
        </h3>
        <p className="text-gray-500 text-base leading-relaxed">
          Energía, Enfoque y Descanso. Elige tu fórmula y empieza a optimizar cada hora de tu día.
        </p>
        <button onClick={close} className="mt-4 px-8 py-3 bg-black text-white hover:bg-gray-800 transition-colors rounded-full font-medium shadow-md">
          Continuar Explorando
        </button>
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
