var inputArea = document.getElementById("inputArea");
var outputList = document.getElementById("outputList");
var runBtn = document.getElementById("runBtn");
var clearBtn = document.getElementById("clearBtn");

console.stdlog = console.log.bind(console);
console.stdclear = console.clear.bind(console);

console.logs = [];

console.log = function (...args) {
  args.forEach((arg) => console.logs.push(arg));
  console.stdlog.apply(console, arguments);
};

console.clear = function () {
  console.logs = [];
  console.stdclear.apply(console);
};

runBtn.addEventListener("click", () => {
  // это здесь, чтобы список логов каждый раз обновлялся
  outputList.innerHTML = "";

  eval(inputArea.value);

  console.logs.forEach((log) => {
    let li = document.createElement("li");
    if (typeof log === "object") {
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


// script for resizing divs

const resizer = document.getElementById('resize');
const leftSide = resizer.previousElementSibling;
const rightSide = resizer.nextElementSibling;

// The current position of mouse
let x = 0;
let y = 0;

// Width of left side
let leftWidth = 0;

// Handle the mousedown event
// that's triggered when user drags the resizer
const mouseDownHandler = function (e) {
    // Get the current mouse position
    x = e.clientX;
    y = e.clientY;
    leftWidth = leftSide.getBoundingClientRect().width;

    // Attach the listeners to `document`
    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
};

// Attach the handler
resizer.addEventListener('mousedown', mouseDownHandler);

const mouseMoveHandler = function (e) {
  // How far the mouse has been moved
  const dx = e.clientX - x;
  const dy = e.clientY - y;

  const newLeftWidth = ((leftWidth + dx) * 100) / resizer.parentNode.getBoundingClientRect().width;
  leftSide.style.width = `${newLeftWidth}%`;

  leftSide.style.userSelect = 'none';
  leftSide.style.pointerEvents = 'none';

  rightSide.style.userSelect = 'none';
  rightSide.style.pointerEvents = 'none';
};

const mouseUpHandler = function () {
  resizer.style.removeProperty('cursor');
  // document.body.style.removeProperty('cursor');

  leftSide.style.removeProperty('user-select');
  leftSide.style.removeProperty('pointer-events');

  rightSide.style.removeProperty('user-select');
  rightSide.style.removeProperty('pointer-events');

  // Remove the handlers of `mousemove` and `mouseup`
  document.removeEventListener('mousemove', mouseMoveHandler);
  document.removeEventListener('mouseup', mouseUpHandler);
};

