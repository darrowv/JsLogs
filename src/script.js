import { __editor } from "./utils/snippetsAndEditor.js";
import { __formatLog } from "./utils/formatOutput.js";

var __outputList = document.getElementById("__outputList");
var __runBtn = document.getElementById("__runBtn");
var __clearBtn = document.getElementById("__clearBtn");

console.stdlog = console.log.bind(console);
console.stdclear = console.clear.bind(console);

console.log = function (...args) {
  args.forEach((log) => {
    let li = document.createElement("li");
    li.textContent = __formatLog(log);
    if (__formatLog(log) instanceof Error) {
      li.textContent = __formatLog(log).message;
      li.style.color = "#ee0028";
    }
    __outputList.append(li);
  });
  console.stdlog.apply(console, args);
};

console.clear = function () {
  while (__outputList.firstChild) {
    __outputList.removeChild(__outputList.firstChild);
  }
  console.stdclear.apply(console);
};

// ----------------------------------------- //

__runBtn.addEventListener("click", () => {
  try {
    eval(__editor.getValue());
  } catch (error) {
    console.log(new Error("Error: " + error.message));
  }
  localStorage.setItem("input", __editor.getValue());
});

__clearBtn.addEventListener("click", () => {
  console.clear();
});

// hotkeys

document.addEventListener("keydown", (e) => {
  if (e.ctrlKey && e.key === "Enter") {
    __runBtn.click();
  } else if (e.ctrlKey && e.key === "\\") {
    console.clear();
  }
});

var __savedCode = localStorage.getItem("input");
__editor.setValue(__savedCode);
