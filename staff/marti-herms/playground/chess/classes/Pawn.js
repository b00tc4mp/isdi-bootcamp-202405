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
        this.initialPosition = position.name;
        this.id.style.top = this.top + PX;
        this.id.style.left = this.left + PX;
        this.name = name;
        this.color = color;
        this.active = false;
    }

    moveChecker() {
        for (const key in board) {
            if (board[key].piece == this) {
                let bool1 = this.checkAdvance();
                let bool2 = this.checkDash();
                let bool3 = this.checkKill();
                if (bool1 || bool2 || bool3) {
                    this.moveSelector();
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
            if (e.target.localName === 'input' && e.target.className === 'tile') {

                piece.move(e.target);
                piece.active = false;

                board.updateBoard();
                console.log(piece.position)

                document.removeEventListener('click', handler, true);
                piece.disableButtons();
                piece.enablePieces();

                board.defaultColor();
            } else if (e.target.localName === 'input' && e.target.classList[1] === 'piece') {

                piece.kill(e.target);
                piece.active = false;

                board.updateBoard();
                console.log(piece.position)

                document.removeEventListener('click', handler, true);
                piece.disableButtons();
                piece.enablePieces();

                board.defaultColor();
            }
        }

        document.addEventListener('click', killPiece, { once: true });

        function killPiece(e) {

        }
    }

    checkAdvance() {
        let pos = '';
        if (this.color === 'black') {
            pos = board.getTile(this.top + TILE, this.left);
        } else if (this.color === 'white') {
            pos = board.getTile(this.top - TILE, this.left);
        }
        if (board[pos].occupancy || pos === OUTOFBOUNDS) {
            return false;
        }
        document.getElementById(pos).disabled = false;
        document.getElementById(pos).style.backgroundColor = "lightblue";
        return true;
    }

    checkKill() {
        let pos1 = '';
        let pos2 = '';
        let bool1;
        let bool2;
        if (this.color === 'black') {
            pos1 = board.getTile(this.top + TILE, this.left - TILE);
            pos2 = board.getTile(this.top + TILE, this.left + TILE);
        } else if (this.color === 'white') {
            pos1 = board.getTile(this.top - TILE, this.left - TILE);
            pos2 = board.getTile(this.top - TILE, this.left + TILE);
        }

        if (pos1 !== OUTOFBOUNDS) {
            if (board[pos1].occupancy) {
                board.getPieceByPosition(pos1).id.disabled = false;
                board.getPieceByPosition(pos1).id.style.backgroundColor = "lightblue";
                bool1 = true;
            }
        }
        if (pos2 !== OUTOFBOUNDS) {
            if (board[pos2].occupancy) {
                board.getPieceByPosition(pos2).id.disabled = false;
                board.getPieceByPosition(pos2).id.style.backgroundColor = "lightblue";
                bool2 = true;
            }
        }
        return bool1 || bool2;
    }

    checkDash() {
        if (this.initialPosition === this.position) {
            let pos1 = '';
            let pos2 = '';
            if (this.color === 'black') {
                pos1 = board.getTile(this.top + TILE, this.left);
                pos2 = board.getTile(this.top + 2 * TILE, this.left);
            } else if (this.color === 'white') {
                pos1 = board.getTile(this.top - TILE, this.left);
                pos2 = board.getTile(this.top - 2 * TILE, this.left);
            }
            if (board[pos1].occupancy) {
                return false;
            } else if (board[pos2].occupancy) {
                document.getElementById(pos1).disabled = false;
                document.getElementById(pos1).style.backgroundColor = "lightblue";
                return true;
            }
            document.getElementById(pos1).disabled = false;
            document.getElementById(pos1).style.backgroundColor = "lightblue";
            document.getElementById(pos2).disabled = false;
            document.getElementById(pos2).style.backgroundColor = "lightblue";
            return true;
        }
        return false;
    }
}

Pawn.prototype.move = function (id) {
    this.position = board.getTileWithId(id);


    this.top = board[this.position].top;
    this.left = board[this.position].left;

    this.id.style.top = this.top + PX;
    this.id.style.left = this.left + PX;
}

Pawn.prototype.kill = function (id) {
    this.position = board.getTileWithId(id);

    let index = pieces.indexOf(board[this.position].piece);
    removedPieces.push(pieces.splice(index, 1));
    board[this.position].piece.remove();

    removedPieces[removedPieces.length - 1].style.top = TILE * (removedPieces.length - 1) + PX;
    removedPieces[removedPieces.length - 1].style.left = (-5) * TILE + PX;

    this.top = board[this.position].top;
    this.left = board[this.position].left;

    this.id.style.top = this.top + PX;
    this.id.style.left = this.left + PX;
}


Pawn.prototype.evolution = function () {

}