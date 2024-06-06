/**
 * Pawn.
 *
 * @class Pawn
 * @extends {Pieces}
 */

class Pawn extends Pieces {
    constructor(id, position, name, color) {
        super();
        this.id = document.getElementById(id);
        this.top = position.top;
        this.left = position.left
        this.id.style.top = this.top + PX;
        this.id.style.left = this.left + PX;
        this.name = name;
        this.color = color;
    }

    moveChecker() {
        for (let i = 0; i < board.length; i++) {
            for (let j = 0; j < board[i].length; j++) {
                if (this.top === board[i][j].top && this.left === board[i][j].left) {
                    // document.getElementById(board[i + 1][j].name).disabled = false;
                    // document.getElementById(board[i + 1][j].name).style.backgroundColor = "lightblue";
                    // document.getElementById(board[i + 1][j].name).disabled = true;
                    // document.getElementById(board[i + 1][j].name).style.backgroundColor = "rgb(50, 50, 50)";
                    if (this.checkAdvance()) {
                        document.getElementById(board[i + 1][j].name).disabled = false;
                        document.getElementById(board[i + 1][j].name).style.backgroundColor = "lightblue";
                    }
                }
            }
        }
        //document.getElementById('').disabled = true;
    }

    checkAdvance() {
        for (let i = 0; i < pieces.length; i++) {
            //console.assert(pieces[20].top !== );
            if ((pieces[i].top === this.top + TILE) && (pieces[i].left === this.left) && (this.name !== pieces[i].name)) {
                return false;
            } else {
                return true;
            }
        }
    }

    checkKill() {

    }

    checkDash() {

    }
}

Pawn.prototype.advance = function () {
    if (this.color === 'black') {
        this.top += TILE;
    } else if (this.color === 'white') {
        this.top -= TILE;
    }
    this.id.style.top = this.top + PX;
}

Pawn.prototype.dash = function () {
    if (this.color === 'black') {
        this.top += 2 * TILE;
    } else if (this.color === 'white') {
        this.top -= 2 * TILE;
    }
    this.id.style.top = this.top + PX;
}

Pawn.prototype.kill_r = function () {
    if (this.color === 'black') {
        this.top += TILE;
        this.left += TILE;
    } else if (this.color === 'white') {
        this.top -= TILE;
        this.left += TILE;
    }
    this.id.style.top = this.top + PX;
    this.id.style.left = this.left + PX;
}

Pawn.prototype.kill_l = function () {
    if (this.color === 'black') {
        this.top += TILE;
        this.left -= TILE;
    } else if (this.color === 'white') {
        this.top -= TILE;
        this.left -= TILE;
    }
    this.id.style.top = this.top + PX;
    this.id.style.left = this.left + PX;
}

Pawn.prototype.evolution = function () {

}



//pawn1 = Pawn('9', 'B1', 'black')

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