import { useContext, useState } from "react";
import { register, login as loginUser } from "../api/memes";
import { LoginContext } from "../context/LoginContext";
import { Modal, Button, TextInput, Group, Title } from "@mantine/core";

const User = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const { authUser, isLogin, creds } = useContext(LoginContext);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
    setIsRegister(false);
    setUsername("");
    setPassword("");
    setConfirmPassword("");
    setError(null);
  };

  const userLogin = async () => {
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
    }

    const [_, registerError] = await register(username, password);
    if (registerError) {
      setError(registerError);
    } else {
      alert("Usuario registrado, por favor ingrese a su usuario creado");
      toggleModal();
    }
  };

  return (
    <>
      <Button
        style={{
          position: "absolute",
          top: 10,
          right: 10,
          background: "none",
          border: "none",
        }}
        onClick={toggleModal}
      >
        {isLogin ? (
          <Group>
            <img
              src="https://cdn.icon-icons.com/icons2/2645/PNG/512/person_icon_159921.png"
              alt="User Logged In"
              style={{ width: 30, height: 30 }}
            />
            <span>{creds.username}</span>
          </Group>
        ) : (
          <img
            src="https://cdn-icons-png.flaticon.com/512/10985/10985667.png"
            alt="Login Icon"
            style={{ width: 30, height: 30 }}
          />
        )}
      </Button>

      <Modal
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