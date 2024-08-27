import logic from '../../logic'

import useContext from '../context.js'

import Container from '../library/Container'
import Heading from '../library/Heading'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'
import Button from '../library/Button'

export default function NewsArticle({ newsArticle, onNewsArticleSaveToggled }) {
    const { alert } = useContext()

    const handleSaveNewsClick = () => {
        try {
            logic.toggleSaveNews(newsArticle.id)
                .then(() => onNewsArticleSaveToggled())
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    return <article className="shadow-[1px_1px_10px_1px] shadow-[#a3a3a3] bg-white p-[12px] rounded-xl mx-5">
        <Container className="flex flex-col justify-center items-center">
            <Heading className="font-extrabold text-2xl mt-2 mb-2">{newsArticle.title}</Heading>
            <Container className="relative">
                <Paragraph className="text-sm text-gray-500">Published {`${newsArticle.publishedAt.slice(0, 10)}`}</Paragraph>
                <Image className="w-[200px] rounded-xl mt-2 mb-2" src={newsArticle.image} />
                <Paragraph className="mt-4 mb-5">{`${newsArticle.description}...`}</Paragraph>
            </Container>
        </Container>
        <Container className="flex flex-row justify-between items-center">
            <Button onClick={handleSaveNewsClick}>
                <Image src={newsArticle.fav ? "./heart-red.svg" : "./heart-black.svg"} />
            </Button>
            <a className="left-0 gap" href={newsArticle.url} target="_blank">Read more</a>
        </Container>
    </article >
}