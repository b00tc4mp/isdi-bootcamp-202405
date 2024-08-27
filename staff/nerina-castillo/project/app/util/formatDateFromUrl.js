export default function formatDateFromUrl() {
    const params = new URLSearchParams(window.location.search)
    const dateParam = params.get('date')
    const date = new Date(dateParam)

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}-${month}-${day}`
}