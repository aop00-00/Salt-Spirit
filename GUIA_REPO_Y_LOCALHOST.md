# Guia del repo y entorno local

## 1. Que es este proyecto

Este repo es un storefront headless montado sobre Shopify Hydrogen.
La base tecnica que usa hoy es:

- `@shopify/hydrogen` para storefront y runtime de Oxygen
- `react-router` con file-based routing
- `vite` para desarrollo y build
- `tailwindcss` para estilos
- GraphQL para Storefront API y Customer Account API

El proyecto no es un React SPA simple. Renderiza del lado del servidor y arma el contexto de Shopify en el servidor antes de entregar HTML.

## 2. Estructura real del repo

### Raiz

- `package.json`: scripts principales del proyecto.
- `server.js`: handler principal del servidor para Hydrogen/Oxygen.
- `vite.config.js`: plugins de Vite, Hydrogen, Oxygen, React Router y Tailwind.
- `react-router.config.js`: aplica el preset oficial de Hydrogen para React Router.
- `.graphqlrc.js`: define codegen y esquemas GraphQL.
- `README.md`: README base del template de Hydrogen.
- `dist/`: build generado para cliente y servidor. Si no es parte intencional del flujo de despliegue, conviene no versionarlo.

### `app/`

Es el corazon de la aplicacion.

- `app/root.jsx`: shell global de la app. Carga datos globales como header, footer, cart, analytics y consentimiento.
- `app/entry.client.jsx`: hidratacion en el navegador.
- `app/entry.server.jsx`: render del lado del servidor y CSP.
- `app/routes.js`: activa file-based routing con `flatRoutes()` y rutas de Hydrogen.

Subcarpetas importantes:

- `app/routes/`: paginas y endpoints del sitio.
- `app/components/`: componentes UI organizados por dominio.
- `app/lib/`: utilidades, session, context de Hydrogen, fragments y helpers.
- `app/graphql/`: queries/mutations para Customer Account API.
- `app/data/`: contenido local del proyecto.
- `app/styles/`: CSS global, reset y Tailwind.
- `app/assets/`: assets importados desde la app.

### `app/routes/`

Las rutas siguen convencion por nombre de archivo. Ejemplos utiles:

- `_index.jsx`: home.
- `about.jsx`: pagina estatica.
- `products._index.jsx` y `products.$handle.jsx`: listado y detalle de producto.
- `collections._index.jsx` y `collections.$handle.jsx`: colecciones.
- `cart.jsx` y `cart.$lines.jsx`: carrito.
- `search.jsx`: busqueda.
- `blogs.*`: blog y articulos.
- `account.*` y `account_.*`: cuenta de cliente, login, addresses, orders.
- `[robots.txt].jsx`, `[sitemap.xml].jsx`, `sitemap.$type.$page[.xml].jsx`: SEO tecnico.
- `$.jsx`: catch-all.

### `app/components/`

La UI esta agrupada por feature:

- `Layout/`: header, footer, layout general.
- `Cart/`: carrito.
- `Product/`: detalle de producto.
- `Products/`: secciones de catalogo.
- `Search/`: busqueda y predictive search.
- `Common/`: piezas reutilizables.
- `Combo/`: experiencia de combo builder.

Tambien hay componentes visuales mas custom como `LavaLamp`, `InfiniteHero`, `ShaderBackground`, `Slideshow`, etc.

### `public/`

Assets estaticos servidos tal cual. Aqui hay muchas imagenes y una fuente `.otf`.

### `guides/`

Documentacion puntual de features, por ejemplo `search` y `predictiveSearch`.

### Otros directorios

- `.github/workflows/`: hoy existe un workflow que despliega a Oxygen en cada `push`.
- `.react-router/`: artefactos generados.
- `.cursor/`: configuracion local de editor/herramienta.

## 3. Como se levanta en localhost

En tu clon actual detecte esto:

- no existe `node_modules/`
- no existe `.env`
- no existe `.env.example`

Eso significa que antes de correr el proyecto te faltan dependencias y variables de entorno.

### Requisitos

- Node `>=18`
- npm
- acceso a la tienda/configuracion de Shopify que use este storefront

### Scripts disponibles

Desde `package.json`:

- `npm run dev`: desarrollo local con Hydrogen + codegen
- `npm run build`: build de produccion
- `npm run preview`: preview del build
- `npm run lint`: lint
- `npm run codegen`: genera tipos y artefactos de GraphQL/React Router

### Paso a paso recomendado

1. Instala dependencias:

```bash
npm install
```

2. Crea tu `.env` en la raiz.

Por el codigo actual, como minimo se usan estas variables:

```env
SESSION_SECRET=pon_aqui_un_valor_largo_y_aleatorio
PUBLIC_STORE_DOMAIN=tu-dominio-storefront
PUBLIC_CHECKOUT_DOMAIN=tu-dominio-checkout
PUBLIC_STOREFRONT_API_TOKEN=tu_public_storefront_api_token
PUBLIC_STOREFRONT_ID=tu_public_storefront_id
```

Notas:

- `SESSION_SECRET` es obligatoria. `app/lib/context.js` lanza error si no existe.
- `PUBLIC_STORE_DOMAIN` y `PUBLIC_CHECKOUT_DOMAIN` se usan en SSR/CSP y analytics.
- `PUBLIC_STOREFRONT_API_TOKEN` y `PUBLIC_STOREFRONT_ID` se usan en analytics/consent.
- Si `/account` debe funcionar localmente, el `README.md` indica que hay configuracion adicional del Customer Account API para dominio publico local.

3. Levanta el entorno:

```bash
npm run dev
```

4. Abre la URL que imprima la CLI en terminal.

Normalmente sera algo como:

```text
http://localhost:3000
```

pero la fuente de verdad es la URL que muestre Hydrogen al arrancar.

### Si quieres validar que todo quedo bien

Corre tambien:

```bash
npm run lint
npm run build
```

Si `dev` levanta pero `build` falla, tienes deuda tecnica que no deberias dejar pasar.

## 4. Flujo mental para moverte dentro del proyecto

Si quieres entender rapido donde tocar algo:

- cambio global de layout/header/footer: `app/root.jsx` y `app/components/Layout/*`
- nueva pagina: `app/routes/`
- cambio visual de una seccion concreta: `app/components/`
- logica de Shopify, sesion o helpers: `app/lib/`
- queries y fragments: `app/lib/fragments.js` y `app/graphql/`
- imagenes estaticas: `public/`

## 5. Practicas que te recomiendo implementar aqui

Estas recomendaciones salen de lo que vi en este repo, no de una lista generica.

### Alta prioridad

1. Agregar `.env.example`

Hoy no existe. Eso hace mas lento cualquier onboarding y aumenta errores de configuracion.

2. Agregar tests

No encontre tests unitarios ni e2e. En un storefront conviene cubrir como minimo:

- home render
- PDP
- add to cart
- cart update
- search
- rutas `account` si son criticas

3. Separar deploy de push directo

Hoy `.github/workflows/oxygen-deployment-1000084495.yml` despliega en cada `push`. Eso es riesgoso si trabajas en ramas sin proteccion. Mejor:

- deploy solo desde `main`
- checks previos de lint/build/tests
- PR review antes de merge

4. Revisar si `dist/` debe seguir versionado

El repo trae `dist/` committeado, pero ESLint lo ignora y normalmente es build output. Si no es requisito de negocio o plataforma, mejor no versionarlo.

### Media prioridad

5. Fijar version de Node del equipo

Aunque `package.json` pide `>=18`, conviene estandarizar con una sola version real usando `.nvmrc`, `.node-version` o Volta.

6. Agregar script de formato

Hay Prettier configurado, pero no hay script tipo:

```bash
npm run format
```

7. Documentar arquitectura de Shopify

Conviene dejar claro en un doc corto:

- que tienda usa
- de donde salen las env vars
- que menus de Shopify espera el header/footer
- que features dependen de Customer Account API

8. Reducir dependencia de contenido hardcodeado

Existe `app/data/product_content.js`. Si ese contenido cambia seguido, probablemente termine mejor en Shopify metafields o CMS.

### Calidad de frontend

9. Establecer reglas para assets

`public/` tiene muchas imagenes pesadas y nombres inconsistentes. Conviene definir:

- naming convention
- compresion obligatoria
- tamanos maximos
- uso de formatos modernos cuando aplique

10. Medir performance real

Este sitio tiene componentes visuales fuertes y uso de `three` / `@react-three/fiber`. Antes de agregar mas efectos, medir:

- LCP
- CLS
- peso de JS
- impacto de imagenes above the fold

11. Crear fronteras mas claras entre UI y datos

En storefronts grandes, ayuda separar:

- loaders/query logic
- mapping de datos
- componentes presentacionales

Eso facilita testing y reduce acoplamiento.

## 6. Mi checklist minima despues de clonar

Yo haria esto en este orden:

1. `npm install`
2. crear `.env`
3. `npm run dev`
4. abrir localhost
5. `npm run lint`
6. `npm run build`
7. revisar flujo de deploy antes de subir cambios

## 7. Resumen corto

La app esta bien encaminada como base de Hydrogen, pero le faltan piezas de mantenimiento de equipo: ejemplo de variables, tests y un flujo de CI/CD menos agresivo. Si primero dejas estable el entorno local y luego agregas esas tres practicas, el repo va a ser mucho mas facil de operar.
