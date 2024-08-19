import { Routes, Route, useNavigate } from 'react-router-dom'

import MapSection from './MapSection'
import ProfileSettings from './ProfileSettings'
import Header from './Header'
import Footer from './Footer'
import NewsArticlesList from './NewsArticlesList'
import NewsArticlesSavedList from './NewsArticlesSavedList'

export default function Home({ onLogout }) {
    const navigate = useNavigate()

    const handleHome = () => navigate('/')

    const handleProfileSettings = () => navigate('/settings')

    const handleHealthCareProvidersList = () => navigate('/search')

    const handleNewsArticlesList = () => navigate('/')

    const handleNewsArticlesSavedList = () => navigate('/saved')

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
            </Routes>
        </main>

        <Footer onHomeClicked={handleHome} onHealthCareProvidersListClicked={handleHealthCareProvidersList}></Footer>
    </>
}