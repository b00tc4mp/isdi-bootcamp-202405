import { useEffect, useState } from 'react'


export default function useQueryString() {
    const [queryString, setQueryString] = useState(location.search)

    useEffect(() => {
        const intervalId = setInterval(() => {
            const currentQueryString = window.location.search

            if (queryString !== currentQueryString) {
                console.log('Query string changed:', currentQueryString)
                setQueryString(currentQueryString)
            }
        }, 100)

        return () => clearInterval(intervalId)
    }, [])

    return queryString
}