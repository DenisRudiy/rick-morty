import { Character } from "../interfaces/character.interface";
import { Location } from "../interfaces/locations.interface";

export const applyCharFilters = (data: Character[], filters: any) => {
  let filtered = data;

  if (filters.species !== "all") {
    filtered = filtered.filter((item) => item.species === filters.species);
  }

  if (filters.gender !== "all") {
    filtered = filtered.filter((item) => item.gender === filters.gender);
  }

  if (filters.status !== "all") {
    filtered = filtered.filter((item) => item.status === filters.status);
  }

  return filtered;
};

export const applyLocFilters = (data: Location[], typeFilter: string, dimensionFilter: string) => {
  let filtered = data;

  if (typeFilter !== "all") {
    filtered = filtered.filter((item) => item.type === typeFilter);
  }

  if (dimensionFilter !== "all") {
    filtered = filtered.filter((item) => item.dimension === dimensionFilter);
  }

  return filtered;
};
