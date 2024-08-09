import logic from "../../../logic/index.mjs"

import formatTime from '../../../util/formatTime.mjs'

const { Component } = React

class PostList extends Component {
    constructor() {
        super()

        try {
            const posts = logic.getAllPosts()

            this.state = { posts }
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        return <section className="post-list">
            {this.state.posts.map(post => <article className="post">
                <div className="post__top">
                    <h3 className="post__author">{post.author.username}</h3>

                    <button className="Button">{post.author.following ? '🦄' : '🐴'}</button>
                </div>

                <img className="post__image" src={post.image} />

                <p className="post__caption">{post.caption}</p>

                <div className="post__actions">
                    <button className="Button">{(post.like ? '❤️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</button>
                    <button className="Button">{post.fav ? '🏳️‍🌈' : '🏳️'}</button>

                    {post.author.username === logic.getUserUsername() && <>
                        <button className="Button">🗑️</button>
                        <button className="Button">📝</button>
                    </>}
                </div>

                <time className="post__time">{formatTime(new Date(post.date))}</time>
            </article>)}
        </section>
    }
}

export default PostList