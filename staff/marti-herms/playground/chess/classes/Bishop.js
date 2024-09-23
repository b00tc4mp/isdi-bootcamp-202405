/**
 * Bishop.
 *
 * @class Bishop
 * @extends {Pieces}
 */

class Bishop extends Pieces {
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
        this.active = false;
    }

    moveChecker() {
        let bool1 = this.checkJump();
        let bool2 = this.checkKill();
        if (bool1 || bool2) {
            this.moveSelector();
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
    }

    checkJump() {
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
                document.getElementById(pos1).style.backgroundColor = "lightblue";
                bool1 = true;
            }
        }
        if (pos2 !== OUTOFBOUNDS) {
            if (board[pos2].occupancy) {
                board.getPieceByPosition(pos2).id.disabled = false;
                document.getElementById(pos2).style.backgroundColor = "lightblue";
                bool2 = true;
            }
        }
        return bool1 || bool2;
    }

    move(id) {
        this.position = board.getTileWithId(id);


        this.top = board[this.position].top;
        this.left = board[this.position].left;

        this.id.style.top = this.top + PX;
        this.id.style.left = this.left + PX;
    }

    kill(id) {
        this.position = getPositionById(id);

        let index = pieces.indexOf(board[this.position].piece);
        removedPieces.push(pieces.splice(index, 1));
        board[this.position].piece = undefined;
        board[this.position].occupancy = false;

        document.getElementsByClassName('grid')[0].removeChild(id);

        //removedPieces[removedPieces.length - 1]. = TILE * (removedPieces.length - 1) + PX;
        //removedPieces[removedPieces.length - 1].id.style.left = (-5) * TILE + PX;

        this.top = board[this.position].top;
        this.left = board[this.position].left;

        this.id.style.top = this.top + PX;
        this.id.style.left = this.left + PX;
    }
}