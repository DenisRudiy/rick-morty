export const getAllData = async (data: string) => {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/${data}`);
    const result = await response.json();
    return result.results;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getCurrData = async (id: any, data: string) => {
  try {
    const response = await fetch(`https://rickandmortyapi.com/api/${data}/${id}`);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

export const getLocCharacter = async (url: string) => {
  try {
    const response = await fetch(url);
    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};
