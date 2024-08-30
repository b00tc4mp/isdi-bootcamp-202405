import Container from '../library/Container'
import Button from '../library/Button'
import Paragraph from '../library/Paragraph'
import Heading from '../library/Heading'

export default function CommunityRulesAlert({ onAccept }) {
    return (
        <Container className="fixed w-screen top-0 left-0 h-screen inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <Container className="bg-white p-6 rounded-lg shadow-lg h-[600px] w-[390px] flex flex-col justify-center items-center gap-4">
                <Heading className="text-2xl font-bold mb-4 ">Community Rules</Heading>
                <Paragraph className="mb-2 text-lg">Before entering the community, please adhere to the following rules:</Paragraph>
                <ul className="list-disc list-inside mb-4 text-lg">
                    <li>No offensive language.</li>
                    <li>No threats or harassment.</li>
                    <li>Respect everyone's opinions.</li>
                    <li>Keep discussions civil and constructive.</li>
                    <li>No hate speech or discrimination.</li>
                    <li>Do not share personal information of others without consent.</li>
                </ul>
                <Paragraph className="mb-4">By clicking "Accept", you agree to follow these rules. Violating any of these rules may result in a ban from the community.</Paragraph>
                <Container className="flex justify-end bottom-0">
                    <Button className="bg-blue-500 text-white px-4 py-2 rounded-lg" onClick={onAccept}>Accept</Button>
                </Container>
            </Container>
        </Container>
    );
}
