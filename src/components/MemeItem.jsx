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
            display: "flex",
            flexDirection: "column",
            height: hovered ? "auto" : "200px",
            width: hovered ? "auto" : "100%",
            marginBottom: 1,
            overflow: "hidden",
            transition: "height 0.3s ease, width 0.3s ease",
            position: hovered ? "absolute" : "relative",
            top: hovered ? "-10px" : "0",
            left: hovered ? "-10px" : "0",
            right: hovered ? "-10px" : "0",
            bottom: hovered ? "-10px" : "0",
         }}
        > 
         <Card.Section>
            <Image 
              src={memes.img_url} 
              style={{
                width: "100%",
                height: "100%",
                objectFit: hovered ? "contain" : "cover",
                transition: "object-fit 0.3s ease",
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