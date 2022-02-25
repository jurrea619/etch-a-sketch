const container = document.querySelector('.grid');

// build initial grid
for(let i = 0 ; i < 256 ; i++){
    //create div with 'box' class
    let newDiv = document.createElement('div');
    newDiv.classList.add('box');

    //attach mouseover listener event to turn background color black
    newDiv.addEventListener('mouseenter', () =>{
        newDiv.style.backgroundColor = 'black';
    });

    // add to container
    container.appendChild(newDiv);
}

// reset button changes grid to brand new
const resetBtn = document.querySelector("#resetBtn");
resetBtn.addEventListener("click", clearScreen);

function clearScreen(){
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((button) => {
        button.style.backgroundColor = "lightslategray";
    });
}

// grab size button and grid element to be adjusted
const sizeBtn = document.querySelector("#sizeBtn");
const grid = 
sizeBtn.addEventListener("click", ()=> {
    let newSize = prompt("Enter new grid size (up to 50)");    
    //edit grid-template-columns & grid-template rows
    container.style['grid-template-columns'] = `repeat(${newSize}, 1fr`;
    // container.style['grid-template-rows'] = `repeat(${newSize}), 1fr`;

    //remove all existing boxes from grid
    removeGridNodes();

    for (let i = 0; i < newSize ** 2; i++) {
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
});

// remove all child nodes from container
function removeGridNodes() {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}