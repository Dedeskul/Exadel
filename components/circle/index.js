const colors = ['red', 'blue', 'green', 'black', 'pink', 'purple', 'yellow', 'orange', 'skyblue'];

const tray = document.getElementById('tray');
const add = document.getElementById('add');
const MAX_COUNT = 10;

const getRandomNumber = (maxValue) => Math.floor(Math.random() * colors.length);
const getRandomColor = () => colors[getRandomNumber(colors)];

class Circle {
    constructor(_tray) {
        this.tray = _tray;
        this.borderColor = null;
        this.textColor = null;
        this.backgroundColor = null;
        this.element = null;
        this.coordinates = null;
    }
}

Circle.prototype.addNewElementToDom = function (clickedElement) {
    this.element = this.tray.appendChild(document.createElement('div'));
    this.borderColor = this.getUniqueColor();
    this.tray.lastChild.className = `circle ${this.borderColor}`;
    this.element.addEventListener('dblclick', this.changeCircleBackground.bind(clickedElement));
}

Circle.prototype.setTextToTrayChildElement = function (text) {
    this.element = this.tray.lastChild.lastChild.appendChild(document.createElement('p'));
    this.tray.lastChild.lastChild.lastChild.innerHTML = text;
    this.textColor = this.getUniqueColor(this.borderColor);
    this.backgroundColor = this.getUniqueColor(this.borderColor, this.textColor);
    this.element.style.color = this.textColor;
}

Circle.prototype.setDashedBorderInsideElement = function (){
    this.element.appendChild(document.createElement('div'));
    this.element.lastChild.className = 'circleInsideBorder';
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

Circle.prototype.changeCircleBackground = function (event) {
    if (event.target.classList[0] === 'circle') {
        event.target.style.backgroundColor = this.getUniqueColor(this.borderColor, this.textColor);
    }
}

Circle.prototype.setCircleCoordinates = function (trayChildCircle ,i, length, radius) {
    const arc = 2 * Math.PI * (1 / length);
    const angle = i * arc;
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    trayChildCircle.coordinates = [x,y]
}

const createTrayChildCircle = (trayChildCircle) => {
    trayChildCircle.tray.style.display = 'flex';
    trayChildCircle.addNewElementToDom(trayChildCircle);
    trayChildCircle.setDashedBorderInsideElement();
    trayChildCircle.setTextToTrayChildElement(trayChildCircle.borderColor);
}



const calculateCircleCoordinates = (trayChildCircle, i, length, radius) => {
    trayChildCircle.setCircleCoordinates(trayChildCircle,i, length, radius);
}

const placeElementsRElativeCoordinates = (trayChildCircle) => {
    const [x, y] = trayChildCircle.coordinates;
    trayChildCircle.tray.lastChild.style.left = 50 + x + '%';
    trayChildCircle.tray.lastChild.style.top = 50 + y + '%';
}

const setCirclesToTray = () => {
    tray.innerHTML = null
    for (let i = 0; i < MAX_COUNT; i++) {
        let trayChildCircle = new Circle(tray);
        createTrayChildCircle(trayChildCircle);
        calculateCircleCoordinates(trayChildCircle ,i, MAX_COUNT, 30)
        placeElementsRElativeCoordinates(trayChildCircle);
        console.log(trayChildCircle.tray.lastChild.lastChild)
    }
}










