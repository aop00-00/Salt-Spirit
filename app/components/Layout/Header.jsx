import { Suspense, useState } from 'react';
import { Await, NavLink, useAsyncValue } from 'react-router';
import { useAnalytics, useOptimisticCart } from '@shopify/hydrogen';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useAside } from '~/components/Layout/Aside';
import NavbarMenu from '~/components/Layout/NavbarMenu';
import { User, Search, ShoppingBag, Menu } from 'lucide-react';

/**
 * @param {HeaderProps}
 */
export function Header({ header, isLoggedIn, cart, publicStoreDomain }) {
  const { shop, menu } = header;
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setHidden(true); // scrolling down
    } else {
      setHidden(false); // scrolling up
    }
  });

  return (
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className="header fixed top-0 w-full z-50 bg-transparent/80 backdrop-blur-md"
    >
      <div className="relative w-full flex items-center justify-between px-6 md:px-12 py-4">
        {/* Logo - Pinned Left */}
        <NavLink prefetch="intent" to="/" style={activeLinkStyle} end className="z-50 shrink-0">
          <img src="/logo.png.png" alt={shop.name} className="h-8 w-auto object-contain" />
        </NavLink>

        {/* Menu - Absolute Center (Hidden on Mobile) */}
        <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50">
          <NavbarMenu />
        </div>

        {/* Icons - Pinned Right */}
        <div className="flex items-center gap-4 md:gap-6 z-50 ml-auto bg-white/50 backdrop-blur-md rounded-full px-4 py-2 border border-white/20 shadow-sm">
          <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
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
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}) {
  const className = `header-menu-${viewport}`;
  const { close } = useAside();

  return (
    <nav className={className} role="navigation">
      {(FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // if the url is internal, we strip the domain
        const url =
          item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        return (
          <NavLink
            className="header-menu-item"
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            style={activeLinkStyle}
            to={url}
          >
            {item.title}
          </NavLink>
        );
      })}
    </nav>
  );
}

/**
 * @param {Pick<HeaderProps, 'isLoggedIn' | 'cart'>}
 */
function HeaderCtas({ isLoggedIn, cart }) {
  return (
    <nav className="flex items-center gap-4" role="navigation">
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const { open } = useAside();
  return (
    <button
      className="header-menu-mobile-toggle reset p-2"
      onClick={() => open('mobile')}
    >
      <Menu size={24} />
    </button>
  );
}

function SearchToggle() {
  const { open } = useAside();
  return (
    <button className="reset p-1 hover:opacity-75 transition-opacity" onClick={() => open('search')}>
      <Search size={20} />
    </button>
  );
}

/**
 * @param {{count: number | null}}
 */
function CartBadge({ count }) {
  const { open } = useAside();
  const { publish, shop, cart, prevCart } = useAnalytics();

  return (
    <a
      href="/cart"
      className="relative p-1 hover:opacity-75 transition-opacity"
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
      <ShoppingBag size={20} />
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-black text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
          {count}
        </span>
      )}
    </a>
  );
}

/**
 * @param {Pick<HeaderProps, 'cart'>}
 */
function CartToggle({ cart }) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue();
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
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

/**
 * @param {{
 *   isActive: boolean;
 *   isPending: boolean;
 * }}
 */
function activeLinkStyle({ isActive, isPending }) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}

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
