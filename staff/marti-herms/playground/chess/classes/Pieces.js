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
}