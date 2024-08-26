import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../util/constants'

class Player {
    constructor() {
        this.width = 25
        this.height = 25
        this.top = (SCREEN_HEIGHT - 25) / 2
        this.left = (SCREEN_WIDTH - 25) / 2
        this.points = 0
    }
}

const player = {
    item: new Player(),
    clear: function () { this.item = new Player() }
}

export default player