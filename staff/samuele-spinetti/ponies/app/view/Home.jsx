import Header from './home/Header'
import PostList from './home/PostList'
import Footer from './home/Footer'
import PoniesPostList from './home/PoniesPostList'
import FavPostList from './home/FavPostList'
import ProfileSettings from './home/ProfileSettings'

import { Component } from 'react'

class Home extends Component {
    constructor() {
        super()

        this.state = { refreshStamp: null, view: 'home' }
    }

    handlePostCreated() {

        this.setState({ refreshStamp: Date.now() })
    }

    handleProfileSettings() {
        this.setState({ view: 'profile' })
    }

    handleHome() {
        this.setState({ view: 'home' })
    }

    handleFavsPosts() {
        this.setState({ view: 'favorites' })
    }

    handleFollowingUsersPosts() {
        this.setState({ view: 'following' })
    }

    render() {
        return <>
            <Header
                onHomeClicked={this.handleHome.bind(this)}
                onFavsPostsClicked={this.handleFavsPosts.bind(this)}
                onFollowingUsersPostsClicked={this.handleFollowingUsersPosts.bind(this)}
                onProfileSettingsClicked={this.handleProfileSettings.bind(this)} />

            <main className='view main'>
                {this.state.view === 'home' && <PostList refreshStamp={this.state.refreshStamp} />}

                {this.state.view === 'following' && <PoniesPostList />}

                {this.state.view === 'favorites' && <FavPostList />}

                {this.state.view === 'profile' && <ProfileSettings />}
            </main>

            <Footer
                onPostCreated={this.handlePostCreated.bind(this)} />
        </>
    }
}

export default Home