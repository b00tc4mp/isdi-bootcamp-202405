import { Route, Routes } from 'react-router-dom'

import Button from '../library/Button'
import NavigationButton from '../library/NavigationButton'

import extractPayloadFromToken from '../../util/extractPayloadFromToken.js'

export default function Footer({ makeReviewVisibility, onSearchGame, onAddGame, onHome, onAddReview, onCancel }) {
    const { role } = extractPayloadFromToken(sessionStorage.token)

    return <footer className='fixed w-screen h-[5%] bottom-0 left-0 flex flex-row justify-around items-center border-t border-solid border-t-black z-10 bg-slate-700'>
        <Routes>
            <Route path='/' element={<>
                {role === 'dev' && <NavigationButton onClick={onAddGame}>Add Game</NavigationButton>}
                <NavigationButton onClick={onSearchGame}>Search</NavigationButton>
            </>} />
            <Route path='/profile/:userId/*' element={<NavigationButton onClick={onHome}>HOME</NavigationButton>} />
            <Route path='/games/register' element={<NavigationButton onClick={onHome}>HOME</NavigationButton>} />
            <Route path='/search' element={<NavigationButton onClick={onHome}>HOME</NavigationButton>} />
            <Route path='/games/:gameId' element={<>
                <NavigationButton onClick={onHome}>HOME</NavigationButton>
                {makeReviewVisibility ? <NavigationButton onClick={onCancel}>Cancel</NavigationButton> :
                    <NavigationButton onClick={onAddReview}>Review</NavigationButton>}
            </>} />
        </Routes>
    </footer>
}