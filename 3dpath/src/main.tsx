import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import "./seed";
import App from "./App.tsx";
import { attachDiskBackup } from "./lib/store";

attachDiskBackup();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
