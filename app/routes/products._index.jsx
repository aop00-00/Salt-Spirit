import {useLoaderData} from 'react-router';
import ProductsHero from '~/components/Products/ProductsHero';
import ProductTriad from '~/components/Products/ProductTriad';
import ScienceSection from '~/components/Products/ScienceSection';
import FullCycleKit from '~/components/Products/FullCycleKit';
import ProductsCTA from '~/components/Products/ProductsCTA';
import {
  SHARING_IMAGES,
  buildWebPageJsonLd,
  createPageSeo,
  mergeRouteMeta,
} from '~/lib/seo';

const PRODUCTS_PAGE_DESCRIPTION =
  'Tecnologia de hidratacion de precision para energia, enfoque y descanso. 0% azucar. 100% esencial.';

/**
 * @type {Route.MetaFunction}
 */
export const meta = ({data, matches}) => {
  return mergeRouteMeta({matches, seo: data?.seo});
};

/**
 * @param {Route.LoaderArgs} args
 */
export async function loader({context}) {
  const {storefront} = context;

  const handles = ['vital-red', 'pure-blue', 'hydra-rest', 'mix'];
  const productQueries = handles.map((handle) =>
    storefront
      .query(PRODUCT_QUERY, {
        variables: {handle},
      })
      .catch(() => null),
  );

  const results = await Promise.all(productQueries);
  const products = results.map((result) => result?.product).filter(Boolean);

  return {
    products,
    seo: createPageSeo({
      title: 'Products',
      description: PRODUCTS_PAGE_DESCRIPTION,
      path: '/products',
      image: SHARING_IMAGES.products,
      jsonLd: buildWebPageJsonLd({
        title: 'Products',
        description: PRODUCTS_PAGE_DESCRIPTION,
        path: '/products',
        image: SHARING_IMAGES.products,
      }),
    }),
  };
}

export default function ProductsIndex() {
  const {products} = useLoaderData();

  return (
    <div className="products-page">
      <ProductsHero />
      <ProductTriad products={products} />
      <ScienceSection />
      <FullCycleKit products={products} />
      <ProductsCTA products={products} />
    </div>
  );
}

const PRODUCT_QUERY = `#graphql
  query ProductsIndexProductByHandle($handle: String!) {
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
