import data from '../data'

import { SCREEN_WIDTH, SCREEN_HEIGHT } from '../util/constants'

export default (id) => {
    if (typeof id !== 'number') throw new Error('invalid id')

    const obstacle = data.obstacles.items.find(obstacle => obstacle.id === id)

    return (obstacle.top >= SCREEN_HEIGHT - obstacle.height - 10 || obstacle.top < 0 || obstacle.left >= SCREEN_WIDTH - obstacle.width - 10 || obstacle.left < 0)
}