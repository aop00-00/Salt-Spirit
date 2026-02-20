import { ShieldCheck, Award, Leaf, Heart } from 'lucide-react';

export function WhyChoose() {
    const benefits = [
        {
            icon: Award,
            title: 'Authentic Spirits',
            description: 'Handcrafted using traditional methods passed down through generations'
        },
        {
            icon: Leaf,
            title: 'Sustainable Sourcing',
            description: 'Working directly with local farmers who practice sustainable agriculture'
        },
        {
            icon: ShieldCheck,
            title: 'Quality Guaranteed',
            description: '100% agave, no additives, certified by regulatory authorities'
        },
        {
            icon: Heart,
            title: 'Community Impact',
            description: 'Supporting Mexican artisan communities and preserving cultural heritage'
        }
    ];

    return (
        <section className="py-16 md:py-24 bg-white">
            <div className="container mx-auto px-4 md:px-6 max-w-7xl">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
                        Why Choose Salt & Spirit?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        We're committed to bringing you the finest spirits while honoring tradition and sustainability
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {benefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <div
                                key={index}
                                className="flex flex-col items-center text-center p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                            >
                                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mb-4">
                                    <Icon className="w-8 h-8 text-green-700" />
                                </div>
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                                    {benefit.title}
                                </h3>
                                <p className="text-gray-600 text-sm">
                                    {benefit.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
