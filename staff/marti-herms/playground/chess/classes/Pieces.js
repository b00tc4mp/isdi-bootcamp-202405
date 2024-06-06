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

    moveChecker(piece) {
        return true;
    }
}