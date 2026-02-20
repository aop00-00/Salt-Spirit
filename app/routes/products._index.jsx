import { useLoaderData } from 'react-router';
import ProductsHero from '~/components/Products/ProductsHero';
import ProductTriad from '~/components/Products/ProductTriad';
import ScienceSection from '~/components/Products/ScienceSection';
import FullCycleKit from '~/components/Products/FullCycleKit';
import ProductsCTA from '~/components/Products/ProductsCTA';

/**
 * @type {Route.MetaFunction}
 */
export const meta = () => {
  return [
    { title: 'Products | Salt & Spirit - The Performance Standard' },
    {
      name: 'description',
      content: 'Tecnología de hidratación de precisión diseñada para tu ritmo. 0% Azúcar. 100% Esencial.',
    },
    {
      rel: 'canonical',
      href: '/products',
    },
  ];
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({ context }) {
  const { storefront } = context;

  // Fetch the 4 main products by handle
  const handles = ['vital-red', 'pure-blue', 'hydra-rest', 'mix'];

  const productQueries = handles.map(handle =>
    storefront.query(PRODUCT_QUERY, {
      variables: { handle }
    }).catch(() => null)
  );

  const results = await Promise.all(productQueries);
  const products = results
    .map(result => result?.product)
    .filter(Boolean);

  return { products };
}

export default function ProductsIndex() {
  const { products } = useLoaderData();

  return (
    <div className="products-page">
      {/* 1. Hero Section */}
      <ProductsHero />

      {/* 2. Product Triad - The 3 Main Products */}
      <ProductTriad products={products} />

      {/* 3. Science Section - Why It Works */}
      <ScienceSection />

      {/* 4. Full Cycle Kit - Bundle Promotion */}
      <FullCycleKit products={products} />

      {/* 5. Closing CTA */}
      <ProductsCTA products={products} />
    </div>
  );
}

const PRODUCT_QUERY = `#graphql
  query Product($handle: String!) {
    product(handle: $handle) {
      id
      title
      handle
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
      }
      variants(first: 1) {
        nodes {
          id
        }
      }
    }
  }
`;

/** @typedef {import('./+types/products._index').Route} Route */
/** @typedef {import('@shopify/remix-oxygen').SerializeFrom<typeof loader>} LoaderReturnData */
