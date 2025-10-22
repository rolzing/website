import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.min.css';

/* GLOBAL VARIABLES */

window.$primaryLanguage = 'en';
window.$secondaryLanguage = 'pl';
window.$primaryLanguageIconId = 'primary-lang-icon';
window.$secondaryLanguageIconId = 'secondary-lang-icon';

/**
 * initCursorLettersEffect - moved to index.js so cursor letters run globally
 * across the whole site (header, about, skills, experience, resume, footer)
 */
function initCursorLettersEffect() {
  const root = document.body;
  const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const activeNodes = new Set();
  let lastX = null, lastY = null;
  let rafId = null;

  const createLetter = (x, y) => {
    const el = document.createElement("span");
    el.className = "cursor-letter";
    el.textContent = letters[(Math.random() * letters.length) | 0];
    // usar coordenadas del viewport (position: fixed)
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    const scaleFrom = 0.6 + Math.random() * 0.6;
    const scaleTo = 0.2 + Math.random() * 0.4;
    el.style.setProperty("--scale-from", String(scaleFrom));
    el.style.setProperty("--scale-to", String(scaleTo));
    root.appendChild(el);
    activeNodes.add(el);
    el.addEventListener("animationend", () => {
      activeNodes.delete(el);
      el.remove();
    });
  };

  const handleMove = (x, y) => {
    if (lastX !== null && lastY !== null) {
      const dx = x - lastX;
      const dy = y - lastY;
      if (dx * dx + dy * dy < 80) return;
    }
    lastX = x;
    lastY = y;
    const count = 1 + (Math.random() > 0.6 ? 1 : 0);
    for (let i = 0; i < count; i++) {
      const jitterX = x + (Math.random() * 16 - 8);
      const jitterY = y + (Math.random() * 16 - 8);
      createLetter(jitterX, jitterY);
    }
  };

  const onPointerMove = (e) => {
    const x = e.clientX;
    const y = e.clientY;
    if (rafId) cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(() => {
      handleMove(x, y);
      rafId = null;
    });
  };

  const onScroll = () => {
    // usar coordenadas del viewport (no pageY)
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
    const jitterX = Math.floor(Math.random() * vw);
    // ubicar la letra dentro del viewport (ej.: entre 40px y vh-40px)
    const jitterY = Math.floor(40 + Math.random() * Math.max(1, vh - 80));
    createLetter(jitterX, jitterY);
  };

  // usar document para capturar en toda la página
  document.addEventListener("pointermove", onPointerMove, { passive: true });
  window.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    document.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("scroll", onScroll);
    if (rafId) cancelAnimationFrame(rafId);
    activeNodes.forEach((n) => n.remove());
    activeNodes.clear();
  };
}

// Render app
ReactDOM.render(<App />, document.getElementById('root'));

// start the cursor letters globally and keep a reference to cleanup
window.cursorCleanup = initCursorLettersEffect();

// cleanup on unload to be safe
window.addEventListener('beforeunload', () => {
  if (window.cursorCleanup) window.cursorCleanup();
});

serviceWorker.register();
