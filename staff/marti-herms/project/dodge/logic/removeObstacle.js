import data from '../data'

export default (id) => {
    //TODO validate id
    data.obstacles.removeObstacle(id)
}