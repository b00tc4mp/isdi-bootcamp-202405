function eventTime(time) {
    // console.debug('formatTime -> call')

    if (typeof time === 'string') {
        const [hours, minutes] = time.split(':')
        return `${hours}:${minutes}`
    }

    let hours = date.getHours()
    let minutes = date.getMinutes()

    hours = hours < 10 ? '0' + hours : hours
    minutes = minutes < 10 ? '0' + minutes : minutes

    return `${hours}:${minutes}`
}

export default eventTime