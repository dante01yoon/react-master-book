import { StrictMode } from 'react'
import { scan } from "react-scan"; // must be imported before React and React DOM
import Shuffle from "./ShuffleGame.jsx";
scan({
  enabled: true,
});
import { createRoot } from 'react-dom/client'
import './index.css'

import App from "./rerender-context.jsx";

createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <App />
  // </StrictMode>,
)
