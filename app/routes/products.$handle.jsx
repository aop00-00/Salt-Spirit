import { useLoaderData } from 'react-router';
import { useEffect } from 'react';
import {
  getSelectedProductOptions,
  Analytics,
  useOptimisticVariant,
  getProductOptions,
  getAdjacentAndFirstAvailableVariants,
  useSelectedOptionInUrlParam,
} from '@shopify/hydrogen';
import { ProductGallery } from '~/components/Product/ProductGallery';
import { ProductDetails } from '~/components/Product/ProductDetails';
import { ProductOverview } from '~/components/Product/ProductOverview';
import { ProductComparison } from '~/components/Product/ProductComparison';
import { ProductFAQ } from '~/components/Product/ProductFAQ';
import { ProductReviews } from '~/components/Product/ProductReviews';
import { redirectIfHandleIsLocalized } from '~/lib/redirect';
import {
  SHARING_IMAGES,
  absoluteUrl,
  createPageSeo,
  mergeRouteMeta,
  stripHtmlTags,
} from '~/lib/seo';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data, matches}) => {
  return mergeRouteMeta({matches, seo: data?.seo});
};

function getPrimaryProductImage(product) {
  return (
    product?.selectedOrFirstAvailableVariant?.image ||
    product?.media?.nodes?.find((node) => node.__typename === 'MediaImage')?.image ||
    null
  );
}

function buildProductSeo(product) {
  const title = product?.seo?.title || product?.title || 'Product';
  const description =
    product?.seo?.description ||
    stripHtmlTags(product?.descriptionHtml) ||
    'Salt & Spirit functional hydration product.';
  const image = getPrimaryProductImage(product);
  const seoImage = image?.url
    ? {
        type: 'image',
        url: absoluteUrl(image.url),
        width: image.width,
        height: image.height,
        altText: image.altText || title,
      }
    : SHARING_IMAGES.product;

  return createPageSeo({
    title,
    description,
    path: `/products/${product?.handle ?? ''}`,
    image: seoImage,
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: title,
      description,
      image: [seoImage.url],
      brand: {
        '@type': 'Brand',
        name: 'Salt & Spirit',
      },
      offers: product?.selectedOrFirstAvailableVariant?.price
        ? {
            '@type': 'Offer',
            availability: product.selectedOrFirstAvailableVariant.availableForSale
              ? 'https://schema.org/InStock'
              : 'https://schema.org/OutOfStock',
            price: product.selectedOrFirstAvailableVariant.price.amount,
            priceCurrency:
              product.selectedOrFirstAvailableVariant.price.currencyCode,
            url: absoluteUrl(`/products/${product?.handle ?? ''}`),
          }
        : undefined,
    },
  });
}

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return { ...deferredData, ...criticalData };
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 * @param {Route.LoaderArgs}
 */
async function loadCriticalData({ context, params, request }) {
  const { handle } = params;
  const { storefront } = context;

  if (!handle) {
    throw new Error('Expected product handle to be defined');
  }

  try {
    const [{ product }] = await Promise.all([
      storefront.query(PRODUCT_QUERY, {
        variables: { handle, selectedOptions: getSelectedProductOptions(request) },
      }),
    ]);

    if (product?.id) {
      redirectIfHandleIsLocalized(request, { handle, data: product });
      return {
        product,
        seo: buildProductSeo(product),
      };
    }
  } catch (e) {
    console.log("❌ Error fetching product from Storefront API:", e);
    console.log("Handle being searched:", handle);
  }

  // TEMPORARILY RE-ENABLED for debugging - will use REAL Shopify product data
  // TODO: Fix Storefront API permissions
  if (PRODUCT_CONTENT[handle]) {
    console.log("⚠️ Using mock fallback for handle:", handle);
    const mockContent = PRODUCT_CONTENT[handle].overview[0]; // Use first overview item as source
    return {
      product: {
        id: `mock-${handle}`,
        title: handle.charAt(0).toUpperCase() + handle.slice(1),
        handle,
        vendor: "Salt & Spirit",
        descriptionHtml: `<p>${mockContent.description}</p>`,
        media: {
          nodes: PRODUCT_CONTENT[handle].overview.map((o, i) => ({
            __typename: 'MediaImage',
            id: `img-${i}`,
            image: { url: o.image, altText: o.title, width: 1000, height: 1000 }
          }))
        },
        selectedOrFirstAvailableVariant: {
          id: `var-${handle}`,
          price: { amount: "599.00", currencyCode: "MXN" },
          compareAtPrice: null,
          image: { url: mockContent.image },
          selectedOptions: [{ name: "Title", value: "Default Title" }],
          product: { title: handle, handle }
        },
        options: [{ name: "Title", optionValues: [{ name: "Default Title", firstSelectableVariant: { id: `var-${handle}` } }] }],
        adjacentVariants: []
      },
      seo: createPageSeo({
        title: handle.charAt(0).toUpperCase() + handle.slice(1),
        description: mockContent.description,
        path: `/products/${handle}`,
        image: SHARING_IMAGES.product,
      }),
    };
  }

  throw new Response(null, { status: 404 });
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({ context }) {
  // Put any API calls that is not critical to be available on first page render
  // For example: product reviews, product recommendations, social feeds.

  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

import { PRODUCT_CONTENT } from '~/data/product_content';

export default function Product() {
  /** @type {LoaderReturnData} */
  const { product } = useLoaderData();

  // Optimistically selects a variant with given available variant information
  const selectedVariant = useOptimisticVariant(
    product.selectedOrFirstAvailableVariant,
    getAdjacentAndFirstAvailableVariants(product),
  );

  useEffect(() => {
    if (typeof window !== 'undefined' && window.fbq && product) {
      window.fbq('track', 'ViewContent', {
        content_name: product.title,
        content_ids: [product.id.split('/').pop()],
        content_type: 'product',
        value: parseFloat(selectedVariant?.price?.amount || 0),
        currency: selectedVariant?.price?.currencyCode || 'MXN',
      });
    }
  }, [product?.id, selectedVariant?.id]);

  // Sets the search param to the selected variant without navigation
  // only when no search params are set in the url
  useSelectedOptionInUrlParam(selectedVariant.selectedOptions);

  // Get the product options array
  const productOptions = getProductOptions({
    ...product,
    selectedOrFirstAvailableVariant: selectedVariant,
  });

  const { handle } = product;

  // Normalize handle to match content keys (e.g. 'pure-blue-1' -> 'pure-blue')
  // This allows duplicate/new products to share the same static content
  const normalizedHandle = handle.replace(/-\d+$/, '');
  const content = PRODUCT_CONTENT[handle] || PRODUCT_CONTENT[normalizedHandle] || PRODUCT_CONTENT['default'];

  return (
    <div className="product">
      {/* Section 1: Product Gallery + Details */}
      <section className="w-full">
        <div className="flex flex-col md:flex-row gap-8 bg-[#FAFAFA]">
          <ProductGallery media={product.media.nodes} />
          <ProductDetails
            product={product}
            selectedVariant={selectedVariant}
            productOptions={productOptions}
            recommendedProducts={useLoaderData().recommendedProducts}
          />
        </div>
      </section>

      {/* Section 2: Product Overview */}
      <section className="w-full">
        <ProductOverview features={content.overview} />
      </section>

      {/* Section 3: Product Comparison */}
      <section className="w-full">
        <ProductComparison items={content.comparison} />
      </section>

      {/* Section 4: FAQ */}
      <section className="w-full">
        <ProductFAQ items={content.faq} />
      </section>

      {/* Section 5: Reviews */}
      <section className="w-full">
        <ProductReviews items={content.reviews} />
      </section>

      <Analytics.ProductView
        data={{
          products: [
            {
              id: product.id,
              title: product.title,
              price: selectedVariant?.price.amount || '0',
              vendor: product.vendor,
              variantId: selectedVariant?.id || '',
              variantTitle: selectedVariant?.title || '',
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

const PRODUCT_VARIANT_FRAGMENT = `#graphql
  fragment ProductVariant on ProductVariant {
    availableForSale
    compareAtPrice {
      amount
      currencyCode
    }
    id
    image {
      __typename
      id
      url
      altText
      width
      height
    }
    price {
      amount
      currencyCode
    }
    product {
      title
      handle
    }
    selectedOptions {
      name
      value
    }
    sku
    title
    unitPrice {
      amount
      currencyCode
    }
  }
`;

const PRODUCT_FRAGMENT = `#graphql
  fragment Product on Product {
    id
    title
    vendor
    handle
    descriptionHtml
    description
    encodedVariantExistence
    encodedVariantAvailability
    options {
      name
      optionValues {
        name
        firstSelectableVariant {
          ...ProductVariant
        }
        swatch {
          color
          image {
            previewImage {
              url
            }
          }
        }
      }
    }
    selectedOrFirstAvailableVariant(selectedOptions: $selectedOptions, ignoreUnknownOptions: true, caseInsensitiveMatch: true) {
      ...ProductVariant
    }
    adjacentVariants (selectedOptions: $selectedOptions) {
      ...ProductVariant
    }
    seo {
      description
      title
    }
    media(first: 7) {
      nodes {
        ... on MediaImage {
          mediaContentType
          image {
            id
            url
            altText
            width
            height
          }
        }
        ... on Video {
          mediaContentType
          id
          previewImage {
            url
          }
          sources {
            mimeType
            url
          }
        }
        ... on ExternalVideo {
          mediaContentType
          id
          embedUrl
          host
        }
        ... on Model3d {
          mediaContentType
          id
          sources {
            mimeType
            url
          }
        }
      }
    }
  }
  ${PRODUCT_VARIANT_FRAGMENT}
`;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    description(truncateAt: 100)
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
    variants(first: 1) {
      nodes {
        id
        price {
          amount
          currencyCode
        }
      }
    }
  }
  query ProductPageRecommendedProducts($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 3, sortKey: BEST_SELLING) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

const PRODUCT_QUERY = `#graphql
  query ProductDetailsByHandle(
    $country: CountryCode
    $handle: String!
    $language: LanguageCode
    $selectedOptions: [SelectedOptionInput!]!
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      ...Product
    }
  }
  ${PRODUCT_FRAGMENT}
`;

/** @typedef {import('./+types/products.$handle').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
