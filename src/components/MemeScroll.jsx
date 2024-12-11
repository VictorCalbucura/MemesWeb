import { SimpleGrid, Transition } from "@mantine/core";
import MemeItem from "./MemeItem";
import { useState, useEffect } from "react";

function MemeScroll({ Meme, onMemeClick }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [gridPadding, setGridPadding] = useState(20);

  const handleMouseEnter = (index) => setHoveredIndex(index);
  const handleMouseLeave = () => setHoveredIndex(null);

  useEffect(() => {
    const adjustPadding = () => {
      const bodyHeight = document.body.scrollHeight;
      const windowHeight = window.innerHeight;

      if (bodyHeight <= windowHeight) {
        setGridPadding(80);
      } else {
        setGridPadding(20);
      }
    };

    adjustPadding(); // Run on load
    window.addEventListener("resize", adjustPadding); // Adjust on resize
    return () => window.removeEventListener("resize", adjustPadding); // Cleanup
  }, []);

  return (
    <SimpleGrid
      cols={4}
      spacing="sm"
      verticalSpacing="sm"
      style={{ paddingTop: 20, paddingBottom: gridPadding, position: "relative", }}
    >
      {Meme.map((memes, index) => (
        <div
          key={memes.id}
          onMouseEnter={() => handleMouseEnter(index)}
          onMouseLeave={handleMouseLeave}
          onClick={() => onMemeClick(memes)}
          style={{
            position: "relative",
            overflow: "visible",
            width: "100%",
            height: "200px",
          }}
        >
          <MemeItem memes={memes} hovered={hoveredIndex === index} />
        </div>
      ))}
    </SimpleGrid>
  );
}

export default MemeScroll;
