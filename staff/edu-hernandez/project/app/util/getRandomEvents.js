export default function getRandomEvents(events) {
    // console.debug('getRandomEvents -> call')

    if (events.length === 0) return []

    const resultEvents = []

    for (let i = 0; i <= events.length; i++) {
        let randomIndex = Math.floor(Math.random() * events.length)
        resultEvents.push(events[randomIndex])
        events.splice(randomIndex, 1)
    }

    return resultEvents
}