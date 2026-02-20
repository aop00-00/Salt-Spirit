import { Image } from '@shopify/hydrogen';
import { useState } from 'react';

/**
 * @param {{
 *   media: ProductFragment['media']['nodes'];
 * }}
 */
export function ProductGallery({ media }) {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);

    console.log('🖼️ ProductGallery media:', media);
    console.log('🖼️ Media length:', media?.length);
    console.log('🖼️ First media item:', media?.[0]);

    if (!media?.length) return null;

    if (!media?.length) return null;

    // Safely get the image from the current media item
    const currentMedia = media[selectedImageIndex];
    const currentImage = currentMedia?.image || currentMedia?.previewImage;

    return (
        <div className="product-gallery w-full md:w-1/2 flex gap-4 p-4 md:sticky md:top-24 md:h-fit">
            {/* Vertical Thumbnails */}
            <div className="flex flex-col gap-3 w-20 md:w-24">
                {media.map((med, i) => {
                    const image = med?.image || med?.previewImage;

                    return (
                        <button
                            key={med.id || i}
                            onClick={() => setSelectedImageIndex(i)}
                            className={`relative aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-all hover:border-gray-400 ${i === selectedImageIndex ? 'border-gray-900' : 'border-transparent'
                                }`}
                        >
                            {image && (
                                <Image
                                    data={image}
                                    sizes="100px"
                                    className="w-full h-full object-cover"
                                />
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Main Image Display */}
            <div className="flex-1 relative aspect-square bg-gray-50 rounded-2xl overflow-hidden">
                {currentImage && (
                    <Image
                        data={currentImage}
                        sizes="(min-width: 45em) 50vw, 100vw"
                        className="w-full h-full object-cover"
                    />
                )}
            </div>
        </div>
    );
}
