import Container from '../library/Container'

export default function Player({ position }) {
    return <Container className='absolute w-[25px] aspect-square bg-white' style={{ top: `${position.top}px`, left: `${position.left}px` }}></Container>
}