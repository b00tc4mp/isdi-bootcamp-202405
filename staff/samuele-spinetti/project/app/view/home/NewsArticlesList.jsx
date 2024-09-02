import { useEffect, useState } from 'react'
import useContext from '../context.js'

import logic from '../../logic'

import NewsArticle from './NewsArticle'
import Heading from '../library/Heading'
import Container from '../library/Container'
import Paragraph from '../library/Paragraph'

export default function NewsArticlesList() {
    const [articles, setArticles] = useState([])
    const [loading, setLoading] = useState(true)
    const { alert } = useContext()

    useEffect(() => {
        setLoading(true)

        loadNewsArticles()
    }, [])

    const handleNewsArticleSaveToggled = () => loadNewsArticles()

    const loadNewsArticles = () => {
        setLoading(true)

        try {
            logic.getAllNews()
                .then(newsArticles => {
                    setArticles(newsArticles)

                    setLoading(false)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error)
        }
    }

    return <>
        <Heading className="flex flex-col justify-center items-center text-[#C900CD] [gradient-to-br from-green-400 to-fuchsia-500] text-[30px] font-bold h-20">Healthy living, Pride being!</Heading>

        {loading &&
            <Container className="flex justify-center items-center">
                <Paragraph className="text-2xl font-bold">Loading news...</Paragraph>
            </Container>
        }

        <section className="flex flex-col gap-6 mb-24">
            {articles.map(newsArticle => <NewsArticle
                key={newsArticle.id}
                newsArticle={newsArticle}
                onNewsArticleSaveToggled={handleNewsArticleSaveToggled}
            />)}
        </section>
    </>
}