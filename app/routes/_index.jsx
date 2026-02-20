import { Await, useLoaderData, Link } from 'react-router';
import { Suspense, lazy } from 'react';
import { Image } from '@shopify/hydrogen';
import { ProductItem } from '~/components/Product/ProductItem';
import { ProductTrailCard } from '~/components/Product/ProductTrailCard';
import { ClientOnly } from '~/components/Common/ClientOnly';
import { CardsParallax } from '~/components/Common/CardsParallax';
import BlurTextAnimation from '~/components/BlurTextAnimation';
import Feature108 from '~/components/Feature108';
import BentoGridSection from '~/components/BentoGridSection';
import Testimonials from '~/components/Testimonials';
import ComboSection from '~/components/Combo/ComboSection';
import Slideshow from '~/components/Slideshow';

const InfiniteGallery = lazy(() => import('~/components/Common/InfiniteGallery'));

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [{ title: 'Salt & Spirit | Home' }];
};

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
async function loadCriticalData({ context }) {
  const [{ collections }] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 * @param {Route.LoaderArgs}
 */
function loadDeferredData({ context }) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();

  // Extract images for the gallery from the deferred recommended products
  // We need to use <Await> or just use placeholders if data isn't ready immediately,
  // but for the Hero we ideally want critical data. 
  // For now, let's try to grab images if they exist, or use a placeholder set if loading.
  // Actually, since recommendedProducts is deferred, we might want to move it to critical 
  // OR use the featuredCollection image duplicated for now to serve the hero immediately.

  // Strategy: Pass empty array initially and let it populate? 
  // Better: Use specific hero images if available, or fall back to collection image.

  // For this demo, let's assume we want to show the recommended products in the gallery.
  // We'll wrap the gallery in Await? No, that delays the Hero.
  // Let's us the featuredCollection image + some static backups or fetch more in critical if needed.
  // For now, I will use the featured collection image and some placeholders/duplicates to fill the gallery
  // just to verify the component works, then we can refine the data source.

  const heroImages = [
    '/_MG_0199_VSCO.JPG',
    '/_MG_0215_VSCO.JPG',
    '/_MG_9093_VSCO.JPG',
    '/048F4427-A5E5-4022-B3C6-19A6DC9820FD.JPG',
    '/IMG_9692_VSCO.jpg',
    '/IMG_9693_VSCO(1).JPG',
    '/IMG_9694_VSCO.JPG',
  ];

  return (
    <div className="home w-full overflow-x-hidden">
      {/* 
        Scroll Track: 400vh height gives the user "space" to scroll through 
        while the content stays pinned (sticky). 
      */}
      <div className="hero-track h-[400vh] relative mb-10">
        <div className="hero-sticky sticky top-0 h-screen w-full overflow-hidden bg-base">
          <ClientOnly fallback={<div className="h-full w-full flex items-center justify-center">Loading Experience...</div>}>
            <Suspense fallback={<div>Loading 3D...</div>}>
              {(() => {
                // Duplicate to ensure enough items for infinite effect
                // We repeat the 7 images 2 times to get 14 items, enough for smooth loop
                const galleryImages = [...heroImages, ...heroImages];
                return <InfiniteGallery images={galleryImages} className="h-full w-full" />;
              })()}
            </Suspense>
          </ClientOnly>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10">
            <img src="/logo.png.png" alt="Salt & Spirit" className="w-[80vw] max-w-[600px] h-auto object-contain mix-blend-difference opacity-90" />
          </div>
        </div>
      </div>


      <FeaturedCollection collection={data.featuredCollection} />

      <Suspense fallback={<div>Loading Parallax...</div>}>
        <Await resolve={data.recommendedProducts}>
          {(response) => {
            if (!response?.products?.nodes?.length) return null;

            const cards = response.products.nodes
              .filter(product => !product.featuredImage?.url?.includes('b3cb-d8e3-43c2-a620-1358ac674531'))
              .map((product, i) => ({
                title: product.title,
                description: product.description,
                src: product.featuredImage?.url || '',
                link: `/products/${product.handle}`,
                color: i % 2 === 0 ? '#F4F4F4' : '#1D1E20', // Alternating colors
                textColor: i % 2 === 0 ? '#1D1E20' : '#F4F4F4',
                tag: 'Product'
              }));

            return <CardsParallax items={cards} />;
          }}
        </Await>
      </Suspense>





      <Suspense fallback={<div>Loading Combo...</div>}>
        <Await resolve={data.recommendedProducts}>
          {(response) => {
            if (!response?.products?.nodes?.length) return null;

            // Override prices for demo
            const products = response.products.nodes.slice(0, 4).map(p => {
              // Check if title contains 'Mix' (case insensitive)
              const isMix = p.title.toLowerCase().includes('mix');
              return {
                ...p,
                priceRange: {
                  ...p.priceRange,
                  minVariantPrice: {
                    ...p.priceRange.minVariantPrice,
                    amount: isMix ? '599.00' : '499.00'
                  }
                }
              };
            });

            return <ComboSection products={products} />;
          }}
        </Await>
      </Suspense>

      <Feature108 />
      <Suspense fallback={<div>Loading Bento Grid...</div>}>
        <Await resolve={data.recommendedProducts}>
          {(response) => {
            if (!response?.products?.nodes?.length) return <BentoGridSection />;
            return <BentoGridSection products={response.products.nodes} />;
          }}
        </Await>
      </Suspense>
      <Slideshow />
      <Testimonials />
      <BlurTextAnimation />

    </div >
  );
}

/**
 * @param {{
 *   collection: FeaturedCollectionFragment;
 * }}
 */
function FeaturedCollection({ collection }) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <Link
      className="featured-collection"
      to={`/collections/${collection.handle}`}
    >
      {image && (
        <div className="featured-collection-image">
          <Image data={image} sizes="100vw" />
        </div>
      )}

    </Link>
  );
}

// Removing RecommendedProducts definition since it is replaced


const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
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
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
`;

/** @typedef {import('./+types/_index').Route} Route */
/** @typedef {import('storefrontapi.generated').FeaturedCollectionFragment} FeaturedCollectionFragment */
/** @typedef {import('storefrontapi.generated').RecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
