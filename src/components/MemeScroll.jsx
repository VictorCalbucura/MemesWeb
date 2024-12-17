import { SimpleGrid, Center } from "@mantine/core";
import MemeItem from "./MemeItem";

function MemeScroll({ memes, onMemeClick }) {
  return (
    <SimpleGrid cols={4} spacing="sm" verticalSpacing="sm" style={{ paddingTop: 20, paddingBottom: 20 }}>
      {memes.length > 0 ? (
        memes.map((meme, index) => (
          <div
            key={meme.id || index}
            onClick={() => onMemeClick(meme)}
            style={{
              position: "relative",
              overflow: "visible",
              width: "100%",
              height: "40vh",
            }}
          >
            <MemeItem memes={meme} />
          </div>
        ))
      ) : (
        <Center>No hay memes para mostrar.</Center>
      )}
    </SimpleGrid>
  );
}

export default MemeScroll;
