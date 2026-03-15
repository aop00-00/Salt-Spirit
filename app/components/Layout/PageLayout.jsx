import { Await, Link } from 'react-router';
import { Suspense, useId } from 'react';
import { Aside } from '~/components/Layout/Aside';
import NewFooter from '~/components/Layout/NewFooter';
import { Header, HeaderMenu } from '~/components/Layout/Header';
import { CartMain } from '~/components/Cart/CartMain';
import {
  SEARCH_ENDPOINT,
  SearchFormPredictive,
} from '~/components/Search/SearchFormPredictive';
import { SearchResultsPredictive } from '~/components/Search/SearchResultsPredictive';

/**
 * @param {PageLayoutProps}
 */
export function PageLayout({
  cart,
  children = null,
  footer,
  header,
  isLoggedIn,
  publicStoreDomain,
}) {
  return (
    <Aside.Provider>
      <CartAside cart={cart} />
      <SearchAside />
      <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} />
      <MobileMenuAside header={header} publicStoreDomain={publicStoreDomain} />
      {header && (
        <Header
          header={header}
          cart={cart}
          isLoggedIn={isLoggedIn}
          publicStoreDomain={publicStoreDomain}
        />
      )}
      <main>{children}</main>
      <NewFooter />
    </Aside.Provider>
  );
}

/**
 * @param {{cart: PageLayoutProps['cart']}}
 */
function CartAside({ cart }) {
  return (
    <Aside type="cart" heading="CART">
      <Suspense fallback={<p>Loading cart ...</p>}>
        <Await resolve={cart}>
          {(cart) => {
            return <CartMain cart={cart} layout="aside" />;
          }}
        </Await>
      </Suspense>
    </Aside>
  );
}

function SearchAside() {
  const queriesDatalistId = useId();
  return (
    <Aside type="search" heading="SEARCH">
      <div className="flex flex-col h-full bg-[#f9f9f9] w-full max-w-[100vw] overflow-hidden">
        <SearchFormPredictive className="flex-none sticky top-0 bg-white z-10 px-6 py-4 shadow-[0_2px_4px_rgba(0,0,0,0.02)] border-b border-gray-100">
          {({ fetchResults, goToSearch, inputRef }) => (
            <div className="flex bg-gray-100/80 rounded-full px-4 py-2 border border-transparent focus-within:border-[#1ab75a] focus-within:bg-white transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400 my-auto shrink-0 mr-2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input
                name="q"
                onChange={fetchResults}
                onFocus={fetchResults}
                placeholder="Product, article, etc..."
                ref={inputRef}
                type="search"
                className="flex-1 bg-transparent border-none outline-none text-[15px] p-1 font-medium text-gray-800 placeholder:text-gray-400"
                list={queriesDatalistId}
              />
              <button 
                onClick={goToSearch} 
                className="shrink-0 bg-[#1ab75a] text-white px-4 py-1.5 rounded-full text-sm font-bold hover:bg-[#159a4c] transition-colors ml-2"
              >
                Go
              </button>
            </div>
          )}
        </SearchFormPredictive>

        <div className="flex-1 overflow-y-auto px-6 py-6 custom-scrollbar">
          <SearchResultsPredictive>
            {({ items, total, term, state, closeSearch }) => {
              const { articles, collections, pages, products, queries } = items;

              if (state === 'loading' && term.current) {
                return (
                  <div className="flex justify-center items-center h-32 text-gray-400">
                    <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 24 24"><circle className="opacity-25 border-4 border-t-transparent border-gray-400 rounded-full" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Searching...
                  </div>
                );
              }

              if (!total) {
                return <SearchResultsPredictive.Empty term={term} />;
              }

              return (
                <div className="space-y-6 pb-safe safe-area-bottom">
                  <SearchResultsPredictive.Queries
                    queries={queries}
                    queriesDatalistId={queriesDatalistId}
                  />
                  <SearchResultsPredictive.Products
                    products={products}
                    closeSearch={closeSearch}
                    term={term}
                  />
                  <SearchResultsPredictive.Collections
                    collections={collections}
                    closeSearch={closeSearch}
                    term={term}
                  />
                  <SearchResultsPredictive.Pages
                    pages={pages}
                    closeSearch={closeSearch}
                    term={term}
                  />
                  <SearchResultsPredictive.Articles
                    articles={articles}
                    closeSearch={closeSearch}
                    term={term}
                  />
                  {term.current && total ? (
                    <Link
                      onClick={closeSearch}
                      to={`${SEARCH_ENDPOINT}?q=${term.current}`}
                      className="block w-full text-center py-4 text-[15px] font-bold text-[#1ab75a] hover:text-[#159a4c] transition-colors"
                    >
                      View all {total} results for <q className="text-gray-900">{term.current}</q> &rarr;
                    </Link>
                  ) : null}
                </div>
              );
            }}
          </SearchResultsPredictive>
        </div>
      </div>
    </Aside>
  );
}

/**
 * @param {{
 *   header: PageLayoutProps['header'];
 *   publicStoreDomain: PageLayoutProps['publicStoreDomain'];
 * }}
 */
function MobileMenuAside({ header, publicStoreDomain }) {
  return (
    header.menu &&
    header.shop.primaryDomain?.url && (
      <Aside type="mobile" heading="MENU">
        <HeaderMenu
          menu={header.menu}
          viewport="mobile"
          primaryDomainUrl={header.shop.primaryDomain.url}
          publicStoreDomain={publicStoreDomain}
        />
      </Aside>
    )
  );
}

/**
 * @typedef {Object} PageLayoutProps
 * @property {Promise<CartApiQueryFragment|null>} cart
 * @property {Promise<FooterQuery|null>} footer
 * @property {HeaderQuery} header
 * @property {Promise<boolean>} isLoggedIn
 * @property {string} publicStoreDomain
 * @property {React.ReactNode} [children]
 */

/** @typedef {import('storefrontapi.generated').CartApiQueryFragment} CartApiQueryFragment */
/** @typedef {import('storefrontapi.generated').FooterQuery} FooterQuery */
/** @typedef {import('storefrontapi.generated').HeaderQuery} HeaderQuery */
