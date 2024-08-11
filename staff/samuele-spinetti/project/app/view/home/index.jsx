// import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './Header'
import Footer from './Footer'

export default function Home({ onLogout }) {
    // const handleHomeClick = () => {
    //     navigate('/')
    // }

    return <>
        <Header onLogout={onLogout}></Header >
        <Footer></Footer>
    </>
}