// theme toggling

let __currentTheme = localStorage.getItem("theme");
let __toggleBtn = document.getElementById("__themeToggle");
let __root = document.querySelector(":root");
let __editorArea = document.querySelector(".CodeMirror");

if (!__currentTheme) {
  localStorage.setItem("theme", "light");
  __currentTheme = "light";
}

if (__currentTheme === "light") {
  __toggleBtn.innerText = "🌑";
} else if (__currentTheme === "dark") {
  __toggleBtn.innerText = "☀️";
  __root.classList.add("dark-theme");
  __editorArea.classList.remove("cm-s-default");
  __editorArea.classList.add("cm-s-dracula");
}

__toggleBtn.addEventListener("click", () => {
  if (__currentTheme === "light") {
    __currentTheme = "dark";
    __toggleBtn.innerText = "☀️";
    __root.classList.add("dark-theme");

    // toggling theme in editor
    __editorArea.classList.remove("cm-s-default");
    __editorArea.classList.add("cm-s-dracula");

    // toggling theme in ls
    localStorage.setItem("theme", "dark");
  } else if (__currentTheme === "dark") {
    __currentTheme = "light";
    __toggleBtn.innerText = "🌑";
    __root.classList.remove("dark-theme");

    //toggling theme in editor
    __editorArea.classList.remove("cm-s-dracula");
    __editorArea.classList.add("cm-s-default");

    //toggling theme in ls
    localStorage.setItem("theme", "light");
  }
});
