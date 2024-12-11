import { StrictMode } from 'react'
import { MantineProvider } from "@mantine/core";
import { createRoot } from 'react-dom/client'
import "@mantine/core/styles.css";
import App from "./App.jsx";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <MantineProvider>
      <App />
    </MantineProvider>
  </StrictMode>,
)