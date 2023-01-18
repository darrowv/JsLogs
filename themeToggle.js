let currentTheme = localStorage.getItem("theme");

let themeToggle = document.getElementById("themeToggle");

let pageTheme = document.body;

let isLight = true;

if (currentTheme == "light") {
  pageTheme.classList.add("light-theme");
  themeToggle.innerText = "🌚"
} else {
  themeToggle.innerText="🌞";
}

function themeMode() {
  isLight = !isLight;
  isLight ? themeToggle.innerText = "🌞" : themeToggle.innerText = "🌚";
  pageTheme.classList.toggle("light-theme");
  
  let theme = "dark";
  if (pageTheme.classList.contains("light-theme")) {
    theme = "light";
  }
  localStorage.setItem("theme", theme);
}

themeToggle.addEventListener("click", themeMode);


// codemirror settings

var editor = CodeMirror.fromTextArea(
  document.getElementById("inputArea"),
  {
    mode: "javascript",
    theme: currentTheme === "dark" ? "dracula" : "default",
    tabSize: 2,
    autoCloseBrackets: true,
    autofocus: true,
    matchBrackets: true,
    highlightSelectionMatches: true
  }
);