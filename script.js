function generateTiles() {
    let tiles = document.getElementById('tiles');
    for (let i = 0; i < 9; i++) {
        let tile = document.createElement('div');
        tile.classList.add(`tile`);
        tile.setAttribute('id', `tile-${i + 1}`);
        tile.addEventListener('click', markTile);
        tiles.appendChild(tile);
    }
}

function markTile() {
    let whichTile = this.getAttribute('id');
    console.log(`${whichTile} clicked!`);

    let ticTac = document.createElement('span');
    ticTac.classList.add('tic-tac-style');
    ticTac.innerHTML = `x`;

    let toe = document.createElement('span');
    toe.classList.add('toe-style');
    toe.innerHTML = `o`;

    this.appendChild(toe);

    this.removeEventListener('click', markTile);
}

generateTiles();