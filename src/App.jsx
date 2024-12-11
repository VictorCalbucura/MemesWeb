import { useState, useEffect } from "react";
import { Container, Title } from "@mantine/core";
import { fetchMemes } from "./api/memes";
import MemeScroll from "./components/MemeScroll";

function App() {
  const [memes, setMemes] = useState([]);
  const [error, setError] = useState(null);

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

  return (
    <Container size="xl">
      <Title order={1} align="center" style={{ marginTop: 20 }}>
        Memes
      </Title>

      <MemeScroll Meme={memes}/>
    </Container>
  )
}

export default App
