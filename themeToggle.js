// codemirror settings

var editor = CodeMirror.fromTextArea(document.getElementById("inputArea"), {
  mode: "javascript",
  tabSize: 2,
  autoCloseBrackets: true,
  autofocus: true,
  matchBrackets: true,
  highlightSelectionMatches: true,
});

// theme toggling

let currentTheme = localStorage.getItem("theme");
let toggleBtn = document.getElementById("themeToggle");
let root = document.querySelector(":root");
let editorArea = document.querySelector(".CodeMirror");

if (!currentTheme) {
  localStorage.setItem("theme", "light");
}

if (currentTheme === "light") {
  toggleBtn.innerText = "🌑";
} else if (currentTheme === "dark") {
  toggleBtn.innerText = "☀️";
  root.classList.add("dark-theme");
  editorArea.classList.remove("cm-s-default");
  editorArea.classList.add("cm-s-dracula");
}

toggleBtn.addEventListener("click", () => {
  if (currentTheme === "light") {
    currentTheme = "dark";
    toggleBtn.innerText = "☀️";
    root.classList.add("dark-theme");

    // toggling theme in editor
    editorArea.classList.remove("cm-s-default");
    editorArea.classList.add("cm-s-dracula");

    // toggling theme in ls
    localStorage.setItem("theme", "dark");
  } else if (currentTheme === "dark") {
    currentTheme = "light";
    toggleBtn.innerText = "🌑";
    root.classList.remove("dark-theme");

    //toggling theme in editor
    editorArea.classList.remove("cm-s-dracula");
    editorArea.classList.add("cm-s-default");

    //toggling theme in ls
    localStorage.setItem("theme", "light");
  }
});
