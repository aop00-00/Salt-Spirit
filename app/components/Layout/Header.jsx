import { Suspense, useState } from 'react';
import { Await, NavLink, useAsyncValue } from 'react-router';
import { useAnalytics, useOptimisticCart } from '@shopify/hydrogen';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useAside } from '~/components/Layout/Aside';
import { IMAGE_ASSETS } from '~/lib/imagePaths';
import { Search, ShoppingBag, Menu } from 'lucide-react';

/**
 * @param {HeaderProps}
 */
export function Header({ header, cart }) {
  const { shop } = header;
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const glassButtonClassName =
    'inline-flex h-[2.65rem] w-[2.65rem] items-center justify-center rounded-full border border-white/45 bg-white/30 text-[var(--color-dark)] shadow-[0_12px_30px_rgba(29,30,32,0.12),inset_0_1px_0_rgba(255,255,255,0.58)] backdrop-blur-xl backdrop-saturate-150 transition duration-200 hover:-translate-y-px hover:border-white/60 hover:bg-white/42';

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: '-100%' },
      }}
      animate={hidden ? 'hidden' : 'visible'}
      transition={{ duration: 0.35, ease: 'easeInOut' }}
      className="fixed left-0 top-0 z-50 w-full p-3 md:p-4"
    >
      <div className="relative mx-auto flex min-h-[68px] w-full max-w-[1280px] items-center justify-between gap-4 overflow-hidden rounded-[1.5rem] border border-white/40 bg-[linear-gradient(135deg,rgba(255,255,255,0.34),rgba(255,255,255,0.12))] px-4 py-3 shadow-[0_24px_70px_rgba(29,30,32,0.12),inset_0_1px_0_rgba(255,255,255,0.7)] backdrop-blur-2xl backdrop-saturate-150 before:pointer-events-none before:absolute before:inset-[1px] before:rounded-[calc(1.5rem-1px)] before:bg-[linear-gradient(135deg,rgba(255,255,255,0.28),rgba(255,255,255,0.06)_45%,rgba(255,255,255,0.16))] before:opacity-90 md:min-h-[72px] md:rounded-full md:px-5 md:before:rounded-[calc(9999px-1px)]">
        <NavLink
          prefetch="intent"
          to="/"
          end
          className="relative z-10 inline-flex min-w-0 shrink-0 items-center gap-3 no-underline"
        >
          <img
            src={IMAGE_ASSETS.branding.logo.avif}
            alt={shop.name}
            className="h-10 w-auto object-contain px-3 py-2 md:h-11"
          />
        </NavLink>

        <HeaderMenu
          viewport="desktop"
        />

        <div className="relative z-10 flex shrink-0 items-center justify-end gap-2.5">
          <HeaderCtas cart={cart} glassButtonClassName={glassButtonClassName} />
          <HeaderMenuMobileToggle />
        </div>
      </div>
    </motion.header>
  );
}

/**
 * @param {{
 *   menu: HeaderProps['header']['menu'];
 *   primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
 *   viewport: Viewport;
 *   publicStoreDomain: HeaderProps['publicStoreDomain'];
 * }}
 */
export function HeaderMenu({
  viewport,
}) {
  const { close } = useAside();
  const navClassName =
    viewport === 'desktop'
      ? 'relative z-10 hidden items-center justify-center gap-1 rounded-full border border-white/40 bg-white/20 p-1 shadow-[0_14px_30px_rgba(29,30,32,0.08),inset_0_1px_0_rgba(255,255,255,0.55)] backdrop-blur-xl backdrop-saturate-150 md:flex'
      : 'flex flex-col gap-3';

  return (
    <nav className={navClassName} role="navigation">
      {FALLBACK_HEADER_MENU.items.map((item) => (
        <NavLink
          end
          key={item.id}
          onClick={close}
          prefetch="intent"
          className={({ isActive }) =>
            [
              'rounded-full font-bold uppercase tracking-[0.12em] no-underline transition duration-200',
              viewport === 'desktop'
                ? 'px-4 py-3 text-[0.82rem]'
                : 'border border-black/10 px-4 py-4 text-[0.82rem]',
              isActive
                ? 'border border-white/50 bg-white/75 text-[var(--color-dark)] shadow-[0_12px_24px_rgba(29,30,32,0.12)]'
                : 'text-black/65 hover:-translate-y-px hover:bg-white/35 hover:text-[var(--color-dark)]',
            ].join(' ')
          }
          to={item.url}
        >
          {item.title}
        </NavLink>
      ))}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'> & {glassButtonClassName: string}}
 */
function HeaderCtas({ cart, glassButtonClassName }) {
  return (
    <nav className="flex items-center gap-2.5" role="navigation">
      <SearchToggle glassButtonClassName={glassButtonClassName} />
      <CartToggle cart={cart} glassButtonClassName={glassButtonClassName} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const { open } = useAside();
  return (
    <button
      aria-label="Open menu"
      className="reset inline-flex h-[2.65rem] w-[2.65rem] items-center justify-center rounded-full border border-white/45 bg-white/30 text-[var(--color-dark)] shadow-[0_12px_30px_rgba(29,30,32,0.12),inset_0_1px_0_rgba(255,255,255,0.58)] backdrop-blur-xl backdrop-saturate-150 transition duration-200 hover:-translate-y-px hover:border-white/60 hover:bg-white/42 md:hidden"
      onClick={() => open('mobile')}
    >
      <Menu size={18} />
    </button>
  );
}

function SearchToggle({ glassButtonClassName }) {
  const { open } = useAside();
  return (
    <button
      aria-label="Open search"
      className={`reset ${glassButtonClassName}`}
      onClick={() => open('search')}
    >
      <Search size={18} />
    </button>
  );
}

/**
 * @param {{count: number | null, glassButtonClassName: string}}
 */
function CartBadge({ count, glassButtonClassName }) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();

  return (
    <a
      href="/cart"
      aria-label="Open cart"
      className={`relative ${glassButtonClassName} no-underline`}
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        });
      }}
    >
      <ShoppingBag size={18} />
      {count > 0 && (
        <span className="absolute -right-[0.15rem] -top-[0.1rem] inline-flex min-w-[1.1rem] items-center justify-center rounded-full bg-[var(--color-red)] px-[0.2rem] text-[0.65rem] font-extrabold text-[var(--color-light)]">
          {count}
        </span>
      )}
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'> & {glassButtonClassName: string}}
 */
function CartToggle({ cart, glassButtonClassName }) {
  return (
    <Suspense fallback={<CartBadge count={null} glassButtonClassName={glassButtonClassName} />}>
      <Await resolve={cart}>
        <CartBanner glassButtonClassName={glassButtonClassName} />
      </Await>
    </Suspense>
  );
}

function CartBanner({ glassButtonClassName }) {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} glassButtonClassName={glassButtonClassName} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://local-menu-item-1',
      resourceId: null,
      tags: [],
      title: 'Home',
      type: 'HTTP',
      url: '/',
      items: [],
    },
    {
      id: 'gid://local-menu-item-2',
      resourceId: null,
      tags: [],
      title: 'Products',
      type: 'HTTP',
      url: '/products',
      items: [],
    },
    {
      id: 'gid://local-menu-item-3',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/about',
      items: [],
    },
  ],
};

/** @typedef {'desktop' | 'mobile'} Viewport */
/**
 * @typedef {Object} HeaderProps
 * @property {HeaderQuery} header
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 */

/** @typedef {import('@shopify/hydrogen').CartViewPayload} CartViewPayload */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
