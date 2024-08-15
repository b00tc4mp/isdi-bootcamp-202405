import Container from '../library/Container'
import Heading from '../library/Heading'
import Image from '../library/Image'
import Paragraph from '../library/Paragraph'

export default function NewsArticle({ newsArticle }) {

    return <article className="shadow-[1px_1px_10px_1px] shadow-[#a3a3a3] bg-white p-[12px] rounded-xl mx-5">
        <Container className="flex flex-col justify-center items-center">
            <Heading className="font-extrabold text-2xl mt-2 mb-2">{newsArticle.title}</Heading>
            <Container className="relative">
                <Image className="w-[200px] rounded-xl mt-2 mb-2" src={newsArticle.image} />
                <Paragraph className="mt-4 mb-5">{`${newsArticle.description}...`}</Paragraph>
            </Container>
        </Container>
        <a className="left-0 gap" href={newsArticle.url} target="_blank">Read more</a>
    </article>
}