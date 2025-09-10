const qs = (s, c = document) => c.querySelector(s);
const qsa = (s, c = document) => Array.from(c.querySelectorAll(s));

document.addEventListener("DOMContentLoaded", () => {
  // Si alguien abrió home.html directo, rebotamos (doble guard)
  if (sessionStorage.getItem("unlocked") !== "1") {
    location.replace("index.html");
    return;
  }

  // Fondo corazones, menú y datos visibles
  startFloatingHearts();
  initMenu();
  applyConfig();

  // Carta, animaciones y galería
  updateDaysTogether();
  initRevealOnScroll();
  startTypedLetter();
  initLightbox();
  initMusic();
});

function applyConfig() {
  qs("#brandNames").textContent = window.CONFIG.coupleNames;
  qs("#nombreCorto").textContent = window.CONFIG.nombreCorto;
  qs("#firmaNombre").textContent = window.CONFIG.firma;
  qs("#mesesText").textContent = window.CONFIG.mesesTexto;
}

function initMenu() {
  const toggle = qs("#menuToggle");
  const list = qs("#menuList");
  toggle?.addEventListener("click", () => list.classList.toggle("open"));
  qsa("#menuList a").forEach(a => a.addEventListener("click", () => list.classList.remove("open")));
}

function updateDaysTogether() {
  try {
    const start = new Date(window.CONFIG.anniversaryDate + "T00:00:00");
    const now = new Date();
    const diff = Math.floor((now - start) / (1000 * 60 * 60 * 24));
    qs("#diasJuntos").textContent = diff >= 0 ? diff : "—";
  } catch { qs("#diasJuntos").textContent = "—"; }
}

function initRevealOnScroll() {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add("visible"); io.unobserve(e.target); }
  }, { threshold: 0.12 });
  qsa(".reveal").forEach(el => io.observe(el));
}

function startTypedLetter() {
  const el = qs("#typed");
  const texto = `Mi amor 🫶

Contigo aprendí que un abrazo puede sentirse como casita y que reír es mi idioma favorito cuando estás cerca. Eres mi lugar seguro, la pausa bonita en medio del ruido. Gracias por hacer que los días normales se vuelvan extraordinarios y por esa forma tuya de mirarme que hace que todo tenga sentido.


Me gusta cómo nos encontramos en los detalles: las manos que se buscan sin pensarlo, las miradas, las conversaciones que se alargan aunque ya sepamos el final. Me haces mejor persona, más paciente, más valiente, más yo.


Prometo cuidar lo nuestro con acciones pequeñas y constantes: celebrar tus logros como míos, acompañarte cuando lo difícil se asome, escucharte de verdad, preguntar cómo estás y quedarme para escuchar la respuesta. Prometo respetar tus tiempos, tus sueños y tu paz, reírnos, bailar aunque no sepamos y elegirte cada día.


Sueño con los planes que todavía no escribimos: desayunos sin prisa, viajes chiquitos, películas a medias, caminatas largas, fotos borrosas y también tremendas playlists que en el futuro nos devuelvan a este instante, metas que iremos tachando juntitos.


Gracias por tu paciencia, por tu humor, por tus abrazos que arreglan días enteros, por creer en nosotros incluso cuando el mundo corre. Gracias por quedarte, por empujarme hacia mis mejores versiones y por hacerme sentir querida sin condiciones.


Por más comidas, películas, risas compartidas, canciones a destiempo y besitos que curan todo. Lo que venga, contigo. Te amo con todo mi corazón.`;
  let i = 0, speed = 18;
  (function tipo() { if (i <= texto.length) { el.textContent = texto.slice(0, i); i++; setTimeout(tipo, speed); } })();
}

function initLightbox() {
  const lightbox = qs("#lightbox");
  const lightImg = qs("#lightboxImg");
  const closeBtn = qs("#closeLightbox");
  qsa(".thumb").forEach(img => img.addEventListener("click", () => {
    lightImg.src = img.src; lightbox.classList.remove("hidden"); document.body.style.overflow = "hidden";
  }));
  function close() { lightbox.classList.add("hidden"); document.body.style.overflow = ""; lightImg.src = ""; }
  closeBtn.addEventListener("click", close);
  lightbox.addEventListener("click", e => { if (e.target === lightbox) close(); });
  window.addEventListener("keydown", e => { if (e.key === "Escape") close(); });
}

function initMusic() {
  const audio = document.getElementById("audio");
  const btnPlay = document.getElementById("btnPlay");
  if (!btnPlay || !audio) return;
  btnPlay.addEventListener("click", async () => {
    try {
      if (audio.paused) { await audio.play(); btnPlay.textContent = "Pausar música ⏸"; }
      else { audio.pause(); btnPlay.textContent = "Reproducir música ▶"; }
    } catch { alert("Si no suena, toca de nuevo 🙂"); }
  });
}

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
