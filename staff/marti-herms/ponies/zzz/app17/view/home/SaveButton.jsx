import logic from '../../logic'
import Button from '../components/Button'

import { useState } from 'react'

import './SaveButton.css'

const SaveButton = ({ post, onSaveClicked }) => {
    const [saved, setSaved] = useState(post.fav)

    const handleSave = () => {
        try {
            logic.toggleSavedPost(post.id, (error) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }
                setSaved(!saved)

                onSaveClicked()
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <Button className="Save--button" onClick={handleSave}>
        <div className={saved ? "Save--active" : "Save--inactive"}></div>
    </Button>
}

export default SaveButton