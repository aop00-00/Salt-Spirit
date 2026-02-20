import { Zap, Droplets, Leaf, Shield } from 'lucide-react';

export function ProductComparison({ items }) {
    if (!items) return null;

    // Map string icons to components if necessary, or assume the parent passes data. 
    // Since our data file has no icon imports, we'll map them here or use generic logic.
    // Simplifying for now: Use generic icons based on index or just render without icons if pure text.
    // Better: Update data file to include icon names or mapping. 
    // For this step, I will reuse the Lucide icons cyclically or generic.
    const icons = [Zap, Droplets, Leaf, Shield];

    return (
        <section className="py-24 bg-[#F9F9F9]">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6">The Superior Choice</h2>
                    <p className="text-gray-500">See how we stack up against the rest.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    {items.map((item, i) => {
                        const Icon = icons[i % icons.length];
                        return (
                            <div key={i} className="flex flex-col items-center text-center p-8 bg-white rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                                <div className="w-16 h-16 rounded-full bg-gray-50 flex items-center justify-center mb-6 text-black">
                                    <Icon size={32} strokeWidth={1.5} />
                                </div>
                                <h3 className="font-bold text-lg mb-3">{item.title}</h3>
                                <p className="text-gray-500 text-sm">{item.desc}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
