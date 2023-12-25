import { Character } from "../interfaces/character.interface";

export const applyFilters = (data: Character[], speciesFilter: string, genderFilter: string, statusFilter: string) => {
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
