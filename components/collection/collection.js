let Collection = (function (){
    let ALL_CHIPS;
    let oldChipsCollection = [];
    let firstMatchIndex = 0;
    let chipsCollection = [];

    let createEmptyCollectionField = () => {
        chipsCollection.push([]);
    }
    let setChipToCurrentCollectionField = (i) => {
        createEmptyCollectionField();
        chipsCollection[firstMatchIndex].push(ALL_CHIPS[i]);
        firstMatchIndex++;
    }
    let setChipToExistedCollectionField = (i) => {
        chipsCollection[firstMatchIndex - 1].push(ALL_CHIPS[i])
    }

    let connectFirstAndLastCollectionField = () => {
        let length = chipsCollection.length - 1;
        if (chipsCollection[0][0].lastElementChild.classList[1] === chipsCollection[length][0].lastElementChild.classList[1]) {
            chipsCollection[0].push(...chipsCollection[chipsCollection.length - 1]);
            chipsCollection.pop(chipsCollection[length]);
        }
    }
    let resetChipsCollection = () => {
        firstMatchIndex = 0;
        chipsCollection = [];
    }

    let formCollection = () => {
        ALL_CHIPS = (tray.children);
        for (let i = 0; i < ALL_CHIPS.length; i++) {
            if (i === 0) {
                setChipToCurrentCollectionField(i);
            } else {
                if (ALL_CHIPS[i].lastElementChild.classList[1] !== ALL_CHIPS[i - 1].lastElementChild.classList[1]) {
                    setChipToCurrentCollectionField(i);
                } else {
                    setChipToExistedCollectionField(i);
                }
            }
        }
        chipsCollection.length !== 1 ? connectFirstAndLastCollectionField() : '';
    }

    let getCountOfSameChipsCollection = (collection) => {
        let sameElementsCount = 0;
        for (let i = 0; i < collection.length; i++){
            collection[i].length > 1 ? sameElementsCount += collection[i].length : '';
        }
        return sameElementsCount;
    };

    let defineCollectionIndex = () => {
        let collectionElementsIndexes = [];
        for (let i = 0; i < ALL_CHIPS.length; i++){
            if (i >= 1){
                if (ALL_CHIPS[i].lastElementChild.classList[1] === ALL_CHIPS[i - 1].lastElementChild.classList[1]){
                    collectionElementsIndexes.push(i-1, i);
                }
            }
        }
        return collectionElementsIndexes;
    }

    let compareCollection = () => {
        let [newCoinsCount, oldCoinsCount] = [
            getCountOfSameChipsCollection(chipsCollection),
            getCountOfSameChipsCollection(oldChipsCollection)
        ]

        if (newCoinsCount > oldCoinsCount){
            console.log('coins to add', newCoinsCount * 100, 'coins we have', Score.getScore(), )
            Score.increaseScore(newCoinsCount * 100);
            Score.changeScoreValue();
        } else{
            Score.decreaseScore((oldCoinsCount - newCoinsCount ) * 100);
            Score.changeScoreValue();
        }
    };

    let isAllChipsAreInCollections = () => {
        chipsCollection.forEach(collection => {
            if (collection.length === 1){
                return false
            }
        });
        return true;
    }

    return{
        formCollection: function (){
            formCollection();
        },
        resetCollection: function (){
            resetChipsCollection();
        },
        saveOldCollection: function (){
            oldChipsCollection = chipsCollection;
        },
        compareCollection: function (){
            compareCollection();
        },
        defineCollectionIndex: function (){
            return defineCollectionIndex();
        },
        isChipsOutsideCollection: function (){
            for (let i = 0; i < chipsCollection.length; i++){
                if (chipsCollection[i].length === 1){
                    return true
                }
            }
            return false;
        },
        isAllChipsAreInCollections: function (){
            return isAllChipsAreInCollections();
        }

    }
}())