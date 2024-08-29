import data from '../data'

import { OBS_PACE } from '../util/constants'

export default () => {
    data.obstacles.items = data.obstacles.items.map(obstacle => {
        obstacle.top += obstacle.yMovement * OBS_PACE
        obstacle.left += obstacle.xMovement * OBS_PACE

        return obstacle
    })
}