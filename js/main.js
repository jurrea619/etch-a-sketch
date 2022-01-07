const container = document.querySelector('.container');

// loop and add 4x4 squares to begin grid.
for(let i = 0 ; i < 256 ; i++){
    let newDiv = document.createElement('div');
    newDiv.classList.add('box');
    container.appendChild(newDiv);
}
