import { Character } from "../../interfaces/character.interface";
import { Episode } from "../../interfaces/episode.interafce";
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

export const getAllCharactersFromEpisode = async (data: any, visibleItems: number, setCharData: any): Promise<void> => {
  try {
    if (data.id !== undefined) {
      const characterPromises: Promise<Character>[] = [];
      let countOfCharacters = visibleItems;
      if (data.characters.length < visibleItems) {
        countOfCharacters = data.characters.length;
      }
      for (let i = 0; i < countOfCharacters; i++) {
        const charPromise = getLocCharacter(data.characters[i]);
        characterPromises.push(charPromise);
      }

      const characters = await Promise.all(characterPromises);
      setCharData(characters);
    }
  } finally {
  }
};

export const getAllEpisodesFromCharacter = async (data: any, visibleItems: number, setEpData: any): Promise<void> => {
  try {
    if (data.id !== undefined) {
      const episodesPromises: Promise<Episode>[] = [];
      let countOfEpisodes = visibleItems;
      if (data.episode.length < visibleItems) {
        countOfEpisodes = data.episode.length;
      }
      for (let i = 0; i < countOfEpisodes; i++) {
        const epPromise = getLocCharacter(data.episode[i]);
        episodesPromises.push(epPromise);
      }

      const episodes = await Promise.all(episodesPromises);
      setEpData(episodes);
    }
  } finally {
  }
};
