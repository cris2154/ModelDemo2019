# Plan de implementación: ofertas de temporada abiertas y vista de producto a pantalla completa

Eliminar el marco exterior de las ofertas de temporada para integrarlas directamente sobre el fondo oscuro de la página y transformar la ficha de producto (`Ver ficha` / `Ver detalles`) de un modal flotante en una vista dedicada a pantalla completa sin modificar la URL del navegador.

## Resultado esperado

1. **Ofertas de temporada sin contenedor envolvente (`#section-temporada`)**:
   - Retirar `.surface-card` (fondo `#0a0a0e`, borde exterior y radio de tarjeta) de `SeasonalOfferCard.astro`.
   - Presentar cada oferta de temporada como un bloque editorial abierto sobre `#050507`, separado únicamente por alineación, espaciado y divisores sutiles (`border-white/10`), igual que las cards de productos destacados y catálogo.
   - Conservar fotografías, textos comerciales, precios, ahorro directo, stock disponible, clase `.seasonal-card` y el CTA hacia checkout (`data-tab-target="checkout"`).

2. **Ficha de producto como pantalla completa sin cambiar la URL (`ProductModal.astro` + `index.astro`)**:
   - Sustituir la ventana flotante centrada (`max-w-4xl max-h-[90vh] surface-card`) por una vista a pantalla completa (`fixed inset-0 z-50 overflow-y-auto overscroll-contain bg-[#050507]`).
   - Incluir una barra superior de navegación dentro de la vista con botón explícito de regreso (`#modal-close-btn`, `← Volver`) y contexto de categoría/SKU.
   - Distribuir el contenido en un layout abierto de dos columnas (`max-w-7xl`, `lg:grid-cols-12`): fotografía de gran formato a la izquierda y columna editorial a la derecha con metadatos, título, precio, descripción, acciones de compra (`#modal-add-cart-btn`, `#modal-buy-now-btn`), puntos destacados (`#modal-highlights`), tabla de especificaciones con divisores (`#modal-specs`), garantía (`#modal-warranty`) y fila compacta de medios de pago.
   - Mantener intacta la URL del navegador (`window.location` no cambia al abrir ni al cerrar la ficha) y preservar todos los selectores `modal-*`, `data-open-modal` y la integración con Zustand (`shopStore`).

3. **Animaciones de entrada y salida vinculadas al scroll con GSAP Timeline (`index.astro`)**:
   - Utilizar `gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 92%', end: 'bottom 8%', scrub: 0.45 } })` con etiquetas `intro` (`0 -> 0.22`), `hold` (`0.22 -> 0.78`) y `outro` (`0.78 -> 1.0`) para las ofertas de temporada (`.seasonal-card`), productos destacados (`.featured-card`), catálogo (`.catalog-card`), bloques informativos (`.benefit-card`, `.staircase-step`) y cabeceras de sección.
   - Aplicar entrada limpia (`autoAlpha: 0 -> 1`, `y: 16 -> 0`, `power2.out`), tramo central estable (`immediateRender: false`) y salida minimalista al abandonar la parte superior del viewport (`autoAlpha: 0`, `y: -16`, `power2.in`, `immediateRender: false`), además de secuencias `gsap.timeline()` de entrada y salida en la vista de producto a pantalla completa, respetando `prefers-reduced-motion`.

## Archivos implicados

| Archivo | Cambio previsto |
| --- | --- |
| `src/components/SeasonalOfferCard.astro` | Retirar `.surface-card` y presentar el combo como bloque abierto con divisores horizontales sutiles. |
| `src/components/LandingTab.astro` | Ajustar espaciado de la rejilla en `#section-temporada` para el layout abierto sin cajas. |
| `src/components/ProductModal.astro` | Convertir `#product-info-modal` y `#modal-dialog` en una pantalla completa abierta sobre `#050507` conservando todos los IDs `modal-*`. |
| `src/pages/index.astro` | Adaptar `openProductModal()`, `closeProductModal()` y `switchTab()` para gestionar scroll, foco, tecla `Escape` y transición suave de pantalla completa sin tocar la URL. |
| `odd/tasks/minimalist-cards.md` | Registrar la tarea `T2` con el alcance y verificación ejecutados. |

## Contratos que se preservan

- Sin cambios en la URL ni en el historial del navegador al abrir o cerrar la vista de producto.
- Preservación total de IDs: `product-info-modal`, `modal-backdrop`, `modal-dialog`, `modal-close-btn`, `modal-img`, `modal-badge`, `modal-highlights`, `modal-warranty`, `modal-category`, `modal-sku`, `modal-rating`, `modal-title`, `modal-price`, `modal-old-price`, `modal-stock`, `modal-description`, `modal-specs`, `modal-add-cart-btn`, `modal-buy-now-btn`.
- Preservación de `.seasonal-card`, `data-open-modal`, `data-add-cart` y `data-tab-target="checkout"`.

## Verificación

- Ejecutar `npm run build` y `git diff --check`.
- Comprobar la presencia de los 54 IDs y 17 atributos/clases de contrato en `dist/index.html`.
