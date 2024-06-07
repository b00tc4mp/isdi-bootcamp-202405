/**
 * Knight.
 *
 * @class Knight
 * @extends {Pieces}
 */

class Knight extends Pieces {
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

    moveChecker(board) {

    }
}