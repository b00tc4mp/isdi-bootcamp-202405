import { Route, Routes } from 'react-router-dom'
import { MdScreenSearchDesktop as SearchIcon, MdAddComment as ReviewIcon, MdAddBox as AddGameIcon, MdCancelPresentation as CancelIcon } from 'react-icons/md'
import { GoHome as HomeIcon } from 'react-icons/go'


import Button from '../library/Button'
import NavigationButton from '../library/NavigationButton'

import extractPayloadFromToken from '../../util/extractPayloadFromToken.js'
import paths from '../../util/paths.js'

export default function Footer({ makeReviewVisibility, onSearchGame, onAddGame, onHome, onAddReview, onCancel }) {
    const { role } = extractPayloadFromToken(sessionStorage.token)

    return <footer className='fixed w-screen h-[7%] bottom-0 left-0 flex flex-row justify-evenly items-center border-t border-solid border-t-black z-10 bg-slate-700'>
        <Routes>
            <Route path={paths.home} element={<>
                {role === 'dev' && <Button onClick={onAddGame}><AddGameIcon className='w-8 h-8 dark:text-white' /></Button>}
                <Button onClick={onSearchGame}><SearchIcon className='w-8 h-8 dark:text-white' /></Button>
            </>} />
            <Route path={paths.game + ':gameId'} element={<>
                <Button onClick={onHome}><HomeIcon className='w-8 h-8 dark:text-white' /></Button>
                {makeReviewVisibility ? <Button onClick={onCancel}><CancelIcon className='w-8 h-8 dark:text-white' /></Button> :
                    <Button onClick={onAddReview}><ReviewIcon className='w-8 h-8 dark:text-white' /></Button>}
            </>} />
            <Route path={paths.profile + '*'} element={<Button onClick={onHome}><HomeIcon className='w-8 h-8 dark:text-white' /></Button>} />
            <Route path={paths.addGame} element={<Button onClick={onHome}><HomeIcon className='w-8 h-8 dark:text-white' /></Button>} />
            <Route path={paths.search} element={<Button onClick={onHome}><HomeIcon className='w-8 h-8 dark:text-white' /></Button>} />
            <Route path={paths.followers + ':userId'} element={<Button onClick={onHome}><HomeIcon className='w-8 h-8 dark:text-white' /></Button>} />
            <Route path={paths.following + ':userId'} element={<Button onClick={onHome}><HomeIcon className='w-8 h-8 dark:text-white' /></Button>} />
        </Routes>
    </footer>
}