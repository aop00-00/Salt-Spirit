import { Await, useLoaderData } from 'react-router';
import { Suspense, lazy } from 'react';
import { ClientOnly } from '~/components/Shared/ClientOnly';
import { CardsParallax } from '~/components/Shared/CardsParallax';
import BlurTextAnimation from '~/components/Effects/BlurTextAnimation';
import Feature108 from '~/components/Home/Feature108';
import BentoGridSection from '~/components/Home/BentoGridSection';
import Testimonials from '~/components/Home/Testimonials';
import ComboSection from '~/components/Combo/ComboSection';
import Slideshow from '~/components/Home/Slideshow';
import { IMAGE_ASSETS } from '~/lib/imagePaths';
import {
  SHARING_IMAGES,
  buildWebPageJsonLd,
  createPageSeo,
  mergeRouteMeta,
} from '~/lib/seo';

const InfiniteGallery = lazy(() => import('~/components/Shared/InfiniteGallery'));

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({matches}) => {
  const seo = createPageSeo({
    title: 'Hydrate Your Spirit',
    description:
      'Electrolitos premium para hidratacion, energia y descanso. Salt & Spirit redefine el ritual de rendimiento diario.',
    path: '/',
    image: SHARING_IMAGES.home,
    jsonLd: buildWebPageJsonLd({
      title: 'Hydrate Your Spirit',
      description:
        'Electrolitos premium para hidratacion, energia y descanso. Salt & Spirit redefine el ritual de rendimiento diario.',
      path: '/',
      image: SHARING_IMAGES.home,
    }),
  });

  return mergeRouteMeta({matches, seo});
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader(args) {
  const deferredData = loadDeferredData(args);
  const criticalData = await loadCriticalData(args);
  return { ...deferredData, ...criticalData };
}

async function loadCriticalData({ context }) {
  const [{ collections }] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

function loadDeferredData({ context }) {
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

export default function Homepage() {
  /** @type {LoaderReturnData} */
  const data = useLoaderData();

  const heroImages = [
    IMAGE_ASSETS.editorial.homeGallery.ritualPremium.avif,
    IMAGE_ASSETS.editorial.homeGallery.scienceAndFlavor.avif,
    IMAGE_ASSETS.editorial.homeGallery.vitalRedEditorial.avif,
    IMAGE_ASSETS.editorial.homeGallery.ssStandard.avif,
    IMAGE_ASSETS.editorial.about.saltStory.avif,
    IMAGE_ASSETS.editorial.about.hydraRestStory.avif,
    IMAGE_ASSETS.editorial.about.spiritStory.avif,
  ];

  return (
    <div className="home w-full">

      {/* 1. HERO — 100vh con propuesta de valor y CTA visible */}
      <div className="relative h-screen w-full overflow-hidden bg-base">
        <ClientOnly fallback={<div className="h-full w-full flex items-center justify-center">Loading...</div>}>
          <Suspense fallback={null}>
            <InfiniteGallery images={[...heroImages, ...heroImages]} className="h-full w-full" />
          </Suspense>
        </ClientOnly>

        <div className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-6 pointer-events-none">
          <img
            src={IMAGE_ASSETS.branding.logo.avif}
            alt="Salt & Spirit"
            className="w-[70vw] max-w-[500px] h-auto object-contain mix-blend-difference opacity-90"
          />
          <p className="text-white text-sm md:text-base tracking-widest uppercase bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full">
            Electrolitos premium para tu ritual diario
          </p>
          <a
            href="#productos"
            className="pointer-events-auto mt-2 px-8 py-3 bg-white text-black text-sm font-semibold rounded-full hover:bg-white/90 transition-colors"
          >
            Ver productos
          </a>
        </div>
      </div>

      {/* 2. PRODUCT TABS — presenta los 3 productos */}
      <div id="productos">
        <Feature108 />
      </div>

      {/* 3. SOCIAL PROOF RAPIDO — strip de confianza antes del precio */}
      <div className="py-8 px-4 border-y border-gray-100 bg-stone-50">
        <div className="max-w-4xl mx-auto flex flex-wrap justify-center gap-8 md:gap-16 text-center">
          <div>
            <div className="text-2xl font-bold text-[#1a2e28]">+1,000</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Clientes satisfechos</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1a2e28]">&#9733; 4.9</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Calificacion promedio</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1a2e28]">0%</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Azucar anadida</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-[#1a2e28]">100%</div>
            <div className="text-xs text-gray-500 uppercase tracking-widest mt-1">Ingredientes naturales</div>
          </div>
        </div>
      </div>

      {/* 4. CARDS PARALLAX — productos con scroll */}
      <Suspense fallback={null}>
        <Await resolve={data.recommendedProducts}>
          {(response) => {
            if (!response?.products?.nodes?.length) return null;
            const order = ['vital-red', 'hydra-rest', 'pure-blue'];
            const sorted = order
              .map(handle => response.products.nodes.find(p => p.handle === handle))
              .filter(Boolean);

            const cards = sorted
              .filter(product => !product.featuredImage?.url?.includes('b3cb-d8e3-43c2-a620-1358ac674531'))
              .map((product, i) => ({
                title: product.title,
                description: product.description,
                src: product.featuredImage?.url || '',
                link: `/products/${product.handle}`,
                color: i % 2 === 0 ? '#F4F4F4' : '#1D1E20',
                textColor: i % 2 === 0 ? '#1D1E20' : '#F4F4F4',
                tag: 'Product',
              }));
            return <CardsParallax items={cards} />;
          }}
        </Await>
      </Suspense>

      {/* 5. COMBO BUILDER — upsell cuando el usuario ya conoce los productos */}
      <Suspense fallback={null}>
        <Await resolve={data.recommendedProducts}>
          {(response) => {
            if (!response?.products?.nodes?.length) return null;
            const products = response.products.nodes.slice(0, 4).map(p => {
              const isMix = p.title.toLowerCase().includes('mix');
              return {
                ...p,
                priceRange: {
                  ...p.priceRange,
                  minVariantPrice: {
                    ...p.priceRange.minVariantPrice,
                    amount: isMix ? '549.00' : '499.00',
                  },
                },
              };
            });
            return <ComboSection products={products} />;
          }}
        </Await>
      </Suspense>

      {/* 6. BENTO GRID — beneficios + CTA secundario */}
      <Suspense fallback={null}>
        <Await resolve={data.recommendedProducts}>
          {(response) => {
            if (!response?.products?.nodes?.length) return <BentoGridSection />;
            return <BentoGridSection products={response.products.nodes} />;
          }}
        </Await>
      </Suspense>

      {/* 7. TESTIMONIOS — social proof profundo */}
      <Testimonials />

      {/* 8. SLIDESHOW — cierre editorial de marca */}
      <Slideshow />

      {/* 9. BLUR TEXT — tagline final */}
      <BlurTextAnimation />

    </div>
  );
}

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
  query HomeRecommendedProducts($country: CountryCode, $language: LanguageCode)
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
/** @typedef {import('storefrontapi.generated').HomeRecommendedProductsQuery} RecommendedProductsQuery */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
