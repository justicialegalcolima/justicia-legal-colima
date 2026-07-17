function configurarPaginaArea(configuracion) {
  const telefono = configuracion.telefono || "";
  const ladaPais = configuracion.ladaPais || "52";
  const mensaje = configuracion.mensajeWhatsApp || "Hola, me gustaría recibir información.";

  const numero = ladaPais + telefono.replace(/\D/g, "");
  const enlaceWhatsApp =
    "https://wa.me/" +
    numero +
    "?text=" +
    encodeURIComponent(mensaje);

  document.querySelectorAll(".whatsapp").forEach(function(enlace) {
    enlace.href = enlaceWhatsApp;
  });

  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }

  document.querySelectorAll("[data-accordion] details").forEach(function(detalle) {
    detalle.addEventListener("toggle", function() {
      if (!detalle.open) return;

      document.querySelectorAll("[data-accordion] details").forEach(function(otro) {
        if (otro !== detalle) otro.open = false;
      });
    });
  });
}


document.querySelectorAll("#year").forEach(function(el){
  el.textContent = new Date().getFullYear();
});


(function configurarMenuMovil() {
  function iniciar() {
    const cabecera = document.querySelector("header");
    const contenedorNav = cabecera && cabecera.querySelector(".nav");
    const navegacionEscritorio = contenedorNav && contenedorNav.querySelector(":scope > nav");

    if (!cabecera || !contenedorNav || !navegacionEscritorio || contenedorNav.querySelector(".menu-toggle")) {
      return;
    }

    const boton = document.createElement("button");
    boton.type = "button";
    boton.className = "menu-toggle";
    boton.setAttribute("aria-label", "Abrir menú de navegación");
    boton.setAttribute("aria-expanded", "false");
    boton.setAttribute("aria-controls", "menu-movil");
    boton.innerHTML = "<span></span><span></span><span></span>";
    contenedorNav.appendChild(boton);

    const panel = document.createElement("nav");
    panel.id = "menu-movil";
    panel.className = "mobile-menu";
    panel.setAttribute("aria-label", "Navegación móvil");

    Array.from(navegacionEscritorio.children).forEach(function(elemento) {
      if (elemento.classList && elemento.classList.contains("dropdown")) {
        const titulo = document.createElement("div");
        titulo.className = "mobile-section-title";
        titulo.textContent = "Áreas de práctica";
        panel.appendChild(titulo);

        const submenu = document.createElement("div");
        submenu.className = "mobile-submenu";
        elemento.querySelectorAll(".dropdown-menu a").forEach(function(enlace) {
          submenu.appendChild(enlace.cloneNode(true));
        });
        panel.appendChild(submenu);
      } else if (elemento.tagName === "A") {
        panel.appendChild(elemento.cloneNode(true));
      }
    });

    cabecera.insertAdjacentElement("afterend", panel);

    function cerrarMenu() {
      boton.setAttribute("aria-expanded", "false");
      boton.setAttribute("aria-label", "Abrir menú de navegación");
      panel.classList.remove("is-open");
      document.body.classList.remove("menu-open");
    }

    boton.addEventListener("click", function() {
      const abrir = boton.getAttribute("aria-expanded") !== "true";
      boton.setAttribute("aria-expanded", String(abrir));
      boton.setAttribute("aria-label", abrir ? "Cerrar menú de navegación" : "Abrir menú de navegación");
      panel.classList.toggle("is-open", abrir);
      document.body.classList.toggle("menu-open", abrir);
    });

    panel.addEventListener("click", function(evento) {
      if (evento.target.closest("a")) cerrarMenu();
    });

    document.addEventListener("keydown", function(evento) {
      if (evento.key === "Escape") cerrarMenu();
    });

    window.addEventListener("resize", function() {
      if (window.innerWidth > 900) cerrarMenu();
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", iniciar);
  } else {
    iniciar();
  }
})();
