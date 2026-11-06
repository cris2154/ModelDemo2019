import db from './db.json';

export interface ProductSpec {
	label: string;
	value: string;
}

export interface Product {
	id: string;
	sku: string;
	name: string;
	category: string;
	price: number;
	oldPrice?: number;
	rating: number;
	reviews: number;
	stock: number;
	badge?: string;
	image: string;
	shortDesc: string;
	description: string;
	warranty: string;
	specs: ProductSpec[];
	highlights: string[];
}

export interface Category {
	id: string;
	name: string;
	count: string;
	iconName: string;
	desc: string;
	featured: boolean;
}

export interface Skill {
	id: string;
	category: string;
	title: string;
	metric: string;
	percentage: number;
	badge: string;
	desc: string;
	tags: string[];
	iconName: string;
}

export interface SeasonalOffer {
	id: string;
	seasonName: string;
	tag: string;
	title: string;
	description: string;
	discountAmount: number;
	price: number;
	originalPrice: number;
	stockUnits: number;
	validUntil: string;
	image: string;
}

export interface Milestone {
	step: string;
	year: string;
	phase: string;
	title: string;
	description: string;
	image: string;
	tag: string;
}

export interface StoreInfo {
	name: string;
	tagline: string;
	description: string;
	about: {
		badge: string;
		title: string;
		lead: string;
		history: string;
		stats: { label: string; value: string }[];
		milestones: Milestone[];
		pillars: { title: string; desc: string }[];
	};
	contact: {
		phone: string;
		whatsapp: string;
		email: string;
		supportEmail: string;
		address: string;
		hours: string;
		mapLink: string;
	};
}

export interface Coupon {
	code: string;
	type: 'percentage' | 'fixed';
	value: number;
	description: string;
	active: boolean;
}

// Validación y tipado de entidades desde el Mock Database JSON
export const products: Product[] = db.products as Product[];
export const categories: Category[] = db.categories as Category[];
export const skills: Skill[] = db.skills as Skill[];
export const seasonalOffers: SeasonalOffer[] = db.seasonalOffers as SeasonalOffer[];
export const storeInfo: StoreInfo = db.storeInfo as StoreInfo;
export const coupons: Coupon[] = db.coupons as Coupon[];
