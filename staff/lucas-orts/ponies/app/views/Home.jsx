import { Component } from 'react'

import Header from "./home/Header"
import PostList from "./home/PostList"
import Footer from "./home/Footer"
import FollowingPostList from "./home/FollowingPostList"
import FavsPostList from "./home/FavsPostList"


class Home extends Component {
    constructor() {
        super()

        this.state = { refreshStamp: null, view: 'home' }
    }


    handlePostCreated() {
        this.setState({ refreshStamp: Date.now() })
    }

    handleHomeClick() {
        this.setState({ view: 'home' })
    }

    handleFollowClick() {
        this.setState({ view: 'follows' })
    }

    handleFavsClick() {
        this.setState({ view: 'favs' })
    }

    render() {
        return <>
            <Header
                onHomeClick={this.handleHomeClick.bind(this)}

                onFollowClick={this.handleFollowClick.bind(this)}

                onFavsClick={this.handleFavsClick.bind(this)}

                onLogout={this.props.onLogout}
            />

            <main className="view main">
                {this.state.view === 'home' && <PostList refreshStamp={this.state.refreshStamp} />}

                {this.state.view === 'follows' && <FollowingPostList />}

                {this.state.view === 'favs' && <FavsPostList />}
            </main>
            <Footer onPostCreated={this.handlePostCreated.bind(this)} />
        </>
    }
}

export default Home