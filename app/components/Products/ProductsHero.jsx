export default function ProductsHero() {
    return (
        <section className="products-hero bg-[#FAFAFA] py-20 md:py-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
            <div className="max-w-5xl w-full flex flex-col items-center">
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 text-[#1D1E20] text-center">
                    THE PERFORMANCE STANDARD
                </h1>
                <p className="text-lg md:text-xl text-[#1D1E20] max-w-3xl leading-relaxed opacity-90 text-center">
                    Tecnología de hidratación de precisión diseñada para tu ritmo.<br />
                    <span className="font-semibold">0% Azúcar. 100% Esencial.</span><br />
                    Redefine lo que tu cuerpo es capaz de hacer.
                </p>
            </div>
        </section>
    );
}
