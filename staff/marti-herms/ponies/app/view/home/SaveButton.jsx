import logic from '../../logic'
import Button from '../library/Button'

import { useState } from 'react'

export default function SaveButton({ post, onSaveClicked }) {
    const [saved, setSaved] = useState(post.fav)

    const handleSave = () => {
        try {
            logic.toggleSavedPost(post.id)
                .then(() => {
                    setSaved(!saved)

                    onSaveClicked()
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <Button className='border-0 p-0 w-6 h-6 box-content bg-transparent' onClick={handleSave}>
        <div className={saved ? 'saved' : 'not-saved'}></div>
    </Button>
}