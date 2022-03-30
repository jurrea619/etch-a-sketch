// vars for grid container, buttons and pause boolean
const container = document.querySelector('.grid');
const instructions = document.querySelector('#instructions');
const resetBtn = document.querySelector("#resetBtn");
const sizeBtn = document.querySelector("#sizeBtn");
const colorBtn = document.querySelector("#colorBtn");
let drawingPaused = false;
let currentColor = "black";
const colors = ["black","white","red","orange","yellow","green","blue","purple"];

// attach click event functions and handle bubbling
document.addEventListener('click', pauseGame);
resetBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    clearScreen()
});
sizeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    resizeGrid();
});
colorBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    changeColor();
});

// build initial 16x16 grid
buildGrid(16);

/**
 * Pauses and unpauses drawing state of game
 */
function pauseGame(){
    drawingPaused = drawingPaused ? false : true;
    instructions.textContent = drawingPaused ? "Paused. Click mouse to resume"
        : "Click mouse to pause";
}

/**
 * Build size*size grid with given size for rows and columns
 * 
 * @param {number} size size of new grid rows/columns
 */
function buildGrid(size){
    for (let i = 0; i < size**2; i++) {
        let box = document.createElement('div');
        box.classList.add('box');
        //attach mouseover listener event to turn background color black
        box.addEventListener('mouseenter', () => {
            applyColor(box, true);
        });
        box.addEventListener('click', () => {
            applyColor(box, false);
        });
        // add div to container
        container.appendChild(box);
    }
}

/**
 * Apply current chosen color to given box
 * 
 * @param {element} box box in which color is applied 
 * @param {boolean} checkPause will check pause boolean if true, ignore otherwise
 */
function applyColor(box, checkPause){
    if (!drawingPaused || !checkPause) {
        box.style.backgroundColor = currentColor;
    }
}

/**
 * Resets current grid back to original starting state
 */
function clearScreen(){
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((button) => {
        button.style.backgroundColor = "lightslategray";
    });
    drawingPaused = false;
}

/**
 * Build new grid after prompting user for size
 */
function resizeGrid(){
    let newSize = prompt("Enter new grid size (up to 100)");
    //edit grid-template-columns
    container.style['grid-template-columns'] = `repeat(${newSize}, 1fr`;
    // remove all existing boxes from grid
    removeGridNodes();
    // build new grid
    buildGrid(newSize);
}

function changeColor(){
    currentColorIndex = colors.indexOf(currentColor);
    currentColor = currentColorIndex === colors.length-1 ? colors[0] 
                                                         : colors[currentColorIndex+1];
    colorBtn.textContent = `Color: ${currentColor.toUpperCase()}`;
}

/**
 * Remove all grid nodes from grid container
 */
function removeGridNodes() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}