import randomNumberGenerator from '../util/randomNumberGenerator.js'
import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../util/constants'

import player from './player.js'

class Obstacle {
    constructor(id) {
        this.id = id
        const type = randomNumberGenerator(1, 3)
        const side = randomNumberGenerator(1, 4)

        switch (type) {
            case 1:
                this.width = 15
                this.height = 15
                this.color = 'blue'
                break
            case 2:
                this.width = 25
                this.height = 25
                this.color = 'red'
                break
            case 3:
                this.width = 35
                this.height = 35
                this.color = 'purple'
                break
            default:
                break
        }

        switch (side) {
            case 1:
                this.top = randomNumberGenerator(50, SCREEN_HEIGHT - this.height - 50)
                this.left = 50
                break
            case 2:
                this.top = 50
                this.left = randomNumberGenerator(50, SCREEN_WIDTH - this.width - 50)
                break
            case 3:
                this.top = SCREEN_HEIGHT - this.height - 50
                this.left = randomNumberGenerator(50, SCREEN_WIDTH - this.width - 50)
                break
            case 4:
                this.top = randomNumberGenerator(50, SCREEN_HEIGHT - this.height - 50)
                this.left = SCREEN_WIDTH - this.width - 50
                break
            default:
                break
        }

        const dirY = player.item.top - this.top
        const dirX = player.item.left - this.left

        const magnitude = Math.sqrt(dirY ** 2 + dirX ** 2)

        this.yMovement = dirY / magnitude
        this.xMovement = dirX / magnitude
    }
}

const obstacles = {
    items: [],
    addObstacle: function (id) { this.items.push(new Obstacle(id)) },
    removeObstacle: function (id) { this.items = this.items.filter(obstacle => obstacle.id !== id) },
    clear: function () { this.items = [] }
}

export default obstacles