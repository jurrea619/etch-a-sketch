// vars for grid container, buttons and pause boolean
const container = document.querySelector('.grid');
const instructions = document.querySelector('#instructions');
const resetBtn = document.querySelector("#resetBtn");
const sizeBtn = document.querySelector("#sizeBtn");
let drawingPaused = false;

// attach click event handler functions
document.addEventListener('click', pauseGame);
resetBtn.addEventListener("click", clearScreen);
sizeBtn.addEventListener("click", resizeGrid);

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
        let newDiv = document.createElement('div');
        newDiv.classList.add('box');
        //attach mouseover listener event to turn background color black
        newDiv.addEventListener('mouseenter', () => {
            if (!drawingPaused) {
                newDiv.style.backgroundColor = 'black';
            }
        });
        // add div to container
        container.appendChild(newDiv);
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

/**
 * Remove all grid nodes from grid container
 */
function removeGridNodes() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}