import { useState, useContext } from "react";
import { uploadMeme } from "../api/memes";
import { LoginContext } from "../context/LoginContext";
import { Button, FileInput, TextInput, Title, Modal } from "@mantine/core";


function UploadMeme() {

    const [isModalOpen, updateIsModalOpen] = useState(false);
    const [title, updateTitle] = useState("");
    const [description, updateDescription] = useState("");
    const [image, updateImage] = useState(null);

    const { isLogin, creds } = useContext(LoginContext);

    const toggleModal = () => {
        updateIsModalOpen(!isModalOpen);
        updateTitle("");
        updateDescription("");
        updateImage(null);
    };

    const confirmUpload = async () => {
        if (!image || !title || !description){
            alert("Por favor, complete todos los campos.");
            return;
        }
        if (!isLogin || !creds){
            alert("Debe iniciar sesión para subir memes.");
            return;
        }
        const [_, uploadError] = await uploadMeme(creds.access_token, title, description, image);
        if ([uploadError]) {
            alert(uploadError)
        } else {
            alert("Meme Subido con Éxito");
            toggleModal;
        }
    };
    return (
        <>
        <Button 
            variant="filled" 
            color="blue" 
            radius="lg"
            style={{
                position: "absolute",
                top: 10,
                right: 30,
            }}
            onClick={toggleModal}>
            Subir Meme
        </Button>;

        <Modal
            opened={isModalOpen}
            onClose={toggleModal}
            title={<Title order={3}>{"SUBIR MEME"}</Title>}
        >
            <TextInput
                label="Titulo"
                placeholder="Ingrese titulo del meme"
                value={title}
                onChange={(e) => updateTitle(e.target.value)}
                required
            />

            <TextInput
                label="Descripcion"
                placeholder="Explique su meme (o no lo entenderemos)"
                value={description}
                onChange={(e) => updateTitle(e.target.value)}
                required
            />
            
            <FileInput 
                accept="image/png,image/jpeg" 
                label="Imagen" 
                placeholder="Inserte su meme aquí."
                value={image}
                onChange={(e) => updateImage(e.target.value)}
                required 
            />

            <Button 
                variant="filled" 
                color="green" 
                size="md" 
                radius="xl"
                onClick={confirmUpload}
                >
                    Subir Meme
            </Button>;
        </Modal>
        </>
    )
}

export default UploadMeme