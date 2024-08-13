import Container from '../library/Container'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'

export default function Game({ game }) {
    const handleGameClick = () => {
        window.location.href = game.link
    }

    return <article className='flex flex-row items-center border border-solid border-slate-700 dark:bg-black'>
        <button className='bg-transparent border-0' onClick={handleGameClick}>
            <Container className='flex flex-col'>
                <Container className='flex flex-row items-center'>
                    <Image className='w-2/12 h-2/12' src={game.image} />
                    <Paragraph>{game.name}</Paragraph>
                </Container>
                <Container>
                    <Paragraph>{game.description}</Paragraph>
                </Container>
            </Container>
        </button>
        <Container className='flex flex-col gap-2 mr-2'>
            <button className='bg-gray-500 rounded'>Add</button>
            <button className='bg-green-300 rounded'>Fav</button>
        </Container>
    </article>
}