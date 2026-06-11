export type LocationType = 'North' | 'Center' | 'Lisbon' | 'Alentejo' | 'Algarve';
export type TierType = 'standard' | 'premium' | 'luxury';
export type GuestCountRange = '50-100' | '100-150' | '150-200' | '200-250' | '250' | '300' | 'more than 300';
export type VenueSetting = 'Country Place' | 'Palace/Castle/Convent' | 'Beach' | 'City/Urban' | 'Garden' | 'Mountain/Highland' | 'Resort/Hotel';
export type TentType = 'Tarki' | '2-sided' | 'Indian' | 'other';
export type FlowerType = 'Bouquet' | 'Boutonnieres' | 'Petal Basket' | 'Sacrarium Arrangement' | 'Altar Arrangement' | 'Exterior Church Arrangement' | 'Cocktail Area' | 'Round Table Centerpieces' | 'Rectangular Table Centerpieces' | 'Buffets';
export type ServiceType = 'Photographer' | 'Videographer' | 'DJ' | 'Entertainment Service' | 'Band' | 'Designer/Graphic';

export const LOCATION_MULTIPLIERS: Record<LocationType, number> = {
  'North': 0.9,
  'Center': 0.95,
  'Lisbon': 1.2,
  'Alentejo': 1.0,
  'Algarve': 1.15,
};

export const TIER_MULTIPLIERS: Record<TierType, number> = {
  'standard': 1.0,
  'premium': 1.5,
  'luxury': 2.5,
};

export const MOCK_PRICING = {
  venueBase: {
    'Country Place': 4000,
    'Palace/Castle/Convent': 8000,
    'Beach': 5000,
    'City/Urban': 6000,
    'Garden': 4500,
    'Mountain/Highland': 3500,
    'Resort/Hotel': 7000,
  } as Record<VenueSetting, number>,
  tentBase: {
    'Tarki': 3500,
    '2-sided': 2500,
    'Indian': 4500,
    'other': 3000,
  } as Record<TentType, number>,
  furniture: {
    cocktailBase: 600,
    diningBase: 1200,
  },
  flowers: {
    'Bouquet': 120,
    'Boutonnieres': 15,
    'Petal Basket': 35,
    'Sacrarium Arrangement': 200,
    'Altar Arrangement': 250,
    'Exterior Church Arrangement': 350,
    'Cocktail Area': 600,
    'Round Table Centerpieces': 60, // Per table, estimate 10 guests/table
    'Rectangular Table Centerpieces': 80, // Per table, estimate 10 guests/table
    'Buffets': 200,
  } as Record<FlowerType, number>,
  servicesBase: {
    'Photographer': 1800,
    'Videographer': 1500,
    'DJ': 800,
    'Entertainment Service': 600,
    'Band': 2200,
    'Designer/Graphic': 400,
  } as Record<ServiceType, number>,
  lightingBase: 1200,
  cateringPerGuest: 90,
};

export function getAverageGuestCount(range: GuestCountRange): number {
  switch (range) {
    case '50-100': return 75;
    case '100-150': return 125;
    case '150-200': return 175;
    case '200-250': return 225;
    case '250': return 250;
    case '300': return 300;
    case 'more than 300': return 350;
    default: return 100;
  }
}
