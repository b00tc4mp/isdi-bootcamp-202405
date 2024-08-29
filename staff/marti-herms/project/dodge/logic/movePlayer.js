import data from '../data'

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../util/constants'

export default (e) => {
    const moveUp = () => {
        data.player.item.top = Math.max(0, data.player.item.top - 10)
    }

    const moveLeft = () => {
        data.player.item.left = Math.max(0, data.player.item.left - 10)
    }

    const moveRight = () => {
        data.player.item.left = Math.min(SCREEN_WIDTH - 25, data.player.item.left + 10)
    }

    const moveDown = () => {
        data.player.item.top = Math.min(SCREEN_HEIGHT - 25, data.player.item.top + 10)
    }

    if (typeof e === 'object')
        switch (e.key) {
            case 'ArrowUp':
            case 'w':
                moveUp()
                break
            case 'ArrowLeft':
            case 'a':
                moveLeft()
                break
            case 'ArrowRight':
            case 'd':
                moveRight()
                break
            case 'ArrowDown':
            case 's':
                moveDown()
                break
            default:
                break
        }
    else {
        switch (e) {
            case 'up':
                moveUp()
                break
            case 'left':
                moveLeft()
                break
            case 'right':
                moveRight()
                break
            case 'down':
                moveDown()
                break
            default:
                break
        }
    }
}