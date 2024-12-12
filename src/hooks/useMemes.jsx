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

      setMemes((prevMemes) => (reset ? data : [...prevMemes, ...data]));
      setHayMas(data.length === 12);
    } catch (error) {
      console.error(error);
    } finally {
      setEstaCargando(false);
    }
  };

  const cambiarOrden = (nuevoOrden) => {
    setSortBy(nuevoOrden);
    setPagina(1); 
    cargarMemes(1, true);
  };

  const cargarSiguientePagina = () => {
    if (!estaCargando && hayMas) {
      setPagina((prevPagina) => {
        const nuevaPagina = prevPagina + 1;
        cargarMemes(nuevaPagina);
        return nuevaPagina;
      });
    }
  };

  useEffect(() => {
    cargarMemes(pagina, pagina === 1);
  }, [sort_by]);

  return { memes, estaCargando, hayMas, cargarSiguientePagina, cambiarOrden, cargarMemes, sort_by };
};

export default useMemes;
