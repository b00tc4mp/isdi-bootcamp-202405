/**
 * Abstract Class Pieces.
 *
 * @class Pieces
 */

class Pieces {
    constructor() {
        if (this.constructor == Pieces) {
            throw new Error("Abstract classes can't be instantiated.");
        }
    }

    moveChecker(board) {
        throw new Error("Method 'moveChecker()' must be implemented.");
    }

    disableButtons() {
        let inputs = document.getElementsByTagName('INPUT');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].className === 'tile' && !inputs[i].disabled) {
                inputs[i].disabled = true;
            }

        }
    }

    disablePieces() {
        let inputs = document.getElementsByTagName('INPUT');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].classList[1] === 'piece' && !inputs[i].disabled) {
                inputs[i].disabled = true;
            }

        }
    }

    enablePieces() {
        let inputs = document.getElementsByTagName('INPUT');
        for (let i = 0; i < inputs.length; i++) {
            if (inputs[i].classList[1] === 'piece' && inputs[i].disabled) {
                inputs[i].disabled = false;
            }

        }
    }
}