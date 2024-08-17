import { useEffect, useState } from 'react'

import logic from '../../logic'

import NewsArticle from './NewsArticle'
import Heading from '../library/Heading'

export default function NewsArticlesList() {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        setLoading(true)

        try {
            logic.fetchNews('Health LGBTQI+')
                .then((newsArticles) => {
                    if (newsArticles.length > 0) {
                        setArticles(newsArticles)
                    } else {
                        logic.getAllNews()
                        setArticles(newsArticles)
                    }
                    setLoading(false)
                })
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                    setLoading(false)
                })
        } catch (error) {
            console.error(error)

            alert(error)
        }
    }, [])

    if (loading) return <p>Loading news...</p>;

    return <>
        <Heading className="flex flex-col justify-center items-center text-[#C900CD] [gradient-to-br from-green-400 to-fuchsia-500] text-[30px] font-bold h-20">Healthy living, Pride being!</Heading>
        <section className="flex flex-col gap-6">
            {articles.map(newsArticle => <NewsArticle
                key={newsArticle.title}
                newsArticle={newsArticle}
            />)}
        </section>
    </>
}