import { useState } from "react";
import { Card, Image, Group, Text } from "@mantine/core";

// Cards para mostrar los memes en la pantalla principal
function MemeItem({ memes }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Card
      withBorder
      shadow="sm"
      padding="lg"
      radius="md"
      key={memes.id}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        zIndex: hovered ? 10 : 1,
        transition: "transform 0.2s ease",
        transform: hovered ? "scale(1.3)" : "scale(1)",
        width: hovered ? "300px" : "100%",
        height: hovered ? "auto" : "100%",
        overflow: "hidden",
      }}
    >
      <Card.Section>
        <Image
          src={memes.img_url}
          style={{
            width: "100%",
            height: "100%",
            objectFit: hovered ? "contain" : "cover",
            transition: "object-fit 0.2s ease",
          }}
        />
      </Card.Section>
      {hovered && (
        <Group justify="space-between" mt="md" mb="xs" style={{ flexGrow: 1 }}>
          <Text fw={500} style={{ width: "60%" }}>
            {memes.title}
          </Text>
          <Text size="sm" fw={200} style={{ width: "60%" }}>
            {memes.description}
          </Text>
        </Group>
      )}
    </Card>
  );
}

export default MemeItem;
