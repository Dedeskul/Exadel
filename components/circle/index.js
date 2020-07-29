const colors = ['red', 'green', 'blue', 'yellow', 'purple', 'coral', 'orange'];
const tray = document.getElementById('tray');
const MAX_COUNT = 7;

function getRandomNumber(maxValue) {
    return Math.floor(Math.random() * colors.length)
}

function getRandomColor() {
    return colors[getRandomNumber(colors)]
}

function Circle(_tray) {
    this.tray = _tray;
    this.borderColor = null;
    this.textColor = null;
    this.backgroundColor = null;
    this.element = null;
}


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
    this.borderColor = this.getUniqueColor('','');
    this.tray.lastChild.className = `circle ${this.borderColor}`;
    this.element.addEventListener('dblclick', this.changeCircleBackground.bind(clickedElement));
}

Circle.prototype.setTextToTrayChildElement = function (text) {
    this.element = this.tray.lastChild.appendChild(document.createElement('p'));
    this.tray.lastChild.lastChild.innerHTML = text;
    this.textColor = this.getUniqueColor(this.borderColor, '');
    this.backgroundColor = this.getUniqueColor(this.borderColor, this.textColor);
    this.element.style.color = this.textColor;
}

Circle.prototype.getUniqueColor = function(borderColor, textColor){
    const randomColor = getRandomColor();
    if(arguments[0] === ''){
        return randomColor;
    }else{
        const colors = [...arguments];
        if(colors.indexOf(randomColor) === -1){
            return randomColor;
        }else{
            return this.getUniqueColor(borderColor, textColor);
        }
    }
}

Circle.prototype.changeCircleBackground = function(event){
    if (event.target.classList[0] === 'circle') {
        event.target.style.backgroundColor = this.getUniqueColor(this.borderColor, this.textColor);
    }
}

function setCirclesToTray () {
    tray.innerHTML = null
    for (let i = 0; i < MAX_COUNT; i++) {
        let trayChildCircle = new Circle(tray);
        trayChildCircle.addNewElementToDom(trayChildCircle);
        trayChildCircle.setTextToTrayChildElement(trayChildCircle.borderColor);
    }
}








