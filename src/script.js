import prettier from "https://unpkg.com/prettier@2.8.3/esm/standalone.mjs";
import babel from "https://unpkg.com/prettier@2.8.3/esm/parser-babel.mjs";
import { editor } from "./utils/snippetsAndEditor.js";
import { formatLog } from "./utils/formatOutput.js";

var outputList = document.getElementById("__outputList");
var runBtn = document.getElementById("__runBtn");
var clearBtn = document.getElementById("__clearBtn");

console.stdlog = console.log.bind(console);
console.stdclear = console.clear.bind(console);

console.log = function (...args) {
  args.forEach((log) => {
    let li = document.createElement("li");

    li.textContent = formatLog(log);

    if (formatLog(log) instanceof Error) {
      li.textContent = formatLog(log).message;
      li.style.color = "#ee0028";
    }
    outputList.append(li);
  });
};

console.clear = function () {
  while (outputList.firstChild) {
    outputList.removeChild(outputList.firstChild);
  }
};

// ----------------------------------------- //

runBtn.addEventListener("click", () => {
  try {
    (function runCode(value) {
      return Function(value);
    })(editor.getValue())();
  } catch (error) {
    console.log(new Error("Error: " + error.message));
  }
  localStorage.setItem("input", editor.getValue());
});

clearBtn.addEventListener("click", () => {
  console.clear();
});

// hotkeys

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "Enter") {
    runBtn.click();
  } else if (e.ctrlKey && e.key === "\\") {
    console.clear();
  } else if (e.shiftKey && e.altKey && e.key === "F") {
    e.preventDefault();
    let prettieredCode = prettier.format(editor.getValue(), {
      parser: "babel",
      plugins: [babel],
    });
    editor.setValue(prettieredCode);
  }
});

var savedCode = localStorage.getItem("input");
editor.setValue(savedCode);
