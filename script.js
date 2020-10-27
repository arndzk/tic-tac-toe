let playerTurn = true;
let multiplayer = false;
const players = [];
let outcome;

const game = (() => {

    const winningCombos = [
        [0,1,2],[3,4,5],[6,7,8], // Horizontal
        [0,3,6],[1,4,7],[3,5,8], // Vertical
        [0,4,8],[2,4,6] // Diagonal
    ];
    const checkForWinningCombo = (currentBoard) => {
        for (let i = 0; i <= 7; i++) {
            if (currentBoard.every(tile => tile.tileMark != '')){
                return `tie`;
            }
            if(currentBoard[winningCombos[i][0]].tileMark != '' &&
                currentBoard[winningCombos[i][1]].tileMark != '' && 
                currentBoard[winningCombos[i][2]].tileMark != '') {
                    //console.log(`checking ${winningCombos[i]} |${currentBoard[winningCombos[i][0]].tileMark}|${currentBoard[winningCombos[i][1]].tileMark}|${currentBoard[winningCombos[i][2]].tileMark}|`)
                if (currentBoard[winningCombos[i][0]].tileMark == currentBoard[winningCombos[i][1]].tileMark &&
                    currentBoard[winningCombos[i][0]].tileMark == currentBoard[winningCombos[i][2]].tileMark) {
                    let winningTiles = [];
                    winningTiles.push(`tile-${winningCombos[i][0] + 1}`);
                    winningTiles.push(`tile-${winningCombos[i][1] + 1}`);
                    winningTiles.push(`tile-${winningCombos[i][2] + 1}`);
                    console.table(winningTiles);
                    //let aWinningTile = document.querySelector
                    winningTiles.forEach(tile => document.querySelector(`#${tile}`).childNodes[0].classList.add('winning-tile'));
                    if(currentBoard[winningCombos[i][0]].tileMark == '✕') {
                        return `player-one`;
                    } else {
                        return `player-two`;
                    }
                    break;
                } else {
                    continue;
                }
            }
        }
    }

    return { checkForWinningCombo }
})();

// Player Factory
const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { name, mark, getName, getMark };
};

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
    const getGameBoard = () => { return gameTiles };
    return { getGameBoard, setTileMark };
})();


// Generate the gameboard tiles in the DOM
const dynamicDomTilesModule = (() => {
    //console.log(`generating tiles...`)
    let tiles = document.getElementById('tiles');
    let counter = 1;
    for (let i = 0; i < 3; i++) {
        //console.log(`generating row ${i + 1}...`);
        let tileRow = document.createElement('div');
        tileRow.setAttribute('id',`tile-row-${i + 1}`);
        tileRow.classList.add(`tile-row`);
        for (let j = 0; j < 3; j++) {
            //console.log(`generating tile ${counter}...`);
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
    newGameFormWrapper.setAttribute('id', 'form-wrapper');
    
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
    playerTwoField.setAttribute('id', 'player-two-field');
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
    let playerOneFieldInputDiv = document.createElement('div');
    playerOneFieldInputDiv.classList.add('player-input-div');
    let playerOneFieldInput = document.createElement('input');
    playerOneFieldInput.setAttribute('type', 'text');
    playerOneFieldInput.setAttribute('id', 'player-one-input');
    playerOneFieldInput.classList.add('player-input');
    playerOneField.appendChild(playerOneFieldText);
    playerOneFieldInputDiv.appendChild(playerOneFieldInput);
    playerOneField.appendChild(playerOneFieldInputDiv);

    // playerTwoField Children
    let playerTwoFieldText = document.createElement('label');
    playerTwoFieldText.setAttribute('id', 'player-two-label');
    playerTwoFieldText.classList.add('form-label');
    playerTwoFieldText.textContent = `Player 2`;
    let playerTwoFieldInputDiv = document.createElement('div');
    playerTwoFieldInputDiv.classList.add('player-input-div');
    let playerTwoFieldInput = document.createElement('input');
    playerTwoFieldInput.setAttribute('type', 'text');
    playerTwoFieldInput.setAttribute('id', 'player-two-input');
    playerTwoFieldInput.classList.add('player-input');
    playerTwoField.appendChild(playerTwoFieldText);
    playerTwoFieldInputDiv.appendChild(playerTwoFieldInput);
    playerTwoField.appendChild(playerTwoFieldInputDiv);

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
    let playWithAICheckboxDiv = document.createElement('div');
    playWithAICheckboxDiv.classList.add('ai-checkbox-div');
    let playWithAICheckbox = document.createElement('input');
    playWithAICheckbox.setAttribute('id', 'ai-checkbox');
    playWithAICheckbox.setAttribute('type', 'checkbox');
    playWithAICheckboxDiv.appendChild(playWithAICheckbox);
    playWithAIField.appendChild(playWithAICheckboxDiv);


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
    newGameButtonFieldTextWrapper.addEventListener('click', closeForm)
    newGameFormWrapper.appendChild(newGameForm);
    container.appendChild(newGameFormWrapper);
})();

function markTile() {
    let whichTile = this.getAttribute('id');
    let newMark = document.createElement('div');
    if (playerTurn == true) {
        newMark.classList.add('tic-tac-style');
        newMark.innerHTML = players[0].getMark();
    }
    else if (playerTurn == false) {
        newMark.classList.add('toe-style');
        newMark.innerHTML = players[1].getMark();
    }
    this.appendChild(newMark);
    this.removeEventListener('click', markTile);
    updateTileMark(whichTile, newMark.innerHTML);
    playerTurn = !playerTurn;
    if (playerTurn == false) {
        let playerOne = document.getElementById('player-one');
        playerOne.classList.remove('has-turn');
        let playerTwo = document.getElementById('player-two');
        playerTwo.classList.add('has-turn');
    } else {
        let playerTwo = document.getElementById('player-two');
        playerTwo.classList.remove('has-turn');
        let playerOne = document.getElementById('player-one');
        playerOne.classList.add('has-turn');
    }
    outcome = game.checkForWinningCombo(gameBoardModule.getGameBoard());
    if (outcome != null && outcome != `tie`) {
        let tiles = []
        tiles = document.querySelectorAll('.tile');
        console.log(tiles);
        tiles.forEach(tile => tile.removeEventListener('click', markTile));
        console.log(`${outcome} wins!`);
    } else if (outcome == `tie`) {
        console.log(`The game ends in a ${outcome}!`);
    }
}

const updateTileMark = (tileId, tileMark) => {
    const tileNum = tileId.slice(-1);
    gameBoardModule.setTileMark(tileNum, tileMark);
}

function closeForm() {
    let playerOneName = document.getElementById('player-one-input').value;
    let playerTwoName = document.getElementById('player-two-input').value;
    if(playerOneName == "" || playerTwoName == "") {
        alert(`Please enter the players' names!`);
    } else {
        let select = document.getElementById('form-wrapper');
        select.classList.add('invisible');
        generatePlayers(playerOneName, playerTwoName);
        updatePlayerNames();
    }
}

function generatePlayers(playerOneName, playerTwoName) {
    players.push(Player(playerOneName, '✕'));
    players.push(Player(playerTwoName, '〇'));
}

function updatePlayerNames() {
    let playerOne = document.getElementById('player-one');
    playerOne.classList.add('has-turn');
    let playerTwo = document.getElementById('player-two');
    playerOne.innerHTML = players[0].getName();
    playerTwo.innerHTML = players[1].getName();
}