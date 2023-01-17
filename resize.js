// script for resizing divs

const resizer = document.getElementById("resize");
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
  
  resizer.style.border = "1px dashed rgb(226, 226, 226)";
  // Attach the listeners to `document`
  document.addEventListener("mousemove", mouseMoveHandler);
  document.addEventListener("mouseup", mouseUpHandler);
};

// Attach the handler
resizer.addEventListener("mousedown", mouseDownHandler);

const mouseMoveHandler = function (e) {
  // How far the mouse has been moved
  const dx = e.clientX - x;
  const dy = e.clientY - y;

  const newLeftWidth =
    ((leftWidth + dx) * 100) / resizer.parentNode.getBoundingClientRect().width;
  leftSide.style.width = `${newLeftWidth}%`;


  leftSide.style.userSelect = "none";
  leftSide.style.pointerEvents = "none";

  rightSide.style.userSelect = "none";
  rightSide.style.pointerEvents = "none";
};

const mouseUpHandler = function () {
  resizer.style.removeProperty("cursor");
  resizer.style.removeProperty("border");

  leftSide.style.removeProperty("user-select");
  leftSide.style.removeProperty("pointer-events");

  rightSide.style.removeProperty("user-select");
  rightSide.style.removeProperty("pointer-events");

  // Remove the handlers of `mousemove` and `mouseup`
  document.removeEventListener("mousemove", mouseMoveHandler);
  document.removeEventListener("mouseup", mouseUpHandler);
};
