class Tile {
    constructor(letter, number) {
        this.id = document.getElementById(letter + number);
        if ((letter.charCodeAt() + number.charCodeAt()) % 2 === 0) {
            this.color = 'white';
        } else {
            this.color = 'black';
        }
        //this.occupancy;
        //this.possible_move;
    }
}

class Board {
    constructor() {
        this.width = 8;
        this.heigth = 8;
        this.tiles = [];
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.heigth; j++) {
                this.tiles.push(new Tile(String.fromCharCode(i + 65), j));
            }
        }
    }
}

class Piece {
    constructor() {
        //this.id
    }
}

const TILE_STEP = 75;
const PX = 'px';

// pawn1 = document.getElementById('1');
// let x = 0;
// let y = 0;

// pawn1.style.left = x + PX;
// pawn1.style.top = y + PX;

// document.onkeydown = function (event) {
//     // console.log(event.key)

//     if (event.key === 'ArrowRight') {
//         x += TILE_STEP;
//     } else if (event.key === 'ArrowLeft') {
//         x -= TILE_STEP;
//     } else if (event.key === 'ArrowDown') {
//         y += TILE_STEP;
//     } else if (event.key === 'ArrowUp') {
//         y -= TILE_STEP;
//     }

//     pawn1.style.left = x + 'px';
//     pawn1.style.top = y + 'px';
// }