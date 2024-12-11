const urlBase = "https://memes-api.grye.org";

export const fetchMemes = async (page, limit) => {
    try {
      const url = `${urlBase}/memes/?page=${page}&limit=${limit}`;
      const response = await fetch(url);
  
      const data = await response.json();
  
      if (!response.ok) {
        return [null, "Error al obtener memes"];
      }

      const memes = data;
  
      return [memes, null];
    } catch (error) {
      return [null, error.message];
    }
  };