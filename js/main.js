// declare vars for grid container and mouseClicked on/off feature
const container = document.querySelector('.grid');
let drawingPaused = false;

document.addEventListener('click', () => {
    drawingPaused = drawingPaused? false : true;
});

// build initial 16*16 grid on page load
for(let i = 0 ; i < 256 ; i++){
    let newDiv = document.createElement('div');
    newDiv.classList.add('box');

    //attach mouseover listener event to turn background color black
    newDiv.addEventListener('mouseenter', () =>{
        if(!drawingPaused){
            newDiv.style.backgroundColor = 'black';
        }
    });

    // add div to container
    container.appendChild(newDiv);
}

// declare var for reset button, attach click event handler function
const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", clearScreen);

/**
 * Resets current grid back to original grey color
 */
function clearScreen(){
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((button) => {
        button.style.backgroundColor = "lightslategray";
    });
}

// grab size button and grid element to be adjusted
const sizeBtn = document.querySelector("#sizeBtn");
sizeBtn.addEventListener("click", ()=> {
    let newSize = prompt("Enter new grid size (up to 100)");    
    resizeGrid(newSize);
});

/**
 * Create new grid with size*size
 * 
 * @param {number} size size of new grid rows/columns
 */
function resizeGrid(size){
    //edit grid-template-columns & grid-template rows
    container.style['grid-template-columns'] = `repeat(${size}, 1fr`;

    //remove all existing boxes from grid
    removeGridNodes();

    for (let i = 0; i < size ** 2; i++) {
        //create div with 'box' class
        let newDiv = document.createElement('div');
        newDiv.classList.add('box');

        //attach mouseover listener event to turn background color black
        newDiv.addEventListener('mouseenter', () => {
            newDiv.style.backgroundColor = 'black';
        });

        // add to container
        container.appendChild(newDiv);
    }
}

/**
 * Remove all grid nodes from grid container
 */
function removeGridNodes() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}