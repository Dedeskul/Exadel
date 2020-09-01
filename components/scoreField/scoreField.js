let Score = (function () {
    let score = 300;
    function setScoreToDom () {
        let score = document.body.appendChild(document.createElement('div'));
        score.className = 'scoreDisplayingBlock';
        score.appendChild(document.createElement('div'));
        score.appendChild(document.createElement('p'));
        return score;
    }
    function displayScoreField () {
        if(!document.querySelector('.scoreDisplayingBlock')){
            let scoreValueField = setScoreToDom();
            Score.setCurrentScore(scoreValueField.lastElementChild);
        }
    }
    function changeScoreValue () {
        let scoreValueField = document.querySelector('.scoreDisplayingBlock');
        Score.setCurrentScore(scoreValueField.lastElementChild);
    }
    return {
        getScore: function () {
            return score;
        },
        increaseScore: function (step) {
            if (step > 0) {
                return score += step;
            } else {
                return
            }
        },
        decreaseScore: function (step) {
            if (step > 0 && score >= step) {
                return score -= step;
            } else {
                return
            }
        },
        resetScore: function () {
            return score = 300;
        },
        setScoreToDom: function () {
            return setScoreToDom();
        },
        setCurrentScore: function (scoreValueField) {
            scoreValueField.previousSibling.innerHTML = '<p>coins</p>:';
            scoreValueField.innerHTML = `<p>💲<b>${score}</b>${!Game.price() ? '' : ` <p>price: ${Game.price()}</p>`}</p>`;
        },
        displayScoreField: function () {
            displayScoreField();
        },
        changeScoreValue: function () {
            changeScoreValue();
        },
    }
}());





