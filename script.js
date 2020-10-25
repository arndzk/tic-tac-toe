let playerTurn = true;
let multiplayer = false;

// Player Factory
const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { name, mark, getName, getMark };
};

const playerOne = Player('Player One', '❌');
const playerTwo = Player('Player Two', '〇');

// Tile object Factory
const tileFactory = (tileNum) => {
    const tileMark = ``;
    return { tileNum, tileMark };
}

// Create the gameboard object
const gameBoardModule = (() => {
    const generateGameTiles = () => {
        const gameTiles = [];
        for (let i = 0; i < 9; i++) {
            gameTiles.push(tileFactory(i + 1));
        }
        return gameTiles;
    }
    const setTileMark = (tileNum, tileMark) => {
        for (let i = 0; i < 9; i++) {
            if (gameTiles[i].tileNum == tileNum) {
                gameTiles[i].tileMark = tileMark;
            }
        }
    }
    const gameTiles = generateGameTiles();
    const getGameBoard = () => console.log(gameTiles);
    return { getGameBoard, setTileMark };
})();


// Generate the gameboard tiles in the DOM
const dynamicDomTilesModule = (() => {
    console.log(`generating tiles...`)
    let tiles = document.getElementById('tiles');
    let counter = 1;
    for (let i = 0; i < 3; i++) {
        console.log(`generating row ${i + 1}...`);
        let tileRow = document.createElement('div');
        tileRow.setAttribute('id',`tile-row-${i + 1}`);
        tileRow.classList.add(`tile-row`);
        for (let j = 0; j < 3; j++) {
            console.log(`generating tile ${counter}...`);
            let tile = document.createElement('div');
            tile.classList.add(`tile`);
            tile.setAttribute('id', `tile-${counter++}`);
            tile.addEventListener('click', markTile);
            tileRow.appendChild(tile);
        }
        tiles.appendChild(tileRow);
    }
})();

// Generate new game form

const dynamicNewGameForm = (() => {
    let container = document.querySelector('#container');
    let newGameForm = document.createElement('div');
    let newGameFormWrapper = document.createElement('div');
    newGameForm.setAttribute('id', 'new-game-form');
    newGameFormWrapper.classList.add('border-wrap');
    
    let newGameHeader = document.createElement('div');
    let formLineTop = document.createElement('div');
    let playerOneField = document.createElement('div');
    let formLineMiddleTop = document.createElement('div');
    let playerTwoField = document.createElement('div');
    let formLineMiddleBottom = document.createElement('div');
    let playWithAIField = document.createElement('div');
    let formLineBottom = document.createElement('div');
    let newGameButtonField = document.createElement('div');

    newGameHeader.classList.add('form-header');
    newGameHeader.innerHTML = `New Game`
    playerOneField.classList.add('input-field');
    playerTwoField.classList.add('input-field');
    playWithAIField.classList.add('input-field');
    newGameButtonField.classList.add('button-field');
    formLineTop.classList.add('line');
    formLineMiddleTop.classList.add('line');
    formLineMiddleBottom.classList.add('line');
    formLineBottom.classList.add('line');

    // playerOneField Children
    let playerOneFieldText = document.createElement('label');
    playerOneFieldText.setAttribute('id', 'player-one-label');
    playerOneFieldText.classList.add('form-label');
    playerOneFieldText.textContent = `Player 1`;
    let playerOneFieldInput = document.createElement('input');
    playerOneField.appendChild(playerOneFieldText);

    // playerTwoField Children
    let playerTwoFieldText = document.createElement('label');
    playerTwoFieldText.setAttribute('id', 'player-two-label');
    playerTwoFieldText.classList.add('form-label');
    playerTwoFieldText.textContent = `Player 2`;
    playerTwoField.appendChild(playerTwoFieldText);

    // playWithAI Children
    let playWithAIFieldTextWrapper = document.createElement('div');
    playWithAIFieldTextWrapper.classList.add('label-wrap');
    let playWithAIFieldTextBackground = document.createElement('div');
    playWithAIFieldTextBackground.classList.add('play-ai-background')
    let playWithAIFieldText = document.createElement('label');
    playWithAIFieldText.setAttribute('id', 'play-ai-label');
    playWithAIFieldText.classList.add('form-label');
    playWithAIFieldText.textContent = `vs. AI`;
    playWithAIFieldTextBackground.appendChild(playWithAIFieldText);
    playWithAIFieldTextWrapper.appendChild(playWithAIFieldTextBackground);
    playWithAIField.appendChild(playWithAIFieldTextWrapper);

    // newGameButtonField Children
    let newGameButtonFieldTextWrapper = document.createElement('div');
    newGameButtonFieldTextWrapper.classList.add('button-wrap');
    let newGameButtonFieldTextBackground = document.createElement('div');
    newGameButtonFieldTextBackground.classList.add('start-game-background')
    let newGameButtonFieldText = document.createElement('div');
    newGameButtonFieldText.setAttribute('id', 'start-game');
    newGameButtonFieldText.classList.add('form-label');
    newGameButtonFieldText.innerHTML = `Start Game`;
    newGameButtonFieldTextBackground.appendChild(newGameButtonFieldText);
    newGameButtonFieldTextWrapper.appendChild(newGameButtonFieldTextBackground);
    newGameButtonField.appendChild(newGameButtonFieldTextWrapper);

    newGameForm.appendChild(newGameHeader);
    newGameForm.appendChild(formLineTop);
    newGameForm.appendChild(playerOneField);
    newGameForm.appendChild(formLineMiddleTop);
    newGameForm.appendChild(playerTwoField);
    newGameForm.appendChild(formLineMiddleBottom);
    newGameForm.appendChild(playWithAIField);
    newGameForm.appendChild(formLineBottom);
    newGameForm.appendChild(newGameButtonField);
    
    newGameFormWrapper.appendChild(newGameForm);
    container.appendChild(newGameFormWrapper);
})();

function markTile() {
    let whichTile = this.getAttribute('id');
    let newMark = document.createElement('div');
    if (playerTurn == true) {
        newMark.classList.add('tic-tac-style');
        newMark.innerHTML = playerOne.getMark();
    }
    else if (playerTurn == false) {
        newMark.classList.add('toe-style');
        newMark.innerHTML = playerTwo.getMark();
    }
    this.appendChild(newMark);
    this.removeEventListener('click', markTile);
    updateTileMark(whichTile, newMark.innerHTML);
    playerTurn = !playerTurn;
}

const updateTileMark = (tileId, tileMark) => {
    const tileNum = tileId.slice(-1);
    gameBoardModule.setTileMark(tileNum, tileMark);
}