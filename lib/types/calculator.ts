// lib/types/calculator.ts
// Shared form state types for the budget calculator.

import type { FlowerType, GuestCountRange, Location, OtherService, TentType, Tier, VenueSetting } from '../data/suppliers';

export type { FlowerType, GuestCountRange, Location, OtherService, TentType, Tier, VenueSetting };

export interface FormState {
  location: Location | '';
  guestCountRange: GuestCountRange | '';
  hasVenue: boolean | null;
  venueSetting: VenueSetting | '';
  needsTent: boolean | null;
  tentType: TentType | '';
  cocktailFurniture: boolean | null;
  diningPartyFurniture: boolean | null;
  needsFlowers: boolean | null;
  flowerTypes: FlowerType[];
  needsCatering: boolean | null;
  needsLighting: boolean | null;
  otherServices: OtherService[];
}

export const INITIAL_FORM_STATE: FormState = {
  location: '',
  guestCountRange: '',
  hasVenue: null,
  venueSetting: '',
  needsTent: null,
  tentType: '',
  cocktailFurniture: null,
  diningPartyFurniture: null,
  needsFlowers: null,
  flowerTypes: [],
  needsCatering: null,
  needsLighting: null,
  otherServices: [],
};
