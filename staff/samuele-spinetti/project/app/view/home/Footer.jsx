import Container from '../library/Container'
import Button from '../library/Button'
import Image from '../library/Image'

export default function Header() {


    return <footer className="fixed bottom-0 w-full flex justify-around">

        <Container>
            <Button >
                <Image />
            </Button>
        </Container>

        <Container >
            <Button >
                <Image />
            </Button>
        </Container>

        <Container >
            <Button >
                <Image />
            </Button>
        </Container>

    </footer>
}