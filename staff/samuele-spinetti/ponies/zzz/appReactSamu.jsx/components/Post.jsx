import logic from '../../../logic/index.mjs'

import formatTime from '../../../util/formatTime.mjs'

import { Component } from 'react'

class Post extends Component {
    constructor() {
        super()

        this.state = { editPostVisible: false }
    }

    handleDeletePostClick() {
        if (confirm('Delete post?'))
            try {
                logic.deletePost(this.props.post.id)

                this.props.onPostDeleted()
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
    }

    handleEditPostClick() {
        this.setState({ editPostVisible: true })
    }

    handleCancelEditPostClick() {
        this.setState({ editPostVisible: false })
    }

    handleEditPostSubmit(event) {
        event.preventDefault()

        const form = event.target

        const editCaptionInput = form['edit-caption-input']

        const newCaption = editCaptionInput.value

        try {
            logic.updatePostCaption(this.props.post.id, newCaption)

            this.setState({ editPostVisible: false })

            this.props.onPostEdited()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleLikePostClick() {
        try {
            logic.toggleLikePost(this.props.post.id)

            this.props.onPostLikeToggled()
        } catch (error) {
            console.error(error)

            alert(error.message)

        }
    }

    handleSavePostClick() {
        try {
            logic.toggleFavPost(this.props.post.id)

            this.props.onPostFavToggled()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleFollowUserClick() {
        try {
            logic.toggleFollowUser(this.props.post.author.username)

            this.props.onFollowUserToggled()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        const { post } = this.props

        return <article className="post">

            <div className="post__top">
                <h3 className="post__author">{post.author.username}</h3>

                {post.author.username !== logic.getUserUsername() && <>
                    <button className="post__button" onClick={this.handleFollowUserClick.bind(this)}>{post.author.following ? 'Unfollow' : 'Follow'}</button>
                </>}
            </div>

            <img className="post__image" src={post.image} />

            <section className="like-save-field">

                <div className="like__actions">
                    <button className="heart-button" onClick={this.handleLikePostClick.bind(this)}>
                        <img className="heart" src={post.like ? 'https://svgsilh.com/svg/304420-e91e63.svg' : 'https://svgsilh.com/svg/1179072.svg'} />
                    </button>
                    <p className="hearts__likes">{post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</p>
                </div>

                <button className="save-post-button" onClick={this.handleSavePostClick.bind(this)}>
                    <img className="save-icon" src={post.fav ? 'https://svgsilh.com/svg/1202757-ff0088.svg' : 'https://svgsilh.com/svg/1202757-c7d5dc.svg'} />
                </button>

            </section>

            <p className="post__caption">{post.caption}</p>

            {post.author.username === logic.getUserUsername() && <>
                <div className="post__actions">
                    <button onClick={this.handleDeletePostClick.bind(this)}>Delete</button>
                    <button onClick={this.handleEditPostClick.bind(this)}>Edit</button>
                </div>
            </>}

            <time className="post__time">{formatTime(new Date(post.date))}</time>

            {this.state.editPostVisible && <form className="form-edit-caption" onSubmit={this.handleEditPostSubmit.bind(this)}>
                <label htmlFor="edit-caption-input"></label>
                <input id="edit-caption-input" defaultValue={post.caption} type="text" />

                <button type="submit">Save</button>
                <button type="button" onClick={this.handleCancelEditPostClick.bind(this)}>Cancel</button>
            </form>}
        </article>
    }
}

export default Post