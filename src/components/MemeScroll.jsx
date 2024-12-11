import { SimpleGrid, Transition } from "@mantine/core";
import MemeItem from "./MemeItem";
import { useState } from "react";

function MemeScroll({ Meme }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleMouseEnter = (index) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  return (
    <SimpleGrid
      cols={4}
      spacing="sm"
      verticalSpacing="sm"
      style={{ paddingTop: 20 }}
    >
      {Meme.map((memes, index) => (
        <div
          key={memes.id}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "relative",
            transition: "transform 0.3s ease",
            transform: hoveredIndex === index ?  "scale(1.1)" : "scale(1)",
            display: "inline-block",
            overflow: "hidden",
            zIndex: hoveredIndex === index ? 10: 1,
          }}
        >
          <MemeItem memes={memes} hovered={hoveredIndex === index} />
        </div>
      ))}
    </SimpleGrid>
  );
}

export default MemeScroll;
