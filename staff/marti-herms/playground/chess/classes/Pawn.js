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
        this.position = position.name;
        this.id.style.top = this.top + PX;
        this.id.style.left = this.left + PX;
        this.name = name;
        this.color = color;
    }

    moveChecker() {
        for (const key in board) {
            if (board[key].piece == this) {
                let name = '';
                if (this.color === 'black') {
                    name = String.fromCharCode(this.position.charCodeAt(0) + 1) + this.position.charAt(1);
                    if (this.checkAdvance(name)) {
                        this.moveSelector();
                    }
                } else if (this.color === 'white') {
                    name = String.fromCharCode(this.position.charCodeAt(0) - 1) + this.position.charAt(1);
                    if (this.checkAdvance(name)) {
                        this.moveSelector();
                    }
                }
            }
        }
    }

    moveSelector() {
        document.addEventListener('click', handler, true);

        function handler(e) {
            if (e.target.localName !== 'input') {
                e.stopPropagation();
            }
        }

        document.addEventListener('click', updatePiece, { once: true });
        let piece = this;
        function updatePiece(e) {
            if (e.target.localName === 'input') {
                piece.advance();
                document.removeEventListener('click', handler, true);
                document.getElementById(piece.position).disabled = true;
                if (e.target.className === "black_tile") {
                    document.getElementById(piece.position).style.backgroundColor = "rgb(50, 50, 50)";
                } else if (e.target.className === "white_tile") {
                    document.getElementById(piece.position).style.backgroundColor = "white";
                }
                return false;
            }
            return true;
        }
    }

    checkAdvance(name) {
        if (board[name].occupancy === true) {
            return false;
        }
        document.getElementById(name).disabled = false;
        document.getElementById(name).style.backgroundColor = "lightblue";
        return true;
    }

    checkKill() {

    }

    checkDash() {

    }
}

Pawn.prototype.advance = function () {
    if (this.color === 'black') {
        this.position = String.fromCharCode(this.position.charCodeAt(0) + 1) + this.position.charAt(1);
    } else if (this.color === 'white') {
        this.position = String.fromCharCode(this.position.charCodeAt(0) - 1) + this.position.charAt(1);
    }


    this.top = board[this.position].top;
    this.left = board[this.position].left;

    this.id.style.top = this.top + PX;
    this.id.style.left = this.left + PX;
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