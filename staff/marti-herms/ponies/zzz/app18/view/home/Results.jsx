import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

import logic from '../../logic'

export default function Results({ onResult }) {
    const [searchParams] = useSearchParams()
    const [results, setResults] = useState([])

    const q = searchParams.get('q')

    useEffect(() => {
        if (q)
            try {
                logic.searchPosts(q)
                    .then(results => {
                        setResults(results)

                        onResult(results)
                    })
                    .catch(error => {
                        console.error(error)

                        alert(error.message)
                    })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }, [q])

    return <ul>
        {results.map(result => <li key={result.id}>{result.id}</li>)}
    </ul>
}