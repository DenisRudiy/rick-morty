import { Character } from "../../interfaces/character.interface";
import { Location } from "../../interfaces/locations.interface";

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

export const applyLocFilters = (data: Location[], filters: any) => {
  let filtered = data;

  if (filters.type !== "all") {
    filtered = filtered.filter((item) => item.type === filters.type);
  }

  if (filters.dimension !== "all") {
    filtered = filtered.filter((item) => item.dimension === filters.dimension);
  }

  return filtered;
};
