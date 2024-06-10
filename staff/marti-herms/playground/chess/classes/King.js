/**
 * King.
 *
 * @class King
 * @extends {Pieces}
 */

class King extends Pieces {
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

    moveChecker(board) {

    }
}