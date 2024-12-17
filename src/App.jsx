import { useState } from "react";
import { AppShell, Container, Title, Image, Flex, Paper, Box, Button } from "@mantine/core";
import MemeScroll from "./components/MemeScroll";
import MemeElement from "./components/MemeElement";
import User from "./components/User";
import { ProvLogin } from "./context/LoginContext";
import UploadMeme from "./components/UploadMeme";
import useMemes from "./hooks/useMemes";

function App() {
  const { memes, estaCargando, hayMas, cargarSiguientePagina, cambiarOrden, sort_by } = useMemes();
  const [selectedMeme, setSelectedMeme] = useState(null);

  const handleMemeClick = (meme) => setSelectedMeme(meme);
  const handleClose = () => setSelectedMeme(null);

  const handleSortChange = () => {
    const nuevoOrden = sort_by === "new" ? "top" : "new";
    cambiarOrden(nuevoOrden);
  };

  return (
    <ProvLogin>
      <AppShell>
        {/* Header */}
        <Paper shadow="sm" p="md" style={{ backgroundColor: "#f5f5f5", marginBottom: "1rem", position: "sticky", top: 0, zIndex: 1000 }}>
          <Flex justify="space-between" align="center">
            <Flex align="center" gap="md">
              <Image
                src="https://i.postimg.cc/VNM609tJ/Asi-venpezo-empezuela-removebg-preview.png"
                alt="Ulagos Memes"
                height={50}
                fit="contain"
              />
              <Title order={2} style={{ fontWeight: "bold" }}>
                Ulagos Memes
              </Title>
            </Flex>
            <UploadMeme />
            <User />
          </Flex>
        </Paper>

        <Container size="xl">
          <div
            style={{
              filter: selectedMeme ? "blur(5px)" : "none",
              transition: "filter 0.5s ease",
              pointerEvents: selectedMeme ? "none" : "auto",
            }}
          >
            <MemeScroll memes={memes} onMemeClick={handleMemeClick} />
          </div>
          {selectedMeme && <MemeElement meme={selectedMeme} onClose={handleClose} />}
        </Container>
      </AppShell>

      {/* Botón para cambiar el orden */}
      <Button
        variant="filled"
        color="blue"
        style={{ position: "fixed", bottom: 20, left: 20, borderRadius: 8 }}
        onClick={handleSortChange}
      >
        Ordenar por {sort_by === "new" ? "Top" : "Nuevo"}
      </Button>

      {/* Botón para cargar más memes */}
      <Button
        style={{ position: "fixed", bottom: 20, right: 20, borderRadius: 8 }}
        onClick={cargarSiguientePagina}
        disabled={!hayMas || estaCargando}
      >
        {estaCargando ? "Cargando..." : hayMas ? "Cargar más memes" : "No hay más memes"}
      </Button>
    </ProvLogin>
  );
}

export default App;
