import { Routes, Route, useNavigate } from 'react-router-dom'

import MapSection from './MapSection'
import ProfileSettings from './ProfileSettings'
import Header from './Header'
import Footer from './Footer'
import NewsArticlesList from './NewsArticlesList'
import NewsArticlesSavedList from './NewsArticlesSavedList'
import Community from './Community'

export default function Home({ onLogout }) {
    const navigate = useNavigate()

    const handleHome = () => navigate('/')

    const handleProfileSettings = () => navigate('/settings')

    const handleHealthCareProvidersList = () => navigate('/search')

    const handleNewsArticlesList = () => navigate('/')

    const handleNewsArticlesSavedList = () => navigate('/saved')

    const handleCommunity = () => navigate('/community')

    return <>
        <Header
            onProfileSettingsClicked={handleProfileSettings}
            onNewsArticlesListClicked={handleNewsArticlesList}
            onNewsArticlesSavedListClicked={handleNewsArticlesSavedList}
            onLogout={onLogout}></Header>

        <main className="mt-20 mb-20">
            <Routes>
                <Route path="/" element={<NewsArticlesList />} />
                <Route path="/saved" element={<NewsArticlesSavedList />} />
                <Route path="/settings" element={<ProfileSettings />} />
                <Route path="/search" element={<MapSection />} />
                <Route path="/community" element={<Community />} />
            </Routes>
        </main>

        <Footer onHomeClicked={handleHome} onCommunityClicked={handleCommunity} onHealthCareProvidersListClicked={handleHealthCareProvidersList}></Footer>
    </>
}