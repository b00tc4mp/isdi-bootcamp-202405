import Container from '../library/Container'
import Button from '../library/Button'
import Image from '../library/Image'

export default function Footer({ onHomeClicked, onHealthCareProvidersListClicked, onCommunityClicked }) {
    const handleHomeClick = () => onHomeClicked()

    const handleHealthCareProvidersListClick = () => onHealthCareProvidersListClicked()

    const handleCommunityClick = () => onCommunityClicked()

    return <footer className="fixed items-center bottom-0 left-0 w-full flex justify-around shadow-[0_-1px_1px] bg-gradient-to-br from-green-400 to-fuchsia-500 h-20 z-30">

        <Container>
            <Button onClick={handleHomeClick}>
                <Image src="/homeIcon.svg" alt="Home icon" className="h-[30px] w-[30px]" />
            </Button>
        </Container>

        <Container>
            <Button onClick={handleCommunityClick}>
                <Image src="/communityIcon.svg" alt="Community icon" className="h-[70px] w-[70px]" />
            </Button>
        </Container>

        <Container>
            <Button onClick={handleHealthCareProvidersListClick}>
                <Image src="/mapIcon.svg" alt="Map icon" className="h-[30px] w-[30px]" />
            </Button>
        </Container>

    </footer>
}