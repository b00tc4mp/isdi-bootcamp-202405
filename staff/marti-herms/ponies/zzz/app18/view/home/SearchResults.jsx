import Search from './Search'
import Results from './Results'

export default function SearchResults({ onResult }) {
    const handleResults = (results) => {
        onResult(results)
    }

    return <>
        <Search />
        <Results onResult={handleResults} />
    </>
}