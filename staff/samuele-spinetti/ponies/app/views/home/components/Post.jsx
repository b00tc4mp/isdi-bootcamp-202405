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

                {post.author.username !== logic.getUserUsername() && <>
                    <button className="post__button">{post.author.following ? 'Unfollow' : 'Follow'}</button>
                </>}
            </div>
            <img className="post__image" src={post.image} />
            <section className="like-save-field">
                <div className="like__actions">
                    <button className="heart-button">
                        <img className="heart" src={post.like ? 'https://svgsilh.com/svg/304420-e91e63.svg' : 'https://svgsilh.com/svg/1179072.svg'} />
                    </button>
                    <p className="hearts__likes">{post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</p>
                </div>
                <button className="save-post-button">
                    <img className="save-icon" src={post.fav ? 'https://svgsilh.com/svg/1202757-ff0088.svg' : 'https://svgsilh.com/svg/1202757-c7d5dc.svg'} />
                </button>
            </section>
            <p className="post__caption">{post.caption}</p>

            {post.author.username === logic.getUserUsername() && <>
                <div className="post__actions">
                    <button>Delete</button>
                    <button>Edit</button>
                </div>
            </>}

            <time className="post__time">{formatTime(new Date(post.date))}</time>
        </article>
    }
}

export default Post