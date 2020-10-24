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
    const getGameBoard = () => console.log(gameTiles);
    return { getGameBoard, setTileMark };
})();


// Generate the gameboard tiles in the DOM
const dynamicDomTilesModule = (() => {
    let tiles = document.getElementById('tiles');
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement('div');
        tile.classList.add(`tile`);
        tile.setAttribute('id', `tile-${i + 1}`);
        tile.addEventListener('click', markTile);
        tiles.appendChild(tile);
    }
})();

function markTile() {
    let whichTile = this.getAttribute('id');

    let ticTac = document.createElement('div');
    ticTac.classList.add('tic-tac-style');
    ticTac.innerHTML = `x`;

    let toe = document.createElement('div');
    toe.classList.add('toe-style');
    toe.innerHTML = `o`;

    this.appendChild(ticTac);

    this.removeEventListener('click', markTile);

    updateTileMark(whichTile, ticTac.innerHTML);
}

const updateTileMark = (tileId, tileMark) => {
    const tileNum = tileId.slice(-1);
    gameBoardModule.setTileMark(tileNum, tileMark);
}