import { Image } from '@shopify/hydrogen';

// Placeholder data - In a real implementation this might mock metafields
const FEATURES = [
    {
        title: "Pure Hydration",
        description: "Experience the cleanest hydration with our advanced triple-filtration system that removes 99% of impurities.",
        image: "https://cdn.shopify.com/s/files/1/0665/3794/7317/files/048F4427-A5E5-4022-B3C6-19A6DC9820FD.JPG?v=1733261225"
    },
    {
        title: "Smart Monitoring",
        description: "Keep track of your intake with our integrated app. Set goals, receive reminders, and stay accountable.",
        image: "https://cdn.shopify.com/s/files/1/0665/3794/7317/files/IMG_9692_VSCO.jpg?v=1733261226"
    },
    {
        title: "Designed for Life",
        description: "A durable, leak-proof design that fits perfectly in your car cup holder or gym bag. Built to go wherever you do.",
        image: "https://cdn.shopify.com/s/files/1/0665/3794/7317/files/IMG_9694_VSCO.jpg?v=1733261227"
    },
    {
        title: "Sustainable Choice",
        description: "Ditch single-use plastics. Our long-lasting materials ensure you're making a positive impact on the planet.",
        image: "https://cdn.shopify.com/s/files/1/0665/3794/7317/files/_MG_9093_VSCO.JPG?v=1733261225"
    }
];

export function ProductOverview({ features }) {
    if (!features) return null;

    return (
        <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Why Choose Salt & Spirit?</h2>
                    <p className="text-gray-500 max-w-2xl mx-auto text-lg">Designed for performance, aesthetics, and sustainability.</p>
                </div>

                <div className="space-y-24">
                    {features.map((feature, i) => (
                        <div key={i} className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 ${i % 2 === 1 ? 'md:flex-row-reverse' : ''}`}>
                            <div className="flex-1 w-full">
                                <div className="aspect-[4/3] rounded-3xl overflow-hidden bg-gray-100 shadow-xl">
                                    <img src={feature.image} alt={feature.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                                </div>
                            </div>
                            <div className="flex-1 w-full text-center md:text-left">
                                <h3 className="text-2xl md:text-4xl font-bold mb-6">{feature.title}</h3>
                                <p className="text-lg text-gray-600 leading-relaxed font-light">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
