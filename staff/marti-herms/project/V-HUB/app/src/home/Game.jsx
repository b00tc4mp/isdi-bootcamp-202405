import { useParams } from "react-router-dom"

export default function Game() {
    const { gameId } = useParams()

    return <p>{gameId}</p>
}