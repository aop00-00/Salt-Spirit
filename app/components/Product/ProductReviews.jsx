import { Star } from 'lucide-react';

const TRIALS = [
    { name: "Sarah J.", text: "The best water bottle I've ever owned. Keeps my water cold all day long even in the Texas heat!", stars: 5 },
    { name: "Mike T.", text: "Super durable and looks great. I take it everywhere with me.", stars: 5 },
    { name: "Emily R.", text: "Love the matte finish and the straw lid is a game changer.", stars: 5 },
];

export function ProductReviews({ items }) {
    const data = items || TRIALS;

    return (
        <section className="py-24 bg-black text-white">
            <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">Don't just take our word for it.</h2>
                    <div className="flex justify-center gap-1 text-[#d97706] mb-4">
                        {[1, 2, 3, 4, 5].map(s => <Star key={s} size={24} fill="currentColor" strokeWidth={0} />)}
                    </div>
                    <p className="text-gray-400">4.9/5 Average Rating from 2,000+ happy customers.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {data.map((t, i) => (
                        <div key={i} className="bg-[#1a1a1a] p-8 rounded-2xl border border-white/10">
                            <div className="flex gap-1 text-[#d97706] mb-4">
                                {[...Array(t.stars)].map((_, s) => <Star key={s} size={16} fill="currentColor" strokeWidth={0} />)}
                            </div>
                            <p className="text-lg leading-relaxed mb-6 text-gray-300">"{t.text}"</p>
                            <p className="font-bold text-sm text-gray-400">— {t.name}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
