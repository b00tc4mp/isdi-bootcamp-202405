import logic from '../../../logic/index.mjs'

import formatTime from '../../../util/formatTime.mjs'

const { Component } = React

import Button from '../../components/Button.jsx'
import Input from '../../components/Input.jsx'
import Label from '../../components/Label.jsx'
import Form from '../../components/Form.jsx'
import Time from '../../components/Time.jsx'
import Image from '../../components/Image.jsx'
import Paragraph from '../../components/Paragraph.jsx'
import Heading from '../../components/Heading.jsx'
import Container from '../../components/Container.jsx'

import Avatar from '../components/Avatar.jsx'

class Post extends Component {
    constructor() {
        console.debug('Post -> constructor')

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
        console.debug('Post -> componentWillUnmount')
    }

    handleEditPostClick() {
        console.debug('Post -> handleEditPost')

        this.setState({ editPostVisible: true })
    }

    handleCancelEditPostClick() {
        console.debug('Post -> handleCancelEditPostClick')

        this.setState({ editPostVisible: false })
    }

    handleEditPostSubmit(event) {
        console.debug('Post -> handleEditPostSubmit')

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
        console.debug('Post -> handleLikePostClick')

        try {
            logic.toggleLikePost(this.props.post.id)

            this.props.onPostLikeToggled()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleFavPostClick() {
        console.debug('Post -> handleFavPostClick')

        try {
            logic.toggleFavPost(this.props.post.id)

            this.props.onPostFavToggled()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleFollowUserClick() {
        console.debug('Post -> handleFollowUserClick')

        try {
            logic.toggleFollowUser(this.props.post.author.username)

            this.props.onUserFollowToggled()
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        console.debug('Post -> render')

        const { post } = this.props

        return <article className="post">
            <Container className="Container--column-center">
                <Avatar url={post.author.avatar} />

                <Heading level="4">{post.author.username}</Heading>

                <Button onClick={this.handleFollowUserClick.bind(this)}>{post.author.following ? '🦄' : '🐴'}</Button>
            </Container>

            <Image src={post.image} alt={post.caption} title={post.caption} />

            <Paragraph>{post.caption}</Paragraph>

            <Container>
                <Button onClick={this.handleLikePostClick.bind(this)}>{(post.like ? '❤️' : '🤍') + ' ' + post.likes.length + ' like' + (post.likes.length === 1 ? '' : 's')}</Button>
                <Button onClick={this.handleFavPostClick.bind(this)}>{post.fav ? '🤩' : '😔'}</Button>

                {post.author.username === logic.getUserUsername() && <>
                    <Button onClick={this.handleDeletePostClick.bind(this)}>🗑️</Button>
                    <Button onClick={this.handleEditPostClick.bind(this)}>📝</Button>

                </>}
            </Container>

            <Time>{formatTime(new Date(post.date))}</Time>

            {this.state.editPostVisible && <Form onSubmit={this.handleEditPostSubmit.bind(this)} className="Form--column">
                <Container className="Container--column">
                    <Label htmlFor="edit-caption-input">{'Caption'}</Label>
                    <Input id="edit-caption-input" defaultValue={post.caption} />
                </Container>

                <Container className="Container--center">
                    <Button type="submit">{'Save'}</Button>
                    <Button type="button" onClick={this.handleCancelEditPostClick.bind(this)}>{'Cancel'}</Button>
                </Container>
            </Form>}
        </article>
    }
}
export default Post