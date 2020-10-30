const players = [];
let outcome;

const game = (() => {
    let stopAI = true;
    let outcome;
    let playerTurn = true;
    let multiplayer = true;
    const getStopAI = () => {
        return stopAI;
    }
    const switchStopAI = () => {
        stopAI = !stopAI;
    }
    const resetOutcome = () => {
        outcome = null;
    }
    const switchPlayerTurn = () => {
        playerTurn = !playerTurn;
    }
    const getPlayerTurn = () => {
        return playerTurn;
    }
    const resetPlayerTurn = () => {
        playerTurn = true;
    }
    const switchMultiplayer = () => {
        multiplayer = !multiplayer;
    }
    const getMultiplayer = () => {
        return multiplayer;
    }
    const winningCombos = [
        [0,1,2],[3,4,5],[6,7,8], // Horizontal
        [0,3,6],[1,4,7],[2,5,8], // Vertical
        [0,4,8],[2,4,6] // Diagonal
    ];
    const checkForWinningCombo = (currentBoard) => {
        for (let i = 0; i <= 7; i++) {
            if(currentBoard[winningCombos[i][0]].tileMark != '' && currentBoard[winningCombos[i][1]].tileMark != '' && currentBoard[winningCombos[i][2]].tileMark != '') {
                //console.log(`checking ${winningCombos[i]} |${currentBoard[winningCombos[i][0]].tileMark}|${currentBoard[winningCombos[i][1]].tileMark}|${currentBoard[winningCombos[i][2]].tileMark}|`)
                if (currentBoard[winningCombos[i][0]].tileMark == currentBoard[winningCombos[i][1]].tileMark && currentBoard[winningCombos[i][0]].tileMark == currentBoard[winningCombos[i][2]].tileMark) {
                    let winningTiles = [];
                    winningTiles.push(`tile-${winningCombos[i][0] + 1}`);
                    winningTiles.push(`tile-${winningCombos[i][1] + 1}`);
                    winningTiles.push(`tile-${winningCombos[i][2] + 1}`);
                    winningTiles.forEach(tile => document.querySelector(`#${tile}`).childNodes[0].classList.add('winning-tile'));
                    if(currentBoard[winningCombos[i][0]].tileMark == '✕') {
                        outcome = `player-one`;
                        if(getMultiplayer() == false) {
                            switchStopAI();
                        }

                    } else { 
                        outcome = `player-two`;
                    }
                    break;
                } else { continue; }
            }
        }
        if (currentBoard.every(tile => tile.tileMark != '')){ outcome = `tie`; }

        if (outcome != null && outcome != `tie`) {
            let tiles = [];
            tiles = document.querySelectorAll('.tile');
            tiles.forEach(tile => tile.removeEventListener('click', markTile));
            gameDisplay.updateDisplay(outcome);
        } else if (outcome == `tie`) {
            gameDisplay.updateDisplay(outcome);
        } else {
            gameDisplay.updateDisplay(1);
        }
    }
    const resetGameBoard = () => {
        let tiles = [];
        tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => tile.innerHTML = '');
        tiles.forEach(tile => tile.addEventListener('click', markTile));
        gameBoardModule.resetTiles();
        gameDisplay.resetGameStatus();
        game.resetOutcome();
        game.resetPlayerTurn();
        let select = document.querySelector('#display-play-again');
        select.classList.add('invisible');
        select = document.querySelector('#display-new-game');
        select.classList.add('invisible');
        if (game.getPlayerTurn() == false) {
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
        if (game.getStopAI() == true && game.getMultiplayer() == false) {
            console.log(`making sure AI stays on...`)
            game.switchStopAI();
        }
    }
    return { switchStopAI, getStopAI, resetPlayerTurn, resetGameBoard, resetOutcome, checkForWinningCombo, switchPlayerTurn, getPlayerTurn, switchMultiplayer, getMultiplayer }
})();

const gameDisplay = (() => {
    let turn = 1;
    let gameStatus = `Turn ${turn}`;
    const updateDisplay = (newGameStatus) => {
        if (newGameStatus == 1) {
            turn++;
            gameStatus = `Turn ${turn}`;
            let gameStatusElement = document.querySelector('#game-status');
            gameStatusElement.innerHTML = gameStatus;
        }
        else if (newGameStatus == 'tie') {
            gameStatus = 'Tie!';
            let gameStatusElement = document.querySelector('#game-status');
            gameStatusElement.innerHTML = gameStatus;
            let select = document.querySelector('#display-play-again');
            select.classList.remove('invisible');
            select = document.querySelector('#display-new-game');
            select.classList.remove('invisible');   
        } else {
            let winningPlayerName = document.querySelector(`#${newGameStatus}`).innerHTML; 
            gameStatus = `${winningPlayerName} wins!`;
            let gameStatusElement = document.querySelector('#game-status');
            gameStatusElement.innerHTML = gameStatus;
            let select = document.querySelector('#display-play-again');
            select.classList.remove('invisible');
            select = document.querySelector('#display-new-game');
            select.classList.remove('invisible');
        }
    }
    const getGameStatus = () => {
        return gameStatus;
    }
    const resetGameStatus = () => {
        turn = 1;
        let gameStatus = `Turn ${turn}`;
        let gameStatusElement = document.querySelector('#game-status');
        gameStatusElement.innerHTML = gameStatus;
    }

    return { updateDisplay, getGameStatus, resetGameStatus, };
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
    const resetTiles = () => {
        gameTiles.forEach(tile => tile.tileMark = '');
    }
    return { getGameBoard, setTileMark, resetTiles, gameTiles };
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

// generate gameDisplay
const dynamicGameDisplay = (() => {
    let gameStatusDisplay = document.querySelector('#game-status-display');
    let gameStatus = document.createElement('div');
    gameStatus.setAttribute('id', 'game-status');
    gameStatus.classList.add('invisible');
    gameStatus.innerHTML = gameDisplay.getGameStatus();
    
    let playAgainButtonDiv = document.createElement('div');
    playAgainButtonDiv.setAttribute('id', 'display-play-again');
    playAgainButtonDiv.classList.add('invisible');
    let newGameButtonDiv = document.createElement('div');
    newGameButtonDiv.setAttribute('id', 'display-new-game');
    newGameButtonDiv.classList.add('invisible');

    let playAgainButtonWrapper = document.createElement('div');
    playAgainButtonWrapper.classList.add('button-wrap');
    let playAgainButtonBackground = document.createElement('div');
    playAgainButtonBackground.classList.add('start-game-background')
    let playAgainButtonText = document.createElement('div');
    playAgainButtonText.setAttribute('id', 'play-again');
    playAgainButtonText.classList.add('form-label');
    playAgainButtonText.innerHTML = `Play Again`;
    playAgainButtonBackground.appendChild(playAgainButtonText);
    playAgainButtonWrapper.appendChild(playAgainButtonBackground);
    playAgainButtonDiv.appendChild(playAgainButtonWrapper);

    let newGameButtonWrapper = document.createElement('div');
    newGameButtonWrapper.classList.add('button-wrap');
    let newGameButtonBackground = document.createElement('div');
    newGameButtonBackground.classList.add('start-game-background')
    let newGameButtonText = document.createElement('div');
    newGameButtonText.setAttribute('id', 'new-game');
    newGameButtonText.classList.add('form-label');
    newGameButtonText.innerHTML = `New Game`;
    newGameButtonBackground.appendChild(newGameButtonText);
    newGameButtonWrapper.appendChild(newGameButtonBackground);
    newGameButtonDiv.appendChild(newGameButtonWrapper);
    
    gameStatusDisplay.appendChild(playAgainButtonDiv);
    gameStatusDisplay.appendChild(gameStatus);
    gameStatusDisplay.appendChild(newGameButtonDiv);

    newGameButtonWrapper.addEventListener('click', function(){location.reload()});
    playAgainButtonWrapper.addEventListener('click', resetGame);
})();

function markTile() {
    let whichTile = this.getAttribute('id');
    let newMark = document.createElement('div');
    if (game.getPlayerTurn() == true) {
        newMark.classList.add('tic-tac-style');
        newMark.innerHTML = players[0].getMark();
    }
    else if (game.getMultiplayer() == true && game.getPlayerTurn() == false) {
        newMark.classList.add('toe-style');
        newMark.innerHTML = players[1].getMark();
    }
    this.appendChild(newMark);
    this.removeEventListener('click', markTile);
    updateTileMark(whichTile, newMark.innerHTML);

    game.checkForWinningCombo(gameBoardModule.getGameBoard());

    if (game.getStopAI() == false && game.getPlayerTurn() == true) {
        tiles = document.querySelectorAll('.tile');
        tiles.forEach(tile => tile.removeEventListener('click', markTile));
        console.log(`ai playing...`);
        game.switchPlayerTurn();
        setTimeout(function () {
            aiPlay.chooseTile();
            tiles.forEach(tile => tile.addEventListener('click', markTile));
        }, 1000);
    }

    game.switchPlayerTurn();
    if (game.getPlayerTurn() == false) {
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
}

const updateTileMark = (tileId, tileMark) => {
    const tileNum = tileId.slice(-1);
    gameBoardModule.setTileMark(tileNum, tileMark);
}

function closeForm() {
    let playerOneName = document.getElementById('player-one-input').value;
    let playerTwoName = document.getElementById('player-two-input').value;
    let ai = document.getElementById('ai-checkbox');
    console.log(ai);
    if (ai.checked) {
        game.switchMultiplayer();
        game.switchStopAI();
        console.log('ai will be on!');
    } else {
        console.log('ai will be off!');
    }
    if(playerOneName == "" || playerTwoName == "") {
        alert(`Please enter the players' names!`);
    } else {
        let select = document.getElementById('form-wrapper');
        select.classList.add('invisible');
        generatePlayers(playerOneName, playerTwoName, game.getMultiplayer());
        updatePlayerNames();
        select = document.querySelector('#game-status');
        select.classList.remove('invisible');
    }
}

function generatePlayers(playerOneName, playerTwoName, multiplayer) {
    if (multiplayer == false) {
        players.push(Player(playerOneName, '✕'));
        players.push(Player('AI', '〇'));
    } else {
        players.push(Player(playerOneName, '✕'));
        players.push(Player(playerTwoName, '〇'));
    }
}

function updatePlayerNames() {
    let playerOne = document.getElementById('player-one');
    playerOne.classList.add('has-turn');
    let playerTwo = document.getElementById('player-two');
    playerOne.innerHTML = players[0].getName();
    playerTwo.innerHTML = players[1].getName();
}

function resetGame() {
    game.resetGameBoard();
}

const aiPlay = (() => {
    const chooseTile = () => {
        let randomNum = getRandomInt();
        console.log(randomNum);
        console.log(`tile-${randomNum} has ${gameBoardModule.gameTiles[randomNum - 1].tileMark}`)
        if (gameBoardModule.gameTiles[randomNum - 1].tileMark == '') {
            let whichTile = document.querySelector(`#tile-${randomNum}`);
            let newMark = document.createElement('div');
            newMark.classList.add('toe-style');
            newMark.innerHTML = players[1].getMark();
            whichTile.appendChild(newMark);
            whichTile.removeEventListener('click', markTile);
            updateTileMark(`#tile-${randomNum}`, newMark.innerHTML);
        } else {
            console.log('not empty, choosing again...');
            chooseTile();
        }
        game.checkForWinningCombo(gameBoardModule.getGameBoard());
    }
    const getRandomInt = () => {
        return Math.floor(Math.random() * (9 - 1 + 1)) + 1;
    }
    return { chooseTile };
})();