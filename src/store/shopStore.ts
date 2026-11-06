import { createStore } from 'zustand/vanilla';
import { products, coupons, type Product, type Coupon } from '../data/products';

export interface CartItem {
	product: Product;
	qty: number;
}

export interface OrderRecord {
	orderId: string;
	customerName: string;
	customerEmail: string;
	customerAddress: string;
	items: CartItem[];
	subtotal: number;
	discount: number;
	total: number;
	createdAt: string;
}

export interface ShopState {
	products: Product[];
	cart: CartItem[];
	activeTab: 'landing' | 'catalogo' | 'checkout';
	currentCategory: string;
	searchQuery: string;
	activeModalProductId: string | null;
	appliedCoupon: Coupon | null;
	discountRate: number;
	orderHistory: OrderRecord[];

	// Acciones de Carrito con Validación Robusta
	addToCart: (productId: string) => { success: boolean; message: string; product?: Product };
	removeFromCart: (productId: string) => void;
	updateQuantity: (productId: string, delta: number) => { success: boolean; message?: string };
	clearCart: () => void;
	loadDemoCart: () => void;

	// Acciones de Descuentos con Validación
	applyCouponCode: (code: string) => { success: boolean; message: string };

	// Navegación y UI
	setActiveTab: (tab: 'landing' | 'catalogo' | 'checkout') => void;
	setCategory: (category: string) => void;
	setSearchQuery: (query: string) => void;
	openModal: (productId: string) => void;
	closeModal: () => void;

	// Checkout Ficticio con Validación
	processCheckout: (customer: { name: string; email: string; address: string }) => {
		success: boolean;
		message?: string;
		orderId?: string;
		total?: number;
	};

	// Getters computados
	getSubtotal: () => number;
	getDiscount: () => number;
	getTotal: () => number;
	getTotalItemsCount: () => number;
}

export const shopStore = createStore<ShopState>((set, get) => ({
	products: products,
	// Precargamos 2 equipos por defecto para permitir probar el checkout ficticio de inmediato
	cart: [
		{ product: products[0], qty: 1 },
		{ product: products[2], qty: 1 },
	],
	activeTab: 'landing',
	currentCategory: 'Todos',
	searchQuery: '',
	activeModalProductId: null,
	appliedCoupon: null,
	discountRate: 0,
	orderHistory: [],

	// VALIDACIÓN ZUSTAND: Añadir al carrito con verificación de stock e integridad
	addToCart: (productId: string) => {
		const state = get();
		const product = state.products.find((p) => p.id === productId);

		if (!product) {
			return { success: false, message: 'Equipo no encontrado en el catálogo' };
		}

		if (product.stock <= 0) {
			return {
				success: false,
				message: `Lo sentimos, ${product.name} está temporalmente agotado.`,
			};
		}

		const existing = state.cart.find((item) => item.product.id === productId);
		const currentQty = existing ? existing.qty : 0;

		// Validación de stock: No exceder unidades físicas reales
		if (currentQty + 1 > product.stock) {
			return {
				success: false,
				message: `Inventario máximo alcanzado (${product.stock} unidades disponibles de ${product.name})`,
			};
		}

		if (existing) {
			set({
				cart: state.cart.map((item) =>
					item.product.id === productId ? { ...item, qty: item.qty + 1 } : item
				),
			});
		} else {
			set({
				cart: [...state.cart, { product, qty: 1 }],
			});
		}

		return {
			success: true,
			message: `${product.name} añadido a tu bolsa`,
			product,
		};
	},

	removeFromCart: (productId: string) => {
		set((state) => ({
			cart: state.cart.filter((item) => item.product.id !== productId),
		}));
	},

	// VALIDACIÓN ZUSTAND: Modificación de cantidades con límites de stock
	updateQuantity: (productId: string, delta: number) => {
		const state = get();
		const item = state.cart.find((i) => i.product.id === productId);
		if (!item) return { success: false, message: 'Item no encontrado' };

		const newQty = item.qty + delta;

		if (newQty <= 0) {
			get().removeFromCart(productId);
			return { success: true, message: `${item.product.name} removido de la bolsa` };
		}

		if (newQty > item.product.stock) {
			return {
				success: false,
				message: `Solo disponemos de ${item.product.stock} unidades en almacén`,
			};
		}

		set({
			cart: state.cart.map((i) =>
				i.product.id === productId ? { ...i, qty: newQty } : i
			),
		});

		return { success: true };
	},

	clearCart: () => {
		set({ cart: [] });
	},

	loadDemoCart: () => {
		const { products } = get();
		set({
			cart: [
				{ product: products[0], qty: 1 },
				{ product: products[1], qty: 1 },
			],
		});
	},

	// VALIDACIÓN ZUSTAND: Cupones activos e intransferibles
	applyCouponCode: (rawCode: string) => {
		const code = rawCode.trim().toUpperCase();
		if (!code) {
			return { success: false, message: 'Por favor, ingresa un código promocional' };
		}

		const matchedCoupon = coupons.find((c) => c.code === code && c.active);

		if (matchedCoupon) {
			const rate = matchedCoupon.type === 'percentage' ? matchedCoupon.value : 0.08;
			set({
				appliedCoupon: matchedCoupon,
				discountRate: rate,
			});
			return {
				success: true,
				message: `Cupón ${matchedCoupon.code} aplicado (${matchedCoupon.description})`,
			};
		} else {
			set({ appliedCoupon: null, discountRate: 0 });
			return {
				success: false,
				message: 'Código inválido o expirado. Prueba con TECH10 o NOVA2026',
			};
		}
	},

	setActiveTab: (tab) => set({ activeTab: tab }),
	setCategory: (category) => set({ currentCategory: category }),
	setSearchQuery: (query) => set({ searchQuery: query }),
	openModal: (productId) => set({ activeModalProductId: productId }),
	closeModal: () => set({ activeModalProductId: null }),

	// VALIDACIÓN ZUSTAND: Proceso de orden de compra
	processCheckout: (customer) => {
		const state = get();

		if (state.cart.length === 0) {
			return { success: false, message: 'La bolsa de compra está vacía' };
		}

		if (!customer.name || customer.name.trim().length < 3) {
			return { success: false, message: 'Ingresa un nombre y apellido válido' };
		}

		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!customer.email || !emailRegex.test(customer.email.trim())) {
			return { success: false, message: 'Ingresa un correo electrónico corporativo o personal válido' };
		}

		if (!customer.address || customer.address.trim().length < 6) {
			return { success: false, message: 'Ingresa una dirección de entrega exacta' };
		}

		const subtotal = state.getSubtotal();
		const discount = state.getDiscount();
		const total = state.getTotal();
		const orderId = `#EN-2026-${Math.floor(1000 + Math.random() * 9000)}`;

		const newOrder: OrderRecord = {
			orderId,
			customerName: customer.name.trim(),
			customerEmail: customer.email.trim(),
			customerAddress: customer.address.trim(),
			items: [...state.cart],
			subtotal,
			discount,
			total,
			createdAt: new Date().toISOString(),
		};

		set({
			orderHistory: [newOrder, ...state.orderHistory],
			cart: [],
			appliedCoupon: null,
			discountRate: 0,
		});

		return { success: true, orderId, total };
	},

	getSubtotal: () => {
		return get().cart.reduce((acc, item) => acc + item.product.price * item.qty, 0);
	},

	getDiscount: () => {
		const sub = get().getSubtotal();
		return Math.round(sub * get().discountRate);
	},

	getTotal: () => {
		return Math.max(0, get().getSubtotal() - get().getDiscount());
	},

	getTotalItemsCount: () => {
		return get().cart.reduce((acc, item) => acc + item.qty, 0);
	},
}));
