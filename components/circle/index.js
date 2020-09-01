let tray = document.querySelector('#tray');
let template = document.querySelector('#template');
let addButton = document.querySelector('#add');
let modalTemplate = document.querySelector('#modalTemplate');

const Game = (function () {
    const colors = ['black', 'blue', 'green', 'red', 'white'];
    const CHIPS_COUNT = [3, 5, 8, 13, 21];
    let changeColorCount = 0;
    let index = 0;
    let circleNumber = 0;
    let radius = 20;
    let newChipsCount = 0;

    const getRandomNumber = () => Math.floor(Math.random() * colors.length);
    const getRandomColor = () => colors[getRandomNumber(colors)];

    const getRandomNumberDependsOnCount = (maxValue, collectionIndexes) => {
        let value = Math.floor(Math.random() * maxValue);
        if (Collection.isChipsOutsideCollection()) {
            if (collectionIndexes.length === 0) {
                return value
            } else {
                collectionIndexes.forEach(index => {
                    if (index === value) {
                        getRandomNumberDependsOnCount(maxValue, collectionIndexes);
                    }
                })
                return value;
            }
        }

    }

    const colorNameToUpperCase = (colorName) => {
        return colorName.replace(colorName[0], colorName[0].toUpperCase());
    };

    const setChipColor = (element, color) => {
        element.lastElementChild.classList.add(`${color}`);
    };

    const setWhiteBorderColor = (tray) => {
        for (let i = 0; i < tray.lastElementChild.children.length - 1; i++) {
            tray.lastElementChild.children[i].classList.add('borderWhite');
        }
    }

    const setdashedBorderColor = (element, color) => {
        element.lastElementChild.lastElementChild.classList.add(`dashBorder${colorNameToUpperCase(color)}`);
        element.lastElementChild.lastElementChild.appendChild(document.createElement('div'));
        element.lastElementChild.lastElementChild.lastElementChild.className = `dashBorder${colorNameToUpperCase(color)}Background`;
        element.lastElementChild.classList[1] === 'white' ? setWhiteBorderColor(element) : '';
    };

    const setClassNameDependsOnChipsCount = (chipsCount) => {
        switch (chipsCount) {
            case 3:
                return 'blockForThreeChips';
            case 5:
                return 'blockForFiveChips';
            case 8:
                return 'blockForEightChips';
            case 13:
                return 'blockForThirteenChips';
            case 21:
                return 'blockForTwentyOneChips';
        }
    }

    const createNewBlock = (tray) => {
        tray.appendChild(document.createElement('div'));
        tray.lastElementChild.className = setClassNameDependsOnChipsCount(CHIPS_COUNT[index]);
    }

    const insertTemplateToBlock = (element) => {
        element.appendChild(template.content.cloneNode(true));
    }

    function removeOldChipColor(element) {
        element.classList.remove(element.classList[1]);
    }

    function removeOldDashedBorderColor(element) {
        element.lastElementChild.classList.remove(element.lastElementChild.classList[1]);
        element.lastElementChild.firstElementChild.remove();
    }

    function removeBorderColor(element) {
        for (let border of element.children) {
            if (border.classList[1]) {
                border.classList.remove('borderWhite');
            }
        }
    }

    function setUniqueColor() {
        if (changeColorCount <= 2) {
            let color = getRandomColor();
            if (this.classList && this.classList[1] !== color) {
                setChipColor(this.parentElement, color);
                removeOldChipColor(this);
                removeBorderColor(this);
                setdashedBorderColor(this.parentElement, color);
                removeOldDashedBorderColor(this);
                Collection.saveOldCollection();
                Collection.resetCollection();
                Collection.formCollection();
                Collection.compareCollection();
            } else {
                return setUniqueColor();
            }
        }
        changeColorCount++;
        // if (changeColorCount > 2){
        //     setInformationAboutClickLimit();
        //     showModal();
        // }
    }

    let addEventListenerDBClick = (element, performedFunction) => {
        element.lastElementChild.addEventListener('dblclick', performedFunction)
    }

    let addEventListenerClick = (element, performedFunction) => {
        element.addEventListener('click', performedFunction);
    }

    const createChip = () => {
        const COLOR = getRandomColor();
        createNewBlock(tray);
        insertTemplateToBlock(tray.lastElementChild);
        setChipColor(tray.lastElementChild, COLOR);
        setdashedBorderColor(tray.lastElementChild, COLOR);
        addEventListenerDBClick(tray.lastElementChild, setUniqueColor)
    }

    let createRandomPositionedBlock = (tray, randomChipNumber) => {
        tray.children[randomChipNumber].after(document.createElement('div'));
        tray.children[randomChipNumber].nextSibling.className = setClassNameDependsOnChipsCount(CHIPS_COUNT[index]);
    }

    let getEmptyBlock = (AllBlocks, count) => {  // need to return blocks not from collection
        for (let i = 0; i < count; i++) {
            if (!AllBlocks[i].firstElementChild) {
                return AllBlocks[i];
            }
        }
    }

    let setTemplateIsideBlock = (template, block) => {
        block.appendChild(template.content.cloneNode(true));
    }

    let setButtonValues = (buttonName, className, value) => {
        buttonName.className = className;
        buttonName.innerHTML = value;
    }

    let removeAllChildElements = (element) => {
        while (element.children.length) {
            element.removeChild(element.lastElementChild);
        }
    }

    let restartGame = () => {
        circleNumber++;
        removeAllChildElements(tray);
        newChipsCount = 0
        index = 0;
        Score.resetScore();
        Score.changeScoreValue();
        Collection.resetCollection()
    }


    let createReplayButton = () => {
        if (!circleNumber) {
            let replayButton = addButton.parentElement.appendChild(document.createElement('button'));
            addEventListenerClick(replayButton, restartGame);
            setButtonValues(replayButton, 'replayButton', 'Play Again');
        }
    };

    const CreateRandomlyPositionedChip = (i) => {                  // refactor logic
        let collectionIndexes = Collection.defineCollectionIndex();
        if (i > newChipsCount) {
            const COLOR = getRandomColor();
            let randomChipNumber = getRandomNumberDependsOnCount(tray.children.length, collectionIndexes);
            if (randomChipNumber) {
                createRandomPositionedBlock(tray, randomChipNumber);
                let block = getEmptyBlock(tray.children, tray.children.length);
                setTemplateIsideBlock(template, block);
                setChipColor(block, COLOR);
                setdashedBorderColor(block, COLOR);
                addEventListenerDBClick(block, setUniqueColor);
            }
        }
    }

    const replaceAllChipsRelativeCount = (i) => {
        tray.children[i].className = setClassNameDependsOnChipsCount(CHIPS_COUNT[index])
    }

    let addNewChip = (i) => {
        i > newChipsCount ? createChip() : '';
    }

    let takeMoreChips = (i) => {
        Collection.isAllChipsAreInCollections() ? addNewChip(i) : CreateRandomlyPositionedChip(i);
        replaceAllChipsRelativeCount(i);
    }

    let informWinner = () => {
        if(CHIPS_COUNT[index] === 21){
            setInformationForWinner();
            showModal();
        }
    }

    return {
        price: () => {
            return (CHIPS_COUNT[index] - CHIPS_COUNT[index - 1]) * 100;
        },
        isfirstEntery: () => {
            if (CHIPS_COUNT[0] === CHIPS_COUNT[index]) {
                return true;
            } else {
                return false;
            }
        },
        createReplayButton: () => {
            createReplayButton();
        },
        changeButtonName: () => {
            addButton.innerHTML = 'More';
        },
        setNextIndex: () => {
            index++;
            radius += 7;
        },
        setCountChipsToAdd: () => {
            newChipsCount = CHIPS_COUNT[index - 1] - 1;
            console.log('chips count to add', newChipsCount);
        },
        createPlayingChips: () => {
            for (let i = 0; i < CHIPS_COUNT[index]; i++) {
                !index ? createChip() : takeMoreChips(i);
            }
        },
        informWinner: function (){
            informWinner();
        },
        resetCountOfColorChanges: function (){
            changeColorCount = 0;
        }
    }
}());

addButton.addEventListener('click', (e) => {
    Collection.saveOldCollection();
    Game.changeButtonName();
    if (Game.isfirstEntery()) {
        Game.createReplayButton();
        Score.displayScoreField();
        Game.createPlayingChips();
        Game.setNextIndex();
        Game.setCountChipsToAdd();
    } else {
        Score.getScore() >= Game.price() ? Game.createPlayingChips() : showModal(modalTemplate);
        Score.decreaseScore(Game.price());
        Score.changeScoreValue();
        Game.setNextIndex();
        Game.setCountChipsToAdd();
        Game.informWinner();
    }
    Collection.resetCollection();
    Collection.formCollection();
    Collection.compareCollection();
});








