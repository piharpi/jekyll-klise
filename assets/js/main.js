(() => {
  // Theme switch
  const body = document.body;
  const lamp = document.getElementById("mode");

  // Flip based on what is actually rendered, so it works whether the
  // visitor has an explicit preference or is still following the OS.
  const toggleTheme = () => {
    if (body.getAttribute("data-theme") === "dark") {
      localStorage.setItem("theme", "light");
      body.removeAttribute("data-theme");
    } else {
      localStorage.setItem("theme", "dark");
      body.setAttribute("data-theme", "dark");
    }
  };

  lamp.addEventListener("click", toggleTheme);

  // Keep following the OS theme live, until the visitor picks one.
  window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (event) => {
      if (localStorage.getItem("theme")) return;
      event.matches
        ? body.setAttribute("data-theme", "dark")
        : body.removeAttribute("data-theme");
    });

  // Blur the content when the menu is open
  const cbox = document.getElementById("menu-trigger");

  cbox.addEventListener("change", function () {
    const area = document.querySelector(".wrapper");
    this.checked
      ? area.classList.add("blurry")
      : area.classList.remove("blurry");
  });

  // Image lightbox: click an image in the post content to view it full
  // screen. Images wrapped in a link are left as links.
  const contentImages = document.querySelectorAll(".page-content img");

  if (contentImages.length) {
    let overlay;
    let lastFocused;

    const onKeydown = (event) => {
      if (event.key === "Escape") closeLightbox();
    };

    const closeLightbox = () => {
      if (!overlay) return;
      overlay.classList.remove("is-open");
      body.classList.remove("lightbox-open");
      document.removeEventListener("keydown", onKeydown);
      if (lastFocused) lastFocused.focus();
    };

    const openLightbox = (src, alt) => {
      if (!overlay) {
        overlay = document.createElement("div");
        overlay.className = "lightbox-overlay";
        overlay.tabIndex = -1;
        overlay.setAttribute("role", "dialog");
        overlay.setAttribute("aria-modal", "true");
        overlay.innerHTML = '<img class="lightbox-image" alt="">';
        overlay.addEventListener("click", closeLightbox);
        document.body.appendChild(overlay);
      }
      const image = overlay.querySelector(".lightbox-image");
      image.src = src;
      image.alt = alt || "";
      overlay.setAttribute("aria-label", alt || "Image preview");
      lastFocused = document.activeElement;
      body.classList.add("lightbox-open");
      overlay.classList.add("is-open");
      overlay.focus();
      document.addEventListener("keydown", onKeydown);
    };

    contentImages.forEach((image) => {
      if (image.closest("a")) return;
      image.classList.add("zoomable");
      image.addEventListener("click", () =>
        openLightbox(image.currentSrc || image.src, image.alt)
      );
    });
  }
})();
