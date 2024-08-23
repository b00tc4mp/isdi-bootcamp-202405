import { useEffect, useState } from 'react'
import logic from '../../logic'

const useUserId = () => {
    const [userId, setUserId] = useState(null)

    useEffect(() => {
        const id = logic.getUserId()

        if (id) {
            setUserId(id)
        }
    }, [])

    return userId
}

export default useUserId