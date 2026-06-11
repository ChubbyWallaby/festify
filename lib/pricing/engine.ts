import {
  LocationType, TierType, GuestCountRange, VenueSetting, TentType,
  FlowerType, ServiceType, LOCATION_MULTIPLIERS, TIER_MULTIPLIERS,
  MOCK_PRICING, getAverageGuestCount
} from '../data/mockPricing';

export interface QuestionnaireState {
  location: LocationType | null;
  tier: TierType; // Defaults to standard
  guestCount: GuestCountRange | null;
  
  hasVenue: boolean | null;
  venueSetting: VenueSetting | null;
  needsTent: boolean | null;
  tentType: TentType | null;
  
  cocktailFurniture: boolean | null;
  diningPartyFurniture: boolean | null;
  
  needsFlowers: boolean | null;
  flowerTypes: FlowerType[];
  
  needsLighting: boolean | null;
  needsCatering: boolean | null;
  otherServices: ServiceType[];
}

export const initialQuestionnaireState: QuestionnaireState = {
  location: null,
  tier: 'standard',
  guestCount: null,
  hasVenue: null,
  venueSetting: null,
  needsTent: null,
  tentType: null,
  cocktailFurniture: null,
  diningPartyFurniture: null,
  needsFlowers: null,
  flowerTypes: [],
  needsLighting: null,
  needsCatering: null,
  otherServices: [],
};

export interface CostBreakdown {
  venue: number;
  tent: number;
  furniture: number;
  flowers: number;
  lighting: number;
  catering: number;
  services: number;
  total: number;
  multiplier: number;
}

export function calculateBudget(state: QuestionnaireState): CostBreakdown {
  if (!state.location || !state.guestCount) {
    return { venue: 0, tent: 0, furniture: 0, flowers: 0, lighting: 0, catering: 0, services: 0, total: 0, multiplier: 1 };
  }

  const multiplier = LOCATION_MULTIPLIERS[state.location] * TIER_MULTIPLIERS[state.tier];
  const guests = getAverageGuestCount(state.guestCount);
  const tables = Math.ceil(guests / 10);

  let venue = 0;
  if (state.hasVenue === false && state.venueSetting) {
    venue = MOCK_PRICING.venueBase[state.venueSetting] * multiplier;
  }

  let tent = 0;
  if (state.hasVenue === false && state.needsTent && state.tentType) {
    tent = MOCK_PRICING.tentBase[state.tentType] * multiplier;
  }

  let furniture = 0;
  if (state.cocktailFurniture) furniture += MOCK_PRICING.furniture.cocktailBase * multiplier;
  if (state.diningPartyFurniture) furniture += MOCK_PRICING.furniture.diningBase * multiplier;

  let flowers = 0;
  if (state.needsFlowers && state.flowerTypes.length > 0) {
    let flowerBase = 0;
    for (const f of state.flowerTypes) {
      if (f === 'Round Table Centerpieces' || f === 'Rectangular Table Centerpieces') {
        flowerBase += MOCK_PRICING.flowers[f] * tables;
      } else {
        flowerBase += MOCK_PRICING.flowers[f];
      }
    }
    flowers = flowerBase * multiplier;
  }

  let lighting = 0;
  if (state.needsLighting) {
    lighting = MOCK_PRICING.lightingBase * multiplier;
  }

  let catering = 0;
  if (state.needsCatering) {
    catering = MOCK_PRICING.cateringPerGuest * guests * multiplier;
  }

  let services = 0;
  if (state.otherServices.length > 0) {
    let servicesBase = 0;
    for (const s of state.otherServices) {
      servicesBase += MOCK_PRICING.servicesBase[s];
    }
    services = servicesBase * multiplier;
  }

  const total = venue + tent + furniture + flowers + lighting + catering + services;

  return { venue, tent, furniture, flowers, lighting, catering, services, total, multiplier };
}
