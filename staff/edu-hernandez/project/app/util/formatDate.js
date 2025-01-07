export default function formatDate(date = new Date()) {
    if (!(date instanceof Date) || isNaN(date)) {
        throw new Error('invalid date provided')
    }

    const months = [
        'January', 'February',
        'March', 'April',
        'May', 'June',
        'July', 'August',
        'September', 'October',
        'November', 'December'
    ]

    const year = date.getFullYear()
    const month = months[date.getMonth()]
    const day = String(date.getDate()).padStart(2, '0')
    return `${month}.${day}.${year}`
}