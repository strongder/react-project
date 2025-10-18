import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { StoreContext, stores } from "./stores/index.ts";
import { ThemeProvider } from "./shared/contexts/ThemeContext.tsx";

createRoot(document.getElementById("root")!).render(
  <StoreContext.Provider value={stores}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StoreContext.Provider>
);
