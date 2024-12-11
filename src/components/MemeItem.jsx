import { Card, Image, Group, Text } from "@mantine/core";

function MemeItem({ memes, hovered }) {
    return (
        <Card
         withBorder
         shadow="sm"
         padding="lg"
         radius="md"
         key={memes.id}
         style={{
            position: hovered ? "absolute" : "relative",
            top: hovered ? "-10px" : "0",
            left: hovered ? "-10px" : "0",
            zIndex: hovered ? 10 : 1,
            transition: "transform 0.2s ease, top 0.2s ease, left 0.2s ease",
            transform: hovered ? "scale(1.2)" : "scale(1)",
            width: hovered ? "240px" : "100%",
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
          </Group>
         )}
        </Card>
    )
}

export default MemeItem;