import { Routes, Route, useNavigate } from 'react-router-dom'

import MapSection from './MapSection'
import ProfileSettings from './ProfileSettings'
import Header from './Header'
import Footer from './Footer'
import Heading from '../library/Heading'

export default function Home({ onLogout }) {
    const navigate = useNavigate()

    const handleHome = () => navigate('/')

    const handleProfileSettings = () => navigate('/settings')

    const handleHealthCareProvidersList = () => navigate('/map')

    return <>
        <Header onProfileSettingsClicked={handleProfileSettings} onLogout={onLogout}></Header>

        <main className="mt-[6rem] mb-[3rem]">
            <Heading className="flex flex-col justify-center items-center text-[#C900CD] [gradient-to-br from-green-400 to-fuchsia-500] text-[20px] font-bold">Healthy living, Pride being!</Heading>
            <Routes>
                <Route path="/settings" element={<ProfileSettings />} />
                <Route path="/map" element={<MapSection />} />
            </Routes>
        </main>

        <Footer onHomeClicked={handleHome} onHealthCareProvidersListClicked={handleHealthCareProvidersList}></Footer>
    </>
}