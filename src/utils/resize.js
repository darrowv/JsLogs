let centralElement = document.getElementById("__resize");
let leftElement = centralElement.previousElementSibling;
let rightElement = centralElement.nextElementSibling;

let startX = 0;
let leftWidth = 0;
let rightWidth = 0;

centralElement.addEventListener("mousedown", function(e) {
    startX = e.clientX;
    leftWidth = leftElement.getBoundingClientRect().width;
    rightWidth = rightElement.getBoundingClientRect().width;
    document.addEventListener("mousemove", resizeElements);
    document.addEventListener("mouseup", stopResizing);
});

function resizeElements(e) {
    let dx = e.clientX - startX;
    centralElement.style.border = "1px dashed var(--primary-font-color)";
  
    leftElement.style.width = (leftWidth + dx) + "px";
    rightElement.style.width = (rightWidth - dx) + "px";
}

function stopResizing() {
    centralElement.style.border = "";
    
    document.removeEventListener("mousemove", resizeElements);
    document.removeEventListener("mouseup", stopResizing);
}