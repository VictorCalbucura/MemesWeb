import { Card, Image, Text, Overlay, Button } from "@mantine/core";
import { useState } from "react";

function MemeElement({ meme, onClose }) {
  const [isLiked, setIsLiked] = useState(false);
  if (!meme) return null;

  const toggleLike = () => {
    setIsLiked((prev) => !prev);
  };
  return (
    <Overlay
      opacity={1}
      blur={10}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
      onClick={onClose}
    >
      <Card
        onClick={(e) => e.stopPropagation()} // Prevent click from closing the overlay
        shadow="lg"
        radius="md"
        style={{
          width: "70vw",
          height: "80vh",
          position: "relative",
          transition: "transform 0.2s ease",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: 20,
        }}
      >

      <Image
        src={meme.img_url}
        alt={meme.title}
        style={{
          maxHeight: "90%",
          objectFit: "contain",
        }}
      />
    <Button
        onClick={toggleLike}
        style={{
          position: "absolute",
          bottom: 10,
          left: 10,
          width: 90,
          height: 70,
          background: "none",
          border: "none",
          cursor: "pointer",
        }}
      >
        <img
          src= {isLiked ? "https://cdn-icons-png.flaticon.com/256/1319/1319983.png" : "https://cdn-icons-png.flaticon.com/256/1319/1319861.png"}
          alt="Crown"
          style={{ width: "100%", height: "100%" }}
        />
      </Button>
      <Text size="xl" color="dimmed" style={{
          position: "absolute",
          bottom: 13,
          left: 85,
        }}
          >
          {meme.likes}
      </Text>
      <div style={{ textAlign: "center", marginTop: 20 }}>
        <Text size="xl" weight={700}>
          {meme.title}
        </Text>
        <Text size="md" color="dimmed">
          Por {meme.user || "desconocido"}
        </Text>
       </div>
    </Card>
    </Overlay>
  );
}

export default MemeElement
