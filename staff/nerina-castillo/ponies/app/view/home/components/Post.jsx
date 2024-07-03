import logic from '../../../logic/index.mjs'

import formatTime from '../../../util/formatTime.mjs'

const { Component } = React

class Post extends Component {
    constructor() {
        super()
    }

    render() {
        const post = this.props.post

        return <article className="post">
            <div className="post__top">
                <h3 className="post__author">{post.author.username}</h3>

                <button className="Button">{post.author.following ? 'Unfollow' : 'Follow'}</button>
            </div>

            <img className="post__image" src={post.image} />

            <p className="post__caption">{post.caption}</p>

            <div className="post__actions">
                <button className="Button">{(post.like ? '❤️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</button>
                <button className="Button">{post.fav ? '💫' : '⭐'}</button>

                {post.author.username === logic.getUserUsername() && <>
                    <button className="Button">Delete</button>
                    <button className="Button">Edit</button>
                </>}
            </div>

            <time className="post__time">{formatTime(new Date(post.date))}</time>
        </article>
    }
}

export default Post