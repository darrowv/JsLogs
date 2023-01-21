var inputArea = document.getElementById("inputArea");
var outputList = document.getElementById("outputList");
var runBtn = document.getElementById("runBtn");
var clearBtn = document.getElementById("clearBtn");

console.stdlog = console.log.bind(console);
console.stdclear = console.clear.bind(console);

console.log = function (...args) {
  args.forEach((log) => {
    let li = document.createElement("li");
    li.textContent = formatLog(log);
    if(formatLog(log) instanceof Error) {
      li.textContent = formatLog(log).message;
      li.style.color = "#ee0028";
    }
    outputList.append(li);
  });
  console.stdlog.apply(console, args);
};

console.clear = function () {
  while (outputList.firstChild) {
    outputList.removeChild(outputList.firstChild);
  }
  console.stdclear.apply(console);
};

// ----------------------------------------- //

runBtn.addEventListener("click", () => {
  try {
    eval(editor.getValue());
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
  }
});

var savedCode = localStorage.getItem("input");
editor.setValue(savedCode);

// how to show different values in console

function formatLog(log) {
  let value = "";

  if (log === null) {
    value = "null";
    return value;
  } else if (log === undefined) {
    value = "undefined";
    return value;
  } else if (log instanceof Error) {
    value = log;
    return value;
  } else if (log === 0) {
    value = Object.is(log, -0) ? "-0" : 0;
    return value;
  }

  switch (typeof log) {
    case "string":
      value = `"${log}"`;
      break;
    case "bigint":
      value = log + "n";
      break;
    case "object":
      if (Array.isArray(log)) {
        value = arrayTemplate(log);
      } else {
        value = objectTemplate(log);
      }
      break;
    default:
      value = log;
      break;
  }

  return value;
}

function objectTemplate(obj) {
  let str = "{";
  for (const key in obj) {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      if(Array.isArray(obj[key])) {
        str += `\n  ${key}: ${arrayTemplate(obj[key])},`;
      } else {
        str += `\n  ${key}: ${objectTemplate(obj[key])},`;
      }
    } else {
      str += `\n  ${key}: ${formatLog(obj[key])},`;
    }
  }
  str = str.slice(0, -1);
  str += "\n}";
  return str;
}

function arrayTemplate(arr) {
  let str = "[ ";

  arr.forEach((el, index) => {
    if(index !== arr.length - 1) {
      str += formatLog(el) + ", ";
    } else {
      str += formatLog(el);
    }
  })

  str += " ]";

  return str
}