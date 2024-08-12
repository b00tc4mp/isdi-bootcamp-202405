import { useState, useEffect } from 'react'



export default function Library() {
    const [games, setGames] = useState(null)

    return <div>
        {games.map()}
    </div>
}