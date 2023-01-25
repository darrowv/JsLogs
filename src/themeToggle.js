// theme toggling
let currentTheme = localStorage.getItem("theme");
let toggleBtn = document.getElementById("__themeToggle");
let toggleImg = document.getElementById("__toggleImg");
let root = document.querySelector(":root");
let editorArea = document.querySelector(".CodeMirror");

if (!currentTheme) {
  localStorage.setItem("theme", "light");
  currentTheme = "light";
}

if (currentTheme === "light") {
  toggleImg.src = "assets/lamp-on.svg";
} else if (currentTheme === "dark") {
  toggleImg.src = "assets/lamp-off.svg";

  root.classList.add("dark-theme");
  editorArea.classList.remove("cm-s-default");
  editorArea.classList.add("cm-s-dracula");
}

toggleBtn.addEventListener("click", () => {
  if (currentTheme === "light") {
    currentTheme = "dark";
    toggleImg.src = "assets/lamp-off.svg";

    root.classList.add("dark-theme");

    // toggling theme in editor
    editorArea.classList.remove("cm-s-default");
    editorArea.classList.add("cm-s-dracula");

    // toggling theme in ls
    localStorage.setItem("theme", "dark");
  } else if (currentTheme === "dark") {
    currentTheme = "light";
    toggleImg.src = "assets/lamp-on.svg";

    root.classList.remove("dark-theme");

    //toggling theme in editor
    editorArea.classList.remove("cm-s-dracula");
    editorArea.classList.add("cm-s-default");

    //toggling theme in ls
    localStorage.setItem("theme", "light");
  }
});
