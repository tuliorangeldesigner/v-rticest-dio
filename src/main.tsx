import { createRoot } from "react-dom/client";
import { Analytics } from "@vercel/analytics/react";
import App from "./App.tsx";
import "./index.css";

const root = document.documentElement;
root.classList.add("dark");
root.classList.remove("light");
root.style.setProperty("--nav-offset", "0px");
try {
  localStorage.removeItem("theme");
} catch {
  // ignore
}

createRoot(document.getElementById("root")!).render(
  <>
    <App />
    <Analytics />
  </>
);
