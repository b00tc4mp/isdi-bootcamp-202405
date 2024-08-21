import { useEffect, useState } from 'react'
import useContext from '../context.js'

import logic from '../../logic'

import NewsArticle from './NewsArticle'
import Heading from '../library/Heading'

export default function NewsArticlesSavedList() {
    const [articles, setArticles] = useState([])
    const { alert } = useContext()

    useEffect(() => {
        loadNewsArticles()
    }, [])

    const handleNewsArticleSaveToggled = () => loadNewsArticles()

    const loadNewsArticles = () => {
        try {
            logic.getAllSavedNews()
                .then(newsArticles => setArticles(newsArticles))
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
        <section className="flex flex-col gap-6">
            {articles.map(newsArticle => <NewsArticle
                key={newsArticle.id}
                newsArticle={newsArticle}
                onNewsArticleSaveToggled={handleNewsArticleSaveToggled}
            />)}
        </section>
    </>
}