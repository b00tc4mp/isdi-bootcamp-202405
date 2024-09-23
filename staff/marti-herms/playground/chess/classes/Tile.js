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