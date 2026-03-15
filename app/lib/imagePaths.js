const withAvif = (path) => path.replace(/\.(jpe?g|png|webp)$/i, '.avif');

const asset = (path) => ({
  original: path,
  avif: withAvif(path),
});

export const IMAGE_ASSETS = {
  branding: {
    logo: asset('/images/branding/logo.png'),
  },
  sharing: {
    homeOg: asset('/images/sharing/home-og.jpg'),
    aboutOg: asset('/images/sharing/about-og.jpg'),
    productsOg: asset('/images/sharing/products-og.jpg'),
    productOg: asset('/images/sharing/product-og.jpg'),
  },
  editorial: {
    homeGallery: {
      ritualPremium: asset('/images/editorial/home-gallery/ritual-premium.jpg'),
      scienceAndFlavor: asset('/images/editorial/home-gallery/science-and-flavor.jpg'),
      ssStandard: asset('/images/editorial/home-gallery/ss-standard.jpg'),
      vitalRedEditorial: asset('/images/editorial/home-gallery/vital-red-editorial.jpg'),
    },
    about: {
      saltStory: asset('/images/editorial/about/salt-story.jpg'),
      hydraRestStory: asset('/images/editorial/about/hydra-rest-story.jpg'),
      spiritStory: asset('/images/editorial/about/spirit-story.jpg'),
    },
  },
  marketing: {
    bento: {
      elevateRitual: asset('/images/marketing/bento/elevate-ritual.jpg'),
      scienceBackedBg: asset('/images/marketing/bento/science-backed-bg.jpg'),
    },
    slideshow: [
      asset('/images/marketing/slideshow/slide-01.jpg'),
      asset('/images/marketing/slideshow/slide-02.jpg'),
      asset('/images/marketing/slideshow/slide-03.jpg'),
      asset('/images/marketing/slideshow/slide-04.jpg'),
      asset('/images/marketing/slideshow/slide-05.jpg'),
    ],
  },
  products: {
    pureBlue: {
      card: asset('/images/products/pure-blue/card.jpg'),
      details: asset('/images/products/pure-blue/details.png'),
    },
    vitalRed: {
      card: asset('/images/products/vital-red/card.jpg'),
      details: asset('/images/products/vital-red/details.jpg'),
    },
    hydraRest: {
      card: asset('/images/products/hydra-rest/card.jpg'),
      details1: asset('/images/products/hydra-rest/details-1.png'),
      details2: asset('/images/products/hydra-rest/details-2.png'),
      details3: asset('/images/products/hydra-rest/details-3.jpg'),
    },
    mix: {
      card: asset('/images/products/mix/card.jpg'),
      details1: asset('/images/products/mix/details-1.png'),
      details2: asset('/images/products/mix/details-2.png'),
      details3: asset('/images/products/mix/details-3.png'),
      details4: asset('/images/products/mix/details-4.png'),
    },
  },
};
