var inputArea = document.getElementById("inputArea");
var outputList = document.getElementById("outputList");
var runBtn = document.getElementById("runBtn");
var clearBtn = document.getElementById("clearBtn");

console.stdlog = console.log.bind(console);
console.stdclear = console.clear.bind(console);

console.logs = [];

console.log = function (...args) {
  args.forEach((arg) => console.logs.push(arg));
  console.stdlog.apply(console, args);
};

console.clear = function () {
  console.logs = [];
  console.stdclear.apply(console);
};

// ----------------------------------------- //

runBtn.addEventListener("click", () => {
  // это здесь, чтобы список логов каждый раз обновлялся
  outputList.innerHTML = "";

  try {
    eval(editor.getValue());
  } catch (error) {
    console.log(new Error("Error: " + error.message));
  }

  console.logs.forEach((log) => {
    let li = document.createElement("li");
    if (log instanceof Error) {
      li.textContent = log.message;
      li.style.color = "#ee0028";
    } else if (typeof log === "object") {
      li.textContent = JSON.stringify(log);
    } else if (typeof log === "string") {
      li.textContent = `"${log}"`;
    } else {
      li.textContent = `${log}`;
    }
    outputList.append(li);
  });
});

clearBtn.addEventListener("click", () => {
  console.clear();
  outputList.innerHTML = "";
});

// hotkeys
document.addEventListener("keydown", (e) => {
  if(e.ctrlKey && e.key === "Enter") {
    runBtn.click();
  } else if (e.ctrlKey && e.key === "\\") {
    clearBtn.click();
  }
});
