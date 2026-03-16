import {getSeoMeta} from '@shopify/hydrogen';
import {IMAGE_ASSETS} from '~/lib/imagePaths';

export const SITE_NAME = 'Salt & Spirit';
export const SITE_ORIGIN = 'https://saltandspirit.com.mx';
export const SITE_DESCRIPTION =
  'Hidratacion funcional, energia limpia y descanso inteligente para un ritmo de alto rendimiento.';

export const DEFAULT_ROBOTS = {
  maxImagePreview: 'large',
  maxSnippet: -1,
  maxVideoPreview: -1,
};

export function absoluteUrl(path = '/') {
  if (!path) return SITE_ORIGIN;
  if (/^https?:\/\//i.test(path)) return path;
  return new URL(path, SITE_ORIGIN).toString();
}

function createSeoImage(path, altText) {
  return {
    type: 'image',
    url: absoluteUrl(path),
    width: 1200,
    height: 630,
    altText,
  };
}

export const SHARING_IMAGES = {
  default: createSeoImage(
    IMAGE_ASSETS.sharing.homeOg.original,
    'Salt & Spirit performance and hydration campaign image',
  ),
  home: createSeoImage(
    IMAGE_ASSETS.sharing.homeOg.original,
    'Salt & Spirit home page sharing image',
  ),
  about: createSeoImage(
    IMAGE_ASSETS.sharing.aboutOg.original,
    'Salt & Spirit about page sharing image',
  ),
  products: createSeoImage(
    IMAGE_ASSETS.sharing.productsOg.original,
    'Salt & Spirit products page sharing image',
  ),
  product: createSeoImage(
    IMAGE_ASSETS.sharing.productOg.original,
    'Salt & Spirit product page sharing image',
  ),
};

export function createPageSeo({
  title,
  description,
  path,
  image = SHARING_IMAGES.default,
  jsonLd,
  robots = DEFAULT_ROBOTS,
  titleTemplate,
  handle,
}) {
  return {
    title,
    description,
    url: absoluteUrl(path),
    media: image,
    robots,
    jsonLd,
    titleTemplate,
    handle,
  };
}

export function buildWebPageJsonLd({title, description, path, image}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    name: title,
    description,
    url: absoluteUrl(path),
    image: image?.url,
  };
}

export function buildRootJsonLd() {
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_ORIGIN,
      logo: absoluteUrl(IMAGE_ASSETS.branding.logo.original),
      image: SHARING_IMAGES.default.url,
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_NAME,
      url: SITE_ORIGIN,
      description: SITE_DESCRIPTION,
    },
  ];
}

export function mergeRouteMeta({matches = [], seo}) {
  const seoInputs = [...matches.map((match) => match.data?.seo).filter(Boolean), seo];
  const merged = getSeoMeta(...seoInputs);
  const socialMedia = [...seoInputs].reverse().find((input) => input?.media)?.media;
  const primaryImage = Array.isArray(socialMedia) ? socialMedia[0] : socialMedia;

  if (primaryImage?.url) {
    if (!merged.some((tag) => tag.property === 'og:image')) {
      merged.push({property: 'og:image', content: primaryImage.url});
    }

    if (!merged.some((tag) => tag.name === 'twitter:image')) {
      merged.push({name: 'twitter:image', content: primaryImage.url});
    }

    if (primaryImage.altText && !merged.some((tag) => tag.name === 'twitter:image:alt')) {
      merged.push({name: 'twitter:image:alt', content: primaryImage.altText});
    }
  }

  if (!merged.some((tag) => tag.name === 'twitter:card')) {
    merged.push({name: 'twitter:card', content: 'summary_large_image'});
  }

  if (!merged.some((tag) => tag.property === 'og:site_name')) {
    merged.push({property: 'og:site_name', content: SITE_NAME});
  }

  if (!merged.some((tag) => tag.name === 'theme-color')) {
    merged.push({name: 'theme-color', content: '#1D1E20'});
  }

  return merged;
}

export function stripHtmlTags(value = '') {
  return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}
