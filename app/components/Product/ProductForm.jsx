import { Link, useNavigate } from 'react-router';
import { AddToCartButton } from '~/components/Cart/AddToCartButton';
import { useAside } from '~/components/Layout/Aside';

/**
 * @param {{
 *   productOptions: MappedProductOptions[];
 *   selectedVariant: ProductFragment['selectedOrFirstAvailableVariant'];
 * }}
 */
export function ProductForm({ productOptions, selectedVariant }) {
  const navigate = useNavigate();
  const { open } = useAside();
  return (
    <div className="product-form">
      {productOptions.map((option) => {
        // If there is only a single value in the option values, don't display the option
        if (option.optionValues.length === 1) return null;

        return (
          <div className="mb-6" key={option.name}>
            <h3 className="text-sm font-semibold text-gray-900 mb-3">{option.name}</h3>
            <div className="grid grid-cols-2 gap-3">
              {option.optionValues.map((value) => {
                const {
                  name,
                  handle,
                  variantUriQuery,
                  selected,
                  available,
                  exists,
                  isDifferentProduct,
                  swatch,
                } = value;

                if (isDifferentProduct) {
                  // SEO
                  // When the variant is a combined listing child product
                  // that leads to a different url, we need to render it
                  // as an anchor tag
                  return (
                    <Link
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg transition-all ${selected ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-400'
                        } ${!available ? 'opacity-50' : ''}`}
                      key={option.name + name}
                      prefetch="intent"
                      preventScrollReset
                      replace
                      to={`/products/${handle}?${variantUriQuery}`}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                      <div className="flex-1">
                        <span className="text-sm font-medium">{name}</span>
                      </div>
                      <span className="text-sm font-bold">$2399</span>
                    </Link>
                  );
                } else {
                  // SEO
                  // When the variant is an update to the search param,
                  // render it as a button with javascript navigating to
                  // the variant so that SEO bots do not index these as
                  // duplicated links
                  return (
                    <button
                      type="button"
                      className={`flex items-center gap-3 p-3 border-2 rounded-lg transition-all text-left ${selected ? 'border-gray-900 bg-gray-50' : 'border-gray-200 hover:border-gray-400'
                        } ${!available ? 'opacity-50' : ''}`}
                      key={option.name + name}
                      disabled={!exists}
                      onClick={() => {
                        if (!selected) {
                          void navigate(`?${variantUriQuery}`, {
                            replace: true,
                            preventScrollReset: true,
                          });
                        }
                      }}
                    >
                      <ProductOptionSwatch swatch={swatch} name={name} />
                      <div className="flex-1">
                        <span className="text-sm font-medium">{name}</span>
                      </div>
                      {selectedVariant?.price && (
                        <span className="text-sm font-bold">${selectedVariant.price.amount}</span>
                      )}
                    </button>
                  );
                }
              })}
            </div>
          </div>
        );
      })}
      <div className="flex gap-3">
        {/* Buy Now Button - Opens cart immediately */}
        <AddToCartButton
          disabled={!selectedVariant || !selectedVariant.availableForSale}
          onClick={() => {
            open('cart');
          }}
          lines={
            selectedVariant
              ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                  selectedVariant,
                },
              ]
              : []
          }
          className="flex-1"
        >
          <span className="w-full block bg-gray-900 hover:bg-gray-800 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-center">
            {selectedVariant?.availableForSale ? 'Comprar Ahora' : 'Comprar Ahora'}
          </span>
        </AddToCartButton>

        {/* Add to Cart Button - Doesn't open cart */}
        <AddToCartButton
          disabled={!selectedVariant || !selectedVariant.availableForSale}
          lines={
            selectedVariant
              ? [
                {
                  merchandiseId: selectedVariant.id,
                  quantity: 1,
                  selectedVariant,
                },
              ]
              : []
          }
          className="flex-1"
          onClick={() => open('cart')}
        >
          <span className="w-full block bg-green-800 hover:bg-green-900 text-white font-semibold py-4 px-6 rounded-lg transition-colors text-center">
            Agregar al Carrito
          </span>
        </AddToCartButton>
      </div>
    </div>
  );
}

/**
 * @param {{
 *   swatch?: Maybe<ProductOptionValueSwatch> | undefined;
 *   name: string;
 * }}
 */
function ProductOptionSwatch({ swatch, name }) {
  const image = swatch?.image?.previewImage?.url;
  const color = swatch?.color;

  if (!image && !color) return null;

  return (
    <div
      aria-label={name}
      className="w-12 h-12 rounded overflow-hidden bg-gray-100 flex-shrink-0"
      style={{
        backgroundColor: color || 'transparent',
      }}
    >
      {!!image && <img src={image} alt={name} className="w-full h-full object-cover" />}
    </div>
  );
}

/** @typedef {import('@shopify/hydrogen').MappedProductOptions} MappedProductOptions */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').Maybe} Maybe */
/** @typedef {import('@shopify/hydrogen/storefront-api-types').ProductOptionValueSwatch} ProductOptionValueSwatch */
/** @typedef {import('storefrontapi.generated').ProductFragment} ProductFragment */
