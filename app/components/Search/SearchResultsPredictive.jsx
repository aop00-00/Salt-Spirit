import { Link, useFetcher } from 'react-router';
import { Image, Money } from '@shopify/hydrogen';
import React, { useRef, useEffect } from 'react';
import {
  getEmptyPredictiveSearchResult,
  urlWithTrackingParams,
} from '~/lib/search';
import { useAside } from '~/components/Layout/Aside';

/**
 * Component that renders predictive search results
 * @param {SearchResultsPredictiveProps}
 * @return {React.ReactNode}
 */
export function SearchResultsPredictive({ children }) {
  const aside = useAside();
  const { term, inputRef, fetcher, total, items } = usePredictiveSearch();

  /*
   * Utility that resets the search input
   */
  function resetInput() {
    if (inputRef.current) {
      inputRef.current.blur();
      inputRef.current.value = '';
    }
  }

  /**
   * Utility that resets the search input and closes the search aside
   */
  function closeSearch() {
    resetInput();
    aside.close();
  }

  return children({
    items,
    closeSearch,
    inputRef,
    state: fetcher.state,
    term,
    total,
  });
}

SearchResultsPredictive.Articles = SearchResultsPredictiveArticles;
SearchResultsPredictive.Collections = SearchResultsPredictiveCollections;
SearchResultsPredictive.Pages = SearchResultsPredictivePages;
SearchResultsPredictive.Products = SearchResultsPredictiveProducts;
SearchResultsPredictive.Queries = SearchResultsPredictiveQueries;
SearchResultsPredictive.Empty = SearchResultsPredictiveEmpty;

/**
 * @param {PartialPredictiveSearchResult<'articles'>}
 */
function SearchResultsPredictiveArticles({ term, articles, closeSearch }) {
  if (!articles.length) return null;

  return (
    <div className="mb-6" key="articles">
      <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Articles</h5>
      <ul className="space-y-3">
        {articles.map((article) => {
          const articleUrl = urlWithTrackingParams({
            baseUrl: `/blogs/${article.blog.handle}/${article.handle}`,
            trackingParams: article.trackingParameters,
            term: term.current ?? '',
          });

          return (
            <li key={article.id}>
              <Link onClick={closeSearch} to={articleUrl} className="flex items-center gap-4 group p-2 hover:bg-white rounded-xl transition-colors">
                {article.image?.url && (
                  <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <Image
                      alt={article.image.altText ?? ''}
                      src={article.image.url}
                      width={50}
                      height={50}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <span className="text-sm font-bold text-gray-800 group-hover:text-[#1ab75a] transition-colors">{article.title}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * @param {PartialPredictiveSearchResult<'collections'>}
 */
function SearchResultsPredictiveCollections({ term, collections, closeSearch }) {
  if (!collections.length) return null;

  return (
    <div className="mb-6" key="collections">
      <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Collections</h5>
      <ul className="space-y-3">
        {collections.map((collection) => {
          const collectionUrl = urlWithTrackingParams({
            baseUrl: `/collections/${collection.handle}`,
            trackingParams: collection.trackingParameters,
            term: term.current,
          });

          return (
            <li key={collection.id}>
              <Link onClick={closeSearch} to={collectionUrl} className="flex items-center gap-4 group p-2 hover:bg-white rounded-xl transition-colors">
                {collection.image?.url && (
                  <div className="shrink-0 w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <Image
                      alt={collection.image.altText ?? ''}
                      src={collection.image.url}
                      width={50}
                      height={50}
                      className="w-full h-full object-cover"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <span className="text-sm font-bold text-gray-800 group-hover:text-[#1ab75a] transition-colors">{collection.title}</span>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * @param {PartialPredictiveSearchResult<'pages'>}
 */
function SearchResultsPredictivePages({ term, pages, closeSearch }) {
  if (!pages.length) return null;

  return (
    <div className="mb-6" key="pages">
      <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Pages</h5>
      <ul className="space-y-2">
        {pages.map((page) => {
          const pageUrl = urlWithTrackingParams({
            baseUrl: `/pages/${page.handle}`,
            trackingParams: page.trackingParameters,
            term: term.current,
          });

          return (
            <li key={page.id}>
              <Link onClick={closeSearch} to={pageUrl} className="block p-3 hover:bg-white rounded-xl transition-colors group">
                <span className="text-sm font-bold text-gray-800 group-hover:text-[#1ab75a] transition-colors">{page.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * @param {PartialPredictiveSearchResult<'products'>}
 */
function SearchResultsPredictiveProducts({ term, products, closeSearch }) {
  if (!products.length) return null;

  return (
    <div className="mb-8" key="products">
      <h5 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">Products</h5>
      <ul className="space-y-4">
        {products.map((product) => {
          const productUrl = urlWithTrackingParams({
            baseUrl: `/products/${product.handle}`,
            trackingParams: product.trackingParameters,
            term: term.current,
          });

          const price = product?.selectedOrFirstAvailableVariant?.price;
          const image = product?.selectedOrFirstAvailableVariant?.image;
          return (
            <li key={product.id}>
              <Link to={productUrl} onClick={closeSearch} className="flex items-center gap-4 group bg-white p-3 rounded-2xl shadow-[0_2px_10px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_20px_rgba(0,0,0,0.06)] border border-gray-100 hover:border-gray-200 transition-all hover:-translate-y-0.5">
                {image && (
                  <div className="shrink-0 aspect-square w-16 h-16 rounded-xl overflow-hidden bg-gray-50 flex items-center justify-center p-1">
                    <Image
                      alt={image.altText ?? ''}
                      src={image.url}
                      width={64}
                      height={64}
                      className="w-full h-full object-contain mix-blend-multiply"
                    />
                  </div>
                )}
                <div className="flex flex-col flex-1">
                  <p className="text-sm font-bold text-gray-900 group-hover:text-[#1ab75a] transition-colors leading-tight mb-1">{product.title}</p>
                  <small className="text-sm font-bold text-gray-500">{price && <Money data={price} />}</small>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * @param {PartialPredictiveSearchResult<'queries', never> & {
 *   queriesDatalistId: string;
 * }}
 */
function SearchResultsPredictiveQueries({ queries, queriesDatalistId }) {
  if (!queries.length) return null;

  return (
    <datalist id={queriesDatalistId}>
      {queries.map((suggestion) => {
        if (!suggestion) return null;

        return <option key={suggestion.text} value={suggestion.text} />;
      })}
    </datalist>
  );
}

/**
 * @param {{
 *   term: React.MutableRefObject<string>;
 * }}
 */
function SearchResultsPredictiveEmpty({ term }) {
  if (!term.current) {
    return null;
  }

  return (
    <div className="py-12 px-6 flex flex-col items-center justify-center text-center">
      <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
      </div>
      <h3 className="text-lg font-bold text-gray-900 tracking-tight mb-2">No results found</h3>
      <p className="text-gray-500 text-sm">
        We couldn't find anything matching <q className="font-medium text-gray-900">"{term.current}"</q>. Try adjusting your search.
      </p>
    </div>
  );
}

/**
 * Hook that returns the predictive search results and fetcher and input ref.
 * @example
 * '''ts
 * const { items, total, inputRef, term, fetcher } = usePredictiveSearch();
 * '''
 * @return {UsePredictiveSearchReturn}
 */
function usePredictiveSearch() {
  const fetcher = useFetcher({ key: 'search' });
  const term = useRef('');
  const inputRef = useRef(null);

  if (fetcher?.state === 'loading') {
    term.current = String(fetcher.formData?.get('q') || '');
  }

  // capture the search input element as a ref
  useEffect(() => {
    if (!inputRef.current) {
      inputRef.current = document.querySelector('input[type="search"]');
    }
  }, []);

  const { items, total } =
    fetcher?.data?.result ?? getEmptyPredictiveSearchResult();

  return { items, total, inputRef, term, fetcher };
}

/** @typedef {PredictiveSearchReturn['result']['items']} PredictiveSearchItems */
/**
 * @typedef {{
 *   term: React.MutableRefObject<string>;
 *   total: number;
 *   inputRef: React.MutableRefObject<HTMLInputElement | null>;
 *   items: PredictiveSearchItems;
 *   fetcher: Fetcher<PredictiveSearchReturn>;
 * }} UsePredictiveSearchReturn
 */
/**
 * @typedef {Pick<
 *   UsePredictiveSearchReturn,
 *   'term' | 'total' | 'inputRef' | 'items'
 * > & {
 *   state: Fetcher['state'];
 *   closeSearch: () => void;
 * }} SearchResultsPredictiveArgs
 */
/**
 * @typedef {Pick<PredictiveSearchItems, ItemType> &
 *   Pick<SearchResultsPredictiveArgs, ExtraProps>} PartialPredictiveSearchResult
 * @template {keyof PredictiveSearchItems} ItemType
 * @template {keyof SearchResultsPredictiveArgs} [ExtraProps='term' | 'closeSearch']
 */
/**
 * @typedef {{
 *   children: (args: SearchResultsPredictiveArgs) => React.ReactNode;
 * }} SearchResultsPredictiveProps
 */

/** @template T @typedef {import('react-router').Fetcher<T>} Fetcher */
/** @typedef {import('~/lib/search').PredictiveSearchReturn} PredictiveSearchReturn */
