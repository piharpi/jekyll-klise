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
})();
