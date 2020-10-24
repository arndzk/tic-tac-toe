let playerTurn = true;

// Player Factory
const Player = (name, mark) => {
    const getName = () => name;
    const getMark = () => mark;
    return { name, mark, getName, getMark };
};

const playerOne = Player('Player One', 'x');
const playerTwo = Player('Player Two', 'o');

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
    // for (let i = 0; i < 9; i++) {
    //     let tile = document.createElement('div');
    //     tile.classList.add(`tile`);
    //     tile.setAttribute('id', `tile-${i + 1}`);
    //     tile.addEventListener('click', markTile);
    //     tiles.appendChild(tile);
    // }
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