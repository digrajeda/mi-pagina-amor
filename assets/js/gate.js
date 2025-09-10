const qs = (s, c = document) => c.querySelector(s);

document.addEventListener("DOMContentLoaded", () => {
  // Fondo corazones
  startFloatingHearts();

  // Si ya desbloqueó en esta sesión, pasa directo
  if (sessionStorage.getItem("unlocked") === "1") {
    location.replace("home.html");
    return;
  }

  // Pista visible
  const hint = qs("#hint");
  if (hint && window.CONFIG?.hint) hint.textContent = window.CONFIG.hint;

  // Eventos
  qs("#btnEntrar").addEventListener("click", tryUnlock);
  qs("#pass").addEventListener("keydown", e => { if (e.key === "Enter") tryUnlock(); });
});

function tryUnlock() {
  const val = (qs("#pass").value || "").trim();
  if (val === window.CONFIG.passphrase) {
    sessionStorage.setItem("unlocked", "1");
    // Mini confetti hearts
    confettiHearts();
    setTimeout(() => location.href = "home.html", 450);
  } else {
    alert("Clave incorrecta 🙈");
  }
}

// Corazones flotantes
function startFloatingHearts() {
  const cont = document.getElementById("bg-hearts");
  setInterval(() => {
    const h = document.createElement("div");
    h.className = "heart";
    const size = Math.random() * 14 + 8;
    const left = Math.random() * 100;
    const dur = Math.random() * 6 + 6;
    h.style.width = size + "px";
    h.style.height = size + "px";
    h.style.left = left + "vw";
    h.style.bottom = "-20px";
    h.style.animationDuration = dur + "s";
    cont.appendChild(h);
    setTimeout(() => cont.removeChild(h), dur * 1000);
  }, 500);
}

function confettiHearts() {
  const n = 24;
  for (let i = 0; i < n; i++) {
    const s = document.createElement("div");
    s.className = "heart";
    s.style.left = (50 + (Math.random() * 30 - 15)) + "vw";
    s.style.bottom = "40vh";
    s.style.background = i % 2 ? "#ff6b9a" : "#ff91af";
    s.style.animationDuration = (Math.random() * 1.4 + .6) + "s";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1600);
  }
}
