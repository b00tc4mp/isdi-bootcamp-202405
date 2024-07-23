import logic from '../../logic'

import Post from './Post'
import Profile from './Profile'

import { Component } from 'react'

class Body extends Component {
    constructor() {
        super()

        this.state = { posts: [], user: null }
    }

    componentDidMount() {
        try {
            logic.getAllPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.setState({ posts })
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    componentWillReceiveProps(newProps) {
        const newFeed = newProps.feed

        const oldFeed = this.props.feed

        if (newProps.refreshStamp !== this.props.refreshStamp || (/*newFeed !== oldFeed &&*/ newFeed === 'home')) {
            try {
                logic.getAllPosts((error, posts) => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    this.setState({ posts, user: null })
                })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        } else if (newFeed !== oldFeed && newFeed === 'saved') {
            try {
                logic.getUserSavedPosts((error, posts) => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    this.setState({ posts, user: null })
                })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        } else if (newFeed !== oldFeed && newFeed === 'followed') {
            try {
                logic.getFollowedUserPosts((error, posts) => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    this.setState({ posts, user: null })
                })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        } else if (newFeed !== oldFeed) {
            try {
                logic.getUser(newFeed, (error, user) => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    logic.getUserPosts(newFeed, (error, posts) => {
                        if (error) {
                            console.error(error)

                            alert(error.message)

                            return
                        }

                        this.setState({ posts, user })
                    })
                })
            } catch (error) {
                console.error(error)

                alert(error.message)
            }

        }
    }

    handleUserProfile(username) {
        try {
            logic.getUser(username, (error, user) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                logic.getUserPosts(username, (error, posts) => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    this.setState({ posts, user })
                })
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleDeletedPost() {
        try {
            logic.getAllPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.setState({ posts })
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostLiked() {
        try {
            logic.getAllPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.setState({ posts })
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handlePostSaved() {
        if (this.props.feed === 'saved') {
            try {
                logic.getUserSavedPosts((error, posts) => {
                    if (error) {
                        console.error(error)

                        alert(error.message)

                        return
                    }

                    this.setState({ posts })
                })

            } catch (error) {
                console.error(error)

                alert(error.message)
            }
        }
    }

    handlePostEdited() {
        try {
            logic.getAllPosts((error, posts) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }

                this.setState({ posts })
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    handleUserFollowed() {
        try {
            const { username } = this.state.user
            logic.getUserList((error, userList) => {
                if (error) {
                    console.error(error)

                    alert(error.message)

                    return
                }
                if (userList.includes(username)) {
                    logic.getUserPosts(username, (error, posts) => {
                        if (error) {
                            console.error(error)

                            alert(error.message)

                            return
                        }

                        this.setState({ posts })
                    })
                } else {
                    logic.getAllPosts((error, posts) => {
                        if (error) {
                            console.error(error)

                            alert(error.message)

                            return
                        }

                        this.setState({ posts })
                    })
                }
            })
        } catch (error) {
            console.error(error)

            alert(error.message)
        }
    }

    render() {
        const { user } = this.state
        return <main className="View--home">
            {user && <Profile user={user} onChange={this.handleUserProfile.bind(this)} />}
            <section className="Post-list">
                {this.state.posts.map(post => <Post key={post.id} post={post}
                    onUserClick={this.handleUserProfile.bind(this)}
                    onPostDeleted={this.handleDeletedPost.bind(this)}
                    onPostEdited={this.handlePostEdited.bind(this)}
                    onPostLiked={this.handlePostLiked.bind(this)}
                    onPostSaved={this.handlePostSaved.bind(this)}
                    onFollow={this.handleUserFollowed.bind(this)} />)}
            </section>
        </main>
    }
}

export default Body