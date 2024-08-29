import { Route, Routes, useLocation } from 'react-router-dom'
import { MdScreenSearchDesktop as SearchIcon, MdAddComment as ReviewIcon, MdAddBox as AddGameIcon, MdCancelPresentation as CancelIcon } from 'react-icons/md'
import { GoHome as HomeIcon } from 'react-icons/go'
import { BsChatRightText as ChatIcon } from 'react-icons/bs'

import Button from '../library/Button'

import extractPayloadFromToken from '../../util/extractPayloadFromToken.js'
import paths from '../../util/paths.js'

export default function Footer({ makeReviewVisibility, onSearchGame, onAddGame, onHome, onAddReview, onCancel, onChat }) {
    const { role } = extractPayloadFromToken(sessionStorage.token)
    const location = useLocation()

    let userId = location.pathname.slice(location.pathname.indexOf('/', 1) + 1)
    if (userId.includes('/')) {
        userId = userId.slice(0, userId.indexOf('/'))
    }

    const handleChatClick = () => {
        onChat(userId)
    }

    return <footer className='fixed w-screen h-[60px] bottom-0 left-0 bg-gray-600 dark:bg-slate-700 flex flex-row justify-evenly items-center dark:border-t dark:border-solid dark:border-t-black z-10 shadow-[0px_1px_1px_gray]'>
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
            <Route path={paths.profile + ':userId'} element={<>
                <Button onClick={onHome}><HomeIcon className='w-8 h-8 dark:text-white' /></Button>
                <Button onClick={handleChatClick}><ChatIcon className='w-7 h-7 dark:text-white' /></Button>
            </>
            } />
            <Route path={paths.addGame} element={<Button onClick={onHome}><HomeIcon className='w-8 h-8 dark:text-white' /></Button>} />
            <Route path={paths.search} element={<Button onClick={onHome}><HomeIcon className='w-8 h-8 dark:text-white' /></Button>} />
            <Route path={paths.followers + ':userId'} element={<Button onClick={onHome}><HomeIcon className='w-8 h-8 dark:text-white' /></Button>} />
            <Route path={paths.following + ':userId'} element={<Button onClick={onHome}><HomeIcon className='w-8 h-8 dark:text-white' /></Button>} />
            <Route path='/*' element={<Button onClick={onHome}><HomeIcon className='w-8 h-8 dark:text-white' /></Button>} />
        </Routes>
    </footer>
}