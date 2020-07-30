const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'coral', 'orange'];
const tray = document.getElementById('tray');
const MAX_COUNT = 7;

const getRandomNumber = (maxValue) => Math.floor(Math.random() * colors.length);
const getRandomColor = () => colors[getRandomNumber(colors)];

class Circle {
    constructor(_tray) {
        this.tray = _tray;
        this.borderColor = null;
        this.textColor = null;
        this.backgroundColor = null;
        this.element = null;
    }
}

Circle.prototype.addNewElementToDom = function (clickedElement) {
    this.element = this.tray.appendChild(document.createElement('div'));
    this.borderColor = this.getUniqueColor();
    this.tray.lastChild.className = `circle ${this.borderColor}`;
    this.element.addEventListener('dblclick', this.changeCircleBackground.bind(clickedElement));
}

Circle.prototype.setTextToTrayChildElement = function (text) {
    this.element = this.tray.lastChild.appendChild(document.createElement('p'));
    this.tray.lastChild.lastChild.innerHTML = text;
    this.textColor = this.getUniqueColor(this.borderColor);
    this.backgroundColor = this.getUniqueColor(this.borderColor, this.textColor);
    this.element.style.color = this.textColor;
}

Circle.prototype.getUniqueColor = function (...args) {
    const randomColor = getRandomColor();
    const colors = [...args];
    if (colors.indexOf(randomColor) === -1) {
        return randomColor
    } else {
        return this.getUniqueColor(...args);
    }
}

Circle.prototype.changeCircleBackground = function(event){
    if (event.target.classList[0] === 'circle') {
        event.target.style.backgroundColor = this.getUniqueColor(this.borderColor, this.textColor);
    }
}

const createTrayChildCircle = () => {
    let trayChildCircle = new Circle(tray);
    trayChildCircle.addNewElementToDom(trayChildCircle);
    trayChildCircle.setTextToTrayChildElement(trayChildCircle.borderColor);
}

const setCirclesToTray = () => {
    tray.innerHTML = null
    for (let i = 0; i < MAX_COUNT; i++) {
        createTrayChildCircle();
    }
}








