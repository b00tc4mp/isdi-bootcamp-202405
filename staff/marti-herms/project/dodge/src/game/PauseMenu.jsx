import Container from '../library/Container'
import Button from '../library/Button'

export default function PauseMenu({ points, onResumeClick, onHomeClick }) {
    return <>
        <Container className='absolute z-10 w-full h-full bg-black opacity-70' >
        </Container>

        <Container className='absolute z-20 w-[200px] h-[250px] border border-solid border-white bg-black flex flex-col justify-center items-center gap-2'>
            <h2 className='text-white text-xl font-bold underline'>PAUSE</h2>
            <p className='text-white font-bold'>Points: {points}</p>
            <Button className='text-white w-[70px] h-[35px] rounded border border-solid border-white p-1' onClick={onResumeClick} >RESUME</Button>
            <Button className='text-white w-[70px] h-[35px] rounded border border-solid border-white p-1' onClick={onHomeClick} >HOME</Button>
        </Container>
    </>
}