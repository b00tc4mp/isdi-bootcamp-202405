import Container from '../library/Container'
import logic from '../../logic'
import Button from '../library/Button'


export default function Profile() {

    return <section className='flex flex-col gap-4'>
        <Button>Modify Email</Button>
        <Button>Modify Password</Button>
        <Button>Modify Phone</Button>
        <Button>Modify Address</Button>
    </section>
}