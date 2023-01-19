// codemirror settings

var customSnippets = {
  "cl": 'console.log();',
  "cc": "console.clear();",
  "fd": "function name() {\n\n};",
  "af": "let foo = () => {};",
  "lorem": `"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis ab eveniet ipsa hic quod, ipsam quia quo? Nam consequatur, nostrum ullam consequuntur mollitia ipsa deserunt eaque, ipsam quo sit animi!"`
}

var editor = CodeMirror.fromTextArea(document.getElementById("inputArea"), {
  mode: "javascript",
  tabSize: 2,
  autoCloseBrackets: true,
  autofocus: true,
  matchBrackets: true,
  highlightSelectionMatches: true,
  lineWrapping: true,
  extraKeys: {
    "Tab": function(cm) {
      var cursor = cm.getCursor();
      var cur = cm.getRange({line: cursor.line, ch: 0}, cursor);
      var word = cm.findWordAt(cursor);
      var curWord = cm.getRange(word.anchor, word.head);
      var snippet = customSnippets[curWord];
      if (snippet) {
        cm.replaceRange(snippet, word.anchor, word.head);
        if(curWord === "cl") {
          var newCursor = {line: cursor.line, ch: cursor.ch + snippet.indexOf("(") - 1};
          cm.setCursor(newCursor);
        }
      } else {
        if (cursor.ch === 0 || /^\s+$/.test(cur)) {
          cm.execCommand("indentMore");
        }
      }
  }
  },
});

// theme toggling

let currentTheme = localStorage.getItem("theme");
let toggleBtn = document.getElementById("themeToggle");
let root = document.querySelector(":root");
let editorArea = document.querySelector(".CodeMirror");

if (!currentTheme) {
  localStorage.setItem("theme", "light");
  currentTheme = "light";
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
