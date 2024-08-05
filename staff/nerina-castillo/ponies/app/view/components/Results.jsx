import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import logic from "../../logic";

export default () => {
    const [searchParams] = useSearchParams()
    const [results, setResults] = useState([])

    const q = searchParams.get('q')

    useEffect(() => {
        try {
            logic.searchColors(q)
                .then(results => setResults(results))
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
        {results.map(result => <li key={result}>{result}</li>)}
    </ul>
}