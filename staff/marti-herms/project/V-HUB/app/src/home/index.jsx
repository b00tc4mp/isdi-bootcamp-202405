import { useState, useEffect } from 'react'

import useContext from '../context'

import logic from '../../logic'

import Header from './Header'
import Library from './Library'
import Footer from './Footer'

export default function Home({ onLogout }) {

    useEffect(() => {

    })

    return <main>
        <Header onLogoutClick={onLogout} ></Header>



        <Footer></Footer>
    </main>
}