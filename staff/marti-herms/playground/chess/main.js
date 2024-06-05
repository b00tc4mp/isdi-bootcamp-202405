class Tile {
    constructor(letter, number) {
        this.id = document.getElementById(letter + number);
        if ((letter.charCodeAt() + number.charCodeAt()) % 2 === 0) {
            this.color = 'white';
        } else {
            this.color = 'black';
        }
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

}