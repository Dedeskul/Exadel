let modalTitle = `Your balance is: <b><span class="scoreValue">${Score.getScore()}</span></b> coins`;
let mainInfo = `the purchase costs <span class="nececaryCoins">${Game.price()}</span> coins`;
let conclusion = 'It\`s not enough to buy a new Chips';

let createModalWindow  = (modalTemplate) => {
    document.body.appendChild(modalTemplate.content.cloneNode(true));
}

let getModalName = (name) => {
    for (let children of document.body.children){
        if (children.className === name){
            return children;
        }
    }
}

let createModalCloseButton = () => {
    let closeButtonBlock = document.body.lastElementChild.appendChild(document.createElement('div'));
    closeButtonBlock.className = 'closeModalButtonContainer';
    closeButtonBlock.addEventListener('click', function (){
        document.body.removeChild(getModalName('modal'));
    })
    let closeButton = document.body.lastElementChild.lastElementChild.appendChild(document.createElement('span'));
    closeButton.className = 'closeModalButton';
}

let setInformationForWinner = () => {
    modalTitle = `<b>Congratulations!!!</b>`;
    mainInfo = `You are <span class="scoreValue">Winner</span>, your gain is <b><span class="scoreValue">${Score.getScore()}</span></b> coins`;
    conclusion = `let\'s play again`;
}

let setInformationAboutClickLimit = () => {
    modalTitle = `Your click limit is <span class="scoreValue">exhausted</span>`;
    mainInfo = `You can start <span class="scoreValue">new game</span>`;
    conclusion = `And try it again`;
}

let setInformationToModal = (textField, title, mainInfo, conclusion) => {
    textField.firstElementChild.innerHTML = title;
    textField.children[1].innerHTML = mainInfo;
    textField.lastElementChild.innerHTML = conclusion;
}

let showModal = (modalTemplate) => {
    if(document.querySelector('.modal') === null){
        createModalWindow(modalTemplate);
        setInformationToModal(document.body.lastElementChild, modalTitle, mainInfo, conclusion);
        createModalCloseButton();
    }
}
