const container = document.querySelector('.container');

// build x amt of squares, attach mouseover listeners and append to grid container
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
