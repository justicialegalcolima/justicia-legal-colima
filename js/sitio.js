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
