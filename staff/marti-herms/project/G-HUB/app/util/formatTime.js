function formatTime(date) {
    const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60))

    if (hours < 24) {
        return date.toLocaleTimeString()
    }

    return date.toLocaleString()
}

export default formatTime