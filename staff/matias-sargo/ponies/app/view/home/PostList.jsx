import logic from '../../logic'
import { useSearchParams } from 'react-router-dom'

import { useState, useEffect } from 'react'

import Post from './Post'
import Form from '../components/Form'
import Label from '../components/Label'
import Input from '../components/Input'
import Button from '../components/Button'


import './PostList.css'

const PostList = ({ refreshStamp }) => {
    console.debug('PostList -> call')

    const [posts, setPosts] = useState([])
    const [searchParams, setSeachParams] = useSearchParams()

    const q = searchParams.get('q')

    useEffect(() => {
        console.debug('PostList -> useEffect')

        loadPosts()
    }, [refreshStamp])

    const handleSearchSubmit = event => {
        event.preventDefault()

        console.debug('PostList -> handleSearchSubmit')

        const form = event.target

        const q = form.q.value

        setSeachParams({ q })

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

    return <section className="PostList">
        <Form onSubmit={handleSearchSubmit}>
            <Label>Search</Label>
            <Input name="q" placeholder="query" defaultValue={q} />
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