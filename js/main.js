// declare vars for elements, colors, and booleans needed
const container = document.querySelector('.grid');
const instructions = document.querySelector('#instructions');
const resetBtn = document.querySelector("#resetBtn");
const sizeBtn = document.querySelector("#sizeBtn");
const colorBtn = document.querySelector("#colorBtn");
const buttons = [resetBtn, sizeBtn, colorBtn];
const colorPicker = document.getElementById("colorPicker");
let drawingPaused = false;
let currentColor = '#000000';

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
});
colorPicker.addEventListener("input", changeColor);


// build initial 16x16 grid
buildGrid(16);

/**
 * Pauses and resumes drawing state of game
 */
function pauseGame(){
    drawingPaused = drawingPaused ? false : true;
    instructions.textContent = drawingPaused ? "PAUSED. Click mouse to resume coloring"
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
        //attach listeners for events to turn color box
        ['click','mouseenter'].forEach((evt) => {
            box.addEventListener(evt, () => {
                // if box clicked, don't check pause boolean
                evt === 'click' ? applyColor(box,false) 
                                : applyColor(box,true);
            })
        });
        // add div to container
        container.appendChild(box);
    }
}

/**
 * Apply current chosen color to given box
 * 
 * @param {element} box box element on which color is applied 
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
}

/**
 * Build new grid after prompting user for size
 */
function resizeGrid(){
    let newSize = prompt("Enter new grid size (2 to 100)");
    try{
        if(newSize < 2 || newSize > 100 || newSize === 'undefined' ) throw "Invalid";
    }
    catch{
        alert("Size must be between 2-100");
        while(newSize < 2 || newSize > 100) { 
            newSize =prompt("Enter new grid size (2 to 100)")
        };
    }
    //edit grid-template-columns
    container.style['grid-template-columns'] = `repeat(${newSize}, 1fr`;
    // remove all existing boxes from grid
    removeGridNodes();
    // build new grid
    buildGrid(newSize);
}

/**
 * Change to next drawing color in colors array
 */
function changeColor(){
    currentColor = colorPicker.value;
}

/**
 * Remove all grid nodes from grid container
 */
function removeGridNodes() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}