const getAllCharacters = async () => {
  try {
    const response = await fetch("https://rickandmortyapi.com/api/character");
    const result = await response.json();
    return result.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export default getAllCharacters;
