import { Card, Image, Text, Overlay, Button } from "@mantine/core";
import { useState, useContext } from "react";
import { likeMeme } from "../services/memes";
import { LoginContext } from "../context/LoginContext";
import useMemes from "../hooks/useMemes";

// Modal para mostrar un meme en pantalla completa
function MemeElement({ meme, onClose }) {
  const { memes, estaCargando, cargarMasMemes, actualizarMemes } = useMemes();
  const [isLiked, setIsLiked] = useState(false);
  const { isLogin, creds } = useContext(LoginContext);

  if (!meme) return null;

  const toggleLike = async () => {
    setIsLiked((prev) => !prev);
    await manejarLike(meme._id);
  };

  const manejarLike = async (memeId) => {
    if (!isLogin || !creds) {
      alert("Debes iniciar sesión para dar like a un meme.");
      return;
    }

    const [mensaje, error] = await likeMeme(creds.access_token, memeId);
    if (error) {
      alert("Debes iniciar sesión para dar like", error);
      return;
    }

    alert("Le diste like al meme", mensaje);
  };

  return (
    <Overlay
      opacity={1}
      blur={10}
      style={{
        position: "fixed",
        width: "100vw",
        height: "100vh",
        zIndex: 1,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <Card
        onClick={(e) => e.stopPropagation()}
        shadow="lg"
        radius="md"
        style={{
          width: "70vw",
          height: "80vh",
          alignItems: "center",
          padding: 20,
        }}
      >
        <Image
          src={meme.img_url}
          alt={meme.title}
          style={{
            maxHeight: "80%",
            objectFit: "contain",
          }}
        />
        <Button
            onClick={() => manejarLike(meme._id)}
            style={{
            position: "absolute",
            bottom: 10,
            left: 10,
            width: 90,
            height: 70,
            background: "none",
            cursor: "pointer",
          }}
        >
          <img
            src={
              isLiked
                ? "https://cdn-icons-png.flaticon.com/256/1319/1319983.png"
                : "https://cdn-icons-png.flaticon.com/256/1319/1319861.png"
            }
            alt="Crown"
            style={{ width: "100%", height: "100%" }}
          />
        </Button>
        <Text
          size="xl"
          color="dimmed"
          style={{
            position: "absolute",
            bottom: 13,
            left: 85,
          }}
        >
          {meme.likes}
        </Text>
        <div style={{ textAlign: "center", marginTop: 20 }}>
          <Text size="xl" fw={700}>
            {meme.title}
          </Text>
          <Text size="xl">
            {meme.description}
          </Text>
          <Text size="md" c="dimmed" style={{padding: 30}}>
            Por {meme.user || "desconocido"}
          </Text>
        </div>
      </Card>
    </Overlay>
  );
}

export default MemeElement;