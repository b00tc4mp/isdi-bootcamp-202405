import Header from './Header'
import Heading from '../library/Heading'

export default function Home({ onLogout }) {

    return <>
        <Header onLogout={onLogout}></Header>

        <main>
            <Heading>Exoticus</Heading>
        </main>
    </>
}