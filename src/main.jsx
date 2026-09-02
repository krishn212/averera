import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Analytics } from '@vercel/analytics/react';

gsap.registerPlugin(ScrollTrigger);

let root = window.__reactRoot;
if (!root) {
  root = createRoot(document.getElementById('root'));
  window.__reactRoot = root;
}

root.render(
  <StrictMode>
    <App />
    <Analytics />
  </StrictMode>
);
