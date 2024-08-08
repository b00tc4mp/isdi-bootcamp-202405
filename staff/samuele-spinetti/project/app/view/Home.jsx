import { Routes, Route, useNavigate } from 'react-router-dom'

import Header from './home/Header'
import Footer from './home/Footer'

export default function Home({ onLogout }) {
    const handleHomeClick = () => {
        navigate('/')
    }

    return <>
        <Header onLogout={onLogout}>
            <Button><Image></Image></Button>
            <Button>Logout</Button>
        </Header >

        <Footer>
            <Button><Image></Image></Button>
            <Button><Image></Image></Button>
            <Button><Image></Image></Button>
        </Footer>
    </>
}
