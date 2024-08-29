import data from '../data'

export default (seconds) => {
    if (typeof seconds !== 'number') throw new Error('invalid id')

    if (seconds === 0)
        data.player.item.points = 0
    else if (seconds < 20)
        data.player.item.points += 1
    else if (seconds < 30)
        data.player.item.points += 5
    else if (seconds < 60)
        data.player.item.points += 10
    else if (seconds < 120)
        data.player.item.points += 20
    else if (seconds < 240)
        data.player.item.points += 40
    else if (seconds >= 240)
        data.player.item.points += 100
}