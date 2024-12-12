import { useContext, useState } from "react";
import { register } from "../services/memes";
import { LoginContext } from "../context/LoginContext";
import { Modal, Button, TextInput, Group, Title, Text } from "@mantine/core";

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const { authUser, isLogin } = useContext(LoginContext);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsRegister(false);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
  };

  const userLogin = async () => {
    if (!username || !password) {
      setError("Por favor ingrese usuario y contraseña");
      return;
    }
  
    const success = await authUser(username, password);
    if (success) {
      toggleModal();
    } else {
      setError("Usuario o contraseña incorrectos");
    }
  };

  const userRegister = async () => {
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    };

    const [_, registerError] = await register(username, password);
    if (registerError) {
      setError(registerError);
    } else {
      alert("Usuario registrado, recuerde iniciar sesión");
      toggleModal();
    }
  };

  return (
    <>
      <Button
        style={{
          position: "absolute",
          top: 23,
          right: 20,
          width: 140,
          borderRadius: 8,
          backgroundColor: "#228be6",
          color: "white",
        }}
        onClick={toggleModal}
        disabled={isLogin}
      >
        <Group direction="column" align="center">
          <img
            src="https://cdn-icons-png.flaticon.com/512/10985/10985667.png"
            alt="Login Icon"
            style={{ width: 30, height: 30 }}
          />
          {isLogin ? "Logged" : "Login"}
        </Group>
      </Button>

      <Modal centered
        opened={isModalOpen}
        onClose={toggleModal}
        title={<Title order={3}>{isRegister ? "REGISTRAR USUARIO" : "LOGIN"}</Title>}
      >

        <TextInput
          label="Usuario"
          placeholder="Ingrese su usuario"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <TextInput
          label="Contraseña"
          placeholder="Ingrese su contraseña"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={error && !isRegister}
          required
        />
        {isRegister && (
          <TextInput
            label="Confirmar Contraseña"
            placeholder="Confirme su contraseña"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={error && password !== confirmPassword}
            required
          />
        )}
        {error && <div style={{ color: "red" }}>{error}</div>}

        <Group position="apart" mt="md">
          <Button
            variant="outline"
            onClick={() => setIsRegister(!isRegister)}
          >
            {isRegister ? "Login" : "Registrar Usuario"}
          </Button>
          <Button onClick={isRegister ? userRegister : userLogin}>
            {isRegister ? "Registrar" : "Login"}
          </Button>
        </Group>
      </Modal>
    </>
  );
};

export default User;