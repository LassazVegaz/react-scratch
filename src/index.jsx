import { App } from "./App";
import "./index.css";
import { ReactScratch } from "./library/scratch";

// creating root
const root = ReactScratch.createRoot("root");

// render
root.render(<App />);
