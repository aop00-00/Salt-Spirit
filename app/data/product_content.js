import { IMAGE_ASSETS } from '~/lib/imagePaths';

export const PRODUCT_CONTENT = {
    default: {
        overview: [
            {
                title: "Calidad Premium",
                description: "Productos seleccionados cuidadosamente para garantizar la mejor experiencia.",
                image: IMAGE_ASSETS.editorial.homeGallery.ritualPremium.avif
            },
            {
                title: "Ciencia y Sabor",
                description: "Fórmulas desarrolladas para hidratarte mejor, con sabores que te encantarán.",
                image: IMAGE_ASSETS.editorial.homeGallery.scienceAndFlavor.avif
            }
        ],
        comparison: [
            { title: "Zero Azúcar", desc: "Endulzado naturalmente" },
            { title: "Electrolitos", desc: "Balance óptimo" },
            { title: "Sabor Real", desc: "Fruta natural" },
            { title: "Keto Friendly", desc: "Bajo en carbohidratos" }
        ],
        faq: [
            { q: "¿Cuánto tiempo tarda el envío?", a: "Enviamos todos los pedidos en 24-48 horas." },
            { q: "¿Tienen garantía?", a: "Sí, garantizamos la satisfacción total." }
        ],
        reviews: [
            { name: "Ana M.", text: "Me encanta el sabor y cómo me siento después de entrenar.", stars: 5 }
        ]
    },
    "pure-blue": {
        overview: [
            {
                title: "Hidratación Profunda",
                description: "Formulado para reponer los electrolitos perdidos durante el día y actividad física intensa.",
                image: IMAGE_ASSETS.editorial.homeGallery.ritualPremium.avif
            },
            {
                title: "Sabor Blueberry",
                description: "Un toque refrescante y dulce de frambuesa azul natural, sin dejar resabios químicos.",
                image: IMAGE_ASSETS.products.pureBlue.card.avif
            },
            {
                title: "Sin Azúcar Añadida",
                description: "Disfruta sin culpa. 0 azúcares, 0 calorías vacías, 100% hidratación.",
                image: IMAGE_ASSETS.products.pureBlue.details.avif
            },
            {
                title: "Minerales Esenciales",
                description: "Cargado con Sodio, Potasio y Magnesio para evitar calambres y fatiga.",
                image: IMAGE_ASSETS.editorial.about.spiritStory.avif
            }
        ],
        comparison: [
            { title: "3x Electrolitos", desc: "Vs agua regular" },
            { title: "Zero Azúcar", desc: "Saludable" },
            { title: "Magnesio", desc: "Para músculos" },
            { title: "Rápida Absorción", desc: "Isotónico" }
        ],
        faq: [
            { q: "¿Cuándo debo tomar Pure Blue?", a: "Idealmente durante o después de tu entrenamiento, o en días de mucho calor." },
            { q: "¿Contiene cafeína?", a: "No, Pure Blue es libre de estimulantes. Es pura hidratación." },
            { q: "¿Es seguro para niños?", a: "Sí, es una alternativa saludable a las bebidas deportivas azucaradas." },
            { q: "¿Cuántos sobres vienen en la caja?", a: "24 sobres individuales." }
        ],
        reviews: [
            { name: "Carlos R.", text: "El sabor es increíble, sabe a raspado pero sin toda la azúcar.", stars: 5 },
            { name: "Lucía P.", text: "Lo tomo en mis clases de spinning y ya no me dan calambres.", stars: 5 },
            { name: "David M.", text: "La mejor hidratación que he probado. 10/10.", stars: 5 }
        ]
    },
    "vital-red": {
        overview: [
            {
                title: "Energía Natural",
                description: "Un boost de energía limpia proveniente de la cafeina natural y L-teanina para potenciar tu concentración, sin nervisosismo ni caidas de energia.",
                image: IMAGE_ASSETS.editorial.homeGallery.vitalRedEditorial.avif
            },
            {
                title: "Sabor frutos rojos",
                description: "La mezcla clásica de frutas tropicales con un toque cítrico revitalizante.",
                image: IMAGE_ASSETS.products.vitalRed.card.avif
            },
            {
                title: "Enfoque Mental",
                description: "Mejora tu concentración y alerta sin los nervios o el 'crash' del café.",
                image: IMAGE_ASSETS.editorial.about.saltStory.avif
            },
            {
                title: "Vitaminas Antioxidantes",
                description: "Reforzado con extracto natural de café, y un aporte de magnesio, potasio, sodio, betabel, allulosa y steviol.",
                image: IMAGE_ASSETS.products.vitalRed.details.avif
            }
        ],
        comparison: [
            { title: "Cafeína Natural", desc: "De té verde" },
            { title: "Vitamina B12", desc: "Energía celular" },
            { title: "Sin Bajones", desc: "Energía estable" },
            { title: "Antioxidantes", desc: "Protección" }
        ],
        faq: [
            { q: "¿Cuánta cafeína tiene?", a: "Contiene 100mg de cafeína natural, equivalente a una taza de café." },
            { q: "¿Puedo tomarlo antes de entrenar?", a: "Sí, es un excelente pre-workout natural." },
            { q: "¿Rompe el ayuno?", a: "Al no tener calorías significativas, generalmente es aceptable en ayunos, pero depende de tu protocolo." }
        ],
        reviews: [
            { name: "Valentina S.", text: "Me da la energía que necesito para la oficina sin ponerme ansiosa como el café.", stars: 5 },
            { name: "Diego T.", text: "El sabor Fruit Punch es buenísimo.", stars: 5 },
            { name: "Andrea L.", text: "Mi sustituto definitivo de las bebidas energéticas.", stars: 5 }
        ]
    },
    "hydra-rest": {
        overview: [
            {
                title: "Relajación Nocturna",
                description: "Diseñado para preparar tu cuerpo y mente para un sueño reparador.",
                image: IMAGE_ASSETS.products.hydraRest.card.avif
            },
            {
                title: "Magnesio Bisglicinato",
                description: "La forma de magnesio más absorbible y relajante para calmar el sistema nervioso.",
                image: IMAGE_ASSETS.products.hydraRest.details1.avif
            },
            {
                title: "Sabor Uva",
                description: "Un sabor suave y reconfortante para tu rutina de noche.",
                image: IMAGE_ASSETS.products.hydraRest.details2.avif
            },
            {
                title: "Sin Melatonina",
                description: "Apoya el sueño natural sin hormonas añadidas, para que despiertes fresco.",
                image: IMAGE_ASSETS.products.hydraRest.details3.avif
            }
        ],
        comparison: [
            { title: "Magnesio Premium", desc: "Alta absorción" },
            { title: "Calma Natural", desc: "GABA & Teanina" },
            { title: "Sin Hormonas", desc: "Descanso real" },
            { title: "Sabor Suave", desc: "Ideal noche" }
        ],
        faq: [
            { q: "¿Produce somnolencia al día siguiente?", a: "No, al no contener sedantes fuertes ni melatonina, despiertas con energía." },
            { q: "¿Cuándo debo tomarlo?", a: "Recomendamos tomarlo 30-60 minutos antes de dormir." },
            { q: "¿Se toma frío o caliente?", a: "Se puede disfrutar delicioso como té caliente o bebida fría." }
        ],
        reviews: [
            { name: "Mariana G.", text: "Me ayuda a desconectar después de un día estresante.", stars: 5 },
            { name: "Jorge H.", text: "Por fin duermo de corrido. El magnesio hace la diferencia.", stars: 5 },
            { name: "Elena K.", text: "Sabe delicioso calientito antes de cama.", stars: 5 }
        ]
    },
    "mix": {
        overview: [
            {
                title: "Lo Mejor de Todo",
                description: "Prueba todos nuestros sabores y beneficios en un solo paquete conveniente.",
                image: IMAGE_ASSETS.products.mix.details1.avif
            },
            {
                title: "Variedad Diaria",
                description: "Energía para la mañana, Hidratación para el día, Descanso para la noche.",
                image: IMAGE_ASSETS.products.mix.details2.avif
            },
            {
                title: "Ideal para Viajar",
                description: "Sobres individuales fáciles de llevar contigo a cualquier aventura.",
                image: IMAGE_ASSETS.products.mix.details3.avif
            },
            {
                title: "Descubre tu Favorito",
                description: "¿No sabes cuál elegir? Empieza por aquí y enamórate de todos.",
                image: IMAGE_ASSETS.products.mix.details4.avif
            }
        ],
        comparison: [
            { title: "Pack Variado", desc: "3 Sabores" },
            { title: "Versátil", desc: "Para toda ocasión" },
            { title: "Ahorro", desc: "Mejor valor" },
            { title: "Regalo Ideal", desc: "Para todos" }
        ],
        faq: [
            { q: "¿Qué sabores incluye?", a: "Incluye 10 sobres de Pure Blue, 10 de Vital Red y 10 de Hydra Rest." },
            { q: "¿Puedo elegir las cantidades?", a: "El Mix Pack viene pre-armado con cantidades iguales de cada uno." },
            { q: "¿Tiene descuento?", a: "Sí, el Mix Pack tiene un precio preferencial comparado con comprar individualmente." }
        ],
        reviews: [
            { name: "Isabel R.", text: "Perfecto para tener opciones. Mi esposo ama el rojo y yo el azul.", stars: 5 },
            { name: "Roberto M.", text: "La mejor forma de probar la marca. Todos me gustaron.", stars: 5 },
            { name: "Patricia S.", text: "Súper práctico para llevar a mis viajes de trabajo.", stars: 5 }
        ]
    }
};
