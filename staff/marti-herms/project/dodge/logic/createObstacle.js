import data from '../data'

export default (id) => {
    if (typeof id !== 'number') throw new Error('invalid id')

    data.obstacles.addObstacle(id)
}