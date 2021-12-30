const solidColorButton = document.querySelector('#color-mode');
const rainbowButton = document.querySelector('#rainbow-mode');
const clearButton = document.querySelector('#clear-button');

const colorSelector = document.querySelector('.color-selector');
const gridSlider = document.querySelector('.slider');

const MAX_COLOR_VALUE = 255;

/**
 * This was defined as a function so that it could be reusable when the container is 
 * resized
 * @param {int} widthAndHeight is used to determine the x and y amount of boxes 
 */
function createDivs(widthAndHeight) {
    let insertionDiv = document.querySelector('#drawing-container');

    let arrayOfDivs = new Array(widthAndHeight);

    for (let div of arrayOfDivs) {
        div = document.createElement('div');
        div.classList.add('vertical-div-container');
        insertionDiv.appendChild(div);

        let innerArray = new Array(widthAndHeight);
        for (let innerDiv of innerArray) {
            innerDiv = document.createElement('div');
            innerDiv.classList.add('drawing-unit');
            if (!rainbowMode)
                innerDiv.addEventListener('mouseover', changeColor);
            else
                innerDiv.addEventListener('mouseover', changeRandomColor);
            
            div.appendChild(innerDiv);
        } 
    }
}


/**
 * This is ran every time the grid is resized so that the above function
 * can be recycled
 */
function resetContainerDiv() {
    let insertionDiv = document.querySelector('#drawing-container');
    const parent = insertionDiv.parentElement;

    insertionDiv.remove();
    insertionDiv = document.createElement('div');
    insertionDiv.id = 'drawing-container';

    parent.appendChild(insertionDiv);
}


function getRandomColor() {
    const redValue = Math.floor(Math.random() * MAX_COLOR_VALUE) + 1;
    const blueValue = Math.floor(Math.random() * MAX_COLOR_VALUE) + 1;
    const greenValue = Math.floor(Math.random() * MAX_COLOR_VALUE) + 1;

    return `rgb(${redValue}, ${greenValue}, ${blueValue})`
}


function changeColor() {
    this.style.backgroundColor = color;
}


function changeRandomColor() {
    this.style.backgroundColor = getRandomColor();
}


clearButton.addEventListener('click', () => {
    const allDivs = document.querySelectorAll('.drawing-unit');
    for (const div of allDivs) {
        div.style.backgroundColor = 'white';
    }
});


gridSlider.addEventListener('change', () => {
    gridSize = parseInt(gridSlider.value);

    const gridSizeLabel = document.querySelector('.grid-size');
    gridSizeLabel.innerHTML = `<em>Grid Size: ${gridSize}</em>`;

    resetContainerDiv();
    createDivs(gridSize);
});


colorSelector.addEventListener('change', () => {
    color = colorSelector.value;
});


solidColorButton.addEventListener('click', () => {
    if (rainbowMode) {
        const allDivs = document.querySelectorAll('.drawing-unit');

        for (const div of allDivs) {
            div.removeEventListener('mouseover', changeRandomColor);
            div.addEventListener('mouseover', changeColor);
        }

        rainbowMode = false;
        rainbowButton.classList.toggle('selected');
        solidColorButton.classList.toggle('selected');
    }
});


rainbowButton.addEventListener('click', () => {
    if (!rainbowMode) {
        const allDivs = document.querySelectorAll('.drawing-unit');

        for (const div of allDivs) {
            div.removeEventListener('mouseover', changeColor);
            div.addEventListener('mouseover', changeRandomColor);
        }
    
        rainbowMode = true;
        rainbowButton.classList.toggle('selected');
        solidColorButton.classList.toggle('selected');
    } 
});


let color = 'rgb(92, 92, 92)';
let rainbowMode = false;
let gridSize = 16;

createDivs(gridSize);