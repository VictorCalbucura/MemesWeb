const urlBase = "https://memes-api.grye.org";

  export const login = async (user, password) => {
    try {
      const response = await fetch(`${urlBase}/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: new URLSearchParams({
          username: user,
          password: password,
        }).toString(),
      });
  
      const data = await response.json();

      if (!response.ok) {
        return [null, "Usuario o contraseña incorrectos"];
      }
  
      return [data, null];
    } catch (error) {
      return [null, error.message];
    }
  }

  export const register = async (user, password) => {
    try {
      const response = await fetch(`${urlBase}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          accept: "application/json",
        },
        body: new URLSearchParams({
          username: user,
          password: password,
        }).toString(),
      });
  
      const data = await response.json();

      if (!response.ok) {
        return [null, "Error al registrarse."];
      }
  
      return [data, null];
    } catch (error) {
      return [null, error.message];
    }
  }


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

  export const uploadMeme = async (token, title, description, image) => {
    try{
      if(!token) {
        return [null, 'Debes iniciar sesión para subir un meme'];
      }
      const url = `${urlBase}/memes/?title=${encodeURIComponent(
      title,
      )}&description=${encodeURIComponent(description)}`;
      
      const formData = new FormData();

      formData.append("file", image);

      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
        body: formData,
      });

      if (!response.ok) {
        return [null, "Error al subir meme"];
      }

      return ["Meme subido con exito", null];
    } catch (error){
      return [null, error.mesage || "Error al subir."];
    }
  }

  export const likeMeme = async (token, memeId) => {
    try {
      if (!token){
        return [null, "Debes iniciar sesión para dar like a un meme."];
      }

      const url = `${urlBase}/memes/${memeId}`;

      const response = await fetch(url, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });

      const { likes } = await response.json();

      if (!response.ok) {
        return [null, "Error al dar like a meme"];
      }

      return [likes, null];
    } catch (error){
      return [null, error.mesage || "Error al dar like."];
    }
  }