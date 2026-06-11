// lib/data/suppliers.ts
// Portuguese market mock pricing data for One Minute Event wedding calculator.
// Pricing based on realistic Portuguese market rates as of 2024.

export type Location = 'North' | 'Center' | 'Lisbon' | 'Alentejo' | 'Algarve';
export type Tier = 'standard' | 'premium';
export type Category =
  | 'venue'
  | 'catering'
  | 'decor'
  | 'lighting'
  | 'tent'
  | 'photography'
  | 'videography'
  | 'dj'
  | 'band'
  | 'furniture_cocktail'
  | 'furniture_dining'
  | 'flowers_base';

export type VenueSetting =
  | 'Country Place'
  | 'Palace/Castle/Convent'
  | 'Beach'
  | 'City/Urban'
  | 'Garden'
  | 'Mountain/Highland'
  | 'Resort/Hotel';

export type TentType = 'Tarki' | '2-sided' | 'Indian' | 'other';

export type FlowerType =
  | 'Altar / Ceremony Arch'
  | 'Table Centrepieces'
  | 'Bridal Bouquet'
  | 'Bridesmaid Bouquets'
  | 'Boutonnières'
  | 'Flower Wall / Backdrop'
  | 'Aisle Petals / Garlands'
  | 'Welcome Table Arrangement';

export type OtherService =
  | 'Photo Booth'
  | 'Wedding Cake'
  | 'Transport / Limousine'
  | 'Hair & Makeup'
  | 'Master of Ceremonies (MC)'
  | 'Sound System / PA'
  | 'Security'
  | 'Valet Parking';

export type GuestCountRange =
  | '50-100'
  | '100-150'
  | '150-200'
  | '200-250'
  | '250'
  | '300'
  | 'more than 300';

/** Pricing structure per category */
export interface CategoryPricing {
  /** Flat base fee in EUR */
  basePrice: number;
  /** Per-guest cost in EUR (0 if not applicable) */
  pricePerGuest: number;
}

/** Pricing data for all categories in a tier */
export type TierPricing = Record<Category, CategoryPricing>;

/** Location multiplier — applied to ALL line items for that location */
export const LOCATION_MULTIPLIERS: Record<Location, number> = {
  North: 0.90,
  Center: 0.95,
  Lisbon: 1.15,
  Alentejo: 0.93,
  Algarve: 1.10,
};

/** Base pricing before location multiplier, standard tier */
const STANDARD_PRICING: TierPricing = {
  venue: { basePrice: 5_500, pricePerGuest: 0 },
  catering: { basePrice: 0, pricePerGuest: 82 },
  decor: { basePrice: 1_200, pricePerGuest: 4 },
  lighting: { basePrice: 1_800, pricePerGuest: 0 },
  tent: { basePrice: 2_400, pricePerGuest: 8 },
  photography: { basePrice: 2_200, pricePerGuest: 0 },
  videography: { basePrice: 1_600, pricePerGuest: 0 },
  dj: { basePrice: 900, pricePerGuest: 0 },
  band: { basePrice: 2_800, pricePerGuest: 0 },
  furniture_cocktail: { basePrice: 600, pricePerGuest: 3 },
  furniture_dining: { basePrice: 800, pricePerGuest: 5 },
  flowers_base: { basePrice: 800, pricePerGuest: 3 },
};

/** Base pricing before location multiplier, premium tier */
const PREMIUM_PRICING: TierPricing = {
  venue: { basePrice: 12_000, pricePerGuest: 0 },
  catering: { basePrice: 0, pricePerGuest: 118 },
  decor: { basePrice: 2_800, pricePerGuest: 8 },
  lighting: { basePrice: 3_500, pricePerGuest: 0 },
  tent: { basePrice: 4_800, pricePerGuest: 14 },
  photography: { basePrice: 4_200, pricePerGuest: 0 },
  videography: { basePrice: 3_200, pricePerGuest: 0 },
  dj: { basePrice: 1_800, pricePerGuest: 0 },
  band: { basePrice: 5_500, pricePerGuest: 0 },
  furniture_cocktail: { basePrice: 1_200, pricePerGuest: 6 },
  furniture_dining: { basePrice: 1_600, pricePerGuest: 10 },
  flowers_base: { basePrice: 2_000, pricePerGuest: 7 },
};

/** Per-flower-type add-on pricing (standard tier, before location multiplier) */
export const FLOWER_ADDON_PRICING_STANDARD: Record<FlowerType, CategoryPricing> = {
  'Altar / Ceremony Arch': { basePrice: 600, pricePerGuest: 0 },
  'Table Centrepieces': { basePrice: 0, pricePerGuest: 5 },
  'Bridal Bouquet': { basePrice: 180, pricePerGuest: 0 },
  'Bridesmaid Bouquets': { basePrice: 120, pricePerGuest: 0 },
  'Boutonnières': { basePrice: 80, pricePerGuest: 0 },
  'Flower Wall / Backdrop': { basePrice: 800, pricePerGuest: 0 },
  'Aisle Petals / Garlands': { basePrice: 200, pricePerGuest: 0 },
  'Welcome Table Arrangement': { basePrice: 150, pricePerGuest: 0 },
};

/** Per-flower-type add-on pricing (premium tier, before location multiplier) */
export const FLOWER_ADDON_PRICING_PREMIUM: Record<FlowerType, CategoryPricing> = {
  'Altar / Ceremony Arch': { basePrice: 1_400, pricePerGuest: 0 },
  'Table Centrepieces': { basePrice: 0, pricePerGuest: 12 },
  'Bridal Bouquet': { basePrice: 380, pricePerGuest: 0 },
  'Bridesmaid Bouquets': { basePrice: 260, pricePerGuest: 0 },
  'Boutonnières': { basePrice: 160, pricePerGuest: 0 },
  'Flower Wall / Backdrop': { basePrice: 2_200, pricePerGuest: 0 },
  'Aisle Petals / Garlands': { basePrice: 450, pricePerGuest: 0 },
  'Welcome Table Arrangement': { basePrice: 360, pricePerGuest: 0 },
};

/** Other services add-on pricing (standard tier) */
export const OTHER_SERVICE_PRICING_STANDARD: Record<OtherService, CategoryPricing> = {
  'Photo Booth': { basePrice: 600, pricePerGuest: 0 },
  'Wedding Cake': { basePrice: 300, pricePerGuest: 2 },
  'Transport / Limousine': { basePrice: 400, pricePerGuest: 0 },
  'Hair & Makeup': { basePrice: 500, pricePerGuest: 0 },
  'Master of Ceremonies (MC)': { basePrice: 700, pricePerGuest: 0 },
  'Sound System / PA': { basePrice: 800, pricePerGuest: 0 },
  'Security': { basePrice: 0, pricePerGuest: 4 },
  'Valet Parking': { basePrice: 0, pricePerGuest: 5 },
};

/** Other services add-on pricing (premium tier) */
export const OTHER_SERVICE_PRICING_PREMIUM: Record<OtherService, CategoryPricing> = {
  'Photo Booth': { basePrice: 1_200, pricePerGuest: 0 },
  'Wedding Cake': { basePrice: 700, pricePerGuest: 4 },
  'Transport / Limousine': { basePrice: 1_200, pricePerGuest: 0 },
  'Hair & Makeup': { basePrice: 1_200, pricePerGuest: 0 },
  'Master of Ceremonies (MC)': { basePrice: 1_400, pricePerGuest: 0 },
  'Sound System / PA': { basePrice: 1_600, pricePerGuest: 0 },
  'Security': { basePrice: 0, pricePerGuest: 8 },
  'Valet Parking': { basePrice: 0, pricePerGuest: 10 },
};

/** All base pricing keyed by tier */
export const TIER_PRICING: Record<Tier, TierPricing> = {
  standard: STANDARD_PRICING,
  premium: PREMIUM_PRICING,
};
