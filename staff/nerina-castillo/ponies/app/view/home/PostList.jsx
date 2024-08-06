import logic from '../../logic'
import { useSearchParams } from 'react-router-dom'

import { useState, useEffect } from 'react'

import Post from './Post'
import Form from '../components/Form'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'

const PostList = ({ refreshStamp }) => {
    console.debug('PostList -> call')

    const [posts, setPosts] = useState([])
    const [searchParams, setSearchParams] = useSearchParams()
    const [query, setQuery] = useState('')

    const q = searchParams.get('q') || ''

    useEffect(() => {
        console.debug('PostList -> useEffect')

        loadPosts()
    }, [refreshStamp])

    useEffect(() => {
        setQuery(q)
    }, [q])

    const handleSearchPostsSubmit = event => {
        event.preventDefault()

        console.debug('PostList -> handleSearchPostsSubmit')

        const form = event.target

        const q = form.q.value

        setSearchParams({ q })
        // setQuery(q)

        try {
            logic.searchPosts(q)
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handlePostDeleted = () => {
        console.debug('PostList -> handlePostDeleted')

        loadPosts()
    }

    const handlePostEdited = () => {
        console.debug('PostList -> handlePostEdited')

        loadPosts()
    }

    const handlePostLikeToggled = () => {
        console.debug('PostList -> handlePostLikeToggled')

        loadPosts()
    }

    const handlePostFavToggled = () => {
        console.debug('PostList -> handlePostFavToggled')

        loadPosts()
    }

    const handleUserFollowToggled = () => {
        console.debug('PostList -> handleUserFollowToggled')

        loadPosts()
    }

    const loadPosts = () => {
        try {
            logic.getAllPosts()
                .then(posts => setPosts(posts))
                .catch(error => {
                    console.error(error)

                    alert(error.message)
                })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    const handleInputChange = (event) => {
        const { value } = event.target
        setQuery(value)
    }
    return <section className="mt-[5px] mb-[5px] flex flex-col gap-4">
        <Form onSubmit={handleSearchPostsSubmit}>
            <Label>Search</Label>
            <Input name="q" value={query} onChange={handleInputChange} />
            <Button type="submit">Search</Button>
        </Form>

        {posts.map(post => <Post
            key={post.id}
            post={post}
            onPostDeleted={handlePostDeleted}
            onPostEdited={handlePostEdited}
            onPostLikeToggled={handlePostLikeToggled}
            onPostFavToggled={handlePostFavToggled}
            onUserFollowToggled={handleUserFollowToggled}
        />)}
    </section>
}

export default PostList