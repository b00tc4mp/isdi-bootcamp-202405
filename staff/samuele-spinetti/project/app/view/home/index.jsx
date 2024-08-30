import { Routes, Route, useNavigate } from 'react-router-dom'
import { useState } from 'react'

import logic from '../../logic'

import MapSection from './MapSection'
import ProfileSettings from './ProfileSettings'
import Header from './Header'
import Footer from './Footer'
import NewsArticlesList from './NewsArticlesList'
import NewsArticlesSavedList from './NewsArticlesSavedList'
import Community from './Community'
import Chats from './Chats'
import Chat from './Chat'
import SupportPage from './SupportPage'

export default function Home({ onLogout }) {
    const [refreshStamp, setRefreshStamp] = useState()
    const navigate = useNavigate()

    const handleHome = () => navigate('/')

    const handleProfileSettings = () => navigate('/settings')

    const handleHealthCareProvidersList = () => navigate('/search')

    const handleSavedList = () => navigate('/saved')

    const handleCommunity = () => navigate('/community')

    const handleInbox = () => navigate('/chats')

    const handleHelp = () => navigate('/support')

    const handleAvatarUpdated = () => {
        const userId = logic.getUserId()

        setRefreshStamp(userId)
    }

    return <>
        <Header
            onProfileSettingsClicked={handleProfileSettings}
            onInboxClicked={handleInbox}
            onSavedListClicked={handleSavedList}
            onHelpClicked={handleHelp}
            onLogout={onLogout}
            refreshStamp={refreshStamp}></Header>

        <main className="mt-20 mb-20">
            <Routes>
                <Route path="/" element={<NewsArticlesList />} />
                <Route path="/saved" element={<NewsArticlesSavedList />} />
                <Route path="/settings" element={<ProfileSettings onAvatarUpdated={handleAvatarUpdated} />} />
                <Route path="/search" element={<MapSection />} />
                <Route path="/community" element={<Community />} />
                <Route path="/chats" element={<Chats />} />
                <Route path="/chats/:chatId" element={<Chat />} />
                <Route path="/support" element={<SupportPage />} />
            </Routes>
        </main>

        <Footer onHomeClicked={handleHome} onCommunityClicked={handleCommunity} onHealthCareProvidersListClicked={handleHealthCareProvidersList}></Footer>
    </>
}