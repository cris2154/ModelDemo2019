# Plan de implementación: cards minimalistas en ElectroNova

Unificar las ofertas de temporada, los productos destacados, el catálogo y el resto de superficies del sitio con el lenguaje visual abierto de Inicio: fondo oscuro, jerarquía clara, menos contenedores y movimiento discreto. Este archivo es un plan para otra IA; todavía no implementa el rediseño.

## Resultado esperado

Las tres capturas muestran superficies que deben simplificarse. La primera captura, de temporada, **también debe rediseñarse**: no es un modelo minimalista terminado que deba copiarse. Conservar fotografías, contenido comercial, precios y acciones; eliminar marcos dentro de marcos, reflejos, halos y etiquetas innecesarias.

1. Definir tokens y una estructura compartida de producto.
2. Migrar temporada, destacados y catálogo juntos por comportamiento coherente.
3. Aplicar el mismo criterio a modal, checkout y cards informativas.
4. Ajustar los estilos que JavaScript vuelve a insertar y verificar todos los estados.

## Límites y decisiones ya aceptadas

- Mantener Astro, Tailwind, GSAP, Lenis y Zustand; no añadir dependencias ni cambiar el backend.
- Conservar el hero abierto, el nav de texto, el carrito minimalista y los desplegables actuales.
- Mantener el árbol animado de benchmarks: línea vertical, nodos y ramificaciones. No recuperar sus métricas, porcentajes ni barras horizontales eliminadas.
- No recuperar la sección de categorías eliminada de Inicio. Las categorías siguen disponibles en el nav y catálogo.
- Mantener textos en español y nombres técnicos de componentes en inglés.
- Este alcance es visual y estructural. No cambiar precios, descuentos, stock, datos, moneda, validaciones ni reglas de compra.
- Revisar el estado de Git antes de empezar: existen cambios locales previos que deben preservarse. Este plan no autoriza commits, push, PR ni publicación.

## Inventario completo de superficies existentes

Las rutas son relativas a la raíz. Los selectores son los puntos de referencia estables; las líneas pueden moverse durante la implementación.

| Archivo existente | Superficies y responsabilidad | Cambio previsto |
| --- | --- | --- |
| `src/components/LandingTab.astro` | `#section-temporada`, `.seasonal-card` | Oferta abierta o una sola superficie sólida; imagen, título, descripción breve, stock, ahorro y precio sin chips anidados ni halos. Mantener CTA a checkout. |
| `src/components/LandingTab.astro` | `.featured-card` | Migrar a `ProductCard`, compartido con catálogo; misma jerarquía y acciones. |
| `src/components/LandingTab.astro` | `#section-nosotros`, estadísticas, `.staircase-step`, pilares | Quitar card exterior y subcards redundantes; estadísticas y pilares como grupos de texto/divisores. Conservar hitos e imágenes y su secuencia. |
| `src/components/LandingTab.astro` | `.benefit-card` | Convertir en bloques ligeros de icono, título y descripción; evitar cuatro cajas oscuras con brillo. |
| `src/components/LandingTab.astro` | `#section-contacto`, formulario interior e iconos | Abrir el layout y conservar límites claros en los campos; eliminar doble caja exterior/interior. No inventar envío real del formulario. |
| `src/components/LandingTab.astro` | Hero y `#skills-timeline-section` | Referencias de estilo y regresión: conservar las decisiones anteriores y el árbol animado. |
| `src/components/CatalogTab.astro` | Encabezado, buscador, `#category-filters`, contador | Quitar card envolvente del encabezado; título breve, buscador accesible y filtros de texto con estado activo discreto. |
| `src/components/CatalogTab.astro` | `#catalog-grid`, `.catalog-card` | Reutilizar `ProductCard`; eliminar caja de mini especificaciones, SKU protagonista, badges de stock/envío y pagos repetidos. Información detallada sigue disponible en modal. |
| `src/components/ProductModal.astro` | `#modal-dialog`, imagen, destacados, garantía, ficha y acciones | Una superficie sólida para el diálogo; contenido interior abierto, ficha con filas/divisores y garantía en texto. No aplicar tilt al diálogo. |
| `src/components/CheckoutTab.astro` | Cabecera, datos del comprador, métodos/paneles de pago | Quitar card exterior de cabecera y cajas anidadas; agrupar por encabezados y espacios. Campos, errores y selección deben seguir identificables. |
| `src/components/CheckoutTab.astro` | Preview de tarjeta, QR, transferencia | Reducir acabado metálico y decoraciones; preservar la legibilidad del QR, instrucciones, datos y campos de cada método. |
| `src/components/CheckoutTab.astro` | Resumen sticky, cupones, carrito vacío, confirmación | Resumen compacto con un límite visual claro; cupones sin chips excesivos; confirmación simple y legible, sin sombras pesadas. |
| `src/components/PaymentBadges.astro` | Variantes `hero`, `card`, `checkout` declaradas en Props | Unificar pagos como una fila discreta de marcas/texto. Solo `hero` y `card` tienen ramas renderizadas actualmente; no suponer que `checkout` ya tiene implementación. |
| `src/components/Navbar.astro` | Nav, carrito y dropdowns | Conservar apariencia y comportamiento ya aprobados; verificar que los tokens globales no los alteren. No añadir nuevas cápsulas. |
| `src/components/icons/Icon.astro` | Biblioteca SVG usada en información y confianza | Reutilizar iconos existentes con tamaño y trazo coherentes; quitar contenedores decorativos de iconos en consumidores. No crear otra biblioteca. |
| `src/styles/global.css` | `.card-2rem`, pseudo-elementos, hover, `.metallic-gold-card` y efectos auxiliares | Sustituir acabado con gradiente, blur, sombra y glow por tokens y estilos explícitos. Retirar `border-radius: 2rem !important` universal. |
| `src/layouts/Layout.astro` | Fondo, trama, glow fijo, tipografías y metadatos | Atenuar decoración ambiental si compite con el nuevo diseño; conservar fuentes, estructura y SEO. No cambiar JSON-LD ni moneda. |
| `src/pages/index.astro` | Composición, footer, toast y HTML generado | Alinear footer/pagos y notificaciones con las superficies nuevas. Migrar también los estilos insertados por scripts; no basta cambiar archivos `.astro`. |
| `src/data/products.ts`, `src/data/db.json` | Contratos y datos de productos/ofertas/contenido | Solo lectura para tipar props y conservar contenido. Sin cambios de datos. |
| `src/store/shopStore.ts` | Carrito, stock, cupones, navegación y checkout ficticio | Solo lectura; conservar acciones, cálculos y validaciones. El checkout actual es una demostración, no una pasarela real. |

## Sistema visual común

| Elemento | Especificación de implementación |
| --- | --- |
| Fondos | Página oscura existente; superficie sólida `#0a0a0e` cuando sea necesaria. Evitar transparencias, blur y gradientes en cards. |
| Bordes | Como máximo un borde exterior tenue o un divisor por grupo. No rodear cada metadato. |
| Radio | `2rem` solo para una superficie exterior que realmente lo necesite, como el diálogo; no imponerlo a secciones, imágenes, etiquetas y botones a la vez. Cards de producto abiertas por defecto. |
| Texto | Títulos de card de 18–20 px y peso 600; descripción de 13–14 px; metadatos de 11–12 px legibles. Evitar títulos largos en mayúsculas y negro tipográfico en todo el bloque. |
| Color | Blanco para título/precio, gris para apoyo y naranja escaso para un estado comercial o acción. Evitar que título, rating, etiqueta, borde y ahorro compitan en naranja simultáneamente. |
| Espaciado | Separaciones de 8/12/16/24/32 px; padding solo donde exista una superficie. La separación y la alineación reemplazan cajas. |
| Imagen | Un único contenedor funcional para ratio/recorte; sin borde y sombra duplicados. Reservar espacio con ratio coherente y no deformar imágenes. |
| Metadatos | Categoría, rating, stock y promoción en texto discreto. Badge opcional, nunca varias cápsulas superpuestas. Mantener contenido accesible aunque cambie su ubicación. |
| Precio | Precio actual claro; anterior tachado cuando exista. No recalcular ahorros ni cambiar formato/moneda como parte de este trabajo. |
| Acciones | Acción principal clara y secundaria de texto/icono con nombre accesible. No convertir toda la card en botón si contiene otros botones. |
| Pagos | Mostrar una fila compacta por sección comercial y en checkout; evitar repetir marcas dentro de cada card. Mantener el acceso a la información completa en ficha/checkout. |
| Estados | Foco visible, hover discreto, activo, disabled y error reconocibles sin depender solo del color. Conservar objetivos táctiles cómodos. |

Crear tokens semánticos en `global.css`, por ejemplo `--surface-card`, `--border-subtle`, `--text-muted`, `--radius-surface` y `--space-card`. Reutilizar `--brand-orange` existente. Evitar mezclar tokens nuevos con valores equivalentes dispersos en cientos de clases.

## Componentes propuestos — todavía no existen

Crear únicamente estas piezas justificadas por duplicación real:

| Nuevo archivo | API y uso |
| --- | --- |
| `src/components/ProductCard.astro` | Props `product: Product` y `context: 'featured' \| 'catalog'`. Mismo cuerpo visual; catálogo añade atributos de búsqueda/filtro y metadatos necesarios. Mantener `.featured-card` o `.catalog-card` en la raíz según contexto. No crear estado cliente ni repetir listeners. |
| `src/components/SeasonalOfferCard.astro` | Prop `offer: SeasonalOffer`. Comparte tokens y jerarquía de producto, pero conserva la semántica de combo, precio original, ahorro y stock de oferta. Mantener `.seasonal-card` y CTA actual. |

No crear una jerarquía genérica `CardHeader/CardBody/CardFooter` ni un componente para cada línea de texto. Los grupos informativos y checkout pueden usar clases comunes y markup semántico. Añadir un wrapper genérico con slots solo si, después de migrar las primeras dos familias, existe estructura idéntica que lo justifique; no es requisito inicial.

### Contrato de `ProductCard`

- Imagen, categoría, nombre, descripción breve, precio actual/anterior y acciones en el mismo orden en Inicio y catálogo.
- `data-open-modal={product.id}` en un botón accesible de detalles; `data-add-cart={product.id}` en añadir.
- En contexto catálogo, conservar `data-card-category` y `data-card-name` normalizado, incluyendo nombre, descripción y categoría como hoy.
- No asignar IDs fijos compartidos entre instancias. No anidar botones o enlaces interactivos.
- Mantener stock/rating/reseñas disponibles como texto compacto o ficha completa según el contexto, sin inventar disponibilidad.
- Usar `class:list`/props para clases de contexto; no copiar el mismo template entre páginas.

## Integración crítica con JavaScript

| Punto actual en `src/pages/index.astro` | Acción necesaria |
| --- | --- |
| `initCard3DTilt()` selecciona todas las `.card-2rem` | Retirar el tilt, elevación y rebote de las cards migradas. Eliminar la función/llamada si ya no queda un consumidor intencional; no dejar listeners globales muertos. |
| `initCardScrollAnimations()` | Mantener una única entrada suave por card: opacidad y desplazamiento de hasta 10 px, 0.35–0.45 s, sin escala ni rebote. Aplicar `prefers-reduced-motion` y limpieza acotada. |
| `applyCatalogFilter()` | Sustituir las asignaciones completas a `btn.className` por clases de estado o `aria-pressed`; de lo contrario reaparecen filtros con cápsulas y sombras. Reducir también la escala `0.88` de resultados filtrados. |
| `switchTab()` y refrescos de ScrollTrigger | Conservar paneles, IDs y actualización de geometría después de mostrar contenido oculto. Probar volver del checkout al catálogo y cambiar filtros. |
| `openProductModal()` / `closeProductModal()` | Preservar población de todos los `modal-*`; simplificar movimiento sin alterar apertura/cierre. Alinear las filas generadas en `modal-specs` y `modal-highlights` con el nuevo estilo. |
| `renderCartFromStore()` | El HTML de cada fila se construye con `innerHTML`: quitar aquí la caja por artículo y actualizar clases, no solo en CheckoutTab. Conservar `data-cart-inc/dec` y su registro de eventos después de renderizar. |
| Selección de `.pay-method-btn` | También reescribe `className` completo; migrar a clases de estado/atributos para evitar restaurar cajas y fondos antiguos. Preservar `data-pay-method` y alternancia de paneles. |
| `showToast()` y feedback de cupones | Mantener mensajes y estado success/error; reducir únicamente decoración y movimiento. No eliminar feedback al simplificar. |
| `initNosotrosStaircaseAnimation()` | Conservar lectura secuencial de hitos; evitar superponer su animación con la entrada genérica de cards. |
| `initSkillsScrollTimeline()` | Conservar árbol, `scaleY`, nodos, revelado suave y cleanup actual. No volver a añadir el panel de métricas ni convertir el árbol en una fila plana. |

Los componentes Astro se renderizan en la página; los handlers actuales se registran desde `index.astro`. Extraer markup no debe duplicar listeners ni exigir un framework cliente nuevo. Para el carrito dinámico, usar clases compartidas desde su template actual; un componente Astro por sí solo no vuelve a renderizarse cuando cambia Zustand.

## Contratos funcionales que no deben romperse

- Navegación: `tab-landing`, `tab-catalogo`, `tab-checkout`, `data-tab-target`, `data-scroll-anchor`, `data-jump-category` y anchors de sección.
- Catálogo: `catalog-search`, `category-filters`, `.cat-filter-btn`, `data-filter-cat`, `catalog-grid`, `.catalog-card`, `data-card-*` y `catalog-count`.
- Productos: `data-open-modal`, `data-add-cart`, `product-info-modal`, `modal-dialog`, `modal-backdrop`, `modal-close-btn`, `modal-add-cart-btn`, `modal-buy-now-btn` y todos los IDs de campos `modal-*` existentes.
- Carrito: `nav-cart-trigger`, `nav-cart-badge`, `nav-cart-total`, `checkout-cart-items`, `checkout-empty-state`, `data-cart-inc`, `data-cart-dec`, `clear-cart-btn`, `load-demo-cart-btn`.
- Checkout: `checkout-form`, campos del comprador/tarjeta, `.pay-method-btn`, `.pay-panel`, `data-pay-method`, `pay-panel-card`, `pay-panel-qr`, `pay-panel-transfer`, cupones/feedback, `summary-*`, `submit-payment-btn`, `payment-success-modal`, `payment-success-card`, `receipt-*`, `close-success-btn`.
- Copiar el inventario completo de IDs/campos desde el código antes de editar checkout; los nombres abreviados anteriores representan familias, no permiso para eliminar el resto.
- Las ofertas de temporada **actualmente solo navegan a checkout**: no añaden el combo ni aplican su precio al store. Preservar ese comportamiento en este rediseño. Cambiarlo sería otra tarea funcional que requiere autorización.
- Conservar límites de stock, cantidades, eliminación, cupones, subtotal/descuento/total, mensajes de error y checkout ficticio. No alterar `Product`, `SeasonalOffer` ni `ShopState`.

## Fases de implementación y entregables

| Orden | Trabajo | Dependencia | Criterio de cierre |
| --- | --- | --- | --- |
| 1 | Capturar estado actual y definir tokens/clases comunes; retirar acabado global pesado con migración controlada | Ninguna | Inventario de consumidores completo; ningún consumidor queda con contraste roto al quitar `.card-2rem`. |
| 2 | Crear `ProductCard` y migrar destacados/catálogo; abrir cabecera y filtros; actualizar estados JS | 1 | Misma jerarquía en ambos lugares; búsqueda/filtro/detalles/añadir correctos. |
| 3 | Crear `SeasonalOfferCard` y migrar temporada; centralizar fila de pagos | 1–2 | Sin chips y marcos anidados; ahorro, stock, precios y CTA conservados. |
| 4 | Simplificar modal y checkout, incluido HTML dinámico y estados de pago | 1–3 | Ficha completa legible, carrito y métodos funcionan, confirmación accesible. |
| 5 | Migrar Nosotros, hitos, confianza, contacto y footer; revisar fondo e iconos | 1 | Todas las cards, incluso las que no aparecen en capturas, usan el mismo lenguaje. |
| 6 | Unificar movimiento y ejecutar regresión visual/funcional | 2–5 | Árbol conservado; sin tilt/glows ni dobles animaciones; criterios siguientes completos. |

Cada unidad debe incluir markup, estilos y adaptación de scripts que hacen funcionar ese comportamiento. Si después se autoriza versionar, mensajes sugeridos: `refactor(ui): unify product cards`, `refactor(ui): simplify seasonal offers`, `refactor(ui): align checkout surfaces`. No separar CSS de sus handlers en commits que dejan un estado intermedio roto.

## Archivos previstos para implementar

Modificar:

```text
src/styles/global.css
src/components/LandingTab.astro
src/components/CatalogTab.astro
src/components/PaymentBadges.astro
src/components/ProductModal.astro
src/components/CheckoutTab.astro
src/pages/index.astro
src/layouts/Layout.astro
```

Crear:

```text
src/components/ProductCard.astro
src/components/SeasonalOfferCard.astro
```

Consultar sin modificar: `src/components/Navbar.astro`, `src/components/icons/Icon.astro`, `src/data/products.ts`, `src/data/db.json`, `src/store/shopStore.ts`, `package.json`, `AGENTS.md` y este plan. Si se detecta una necesidad real fuera de estas rutas, justificarla antes de ampliar el alcance. No mover imágenes ni cambiar dependencias para esta tarea.

## Verificación y aceptación

No existe script de tests en `package.json`; no afirmar que hay una suite visual. Para esta refactorización, ejecutar `npm run build` y `git diff --check`, más comprobación funcional y visual real. Seguir `AGENTS.md` al iniciar el servidor: `astro dev --background`; usar `astro dev status`, `astro dev logs` y `astro dev stop` para gestionarlo. Si el comando no está disponible en la instalación, informar la limitación antes de afirmar verificación de navegador.

| Prueba | Resultado exigido |
| --- | --- |
| Inicio, temporada, destacados y catálogo a 1440, 1024, 768 y 390 px | Sin overflow horizontal, texto cortado accidentalmente ni acciones fuera del área visible; imágenes sin deformación. |
| Catálogo sin filtro, cada categoría, búsqueda con y sin resultados | Cantidad correcta; estado activo consistente; cards visibles tras cambios de pestaña. |
| Producto con/sin precio anterior o badge | Composición estable sin huecos grandes; datos fieles al origen. |
| Abrir ficha desde destacados y catálogo, cerrar y comprar | Producto correcto; todos los datos y acciones conservados; teclado/foco visible y cierre operable. |
| Añadir, incrementar/decrementar, alcanzar stock, vaciar y cargar demo | Total y cantidad del nav actualizados; mensajes y límites intactos; estilos no vuelven al diseño anterior tras render. |
| Cupones válidos/incorrectos y cambio entre tarjeta, QR y transferencia | Totales, feedback y panel seleccionado correctos; no se restauran clases antiguas. |
| Checkout inválido y confirmación ficticia válida | Validaciones existentes conservadas; recibo muestra orden/comprador/total correctos. No realizar cobros reales. |
| Scroll, hover, touch y movimiento reducido | Sin tilt, halos, elasticidad o animación duplicada en cards; árbol sigue animado en modo normal y visible estático en reducido. |
| Zoom 200 %, móvil corto y modal largo | Contenido puede crecer/desplazarse sin clipping; campos/acciones alcanzables; resumen sticky no tapa el formulario. |

Checklist visual final:

- [ ] Temporada, destacados y catálogo comparten tipografía, imagen, espaciado, precio y jerarquía de acciones.
- [ ] No quedan cajas de especificaciones, marcos de pagos ni badges redundantes dentro de otras cards.
- [ ] Las superficies que necesitan separación usan fondo sólido y un único límite visual discreto.
- [ ] No reaparecen el hero enmarcado, las categorías borradas ni la columna de eficiencia del árbol.
- [ ] Modal, checkout, Nosotros, beneficios, contacto, footer y estados dinámicos también fueron revisados.
- [ ] Se documentan capturas finales y cualquier check no ejecutado; una compilación correcta no se presenta como validación visual.

## Prompt de entrega para otra IA

> Implementa el plan de `docs/plans/minimalist-cards.md` sobre el estado actual del repositorio. Primero lee `AGENTS.md` y los archivos enumerados; preserva todos los cambios locales previos. El objetivo es unificar todas las cards con un estilo oscuro, abierto y minimalista, incluidas temporada, destacados, catálogo, modal, checkout y superficies informativas. Conserva los contratos de datos, IDs, atributos, acciones y reglas de Zustand; no añadas dependencias ni backend. Reutiliza `ProductCard` en destacados/catálogo y usa un componente distinto para ofertas cuando su semántica lo requiera. Elimina tilt, glow y cajas anidadas, pero conserva la animación de árbol y movimiento suave con reduced motion. Actualiza también clases reinsertadas y HTML generado en `index.astro`. Trabaja por las fases y rutas del plan, verifica build/diff y escenarios visuales/funcionales, y reporta lo no comprobado. No hagas commits, push ni despliegues sin autorización.

## Referencias para la implementación

- [Astro: componentes y slots](https://docs.astro.build/en/basics/astro-components/).
- [Astro: estilos y alcance](https://docs.astro.build/en/guides/styling/).
- [GSAP: matchMedia](https://gsap.com/docs/v3/GSAP/gsap.matchMedia/).
- [GSAP: ScrollTrigger](https://gsap.com/docs/v3/Plugins/ScrollTrigger/).

Estas referencias deben consultarse al implementar. El plan describe el código inspeccionado y decisiones propuestas; no certifica una implementación ni una revisión de navegador.
