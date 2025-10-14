import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { StoreContext, stores } from "./stores/index.ts";

createRoot(document.getElementById("root")!).render(
  <StoreContext.Provider value={stores}>
    <App />
  </StoreContext.Provider>
);
