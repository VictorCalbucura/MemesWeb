import { useState, useEffect } from "react";
import { fetchMemes } from "../services/memes";

const useMemes = () => {
  const [memes, setMemes] = useState([]);
  const [estaCargando, setEstaCargando] = useState(false);
  const [pagina, setPagina] = useState(1);
  const [hayMas, setHayMas] = useState(true);
  const [sort_by, setSortBy] = useState("new");

  const cargarMemes = async (pagina, reset = false) => {
    setEstaCargando(true);
  
    try {
      const [data, error] = await fetchMemes(pagina, 12, sort_by);
      if (error) {
        console.error(error);
        return;
      }
  
      setMemes((prevMemes) => {
        if (reset) return data;
  
        const idsExistentes = new Set(prevMemes.map((meme) => meme._id));
        const nuevosMemes = data.filter((meme) => !idsExistentes.has(meme._id));
        return [...prevMemes, ...nuevosMemes];
      });
  
      setHayMas(data.length === 12);
    } catch (error) {
      console.error(error);
    } finally {
      setEstaCargando(false);
    }
  };

    const actualizarMemes = () => {
      setMemes([]);
      setPagina(1);
      setHayMas(true);
      cargarMemes(1, true);
  };
  
  const cambiarOrden = (nuevoOrden) => {
    if (nuevoOrden === sort_by) return;

    setSortBy(nuevoOrden);
    setPagina(1);
    cargarMemes(1, true);
  };

  const cargarSiguientePagina = () => {
    if (!estaCargando && hayMas) {
      const nuevaPagina = pagina + 1;
      setPagina(nuevaPagina);
      cargarMemes(nuevaPagina);
    }
  };
  
  useEffect(() => {
    cargarMemes(1, true);
  }, [sort_by]);

  return { memes, estaCargando, hayMas, cargarSiguientePagina, actualizarMemes, cambiarOrden, sort_by };
};

export default useMemes;
