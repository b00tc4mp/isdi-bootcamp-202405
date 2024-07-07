import logic from '../../../logic/index.mjs'

import formatTime from '../../../util/formatTime.mjs'

const { Component } = React

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

    componentWillUnmount() {
        //esto hace cosas antes de que se desmonte un componente
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
        }
        catch (error) {
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


    handleFavPostClick() {
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
            logic.toggleFollowUser(this.props.post.author.username) // { username: ..., following: true | false }

            this.props.onUserFollowToggled()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }


    render() {
        const post = this.props.post

        return <article className="post">
            <div className="post__top">
                <h3 className="post__author">{post.author.username}</h3>

                <button className="button" onClick={this.handleFollowUserClick.bind(this)}>{post.author.following ? 'Unfollow' : 'Follow'}</button>
            </div>

            <img className="post__image" src={post.image} />

            <p className="post__caption">{post.caption}</p>

            <div className="post__actions">
                <button className="button" onClick={this.handleLikePostClick.bind(this)}>{(post.like ? '❤' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</button>
                <button className="button" onClick={this.handleFavPostClick.bind(this)}>{post.fav ? '🏴‍☠️' : '🏳️'}</button>

                {post.author.username === logic.getUserUsername() && <>
                    <button className="button" onClick={this.handleDeletePostClick.bind(this)}>🗑</button>
                    <button className="button" onClick={this.handleEditPostClick.bind(this)}>📝</button>
                </>}
            </div>

            <time className="post__time">{formatTime(new Date(post.date))}</time>

            {this.state.editPostVisible && <form onSubmit={this.handleEditPostSubmit.bind(this)}>
                <label htmlFor="edit-caption-input"></label>
                <input id="edit-caption-input" defaultValue={post.caption} />

                <button className="button" type="submit">Save</button>
                <button className="button" type="reset" onClick={this.handleCancelEditPostClick.bind(this)}>Cancel</button>
            </form>}
        </article>
    }
}

export default Post