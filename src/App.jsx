import { useState, useEffect } from "react";
import { Container, Title, Image } from "@mantine/core";
import { fetchMemes } from "./api/memes";
import MemeScroll from "./components/MemeScroll";
import MemeElement from "./components/MemeElement";
import User from "./components/User"
import { ProvLogin } from "./context/LoginContext";
import UploadMeme from "./components/UploadMeme";

function App() {
  const [memes, setMemes] = useState([]);
  const [error, setError] = useState(null);
  const [selectedMeme, setSelectedMeme] = useState(null);

  useEffect(() => {
    const loadMemes = async () => {
      const [data, error] = await fetchMemes(1, 20);
      if (error) {
        setError(error);
      } else {
        setMemes(data);
      }
    };

    loadMemes();
  }, []);

  const handleMemeClick = (meme) => setSelectedMeme(meme);
  const handleClose = () => setSelectedMeme(null);
  return (
    <ProvLogin>
    <Container size="xl">
      <div style={{
        filter: selectedMeme ? "blur(5px)" : "none",
        transition: "filter 0.5s ease",
        pointerEvents: selectedMeme ? "none" : "auto",
      }}>
      <User />
      <UploadMeme />
      <Image
        src={"https://i.postimg.cc/VNM609tJ/Asi-venpezo-empezuela-removebg-preview.png"}
        style={{
          maxHeight: "70px",
          objectFit: "contain",
          position: "absolute",
          top: 10,
          right: 1000,
        }}
      />
      <Title order={2} align="center" style={{ marginTop: 20, position: "absolute",
          top: 10,
          left: 80,  }}>
        Ulagos Memes
      </Title>

      <MemeScroll
          Meme={memes}
          onMemeClick={handleMemeClick}
        />
      </div>
      {selectedMeme && (
        <MemeElement meme={selectedMeme} onClose={handleClose} />
      )}
    </Container>
    </ProvLogin>
  )
}

export default App
