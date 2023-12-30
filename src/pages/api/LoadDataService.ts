import { Character } from "../interfaces/character.interface";
import { getLocCharacter } from "./ApiService";

export const getAllCharactersFromLocation = async (
  data: any,
  visibleItems: number,
  setCharData: any
): Promise<void> => {
  try {
    if (data.id !== undefined) {
      const characterPromises: Promise<Character>[] = [];
      let countOfCharacters = visibleItems;
      if (data.residents.length < visibleItems) {
        countOfCharacters = data.residents.length;
      }
      for (let i = 0; i < countOfCharacters; i++) {
        const charPromise = getLocCharacter(data.residents[i]);
        characterPromises.push(charPromise);
      }

      const characters = await Promise.all(characterPromises);
      setCharData(characters);
    }
  } finally {
  }
};
