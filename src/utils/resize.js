// script for resizing divs
let __resizer = document.getElementById("__resize");
let __leftSide = __resizer.previousElementSibling;
let __rightSide = __resizer.nextElementSibling;

// The current position of mouse
let __x = 0;
let __y = 0;

// Width of left side
let __leftWidth = 0;

// Handle the mousedown event
// that's triggered when user drags the __resizer
const __mouseDownHandler = function (e) {
  // Get the current mouse position
  __x = e.clientX;
  __y = e.clientY;
  __leftWidth = __leftSide.getBoundingClientRect().width;
  
  __resizer.style.border = "1px dashed var(--primary-font-color)";
  // Attach the listeners to `document`
  document.addEventListener("mousemove", __mouseMoveHandler);
  document.addEventListener("mouseup", __mouseUpHandler);
};

// Attach the handler
__resizer.addEventListener("mousedown", __mouseDownHandler);

const __mouseMoveHandler = function (e) {
  // How far the mouse has been moved
  const dx = e.clientX - __x;

  const newLeftWidth =
    ((__leftWidth + dx) * 100) / __resizer.parentNode.getBoundingClientRect().width;
  __leftSide.style.width = `${newLeftWidth}%`;


  __leftSide.style.userSelect = "none";
  __leftSide.style.pointerEvents = "none";

  __rightSide.style.userSelect = "none";
  __rightSide.style.pointerEvents = "none";
};

const __mouseUpHandler = function () {
  __resizer.style.removeProperty("cursor");
  __resizer.style.removeProperty("border");

  __leftSide.style.removeProperty("user-select");
  __leftSide.style.removeProperty("pointer-events");

  __rightSide.style.removeProperty("user-select");
  __rightSide.style.removeProperty("pointer-events");

  // Remove the handlers of `mousemove` and `mouseup`
  document.removeEventListener("mousemove", __mouseMoveHandler);
  document.removeEventListener("mouseup", __mouseUpHandler);
};
