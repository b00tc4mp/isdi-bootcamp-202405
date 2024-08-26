import data from '../data'

import { OBS_SIZE, PLAYER_SIZE } from '../util/constants'

export default () => {
    const boolean = data.obstacles.items.some(obstacle => {
        const obsTop = obstacle.top
        const obsLeft = obstacle.left
        const obsRight = obstacle.left + obstacle.width
        const obsBottom = obstacle.top + obstacle.height

        const playerTop = data.player.item.top
        const playerLeft = data.player.item.left
        const playerRight = data.player.item.left + PLAYER_SIZE
        const playerBottom = data.player.item.top + PLAYER_SIZE

        if (obsTop > playerTop && obsTop < playerBottom && obsLeft > playerLeft && obsLeft < playerRight ||
            obsBottom > playerTop && obsBottom < playerBottom && obsLeft > playerLeft && obsLeft < playerRight ||
            obsTop > playerTop && obsTop < playerBottom && obsRight > playerLeft && obsRight < playerRight ||
            obsBottom > playerTop && obsBottom < playerBottom && obsRight > playerLeft && obsRight < playerRight) {
            return true
        }
        return false
    })

    return boolean
}