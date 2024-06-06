/**
 * Bishop.
 *
 * @class Bishop
 * @extends {Pieces}
 */

class Bishop extends Pieces {
    constructor(id, position, color) {
        super();
        this.id = document.getElementById(id);
        this.top = position.top;
        this.left = position.left
        this.id.style.top = this.top + PX;
        this.id.style.left = this.left + PX;
        this.color = color;
    }
}