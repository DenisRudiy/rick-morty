import { Character } from "../interfaces/character.interface";
import { Location } from "../interfaces/locations.interface";

export const applyCharFilters = (
  data: Character[],
  speciesFilter: string,
  genderFilter: string,
  statusFilter: string
) => {
  let filtered = data;

  if (speciesFilter !== "all") {
    filtered = filtered.filter((item) => item.species === speciesFilter);
  }

  if (genderFilter !== "all") {
    filtered = filtered.filter((item) => item.gender === genderFilter);
  }

  if (statusFilter !== "all") {
    filtered = filtered.filter((item) => item.status === statusFilter);
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
