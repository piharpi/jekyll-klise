(() => {
  // Theme switch
  const root = document.body;
  const themeSwitch = document.getElementById("mood");
  const themeData = root.getAttribute("data-theme");

  if (themeSwitch) {
    initTheme(localStorage.getItem("theme"));
    themeSwitch.addEventListener("click", () =>
      toggleTheme(localStorage.getItem("theme"))
    );

    function toggleTheme(state) {
      if (state === "dark") {
        localStorage.setItem("theme", "light");
        root.removeAttribute("data-theme");
      } else if (state === "light") {
        localStorage.setItem("theme", "dark");
        document.body.setAttribute("data-theme", "dark");
      } else {
        initTheme(state);
      }
    }

    function initTheme(state) {
      if (state === "dark") {
        document.body.setAttribute("data-theme", "dark");
      } else if (state === "light") {
        root.removeAttribute("data-theme");
      } else {
        localStorage.setItem("theme", themeData);
      }
    }
  }

  // Blur content when the menu is open
  const checkbox = document.getElementById("menu-trigger");
  const wrapper = document.getElementById("wrapper");

  checkbox.addEventListener("change", function() {
    if (this.checked) {
      wrapper.classList.add("trigger-wrapper");
    } else {
      wrapper.classList.remove("trigger-wrapper");
    }
  });
})();
