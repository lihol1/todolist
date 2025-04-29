import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { StoreProvider } from "./context/StoreProvider.js";
import "./index.css";
import App from "./App.js";
import React from "react";

createRoot(document.getElementById("root") as HTMLElement).render(
    <StrictMode>
        <StoreProvider>
            <App />
        </StoreProvider>
    </StrictMode>
);
